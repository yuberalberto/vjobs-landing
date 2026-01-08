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

## Mode discipline

11. Stay in Ask Mode while clarifying scope, and request approval before switching to Code Mode.
12. Describe the intended edits (files, functions, tools) prior to any mode switch.
13. Return to Ask Mode after each change to summarize results, cite files, and confirm next steps.

---

## Planning requirements

14. Use `update_plan` for every multi-step effort; keep at least two steps with only one marked in progress.
15. Refresh the plan whenever scope changes, blockers appear, or new constraints are introduced.
16. If progress stalls for more than a few minutes, pause and ask the user for direction before continuing.

---

## Tool selection rules

17. Start unfamiliar-code exploration with `code_search`, then use `read_file` for context and `grep_search` for precise strings.
18. Use `find_by_name` when you know part of a filename, and prefer built-in tools over shell commands for viewing/searching.
19. Batch independent tool calls in parallel when possible, keeping dependent or destructive operations sequential.

---

## Citation & validation

20. Cite relevant files and line ranges in each technical response (e.g., `@path#L1-L20`).
21. Explicitly state when an answer relies on general knowledge instead of repository sources.
22. Self-check every response against user instructions, project rules, and referenced memories; mention the memories used.

---

## Protected files reference

23. Never edit any file listed in `.windsurf/windsurf-config.json` under `protectedFiles` without explicit approval.
24. If a protected file must change, describe the risk, outline a rollback plan, and wait for confirmation before proceeding.

---

## When in doubt

25. If unsure what to do next, ask:
   - “Would you like to break this down?”
   - “Should I suggest a structure first?”

26. Act more like a careful collaborator than an autocomplete engine.

---

## Version Control Guidelines

 Only commit or push when explicitly instructed by the user.  
27. Before running a `git commit`, confirm that at least one of the following conditions is met:
  - A feature was completed and tested
  - The user is switching tasks
  - A rollback point is being intentionally saved

28. Commit messages must follow semantic style:
  - feat: for new features
  - fix: for bug fixes
  - style: for visual improvements
  - refactor: for internal restructuring
  - docs: for changes to documentation

29. Use `feature/*` or `fix/*` branches as appropriate. Do not push directly to `main` unless instructed.

30. When pushing to remote:
  - Prefer creating a Pull Request on GitHub before merging to `main`
  - If a direct push to `main` is made, inform the user and confirm

31. Never commit partial, broken, or temporary changes unless explicitly authorized.

---

## Task Tracking (`features_tracker.md`)

32. Any active role (frontend, backend, etc.) may update `docs/features_tracker.md` **only when explicitly instructed or confirmed** by the user.

33. When a task appears to be completed and the user does not mention updating the file, suggest it politely **once per completed task**. For example:
   - "Would you like me to mark [F3] as completed in features_tracker.md?"
   - "Should I update the task list to reflect this progress?"

34. Never modify `features_tracker.md` automatically without permission, even if the task is clearly finished.

35. Always preserve structure, numbering, and formatting conventions.  
   → Do not alter task IDs (e.g., [F1], [B2]) or reorganize sections unless told to.

36. Never assume a task is complete unless the user explicitly accepts or declares it done.
37. Never alter the current information in this document in a way that causes discrepancies, information loss, or content change. When unsure, always ask first.

---

## Documentation scope

38. Treat `docs/archive/` as historical reference only. Never use its contents unless the user explicitly requests it.
39. When searching for context, prioritize current documents under `docs/` and ignore `docs/archive/` by default.