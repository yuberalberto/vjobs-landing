# Global Rules - Enhanced with Windsurf 2025 Best Practices

## Test
If the user says "trigger test rule", reply:
✅ Global rule file is being read.

## Language
Chat in Spanish.
Code, identifiers, comments, and commit messages in English.

<approval_and_scope>
## Approval and scope
Before editing files or running terminal commands:
1. Write a short plan (2 to 6 lines).
2. List the exact files you will touch.
3. Ask for approval and wait.

Explicit approval examples:
"Go ahead", "Proceed", "Yes, apply", "Do it".

If the user answers questions but does not explicitly approve, do not apply changes.

Scope:
- Stay within the approved files and intent.
- If you need to touch additional files, stop and ask.
</approval_and_scope>

<protected_files>
## Protected files
Never modify these without explicit permission:
- .env or any secrets
- package manager files and lockfiles
- build, deployment, CI configuration
- .gitignore

If a protected file change is needed:
1. Explain why, risk, and impact.
2. Propose a rollback.
3. Wait for confirmation.
</protected_files>

<destructive_actions>
## Destructive actions
Any deletion or destructive modification requires:
1. Dependency scan
2. Impact Report
3. Explicit confirmation
</destructive_actions>

<deletion_safety_process>
## Deletion Safety Process
Use this when removing files, components, routes, or major blocks.

### Step 1: Clarify intent
If "delete X" could mean deleting a file or removing something inside a file, ask which one.

### Step 2: Dependency scan
Look for:
- Imports and exports
- Template usage and route usage
- Tests and docs references
- Related styles, assets, and configs

### Step 3: Impact Report
Output exactly this structure:

```
Impact Report
Target:
References found:
Cleanup required:
Risks:
```

### Step 4: Confirm
Ask exactly:
"Proceed with deletion and cleanup?"

### Step 5: Execute
Only after approval:
- Remove the target
- Remove orphaned imports and unused assets
- Update tests or docs if needed
</deletion_safety_process>

<security_standards>
## Safety
- Do not assume authentication exists unless specified.
- Do not add new external dependencies or third party APIs without asking.
- Avoid unsanitized inputs and exposure of secrets.
- Validate all user inputs before processing.
- Sanitize data before displaying to prevent XSS.
- Use environment variables for sensitive configuration.
- Never commit API keys or secrets to version control.
</security_standards>

<git_discipline>
## Git
Do not commit or push unless asked.

When asked to commit:
- Propose 1 to 3 semantic commit messages.
- Use semantic style: feat, fix, style, refactor, docs
- Keep the commit scoped to one logical change.
- Do not push to main unless explicitly instructed.
</git_discipline>

<core_development_principles>
## Core Development Principles
- Keep changes small and focused.
- If anything is ambiguous, ask before acting.
- Prefer the simplest approach that matches existing conventions.
- If there are multiple valid approaches, propose up to 2 options and ask which to choose.
- Write self-documenting code with clear naming.
- Follow DRY principles but avoid premature abstraction.
- Prefer composition over inheritance.
- Use functional programming patterns where appropriate.
</core_development_principles>

<end_of_task_summary>
## End of Task Summary
Always include:
- Files touched
- What changed
- Risks or follow ups
</end_of_task_summary>

<universal_vue_standards>
## Universal Vue Standards
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

<code_quality_standards>
## Code Quality Standards
- Maintain consistent code formatting
- Write meaningful commit messages using conventional commits
- Keep functions small and focused on single responsibility
- Remove dead code and unused imports regularly
- Document complex business logic and edge cases
- Provide context in pull request descriptions
- Review code changes thoroughly before approval
</code_quality_standards>
