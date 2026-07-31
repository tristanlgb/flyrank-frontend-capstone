# FL-04: Draft, Critique, Revise — No-Code Writing Workflow

## Workflow goal

I built a reusable no-code workflow for writing portfolio content in my own voice. The workflow turns rough notes into a focused draft, critiques that draft against a fixed rubric, revises only the issues supported by the critique, and leaves factual approval to me.

The workflow runs inside an AI Project or a fresh AI chat using the configuration and prompts below. It does not publish automatically. That is intentional: portfolio claims, links, and outcomes require human review.

## Flow sketch

```text
Real notes
   |
   v
1. Extract a brief
   |  handoff: structured facts, audience, goal, voice, missing information
   v
2. Write a draft
   |  handoff: draft plus a list of claims that require verification
   v
3. Critique against the rubric
   |  handoff: keep / change / verify, with reasons
   v
4. Revise
   |  handoff: final copy and a short change log
   v
5. Human check
      approve facts, links, tone, and whether I would actually say every line
```

## Project configuration

```text
You are my portfolio writing workflow, not my ghostwriter.

My audience is a technology-company hiring manager recruiting a junior frontend developer. My primary claim is that I can build maintainable frontend interfaces with React and TypeScript. The one action I want is for the hiring manager to contact me for an interview.

Voice card: direct, honest, clear, practical, approachable, no exaggeration.

Never invent experience, metrics, users, business results, technologies, links, or decisions. Preserve my concrete words when they are accurate. Prefer specific evidence over adjectives. Do not use “results-driven,” “passionate,” “innovative,” “high-impact,” or similar filler. If information is missing, mark it [NEEDS INPUT]. Do not silently fill the gap.

Run one stage at a time and use the required handoff format. Do not skip the critique stage. The final factual decision always belongs to me.
```

## Prompts used at each stage

### Stage 1 — Extract the brief

```text
Read the input and return this handoff:

CONTENT TYPE:
ONE GOAL:
ONE AUDIENCE:
FACTS I CAN SUPPORT:
DECISIONS OR ACTIONS I TOOK:
DESIRED READER ACTION:
WORDS OR PHRASES WORTH KEEPING:
MISSING INFORMATION:

Do not draft yet. Do not infer missing facts.

INPUT:
{{raw_input}}
```

### Stage 2 — Draft

```text
Using only the Stage 1 handoff, write one draft for the stated content type.

Requirements:
- follow the voice card;
- make the opening specific;
- use first person;
- keep every factual claim traceable to the handoff;
- include only one reader action;
- use [NEEDS INPUT] rather than inventing details.

Return:
DRAFT:
CLAIMS TO VERIFY:
```

### Stage 3 — Critique

```text
Review the draft as a strict editor. Do not rewrite it yet.

Score each item from 1 to 5 and explain the score in one sentence:
1. Specific to my real work
2. Clear to a junior-frontend hiring manager
3. Evidence supports the claims
4. Sounds like my voice card
5. Leads to one clear action

Then return:
KEEP:
CHANGE:
VERIFY:
BIGGEST SINGLE PROBLEM:

Call out at least one weakness. If the draft is generic, quote the generic phrase.
```

### Stage 4 — Revise

```text
Revise the draft using only the Stage 3 critique.

Constraints:
- preserve accurate details and my voice;
- fix the biggest problem first;
- do not add new facts;
- leave unresolved facts as [NEEDS INPUT];
- keep the result tighter than the draft when possible.

Return:
FINAL COPY:
CHANGE LOG:
HUMAN CHECK:
```

### Stage 5 — Human review checklist

```text
[ ] I can prove every claim.
[ ] Technologies and links are correct.
[ ] I would say every sentence out loud.
[ ] The copy speaks to a junior-frontend hiring manager.
[ ] There is only one primary action.
[ ] No [NEEDS INPUT] marker remains.
```

## Five real runs

## Run 1 — Portfolio proof statement

### Real input

```text
I know React and TypeScript. A CV can list those technologies but it does not show how I organize a repository, explain decisions, or review AI changes. I want a technology-company hiring manager to contact me for a junior frontend interview.
```

### Stage 1 handoff

- **Content type:** Portfolio hero/proof statement
- **Goal:** State one credible frontend claim and the next action
- **Audience:** Technology-company hiring manager
- **Supported facts:** React and TypeScript knowledge; repository organization; documented decisions; reviewed AI-assisted changes
- **Missing information:** No production-user or business metrics

