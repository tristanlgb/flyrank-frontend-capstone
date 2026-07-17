# Prompting Fundamentals on Real Tasks v2

## Target task from the FL-01 workflow audit

Use AI collaboratively to review and improve the onboarding documentation for a real React and TypeScript capstone repository. A good result must be accurate for the repository, easy for a new developer to follow, concise, and explicit about anything that is not implemented yet.

## Version 1 — Naive baseline

### Prompt

> Improve my README.

### Representative output

> Add a project description, installation instructions, usage examples, contributing guidelines, and badges. Here is a more professional README structure with sections for features, technologies, setup, and deployment.

### Observed difference and reason

This produced a generic checklist and invented sections such as deployment and implemented features. The output sounded polished but was unsafe to apply because the prompt provided no repository facts. The next version needs a role that encourages review rather than automatic rewriting.

## Version 2 — Role assignment

### Prompt

> Act as a senior frontend engineer reviewing a junior developer's README. Identify the most important weakness and improve the README.

### Representative output

> The README needs clearer onboarding. I would prioritize prerequisites and setup before adding badges or promotional copy. The project should tell a new contributor what is required and what they can run locally.

### Observed difference and reason

The response stopped prioritizing decorative badges and focused on developer onboarding. However, it still assumed that an application and npm scripts already existed. The role improved judgment, but it could not replace missing project context.

## Version 3 — Context and motivation

### Prompt

> Act as a senior frontend engineer reviewing a junior developer's README. This repository is the setup-stage capstone for the FlyRank Frontend AI Engineering track. It currently contains documentation and conventions, but the React application has not been scaffolded yet. The README must help reviewers understand the project without claiming unfinished features. Identify the most important weakness and improve it.

### Representative output

> The README should distinguish the current setup phase from the planned application. Replace instructions that imply the app already runs with wording that labels the commands as the expected workflow after scaffolding. Add a short status statement near the top so reviewers do not mistake plans for completed functionality.

### Observed difference and reason

The output became factually safer: it stopped presenting planned work as finished and suggested a status statement specific to this repository. It was still broad about the desired writing style. A few-shot example should make the distinction between generic and acceptable language visible.

## Version 4 — Few-shot examples

### Prompt

> Act as a senior frontend engineer reviewing a junior developer's README. This repository is the setup-stage capstone for the FlyRank Frontend AI Engineering track. It currently contains documentation and conventions, but the React application has not been scaffolded yet. The README must help reviewers understand the project without claiming unfinished features.
>
> Match this style:
> - Avoid: "A cutting-edge application delivering innovative experiences."
> - Prefer: "A frontend capstone used to demonstrate an accessible React workflow."
> - Avoid: "Run `npm install` to start the completed application."
> - Prefer: "These commands will apply after the application scaffold is added."
>
> Identify the most important weakness and improve it.

### Representative output

> **Suggested status copy:** “Repository setup is complete. The React application will be added in a later assignment.”
>
> **Suggested setup introduction:** “The application scaffold is not part of this phase. Once it is available, the expected local workflow will be:”

### Observed difference and reason

The response adopted plain, evidence-based wording and avoided promotional filler. The examples had a visible effect on tone and factual caution. The answer was still difficult to apply because critique, replacement text, and rationale were mixed together. The next version needs an explicit output structure.

## Version 5 — Output structure

### Prompt

> Act as a senior frontend engineer reviewing a junior developer's README. This repository is the setup-stage capstone for the FlyRank Frontend AI Engineering track. It currently contains documentation and conventions, but the React application has not been scaffolded yet. The README must help reviewers understand the project without claiming unfinished features.
>
> Match this style:
> - Avoid: "A cutting-edge application delivering innovative experiences."
> - Prefer: "A frontend capstone used to demonstrate an accessible React workflow."
> - Avoid: "Run `npm install` to start the completed application."
> - Prefer: "These commands will apply after the application scaffold is added."
>
> Return exactly four sections: (1) current weakness, (2) proposed replacement, (3) why it is better, and (4) facts that still need verification.

### Representative output

> **1. Current weakness:** The setup section can be read as instructions for an application that already exists.
>
> **2. Proposed replacement:** “The application scaffold will be added in a later assignment. Once it is available, use the following local workflow.”
>
> **3. Why it is better:** It gives useful future instructions while accurately describing the repository today.
>
> **4. Facts to verify:** Final package scripts, deployment URL, environment variables, and supported Node.js version.

### Observed difference and reason

The structured answer was faster to review and clearly separated usable text from unresolved facts. Unlike the earlier versions, it made uncertainty visible instead of hiding it in polished prose. It still treated the work as one large request. Step decomposition should make review happen before modification.

## Version 6 — Step decomposition

### Prompt

