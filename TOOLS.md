# Tools & Workflow Infrastructure

Agents of AI is primarily a library of personas, agents, workflows, techniques, modes, teams, and failures. This file is a **supporting reference layer**, not an eighth composable layer.

The goal is simple: when a workflow needs an external service, free quota, file-transfer pattern, automation host, scraper, model endpoint, or mobile administration tool, contributors should not have to rediscover the same limits and setup mistakes from scratch.

## Start here

- [`tools/free-tool-ledger.md`](tools/free-tool-ledger.md) — publicly verifiable free/student tools and quotas.
- [`tools/publication-safety.md`](tools/publication-safety.md) — privacy and red-team gate for anything added here.
- [`workflows/large-artifact-handoff.md`](workflows/large-artifact-handoff.md) — provider-neutral pattern for moving large binary artifacts without stuffing them through an AI context window.
- [`workflows/new-ai-workspace-bootstrap.md`](workflows/new-ai-workspace-bootstrap.md) — rebuild a capable AI workspace without repeating old connector/setup mistakes.

## Rules for this section

1. **Public facts only.** Every service limit, quota, student offer, or capability must come from a public provider source.
2. **Date every quota.** Free tiers change. Record `verified_on` and a source link.
3. **Do not publish account state.** No balances, entitlement dates, invoices, account IDs, private limits, usage history, or whether a specific person has claimed an offer.
4. **No secrets or private infrastructure.** No API keys, tokens, credentials, IPs, private hosts, private repo names, internal paths, environment-variable values, affiliate IDs, or unpublished endpoints.
5. **Patterns over fingerprints.** Publish reusable architecture and failure lessons, not a reconstruction of somebody's private stack.
6. **Do not invent hard caps.** "Free tier" does not automatically mean "cannot bill." Mark billing/overage risk explicitly.
7. **Prefer event-driven free capacity.** Webhooks, feeds, queues, on-demand calls, and provider reset quotas are usually better than quota-burning scheduled polling.
8. **Binary stays binary.** Large files should move through object/file transfer surfaces, not base64 inside an AI prompt unless the file is genuinely small.

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
