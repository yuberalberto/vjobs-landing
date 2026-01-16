# Session Handoff & Summary
This workflow analyzes the current code state and generates a structured summary designed to restore context in a new session without triggering immediate execution.

1. **Detect modified files**
   Execute: `git status`

2. **Analyze logic changes**
   Execute: `git diff`
   *(Note: Read the diff content to understand actual logic changes).*

3. **Extract key information**
   Synthesize information based on `git status`, `git diff`, and your current context.

4. **Generate summary**
   Create the final report by strictly filling out the following template.
   **CRITICAL:** Ensure the "STOP INSTRUCTIONS" header is included at the very top of the output.

---
<summary-template>
# 🛑 CONTEXT RESTORATION SNAPSHOT

> **SYSTEM INSTRUCTION:**
> This content is a **context memory dump** from a previous session.
> 1. **DO NOT** execute the "Next Actions" listed below automatically.
> 2. **DO NOT** modify any code yet.
> 3. **ACTION:** Just read this state, acknowledge you understand the current context/branch, and await user command.

---

## Current State
**Branch**: [branch-name]
**Task**: [What you are building/fixing]
**Status**: [What works, what is missing]

## Changed Files
- path/to/file.vue - [Technical explanation of the change]

## Next Actions
*(To be executed only upon user confirmation)*
1. [Immediate action required]
2. [Next priority]
- [ ] **Cleanup Check**: Any console.logs, commented code, or unused imports to remove?

## Important Context (for AI)
- [Technical decisions made]
- [Problems encountered]
- [Things that did NOT work and must be avoided (Critical)]
</summary-template>