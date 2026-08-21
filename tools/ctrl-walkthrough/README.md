# CTRL Walkthrough

CTRL Walkthrough is a public, mobile-first Tampermonkey userscript for guided installation and setup of tools listed in Agents of AI.

Current engine: **v0.3.0**.

## Privacy model

This folder is public. Nothing here may contain personal information, credentials, tokens, API keys, private hostnames/IPs, private repository paths, account identifiers, private research terms, billing details, entitlement state, or other user-specific configuration.

Walkthrough files are **declarative JSON only**. The userscript never evaluates JavaScript from a walkthrough.

Private/project-specific walkthroughs can remain in a private repository. CTRL v0.3.0 can import them through the user's normal signed-in GitHub browser session or through a self-contained handoff code. It does **not** require a Personal Access Token to be pasted into CTRL.

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

## AI handoff codes

The `+` box accepts several formats.

### `CWG1` — signed-in GitHub pointer

Format:

```text
CWG1:OWNER/REPO@REF:path/to/walkthrough.json
```

This is the preferred short code for a walkthrough that already lives in a private GitHub repository.

Flow:

1. paste the `CWG1` line into `CW` -> `+`;
2. CTRL opens the matching normal `github.com/.../blob/...` page;
3. if GitHub requires login, the user signs in normally;
4. on that GitHub page, CTRL attempts to read the file through the user's existing GitHub web session;
5. the validated walkthrough is copied into Tampermonkey storage as a **temporary** custom walkthrough;
6. no GitHub PAT/token is stored by CTRL;
7. after the walkthrough is completed, the temporary copy is automatically removed.

A normal GitHub `blob` URL can be pasted instead of the `CWG1` form.

A one-click GitHub link can also append:

```text
#ctrl-walkthrough-import
```

When that file page opens, CTRL attempts the same signed-in import automatically.

### `CWZ2` — compressed self-contained handoff

`CWZ2:` is a gzip + Base64URL encoded schema-v2 walkthrough. It is useful when a private repository session is unavailable. The entire walkthrough travels inside the pasted code and is decoded only in the browser. It is temporary by default.

### `CW2` — uncompressed self-contained handoff

`CW2:` is Base64URL encoded UTF-8 JSON. It is larger than `CWZ2` but requires no gzip decoder.

### Raw JSON

A complete schema-v2 JSON object can be pasted directly into the `+` box. Pasted JSON is temporary by default.

## Temporary private memory

Private handoffs loaded through `CWG1`, `CWZ2`, `CW2`, or pasted JSON are stored in Tampermonkey so they survive navigation and can resume across pages. They are marked temporary and removed automatically when the walkthrough finishes.

Local-file and public-URL imports are persistent until the user removes them.

This provides a practical split:

- public reusable setup knowledge -> Agents of AI;
- private/project-specific recovery instructions -> the user's private repository;
- current temporary instructions -> Tampermonkey storage while the walkthrough is active.

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
- **Paste / code** — use `CWG1`, `CWZ2`, `CW2`, raw JSON, a GitHub blob link, or a public HTTPS URL.

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
