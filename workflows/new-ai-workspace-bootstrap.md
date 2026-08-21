---
id: new-ai-workspace-bootstrap
type: workflow
purpose: Rebuild a capable AI workspace or account from public workflow knowledge plus separately managed private configuration without repeating old setup failures.
steps: 8
agents_used: [auditor, tracker]
personas_used: [scaffold, redline]
confidence: PRACTICED
version: "1.0"
tags: [bootstrap, setup, connectors, tools, accounts, portability, mobile]
compatible_with: [any-ai]
---

# New AI Workspace Bootstrap

## Purpose

Use this when moving to a new AI account, workspace, provider, laptop, phone, coding environment, or temporary subscription. The goal is portability: reuse what has already been learned without copying secrets, personal account state, or private infrastructure into a public prompt.

The pattern separates two things:

```text
PUBLIC KNOWLEDGE
- generic tools
- provider limits
- reusable workflows
- failure lessons
- setup order

PRIVATE CONFIGURATION
- credentials
- private repositories
- private project names
- endpoints
- account-specific settings
- private state
```

Public knowledge can travel freely. Private configuration stays in the user's approved private system or secret store.

## Steps

### 1. Load the public capability map

Read the relevant Agents of AI workflows plus [`../TOOLS.md`](../TOOLS.md) and [`../tools/free-tool-ledger.md`](../tools/free-tool-ledger.md).

Do not start from a blank "what tools exist?" search unless the ledger is stale or missing the needed category.

**Done:** known reusable options are visible before new accounts or services are created.

### 2. Define the job, not the vendor

List capabilities first:

- repository read/write;
- large file transfer;
- browser/UI validation;
- web research;
- model second opinions;
- event automation;
- scraping/public data retrieval;
- object storage;
- SSH/mobile administration;
- observability/testing.

Then map available providers to those capabilities.

**Done:** the setup is portable and a provider can be swapped without redesigning the whole workflow.

### 3. Reconnect existing services before creating new ones

Check whether the new AI/workspace can connect to services that already exist through a native connector, MCP server, API, SSH client, or browser session.

Do not create duplicate infrastructure just because a new AI account cannot see the old chat history.

**Done:** duplicate accounts/services are avoided unless isolation is intentional.

### 4. Keep secrets outside chat

Never paste long-lived credentials into prompts or public files.

Prefer:

- provider connection flows;
- secret managers;
- local environment variables;
- scoped short-lived tokens;
- OAuth;
- signed URLs for temporary transfer.

Use synthetic placeholders in documentation.

**Done:** the AI can refer to credential *slots* without learning or publishing credential values unnecessarily.

### 5. Test the smallest path first

Before moving real work, run one tiny acceptance test per capability:

- read one harmless repository file;
- create one disposable private test artifact if writes are allowed;
- send one tiny webhook/event;
- upload one tiny dummy file;
- run one low-cost/free inference call;
- execute one harmless remote command if remote administration is intentionally enabled.

Record the result as `PASS`, `FAIL`, or `BLOCKED` with the smallest reason.

**Done:** broken connectors are found before real work depends on them.

### 6. Establish the large-artifact lane

If files can exceed ordinary AI/tool limits, load [`large-artifact-handoff.md`](large-artifact-handoff.md) before the first large upload.

Do not rediscover the base64/context-window failure after the project already has hundreds of images or a large ZIP waiting to move.

**Done:** a binary transfer path exists independently of the prompt/token path.

### 7. Establish free-capacity policy

For free/student services:

- prefer no-card and hard-capped services when practical;
- record reset cadence and public quota source;
- treat free model capacity as opportunistic, not guaranteed uptime;
- avoid scheduled calls whose only purpose is burning available quota;
- use second-opinion models when the event is meaningful enough to justify them;
- never silently fall back to paid usage in a declared free-only workflow.

**Done:** free capacity adds resilience without becoming a billing or maintenance trap.

### 8. Write a portable setup summary

Produce a short, private setup record containing only what the next authorized AI needs:

```text
Capabilities connected:
Capabilities blocked:
Public workflows to load:
Private configuration locations (references only, no secrets):
Known failure/workaround notes:
Next smallest setup action:
Last verified date:
```

If the summary might become public, run [`../tools/publication-safety.md`](../tools/publication-safety.md) first.

**Done:** a future AI can continue from state instead of replaying the same troubleshooting conversation.

## When NOT to Use

- when the current workspace is already fully configured and no portability problem exists;
- as a reason to duplicate production infrastructure;
- as a way to copy private configuration into a public repository;
- to bypass service terms, account controls, billing controls, or access restrictions.

## Done Condition

The new workspace can identify its available capabilities, reuse established public workflows, reference private configuration safely, pass small acceptance tests, and continue work without requiring the user to reconstruct prior setup lessons from memory.
