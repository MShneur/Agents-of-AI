# AoA Merge Protocol

## The Rule

When a new candidate overlaps with an existing entry, **improve the existing entry** instead of creating a new one. A library of a million near-identical entries is worse than one strong entry that covers the ground.

## The Test: Method, Not Topic

Two entries earn separate files **only if they think differently** — different reasoning framework, different decision process, different allergies. Topic alone doesn't justify a split.

**Same method, different topic → MERGE.** A "contract lawyer" and a "patent lawyer" who both use the same analyze → cite → argue framework? That's one `briefcase` persona with domain tags — not two files.

**Different method, same topic → SPLIT.** An auditor who runs adversarial redline attacks and an auditor who runs compliance checklists? Those think differently. Two entries.

## Decision Flow

```
New candidate found
  ↓
Does an existing entry cover 60%+ of the same ground?
  ├─ NO  → Create new entry
  └─ YES → Does the candidate think DIFFERENTLY (different framework/process/allergies)?
       ├─ NO  → MERGE into existing entry (add what's new, strengthen what overlaps)
       └─ YES → Is the difference substantial enough to change outputs meaningfully?
            ├─ NO  → MERGE (add as a variant/mode within the existing entry)
            └─ YES → SPLIT (create new entry, note the distinction in both files)
```

## What "MERGE" Means in Practice

When merging into an existing entry:

1. **Add missing techniques** — if the candidate has a step or check the existing entry lacks, add it
2. **Strengthen the allergy** — if the candidate refuses something the existing entry doesn't mention, add it
3. **Add domain tags** — if the candidate covers a new domain using the same method, tag it
4. **Add a mode or profile** — if the candidate is a heavier/lighter version, add it as a mode within the entry (like the auditor's DA/SPAR/BENCH tiers)
5. **Credit the source** — note where the improvement came from
6. **Bump the version** — existing entry goes from 1.0 → 1.1

## What "MERGE" Does NOT Mean

- Don't dilute the existing entry's voice by averaging two styles together
- Don't make the entry so long it loses focus — if merging would exceed ~300 lines, consider whether it's actually two methods being forced together
- Don't merge governance rules into capability entries (governance stays in CTRL-AI/R-Duck)

## Examples

| Candidate | Existing entry | Verdict | Why |
|---|---|---|---|
| "Security code reviewer" (OWASP checklist) | `locksmith` agent | MERGE | Same method, just more checks to add |
| "Adversarial verification agent" | `stresstest` agent | MERGE | Same "try to break it" method |
| "Empathetic negotiation persona" | `framesmith` persona | SPLIT | Fundamentally different — one uses strategic control, the other uses emotional resonance |
| "Python debugging specialist" | `tracker` agent | MERGE | Same 7-step method, just add Python-specific tool recommendations |
| "Socratic teaching persona" | `prover` persona | SPLIT | Different method — one proves, the other asks questions to guide discovery |
| "Tax lawyer persona" | (none yet) | CREATE | New domain, new method |
| "Real estate lawyer persona" | "Tax lawyer" (if it existed) | Depends | Same legal reasoning framework → merge. Different approach (transactional vs. adversarial) → split |

## During Research/Extraction

When running the AoA research prompt:

1. Before creating a new entry, check existing entries for overlap
2. If overlap ≥60%, default to MERGE unless the method test clearly says SPLIT
3. Log the decision: `MERGE into [existing-id] | reason: [why]` or `SPLIT from [existing-id] | reason: [different method because...]`
4. When in doubt, MERGE — it's easier to split later than to consolidate a bloated library

## Library Health Check

Periodically (every 20+ entries), scan for:
- Two entries that could be one (same method, different topic → merge)
- One entry that's doing too much (two methods crammed together → split)
- Entries with no unique allergy (probably generic enough to merge into something else)
