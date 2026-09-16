---
id: alt-ssembly
type: workflow
purpose: Take a plugin, browser extension, userscript, adapter, integration, or small software product from current-state reconciliation through scoped build, regression protection, field proof, and a bounded assembly receipt.
steps: 8
agents_used: [alt-ssembly-required, repo-nanny, tracker, stresstest, locksmith, chisel, scout]
personas_used: [compass, friction, scaffold, mirror, burden, provenance]
confidence: EXPERIMENTAL
version: "1.0"
tags: [product, build, plugin, browser-extension, userscript, integration, preservation, novice-ux, verification, release]
compatible_with: [any-ai]
---

# Alt-ssembly Workflow

## Purpose

Use this workflow when the assignment is bigger than “change this line” but smaller than inventing a new governance framework.

It is designed for software products that have to survive contact with:

- real users;
- third-party hosts;
- browser/runtime differences;
- packaging and release artifacts;
- novice interaction;
- advanced features;
- lifecycle failures;
- and future maintenance.

The workflow is the repeatable plan. **Alt-ssembly Required** is the accountable operator.

## When to Use

Use Alt-ssembly for:

- new browser extensions, plugins, userscripts, adapters, or integrations;
- meaningful feature additions spanning multiple product layers;
- repairs where unrelated working features must be protected;
- cross-browser/mobile support;
- novice-facing products with advanced controls;
- export/data-path work where completeness/fallback truth matters;
- release work requiring installed-artifact proof;
- product rebuilds where current state, accepted intent, and historical handoffs disagree.

## When NOT to Use

Do not use the full workflow for:

- a one-line reversible fix whose blast radius and proof are obvious;
- pure research with no build decision yet;
- general repository maintenance with no product assembly task — use Repo Nanny;
- isolated debugging where the product contract is already stable — use Tracker or Root Cause;
- a design-only task — start with Origin;
- an active repair loop — run Cleanerz before resuming assembly.

For small jobs, use the **Lite Variant** at the end.

## Steps

### 1. RECONCILE

**Lead:** Alt-ssembly Required  
**May route:** Origin, Repo Nanny, Provenance

Establish what is true now.

Read current implementation/runtime/test/decision surfaces. Treat chat summaries and handoffs as locators, not automatic implementation truth.

Classify relevant surfaces:

```text
BUILT
MISSING
BROKEN
OBSOLETE
UNKNOWN
```

Resolve:

- current canonical implementation;
- accepted product/design intent;
- active branches/PRs/unfinished work when relevant;
- conflicting ownership;
- distributed artifact/version identity.

If authority is mixed, route to Origin before building.

**Done when:** current baseline, authority, and real delta are explicit.

**Stop for user input?** Only if a load-bearing authority conflict cannot be resolved from current sources.

---

### 2. PRODUCT MAP + PRESERVATION LEDGER

**Lead:** Alt-ssembly Required  
**Lenses:** Compass, Friction

Create a right-sized Product Packet:

```text
User job
Current accepted product
BUILT / BROKEN / MISSING / UNKNOWN
Must preserve
May change
Explicit KILL
Feature-layer map
Target journeys
Out of scope
```

Then derive the Preservation Ledger.

Every meaningful surface receives a change authority:

```text
preserve
repair
extend
replace — human approved
kill — human approved
observe only
```

A requested repair does not inherit authority over unrelated product layers merely because they share a source file.

**Done when:** the blast radius is explicit and every known accepted feature has a disposition.

**Stop for user input?** Yes before intentional deletion of an accepted working surface or before a material product-scope change.

---

### 3. RUNTIME + HUMAN ENVELOPE

**Lead:** Alt-ssembly Required  
**Lenses:** Scaffold, Friction

Create/refresh both:

#### Runtime Envelope

Identify:

- product class;
- execution worlds/surfaces;
- host dependencies;
- browser/version/device targets;
- permissions/grants;
- lifecycle boundaries;
- persistence ownership;
- primary and fallback paths;
- distributed artifacts;
- exact real paths that matter.

