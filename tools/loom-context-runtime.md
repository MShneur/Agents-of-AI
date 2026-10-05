# Loom — Context Runtime Shelf

**Public review date:** 2026-10-05  
**Status:** experimental supporting runtime pattern  
**Pairs with:** `agents/backstitch.md`

Loom is the replaceable runtime under Backstitch. It is **not** an eighth Agents-of-AI layer and it is not a new source of truth.

Backstitch decides **what context is authoritative and needed**. Loom provides adapters that can retrieve or store that context efficiently.

## Design rule

Use **one tool per role** unless a second tool creates a genuinely independent capability.

Do not install several competing memory brains and ask an agent to reconcile them later.

```text
Backstitch
    |
    +-- Authority Router ---- Git / project ledger / lane / runtime
    +-- Shared Recall ------- one approved memory backend
    +-- Code Structure ------ semantic symbol/reference adapter
    +-- Long Documents ------ hierarchical document adapter, on demand
    +-- Temporal Semantics -- validity / supersession metadata
    +-- Workflow Pulse ------ optional event automation
```

## Recommended slots

| Slot | What it must do | Recommended starting point | Alternatives / extracted mechanisms | Do not use it for |
|---|---|---|---|---|
| **Authority Router** | Resolve canonical repo, ledger, lane, active owner, superseded files | Deterministic project manifests + Git metadata | repository-specific scripts/SQLite/FTS | semantic guessing about authority |
| **Shared Recall** | Store concise decisions, corrections, outcomes and source pointers across agents | **MCP Memory Service** | Cognee when richer graph/ontology needs justify it | replacing canonical Git/project truth |
| **Code Structure** | Retrieve symbols, references, dependencies and exact implementation context | **Serena** | Aider-style token-budgeted repo map | policy/history memory |
| **Long Documents** | Navigate large reports/manuals by hierarchy rather than dumping whole documents | **PageIndex**, on demand | project-native TOC/tree indexes | small Markdown ledgers with exact routes |
| **Temporal Semantics** | Preserve current vs historical vs superseded facts and provenance | **Graphiti-inspired validity model** in project metadata | richer Graphiti deployment when justified | auto-deleting history |
| **Workflow Pulse** | Trigger refresh/re-index after durable state changes | existing scheduler/webhook first | n8n if visual multi-system automation becomes useful | deciding what is authoritative |

## Why MCP Memory Service is the first recall candidate

Its current public project exposes:

- MCP and REST interfaces;
- self-hosted/local operation;
- local ONNX embeddings;
- SQLite-vec as a lightweight backend;
- agent IDs and conversation IDs;
- causal/relationship graph support;
- configurable contradiction/consolidation behavior.

That combination fits an always-on shared recall service better than deploying a full agent runtime.

**Backstitch constraint:** automatic contradiction/supersession features must never silently hide a canonical project record. Memory relationships may suggest `contradicts` or `supersedes`; the project authority path decides whether that relationship becomes canonical.

Official: https://github.com/doobidoo/mcp-memory-service

## Why Cognee stays the richer alternate

Cognee's current public project can ingest documents, code and conversations into a self-hosted graph/search layer and documents a local no-API-key extraction/retrieval path using local models.

Choose Cognee instead of the lightweight recall slot when:

- ontology/entity relationships materially improve retrieval;
- project/document/code graph exploration becomes a primary need;
- the host budget supports the larger semantic pipeline.

Do **not** run Cognee and another general memory brain by default.

Official: https://github.com/topoteretes/cognee

## Why Serena is separate

Serena is not long-term memory. Its strength is semantic code navigation:

- symbols;
- definitions;
- references;
- relationships;
- refactoring/editing through MCP;
- language-server or IDE-backed structure.

That solves a different failure: an AI reading an entire repository or grepping text when it needs three symbols and their callers.

Official: https://github.com/oraios/serena

## Why PageIndex is on-demand

PageIndex builds hierarchical document trees and searches them with reasoning rather than requiring a vector database/chunk-first workflow.

Use it when document hierarchy is itself load-bearing: long manuals, legal/policy collections, reports, books, research dossiers.

