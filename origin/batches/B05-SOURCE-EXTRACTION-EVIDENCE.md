# Origin B05 — Source Extraction, Evidence, Monitoring

Status: DONE / HOLD

Historical mapping: this is the uploaded blueprint's **Batch 6**. The source's governing rule is preserved: Origin does not merely “scrape websites”; it admits a source, chooses the least-privileged deterministic extraction route, stores evidence, validates fields and identity, assesses freshness, and gates publication.

## Implemented
- source admission and source registry contract
- deterministic-first extraction hierarchy
- immutable source snapshot + evidence record
- field-level provenance/confidence/parser version
- offer observation + freshness state
- bounded scraper job contract with concurrency/retry/DLQ/circuit-breaker requirements
- semantic change/price-restock event model and dedupe
- prompt-injection quarantine for all retrieved source content
- `source-extraction`, `evidence-research`, `change-monitoring` skill packages
- configuration router entries for extraction/research/monitoring
- golden parser fixtures and deterministic runtime tests

## Hard rejects retained
CAPTCHA/anti-bot bypass; login-wall/access-control bypass; unauthorized sessions or credentials; proxy evasion; unbounded crawling; browser-first extraction where structured data is available; title-only cross-source identity; LLM as price/stock authority; publication without timestamped snapshot; stale data presented as current.

## Verification boundary
This batch proves contracts and offline parser/replay behavior. It does not activate a retailer, fetch production pages, run a live browser, schedule repeated jobs, or publish claims.
