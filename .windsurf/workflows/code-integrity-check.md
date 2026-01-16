---
description:  This workflow runs a comprehensive security, integrity, and testing review before pushing changes to the repository.
---
# Pre-Push Security & Integrity Audit

This workflow runs a comprehensive security, integrity, and testing review before pushing changes.
**CRITICAL INSTRUCTION:** Do not stop the workflow if issues are found in intermediate steps. Collect all findings and present a consolidated summary at the end (Step 7).

## Step 1: Dependency and Integrity Verification
- Run the command to scan for vulnerabilities in dependencies (e.g., `npm audit`, `pip-audit`, or `mvn dependency:analyze`).
- Verify that the lockfile is synchronized with the package manifest.
- **Log:** Note any critical or high-severity vulnerabilities found.

## Step 2: Static Analysis and Linters
- Run project linters to detect syntax or style errors.
- **Log:** Note any linting errors or warnings.

## Step 3: Secret Detection
- Scan the codebase specifically for high-entropy strings, API keys, and hardcoded credentials using regex patterns or specialized tool definitions.
- Check for accidental inclusion of sensitive files (like `.env`, private keys, `.pem` files, or `id_rsa`) in the git staging area.
- Verify that no new commits are adding secrets to the history.
- **Log:** Record specific file names and line numbers where potential secrets are found. **Do not display the secret itself.**

## Step 4: Dangerous Pattern Search
- Analyze the code for security anti-patterns and logic vulnerabilities (SAST).
- Look for usage of dangerous functions such as `eval()`, `exec()`, `innerHTML`, or `dangerouslySetInnerHTML`.
- Check for common injection risks (SQL Injection, OS Command Injection) in the new code changes.
- Identify hardcoded IP addresses or insecure HTTP (non-HTTPS) calls.
- **Log:** List any suspicious patterns identified.

## Step 5: Test Execution
- detect if there are any tests in the project (e.g., `npm test`, `pytest`).
- Run the unit test suite if exists (e.g., `npm test`, `pytest`).
- **Log:** Note how many tests passed and if any failed.

## Step 6: AI Code Review
- Analyze the changes in the current `git diff` (staged changes).
- Summarize what the new code does.
- Evaluate if the code follows SOLID principles and if it introduces technical debt.
- **Log:** Your qualitative assessment of the code safety and quality.

## Step 7: Final Summary and Decision
- **Action:** Compile all findings from Steps 1 through 6 into a formatted report.
- **Decision Logic:**
  - If **Critical Issues** (Secrets, Failed Tests, High Severity Vulns) are present: **RECOMMEND BLOCKING THE PUSH.** Explain why.
  - If only **Minor Issues** (Style warnings, low priority tech debt) are present: **WARN** but allow the user to decide.
  - If **No Issues**: Confirm the code is clean.
- **Final Interaction:** Ask me: "Based on this summary, do you want to proceed with `git push`?"