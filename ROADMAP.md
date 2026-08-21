# Agents of AI Roadmap

**Snapshot:** `2026.08.21`  
**Purpose:** current gaps and next public targets. Historical changes belong in [`CHANGELOG.md`](CHANGELOG.md); version rules live in [`VERSIONING.md`](VERSIONING.md).

---

## 1. Current Library State

| Layer | Count | Current strength |
|---|---:|---|
| Personas | 23 | Writing, epistemology, product, finance, platform, support, legal, ML, brand, process |
| Agents | 13 | Research, audit, debugging, verification, security, refactoring, orchestration, incident response, repo maintenance |
| Workflows | 16 | Research, implementation, TDD, requirements, root cause, repo maintenance, review, large-file handoff, workspace bootstrap |
| Techniques | 17 | Dissent, assumptions, evidence precision, context control, verification, terminology, provenance |
| Modes | 4 | Inspect, Forge, Probe, Draft |
| Teams | 6 | Engineering, research, strategy/product, communications, operations, legal/risk |
| Failures | 6 | Process/reliability drift patterns with shared names and fixes |
| **Total** | **85** | Broad reusable operating library |

The live directories are source truth. If this table disagrees with the repository, fix this file; do not rationalize the drift.

The repository also has a **supporting tools shelf** under `tools/`. It is not an eighth composable layer.

---

## 2. What Changed Since the Original July Roadmap

Several July targets are now implemented rather than future work:

- `distiller` — output compression / anti-slop
- `compass` — product direction
- `ledger` — financial analysis
- `scaffold` — platform engineering
- `firehose` — incident response
- `razor` — YAGNI decision workflow
- six cross-functional Teams with mandatory disagreement protocols
- a Failures layer with shared incident vocabulary
- Repo Nanny and repository-maintenance workflows
- large-artifact handoff and AI-workspace bootstrap workflows
- roster drift detection via `scripts/sync-roster.py`
- public software recommendations, API catalog, free-tool ledger, and publication-safety rules
- public responsive CTRL Walkthrough runner with reusable setup modules and custom walkthrough imports
- project/tool changelogs and explicit snapshot/component versioning rules
- community issue intake for software, API, and walkthrough recommendations

The old roadmap's note that research prompts were stale is also closed: both research prompts now describe all seven layers, carry the current 16-workflow roster, and route tool/API research into the supporting tools shelf.

---

## 3. Current High-Value Gaps

These are candidates, not promises. Every new entry still has to pass the merge/split and distinctiveness bar.

### Composable library

| Gap | Why it may deserve a distinct entry | Likely form |
|---|---|---|
| **Accessibility review** | WCAG/accessibility has a concrete method and evidence surface beyond generic UX critique | Agent or specialized auditor mode |
| **Academic peer review** | Contribution, methodology, statistical validity, novelty, and reproducibility form a distinct review protocol | Agent |
| **OSINT / intelligence analysis** | Adversarial-source triangulation, source protection, confidence grading, deception risk | Persona/agent pair if methods remain distinct |
| **Curriculum design** | Designing a learning path is different from Socratic tutoring one learner in the moment | Persona or workflow |
| **Recruiting / structured hiring** | Competency design, evidence-based interviewing, scorecards, bias controls | Workflow/agent if kept non-governance |
| **Accessibility / human-impact failure patterns** | Current Failures skew toward process/reliability; user-harm and accessibility drift may be underrepresented | Failure entries after repeated evidence |

### Supporting tools shelf

| Gap | Next useful improvement |
|---|---|
| **Machine-readable tool registry** | Add a public data file for software/API discovery only if a real consumer needs it; avoid duplicating markdown canon prematurely |
| **More walkthroughs** | Add data-only guides when a recommended tool has a repeatable browser setup path worth automating/highlighting |
| **API freshness** | Re-check access model/auth/docs when an API is used or materially changes; time-sensitive claims carry verification dates |
| **Retired-tool handling** | Make retired/changed services visible instead of silently deleting history |
| **Interoperability examples** | Add small provider-neutral examples showing how an agent/workflow can use a queue, webhook, object store, or MCP surface |
| **Community recommendations** | Route proposals through the Tool/API recommendation issue template and graduate only public-safe, sourced entries |

---

## 4. Quality Work Before More Volume

Adding entries is not automatically progress. Current quality priorities:

1. **Cross-reference composition.** Make it easier to see which agents cast which personas and which workflows commonly compose them.
2. **Examples where they teach something.** Add before/after or worked examples only when they clarify the behavioral difference; do not bloat every file mechanically.
3. **Complexity signal.** Explore a small complexity/effort marker if users actually struggle to choose between lightweight and heavy components.
4. **Merge pressure.** Treat overlap as a reason to strengthen an existing entry unless a candidate has a genuinely different method, failure signal, or interaction protocol.
5. **Failure vocabulary coverage.** Prefer failures observed repeatedly in real work over speculative taxonomy filling.
6. **Roster consistency.** README and research prompts must track the live directories; `scripts/sync-roster.py --check` is the local drift check.
7. **Public tooling freshness.** Tool/API facts decay faster than personas. Reverify time-sensitive claims rather than copying old quotas forward.

---

## 5. Research Targets

Good future mining sources include public practitioner methods, open agent/skill repositories, public prompt libraries, code-agent configuration patterns, postmortems, research-method documentation, and real workflows that expose a distinctive repeatable method.

The extraction rule remains:

> **Extract the operating pattern, not the costume or copyrighted text.**

A candidate should change behavior materially after being loaded. Generic job-title prompts, copied paid prompts, governance smuggled into a persona, and renamed duplicates do not clear the bar.

---

## 6. Tools and API Direction

Start at [`TOOLS.md`](TOOLS.md) and [`tools/README.md`](tools/README.md).

The public tooling shelf currently separates:

- **software recommendations** — what to consider for a job;
- **API catalog** — what integration surfaces exist;
- **free-tool ledger** — what public free/student claims were verified and when;
- **CTRL Walkthrough** — how a browser setup can be guided without embedding personal configuration;
- **publication safety** — what cannot enter the public repo;
- **tools changelog** — what changed over time.

Keep those concerns separate. A service can be a good API without being free; a free service can be a poor recommendation; a recommended service may not need a walkthrough.

---

## 7. Community and Maintenance

Community contributors can propose:

- new composable entries;
- merges or improvements to existing entries;
- new software/API recommendations;
- corrections to stale public capability claims;
- public-safe CTRL Walkthrough modules;
- newly observed failure patterns.

Use [`CONTRIBUTING.md`](CONTRIBUTING.md) and the GitHub issue templates. Material public changes update the relevant changelog.

No public contribution should contain credentials, personal account state, private infrastructure, private repositories, private endpoints, affiliate identifiers, or other private configuration.

---

## 8. Definition of Progress

The roadmap is succeeding when:

- users can find a genuinely different reasoning/operator pattern quickly;
- the library grows without duplicate-role bloat;
- disagreements and failures become more explicit rather than hidden;
- a new AI workspace can discover useful public tools and APIs without rediscovering the ecosystem from scratch;
- setup walkthroughs save human navigation effort without storing personal information;
- counts, prompts, READMEs, and change history agree with the files that actually exist.

This roadmap is a living public view. Update it when priorities materially change; do not rewrite it merely to make activity look newer.