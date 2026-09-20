# Repository agent rules

## Easy Handoff boot — mandatory

Before selecting agents, personas, workflows, teams, or tools for any substantial task, load `workflows/easy-handoff.md`. It governs the reporting/continuity layer, not project authority.

1. State the Agents-of-AI methods actually used and the executing model.
2. Tie progress to the canonical roadmap/ledger/checklist; never invent a denominator.
3. For long work, emit compact AI-readable state/evidence records instead of human narration.
4. End operator-facing updates with the Easy Handoff shape: progress, what just happened, next step; show fail/halt/recommend/defer only when applicable.
5. If a consequential fork can be resolved by Human Gate/Quorum within existing authority, resolve it before interrupting the operator. Before asking the human to perform any operational step, exhaust the safe tools/actions actually exposed to the current session (browser/profile/vault, connected apps, repo/runtime tools, nonproduction execution, etc.). Do not offload a task merely because manual human action would be easier.
6. A human-action request is allowed only when the remaining step is genuinely user-only after that tool-exhaustion pass: explicit permission/release authority, irreversible choice, user-only preference/evidence, credential/2FA/physical-device interaction, or an unavailable capability that cannot be safely automated.
7. When user action is genuinely required, the operator-facing message MUST be the final message of that turn and use the Easy Handoff human-action format: a red `HOLD — USER ACTION REQUIRED` line (or the red-circle fallback when text color is unsupported), followed by only the smallest baby-step instructions the human must perform. Do not bury the request in status prose or ask the human to troubleshoot the agent's tools.
8. Never expose private chain-of-thought; continuity records contain actions, evidence, decisions, errors, files, and state transitions only.

## GitHub Actions conservation — mandatory

GitHub Actions is a scarce, last-resort execution surface.

1. Default to **no GitHub-hosted Actions run**.
2. Prefer direct/local execution, existing external or self-hosted compute, and repository/API operations before GitHub Actions.
3. Routine tests, lint, research, scans, docs, builds, agent work, monitoring, wakeups, keepalives, and repeated verification MUST NOT use GitHub-hosted Actions when an equivalent safe non-Actions path exists.
4. Automatic triggers (`push`, `pull_request`, `schedule`, `workflow_run`, issue events, or similar) are prohibited unless the repository owner explicitly approves the recurring Actions spend and the workflow documents why a non-Actions path is insufficient.
5. Hosted workflows default to `workflow_dispatch` and exist only as explicit manual fallback. Release/deploy workflows must also remain manual unless the owner explicitly approves automation.
6. Before any dispatch or rerun, use the narrowest job possible; never rerun successful jobs; cancel superseded work; avoid unnecessary matrices; set timeouts and concurrency.
7. Never use GitHub Actions to wake, ping, or keep a server/service alive.
8. Any change that relaxes this policy requires explicit human approval.

This rule is cost/reliability governance and applies to every agent and workflow operating in this repository.

## Origin design boot — mandatory for Designer/product UI work

When a task creates, redesigns, restyles, or continues a website/product UI, component system, design system, or screenshot-to-spec workflow:

1. Load `origin/adapters/chatgpt/skill/SKILL.md` before Designer/build execution.
2. Origin is the **primary pre-design/design-authority protocol**. Establish current implementation truth, approved visual-intent truth, canonical token/component owners, and the actual delta before any Designer/build tool generates or rebuilds screens.
3. Current repo/runtime/tests/ledger state outranks handoff/chat claims about what is implemented. Approved/locked visual references and accepted design decisions may outrank an incomplete current render for intended visual direction.
4. Emit an `ORIGIN PACKET` before visual generation. Preserve verified `BUILT` work; classify the rest as `MISSING`, `BROKEN`, `OBSOLETE`, or `UNKNOWN`.
5. Historical Origin branches/PRs are provenance until reconciled with current main; never bulk-import them or their design assumptions as current truth.
6. After the Origin Packet, route only to the tools the task actually needs. Figma is preferred for canonical editable design-system work; visual generators are optional exploration; builders implement; browser QA verifies rendered behavior.

If load-bearing authority conflicts remain unresolved, hold Designer execution and surface the conflict instead of inventing a new direction.


## Cross-project worker continuity — mandatory

For every project or lane, establish one authoritative handoff/control record and a project-specific approved file manifest before dispatch. Every worker gets one bounded assignment, named method/persona, owner, allowed files, forbidden surfaces, baseline revision, midpoint/completion gates, and one return path to that same handoff. Parallel workers must have disjoint file ownership; the coordinator integrates and updates the shared handoff. Do not create competing handoffs, shadow ledgers, duplicate style systems, or unregistered paths. Use `workflows/build-chain.md#bounded-worker-continuity-contract` for the generic packet and midpoint rules; project-specific constraints remain in the project handoff.
