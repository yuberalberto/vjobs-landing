# Refactor Services Section

This document provides a detailed reference to the current feature progress status.

## Progress
- [x] Extract services data to separate file
- [x] Remove modal functionality and navigation logic
- [x] Restructure data into grouped object (canada/it paths)
- [x] Create new component structure with tabs
- [x] Implement WhatsApp integration
- [x] Update responsive design following visual reference
- [x] Maintain project visual coherence throughout
- [x] Test across all breakpoints
- [x] Create PR #25 for merge

---

## TODO

### 1. Data Structure Changes 🛠️

**Current Issues:**
- Flat services array mixing different price points
- Modal navigation adds unnecessary complexity
- No clear separation between free and paid services

**New Structure (Implemented):**
- Canada: STARTER ($90 CAD) → BUILDER ($160 CAD, POPULAR) → VISIBILITY ($220 CAD)
- IT: Starter ($90) → Builder ($160, POPULAR) → Visibility ($160)
- Each plan includes: badge, subtitle, benefits array, WhatsApp URL
- Separate pain points arrays for each path
- Dynamic route suffixes (CA/IT) implemented

### 2. Component Logic Changes 🧠

**Remove:**
- Modal popup functionality
- Service navigation (openService, closePopup, navigate)
- Keyboard event handlers
- Grid layout for 4 services

**Add:**
- Tab switching logic (canada/it paths)
- Computed property for current content
- WhatsApp URL generation helper
- Responsive pain points display

**New Script Structure:**
- `activePath` ref for tab state (default: 'canada')
- `currentContent` computed for dynamic data
- `switchPath()` function for tab switching
- `generateWhatsAppUrl()` helper for contact links

### 3. Template Structure Changes 🏗️

**Visual Reference:**
- Use `design/services-layout-refactor.png` as layout reference
- Maintain visual coherence with existing project components
- Follow established color scheme and typography

**New Layout:**
```
┌─ Section Header ─┐
│  Title + Subtitle │
└──────────────────┘

┌─ Tab Selector ────┐
│  [IT] [Canadá]    │
└──────────────────┘

┌─ Dynamic Content ─┐
│  Pain Points      │
│  (Accordion on mobile) │
│                  │
│  Pricing Cards    │
│  (2 cards max)    │
└──────────────────┘
```

**Key Template Changes:**
- Replace static h2 with tab buttons
- Add transition wrapper for content switching
- Use `<details>` for mobile pain points
- Iterate only over current path's plans
- Match visual styling from reference image

### 4. CSS & Design Updates 🎨

**Visual Coherence Requirements:**
- Reference: `design/services-layout-refactor.png`
- Maintain existing color palette and typography
- Follow established component patterns
- Ensure consistent spacing and sizing

**Layout Changes:**
- Grid (4 columns) → Flex column
- Add large gaps between sections
- Mobile-first padding improvements

**Component Updates:**
- Redesign service cards for better hierarchy
- Remove complex hover effects
- Add tab active states
- Optimize for touch interactions
- Match visual style from reference image

**Responsive Strategy:**
- Desktop: Horizontal pain points, 2-column cards
- Tablet: Vertical pain points, stacked cards  
- Mobile: Accordion pain points, full-width cards

### 5. Integration Points 🔗

**WhatsApp Integration:**
- Pre-filled messages per plan/path
- Consistent branding in messages
- Fallback to contact form if needed

**Diagnostic Session:**
- Move to navbar/hero section
- Separate from paid services
- Link to Calendly instead of modal

**Analytics:**
- Track tab switching
- Monitor WhatsApp click-through
- Measure conversion by path

---

## Files Modified
- `src/components/Services.vue` (main refactor - complete redesign)
- `src/data/services.js` (new data file - implemented structure)
- `docs-project/features_tracker.md` (added bug B7 to backlog)
- `docs-project/bugs/tab-buttons-mobile-block.md` (complete bug documentation)
- `design/services-layout-refactor.png` (design reference)

## Testing Checklist
- [x] Tab switching works smoothly
- [x] WhatsApp URLs are correct
- [x] Mobile accordion functions
- [x] Responsive breakpoints tested
- [x] No console errors
- [x] Accessibility validation
- [x] Visual coherence with reference image
- [x] Consistent styling across components
- [x] Dynamic route suffixes (CA/IT) working
- [x] Featured card styling (box-shadow instead of transform)

---

## Mobile Bug Investigation (Bug B7)

**Issue:** Tab buttons become unresponsive on mobile after rapid alternating clicks

**Root Cause:** Transform properties on hover interfere with touch events

**Solutions Implemented:**
- Removed `transform: translateY(-2px)` on hover for tab buttons
- Added `touch-action: manipulation` CSS property
- Optimized hover states for touch devices
- Added CSS transitions for smoother mobile interactions

**Status:** Partially resolved - monitoring needed after extensive use

---

## Technical Decisions & Solutions

**Key Implementation Choices:**
1. **Card Layout:** Used `box-shadow` instead of `transform` for featured cards to avoid misalignment
2. **Button Alignment:** Implemented flexbox for consistent tab button positioning
3. **Data Structure:** Separated Canada/IT routes with different pricing (CAD vs USD)
4. **Mobile Optimization:** Removed transform hover effects that caused touch conflicts
5. **Component Structure:** Single component with dynamic content switching

**Things That Did NOT Work (Critical to Avoid):**
- Transform on hover for mobile tab buttons (causes touch event conflicts)
- Original card layout with transform translateY for featured cards (caused misalignment)
- Separate pricing sections (removed duplicate display)
- Complex modal navigation (simplified to tab-based interface)

---

## Current Status

**Branch:** `refactor/services-section`
**PR:** #25 (ready for merge)
**State:** Fully implemented and documented
**Working Tree:** Clean, up to date with remote

**Completed Features:**
1. ✅ Tabbed interface for Canada/IT routes
2. ✅ WhatsApp integration with personalized messages
3. ✅ Rate limiting with cooldown and click limits
4. ✅ Toast notifications with contextual behavior
5. ✅ Modal scroll blocking across all modals
6. ✅ Number obfuscation for anti-scraping protection

**Next Steps:**
1. Merge PR #25 to main branch when ready
2. Monitor tab buttons mobile behavior (Bug B7)
3. Consider variable renaming (activePath→selectedServiceRoute, etc.)

---
