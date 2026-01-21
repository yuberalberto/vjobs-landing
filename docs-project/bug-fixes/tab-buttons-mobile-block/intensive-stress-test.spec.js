const { test, expect } = require('@playwright/test');

test.describe('Intensive Tab Buttons Stress Test', () => {
  test('should handle ultra-rapid clicking to reproduce UI blocking', async ({ page }) => {
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
    
    // Enhanced monitoring setup
    const performanceMetrics = {
      clickTimes: [],
      responseTimes: [],
      memoryUsage: [],
      consoleErrors: [],
      consoleWarnings: [],
      domChanges: [],
      vueReactivityIssues: [],
      buttonStates: []
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
    
    // Monitor DOM mutations
    await page.evaluate(() => {
      const observer = new MutationObserver((mutations) => {
        window.domMutationCount = (window.domMutationCount || 0) + mutations.length;
      });
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true
      });
      window.domMutationCount = 0;
    });
    
    // Function to check Vue reactivity state
    const getVueReactivityState = async () => {
      return await page.evaluate(() => {
        // Try to access Vue app state if available
        const buttons = document.querySelectorAll('.tab-button');
        const states = [];
        buttons.forEach(button => {
          states.push({
            active: button.classList.contains('tab-active'),
            disabled: button.disabled,
            computedStyle: window.getComputedStyle(button).pointerEvents
          });
        });
        return states;
      });
    };
    
    // Function to get detailed memory usage
    const getDetailedMemoryUsage = async () => {
      return await page.evaluate(() => {
        if (performance.memory) {
          return {
            usedJSHeapSize: performance.memory.usedJSHeapSize,
            totalJSHeapSize: performance.memory.totalJSHeapSize,
            jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
            domNodes: document.querySelectorAll('*').length,
            eventListeners: window.domMutationCount || 0
          };
        }
        return null;
      });
    };
    
    // Function to check if buttons are truly responsive
    const areButtonsTrulyResponsive = async () => {
      try {
        // Check multiple aspects of responsiveness
        const canadaVisible = await canadaButton.isVisible();
        const itVisible = await itButton.isVisible();
        const canadaEnabled = await canadaButton.isEnabled();
        const itEnabled = await itButton.isEnabled();
        const canadaClickable = await canadaButton.isClickable();
        const itClickable = await itButton.isClickable();
        
        // Check if buttons have proper event handlers
        const hasEventHandlers = await page.evaluate(() => {
          const buttons = document.querySelectorAll('.tab-button');
          return Array.from(buttons).every(button => {
            return button.onclick || button.getAttribute('@click') || button.__vueParentComponent;
          });
        });
        
        return canadaVisible && itVisible && canadaEnabled && itEnabled && 
               canadaClickable && itClickable && hasEventHandlers;
      } catch (error) {
        return false;
      }
    };
    
    console.log('🚀 Starting INTENSIVE stress test...');
    
    // Initial measurements
    const initialMemory = await getDetailedMemoryUsage();
    const initialState = await getVueReactivityState();
    
    console.log(`Initial memory: ${initialMemory ? Math.round(initialMemory.usedJSHeapSize / 1024 / 1024) : 'N/A'} MB`);
    console.log(`Initial DOM nodes: ${initialMemory ? initialMemory.domNodes : 'N/A'}`);
    
    // ULTRA RAPID CLICKING TEST - 50 iterations with minimal delay
    let blockingIteration = null;
    let lastResponsiveIteration = 0;
    
    for (let i = 1; i <= 50; i++) {
      const iterationStart = performance.now();
      
      try {
        // Click Canada button rapidly
        const canadaClickStart = performance.now();
        await canadaButton.click({ timeout: 500, force: true });
        const canadaClickEnd = performance.now();
        
        // Minimal delay for ultra-rapid testing
        await page.waitForTimeout(10);
        
        // Click IT button rapidly
        const itClickStart = performance.now();
        await itButton.click({ timeout: 500, force: true });
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
        
        // Check responsiveness more frequently
        if (i % 2 === 0) {
          const isResponsive = await areButtonsTrulyResponsive();
          const vueState = await getVueReactivityState();
          
          performanceMetrics.buttonStates.push({
            iteration: i,
            responsive: isResponsive,
            vueState: vueState
          });
          
          if (isResponsive) {
            lastResponsiveIteration = i;
          } else if (!blockingIteration) {
            blockingIteration = i;
            console.log(`🚨 BUTTONS BECAME UNRESPONSIVE AT ITERATION ${i}`);
          }
        }
        
        // Monitor memory and DOM changes every 10 iterations
        if (i % 10 === 0) {
          const currentMemory = await getDetailedMemoryUsage();
          const domMutations = await page.evaluate(() => window.domMutationCount || 0);
          
          if (currentMemory) {
            performanceMetrics.memoryUsage.push({
              iteration: i,
              usedJSHeapSize: currentMemory.usedJSHeapSize,
              totalJSHeapSize: currentMemory.totalJSHeapSize,
              domNodes: currentMemory.domNodes,
              domMutations: domMutations
            });
            
            console.log(`📊 Iteration ${i}: Memory: ${Math.round(currentMemory.usedJSHeapSize / 1024 / 1024)} MB, DOM nodes: ${currentMemory.domNodes}, Mutations: ${domMutations}`);
          }
        }
        
        if (i <= 10 || i % 10 === 0) {
          console.log(`✅ Iteration ${i}: Canada: ${(canadaClickEnd - canadaClickStart).toFixed(2)}ms, IT: ${(itClickEnd - itClickStart).toFixed(2)}ms, Total: ${totalIterationTime.toFixed(2)}ms`);
        }
        
        // Check for performance degradation
        if (i > 10 && i % 10 === 0) {
          const avgTimeFirst10 = performanceMetrics.clickTimes.slice(0, 10).reduce((sum, metric) => sum + metric.totalTime, 0) / 10;
          const avgTimeLast10 = performanceMetrics.clickTimes.slice(-10).reduce((sum, metric) => sum + metric.totalTime, 0) / 10;
          const degradation = ((avgTimeLast10 - avgTimeFirst10) / avgTimeFirst10) * 100;
          
          console.log(`📈 Performance degradation after iteration ${i}: ${degradation.toFixed(1)}%`);
          
          if (degradation > 100) {
            console.log(`⚠️  CRITICAL: Performance degradation over 100% detected!`);
          }
        }
        
      } catch (error) {
        console.log(`❌ ERROR AT ITERATION ${i}: ${error.message}`);
        blockingIteration = i;
        break;
      }
      
      // Ultra minimal delay for stress testing
      await page.waitForTimeout(5);
    }
    
    // Final measurements
    const finalMemory = await getDetailedMemoryUsage();
    const finalState = await getVueReactivityState();
    const finalResponsiveness = await areButtonsTrulyResponsive();
    
    console.log('\n📋 INTENSIVE STRESS TEST RESULTS:');
    console.log('===================================');
    
    // Responsiveness analysis
    if (blockingIteration) {
      console.log(`🚨 UI BLOCKING: Buttons stopped responding at iteration ${blockingIteration}`);
    } else {
      console.log('✅ UI RESPONSIVENESS: All buttons remained responsive throughout test');
    }
    
    // Performance analysis
    if (performanceMetrics.clickTimes.length > 10) {
      const avgTimeFirst10 = performanceMetrics.clickTimes.slice(0, 10).reduce((sum, metric) => sum + metric.totalTime, 0) / 10;
      const avgTimeLast10 = performanceMetrics.clickTimes.slice(-10).reduce((sum, metric) => sum + metric.totalTime, 0) / 10;
      const degradation = ((avgTimeLast10 - avgTimeFirst10) / avgTimeFirst10) * 100;
      
      console.log(`📊 PERFORMANCE: Avg time first 10 iterations: ${avgTimeFirst10.toFixed(2)}ms`);
      console.log(`📊 PERFORMANCE: Avg time last 10 iterations: ${avgTimeLast10.toFixed(2)}ms`);
      console.log(`📊 PERFORMANCE: Performance degradation: ${degradation.toFixed(1)}%`);
    }
    
    // Memory analysis
    if (finalMemory && initialMemory) {
      const memoryIncrease = finalMemory.usedJSHeapSize - initialMemory.usedJSHeapSize;
      const memoryIncreaseMB = Math.round(memoryIncrease / 1024 / 1024);
      const domIncrease = finalMemory.domNodes - initialMemory.domNodes;
      
      console.log(`💾 MEMORY: Initial: ${Math.round(initialMemory.usedJSHeapSize / 1024 / 1024)} MB, Final: ${Math.round(finalMemory.usedJSHeapSize / 1024 / 1024)} MB`);
      console.log(`💾 MEMORY: Increase: ${memoryIncreaseMB} MB`);
      console.log(`🌳 DOM: Initial: ${initialMemory.domNodes} nodes, Final: ${finalMemory.domNodes} nodes`);
      console.log(`🌳 DOM: Increase: ${domIncrease} nodes`);
      
      if (memoryIncreaseMB > 20) {
        console.log('⚠️  WARNING: Significant memory leak detected!');
      }
      
      if (domIncrease > 100) {
        console.log('⚠️  WARNING: Excessive DOM node creation detected!');
      }
    }
    
    // Console errors analysis
    if (performanceMetrics.consoleErrors.length > 0) {
      console.log(`🚨 CONSOLE ERRORS (${performanceMetrics.consoleErrors.length}):`);
      performanceMetrics.consoleErrors.forEach(error => {
        console.log(`   - ${error.text}`);
      });
    }
    
    // Check for specific error patterns
    const stackOverflowErrors = performanceMetrics.consoleErrors.filter(error => 
      error.text.includes('Maximum call stack size exceeded') || 
      error.text.includes('stack overflow')
    );
    
    const vueReactivityErrors = performanceMetrics.consoleErrors.filter(error => 
      error.text.includes('vue') || 
      error.text.includes('reactivity') ||
      error.text.includes('component')
    );
    
    if (stackOverflowErrors.length > 0) {
      console.log('🚨 CRITICAL: Stack overflow errors detected!');
    }
    
    if (vueReactivityErrors.length > 0) {
      console.log('⚠️  VUE REACTIVITY ERRORS:');
      vueReactivityErrors.forEach(error => console.log(`   - ${error.text}`));
    }
    
    console.log(`🔍 FINAL RESPONSIVENESS: ${finalResponsiveness ? '✅ Responsive' : '❌ Unresponsive'}`);
    
    // Take screenshot for visual verification
    await page.screenshot({ path: 'intensive-stress-test-final.png', fullPage: true });
    console.log('📸 Final screenshot saved as intensive-stress-test-final.png');
    
    // Test assertions
    expect(blockingIteration).toBeNull();
    expect(finalResponsiveness).toBe(true);
    expect(stackOverflowErrors.length).toBe(0);
    
    if (finalMemory && initialMemory) {
      const memoryIncreaseMB = Math.round((finalMemory.usedJSHeapSize - initialMemory.usedJSHeapSize) / 1024 / 1024);
      expect(memoryIncreaseMB).toBeLessThan(50); // Allow some memory increase but not excessive
    }
  });
});
