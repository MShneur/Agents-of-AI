# Origin — Portable ChatGPT Adapter

This adapter exposes the canonical Origin system in three portable forms without duplicating the core:

1. `skill/SKILL.md` — reusable Skill workflow.
2. `agent/AGENT-INSTRUCTIONS.md` — ChatGPT-facing agent definition.
3. `protocol/ORIGIN-PROTOCOL.md` — standalone protocol/workflow reference.

`ORIGIN_CHATGPT_REFERENCE.md` is the flattened single-file form for ordinary file-upload/reference use.

The canonical implementation remains `MShneur/Agents-of-AI/origin/`. This directory is an adapter, not a fork.

## Ecosystem boundary

- **CTRL-AI = Governor** — policy, options, evidence standards, permissions, Human Gates.
- **R&Duck = Autopilot** — plans, dispatches, executes, verifies, and drives projects to completion.
- **Agents of AI = Substrate** — personas, agents, workflows, techniques, skills, runtime primitives, adapters, protocols.
- **Origin = R&D lab inside Agents of AI** — discovers, verifies, distills, and independently re-implements useful foundations.

Canonical router: `CTRL-AI governs -> R&Duck operates -> Agents of AI supplies -> Origin evolves Agents of AI.`

## Authority

This adapter grants no tool authority, credentials, deployment, publishing, purchases, or external writes. Repository truth and current control/handoff files supersede this adapter if they conflict.
