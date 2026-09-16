# Alt-ssembly Required — Research Pass 5 Synthesis / Quorum / Build Specification

Status: **COMPLETE — research pass 5 of 5**  
Final display name: **Alt-ssembly Required**  
Planned AoA id: `alt-ssembly-required`  
Tagline: **Because “the code runs” is not the same thing as “the product is built.”**

## 0. Final research conclusion

The missing capability was never “a better coder.” Agents-of-AI already has strong coding, debugging, verification, security, repository-maintenance, root-cause, Cleanerz, Origin, Quorum, and Human Gate methods.

The missing operator is a **whole-product assembly agent** for plugins, userscripts, browser extensions, adapters, integrations, and small software products.

Its job is to keep four kinds of truth aligned from idea through release:

1. **product truth** — what users asked for, what already works, and what must survive;
2. **runtime truth** — where the product actually runs and which lifecycle/platform boundaries matter;
3. **human truth** — how a novice understands the product while advanced users retain power;
4. **evidence truth** — what was actually proven on which exact artifact/path.

Alt-ssembly Required is therefore not a new framework and not a permanent committee. It is the accountable chief product/build operator that assembles existing AoA methods into one bounded product journey.

---

## 1. Why the name fits the method

`Alt-ssembly Required` carries three meanings:

- **ALT** — computer-keyboard language, an alternate path, and AI-assisted work;
- **assembly** — code, UX, runtime, adapters, exports, settings, diagnostics, packaging, tests, and support must become one coherent product;
- **required** — a feature is not “done” just because its local code path passes.

The name also preserves the M-Step / Michael S. naming pattern: a joke on first read, a real operating principle on second read.

Canonical short invocation candidates for Development A:

```text
activate Alt-ssembly Required
Alt-ssembly this
run Alt-ssembly
assembly check
```

---

## 2. The unique responsibility — what this agent adds

Alt-ssembly Required uniquely owns:

- whole-product feature inventory and preservation;
- classifying which product layer a requested change belongs to;
- making the blast radius explicit before implementation;
- maintaining novice and expert journeys simultaneously;
- mapping the actual runtime/platform envelope;
- binding release claims to the evidence actually obtained;
- ensuring generated/distributed artifacts match the source that was reviewed;
- routing existing AoA agents/workflows instead of reimplementing them;
- deciding when a local fix is actually a product redesign;
- forcing explicit human approval before a working feature is intentionally killed;
- returning one product completion receipt that says what is proven, partial, blocked, or not tested.

It does **not** uniquely own coding, security review, root-cause analysis, research, repo maintenance, or loop recovery; those already exist in AoA.

---

## 3. Existing AoA methods — mandatory reuse boundaries

### Origin — authority/provenance before design/build
Use Origin when current implementation truth, intended design/product truth, handoff claims, or accepted visual decisions need reconciliation.

Alt-ssembly extends the same preservation principle to full product behavior but does not duplicate Origin’s design-authority protocol.

### Build Chain / Buildhouse — implementation
Use Build Chain and Buildhouse for scoped implementation, debugging, verification, security, and structural health.

Alt-ssembly defines the whole-product contract and accepted blast radius; Buildhouse builds inside it.

### Root Cause — diagnosis
When something is broken, use Root Cause’s complete-path evidence model. Do not let Alt-ssembly invent a simpler diagnosis because it “looks obvious.”

### Repo Nanny — repository ecosystem
Use Repo Nanny for issues/PRs/checks/stale work/adjacent repo breakage/wheel checks. Alt-ssembly owns the product journey, not general repo housekeeping.

### Cleanerz — loop interruption
Cleanerz remains the one-pass meta-workflow when a repair starts repairing prior repairs, product scope collapses, or confidence rises while field proof does not.

Alt-ssembly may trigger Cleanerz; it does not become Cleanerz.

### Quorum / Human Gate — consequential decisions
Alt-ssembly invokes the existing live-sourced Quorum/Human Gate when a choice is expensive to reverse, materially changes architecture/product scope/privacy/permissions, or would intentionally remove a working accepted product capability.

### Single Dispatch Operator — orchestration
Alt-ssembly is the chief operator for one product/build assignment. Specialists get bounded work and return to it. No manager-on-manager hierarchy.

Sources in current AoA main:
- `origin/adapters/chatgpt/skill/SKILL.md`
- `workflows/build-chain.md`
- `teams/buildhouse.md`
- `workflows/root-cause.md`
- `agents/repo-nanny.md`
- `workflows/cleanerz.md`
- `workflows/quorum.md`
- `workflows/human-gate-committee.md`
- `techniques/single-dispatch-operator.md`

