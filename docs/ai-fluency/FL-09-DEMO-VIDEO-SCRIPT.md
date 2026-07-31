# FL-09 Demo Video Script

Target length: 3–5 minutes. Record the real screen and speak naturally; do
not show slides.

## 0:00–0:35 — What I built

> This is my FlyRank frontend capstone. It contains a dynamic mentor interface
> and a separate portfolio evidence agent. The mentor accepts a frontend
> question and returns a streamed response. The evidence agent checks whether
> my portfolio claims have real public files and working links behind them.

Show the production URL and briefly open the repository README.

## 0:35–1:35 — Live dynamic feature

Open:

<https://flyrank-frontend-capstone-eight.vercel.app/#chat>

Submit:

```text
What should I build next?
```

> React sends this message to a server function. The backend validates the
> request, applies input and usage limits, and sends the answer back in small
> chunks. React adds those chunks to the conversation. The optional API key
> stays on the server and is never exposed in the browser.

## 1:35–2:20 — One design decision and one limitation

> I deliberately kept exactly one dynamic feature. I added a deterministic
> fallback so reviewers can test the complete request-and-response flow without
> paid credits. The honest limitation is that when no Anthropic key is
> configured, the response follows a fixed mentor rule rather than calling a
> language model. The in-memory rate limit is also suitable for a small demo,
> not a high-traffic product.

## 2:20–3:20 — Evidence agent live run

In the VS Code terminal:

```powershell
cd "projects/portfolio-evidence-agent"
npm.cmd test
npm.cmd start
```

Open `output/verification-report.md`.

> The agent reads a structured request, connects to the current public GitHub
> repository, checks named evidence files and public URLs, and writes this
> report. It is read-only. It cannot commit, publish, or decide whether a claim
> is persuasive.

## 3:20–4:10 — AI workflow example

> One real bug I caught was a mismatch between the client and server. The React
> interface sent each message using a field named text, but the backend expected
> content. Both sides could compile, but the live request failed. I traced the
> data flow, corrected the contract, ran tests and type checking, redeployed,
> and repeated the production test.

## 4:10–4:30 — Close

> The repository README contains setup instructions, architecture, evaluation
> results, limitations, and the exact role AI assistance played. This project
> demonstrates that I can use AI as a build partner while keeping verification
> and final decisions human-owned.

## Recording checklist

- Show a real production run, not a slide.
- Keep the terminal text large enough to read.
- Do not display API keys, tokens, email inboxes, or private tabs.
- Explain one design decision and one limitation.
- Keep the final video between 3 and 5 minutes.
- Upload it as an unlisted YouTube video.
