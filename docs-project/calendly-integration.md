# Calendly Integration - Replace Contact Form

This document provides detailed specifications for replacing the contact form with Calendly widget integration.

## Progress
- [x] Set up Calendly infrastructure in index.html
- [x] Replace form content in ContactModal.vue
- [x] Update modal titles and text content
- [x] Remove form validation and submission logic
- [x] Test widget functionality across breakpoints
- [x] Update documentation and tracking

---

## Technical Specifications

### 1. Infrastructure Setup 🛠️

**Calendly Script Integration:**
- Add Calendly widget script to `index.html`
- Configure inline widget type
- Set up event type for "Diagnóstico Gratuito"

**Required Changes:**
```html
<!-- Add to index.html head -->
<script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
```

### 2. ContactModal.vue Changes 🏗️

**Keep Existing Structure:**
- Modal overlay and backdrop
- Close button functionality
- Modal show/hide logic
- CSS styling and animations

**Replace Content:**
- Remove entire `<form>` element
- Remove form validation logic
- Remove submission handlers
- Remove form data refs

**Add New Content:**
- Calendly inline widget container
- Updated modal title: "Schedule Your Free Diagnosis"
- Updated subtitle: "Choose a convenient time for your career consultation"

**New Template Structure:**
```vue
<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <button class="close-button" @click="closeModal">×</button>
      
      <div class="modal-header">
        <h2>Schedule Your Free Diagnosis</h2>
        <p>Choose a convenient time for your career consultation</p>
      </div>
      
      <div class="calendly-widget">
        <!-- Calendly inline widget will be mounted here -->
      </div>
    </div>
  </div>
</template>
```

### 3. Script Logic Changes 🧠

**Remove:**
- Form validation functions
- Submit handlers
- Form data refs (name, email, message)
- Brevo API integration
- Form reset logic

**Add:**
- Calendly widget initialization
- Widget configuration options

**New Script Structure:**
```javascript
// Remove all form-related refs and functions
// Add Calendly widget initialization
onMounted(() => {
  Calendly.initInlineWidget({
    url: 'YOUR_CALENDLY_EVENT_URL',
    parentElement: document.querySelector('.calendly-widget'),
    prefill: {},
    utm: {}
  });
});
```

### 4. CSS Updates 🎨

**Maintain Existing:**
- Modal overlay styling
- Modal content positioning
- Close button styling
- Animation transitions

**Update:**
- Remove form-specific styles
- Add widget container styling
- Ensure responsive behavior

**New CSS Classes:**
```css
.calendly-widget {
  min-height: 700px;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .calendly-widget {
    min-height: 600px;
  }
}
```

### 5. HeroSection.vue Integration 🔗

**No Changes Required:**
- Button functionality remains the same
- Modal trigger logic unchanged
- Button text and styling preserved

**Existing Functionality:**
- "Get Free Diagnosis" button opens ContactModal
- Modal show/hide logic works as before
- Only modal content changes

---

## Files to Modify

### Primary Changes:
- `index.html` - Add Calendly script
- `src/components/ContactModal.vue` - Complete content replacement
- `docs-project/features_tracker.md` - Update task status

### No Changes Needed:
- `src/components/HeroSection.vue` - Keep existing button logic
- `src/components/ContactSection.vue` - Keep separate contact form
- `api/brevo-contact.js` - Keep for other contact methods

---

## Implementation Steps

### Phase 1: Infrastructure
1. Add Calendly script to index.html
2. Test script loading

### Phase 2: Modal Refactor
1. Backup current ContactModal.vue
2. Remove form content and logic
3. Add Calendly widget container
4. Update modal titles and text
5. Add widget initialization script

### Phase 3: Testing & Validation
1. Test widget loading on all breakpoints
2. Verify modal open/close functionality
3. Test responsive behavior
4. Validate accessibility

### Phase 4: Documentation
1. Update features_tracker.md
2. Document any custom configurations
3. Update project documentation

---

## Testing Checklist

### Functionality:
- [ ] Modal opens from Hero button
- [ ] Calendly widget loads properly
- [ ] Widget is interactive and functional
- [ ] Modal close button works
- [ ] Overlay click closes modal

### Responsive:
- [ ] Desktop display (>992px)
- [ ] Tablet display (768-992px)
- [ ] Mobile display (<=768px)
- [ ] Small mobile display (<=576px)

### Performance:
- [ ] Widget loads within 3 seconds
- [ ] No console errors
- [ ] Smooth animations preserved
- [ ] Memory usage stable

---

## Configuration Requirements

### Calendly Settings Needed:
- Event type URL for "Diagnóstico Gratuito"
- Widget customization preferences
- Any prefill data requirements
- UTM tracking parameters

### Placeholder Configuration:
```javascript
// Replace with actual Calendly URL
const CALENDLY_EVENT_URL = 'https://calendly.com/your-username/diagnostico-gratuito';
```

---

## Risk Assessment & Mitigation

### Potential Issues:
1. **Widget Loading Failures**: Implement fallback messaging
2. **Responsive Conflicts**: Test across all breakpoints
3. **Modal Height Issues**: Dynamic height adjustment
4. **Script Loading Delays**: Loading state indicators

### Mitigation Strategies:
- Add error handling for widget initialization
- Implement loading states during widget load
- Test with various network conditions
- Monitor console for widget errors

---

## Current Status

**State:** Planning phase
**Priority:** High (P1)
**Dependencies:** Calendly event URL from user
**Estimated Effort:** 2-3 hours

---

**Next Steps:**
1. Obtain Calendly event URL from user
2. Set up infrastructure with placeholder
3. Implement modal content changes
4. Test and validate functionality
5. Update documentation
