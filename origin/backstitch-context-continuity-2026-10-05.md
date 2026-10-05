# Origin Receipt — Backstitch / Loom Context Continuity

Date: 2026-10-05  
Mode: ORIGIN SCOUT -> COMPARE -> DISTILL -> TRANSFER  
Status: EXPERIMENTAL / branch candidate  
Branch: `origin/backstitch-continuity-20261005`

## Objective

Prevent long-running AI projects from drifting, rebuilding solved mechanisms, or treating stale handoffs as current truth.

The requested system must:

- work across ChatGPT, Claude/Codex-style agents, repository workers, and future MCP clients;
- keep Git/project authority canonical instead of letting memory become a second truth store;
- retrieve only the context needed for the current task;
- remember corrections, decisions, failures, ownership, and supersession across sessions;
- remain usable without mandatory per-query paid-token spend;
- fit Personal Forge / Penny-style ledgers, lanes, handoffs, and runtime evidence;
- compose with Agents of AI rather than become an eighth AoA layer.

## Existing AoA overlap check

The new method is not a replacement for existing entries:

| Existing entry | Already solves | Gap Backstitch adds |
|---|---|---|
| Easy Handoff | machine-complete state trace + operator handoff | does not resolve which context/authority to load before work |
| Retrieval Precision Gate | drops ambient retrieval before synthesis | does not route project authority or durable memory |
| Observation Masking | prunes resolved/dead working context | does not reconstruct a fresh session |
| Single Dispatch Operator | prevents overlapping writers | does not retrieve prior decisions/invariants |
| Wheel Check | checks external/internal alternatives before building | does not persist/recover project context |
| Sieve | ranks candidate tools against an explicit rubric | does not operate continuity |
| Origin | scouts/distills mechanisms | does not become the always-on continuity operator |

**Merge decision:** SPLIT as a new agent. The method is materially different: Backstitch resolves authority and builds a bounded continuity context before execution.

## Source archaeology

Mechanisms were extracted from current public projects/docs. No third-party source code is copied into Backstitch.

| Project | Primary mechanism | KEEP / TRANSFORM | Why it matters | Why not adopt wholesale |
|---|---|---|---|---|
| `doobidoo/mcp-memory-service` | shared MCP/REST memory; local ONNX embeddings; SQLite-vec; typed causal/contradiction edges; consolidation/supersession | **KEEP as primary lightweight recall candidate** | closest match to cross-agent shared recall with no required cloud/API cost | memory still cannot outrank project authority; auto-supersession must be constrained by Backstitch |
| `topoteretes/cognee` | documents/code/conversations -> graph + embeddings; local GLiNER/local embeddings; MCP | **KEEP as richer alternate** | strong company/project brain and ontology path | larger semantic pipeline; more moving parts than needed for first always-on continuity service |
| `getzep/graphiti` | temporal context graph with episodes, validity windows, provenance, incremental invalidation | **DISTILL temporal model** | strongest mechanism for “what was true then vs now” | requires graph infrastructure and extraction stack; too heavy as v1 default |
| `mem0ai/mem0` | persistent memories; hybrid semantic/BM25/entity retrieval; temporal reasoning; graph option | **DISTILL multi-signal recall** | useful retrieval and memory evaluation ideas | platform/OSS capability differences; memory focus is personalization rather than canonical project authority |
| `letta-ai/letta` | persistent stateful agents; pinned memory blocks + archival memory + stored messages | **DISTILL pinned-vs-archival split** | explains what must always be in context vs retrieved on demand | adopting the whole agent runtime would create a parallel execution/identity system |
| `plastic-labs/honcho` | peer/project/user representations that evolve in background reasoning | **DISTILL entity separation** | useful distinction between user, agent, project, group, and idea state | inferred peer representations are valuable recall, not safe authority for project truth |
| `oraios/serena` | MCP semantic code navigation/editing via LSP/IDE symbols and references | **KEEP as code adapter** | avoids line-by-line or whole-repo reads; finds structural code context | code only; no durable decision memory |
| `Aider-AI/aider` | budgeted repository map using tree-sitter definitions/references + graph ranking | **DISTILL context-budgeted repo map** | demonstrates that tiny structural maps beat dumping whole repos | tied to Aider coding flow; not a shared continuity service |
| `VectifyAI/PageIndex` | hierarchical document tree + reasoning-based retrieval; vectorless local mode | **KEEP as on-demand long-doc adapter** | good for large handoffs/manuals where section hierarchy carries meaning | query/index reasoning may consume model resources; unnecessary for small Markdown ledgers |
| `infiniflow/ragflow` | parsing, chunking, compilation into graph/tree/page-index/timeline/wiki artifacts | **DISTILL artifact pipeline; reject v1 runtime** | strongest all-in-one knowledge compilation example | recommended deployment footprint is far beyond current 1-OCPU Oracle; too much system for the problem |
| `run-llama/llama_index` | modular ingestion/retrieval/agent toolkit | **DISTILL adapter abstraction** | useful pattern for keeping retrieval backends swappable | toolkit rather than one continuity product; broad surface increases maintenance |
| `n8n-io/n8n` | workflow automation, event triggers, integrations, human approvals | **KEEP only as optional pulse** | can refresh indexes/memory after Git changes | orchestration is not memory or authority; installing it first would not fix drift |
| `microsoft/graphrag` | LLM-extracted graph + community structure for private-data QA | **REJECT for v1** | useful historical graph-RAG research | repository is in maintenance mode and warns indexing can be expensive |

