---
trigger: always_on
---

These rules apply to all projects I work on.  
Treat them as foundational principles for clarity, quality, and control.

---

## Mindset

1. Treat every project as if it were a $1M professional product.  
   → Prioritize clean, maintainable, scalable code over shortcuts.

2. If a task or prompt is unclear, ask for clarification before proceeding.

3. If there are multiple valid options to implement something, explain briefly and ask which one I prefer.

---

## Working style

4. Do not combine unrelated responsibilities in a single file. (e.g., don’t mix UI and DB logic.)

5. Use comments when generating complex or critical logic.  
   → Act as if the code will be reviewed by another developer.

6. Never modify these files unless explicitly told:
   - `.env`, `.gitignore`, deployment scripts
   - `package.json`, `build.gradle`, `pyproject.toml`

7. Always respect the existing file/folder structure and naming conventions.

---

## Safety and reliability

8. Avoid generating code that:
   - Depends on unverified external APIs
   - Introduces security risks (e.g., unsanitized inputs, exposed secrets)
   - Assumes authentication exists unless specified

---

## Conventions (project-specific)

9. Use naming conventions already present in the current project:
   - If variables are `camelCase`, follow camelCase.
   - If files are `kebab-case`, follow that.

10. Never create new folders, components, or endpoints unless explicitly requested.

---

## When in doubt

11. If unsure what to do next, ask:
   - “Would you like to break this down?”
   - “Should I suggest a structure first?”

12. Act more like a careful collaborator than an autocomplete engine.

---

## Version Control Guidelines

 Only commit or push when explicitly instructed by the user.  
13. Before running a `git commit`, confirm that at least one of the following conditions is met:
  - A feature was completed and tested
  - The user is switching tasks
  - A rollback point is being intentionally saved

14. Commit messages must follow semantic style:
  - feat: for new features
  - fix: for bug fixes
  - style: for visual improvements
  - refactor: for internal restructuring
  - docs: for changes to documentation

15. Use `feature/*` or `fix/*` branches as appropriate. Do not push directly to `main` unless instructed.

16. When pushing to remote:
  - Prefer creating a Pull Request on GitHub before merging to `main`
  - If a direct push to `main` is made, inform the user and confirm

17. Never commit partial, broken, or temporary changes unless explicitly authorized.

---

## Task Tracking (`tasks.md`)

18. Any active role (frontend, backend, etc.) may update `docs/tasks.md` **only when explicitly instructed or confirmed** by the user.

19. When a task appears to be completed and the user does not mention updating the file, suggest it politely. For example:
   - “Would you like me to mark [F3] as completed in tasks.md?”
   - “Should I update the task list to reflect this progress?”

20. Never modify `tasks.md` automatically without permission, even if the task is clearly finished.

21. Always preserve structure, numbering, and formatting conventions.  
   → Do not alter task IDs (e.g., [F1], [B2]) or reorganize sections unless told to.

22. Never assume a task is complete unless the user explicitly accepts or declares it done.
23. Never alter the current information this document in a way that causes discrepancies, information loss, or content change. When unsure, always ask first.