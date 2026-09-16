# Universal Plugin/Product Agent — Research Plan

Status: **Research complete — 5 of 5 passes finished**
Final name: **Alt-ssembly Required**
Planned AoA id: `alt-ssembly-required`
Target: a reusable Agents-of-AI agent plus workflow for browser extensions, plugins, userscripts, integrations, adapters, small product tools, and similar software.

## Why this exists

The recurring failure in Ghost in the Loop was not a lack of coding ability. It was a failure to preserve the whole product while repairing one subsystem.

Repeated mistakes included:
- fixing Play/Send by deleting unrelated working UX and product features;
- treating prompt-level features as if they were controller logic;
- letting one repair create another repair loop;
- shipping broad architectural changes without proving the complete execution path;
- failing to protect approved visual/interaction intent while changing implementation;
- describing novice-facing states with internal engineering terms such as `DOM partial`;
- underusing platform-native data paths for export before falling back to page scraping;
- insufficient browser/mobile/cross-platform verification;
- assuming a successful local/code-path check proves the actual user journey.

The target agent must be able to start from an original product idea, discover the necessary product surfaces, preserve accepted behavior, build a complete implementation plan, route bounded specialists, verify the real user journey, and catch overcorrection before release.

## Existing AoA foundations to reuse, not duplicate

### Origin
Use Origin's authority/provenance discipline before implementation:
- distinguish current-state truth from intended product/design truth;
- classify relevant surfaces as `BUILT | MISSING | BROKEN | OBSOLETE | UNKNOWN`;
- preserve verified `BUILT` work;
- identify the actual delta before editing;
- use an Origin-style packet before build work.

For this agent, the packet expands from visual design into full **product behavior authority**:
- current working features;
- accepted user journeys;
- transport/runtime boundaries;
- platform/browser constraints;
- export/data pathways;
- settings/preferences that must survive;
- allowed files/surfaces;
- explicit non-goals.

### Cleanerz
Auto-route Cleanerz when:
- a fix is fixing a previous fix;
- output/change volume rises while operator clarity falls;
- the same design/architecture decision is revisited repeatedly;
- a repair removes known-good features without an explicit kill decision;
- a version is revised repeatedly without a real user-path proof.

Cleanerz owns the replan. The new agent must not imitate Cleanerz internally.

### Root Cause
Use complete-path diagnosis, not single visible symptoms. Separate host/browser/runtime, DOM/API/data path, transport, state lifecycle, and user interaction paths until evidence proves they are equivalent.

### Buildhouse / Build Chain
Reuse implementation, debugging, adversarial verification, security, and safe-refactor disciplines. The new agent adds the missing product-preservation, novice-UX, browser-extension, analytics, and cross-surface integration responsibilities.

### Repo Nanny
Reuse repository ecosystem maintenance, issue/PR/check sweeps, adjacent breakage, and wheel checks. The new agent is a product/build operator, not a replacement for repo maintenance.

### Quorum / Human Gate
For consequential architecture, release, data-access, privacy, permission, or irreversible UX changes, source real practitioners live at run time. Never use a frozen expert roster as authority.

### Single Dispatch Operator
The new agent is the chief operator for one product/build assignment. Specialists get bounded work and return to it; no recursive supervisor chains.

## Research conclusion

Five research passes support one universal **whole-product assembly agent**, not a new monolithic framework.

The final operating model is built around four scalable contracts:

1. **Product Packet** — what the product is, what is built/broken/missing, and what must survive.
2. **Runtime Envelope** — where it runs, lifecycle/permission boundaries, compatibility targets, fallbacks, and field paths.
3. **Novice Contract** — first successful action, progressive disclosure, plain-language status/recovery, advanced capability preservation, mobile/accessibility.
4. **Evidence Contract** — exact artifact/path evidence required before a claim can be made.

And one anti-overcorrection mechanism:

- **Preservation Ledger** — product surfaces, layer owners, status, and explicit change authority.

Binding rule:

> A repair may not delete a working accepted product surface unless the deletion appears explicitly in the Product Packet `KILL` section and receives the required human decision.

## Required professional-method seats for consequential live Quorum

At run time, re-source current practitioners/methods for the roles that matter. Research anchors from the five passes include:

