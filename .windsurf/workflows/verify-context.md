---
description: Restore and verify project state from previous session snapshot
---
# /context-restore

## Goal
Restore project context from a previous session snapshot, verify actual state against expected state, identify discrepancies, and provide actionable status overview.

## Steps
1. **Read Context Snapshot**
   - Parse the restoration snapshot provided by user
   - Extract expected state (branch, files, commits, status)

2. **Verify Current Git State**
   - Check current branch: `git status`
   - List recent commits: `git log --oneline -5`
   - Compare with expected branch and commit history

3. **Analyze File States**
   - Compare expected vs actual file modifications
   - Check staged vs committed changes: `git diff --name-only`, `git diff main --name-only`
   - Verify specific files mentioned in context

4. **Check Remote Sync**
   - Verify remote branch status
   - Identify unpushed commits: `git log main..HEAD`

5. **Document Discrepancies**
   - List all mismatches between expected and actual state
   - Categorize: Critical (branch, commits) vs Informational (content)
   - Mark verified items as ✅, discrepancies as ❌

6. **Provide Status Summary**
   - Current branch and commit
   - Files with changes
   - Remote sync status
   - Next recommended actions

7. **Await User Direction**
   - Do NOT execute next actions automatically
   - Present options based on current state
   - Wait for explicit approval

## Integration with Rules
This workflow applies:
- Git discipline from global rules (semantic commits, branch management)
- Permission protocol (await approval before actions)
- Conservative approach (verify before assuming)
- Language protocol (communicate in Spanish, code in English)

## Usage
Invoke this workflow when:
- Starting a new session with a context restoration snapshot
- Need to verify project state after interruption
- Analyzing state discrepancies between sessions
- Planning next steps based on actual vs expected state

```
/context-restore

Then paste the context restoration snapshot
```

## Expected Input Format
Context snapshot should include:
- Current branch
- Task description
- Status (completed/pending items)
- Changed files with descriptions
- Next actions (not to be executed automatically)
- Important context notes

## Example Execution
```
Step 1: Reading context snapshot
Expected: main branch, staged changes in Navbar.vue

Step 2: Verifying git state
$ git status
Actual: feature/improve-navbar, no staged changes

Step 3: Analyzing discrepancies
❌ Branch: main vs feature/improve-navbar
❌ Staged changes: expected vs none found
✅ File content: matches expected modifications

Step 4: Status summary
Branch: feature/improve-navbar
Last commit: WIP: Navbar polishing (6a63472)
Remote: Not pushed

Step 5: Awaiting direction
Options:
1. Merge feature branch to main
2. Continue work on feature branch
3. Push feature branch to remote
```

## Safety Checks
- Never execute "Next Actions" from snapshot automatically
- Verify git status before making assumptions
- Confirm file contents when discrepancies found
- Check remote branch status
- Validate all paths and references

## Output Format
Provide structured analysis:
1. **Contexto Restaurado** - Acknowledge understanding
2. **Estado Confirmado** - List verified items
3. **Discrepancias Detectadas** - Document mismatches with ❌/✅
4. **Resumen** - Current state summary
5. **Esperando Instrucción** - Present options, await approval

## Generic Application
This workflow can be applied to any project by:
- Replacing project-specific file paths with actual paths from snapshot
- Adapting git commands to project's branch strategy
- Using project's documentation structure
- Following project's commit conventions