#### Novice Contract

Identify:

- primary user action;
- first success path;
- visible default controls;
- advanced/progressive-disclosure controls;
- one-line explanations;
- plain-language status and recovery;
- mobile/touch/accessibility needs;
- expert capabilities that must survive.

For consequential UX/platform choices, use Quorum to source real current practitioners and published methods. Named experts are evidence sources, not role-play personas.

**Done when:** runtime assumptions and novice/expert interaction assumptions are explicit.

**Stop for user input?** Only for consequential supported-platform, permission, or product-direction decisions.

---

### 4. EVIDENCE CONTRACT + BUILD PLAN

**Lead:** Alt-ssembly Required  
**Lenses:** Burden, Mirror  
**May route:** Build Chain, Root Cause, Scout

Define proof before implementation.

For each load-bearing claim, state:

```text
required path
exact artifact identity
required evidence class
visible acceptance outcome
negative case
rollback trigger
claim ceiling
```

Evidence classes:

```text
E0 SOURCE
E1 UNIT
E2 INTEGRATION
E3 BROWSER E2E
E4 REAL FIELD
E5 LONGITUDINAL
```

Then produce a bounded implementation packet:

```text
objective
owned files/surfaces
forbidden surfaces
expected changes
specialists needed
verification required
stop condition
rollback point
```

Use Build Chain for non-trivial code changes.

**Done when:** implementation scope and proof are both known before code changes.

**Stop for user input?** Follow Build Chain approval gates when that workflow is invoked; otherwise only for consequential decisions.

---

### 5. BUILD / ROUTE

**Lead:** Alt-ssembly Required as Single Dispatch Operator  
**Workers as needed:** Tracker, Buildhouse methods, Locksmith, Chisel, Scout, Repo Nanny

Dispatch bounded specialists. Keep file/surface ownership disjoint where possible.

Typical routes:

```text
implementation -> Build Chain / Buildhouse
unclear failure -> Tracker
multi-path causal problem -> Root Cause
security/privacy -> Locksmith
behavior-preserving restructure -> Chisel
current external platform question -> Scout
repo ecosystem/stale work -> Repo Nanny
```

Every worker returns evidence and changed-surface inventory to Alt-ssembly.

No worker silently widens scope. No recursive manager chain.

**Done when:** scoped implementation exists and the worker return packet is complete.

**Stop for user input?** If implementation requires a Product Packet authority change, new permission/data collection, or an expensive-to-reverse architecture fork.

---

### 6. INTEGRATE + REGRESSION

**Lead:** Alt-ssembly Required  
**Verifier:** Stresstest  
**May route:** Locksmith, Chisel, Cleanerz

Reconcile the implementation against the Preservation Ledger.

Required checks:

- all intended surfaces changed as planned;
- preserved surfaces still exist and work at the required evidence level;
- no unplanned permission/data expansion;
- no second architecture duplicated a canonical owner;
- generated/distributed artifacts are consistent with the reviewed source where applicable;
- novice copy remains understandable;
- advanced features remain available where required;
- adjacent-breakage check completed.

Run an independent adversarial probe appropriate to risk.

Possible probes:

```text
ambiguous/empty/malformed state
repeated action / duplicate prevention
DOM/component replacement
SPA navigation
worker/process lifecycle reset
permission denial/revocation
partial/stale remote data
multiple tabs/instances
mobile layout/touch behavior
rollback
```

If the repair begins repairing prior repairs, a working feature disappears unexpectedly, or complexity rises while clarity falls, **stop and invoke Cleanerz**.

**Done when:** integration matches authorized scope and regressions are dispositioned.

**Stop for user input?** If Cleanerz returns a consequential re-scope or Human Gate condition.

---

### 7. FIELD / CANARY

**Lead:** Alt-ssembly Required  
**Lenses:** Mirror, Burden

If the Evidence Contract requires E4/E5, exercise the exact distributed artifact on the representative real path.

Before the canary define:

