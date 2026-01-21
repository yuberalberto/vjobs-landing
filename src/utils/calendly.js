// Calendly URL constant - single source of truth
export const CALENDLY_URL = 'https://calendly.com/yuberalberto/diagnostico-gratuito-vjobs';

// Lazy load Calendly script only when needed
let calendlyScriptPromise = null;

export function loadCalendlyScript() {
  // Return existing promise if already loading/loaded
  if (calendlyScriptPromise) {
    return calendlyScriptPromise;
  }

  // If already loaded, return resolved promise
  if (window.Calendly) {
    return Promise.resolve();
  }

  // Create new promise to load script
  calendlyScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.type = 'text/javascript';
    script.async = true;
    
    script.onload = () => {
      resolve();
    };
    
    script.onerror = () => {
      calendlyScriptPromise = null; // Reset on error to allow retry
      reject(new Error('Failed to load Calendly script'));
    };
    
    document.head.appendChild(script);
  });

  return calendlyScriptPromise;
}

// Open Calendly popup widget
export async function openCalendlyPopup(url = CALENDLY_URL, options = {}) {
  try {
    console.log('Loading Calendly script...');
    // Ensure script is loaded
    await loadCalendlyScript();
    
    console.log('Calendly script loaded, opening popup...');
    // Open popup widget
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url,
        ...options
      });
      console.log('Calendly popup opened successfully');
      return true;
    }
    
    console.warn('Calendly object not found after loading script');
    return false;
  } catch (error) {
    console.error('Error opening Calendly popup:', error);
    return false;
  }
}
