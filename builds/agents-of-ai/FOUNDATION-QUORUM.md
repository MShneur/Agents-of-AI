# Foundation Named-Method Quorum

Date: **2026-09-07**  
Decision: how to structure the new Agents-of-AI Custom GPT / agent / skills build surface before the historical build outline is supplied.  
Result: **ACCEPT reversible foundation with explicit source-dependent holds and one adversarial correction.**

## Attribution boundary

The practitioners named below did **not** participate in, review, or endorse this project. Their documented public methods were retrieved at convening time and applied as review lenses under `workflows/quorum.md`.

The analysis was synthesized by one coordinating AI, so it must not be described as independent human review or practitioner participation. The externality comes from retrieved published methods; final implementation verification remains separately required.

Detailed source links are recorded in `EXPERT-METHOD-SOURCES.md`.

## Decision frame

Options considered:

1. create an eighth canonical AoA layer for skills/builds;
2. put the new work under the existing `tools/` shelf;
3. scatter runtime-specific files at repository root;
4. create a reversible `builds/agents-of-ai/` deployment surface over the seven canonical layers;
5. defer all repository work until the full historical outline arrives.

Constraints:

- the user explicitly requested a new section in the repository;
- exact historical pre-built personas and Negative Gate details are not yet available;
- R&Duck remains governance when active;
- AoA's seven-layer ontology and merge protocol are already canonical;
- current provider/runtime facts can change;
- dynamic AoA activation must exist on top of the pre-built cast + Negative Gate;
- no merge/release is authorized by this foundation batch.

Reversibility: high while changes remain additive on a dedicated draft branch/PR.

## Seats

| Seat | Heavy | Light | Published method used |
|---|---|---|---|
| Method | Michael Nygard | Daniele Procida | small ADRs; separation of documentation purposes |
| Evidence | Hamel Husain | Chip Huyen | end-to-end eval first; failure/tool/plan diagnostics |
| Operator | Lilian Weng | Andrew Ng | agent planning/tooling; reflection/tool-use/planning/multi-agent patterns |
| Adversary | Simon Willison | Johann Rehberger | prompt-injection system risk; confused-deputy/tool invocation risk |
| Affected | Indi Young | Erika Hall | user purpose/problem space; research question before mechanism |
| Specialist | EMPTY | EMPTY | no distinct sixth expertise required for the reversible foundation |

Minimum five seats are filled; Specialist remains intentionally empty.

## Independent method-derived pass

These are implications of each published method applied to the decision, not quotations or claims about what the practitioner personally believes about Agents of AI.

### Method — Michael Nygard / ADR

**Position:** choose a small reversible architecture decision and record why. `builds/agents-of-ai/` is preferable to a large root-level prompt dump because the decision and consequences stay isolated.

**Strongest support:** the architecture choice affects repository structure and future packaging, so its rationale should survive later revisions.

**Objection:** even a reversible folder can create premature architecture that later source material must unwind.

**Confidence:** medium-high.

**Would change:** historical outline shows a different product/package boundary that remains superior after current constraints are applied.

### Method — Daniele Procida / Diátaxis

**Position:** separate canonical AoA reference/method definitions from runtime-specific how-to/build packaging.

**Strongest support:** the seven canonical layers describe reusable components, while Custom GPT/agent/skill files instruct deployment on a particular surface.

**Objection:** another top-level section increases navigation burden.

**Confidence:** high.

**Would change:** builds begin defining canonical methods instead of packaging them, in which case the separation is being misused.

### Evidence — Hamel Husain / eval-first error analysis

**Position:** architecture is acceptable only if the build has an end-to-end acceptance contract before prompt/code tuning.

**Strongest support:** component elegance does not prove task success; evals must expose routing, gate, tool, and verification failures after checking user-visible success.

**Objection:** current foundation has no executable target yet, so many tests are necessarily NOT RUN.

**Confidence:** high on evaluation shape, low on runtime success before execution exists.

**Would change:** historical requirements reveal a different primary success metric.

### Evidence — Chip Huyen / agent failure surfaces

