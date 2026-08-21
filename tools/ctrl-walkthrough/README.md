# CTRL Walkthrough

CTRL Walkthrough is a public, mobile-first Tampermonkey userscript for guided installation and setup of tools listed in Agents of AI.

Current engine: **v0.3.0**.

For AI authors, the canonical transport rules are in [`AI_HANDOFF_PROTOCOL.md`](AI_HANDOFF_PROTOCOL.md). A deterministic gzip/Base64URL generator is provided as [`make_handoff.py`](make_handoff.py).

## Privacy model

This folder is public. Nothing here may contain personal information, credentials, tokens, API keys, private hostnames/IPs, private repository paths, account identifiers, private research terms, billing details, entitlement state, or other user-specific configuration.

Walkthrough files are **declarative JSON only**. The userscript never evaluates JavaScript from a walkthrough.

Private/project-specific walkthroughs should normally be handed to the browser as a self-contained `CWZ2` code or a local `.walkthrough.json` file. CTRL does **not** require a Personal Access Token to be pasted into the tool.

## Install

Open the raw version of:

`tools/ctrl-walkthrough/ctrl-walkthrough.user.js`

Tampermonkey should offer to install it. The script contains `@updateURL` and `@downloadURL` entries pointing back to this public copy.

The userscript runs on normal HTTPS pages and shows a small `CW` launcher in the lower-right corner.

## Interface

1. Open `CW`.
2. Choose a walkthrough from the dropdown.
3. Press **Start walkthrough**.
4. If the first step has a direct URL, CTRL opens that page.
5. On provider pages, **Find on page** searches visible buttons, links, fields, labels, ARIA labels, and common interactive controls, scrolls the match into view, and highlights it.
6. Login, MFA, CAPTCHA, terms, OAuth consent, billing, purchases, publishing, and other consequential controls remain user-gated.

### Header controls

- `H` — walkthrough list/home.
- `+` — **Add walkthrough**. Paste an AI handoff code, paste JSON, import a file, or load a URL.
- `^` — expand/compact the phone panel.
- `...` — manage custom walkthroughs.
- `x` — close.

### Responsive behavior

- Phone / narrow viewport: compact panel, small text and buttons, about 44% maximum viewport height by default.
- The expand control temporarily increases phone height when needed.
- Desktop / wide viewport: larger right-side panel.
- The layout reacts live to viewport/orientation changes; it does not rely on a device-name check.

## AI handoff priority

For a one-off private/project-specific fix, the preferred order is:

1. **`CWZ2`** — compressed self-contained handoff; default.
2. **`CW2`** — uncompressed Base64URL fallback when gzip decoding is unavailable.
3. **Local `.walkthrough.json` file** — preferred when the walkthrough is too large for comfortable copy/paste.
4. **`CWG1` / private GitHub blob pointer** — best-effort convenience only when signed-in private import has already been proven in that browser.

A private GitHub page being visible does not guarantee a userscript can fetch its raw private file. If `CWG1` produces a network error, do not ask the user for a PAT as the first workaround; generate a `CWZ2` code instead.

### `CWZ2` — compressed self-contained handoff

`CWZ2:` is gzip-compressed schema-v2 JSON encoded with Base64URL. The entire walkthrough travels inside the pasted code and is decoded in the browser. Pasted handoffs are temporary by default.

Generate one with:

```bash
python3 tools/ctrl-walkthrough/make_handoff.py my.walkthrough.json
```

The generator defaults to a 24-hour `handoffExpiresAt` value and performs basic secret-pattern checks.

### `CW2` — uncompressed fallback

`CW2:` is Base64URL-encoded UTF-8 schema-v2 JSON. It is larger than `CWZ2` but does not require gzip decompression.

```bash
python3 tools/ctrl-walkthrough/make_handoff.py my.walkthrough.json --format cw2
```

### `CWG1` — best-effort private GitHub pointer

Format:

```text
CWG1:OWNER/REPO@REF:path/to/walkthrough.json
```