Do not invoke it for every small project file. Exact filenames/headings/manifests are cheaper and more deterministic.

Official: https://github.com/VectifyAI/PageIndex

## Mechanisms borrowed without adopting their runtimes

### Graphiti — temporal truth

Keep the mechanism:

```text
fact
source
valid_from
valid_to
status=current|historical|superseded|disputed
superseded_by
```

This prevents “new” from erasing “was true then.”

Official: https://github.com/getzep/graphiti

### Mem0 — multi-signal recall

Keep the retrieval idea:

```text
exact/keyword
+ semantic
+ entity relationships
+ time
```

Do not adopt memory ranking as an authority ranking.

Official: https://github.com/mem0ai/mem0

### Letta — pinned vs archival memory

Keep the distinction:

- small load-bearing context stays pinned;
- everything else is retrieved when needed.

Backstitch expands it into PINNED / ROUTED / RECALL / EVIDENCE / ARCHIVE.

Official: https://github.com/letta-ai/letta

### Honcho — separate peers/entities

Keep user, agent, project, group and idea state distinguishable instead of blending every statement into one memory stream.

Inferred peer representations remain interpretation, not canonical evidence.

Official: https://github.com/plastic-labs/honcho

### Aider — budgeted repo maps

Keep the principle that repository context should be ranked and budgeted around definitions/references rather than streamed wholesale.

Official: https://github.com/Aider-AI/aider

### RAGFlow / LlamaIndex — adapter pipelines

Keep the modular ingestion/parser/retrieval pattern.

Do not adopt a full knowledge platform when the project only needs shared recall plus precise code/document adapters.

Official:
- https://github.com/infiniflow/ragflow
- https://github.com/run-llama/llama_index

### n8n — optional pulse

n8n is useful when a future deployment needs visual automation across many systems, for example:

```text
Git change
-> detect affected project/lane
-> refresh recall index
-> run health check
-> record outcome
```

It is orchestration, not memory, authority, or retrieval policy.

Official: https://github.com/n8n-io/n8n

## Deployment profiles

### No always-on computer / no spare server

Use **Cognee Cloud Free** as the first recall pilot instead of creating new infrastructure.

Verified 2026-10-05 from Cognee's official pricing page:
- $0/month, described as free forever;
- 1 workspace;
- 1M included memory-processing tokens;
- unlimited users;
- unlimited API calls;
- Claude Code / Codex / MCP integrations;
- no card required.

Official: https://www.cognee.ai/pricing

For private projects, prefer **pointer-rich continuity records** over uploading raw repositories:
- project/lane/task ID;
- concise decision/correction/outcome;
- source commit/file pointers;
- status/current-vs-historical;
- no secrets, credentials, private infrastructure values, or unnecessary raw payloads.

The free cloud service is **recall only**. Git/project authority remains canonical.

### Self-hosted/private compute available

Prefer a lightweight shared-recall service such as MCP Memory Service when:
- data must stay on approved infrastructure;
- a stable host already exists;
- local SQLite/ONNX is operationally cheaper than a richer graph pipeline.

Use self-hosted Cognee only when its richer ontology/graph behavior is worth the additional compute and maintenance.

### Free-hosting caveat

Do not create extra infrastructure merely to say the memory is self-hosted. Current free web hosts commonly provide around 0.1 vCPU / 512MB and may sleep, which is a poor fit for Cognee's local model path. Choose the hosted free tier or wait for approved compute rather than burden a production server.

## Minimum viable Loom

Start smaller than the research landscape:

```text
1. deterministic authority manifest/router
2. one shared recall service
3. Serena for code-heavy repositories
4. ordinary exact Git/file search
```

Add PageIndex only for genuinely large hierarchical documents.

Add a richer temporal graph or n8n only after measured failures show the simpler stack cannot cover the need.

## Acceptance

Loom is helping only if held-out continuation tasks show:

- fewer files/lines loaded before the first correct action;
- fewer stale-authority mistakes;
- fewer owner corrections;
- fewer rebuilt/duplicate mechanisms;
- faster resume with equal or better evidence quality;
- no memory record overriding canonical authority.

If operating cost or maintenance exceeds those gains, reduce the stack rather than adding another memory system.
