---
description: Give a clear review summary before edits are applied or accepted
---
# /change-review

## Goal
Give a clear review summary before edits are applied or accepted.

## Steps
1. List files touched.
2. Summarize key changes per file.
3. Call out risks and edge cases.
4. Provide a rollback suggestion for non-trivial changes.
5. Ask for approval if edits are pending.

## Integration with Rules
This workflow automatically applies:
- Core development principles from global rules
- End of task summary format from global rules
- Project-specific behavior guidelines

## Usage
Invoke this workflow when:
- You need to review changes before applying them
- You want a structured summary of proposed modifications
- You need to assess risks before proceeding
- You want to ensure rollback options are available

## Example Output Structure
```
Files Touched:
- src/components/Header.vue
- src/views/Home.vue

Key Changes:
- Header.vue: Updated navigation structure
- Home.vue: Added new hero section

Risks:
- Navigation changes may affect mobile layout
- Hero section needs responsive testing

Rollback:
- Revert commits: abc123, def456
- Or restore from backup: backup_20250111.zip

Proceed with these changes?
```
