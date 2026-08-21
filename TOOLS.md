# Tools & Workflow Infrastructure

Agents of AI is primarily a library of personas, agents, workflows, techniques, modes, teams, and failures. This file is a **supporting reference layer**, not an eighth composable layer.

The goal is simple: when a workflow needs an external service, free quota, file-transfer pattern, automation host, scraper, model endpoint, or mobile administration tool, contributors should not have to rediscover the same limits and setup mistakes from scratch.

## Start here

- [`tools/free-tool-ledger.md`](tools/free-tool-ledger.md) — publicly verifiable free/student tools and quotas.
- [`tools/publication-safety.md`](tools/publication-safety.md) — privacy and red-team gate for anything added here.
- [`tools/ctrl-walkthrough/`](tools/ctrl-walkthrough/) — public responsive Tampermonkey setup runner plus reusable data-only walkthroughs for tools in this section.
- [`workflows/large-artifact-handoff.md`](workflows/large-artifact-handoff.md) — provider-neutral pattern for moving large binary artifacts without stuffing them through an AI context window.
- [`workflows/new-ai-workspace-bootstrap.md`](workflows/new-ai-workspace-bootstrap.md) — rebuild a capable AI workspace without repeating old connector/setup mistakes.

## CTRL Walkthrough rule

When a tool in the public ledger has a setup path that can be usefully guided from a browser, prefer adding or updating a data-only walkthrough under `tools/ctrl-walkthrough/modules/` rather than publishing personal setup notes.

Walkthroughs may contain public provider URLs, public non-secret values, generic control names/selectors, and user-gate warnings. They must not contain personal information, credentials, tokens, account identifiers, private infrastructure, private repository paths, private research terms, entitlement/account state, affiliate identifiers, or billing details.

The public userscript supports local JSON imports and public HTTPS custom walkthrough URLs, so contributors can keep their own walkthroughs wherever they choose. Imported local walkthroughs are stored in that browser's Tampermonkey storage; they are not committed to this repository.

## Rules for this section

1. **Public facts only.** Every service limit, quota, student offer, or capability must come from a public provider source.
2. **Date every quota.** Free tiers change. Record `verified_on` and a source link.
3. **Do not publish account state.** No balances, entitlement dates, invoices, account IDs, private limits, usage history, or whether a specific person has claimed an offer.
4. **No secrets or private infrastructure.** No API keys, tokens, credentials, IPs, private hosts, private repo names, internal paths, environment-variable values, affiliate IDs, or unpublished endpoints.
5. **Patterns over fingerprints.** Publish reusable architecture and failure lessons, not a reconstruction of somebody's private stack.
6. **Do not invent hard caps.** "Free tier" does not automatically mean "cannot bill." Mark billing/overage risk explicitly.
7. **Prefer event-driven free capacity.** Webhooks, feeds, queues, on-demand calls, and provider reset quotas are usually better than quota-burning scheduled polling.
8. **Binary stays binary.** Large files should move through object/file transfer surfaces, not base64 inside an AI prompt unless the file is genuinely small.
9. **Walkthroughs are data, not executable plugins.** Public or custom walkthrough JSON must never be evaluated as JavaScript. Provider UI changes should fail to manual guidance rather than guessing a nearby control.

## Tool-entry shape

Use this compact shape when adding a new item:

```text
Name:
Category:
Free surface:
Reset/cap:
Hard cap?: yes | no | unknown | varies
Card required?: yes | no | unknown
Best use:
Main catch:
Official source:
Verified on: YYYY-MM-DD
Status: VERIFIED_PUBLIC | CHECK_AT_USE | RETIRED
```

If an allowance varies by model, account, region, or provider load, say so rather than publishing a guessed number.

## What belongs here

Good fits include free/student compute, queues, object storage, automation engines, public-web research tools, model APIs with free quotas, mobile SSH/admin clients, repository tooling, testing/observability, and generic upload/connector workarounds.

What does **not** belong here: private project configuration, personal account state, affiliate economics, credentials, unpublished infrastructure, or advice for bypassing access controls, anti-bot systems, provider terms, or billing safeguards.
