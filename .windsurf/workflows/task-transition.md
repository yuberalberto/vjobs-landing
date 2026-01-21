---
description: Transition from completed task to new task with full documentation
---
# /task-transition

## Goal
Archive completed task documentation, create new task documentation with structured template, and update features tracker atomically.

## Steps

### 1. Validate Completion
- Confirm the current task is actually complete
- Verify task detail file exists in `docs-project/`
- Check that all checklist items are marked [x]
- Ask user for confirmation before proceeding

### 2. Archive Completed Task
- Locate current task detail file: `docs-project/[task-name].md`
- Create archive directory if needed: `docs-project/archive/archived-tasks/`
- Move file to archive with timestamp: `archived-[task-name]-YYYY-MM-DD.md`
- Verify file was moved successfully

### 3. Create New Task Documentation
- Generate new task detail file: `docs-project/[new-task-name].md`
- Use structured template with sections:
  - Progress checklist
  - Technical Specifications
  - Implementation Steps
  - Testing Checklist
  - Risk Assessment
  - Current Status
- Include placeholders for user-specific configurations
- Ensure all content is in English (code, comments, docs)

### 4. Update Features Tracker
- Open `docs-project/features_tracker.md`
- Move completed task from Progress to Done section
- Add new task to Progress section with file reference
- Reorganize Next section if needed
- Fix numbering inconsistencies (N1, N2, N3, etc.)
- Update metadata: Last updated date and current branch
- Preserve all existing Done items

### 5. Verification
- Confirm archived file exists in correct location
- Verify new task file has complete structure
- Check features_tracker.md has correct updates
- Ensure no duplicate IDs or broken references

### 6. Summary Report
Provide clear summary:
- **Archived**: File path and new location
- **Created**: New task file with template structure
- **Updated**: Features tracker changes
- **Next Steps**: What user needs to provide (URLs, configs, etc.)

## Usage
```bash
/task-transition [completed-task-name] [new-task-name] [new-task-title]

Examples:
/task-transition refactor-services-section calendly-integration "Calendly Integration - Replace Contact Form"
/task-transition mobile-optimization seo-implementation "Basic SEO Setup"
```

## Template Structure for New Tasks

The workflow generates task documentation with this structure:

```markdown
# [Task Title]

This document provides detailed specifications for [task description].

## Progress
- [ ] Step 1
- [ ] Step 2
- [ ] Step 3
- [ ] Documentation update

---

## Technical Specifications

### 1. [Component/Area] Changes 🛠️
**Current State:**
- [Description]

**Required Changes:**
- [List of changes]

### 2. [Another Component] Changes 🏗️
**Keep Existing:**
- [What to preserve]

**Replace/Update:**
- [What to change]

---

## Implementation Steps

### Phase 1: [Phase Name]
1. [Step 1]
2. [Step 2]

### Phase 2: [Phase Name]
1. [Step 1]
2. [Step 2]

---

## Files to Modify

### Primary Changes:
- `path/to/file.ext` - [Description]

### No Changes Needed:
- `path/to/file.ext` - [Reason]

---

## Testing Checklist

### Functionality:
- [ ] Test case 1
- [ ] Test case 2

### Responsive:
- [ ] Desktop (>992px)
- [ ] Tablet (768-992px)
- [ ] Mobile (<=768px)
- [ ] Small mobile (<=576px)

### Performance:
- [ ] Load time
- [ ] No console errors
- [ ] Memory usage

---

## Configuration Requirements
[Placeholders for user-specific settings]

---

## Risk Assessment & Mitigation

### Potential Issues:
1. **Issue 1**: Description
2. **Issue 2**: Description

### Mitigation Strategies:
- Strategy 1
- Strategy 2

---

## Current Status

**State:** Planning phase
**Priority:** [P1/N1/B1]
**Dependencies:** [List dependencies]
**Estimated Effort:** [Time estimate]

---

**Next Steps:**
1. [Action 1]
2. [Action 2]
```

## Integration with Rules

This workflow applies:
- **Git discipline**: No auto-commits, semantic commit style
- **Permission protocol**: Ask before modifying files
- **Project tracking**: Single source of truth in features_tracker.md
- **Documentation scope**: Preserve archive as historical reference
- **Quality standards**: English for all code/docs, Spanish for chat

## Project-Specific Behavior

This workflow is specific to VJobs Landing because:
- Uses `docs-project/features_tracker.md` as main tracker
- Archives to `docs-project/archive/archived-tasks/`
- Follows project's task ID system ([P1], [N1], [B1], [D1])
- Respects project's documentation structure
- Maintains responsive breakpoints in testing checklists

## Safety Checks

Before execution:
- ✓ Verify completed task file exists
- ✓ Confirm task is actually complete
- ✓ Check archive directory exists
- ✓ Validate new task name is unique
- ✓ Ensure no filename conflicts

During execution:
- ✓ Backup before moving files
- ✓ Verify file operations succeed
- ✓ Check tracker updates are correct
- ✓ Preserve existing Done items

After execution:
- ✓ Confirm archived file in correct location
- ✓ Verify new task file is complete
- ✓ Check tracker has no broken references
- ✓ Ensure no duplicate IDs

## Example Execution

```
Input: /task-transition refactor-services-section calendly-integration "Calendly Integration"

1. ✓ Validating completion of refactor-services-section
2. ✓ Moving docs-project/refactor-services-section.md
   → docs-project/archive/archived-tasks/archived-refactor-services-section-2026-01-20.md
3. ✓ Creating docs-project/calendly-integration.md with template
4. ✓ Updating features_tracker.md:
   - Moved [P2] to Done
   - Added [P1] Calendly integration to Progress
   - Fixed Next section numbering
   - Updated timestamp
5. ✓ Verification complete

Summary:
- Archived: refactor-services-section.md → archive/archived-tasks/
- Created: calendly-integration.md (206 lines, complete template)
- Updated: features_tracker.md (Progress, Next, Done sections)
- Next: User needs to provide Calendly event URL
```

## Error Handling

**If completed task file not found:**
- List available task files in docs-project/
- Ask user to specify correct filename

**If new task file already exists:**
- Warn about overwrite
- Ask for confirmation or new name

**If archive directory missing:**
- Create directory structure automatically
- Confirm creation with user

**If tracker update fails:**
- Rollback file operations
- Report specific error
- Ask for manual intervention

## Workflow Chaining

This workflow integrates with:
- `/complete-feature` - Use before task-transition to finalize work
- `/git-commit-workflow` - Use after to commit changes
- `/code-integrity-check` - Run before archiving task
- `/review-changes` - Validate tracker updates

## Notes

- Always use absolute paths for file operations
- Preserve exact formatting in features_tracker.md
- Generate comprehensive task documentation
- Include all responsive breakpoints in testing
- Add placeholders for user-specific configurations
- Maintain English for all generated content
- Use Spanish only for user communication
