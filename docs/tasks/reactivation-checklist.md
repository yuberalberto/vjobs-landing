# Reactivation Checklist – January 6, 2026

Purpose: coordinate the effort to bring the VJobs landing (repo + deployment) back online after ~6 months of inactivity. Use this alongside `tasks.md`, not in place of it.

---

## 1. Repository & Dependencies _(Owner: Frontend)_
- [x] Reinstall dependencies (`npm install`), run `npm audit`, and document required upgrades/fixes.
- [x] Run lint/build (`npm run lint`, `npm run build`) and capture any warnings introduced since the last commit.
- [x] Review `tasks.md` for stale statuses once reactivation is underway (get approval before editing per rules).

## 2. Environment & Secrets _(Owner: Ops)_
- [x] Verify `.env` exists locally and in Vercel with valid Brevo API keys / list IDs.
- [x] Rotate secrets if policy demands post-dormancy; record new expiry dates.
- [x] Confirm access to Brevo dashboards and any webhooks used by serverless functions.

## 3. Deployment _(Owner: Ops)_
- [x] Inspect Vercel project: last successful build, connected branch, domain (`vjobs.ca`) health, SSL status.
- [x] Trigger fresh deployment (staging → production) once dependencies pass QA.
- [x] Review serverless function logs for inactivity errors/timeouts and update runtime versions if needed.

## 4. Functional QA _(Owner: QA / Frontend)_
- [x] Smoke-test critical flows: navbar scroll + hash routing, hero CTA + modal, services popup, contact form (success/error), floating magnet.
- [x] Validate Brevo submissions reach the correct lists and automation sequences fire.
- [x] Cross-browser + device sweep (Chrome, Firefox, Safari, iOS Safari, Android Chrome) following [F16] items.

## 5. Performance & Assets _(Owner: Frontend)_
- [x] Resume [F15]/[F16] polish: mobile CTA sizing, spacing, responsive typography.
- [x] Implement responsive image strategy (optimized sizes, `loading="lazy"` where applicable).
- [x] Run `vite build --report` (or similar) to assess bundle size, identify regression fixes.

## 6. Automation & Testing _(Owner: DevOps / QA)_
- [x] Set up CI pipeline (GitHub Actions) running lint + unit tests on PRs.
- [x] Author baseline unit tests for forms/components; plan E2E suite (Playwright/Cypress) covering full contact funnel.
- [x] Document rollback strategy for deployments (e.g., Vercel preview promotion flow).

## 7. Analytics & Marketing _(Owner: Marketing / Analytics)_
- [x] Reconfirm Google Analytics + conversion tracking credentials and script inclusion.
- [x] Resume SEO backlog: meta tags, sitemap, robots.txt, schema updates.
- [x] Validate lead magnet asset (PDF) and email automation content for accuracy.

---

### Priority Guidance
1. Repository & dependencies + environment checks (unblock dev work).
2. Deployment verification (ensure site is live/stable).
3. Functional QA on modern browsers/devices.
4. Performance/UI polish + automated testing.
5. Analytics and marketing initiatives.

Update checkboxes as tasks complete; reference `tasks.md` for long-term backlog.