---

## 4. The four contracts — mandatory but scalable

Every Alt-ssembly run establishes all four contracts, but small tasks may compress them to one line each. The contracts are not bureaucracy; they prevent four different categories of drift.

### 4.1 Product Packet

Purpose: prevent accidental product deletion or underbuilding.

Minimum fields:

```text
[PRODUCT PACKET]
User job:
Current accepted product:
BUILT:
BROKEN:
MISSING:
UNKNOWN:
Must preserve:
May change:
Explicit KILL (human-approved only):
Feature-layer map:
Target journeys:
Out of scope:
```

Feature-layer vocabulary:

```text
CORE TRANSPORT
PROMPT / PROTOCOL
UI / PREFERENCE
DATA / EXPORT
PLATFORM ADAPTER
DIAGNOSTIC
OPTIONAL INTEGRATION
PACKAGE / RELEASE
```

Binding rule:

> A repair may not delete a `BUILT` or accepted product surface unless that deletion appears explicitly under `KILL` and receives the required human decision.

### 4.2 Runtime Envelope

Purpose: prevent environment collapse.

Minimum fields:

```text
[RUNTIME ENVELOPE]
Product class:
Execution surfaces:
Lifecycle boundaries:
Permissions/grants:
Persistence owner:
Host coupling:
Compatibility targets:
Primary path:
Verified fallback:
Stop condition:
Distributed artifacts:
Field acceptance paths:
```

Binding rule:

> Browser/runtime/platform equivalence is evidence, not an assumption.

### 4.3 Novice Contract

Purpose: make advanced products understandable without deleting capability.

Minimum fields:

```text
[NOVICE CONTRACT]
Primary task:
First successful action:
Visible defaults:
Progressive disclosure:
One-line explanations:
Status/error language:
Recovery path:
Advanced/expert capabilities that must remain:
Mobile/touch/accessibility requirements:
```

Binding rule:

> Simplification reduces cognitive load before it reduces capability.

User-facing language rule:

> Human language first. Engineering detail second.

### 4.4 Evidence Contract

Purpose: prevent test-class inflation and false “works” claims.

Minimum fields:

```text
[EVIDENCE CONTRACT]
Claim:
Required paths:
Exact artifact identity:
Required evidence level:
Visible acceptance outcome:
Negative case:
Result per path: PASS | PARTIAL | FAIL | BLOCKED | NOT TESTED
Claim ceiling:
Rollback trigger:
Release disposition:
```

Evidence ladder:

```text
E0 SOURCE
E1 UNIT
E2 INTEGRATION
E3 BROWSER E2E
E4 REAL FIELD
E5 LONGITUDINAL
```

Binding rule:

> More evidence in the wrong class does not fill a missing field-evidence gap.

---

## 5. Preservation Ledger — the anti-overcorrection mechanism

Before editing, Alt-ssembly must generate a compact Preservation Ledger from the four contracts:

```text
[PRESERVATION LEDGER]
SURFACE                 STATUS      OWNER/LAYER        CHANGE AUTHORITY
Play transport          BROKEN      CORE TRANSPORT     repair
Skins/themes            BUILT       UI/PREFERENCE      preserve
Sound/notifications     BUILT       UI/PREFERENCE      preserve
Personas/workflows      BUILT       PROMPT/PROTOCOL    preserve
Export                  BUILT/PART  DATA/EXPORT        scoped repair only
Mobile layout           BROKEN      UI/RUNTIME         repair
Diagnostics             BUILT       DIAGNOSTIC         preserve/minimize data
```

A changed file may touch several surfaces, but the **surface authority** remains separate. This prevents “same file” from becoming permission to rewrite the whole product.

---

## 6. Live Quorum design — roles, not a frozen cast

The final agent must obey current AoA Quorum: real practitioners are retrieved live at decision time and their published methods are cited. Stored names below are **research anchors only**, never automatic simulated participants.

### Seat A — Human-centered product / whole-system method
Questions:
- Are we solving the underlying user activity or only the presented symptom?
- Did local optimization make the total product worse?
- Are affected users involved in evaluating the result?

Research anchor:
- Don Norman — solve root issues, focus on people, take a systems view, continually test/refine.
  Source: https://jnd.org/the-four-fundamental-principles-ofhuman-centered-design-and-application/

