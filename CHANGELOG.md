# Agents of AI — Changelog

This log tracks material public changes to the Agents of AI repository. It is intentionally higher-level than Git history: the goal is to let someone rebuilding or revisiting the project understand what changed without reading every commit.

For fast-moving tool/API changes, also see [`tools/CHANGELOG.md`](tools/CHANGELOG.md).

## 2026-09-19 — Easy Handoff / Zero Handoff

- Added `workflows/easy-handoff.md` as the default AoA reporting/continuity layer for substantial work.
- Split long-task reporting into a compact AI-readable execution/state trace and a one-screen operator handoff.
- Added evidence-backed progress rules: fixed denominators, explicit scope deltas, nested milestones, and no progress credit for failed attempts.
- Added compact status semantics for success, failure, halt, recommendation, defer, and next action.
- Added a Human Gate bridge so consequential forks are resolved through Human Gate/Quorum before interrupting the operator when existing authority permits.
- Made Easy Handoff the first mandatory repository-agent boot rule in `AGENTS.md`.
- Added design provenance from a live named-practitioner Quorum-style review; practitioners are method references only and did not participate or endorse.
- Library roster is now **86 entries**: 23 personas, 13 agents, 17 workflows, 17 techniques, 4 modes, 6 teams, 6 failures.

## 2026-09-14 — Pathwise causal diagnosis and repair refinement

### Root Cause v2.0

- Refined the existing Root Cause workflow rather than adding a duplicate debugging workflow.
- Changed the unit of diagnosis from a generic component label to the **complete execution path** when hosts, providers, runtimes, browsers, queues, webhooks, workers, state lifecycles or network paths materially differ.
- Added a causal-evidence ladder: `OBSERVED -> REPRODUCED -> FACTOR_MAPPED -> ISOLATED -> TRANSFER_TESTED -> CERTIFIED`.
- Added natural baselines, wide path signatures, bidirectional ablation, evidence-driven interaction tests, perturb-and-restore checks, transfer testing, and explicit boundary-cause language for opaque external dependencies.
- Added route preservation and ranking: a working primary path no longer erases useful fallbacks, verifiers, specialists, blocked routes or research paths.
- Added compact progress-reporting guidance so detailed evidence can remain in durable project state without overwhelming operator-facing updates.

### Tracker v1.1

- Added path-local causality: a cause demonstrated on one path cannot be transferred to a sibling host/provider/runtime path without reproduction.
- Added handoff/queue/network/runtime context to the default debugger path signature.
- Added subtractive + additive ablation, interaction testing after narrowing, A -> B -> A restoration, and clean-state/transfer tests.
- Added explicit escalation to Root Cause v2.0 for multi-path, shared-infrastructure, interacting-factor or architecture-shaping defects.

The seven-layer roster count is unchanged; this release strengthens existing entries rather than adding a new composable item.

## 2026-08-21 — Public tools, APIs, walkthroughs, and documentation sync

### Library state

- Current live composable roster: **85 entries** across seven layers:
  - 23 personas
  - 13 agents
  - 16 workflows
  - 17 techniques
  - 4 modes
  - 6 teams
  - 6 failures
- Corrected README drift: the repository had 16 workflows while the README still reported 14.
- Added repository snapshot/versioning guidance in [`VERSIONING.md`](VERSIONING.md).
- Refreshed the root README structure and counts so Failures and the supporting `tools/` shelf are visible.
- Synchronized both `AoA-QUICK-PROMPT.md` and `AoA-RESEARCH-PROMPT.md` to the seven-layer model and current 16-workflow roster.
- Replaced the old July roadmap snapshot with a current `2026.08.21` roadmap that separates composable-library gaps from supporting-tools gaps.

### Tools and software

- Added a public supporting-tools layer without turning tools into an eighth composable AoA layer.
- Added [`tools/README.md`](tools/README.md) as the public landing page for the tools area.
- Added [`tools/software-recommendations.md`](tools/software-recommendations.md) with public, reusable software recommendations grouped by use case.
- Added [`tools/api-catalog.md`](tools/api-catalog.md) with public API, MCP, webhook, event-stream, and integration surfaces useful to AI workflows.
- Kept [`tools/free-tool-ledger.md`](tools/free-tool-ledger.md) as the quota/free/student evidence ledger and [`tools/publication-safety.md`](tools/publication-safety.md) as the privacy gate.
- Added [`tools/CHANGELOG.md`](tools/CHANGELOG.md) so fast-changing tooling history can evolve independently from the core library log.
- Updated `TOOLS.md` into the routing hub for recommendations, APIs, quotas, walkthroughs, safety, and contribution flow.
- Expanded `CONTRIBUTING.md` with tool/API/walkthrough evidence rules, privacy rules, versioning, and drift maintenance.
- Added a GitHub issue template so community members can recommend a tool, API, or walkthrough without publishing personal account data or secrets.

### CTRL Walkthrough

- Added the public responsive CTRL Walkthrough runner under [`tools/ctrl-walkthrough/`](tools/ctrl-walkthrough/).
- Moved walkthrough distribution to public, data-only JSON so ordinary walkthroughs do not require access to a private repository.
- Added a compact mobile UI and larger desktop UI that adapt to the available viewport.
- Added walkthrough selection, Start/Resume behavior, page-control finding/highlighting, success checks, custom JSON imports, and public HTTPS custom walkthrough loading.
- **v0.2.2:** added a visible `+` header button that directly opens the local custom-walkthrough file picker. This gives private/project-specific walkthroughs a download-then-import path without giving the public userscript private-repository credentials.
- Added canonical public walkthroughs for Termius, Cloudflare, F5Bot, Zyte, and Firecrawl → ChatGPT.
- Walkthrough content is public-safe only: no credentials, account IDs, private infrastructure, private repository paths, affiliate identifiers, or personal setup state.

### Supporting workflows

- Added `workflows/large-artifact-handoff.md` for provider-neutral large binary/file movement without stuffing files into AI context windows.
- Added `workflows/new-ai-workspace-bootstrap.md` for rebuilding a capable AI workspace without repeating connector/setup mistakes.
- Added/expanded the public Repo Nanny maintenance agent and public tooling/privacy guidance.

## 2026-08-10 — Reliability and language discipline

- Added the Controlled Vocabulary technique: one approved term per concept and one instruction per sentence.
- Added/strengthened failure classification and shared failure vocabulary.
- Expanded repository-maintenance and drift-detection patterns.

## 2026-07-16 — Teams and roster drift protection

- Added the Teams layer with Buildhouse, The Lab, Warroom, Pressroom, Frontline, and Counsel.
- Added mandatory-dissent/cross-examination patterns to team composition.
- Added `scripts/sync-roster.py` so research prompts are generated from live directory contents and README count drift can be detected.

## 2026-07-15 — Techniques and workflow expansion

- Added the Techniques layer.
- Added PRD, Root Cause, and Issue to Patch workflows.
- Expanded the repository from a persona/agent collection into a multi-layer reusable AI component library.

## 2026-07-09 — Initial public release

- Initial release with personas, agents, schemas, and the provider-agnostic library model.

## Maintenance rule

A material public change should update this file when it changes how users discover, compose, install, or maintain the library. Individual entry revisions still keep their own frontmatter version; do not mass-bump unrelated entries just because the repository changed.