```text
SUCCESS SIGNAL
GUARDRAILS
TIME WINDOW
STOP THRESHOLD
ROLLBACK METHOD
KNOWN-GOOD ARTIFACT
```

Record path-specific results only:

```text
PASS
PARTIAL
FAIL
BLOCKED
NOT TESTED
```

Do not promote one browser, host, account state, emulator, or desktop path into a universal claim.

A failed canary first triggers a decision:

```text
ROLLBACK
DIAGNOSE
CONTINUE DELIBERATELY
```

Do not reflexively stack another patch onto the candidate.

**Done when:** required field proof is obtained or the missing proof is explicitly bounded.

**Stop for user input?** Yes when the required field path depends on the owner/user's authenticated device/session or when a rollback-vs-continue decision is consequential.

---

### 8. ASSEMBLY RECEIPT

**Lead:** Alt-ssembly Required

Return a concise final receipt:

```markdown
# Alt-ssembly Required — Assembly Receipt

## Product
Requested delta:
Preserved surfaces:
Changed surfaces:
Killed surfaces: none | approved list

## Runtime
Verified paths:
Fallbacks:
Unknowns:

## Human Path
Novice path:
Expert capability preserved:
Recovery/status behavior:

## Evidence
Exact artifact:
Highest evidence level:
Field paths:
Negative/adversarial checks:
Claim ceiling:

## Safety / Privacy
Permissions:
Diagnostics/data:
Security/accessibility:

## Remaining
BLOCKED:
NOT TESTED:
Known risks:

## Disposition
SHIP | CANARY | HOLD | ROLLBACK | HUMAN GATE

## Next move
One concrete action.
```

The detailed evidence may remain in repo/project artifacts. The operator-facing receipt should stay readable.

**Done when:** the product state, proof boundary, and next move are unambiguous.

---

## Done Condition

Alt-ssembly is complete when:

1. current product truth is reconciled;
2. accepted working surfaces have explicit preservation or human-approved removal decisions;
3. runtime/platform boundaries are explicit;
4. novice and expert journeys are both dispositioned;
5. implementation stays inside authorized blast radius;
6. evidence is attached to the exact tested artifact/path;
7. required adversarial/field evidence is complete or honestly bounded;
8. rollback/recovery is known where consequential;
9. one Assembly Receipt states `SHIP | CANARY | HOLD | ROLLBACK | HUMAN GATE` without inflating confidence.

The workflow does **not** require every possible test. It requires the smallest evidence set sufficient for the actual product claim.

## Lite Variant

For a small, reversible task:

```text
1. Current state: what works / what is broken?
2. Preserve: what must not change?
3. Runtime: which exact path matters?
4. Proof: what one check proves the requested delta?
5. Change narrowly.
6. Verify requested path + one adjacent regression.
7. Receipt: what changed, what passed, what remains untested?
```

If the Lite Variant encounters a second product layer, unclear runtime difference, consequential user-impact decision, or repeated repair, expand to the full workflow.

## Cleanerz Escape Hatch

Alt-ssembly is not allowed to turn its contracts into ceremonial paperwork.

Invoke Cleanerz when:

- the contracts keep growing but the decision gets less clear;
- another patch is added without new causal evidence;
- the workflow becomes a reason not to make a reversible small change;
- multiple specialists duplicate one another;
- the same scope question is reopened repeatedly;
- feature deletion is being smuggled in under “simplification.”

Cleanerz gets one pass. Then Alt-ssembly either proceeds on the cleaned scope or halts.

## Human Gate

Use Human Gate Committee for:

- working-feature deletion;
- major permission/privacy expansion;
- core product-job changes;
- dropping supported platforms;
- architecture replacement with expensive reversal;
- weakening safety/fail-closed behavior;
- unresolved material Quorum dissent before consequential release.

Do not use committee ceremony for ordinary reversible implementation.

## Allergy

This workflow refuses two equally bad endings:

```text
“we only built the clever part”
```

and

```text
“we fixed the clever part by throwing away the rest of the product.”
```

Assembly means the whole thing still stands when you stop holding it.