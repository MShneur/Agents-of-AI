# Universal Plugin/Product Agent — Research Plan

Status: **Research 5/5 complete · Development A complete · Development B next**
Final name: **Alt-ssembly Required**
AoA id: `alt-ssembly-required`
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

For this agent, the packet expands from visual design into **product behavior authority**:
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

Cleanerz owns the replan. Alt-ssembly must not imitate Cleanerz internally.

### Root Cause
Use complete-path diagnosis, not single visible symptoms. Separate host/browser/runtime, DOM/API/data path, transport, state lifecycle, and user interaction paths until evidence proves they are equivalent.

### Buildhouse
Reuse implementation, debugging, adversarial verification, security, and safe-refactor disciplines. Alt-ssembly adds the missing product-preservation, novice-UX, browser-extension, analytics, and cross-surface integration responsibilities.

### Quorum / Human Gate
For consequential architecture, release, data-access, privacy, or irreversible UX changes, source real practitioners live at run time. Never use a frozen expert roster as authority.

## Research conclusion

Alt-ssembly Required is the accountable whole-product assembly operator.

It keeps four kinds of truth aligned:

1. **Product Packet** — what the product is and what must survive.
2. **Runtime Envelope** — where it runs and which lifecycle/platform boundaries matter.
3. **Novice Contract** — how a first-time user understands and recovers while expert capability remains available.
4. **Evidence Contract** — what exact evidence is required before completion claims are allowed.

A **Preservation Ledger** binds the requested delta to explicit product-surface authority before implementation.

## Research passes — complete

### Pass 1 — failure archaeology + AoA fit
Mapped Ghost failure patterns against Origin, Cleanerz, Root Cause, Buildhouse, Quorum, Human Gate, Repo Nanny, and existing AoA failure vocabulary.

### Pass 2 — plugin/extension engineering practice
Researched WebExtensions architecture, permissions, content-script boundaries, service-worker lifecycle, cross-browser/mobile compatibility, packaging, updates, and runtime divergence. Produced the Runtime Envelope.

### Pass 3 — product/human factors + novice usability
Researched cognitive psychology, HCI, progressive disclosure, error recovery, status communication, mobile-first interaction, and accessibility. Produced the Novice Contract and the novice-path/expert-preservation paired gate.

### Pass 4 — verification/observability/analytics
Researched exploratory testing, reliability, observability, privacy-preserving diagnostics, real-device matrices, experimentation/guardrail metrics, canaries, and rollback. Produced the Evidence Contract and Diagnostic Packet concepts.

### Pass 5 — synthesis + quorum design
Synthesized the unique Alt-ssembly scope, live Quorum roles, Human Gate conditions, Cleanerz triggers, genuine method conflicts, and the two-pass development specification. Final name selected by the human owner: **Alt-ssembly Required**.

## Development A — complete

Created:

- `agents/alt-ssembly-required.md`
- `workflows/alt-ssembly.md`
- `research/rivet-plugin-product-agent/DEVELOPMENT_A_IMPLEMENTATION.md`
- `CHANGELOG.md` entry for the new composable entries

Development A encodes:

- four scalable contracts;
- Preservation Ledger;
- Single Dispatch Operator routing;
- Cleanerz auto-fire;
- Human Gate conditions;
- live-practitioner sourcing through Quorum;
- plain-language novice requirements;
- evidence-class discipline;
- Lite Variant for small reversible changes;
- Assembly Receipt completion format.

The public/root discovery roster remains intentionally unsynchronized on this branch until Development B runs the repository's canonical roster-sync path; the development record names this openly rather than pretending publication is complete.

## Development B — next

1. Red-team Alt-ssembly against Ghost in the Loop historical failures.
2. Run Cleanerz on Alt-ssembly itself and kill duplicated/ceremonial process.
3. Create a portable ChatGPT/skill activation artifact.
4. Create a Ghost-specific invocation that uses Alt-ssembly without hardcoding Ghost behavior into the universal agent.
5. Run canonical roster/documentation synchronization and verify the resulting counts.
6. Prepare the branch for human review/merge.

## Kill condition for this project

If Alt-ssembly becomes another giant controller that tries to perform every specialist role itself, it has repeated the Ghost mistake.

Alt-ssembly must remain one accountable product/build operator that routes existing AoA methods, preserves accepted work, and verifies evidence before claiming completion.