1. **Human-centered product / systems** — root problem, whole activity, affected users, iterative testing.
2. **Software architecture / behavior preservation** — complexity control, deep boundaries, behavior-preserving changes.
3. **Browser/plugin platform engineering** — WebExtensions common core, permissions, lifecycle, vendor deltas, mobile/browser compatibility.
4. **Verification / exploratory QA / experimentation** — falsification, scripted vs exploratory evidence, outcome metrics, guardrails.
5. **Observability / operator** — debuggability, coding/testing for failure, bounded structured diagnostics.
6. **Security / adversary** — threat modeling, least privilege, hostile/failure paths.
7. **Affected user** — actual representative human where load-bearing; never replaced by a fake expert persona.

Research anchors are documented in Pass 5 and must not be frozen into a permanent Quorum roster.

## Completed research passes

### Pass 1 — failure archaeology + AoA fit — COMPLETE
Mapped Ghost failure patterns against Origin, Cleanerz, Root Cause, Buildhouse, Quorum, Human Gate, Repo Nanny, and existing AoA vocabulary. Identified the whole-product preservation gap.

### Pass 2 — plugin/extension engineering practice — COMPLETE
Established the **Runtime Envelope**, environment-collapse failure, cross-browser/runtime capability discipline, userscript/WebExtension distinction, lifecycle testing, permission boundaries, and installed-artifact verification.

Durable file:
- `PASS_2_PLUGIN_EXTENSION_ENGINEERING.md`

### Pass 3 — product/human factors + novice usability — COMPLETE
Established the **Novice Contract**, progressive disclosure instead of feature deletion, novice-path + expert-path paired gates, plain-language diagnostics, mobile/touch/accessibility requirements, and cognitive-load discipline.

Durable file:
- `PASS_3_HUMAN_FACTORS_NOVICE_UX.md`

### Pass 4 — verification/observability/analytics — COMPLETE
Established the **Evidence Contract**, evidence ladder E0–E5, exact artifact identity, exploratory charter, metadata-first diagnostics, privacy minimization, user-outcome/guardrail metrics, canary/rollback discipline, and formal `works` claim boundaries.

Durable file:
- `PASS_4_VERIFICATION_OBSERVABILITY_ANALYTICS.md`

### Pass 5 — synthesis + quorum design — COMPLETE
Selected **Alt-ssembly Required** as the final human-chosen name, synthesized the unique scope vs existing AoA components, defined the four contracts + Preservation Ledger, live Quorum role structure, genuine method conflicts, Human Gate conditions, Cleanerz triggers, canonical agent protocol, reusable workflow, Assembly Receipt, anti-goals, kill conditions, and exact Development A/B specifications.

Durable file:
- `PASS_5_SYNTHESIS_QUORUM_BUILD_SPEC.md`

## Naming

The final name was selected using the M-Step / Michael S. pattern: a joke on first read with a real technical operating principle underneath it.

Final display name:

# **Alt-ssembly Required**

Tagline:

**Because “the code runs” is not the same thing as “the product is built.”**

Naming exploration:
- `MSTEP_NAME_CANDIDATES.md`

## Parallel Perplexity research lane

Research prompt:
- `PERPLEXITY_RESEARCH_PROMPT.md`

This remains a parallel research dossier input. It does not override current AoA/repo evidence.

## Development phase — next

### Development A
Create the provider-agnostic AoA **agent** and reusable **workflow**:
- `agents/alt-ssembly-required.md`
- `workflows/alt-ssembly.md`
- roster/docs updates required by AoA conventions

Requirements:
- four scalable contracts;
- Preservation Ledger;
- bounded specialist routing;
- Cleanerz auto-fire;
- Quorum/Human Gate conditions;
- Assembly Receipt;
- no Ghost-specific logic;
- no duplicated implementations of existing AoA workflows.

### Development B
Adversarial review and portable installation:
- red-team against Ghost historical failures;
- run Cleanerz once on the new agent and remove redundant ceremony;
- create a portable ChatGPT/skill-surface install artifact;
- prepare a Ghost-specific activation prompt without hardcoding Ghost into the universal agent;
- update AoA documentation/roster as needed;
- prepare bounded merge-ready PR.

## Kill condition for the project

If Alt-ssembly Required becomes another giant controller that tries to perform every specialist role itself, it has repeated the Ghost mistake.

It must remain one accountable product/build operator that:
- establishes product/runtime/human/evidence truth;
- preserves accepted work;
- controls blast radius;
- routes existing AoA methods;
- and verifies evidence before claiming completion.

Research phase complete. Proceed to **Development A only**.
