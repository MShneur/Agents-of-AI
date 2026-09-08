# Origin B06 — Ecommerce, Deal Scoring, Trust

Status: DONE / HOLD after verification.

Historical mapping: uploaded blueprint **Batch 7**.

Core rule: product identity, exact variant, retailer offer, channel/location listing, time-bound observation, deal evaluation, affiliate attribution, public claim, and correction history are separate records. No layer silently overwrites another.

Implemented:
- canonical product / variant / retailer offer / channel listing / deal evaluation / affiliate attribution / correction / claim-ledger schemas
- deal score and automatic uncertainty caps
- editorial ranking firewall against affiliate/commercial inputs
- clear-and-conspicuous disclosure gate
- user-facing taxonomy policy
- correction/retraction workflow preserving original evidence
- `product-ecommerce`, `deal-evaluation`, and `corrections` skill packages
- product/deal/correction router entries
- deterministic runtime and regression fixtures

Hard rejects retained: list price as proof of market value; title-only matching; silent variant merges; global price/inventory; affiliate payout in editorial rank; hidden disclosure; lowest-ever without defined coverage; local/community evidence generalized to retailer-wide; checkout/purchase automation.

Out of scope: live merchant integration, checkout, purchase, live affiliate redirect service, sponsored-placement delivery, live user correction endpoint, public publication.
