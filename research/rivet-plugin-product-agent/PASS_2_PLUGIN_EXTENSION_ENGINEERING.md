# Rivet Research Pass 2 — Plugin / Browser-Extension Engineering

Status: **COMPLETE — research pass 2 of 5**  
Working name: **Rivet** (still provisional)  
Scope: browser extensions, userscripts, plugins, host-page adapters, integrations, packaging, lifecycle, permissions, compatibility, and field verification.

## Executive finding

A browser/plugin product is not one JavaScript program. It is a set of execution paths that happen to share code.

The durable mistake to prevent is **environment collapse**: treating Chrome desktop, Firefox desktop, Firefox Android, a userscript manager, a content script, an extension service worker, and a live third-party SPA as though they were the same runtime because they all execute JavaScript.

For the future Rivet agent, plugin work therefore needs a mandatory **Runtime Envelope** before implementation. The Runtime Envelope sits beside the Product Packet and says exactly where code runs, what can disappear/reload, what permissions exist, what host state is trusted, what browser/version differences matter, and which real user paths must be proven.

This pass strongly reinforces the pass-1 hypothesis: Rivet should not be a bigger coder. It should be the accountable product/build operator that keeps product intent, runtime reality, preservation, testing, and release proof aligned while routing existing AoA specialists.

---

## 1. Current platform truth — 2026

### 1.1 WebExtensions is now an active cross-browser standards surface

The W3C WebExtensions Working Group began in May 2026 with a mission to specify the common core of cross-browser extension APIs. Its charter explicitly includes the extension model, trust model, permissions model, WebExtensions APIs, native messaging, WebDriver integration, extension/web interactions, and network-request modification.

Source:
- https://www.w3.org/2026/05/webextensions-wg-charter.html

Implication for Rivet:
- Prefer the standards/common-core surface when practical.
- Treat vendor-specific capabilities as explicit deltas, not hidden assumptions.
- Do not freeze compatibility knowledge into the agent; retrieve current browser support at execution time.

### 1.2 Cross-browser compatibility is better, not identical

Mozilla's current cross-browser guide still documents meaningful differences in API coverage, content-script execution environments, background/service-worker models, manifest keys, packaging, and publishing. It recommends runtime feature checks and fallbacks rather than assuming equal support.

Sources:
- https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Build_a_cross_browser_extension
- https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Chrome_incompatibilities

Implication for Rivet:
- **Feature detection beats browser-name branching** when the distinction is capability rather than policy.
- Compatibility is a matrix of `browser × version × surface`, not a boolean.
- Fallback behavior must be designed and tested deliberately, not added only after a field complaint.

### 1.3 Chrome's `browser` namespace changed the old compatibility advice

Chrome 148 added the `browser` namespace across extension APIs, and Chrome 152 extended it to DevTools extensions. Chrome's own guidance now says new extensions can use `browser` directly when their minimum Chrome version is high enough. Mozilla archived `webextension-polyfill` in July 2026 because native support made its original purpose largely obsolete on modern browsers.

Sources:
- https://developer.chrome.com/docs/extensions/develop/concepts/browser-namespace
- https://github.com/mozilla/webextension-polyfill

Implication for Rivet:
- Never cargo-cult an old compatibility dependency merely because it used to be standard.
- Before adding a shim/polyfill, determine the actual supported browser/version floor and current native capability.
- Raising a minimum browser version is a product/release decision because older users can be frozen on old extension versions; it is not merely a code cleanup.

---

## 2. The Runtime Envelope — new Rivet artifact

Before changing a plugin/extension/userscript, Rivet should emit or update:

```text
[RUNTIME ENVELOPE]
Product class:
  USERSCRIPT | WEBEXTENSION | HOST PLUGIN | APP INTEGRATION | HYBRID

Execution surfaces:
  page/main world:
  userscript sandbox:
  content/isolated world:
  background/service worker:
  extension pages/offscreen:
  remote/API surface:

Lifecycle boundaries:
  document start/end/idle:
  SPA navigation / route mutation:
  editor/component replacement:
  background/service-worker suspension:
  browser restart/update:
  extension update/reload:
  permission revocation/change:
  mobile backgrounding/connectivity:

Permissions / grants:
  required:
  optional:
  host/site access:
  privileged manager APIs:

Compatibility targets:
  browser + minimum version + desktop/mobile:

Persistence owner:
  what must survive teardown and where it is stored:

Host coupling:
  selectors / events / API endpoints / authenticated state / experiments:

Fallback hierarchy:
  primary path:
  verified fallback:
  stop condition:

Release artifacts:
  userscript:
  extension manifest/runtime:
  packages/store builds:
  version parity requirements:

Field acceptance paths:
  exact real-device/user journeys that must pass:
```

