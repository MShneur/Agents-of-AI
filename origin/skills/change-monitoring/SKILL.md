---
name: change-monitoring
description: Define evidence-preserving repeated observations and semantic change alerts for an already admitted source.
version: 0.1.0
---

# Objective
Operate bounded repeated observations with snapshot-per-check, semantic change events, freshness SLOs, dedupe, suppression rules, and user preference gates.

# Activation
monitor product; price history; price drop; restock; change alert; watch URL.

# Required context
Require: approved_source_id, target_url_or_offer_id, semantic_fields_to_watch, check_schedule. Missing source admission means admission-only mode.

# Evidence rules
Every factual field must retain evidence path, raw value, normalized value, acquisition method, parser version, observation time, and confidence. Conflicts and unknowns remain explicit.

# Method
Admit source → test official API/feed → structured metadata → semantic server HTML → approved rendered DOM only if needed → normalize/validate → snapshot/replay → quality gate.

# Objection pass
Challenge method cost/fragility, evidence provenance, identity/variant risk, source-policy boundary, retry/freshness reliability, and user impact before activation.

# Output contract
Return schema-valid artifacts only. Do not convert missing evidence into prose certainty.

# Quality gates
- semantic_field_defined
- snapshot_per_observation
- variant_bound
- duplicate_event_protection
- freshness_slo_defined
- alert_policy_defined
- stale_state_defined

# Failure conditions
- parser_confidence_below_threshold
- source_policy_change
- repeated_challenge_or_login
- semantic_field_unstable
- observation_identity_conflict

# Handoff rules
Emit an explicit typed handoff; never silently invoke another skill or external action.

# References
See `references/allowed-sources.md`, `references/methods.md`, and B05 source ledger.