**Position:** keep routing and tool use measurable and start simpler than a fully autonomous dynamic system.

**Strongest support:** dynamic planning/tool systems introduce failure at selection, arguments, execution, and observation; each needs a testable surface.

**Objection:** dynamic AoA activation may be more complexity than a well-designed static cast needs for common tasks.

**Confidence:** medium-high.

**Would change:** evals show the dynamic layer adds cost/failure without improving task success.

### Operator — Lilian Weng / agent planning and tool use

**Position:** separate orchestration, specialist methods, context/provenance, and tools rather than collapsing everything into one static system prompt.

**Strongest support:** complex agents depend on planning/decomposition and tool reliability, which are easier to reason about as explicit components.

**Objection:** the manager/specialist architecture can add coordination overhead and context complexity.

**Confidence:** medium.

**Would change:** source outline and evals demonstrate a simpler single-agent arrangement is sufficient.

### Operator — Andrew Ng / agentic design patterns

**Position:** use specialists and reflection/evaluation deliberately, not as a fashionable default; expose the system to disciplined error analysis.

**Strongest support:** reflection, tool use, planning, and multi-agent collaboration are distinct patterns whose usefulness should be evaluated.

**Objection:** planning/multi-agent behavior can reduce predictability relative to deterministic steps.

**Confidence:** medium-high.

**Would change:** eval results show dynamic composition loses to a simpler deterministic workflow.

### Adversary — Simon Willison / lethal trifecta

**Position:** do not let dynamic activation imply unrestricted live ingestion or tool authority. Untrusted content plus private data plus external communication is a structural danger.

**Strongest support:** retrieved instruction text can influence an agent that also has sensitive context and external tools.

**Objection:** the initial foundation contract separated provenance from tools but was still too loose about when live instruction fetch was authorized.

**Confidence:** high.

**Would change:** none for the principle; exact mitigations vary by runtime capability.

### Adversary — Johann Rehberger / confused deputy

**Position:** validate authority and arguments at the side-effecting tool boundary; upstream model intent is insufficient.

**Strongest support:** an injected or confused agent can invoke a legitimate tool for an illegitimate purpose.

**Objection:** excessive confirmation can make routine work unusable.

**Confidence:** high.

**Would change:** runtime offers a stronger enforceable authorization primitive, but boundary checking remains necessary.

### Affected — Indi Young / purpose before solution

**Position:** preserve the user's desired build outcome while treating literal old implementation mechanics as revisable.

**Strongest support:** optimizing the mechanism before understanding purpose can solve the wrong problem.

**Objection:** too much reinterpretation can erase intentional historical design choices.

**Confidence:** high.

**Would change:** exact source lines demonstrate that a seemingly incidental mechanism is actually a core intended outcome.

### Affected — Erika Hall / research question before mechanism

**Position:** the line-by-line protocol should first identify what each historical line is trying to achieve, then judge the implementation mechanism.

**Strongest support:** inquiry goals and the mechanics used to answer them are different layers.

**Objection:** interpretation itself can bias the source.

**Confidence:** high.

**Would change:** ambiguity cannot be resolved from source context; in that case use DEFER/Human Gate rather than infer.

## Cross-examination — round 1

### Simplicity vs dynamic AoA

Evidence/Operator challenge: dynamic activation can become orchestration theater and reduce reliability.

Affected/Method response: the user explicitly requires AoA expansion beyond the pre-built personas, but the mechanism can stay narrow: only activate on a named method gap, deduplicate overlaps, and preserve a bundled default path.

Disposition: **MITIGATED** — dynamic selection is binding, decorative activation is forbidden, and eval AOA-E02/AOA-E03 measures value.

### Historical fidelity vs current improvement

Affected challenge: architecture work before source arrival may anchor future interpretation.

Method response: isolate foundation assumptions as reversible ADRs and placeholders; never invent historical cast/gate details.

Disposition: **MITIGATED** — exact identity-bearing details remain DEFERred; source protocol freezes historical lines before interpretation.

## Cross-examination — round 2

### Security vs automatic activation

