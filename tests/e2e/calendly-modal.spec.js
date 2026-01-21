import { test, expect } from '@playwright/test';

test.describe('Calendly Modal Integration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3002/');
  });

  test('should not display modal on initial page load', async ({ page }) => {
    const modalOverlay = page.locator('.modal-overlay');
    await expect(modalOverlay).not.toBeVisible();
  });

  test('should open modal when clicking "Agendar mi Diagnóstico" button', async ({ page }) => {
    const ctaButton = page.getByRole('button', { name: /Agendar mi Diagnóstico/i });
    await ctaButton.click();

    // Verify modal overlay is visible
    const modalOverlay = page.locator('.modal-overlay');
    await expect(modalOverlay).toBeVisible();

    // Verify body has overflow hidden (scroll blocking)
    const bodyOverflow = await page.evaluate(() => {
      return window.getComputedStyle(document.body).overflow;
    });
    expect(bodyOverflow).toBe('hidden');

    // Verify Calendly widget container exists and is visible
    const calendlyWidget = page.locator('.calendly-inline-widget');
    await expect(calendlyWidget).toBeVisible();

    // Wait for Calendly iframe to load (external content)
    const calendlyIframe = page.locator('.calendly-inline-widget iframe');
    await expect(calendlyIframe).toBeVisible({ timeout: 10000 });
  });

  test('should close modal when pressing ESC key', async ({ page }) => {
    const ctaButton = page.getByRole('button', { name: /Agendar mi Diagnóstico/i });
    await ctaButton.click();

    // Verify modal is open
    const modalOverlay = page.locator('.modal-overlay');
    await expect(modalOverlay).toBeVisible();

    // Press ESC key
    await page.keyboard.press('Escape');

    // Verify modal is closed
    await expect(modalOverlay).not.toBeVisible();

    // Verify body overflow is restored
    const bodyOverflow = await page.evaluate(() => {
      return window.getComputedStyle(document.body).overflow;
    });
    expect(bodyOverflow).not.toBe('hidden');
  });

  test('should close modal when clicking outside (overlay)', async ({ page }) => {
    // Open modal
    const ctaButton = page.getByRole('button', { name: /Agendar mi Diagnóstico/i });
    await ctaButton.click();

    // Verify modal is open
    const modalOverlay = page.locator('.modal-overlay');
    await expect(modalOverlay).toBeVisible();

    // Click on overlay (outside modal content)
    // We need to click on the overlay itself, not the modal-content
    await modalOverlay.click({ position: { x: 10, y: 10 } });

    // Verify modal is closed
    await expect(modalOverlay).not.toBeVisible();

    // Verify body overflow is restored
    const bodyOverflow = await page.evaluate(() => {
      return window.getComputedStyle(document.body).overflow;
    });
    expect(bodyOverflow).not.toBe('hidden');
  });

  test('should not close modal when clicking inside modal content', async ({ page }) => {
    // Open modal
    const ctaButton = page.getByRole('button', { name: /Agendar mi Diagnóstico/i });
    await ctaButton.click();

    // Verify modal is open
    const modalOverlay = page.locator('.modal-overlay');
    await expect(modalOverlay).toBeVisible();

    // Click inside modal content
    const modalContent = page.locator('.modal-content');
    await modalContent.click();

    // Verify modal is still open
    await expect(modalOverlay).toBeVisible();
  });

  test('should maintain scroll blocking throughout modal lifecycle', async ({ page }) => {
    // Verify initial state
    let bodyOverflow = await page.evaluate(() => {
      return window.getComputedStyle(document.body).overflow;
    });
    expect(bodyOverflow).not.toBe('hidden');

    // Open modal
    const ctaButton = page.getByRole('button', { name: /Agendar mi Diagnóstico/i });
    await ctaButton.click();

    // Verify scroll is blocked
    bodyOverflow = await page.evaluate(() => {
      return window.getComputedStyle(document.body).overflow;
    });
    expect(bodyOverflow).toBe('hidden');

    // Close modal with ESC
    await page.keyboard.press('Escape');

    // Verify scroll is restored
    bodyOverflow = await page.evaluate(() => {
      return window.getComputedStyle(document.body).overflow;
    });
    expect(bodyOverflow).not.toBe('hidden');
  });

  test('should display Calendly widget with correct URL', async ({ page }) => {
    // Open modal
    const ctaButton = page.getByRole('button', { name: /Agendar mi Diagnóstico/i });
    await ctaButton.click();

    // Wait for iframe to load
    const calendlyIframe = page.locator('.calendly-inline-widget iframe');
    await expect(calendlyIframe).toBeVisible({ timeout: 10000 });

    // Verify iframe src contains the correct Calendly URL
    const iframeSrc = await calendlyIframe.getAttribute('src');
    expect(iframeSrc).toContain('calendly.com/yuberalberto/diagnostico-gratuito-vjobs');
  });
});
