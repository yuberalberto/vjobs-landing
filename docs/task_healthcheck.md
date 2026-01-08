# Health Check Tracker

Legend:
- [] = To Do
- [x] = Completed
- [-] = In Progress
- [!] = Blocked

- **Scope:** Full security, functionality, and performance review before resuming development.

---

## Health Check Steps

[H1] - [x] Security & Dependencies
    - [x] Fixed npm audit vulnerabilities (vite 7.3.1 upgrade)
    - [x] Documented outdated packages (vue, vue-router, @vitejs/plugin-vue, vue-tel-input)
    - [!] Decide: Update dependencies now or defer to post-launch?

[H2] - [] Vercel Production Health
    - [] Access Vercel dashboard, verify latest deployment succeeded
    - [] Check for active alerts or warnings
    - [] Test live site loads correctly

[H3] - [] Critical Functionality Tests
    - [] Submit contact form → verify Brevo email received
    - [] Download lead magnet PDF → verify file serves correctly
    - [] Test mobile responsiveness on real device

[H4] - [] Environment & Secrets Audit
    - [] Verify VITE_BREVO_API_KEY exists in Vercel
    - [] Check API key hasn't expired/been revoked
    - [] Confirm no secrets leaked in git history

[H5] - [] Performance Baseline
    - [] Run Lighthouse on production URL (desktop + mobile)
    - [] Document scores (Performance, Accessibility, Best Practices, SEO)
    - [] Flag any score < 80 for follow-up

[H6] - [] Action Items Summary
    - [] List blocking issues (must fix before resuming dev)
    - [] List nice-to-haves (can defer)
    - [] Update features_tracker.md with new tasks if needed

---

## Follow-ups & Findings

- **H1:** Fixed 2 moderate vulnerabilities. Outdated packages identified: vue (3.5.13→3.5.26), vue-router (4.5.1→4.6.4), @vitejs/plugin-vue (4.6.2→6.0.3), vue-tel-input (6.0.5→9.5.1). Decision pending on update timing.
- **H2:** _Pending_
- **H3:** _Pending_
- **H4:** _Pending_
- **H5:** _Pending_
- **H6:** _Pending_
