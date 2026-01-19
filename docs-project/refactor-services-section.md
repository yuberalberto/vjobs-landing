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
- [ ] Test across all breakpoints

---

## TODO

### 1. Data Structure Changes 🛠️

**Current Issues:**
- Flat services array mixing different price points
- Modal navigation adds unnecessary complexity
- No clear separation between free and paid services

**New Structure:**
```javascript
const servicesData = {
  canada: {
    title: 'Empleo en Canadá',
    painPoints: [
      'No sé por dónde empezar con la inmigración',
      'Mi experiencia no parece reconocida',
      'No tengo red de contactos locales'
    ],
    plans: [
      {
        name: 'Plan Profesional',
        price: '$299/mes',
        features: ['4 sesiones coaching', 'CV optimizado', 'Prep entrevistas'],
        whatsappUrl: 'wa.me/...?text=Interesado en Plan Profesional para Canadá'
      },
      {
        name: 'Plan Canada VIP',
        price: '$499/mes',
        features: ['Todo Plan Profesional +', 'Asesoría migratoria', 'Red contactos'],
        whatsappUrl: 'wa.me/...?text=Interesado en Plan Canada VIP'
      }
    ]
  },
  it: {
    title: 'Transición a IT',
    painPoints: [
      'No tengo experiencia técnica',
      'No sé qué tecnología aprender',
      'Mi edad puede ser un impedimento'
    ],
    plans: [
      {
        name: 'Plan Profesional',
        price: '$299/mes',
        features: ['4 sesiones coaching', 'CV optimizado', 'Prep entrevistas'],
        whatsappUrl: 'wa.me/...?text=Interesado en Plan Profesional para IT'
      },
      {
        name: 'Mentoría IT',
        price: '$399/mes',
        features: ['Mentor personalizado', 'Proyectos prácticos', 'Conexiones industria'],
        whatsappUrl: 'wa.me/...?text=Interesado en Mentoría IT'
      }
    ]
  }
}
```

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
```javascript
const activePath = ref('canada') // Smart default
const currentContent = computed(() => servicesData[activePath.value])

const switchPath = (path) => {
  activePath.value = path
}

const generateWhatsAppUrl = (planName) => {
  const plan = currentContent.value.plans.find(p => p.name === planName)
  return plan ? plan.whatsappUrl : '#'
}
```

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

## Files to Modify
- `src/components/Services.vue` (main refactor)
- `src/data/services.js` (new data file)
- `src/components/ServiceCard.vue` (new component)
- `src/components/PainPoints.vue` (new component)

## Testing Checklist
- [ ] Tab switching works smoothly
- [ ] WhatsApp URLs are correct
- [ ] Mobile accordion functions
- [ ] Responsive breakpoints tested
- [ ] No console errors
- [ ] Accessibility validation
- [ ] Visual coherence with reference image
- [ ] Consistent styling across components