### Additional current project facts

- Serena exposes symbol-aware retrieval through MCP and LSP/IDE backends rather than primitive line search.
- Cognee's current README documents a no-API-key local path using GLiNER + local embeddings.
- PageIndex local mode (Aug 2026) builds hierarchical trees locally and can use the caller's chosen model for reasoning search.
- Graphiti explicitly models temporal validity and episodes/provenance.
- RAGFlow's current quickstart recommends roughly 4 CPU, 16 GB RAM, and 50 GB free disk; not appropriate for the currently constrained Oracle host.
- Aider's repo-map design uses tree-sitter plus dependency/reference ranking to fit the highest-value code symbols into a small token budget.

## Sieve — recall-backend shortlist

Rubric for the **always-on shared recall slot**:

- local/self-hosted no-mandatory-cloud baseline — 25
- cross-agent / MCP / simple API interoperability — 20
- provenance + contradiction/supersession support — 20
- project/docs/code breadth — 15
- low operational footprint — 10
- ability to remain subordinate to Git/project authority — 10

These are design-fit scores, not vendor benchmarks.

| Candidate | Fit /100 | Strongest fit | Main penalty |
|---|---:|---|---|
| MCP Memory Service | **91** | lightweight shared MCP/REST memory, local embeddings, contradiction graph | must disable/contain auto-supersession as authority |
| Cognee | **85** | rich local graph memory over docs/code/conversations | larger ingestion/semantic footprint |
| Graphiti | **79** | best temporal validity/provenance model | graph DB + extraction infrastructure |
| Mem0 | **74** | mature memory CRUD + multi-signal retrieval | personalization-first and more provider/config surface |
| Honcho | **70** | evolving peer/project representations | background inference can blur evidence vs interpretation |
| Letta | **66** | strong stateful-agent memory architecture | replaces too much of the existing runtime model |

**Decision:** start with a lightweight shared recall backend pattern closest to MCP Memory Service. Keep Cognee as the first richer alternative if graph/ontology needs outgrow it. Do not run two competing memory brains.

## Transfer — two-part architecture

### Part 1 — Backstitch (Agents of AI)

Backstitch is the protocol brain.

It owns:

- authority resolution;
- active owner/claim detection;
- pinned invariants;
- context manifest;
- retrieval strategy selection;
- supersession/conflict reconciliation;
- bounded working set;
- drift triggers;
- canonical writeback;
- resume receipt.

Backstitch remains useful even with no memory software installed.

### Part 2 — Loom (runtime profile, not a new AoA layer)

Loom is the replaceable context runtime under Backstitch.

