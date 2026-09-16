# Rivet Research Pass 4 — Verification / Observability / Analytics

Status: **COMPLETE — research pass 4 of 5**  
Working name: **Rivet** (still provisional)  
Scope: evidence required before claiming a plugin/product works; observability; diagnostics; exploratory QA; field canaries; release/rollback gates; product analytics; privacy-preserving telemetry.

## Executive finding

Rivet needs a binding distinction between **test success** and **product proof**.

The recurring Ghost failure was not merely a bad selector or missing test. It was an evidence-classification failure: deterministic tests, fixtures, hosted browsers, syntax checks, or a successful local path were repeatedly allowed to stand in for the user's real installed path.

The future agent therefore needs a fourth mandatory artifact beside Product Packet, Runtime Envelope, and Novice Contract:

> **Evidence Contract** — what evidence is required for each claim, what paths were actually exercised, what remains untested, what telemetry may be collected, and what causes pause/rollback.

A release claim may be no stronger than its weakest load-bearing path.

---

## 1. Ghost evidence — why this gate is necessary

Ghost's historical record repeatedly states the right lesson after the fact:

- Issue #40 says public 8.8.2 remained field-broken despite prior deterministic success; authenticated real Firefox/Tampermonkey was required before closure.
- PR #36 explicitly corrected an overclaim: a signed-out public ChatGPT DOM shape could not establish the authenticated failing root cause.
- PR #37 showed a production-only composer replacement path that stable-node fixtures had not represented.
- PR #46 still correctly bounded 9.0 alpha.2 to syntax/lens evidence and refused to call Firefox Android field-certified.

Rivet should move that discipline **before release**, not record it only after a failure.

Core rule:

```text
SYNTHETIC PASS != FIELD PASS
SOURCE INSPECTION != RUNTIME PASS
ONE HOST PASS != CROSS-HOST PASS
ONE BROWSER PASS != CROSS-BROWSER PASS
DESKTOP PASS != MOBILE PASS
API RESPONSE != USER-JOURNEY SUCCESS
```

---

## 2. New artifact — Evidence Contract

Before implementation or release, Rivet should establish:

```text
[EVIDENCE CONTRACT]

Claim under review:
  e.g. "Play works on supported Perplexity Firefox Android"

Required paths:
  path ID:
  product surface:
  host/site:
  browser/version:
  desktop/mobile:
  auth/account state:
  install/runtime mode:
  lifecycle state:
  connectivity/state assumptions:

Evidence ladder required:
  SOURCE | UNIT | INTEGRATION | BROWSER E2E | REAL FIELD | LONGITUDINAL

Acceptance evidence:
  visible user outcome:
  internal diagnostic outcome:
  negative case:
  rollback trigger:

Artifact identity:
  exact version/commit/package/hash actually exercised:

Telemetry policy:
  data allowed:
  data forbidden:
  retention:
  aggregation/anonymization:

Result per path:
  PASS | PARTIAL | FAIL | BLOCKED | NOT TESTED

Claim ceiling:
  strongest statement currently justified:

Release decision:
  SHIP | CANARY | HOLD | ROLLBACK | HUMAN GATE
```

The Evidence Contract is deliberately not a huge QA plan. It binds the **claim** to the **actual path** and exact artifact.

---

## 3. Evidence ladder

Rivet should use a fixed evidence vocabulary so fluency cannot inflate confidence.

### E0 — SOURCE
Static inspection, syntax, type checks, lint, manifest validation.

Useful for: proving code shape and obvious invariants.  
Cannot prove: that the installed product works.

### E1 — UNIT
Pure functions/components tested in isolation, including mocked extension APIs where appropriate.

Chrome's official guidance explicitly describes unit tests as isolated tests outside the browser and separately recommends end-to-end tests for extension behavior.

Source:
- https://developer.chrome.com/docs/extensions/how-to/test/unit-testing

### E2 — INTEGRATION
Multiple internal components execute together against controlled dependencies/fixtures.

Useful for: message flow, storage, adapters, API parsers, state machines.  
Cannot automatically prove: browser lifecycle or host behavior.

