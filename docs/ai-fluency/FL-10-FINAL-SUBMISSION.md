# FL-10 — Final Package, Retrospective, and Capstone

## Public project

- Live portfolio: <https://flyrank-frontend-capstone-eight.vercel.app/>
- Source repository: <https://github.com/tristanlgb/flyrank-frontend-capstone>
- Documentation index: <https://github.com/tristanlgb/flyrank-frontend-capstone/blob/main/docs/README.md>
- Capstone portfolio entry: <https://github.com/tristanlgb/flyrank-frontend-capstone/blob/main/docs/capstone/CAPSTONE-PORTFOLIO-ENTRY.md>
- Retrospective: <https://github.com/tristanlgb/flyrank-frontend-capstone/blob/main/docs/capstone/CAPSTONE-REFLECTION.md>

## General AI Fluency deliverables

The repository documentation index links the track artifacts, including the
workflow audit, prompting work, proof statement, content map, identity kit,
image curation, stack decision, no-code workflow, agent design, mobile fix log,
hardening review, continuity plan, README, and demo script.

## Build-in-public post draft

I started this capstone intending to build a polished AI-enhanced portfolio. I
finished with something more useful: a portfolio whose claims can be inspected.

One important decision was keeping the public mentor usable without exposing a
secret or requiring paid credits. The request still travels through a protected
server function and streams back to the interface, but when no Anthropic key is
configured it uses a clearly disclosed deterministic fallback.

That is also a real limitation: the public fallback demonstrates the complete
interaction and backend flow, but it is not a model-generated answer. I chose
to show that boundary instead of pretending every response came from AI.

Along the way I tested the interface, fixed a client/server data-contract bug,
improved accessibility and metadata, documented the architecture, and recorded
the remaining browser and scalability limitations. AI helped me critique,
draft, and explore; tests, production checks, and human judgment determined
what I accepted.

Live project: <https://flyrank-frontend-capstone-eight.vercel.app/>

Source and evidence: <https://github.com/tristanlgb/flyrank-frontend-capstone>

## Completion checklist

- [x] Repository and documentation index assembled.
- [x] Specific 500–800 word retrospective completed.
- [x] Live public portfolio available over HTTPS.
- [x] Build-in-public post drafted with one decision and one limitation.
- [ ] Verify and submit the completed hours log in the internship portal.
- [ ] Record and upload the 3–5 minute FL-09 live demo.
- [ ] Publish the build-in-public post and add its final URL here.
- [ ] Confirm whether FlyRank requires a separate FlyRank-owned domain rather
  than the current Vercel production URL.
- [ ] Obtain written mentor sign-off or complete the scheduled final demo review.

The unchecked items require account access, a personal recording or publication,
or human review. They are intentionally not represented as complete.
