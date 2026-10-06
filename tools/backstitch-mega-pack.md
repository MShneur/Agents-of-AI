# Backstitch Mega Pack

Status: candidate architecture, 2026-10-05

Backstitch remains the continuity controller. The Mega Pack adds specialist adapters without turning them into competing memory authorities.

## Routing

| Need | Route | Boundary |
|---|---|---|
| Simple self-contained question | S0 BYPASS | zero continuity/memory reads |
| One exact project fact | S1 PIN | one exact authority pointer |
| Prior decisions / already-tried work | S2 RECALL | current authority + Cognee recall |
| Conflicts / multiple lanes / supersession | S3 RECONCILE | bounded authority reconciliation + relevant recall |
| Persistent cross-chat/project recall | Cognee | recall/history only; never outranks Git/runtime/ledger |
| Code symbols/references/structure | Serena when connected | specialist code eyesight; no separate Serena account required |
| Very large hierarchical documents | PageIndex when connected | specialist long-document hierarchy |
| Typed route/rank/filter/verification | TypeSafe Jev when connected | judgment after retrieval; not memory |

## Preferred flow

```text
request
  -> Backstitch Stitch Gate
  -> current canonical authority
  -> narrow specialist retrieval when necessary
       Cognee | Serena | PageIndex
  -> Jev typed judgment when it saves reasoning cost or improves routing
  -> main reasoning model
  -> canonical writeback
  -> concise Cognee recall record when durable history changed
```

## One-brain rule

Cognee is the default persistent recall backend for this profile. Serena and PageIndex are optional specialist retrieval adapters. Jev is an optional typed judgment layer. Do not install multiple general memory brains for the same job.

## Mobile-first rule

A phone user must not need Docker, `uv`, an always-on desktop, local Serena, or local PageIndex for normal use. Prefer account-connected remote MCP/plugin tools and degrade cleanly when a specialist is unavailable.

## Current Personal Forge implementation

Personal Forge Oracle now exposes Cognee through its existing OpenAI Secure MCP tunnel:

- `backstitch_memory_status`
- `cognee_recall`
- `cognee_remember`

The Cognee credential remains in protected Oracle secret storage and is not embedded in Skills or plugin archives.

Jev is defined as the optional judgment layer but is not considered connected until a TypeSafe API credential is installed and a live call passes.

## Portable onboarding

A portable Skill must work without any external provider. Only prompt for setup when the active task would materially benefit:

- Cognee: create/connect a Cognee Cloud account for persistent memory.
- TypeSafe Jev: create/connect a TypeSafe account/API key for typed judgments.
- Serena: no account; requires a suitable executable/runtime host.
- PageIndex: optional; local mode needs runtime + LLM provider, cloud mode needs service credentials.


## ChatGPT plugin archive layout

When distributing Backstitch through ChatGPT **Plugins**, wrap the validated skill under the plugin-recognized path:

```text
skills/
  backstitch-mega-pack/
    SKILL.md
    agents/openai.yaml
    references/
```

Do not upload the normal standalone Skill archive directly to **Add Plugin** when its root is `backstitch-mega-pack/SKILL.md`; that archive is for the Skills uploader. Keep the plugin package skill-only for mobile/web portability unless a real account-accessible app is available. Do not add a raw `.mcp.json` merely to point at a remote MCP, because that can make the plugin Desktop-only.
