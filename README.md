# FlyRank Frontend Capstone

An accessible React and TypeScript capstone that demonstrates two practical
AI-assisted workflows:

1. a streamed frontend-mentor interface with a protected server endpoint; and
2. a read-only portfolio evidence agent that checks GitHub files and public
   links before a case study is submitted.

The project is for reviewers, mentors, and junior-frontend hiring teams who
want to see both the result and the verification process behind it.

## Live projects

- Portfolio: <https://tristan-empty-but-live.vercel.app>
- Source repository:
  <https://github.com/tristanlgb/flyrank-frontend-capstone>
- Dynamic chat: deploy this repository to Vercel, then open `/#chat`.

## What the dynamic feature does

The chat accepts one frontend question, sends it to the server-side
`/api/chat` endpoint, and progressively displays the returned response. The
endpoint validates input, limits repeated requests, protects the optional API
key, and falls back to a deterministic mentor response so the free demo still
works without paid usage.

See [MAKE-IT-DO-SOMETHING.md](MAKE-IT-DO-SOMETHING.md) for the plain-language
backend and data-flow explanation.

## Architecture

```text
Visitor
  |
  v
React + TypeScript interface
  |
  | POST /api/chat
  v
Vercel server function
  |-- validates message count and length
  |-- applies a per-client request limit
  |-- uses Claude when a server-side key exists
  `-- otherwise uses the free deterministic fallback
  |
  v
Streamed text response -> React conversation

Portfolio Evidence Agent
  |
  | reads input/request.json
  v
GitHub REST API + public URL checks
  |
  v
output/verification-report.md
```

## Requirements

- Node.js 20 or newer
- npm
- Git
- Optional: Vercel CLI for running the server endpoint locally

## Setup

```bash
git clone https://github.com/tristanlgb/flyrank-frontend-capstone.git
cd flyrank-frontend-capstone
npm install
```

Start the frontend:

```bash
npm run dev
```

Open the local URL printed by Vite. The static screens work with this command.
To run `/api/chat` locally as a server function, install or invoke the Vercel
CLI and use:

```bash
npx vercel dev
```

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | No | Enables a live Claude response. It must exist only on the server. |
| `ANTHROPIC_MODEL` | No | Overrides the default Claude model name. |

With no API key, the endpoint returns a transparent deterministic fallback.
This avoids exposing a secret or requiring paid credits for basic evaluation.

## Commands

```bash
npm run dev
npm run test
npm run typecheck
npm run lint
npm run build
```

Run the evidence agent separately:

```bash
cd FL-07-AGENT-MVP
npm start
npm test
```

Its input is `FL-07-AGENT-MVP/input/request.json`; its report is written to
`FL-07-AGENT-MVP/output/verification-report.md`.

## V2 evaluation results

| Evaluation | Expected behavior | Current result |
| --- | --- | --- |
| Incomplete agent request | Reject before network work | Pass |
| Complete evidence set | Produce a `PASS` report | Pass |
| Missing evidence | Keep the missing file visible | Pass |
| Default frontend route | Render the capstone overview | Pass |
| Dynamic chat route | Render an accessible labeled input | Pass |
| Production build | Type-check and create optimized assets | Pass |

Automated verification:

```text
Frontend: 2 tests passed
Agent: 3 tests passed
TypeScript: passed
Production build: passed
```

## Limitations

- The evidence agent proves that named files and links exist; it cannot prove
  that a written claim is persuasive or truthful in context.
- The GitHub connection is public and unauthenticated, so rate limits can
  temporarily stop a run.
- The chat's in-memory request limiter is appropriate for a small demo, not a
  high-traffic distributed service.
- Without `ANTHROPIC_API_KEY`, the chat demonstrates the full backend and
  streaming flow but uses a deterministic response rather than a model.
- Automated Safari testing is not included; mobile Safari needs a manual pass.
- The repository still contains historical assignment snapshots, so the main
  test configuration intentionally limits Vitest to `src/`.

## Important engineering decisions

- Keep API keys on the server.
- Cap requests at 12 messages and 1,000 characters per message.
- Cap server execution at 15 seconds.
- Keep the evidence agent read-only; it never commits, publishes, or rewrites
  portfolio claims.
- Treat missing evidence and network uncertainty as review items rather than
  inventing a successful result.

## How AI tools helped build this

AI assistance was used to critique the first README, compare a vague prompt
with a constrained prompt, design pre-build evaluation cases, and review the
streaming workflow. Human verification caught a concrete integration bug: the
React client sent message text under `text`, while the server expected
`content`. The fix mapped the client data to the server contract and added
tests plus a production build check. AI output was treated as a draft; tests,
type checking, live checks, and Git diffs determined what was accepted.

## Demo checklist

For the FL-09 video:

1. Show this README and the architecture sketch.
2. Run the automated tests.
3. Open the live chat and submit “What should I build next?”
4. Explain why the API key stays on the server.
5. Show one limitation: without a key the free fallback is deterministic.
6. Run the portfolio evidence agent and open its generated report.

## License

[MIT](LICENSE)
