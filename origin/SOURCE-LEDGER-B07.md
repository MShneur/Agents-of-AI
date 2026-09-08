# B07 Source Ledger — AI Security, Routing, Governance

Historical source: uploaded `origin .md`, historical **Batch 8**.

## Historical named sources

- NIST AI Risk Management Framework 1.0
- NIST AI 600-1 Generative AI Profile
- OWASP Top 10 for LLM Applications
- OpenTelemetry GenAI semantic conventions
- Model Context Protocol authorization/security specification
- Langfuse tracing/evaluation/prompt-versioning patterns

## Current verification — 2026-09-07

- NIST AI RMF 1.0 remains the historical framework basis; NIST states AI RMF 1.0 is under revision. AI 600-1 remains the published GenAI profile (updated NIST page 2026-04-08).
- OWASP GenAI LLM Top 10 **2026** released 2026-08-03; Agentic Applications Top 10 2026 is also current.
- OWASP Agent Control Standard was added 2026-09-01 and explicitly emphasizes inspectable, traceable, runtime-enforceable middleware controls.
- MCP current specification is **2026-07-28**: stateless core, authorization hardening, RFC 9207 issuer validation, issuer-bound credentials, DCR deprecation toward Client ID Metadata Documents.
- MCP tool annotations/descriptions are not authorization and are untrusted unless from a trusted server.
- OpenTelemetry GenAI semantic conventions moved to `open-telemetry/semantic-conventions-genai`; GenAI agent and MCP conventions are currently marked Development.
- Langfuse current docs continue prompt versioning, trace linkage, datasets/evaluations, scores, and human annotation patterns.

## Clean-room boundary

No implementation code, prompts, policy files, or schemas from these projects/specifications are vendored. Origin independently implements the behavioral controls from the historical blueprint and current public standards.

## Versioning rule

External standards are pinned by `checked_at` and version/date. Origin's internal policy and trace contracts are stable; external telemetry/protocol adapters are versioned independently so a moving standard cannot silently redefine Origin governance.