The Product Packet says **what the product must remain**. The Runtime Envelope says **where and under what conditions it has to remain true**.

---

## 3. Execution contexts are a first-class architecture boundary

Chrome's documentation says content scripts run in an isolated world, can access the DOM, and communicate with other extension parts through messaging. Mozilla documents comparable but not identical execution semantics. Tampermonkey and Violentmonkey add another layer: userscripts may execute in page/main context, isolated/content context, or special userscript sandboxes depending on manager/browser/settings/CSP.

Sources:
- https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts
- https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/content_scripts
- https://www.tampermonkey.net/documentation.php
- https://www.tampermonkey.net/documentation.php?q=content_script_api
- https://violentmonkey.github.io/api/metadata-block/
- https://violentmonkey.github.io/posts/inject-into-context/

### Rivet rule — Context Before Code

Before choosing an implementation, answer:

1. Which context owns the data or object we need?
2. Which context is allowed to touch the DOM?
3. Which context owns privileged APIs?
4. What is the trust boundary between page code and extension/userscript code?
5. How will data cross that boundary?
6. What happens when CSP or manager settings change the injection context?

This is especially important for Ghost: a userscript manager can change the execution wrapper/context while the host SPA independently replaces DOM nodes. A correct implementation cannot assume that “the element I wrote into” or “the global object I saw” remains the same object after framework reconciliation.

---

## 4. Lifecycle engineering — assume teardown, replacement, and restart

Chrome's Manifest V3 service-worker lifecycle is explicitly ephemeral: service workers can be terminated after idle periods, long operations, or delayed fetches; Chrome recommends persisting state instead of relying on globals. Events can revive the worker later.

Source:
- https://developer.chrome.com/docs/extensions/develop/concepts/service-workers/lifecycle

The eyeo Extension Engine team published a useful practitioner case study: their testing deliberately exercises service-worker suspension because ordinary development/debugging paths can mask the failure. They emphasize that entry points must tolerate uninitialized state, listeners must be registered in time, and timers/state can disappear.

Source:
- https://developer.chrome.com/blog/eyeos-journey-to-testing-mv3-service%20worker-suspension

Named practitioner-method candidates from that case:
- **Aga Czyżewska** — extension-engine robustness under MV3 suspension.
- **Justin Wernick** — suspension-oriented extension testing.
- **Rowan Deysel** — lifecycle failure testing in a large deployed extension engine.

These are method sources, not permanent Rivet seats or implied endorsers.

### Rivet rule — Restartability

Every long-lived plugin feature must answer:

- What state exists only in memory?
- What happens if that state disappears between two user actions?
- Can every entry point rebuild the minimum state it needs?
- Does the test environment accidentally keep the worker alive and hide the production failure?

For userscripts/host adapters, substitute equivalent lifecycle events:
- full navigation;
- SPA route change;
- DOM subtree replacement;
- editor replacement;
- browser tab suspension/backgrounding;
- userscript reload/update.

---

## 5. Permissions are product UX, not manifest bookkeeping

Chrome separates required, optional, host, and optional-host permissions and explicitly recommends optional permissions when possible so users retain informed control. Permission changes can produce warnings and affect trust.

Source:
- https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions

**Oliver Dunk** is a useful current practitioner-method source because his Chrome Extensions work discusses user control over host access and feature-detectable permission-request behavior rather than assuming access is permanent.

Sources:
- https://developer.chrome.com/blog/new-extensions-menu-testing
- https://developer.chrome.com/blog/extension-news-june-2025

### Rivet rule — Permission Journey

For every privileged capability, capture:

```text
WHY NEEDED
WHEN ASKED
WHAT USER SEES
WHAT WORKS WITHOUT IT
WHAT HAPPENS IF DENIED
WHAT HAPPENS IF LATER REVOKED
HOW TO RECOVER
```

A feature that technically works only after a broad install-time permission but gives the user no intelligible reason is not complete product work.

---

## 6. Cross-browser strategy — common core plus explicit deltas

The current W3C/WebExtensions direction is interoperability around a common core while allowing vendor-specific features. Mozilla's guidance recommends alternative implementations/fallbacks and runtime feature checks where APIs differ.

