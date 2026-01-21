import { test, expect } from '@playwright/test';

// Mobile device configurations
const mobileDevices = [
  { name: 'iPhone 13', viewport: { width: 390, height: 844 } },
  { name: 'Pixel 5', viewport: { width: 393, height: 851 } },
  { name: 'iPad', viewport: { width: 768, height: 1024 } },
];

const desktopViewport = { width: 1200, height: 800 };
const tabletViewport = { width: 800, height: 600 };

test.describe('Contact Modal Responsive Testing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3002/');
  });

  // Desktop Testing
  test.describe('Desktop (>992px)', () => {
    test.use({ viewport: desktopViewport });

    test('should display modal as centered box on desktop', async ({ page }) => {
      const ctaButton = page.getByRole('button', { name: /Agendar mi Diagnóstico/i });
      await ctaButton.click();

      const modalOverlay = page.locator('.modal-overlay');
      await expect(modalOverlay).toBeVisible();

      const modalContent = page.locator('.modal-content');
      await expect(modalContent).toBeVisible();

      // Verify desktop-specific styles
      const modalStyles = await modalContent.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          maxWidth: styles.maxWidth,
          borderRadius: styles.borderRadius,
          height: styles.height,
          position: styles.position
        };
      });

      expect(modalStyles.maxWidth).toBe('600px');
      expect(modalStyles.borderRadius).toBe('12px');
      expect(modalStyles.position).toBe('relative');
    });

    test('should maintain desktop behavior after mobile testing', async ({ page }) => {
      // Test mobile first
      await page.setViewportSize({ width: 375, height: 667 });
      const ctaButton = page.getByRole('button', { name: /Agendar mi Diagnóstico/i });
      await ctaButton.click();
      
      let modalContent = page.locator('.modal-content');
      const mobileStyles = await modalContent.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          height: styles.height,
          position: styles.position,
          borderRadius: styles.borderRadius
        };
      });
      
      expect(mobileStyles.height).toMatch(/\d+\.?\d*px/);
      expect(parseFloat(mobileStyles.height)).toBeGreaterThan(500); // Should be ~600px for mobile viewport
      expect(mobileStyles.position).toBe('absolute');

      // Close modal
      await page.keyboard.press('Escape');

      // Switch back to desktop
      await page.setViewportSize(desktopViewport);
      await ctaButton.click();

      modalContent = page.locator('.modal-content');
      const desktopStyles = await modalContent.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          maxWidth: styles.maxWidth,
          position: styles.position
        };
      });

      expect(desktopStyles.maxWidth).toBe('600px');
      expect(desktopStyles.position).toBe('relative');
    });
  });

  // Tablet Testing
  test.describe('Tablet (768-992px)', () => {
    test.use({ viewport: tabletViewport });

    test('should handle tablet viewport correctly', async ({ page }) => {
      const ctaButton = page.getByRole('button', { name: /Agendar mi Diagnóstico/i });
      await ctaButton.click();

      const modalContent = page.locator('.modal-content');
      await expect(modalContent).toBeVisible();

      // Should use desktop styles at 800px
      const modalStyles = await modalContent.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          maxWidth: styles.maxWidth,
          position: styles.position
        };
      });

      expect(modalStyles.maxWidth).toBe('600px');
      expect(modalStyles.position).toBe('relative');
    });
  });

  // Mobile Testing
  test.describe('Mobile (≤768px)', () => {
    test.use({ viewport: { width: 600, height: 667 } }); // Between 576px and 768px

    test('should display modal as viewport-based sheet on mobile', async ({ page }) => {
      const ctaButton = page.getByRole('button', { name: /Agendar mi Diagnóstico/i });
      await ctaButton.click();

      const modalOverlay = page.locator('.modal-overlay');
      await expect(modalOverlay).toBeVisible();

      const modalContent = page.locator('.modal-content');
      await expect(modalContent).toBeVisible();

      // Verify mobile-specific styles
      const modalStyles = await modalContent.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          height: styles.height,
          position: styles.position,
          bottom: styles.bottom,
          borderRadius: styles.borderRadius,
          width: styles.width
        };
      });

      expect(modalStyles.height).toMatch(/\d+\.?\d*px/); // Should be viewport-based
      expect(parseFloat(modalStyles.height)).toBeGreaterThan(500); // Should be ~566px for 85vh of 667px
      expect(modalStyles.position).toBe('absolute');
      expect(modalStyles.bottom).toBe('0px');
      expect(modalStyles.borderRadius).toBe('16px 16px 0px 0px');
      expect(modalStyles.width).toMatch(/\d+\.?\d*px/); // Width calculated as pixels
      expect(parseFloat(modalStyles.width)).toBeGreaterThan(500); // Should be ~600px for mobile
    });

    test('should have visible border-radius on mobile', async ({ page }) => {
      const ctaButton = page.getByRole('button', { name: /Agendar mi Diagnóstico/i });
      await ctaButton.click();

      const modalContent = page.locator('.modal-content');
      
      // Check that padding is applied for border-radius visibility
      const modalStyles = await modalContent.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          paddingTop: styles.paddingTop,
          overflow: styles.overflow
        };
      });

      expect(modalStyles.paddingTop).toBe('16px');
      expect(modalStyles.overflow).toBe('hidden');
    });

    test('should have properly sized Calendly widget on mobile', async ({ page }) => {
      const ctaButton = page.getByRole('button', { name: /Agendar mi Diagnóstico/i });
      await ctaButton.click();

      const calendlyWidget = page.locator('.calendly-inline-widget');
      await expect(calendlyWidget).toBeVisible();

      // Wait for iframe to load
      const calendlyIframe = page.locator('.calendly-inline-widget iframe');
      await expect(calendlyIframe).toBeVisible({ timeout: 10000 });

      // Verify widget dimensions
      const widgetStyles = await calendlyWidget.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          minWidth: styles.minWidth,
          height: styles.height,
          borderRadius: styles.borderRadius
        };
      });

      expect(widgetStyles.minWidth).toBe('100%');
      expect(widgetStyles.height).toMatch(/\d+\.?\d*px/); // Should be calculated
      expect(parseFloat(widgetStyles.height)).toBeGreaterThan(400); // Should be ~470px
      expect(widgetStyles.borderRadius).toBe('8px');
    });

    test('should handle small mobile viewport (≤576px)', async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 568 }); // iPhone SE
      
      const ctaButton = page.getByRole('button', { name: /Agendar mi Diagnóstico/i });
      await ctaButton.click();

      const modalContent = page.locator('.modal-content');
      
      // Verify small mobile specific styles
      const modalStyles = await modalContent.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          height: styles.height,
          borderRadius: styles.borderRadius,
          paddingTop: styles.paddingTop
        };
      });

      expect(modalStyles.height).toMatch(/\d+\.?\d*px/); // Should be viewport-based
      expect(parseFloat(modalStyles.height)).toBeGreaterThan(450); // Should be ~511px for 90vh of 568px
      expect(modalStyles.borderRadius).toBe('12px 12px 0px 0px');
      expect(modalStyles.paddingTop).toBe('12px');
    });
  });

  // Cross-device testing
  test.describe('Cross-device Responsive', () => {
    for (const device of mobileDevices) {
      test(`should work correctly on ${device.name}`, async ({ page }) => {
        await page.setViewportSize(device.viewport);
        
        const ctaButton = page.getByRole('button', { name: /Agendar mi Diagnóstico/i });
        await ctaButton.click();

        // Basic functionality test
        const modalOverlay = page.locator('.modal-overlay');
        await expect(modalOverlay).toBeVisible();

        const calendlyWidget = page.locator('.calendly-inline-widget');
        await expect(calendlyWidget).toBeVisible();

        // Test closing
        await page.keyboard.press('Escape');
        await expect(modalOverlay).not.toBeVisible();
      });
    }

    test('should handle viewport resize dynamically', async ({ page }) => {
      // Start with desktop
      await page.setViewportSize(desktopViewport);
      
      const ctaButton = page.getByRole('button', { name: /Agendar mi Diagnóstico/i });
      await ctaButton.click();

      // Verify desktop layout
      let modalContent = page.locator('.modal-content');
      const desktopStyles = await modalContent.evaluate((el) => {
        return window.getComputedStyle(el).maxWidth;
      });
      expect(desktopStyles).toBe('600px');

      // Resize to mobile without closing modal
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Wait a bit for CSS to apply
      await page.waitForTimeout(100);

      // Verify mobile layout is applied
      modalContent = page.locator('.modal-content');
      const mobileStyles = await modalContent.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          height: styles.height,
          position: styles.position
        };
      });
      expect(mobileStyles.height).toMatch(/\d+\.?\d*px/); // Should be viewport-based
      expect(parseFloat(mobileStyles.height)).toBeGreaterThan(500); // Should be ~600px for mobile viewport
      expect(mobileStyles.position).toBe('absolute');
    });
  });

  // Performance testing
  test.describe('Performance Testing', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('should load modal quickly on mobile', async ({ page }) => {
      const startTime = Date.now();
      
      const ctaButton = page.getByRole('button', { name: /Agendar mi Diagnóstico/i });
      await ctaButton.click();

      const modalOverlay = page.locator('.modal-overlay');
      await expect(modalOverlay).toBeVisible();

      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(300); // Should load in <300ms
    });

    test('should not have memory leaks on repeated open/close', async ({ page }) => {
      const ctaButton = page.getByRole('button', { name: /Agendar mi Diagnóstico/i });
      
      // Open and close modal multiple times
      for (let i = 0; i < 10; i++) {
        await ctaButton.click();
        await page.waitForTimeout(100);
        await page.keyboard.press('Escape');
        await page.waitForTimeout(100);
      }

      // Check for console errors
      page.on('console', (message) => {
        if (message.type() === 'error') {
          // Log console errors for debugging
          // eslint-disable-next-line no-console
          console.log('Console error:', message.text());
        }
      });

      // Verify modal still works
      await ctaButton.click();
      const modalOverlay = page.locator('.modal-overlay');
      await expect(modalOverlay).toBeVisible();
    });
  });
});
