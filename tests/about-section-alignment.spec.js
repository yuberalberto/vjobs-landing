import { test, expect } from '@playwright/test';

test.describe('About Section - Image and Text Alignment', () => {
  test('should align image and text at the top in desktop view', async ({ page }) => {
    // Navigate to the About section
    await page.goto('http://localhost:3000');
    
    // Get desktop viewport (993px width to trigger desktop layout)
    await page.setViewportSize({ width: 1200, height: 800 });
    
    // Wait for the About section to be visible - use the specific class
    const aboutSection = page.locator('section.about#about');
    await expect(aboutSection).toBeVisible();
    
    // Get the image and text elements
    const imageWrapper = page.locator('.about-image .image-wrapper');
    const textContent = page.locator('.about-text');
    
    // Get their top positions
    const imageTop = await imageWrapper.evaluate(el => el.getBoundingClientRect().top);
    const textTop = await textContent.evaluate(el => el.getBoundingClientRect().top);
    
    // Get the container's top position for reference
    const container = page.locator('.about-content');
    const containerTop = await container.evaluate(el => el.getBoundingClientRect().top);
    
    // Calculate offsets from container
    const imageOffset = imageTop - containerTop;
    const textOffset = textTop - containerTop;
    
    // Verify both elements are aligned at the top (within 20px tolerance)
    const alignmentDifference = Math.abs(imageTop - textTop);
    expect(alignmentDifference).toBeLessThan(20);
    
    // Take a screenshot for visual verification
    await page.screenshot({ 
      path: 'test-results/about-alignment-desktop.png',
      fullPage: false 
    });
    
    console.log('✅ Desktop alignment test passed');
  });

  test('should stack image and text in mobile view', async ({ page }) => {
    // Navigate to the About section
    await page.goto('http://localhost:3000');
    
    // Get mobile viewport (768px width to trigger mobile layout)
    await page.setViewportSize({ width: 375, height: 800 });
    
    // Wait for the About section to be visible - use the specific class
    const aboutSection = page.locator('section.about#about');
    await expect(aboutSection).toBeVisible();
    
    // Get the about-grid to verify it's in flex column layout
    const aboutGrid = page.locator('.about-grid');
    const gridDisplay = await aboutGrid.evaluate(el => window.getComputedStyle(el).display);
    const gridFlexDirection = await aboutGrid.evaluate(el => window.getComputedStyle(el).flexDirection);
    
    // Verify mobile layout (should be flex with column direction)
    expect(gridDisplay).toBe('flex');
    expect(gridFlexDirection).toBe('column');
    
    // Take a screenshot for visual verification
    await page.screenshot({ 
      path: 'test-results/about-alignment-mobile.png',
      fullPage: false 
    });
    
    console.log('✅ Mobile stacking test passed');
  });
});
