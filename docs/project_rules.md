---
trigger: manual
---

# PROJECT: CONTEXT & ARCHITECTURE

<tech_stack>
  - **Framework:** Vue 3 (Composition API). Avoid Options API.
  - **Styling:** CSS / SCSS (Mobile-First approach).
  - **Architecture:** Modular components. Keep UI and Logic separate.
</tech_stack>

<design_system>
  **STRICT BREAKPOINTS** (Do not invent new ones):
  - **Desktop:** > 992px
  - **Tablet:** 768px - 992px (Critical: Check Navbar/Hero coordination here)
  - **Mobile:** ≤ 768px
  - **Small Mobile:** ≤ 576px
</design_system>

<project_workflow>
  1. **TRACKING SOURCE OF TRUTH:**
     - Use `docs/features_tracker.md`.
     - IGNORE `tasks.md` or any other list.
     - **Protocol:** Only update this file when a task is explicitly CONFIRMED as done. Do not auto-update.

  2. **DOCUMENTATION:**
     - `docs/archive/` is read-only history. Do not use it for current context.
     - Focus on active docs in `docs/`.

  3. **CLEANUP:**
     - When deleting a component, you MUST remove its orphaned imports in `App.vue` or `main.js`.
</project_workflow>