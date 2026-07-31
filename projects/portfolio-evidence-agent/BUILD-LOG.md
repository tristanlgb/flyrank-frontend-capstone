# FL-07 Build Log

## MVP decision

I narrowed the FL-06 idea to one core job: verify whether named portfolio claims have current repository evidence. A successful run starts with one JSON request and ends with a saved Markdown report. The live data source is the GitHub REST API; the agent also checks the current public URLs.

## Iteration 1 — The scaffold did not run

The folder initially contained only a README and package file. The start command referenced a runner that did not exist. I added the runner, verification core, and real input file.

## Iteration 2 — Separate decisions from side effects

Putting validation, requests, formatting, and file writing in one script was difficult to test. I separated the verification functions from the command-line runner and allowed a mock fetch implementation in tests.

## Iteration 3 — Windows test command failed

The first command, `node --test test`, failed with `MODULE_NOT_FOUND` because Windows treated the folder as a module path. I changed it to `node --test test/*.test.mjs`. All three tests passed.

## Iteration 4 — Link fallback

Some services reject HEAD requests even when normal browser requests work. I added a GET retry only after HTTP 403 or 405. Network failures become NEEDS REVIEW evidence instead of crashing.

## Successful run

The live run inspected `tristanlgb/flyrank-frontend-capstone`, checked three claims against five files, checked two public URLs, and produced a PASS report.

## What I cut and why

- LLM rewriting: verification is the narrowest useful job.
- Authenticated MCP: the public REST API supplies the required live connection without secrets.
- Automatic edits: cut to preserve human approval.
- Web UI and database: unnecessary for proving the core loop.
- Semantic judgment: existence is verified; truth in context remains human work.

## Next iteration

Add authenticated private-repository support and inspect file contents, not only paths.
