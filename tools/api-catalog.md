# API and Integration Catalog

**Public review date:** 2026-08-21

This catalog lists public API, MCP, webhook, event-stream, or protocol surfaces that are useful when building AI workflows. It is a discovery index, not a guarantee of free capacity or universal access.

For free/student quotas and plan caveats, see [`free-tool-ledger.md`](free-tool-ledger.md). For recommended software by job, see [`software-recommendations.md`](software-recommendations.md).

Never place API keys, OAuth tokens, cookies, private hostnames, account IDs, or private endpoints in this file.

## Repository and developer platforms

| Surface | Interface | Typical auth | Good for | Access note | Official docs |
|---|---|---|---|---|---|
| **GitHub REST API** | HTTPS REST | PAT, GitHub App, OAuth | Repos, files, commits, issues, PRs, releases, checks | Public data can be read anonymously at lower limits; writes require scoped auth | https://docs.github.com/en/rest |
| **GitHub GraphQL API** | GraphQL | PAT, GitHub App, OAuth | Efficient repo/issue/PR relationship queries | Rate/cost model differs from REST | https://docs.github.com/en/graphql |
| **GitHub Webhooks** | HTTPS event delivery | Webhook secret for verification | Event-driven repo automation without polling | Receiver must validate signatures | https://docs.github.com/en/webhooks |

## Edge, queues, storage, and backends

| Surface | Interface | Typical auth | Good for | Access note | Official docs |
|---|---|---|---|---|---|
| **Cloudflare API** | HTTPS REST | API token | Manage Workers, DNS, R2, Queues and other Cloudflare resources | Use narrowly scoped tokens; product billing rules vary | https://developers.cloudflare.com/api/ |
| **Cloudflare Workers** | HTTP runtime + bindings | Provider/project auth for deploy; app-specific auth at runtime | Webhooks, APIs, routing, lightweight transforms | Runtime limits depend on plan | https://developers.cloudflare.com/workers/ |
| **Cloudflare R2 S3 API** | S3-compatible object API | R2 access keys | Binary/object upload, staging and retrieval | Keep object credentials out of browser/chat logs | https://developers.cloudflare.com/r2/api/s3/ |
| **Cloudflare Queues** | Queue producer/consumer bindings + management API | Cloudflare auth | Event fan-out, retries, decoupling ingress from workers | Queue messages should carry pointers/metadata rather than large binaries | https://developers.cloudflare.com/queues/ |
| **Cloudflare Workers AI** | REST/runtime bindings | Cloudflare auth | Model inference close to Workers pipelines | Model catalog and free allocation change | https://developers.cloudflare.com/workers-ai/ |
| **Supabase Data API** | PostgREST-style REST | Project key/JWT | CRUD over Postgres tables/views | Row Level Security is part of the security model, not optional decoration | https://supabase.com/docs/guides/api |
| **Supabase Realtime** | WebSocket | Project key/JWT | Database changes, broadcast and presence | Design subscriptions around RLS and connection limits | https://supabase.com/docs/guides/realtime |
| **Supabase Edge Functions** | HTTPS functions | Project/app auth as designed | Webhooks and server-side logic near Supabase data | Verify current free execution limits | https://supabase.com/docs/guides/functions |
| **Inngest Events/API** | HTTP events + SDKs | Signing/event keys | Durable event-driven functions, retries, scheduled/delayed work | Hosted quotas vary by plan | https://www.inngest.com/docs |
| **Upstash QStash API** | HTTPS REST | QStash token | Queue, delay and retry HTTP calls | Keep message payloads small and secrets server-side | https://upstash.com/docs/qstash |
| **Composio API/SDK** | API/SDK + connectors | Composio/app auth + connected-app OAuth | Give agents access to many third-party tools | Audit every requested permission and third-party plan requirement | https://docs.composio.dev/ |

## Web research and extraction

