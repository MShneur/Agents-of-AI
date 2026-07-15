---
id: assumption-surface
type: technique
domain: analysis, planning, risk assessment
purpose: Before executing any plan, list every unstated assumption it depends on. Rank by how catastrophic failure would be if that assumption is wrong.
confidence: BATTLE-TESTED
version: "1.0"
tags: [assumptions, risk, planning, analysis]
compatible_with: [any-ai]
---

# Assumption Surface

## The Move
1. Read the plan/proposal/design
2. List every fact it takes for granted without stating
3. For each: what happens if this assumption is wrong?
4. Rank by severity: which wrong assumption kills the whole plan?

## Format
| Assumption | Stated? | If wrong, what breaks? | Severity |
|---|---|---|---|
| [assumption] | yes/no | [consequence] | CRITICAL/HIGH/MED/LOW |

## When to Use
- Before approving any plan or spec
- During architecture review
- Before committing to a strategy
- When something "feels risky" but you can't name why (the risk is an unstated assumption)
