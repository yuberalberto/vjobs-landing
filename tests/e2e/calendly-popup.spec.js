import { test, expect } from '@playwright/test';

test.describe('Calendly Popup Integration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3002/');
  });

  test('should not have Calendly loaded on initial page load', async ({ page }) => {
    const calendlyExists = await page.evaluate(() => {
      return typeof window.Calendly !== 'undefined';
    });
    expect(calendlyExists).toBe(false);
  });

  test('should load Calendly script when clicking CTA button', async ({ page }) => {
    const ctaButton = page.getByRole('button', { name: /Agendar mi Diagnóstico/i });
    await ctaButton.click();

    // Wait for Calendly script to load
    await page.waitForFunction(() => {
      return typeof window.Calendly !== 'undefined';
    }, { timeout: 10000 });

    const calendlyExists = await page.evaluate(() => {
      return typeof window.Calendly !== 'undefined';
    });
    expect(calendlyExists).toBe(true);
  });

  test('should open Calendly popup when clicking CTA button', async ({ page }) => {
    const ctaButton = page.getByRole('button', { name: /Agendar mi Diagnóstico/i });
    await ctaButton.click();

    // Wait for Calendly overlay to appear
    const calendlyOverlay = page.locator('.calendly-overlay');
    await expect(calendlyOverlay).toBeVisible({ timeout: 15000 });
  });

  test('should display Calendly iframe inside popup', async ({ page }) => {
    const ctaButton = page.getByRole('button', { name: /Agendar mi Diagnóstico/i });
    await ctaButton.click();

    // Wait for Calendly iframe
    const calendlyIframe = page.locator('.calendly-overlay iframe');
    await expect(calendlyIframe).toBeVisible({ timeout: 15000 });

    // Verify iframe src contains correct URL
    const iframeSrc = await calendlyIframe.getAttribute('src');
    expect(iframeSrc).toContain('calendly.com/yuberalberto/diagnostico-gratuito-vjobs');
  });

  test('should close popup when clicking Calendly close button', async ({ page }) => {
    const ctaButton = page.getByRole('button', { name: /Agendar mi Diagnóstico/i });
    await ctaButton.click();

    // Wait for popup to open
    const calendlyOverlay = page.locator('.calendly-overlay');
    await expect(calendlyOverlay).toBeVisible({ timeout: 15000 });

    // Find and click Calendly's close button
    const closeButton = page.locator('.calendly-overlay .calendly-close-overlay, .calendly-overlay [data-testid="close-button"]');
    await closeButton.click();

    // Verify popup is closed
    await expect(calendlyOverlay).not.toBeVisible();
  });

  test('should display console logs for debugging', async ({ page }) => {
    const logs = [];
    page.on('console', msg => {
      if (msg.text().includes('Calendly')) {
        logs.push(msg.text());
      }
    });

    const ctaButton = page.getByRole('button', { name: /Agendar mi Diagnóstico/i });
    await ctaButton.click();

    // Wait a bit for logs
    await page.waitForTimeout(3000);

    // Log the console messages for debugging
    console.log('Console logs:', logs);
  });
});