| Surface | Interface | Typical auth | Good for | Access note | Official docs |
|---|---|---|---|---|---|
| **Firecrawl REST API** | HTTPS REST | API key | Search, scrape, crawl, map and structured extraction | Public-web extraction is not permission to bypass protected sources | https://docs.firecrawl.dev/api-reference/introduction |
| **Firecrawl MCP** | MCP over hosted endpoint | Keyless limited surface, OAuth, or client-stored bearer auth depending on mode | Let MCP-capable AI clients call Firecrawl tools | Never put an API key in a URL | https://docs.firecrawl.dev/mcp-server |
| **Apify API** | HTTPS REST | API token | Run Actors, datasets, key-value stores and schedules | Actor-specific cost/source rules vary | https://docs.apify.com/api/v2 |
| **Zyte API** | HTTPS API | API key | Browser/extraction requests for permitted web sources | Commercial/service terms and source rights still apply | https://docs.zyte.com/zyte-api/ |
| **Scrapy Cloud API** | HTTPS API/CLI | API key | Deploy/run/manage Scrapy jobs | Student offers do not remove source-compliance obligations | https://docs.zyte.com/scrapy-cloud/ |
| **Bluesky AT Protocol** | HTTP/XRPC | Public or account auth depending on endpoint | Public social data, posts, identities and app integrations | Follow ATProto/Bluesky service rules | https://atproto.com/ |
| **Bluesky Jetstream** | WebSocket event stream | Public endpoint/service-specific | Live public-post/event monitoring | Build filters and backpressure; do not assume the stream is an archive | https://github.com/bluesky-social/jetstream |
| **Mastodon REST API** | HTTPS REST | Public or OAuth depending on instance/endpoint | Hashtags, timelines, statuses and account integrations | Instance policies and auth requirements differ | https://docs.joinmastodon.org/api/ |
| **RSS/Atom** | XML feed protocol | Usually none | Event-driven monitoring of feeds without scraping pages repeatedly | Prefer official feeds where available | https://www.rssboard.org/rss-specification |

## Messaging and notifications

| Surface | Interface | Typical auth | Good for | Access note | Official docs |
|---|---|---|---|---|---|
| **Telegram Bot API** | HTTPS REST-like bot API | Bot token | Mobile notifications, commands and simple bot interactions | Bot token is a secret; never commit it | https://core.telegram.org/bots/api |
| **ntfy HTTP API** | HTTP publish/subscribe | Optional auth depending on server/topic | Very simple push notifications and event inboxes | Public topics are public; use auth/private deployment for sensitive events | https://docs.ntfy.sh/publish/ |
| **Gotify API** | HTTP/WebSocket | Application/client tokens | Self-hosted Android-focused push | Keep server and tokens private when used for internal alerts | https://gotify.net/docs/ |

## AI model APIs

| Surface | Interface | Typical auth | Good for | Access note | Official docs |
|---|---|---|---|---|---|
| **Groq API** | OpenAI-compatible-style HTTPS API | API key | Fast text/model inference | Free limits are model/account specific | https://console.groq.com/docs/overview |
| **Gemini API** | HTTPS/SDK | API key or Google project auth | Multimodal, long-context and structured generation | Free quotas/data-use terms vary by model/project | https://ai.google.dev/gemini-api/docs |
| **OpenRouter API** | OpenAI-compatible HTTPS API | API key | Route across many model providers | A model's price/free status can change; check before every free-only dependency | https://openrouter.ai/docs |
| **Hugging Face Inference** | HTTPS/SDK | HF token | Open-model inference and model experimentation | Availability/pricing depends on model/provider | https://huggingface.co/docs/inference-providers |
| **Cloudflare Workers AI API** | REST/runtime binding | Cloudflare auth | Inference inside edge/event pipelines | See current catalog and plan limits | https://developers.cloudflare.com/workers-ai/ |
| **Cerebras Inference API** | HTTPS/SDK | API key | High-speed model inference | Model availability and quotas should be checked live | https://inference-docs.cerebras.ai/ |

## Commerce and affiliate APIs

These surfaces commonly require publisher/partner approval. Listing them here does not imply acceptance, public access, or permission to reuse merchant data beyond the provider agreement.

| Surface | Interface | Typical auth | Good for | Access note | Official |
|---|---|---|---|---|---|
| **Sovrn Commerce APIs** | HTTPS APIs/data services | Publisher/API credentials | Affiliate links, merchant/price/commerce data where approved | Approval and contract terms apply | https://www.sovrn.com/commerce/ |
| **Skimlinks publisher/data tools** | Publisher integrations/APIs | Publisher credentials | Aggregated affiliate monetization and commerce data tools | Availability depends on publisher approval/product | https://www.skimlinks.com/ |
| **impact.com APIs** | HTTPS APIs | Partner/account credentials | Partner programs, reporting and integrations | Partner/brand permissions and commercial terms apply | https://integrations.impact.com/ |

## Contribution checklist for a new API

A useful API recommendation should include: official documentation, interface type, authentication model, whether anonymous/public access exists, free/student/open-source status if publicly verifiable, primary use case, major limitations, and `Verified on: YYYY-MM-DD` for time-sensitive claims.

If an API requires secrets, document **where a secret belongs**, never the secret itself.