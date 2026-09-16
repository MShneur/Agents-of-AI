# Universal Plugin/Product Agent — Research Plan

Status: Research pass 1 of 5
Working name: **Rivet** (provisional until pass 5)
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

For this agent, the packet must expand from visual design into **product behavior authority**:
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

### Buildhouse
Reuse implementation, debugging, adversarial verification, security, and safe-refactor disciplines. The new agent adds the missing product-preservation, novice-UX, browser-extension, analytics, and cross-surface integration responsibilities.

### Quorum / Human Gate
For consequential architecture, release, data-access, privacy, or irreversible UX changes, source real practitioners live at run time. Never use a frozen expert roster as authority.

## Research question

What operating protocol would have allowed one agent to take the original Ghost idea and reliably produce the rich product that evolved later — Play, flows, personas, workflows, settings, skins, notifications, export, diagnostics, mobile behavior, cross-platform adapters — without either underbuilding the product or overengineering the controller?

## Required professional-method seats

The eventual agent should source named practitioners live for these method families:

1. **Product / human-centered systems** — solve the real user problem, preserve conceptual model, prevent feature confusion.
2. **Novice usability / cognitive load** — labels, discoverability, status, recovery, explanations, progressive disclosure.
3. **Software architecture / simplicity** — isolate complexity, deep interfaces, prevent change amplification and over-specialization.
4. **Browser extension / platform engineering** — WebExtensions, host differences, permissions, lifecycle, content-script boundaries, mobile/browser compatibility.
5. **Testing / exploratory QA** — real-device behavior, unscripted failure discovery, boundary cases, regressions.
6. **Observability / diagnostics** — enough structured context to diagnose unknown failures without exposing conversation content unnecessarily.
7. **Product analytics / experimentation** — define success metrics and detect unintended consequences before declaring a redesign better.
8. **Accessibility / responsive interaction** — keyboard/touch/assistive tech/mobile constraints and semantic state.
9. **Security / privacy** — least privilege, host permissions, content-script trust boundaries, data minimization.
10. **Maintenance / rollback operator** — upgrade path, compatibility, reversible changes, support burden.

A psychiatrist is not the default fit for the human-behavior seat. The more directly relevant disciplines are cognitive psychology, human factors, HCI, behavioral design, and usability research. A clinical specialist is added only when the product domain actually requires clinical expertise.

## First live practitioner-method findings

These are method candidates, not permanent seats and not endorsements.

- **Don Norman** — human-centered design: solve root issues, focus on people, take a systems view, continually test/refine. Especially relevant to the Ghost pattern of treating a symptom as the whole product problem.
- **Jakob Nielsen / NN/g** — visibility of system status, user control/freedom, consistency, match to real-world language. Directly applicable to novice labels such as replacing `DOM partial` with plain-language backup status.
- **John Ousterhout** — manage complexity through deep/general-purpose modules, minimize dependencies, reduce cognitive load/change amplification, make common behavior obvious. Strong lens against over-specialized controller branches.
- **Martin Fowler / Kent Beck tradition** — behavior-preserving small changes and tests as the safety net. Strong lens against deleting unrelated working behavior during a transport repair.
- **Luke Wroblewski** — mobile-first constraints force prioritization; test on real devices, not just desktop/simulators. Directly applicable to Firefox Android and compact Ghost UI.
- **Adrian Roselli** — cross-browser/accessibility reality and assistive-tech/browser combinations. Useful for semantic controls and interaction states, not screenshot-only acceptance.
- **Charity Majors** — observability for unknown-unknowns using rich structured context rather than shallow green dashboards. Strong fit for Ghost's historical “script says ready but field user says broken” problem.
- **Cindy Sridharan** — code and test for observability/failure, including operational semantics and dependency behavior.
- **Ronny Kohavi / Microsoft Experimentation** — trustworthy experimentation, checklists, guardrail metrics, and unintended-consequence detection before product decisions are accepted.
- **James Bach / exploratory testing tradition** — scripted checks do not replace skilled exploration; useful for browser/site variation, lifecycle transitions, and interaction failure discovery.

## Agent behavior hypotheses to test in passes 2–5

- The agent needs an **Origin-style Product Packet** before implementation, not merely a coding plan.
- Every requested fix needs a **preservation ledger**: what must not change, what may change, and what is explicitly being killed.
- Each feature should be classified as one of: `CORE TRANSPORT | PROMPT/PROTOCOL | UI/PREFERENCE | DATA/EXPORT | PLATFORM ADAPTER | DIAGNOSTIC | OPTIONAL INTEGRATION` so a transport repair cannot accidentally delete unrelated layers.
- A release gate should verify the **full novice journey**, not only unit tests or source inspection.
- “Works” requires at least one representative real path per supported class plus explicit `NOT TESTED` labels elsewhere.
- Product language should pass a **novice translation gate**: no internal implementation term is user-facing unless necessary.
- The agent should use Quorum for consequential forks but should not become a permanent committee. One chief operator remains accountable.
- Cleanerz should auto-fire on overcorrection and repair loops, then retire after one pass.

## Five research passes

### Pass 1 — failure archaeology + AoA fit
Map Ghost failure patterns against Origin, Cleanerz, Root Cause, Buildhouse, Quorum, Human Gate, Repo Nanny, and existing AoA failure vocabulary. Identify what is missing. **Current pass.**

### Pass 2 — plugin/extension engineering practice
Research Chrome/Firefox/WebExtensions architecture, permissions, content-script boundaries, service-worker lifecycle, cross-browser/mobile compatibility, packaging, updates, and extension review constraints. Identify practitioners and official platform guidance.

### Pass 3 — product/human factors + novice usability
Research cognitive psychology, HCI, progressive disclosure, error recovery, status communication, mobile-first interaction, accessibility, and how novice products expose advanced power without overwhelming users.

### Pass 4 — verification/observability/analytics
Research exploratory testing, reliability, observability, support diagnostics, privacy-preserving telemetry, real-device matrices, experimentation/guardrail metrics, and rollback evidence.

### Pass 5 — synthesis + quorum design
Compare competing schools, source live named practitioners for each critical seat, run dissent, define the agent's scope/anti-goals/kill conditions, choose final name, and produce the build specification for two development passes.

## Two development passes after research

### Development A
Create the provider-agnostic AoA **agent** and its reusable **workflow**, with metadata, triggers, scope, Product Packet, preservation ledger, routing rules, Cleanerz auto-fire, Quorum/Human Gate gates, and completion receipt.

### Development B
Adversarial review against Ghost's historical failures, simplify, add a portable install/activation artifact for ChatGPT/other hosts, update AoA roster/docs, and prepare the Ghost-specific invocation that will repair Ghost without hardcoding Ghost logic into the universal agent.

## Kill condition for this project

If the new agent becomes another giant controller that tries to perform every specialist role itself, it has repeated the Ghost mistake. The agent must remain one accountable product/build operator that routes existing AoA methods and live practitioner lenses, preserves accepted work, and verifies evidence before claiming completion.
