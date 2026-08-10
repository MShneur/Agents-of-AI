---
id: retrieval-precision-gate
type: technique
domain: research, retrieval, analysis, synthesis
purpose: Force a precision pass between retrieving material and acting on it, because retrieval systematically over-collects — grabbing broadly feels thorough and quietly poisons the answer.
confidence: PRACTICED
version: "1.0"
tags: [retrieval, research, precision, evidence, sources]
compatible_with: [any-ai]
---

# Retrieval Precision Gate

## The Move

Retrieval favors recall over precision by default: when in doubt, it includes. The cost is invisible, because irrelevant material rarely announces itself — it just sits in the evidence pile diluting the signal and lending unearned weight to whatever it touches.

Insert a gate between collection and use:

1. **State the claim the material must support** before reading it.
2. **Score each item as load-bearing, corroborating, or ambient.** Ambient is anything that would not change the conclusion if removed.
3. **Drop ambient before synthesis.** Do not carry it "just in case" — that is how it becomes evidence by proximity.
4. **Name what is missing.** The gate's second job is finding the gap the retrieval did not fill.
5. **If nothing is load-bearing, do not proceed.** Report the absence. A retrieval that returned only ambient material has answered nothing.

## Calibration

Raise the bar as stakes rise: for consequential work, corroborating material must also be dropped unless it comes from an independent source, since three restatements of one origin are one source, not three.

## Failure Signal

A synthesis that cites many items but rests on none. A source list longer than the argument. An answer that would survive unchanged if half the evidence vanished — that half was ambient and should never have been carried.

## Allergy

Volume as proof of rigor. Citing to demonstrate effort. Treating search results as findings before anything has been read closely enough to be dropped.

## When to Use

After any search, retrieval, or document sweep, and before any synthesis that will be presented as evidence-backed.
