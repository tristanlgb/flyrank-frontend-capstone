# FE-12 — 2–3 Minute Demo Script

Record the real application and terminal. Do not use slides.

## 0:00–0:25 — Introduce the problem

> I built this capstone to show a verifiable AI-assisted workflow, not only a
> finished screen. The project combines a React interface, a protected dynamic
> mentor section backed by a server route, a custom WebGL shader, and a
> read-only agent that checks my
> portfolio evidence.

Open:

<https://flyrank-frontend-capstone-eight.vercel.app>

## 0:25–0:55 — Show the signature hero

Move the pointer over the shader.

> This is a custom fragment shader using time, resolution, and mouse input. The
> device pixel ratio is capped, animation pauses in a hidden tab, and reduced
> motion receives a static gradient.

## 0:55–1:35 — Show the primary dynamic flow

Open `#chat` and submit:

```text
What should I build next?
```

> The browser sends the conversation to a Vercel server function. The route
> validates input, limits repeated requests, and returns the answer as streamed
> chunks. No secret is exposed in the browser. This production version uses the
> free deterministic fallback because no Anthropic key is configured.

Wait until the complete response is visible.

## 1:35–2:10 — Show verification and one caught bug

In VS Code:

```powershell
npm.cmd test
npm.cmd run typecheck
```

> One bug I caught was a client-server mismatch: React sent `text`, while the
> endpoint expected `content`. After fixing that, Vercel runtime logs exposed a
> second request-interface mismatch. I fixed the adapter, redeployed, and
> repeated the real browser flow.

## 2:10–2:40 — Show the agent

```powershell
cd "projects/portfolio-evidence-agent"
npm.cmd test
npm.cmd start
```

Open `output/verification-report.md`.

> The agent checks named GitHub evidence and public links, then writes PASS or
> NEEDS REVIEW. It is read-only, and file existence is not treated as proof of
> truth.

## 2:40–3:00 — Close

> The README contains setup, architecture, screenshots, evaluation results,
> limitations, and the exact AI workflow examples. The main result is a public
> project whose claims can be checked instead of taken on trust.

## Recording safety

- Keep the video between 2 and 3 minutes.
- Do not show API keys, tokens, email, certificates with private identifiers,
  or unrelated browser tabs.
- Upload where reviewers can stream it without requesting access.
