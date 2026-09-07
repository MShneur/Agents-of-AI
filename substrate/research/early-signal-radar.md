# Early-Signal Radar

Status: **FOUNDATION / Origin-ready**  
Snapshot: **2026-09-07**

## Purpose

Find architectural ideas **before** they become generic AI advice, while avoiding the opposite failure: adopting every viral repository as canon.

The radar looks for *method emergence*, not merely popularity.

## Candidate sources

Continuously or periodically inspect public/open sources such as:

- newly created or rapidly accelerating GitHub repositories;
- repositories from established AI/runtime/security labs and experienced maintainers;
- GitHub releases, changelogs, ADRs, issues, PRs, RFCs, and experimental branches;
- open protocol/specification repositories;
- package registries and newly growing plugin/skill ecosystems;
- papers that ship runnable code;
- Hacker News / technical community discussion as a discovery signal, not proof;
- Trendshift/GitHub Trending/star-history as velocity signals, not quality scores;
- public open-source predecessors of products that later became hosted/private/commercial;
- forks preserving an earlier public architecture;
- deprecation/migration notes that reveal which architectural ideas survived real use.

## Score the foundation, not the marketing

Score 0–5 on each axis:

| Axis | Question |
|---|---|
| Novelty | Is there a genuinely different mechanism or only new branding? |
| Velocity | Is adoption/contribution/release activity accelerating relative to age? |
| Credible origin | Are maintainers/lab/history strong enough to merit attention? |
| Architectural depth | Is there real code/spec/design, not only a demo or prompt? |
| Evidence | Benchmarks, tests, production use, reproducible examples, or failure data? |
| Portability | Can the mechanism generalize beyond one vendor/model/product? |
| AoA gap | Does it fill or materially strengthen something AoA lacks? |
| Composability | Can it fit without becoming another monolithic framework? |
| License clarity | Can we safely reference/reuse/reimplement with provenance? |
| Security fit | Can it operate without creating unacceptable authority/data risk? |

### Suggested score

```text
FOUNDATION_SCORE =
  2×Novelty
+ 2×ArchitecturalDepth
+ 2×AoAGap
+ Velocity
+ CredibleOrigin
+ Evidence
+ Portability
+ Composability
+ LicenseClarity
+ SecurityFit
```

Maximum 65. Do not treat the number as objective truth; it is a forcing function for explicit reasoning.

## Action bands

```text
50–65  DISTILL NOW
       create a source packet and run Source Distillation

38–49  EXPERIMENT
       build a small isolated proof/eval before canonization

25–37  WATCH
       track releases/adoption; no AoA implementation yet

<25    IGNORE unless a specific project need changes the score
```

A low score may still matter for a narrow project. A high score does not bypass license/security/governance review.

## Velocity without star worship

Useful early signals include:

- stars/forks relative to repository age;
- unique contributors and contribution rate;
- release cadence and substantive changelog depth;
- downstream integrations/forks that implement the idea independently;
- package downloads when available;
- protocol implementations across organizations;
- issues that show real users hitting edge cases;
- maintainers replacing earlier architecture after production experience;
- independent benchmarks/reproductions.

Discount:

- unexplained one-day star bursts;
- sponsor/marketing badge claims without verifiable evidence;
- copied/fork-farm repositories;
- repositories with huge attention but no substantive implementation;
- benchmark numbers with no reproducible setup;
- concepts that collapse to an existing AoA method after the branding is removed.

## Origin-window heuristic

A particularly valuable candidate is one where:

```text
public architecture exists
+ mechanism is new enough that vocabulary is not settled
+ several independent projects begin converging on it
+ commercial/private surfaces are starting to appear
```

That is the window where Origin should preserve the public architectural foundation and distill the reusable idea before ecosystem memory becomes dominated by product marketing.

## Current radar — 2026-09-07

This is a **method radar**, not a leaderboard.

### DISTILL NOW / foundation already incorporated in this branch

- **DeepSeek Harness** — developer-preview, everything-is-plugin capability seams, durable event source of truth, reversible composition. Strong early architectural signal.
- **Karpathy autoresearch** — autonomous fixed-evaluator ratchet loop; extremely small implementation surface exposes a general method clearly.
- **OpenViking + Context Mode convergence** — context is increasingly treated as an external managed substrate rather than “just use a larger context window.”
- **CubeSandbox** — snapshot/fork/rollback plus strong isolation/credential mediation is becoming core agent infrastructure.
- **Microsoft Agent Governance Toolkit** — deterministic interception at action boundaries reinforces the shift from prompt-only safety to structural enforcement.

### EXPERIMENT / watch closely

- **World2Agent** — structured sensor/perception protocol is early but fills a real missing boundary: world → agent.
- **NVIDIA Object Oriented Agents** — typed Python-object model and deterministic-vs-agentic method split may become a useful harness design pattern.
- **DeepSeek Harness plugin ecosystem** — watch whether reversible capability seams become portable beyond DeepSeek's runtime.
- **WebMCP/page-declared browser tools** — promising alternative to pure DOM/vision automation, but authorization/trust semantics remain critical.
- **Loop Engineering** — vocabulary around operating persistent verify/persist loops is spreading; watch for convergence beyond one implementation.
- **Vercel Eve** — filesystem-first durable agent packaging (instructions/tools/skills/channels/schedules) is simple and inspectable; watch adoption and stability.
- **Agent memory projects** — confidence/lifecycle/hybrid retrieval are converging, but the ecosystem remains fragmented enough that AoA should keep the contract provider-neutral.

## Candidate record

```yaml
candidate: <name/repo>
discovered_at: <time>
why_now: <velocity/novelty signal>
scores:
  novelty: 0
  velocity: 0
  credible_origin: 0
  architectural_depth: 0
  evidence: 0
  portability: 0
  aoa_gap: 0
  composability: 0
  license_clarity: 0
  security_fit: 0
foundation_score: 0
disposition: DISTILL_NOW | EXPERIMENT | WATCH | IGNORE
source_packet: <pointer/null>
next_check: <date/event>
```

## Do not self-canonize

Origin/radar may nominate candidates. It must not silently write them into AoA canon merely because its own score is high.

The adoption path remains:

```text
RADAR
 → SOURCE DISTILLATION
 → AoA OVERLAP / MERGE TEST
 → EXPERIMENT / IMPLEMENTATION
 → DECORRELATED VERIFICATION
 → REVIEW / HUMAN GATE WHEN CONSEQUENTIAL
 → CANON OR REJECT
```