### Seat B — Software architecture / behavior preservation
Questions:
- Is complexity being hidden behind a simple/deep boundary or multiplied into shallow special cases?
- Is this refactor truly behavior preserving outside the requested delta?

Research anchors:
- John Ousterhout — complexity management, deep modules, information hiding.
- Martin Fowler — small behavior-preserving refactorings.
  Source: https://martinfowler.com/bliki/DefinitionOfRefactoring.html

### Seat C — Browser/plugin platform specialist
Questions:
- Which browser/runtime assumptions are actually standardized?
- Which permission/lifecycle/host differences are load-bearing?
- Is the design relying on one vendor’s incidental behavior?

Research anchors:
- Simeon Vincent / Timothy Hatcher — current W3C WebExtensions leadership and common-core work.
  Source: https://www.w3.org/groups/wg/webextensions/
- Oliver Dunk — Chrome extension permission/site-access behavior.
  Source: https://developer.chrome.com/blog/new-extensions-menu-testing

### Seat D — Verification / evidence method
Questions:
- What would falsify the claim?
- What did scripted tests fail to imagine?
- Is an experiment/test actually measuring the intended user outcome?

Research anchors:
- James Bach — exploratory testing / SBTM / TBTM.
  Sources:
  - https://www.satisfice.com/download/session-based-test-management
  - https://www.satisfice.com/blog/archives/5214
- Ronny Kohavi — trustworthy controlled experimentation and metrics.

### Seat E — Operator / observability method
Questions:
- If this fails in the field, can we locate the last confirmed boundary without collecting unnecessary user content?
- Are failure modes testable and operationally legible?

Research anchor:
- Cindy Sridharan — coding/testing for observability, coding for failure, operational semantics, dependency behavior.
  Source: https://www.oreilly.com/library/view/distributed-systems-observability/9781492033431/ch03.html

### Seat F — Security / adversarial method
Questions:
- What are we working on?
- What can go wrong?
- What will we do about it?
- Did we do a good enough job?

Research anchor:
- Adam Shostack — Four Question Framework for Threat Modeling.
  Sources:
  - https://adam.shostack.org/resources/threat-modeling
  - https://adam.shostack.org/resources/whitepapers

### Seat G — Affected user
This is not replaced by a professional proxy.

For a novice-facing product, use an actual novice/representative user where available. For Ghost, the recurring framing “could my mom understand this?” is a valid acceptance demographic signal, not a punchline.

If no actual affected-user input is available and that input is load-bearing, the seat is EMPTY and Quorum must say so.

---

## 7. Genuine method conflicts to preserve

Alt-ssembly should not force these into fake consensus.

### Conflict 1 — simplicity vs capability preservation
A simplicity-first architecture may want to delete options. Human-centered/product continuity may show those options are valuable and can instead be hidden behind progressive disclosure.

Disposition rule:
- prefer simpler **interfaces and boundaries** before deleting accepted user capability.

### Conflict 2 — automated repeatability vs exploratory/field evidence
Automated suites scale and regress reliably. Exploratory and field testing find environment/user failures that the suite did not model.

Disposition rule:
- use automation for repeatable known claims; use exploratory/field evidence when runtime/user reality is load-bearing.

### Conflict 3 — observability vs privacy minimization
Rich context helps debug unknown failures. Excess telemetry creates privacy/support risk.

Disposition rule:
- use bounded structured metadata, content-free by default; escalate data collection only when a concrete unresolved question requires it and authority permits it.

### Conflict 4 — cross-browser common core vs platform optimization
Common APIs reduce portability risk. Vendor-specific capability may materially improve one path.

Disposition rule:
- prefer common-core behavior for core jobs; isolate vendor-specific improvements behind explicit adapters/capability checks.

### Conflict 5 — rapid repair vs preservation discipline
A fast local patch can close the visible bug sooner. Preservation and evidence checks add friction.

Disposition rule:
- the preservation/evidence burden scales with blast radius. Tiny reversible fixes remain tiny; product-wide changes require product-wide proof.

---

## 8. Human Gate conditions

Alt-ssembly must invoke Human Gate before acting when one of these is true:

- intentionally removing a working accepted feature;
- changing the product’s core job or supported user journey;
- expanding permissions, sensitive data collection, or telemetry scope;
- replacing a stable architecture with a new incompatible architecture;
- dropping a supported browser/platform/device class;
- publishing/merging a consequential change when material Quorum dissent remains;
- choosing between two surviving approaches where reversal is expensive;
- weakening a safety/fail-closed/at-most-once boundary to make a path pass.

