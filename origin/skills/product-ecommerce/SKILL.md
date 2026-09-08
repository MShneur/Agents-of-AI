---
name: product-ecommerce
description: Model products, variants, retailer offers, channels and taxonomy with explicit identity and time-bound-state separation.
version: 0.1.0
---

# Domain graph
Product → Variant → Retailer Offer → Channel Listing → Observation → Evidence / Deal Evaluation / Alert / Attribution.

Product identity is not price. Offer identity is not current availability. Store-local state is not global inventory.

Use identifiers first (GTIN/UPC/EAN/MPN/manufacturer model), then variant attributes. Title-only matching never auto-merges ambiguous variants. Retailer categories remain source metadata until a facet passes the user-decision taxonomy rules.