CTRL can attempt to open the normal GitHub blob page and import through the signed-in browser session. Mobile/browser privacy, session and fetch behavior can block this even when the page itself is visible, so it is no longer the default private transport.

A normal GitHub `blob` URL can also be pasted. A blob URL ending in `#ctrl-walkthrough-import` asks CTRL to attempt the import automatically.

### Raw JSON

A complete schema-v2 JSON object can be pasted directly into the `+` box. Pasted JSON is temporary by default.

## Compression is not encryption

`CWZ2`, `CW2`, and raw JSON are transport formats, not secrecy mechanisms. Anyone who has the code can decode the instructions.

**Never include passwords, API keys, bearer tokens, SSH keys, recovery codes, cookies, private keys, or other credentials in any walkthrough code/file/URL.** Use placeholders and human gates; the user enters secrets directly into the provider or server-local secret store.

## Temporary local state

Pasted private handoffs live in Tampermonkey storage so they can survive page navigation while the walkthrough is being followed. They are removed automatically when the walkthrough finishes. AI-generated handoffs should normally also carry a short `handoffExpiresAt` value (24 hours by default).

This is browser-local walkthrough state, **not AI long-term memory**.

Local-file and public-URL imports remain persistent until the user removes them.

## Do not use timed public GitHub files for private handoffs

A public file that is deleted later is still present in Git history. Therefore a deletion timer does not make a public GitHub commit safe for personal, project-private or sensitive walkthrough content.

Public GitHub should contain only content that is safe to remain public permanently. If a walkthrough is public-safe and reusable, add it normally to the canonical manifest; otherwise use `CWZ2`, `CW2`, or a local file.

## Canonical walkthroughs

`manifest.json` is the public index. Canonical walkthroughs live under `modules/`.

Adding or editing an ordinary public walkthrough does **not** require users to reinstall the userscript. They can press **Reload walkthroughs**. Reinstall/update the script only when the engine itself changes.

## Walkthrough key

Every walkthrough has a stable key in its `id` field, for example:

```json
{
  "schemaVersion": 2,
  "id": "example-tool",
  "title": "Example Tool"
}
```

Importing another custom walkthrough with the same `id` replaces the previous custom copy on that browser.

## Other custom import paths

From `CW` -> `+` or `...`:

- **Import file** — choose a `.json` / `.walkthrough.json` file from local storage.
- **Load URL** — load a public HTTPS JSON URL that permits browser CORS.
- **Paste / code** — use `CWZ2`, `CW2`, raw JSON, `CWG1`, a GitHub blob link, or a public HTTPS URL.

Do not paste tokenized temporary raw GitHub URLs or credentials into a walkthrough handoff.

## Schema v2

Required fields:

- `schemaVersion`: `2`
- `id`: lowercase letters/numbers/hyphens, max 64 characters
- `title`: display name
- `steps`: 1-100 steps

Recommended:

- `version`
- `description`
- `handoffExpiresAt` for temporary AI-generated paste handoffs

Each step requires:

- `title`
- `body`

Supported `action.type` values:

- `none`
- `open` — HTTPS URL only
- `copy` — copy non-secret text
- `find` — search/highlight a page control

Optional `target` fields:

- `selectors`: CSS selector candidates
- `text`: visible/ARIA/title/value text candidates

Optional `success` fields:

- `urlIncludes`
- `selectors`
- `text`
- `successMessage`
- `failureMessage`

Optional `humanGate` is displayed as a warning that the named user-controlled action must not be silently automated.

See `example.walkthrough.json` for a minimal custom file.

## Safety boundary

CTRL may navigate, copy non-secret values, locate controls, scroll, highlight, check defined page state, and import declarative walkthrough data.

It should not silently accept legal terms, OAuth grants, billing, purchases, account deletion, publishing, releases, MFA, CAPTCHA, or equivalent consequential actions.

Provider interfaces change. If a locator no longer works, the walkthrough should degrade to manual navigation rather than guessing or clicking a nearby control.