### E3 — BROWSER E2E
The built extension/userscript is loaded into a browser and the same visible flow a user takes is exercised.

Chrome defines extension end-to-end testing as loading the built extension into a browser and testing user flows; its guidance recommends assertions based on visible user state where possible.

Sources:
- https://developer.chrome.com/docs/extensions/how-to/test/end-to-end-testing
- https://developer.chrome.com/docs/extensions/how-to/test/puppeteer

### E4 — REAL FIELD
Exact installed artifact, actual supported browser/device, authenticated/account state when material, real host application, actual user journey.

This is required when the product's core behavior depends on third-party live DOM, account experiments, browser/mobile differences, permission state, or remote platform behavior.

### E5 — LONGITUDINAL
The path survives time/lifecycle boundaries: reload, restart, update, service-worker suspension, permission changes, host mutations, representative repeated use, or staged rollout.

Required only when those lifecycle properties are load-bearing.

Rule:

> A claim requiring E4 cannot be closed by more E1–E3 evidence.

More tests in the wrong evidence class do not fill a field-evidence gap.

---

## 4. Test the installed artifact, not merely the source tree

For extension/plugin products Rivet should preserve **artifact identity**:

```text
SOURCE SHA
BUILD/PACKAGE SHA
USERSCRIPT VERSION
MANIFEST VERSION
EXTENSION RUNTIME VERSION
STORE/INSTALL CHANNEL
TESTED ARTIFACT HASH
```

A test result is attached to the exact artifact that ran.

If generated extension code, package output, or store artifact differs from source, source-level tests cannot certify the distributed product.

This is the release-engineering lesson emphasized by Google SRE: release engineering includes repository state, build rules, testing, packaging, deployment, canarying, and rollback — not just source correctness.

Sources:
- https://sre.google/sre-book/release-engineering/
- https://sre.google/workbook/canarying-releases/

---

## 5. Lifecycle and destructive-path testing

Happy-path E2E is insufficient for plugins/extensions because important state can disappear.

Chrome documents that extension service workers may terminate and lose non-persistent globals. It explicitly recommends testing termination and persisting important state externally.

Sources:
- https://developer.chrome.com/docs/extensions/develop/concepts/service-workers/lifecycle
- https://developer.chrome.com/docs/extensions/how-to/test/test-serviceworker-termination-with-puppeteer

Rivet should derive lifecycle tests from the Runtime Envelope rather than use a universal giant matrix.

Candidate destructive tests:

```text
HOST DOM NODE REPLACED
SPA ROUTE CHANGED
TAB RELOADED
BROWSER RESTARTED
SERVICE WORKER TERMINATED
PERMISSION REVOKED
NETWORK LOST / RESTORED
EXTENSION UPDATED
USERSCRIPT RELOADED
MULTIPLE TABS OPEN
REMOTE API PARTIAL / STALE / MALFORMED
HOST CONTROL AMBIGUOUS
ACTION ATTEMPTED BUT ACK UNKNOWN
```

Only run the ones that are load-bearing for that product.

---

## 6. Exploratory testing — scripted tests do not own the truth

James Bach's testing method treats testing as investigation of unknown territory rather than only execution of predefined test artifacts. His Session-Based Test Management and newer Thread-Based Test Management provide bounded ways to manage exploratory testing.

Sources:
- https://www.satisfice.com/download/session-based-test-management
- https://www.satisfice.com/blog/archives/5214

Rivet should therefore include a short **exploratory charter** for consequential releases:

```text
MISSION
Break the claimed user journey in ways the scripted suite may not model.

FOCUS
host mutations / timing / multiple tabs / mobile / permission state / stale UI /
repeated actions / partial network / recovery / user mistakes

TIME BOX
bounded

RETURN
new failure found | no new failure in charter | blocked
```

This is not a replacement for automated tests. It is a different evidence source intended to find assumptions the author did not encode into the suite.

---

## 7. Observability — diagnostics should answer unknown questions

Cindy Sridharan's observability work emphasizes coding and testing for observability, coding for failure, operational semantics, dependency behavior, and debuggable code.

Source:
- https://www.oreilly.com/library/view/distributed-systems-observability/9781492033431/

