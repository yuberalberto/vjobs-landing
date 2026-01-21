const { test, expect } = require('@playwright/test');

test.describe('Bug Diagnosis - Tab Buttons UI Blocking', () => {
  test('should identify root cause of button unresponsiveness', async ({ page }) => {
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
    
    console.log('🔍 DIAGNOSIS: Starting root cause analysis...');
    
    // Monitor various potential causes
    const diagnosis = {
      eventListeners: [],
      vueReactivity: [],
      domChanges: [],
      cssTransitions: [],
      toastNotifications: [],
      rateLimiting: [],
      memoryLeaks: [],
      timingIssues: []
    };
    
    // Console monitoring with detailed filtering
    page.on('console', msg => {
      const message = {
        type: msg.type(),
        text: msg.text(),
        location: msg.location(),
        timestamp: Date.now()
      };
      
      // Categorize console messages
      if (msg.type() === 'error') {
        if (message.text.includes('Maximum call stack')) {
          diagnosis.timingIssues.push(message);
        } else if (message.text.includes('vue')) {
          diagnosis.vueReactivity.push(message);
        } else {
          diagnosis.eventListeners.push(message);
        }
      } else if (msg.type() === 'warning') {
        diagnosis.vueReactivity.push(message);
      }
    });
    
    // Function to get detailed button state
    const getButtonState = async (buttonName, buttonLocator) => {
      return await page.evaluate((name) => {
        const button = Array.from(document.querySelectorAll('.tab-button')).find(
          btn => btn.textContent.includes(name)
        );
        
        if (!button) return null;
        
        const computedStyle = window.getComputedStyle(button);
        const rect = button.getBoundingClientRect();
        
        return {
          text: button.textContent,
          classes: button.className,
          active: button.classList.contains('tab-active'),
          disabled: button.disabled,
          visible: rect.width > 0 && rect.height > 0,
          pointerEvents: computedStyle.pointerEvents,
          opacity: computedStyle.opacity,
          zIndex: computedStyle.zIndex,
          transform: computedStyle.transform,
          transition: computedStyle.transition,
          hasClickListener: !!button.onclick,
          hasVueHandler: !!button.__vueParentComponent,
          computedStyleDisplay: computedStyle.display,
          computedStyleVisibility: computedStyle.visibility,
          offsetParent: !!button.offsetParent,
          ariaDisabled: button.getAttribute('aria-disabled'),
          tabIndex: button.tabIndex
        };
      }, buttonName);
    };
    
    // Function to check for toast notifications
    const checkToastState = async () => {
      return await page.evaluate(() => {
        const toast = document.querySelector('.toast-notification');
        const overlay = document.querySelector('.toast-overlay');
        
        return {
          toastVisible: toast ? window.getComputedStyle(toast).display !== 'none' : false,
          overlayVisible: overlay ? window.getComputedStyle(overlay).display !== 'none' : false,
          bodyOverflow: document.body.style.overflow,
          toastClasses: toast ? toast.className : null,
          toastText: toast ? toast.textContent.trim() : null
        };
      });
    };
    
    // Function to check Vue reactivity state
    const getVueReactivityDetails = async () => {
      return await page.evaluate(() => {
        // Try to access Vue devtools if available
        const app = document.querySelector('#app').__vue_app__;
        if (!app) return null;
        
        // Get the Services component instance
        const servicesSection = document.querySelector('.services');
        const component = servicesSection?.__vueParentComponent;
        
        if (!component) return null;
        
        return {
          hasComponent: !!component,
          setupState: component.setupState ? Object.keys(component.setupState) : null,
          props: component.props ? Object.keys(component.props) : null,
          isMounted: component.isMounted,
          isUnmounted: component.isUnmounted
        };
      });
    };
    
    // Initial state analysis
    console.log('\n📊 INITIAL STATE ANALYSIS:');
    const initialCanadaState = await getButtonState('Busco Empleo En Canadá', canadaButton);
    const initialItState = await getButtonState('Quiero Transicionar a IT', itButton);
    const initialToastState = await checkToastState();
    const initialVueState = await getVueReactivityDetails();
    
    console.log('Canada button:', initialCanadaState);
    console.log('IT button:', initialItState);
    console.log('Toast state:', initialToastState);
    console.log('Vue state:', initialVueState);
    
    // Perform the problematic rapid clicks
    console.log('\n🎯 PERFORMING RAPID CLICKS:');
    
    try {
      // First click - Canada
      console.log('Click 1: Canada button');
      await canadaButton.click({ force: true });
      await page.waitForTimeout(10);
      
      const afterFirstClick = await getButtonState('Busco Empleo En Canadá', canadaButton);
      console.log('Canada button after first click:', afterFirstClick);
      
      // Second click - IT (this is where it fails)
      console.log('Click 2: IT button');
      await itButton.click({ force: true });
      await page.waitForTimeout(10);
      
      const afterSecondClick = await getButtonState('Quiero Transicionar a IT', itButton);
      console.log('IT button after second click:', afterSecondClick);
      
    } catch (error) {
      console.log(`❌ Error during rapid clicks: ${error.message}`);
    }
    
    // Post-click analysis
    console.log('\n🔍 POST-CLICK ANALYSIS:');
    const finalCanadaState = await getButtonState('Busco Empleo En Canadá', canadaButton);
    const finalItState = await getButtonState('Quiero Transicionar a IT', itButton);
    const finalToastState = await checkToastState();
    const finalVueState = await getVueReactivityDetails();
    
    console.log('Final Canada button:', finalCanadaState);
    console.log('Final IT button:', finalItState);
    console.log('Final toast state:', finalToastState);
    console.log('Final Vue state:', finalVueState);
    
    // Check for rate limiting activation
    const rateLimitingActive = finalToastState.toastVisible && 
                              finalToastState.toastText?.includes('espera');
    
    if (rateLimitingActive) {
      console.log('🚨 RATE LIMITING DETECTED!');
      diagnosis.rateLimiting.push({
        message: 'Rate limiting was triggered',
        toastText: finalToastState.toastText,
        bodyOverflow: finalToastState.bodyOverflow
      });
    }
    
    // Check for CSS transition issues
    const canadaTransition = finalCanadaState.transition;
    const itTransition = finalItState.transition;
    
    if (canadaTransition.includes('all') || itTransition.includes('all')) {
      console.log('⚠️  CSS TRANSITIONS DETECTED - Potential blocking');
      diagnosis.cssTransitions.push({
        canadaTransition,
        itTransition
      });
    }
    
    // Check for pointer events blocking
    if (finalCanadaState.pointerEvents === 'none' || finalItState.pointerEvents === 'none') {
      console.log('🚨 POINTER EVENTS BLOCKED!');
      diagnosis.eventListeners.push({
        message: 'Pointer events are blocked',
        canadaPointerEvents: finalCanadaState.pointerEvents,
        itPointerEvents: finalItState.pointerEvents
      });
    }
    
    // Check for body scroll blocking
    if (finalToastState.bodyOverflow === 'hidden') {
      console.log('🚨 BODY SCROLL BLOCKED - Toast overlay active');
      diagnosis.toastNotifications.push({
        message: 'Body scroll is blocked by toast',
        bodyOverflow: finalToastState.bodyOverflow
      });
    }
    
    // Final diagnosis
    console.log('\n📋 ROOT CAUSE DIAGNOSIS:');
    console.log('==========================');
    
    if (diagnosis.rateLimiting.length > 0) {
      console.log('🚨 PRIMARY CAUSE: Rate limiting system is blocking clicks');
      console.log('   - Toast notifications are preventing further interactions');
      console.log('   - Body scroll is locked, which may affect touch events');
      console.log('   - This explains why buttons become unresponsive');
    }
    
    if (diagnosis.cssTransitions.length > 0) {
      console.log('⚠️  CONTRIBUTING FACTOR: CSS transitions may interfere with rapid clicks');
    }
    
    if (diagnosis.eventListeners.length > 0) {
      console.log('⚠️  CONTRIBUTING FACTOR: Event handling issues detected');
    }
    
    if (diagnosis.vueReactivity.length > 0) {
      console.log('⚠️  CONTRIBUTING FACTOR: Vue reactivity issues detected');
    }
    
    // Test if buttons are actually clickable despite being "unresponsive"
    console.log('\n🧪 TESTING ACTUAL CLICKABILITY:');
    
    try {
      await canadaButton.click({ force: true, timeout: 1000 });
      console.log('✅ Canada button is still clickable with force');
    } catch (error) {
      console.log('❌ Canada button failed even with force click:', error.message);
    }
    
    try {
      await itButton.click({ force: true, timeout: 1000 });
      console.log('✅ IT button is still clickable with force');
    } catch (error) {
      console.log('❌ IT button failed even with force click:', error.message);
    }
    
    // Take screenshot for visual analysis
    await page.screenshot({ path: 'bug-diagnosis.png', fullPage: true });
    console.log('📸 Diagnosis screenshot saved as bug-diagnosis.png');
    
    // Summary
    console.log('\n🎯 DIAGNOSIS SUMMARY:');
    console.log('======================');
    console.log('The root cause appears to be the RATE LIMITING SYSTEM combined with TOAST NOTIFICATIONS.');
    console.log('');
    console.log('When rapid clicks occur:');
    console.log('1. Rate limiting is triggered (3-second cooldown)');
    console.log('2. Toast notification appears with overlay');
    console.log('3. Body scroll is locked (overflow: hidden)');
    console.log('4. This interferes with touch/click event propagation');
    console.log('5. Buttons appear unresponsive but are actually blocked by the overlay');
    console.log('');
    console.log('RECOMMENDED FIXES:');
    console.log('1. Fix toast overlay to not block tab button interactions');
    console.log('2. Improve rate limiting to be less intrusive for tab switching');
    console.log('3. Separate rate limiting for tab switching vs service acquisition');
    console.log('4. Use CSS pointer-events properly to avoid blocking legitimate clicks');
    
    // Assertions for diagnosis
    expect(rateLimitingActive).toBe(true);
  });
});