Adversary challenge: automatic dynamic AoA selection can accidentally become automatic network ingestion of untrusted operational instruction.

Operator response: local bundled definitions can activate deterministically; external fetch can be separately gated.

R&Duck constraint: its canonical external-persona spec states that naming/recommending an `aoa:<id>` is not loading and live ingest requires explicit user request or a confirmed cast.

Disposition: **ACCEPTED — design changed.** `ACTIVATION-CONTRACT.md` and `skills/aoa-autocast/SKILL.md` were tightened to separate selection from live ingestion and to preserve R&Duck's explicit-request/confirmed-cast rule.

### Safety vs usability

Adversary challenge: if every action becomes a Human Gate, the build ceases to be useful.

Affected/Operator response: gate density should follow consequence and reversibility; routine authorized reversible work returns ALLOW.

Disposition: **MITIGATED** — Negative Gate makes ALLOW first-class and tool policy distinguishes read-only/reversible from external/destructive classes.

## Spike — strongest case against the emerging recommendation

The strongest contrary case is to **defer all architecture except a raw source archive until the historical outline arrives**.

Arguments:

1. The historical outline may contain a specific cast/gate architecture that conflicts with the manager + skills framing.
2. Creating build docs now may anchor later batches toward the foundation instead of letting the source reshape the structure.
3. Dynamic live loading expands the prompt-injection surface; a bundled static snapshot could be safer and easier to evaluate.
4. `builds/` may become a dumping ground for provider-specific files and blur AoA's clean library identity.
5. A documentation-only foundation can create false progress if users interpret it as a working Custom GPT/agent/skill implementation.

### Response to Spike

- The foundation is isolated on a draft branch and PR, not merged.
- It explicitly marks historical cast/gate and executable runtime as NOT RUN/pending.
- `ADR-0001` has revisit triggers if the source contradicts the structure.
- Dynamic **selection** is required by user intent, but live ingestion is now separately gated and bundled definitions are preferred.
- `builds/` is constrained to deployment packaging; canonical methods cannot migrate there without the merge/layer tests.
- B00 reports PASS only for the reversible foundation, not for a working product.

Spike disposition: **MITIGATED, residual retained.** The residual risk is anchoring; every source batch must be allowed to supersede foundation assumptions.

## Objection dispositions

| Objection | Disposition | Residual / reversal condition |
|---|---|---|
| `builds/` adds navigation complexity | MITIGATED | revisit if build surface grows into canonical method storage |
| architecture before source can anchor later interpretation | MITIGATED | source batches may supersede ADR; exact cast/gate remain DEFERred |
| dynamic AoA causes persona bloat | MITIGATED | measure via method-gap + dedup evals; remove if no outcome gain |
| automatic selection could silently fetch instructions | ACCEPTED | design changed: ingestion authority is separate and explicit |
| tool guardrails could over-friction routine work | MITIGATED | consequence/reversibility classification + ALLOW path |
| manager pattern may not fit historical build | MITIGATED | currently a default, not frozen code; source/evals can replace it |
| provider docs will stale | MITIGATED | dated facts + refresh gate before final packaging |
| foundation could be mistaken for completed product | MITIGATED | status/NOT RUN markers + draft PR Human Gate |

No material objection remains DISPUTED for the **reversible foundation**. Historical design questions remain intentionally DEFERred, not resolved by quorum.

## Recommendation

Proceed with the additive `builds/agents-of-ai/` foundation on the draft branch, keep `PREBUILT_CAST` and exact Negative Gate source-dependent, use dynamic **selection** beyond defaults, preserve a separate live-ingestion authority gate, and reconcile the historical outline line by line before executable/final product completion.

## Safest reversible next step

Ingest the first supplied historical outline batch under `SOURCE-OUTLINE-BATCH-PROTOCOL.md`, allowing its evidence to change or supersede foundation assumptions.

## Human choice

**YES for merge/release.** Keep PR #8 draft until historical source reconciliation and target acceptance testing are complete.

**NO for continuing reversible source-analysis/build work on the draft branch.**