Charity Majors / Liz Fong-Jones / Honeycomb's structured-event approach emphasizes retaining enough contextual dimensions in one event to answer unexpected debugging questions rather than relying only on predeclared dashboard metrics.

Sources:
- https://www.honeycomb.io/blog/structured-events-basis-observability
- https://www.honeycomb.io/resources/whitepapers/bridge-from-observability1dot0-2dot0-logs-not-metrics

For Rivet, this becomes a **Diagnostic Event Contract** rather than blanket telemetry.

For a browser/plugin action, one bounded event should be able to carry relevant non-content context such as:

```text
when
product version / artifact hash
platform + browser/version + mobile/desktop
runtime surface
state before action
action requested
actuator/path selected
verification stage reached
acknowledgement observed or not
timeouts / elapsed time
fallback selected or not
uncertainty state
result classification
```

For Ghost-like products, prompt/conversation bodies are **not needed by default** to diagnose selector, lifecycle, or delivery-boundary failures.

One rich metadata event is preferable to dozens of disconnected low-context log lines when that event can remain privacy-safe.

---

## 8. Privacy-preserving diagnostics

OpenTelemetry's current sensitive-data guidance explicitly recommends data minimization: collect only data that serves an observability purpose, avoid personal information unless necessary, prefer aggregated/anonymized forms where sufficient, and periodically review whether attributes are still needed.

Source:
- https://opentelemetry.io/docs/security/handling-sensitive-data/

OpenTelemetry semantic-convention guidance also requires authors to flag attributes that may contain PII/sensitive data rather than hiding that risk.

Source:
- https://opentelemetry.io/docs/specs/semconv/how-to-write-conventions/

NIST privacy engineering gives Rivet a useful three-part test:

- **Predictability** — users/operators can reasonably understand what data is processed.
- **Manageability** — collection/use can be controlled, changed, deleted, or selectively disclosed where appropriate.
- **Disassociability** — avoid linking data/events to people or devices beyond operational need.

Sources:
- NIST IR 8062: https://www.nist.gov/publications/introduction-privacy-engineering-and-risk-management-federal-information-systems
- https://www.nccoe.nist.gov/relationship-between-cybersecurity-and-privacy

### Rivet telemetry rule

Default diagnostic order:

```text
1. LOCAL EPHEMERAL METADATA
2. USER-INITIATED COPY/EXPORT OF DIAGNOSTIC PACKET
3. AGGREGATED/ANONYMIZED REMOTE METRICS IF PRODUCT NEEDS THEM
4. IDENTIFIABLE OR CONTENT-BEARING TELEMETRY ONLY WITH EXPLICIT NEED + DISCLOSURE + AUTHORITY
```

Never collect conversation bodies, prompt text, account identifiers, full URLs with sensitive query strings, auth tokens, cookies, or page content merely because they might someday be useful.

A diagnostic field without a concrete debugging/measurement purpose should not exist.

---

## 9. New artifact — Diagnostic Packet

When a user reports a failure, Rivet should prefer a compact user-controlled packet over asking them to describe internal details manually.

```text
[DIAGNOSTIC PACKET]
Product/version:
Artifact/build identity:
Platform:
Browser/version:
Desktop/mobile:
Runtime class:
Feature/action:
State:
Path selected:
Last confirmed boundary:
Failure code:
Was actuation attempted: YES | NO | UNKNOWN
Was acknowledgement observed: YES | NO | UNKNOWN
Fallback used:
Uncertainty state:
Timing summary:
Permissions relevant:
Lifecycle state:
Content included: NO by default
Timestamp:
```

This is enough to distinguish many runtime failures without exposing user content.

---

## 10. Product analytics — measure outcomes, not button presses

Ronny Kohavi and Microsoft's experimentation work emphasizes controlled experiments because product ideas frequently perform differently than teams expect; randomization and trustworthy experiment design are used to establish causal impact rather than rely on intuition.

Source:
- https://www.microsoft.com/en-us/research/publication/online-experimentation-at-microsoft/

Rivet should distinguish three measurement layers:

### Reliability metrics
Did the mechanism work?

