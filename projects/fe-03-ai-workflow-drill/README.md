# FE-03 — AI-Assisted Workflow Drill

This assignment package contains two independent implementations of the same
settings form:

- `fe-03-vague-prompt`: generated from one vague prompt and accepted with minimal review.
- `fe-03-precise-prompt`: generated from a detailed specification with tests and verification.

## Current evidence format

The public repository currently keeps the implementations as branch snapshots
and includes a portable Git bundle with the original branch history. The two
branches are not currently exposed as remote branches on the main GitHub
repository, so this package must not claim that `git branch -a` at the
repository root will show them.

## Restore, review, and compare

```bash
git clone submission/FE-03-repository.bundle fe-03-restored
cd fe-03-restored
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

The snapshots under `submission/branch-snapshots/` provide a second,
tool-independent way to inspect both results. `WORKFLOW.md` explains why the
precise round required more prompt preparation but less correction and review
effort overall.