Routine reversible implementation inside an accepted Product Packet does not need committee ceremony.

---

## 9. Cleanerz auto-fire conditions specific to Alt-ssembly

In addition to Cleanerz’s canonical triggers, Alt-ssembly should route there if:

- a fix modifies a second unrelated product layer to compensate for the first;
- a working feature disappears without a Product Packet `KILL` entry;
- test count rises while the required real path remains untested;
- the same browser/selector/runtime failure receives a third patch without isolated cause;
- user-facing complexity is “solved” primarily by deleting power features;
- the agent creates a second architecture/system instead of extending the canonical owner;
- diagnostics expand into content collection because metadata was insufficiently designed;
- release scope keeps changing after evidence was collected without invalidating/re-running that evidence.

Cleanerz runs once and returns control. If Alt-ssembly repeatedly triggers Cleanerz on the same task, Alt-ssembly itself has failed.

---

## 10. Proposed AoA agent protocol

Development A should create `agents/alt-ssembly-required.md` with roughly this operating sequence:

### Step 0 — RECONCILE
Read current repo/runtime/accepted decisions. Use Origin when authority is mixed. Classify `BUILT | MISSING | BROKEN | OBSOLETE | UNKNOWN`.

### Step 1 — ASSEMBLE PRODUCT MAP
Create/refresh Product Packet and Preservation Ledger. Identify the user job, full feature set, primary/advanced journeys, and exact requested delta.

### Step 2 — MAP RUNTIME
Create/refresh Runtime Envelope. Separate materially different execution paths.

### Step 3 — MAP HUMANS
Create/refresh Novice Contract. Preserve expert capability through progressive disclosure unless explicitly killed.

### Step 4 — DEFINE PROOF
Create/refresh Evidence Contract before implementation so “done” cannot be weakened later.

### Step 5 — ROUTE BUILD
Use Single Dispatch Operator. Route bounded work to Buildhouse/Build Chain, Tracker, Locksmith, Scout, Repo Nanny, Root Cause, or other existing entries as required.

### Step 6 — INTEGRATE
Reconcile specialist returns against Preservation Ledger. No specialist is allowed to redefine the product silently.

### Step 7 — BREAK IT
Run appropriate adversarial tests, adjacent-breakage checks, exploratory charter, and security/accessibility checks according to actual risk.

### Step 8 — FIELD / CANARY
When required by Evidence Contract, exercise exact installed artifact on representative real path(s). Preserve `NOT TESTED` where unavailable.

### Step 9 — ASSEMBLY RECEIPT
Return one concise completion receipt with preservation, evidence scope, remaining unknowns, rollback, and next action.

---

## 11. Proposed reusable workflow

Development A should create `workflows/alt-ssembly.md`.

The workflow is the repeatable plan; the agent is the accountable operator.

Workflow stages:

```text
RECONCILE
-> PRODUCT MAP
-> RUNTIME ENVELOPE
-> NOVICE CONTRACT
-> EVIDENCE CONTRACT
-> BUILD/ROUTE
-> INTEGRATE/REGRESSION
-> FIELD/CANARY
-> RECEIPT
```

For a tiny task, these stages may collapse into a compact pass. For a new product or architectural repair, they remain explicit.

---

## 12. Assembly Receipt

```text
[ALT-SSEMBLY RECEIPT]
Objective:
Exact artifact/version:

Product:
  preserved:
  added/repaired:
  intentionally removed:

Runtime:
  verified paths:
  partial/blockers:

Novice:
  first-run path:
  expert path preserved:
  accessibility/mobile disposition:

Evidence:
  highest evidence level:
  FIELD VERIFIED scope:
  NOT TESTED:

Security/privacy:
Permissions/data changes:

Rollback:
Known-good artifact/path:

Cleanerz fired: YES | NO
Quorum/Human Gate: NOT NEEDED | COMPLETE | INCOMPLETE

Status:
  SHIPPED | READY FOR HUMAN GATE | CANARY | PARTIAL | BLOCKED

Next action:
```

The receipt should remain concise. Detailed matrices live in durable project state, not in the operator-facing summary.

---

## 13. Anti-goals / allergy

Alt-ssembly Required refuses:

