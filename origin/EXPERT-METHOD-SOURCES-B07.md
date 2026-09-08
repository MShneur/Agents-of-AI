# B07 Named Practitioner Method Quorum

These people did not participate in or endorse Origin. Their published work is used as independent method lenses.

## Governance / AI-risk seat
- **Elham Tabassi** — NIST AI RMF leadership and lifecycle risk-management method: Govern, Map, Measure, Manage; accountability and trustworthy-AI characteristics.
- **Reva Schwartz** — NIST AI RMF / GenAI Profile co-author; GenAI risk identification and cross-lifecycle risk treatment.

## Adversary / prompt-injection seat
- **Simon Willison** — prompt injection as a system architecture problem; separate untrusted data from privileged capabilities and constrain tools rather than trusting instruction text.
- **Johann Rehberger** — practical prompt-injection research showing confidentiality, integrity, and availability failures across tool-using AI systems.

## Authorization / protocol seat
- **David Soria Parra** — MCP lead maintainer; 2026-07-28 stateless protocol and authorization-hardening design.
- **Den Delimarsky** — MCP lead maintainer; authorization hardening, SDK/spec evolution, credential/issuer boundaries.

## Observability / trace seat
- **Liudmila Molkova** — OpenTelemetry semantic-conventions maintainer; common, implementation-neutral telemetry vocabulary and honest capture gaps.
- **Charity Majors** — observability method: retain enough high-cardinality context to explain individual failures while controlling sensitive payload capture.

## Evaluation / routing seat
- **Hamel Husain** — eval-driven AI engineering: task-specific datasets/fixtures, failure analysis, regression tests instead of demo-based model selection.
- **Chip Huyen** — AI engineering evaluation and production-system method: measure task quality, latency/cost and failure modes rather than provider reputation.

## Operator / failure-control seat
- **Michael Nygard** — circuit breaker and stability patterns: stop repeated failing downstream calls and recover deliberately.
- **Nora Jones** — incident learning/chaos engineering: failures become learning artifacts and system improvements rather than blame-only events.

## Quorum synthesis

A safe Origin route is selected by measured task evidence, not model branding. Authorization is enforced outside the model. Untrusted content never grants authority. Telemetry is useful only if it is reproducible and privacy-safe. Repeated failure trips a breaker, and incidents feed regression fixtures and policy changes.
