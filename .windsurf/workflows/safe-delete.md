---
description: Safely delete something without breaking the project
---
# /safe-delete

## Goal
Safely delete something without breaking the project.

## Steps
1. Confirm the exact target and desired end state.
2. Run Deletion Safety steps 1 to 4 (from global rules) and wait for explicit approval.
3. After approval, execute deletion and cleanup.
4. Provide the end of task summary.

## Integration with Rules
This workflow executes the Deletion Safety Process from global rules:
- Step 1: Clarify intent
- Step 2: Dependency scan
- Step 3: Impact Report
- Step 4: Confirm
- Step 5: Execute (only after approval)

## Usage
Invoke this workflow when:
- Deleting files, components, routes, or major code blocks
- Removing features or functionality
- Cleaning up unused code
- Refactoring that involves deletions

## Safety Guarantees
This workflow ensures:
- All dependencies are identified before deletion
- Impact is assessed and reported
- User explicitly approves before any deletion
- Cleanup of orphaned imports and assets
- Tests and docs are updated as needed

## Example Execution
```
Target: src/components/OldFeature.vue

Dependency Scan:
- Imported in: src/views/Dashboard.vue (line 5)
- Route reference: src/router/index.js (line 23)
- Test file: tests/OldFeature.spec.js

Impact Report:
- Will break Dashboard.vue if not updated
- Route /old-feature will become 404
- 1 test file will need removal

Cleanup Required:
- Remove import from Dashboard.vue
- Remove route from router/index.js
- Delete test file
- Remove related assets if any

Proceed with deletion and cleanup? (Yes/No)
```
