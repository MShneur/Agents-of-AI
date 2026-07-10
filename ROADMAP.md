# AoA Roadmap — Gap Analysis, Rough Diamonds, & Next Targets

*Generated July 9, 2026 from GitHub Trending, awesome-lists, and source mining*

---

## 1. CURRENT LIBRARY STATE (after rename)

| Layer | Count | Coverage |
|---|---|---|
| Personas | 18 | Dev, security, design, data, ML, ops, legal, brand, teaching, epistemology |
| Agents | 10 | Writing, research, audit, debugging, verification, security, refactoring, orchestration |
| Workflows | 3 | Research pipeline, dev cycle, TDD |
| **Total** | **31** | Strong in dev/code. Weak in creative, product, finance, domain-specific |

---

## 2. GAP MAP — What AoA is Missing

### HIGH PRIORITY (would immediately broaden appeal)

| Gap | Why it matters | Proposed AoA name |
|---|---|---|
| **Product manager / PM** | One of the most-requested persona types across all prompt libraries. 100+ PM skills in trending repos. | `compass` (finds product direction) |
| **Incident commander / SRE** | Zero ops-crisis coverage. Incident response is a distinct method from general ops. | `firehose` (manages the emergency flow) |
| **Creative writing coach** | Ghostwriter/scribe writes for you. A coach helps *you* write better. Different method. | `chiselpen` or `lathe` |
| **Financial analyst** | Zero finance coverage. CFO strategy, investment research, valuation — distinct from data analysis. | `ledger` (the financial record) |
| **Prompt engineer / meta-prompt** | The "stop-slop" and "talk-normal" prompts are trending hard (73% token reduction). Meta-level persona. | `distiller` (removes waste) |
| **OSINT / intelligence analyst** | Trending in security space. Different method from researcher (source triangulation under adversarial conditions). | `dragnet` (wide net for intelligence) |

### MEDIUM PRIORITY (depth in existing domains)

| Gap | Why it matters | Merge or split? |
|---|---|---|
| DevOps / platform engineer | Cloud architect + IaC patterns are distinct from ops-engineer (Lean/process). | SPLIT — `scaffold` (builds the platform) |
| Content moderator | Rising with AI safety. Different from auditor (trust & safety vs code quality). | SPLIT — `bouncer` |
| Academic peer reviewer | Manuscript review is a distinct protocol from general auditing (contribution assessment, methodology critique). | SPLIT — `peer` |
| Accessibility auditor | WCAG/ADA compliance is a specialized review lens. | Could MERGE into auditor as a mode, but the method is specific enough to SPLIT — `ramp` (making things accessible) |

### LOW PRIORITY (niche but differentiating)

| Gap | Why it matters |
|---|---|
| Game designer | Unique reasoning (economy balancing, level design, player psychology) |
| Medical/clinical analyst | Extremely high-stakes, distinct method, liability-aware |
| Recruiter / HR | People evaluation is a distinct reasoning pattern |
| Teacher / curriculum designer | Different from midwife (designs the learning path, not the individual session) |

---

## 3. ROUGH DIAMONDS — Trending Now, Not Widely Recognized Yet

These are rising fast, under-documented, and contain extractable methods:

