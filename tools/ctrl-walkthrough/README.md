# CTRL Walkthrough

CTRL Walkthrough is a public, mobile-first Tampermonkey userscript for guided installation and setup of tools listed in Agents of AI.

## Privacy model

This folder is public. Nothing here may contain personal information, credentials, tokens, API keys, private hostnames/IPs, private repository paths, account identifiers, private research terms, billing details, entitlement state, or other user-specific configuration.

Walkthrough files are **declarative JSON only**. The userscript never evaluates JavaScript from a walkthrough.

Personal values entered while following a walkthrough stay on the provider page. Custom walkthroughs imported from a local JSON file are stored only in Tampermonkey storage on that browser. A remote custom walkthrough is fetched only from the public HTTPS URL the user chooses.

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

### Responsive behavior

- Phone / narrow viewport: compact panel, small text and buttons, about 44% maximum viewport height by default.
- The `↕` control temporarily expands the phone panel when more room is needed.
- Desktop / wide viewport: larger right-side panel.
- The layout reacts live to viewport/orientation changes; it does not rely on a device-name check.

## Canonical walkthroughs

`manifest.json` is the public index. Canonical walkthroughs live under `modules/`.

Adding or editing an ordinary walkthrough does **not** require users to reinstall the userscript. They can press **Reload walkthroughs**. Reinstall/update the script only when the engine itself changes.

## Walkthrough key

Every walkthrough has a stable public key in its `id` field, for example:

```json
{
  "schemaVersion": 2,
  "id": "example-tool",
  "title": "Example Tool"
}
```

Importing another custom walkthrough with the same `id` replaces the previous custom copy on that browser. This makes the `id` the walkthrough key.

## Custom walkthroughs

Open `CW` -> `⋮`.

Two paths are supported:

- **Import JSON file**: choose a `.json` walkthrough from local device storage. This is the most private and reliable custom path.
- **Load from URL**: enter a public HTTPS JSON URL. The host must permit browser CORS. If it does not, download the JSON and import the file instead.

A custom walkthrough may live in any repository or website that can serve the JSON over HTTPS with CORS. It does not need to be part of Agents of AI.

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

CTRL may navigate, copy public non-secret values, locate controls, scroll, highlight, and check defined page state. It should not silently accept legal terms, OAuth grants, billing, purchases, account deletion, publishing, releases, MFA, CAPTCHA, or equivalent consequential actions.

Provider interfaces change. If a locator no longer works, the walkthrough should degrade to manual navigation rather than guessing or clicking a nearby control.
