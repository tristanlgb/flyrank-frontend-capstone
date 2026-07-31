# FE-11 — Production Deployment and README

## Production URL

<https://flyrank-frontend-capstone-eight.vercel.app>

## Final README

<https://github.com/tristanlgb/flyrank-frontend-capstone/blob/main/README.md>

## Source repository

<https://github.com/tristanlgb/flyrank-frontend-capstone>

## Verification summary

- Production deployment is public and returns HTTP 200.
- The mentor flow was tested from browser input through `/api/chat` to the
  rendered response.
- Frontend tests, TypeScript, ESLint, and production build pass.
- The API limits message count, message length, and repeated requests.
- The streaming handler has a 15-second `maxDuration`.
- The optional API key is server-side and no production secret is exposed.
- README includes screenshots, setup instructions, architecture, environment
  variables, decisions, evaluation results, limitations, and specific AI usage.
- Recent history uses Conventional Commits.

## Cross-browser status

- Chromium desktop: passed.
- Responsive 390×844 mobile viewport: passed.
- Firefox: manual test pending because Firefox is not installed locally.
- Safari and real mobile Safari: manual test pending because this build
  environment is Windows.

These pending checks must not be marked complete until they are run on the
actual browsers.

## Submission notes

I deployed the capstone to Vercel production and verified the complete dynamic
mentor flow from browser input to server response. The API route rejects
malformed or oversized input, limits requests per client, caps execution at 15
seconds, and keeps optional model credentials on the server.

The final README provides screenshots, clone-and-run instructions, an
environment-variable table, architecture, production decisions, evaluation
results, limitations, and specific examples of how AI assistance was reviewed.
One concrete integration bug involved the client sending `text` while the
server expected `content`; I caught it during end-to-end verification and fixed
the contract before redeploying.

## Manual completion checklist

- [ ] Open the production URL in Firefox.
- [ ] Open it in desktop Safari.
- [ ] Open it in mobile Safari on a real iPhone.
- [ ] Test navigation and submit one mentor message in each.
- [ ] Replace the pending rows in README with the browser versions and results.
