# AI Workflow Audit and Tool Setup

## Profile and working context

I am developing toward a junior frontend role. My current stack includes React and TypeScript, with learning experience in NestJS and MongoDB. I am completing the FlyRank Frontend AI Engineering internship and building a public capstone repository. I prefer communication that is direct, honest, clear, practical, approachable, and free of exaggeration.

## Weekly workflow audit

| # | Recurring task from my week | Classification | Rationale |
|---|---|---|---|
| 1 | Choose which frontend skill or assignment to prioritize | **Just me** | The priority depends on my career goals, available time, and honest assessment of what I need to learn; AI can inform but should not make that commitment for me. |
| 2 | Decide whether work accurately represents my own ability | **Just me** | I am responsible for what I submit and must personally decide whether I understand and can defend every claim. |
| 3 | Make final privacy and account-permission decisions | **Just me** | Authentication, data sharing, and persistent access affect my personal accounts, so the final decision should remain mine. |
| 4 | Break a FlyRank assignment into a checklist | **Collaborate with AI** | AI can extract requirements quickly, while I confirm the interpretation and choose the order of work. |
| 5 | Draft repository documentation | **Collaborate with AI** | AI helps overcome the blank page and improve structure, while I supply project facts and keep the wording honest. |
| 6 | Review and improve a README | **Delegate to AI with review** | AI can identify gaps and propose a small edit, but I must verify that it does not claim unimplemented features. |
| 7 | Generate a first implementation of a small React component | **Collaborate with AI** | AI accelerates scaffolding, while I direct requirements, inspect accessibility, and verify that I understand the code. |
| 8 | Debug a TypeScript or React error | **Collaborate with AI** | AI can suggest hypotheses, but I need to reproduce the problem, inspect evidence, and test the fix. |
| 9 | Write initial component-test cases | **Delegate to AI with review** | AI can enumerate common paths and edge cases, but I must confirm that tests match real behavior instead of generated assumptions. |
| 10 | Create Conventional Commit message candidates | **Delegate to AI with review** | AI can summarize a known diff into the required format; I review scope and accuracy before committing. |
| 11 | Format documentation and run deterministic quality checks | **Fully automate** | Formatting, linting, type checking, and test commands should run consistently without creative judgment once configured. |
| 12 | Produce a weekly progress summary from completed commits | **Delegate to AI with review** | AI can summarize the Git history efficiently, while I verify what was actually completed and remove inflated language. |
| 13 | Study React, TypeScript, NestJS, and MongoDB concepts | **Collaborate with AI** | AI can explain and quiz me, but I need to solve examples myself to confirm understanding. |
| 14 | Decide whether to apply for a junior frontend role | **Just me** | AI may review the job description, but the decision involves my interests, readiness, and personal circumstances. |

## Three reusable target tasks

### Target 1 — Review and improve repository onboarding

**Task:** Ask AI to inspect `README.md` and `CLAUDE.md`, identify the single highest-impact onboarding weakness, and propose the smallest accurate improvement.

**Done well means:**

- The response cites at least one specific repository fact.
- It introduces no unsupported feature, script, URL, or environment variable.
- The improvement is small enough to review as one focused diff.
- The final text is understandable to a new contributor in under two minutes.

This target was reused for FL-02's prompt iterations.

### Target 2 — Build a settings form with verification

**Task:** Direct AI to implement a React and TypeScript settings form with display-name and email validation, accessible feedback, async success/error states, tests, and verification commands.

**Done well means:**

- All controls have programmatic labels and keyboard-visible focus.
- Invalid input, successful save, failed save, and saving state are covered.
- Type checking, relevant tests, and the production build pass when the application scaffold exists.
- AI clearly reports any command it could not run instead of claiming success.

This target was reused for The Prompt Ladder.

### Target 3 — Diagnose and fix one reproducible frontend defect

**Task:** Use AI to investigate a concrete React or TypeScript defect by reproducing it, listing hypotheses, selecting evidence, applying the smallest fix, and adding a regression test.

**Done well means:**

- Reproduction steps fail before the change and pass afterward.
- The explanation names the root cause, not only the symptom.
- The patch is limited to relevant files.
- A regression test demonstrates the original failure.
- Lint, type checking, tests, and build results are recorded.

This target is reserved for FL-03 or FL-04.

## Toolkit and account evidence

| Tool | Status | Evidence status |
|---|---|---|
| ChatGPT | Configured and actively used for internship planning and document preparation | Activity is visible in the working environment; an account screenshot should be attached only from the authenticated account. |
| Cursor | Configured on the free plan and used to review and edit `README.md` | A real Cursor screenshot was created for FE-01 and shows the prompt, critique, and applied change. |
| Claude | Free account/login was opened, but Claude Code is not included in the free plan | A real authenticated Claude Project screenshot remains required; it is not fabricated in this document. |
| Anthropic Academy | Enrollment and first-module completion require the account owner's authenticated course session | Completion evidence remains required and should be captured from the real course dashboard. |

## Suggested Claude Project instructions

```text
You are my tutor for the FlyRank Frontend AI Engineering internship.

About me: I am developing toward a junior frontend role. I work mainly with React and TypeScript and have learning experience with NestJS and MongoDB.

Tone: direct, honest, clear, practical, approachable, and free of exaggeration.

Current goals: build a maintainable frontend capstone, learn to direct AI with clear requirements, verify generated work, document decisions, and produce evidence I can explain in an interview.

Ask questions before making unsupported assumptions. Help me reason instead of replacing my judgment. Clearly separate verified facts, suggestions, and anything that still requires human confirmation.
```

## Evidence limitation

This document completes the workflow audit and target-task definitions. Authenticated screenshots and Academy completion must come from the user's real accounts. They should be attached separately rather than simulated or described as completed without evidence.
