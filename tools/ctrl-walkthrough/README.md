# Control Walkthrough

Control Walkthrough is a public Tampermonkey userscript for guided setup. It is designed to feel like a tiny navigation system rather than a documentation panel.

Current engine: **v0.5.0**.

AI authors should read:

- [`AUTHORING_RULES.md`](AUTHORING_RULES.md) — novice-first, autonomous, verified step-writing rules;
- [`AI_HANDOFF_PROTOCOL.md`](AI_HANDOFF_PROTOCOL.md) — public/private handoff and privacy rules;
- [`make_handoff.py`](make_handoff.py) — CWZ2/CW2 generator.

## Core UX

The default UI is a **small left/right edge rail**, not a bottom sheet. The compact header keeps the product name, version/guide count, route counter, menu, and minimize control on one line.

During a guide the normal view shows:

- the current step;
- a short action title;
- optional `Why:` line;
- one small block of instruction;
- one primary action only when user input is actually needed;
- a faint `Next:` preview.

Tap the `n/N` route counter to see the scrollable full route. The rail may move to the opposite side of a highlighted control so it does not cover the thing the user needs to press.

## Verified autonomy

v0.5 adds an autonomous action-and-verification loop inspired by mature open-source tour patterns such as wait-for-target, advance-on-real-interaction, route resume, and explicit target-not-found handling.

For safe steps a walkthrough can now:

1. wait for a dynamic target to appear;
2. open a stable direct HTTPS URL or click an exact reversible navigation control;
3. fill a non-secret field or a secret previously saved only in local walkthrough memory;
4. persist the action across a full navigation;
5. wait for the destination page or SPA update;
6. verify the expected URL/selector/text state;
7. advance automatically only after verification succeeds.

If the target is missing, ambiguous, disabled, consequential, or the result cannot be verified, the engine stops instead of guessing or repeatedly clicking.

## Human-gated actions

Login, passkeys, MFA, CAPTCHA, OAuth consent, legal terms, billing, purchases, token generation/rotation, final deployment/publication/deletion and equivalent consequential controls remain user-gated.

A walkthrough can still reduce friction around them: it may navigate to the correct screen, fill safe prerequisite fields, highlight the final control, listen for the user's real click with `advanceOn`, and verify the resulting state. The user should not need to press a second walkthrough button when the result is already machine-verifiable.

## Action types

Schema v2 supports:

- `none`
- `open`
- `copy`
- `find`
- `click` — requires `safe: true`
- `fill` — fill a static non-secret value without submitting
- `fillSaved` — fill a value from temporary local walkthrough memory
- `download`
- `generate` — create a temporary random local value
- `capture` — temporarily store a user-entered value
- `copySaved` — copy a previously stored temporary local value

Useful autonomous fields include:

- `action.auto: true` — run the safe action automatically;
- `action.verify` or `step.success` — expected destination/state;
- `waitForTargetMs` / verification timeout — wait for dynamic mobile/SPA UI;
- `step.advanceOn` — observe the user's real click/change/input/submit and verify the result.

Locator candidates may use CSS selectors and/or visible/ARIA/title/placeholder/value text. Visible candidates are scored; ambiguous best matches fail closed.

## Temporary local private values

A walkthrough can generate or temporarily capture a secret into Tampermonkey-local storage and later reuse it with `copySaved` or `fillSaved`.

Those values:

- are not written into the walkthrough source;
- are not uploaded to Agents of AI or Personal Forge;
- are not sent to an AI;
- are cleared when that walkthrough ends/completes.

This is convenience storage, **not an encrypted password manager**. Long-term credentials belong in the provider/server secret store.

## Install

Open the raw version of:

`tools/ctrl-walkthrough/ctrl-walkthrough.user.js`

Tampermonkey should offer to install/update it. `@updateURL` and `@downloadURL` point back to the public Agents of AI copy.

## Public and private walkthroughs

Public reusable walkthroughs live in:

`tools/ctrl-walkthrough/modules/`

Private/project-specific walkthrough sources stay outside this public folder. Preferred handoff order:

1. **CWZ2** — compressed self-contained temporary handoff;
2. **CW2** — uncompressed fallback;
3. **local `.walkthrough.json` file** — best for larger private walkthroughs;
4. **CWG1/private GitHub pointer** — best-effort only.

A signed-in private GitHub page does not guarantee a userscript can fetch the private raw file, so CWG1 is not the primary private transport.

CWZ2/CW2 import normalizes common copied-code damage such as whitespace, zero-width characters, soft hyphens and Markdown code fences. Expired temporary handoffs with `handoffExpiresAt` are purged on startup.

## Privacy boundary

This public folder must never contain personal information, credentials, tokens, API keys, private hosts/IPs, private repository paths, account identifiers, private research terms, billing details or other user-specific configuration.

CWZ2/CW2 are compression/encoding, **not encryption**. Never encode credentials in them.

## Publishing rule

Before shipping any walkthrough, apply [`AUTHORING_RULES.md`](AUTHORING_RULES.md): **one current task, one obvious action, automate everything safely automatable, and verify before advancing.**