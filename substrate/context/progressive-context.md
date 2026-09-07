# Progressive Context

Status: **FOUNDATION / provider-neutral**

## Problem

A large context window is not a reason to fill it. Long sessions degrade when raw tool output, completed branches, full documents, and unrelated history compete with the few facts needed for the current decision.

AoA already has `techniques/observation-masking.md`, which prunes finished or irrelevant material. This substrate contract adds the complementary **loading side**: keep deeper information addressable outside the prompt and reveal it progressively.

## AoA invariant

**Load context by required decision depth, not by what is available.**

Use three conceptual levels:

```text
L0 — locator / abstract
     enough to decide whether the item matters

L1 — working overview
     structure, key facts, constraints, source pointers

L2 — full detail
     original document/code/tool output when the task actually requires it
```

The names are AoA-local. A runtime may implement more/fewer levels.

## Context ladder

1. Start from L0 identifiers/abstracts.
2. Promote only likely-relevant material to L1.
3. Promote to L2 only when a concrete reasoning step depends on details unavailable at L1.
4. After the step resolves, demote/mask the full detail and keep the result + pointer.
5. Preserve enough provenance to reopen the original source without relying on the summary alone.

## Directory / graph awareness

Retrieval should preserve surrounding structure where useful. A matching fragment without its module, directory, issue thread, decision record, or parent concept can be misleading.

Prefer:

```text
match → parent context → relevant siblings → exact detail
```

over dumping every semantically similar chunk.

## Context budget

Before a long task, set a working-set budget appropriate to task shape.

- exploration: broader L0/L1 surface;
- implementation: narrow live constraints + exact files;
- verification: acceptance contract + frozen artifact + failure evidence;
- handoff: decisions/open risks/next step, not full transcript.

## Relationship to Observation Masking

```text
Progressive Context = control what ENTERS the live working set.
Observation Masking = remove what no longer needs to STAY there.
```

Use both for long work.

## Failure signals

- “context is full” while most visible material is resolved/raw output;
- repeated rereading of the same giant files because no addressable overview exists;
- summary drift because the original source pointer was lost;
- retrieval returns a plausible fragment detached from its structural context;
- compaction causes the agent to forget current files/tasks because live state was never externalized.

## Sources distilled

- `volcengine/OpenViking`: tiered context representation, browsable structure, observable retrieval.
- `mksglu/context-mode`: raw data should often stay outside the prompt and be retrieved selectively.
- AoA `observation-masking`: prune resolved/dead observations from the working set.

See `../research/SOURCE-LEDGER-2026-09-07.md`.
