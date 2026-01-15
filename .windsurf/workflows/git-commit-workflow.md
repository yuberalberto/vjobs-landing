---
description: Commit using predefined formats and create pull requests with standardized titles and descriptions using appropriate CLI commands.
---
# Git Workflows
## Steps
1. **Check repository status**
   ```bash
   git status
   git branch --show-current
Analyze changes
bash
git diff
Review the diff to understand what changed.
Stage files Ask user which files to stage:
All: git add .
Specific: git add [file-paths]
Interactive: git add -p
Generate commit message Based on the diff analysis, create a commit message following this format:[type]: [description]Types: feat, fix, docs, style, refactor, test, chore, perfRules:
Use imperative mood ("add" not "added")
Keep first line under 72 characters
Be specific and descriptive
Present the generated message to the user for approval.
Create commit
bash
git commit -m "[approved-message]"
Ask: Push to remote? If yes:
bash
git push --set-upstream origin [branch-name]
If no, stop here.
Ask: Create Pull Request? If yes, generate PR with this template:
bash
gh pr create --title "[commit-message-title]" --body "
## Changes
[Summary from commits]
## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation
## Testing
- [ ] Tested locally
- [ ] Added tests
## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
"
If no, stop here.
Summary Display what was accomplished:
Commit hash
Branch name
PR URL (if created)