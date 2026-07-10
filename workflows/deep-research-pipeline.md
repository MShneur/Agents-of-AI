---
id: deep-research-pipeline
type: workflow
purpose: Multi-stage research process that moves from divergent exploration to verified synthesis with evidence tags at every stage.
steps: 3
agents_used: [researcher]
personas_used: [source-critic, skeptic-spec, deep-reasoner]
confidence: BATTLE-TESTED
version: "1.0"
tags: [research, investigation, evidence, multi-stage, systematic]
compatible_with: [any-ai]
---

# Deep Research Pipeline

## Purpose
Systematic research that separates exploration from verification. Prevents the common failure mode of searching once, finding something plausible, and presenting it as fact.

## When to Use
- Any question where a single search would give a shallow answer
- Topics with contradictory sources
- Decisions that depend on getting the facts right
- Anything you'd want a second opinion on

## When NOT to Use
- Simple factual lookups
- Time-sensitive questions where speed matters more than depth
- Creative tasks where research would constrain output

## Steps

### Stage 1: BRAINSTORM (divergent)
**Agent:** researcher | **Mode:** open exploration

1. Challenge the premise — is the question itself well-formed?
2. Generate risk-focused ideas — what could go wrong if we get this wrong?
3. Identify gaps — what would we need to know to answer confidently?
4. Recommend topics the user may not have considered
5. All outputs tagged [UNVERIFIED] — nothing from this stage is treated as fact

**Done when:** 5+ angles identified, gaps listed, premise validated or challenged.
**STOP. Present brainstorm. Await approval before Stage 2.**

### Stage 2: SURVEY (targeted)
**Agent:** researcher + source-critic | **Mode:** targeted search

1. Search by keyword expansion — not just the obvious terms
2. Search by source expansion — check sources the first search wouldn't find
3. Check social/community signals where relevant
4. Validate Stage 1 items — are the brainstorm ideas supported?
5. Generate new questions from findings
6. Tag every finding with source credibility tier (T1-T4)

**Done when:** each angle has at least one source, contradictions identified, new questions logged.
**STOP. Present findings. Await approval before Stage 3.**

### Stage 3: DEEP VERIFY (convergent)
**Agent:** researcher + skeptic-spec | **Mode:** verification

1. Cross-reference findings across sources — converge or conflict?
2. Resolve contradictions where possible — if not, preserve both positions
3. Final confidence grading per claim: HIGH / MED / LOW / DEGRADED
4. Source provenance audit — trace key claims to original source
5. Gap report — what remains unknown and why

**Done when:** every claim has a confidence grade, contradictions resolved or preserved, gaps documented.

## Output Format

```
## Research: [Topic]
Confidence: HIGH | MED | LOW | DEGRADED

### Established [high-confidence claims with sources]
### Contested [contradictions — both positions + evidence]
### Unknown [gaps + why]
### Recommendations [what to do with this]
```

## Anti-patterns
- Searching once and stopping
- Resolving contradictions by picking the more recent source (recency ≠ accuracy)
- Presenting brainstorm ideas as findings before validation
- Skipping verification because the survey "looks solid"

---

*Derived from the CTRL-AI Brain pipeline. Battle-tested across 30+ research sessions.*
