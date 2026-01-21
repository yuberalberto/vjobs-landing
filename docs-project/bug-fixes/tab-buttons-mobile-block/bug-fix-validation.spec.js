const { test, expect } = require('@playwright/test');

test.describe('Bug Fix Validation - Tab Buttons', () => {
  test('should handle rapid tab switching without UI blocking after fix', async ({ page }) => {
    // Configure iPhone 12 viewport
    await page.setViewportSize({ width: 390, height: 844 });
    
    // Navigate to the site
    await page.goto('http://localhost:3000');
    
    // Wait for page to load and scroll to services section
    await page.waitForLoadState('networkidle');
    await page.locator('section.services#services').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    
    // Find the tab buttons
    const canadaButton = page.locator('button:has-text("Busco Empleo En Canadá")');
    const itButton = page.locator('button:has-text("Quiero Transicionar a IT")');
    
    // Verify buttons exist and are visible
    await expect(canadaButton).toBeVisible();
    await expect(itButton).toBeVisible();
    
    console.log('🔧 VALIDATION: Testing bug fix for tab button UI blocking...');
    
    // Performance monitoring
    const performanceMetrics = {
      clickTimes: [],
      errors: [],
      responsiveStates: []
    };
    
    // Console monitoring
    page.on('console', msg => {
      if (msg.type() === 'error') {
        performanceMetrics.errors.push({
          text: msg.text(),
          location: msg.location()
        });
      }
    });
    
    // Function to check if buttons are responsive
    const areButtonsResponsive = async () => {
      try {
        const canadaVisible = await canadaButton.isVisible();
        const itVisible = await itButton.isVisible();
        const canadaEnabled = await canadaButton.isEnabled();
        const itEnabled = await itButton.isEnabled();
        const canadaClickable = await canadaButton.isClickable();
        const itClickable = await itButton.isClickable();
        
        return canadaVisible && itVisible && canadaEnabled && itEnabled && 
               canadaClickable && itClickable;
      } catch (error) {
        return false;
      }
    };
    
    // Test 1: Standard rapid clicking (original failing scenario)
    console.log('\n📊 Test 1: Standard rapid clicking (20 iterations)');
    let blockingIteration = null;
    
    for (let i = 1; i <= 20; i++) {
      const iterationStart = performance.now();
      
      try {
        // Rapid alternating clicks
        await canadaButton.click({ force: true });
        await page.waitForTimeout(10); // Minimal delay
        await itButton.click({ force: true });
        await page.waitForTimeout(10);
        
        const iterationEnd = performance.now();
        const totalTime = iterationEnd - iterationStart;
        
        performanceMetrics.clickTimes.push({
          iteration: i,
          totalTime: totalTime
        });
        
        // Check responsiveness every 2 iterations
        if (i % 2 === 0) {
          const isResponsive = await areButtonsResponsive();
          performanceMetrics.responsiveStates.push({
            iteration: i,
            responsive: isResponsive
          });
          
          if (!isResponsive && !blockingIteration) {
            blockingIteration = i;
            console.log(`🚨 UI BLOCKING DETECTED AT ITERATION ${i}`);
          }
        }
        
        if (i <= 5 || i % 5 === 0) {
          console.log(`✅ Iteration ${i}: ${totalTime.toFixed(2)}ms`);
        }
        
      } catch (error) {
        console.log(`❌ ERROR AT ITERATION ${i}: ${error.message}`);
        blockingIteration = i;
        break;
      }
    }
    
    // Test 2: Ultra-rapid stress test
    console.log('\n📊 Test 2: Ultra-rapid stress test (50 iterations)');
    let ultraRapidBlocking = null;
    
    for (let i = 1; i <= 50; i++) {
      try {
        // Ultra-rapid clicking
        await canadaButton.click({ force: true });
        await page.waitForTimeout(5); // Even shorter delay
        await itButton.click({ force: true });
        await page.waitForTimeout(5);
        
        // Check responsiveness every 5 iterations
        if (i % 5 === 0) {
          const isResponsive = await areButtonsResponsive();
          if (!isResponsive && !ultraRapidBlocking) {
            ultraRapidBlocking = i;
            console.log(`🚨 ULTRA-RAPID BLOCKING AT ITERATION ${i}`);
          }
        }
        
        if (i % 10 === 0) {
          console.log(`✅ Ultra-rapid iteration ${i} completed`);
        }
        
      } catch (error) {
        console.log(`❌ ULTRA-RAPID ERROR AT ITERATION ${i}: ${error.message}`);
        ultraRapidBlocking = i;
        break;
      }
    }
    
    // Test 3: Normal user behavior simulation
    console.log('\n📊 Test 3: Normal user behavior simulation');
    let normalBlocking = null;
    
    for (let i = 1; i <= 10; i++) {
      try {
        // More realistic clicking speed
        await canadaButton.click();
        await page.waitForTimeout(200); // Realistic user delay
        await itButton.click();
        await page.waitForTimeout(200);
        
        const isResponsive = await areButtonsResponsive();
        if (!isResponsive && !normalBlocking) {
          normalBlocking = i;
          console.log(`🚨 NORMAL BEHAVIOR BLOCKING AT ITERATION ${i}`);
        }
        
        console.log(`✅ Normal iteration ${i} completed`);
        
      } catch (error) {
        console.log(`❌ NORMAL BEHAVIOR ERROR AT ITERATION ${i}: ${error.message}`);
        normalBlocking = i;
        break;
      }
    }
    
    // Final validation
    console.log('\n📋 VALIDATION RESULTS:');
    console.log('==========================');
    
    // Test 1 Results
    if (blockingIteration) {
      console.log(`❌ Test 1 FAILED: Blocking detected at iteration ${blockingIteration}`);
    } else {
      console.log('✅ Test 1 PASSED: No blocking in standard rapid clicking');
    }
    
    // Test 2 Results
    if (ultraRapidBlocking) {
      console.log(`❌ Test 2 FAILED: Ultra-rapid blocking at iteration ${ultraRapidBlocking}`);
    } else {
      console.log('✅ Test 2 PASSED: No blocking in ultra-rapid stress test');
    }
    
    // Test 3 Results
    if (normalBlocking) {
      console.log(`❌ Test 3 FAILED: Normal behavior blocking at iteration ${normalBlocking}`);
    } else {
      console.log('✅ Test 3 PASSED: No blocking in normal user behavior');
    }
    
    // Performance Analysis
    if (performanceMetrics.clickTimes.length > 0) {
      const avgTime = performanceMetrics.clickTimes.reduce((sum, metric) => sum + metric.totalTime, 0) / performanceMetrics.clickTimes.length;
      const maxTime = Math.max(...performanceMetrics.clickTimes.map(m => m.totalTime));
      const minTime = Math.min(...performanceMetrics.clickTimes.map(m => m.totalTime));
      
      console.log(`📊 PERFORMANCE: Avg: ${avgTime.toFixed(2)}ms, Min: ${minTime.toFixed(2)}ms, Max: ${maxTime.toFixed(2)}ms`);
    }
    
    // Error Analysis
    if (performanceMetrics.errors.length > 0) {
      console.log(`🚨 ERRORS: ${performanceMetrics.errors.length} console errors detected`);
      performanceMetrics.errors.forEach(error => {
        console.log(`   - ${error.text}`);
      });
    } else {
      console.log('✅ ERRORS: No console errors detected');
    }
    
    // Final responsiveness check
    const finalResponsiveness = await areButtonsResponsive();
    console.log(`🔍 FINAL RESPONSIVENESS: ${finalResponsiveness ? '✅ Responsive' : '❌ Unresponsive'}`);
    
    // Take screenshot for verification
    await page.screenshot({ path: 'bug-fix-validation.png', fullPage: true });
    console.log('📸 Validation screenshot saved as bug-fix-validation.png');
    
    // Overall assessment
    const allTestsPassed = !blockingIteration && !ultraRapidBlocking && !normalBlocking && finalResponsiveness;
    
    if (allTestsPassed) {
      console.log('\n🎉 BUG FIX VALIDATION: SUCCESSFUL');
      console.log('✅ All tests passed - the bug appears to be fixed!');
      console.log('✅ Tab buttons now handle rapid clicking without UI blocking');
      console.log('✅ Rate limiting no longer interferes with tab navigation');
    } else {
      console.log('\n⚠️  BUG FIX VALIDATION: PARTIAL SUCCESS');
      console.log('❌ Some issues still detected - further investigation needed');
    }
    
    // Test assertions
    expect(blockingIteration).toBeNull();
    expect(ultraRapidBlocking).toBeNull();
    expect(normalBlocking).toBeNull();
    expect(finalResponsiveness).toBe(true);
    expect(performanceMetrics.errors.length).toBe(0);
  });
});
