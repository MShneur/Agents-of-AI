# CTRL Walkthrough

CTRL Walkthrough is a public Tampermonkey userscript for guided setup. It is designed to feel like a tiny navigation system rather than a documentation panel.

Current engine: **v0.4.0**.

AI authors should read:

- [`AUTHORING_RULES.md`](AUTHORING_RULES.md) — novice-first / tired-user step-writing rules;
- [`AI_HANDOFF_PROTOCOL.md`](AI_HANDOFF_PROTOCOL.md) — public/private handoff and privacy rules;
- [`make_handoff.py`](make_handoff.py) — CWZ2/CW2 generator.

## Core UX

The default view shows:

- **NOW — step n/N**;
- a short action title;
- optional `Why:` line;
- one small block of instruction;
- **one primary action**;
- a faint **Next:** preview.

The full route is behind **Steps**. On mobile, the normal panel is intentionally small; `^` expands it and `-` minimizes it back to the tiny `CW n/N` pill.

Progress persists across pages, but the large panel no longer needs to remain open across unrelated browsing.

## Automation boundary

CTRL v0.4 supports:

- direct HTTPS navigation;
- safe exact-target auto-clicks (`click` with `safe: true`);
- find/highlight when clicking is not appropriate;
- copy actions;
- local text-file downloads;
- temporary local secret generation/capture/copy for a walkthrough;
- page-state checks;
- custom walkthrough import.

If a safe auto-click cannot find the exact expected target, CTRL stops instead of guessing another control.

Login, passkeys, MFA, CAPTCHA, OAuth consent, legal terms, billing, purchases, final deployment/publication/deletion and equivalent consequential controls remain user-gated.

## Temporary local private values

A walkthrough can generate or temporarily capture a secret into Tampermonkey-local storage. This is useful when the same API/token value must be reused during a multi-page setup.

Those values:

- are not written into the walkthrough source;
- are not uploaded to Agents of AI or Personal Forge;
- are not sent to an AI;
- are cleared when that walkthrough ends/completes.

This is convenience storage, **not an encrypted password manager**. Long-term credentials belong in the provider/server secret store.

## Responsive behavior

- Phone / narrow viewport: roughly 30% maximum viewport height in normal mode, smaller typography and controls.
- `^` expands the current panel only when more room is needed.
- **Steps** opens a larger scrollable route view.
- Desktop / wide viewport uses a larger dock.
- The layout reacts to viewport/orientation changes rather than device-name detection.

## Why not iframe everything?

CTRL uses normal provider pages/tabs plus persistent Tampermonkey state. Iframes are not the default because many dashboards, authentication pages and OAuth/security flows block framing or behave differently inside an iframe.

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

The live mobile test showed that a signed-in private GitHub page does not guarantee a userscript can fetch the private raw file, so CWG1 is not the primary private transport.

### Copy/paste hardening in v0.4

CWZ2/CW2 import now normalizes common copied-code damage such as whitespace, zero-width characters, soft hyphens and Markdown code fences before Base64URL decoding. If another visible invalid character remains, CTRL reports a damaged-code error and recommends **Import file** rather than trying to guess the intended payload.

Expired temporary handoffs with `handoffExpiresAt` are purged on startup.

## Privacy boundary

This public folder must never contain personal information, credentials, tokens, API keys, private hosts/IPs, private repository paths, account identifiers, private research terms, billing details or other user-specific configuration.

CWZ2/CW2 are compression/encoding, **not encryption**. Never encode credentials in them.

A timed deletion from a public GitHub repo is not a privacy mechanism because committed content can remain in Git history. Public walkthrough content must be safe to remain public permanently.

## Schema v2 + v0.4 action extensions

Required module fields:

- `schemaVersion: 2`
- `id`
- `title`
- `steps[]`

Recommended step fields:

- `title`
- `why` — one short reason when useful
- `body`
- `action`
- `humanGate` when the user must make the consequential decision
- `manualLabel` for the single manual-continue action

Supported action types:

- `none`
- `open`
- `copy`
- `find`
- `click` — requires `safe: true`
- `download`
- `generate` — create temporary local random value
- `capture` — temporarily store a user-entered local value
- `copySaved` — copy a previously stored temporary local value

Locator candidates may use CSS selectors and/or visible/ARIA/title/value text.

## Publishing rule

Before shipping any walkthrough, apply [`AUTHORING_RULES.md`](AUTHORING_RULES.md): **one current task, one obvious action, one short reason, and direct navigation/automation whenever it is reliably safe.**