# Tools Change Log

Fast-moving history for `tools/`. Repository-wide changes live in [`../CHANGELOG.md`](../CHANGELOG.md).

## 2026-08-22

### Control Walkthrough v0.5.0

- Renamed the visible product surface to **Control Walkthrough** and moved the ordinary mobile UI from a bottom sheet to a compact left/right edge rail.
- Header now keeps the product name, version/guide count, route counter, menu, and minimize control on one line.
- Added smart docking away from highlighted targets so the guide is less likely to cover the field/button the user needs.
- Added persistent pending-action state across full page navigation.
- Added `action.auto: true` for safe autonomous steps and verification through `step.success` / `action.verify` before advancing.
- Added dynamic target waits using DOM observation plus bounded timeout instead of treating a still-loading SPA/mobile page as immediately missing.
- Added exact/visible locator scoring and ambiguity fail-closed behavior.
- Added `fill` for safe static field values and `fillSaved` for values held only in temporary Tampermonkey walkthrough memory. Filling never submits the form.
- Added `advanceOn` so a real user click/change/input/submit can be observed, verified, and advanced without a redundant second "I've done this" button.
- Safe auto-clicks now persist verification state before clicking, then verify the destination/result before continuing; ambiguous, disabled, consequential, or unverifiable targets stop instead of being retried blindly.
- Updated authoring rules: stable deep-link first, safe automation second, human action only when genuinely required, and verification before progression.
- Preserved v0.4 privacy rules, temporary-local secret handling, CWZ2/CW2 hardening, and human gates for consequential actions.

## 2026-08-21

### Added

- `README.md` — public landing page for software, APIs, walkthroughs, contribution, freshness and privacy rules.
- `software-recommendations.md` — curated software recommendations grouped by operational job rather than by vendor marketing category.
- `api-catalog.md` — public API/MCP/webhook/event-stream catalog for repository, cloud, research, messaging, AI, and commerce workflows.
- `free-tool-ledger.md` — public free/student capability evidence and quota notes.
- `publication-safety.md` — privacy and public-release gate for anything added under `tools/`.
- `ctrl-walkthrough/` — public responsive Tampermonkey setup runner with data-only walkthrough modules.
- Public walkthroughs for Termius, Cloudflare, F5Bot, Zyte, Firecrawl -> ChatGPT, and CTRL custom/private handoff guidance.
- Custom walkthrough import from local JSON or public HTTPS JSON.
- GitHub issue template for community tool/API/walkthrough recommendations.
- `ctrl-walkthrough/AI_HANDOFF_PROTOCOL.md` — canonical decision tree for public modules, compressed private handoffs, local files, private GitHub pointers, expiry, and secret handling.
- `ctrl-walkthrough/make_handoff.py` — stdlib generator for deterministic `CWZ2` gzip+Base64URL and `CW2` Base64URL handoff codes; defaults to a 24-hour expiry and basic secret-pattern rejection.
- `ctrl-walkthrough/modules/ctrl-custom-handoffs.json` — public in-runner walkthrough explaining when to use canonical modules, CWZ2/CW2, local files, and why secrets/timed public files are not valid handoff mechanisms.
- `ctrl-walkthrough/AUTHORING_RULES.md` — novice-first rule set: one current task, one obvious action, one short reason, direct navigation first, safe auto-click when exact, and no architecture knowledge required from the user.

### Changed

- CTRL Walkthrough moved away from a private-repository manifest model. Public-safe walkthroughs load directly from Agents of AI and require no private repository token.
- CTRL Walkthrough engine is now **v0.4.0** and uses a small **navigation-HUD** model instead of a mini application panel.
- Mobile normal mode is reduced to roughly 30% of viewport height with smaller typography. `Steps` opens the full scrollable route, `^` expands temporarily, and `-` minimizes to the tiny `CW n/N` pill.
- The normal step view shows only **NOW**, optional **Why**, one primary action, and a faint **Next** preview.
- Added safe exact-target `click` actions. Auto-click is allowed only when the walkthrough explicitly marks the action `safe: true`; failure to find the exact target stops without guessing.
- Added local `download`, `generate`, `capture`, and `copySaved` actions. Temporary generated/captured private values live only in Tampermonkey walkthrough storage and are cleared when that walkthrough ends/completes.
- Consequential actions remain user-gated: login/MFA/CAPTCHA, OAuth/legal consent, billing, purchases, final deployment/publication/deletion, and equivalent account changes.
- Added startup purge of expired temporary handoffs carrying `handoffExpiresAt`.
- Hardened CWZ2/CW2 paste handling against whitespace, zero-width characters, soft hyphens and Markdown code fences. Remaining visible invalid characters produce a clear damaged-code error and recommend file import rather than guessing.
- Added a standing authoring rule that helper scripts/files appear only when the user actually needs them, not as early architecture/setup homework.
- **Handoff priority changed after live mobile validation:** `CWZ2` is the default for private/project-specific one-off walkthroughs; `CW2` is the fallback; local file import is preferred for oversized handoffs; `CWG1` is best-effort only because a signed-in private GitHub page does not guarantee userscript/raw fetch access.
- Private handoffs loaded from code/JSON are temporary by default and survive navigation while active.
- Timed deletion from a public Git repository is explicitly **not** a privacy mechanism. Public modules must be safe to remain public permanently because deleted committed content remains in Git history.
- `TOOLS.md` remains the routing page into the dedicated `tools/` documentation set.

### Safety boundary

- No personal account state, credentials, tokens, private infrastructure, private repository paths, private research terms, affiliate IDs, or billing details belong in public walkthroughs or catalogs.
- `CWZ2`/`CW2` are compression/encoding transports, **not encryption**. Never put credentials or secret values in them.
- Tampermonkey temporary private-value storage is convenience storage, not an encrypted password manager; long-term secrets belong in provider/server secret stores.
- Private GitHub imports use the user's existing GitHub web session when supported; CTRL does not require or persist a GitHub PAT for that flow.
- Do not distribute temporary signed raw-GitHub URLs as walkthrough codes.
- Quotas and free/student offers must carry an official source and verification date; stale claims are rechecked rather than repeated from memory.

## Maintenance

When a tool/API/walkthrough is materially added, removed, retired, or changes access model, update this file. Tiny wording corrections do not need a log entry.