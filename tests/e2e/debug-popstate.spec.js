import { test, expect } from '@playwright/test';

test.describe('Debug Popstate Event', () => {
  test('should detect popstate event registration', async ({ page }) => {
    await page.goto('http://localhost:3002/');
    
    // Add console logging to detect popstate events
    await page.evaluate(() => {
      window.popstateFired = false;
      window.originalPopState = window.onpopstate;
      
      window.addEventListener('popstate', () => {
        console.log('POPSTATE FIRED!');
        window.popstateFired = true;
      });
      
      console.log('Popstate listener added');
    });
    
    const ctaButton = page.getByRole('button', { name: /Agendar mi Diagnóstico/i });
    await ctaButton.click();
    
    // Wait a bit for modal to fully open
    await page.waitForTimeout(500);
    
    // Check if popstate listener is registered
    const hasPopstateListener = await page.evaluate(() => {
      return window.popstateFired === false; // Should be false initially
    });
    expect(hasPopstateListener).toBe(true);
    
    // Add history entry manually
    await page.evaluate(() => {
      window.history.pushState({ test: true }, '', window.location.href);
      console.log('History state pushed:', window.history.state);
    });
    
    // Check history length
    const historyLength = await page.evaluate(() => window.history.length);
    console.log('History length after push:', historyLength);
    
    // Go back
    await page.goBack();
    await page.waitForTimeout(500);
    
    // Check if popstate fired
    const popstateFired = await page.evaluate(() => window.popstateFired);
    console.log('Popstate fired after goBack:', popstateFired);
    
    // Also check modal state
    const modalOverlay = page.locator('.modal-overlay');
    const modalVisible = await modalOverlay.isVisible();
    console.log('Modal visible after goBack:', modalVisible);
  });
});
