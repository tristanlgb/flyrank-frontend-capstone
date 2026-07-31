# Documentation Continuity Guide

This file explains how the assignment documents relate to one another and
prevents historical milestones from being mistaken for the current product.

## Canonical current product

- **Production:** https://flyrank-frontend-capstone-eight.vercel.app/
- **Source:** https://github.com/tristanlgb/flyrank-frontend-capstone
- **Frontend:** React 19, TypeScript, and Vite
- **Server boundary:** Vercel Function at `/api/chat`
- **Main dynamic feature:** streamed frontend mentor with a transparent
  deterministic fallback when no Anthropic key is configured
- **Supporting artifact:** read-only Portfolio Evidence Agent

The final product combines the portfolio framing developed in General AI
Fluency with the implementation, testing, accessibility, and deployment work
from Frontend AI Engineering.

## Historical portfolio milestone

`https://tristan-empty-but-live.vercel.app/` is the separate Next.js portfolio
created for the General AI Fluency “Empty but Live” milestone. Documents that
describe it as Next.js are historically correct. It is not the source project
for the final Vite capstone.

The final stack changed because Vite better matches Tristan’s professional
workflow and the application does not require server rendering, an integrated
CMS, or App Router features. The change is a documented scope decision, not an
attempt to rewrite the earlier milestone.

## Assignment artifact types

### Current product documentation

`README.md`, `docs/capstone/SPEC.md`,
`docs/capstone/MAKE-IT-DO-SOMETHING.md`,
`docs/capstone/SIGNATURE-SHADER.md`,
`docs/frontend-engineering/FE-11-SUBMISSION.md`, and the FE-12 package describe
the current Vite production application.

### Historical process evidence

Prompt outputs, branch snapshots, the Week 4 Next.js description, and the Week
7 audit should remain faithful to the state that existed when they were
created. Add continuity notes when needed, but do not rewrite experimental
results to match the final product.

### External evidence still requiring the user

The repository must not claim completion for evidence that only the account
owner can produce:

- Anthropic Academy certificates;
- authenticated Claude Project screenshots;
- a real-phone screenshot and physical-device check;
- Safari and Firefox manual checks;
- raw and final demonstration videos;
- actual hours;
- a published LinkedIn post;
- a real person’s feedback when required.

## Language rules

- Use **AI-assisted** for the development workflow.
- Use **deterministic fallback** for the public mentor when no model key is
  configured; do not call the fallback a live Claude response.
- Use **route** only for a real URL or server endpoint. The portfolio uses
  section anchors such as `#chat`, not separate client-side routes.
- Use **current**, **historical**, **pending**, and **verified** explicitly so a
  reviewer can distinguish shipped behavior from planned or external evidence.
- Keep limitations visible. A strong justification explains the trade-off,
  evidence, and consequence instead of claiming that every choice was optimal.

## Known submission boundaries

- FE-03 preserves two restorable branches inside a portable Git bundle and two
  plain snapshots under `projects/fe-03-ai-workflow-drill/`.
- General AI Fluency Week 7 has a responsive browser audit, but the required
  physical-phone evidence remains pending.
- FE-11 has Chromium verification; Firefox, desktop Safari, and mobile Safari
  remain manual checks.
- FL-09 and FE-12 have scripts but still require real uploaded videos.
- FE-02 and FE-12 still require real Anthropic certificate evidence.
