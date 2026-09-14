# Origin

Status: **portable Origin authority surface reconciled against current AoA main; historical B01-B08 core remains draft/unmerged**.

Origin is the R&D / provenance / first-principles layer inside Agents of AI. For product and website design, Origin is also the **primary pre-design/design-authority protocol**: Designer starts with Origin before generating, rebuilding, or restyling a screen or design system.

Current portable entrypoints:
- `agents/origin.md` — provider-agnostic Origin agent and Designer authority contract.
- `adapters/chatgpt/skill/SKILL.md` — self-contained ChatGPT/skill-surface protocol.

Historical Origin work remains preserved in draft PRs #10–#12. It is source/provenance, not current main truth. The large B01-B08 branch must be reconciled against current main before any broader import; this portable restoration intentionally does **not** import its old dark-first assumptions or 200+ files.

## Designer invariant

`Origin reconciliation -> Origin Packet -> Designer/tool execution -> independent validation`

For design work, Origin distinguishes:
- **current-state truth** — what the current repo/runtime/tests/ledger prove exists now;
- **visual-intent truth** — what approved visual references and accepted design decisions say the product should become.

Neither a handoff nor a current screenshot automatically resolves a conflict between those two.

## Ecosystem boundary

- CTRL-AI governs consequential policy/permission choices.
- R&Duck may remain Prime/autopilot and project lifecycle owner.
- Agents of AI supplies reusable methods.
- Origin establishes provenance, authority, first principles, and capability routing.

Origin does not grant itself external-write, deployment, publication, purchase, secret, or production authority.