> Act as a senior frontend engineer reviewing a junior developer's README. This repository is the setup-stage capstone for the FlyRank Frontend AI Engineering track. It currently contains documentation and conventions, but the React application has not been scaffolded yet. The README must help reviewers understand the project without claiming unfinished features.
>
> Match this style:
> - Avoid: "A cutting-edge application delivering innovative experiences."
> - Prefer: "A frontend capstone used to demonstrate an accessible React workflow."
> - Avoid: "Run `npm install` to start the completed application."
> - Prefer: "These commands will apply after the application scaffold is added."
>
> Work in these steps: first inspect the README and `CLAUDE.md`; second list factual claims and flag any that are not supported by repository files; third choose the single highest-impact onboarding weakness; fourth propose the smallest replacement; fifth review the replacement for clarity and unsupported claims.
>
> Return exactly four sections: (1) current weakness, (2) proposed replacement, (3) why it is better, and (4) facts that still need verification.

### Representative ChatGPT output

> **1. Current weakness:** The development workflow lists commands before the project contains the scripts that would implement them.
>
> **2. Proposed replacement:** “Before finishing a task, run the quality scripts available in `package.json`. The expected checks are linting, type checking, tests, and a production build; exact commands will be documented after scaffolding.”
>
> **3. Why it is better:** It remains consistent with `CLAUDE.md` without claiming that unverified scripts already exist.
>
> **4. Facts to verify:** Script names in `package.json`, required environment variables, and the supported Node.js version.

### Observed difference and reason

The decomposed response explicitly checked claims against repository state before proposing text. It found a narrower issue than the earlier versions and produced a smaller, safer change. The remaining limitation is that this output was generated without direct repository-tool access, so a developer must still verify the named files.

## Cross-model comparison

### ChatGPT

- **Tone:** Direct and explanatory; it clearly justified why unsupported commands were risky.
- **Accuracy:** Preserved the important distinction between planned and implemented work.
- **Structure:** Followed the requested four-section format exactly.
- **Failure point:** Could not independently verify the repository contents in this chat and therefore correctly left specific facts unresolved.

### Cursor Composer 2.5 Fast

- **Tone:** More audit-like and repository-specific. It opened with the concrete mismatch instead of explaining the prompting strategy.
- **Accuracy:** Inspected the repository and correctly found that no `package.json` exists, so the README's four named npm commands are not currently supported. It also verified the license, setup status, planned-stack wording, and absence of a configured remote.
- **Structure:** Followed the requested four sections and added a useful claim-by-claim support table inside the first section.
- **Failure point:** It cited “course docs” as support without identifying the exact file, and it slightly exceeded the requested minimal format by adding the table. The extra detail was useful, but less concise than ChatGPT's response.

### Representative Cursor output

> **(1) Current weakness:** Development workflow step 3 names four npm commands as if they already exist. The repo has no `package.json`, no `src/`, and no scripts to run.
>
> **(2) Proposed replacement:** “Before finishing a task, run the quality scripts listed in `package.json`. The expected checks are linting, type checking, tests, and a production build; exact commands will be documented after scaffolding.”
>
> **(3) Why it is better:** It remains aligned with `CLAUDE.md` without inventing script names and accurately represents the setup-stage repository.
>
> **(4) Facts that still need verification:** Final script names, repository URL and folder name, required environment variables, supported Node.js version, and course-specific assistant wording.

### Specific comparison

ChatGPT followed the four-section format more tightly and produced a concise answer, but it explicitly acknowledged that it could not inspect the repository in the chat. Cursor Composer had direct workspace access and therefore found more exact evidence: the missing `package.json`, absent `src/` directory, placeholder clone values, and lack of a configured remote. Cursor's answer was more accurate for repository state, while ChatGPT's answer was easier to scan. Both identified the same central risk: documentation should not present planned commands as already available.

> **Disclosure:** The assignment asks for Claude and ChatGPT. Claude was unavailable on the free desktop setup, so Cursor Composer 2.5 Fast was used as the second real model run. This substitution is stated explicitly rather than presenting Composer output as Claude output.

## Reusable prompt template

```text
Act as a [relevant expert role] reviewing [artifact] for [specific audience].

Context and motivation:
[State the real project phase, constraints, known facts, and why this review matters.]

Match this style:
- Avoid: [example of an unacceptable result]
- Prefer: [example of a good result]

Work in these steps:
1. Inspect [relevant sources or files].
2. List factual claims and flag unsupported assumptions.
3. Choose the single highest-impact weakness.
4. Propose the smallest useful improvement.
5. Review the result against [quality criteria].

Return exactly these sections:
1. Current weakness
2. Proposed replacement
3. Why it is better
4. Facts that still need verification

Do not invent project facts. Clearly identify anything you could not verify.
```
