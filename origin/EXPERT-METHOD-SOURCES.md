# B01 Named Method Sources

Verified: **2026-09-07**

The named practitioners below did **not** participate in or endorse Origin. Their public methods are review lenses used to challenge the B01 control-plane design.

## Michael Nygard — Architecture Decision Records

Source: `Documenting Architecture Decisions` (Cognitect, 2011).

Method applied:
- record small architecturally significant decisions with context and consequences;
- keep superseded decisions rather than erasing history;
- prefer modular decisions that can be revisited.

B01 use: keep the control-plane decisions reversible and source-traceable.

## Maxim Fateev — Durable execution

Source: Temporal public durable-execution technical material.

Method applied:
- persist progress so execution can resume after failure;
- make retries/timeouts/state durable system concerns rather than ad-hoc prompt behavior.

B01 use: model complex work as explicit state/transitions and avoid “continue until the model says done.”

## Charity Majors — Structured observability

Source: `Observability is a Many-Splendored Definition` and related public writing.

Method applied:
- instrument around the request/task path;
- preserve rich structured context in explorable events;
- prioritize high-cardinality/high-dimensional evidence over disconnected log lines.

B01 use: define a trace as a structured task event with routing, tool, quality, and outcome context.

## Hamel Husain — Error-analysis-led evals

Source: `AI Evals` / Evals FAQ (updated 2026).

Method applied:
- start with representative traces and real failure analysis;
- design task-specific pass/fail evals around observed failure modes;
- do not substitute generic similarity metrics for application-specific checks.

B01 use: separate truth, evidence, schema, security, dissent, and task-quality gates.

## Simon Willison — Lethal trifecta / prompt injection

Source: `The lethal trifecta for AI agents` (2025) and follow-up public work.

Method applied:
- treat untrusted content plus private data plus external communication as a structural hazard;
- do not rely on prose instructions alone to contain tool risk.

B01 use: traces redact sensitive material; source content never gains instruction authority; external actions remain outside this batch.

## Chip Huyen — Agent failure modes

Source: `Agents` (2025) and `Common pitfalls when building generative AI applications`.

Method applied:
- separate planning, tool selection, tool execution, and efficiency failures;
- validate plans/tool calls rather than judging only final prose;
- start simpler than a fully autonomous system.

B01 use: task states and evals expose routing/tool failures independently of output fluency.
