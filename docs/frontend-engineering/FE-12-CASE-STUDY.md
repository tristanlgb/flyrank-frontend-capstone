# Case Study — Building a Verifiable AI-Assisted Frontend

## Project

**FlyRank Frontend Capstone**  
**Role:** Frontend developer and human reviewer  
**Stack:** React, TypeScript, Vite, Vitest, Testing Library, WebGL, Node.js,
Vercel Functions, GitHub REST API  
**Production:** <https://flyrank-frontend-capstone-eight.vercel.app>  
**Repository:** <https://github.com/tristanlgb/flyrank-frontend-capstone>

## The problem

I wanted to show more than a polished page and more than the sentence “I used
AI.” The real problem was trust: how could a reviewer see that I could direct
an AI-assisted workflow, understand the generated code, catch mistakes, and
verify the result?

The capstone became a small collection of connected evidence:

- a responsive React interface;
- a protected server endpoint for a dynamic mentor flow;
- a custom interactive WebGL shader;
- a read-only agent that checks portfolio claims against live GitHub files and
  public links;
- tests, build checks, deployment evidence, and written limitations.

The target user is a mentor or hiring reviewer looking at my work for the first
time. The main action is to try the live flow and then inspect the repository
evidence behind it.

## My approach

I worked in small loops:

1. define one narrow behavior;
2. ask the AI assistant to inspect the existing files before proposing changes;
3. add concrete constraints and expected behavior;
4. review the diff rather than accepting the answer as a finished result;
5. run tests, type checking, linting, and a production build;
6. deploy and repeat the real browser flow;
7. document failures and limitations instead of hiding them.

`CLAUDE.md` served as the standing project guide. It defined React and
TypeScript conventions, accessibility expectations, Conventional Commits, and
the checks required before finishing a task.

## What I built

### Dynamic mentor flow

The visitor writes a frontend question in React. The browser sends the
conversation to `/api/chat`. The Vercel server function validates the input,
applies usage limits, protects the optional model credential, and sends the
answer back as small server-sent-event chunks. React appends those chunks to
the visible conversation.

The endpoint accepts at most 12 messages, 1,000 characters per message, and 10
requests per client per minute. Its maximum execution time is 15 seconds.

The Claude API path is implemented but no `ANTHROPIC_API_KEY` is currently
configured in production. The deployed free-tier demonstration therefore uses
a deterministic mentor fallback. This proves the browser-to-server streaming
loop without pretending that a model call occurred.

### Portfolio Evidence Agent

The Node.js agent reads a JSON request containing a case title, claims,
expected evidence paths, and public links. It connects to the current public
GitHub repository, checks the file tree and links, and writes a Markdown report
with `PASS` or `NEEDS REVIEW`.

The agent is deliberately read-only. It cannot rewrite claims, commit changes,
publish work, or treat file existence as proof that a claim is true.

### Signature shader

The overview uses a custom WebGL fragment shader with `u_time`,
`u_resolution`, and `u_mouse`. Three wave fields form a violet, cyan, and mint
aurora that gently reacts to the cursor. The text remains accessible HTML over
the canvas.

Device pixel ratio is capped at 1.5, animation pauses when the tab is hidden,
and users with reduced-motion preferences receive a static gradient.

## Three specific AI workflow examples

### 1. A vague prompt versus an engineered prompt

For FE-03 I built the same settings form twice in independent branches.

The first prompt was:

> Create a settings form in React.

It produced something visually plausible, but the inputs relied on
placeholders, validation was missing, feedback used `alert`, repeated
submissions were possible, and there were no tests.

The second prompt referenced the real files, required a plan, named React Hook
Form and Zod, defined field rules, required visible labels and ARIA feedback,
and requested tests plus verification commands.

The second result added typed validation, normalized values, inline errors,
loading state, accessible relationships, and behavioral tests. The important
lesson was not that the prompt was longer. Each added constraint targeted a
specific failure from the first output.

Evidence:

