import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { formatReport, runVerification } from "./agent-core.mjs";

const inputPath = resolve(process.argv[2] ?? "input/request.json");
const outputPath = resolve(process.argv[3] ?? "output/verification-report.md");
console.log("Portfolio Evidence Agent");
console.log(`1. Reading request: ${inputPath}`);
try {
  const request = JSON.parse(await readFile(inputPath, "utf8"));
  console.log(`2. Connecting to GitHub: ${request.repository}`);
  const result = await runVerification(request);
  console.log(`3. Checking ${request.claims.length} claims and ${request.links.length} live links`);
  await mkdir(resolve(outputPath, ".."), { recursive: true });
  await writeFile(outputPath, formatReport(request, result), "utf8");
  console.log(`4. Report written: ${outputPath}`);
  console.log(`FINAL STATUS: ${result.passed ? "PASS" : "NEEDS REVIEW"}`);
  process.exitCode = result.passed ? 0 : 2;
} catch (error) {
  console.error(`AGENT ERROR: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
