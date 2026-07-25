# FL-07 Submission

## Working agent

The Portfolio Evidence Agent reads portfolio claims, connects to the live GitHub repository, checks named evidence and public URLs, and writes a verification report without mid-run editing.

## Deliverables

- Agent source and instructions: this project folder
- Real input: `input/request.json`
- Successful output: `output/verification-report.md`
- Build history and documented cuts: `BUILD-LOG.md`
- Raw capture instructions: `RUN-CAPTURE.md`

The live connection is the GitHub REST API. The successful run returned PASS. The MVP excludes automatic writing, private-repository access, and repository edits so that it proves the narrowest useful loop first.