- `projects/fe-03-ai-workflow-drill/WORKFLOW.md`
- the `fe-03-vague-prompt` and `fe-03-precise-prompt` snapshots;
- the branch diff and saved test results.

### 2. An AI accessibility mistake that looked correct

The precise settings-form output initially connected the email input to the
display-name error ID through `aria-describedby`. Visually, the form looked
correct. For a screen-reader user, it would announce the wrong validation
message.

I reviewed every input/error relationship, corrected the ID, and kept
accessibility behavior in the verification checklist. This changed my project
rules: visible correctness is not enough, and generated ARIA relationships
must be inspected individually.

Evidence:

- `projects/fe-03-ai-workflow-drill/WORKFLOW.md`;
- the precise form component and tests;
- `CLAUDE.md` accessibility rules.

### 3. Verification caught two production integration failures

The dynamic mentor compiled successfully but initially failed end to end.

First, React stored messages as `{ role, text }`, while the server contract
expected `{ role, content }`. Static typing did not catch the mismatch because
the boundary was a JSON request. I traced the browser request and mapped the
client messages to the server shape.

After deployment, the route still returned HTTP 500. The first implementation
treated the Vercel handler input as a Web `Request` and called
`request.headers.get(...)`. Runtime logs showed that the deployed Node function
used a different request interface. I rewrote the adapter for Vercel's
request/response shape, redeployed, and repeated the production test.

The final verification confirmed:

- valid request: HTTP 200;
- oversized request: HTTP 400;
- unsupported method: HTTP 405;
- visible streamed response in the browser;
- no recent production errors.

Evidence:

- commits `68283e7` and `05740c0`;
- `api/chat.ts`;
- production screenshot in `public/screenshots/chat-production.png`;
- FE-11 verification notes.

## The hard parts

### Separating deterministic logic from live side effects

The first agent scaffold mixed validation, GitHub requests, report formatting,
and filesystem writes. That made failures difficult to test. I separated the
core decisions from the command-line runner and made the fetch implementation
replaceable during tests.

This allowed three fast automated tests without depending on a live GitHub
request, while the final `npm start` command still exercised the real
connection.

### Treating deployment as part of development

Local build success did not prove that the server function matched the Vercel
runtime. Runtime logs and a real browser request were part of the engineering
loop, not a final ceremony after coding.

### Keeping the scope honest

I cut automatic rewriting, private-repository access, a database, and a web UI
from the evidence agent. The useful core was a read-only verification report.
This kept the build understandable and made the safety boundary clear.

## Verification loop

The final local checks are:

```bash
npm run test
npm run typecheck
npm run lint
npm run build
```

The evidence agent has its own checks:

```bash
cd projects/portfolio-evidence-agent
npm test
npm start
```

Observed results:

- frontend tests: 2 passed;
- agent tests: 3 passed;
- TypeScript: passed;
- ESLint: passed;
- production build: passed;
- live evidence report: `PASS`;
- production home and chat URLs: HTTP 200.

## Results

The capstone is public, reproducible from the README, and supported by a
Conventional Commit history. A reviewer can:

- open the custom shader hero;
- submit a mentor question;
- inspect the protected server route;
- run the evidence agent;
- reproduce the automated checks;
- read the build log and limitations.

The outcome I value most is not the visual effect or the number of files. It is
the traceable line from prompt, to generated draft, to human review, to test,
to production evidence.

## Limitations

- Production currently uses the deterministic fallback, not a live Claude API
  call, because no Anthropic key is configured.
- The rate limiter is in memory and is suitable for a small demonstration, not
  a distributed high-traffic product.
- The evidence agent checks file existence and public links, not semantic
  truth.
- Public GitHub requests can be rate-limited.
- Firefox, desktop Safari, and real mobile Safari remain manual checks and must
  not be marked as passed until they are actually tested.

## What I would build next

I would add a shared durable rate-limit store, automated API contract tests,
authenticated read-only support for private repositories, and semantic
evidence review that always asks for human approval before changing a claim.

I would also configure the Claude API in a protected preview environment and
compare real model output against the deterministic fallback using a small
evaluation set before promoting that path to production.
