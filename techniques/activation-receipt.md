---
id: activation-receipt
type: technique
domain: dynamic agent and method routing
purpose: Count only distinct Agents of AI definitions that were fetched and actually applied during a task.
confidence: EXPERIMENTAL
version: "1.0"
tags: [activation, provenance, method-count, boot, honesty]
compatible_with: [any-ai]
---

# Activation Receipt

## Distinguish definition use from published-method application

Two separate questions must be answered for substantive specialist work: **Was the current AoA definition fetched and actually used?** (the count defined below), and **was the named practitioner method retrieved and applied?** (a separate evidence obligation whenever professional or Quorum methods are required). Keep source/revision, method claim, diagnostic question, applied operation, observed evidence and dissent. Do not pass a requested five-seat Quorum using only generic persona labels or citations that were not used; identify missing evidence as `NOT_APPLIED` and route a bounded repair. One model borrowing published methods is not an independent model review or participation by those practitioners. Quick tasks may explicitly bypass professional sourcing when not needed.

## The Move
Keep the set of unique **definition paths** whose actual current content was both retrieved and used in an observable task step. When warranted, report `AoA: N active` where `N` is that set's size. The revision and applied operation belong in durable evidence. Never count catalog references, proposed casts, fetched-but-unused definitions, simulated voices, or repeated mentions.

## Behavioral activation rather than documentation-only recall

For cross-project upgrades, fetched-and-applied AoA methods do not prove that current memory changed the actual tool call. When consequential, use one controlled stale-versus-current authority fixture: the host must choose the current permitted tool and arguments, not an earlier remembered route. Record actual event evidence; a persuasive explanation is not a dispatch receipt. No mandatory repeated canary for every small task. If the host does not expose tool interception, label `NOT_TESTED`.

## When to Use
The user requests AoA activation visibility or the count explains a consequential project route. When none were needed, `AoA: 0` is accurate. When the sources were unavailable, use `AoA: not loaded` rather than inventing an activation. Do not show a fresh banner on every chat turn.

## When NOT to Use
Simple tasks where no activation status would improve the answer. The technique does not load external models or certify that a governor booted.

## The Test
Recommend five persona paths, fetch two, actually apply one. The active count is **one**, not five or two. A fake independent-agent claim fails even if the model uses different role labels.
