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
- Public walkthroughs for Termius, Cloudflare, F5Bot, Zyte, and Firecrawl → ChatGPT.
- Custom walkthrough import from local JSON or public HTTPS JSON.
- GitHub issue template for community tool/API/walkthrough recommendations.

### Changed

- CTRL Walkthrough moved away from a private-repository manifest model. Public-safe walkthroughs now load directly from Agents of AI and require no private repository token.
- CTRL Walkthrough engine bumped to **v0.2.2** with a visible **`+` custom-walkthrough button** in the header. `+` opens the local JSON file picker directly; `⋮` remains the management surface for local/URL custom walkthroughs.
- Private or project-specific walkthroughs can now use a clean download-then-import flow without embedding private repository credentials in the public userscript.
- Mobile UI was reduced to a compact dynamic panel; desktop retains a larger docked view.
- Walkthroughs can identify/highlight expected page controls and check defined page states while leaving login, MFA, CAPTCHA, billing, terms acceptance, and other consequential interactions to the user.
- `TOOLS.md` is now a routing page into the dedicated `tools/` documentation set.

### Safety boundary

- No personal account state, credentials, tokens, private infrastructure, private repository paths, private research terms, affiliate IDs, or billing details belong in public walkthroughs or catalogs.
- Quotas and free/student offers must carry an official source and verification date; stale claims are rechecked rather than repeated from memory.

## Maintenance

When a tool/API/walkthrough is materially added, removed, retired, or changes access model, update this file. Tiny wording corrections do not need a log entry.
