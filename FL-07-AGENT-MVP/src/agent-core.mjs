const githubHeaders = { Accept: "application/vnd.github+json", "User-Agent": "portfolio-evidence-agent-fl07", "X-GitHub-Api-Version": "2022-11-28" };

export function validateRequest(request) {
  const errors = [];
  if (!request?.caseTitle) errors.push("caseTitle is required");
  if (!/^[\w.-]+\/[\w.-]+$/.test(request?.repository ?? "")) errors.push("repository must use owner/name format");
  if (!Array.isArray(request?.claims) || request.claims.length === 0) errors.push("at least one claim is required");
  if (!Array.isArray(request?.links)) errors.push("links must be an array");
  return errors;
}

export async function fetchRepositoryTree(repository, fetchImpl = fetch) {
  const repoResponse = await fetchImpl(`https://api.github.com/repos/${repository}`, { headers: githubHeaders });
  if (!repoResponse.ok) throw new Error(`GitHub repository request failed (${repoResponse.status})`);
  const repo = await repoResponse.json();
  const branch = repo.default_branch;
  const treeResponse = await fetchImpl(`https://api.github.com/repos/${repository}/git/trees/${encodeURIComponent(branch)}?recursive=1`, { headers: githubHeaders });
  if (!treeResponse.ok) throw new Error(`GitHub tree request failed (${treeResponse.status})`);
  const tree = await treeResponse.json();
  return { branch, url: repo.html_url, checkedAt: new Date().toISOString(), files: new Set(tree.tree.filter(e => e.type === "blob").map(e => e.path)) };
}

export async function checkLink(url, fetchImpl = fetch) {
  try {
    let response = await fetchImpl(url, { method: "HEAD", redirect: "follow" });
    if (response.status === 405 || response.status === 403) response = await fetchImpl(url, { method: "GET", redirect: "follow" });
    return { url, ok: response.ok, status: response.status, finalUrl: response.url || url };
  } catch (error) {
    return { url, ok: false, status: 0, error: error instanceof Error ? error.message : String(error) };
  }
}

export async function runVerification(request, fetchImpl = fetch) {
  const errors = validateRequest(request);
  if (errors.length) throw new Error(errors.join("; "));
  const repository = await fetchRepositoryTree(request.repository, fetchImpl);
  const claimResults = request.claims.map(claim => {
    const evidence = claim.evidenceFiles.map(path => ({ path, found: repository.files.has(path) }));
    return { text: claim.text, evidence, passed: evidence.length > 0 && evidence.every(item => item.found) };
  });
  const linkResults = await Promise.all(request.links.map(url => checkLink(url, fetchImpl)));
  return { passed: claimResults.every(c => c.passed) && linkResults.every(l => l.ok), repository, claimResults, linkResults };
}

export function formatReport(request, result) {
  const lines = ["# Portfolio Evidence Report", "", `**Case:** ${request.caseTitle}`, `**Repository:** [${request.repository}](${result.repository.url})`, `**Branch checked:** \`${result.repository.branch}\``, `**Checked at:** ${result.repository.checkedAt}`, `**Final status:** ${result.passed ? "PASS" : "NEEDS REVIEW"}`, "", "## Claim verification", ""];
  for (const claim of result.claimResults) {
    lines.push(`### ${claim.passed ? "PASS" : "NEEDS REVIEW"} — ${claim.text}`, "");
    for (const evidence of claim.evidence) lines.push(`- ${evidence.found ? "Found" : "Missing"}: \`${evidence.path}\``);
    lines.push("");
  }
  lines.push("## Live link checks", "");
  for (const link of result.linkResults) lines.push(`- ${link.ok ? "PASS" : "NEEDS REVIEW"} — ${link.url} — HTTP ${link.status || "connection failed"}`);
  lines.push("", "## Human review boundary", "", "This agent verifies that named evidence and links exist. It does not decide whether a claim is persuasive, truthful in context, or ready to publish. Unsupported evidence remains visible for human review.", "");
  return lines.join("\n");
}
