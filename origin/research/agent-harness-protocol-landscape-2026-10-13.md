# Agent harness and protocol landscape — 2026-10-13

Status: public-source clean-room mechanism review. External maintainers and
practitioners did not participate or endorse Agents of AI.

## Question

As AoA grows, which 2026 mechanisms should strengthen existing paths, and which
should remain runtime/protocol infrastructure rather than becoming more catalog
entries?

## Sources and dispositions

| Mechanism | Primary public source | Distilled value | AoA disposition |
|---|---|---|---|
| Agent harness across surfaces | Kiro, "One agent, every surface" (2026-08-03), https://kiro.dev/blog/one-agent/ | One consistent harness composes specs, agents, tools, subagents and permissions across clients | ASSIMILATE into Showrunner v2; do not add another orchestration agent |
| Context engineering | Anthropic AWS Summit 2026 session, https://www.anthropic.com/events/anthropic-at-aws-summit-la-2026 | High-altitude stable prompt + token-efficient tools + JIT retrieval + compaction + structured memory + subagents | ASSIMILATE into Showrunner; existing Observation Masking and Retrieval Precision already cover part |
| Durable agent runtime | LangChain, "The Runtime Behind Production Deep Agents" (2026-04-20), https://www.langchain.com/blog/runtime-behind-production-deep-agents | Checkpointed execution, pause/resume, HITL, memory, observability | ASSIMILATE lifecycle semantics; runtime implementation remains external |
| Agent Skills | OpenAI Skills docs, https://developers.openai.com/api/docs/guides/tools-skills ; Anthropic Agent Skills, https://www.anthropic.com/research/skills | Portable just-in-time procedural bundles | SATISFIED by AoA Skill packaging; not an eighth composable layer |
| ARD | Agentic Resource Discovery, https://agenticresourcediscovery.org/ ; Google announcement 2026-06-17 | Federated pre-invocation discovery for tools, Skills, agents and workflows | ASSIMILATE into Repository Intelligence and tools catalog; proposal/draft, verify at use |
| MCP 2026-07-28 | MCP release, https://blog.modelcontextprotocol.io/posts/2026-07-28/ | Stateless core, cacheable discovery, Tasks extension, MCP Apps, MRTR elicitation | TOOLS/RUNTIME; do not create AoA reasoning workflow |
| A2A | Google A2A 1-year update, https://developers.googleblog.com/how-a2a-is-building-a-world-of-collaborative-agents/ | Real remote agent collaboration and handoff | TOOLS/RUNTIME; distinguish from simulated personas |
| A2UI / AG-UI | Google A2UI v0.9, https://developers.googleblog.com/en/a2ui-v0-9-generative-ui/ ; AG-UI docs, https://docs.ag-ui.com/ | Agent-user interactive UI/event protocols | TOOLS/UI layer, not reasoning catalog |
| Typed specs | Kiro bugfix/design-first specs 2026-02-18, https://kiro.dev/blog/specs-bugfix-and-design-first/ | Requirements-first is not universal; bugfix and design-first start from different known state | ASSIMILATE: merge Repo PRD into PRD typed profiles |
| Agent hooks | Kiro product/about, https://kiro.dev/about/ | Event-triggered background actions without inventing another agent | ASSIMILATE as Showrunner harness trigger rule, gated by permissions/idempotency |

## Consolidation decisions

1. **Human Gate Committee -> Quorum profile.**
   Same committee method; Human Gate is stop/approval semantics. Historical path
   remains a compatibility alias only.
2. **Repo PRD -> PRD REPO/BROWNFIELD profile.**
   Same spec method with a different starting state. Historical path remains a
   compatibility alias only.
3. **Showrunner -> Harness v2.**
   Existing orchestration agent absorbs dynamic Skills/tools/subagents/resource
   discovery and durable execution semantics instead of creating a "super-agent".
4. **Deep Dig != Evidence Assembly.**
   Keep separate: Deep Dig is research-only divergent->survey->verify; Evidence
   Assembly continues into causal experiment/authorized repair.
5. **Second Room != Quorum.**
   Keep separate: Second Room's method is independent context/model review of a
   frozen artifact; Quorum is live-sourced professional-method deliberation.
6. **Outcome Reconciliation != PRD.**
   Keep separate: one reconstructs intent/current end-state; the other produces a
   specification after intent is known.

## New-layer decision

Do **not** add an eighth AoA composable layer for protocols or harnesses.

- Protocols such as MCP/A2A/A2UI/AG-UI are interoperability/runtime contracts.
- Skills are portable procedural packaging.
- Harness is an architecture that composes existing layers.
- ARD is capability discovery before invocation.

AoA's seven composable reasoning/work layers remain sufficient. The supporting
tools/protocol shelf carries interoperability standards and the Showrunner harness
composes them at runtime.

## Revisit conditions

- ARD graduates materially and AoA gains a public callable service/catalog.
- A protocol changes reasoning method rather than connectivity.
- Repeated tasks show a distinct method that cannot fit an existing workflow/profile
  without exceeding the Merge Protocol's focus limit.
