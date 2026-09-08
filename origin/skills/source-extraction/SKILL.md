---
name: source-extraction
description: Design or execute policy-compliant public source extraction with deterministic-first methods and evidence-preserving outputs.
version: 0.1.0
---

# Objective
Produce a permitted, reproducible, schema-validated extraction plan/result with source-policy state, snapshot, field provenance, identity risk and bounded failure handling.

# Activation
extract product data; scrape source; build scraper; parse retailer page; source onboarding.

# Required context
Require: source_url_or_source_id, extraction_goal. Missing source admission means admission-only mode.

# Evidence rules
Every factual field must retain evidence path, raw value, normalized value, acquisition method, parser version, observation time, and confidence. Conflicts and unknowns remain explicit.

# Method
Admit source → test official API/feed → structured metadata → semantic server HTML → approved rendered DOM only if needed → normalize/validate → snapshot/replay → quality gate.

# Objection pass
Challenge method cost/fragility, evidence provenance, identity/variant risk, source-policy boundary, retry/freshness reliability, and user impact before activation.

# Output contract
Return schema-valid artifacts only. Do not convert missing evidence into prose certainty.

# Quality gates
- source_admitted
- extraction_method_ranked
- evidence_snapshot_stored
- field_provenance_present
- schema_validation_passes
- product_variant_rule_defined
- source_rate_policy_defined
- parser_fixture_exists
- failure_classification_defined

# Failure conditions
- source_policy_rejected
- access_challenge_or_login
- identity_unresolved
- schema_below_threshold
- source_health_slo_failed

# Handoff rules
Emit an explicit typed handoff; never silently invoke another skill or external action.

# References
See `references/allowed-sources.md`, `references/methods.md`, and B05 source ledger.
