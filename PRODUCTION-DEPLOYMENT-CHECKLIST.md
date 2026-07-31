# Production Deployment Checklist

**Application:** Verifiable Frontend AI Capstone  
**Production URL:** https://flyrank-frontend-capstone-eight.vercel.app/  
**Hosting:** Vercel  
**Owner:** Tristan Lenzberg  
**Review date:** July 31, 2026

## Before deployment

- [x] Scope is limited to the existing production capstone.
- [x] No client-side secret or API key is present.
- [x] `npm install` completes from the committed lockfile.
- [x] TypeScript check passes.
- [x] Seven automated tests pass.
- [x] Frontend coverage exceeds the enforced 50% threshold.
- [x] Production build completes.
- [x] Production dependencies report 0 known vulnerabilities through
  `npm audit --omit=dev`.
- [x] Input validation, message caps, request limiting, and `maxDuration` are
  configured.
- [x] Missing model credentials fail safely through a disclosed fallback.
- [x] Dataset and ML files were scanned for committed credential values.

## Accessibility and performance

- [x] Semantic landmarks and a skip link are present.
- [x] Inputs have visible labels.
- [x] Keyboard focus indicators are visible.
- [x] Interactive controls are at least 44 px high in the tested mobile view.
- [x] Reduced-motion preferences disable the animated WebGL canvas.
- [x] Mobile Lighthouse performance score is at least 85.
- [x] Concrete audit findings were fixed.
- [x] Follow-up local axe WCAG 2.1 AA audit reports 0 violations.
- [ ] Manual screen-reader check completed.
- [ ] Real-phone mobile Safari check completed.
- [ ] Firefox and desktop Safari checks completed.

## Production verification

- [x] Production URL is publicly accessible.
- [x] Portfolio sections and project links render.
- [x] AI mentor request reaches `/api/chat` and streams a response.
- [x] Health indicator reads `/health.json`.
- [x] Mobile layout has no horizontal overflow.
- [x] No tested link or button is smaller than 44 px.
- [x] README contains setup, architecture, environment, testing, limitations,
  and AI-use documentation.
- [ ] Account owner configured and verified `ANTHROPIC_API_KEY` if a live
  model-generated production response is required for final evaluation.

## Monitoring

- Vercel deployment status is checked after every production deployment.
- Function failures are inspected through Vercel runtime logs.
- `/health.json` provides a simple public service-status signal.
- The mentor displays a visible error if the request or stream fails.
- There is no external error-tracking drain yet; Vercel logs are sufficient
  for the current portfolio traffic level.

## Rollback plan

1. Open the affected deployment in Vercel and inspect build/function logs.
2. If the failure is production-impacting, reassign the production alias to
   the last verified deployment with `vercel rollback` or Vercel’s deployment
   interface.
3. Reproduce the issue from the corresponding Git commit.
4. Fix it on a new commit and rerun type checking, tests, coverage, build,
   accessibility, and the critical browser flow.
5. Deploy the corrected artifact and verify the production alias.

Because Vercel deployments are immutable, rollback does not require rebuilding
the previous working artifact.

## Sign-off

**Technical sign-off:** automated checks, build, local accessibility audit, and
production browser flow verified on July 31, 2026.  

**Owner-only completion boundary:** real Anthropic credential, physical-device
evidence, Safari/Firefox checks, and screen-reader evidence require the account
owner or the appropriate device and must not be marked complete until run.
