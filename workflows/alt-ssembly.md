---
id: alt-ssembly
type: workflow
purpose: Take a plugin, browser extension, userscript, adapter, integration, or small software product from current-state reconciliation and opportunity discovery through scoped build, preservation checks, field proof, and a bounded assembly receipt.
steps: 7
agents_used: [alt-ssembly-required, repo-nanny, tracker, stresstest, locksmith, chisel, scout]
personas_used: [compass, friction, scaffold, mirror, burden, provenance]
confidence: EXPERIMENTAL
version: "1.1"
tags: [product, build, plugin, browser-extension, userscript, integration, preservation, novice-ux, verification, release, discovery]
compatible_with: [any-ai]
---

# Alt-ssembly Workflow

## Purpose

Use this workflow for software products that must become one coherent thing across code, UX, runtime, adapters, settings, export/data, diagnostics, packaging, compatibility, and release evidence.

The workflow is the repeatable plan. **Alt-ssembly Required** is the accountable operator.

## When to Use

Use it for:

- new plugins, browser extensions, userscripts, adapters, or integrations;
- meaningful feature additions spanning product layers;
- repairs where unrelated working features must survive;
- cross-browser/mobile support;
- novice-facing products with advanced controls;
- export/data work where completeness and fallback truth matter;
- release work requiring installed-artifact proof;
- rebuilds where current state, intended product, and handoffs disagree;
- requests to discover “what else should we introduce?” before building.

## When NOT to Use

Do not use the full workflow for a one-line reversible fix, pure research with no build decision, general repo maintenance, isolated debugging with a stable product contract, or an active repair loop. Use the Lite Variant, Repo Nanny, Tracker/Root Cause, or Cleanerz as appropriate.

## Default Compression Rule

Start with one **Assembly Card**, not four long documents:

```text
USER JOB:
CURRENT TRUTH:
DELTA:
PRESERVE:
RUNTIME PATH:
NOVICE PATH:
PROOF REQUIRED:
KILL: none unless human-approved
NEXT ACTION:
```

Expand Product Packet, Runtime Envelope, Novice Contract, or Evidence Contract only when the task needs the detail.

## Steps

### 1. RECONCILE + CORRECTION GATE

**Lead:** Alt-ssembly Required  
**May route:** Origin, Repo Nanny, Provenance

Read current implementation/runtime/test/decision sources. Treat summaries and handoffs as locators, not automatic implementation truth.

Classify relevant surfaces:

```text
BUILT | MISSING | BROKEN | OBSOLETE | UNKNOWN
```

Resolve current canonical implementation, accepted product/design intent, active branches/PRs, ownership, and distributed artifact/version identity.

If multiple branches/agents/chats overlap, converge them into one canonical candidate before release.

If the operator corrects scope, says “that is not what I meant,” narrows a repair, or names a feature that must survive, stop implementation and update the product contract first.

**Done when:** current baseline, authority, operator intent, and real delta are explicit.

**Stop for user input?** Only for a load-bearing authority conflict that current sources cannot resolve.

---

### 2. OPPORTUNITY SWEEP + PRODUCT MAP

**Lead:** Alt-ssembly Required  
**Lenses:** Compass, Friction  
**May route:** Scout, Wheel Check

For greenfield, broad rebuilds, or explicit “what else?” requests, inspect analogous products, open-source projects, current platform capabilities, relevant AoA methods, and common missing surfaces:

```text
onboarding
settings / preferences
personalization
export / data portability
diagnostics / supportability
mobile / accessibility
recovery / rollback
packaging / update
security / privacy
advanced workflows / power-user controls
```

Return candidate capabilities as:

```text
NOW | NEXT | LATER | REJECT
```

Do not silently add them to scope.

Create/refresh Product Packet and Preservation Ledger. Give every meaningful surface one authority:

```text
preserve
repair
extend
replace-human-approved
kill-human-approved
observe-only
```

A repair does not inherit authority over unrelated layers merely because they share a source file.

**Done when:** full known product surface, candidate opportunities, blast radius, and preservation decisions are explicit.

**Stop for user input?** Yes before intentional deletion of an accepted working surface or material product-scope change.

---

### 3. RUNTIME + HUMAN + EVIDENCE CONTRACT

**Lead:** Alt-ssembly Required  
**Lenses:** Scaffold, Friction, Burden, Mirror

Map only what is load-bearing.

#### Runtime

Identify product class, execution worlds, host dependencies, browser/version/device targets, permissions, lifecycle boundaries, persistence ownership, primary/fallback paths, distributed artifacts, and exact real paths that matter.

Do not infer runtime equivalence from shared JavaScript.

#### Human

Identify primary action, first-success path, visible defaults, progressive disclosure, plain-language status/recovery, mobile/touch/accessibility needs, and advanced capabilities that must survive.

Reduce cognitive load before reducing capability.

#### Evidence

For each load-bearing claim state:

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

**Stale-Test Gate:** if a failing test encodes obsolete behavior, establish the accepted behavior first and then update the test. Do not resurrect obsolete architecture just to make CI green.

