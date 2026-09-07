# ADR-0001 — Build Surface, Not an Eighth AoA Layer

- Status: **Accepted for branch foundation**
- Date: 2026-09-07
- Scope: `builds/agents-of-ai/`
- Reversibility: high while isolated on the build branch

## Context

Agents of AI defines seven composable library layers: personas, agents, workflows, techniques, modes, teams, and failures. The project also has supporting surfaces that package or route those components without becoming additional library layers.

The requested product work needs three deployable forms:

1. a Custom GPT build;
2. an agent-runtime build;
3. reusable skills.

Those deployment forms do not introduce a new reasoning method. They package and compose existing AoA methods for particular runtimes.

## Decision

Create `builds/agents-of-ai/` as a **deployment/product build surface** over the existing seven-layer library.

The build surface may contain runtime-specific instructions, manifests, packaging guidance, skills, evaluation contracts, and source-outline reconciliation records. It must reference or compose canonical AoA entries rather than copying them into a parallel library.

When R&Duck is present, R&Duck remains the governing operating layer. This build surface is downstream capability/cast packaging and cannot override R&Duck, platform policy, repository authority, or explicit human decisions.

## Why this shape

### Small decisions with visible consequences

Michael Nygard's published Architecture Decision Record method favors a small record containing context, decision, status, and consequences. This ADR keeps the product-structure choice isolated and reversible rather than burying it inside a large build prompt.

### Separate reference from procedural packaging

Daniele Procida's Diátaxis method separates reference, how-to, tutorial, and explanation needs. The canonical seven AoA layers remain the reusable reference/method library; `builds/` can hold deployment-oriented how-to and runtime packaging without changing what a library entry means.

These practitioners did not participate in or endorse Agents of AI. Their published methods are used as external review lenses under `workflows/quorum.md`.

## Alternatives considered

### A. Add an eighth `skills/` composable layer

**Rejected.** Skills are runtime packaging around reusable behavior. Treating them as an eighth layer would conflict with the repository's explicit seven-layer ontology and duplicate methods already represented as agents, workflows, techniques, or modes.

Disposition: **REJECTED**.

### B. Put everything under `tools/`

**Rejected.** The existing tools shelf is for software/API/setup support. A Custom GPT and agent build are product/runtime packages for AoA itself, not merely tool recommendations or setup notes.

Disposition: **REJECTED**.

### C. Scatter build files at repository root

**Rejected.** Runtime-specific details would mix with canonical library navigation and make source-outline reconciliation harder to audit or revert.

Disposition: **REJECTED**.

### D. Create a dedicated build surface

**Accepted.** It preserves the seven-layer contract, keeps deployment artifacts together, and can be removed without changing canonical library entries.

Disposition: **ACCEPTED**.

## Quorum challenge

The strongest case against `builds/` is that it creates another top-level concept users must understand. The mitigation is strict language: **build surface, not library layer**, plus cross-links from one concise root README section rather than duplicating the full build documentation.

A second concern is runtime lock-in. The mitigation is to keep the behavioral contract provider-neutral while allowing concrete target packages (for example, OpenAI Custom GPT and Agents SDK) to document their current runtime-specific fields.

A third concern is stale product documentation. The mitigation is dated verification notes and treating runtime facts as fast-changing support information rather than timeless AoA semantics.

## Consequences

Positive:

- preserves the seven-layer ontology;
- makes Custom GPT, agent, and skill packages discoverable together;
- isolates fast-changing provider facts from canonical methods;
- gives the historical source outline an auditable reconciliation lane;
- supports branch-level rollback.

Costs:

- adds one top-level `builds/` concept;
- requires dated runtime verification;
- requires discipline to avoid copying canonical AoA entries into build files.

## Binding constraints

1. A build artifact must reference existing AoA entries when the method already exists.
2. `MERGE-PROTOCOL.md` applies before creating any new canonical library entry as a side effect of build work.
3. The exact historical pre-built persona roster and exact Negative Gate wording are not inferred; they are reconciled from the user's supplied outline.
4. The build must support dynamic AoA activation **in addition to** its pre-built cast and Negative Gate.
5. External instruction ingestion is gated by `techniques/skill-provenance.md`.
6. Consequential irreversible choices route through Human Gate / Quorum under the governing system.

## Revisit triggers

Revisit this ADR if:

- `builds/` starts containing canonical methods rather than packaging them;
- skills become a repository-wide ontology with semantics genuinely distinct from all seven existing layers;
- a second provider build reveals that the current layout cannot stay portable;
- the historical source outline contains a contradictory architecture decision that survives line-by-line review.
