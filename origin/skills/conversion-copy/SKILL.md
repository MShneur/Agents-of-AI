---
name: conversion-copy
description: Create or revise evidence-bounded conversion copy for a page with one primary visitor action.
version: 0.1.0
---

# Objective
Write clear, specific page copy that advances one defined action without inventing proof.

# Required Context
Load product-marketing, brand-voice, proof-inventory, forbidden-claims, and task page context. If decision-critical input is missing, return `missing_inputs`.

# Evidence Rules
Factual claims must map to the claim ledger. Never invent statistics, testimonials, scarcity, urgency, guarantees, or competitor claims.

# Method
1. State the page promise.
2. Identify primary user discomfort.
3. Identify desired outcome.
4. Identify available proof.
5. Draft headline, subheadline, CTA, proof block, benefits, objection section, final CTA.
6. Build claim ledger.
7. Produce at least two headline/CTA alternatives.
8. Produce a discriminating test hypothesis.

# Draft Rules
Specific > vague. Clear > clever. Customer language > company language.

# Mandatory Dissent Pass
Before a material recommendation, use 3–5 relevant persona lenses. Each objection must state the rejection, failure mechanism, reversal evidence, smallest test, kill criterion, residual risk, and classification. Preserve unresolved dissent.

# Handoff Rules
Do not silently perform another skill. Emit a schema-valid handoff object.

# Reasoning Privacy
Do not output private chain-of-thought. Return concise rationale, evidence, risks, tests, and decisions.