Examples:
- action success / failure / uncertainty rate;
- duplicate-action rate;
- fallback rate;
- recovery success rate;
- export completeness class;
- browser/path failure distribution.

### User-outcome metrics
Did the user accomplish the job?

Examples:
- task completion;
- successful first-run path;
- recovery without abandonment;
- novice feature discovery;
- time/steps to primary outcome.

### Guardrail metrics
What did the change accidentally make worse?

Examples:
- regression in an existing feature;
- permission expansion;
- increased error/uncertainty rate;
- increased support burden;
- reduced mobile usability;
- increased data collection;
- feature disappearance.

A product change is not accepted merely because its target metric improves if a declared guardrail materially regresses.

For small/private products without enough users for meaningful experiments, Rivet does **not** pretend A/B statistics exist. It uses structured field evidence, usability sessions, and before/after checks instead.

---

## 11. Canary and rollback discipline

Google SRE defines a canary as a partial, time-limited deployment evaluated before wider rollout, specifically to expose defects that artificial testing may miss. Canarying limits the blast radius and supports rollback when the candidate diverges from the control.

Source:
- https://sre.google/workbook/canarying-releases/

Rivet should generalize that to plugins/tools:

```text
CANARY POPULATION
single owner/device
small tester group
beta channel
one browser/host path
feature toggle
```

The rollout must define **beforehand**:

```text
SUCCESS SIGNAL
GUARDRAIL SIGNALS
TIME WINDOW
STOP THRESHOLD
ROLLBACK METHOD
KNOWN-GOOD ARTIFACT
```

Rollback is not "we can probably restore the old version." It requires an identified known-good artifact/path.

---

## 12. "Works" has a formal meaning

Rivet should prohibit the bare phrase **"it works"** unless a declared evidence scope accompanies it.

Allowed forms:

```text
SOURCE VERIFIED
UNIT VERIFIED
BROWSER-E2E VERIFIED
FIELD VERIFIED — ChatGPT / Firefox Android / Tampermonkey / authenticated / vX.Y
PARTIALLY VERIFIED — tested paths listed; others NOT TESTED
BLOCKED — required evidence path unavailable
```

For operator-facing brevity, Rivet can say:

> Working on the tested Firefox Android path. ChatGPT remains not tested.

rather than dump the full matrix.

### Claim rule

```text
CERTIFIED SCOPE = intersection of
  tested artifact
  tested browser/runtime
  tested host
  tested auth/state
  tested lifecycle assumptions
  tested user journey
```

No extrapolation beyond that intersection without an explicit inference label.

---

## 13. Failure-proof release gate

For a consequential plugin/product release, Rivet should not close until the following are dispositioned:

```text
PRODUCT PACKET         accepted product/features preserved
RUNTIME ENVELOPE       required execution paths identified
NOVICE CONTRACT        novice path + expert path dispositioned
EVIDENCE CONTRACT      claim/evidence match established
BUILD IDENTITY         exact distributed artifact known
AUTOMATED TESTS        appropriate layers pass
EXPLORATORY CHARTER    completed when warranted
REAL FIELD CANARY      completed when host/device reality is load-bearing
PRIVACY CHECK          diagnostics minimized and disclosed
ROLLBACK               known-good recovery path exists
REGRESSION GUARDRAILS  preserved features verified
UNKNOWN                explicitly listed, not converted into confidence
```

The gate does not demand every possible test. It demands the **smallest evidence set sufficient for the actual release claim**.

---

## 14. Cleanerz triggers discovered in this pass

Rivet should route to Cleanerz if any of these appear:

- test count rises while the same field failure remains unproven;
- another synthetic test is added to compensate for missing real-path access;
- "works" is repeatedly asserted then narrowed after user failure;
- telemetry volume increases without answering the actual unknown;
- a diagnostic system starts collecting content because metadata was not designed well enough;
- canary failure produces an immediate patch instead of first deciding rollback vs repair;
- a release candidate changes again after field proof without invalidating/re-running the affected proof;
- repeated testing occurs without a written claim/evidence boundary.

Cleanerz then performs its normal one-pass Stop / Loop / Salvage / Kill / Horizon / Decision protocol. Rivet does not replicate Cleanerz.

---

