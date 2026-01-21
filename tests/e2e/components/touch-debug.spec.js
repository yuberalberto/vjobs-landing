const { test, expect, devices } = require('@playwright/test');

test.use(devices['iPhone 12']);

test.describe('Touch Event Debugging - Tab Buttons', () => {
  test('should debug which tab blocks and why', async ({ page }) => {
    console.log('🔍 Starting touch event debugging...');
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Scroll to services section
    await page.locator('section.services#services').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    
    // Get both buttons
    const canadaButton = page.locator('button:has-text("Busco Empleo En Canadá")');
    const itButton = page.locator('button:has-text("Quiero Transicionar a IT")');
    
    console.log('\n📊 Initial State Check:');
    
    // Check initial states
    const canadaInitialClass = await canadaButton.getAttribute('class');
    const itInitialClass = await itButton.getAttribute('class');
    
    console.log(`Canada button classes: ${canadaInitialClass}`);
    console.log(`IT button classes: ${itInitialClass}`);
    
    // Check which tab is active initially
    const canadaActive = canadaInitialClass.includes('tab-active');
    const itActive = itInitialClass.includes('tab-active');
    
    console.log(`Canada active: ${canadaActive}`);
    console.log(`IT active: ${itActive}`);
    
    console.log('\n🎯 Testing Touch Events:');
    
    let blockingTab = null;
    let blockingIteration = null;
    
    for (let i = 1; i <= 20; i++) {
      try {
        // Try clicking Canada
        console.log(`\n--- Iteration ${i} ---`);
        console.log('Clicking Canada...');
        
        await canadaButton.click({ timeout: 3000 });
        await page.waitForTimeout(100);
        
        const canadaClassAfter = await canadaButton.getAttribute('class');
        const canadaActiveAfter = canadaClassAfter.includes('tab-active');
        console.log(`Canada active after click: ${canadaActiveAfter}`);
        
        if (!canadaActiveAfter) {
          console.log('⚠️ Canada button did NOT become active!');
        }
        
        // Try clicking IT
        console.log('Clicking IT...');
        await itButton.click({ timeout: 3000 });
        await page.waitForTimeout(100);
        
        const itClassAfter = await itButton.getAttribute('class');
        const itActiveAfter = itClassAfter.includes('tab-active');
        console.log(`IT active after click: ${itActiveAfter}`);
        
        if (!itActiveAfter) {
          console.log('⚠️ IT button did NOT become active!');
        }
        
      } catch (error) {
        console.log(`\n❌ BLOCKING DETECTED AT ITERATION ${i}`);
        console.log(`Error: ${error.message}`);
        
        // Determine which button blocked
        try {
          await canadaButton.click({ timeout: 1000 });
          blockingTab = 'IT';
          console.log('🔴 IT TAB IS BLOCKING');
        } catch {
          try {
            await itButton.click({ timeout: 1000 });
            blockingTab = 'Canada';
            console.log('🔴 CANADA TAB IS BLOCKING');
          } catch {
            blockingTab = 'Both';
            console.log('🔴 BOTH TABS ARE BLOCKING');
          }
        }
        
        blockingIteration = i;
        break;
      }
    }
    
    // Check for overlaying elements
    console.log('\n🔍 Checking for Overlaying Elements:');
    
    const overlayingElements = await page.evaluate(() => {
      const canadaBtn = document.querySelector('button:has-text("Busco Empleo En Canadá")');
      const itBtn = document.querySelector('button:has-text("Quiero Transicionar a IT")');
      
      const getOverlays = (element) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const elementAtPoint = document.elementFromPoint(centerX, centerY);
        
        return {
          expected: element.tagName,
          actual: elementAtPoint?.tagName,
          actualClass: elementAtPoint?.className,
          isBlocked: elementAtPoint !== element
        };
      };
      
      return {
        canada: getOverlays(canadaBtn),
        it: getOverlays(itBtn)
      };
    });
    
    console.log('Canada button overlay check:', overlayingElements.canada);
    console.log('IT button overlay check:', overlayingElements.it);
    
    // Check computed styles
    console.log('\n🎨 Checking Computed Styles:');
    
    const styles = await page.evaluate(() => {
      const canadaBtn = document.querySelector('button:has-text("Busco Empleo En Canadá")');
      const itBtn = document.querySelector('button:has-text("Quiero Transicionar a IT")');
      
      const getStyles = (element) => {
        const computed = window.getComputedStyle(element);
        return {
          pointerEvents: computed.pointerEvents,
          transition: computed.transition,
          zIndex: computed.zIndex,
          position: computed.position
        };
      };
      
      return {
        canada: getStyles(canadaBtn),
        it: getStyles(itBtn)
      };
    });
    
    console.log('Canada button styles:', styles.canada);
    console.log('IT button styles:', styles.it);
    
    // Final Summary
    console.log('\n📋 DEBUGGING SUMMARY:');
    console.log('===================');
    console.log(`Blocking occurred: ${blockingIteration !== null}`);
    console.log(`Blocking iteration: ${blockingIteration || 'None'}`);
    console.log(`Blocking tab: ${blockingTab || 'None'}`);
    console.log(`Canada overlay blocked: ${overlayingElements.canada.isBlocked}`);
    console.log(`IT overlay blocked: ${overlayingElements.it.isBlocked}`);
    
    // Take screenshot
    await page.screenshot({ path: 'touch-debug-final.png', fullPage: true });
    console.log('\n📸 Screenshot saved as touch-debug-final.png');
  });
});
