---
name: deal-evaluation
description: Evaluate an observed retailer offer using evidence, identity, channel context, price context, and transparent caveats.
version: 0.1.0
---

# Preconditions
Require a product/variant reference, current source-backed observation, channel/location context and source-policy state. If identity is unresolved, cap the score, prohibit exact-match wording and return `needs_review` or `insufficient_evidence`.

# Required Analysis
1. Identify exact item/variant and condition.
2. Separate source-backed offer facts from Origin judgment.
3. List unknown shipping/tax/coupon/membership/channel/condition components.
4. Name the comparison basis and its coverage.
5. Apply deterministic score caps.
6. Generate wording only from the claim ledger.
7. Return eligible / pending_validation / suppressed / needs_review.
8. Generate correction-risk checklist.

# Prohibited
Do not convert list-price difference into generic savings, call community evidence verified, generalize a local observation, use affiliate payout in score/rank, claim lowest-ever without coverage, or hide material price conditions.
