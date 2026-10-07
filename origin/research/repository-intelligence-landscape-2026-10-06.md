# Repository Intelligence Landscape — 2026-10-06

Status: Origin SCOUT / COMPARE / TRANSFER evidence record  
Scope: public GitHub mechanisms for repository understanding, capability discovery, skill creation/evaluation, and safe assimilation into Agents of AI.  
Method: mechanism-level comparison. No external source code or prompt text is copied into the AoA workflow. Public repositories are evidence sources, not authorities.

## Objective

Determine what Agents of AI should learn from projects that help an AI:

1. understand an unfamiliar repository;
2. select only the repository context it needs;
3. notice when its current capability set is insufficient;
4. search GitHub for materially different candidate approaches;
5. compare candidates without installing them;
6. recommend or assimilate useful mechanisms safely;
7. verify that a newly added capability actually improves behavior.

The result is implemented in `workflows/repository-intelligence-boot.md`.

## Landscape summary

| Family | Representative projects | Mechanism worth keeping | Disposition |
|---|---|---|---|
| Repo -> skill/context | YuJunZhiXue/github-skill-forge | API-first repo reconnaissance, context bundle, clone fallback, skill scaffold | ASSIMILATE selectively |
| Repo packing | yamadashy/repomix, coderamp-labs/gitingest | branch/SHA-aware remote ingest, ignore rules, token accounting, bounded pack fallback | ASSIMILATE |
| Structural repo maps | Aider-AI/aider | AST definitions/references -> graph rank -> token-budgeted repo map | ASSIMILATE |
| Symbolic code intelligence | oraios/serena, scip-code/scip | LSP/definition/reference-aware retrieval instead of whole-file reading | ASSIMILATE |
| Semantic retrieval | yoanbernabeu/grepai | meaning-based search + call graph + local refresh | ASSIMILATE as optional lane |
| Persistent context graph | potpie-ai/potpie | link code, history, issues, decisions, and team knowledge for long-lived projects | ASSIMILATE as heavy lane |
| Generated docs/codemap | AsyncFuncAI/deepwiki-open | wiki/diagram/codemap onboarding + RAG | RECOMMEND as orientation aid, not truth |
| Dynamic repository MCP | idosal/git-mcp | repo-specific/generic remote documentation + code search; `llms.txt` priority | RECOMMEND/USE when connected |
| Canonical GitHub access | github/github-mcp-server | read-only mode, lockdown filtering, direct repo/issue/PR/code access | USE when available |
| Repo-local agent context | OpenHands/OpenHands microagents | always-on repository instructions + triggered knowledge modules | ASSIMILATE loading-order concept |
| Agent tool bundles | SWE-agent/SWE-agent | modular tool bundles and bounded agent-computer interfaces | ASSIMILATE interface pattern |
| Skill discovery/quality | nekocode/skill-forge | auto-detect reusable workflows, separate trigger optimization, eval-driven improvement | ASSIMILATE selectively |
| Skill release gate | zztimur/skill-forge | deterministic inspection separated from qualitative review; pinned evaluator/candidate hashes | ASSIMILATE |
| Cross-agent skill acquisition | t115601251-hue/skillforge | local-first capability search -> GitHub discovery -> security review -> portable skill | ASSIMILATE strongly |
| Behavior-first skill testing | tripleyak/SkillForge and related public skill-forge work | baseline vs skill-enabled evaluation, regression tests, dedup-before-create | ASSIMILATE strongly |
| Gap-to-skill synthesis | bm629/agent-skills skill-forge | knowledge-gap trigger, research existing skills as source material without installing verbatim | ASSIMILATE |

## Detailed dispositions

### 1. YuJunZhiXue/github-skill-forge

Source:
- https://github.com/YuJunZhiXue/github-skill-forge
- https://github.com/YuJunZhiXue/github-skill-forge/blob/main/README_EN.md

Observed mechanisms:
- GitHub-API-first scan without requiring a local clone;
- automatic extraction of a smaller `context_bundle.md`;
- fallback to local clone when online retrieval fails;
- automatic skill-package scaffold.

