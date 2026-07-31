# FE-03 — AI-Assisted Workflow Drill

This repository contains two independent implementations of the same settings form:

- `fe-03-vague-prompt`: generated from one vague prompt and accepted with minimal review.
- `fe-03-precise-prompt`: generated from a detailed specification with tests and verification.

## Review and compare

```bash
git branch -a
git checkout fe-03-vague-prompt
npm install
npm run dev

git checkout fe-03-precise-prompt
npm test
npm run typecheck
npm run build

git diff fe-03-vague-prompt..fe-03-precise-prompt
```

See `WORKFLOW.md`, `CLAUDE.md`, and `NOTES.md` on `main`.
