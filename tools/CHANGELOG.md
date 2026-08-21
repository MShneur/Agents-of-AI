# Tools Change Log

Fast-moving history for `tools/`. Repository-wide changes live in [`../CHANGELOG.md`](../CHANGELOG.md).

## 2026-08-21

### Added

- `README.md` — public landing page for software, APIs, walkthroughs, contribution, freshness and privacy rules.
- `software-recommendations.md` — curated software recommendations grouped by operational job rather than by vendor marketing category.
- `api-catalog.md` — public API/MCP/webhook/event-stream catalog for repository, cloud, research, messaging, AI, and commerce workflows.
- `free-tool-ledger.md` — public free/student capability evidence and quota notes.
- `publication-safety.md` — privacy and public-release gate for tools content.
- `ctrl-walkthrough/` — public responsive Tampermonkey setup runner with data-only walkthrough modules.
- Public walkthroughs for Termius, Cloudflare, F5Bot, Zyte, and Firecrawl -> ChatGPT.
- Custom walkthrough import from local JSON or public HTTPS JSON.
- GitHub issue template for community tool/API/walkthrough recommendations.

### Changed

- CTRL Walkthrough moved away from a private-repository manifest model. Public-safe walkthroughs load directly from Agents of AI and require no private repository token.
- CTRL Walkthrough engine is now **v0.3.0**. The visible `+` button opens a compact Add Walkthrough surface rather than forcing a file picker.
- Added AI-to-browser handoff formats: `CWG1` private GitHub pointers, `CWZ2` compressed self-contained handoffs, `CW2` Base64URL handoffs, and direct pasted schema-v2 JSON.
- A `CWG1` or normal GitHub blob link can open a private repository file in the user's normal signed-in GitHub session and import it into Tampermonkey without asking the user to paste a Personal Access Token into CTRL.
- GitHub file links ending in `#ctrl-walkthrough-import` can trigger the same signed-in import automatically when the page opens.
- Private handoffs loaded from GitHub/code/JSON are temporary by default: they persist across navigation while the walkthrough is active and are automatically removed after completion.
- File and public-URL custom imports remain persistent until manually removed.
- Mobile UI remains compact/dynamic; desktop retains the larger docked view.
- Walkthroughs can identify/highlight expected page controls and check defined page states while leaving login, MFA, CAPTCHA, billing, terms acceptance, and other consequential interactions to the user.
- `TOOLS.md` is the routing page into the dedicated `tools/` documentation set.

### Safety boundary

- No personal account state, credentials, tokens, private infrastructure, private repository paths, private research terms, affiliate IDs, or billing details belong in public walkthroughs or catalogs.
- Private GitHub imports use the user's existing GitHub web session; CTRL does not require or persist a GitHub PAT for that flow.
- Do not distribute temporary signed raw-GitHub URLs as walkthrough codes.
- Quotas and free/student offers must carry an official source and verification date; stale claims are rechecked rather than repeated from memory.

## Maintenance

When a tool/API/walkthrough is materially added, removed, retired, or changes access model, update this file. Tiny wording corrections do not need a log entry.