Keep:
- zero-clone reconnaissance as a cheap first lane;
- explicit context bundle;
- fallback strategy;
- repo-to-capability conversion concept.

Reject or replace:
- popularity/stars as a quality or safety gate;
- fixed shallow sampling as sufficient repository understanding;
- mirror rotation as a default trust path;
- automatic promotion from repository summary to trusted skill.

AoA improvement:
- evidence/provenance and capability fit outrank popularity;
- progressive retrieval can escalate from docs/tree to structural/symbolic/semantic lanes;
- skill output must pass provenance and behavior verification.

### 2. yamadashy/repomix

Source:
- https://github.com/yamadashy/repomix

Observed mechanisms:
- remote repository packing;
- branch/tag/commit targeting;
- configurable include/exclude patterns;
- token counting;
- Tree-sitter-based compression;
- secret scanning;
- MCP tools and incremental search over packed outputs.

Keep:
- bounded pack as fallback when better retrieval is unavailable;
- branch/SHA identity;
- secret filtering;
- structural compression;
- incremental search instead of reading the entire packed artifact.

Reject:
- using a full-repo pack as the default orientation method for every task.

### 3. coderamp-labs/gitingest

Source:
- https://github.com/coderamp-labs/gitingest

Observed mechanism:
- extremely low-friction repository-to-prompt conversion from a URL.

Keep:
- simple digest lane as a portability fallback.

Merge decision:
- same family as Repomix; do not create a separate AoA method merely for URL convenience.

### 4. Aider-AI/aider

Source:
- https://github.com/Aider-AI/aider/blob/main/aider/website/docs/repomap.md

Observed mechanism:
- parse repository symbols;
- construct dependency/reference relationships;
- rank important parts of the codebase;
- fit the most useful repository map inside an explicit token budget;
- adapt the map to the active chat/task.

Keep:
- task-sensitive structural repo map;
- token-budget-aware ranking;
- "map first, fetch exact file later" interaction.

This is the preferred conceptual upgrade over GitHub Skill Forge's shallow fixed file sampling.

### 5. oraios/serena

Source:
- https://github.com/oraios/serena

Observed mechanism:
- language-server-driven symbolic retrieval and editing;
- find definitions/references/symbols using code structure rather than pure text;
- provider-neutral MCP exposure.

Keep:
- use symbolic retrieval when exact code relationships matter;
- repository intelligence should distinguish text retrieval from semantic code navigation.

Do not require:
- Serena itself as a mandatory AoA dependency.

### 6. scip-code/scip

Source:
- https://github.com/scip-code/scip

Observed mechanism:
- language-agnostic code-intelligence protocol for definitions, references, implementations, and index exchange.

Keep:
- a normalized definition/reference index is a useful repository-intelligence lane;
- implementation should prefer standard code-intelligence surfaces when available.

### 7. yoanbernabeu/grepai

Source:
- https://github.com/yoanbernabeu/grepai

Observed mechanism:
- semantic code search by intent;
- call-graph tracing;
- local-first index;
- file watching to keep the index fresh;
- MCP interface.

Keep:
- semantic search is a distinct lane from exact grep and LSP symbols;
- call-relationship queries can materially reduce context needed for debugging/refactoring.

### 8. potpie-ai/potpie

Source:
- https://github.com/potpie-ai/potpie

Observed mechanism:
- persistent context graph linking code, structure, source history, decisions, team knowledge, and engineering workflows.

Keep:
- for large, long-running projects, repository intelligence may need durable cross-artifact relationships rather than a one-session text bundle.

Guardrail:
- context graphs are a heavy lane and should not be built for small tasks.

### 9. AsyncFuncAI/deepwiki-open

Source:
- https://github.com/AsyncFuncAI/deepwiki-open

Observed mechanisms:
- repository structure analysis;
- generated wiki pages;
- diagrams/codemaps;
- RAG-backed repository questions;
- local storage options.

Keep:
- generated wiki/codemap can accelerate onboarding.

Reject:
- treating generated documentation as canonical repository truth.

### 10. idosal/git-mcp

Source:
- https://github.com/idosal/git-mcp