**Proof Invalidation Gate:** if the candidate changes after evidence is collected, mark affected proof stale and rerun only what the change can invalidate.

**Done when:** “where must it work, for whom, and what proves it?” has a specific answer.

---

### 4. BUILD / ROUTE

**Lead:** Alt-ssembly Required as Single Dispatch Operator  
**Workers as needed:** Build Chain/Buildhouse, Tracker, Root Cause, Locksmith, Chisel, Scout, Repo Nanny

Issue bounded worker packets:

```text
objective
baseline
owned files/surfaces
forbidden surfaces
required evidence
stop condition
return format
```

No recursive manager chains. No worker silently widens product scope.

Use existing AoA owners rather than reimplementing them:

```text
implementation -> Build Chain / Buildhouse
unclear failure -> Tracker
multi-path cause -> Root Cause
security/privacy -> Locksmith
safe restructure -> Chisel
external/platform research -> Scout
repo ecosystem -> Repo Nanny
```

**Done when:** scoped implementation exists and worker returns are evidence-backed.

**Stop for user input?** If implementation requires new Product Packet authority, permission/data expansion, or an expensive-to-reverse architecture fork.

---

### 5. INTEGRATE + BREAK IT

**Lead:** Alt-ssembly Required  
**Verifier:** Stresstest  
**May route:** Locksmith, Chisel, Cleanerz

Reconcile implementation against the Preservation Ledger.

Check:

- intended surfaces changed as planned;
- preserved features still exist;
- no unplanned permission/data expansion;
- no second architecture duplicated a canonical owner;
- package/generated artifacts match reviewed source where applicable;
- novice copy remains understandable;
- advanced features remain available where required;
- operator corrections are reflected in the result;
- adjacent breakage has been checked.

Run the smallest adversarial set appropriate to risk: ambiguous state, duplicate prevention, DOM/component replacement, SPA navigation, lifecycle reset, permission denial, stale/partial remote data, multiple tabs, mobile layout/touch behavior, rollback.

If the repair begins repairing prior repairs, a working feature disappears unexpectedly, or process volume rises while clarity falls, stop and invoke Cleanerz once.

**Done when:** integration matches authorized scope and regressions are dispositioned.

---

### 6. FIELD / CANARY

**Lead:** Alt-ssembly Required  
**Lenses:** Mirror, Burden

If E4/E5 is required, exercise the exact distributed artifact on the representative real path.

Define before the canary:

```text
SUCCESS SIGNAL
GUARDRAILS
TIME WINDOW
STOP THRESHOLD
ROLLBACK METHOD
KNOWN-GOOD ARTIFACT
EXACT TESTED ARTIFACT
```

Record path-specific results only:

```text
PASS | PARTIAL | FAIL | BLOCKED | NOT TESTED
```

Do not promote one browser, host, account state, emulator, or desktop path into a universal claim.

A failed canary first triggers:

```text
ROLLBACK | DIAGNOSE | CONTINUE DELIBERATELY
```

Do not reflexively stack another patch onto the candidate.

**Done when:** required field proof is obtained or missing proof is explicitly bounded.

**Stop for user input?** Yes when the required field path depends on the owner’s authenticated device/session or a consequential rollback decision.

---

### 7. ASSEMBLY RECEIPT

**Lead:** Alt-ssembly Required

Keep detailed evidence in durable artifacts. Default operator-facing status to:

1. **Ready / Not ready / Blocked**
2. one load-bearing reason;
3. one next action.

Then, if useful, include:

```markdown
Status: SHIP | CANARY | HOLD | ROLLBACK | HUMAN GATE
Product: delta / preserved / changed / killed
Runtime: verified paths / fallbacks / unknowns
Human path: novice / expert / recovery
Evidence: exact artifact / level / field & adversarial checks / claim ceiling
Safety/privacy: permissions / diagnostics-data / security-accessibility
Remaining: BLOCKED / NOT TESTED / known risks
Next move: one concrete action
```

Never say only “it works.” State the verified scope.

**Done when:** product state, proof boundary, and next move are unambiguous.

## Cleanerz Escape Hatch

Invoke Cleanerz when:

- contracts keep growing while the decision gets less clear;
- another patch appears without new causal evidence;
- the workflow delays a reversible small change;
- multiple specialists duplicate one another;
- the same scope question reopens repeatedly;
- feature deletion is smuggled in under “simplification.”

Cleanerz gets one pass. Then proceed on the cleaned scope or halt.

## Human Gate

Use Human Gate Committee for working-feature deletion, major permission/privacy expansion, core product-job changes, supported-platform removal, expensive architecture replacement, weakening safety/fail-closed behavior, or unresolved material Quorum dissent before consequential release.

Do not use committee ceremony for ordinary reversible implementation.

## Lite Variant

For a small reversible task:

```text
1. Current truth + operator intent
2. Preserve what must not change
3. Name the exact runtime path
4. Define one proof
5. Change narrowly
6. Verify requested path + one adjacent regression
7. Report status + next move
```

Expand to the full workflow only if a second product layer, unclear runtime difference, consequential decision, or repeated repair appears.

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