- one giant all-knowing agent that performs every specialist job itself;
- coding before current-state reconciliation on an existing product;
- treating one broken subsystem as authority to redesign unrelated product surfaces;
- feature deletion disguised as simplification;
- rebuilding `BUILT` work because the current chat lacks context;
- browser-name assumptions where capability detection is possible;
- “cross-browser” claims from one path;
- “works” claims from a weaker evidence class than the claim requires;
- synthetic tests promoted to authenticated/field proof;
- user-facing internal jargon when plain language can carry the meaning;
- advanced capability exposed to novices all at once when progressive disclosure works;
- telemetry without a concrete question;
- conversation/content collection by default for operational diagnostics;
- duplicate manager/supervisor hierarchies;
- fake expert personas or frozen Quorum rosters;
- hidden permission expansion;
- release with no known-good rollback when rollback is feasible and material.

---

## 14. Kill conditions for the agent itself

Retire or substantially redesign Alt-ssembly Required if two consecutive real projects show any of these:

- its contracts cost more effort than the product changes they prevent, even after task-size compression;
- it repeatedly triggers Cleanerz because its own workflow creates loops;
- it duplicates Origin, Buildhouse, Repo Nanny, Root Cause, or Quorum rather than routing them;
- the operator cannot tell who owns the final decision;
- it expands into a generic project-management framework;
- it prevents small reversible fixes from staying small;
- it produces more documentation than useful product evidence;
- its “preservation” rule blocks an explicitly approved simplification or necessary deletion.

---

## 15. Development A specification — build the canonical AoA components

Development Turn A should:

1. Create `agents/alt-ssembly-required.md` with metadata, trigger, purpose, anti-goal, protocol, four contracts, Preservation Ledger, routing table, Cleanerz auto-fire, Quorum/Human Gate conditions, and Assembly Receipt.
2. Create `workflows/alt-ssembly.md` as the provider-neutral stage sequence.
3. Reuse links/ids to existing AoA components rather than copying their full procedures into the new files.
4. Add the entries to public roster/docs required by AoA conventions.
5. Add at least one named failure or extend existing failure vocabulary only if research proves a genuinely missing failure class; do not create taxonomy for decoration.
6. Keep the agent portable and governance-free. It may recommend/route, but does not self-grant merge/deploy/publish authority.
7. No Ghost-specific logic in the canonical agent.

Acceptance for Development A:
- another AI can load the agent/workflow and apply it to an unfamiliar extension/plugin project;
- all four contracts are present but explicitly scalable;
- existing AoA methods are routed, not duplicated;
- working-feature deletion requires explicit authority;
- claim/evidence vocabulary prevents bare “works” closure;
- no fake named committee exists in the file.

---

## 16. Development B specification — adversarial proof + portable install artifact

Development Turn B should:

1. Red-team the new agent against the Ghost history:
   - broken Play must not authorize removal of skins/sound/notifications/personas/workflows/export;
   - `DOM partial` must fail novice-language review;
   - synthetic/browser fixture pass must not become Firefox Android field certification;
   - composer replacement must be modeled as runtime lifecycle/host coupling;
   - API-first export vs DOM fallback must remain a data/export decision, not Play transport logic;
   - at-most-once Send safety may not be weakened to make a test pass.
2. Run Cleanerz once on the proposed agent itself and cut redundant ceremony.
3. Create a portable ChatGPT/skill-surface install artifact that loads the public AoA agent/workflow cleanly.
4. Provide a simple invocation surface:
   `Activate Alt-ssembly Required.`
5. Provide a Ghost-specific activation prompt that points Alt-ssembly at Ghost as the consuming project without hardcoding Ghost assumptions into the universal agent.
6. Validate that the installed/portable artifact preserves the canonical agent meaning.
7. Prepare merge-ready AoA documentation and a bounded PR; do not auto-publish if project governance requires human review.

Acceptance for Development B:
- Ghost historical failures are explicitly dispositioned;
- the portable install artifact can be loaded independently;
- canonical AoA source remains the authority;
- the final agent is shorter/simpler after Cleanerz, not larger;
- the user can hand the agent an original plugin/product idea and receive a complete product path rather than only a code patch.

---

## 17. Final research verdict

Five research passes support building the agent.

The research does **not** support a new monolithic autonomous framework. It supports one accountable product/build operator with four lightweight contracts, one preservation mechanism, explicit evidence ceilings, and routing into existing Agents-of-AI methods.

Final name selected by the human owner:

# **Alt-ssembly Required**

**Because “the code runs” is not the same thing as “the product is built.”**

Research phase complete. Proceed to Development A only.
