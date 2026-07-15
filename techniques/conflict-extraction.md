---
id: conflict-extraction
type: technique
domain: multi-perspective analysis, decision-making, committee protocols
purpose: When multiple perspectives analyze a problem, explicitly extract and structure their disagreements rather than averaging them into consensus. Disagreements are the most valuable output.
confidence: PRACTICED
version: "1.0"
tags: [conflict, disagreement, multi-agent, analysis, synthesis, committee]
compatible_with: [any-ai]
---

# Conflict Extraction

## The Move
When running multi-perspective analysis (committees, panels, opposing viewpoints):

### Round 1: Independent Analysis
Deploy perspectives in strict isolation. No perspective sees the others. This prevents early outputs from anchoring the rest.

### Round 2: Informed Revision
Drop isolation. Each perspective reads the others and actively seeks counter-evidence. They either revise their stance or double down with stated reasons.

### Round 3: Structured Conflict Objects
The synthesis does NOT average positions into safe middle ground. Instead, output structured disagreements:

```
Conflict: [what they disagree about]
Perspective A: [position + evidence]
Perspective B: [position + evidence]
Severity: CRITICAL | HIGH | MEDIUM | LOW
Resolution: RESOLVED [how] | UNRESOLVED [why]
```

## Why This Matters
LLMs naturally converge toward bland consensus. This technique fights that by making disagreements first-class outputs with severity levels. An unresolved critical conflict is more valuable than a false consensus.

## When to Use
- Committee protocols (RAPID/EXTENDED in conductor agent)
- Investment analysis with opposing theses (ledger persona)
- Strategy decisions with genuine trade-offs
- Architecture reviews where multiple valid approaches exist
