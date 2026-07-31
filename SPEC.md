# FE-02 Capstone Specification

## Project choice

**FE4 — Open Project: Verifiable Frontend AI Capstone**

This capstone demonstrates an AI-assisted frontend workflow whose claims can be
checked. It combines a public React interface, a protected mentor endpoint, a
custom WebGL hero, and a read-only portfolio evidence agent.

## Target user

The primary user is a FlyRank mentor or junior-frontend hiring reviewer who has
limited time and wants to answer two questions:

1. Can Tristan build and deploy an accessible frontend feature?
2. Can he explain, test, and verify AI-assisted work instead of accepting
   generated code without review?

The secondary user is Tristan, who runs the evidence agent before submitting a
portfolio case study.

## User problem

A screenshot or polished interface does not prove how it was built. Reviewers
need a fast route from the visible result to source code, tests, documented
decisions, and current public evidence. Tristan also needs a repeatable way to
notice missing files or broken links before making a portfolio claim.

## Core flow

1. A reviewer opens the public capstone URL.
2. The portfolio hero states the professional claim and leads to selected work.
3. The reviewer reaches the embedded mentor section and submits a frontend
   question.
4. React sends the conversation to the protected `/api/chat` server function.
5. The server validates input, applies usage limits, and returns streamed text.
6. The reviewer can open the repository, README, tests, and case-study
   evidence.
7. Before submission, Tristan runs the separate evidence agent.
8. The agent reads a JSON request, checks GitHub files and public links, and
   writes a `PASS` or `NEEDS REVIEW` Markdown report.

## Screens and surfaces

- **Portfolio home:** professional claim, selected projects, About content,
  contact action, and links to public evidence.
- **Signature interaction:** custom WebGL shader, explanation, mentor action,
  and source link.
- **Embedded mentor:** suggested prompts, conversation history, streamed response,
  loading/stop behavior, and visible error feedback.
- **Process and health:** content mapping, accessibility, verification
  decisions, fetched service metadata, and a visible failure state.
- **Command-line agent:** JSON input and Markdown verification report. This is
  intentionally not a graphical screen in the first version.

## Data sources and tools

- User-entered mentor messages.
- Optional Anthropic Messages API, called only from the server.
- Deterministic guided fallback when no Anthropic key is configured.
- Public GitHub REST API for repository metadata and recursive file paths.
- Public HTTP `HEAD` checks with limited `GET` fallback.
- Local JSON input and Markdown output for the evidence agent.
- Vercel for production hosting and server functions.

No private repository, personal document, or browser credential is required.

## Where the AI feature lives

The AI integration boundary is the server-side `/api/chat` function. The
browser never receives a model credential. When `ANTHROPIC_API_KEY` is
configured, the function can send validated conversation messages to Claude.
The current public free-tier deployment has no key and transparently uses a
guided deterministic fallback instead of pretending that a model call
occurred.

AI assistance is also part of the development workflow: Cursor/AI review,
project rules in `CLAUDE.md`, prompt comparisons, diff review, automated checks,
runtime-log inspection, and production verification.

## Stack and justification

The product uses **React 19, TypeScript, Vite, CSS, Vitest, Testing Library,
Node.js, WebGL, and Vercel Functions**.

React + Vite was chosen because it matches Tristan's professional preference,
keeps the client build direct, and avoids adding framework features the current
product does not use. The earlier Week 4 portfolio used Next.js, but the final
capstone was consolidated in the established Vite repository so the stack
decision follows maintainability and familiarity rather than framework parity.
Vercel Functions provide the small server boundary needed to protect optional
API credentials without turning the frontend into a larger full-stack system.

## Success criteria

- A reviewer can open the production URL without authentication.
- The overview and mentor work at desktop and mobile widths.
- A valid mentor request receives a visible streamed response.
- Oversized or malformed requests are rejected.
- The evidence agent completes one live request-to-report run.
- Tests, type checking, linting, and the production build pass.
- The README lets a stranger clone and run the project.
- Limitations and non-AI fallback behavior are stated clearly.

## Out of scope

- Automatic publishing, commits, or portfolio rewriting.
- Private GitHub repositories or stored user credentials.
- A general-purpose chatbot in free fallback mode.
- A database or persistent conversation history.
- Authentication, accounts, payments, analytics, and team collaboration.
- Semantic proof that a portfolio claim is truthful.
- Unlimited API usage or enterprise-grade distributed rate limiting.
- Rebuilding the project in Next.js solely for framework parity.
