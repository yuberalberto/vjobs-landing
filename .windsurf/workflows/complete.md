---
description: Complete tasks, features, or subtasks with quality checks and proper tracking
---
# /complete

## Goal
Complete tasks, features, or subtasks with quality checks, semantic commits, and proper tracking.

## Usage
```
/complete [task-id] [subtask-ids-optional]

Examples:
/complete P1           # Complete entire feature
/complete P P5,P6      # Complete specific subtasks
/complete N1           # Complete individual task
```

## Steps

### 1. Parse Input and Determine Mode
- Identify if subtask-ids are provided
- If subtask-ids exist → Use subtask completion mode
- If no subtask-ids → Use feature completion mode

### 2. Subtask Completion Mode (from complete-task)
1. **Read task document**: Locate and read the relevant task document
2. **Update subtasks**: Mark specified subtasks as [x]
3. **Check completion status**: Verify if ALL subtasks are now [x]
4. **If fully complete**:
   - Move task document to `docs-project/archive/archived-tasks/`
   - Rename file: `archived-[task-name]-YYYY-MM-DD.md`
   - Update `docs-project/features_tracker.md` to move main task to Done section
5. **If partially complete**:
   - Keep task document in current location
   - Update main tracker if needed

### 3. Feature Completion Mode (from complete-feature)
1. **Define "done"**: Confirm what completion means for this feature
2. **Quality checks**:
   - Build errors (if applicable)
   - Console errors (if applicable)
   - Unused imports introduced by the change
3. **Propose semantic commit message**
4. **Archive and update tracking**:
   - Move task document to `docs-project/archive/archived-tasks/`
   - Update `docs-project/features_tracker.md`
5. **Provide end of task summary**

### 4. Universal Steps (Both Modes)
1. **Verify task document exists** before editing
2. **Confirm IDs are valid** (task and subtask)
3. **Check archive directory exists** (`docs-project/archive/archived-tasks/`)
4. **Backup task document** before moving
5. **Verify main tracker update** is correct
6. **Ensure no filename conflicts** in archive directory

### 5. End of Task Summary
Always provide:
- **Files touched**: List of modified files
- **Changes made**: What was implemented
- **Risks or follow-ups**: Any concerns or next steps

## Integration with Rules
This workflow applies:
- Git discipline from global rules (semantic commits)
- Project tracking rules from project-context.md
- Conservative approach from project-behavior.md
- File organization standards

## Project-Specific Behavior
This workflow is specific to VJobs Landing because:
- Uses `docs-project/features_tracker.md` as main tracker
- Archives completed tasks to `docs-project/archive/archived-tasks/`
- Follows the project's task ID system ([P], [N1], [B1], etc.)
- Respects the task document structure

## File Structure
```
docs-project/
├── features_tracker.md     # Main tracker
├── [task-documents].md     # Individual task documents
└── archive/
    └── archived-tasks/      # Literal directory name
        └── archived-[task-name]-YYYY-MM-DD.md  # Completed tasks
```

## Example Execution

### Subtask Mode:
```
Input: /complete P P5,P6

1. Reading docs-project/task-mobile-optimization.md
2. Marking P5 and P6 as [x]
3. Checking completion status: All 6 subtasks now [x] ✓
4. Moving to archive: docs-project/archive/archived-tasks/archived-mobile-optimization-2026-01-25.md
5. Updating main tracker: Moving [P] to Done section
6. Summary: Task fully completed and archived
```

### Feature Mode:
```
Input: /complete P1

1. What does "done" mean for Calendly integration?
User: Widget loads and replaces contact form

2. Quality checks:
✓ No build errors
✓ No console errors  
✓ No unused imports

3. Proposed commit messages:
1. feat: replace contact form with Calendly widget
2. feat(contact): integrate Calendly scheduling widget
3. feat: implement Calendly integration for contact modal

Which commit message do you prefer? (1/2/3)

4. Archive and update tracker
5. End of task summary provided
```

## Safety Checks
- Verify task document exists before editing
- Confirm subtask IDs are valid
- Check archive directory exists
- Backup task document before moving
- Verify main tracker update is correct
- Ensure no filename conflicts in archive directory

## Error Handling
- If task document not found → Ask user to verify task ID
- If subtask IDs invalid → List available subtasks
- If archive directory missing → Create it automatically
- If filename conflict → Add timestamp to resolve
- If tracker update fails → Manual confirmation required

---

**Next Steps:**
After using this workflow, the task/feature will be properly completed, archived, and tracked with semantic commits and quality validation.