```text
Backstitch
    |
    +-- Authority Router ---- Git / ledger / lane / runtime
    |
    +-- Shared Recall ------- MCP Memory Service (v1 candidate)
    |                           \
    |                            -> Cognee (richer alternative)
    |
    +-- Code Structure ------ Serena
    |                           \
    |                            -> Aider-style repo-map mechanism
    |
    +-- Long Documents ------ PageIndex on demand
    |
    +-- Temporal Semantics -- Graphiti-inspired validity/provenance model
    |
    +-- Workflow Pulse ------ optional n8n / cron / webhook later
```

The word **Loom** describes the runtime that pulls separate threads together. It is not proposed as an eighth AoA component type.

## Memory model to assimilate

Backstitch/Loom should maintain five distinct context classes rather than one generic “memory” bucket:

1. **Pinned authority** — current constitution, authority order, locked invariants.
2. **Routed state** — current lane/task/owner/branch/runtime.
3. **Episodic history** — events, corrections, outcomes, failures, transitions.
4. **Relational recall** — caused-by, contradicts, supersedes, extends, depends-on, owned-by.
5. **Structural context** — code symbols/dependencies and document trees.

A retrieval hit always carries source/provenance and state. No class silently becomes canonical truth.

## Ten high-value uses

1. Fresh chat resumes a complex project without bulk-reading every old handoff.
2. User says “we already solved this” and Backstitch finds the existing mechanism before redesign starts.
3. Agent detects that a handoff is superseded by a lane/ledger and excludes it from the working set.
4. Multiple workers discover an ownership collision before touching the same write surface.
5. A correction such as “DELETED is a cursor, not Penny proof” becomes a durable high-priority recall event with the exact canonical route.
6. Coding agent gets the relevant symbols/references from Serena instead of reading whole source files.
7. Large policy/manual is navigated by PageIndex-style hierarchy only when exact routing is insufficient.
8. Temporal state can answer “what was true last week vs what is true now?” without deleting history.
9. Resolved observations collapse to one-line conclusions + source pointers, reducing token/context noise over long sessions.
10. Easy Handoff becomes genuinely resumable because its next step points into a validated Backstitch context receipt.

## Anti-drift acceptance tests

Backstitch fails if any of these occur in a controlled replay:

- a superseded file is selected as current authority;
- an active owner collision is missed;
- a memory backend's inferred fact overrides Git/project authority;
- a known existing mechanism is reinvented despite being indexed;
- a user correction remains only in chat and is absent from durable continuity;
- a fresh session needs broad repository reading to identify the next action;
- the context pack contains more ambient than load-bearing material.

Target pilot:

- Penny L6 acquisition continuation;
- one Personal Forge infrastructure lane;
- one non-code long-document project.

Measure:
- files/lines loaded before first correct action;
- number of owner corrections required;
- repeated/reinvented work;
- stale-authority mistakes;
- resume time;
- context size.

## Clean-room boundary

Backstitch is a new method specification written from observed mechanisms.

- No third-party prompt/system instructions were copied.
- No third-party source code is incorporated.
- Project names are provenance only.
- If a future implementation directly imports an OSS dependency, its license and attribution must be handled separately.

## Destination

- **Agents of AI:** Backstitch agent.
- **Personal Forge:** later adapter/router implementation and project-specific authority manifests.
- **Origin:** retain this receipt as provenance and future comparison basis.
- **CTRL-AI / project governance:** continues to define what is authoritative; Backstitch does not.

## Reversal conditions

Reconsider the architecture if:

- lightweight deterministic routing alone eliminates most continuity errors;
- a single existing memory product proves it can enforce project authority without a separate protocol;
- operational overhead of the recall service exceeds measured savings;
- retrieval quality fails on held-out resume tasks;
- the project's native platform memory becomes sufficiently reliable and source-addressable to make the external recall backend redundant.

## NOT RUN

- No third-party memory service installed.
- No Oracle service added.
- No production/Penny scheduler changed.
- No third-party code copied.
- No hosted GitHub Actions run.
