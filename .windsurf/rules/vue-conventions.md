---
trigger: glob
globs: **/*.vue
---
# Vue Project Integration - VJobs Landing

Applies to Vue files only in this project.

<responsive_design_integration>
## Responsive Design
Check responsiveness using the project breakpoints:
- Desktop: >992
- Tablet: 768 to 992
- Mobile: <=768
- Small mobile: <=576

Always test changes across all breakpoints before considering the task complete.
</responsive_design_integration>

<component_conventions>
## Project Component Conventions
- Follow the existing component structure in `src/components/`
- Match the naming patterns already established
- Keep component styles consistent with existing patterns
- Reference existing components for styling patterns
</component_conventions>

<ui_consistency>
## UI Changes
- Avoid layout regressions
- Test on mobile first (project is mobile-first)
- Ensure changes work across all defined breakpoints
- Maintain visual consistency with existing components
- Check for accessibility issues
- Follow the UI guidelines in `docs/ui-guidelines.md` to ensure consistency
</ui_consistency>


Apply these to all Vue projects:

### Component Structure
- Prefer `<script setup>` if consistent with the repo
- Keep components small and readable (under 200 lines)
- Avoid premature abstractions
- Prefer explicit props and emits
- Use TypeScript for better type safety when available

### Styling
- Follow existing conventions in this repo
- Keep styles local unless a shared pattern already exists
- Use CSS custom properties for theming consistency
- Prefer CSS Grid and Flexbox over floats
- Follow mobile-first responsive design principles

### Performance
- Use v-show for frequently toggled elements
- Use v-if for conditionally rendered elements
- Implement lazy loading for non-critical components
- Avoid inline styles in templates
- Use Vue's built-in optimization features

### Best Practices
- Avoid layout regressions
- Implement proper error boundaries
- Use Vue DevTools for debugging
- Follow Vue 3 Composition API patterns
- Keep reactivity simple and predictable
</universal_vue_standards>
