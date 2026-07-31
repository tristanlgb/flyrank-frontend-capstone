# FL-05: Workflows, Agents, and MCP

## Explainer

The word “agent” is often used for any AI feature that performs more than one step, but that definition is too broad to be useful. The distinction that makes sense to me is about **who controls the path**. A workflow follows a path designed in advance. An agent receives a goal and dynamically decides what steps and tools it needs, checks the result, and changes its approach when necessary.

Anthropic describes workflows as systems where models and tools move through predefined code paths, while agents direct their own process and tool use. That does not make agents automatically better. A workflow is usually easier to inspect, test, and repeat. An agent is useful when the task cannot be mapped completely beforehand and the value of flexibility is worth additional latency, cost, and risk. The practical lesson I took from *Building Effective Agents* is to start with the simplest design that solves the problem instead of adding autonomy because it sounds advanced.

My FL-04 “Draft, Critique, Revise” pipeline is a **workflow**, not an agent. Its stages are fixed: extract a brief, draft, critique, revise, and perform a human check. Every stage has a defined handoff, and the model is not allowed to skip a stage or invent a different route. The critic can identify a weak claim, but it cannot independently decide to inspect GitHub, ask me a follow-up question, verify the deployed site, or run another critique cycle. I control when each prompt runs. This predictability is useful because the task is narrow and factual accuracy matters more than autonomy.

MCP, or Model Context Protocol, solves a different problem. A language model normally knows only the conversation and its trained knowledge. It cannot simply know what is currently in my private repository, whether a deployment is healthy, or whether a file was published. MCP is an open standard that lets an AI application connect to external systems through a consistent client-server interface. The official introduction compares it to a USB-C connection for AI applications: one standard can connect clients to many kinds of external capabilities.

An MCP server can expose three important primitives:

1. **Tools** are executable functions. They can query an API, create a file, update a record, or trigger another action. Tools are model-controlled in the protocol: the model can select them when the task requires them, although the client should keep a human able to approve sensitive actions.
2. **Resources** are contextual data made available to the application, such as file contents, database schemas, documentation, or Git history. They are generally passive and read-only. The application decides how to attach them to the model’s context.
3. **Prompts** are reusable instruction templates supplied by a server. They make a reliable interaction discoverable, such as a “review repository” or “summarize meeting” command. Prompts are user-controlled because the user chooses when to invoke them and provides their arguments.

This difference matters because MCP does not make a system an agent by itself. A fixed workflow can use MCP tools, and an agent can work without MCP if all its capabilities are local. MCP supplies standardized access; agency describes who chooses the path.

I tested working connectors in the Codex desktop client. The first task used the GitHub connector to read my live `PORTFOLIO-SITEMAP-TOOLKIT.md`, `FRAME-IT-AS-CASES.md`, and `PROOF-STATEMENT.md` files. Plain chat could have guessed their content, but it could not retrieve the current repository versions. The second task used a GitHub write tool to publish `THREE-ROADS-STACK-DECISION.md` and returned the real commit identifier. Plain chat could draft the text but could not create the public file. The third task used the Vercel connector to inspect the production project, confirm its deployment was ready, fetch the live URL with HTTP status 200, and check that no runtime errors were reported. That required live service access rather than general knowledge.

To turn FL-04 into an agent, I would give the system a goal instead of a stage-by-stage command: “Prepare one truthful, portfolio-ready case study from these notes and repository evidence.” The agent would decide whether it had enough information, inspect the relevant repository files through a connector, test any live link, draft the case, run the critic again when a score is below the threshold, and stop when the factual checklist passes. A concrete upgrade would be a **verification loop**: the agent must trace each technology, link, and outcome to repository or deployment evidence before proposing a final version.

I would still keep a human approval gate before publication. The agent could prepare a GitHub branch or draft change, but it should not publish claims about my experience without my review. That design adds useful flexibility while preserving a clear boundary around identity, accuracy, and external writes.

## Connector evidence

### Task 1 — Read current repository evidence

- **Connector:** GitHub
- **Tool action:** Fetch three files from `tristanlgb/flyrank-frontend-capstone`
- **Result:** Returned current UTF-8 contents and blob identifiers for the sitemap, case study, and proof statement.
- **Why chat alone could not do it:** The files are live external data and may change after model training.
- **Screenshot required:** The GitHub tool call and returned file content in the client.

### Task 2 — Publish a new deliverable

- **Connector:** GitHub
- **Tool action:** Create `THREE-ROADS-STACK-DECISION.md` on `main`
- **Result:** Commit `c280ff0fd68972ee30b84943606679c699a0cdc0`
- **Why chat alone could not do it:** Writing to the repository requires authenticated external access.
- **Screenshot required:** The create-file tool call and successful commit result.

### Task 3 — Verify the production website

- **Connector:** Vercel
- **Tool action:** Inspect the `tristan-empty-but-live` project, fetch its production URL, and query runtime errors
- **Result:** Deployment state `READY`, HTTP status `200`, and no runtime errors in the checked period.
- **Why chat alone could not do it:** Deployment state and runtime errors are live service information.
- **Screenshot required:** The Vercel tool result showing `READY` or status `200`, plus the no-errors result.

## Sources

- Anthropic, *Building Effective Agents*: https://www.anthropic.com/engineering/building-effective-agents
- Model Context Protocol, *What is MCP?*: https://modelcontextprotocol.io/docs/getting-started/intro
- Model Context Protocol, *Understanding MCP servers*: https://modelcontextprotocol.io/docs/learn/server-concepts

