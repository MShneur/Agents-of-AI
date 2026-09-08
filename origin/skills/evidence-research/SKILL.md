---
name: evidence-research
description: Investigate a factual question through admitted sources and produce a replayable evidence-backed brief with explicit unknowns and conflicts.
version: 0.1.0
---

# Objective
Answer factual questions from stored/admitted evidence, not model memory; every supported claim points to evidence IDs and unresolved conflicts stay unresolved.

# Activation
research source; investigate claim; verify evidence; source check.

# Required context
Require: question. Missing source admission means admission-only mode.

# Evidence rules
Every factual field must retain evidence path, raw value, normalized value, acquisition method, parser version, observation time, and confidence. Conflicts and unknowns remain explicit.

# Method
Admit source → test official API/feed → structured metadata → semantic server HTML → approved rendered DOM only if needed → normalize/validate → snapshot/replay → quality gate.

# Objection pass
Challenge method cost/fragility, evidence provenance, identity/variant risk, source-policy boundary, retry/freshness reliability, and user impact before activation.

# Output contract
Return schema-valid artifacts only. Do not convert missing evidence into prose certainty.

# Quality gates
- every_claim_has_evidence_id
- unknowns_explicit
- conflicts_preserved
- source_policy_respected
- evidence_replay_passes

# Failure conditions
- all_sources_blocked
- evidence_integrity_failure
- claim_cannot_be_replayed

# Handoff rules
Emit an explicit typed handoff; never silently invoke another skill or external action.

# References
See `references/allowed-sources.md`, `references/methods.md`, and B05 source ledger.
