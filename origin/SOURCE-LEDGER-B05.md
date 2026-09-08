# B05 Source Ledger — Source Extraction / Evidence / Monitoring

Historical blueprint source: uploaded `origin .md`, historical **Batch 6**. Clean implementation sequence: **B05**.

Current upstream snapshots checked 2026-09-07:
- `D4Vinci/Scrapling` `28c329671485daaea89a40fb34a7db8622e51468`
- `dgtlmoon/changedetection.io` `0f4b556af0416ea99aa7954ae4adac75d2ea3f50`
- `unclecode/crawl4ai` `862f6bccb9c063f49b9d42701baa0eea17a4993f`
- `browser-use/browser-use` `2b1f9d377999a59fe7627c1a5aa88c12aa42e11f`
- `scrapinghub/extruct` `a31daaadb82ec684b7d468d3b15734b8ae3b7265`
- Schema.org `Product` / `Offer`, current vocabulary snapshot v30.0 (2026-03-19)
- Google Merchant product guidance checked 2026-09-07; current docs expose title, price, availability, condition, GTIN and regional inventory concepts.

## Clean-room extraction boundary
No upstream implementation code, prompts, or branding are vendored. Origin independently implements behavioral contracts extracted from public documentation/source history.

## Upstream capability we intentionally do NOT inherit
- Scrapling: anti-bot/Cloudflare solving, proxy-evasion style behavior, credential/cookie use.
- changedetection.io: login/browser-step workflows, authenticated monitoring, proxy-driven access.
- Crawl4AI: persistent authenticated profiles, stealth/proxy mechanisms, broad browser control.
- Browser Use: form submission, account/session automation, CAPTCHA-oriented cloud behavior, arbitrary external actions.

Origin keeps only policy-compliant public acquisition, structured extraction, bounded read-only browser fallback, snapshot/replay, semantic change detection, and reliability patterns.
