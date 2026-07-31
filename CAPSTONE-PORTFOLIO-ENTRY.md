# Production-Ready AI-Enhanced Frontend — Portfolio Entry

## Project brief

The Verifiable Frontend AI Capstone is a portfolio and working mentor experience
for FlyRank reviewers and junior-frontend hiring teams. It solves the problem
that “AI-assisted” work is difficult to trust when only the polished result is
visible: visitors can inspect selected projects, try a streamed frontend
mentor, review the source and tests, and follow the verification process behind
the claims. I chose this idea because it combines the React and TypeScript work
I want to do professionally with a narrower AI boundary that I can explain,
test, protect, and deploy.

## Live application

- Production: https://flyrank-frontend-capstone-eight.vercel.app/
- AI mentor: https://flyrank-frontend-capstone-eight.vercel.app/#chat
- Repository: https://github.com/tristanlgb/flyrank-frontend-capstone

The deployed application is functional, responsive, and publicly accessible.
It contains professional framing, selected frontend and ML work, a custom WebGL
interaction, the AI mentor, an explainable process section, a health check, and
a contact action.

## Architecture

```text
Browser
  |
  | React + TypeScript + accessible HTML/CSS
  | WebGL signature shader
  | POST /api/chat
  v
Vercel Function
  | validates method, JSON, message count, and message length
  | limits repeated requests
  | calls Anthropic when ANTHROPIC_API_KEY is configured
  ` falls back to transparent deterministic guidance otherwise
  |
  v
SSE text stream -> React conversation

Separate evidence paths
  |-- Node.js Portfolio Evidence Agent -> GitHub + URL report
  `-- Python ML workspace -> model report + ranked review queue
```

The frontend uses React 19, TypeScript, and Vite because this is the workflow I
prefer and the product does not require Next.js-specific rendering features.
The Vercel Function supplies the smallest server boundary needed to keep model
credentials out of the browser.

## AI integration

The mentor is designed to turn a frontend question into one concrete,
testable next step. Its system instruction is deliberately narrow:

> You are a concise, practical frontend mentor. Suggest one testable next step
> and mention accessibility when relevant.

The narrow role prevents the model from acting like a general-purpose chatbot
and connects every answer to the product’s actual job. The server sends
validated conversation history to the Anthropic Messages API when a key is
configured. If the external model is unavailable or no key exists, the public
demo returns a clearly documented deterministic answer rather than exposing a
secret, failing without explanation, or pretending that a model was called.

**Production disclosure:** the current public deployment may use the
deterministic fallback because no Anthropic key is committed or exposed. A
strict final AI-integration review should be performed after the account owner
configures `ANTHROPIC_API_KEY` in Vercel and confirms a model-generated answer
in production.

## Testing evidence

- Command: `npm test`
- Result: 7 tests passed across the current interface and chat fallback.
- Command: `npm run test:coverage`
- Frontend line and statement coverage: 62.64%.
- Threshold enforced in `vite.config.ts`: 50% lines and statements.
- App component coverage: 81.27% lines.
- The tests verify the portfolio composition, ML project evidence, embedded
  mentor form, and topic-specific fallback behavior.

Evidence:

- [`audits/coverage-summary.json`](audits/coverage-summary.json)
- [`audits/TESTING-EVIDENCE.md`](audits/TESTING-EVIDENCE.md)

## Performance and accessibility

The mobile Lighthouse audit recorded:

- Performance: 90
- Accessibility before the audit fix: 95
- Best Practices: 96
- SEO: 100
- Largest Contentful Paint: 2.7 seconds
- Cumulative Layout Shift: 0
- Total Blocking Time: 0 ms

The audit identified insufficient contrast in small orange labels, an
accessible-name mismatch in the mobile brand link, and a missing favicon. I
darkened the light-surface accent, added a separate high-contrast accent for
dark sections, kept the full brand name available to assistive technology, and
added an SVG favicon. A follow-up local axe WCAG 2.1 AA audit found 0
violations.

Evidence:

- [`audits/lighthouse-mobile-full.json`](audits/lighthouse-mobile-full.json)
- [`audits/axe-local.json`](audits/axe-local.json)
- [`audits/ACCESSIBILITY-PERFORMANCE-AUDIT.md`](audits/ACCESSIBILITY-PERFORMANCE-AUDIT.md)

Automated accessibility tools cannot detect every issue. Keyboard, screen
reader, real-phone, Firefox, and Safari checks remain part of the manual
completion boundary.

## Resilience and safe failure

- Requests must use POST and valid JSON.
- Conversations are limited to 12 messages.
- Each message is limited to 1,000 characters.
- Requests are limited to 10 per client during a 60-second window.
- Function execution is capped at 15 seconds.
- The browser exposes a visible error state and a Stop action.
- Partial streamed text remains visible when a request is stopped.
- Missing AI credentials activate a disclosed fallback.
- The separate evidence agent is read-only and keeps missing evidence visible.

## Deployment and operation

The filled checklist and rollback procedure are in
[`PRODUCTION-DEPLOYMENT-CHECKLIST.md`](PRODUCTION-DEPLOYMENT-CHECKLIST.md).
Vercel provides immutable deployments and production aliases. If a release
fails, the operator can immediately reassign the production alias to the
previous verified deployment or redeploy the previous Git commit. Runtime
status is visible through `/health.json`, browser verification, and Vercel
deployment/function logs.

## Known limitations and future improvements

- Configure and verify a real production Anthropic key before claiming that
  every public response is model-generated.
- Replace in-memory rate limiting with a shared durable store before
  high-traffic use.
- Add conversation persistence only if a real user need justifies the privacy
  and storage cost.
- Increase direct tests around streaming cancellation and WebGL lifecycle.
- Complete manual Firefox, Safari, mobile Safari, keyboard, and screen-reader
  checks.
- Replace pre-consolidation screenshots with current production captures.
- Complete the imported ML assignment notebooks before presenting the ML track
  as finished personal work.

## Reflection

See [`CAPSTONE-REFLECTION.md`](CAPSTONE-REFLECTION.md).