Relevant current leadership/method sources:
- **Simeon Vincent** — current co-chair of the W3C WebExtensions Working Group; long-running work on browser-extension interoperability and platform evolution.
- **Timothy Hatcher** — current W3C WebExtensions WG co-chair; cross-browser extension standards work.
- **Luca Greco** and **Kumar McMillan** — Mozilla's `web-ext` work demonstrated a practical developer workflow that can run an extension against Firefox and Chromium concurrently.

Sources:
- https://www.w3.org/groups/wg/webextensions/
- https://developer.chrome.com/blog/extension-news-january-2024
- https://hacks.mozilla.org/2019/10/developing-cross-browser-extensions-with-web-ext-3-2-0/

### Rivet rule — Compatibility Ledger

Do not write “cross-browser compatible.” Record:

```text
CAPABILITY        CHROME        FIREFOX DESKTOP   FIREFOX ANDROID   SAFARI/OTHER
API available     PASS/DELTA    PASS/DELTA        PASS/DELTA        ...
permissions       ...
background model  ...
content context   ...
mobile UI         ...
packaging         ...
field-tested      YES/NO        YES/NO            YES/NO            ...
```

A browser not actually tested is `NOT TESTED`, never implied by a shared codebase.

---

## 7. Firefox Android is a separate product target

Mozilla's current Firefox Android extension guidance says to lint for Android-specific incompatibilities, use distinct Android minimum-version metadata, test responsive layout, run **all critical paths on an Android device**, test unreliable/offline connectivity, and test multiple device sizes.

Source:
- https://extensionworkshop.com/documentation/develop/developing-extensions-for-firefox-for-android/

It also provides a direct `web-ext run -t firefox-android` path and remote debugging through `about:debugging`/ADB.

### Rivet rule — Mobile Is Not Emulation Closure

A mobile emulator/browser fixture is valuable, but it cannot certify:
- userscript-manager behavior on the real device;
- authenticated host experiments;
- touch/focus/viewport interactions;
- Android process/background lifecycle;
- mobile browser chrome/popup behavior;
- real connectivity conditions.

For a product whose primary user is on Firefox Android, real-device evidence is a release gate, not optional post-release QA.

---

## 8. Testing ladder for plugins/extensions

Chrome's own testing guidance separates unit tests from end-to-end tests and explicitly describes E2E testing as loading the built extension into a browser and automating the same flows a user goes through.

Sources:
- https://developer.chrome.com/docs/extensions/how-to/test/unit-testing
- https://developer.chrome.com/docs/extensions/how-to/test/end-to-end-testing
- https://developer.chrome.com/docs/extensions/how-to/test/puppeteer

The W3C WebExtensions WG charter now explicitly includes WebDriver integration so common browser-extension behavior can be tested across user agents.

### Rivet testing ladder

```text
L0 STATIC
syntax, manifest, metadata, packaging, generated parity

L1 UNIT
pure helpers, parsers, state machines, permission logic

L2 CONTRACT
adapter contracts, selectors, messages, persistence, exact-once semantics

L3 HOST FIXTURE
controlled DOM/runtime fixtures including mutation and replacement

L4 BROWSER E2E
built artifact loaded into representative browsers; real interaction flow

L5 LIFECYCLE E2E
restart, service-worker termination, reload/update, permission changes, offline/background cases

L6 REAL DEVICE / AUTHENTICATED HOST
representative user profile/device/account/experiment path

L7 RELEASE CANARY
smallest real path that proves the shipped artifact, version, update channel, and user journey
```

Passing a lower rung never silently certifies a higher rung.

---

## 9. Host mutation and field truth — Ghost's recurring engineering lesson

Ghost's issue/PR history gives concrete examples of why Rivet needs the Runtime Envelope and testing ladder.

### Issue #40

The repository explicitly records:
- public stable could be field-broken despite extensive CI;
- authenticated live behavior can differ from fixtures and signed-out probes;
- controls vary by account, experiment, browser, and authentication state;
- final acceptance requires real Firefox/Tampermonkey send + generation + continuation + export proof.

Source:
- https://github.com/MShneur/ghost-in-the-loop/issues/40

### PR #36

The field report showed the continuation text inserted but not sent. A signed-out probe did **not** justify claiming one selector as the authenticated-live root cause, so the PR corrected its own evidence boundary. It also retained exact-one Send authority and refused blind fallback escalation.

