# Origin B07 — AI Security, Routing, Governance

Status: DONE / HOLD

Historical mapping: uploaded Origin blueprint **Batch 8**. Clean implementation sequence: **B07**.

## Governing rule

Origin is policy-controlled, traceable, least-privilege, evaluation-gated, and fail-closed for dangerous or external actions.

Historical source quorum names (Kieran Sol, Lydia Farrow, Dr. Anika Rao, Theo Mercer, Maya Chen) are retained as source provenance only. R&Duck/AoA execution uses the separately documented real-practitioner method quorum and never implies participation or endorsement.

## Source-exact controls implemented

- deny-by-default policy engine and R0–R4 risk classification
- public/internal/restricted/regulated-or-high-risk/secret data classes
- secret boundary: model/prompt/trace/log exclusion
- untrusted content as data-only; prompt text never grants tool authority
- server-side tool permission matrix
- external-write approval bound to exact target + exact payload hash
- capability/model aliases, task-specific evaluation and fallback gates
- provider health + circuit breaker
- internal trace/event schema with redaction
- retention/deletion policy
- policy exceptions with owner + expiry + review record
- evaluation → incident → fixture/regression loop
- `security-governance` and `ai-routing` portable skill packages
- Batch-8 security fixtures and 2026 agentic-security strengthening fixtures

## 2026 strengthening, explicitly outside the historical text

- OWASP LLM Top 10 2026 and OWASP Top 10 for Agentic Applications 2026 are added as current threat inputs.
- OWASP Agent Control Standard (2026-09-01) reinforces runtime middleware enforcement; Origin already follows the same architectural rule: policy enforcement is outside model discretion.
- MCP 2026-07-28 authorization hardening is reflected in issuer validation, credential-to-issuer binding, least privilege, and untrusted tool metadata.
- OpenTelemetry GenAI conventions have moved to a dedicated repository and agent/MCP conventions remain Development; Origin keeps a stable internal schema and maps outward through versioned adapters.

## Hard rejects

prompt-as-authority; tool-description-as-authorization; raw secrets in model/prompt/trace/log; unvalidated tool arguments; unbound external writes; silent high-risk fallback; unlimited retries/token loops; undocumented or immortal policy exceptions; provider activation without data-policy/eval review; model output used as factual evidence.

## Out of scope

No production permission mutation, tool enablement, credential rotation, provider activation, policy deployment, production routing change, external write, deployment, or public release.
