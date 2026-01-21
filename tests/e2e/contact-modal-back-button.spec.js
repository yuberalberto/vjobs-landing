import { test, expect } from '@playwright/test';

test.describe('Contact Modal Browser Back Button Handling', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3002/');
  });

  test('should add history entry when modal opens', async ({ page }) => {
    // Get initial history length
    const initialHistoryLength = await page.evaluate(() => window.history.length);
    
    const ctaButton = page.getByRole('button', { name: /Agendar mi Diagnóstico/i });
    await ctaButton.click();

    // Verify modal is open
    const modalOverlay = page.locator('.modal-overlay');
    await expect(modalOverlay).toBeVisible();

    // Check that history length increased by 1
    const newHistoryLength = await page.evaluate(() => window.history.length);
    expect(newHistoryLength).toBe(initialHistoryLength + 1);

    // Verify history state contains modal data
    const historyState = await page.evaluate(() => window.history.state);
    expect(historyState).toEqual({ modalOpen: true });
  });

  test('should close modal when browser back button is pressed', async ({ page }) => {
    const ctaButton = page.getByRole('button', { name: /Agendar mi Diagnóstico/i });
    await ctaButton.click();

    // Verify modal is open
    const modalOverlay = page.locator('.modal-overlay');
    await expect(modalOverlay).toBeVisible();

    // Press browser back button
    await page.goBack();

    // Verify modal is closed
    await expect(modalOverlay).not.toBeVisible();

    // Verify body overflow is restored
    const bodyOverflow = await page.evaluate(() => {
      return window.getComputedStyle(document.body).overflow;
    });
    expect(bodyOverflow).not.toBe('hidden');
  });

  test('should not exit website when back button closes modal', async ({ page }) => {
    // Navigate to a different page first to establish history
    await page.goto('http://localhost:3002/#about');
    await page.waitForTimeout(100);
    
    const ctaButton = page.getByRole('button', { name: /Agendar mi Diagnóstico/i });
    await ctaButton.click();

    // Verify modal is open
    const modalOverlay = page.locator('.modal-overlay');
    await expect(modalOverlay).toBeVisible();

    // Get current URL before back button
    const urlBeforeBack = page.url();

    // Press browser back button
    await page.goBack();

    // Verify modal is closed but we're still on the same page
    await expect(modalOverlay).not.toBeVisible();
    
    const urlAfterBack = page.url();
    expect(urlAfterBack).toBe(urlBeforeBack);

    // Press back button again - now we should go to previous page
    await page.goBack();
    await page.waitForTimeout(100);
    
    const urlAfterSecondBack = page.url();
    expect(urlAfterSecondBack).toBe('http://localhost:3002/');
  });

  test('should handle forward button correctly after back button close', async ({ page }) => {
    const ctaButton = page.getByRole('button', { name: /Agendar mi Diagnóstico/i });
    await ctaButton.click();

    // Verify modal is open
    const modalOverlay = page.locator('.modal-overlay');
    await expect(modalOverlay).toBeVisible();

    // Press browser back button to close modal
    await page.goBack();
    await expect(modalOverlay).not.toBeVisible();

    // Press forward button - modal should remain closed (expected behavior)
    await page.goForward();
    await expect(modalOverlay).not.toBeVisible(); // Forward button doesn't reopen modal
  });

  test('should clean up event listeners when modal closes', async ({ page }) => {
    const ctaButton = page.getByRole('button', { name: /Agendar mi Diagnóstico/i });
    await ctaButton.click();

    // Verify modal is open
    const modalOverlay = page.locator('.modal-overlay');
    await expect(modalOverlay).toBeVisible();

    // Close modal with back button
    await page.goBack();
    await expect(modalOverlay).not.toBeVisible();

    // Open modal again
    await ctaButton.click();
    await expect(modalOverlay).toBeVisible();

    // Close with ESC key
    await page.keyboard.press('Escape');
    await expect(modalOverlay).not.toBeVisible();

    // Verify no duplicate history entries
    const historyLength = await page.evaluate(() => window.history.length);
    expect(historyLength).toBeLessThanOrEqual(3); // Initial + modal entry
  });

  test('should handle multiple modal open/close cycles correctly', async ({ page }) => {
    const ctaButton = page.getByRole('button', { name: /Agendar mi Diagnóstico/i });
    
    // Multiple open/close cycles
    for (let i = 0; i < 3; i++) {
      // Open modal
      await ctaButton.click();
      const modalOverlay = page.locator('.modal-overlay');
      await expect(modalOverlay).toBeVisible();

      // Close with back button
      await page.goBack();
      await expect(modalOverlay).not.toBeVisible();

      // Wait a bit between cycles
      await page.waitForTimeout(100);
    }

    // Verify we're still on the same page
    const currentUrl = page.url();
    expect(currentUrl).toBe('http://localhost:3002/');
  });

  test('should differentiate between X button and back button close', async ({ page }) => {
    const ctaButton = page.getByRole('button', { name: /Agendar mi Diagnóstico/i });
    
    // Open modal
    await ctaButton.click();
    const modalOverlay = page.locator('.modal-overlay');
    await expect(modalOverlay).toBeVisible();

    // Close with X button
    const closeButton = page.getByRole('button', { name: /Cerrar/i });
    
    // Debug viewport y posiciones
    const viewport = page.viewportSize();
    console.log('Viewport:', viewport);

    const modalBox = await modalOverlay.boundingBox();
    console.log('Modal position:', modalBox);

    const buttonBox = await closeButton.boundingBox();
    console.log('Button position:', buttonBox);
    
    await closeButton.scrollIntoViewIfNeeded(); // Ensure button is in viewport
    await closeButton.click();
    await expect(modalOverlay).not.toBeVisible();

    // Verify history state - should not have changed
    const historyState = await page.evaluate(() => window.history.state);
    expect(historyState).not.toEqual({ modalOpen: true });

    // Open modal again
    await ctaButton.click();
    await expect(modalOverlay).toBeVisible();

    // Close with back button
    await page.goBack();
    await expect(modalOverlay).not.toBeVisible();
  });

  test('should work correctly on mobile viewport', async ({ page }) => {
    // Set mobile viewport (between 576px and 768px to avoid small mobile overrides)
    await page.setViewportSize({ width: 600, height: 667 });

    const ctaButton = page.getByRole('button', { name: /Agendar mi Diagnóstico/i });
    await ctaButton.click();

    // Verify modal is open with mobile styles
    const modalOverlay = page.locator('.modal-overlay');
    await expect(modalOverlay).toBeVisible();

    const modalContent = page.locator('.modal-content');
    const mobileStyles = await modalContent.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        height: styles.height,
        position: styles.position
      };
    });
    // Accept calculated pixel values (browser converts vh to px)
    expect(mobileStyles.height).toMatch(/\d+\.?\d*px/);
    expect(parseFloat(mobileStyles.height)).toBeGreaterThan(500); // Should be ~566px for 85vh of 667px
    expect(mobileStyles.position).toBe('absolute');

    // Test back button on mobile
    await page.goBack();
    await expect(modalOverlay).not.toBeVisible();
  });

  test('should handle popstate event correctly', async ({ page }) => {
    const ctaButton = page.getByRole('button', { name: /Agendar mi Diagnóstico/i });
    await ctaButton.click();

    // Verify modal is open
    const modalOverlay = page.locator('.modal-overlay');
    await expect(modalOverlay).toBeVisible();

    // Simulate popstate event programmatically
    await page.evaluate(() => {
      // Use a simple approach that doesn't require Event constructor
      const popstateEvent = document.createEvent('Event');
      popstateEvent.initEvent('popstate', true, true);
      window.dispatchEvent(popstateEvent);
    });

    // Modal should close
    await expect(modalOverlay).not.toBeVisible();
  });

  test('should not interfere with other navigation', async ({ page }) => {
    // Navigate to different sections
    await page.goto('http://localhost:3002/#about');
    await page.waitForTimeout(100);

    // Open modal
    const ctaButton = page.getByRole('button', { name: /Agendar mi Diagnóstico/i });
    await ctaButton.click();

    const modalOverlay = page.locator('.modal-overlay');
    await expect(modalOverlay).toBeVisible();

    // Close modal with back button
    await page.goBack();
    await expect(modalOverlay).not.toBeVisible();

    // Should still be on #about page
    const currentUrl = page.url();
    expect(currentUrl).toBe('http://localhost:3002/#about');

    // Regular navigation should still work
    await page.goto('http://localhost:3002/#services');
    await page.waitForTimeout(100);
    
    const servicesUrl = page.url();
    expect(servicesUrl).toBe('http://localhost:3002/#services');
  });
});
