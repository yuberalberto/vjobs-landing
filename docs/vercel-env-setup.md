# Vercel Environment Variables Setup Guide

This guide explains how to configure environment variables in Vercel for the VJobs Landing Page project, specifically for the Brevo API integration.

## Required Environment Variables

For the contact form with Brevo API integration to work properly in production, you need to configure the following environment variables in your Vercel project:

| Name | Value | Description |
|------|-------|-------------|
| `VITE_BREVO_API_KEY` | `your-api-key` | Your Brevo API key |
| `VITE_BREVO_API_URL` | `https://api.brevo.com/v3` | Brevo API base URL |

## How to Configure Environment Variables in Vercel

1. **Log in to your Vercel account** and navigate to your dashboard.

2. **Select the VJobs Landing Page project**.

3. **Go to Project Settings**:
   - Click on the "Settings" tab in the top navigation.
   - Select "Environment Variables" from the left sidebar.

4. **Add the environment variables**:
   - Click on "Add New" button.
   - Enter `VITE_BREVO_API_KEY` in the "Name" field.
   - Enter your actual Brevo API key in the "Value" field.
   - Select the environments where this variable should be available (Production, Preview, Development).
   - Click "Add".
   
5. **Repeat the process for the second variable**:
   - Click on "Add New" button again.
   - Enter `VITE_BREVO_API_URL` in the "Name" field.
   - Enter `https://api.brevo.com/v3` in the "Value" field.
   - Select the appropriate environments.
   - Click "Add".

6. **Redeploy your application**:
   - Go to the "Deployments" tab.
   - Find your latest deployment.
   - Click the three dots menu and select "Redeploy".

## Verifying the Configuration

After deploying, you can verify that the environment variables are correctly configured by:

1. Testing the contact form on your production site.
2. Checking if submissions appear in your Brevo contacts list.
3. Inspecting the browser console for any API-related errors.

## Security Considerations

- Environment variables in Vercel are encrypted and securely stored.
- The `VITE_` prefix makes these variables accessible to client-side code. This is necessary for our Vue.js application.
- Consider rotating your API keys periodically for enhanced security.

## Troubleshooting

If the form doesn't work in production:

1. Verify that the environment variables are correctly set in Vercel.
2. Ensure the Brevo API key has the correct permissions.
3. Check if there are any CORS issues (though this is unlikely with the current implementation).
4. Verify that the list ID in the code matches your actual list ID in Brevo.

## Additional Resources

- [Vercel Environment Variables Documentation](https://vercel.com/docs/concepts/projects/environment-variables)
- [Brevo API Documentation](https://developers.brevo.com/)
