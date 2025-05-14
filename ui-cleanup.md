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