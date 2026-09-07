# Compute Outside Context

Status: **FOUNDATION / provider-neutral**

## Problem

Models are often asked to ingest hundreds of files, logs, issues, rows, or web pages and mentally aggregate them. That wastes tokens, increases omission risk, and pollutes later reasoning with raw material whose only purpose was to produce a small statistic or filtered set.

## AoA invariant

**When a deterministic program can reduce bulk data to the evidence the reasoning step needs, compute first and reason second.**

The model writes or selects the analysis procedure; the runtime executes it against the data outside the prompt; only the result, exceptions, and provenance return to context.

## Pattern

```text
BULK SOURCE
   ↓
addressable storage / sandbox / query engine
   ↓
deterministic filter | parse | aggregate | diff | test
   ↓
small evidence object + source pointers
   ↓
MODEL REASONING
```

## Good uses

- count files/functions/rows;
- search exact symbols across repositories;
- parse structured logs;
- aggregate benchmark results;
- diff large trees;
- validate schemas;
- deduplicate lists;
- rank candidates using explicit scoring rules;
- compute hashes/checksums;
- extract metadata from many artifacts;
- run tests/linters rather than asking the model whether code “looks valid.”

## Do not outsource the wrong thing

Keep model reasoning when the step requires semantic interpretation, ambiguity resolution, tradeoff judgment, or synthesis that deterministic code cannot express reliably.

The preferred split is often:

```text
MODEL: define what evidence matters and how to interpret it
CODE:  perform bulk mechanical transformation faithfully
MODEL: reason over the compact evidence
```

## Evidence envelope

Return enough to audit the computation:

```yaml
operation: <what was computed>
input_scope: <paths/query/time range>
result: <compact output>
exceptions: <anything skipped/failed>
reproducible_by: <script/command/query when available>
source_pointer: <artifact/index/log reference>
```

## Security

- Run generated analysis code in the appropriate execution boundary.
- Do not inject secrets into model-visible output merely because the script can read them.
- Treat external data as untrusted input.
- Apply path/network/tool restrictions before execution, not after the model promises good behavior.

## Failure signals

- hundreds of KB/MB of raw output enter context to answer a one-number question;
- a model manually counts or deduplicates a large collection;
- repeated tool calls fetch items one by one when one deterministic batch query could answer the question;
- the final claim cannot be reproduced because the aggregation lived only in model reasoning.

## Sources distilled

- `mksglu/context-mode`: program the analysis and keep bulk raw data outside the live context.
- Chip Huyen: test tools and their outputs directly; measure failures rather than inferring correctness from final prose.
- AoA `large-artifact-handoff`: move large artifacts through file/object lanes instead of prompt/token lanes.

See `../research/SOURCE-LEDGER-2026-09-07.md`.