Source:
- https://github.com/MShneur/ghost-in-the-loop/pull/36

### PR #37

Authenticated ChatGPT and Perplexity field tests exposed a different boundary: the SPA could replace the whole composer node after injection. The repair had to reacquire the live prompt-bearing editor rather than trust the original node reference.

Source:
- https://github.com/MShneur/ghost-in-the-loop/pull/37

### Engineering inference for Rivet

A third-party host adapter needs a **Host Mutation Contract**:

```text
WHAT WE LOCATE
HOW UNIQUE IT MUST BE
WHAT MAY BE REPLACED
WHAT WE REACQUIRE
WHAT PROVES THE WRITE STUCK
WHAT PROVES THE ACTION OCCURRED
WHAT COUNTS AS UNCERTAIN
WHAT WE NEVER RETRY BLINDLY
```

This is not Ghost-specific. Any extension/plugin acting inside a React/Vue/ProseMirror/Lexical/SPA host needs the same class of thinking.

---

## 10. Userscripts are a separate plugin class, not a tiny extension

Tampermonkey currently supports multiple execution/sandbox strategies and a configurable Content Script API. Its documentation notes different injection behavior across Firefox and Chrome Manifest V3, including different `document-start` realities. Violentmonkey similarly distinguishes page, content, and auto injection modes, with CSP-dependent behavior.

Sources:
- https://www.tampermonkey.net/documentation.php?q=content_script_api
- https://www.tampermonkey.net/faq.php?ext=hinc&q=Q404
- https://violentmonkey.github.io/api/metadata-block/
- https://violentmonkey.github.io/posts/inject-into-context/

**Jan Biniok** (Tampermonkey) is therefore a relevant method/source for the userscript-runtime seat: the useful lesson is not a personal opinion but the explicit manager model of sandbox, grants, injection context, and deployment differences.

### Rivet rule — Product Class First

Before proposing architecture, classify the product:

- **Userscript:** manager grants + host DOM + manager/browser sandbox/injection semantics.
- **WebExtension:** manifest + content/background/extension-page contexts + permissions + store packaging.
- **Host plugin:** host SDK/lifecycle/permissions.
- **Hybrid:** explicitly map every bridge.

Do not silently apply WebExtension advice to a userscript or vice versa.

---

## 11. Release and packaging are architecture surfaces

Mozilla's cross-browser guidance notes separate browser-store release processes and monotonic version requirements. A shared source tree therefore does not guarantee a shared release artifact.

Source:
- https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Build_a_cross_browser_extension

Ghost itself has repeatedly needed userscript, generated extension runtime, manifest, package, lockfile, and build identity to remain in parity.

### Rivet rule — Artifact Parity Gate

Before release:

```text
CANONICAL SOURCE -> generated runtime -> manifest -> package metadata -> store/archive -> update URL
```

Every generated/distributed artifact gets:
- expected version;
- source revision;
- checksum/parity evidence where appropriate;
- platform target;
- release state.

A test against source does not certify a stale distributed artifact.

---

## 12. What Rivet adds beyond existing AoA

Existing AoA already has:
- Origin — authority/provenance/current-state reconciliation;
- Buildhouse — implementation/debugging/verification/security/refactoring;
- Root Cause — path-separated causal diagnosis;
- Repo Nanny — repository maintenance;
- Cleanerz — loop interruption/replan;
- Quorum/Human Gate — consequential expert review;
- Single Dispatch — one accountable chief operator.

Rivet's missing role is now sharper:

### Unique responsibilities

1. **Product Packet** — protect the full accepted product, not merely current code.
2. **Preservation Ledger** — no working surface is removed incidentally.
3. **Runtime Envelope** — map execution contexts, lifecycle, permissions, persistence, browser/version targets, host coupling, and field gates.
4. **Feature Layer Map** — classify features so a repair's blast radius is visible.
5. **Host Mutation Contract** — safe interaction with evolving third-party SPAs.
6. **Compatibility Ledger** — capability and proof by browser/version/device.
7. **Plugin Testing Ladder** — never promote fixture proof into field certification.
8. **Artifact Parity Gate** — prove the thing tested is the thing distributed.
9. **Novice/Product handoff** — later pass will add cognitive/usability gates so technically correct states are understandable to ordinary users.

Rivet routes Buildhouse/Tracker/Stresstest/Locksmith/etc.; it does not duplicate them.

---

## 13. Proposed Rivet pre-build questions from this pass

