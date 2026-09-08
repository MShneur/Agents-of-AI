# B06 Source Ledger — Ecommerce / Deal Evaluation / Trust

Historical blueprint source: uploaded `origin .md`, historical **Batch 7**. Clean implementation sequence: **B06**.

Current upstream/reference snapshots checked 2026-09-07:
- `medusajs/medusa` `94567d12270c11e88a22aa4898075f3a3b746440` — public README currently describes open-core modular commerce building blocks; core modules are MIT while identified Enterprise Edition material is separately licensed.
- `saleor/saleor` `0a8ebb54338192b71a92c12035be8cf3cffc7f8a` — public README currently describes GraphQL-native, API-only, native-multichannel commerce with per-channel pricing/currency/stock/product controls.
- Schema.org `Product` / `Offer` vocabulary, checked 2026-09-07.
- Google Merchant Center product data specification, including 2026 update, checked 2026-09-07.
- FTC Endorsement Guides / 16 CFR Part 255, current eCFR checked 2026-09-07 (eCFR content displayed as up to date through 2026-09-03).

## Clean-room extraction boundary
No Medusa, Saleor, Google, Schema.org or FTC implementation code is vendored. Origin independently implements its own schemas, gates and evaluator. Upstream projects and public standards are used for architectural/data-contract ideas and compliance constraints.

## Scope boundary
Origin is retail intelligence and deal discovery. This batch does **not** add merchant-of-record, cart, checkout, payments, tax calculation, order lifecycle, fulfillment, returns, inventory ownership, or automated buying.