### Stage 2 draft

> I am a junior frontend developer who uses React and TypeScript to build clear, maintainable interfaces. My work shows more than a list of technologies: it shows how I organize a repository, document decisions, and review AI-assisted changes. Contact me if you are hiring for a junior frontend role.

### Stage 3 critique

- **Keep:** The audience and action are clear.
- **Change:** “Clear, maintainable interfaces” is the main claim, but the input currently proves process more strongly than completed interfaces.
- **Verify:** Make sure the portfolio includes visible interface work before keeping the full claim.
- **Biggest problem:** The opening slightly exceeds the evidence currently displayed.

### Stage 4 final copy

> I build frontend work with React and TypeScript and make the process visible: how I organize the repository, document decisions, and review AI-assisted changes. If you are hiring a junior frontend developer, review the work and contact me for an interview.

**Human check:** Approved as an honest current claim; strengthen it later with completed interface cases.

## Run 2 — FE-01 case-study summary

### Real input

```text
For FlyRank FE-01 I created the capstone repository with README.md, CLAUDE.md, LICENSE, and .gitignore. I used Conventional Commits. Cursor reviewed the README, gave a critique, and applied one improvement. I reviewed the change before accepting it.
```

### Stage 1 handoff

- **Content type:** Short case study
- **Goal:** Show a real AI-assisted setup workflow
- **Supported facts:** Four repository files; Conventional Commits; Cursor critique and edit; human review
- **Desired action:** Open the repository
- **Missing information:** No measured time saving

### Stage 2 draft

> I set up the FlyRank capstone as a repository that another developer could inspect. I added the README, project rules, license, and ignore file, then organized the history with Conventional Commits. I asked Cursor to critique the README and apply one useful change, but I reviewed the diff before accepting it. The repository now shows both the project conventions and the AI-assisted change.

### Stage 3 critique

- **Keep:** The sequence is concrete and easy to follow.
- **Change:** “Another developer could inspect” is plausible but not an observed outcome.
- **Verify:** Link to the repository in the published case.
- **Biggest problem:** The outcome should describe visible evidence, not an assumed reader response.

### Stage 4 final copy

> I set up the FlyRank capstone with a README, project rules, a license, and an ignore file, then organized the history with Conventional Commits. I asked Cursor to critique the README and apply one useful improvement. Before accepting it, I reviewed the diff. The repository now contains the conventions, commit history, and AI-assisted edit as visible evidence of the workflow.

**Human check:** Add the public repository link when publishing.

## Run 3 — About bio

### Real input

```text
I am learning frontend development. I know React and TypeScript and have learning experience with NestJS and MongoDB. I use AI tools but review their changes. I am doing the FlyRank internship. I do not know .NET or PHP and do not want to pretend that I do.
```

### Stage 1 handoff

- **Content type:** About bio
- **Goal:** Introduce relevant skills without exaggeration
- **Supported facts:** React, TypeScript, NestJS, MongoDB, FlyRank internship, reviewed AI use
- **Missing information:** Location, availability, and years of experience

### Stage 2 draft

> I am a frontend developer building my experience with React and TypeScript. I have also worked with NestJS and MongoDB while learning full-stack development. Through the FlyRank internship, I am practicing how to organize projects, explain decisions, and use AI tools without skipping review.

### Stage 3 critique

- **Keep:** It is short and relevant to the target role.
- **Change:** “Worked with” may sound like professional experience; the input says learning experience.
- **Verify:** No need to mention technologies the candidate does not know.
- **Biggest problem:** One phrase could overstate experience.

### Stage 4 final copy

> I am building my frontend experience with React and TypeScript. I also have learning experience with NestJS and MongoDB. Through the FlyRank internship, I am practicing how to organize projects, explain decisions, and use AI tools without skipping my own review.

**Human check:** Approved; it does not imply professional NestJS or MongoDB experience.

## Run 4 — Empty but Live project description

### Real input

```text
I created a minimal portfolio page with my name and frontend focus. It uses React, TypeScript, and Next.js and is hosted on Vercel. The URL is https://tristan-empty-but-live.vercel.app. It is intentionally almost empty because this milestone is about publishing a real URL before adding the full portfolio.

**Later evolution:** This paragraph records the Week 4 state accurately. The
final portfolio was later consolidated into the React + TypeScript + Vite
capstone at https://flyrank-frontend-capstone-eight.vercel.app/. I preferred
Vite for the final build because it matches my normal workflow and the product
did not need Next.js-specific rendering or routing features.
```

