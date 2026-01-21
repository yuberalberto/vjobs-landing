const { test, expect } = require('@playwright/test');

test.describe('Tab Buttons Stress Test', () => {
  test('should handle rapid alternating clicks without UI blocking', async ({ page }) => {
    // Configure iPhone 12 viewport
    await page.setViewportSize({ width: 390, height: 844 });
    
    // Navigate to the site
    await page.goto('http://localhost:3000');
    
    // Wait for page to load and scroll to services section
    await page.waitForLoadState('networkidle');
    await page.locator('section.services#services').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000); // Wait for animations to settle
    
    // Find the tab buttons
    const canadaButton = page.locator('button:has-text("Busco Empleo En Canadá")');
    const itButton = page.locator('button:has-text("Quiero Transicionar a IT")');
    
    // Verify buttons exist and are visible
    await expect(canadaButton).toBeVisible();
    await expect(itButton).toBeVisible();
    
    // Performance monitoring setup
    const performanceMetrics = {
      clickTimes: [],
      responseTimes: [],
      memoryUsage: [],
      consoleErrors: [],
      consoleWarnings: [],
      eventListenersCount: []
    };
    
    // Console monitoring
    const consoleMessages = [];
    page.on('console', msg => {
      const message = {
        type: msg.type(),
        text: msg.text(),
        location: msg.location()
      };
      consoleMessages.push(message);
      
      if (msg.type() === 'error') {
        performanceMetrics.consoleErrors.push(message);
      } else if (msg.type() === 'warning') {
        performanceMetrics.consoleWarnings.push(message);
      }
    });
    
    // Function to check event listeners count
    const getEventListenerCount = async () => {
      return await page.evaluate(() => {
        const buttons = document.querySelectorAll('.tab-button');
        let totalListeners = 0;
        buttons.forEach(button => {
          // This is a rough estimation - we can't directly count listeners
          // but we can check if the element has event properties
          if (button.onclick || button.onmousedown || button.onmouseup || button.ontouchstart) {
            totalListeners++;
          }
        });
        return totalListeners;
      });
    };
    
    // Function to get memory usage
    const getMemoryUsage = async () => {
      return await page.evaluate(() => {
        if (performance.memory) {
          return {
            usedJSHeapSize: performance.memory.usedJSHeapSize,
            totalJSHeapSize: performance.memory.totalJSHeapSize,
            jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
          };
        }
        return null;
      });
    };
    
    // Function to check if buttons are responsive
    const areButtonsResponsive = async () => {
      try {
        // Check if buttons have the expected classes and are clickable
        const canadaVisible = await canadaButton.isVisible();
        const itVisible = await itButton.isVisible();
        const canadaEnabled = await canadaButton.isEnabled();
        const itEnabled = await itButton.isEnabled();
        
        return canadaVisible && itVisible && canadaEnabled && itEnabled;
      } catch (error) {
        return false;
      }
    };
    
    // Initial measurements
    const initialMemory = await getMemoryUsage();
    const initialListeners = await getEventListenerCount();
    
    console.log('🚀 Starting stress test...');
    console.log(`Initial memory usage: ${initialMemory ? Math.round(initialMemory.usedJSHeapSize / 1024 / 1024) : 'N/A'} MB`);
    console.log(`Initial event listeners: ${initialListeners}`);
    
    // Perform 20 rapid alternating clicks
    let blockingIteration = null;
    let lastResponsiveIteration = 0;
    
    for (let i = 1; i <= 20; i++) {
      const iterationStart = performance.now();
      
      try {
        // Click Canada button with force option to handle overlay elements
        const canadaClickStart = performance.now();
        await canadaButton.click({ timeout: 2000, force: true });
        const canadaClickEnd = performance.now();
        
        // Small delay to simulate rapid but realistic clicking
        await page.waitForTimeout(50);
        
        // Click IT button with force option
        const itClickStart = performance.now();
        await itButton.click({ timeout: 2000, force: true });
        const itClickEnd = performance.now();
        
        const iterationEnd = performance.now();
        const totalIterationTime = iterationEnd - iterationStart;
        
        // Store performance metrics
        performanceMetrics.clickTimes.push({
          iteration: i,
          canadaTime: canadaClickEnd - canadaClickStart,
          itTime: itClickEnd - itClickStart,
          totalTime: totalIterationTime
        });
        
        // Check responsiveness after each iteration
        const isResponsive = await areButtonsResponsive();
        if (isResponsive) {
          lastResponsiveIteration = i;
        } else if (!blockingIteration) {
          blockingIteration = i;
          console.log(`🚨 BUTTONS BECAME UNRESPONSIVE AT ITERATION ${i}`);
        }
        
        // Monitor memory usage every 5 iterations
        if (i % 5 === 0) {
          const currentMemory = await getMemoryUsage();
          const currentListeners = await getEventListenerCount();
          
          if (currentMemory) {
            performanceMetrics.memoryUsage.push({
              iteration: i,
              usedJSHeapSize: currentMemory.usedJSHeapSize,
              totalJSHeapSize: currentMemory.totalJSHeapSize
            });
            
            console.log(`📊 Iteration ${i}: Memory: ${Math.round(currentMemory.usedJSHeapSize / 1024 / 1024)} MB, Listeners: ${currentListeners}`);
          }
        }
        
        console.log(`✅ Iteration ${i}: Canada click: ${(canadaClickEnd - canadaClickStart).toFixed(2)}ms, IT click: ${(itClickEnd - itClickStart).toFixed(2)}ms, Total: ${totalIterationTime.toFixed(2)}ms`);
        
        // Check for performance degradation after iteration 5
        if (i > 5 && i % 5 === 0) {
          const avgTimeFirst5 = performanceMetrics.clickTimes.slice(0, 5).reduce((sum, metric) => sum + metric.totalTime, 0) / 5;
          const avgTimeLast5 = performanceMetrics.clickTimes.slice(-5).reduce((sum, metric) => sum + metric.totalTime, 0) / 5;
          const degradation = ((avgTimeLast5 - avgTimeFirst5) / avgTimeFirst5) * 100;
          
          console.log(`📈 Performance degradation after iteration ${i}: ${degradation.toFixed(1)}%`);
          
          if (degradation > 50) {
            console.log(`⚠️  Significant performance degradation detected: ${degradation.toFixed(1)}%`);
          }
        }
        
      } catch (error) {
        console.log(`❌ ERROR AT ITERATION ${i}: ${error.message}`);
        blockingIteration = i;
        break;
      }
      
      // Very small delay between iterations to simulate rapid clicking
      await page.waitForTimeout(25);
    }
    
    // Final measurements
    const finalMemory = await getMemoryUsage();
    const finalListeners = await getEventListenerCount();
    
    console.log('\n📋 STRESS TEST RESULTS:');
    console.log('========================');
    
    // Responsiveness results
    if (blockingIteration) {
      console.log(`🚨 UI BLOCKING: Buttons stopped responding at iteration ${blockingIteration}`);
    } else {
      console.log('✅ UI RESPONSIVENESS: All buttons remained responsive throughout test');
    }
    
    // Performance analysis
    if (performanceMetrics.clickTimes.length > 5) {
      const avgTimeFirst5 = performanceMetrics.clickTimes.slice(0, 5).reduce((sum, metric) => sum + metric.totalTime, 0) / 5;
      const avgTimeLast5 = performanceMetrics.clickTimes.slice(-5).reduce((sum, metric) => sum + metric.totalTime, 0) / 5;
      const degradation = ((avgTimeLast5 - avgTimeFirst5) / avgTimeFirst5) * 100;
      
      console.log(`📊 PERFORMANCE: Avg time first 5 iterations: ${avgTimeFirst5.toFixed(2)}ms`);
      console.log(`📊 PERFORMANCE: Avg time last 5 iterations: ${avgTimeLast5.toFixed(2)}ms`);
      console.log(`📊 PERFORMANCE: Performance degradation: ${degradation.toFixed(1)}%`);
      
      if (degradation > 20) {
        console.log('⚠️  WARNING: Significant performance degradation detected!');
      }
    }
    
    // Memory analysis
    if (finalMemory && initialMemory) {
      const memoryIncrease = finalMemory.usedJSHeapSize - initialMemory.usedJSHeapSize;
      const memoryIncreaseMB = Math.round(memoryIncrease / 1024 / 1024);
      
      console.log(`💾 MEMORY: Initial: ${Math.round(initialMemory.usedJSHeapSize / 1024 / 1024)} MB`);
      console.log(`💾 MEMORY: Final: ${Math.round(finalMemory.usedJSHeapSize / 1024 / 1024)} MB`);
      console.log(`💾 MEMORY: Increase: ${memoryIncreaseMB} MB`);
      
      if (memoryIncreaseMB > 10) {
        console.log('⚠️  WARNING: Significant memory increase detected!');
      }
    }
    
    // Event listeners analysis
    console.log(`👂 EVENT LISTENERS: Initial: ${initialListeners}, Final: ${finalListeners}`);
    if (finalListeners > initialListeners * 2) {
      console.log('⚠️  WARNING: Event listeners may be accumulating!');
    }
    
    // Console errors and warnings
    if (performanceMetrics.consoleErrors.length > 0) {
      console.log(`🚨 CONSOLE ERRORS (${performanceMetrics.consoleErrors.length}):`);
      performanceMetrics.consoleErrors.forEach(error => {
        console.log(`   - ${error.text}`);
      });
    }
    
    if (performanceMetrics.consoleWarnings.length > 0) {
      console.log(`⚠️  CONSOLE WARNINGS (${performanceMetrics.consoleWarnings.length}):`);
      performanceMetrics.consoleWarnings.forEach(warning => {
        console.log(`   - ${warning.text}`);
      });
    }
    
    // Check for specific error patterns
    const stackOverflowErrors = performanceMetrics.consoleErrors.filter(error => 
      error.text.includes('Maximum call stack size exceeded') || 
      error.text.includes('stack overflow')
    );
    
    if (stackOverflowErrors.length > 0) {
      console.log('🚨 CRITICAL: Stack overflow errors detected!');
    }
    
    // Final responsiveness check
    const finalResponsiveness = await areButtonsResponsive();
    console.log(`🔍 FINAL RESPONSIVENESS: ${finalResponsiveness ? '✅ Responsive' : '❌ Unresponsive'}`);
    
    // Take a screenshot at the end for visual verification
    await page.screenshot({ path: 'stress-test-final.png', fullPage: true });
    console.log('📸 Final screenshot saved as stress-test-final.png');
    
    // Assertions for test failure
    expect(blockingIteration).toBeNull();
    expect(finalResponsiveness).toBe(true);
    expect(stackOverflowErrors.length).toBe(0);
  });
});
