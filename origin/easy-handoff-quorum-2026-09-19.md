# Easy Handoff — Quorum Method Record

Date: 2026-09-19  
Status: design provenance, not a runtime roster  
Decision: whether AoA should adopt Easy Handoff / Zero Handoff as the default reporting layer for substantial work.

## Attribution rule

The practitioners below did **not** participate in, review, or endorse Agents of AI. Their documented public methods were retrieved and applied as analytical lenses under `workflows/quorum.md`. Future Quorums must re-source seats live rather than reuse this list as authority.

## Frame

The operator needs two different products from one long AI run:

- machine-complete continuity another AI can resume;
- a human status that can be understood in seconds.

The failure to avoid is forcing the human to read the machine record, or compressing so aggressively that failures, uncertainty, authority, and next actions disappear.

## Seats

### Method — heavy / light

**Barbara Minto — Pyramid Principle / SCQ**  
Source: https://www.barbaraminto.com/  
Method applied: lead with the governing point and organize support below it.

**Steve Krug — Don't Make Me Think**  
Source: https://sensible.com/dont-make-me-think/  
Method applied: reduce cognitive work and optimize interfaces for scanning.

**Independent position:** human status should lead with progress/result/next action and avoid paragraphs.  
**Objection:** compression can become cryptic if labels are unstable.  
**Would change:** evidence that operators routinely need the implementation detail in the same surface.

### Evidence — heavy / light

**Amy J. Starmer — I-PASS standardized handoff research**  
Source: https://pubmed.ncbi.nlm.nih.gov/22232313/  
Method applied: structured handoff fields preserve critical transfer information.

**Christopher P. Landrigan — multicenter I-PASS handoff/error research**  
Source: https://www.nejm.org/doi/full/10.1056/NEJMsa1405556  
Method applied: standardization should be tested against transfer errors, not prose quality.

**Independent position:** use stable fields for action, result, contingency, and ownership rather than free-form summaries.  
**Objection:** a rigid schema can create box-checking without truth.  
**Would change:** evidence that free-form transfers outperform the fixed fields on resume accuracy.

### Operator — heavy / light

**Jez Humble — Continuous Delivery**  
Source: https://continuousdelivery.com/about/  
Method applied: small, low-risk increments with fast feedback.

**Gene Kim — Three Ways**  
Source: https://itrevolution.com/articles/the-three-ways-principles-underpinning-devops/  
Method applied: optimize flow, fast feedback, and continual learning.

**Independent position:** progress increments only after bounded acceptance evidence; next work should remain small and reversible.  
**Objection:** fixed progress denominators can lie when scope is discovered mid-run.  
**Would change:** a roadmap model that handles changing scope more accurately without confusing the operator.

### Adversary — heavy / light

**Nancy Leveson — STAMP / systems-theoretic safety**  
Source: https://mitpress.mit.edu/9780262297301/engineering-a-safer-world/  
Method applied: preserve control constraints and interaction failures, not just component status.

**Richard I. Cook — How Complex Systems Fail**  
Source: https://www.researchgate.net/publication/228797158_How_complex_systems_fail  
Method applied: expect interacting latent conditions and avoid single-cause confidence.

**Independent position:** compression must never hide `FAIL`, `UNKNOWN`, authority boundaries, regressions, or required halts.  
**Objection:** a short status can falsely imply the system is simpler than it is.  
**Would change:** a compact representation that preserves uncertainty better than explicit state labels.

### Affected user — heavy / light

**Janice (Ginny) Redish — Letting Go of the Words**  
Source: https://www.sciencedirect.com/book/monograph/9780123859303/letting-go-of-the-words  
Method applied: organize content around the reader's task and conversation.

**Jakob Nielsen — usability heuristics / visibility of system status**  
Source: https://www.nngroup.com/articles/ten-usability-heuristics/  
Method applied: keep system status and consequences visible to the user.

**Independent position:** the operator should always see where the work is, what just happened, and what happens next without reconstructing the run.  
**Objection:** too many status symbols or labels become another interface to learn.  
**Would change:** direct operator testing showing a smaller or different set of fields is faster to understand.

## Cross-examination

- **Method vs Evidence:** scan-first output is accepted only if fixed fields preserve transfer-critical state.
- **Operator vs Adversary:** monotonic progress is accepted only when failed attempts do not advance it and scope changes are shown explicitly.
- **Affected vs Machine continuity:** the human view and AI trace must be separate surfaces; neither is allowed to replace the other.
- **Evidence vs Authority:** a recommendation cannot become a decision merely because compression dropped its provenance.

## Spike

Strongest case against the emerging design: the AI trace could become a second wall of text, defeating the purpose while creating the illusion of disciplined continuity.

Disposition: **MITIGATED**. Emit trace records only on material state change, use fixed fields, collapse resolved observations, and reference the canonical durable record when one already exists. Easy Handoff is not permission to narrate every tool call.

## Dispositions

- Fixed human fields — **ACCEPTED**.
- Separate machine trace from human status — **ACCEPTED**.
- Real A/B progress only from canonical scoped state — **ACCEPTED**.
- Scope changes shown as explicit denominator deltas — **ACCEPTED**.
- Quorum for every action — **OVERRIDDEN**; too costly for routine reversible work. Use it for material forks.
- Detailed practitioner rationale in the runtime workflow — **OVERRIDDEN**; it increases boot cost. Keep provenance here.
- AI trace bloat risk — **MITIGATED** through material-change-only emission and canonical-record references.
- Human choice for release/irreversible authority — **ACCEPTED**.

## Recommendation

Adopt Easy Handoff as the first reporting/continuity contract for substantial AoA work, while preserving task-specific routing: select the smallest relevant AoA methods first, use Quorum/Human Gate for consequential forks, and keep the operator surface to progress/result/next plus only necessary fail/halt/recommend/defer signals.

## Reversible step

Introduce the workflow on a branch, make `AGENTS.md` load it first, sync public roster/snapshot files, validate structure and roster drift, then hold at the merge gate for human review.
