// Vercel serverless function to securely proxy Brevo API calls
// This hides the API key from the frontend

module.exports = async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get API key from environment (server-side only)
    const apiKey = process.env.BREVO_API_KEY;
    
    // Debug logging
    
    if (!apiKey) {
      return res.status(500).json({ 
        error: 'Server configuration error',
        debug: {
          hasApiKey: !!apiKey,
          availableBrevoKeys: Object.keys(process.env).filter(k => k.includes('BREVO'))
        }
      });
    }

    // Validate request body
    const { email, attributes, listIds, updateEnabled } = req.body;
    
    if (!email || !Array.isArray(listIds)) {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    // Prepare Brevo API request
    const brevoData = {
      email,
      attributes: attributes || {},
      listIds,
      updateEnabled: updateEnabled !== false // default to true
    };


    // Make request to Brevo API
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json'
      },
      body: JSON.stringify(brevoData)
    });

    // Handle Brevo API response
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // Return generic error to frontend, log details server-side
      return res.status(response.status).json({ 
        error: 'Failed to process contact request',
        details: process.env.NODE_ENV === 'development' ? errorData : undefined
      });
    }

    // Handle response - some Brevo endpoints return empty body on success
    let result = {};
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const text = await response.text();
      if (text) {
        result = JSON.parse(text);
      }
    }
    

    // Return success response
    res.status(200).json({ success: true, ...result });

  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
}