### ★ LazyCodex / oh-my-openagent (64.8k stars, created June 2026)
**What:** A "YAGNI laziness ladder" — before writing code, the agent climbs rungs: does it need to exist → already in codebase → stdlib → native feature → installed dep → one line? Only then write code.
**Why it's a diamond:** The *method* (laziness ladder) is a genuinely novel decision framework we don't have. Not a persona — it's a **workflow step** that slots into build-chain before Step 4.
**AoA extraction:** Merge as a pre-implementation gate in `build-chain`, or create a micro-workflow called `razor` (Occam's razor for code).

### ★ Headroom / chopratejas (2.4k stars, +2473/week in June)
**What:** Context compression — reduces token usage 60-95% without quality loss.
**Why it's a diamond:** Token discipline is a *meta-skill* that every other persona and agent benefits from. We don't have anything covering this.
**AoA extraction:** New persona `compress` — the voice that strips tokens without losing meaning. Pairs with `distiller` (prompt-level) and `mirror` (honesty about what's needed).

### ★ last30days-skill / mvanhorn (1.1k stars, +731/week)
**What:** Cross-platform social research across Reddit, X, YouTube, HN, Polymarket.
**Why it's a diamond:** The *method* (multi-source social sentiment triangulation) is a research approach our `scout` agent doesn't cover — scout does evidence-grounded research, this does social signal detection.
**AoA extraction:** Merge as a "social signal" mode in `scout`, or if the method is distinct enough, create `antenna` (picks up signals across platforms).

### ★ Agent-Reach / Panniantong (961 stars, trending June)
**What:** "Give your AI agent eyes to see the entire internet" — zero-API-fee research.
**Why it's a diamond:** Tool-specific but the *read → search → synthesize across platforms* workflow is extractable.
**AoA extraction:** Workflow patterns merge into `deep-dig`.

### ★ stop-slop / hexiecs (rising, cited by ai-boost)
**What:** System prompt that removes AI slop — 72-73% token reduction on GPT-4o-mini with zero information loss.
**Why it's a diamond:** Directly addresses the #1 complaint about AI output. The anti-patterns list is a behavioral signature.
**AoA extraction:** `distiller` persona — the voice that strips filler, hedge-stacks, sycophancy, and em-dash pileups.

### ★ design.md / Google Labs Code (24k stars, April 2026)
**What:** YAML frontmatter + markdown for design tokens — colors, type, spacing as agent-readable specs.
**Why it's a diamond:** The pattern (structured design context for agents) is extractable even without the CLI tool.
**AoA extraction:** Merge into `raw-cut` persona as a "design token discipline" section.

### ★ AI Berkshire / investment research (8.1k stars, April 2026)
**What:** Four investment masters (Buffett, Munger, Duan Yongping, Li Lu) as opposing viewpoints that generate real tension.
**Why it's a diamond:** The "opposing named personas debate" pattern is exactly our committee protocol, applied to finance. Validates the approach.
**AoA extraction:** `ledger` persona (finance) + merge the "opposing debate" pattern into `conductor` agent's committee protocol as a worked example.

### ★ garrytan/gstack (922 stars/day, June 2026)
**What:** 23 opinionated tools covering CEO, Designer, Eng Manager, Release Manager, Doc Engineer, QA roles.
**Why it's a diamond:** Role-as-tool pattern. Each role is a scoped agent with clear boundaries.
**AoA extraction:** Several of these are already covered by AoA entries. Cherry-pick the QA and Release Manager methods if they pass the merge-vs-split test.

---

## 4. TOP CONTENDER PROJECTS TO MONITOR

| Project | Stars | Why watch it | AoA relevance |
|---|---|---|---|
| **OpenClaw** | 188k (fastest repo ever) | Self-hosted agent + 5,700 community skills + SOUL.md pattern | Their SOUL.md = our persona format. 177 production configs across 24 categories. Massive extraction target. |
| **obra/superpowers** | 85k | Already partially mined. 14 composable skills. | Continue mining: systematic-debugging sub-skills, condition-based-waiting |
| **agent-skills** | 69k | Production-grade engineering skills | Overlaps with what we have but may have domain-specific skills worth extracting |
| **awesome-cursorrules** | 40k | 130+ cursor rules | Mostly mined. Watch for new additions. |
| **ai-boost/awesome-prompts** | 8.1k | 300+ prompts, actively growing | Still 250+ unmined prompts. Next pass should target domain-specific ones. |
| **NVIDIA/skills** | New, rising | NVIDIA's own agent skills for agentic platforms | Could contain hardware/compute-specific methods |
| **deer-flow (ByteDance)** | 25k+ | Long-horizon super-agent with memory, subagents | Architecture patterns may be extractable |

---

## 5. RECOMMENDED EXTRACTION ORDER (next sessions)

### Immediate (next 1-2 sessions)
1. **`distiller`** persona — from stop-slop + talk-normal + headroom patterns. Highest-impact single addition.
2. **`compass`** persona — product manager. From garrytan/gstack CEO/PM role + ai-boost PM prompts.
3. **`razor`** micro-workflow — LazyCodex YAGNI ladder merged into build-chain.
4. **`ledger`** persona — financial analysis. From AI Berkshire + ai-boost CFO/financial.

### Near-term (next 3-5 sessions)
5. **`firehose`** agent — incident response. From SRE/incident commander patterns.
6. **`scaffold`** persona — DevOps/platform engineering. From ai-boost platform_engineer_iac + cloud_architect.
7. **OpenClaw SOUL.md mining** — 177 production configs. Massive extraction run with heavy merge-protocol filtering.
8. **`peer`** agent — academic peer review. From ai-boost Academic_Peer_Reviewer.

### Horizon (ongoing)
9. **`bouncer`** persona — content moderation / trust & safety
10. **`dragnet`** persona — OSINT / intelligence analysis
11. **Social signal mode** for `scout` — from last30days-skill pattern
12. **Design token discipline** merged into `raw-cut` — from design.md pattern
13. **Continuous monitoring** — weekly check of GitHub Trending for new rough diamonds

---

## 6. OPTIMIZATION NOTES

### What's working
- Merge protocol prevents bloat effectively
- AoA naming convention creates identity
- Three-layer separation (persona/agent/workflow) is validated by every major project we studied
- Schema format (YAML frontmatter + markdown) matches the emerging standard

### What needs improvement
- **Research prompts need updating** — AoA-RESEARCH-PROMPT.md and AoA-QUICK-PROMPT.md still reference old names
- **Cross-references** — personas should reference which agents commonly cast them, and vice versa
- **Difficulty/complexity tags** — some entries are simple (midwife), some are heavy (archaeologist). Users need a signal.
- **Example outputs** — the highest-rated prompt repos include before/after examples. AoA entries should too.
- **Community intake pipeline** — CONTRIBUTING.md describes the process but there's no issue template or PR template to guide submissions
- **Registry.json** — listed in the structure but never created. Needed for programmatic discovery.

---

*This roadmap is a living document. Update after each extraction session.*