Observed mechanisms:
- turn a public repository into a remote MCP documentation/code-search surface;
- repo-specific endpoint for bounded scope or generic endpoint for dynamic discovery;
- prefer `llms.txt`, then AI-oriented docs, then README;
- targeted documentation and code search instead of bulk ingestion.

Keep:
- ephemeral remote repository access can be preferable to installing a new local tool;
- repository-specific scope is safer and more relevant than an unbounded generic source.

### 11. github/github-mcp-server

Source:
- https://github.com/github/github-mcp-server

Observed mechanisms:
- direct read/write repository operations;
- explicit read-only mode;
- lockdown mode intended to reduce prompt-injection exposure from untrusted public content;
- repository, code, issues, PRs, workflow, and security surfaces.

Keep:
- read-only/reduced-authority profiles should be the default for repository reconnaissance;
- external content filtering is separate from authorization and should not be misrepresented as a security boundary.

### 12. OpenHands repository microagents

Source:
- https://github.com/OpenHands/OpenHands
- public microagent documentation in the OpenHands ecosystem

Observed mechanism:
- repository-specific instructions load first;
- reusable knowledge modules load when relevant triggers appear;
- repository instructions remain local to the project.

Keep:
- explicit loading order: project authority first, then task-relevant reusable knowledge;
- project-specific guidance should not be globalized into AoA core.

### 13. SWE-agent/SWE-agent

Source:
- https://github.com/SWE-agent/SWE-agent
- https://github.com/SWE-agent/SWE-agent/blob/main/docs/config/tools.md

Observed mechanism:
- tool bundles package executable tools, state tools, configuration, setup, and documentation as modular agent-computer interfaces.

Keep:
- repository intelligence can select among bounded tool surfaces rather than handing every agent an unrestricted shell.

### 14. nekocode/skill-forge

Source:
- https://github.com/nekocode/skill-forge

Observed mechanisms:
- detect when a completed complex task should become a reusable skill;
- separate content quality from trigger quality;
- evaluate and iteratively improve trigger descriptions;
- keep low-trust research material separate from promoted high-trust draft content;
- persistent project-local working state.

Keep:
- discovery of reusable capability should be triggered by demonstrated complexity/repetition, not only explicit user wording;
- trigger quality is independently testable;
- low-trust external findings should not automatically become active instructions.

Reject:
- host-specific hooks as a mandatory AoA runtime requirement.

### 15. zztimur/skill-forge

Source:
- https://github.com/zztimur/skill-forge

Observed mechanisms:
- deterministic package inspection separated from agent judgment;
- referenced-file and metadata validation;
- release-gate review;
- independent evaluator using pinned hashes;
- reduced-credential isolated execution;
- explicit distinction between unavailable validation and evidence of invalidity.

Keep:
- separate deterministic evidence from qualitative review;
- pin evaluator and candidate artifacts when a capability is being release-gated;
- missing/failed validator execution remains `NOT RUN`, not an inferred failure.

### 16. t115601251-hue/skillforge

Source:
- https://github.com/t115601251-hue/skillforge

Observed mechanisms:
- natural-language request -> search installed/local skills first;
- if missing, search GitHub;
- deeper candidate review including supply-chain/security data;
- portable installation/discovery across multiple agent runtimes;
- central skill directory with runtime-specific discovery bridges.

Keep:
- **local AoA/capability inventory first, external discovery second**;
- security review belongs between discovery and installation;
- capability discovery should be cross-runtime rather than tied to one vendor.

This is one of the strongest confirmations of the intended AoA flow.

### 17. tripleyak/SkillForge and behavior-first evaluation pattern

Source:
- https://github.com/tripleyak/SkillForge

Observed mechanism:
- triage before creation;
- baseline task execution compared with capability-enabled execution;
- per-skill regression tests;
- deduplication before creating a new skill;
- ecosystem health checks.

Keep:
- behavior change must be tested, not inferred from polished prose;
- before creating a capability, choose among `USE | IMPROVE | CREATE | COMPOSE | CLARIFY`-style dispositions;
- regression examples should survive future edits.

### 18. bm629/agent-skills — skill-forge pattern

Source:
- https://github.com/bm629/agent-skills/blob/main/docs/skills/skill-forge.md