### Stage 1 handoff

- **Content type:** Project update
- **Goal:** Explain why a nearly empty page is a valid milestone
- **Supported facts:** React, TypeScript, Next.js, Vercel, public URL, minimal content
- **Missing information:** Second-device verification must be performed physically

### Stage 2 draft

> I published the first version of my portfolio before filling it with case studies. The page is intentionally minimal: it shows my name, frontend focus, and current status. It runs with React, TypeScript, and Next.js on Vercel, which gives the next build stage a real production starting point.

### Stage 3 critique

- **Keep:** It explains the reason for the blank page.
- **Change:** Add the direct live link as the one action.
- **Verify:** Confirm the URL opens on a second device.
- **Biggest problem:** Deployment is claimed, but device verification remains a human task.

### Stage 4 final copy

> I published the starting point for my portfolio at https://tristan-empty-but-live.vercel.app. It intentionally contains only my name, frontend focus, and project status. React, TypeScript, and Next.js provide a real production base on Vercel, so the next stage is adding the work rather than starting from nothing.

**Human check:** Open the URL on a phone and capture the evidence before submitting.

## Run 5 — Contact call to action

### Real input

```text
The reader is a hiring manager looking for a junior frontend developer. I want one action: contact me for an interview. I can point to GitHub, but I do not have a separate contact form or public email prepared in this input.
```

### Stage 1 handoff

- **Content type:** Contact CTA
- **Goal:** Ask for one concrete action
- **Supported facts:** Junior frontend target; GitHub profile is available
- **Missing information:** Preferred public email or contact-form destination

### Stage 2 draft

> If you are hiring a junior frontend developer who documents decisions and reviews AI-assisted work, contact me to arrange an interview. [NEEDS INPUT: preferred contact link]

### Stage 3 critique

- **Keep:** One audience and one action.
- **Change:** “Who documents decisions” is supported; avoid adding more qualities.
- **Verify:** A working contact destination is mandatory.
- **Biggest problem:** The CTA cannot ship until the contact link is supplied.

### Stage 4 final copy

> If you are hiring a junior frontend developer, review my work and contact me for an interview: [NEEDS INPUT: preferred contact link].

**Human check:** Replace the marker with a real email, LinkedIn, or contact page and test it.

## Time accounting

I separated setup cost from repeat-run cost.

| Activity | Time |
| --- | ---: |
| Design the stages, handoffs, voice rules, and rubric | 35 minutes |
| Configure the reusable project instructions | 10 minutes |
| Run five inputs through all four AI stages | 28 minutes total |
| Human review of the five final outputs | 12 minutes total |
| **Total first-use cost** | **85 minutes** |

For a comparison, one short portfolio paragraph edited manually took approximately 14 minutes from rough notes to a version I was willing to publish. The workflow averaged 8 minutes per piece including my review (40 minutes for five pieces), after setup. That is an estimated saving of about 6 minutes per future piece. The first session did **not** save time because the 45-minute setup cost made it longer; the workflow becomes useful when reused.

## Where it broke

1. **It tried to strengthen evidence into a broader claim.** In Run 1, “maintainable interfaces” was stronger than the work currently visible. The critic caught it.
2. **It changed learning experience into professional-sounding experience.** In Run 3, “worked with NestJS and MongoDB” needed correction.
3. **It cannot invent missing contact information.** Run 5 correctly remained incomplete.
4. **It cannot perform physical verification.** It can check a URL through a tool, but only I can prove that I opened it on my phone.
5. **A fluent sentence can still be inaccurate.** The human check must compare every claim with the original notes and repository.

## What a human must still check

- whether each outcome actually happened;
- whether technology names and URLs are correct;
- whether the words sound like me when read aloud;
- whether screenshots or repositories support the claims;
- whether `[NEEDS INPUT]` remains anywhere;
- whether the final CTA works.

## Brand-new-input test

To test the workflow end to end, paste a new piece of rough portfolio evidence into Stage 1. The process is successful only if each later stage uses the previous handoff, the critic identifies a real weakness, the revision does not invent facts, and the human checklist is completed before publishing.