Before code changes, the agent should ask itself silently and surface only unresolved blockers:

1. What class of product/runtime is this?
2. What working user journeys must survive?
3. Which execution context owns each action/data source?
4. What can be torn down/replaced between steps?
5. What state must persist across that teardown?
6. Which permissions/grants are truly required, and how does denial/revocation behave?
7. Which browser/version/mobile targets are actually in scope?
8. Which capabilities differ across them?
9. What third-party host DOM/API assumptions are load-bearing?
10. What is the primary path, fallback path, and fail-closed stop?
11. What artifact will users actually install?
12. What test proves that exact artifact on the exact critical user path?
13. Which evidence is synthetic, which is browser-real, and which is field-real?
14. What has not been tested?

---

## 14. Plugin-specific Cleanerz triggers

In addition to canonical Cleanerz auto-fire, Rivet should route to Cleanerz when any of these appear:

- browser-specific branches accumulate without a current Compatibility Ledger;
- a second/third actuation fallback is added to compensate for an unisolated first-path failure;
- a selector fix is followed by another selector fix without capturing the real host mutation model;
- one host/browser repair changes unrelated product layers;
- an extension migration introduces persistent “keep it alive” workarounds instead of designing for lifecycle teardown;
- permissions broaden to avoid understanding which capability actually requires them;
- mocks/fixtures repeatedly pass while the real user path fails;
- source, generated runtime, manifest, package, or installed artifact drift apart;
- the project claims “cross-browser” while material targets remain `NOT TESTED`.

Cleanerz still owns the replan. Rivet only recognizes when to call it.

---

## 15. Practitioner-method candidates from Pass 2

These names are **research sources, not frozen Quorum seats**. At actual consequential gates, Quorum must re-source live.

| Practitioner / group | Published method evidence used here | Failure they help catch |
|---|---|---|
| Simeon Vincent | W3C WebExtensions leadership; platform-evolution discussions | treating one browser's implementation as the standard |
| Timothy Hatcher | W3C WebExtensions leadership/common-core standardization | hidden vendor assumptions; portability gaps |
| Oliver Dunk | Chrome Extensions DevRel; host-access/user-control evolution | permanent-access assumptions; permission UX failures |
| Luca Greco + Kumar McMillan | Mozilla `web-ext` cross-browser workflow | testing one browser and assuming portability |
| Aga Czyżewska + Justin Wernick + Rowan Deysel / eyeo | explicit testing of MV3 service-worker suspension | lifecycle bugs hidden by devtools/test harnesses |
| Jan Biniok / Tampermonkey | userscript sandbox/injection/grant execution model | treating userscripts like ordinary page JS or ordinary extensions |

No claim is made that these practitioners reviewed Rivet or Ghost.

---

## 16. New invariants carried into later passes

1. **No environment collapse.** Every materially different runtime path remains separate until transfer-tested.
2. **No incidental deletion.** A fix cannot remove a working product surface without an explicit Product Packet kill decision.
3. **No ephemeral-state assumption.** Lifecycle teardown/replacement is tested where the runtime permits it.
4. **No blanket compatibility claim.** Every target has evidence or `NOT TESTED`.
5. **No permission by convenience.** Privilege follows user value and least necessary access.
6. **No mock-to-field promotion.** E2E and real-device gates are distinct.
7. **No stale distributed artifact.** Tested source and installed artifact must be tied by revision/version/parity evidence.
8. **No blind host actuation.** Third-party controls are reacquired/verified, one actuation is authoritative, uncertainty stops escalation when duplicate action is harmful.
9. **No fossilized compatibility recipe.** Current platform support is retrieved before adding shims or browser-specific workarounds.

---

## Pass-3 handoff — human factors / novice UX

Research pass 3 should now answer the other half of the product problem:

- How should a novice understand a powerful extension without knowing terms such as DOM, selector, API, content script, service worker, partial capture, or protocol marker?
- How should advanced features be progressively disclosed without deleting them?
- Which cognitive/HCI methods distinguish “simple architecture” from “feature-poor interface”?
- How should system status, uncertainty, recovery, permissions, export completeness, and failure be communicated?
- How do mobile touch targets, cramped panels, scrolling, focus, accessibility, and interruption change the design?
- What user research or behavioral evidence should be required before renaming/removing features?
- Which named practitioners' methods would have caught Ghost's UI overcorrection and novice-language problems before release?

Pass 3 should preserve the technical Runtime Envelope from this pass rather than redesign it.