Observed mechanism:
- a knowledge gap can trigger targeted research;
- existing public skills are source material but are not installed verbatim;
- research results are verified before synthesis;
- broad topics may fan out into multiple focused capabilities.

Keep:
- gap-triggered capability synthesis;
- source material does not become executable instruction by default;
- split broad capability gaps only when methods are materially different.

## Cross-project mechanism synthesis

### A. Boot should be mandatory but cheap

Every substantial repo-backed AoA run should orient itself to live repo authority and map the task surface.

It should **not** search GitHub automatically when:
- the needed capability already exists;
- the relevant repository context is already known;
- the task is trivial.

### B. Repository understanding is multi-lane

No single external project has the best strategy for every codebase.

Preferred escalation:

```text
docs/tree
-> AST/symbol map
-> symbolic/semantic retrieval
-> context graph when warranted
-> bounded packed digest fallback
-> generated wiki only as orientation aid
```

### C. Capability acquisition is a loop

```text
task
-> current AoA/tool inventory
-> exact gap
-> external candidate search
-> candidate board
-> provenance/security gate
-> USE | ASSIMILATE | RECOMMEND | DEFER | REJECT
-> behavioral verification
-> registry/roster update if accepted
-> resume task
```

### D. "Repository quorum" should remain metaphorical

A set of repositories cannot disagree or reason.

The safe implementation is a **Repository Candidate Board**:
- each repository is a competing implementation/evidence source;
- Sieve applies one rubric across all candidates;
- a forced dissent pass challenges the leader;
- a reversal condition is recorded.

If a consequential human decision remains after the evidence comparison, use the actual AoA Quorum/Human Gate rather than pretending repositories participated.

### E. Recommendation is a first-class result

External discovery should not force installation.

A strong result may simply be:

```text
[GITHUB CANDIDATE]
Repository: owner/repo
Why it helps: ...
Try it for: ...
Do not trust automatically: ...
Install now: NO
Disposition: RECOMMEND
```

This preserves user choice and keeps research separate from execution.

## What was deliberately rejected

- star-count thresholds as safety;
- automatic trust of generated `SKILL.md` files;
- global installation before capability fit is known;
- fixed shallow scans as sufficient understanding;
- whole-repository prompt dumps as the default;
- generated documentation as canonical truth;
- mirror rotation around canonical GitHub as the normal path;
- repository popularity as a substitute for security/provenance;
- prose-only self-evaluation of a skill without behavior tests;
- external instructions becoming active simply because they are Markdown.

## Clean-room statement

The AoA implementation stores mechanism-level abstractions written independently from the public sources above.

No external project source code was copied into `workflows/repository-intelligence-boot.md`.

If a future lane deliberately imports code from one of these projects, it must separately verify the exact license/revision, preserve required attribution, and record that reuse as licensed reuse rather than clean-room assimilation.

## Recommended internal routing

- **Agents of AI:** Repository Intelligence Boot workflow, repo-context methods, capability-gap loop, candidate comparison, recommendation/assimilation receipts.
- **Origin:** source archaeology, provenance, mechanism extraction, clean-room transfer.
- **Repo Nanny:** maintenance-triggered capability gaps and improvement scans.
- **R&Duck:** may invoke the workflow when execution needs a missing capability, but does not own the capability library.
- **CTRL-AI:** governs consequential permission/security gates; no governance rules are embedded in the AoA workflow itself.

## Acceptance tests for the new AoA workflow

1. Given a repo-backed task with an existing capable AoA method, it should stop before external search.
2. Given a named capability gap, it should search for materially different repository mechanisms rather than returning a popularity list.
3. Given a third-party `SKILL.md`, it should inspect/provenance-gate it before loading.
4. Given Aider/Serena/Repomix-style options, it should choose the smallest context lane that can answer the task.
5. Given a promising project that should not be installed, it should emit a GitHub Candidate Card.
6. Given a candidate overlapping an AoA entry, it should strengthen/merge rather than duplicate.
7. Given a newly synthesized skill/capability, it should require behavior-oriented verification rather than accepting prose quality alone.
8. Given external research that becomes a side quest after the capability gap is resolved, it should return to the original task.
