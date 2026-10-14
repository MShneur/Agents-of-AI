# AoA Continuity Contract v1.0 (review candidate)

**Role:** a provider-neutral machine transfer envelope plus offline validator. This is supporting infrastructure, not an eighth AoA composable layer, another handoff master, or a memory database.

## Routing into existing protocols

- **Backstitch:** resolve current authority, branch, owner, and working set; never treat historical recall as current truth.
- **Easy Handoff:** keep full machine transfer records in the project's existing canonical ledger, with a short Fixed / Broken / Recommendation view for the operator.
- **Build Chain, Single Dispatch, Stall Guard:** write and consume task-specific checks with named evidence and explicit target identity.
- **Jev / TypeSafe (optional):** rank relevant evidence or route ambiguous tasks. Typed judgments and probabilities are not proof of execution, permission, or external-target success; thresholds require task-specific calibration.
- **Claude Code hooks (optional host adapter):** snapshot record pointers before compaction and re-read authority after compaction or session restart; never assume the hooks are available in another provider.

## Fidelity and evidence rules

- A PASSED record requires at least one required check; every required check must be PASS with a named PASS evidence item whose target exactly matches requested_target.
- localhost evidence does not prove a requested remote website; see example.json.
- APPROVED decisions require approved_by and source, but the checker cannot independently authenticate approval or the evidence contents.
- actor.access_scope applies only to the reporting worker. It cannot be inherited from another chat, agent, browser or platform.
- UNKNOWN, NOT_TESTED and BLOCKED are valid transfer states. A successful schema check means structural consistency, not externally verified completion.
- Never place private session data, credentials, personal identifiers or protected URLs in public test fixtures. Real transfer records stay in the project's authorized ledger.

## Local use (Python standard library; no hosted Actions)

    python3 tools/continuity-kernel/verify_handoff.py tools/continuity-kernel/example.json
    python3 tools/continuity-kernel/verify_handoff.py tools/continuity-kernel/example.json --operator
    python3 -m unittest discover -s tools/continuity-kernel -p 'test_*.py'

The JSON Schema documents the wire shape; the stdlib validator adds cross-record target and evidence consistency checks. No Python host? Transfer the same typed record and enforce the gates manually; do not claim the executable checker ran.

## Non-duplication and provenance

This extends Easy Handoff and Backstitch, instead of creating a new workflow or autonomous memory authority. The record is consumed only after current authority and ownership are rechecked. No automatic state promotion or deployment is authorized.

Mechanism comparisons (not code copied): Claude Code lifecycle/compaction hooks; thedotmack/claude-mem layered observation recall; volcengine/OpenViking progressive context hierarchy; DietrichGebert/ponytail minimal-code discipline overlaps the already-live Razor workflow. All third-party executable plugins/hooks must pass Skill Provenance before adoption.

**Reversal condition:** remove or simplify if this causes more token/context overhead without fewer wrong-target transfers or authority-laundering incidents.
