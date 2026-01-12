---
description: Finish a feature cleanly and update tracking safely
---
# /feature-complete

## Goal
Finish a feature cleanly and update tracking safely.

## Steps
1. Confirm what "done" means for this feature.
2. Check obvious issues:
   - Build errors if applicable
   - Console errors if applicable
   - Unused imports introduced by the change
3. Propose a semantic commit message.
4. Ask whether to update `docs/features_tracker.md` and only do it if approved.
5. Provide the end of task summary.

## Integration with Rules
This workflow applies:
- Git discipline from global rules (semantic commits)
- Project tracking rules from project-context.md
- End of task summary format from global rules
- Conservative approach from project-behavior.md

## Usage
Invoke this workflow when:
- A feature is ready for completion
- You need to finalize changes and update tracking
- You want to ensure all quality checks are done
- You're ready to commit changes

## Project-Specific Behavior
This workflow is specific to VJobs Landing because:
- It references `docs/features_tracker.md` (project-specific tracking)
- It follows the project's conservative approval process
- It respects the project's tracking structure and IDs

## Example Execution
```
What does "done" mean for this feature?
User: The contact form should validate email and show success message

Quality Checks:
✓ No build errors
✓ No console errors
✓ No unused imports

Proposed Commit Messages:
1. feat: add email validation and success message to contact form
2. feat(contact): implement email validation with user feedback
3. feat: enhance contact form with validation and success state

Which commit message do you prefer? (1/2/3)

Update docs/features_tracker.md?
- Mark feature #12 as completed
- Add completion timestamp
Proceed? (Yes/No)

End of Task Summary:
Files touched:
- src/components/ContactForm.vue
- src/utils/validation.js

What changed:
- Added email validation using regex
- Implemented success message component
- Added error handling for invalid emails

Risks or follow-ups:
- Test with various email formats
- Consider adding backend validation
- May need i18n for error messages
```
