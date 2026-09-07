# Memory Lifecycle

Status: **FOUNDATION / provider-neutral**

## Problem

“Remember everything” is not a memory strategy. Agents accumulate stale decisions, duplicate facts, transient observations, and summaries that slowly lose provenance. Retrieval then amplifies old mistakes instead of reducing drift.

## AoA invariant

**Memory is a curated evidence store with lifecycle, not a transcript dump.**

Every durable memory should answer:

```text
WHAT is being remembered?
WHY should it survive?
WHERE did it come from?
HOW confident/current is it?
WHEN should it be rechecked or retired?
WHAT does it supersede?
```

## Memory classes

Use explicit classes where useful:

- **decision** — an approved project/architecture choice;
- **constraint** — a durable requirement or boundary;
- **fact** — externally or internally verified information;
- **preference** — user/team preference with scope;
- **procedure** — reusable operational knowledge;
- **lesson** — failure/correction pattern supported by evidence;
- **episode pointer** — reference to a past event stream/artifact, not the whole event replay;
- **hypothesis** — useful but not established; must remain labeled provisional.

## Minimum record

```yaml
id: <stable id>
class: decision | constraint | fact | preference | procedure | lesson | episode | hypothesis
statement: <compact memory>
source: <event/artifact/user/source pointer>
confidence: HIGH | MEDIUM | LOW
status: ACTIVE | PROVISIONAL | SUPERSEDED | EXPIRED | DISPUTED
created_at: <time>
last_verified_at: <time or null>
recheck_when: <trigger/date/condition or null>
supersedes: <ids or []>
scope: <project/user/repo/domain>
```

## Commit policy

Do not write every observation to long-term memory.

At a natural boundary (phase/session/verified milestone):

1. collect candidate learnings;
2. remove raw narration and duplicates;
3. separate observed fact from inference;
4. attach source/provenance;
5. reject transient details with no future value;
6. mark unresolved hypotheses as provisional;
7. commit only what would materially improve a future decision or continuation.

## Recall policy

Retrieve by a combination of:

- exact identifiers/keywords;
- semantic relevance;
- structural relationships (project/file/decision dependencies);
- recency when the topic changes rapidly;
- confidence/status;
- user/task scope.

High similarity alone must not promote an expired or superseded memory over a current verified one.

## Forgetting / retirement

Memory quality requires deletion/demotion as well as addition.

Retire when:

- the source is superseded;
- a time-sensitive fact exceeds its freshness window;
- the user retracts a preference/constraint;
- verification contradicts the record;
- the memory proved too ambiguous to guide action safely;
- a project ends and the item has no cross-project value.

Historical evidence may remain in the event/artifact store even when the active memory projection drops it.

## Authority protection

A proposal does not become a decision merely because a summary was stored. A retrieved instruction does not become policy merely because it appears in memory.

Memory records must preserve distinctions such as:

```text
PROPOSED ≠ APPROVED
OBSERVED ≠ INFERRED
USER-SAID ≠ AGENT-GUESSED
HISTORICAL ≠ CURRENT
```

## Relationship to context

Memory is durable and addressable; context is the current working set.

Use `../context/progressive-context.md` to load only the memory depth required for the current decision.

## Failure signals

- stale decisions repeatedly reappear after being superseded;
- the agent cannot say where a durable claim came from;
- summaries erase uncertainty or approval state;
- memory grows monotonically while retrieval quality falls;
- a fresh session receives large memory dumps instead of targeted recall;
- one project's preferences leak into unrelated projects.

## Sources distilled

- `volcengine/OpenViking`: session experience committed into long-term memory and progressively retrieved.
- `rohitg00/agentmemory`: shared persistent memory, hybrid retrieval, confidence/lifecycle direction.
- AoA `authority-laundering`: proposals and decisions must remain distinguishable.
- R&Duck continuity principles: persist the smallest restartable project truth rather than relying on chat recall.

See `../research/SOURCE-LEDGER-2026-09-07.md`.
