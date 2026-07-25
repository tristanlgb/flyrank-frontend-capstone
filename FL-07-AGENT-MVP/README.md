# Portfolio Evidence Agent — FL-07 MVP

This working agent checks whether a portfolio case study is supported by live repository evidence. It reads a structured request, connects to the public GitHub API, inspects the current repository tree, checks live URLs, and writes a Markdown verification report.

## Core job

Given a case title, claims, expected evidence files, and public links, the agent validates the request, connects to GitHub, checks every item, and writes a final `PASS` or `NEEDS REVIEW` report. The loop runs without mid-run editing.

## Run

```bash
npm start
```

Input: `input/request.json`  
Output: `output/verification-report.md`

## Test

```bash
npm test
```

The agent uses GitHub's public REST API and live HTTP requests. It is read-only: missing evidence remains visible for human review.
