# FL-09 — Documentation and Demo Video

## README

<https://github.com/tristanlgb/flyrank-frontend-capstone/tree/main/FL-07-AGENT-MVP>

## Demo video

Add the unlisted YouTube URL here after recording:

```text
https://youtu.be/REPLACE-WITH-VIDEO-ID
```

## What the video demonstrates

- A real end-to-end agent run.
- Three passing automated tests.
- A live connection to the public GitHub REST API.
- A generated `PASS` or `NEEDS REVIEW` Markdown report.
- The read-only safety boundary.
- One limitation: evidence existence does not prove truth in context.

## Submission notes

I documented and demonstrated my Portfolio Evidence Agent, a read-only Node.js
agent for checking whether portfolio claims have current public repository
evidence and working links. The README includes reproducible setup steps, usage
examples, an architecture sketch, evaluation results, guardrails, build
history, and an honest limitations list.

The demo video shows a live request-to-report run rather than slides. I explain
why I separated testable verification logic from network and filesystem side
effects, and why the final interpretation remains a human responsibility.