## 15. Named practitioner-method candidates for future live Quorum

These are research anchors only. Rivet's final Quorum must source current practitioners/methods live rather than freeze this roster.

### Observability / debuggability
- **Cindy Sridharan** — coding/testing for observability, coding for failure, operational semantics and dependency behavior.
- **Charity Majors / Liz Fong-Jones / George Miranda** — high-context structured-event observability and unknown-unknown debugging.

### Exploratory verification
- **James Bach / Jon Bach** — session-based and thread-based exploratory test management; testing as bounded investigation rather than only test-case execution.

### Experimentation / product evidence
- **Ronny Kohavi and Microsoft Experimentation Platform collaborators** — trustworthy controlled experimentation and causal product evaluation.

### Release engineering / canary
- **Alec Warner, Štěpán Davidovič, Betsy Beyer and Google SRE collaborators** — canarying, release automation, bounded exposure, rollback and SLO-aware evaluation.

### Privacy engineering
- **Naomi Lefkovitz and NIST IR 8062 co-authors** — predictability, manageability, disassociability and privacy-risk engineering.

These are method lenses, not simulated participants or endorsements.

---

## 16. Rivet structure after four research passes

Rivet is converging on four mandatory grounding artifacts:

```text
1. PRODUCT PACKET
   What is the product, what exists, what must survive, what may change?

2. RUNTIME ENVELOPE
   Where does it run, what can disappear/change, what permissions/lifecycle matter?

3. NOVICE CONTRACT
   How does an inexperienced user understand, use, recover, and grow into it?

4. EVIDENCE CONTRACT
   What exact evidence is required before each claim/release is allowed?
```

Supporting execution artifacts:

```text
PRESERVATION LEDGER
HOST MUTATION CONTRACT
DIAGNOSTIC PACKET
EXPLORATORY CHARTER
CANARY / ROLLBACK PLAN
COMPLETION RECEIPT
```

This is enough structure to prevent underbuilding and overcorrection without creating another monolithic controller.

---

## 17. Candidate Rivet invariants strengthened by Pass 4

1. **No evidence-class substitution.** More lower-level tests cannot replace a required field path.
2. **No artifact ambiguity.** A test result belongs to the exact artifact that ran.
3. **No synthetic-to-field promotion.** Hosted/mock/browser-fixture success is labeled honestly.
4. **No claim beyond tested intersection.** Browser, host, auth, device and lifecycle scope stay explicit.
5. **No content telemetry by convenience.** Diagnostics are metadata-first and purpose-bound.
6. **No unbounded logging.** Every collected field has a debugging/measurement purpose.
7. **No release without rollback for consequential changes.** Known-good recovery is identified first.
8. **No target-metric tunnel vision.** Declared guardrails must also survive.
9. **No tester monoculture.** Independent/exploratory verification is used when encoded tests can share the author's assumptions.
10. **No "works" without scope.** Completion language is evidence-qualified.

---

## 18. Questions for Pass 5

The final research/synthesis pass should resolve:

1. Which of the four packets are always mandatory versus conditionally abbreviated for tiny fixes?
2. What is Rivet's exact trigger and anti-goal so it does not overlap Repo Nanny, Showrunner, Buildhouse, Origin, or Cleanerz?
3. Which existing AoA techniques should be hard-wired routes versus optional routes?
4. What live Quorum seats are required for plugin/product architecture and release?
5. What are the opposing professional schools worth preserving rather than resolving prematurely?
6. When does Rivet stop and invoke Human Gate?
7. How should the two-pass implementation workflow work from original product idea through release receipt?
8. What final name best captures whole-product joining/preservation without implying Rivet itself is the implementation team?
9. What minimum portable ChatGPT/Claude/Gemini activation artifact should exist?
10. What Ghost-specific invocation proves Rivet can repair a real project without embedding Ghost assumptions into the universal agent?

## Pass-4 conclusion

The future agent should not ask merely:

> Did the tests pass?

It should ask:

> **What exact claim are we making, what artifact/path did we actually prove, what can still fail outside that path, and what happens if the canary disagrees?**

That question is the missing bridge between AI-generated software that looks complete and software a human can actually rely on.
