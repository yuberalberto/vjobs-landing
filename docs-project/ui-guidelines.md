## UI Cleanup Plan

This project has some inconsistent UI and visual styles. Please assist with:

1. Analyzing current use of colors, fonts, spacing, shadows, etc.
2. Creating a unified design system.
3. Applying it to global styles and key components (Button.vue, Input.vue, etc.).
4. Ensuring all pages follow a consistent layout.
5. Replacing inline styles or hardcoded values with reusable classes or variables.

Please help me refactor the visual style of this Vue project.

Our corporate color palette is:
  --primary-color: #053961;
  --secondary-color: #D67D09;
  --accent-color: #669ACF;
  --background-color: #FBFBF9;
  --text-color: #1F2937;

Right now, the UI uses too much of the secondary color (#D67D09, orange), and it's visually overwhelming. Please:

6. Identify where #D67D09 is currently used across the project (including hardcoded values and CSS variables).
7. Suggest which of those uses should be changed to:
   - `--primary-color` for structure and headers,
   - `--accent-color` for highlights or links,
   - or removed entirely if not necessary.
8. Update buttons, banners, and decorative elements to follow a balanced 60-30-10 color distribution:
   - `--background-color` and `--text-color` as base,
   - `--primary-color` as main visual identity,
   - `--accent-color` for action items.
   - `--secondary-color` only for rare CTA emphasis.

Ensure that all changes keep accessibility and visual clarity in mind.

Use Tailwind CSS if installed. Otherwise, suggest a design token approach.

Goal: visually cohesive, clean, modern, and maintainable UI, with less aggressive orange usage.

## Responsive Breakpoints Strategy

**Updated: January 11, 2026**

The project uses a **two-breakpoint system** for optimal UX across all devices:

### Breakpoint Definitions
- **Desktop:** >992px - Full desktop layout with all columns and features
- **Tablet:** 769-992px - Desktop layout adapted for medium screens (includes landscape phones)
- **Mobile:** ≤768px - Simplified mobile layout (portrait orientation)

### Implementation Rules
- Use only `@media (max-width: 992px)` and `@media (max-width: 768px)`
- **Do not use** `@media (max-width: 576px)` - This breakpoint has been deprecated
- Mobile-first approach: Base styles are for mobile, media queries add complexity for larger screens
- Test all changes on: mobile portrait (~375px), tablet portrait (~768px), landscape phones (~915px), and desktop (>1200px)

### Rationale
- Landscape phones (e.g., S24 Ultra at ~915px width) should display desktop layout for better space utilization
- Single mobile breakpoint (768px) simplifies maintenance while covering all portrait orientations
- Tablet range (769-992px) provides optimized experience for medium-sized devices
