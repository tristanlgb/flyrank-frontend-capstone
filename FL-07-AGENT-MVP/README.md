# Portfolio Evidence Agent

A small, read-only Node.js agent that checks whether the claims in a portfolio
case study have current public evidence. It is designed for Tristan, a frontend
intern who needs to verify assignment and portfolio claims before submitting
them to FlyRank.

The agent reads one JSON request, connects to the public GitHub REST API,
checks named repository files and public URLs, and writes a Markdown report
with a final `PASS` or `NEEDS REVIEW` result.

## Core job

Given a case title, repository, claims, evidence paths, and public links, the
agent:

1. validates the request;
2. retrieves the repository's current default branch and file tree;
3. checks every required evidence path;
4. checks every public URL;
5. keeps missing or uncertain evidence visible;
6. writes `output/verification-report.md`.

It completes this loop without mid-run hand editing.

## Architecture

```text
input/request.json
        |
        v
request validation
        |
        v
agent-core.mjs
   |                |
   v                v
GitHub REST API   public URL checks
   |                |
   +-------+--------+
           |
           v
claim and link results
           |
           v
output/verification-report.md
```

`src/agent-core.mjs` contains validation, checking, and report-formatting
logic. `src/run-agent.mjs` handles local file input/output and the live network
connection. Keeping those responsibilities separate makes the core behavior
testable without depending on GitHub during every test.

## Requirements

- Node.js 20 or newer
- npm
- Internet access for the live GitHub and URL checks
- A public GitHub repository

No API key, paid service, database, or package installation is required.

## Setup

Clone the repository and enter the agent folder:

```bash
git clone https://github.com/tristanlgb/flyrank-frontend-capstone.git
cd flyrank-frontend-capstone/FL-07-AGENT-MVP
```

Confirm Node is available:

```bash
node --version
```

The agent uses only built-in Node.js features, so `npm install` is not needed.

## Run the tests

On macOS or Linux:

```bash
npm test
```

On Windows PowerShell, use this if script execution blocks `npm.ps1`:

```powershell
npm.cmd test
```

Expected summary:

```text
tests 3
pass 3
fail 0
```

## Run the live agent

Review `input/request.json`, then run:

```bash
npm start
```

Windows PowerShell:

```powershell
npm.cmd start
```

The generated report will appear at:

```text
output/verification-report.md
```

To use different input and output files:

```bash
node src/run-agent.mjs path/to/request.json path/to/report.md
```

## Input example

```json
{
  "caseTitle": "Making an AI-assisted workflow visible",
  "repository": "tristanlgb/flyrank-frontend-capstone",
  "claims": [
    {
      "text": "The repository documents the project conventions.",
      "evidenceFiles": ["CLAUDE.md"]
    }
  ],
  "links": [
    "https://github.com/tristanlgb/flyrank-frontend-capstone"
  ]
}
```

## Output example

```text
# Portfolio Evidence Report

Final status: PASS

PASS — The repository documents the project conventions.
- Found: CLAUDE.md
```

If a named file is absent or a link fails, the agent records the exact problem
and changes the final result to `NEEDS REVIEW`.

## V2 evaluation results

| Evaluation case | Expected result | Observed result |
| --- | --- | --- |
| Incomplete request | Stop before network work | Pass |
| Complete evidence set | Generate a `PASS` report | Pass |
| Missing evidence path | Keep the missing path visible | Pass |
| Public repository lookup | Read the live default branch and tree | Pass |
| Reachable public URLs | Record successful HTTP results | Pass |
| `HEAD` rejected with 403/405 | Retry once using `GET` | Pass |

Automated test result:

```text
tests 3
pass 3
fail 0
```

The saved successful live run checked five files and two public URLs in
`tristanlgb/flyrank-frontend-capstone`.

## Guardrails

- The agent is read-only.
- It never commits, pushes, publishes, deletes, or rewrites a case study.
- It accepts public portfolio evidence only.
- It does not request, store, or print credentials.
- A network error cannot be converted into a successful result.
- Missing evidence remains visible for human review.

## Limitations

- File existence does not prove a claim is truthful or persuasive in context.
- Public unauthenticated GitHub requests are subject to rate limits.
- The agent checks named paths, not the semantic meaning of every file.
- It does not support private repositories.
- URL checks can be affected by temporary service or network failures.
- It produces Markdown in the terminal workflow; there is no graphical UI.

## Build history

The first scaffold referenced a runner that did not exist. The implementation
added the runner, separated core decisions from file/network side effects, and
made the network function replaceable in tests. A Windows-specific test command
also failed because the test directory was interpreted as a module; changing it
to `node --test test/*.test.mjs` made the command portable.

See [BUILD-LOG.md](BUILD-LOG.md) for the full iteration history.

## Demo

The FL-09 demonstration should show:

1. `npm.cmd test`;
2. `npm.cmd start`;
3. the generated verification report;
4. the read-only guardrail;
5. the limitation that existence is not the same as truth.

## License

The parent repository is available under the MIT License.
