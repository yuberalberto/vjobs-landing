# Stress Testing Template Guide

## 🎯 Purpose

This guide explains how to use the `stress-test-template.spec.js` to create automated stress tests for any UI component that might have blocking or performance issues.

## 📁 Location

```
tests/e2e/templates/stress-test-template.spec.js
```

## 🔄 How to Use the Template

### Step 1: Copy the Template
```bash
cp tests/e2e/templates/stress-test-template.spec.js tests/e2e/components/your-component.spec.js
```

### Step 2: Customize for Your Component

#### 1. Update Test Metadata
```javascript
test.describe('Your Component - Stress Testing', () => {
  test('should handle rapid interactions without UI blocking', async ({ page }) => {
```

#### 2. Define Your Selectors
```javascript
// Replace these with your component's selectors
const button1Selector = 'button:has-text("Your Button 1")';
const button2Selector = 'button:has-text("Your Button 2")';
```

#### 3. Adjust Test Parameters
```javascript
const iterations = 20;        // Number of test cycles
const rapidDelay = 50;         // Delay between rapid clicks (ms)
const normalDelay = 1000;     // Delay for normal behavior test (ms)
```

#### 4. Customize Success Criteria
```javascript
// Adjust these thresholds based on your component's requirements
expect(performanceIncrease).toBeLessThan(2.0);  // Performance should not double
expect(memoryIncreaseMB).toBeLessThan(50);      // Memory increase limit
```

### Step 3: Run Your Test
```bash
# Run your specific component test
npx playwright test tests/e2e/components/your-component.spec.js

# Run on mobile device
npx playwright test tests/e2e/components/your-component.spec.js --project="Mobile Safari"
```

## 🎯 What the Template Tests

### 1. **Performance Monitoring**
- Click response times
- Performance degradation over iterations
- Memory usage trends

### 2. **UI Responsiveness**
- Button clickability
- Visual state changes
- Element stability

### 3. **Error Detection**
- Console errors
- Stack overflow detection
- Memory warnings

### 4. **Event Listener Analysis**
- Listener accumulation
- Memory leak detection

## 📊 Test Scenarios

### Scenario 1: Standard Rapid Clicking
```javascript
// Tests 20 iterations with 50ms delay between clicks
// Simulates normal rapid user interaction
```

### Scenario 2: Ultra-Rapid Stress Test
```javascript
// Tests 50 iterations with 10ms delay between clicks
// Simulates extreme usage conditions
```

### Scenario 3: Normal User Behavior
```javascript
// Tests 10 iterations with 1000ms delay between clicks
// Simulates typical user interaction patterns
```

## 🔧 Customization Examples

### Example 1: Form Input Testing
```javascript
const input1Selector = 'input[name="username"]';
const input2Selector = 'input[name="email"]';

// Instead of clicking, type rapidly
await input1.fill('testuser');
await page.waitForTimeout(50);
await input2.fill('test@example.com');
```

### Example 2: Navigation Menu Testing
```javascript
const menuItem1 = 'nav a[href="/home"]';
const menuItem2 = 'nav a[href="/about"]';

// Test navigation switching
await menuItem1.click();
await page.waitForTimeout(50);
await menuItem2.click();
```

### Example 3: Modal/Dialog Testing
```javascript
const openButton = 'button:has-text("Open Modal")';
const closeButton = '.modal-close';

// Test modal open/close cycles
await openButton.click();
await page.waitForTimeout(50);
await closeButton.click();
```

## 📈 Interpreting Results

### ✅ Success Indicators
- All iterations complete without blocking
- Performance remains stable
- No console errors
- Memory usage stays within limits

### ❌ Failure Indicators
- `blockingIteration` is not null (UI blocked)
- Performance degrades significantly
- Console errors detected
- Memory usage exceeds thresholds

### ⚠️ Warning Indicators
- Slight performance degradation
- Minor memory increase
- Intermittent responsiveness issues

## 🛠️ Troubleshooting

### Common Issues

#### 1. Element Not Found
```javascript
// Solution: Use more specific selectors
const buttonSelector = 'section.services button:has-text("Click Me")';
```

#### 2. Timeout Errors
```javascript
// Solution: Increase timeout or add wait conditions
await page.waitForSelector(buttonSelector, { timeout: 5000 });
await button.click({ timeout: 2000 });
```

#### 3. Element Instability
```javascript
// Solution: Add stability waits
await page.waitForTimeout(500); // Wait for animations
await button.click({ force: true }); // Force click if needed
```

## 📚 Best Practices

### 1. **Realistic Testing**
- Test with realistic user behavior patterns
- Don't just test extreme cases
- Consider typical usage scenarios

### 2. **Performance Baselines**
- Establish performance baselines before changes
- Compare results against known good states
- Monitor trends over time

### 3. **Cross-Device Testing**
- Test on different device profiles
- Include mobile, tablet, and desktop
- Consider touch vs mouse interactions

### 4. **Documentation**
- Document what each test validates
- Note any known limitations
- Keep test descriptions clear

## 🔄 Integration with CI/CD

### GitHub Actions Example
```yaml
- name: Run E2E Stress Tests
  run: npx playwright test tests/e2e/components/
```

### Pre-commit Hooks
```bash
# Run stress tests before commits
npx playwright test tests/e2e/components/ --reporter=line
```

## 📞 Getting Help

### Resources
- [Playwright Documentation](https://playwright.dev/)
- [Vue Testing Best Practices](https://vuejs.org/guide/scaling-up/testing.html)
- [Web Performance Testing](https://web.dev/performance/)

### Internal Resources
- Check existing component tests in `tests/e2e/components/`
- Review resolved bug fixes in `docs-project/bug-fixes/`
- Consult project testing guidelines

---

*This template is designed to be flexible and adaptable. Feel free to modify it to suit your specific testing needs while maintaining the core stress testing principles.*
