---
description: Generates a standardized chat name based on current context.
---
# Generate Chat Name Workflow

## Format
`[tipo]_[feature]_[estado]_[fecha]_[hora]`

Example: `feat_navbar-button-text_WIP_2025-01-13_20h44`

## Analysis Instructions
1. **Read entire chat history** to understand full context
2. **Identify the most significant outcome** (not just any activity)
3. **Ignore irrelevant context** such as:
   - Chat summaries or summary verification
   - Meta-discussions
   - Context restoration snapshots
   - Routine git operations
4. **Focus on the main achievement** of the session
5. **Determine priority**: What was the most valuable thing accomplished?

## Priority Rules (highest to lowest)
1. Workflow creation or significant tooling improvements
2. Feature implementation or bug fixes
3. Code refactoring or optimization
4. Documentation or planning
5. Discussions or explorations

## Output Format
Provide exactly **3 name options** ranked by relevance:

**Option 1:** [most_relevant_name]
**Option 2:** [alternative_interpretation]
**Option 3:** [broader_context_name]

## Component Definitions
- **tipo**: feat, fix, docs, workflow, refactor, test, style, chore
- **feature**: brief description (2-4 words max, use hyphens)
- **estado**: WIP, done, testing, blocked, review
- **fecha**: YYYY-MM-DD
- **hora**: HHhMM (24-hour format)
```
