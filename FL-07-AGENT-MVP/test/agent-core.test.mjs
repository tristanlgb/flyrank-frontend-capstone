import assert from "node:assert/strict";
import test from "node:test";
import { formatReport, runVerification, validateRequest } from "../src/agent-core.mjs";

function mockFetch(url) {
  if (url.endsWith("/repos/example/project")) return Promise.resolve(new Response(JSON.stringify({ default_branch: "main", html_url: "https://github.com/example/project" }), { status: 200 }));
  if (url.includes("/git/trees/")) return Promise.resolve(new Response(JSON.stringify({ tree: [{ path: "README.md", type: "blob" }, { path: "CLAUDE.md", type: "blob" }] }), { status: 200 }));
  return Promise.resolve(new Response(null, { status: 200 }));
}

test("rejects incomplete input", () => assert.equal(validateRequest({}).length, 4));

test("completes a PASS loop", async () => {
  const request = { caseTitle: "Test", repository: "example/project", claims: [{ text: "Docs exist", evidenceFiles: ["README.md", "CLAUDE.md"] }], links: ["https://example.com"] };
  const result = await runVerification(request, mockFetch);
  assert.equal(result.passed, true);
  assert.match(formatReport(request, result), /Final status:\*\* PASS/);
});

test("keeps missing evidence visible", async () => {
  const request = { caseTitle: "Test", repository: "example/project", claims: [{ text: "License exists", evidenceFiles: ["LICENSE"] }], links: [] };
  const result = await runVerification(request, mockFetch);
  assert.equal(result.passed, false);
  assert.match(formatReport(request, result), /Missing: `LICENSE`/);
});
