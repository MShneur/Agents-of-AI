# Agents of AI — Tools

**Last public review:** 2026-08-21  
**Status:** actively maintained supporting layer

This folder is the public tools shelf for Agents of AI: software recommendations, APIs, free/student capability notes, setup walkthroughs, and reusable infrastructure patterns that help AI workflows actually run.

It is **not an eighth AoA composable layer**. Personas, agents, workflows, techniques, modes, teams, and failures remain the seven library layers.

## Start here

| Resource | Use it for |
|---|---|
| [`software-recommendations.md`](software-recommendations.md) | Curated software choices by job: automation, research, hosting, mobile admin, testing, secrets, AI, and more |
| [`api-catalog.md`](api-catalog.md) | Public API/MCP/integration surfaces that can be wired into AI workflows |
| [`free-tool-ledger.md`](free-tool-ledger.md) | Publicly verified free/student quotas, limits, and caveats |
| [`ctrl-walkthrough/`](ctrl-walkthrough/) | Responsive Tampermonkey setup runner and reusable public walkthrough JSON |
| [`ctrl-walkthrough/AI_HANDOFF_PROTOCOL.md`](ctrl-walkthrough/AI_HANDOFF_PROTOCOL.md) | How an AI should choose public module vs `CWZ2`/`CW2` paste code vs local file vs best-effort private GitHub pointer |
| [`ctrl-walkthrough/make_handoff.py`](ctrl-walkthrough/make_handoff.py) | Deterministic gzip+Base64URL `CWZ2` / Base64URL `CW2` generator with expiry and basic secret guards |
| [`publication-safety.md`](publication-safety.md) | Privacy and publication gate for anything added under `tools/` |
| [`CHANGELOG.md`](CHANGELOG.md) | Fast-moving history for tool/API/walkthrough additions and changes |

Repository-wide history lives in [`../CHANGELOG.md`](../CHANGELOG.md), and version/snapshot rules live in [`../VERSIONING.md`](../VERSIONING.md).

## Current CTRL Walkthrough library

The public manifest currently includes setup guides for:

- Termius
- Cloudflare
- F5Bot
- Zyte
- Firecrawl → ChatGPT
- CTRL: Add AI / Private Walkthroughs

The runner also accepts custom handoffs through `CW -> +`: `CWZ2` compressed paste codes, `CW2` fallback codes, raw JSON, local walkthrough files, public HTTPS URLs, and best-effort private GitHub pointers.

For private/project-specific one-off fixes, **`CWZ2` is the default transport**. A private GitHub page being visible does not guarantee a userscript can fetch its private raw file. Large private walkthroughs should use a local file instead.

Public walkthroughs are data-only. They may contain public URLs, generic control names/selectors, non-secret values, and safety/user-gate notes. They must never contain personal account state, tokens, API keys, private hosts, private repository paths, affiliate IDs, billing details, or other private configuration.

Compression is not encryption: `CWZ2`/`CW2` must never contain credentials or secret values. Secrets are entered directly at the provider or server-local environment using placeholders/human gates in the walkthrough.

## Recommend a tool, API, or walkthrough

Community recommendations are welcome. The easiest path is the GitHub **Tool or API recommendation** issue template. A useful recommendation includes:

- tool/API name;
- official product/docs URL;
- category and the problem it solves;
- whether it is free, student, open source, trial, paid, or unknown;
- whether a card/billing setup is required, if known;
- API/MCP/webhook availability, if relevant;
- the public evidence for any quota/offer claim;
- the date the claim was checked.

A recommendation does **not** need to be complete to be useful. Unknown fields should say `unknown` rather than being guessed.

### Never include in a recommendation

- passwords, API keys, tokens, cookies, recovery codes;
- personal eligibility or student-verification details;
- private account IDs, balances, invoices, quotas, or usage history;
- private repo/project names, internal paths, IPs, hostnames, unpublished endpoints;
- affiliate IDs or private commercial terms;
- instructions for bypassing login, anti-bot, access-control, billing, or provider terms.

## How entries graduate into the public lists

1. **Candidate** — somebody proposes it with an official source.
2. **Public verification** — capability/offer is checked against provider-published information.
3. **Classification** — software recommendation, API catalog entry, free-tool ledger entry, walkthrough, or some combination.
4. **Safety check** — [`publication-safety.md`](publication-safety.md) passes.
5. **Walkthrough check** — if browser setup benefits from guidance, add/update a data-only CTRL Walkthrough module.
6. **Change log** — material additions go into [`CHANGELOG.md`](CHANGELOG.md).

## Freshness rule

Tooling changes faster than personas and workflows. Treat quota/offer claims older than **90 days** as `CHECK_AT_USE` until reverified. For an API that has no fixed free quota, the official documentation remains the authority.

## Design preference

Prefer tools that are portable, provider-neutral where possible, event-driven, and able to fail safely. Prefer hard-capped/no-card free capacity over surprise-billing trials when the capability is otherwise comparable. Do not confuse free capacity with permission to collect or republish data.
