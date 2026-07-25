# FL-06 Agent Design: Portfolio Evidence Agent

**Owner:** Tristan Lenzberg  
**Platform:** Scripted Node.js agent  
**Build target:** A working core loop in roughly 10 hours

## Job to be done

When I prepare a portfolio case study, I need the agent to check whether every named claim has current, public evidence before I submit or publish it. The agent receives a case title, a GitHub repository, claims, expected evidence files, and public links. It inspects the live repository and links, then creates a `PASS` or `NEEDS REVIEW` Markdown report. It never rewrites or publishes the case.

The user is me: a frontend intern building portfolio evidence from real work. I expect to run it after a meaningful case-study edit and before each FlyRank submission, usually one to three times per week. Success means one command completes the full loop without mid-run editing and makes missing evidence obvious.

**In scope:** request validation, public GitHub file discovery, live-link checks, per-claim evidence results, a saved report, and safe failure messages.

**Out of scope for the first 10 hours:** private repositories, automatic rewriting, publishing, semantic truth judgments, a database, and a web UI.

## Tools, data, and access plan

- **Input file:** `input/request.json`, stored locally. It contains only a repository name, public claims, expected file paths, and public URLs.
- **GitHub REST API:** unauthenticated, read-only requests to repository metadata and the recursive file tree. The selected repository is public, so the MVP needs no token. If rate limits block a run, the agent stops with a clear error; it does not scrape GitHub or request credentials silently.
- **Live HTTP checks:** `HEAD` requests to each URL, with `GET` fallback only for services that reject `HEAD` with 403 or 405.
- **Local filesystem:** read the JSON request and write `output/verification-report.md`. The agent may write only to the user-supplied output path.
- **Node.js:** built-in `fetch`, file, path, and test modules. No paid service or secret is required.

Private repository support would require the user to explicitly provide and approve a limited read-only GitHub credential. That is a later feature, not an assumption in the MVP.

## Draft agent instructions

1. Validate the request before making network calls. Reject missing titles, malformed `owner/repository` names, empty claims, or invalid link arrays.
2. Read the repository's current default branch and recursive file tree through the official GitHub API.
3. For each claim, check every named evidence path. Pass the claim only when all required files exist.
4. Check every supplied public URL. Record the final HTTP status; never replace a failed link with a guessed one.
5. Set the overall result to `PASS` only when all claims and links pass.
6. Write a readable Markdown report containing the timestamp, branch, claim evidence, link results, and human-review boundary.
7. Never edit repositories, rewrite claims, publish content, or describe file existence as proof that a claim is true in context.
8. On validation, GitHub, or network failure, stop safely and explain the failure. Never invent a result.

## Pre-build evaluation cases

### Eval 1 — Complete public case

**Input:** A valid public repository; three claims whose five named files exist; two reachable URLs.  
**Expected:** Every item and the final report show `PASS`; the report records the real branch and check time.  
**Failure signal:** A false missing file, skipped URL, or hard-coded pass.

### Eval 2 — One missing evidence file

**Input:** A valid claim that requires `LICENSE`, but the repository tree does not contain it.  
**Expected:** That claim and the final report show `NEEDS REVIEW`; the exact missing path remains visible.  
**Failure signal:** The agent passes because other evidence exists or silently removes the unsupported claim.

### Eval 3 — Broken public link

**Input:** Existing evidence files plus one URL returning 404.  
**Expected:** File checks pass, the URL records HTTP 404, and the overall result is `NEEDS REVIEW`.  
**Failure signal:** A redirect or guessed replacement hides the broken link.

### Eval 4 — Invalid request

**Input:** Missing case title, malformed repository value, no claims, or links that are not an array.  
**Expected:** Validation stops the run before any network request and lists the input errors.  
**Failure signal:** A GitHub request is attempted or a partial report is labeled valid.

### Eval 5 — GitHub unavailable or rate-limited

**Input:** GitHub responds with 403, 429, or a network failure.  
**Expected:** The agent stops with the real status and does not create a false verification result. A later manual retry is possible.  
**Failure signal:** Cached, invented, or stale repository evidence is reported as current.

### Eval 6 — Service rejects HEAD

**Input:** A valid URL returns 405 or 403 to `HEAD` but 200 to `GET`.  
**Expected:** The agent retries once with `GET` and records 200.  
**Failure signal:** Endless retrying, a false broken-link result, or fallback on unrelated status codes.

## Risks and guardrails

- **False confidence:** File existence does not prove a claim is truthful. Every report states this limitation and leaves final approval to me.
- **Irreversible actions:** The agent must never commit, push, publish, delete, send messages, or modify a case. Any future write capability requires a separate confirmation immediately before the action.
- **Credentials:** Never request, print, log, or store tokens in the request or report. Private access must use a read-only credential supplied through an approved secret mechanism.
- **Privacy:** Accept only public portfolio evidence in the MVP. Reject local personal documents and private links.
- **Network uncertainty:** Preserve actual HTTP errors and timestamps. Do not convert timeouts into passes.
- **Filesystem safety:** Write only to the explicit output path. Never overwrite unrelated files without confirmation.

## Platform choice

I chose a scripted Node.js agent because I can run it for free, inspect every decision, test failures with mocked network responses, and reuse my JavaScript skills. It also produces a repository artifact that another person can run.

A Claude Project with connectors would be faster to prototype and better at semantic interpretation, but its behavior would be harder to test deterministically and the required connectors may depend on account access. An n8n workflow would provide a visual loop, but adds hosting and workflow configuration without improving this narrow read-only check. The scripted path is therefore the smallest platform I can actually run and explain within ten hours.

## Definition of done

The agent runs from one command, uses live GitHub and URL data, passes the six pre-build evals or their automated equivalents, writes a complete report, and performs no external write action.
