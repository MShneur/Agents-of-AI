# Free Tool Ledger

Public, reusable free/student capability notes for Agents of AI workflows.

**Privacy rule:** this ledger records provider-published facts only. It never records whether a specific person has an account, what they have claimed, what they have spent, their private quota, or their infrastructure.

**Freshness rule:** quota facts should be rechecked before a production dependency is created. Entries older than 90 days should be treated as `CHECK_AT_USE` until reverified.

## Infrastructure, automation, and file movement

### Cloudflare Workers

- Category: serverless ingress / lightweight control plane
- Free surface: 100,000 requests/day; 10 ms CPU time per invocation; 128 MB memory; 50 subrequests/request.
- Upload-relevant limit: Cloudflare Free accounts have a 100 MB maximum request body.
- Best use: authentication, routing, signed-upload issuance, metadata validation, small webhooks.
- Do not use for: CPU-heavy archive expansion or hundreds of downstream API calls in one free invocation.
- Hard cap?: plan-dependent; do not infer billing safety from the word "free".
- Official source: https://developers.cloudflare.com/workers/platform/limits/
- Verified on: 2026-08-21
- Status: VERIFIED_PUBLIC

### Cloudflare R2 Standard

- Category: object storage
- Free surface: 10 GB-month storage/month; 1 million Class A operations/month; 10 million Class B operations/month; egress is free.
- Best use: direct binary uploads, temporary large-artifact staging, durable object handoff.
- Main catch: free allowance is not the same thing as a universal hard billing cap; account/product billing state still matters.
- Official source: https://developers.cloudflare.com/r2/pricing/
- Verified on: 2026-08-21
- Status: VERIFIED_PUBLIC

### Cloudflare Queues

- Category: event queue
- Free surface: 10,000 operations/day included.
- Message limit: 128 KB/message.
- Free retention: 24 hours.
- Best use: queue **pointers and metadata**, not the binary object itself.
- Official sources:
  - https://developers.cloudflare.com/queues/platform/pricing/
  - https://developers.cloudflare.com/queues/platform/limits/
- Verified on: 2026-08-21
- Status: VERIFIED_PUBLIC

### Activepieces Cloud Free

- Category: visual automation / MCP / API workflows
- Free surface: free forever, no card, daily-reset credits, unlimited flows, API access.
- Overage behavior: hard cap on the Free plan; runs beyond the quota wait for the next refresh.
- Important precision: the public pricing page describes daily credits but does not publish one stable universal credit count. Do not invent one.
- Best use: lightweight mobile-friendly automations and experiments where a hard free stop is desirable.
- Official source: https://www.activepieces.com/pricing
- Verified on: 2026-08-21
- Status: VERIFIED_PUBLIC

### Activepieces Community Edition

- Category: self-hosted automation
- Free surface: open-source community core; the provider states no cap on runs, users, or flows for self-hosting.
- Main catch: cloud/team/admin features are not identical to Community Edition. Check the current feature table before assuming parity.
- Official source: https://www.activepieces.com/pricing
- Verified on: 2026-08-21
- Status: VERIFIED_PUBLIC

### Windmill Free and Open Source

- Category: self-hosted scripts, jobs, flows, endpoints
- Free surface: unlimited executions; 3 workspaces; up to 50 users; 10 GiB workspace object storage; Git sync up to 2 users; public pricing currently lists up to 100 email triggers/day.
- Best use: code-first internal automation, jobs, APIs, and event-driven orchestration.
- Main catch: several enterprise observability/security/integration features are excluded from the free edition.
- Official source: https://www.windmill.dev/pricing
- Verified on: 2026-08-21
- Status: VERIFIED_PUBLIC

## Free AI / secondary-review capacity

### OpenRouter Free

- Category: multi-provider model router
- Free surface: 25+ free models listed on the Free plan; 50 requests/day on the free account tier.
- Best use: low-volume independent second opinions, model diversity, development experiments.
- Main catch: free model availability changes and upstream providers can rate-limit independently. Recheck the free model catalog before depending on a specific model.
- Free-only rule: do not build a supposedly free workflow around a paid-credit top-up path.
- Official sources:
  - https://openrouter.ai/pricing
  - https://openrouter.ai/collections/free-models
- Verified on: 2026-08-21
- Status: VERIFIED_PUBLIC

### Groq Free Plan

- Category: fast model inference API
- Free surface: model-specific RPM/RPD/TPM/TPD limits published by Groq.
- Example as of verification: several current text models, including `openai/gpt-oss-120b`, `openai/gpt-oss-20b`, and `qwen/qwen3.6-27b`, list 1,000 requests/day, 8,000 tokens/minute, and 200,000 tokens/day on the Free Plan.
- Best use: fast bounded secondary review and structured extraction.
- Main catch: limits are per model and may vary by organization; use the provider's live limits page as authority.
- Official source: https://console.groq.com/docs/rate-limits
- Verified on: 2026-08-21
- Status: VERIFIED_PUBLIC

### Gemini API Free Tier

- Category: model API / multimodal research and review
- Free surface: free-tier rate limits exist, but exact RPM/TPM/RPD values vary by model/project and should be read from the live AI Studio limits surface.
- Reset fact: requests-per-day quotas reset at midnight Pacific time.
- Best use: secondary model review, multimodal extraction, research experiments.
- Main catch: never copy a remembered quota from another model or project.
- Official source: https://ai.google.dev/gemini-api/docs/rate-limits
- Verified on: 2026-08-21
- Status: CHECK_AT_USE

## Student / education capability

### Termius via GitHub Student Developer Pack

- Category: mobile/desktop SSH and remote administration
- Public student offer: GitHub Education currently lists free access to all Termius Pro and Termius Team features while eligible as a student.
- Best use: mobile SSH/SFTP administration for self-hosted infrastructure.
- Privacy rule: publish the offer only; never publish a person's eligibility, claim date, school, account, or entitlement expiration.
- Official source: https://education.github.com/pack/
- Verified on: 2026-08-21
- Status: VERIFIED_PUBLIC

## GitHub large-file facts that affect workflows

### Normal Git repository objects

- GitHub recommends a maximum single object around 1 MB for repository performance and enforces a 100 MB single-object limit.
- Push size is enforced at 2 GB.
- Best practice: do not turn a large ZIP into base64 and push it through an AI/MCP chat channel. Move binary through a file/object lane, then commit appropriate repository artifacts in bounded batches.
- Official source: https://docs.github.com/en/repositories/creating-and-managing-repositories/repository-limits
- Verified on: 2026-08-21
- Status: VERIFIED_PUBLIC

### Git LFS

- GitHub Free currently allows individual Git LFS files up to 2 GB.
- LFS stores a pointer in Git while the large object is stored separately.
- Main catch: LFS has its own storage/bandwidth/account rules; verify those before choosing it over external object storage.
- Official source: https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-git-large-file-storage
- Verified on: 2026-08-21
- Status: VERIFIED_PUBLIC

## Additions wanted

Good future entries include:

- additional no-card / hard-capped automation services;
- verified student developer tools;
- model APIs with replenishing free quotas;
- scraping/research services with legitimate public/API access;
- testing and observability student plans;
- public social/feed APIs;
- free object/queue/serverless surfaces;
- mobile admin tools;
- repository tooling that reduces dependence on hosted CI minutes.

Every addition must pass [`publication-safety.md`](publication-safety.md) before it lands here.
