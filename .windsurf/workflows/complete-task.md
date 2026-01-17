---
description: Complete a task with subtasks, archive if fully done, and update main tracker
---
# /complete-task

## Goal
Complete subtasks in a task document, archive if fully done, and update main tracker.

## Steps
1. Identify the task document and subtasks to mark as completed
2. Update the task document to mark specified subtasks as [x]
3. Check if ALL subtasks in the task document are now [x]
4. If fully complete:
   - Move task document to `docs-project/archive/archived-tasks/`
   - Rename file: `archived-[task-name]-YYYY-MM-DD.md`
   - Update `docs-project/tasks/features_tracker.md` to move the main task to Done section
5. If partially complete:
   - Keep task document in current location
   - Update main tracker if needed
6. Provide summary of changes made

## Usage
```
/complete-task [task-id] [subtask-ids]

Examples:
/complete-task P P5,P6           # Complete subtasks P5 and P6 in mobile optimization
/complete-task N1 N1.1,N1.2      # Complete subtasks N1.1 and N1.2 in about page
```

## Integration with Rules
This workflow applies:
- Git discipline from global rules (semantic commits)
- Project tracking rules from project-context.md
- Conservative approach from project-behavior.md
- File organization standards

## Project-Specific Behavior
This workflow is specific to VJobs Landing because:
- Uses `docs-project/tasks/features_tracker.md` as main tracker
- Archives completed tasks to `docs-project/archive/archived-tasks/`
- Follows the project's task ID system ([P], [N1], [B1], etc.)
- Respects the task document structure

## File Structure
```
docs-project/
├── tasks/
│   ├── features_tracker.md     # Main tracker
│   └── task-[task-name].md      # Individual task documents
└── archive/
    └── archived-tasks/          # Literal directory name
        └── archived-[task-name]-YYYY-MM-DD.md  # Completed tasks
```

## Example Execution
```
Input: /complete-task P P5,P6

1. Reading docs-project/task-mobile-optimization.md
2. Marking P5 and P6 as [x]
3. Checking completion status: All 6 subtasks now [x] ✓
4. Moving to archive: docs-project/archive/archived-tasks/archived-mobile-optimization-2026-01-11.md
5. Updating main tracker: Moving [P] to Done section
6. Summary: Task fully completed and archived
```

## Safety Checks
- Verify task document exists before editing
- Confirm subtask IDs are valid
- Check archive directory exists (docs-project/archive/archived-tasks/)
- Backup task document before moving
- Verify main tracker update is correct
- Ensure no filename conflicts in archive directory

## Next Steps
After creating this file, move it to:
`.windsurf/workflows/complete-task.md`

This will make it available as a slash command in Windsurf.
