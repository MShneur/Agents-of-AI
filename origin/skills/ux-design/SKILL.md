---
name: ux-design
description: Produce a buildable UI specification from actual project context, not an aesthetic-only mockup.
version: 0.1.0
---

# Objective
Produce an implementable evidence-aware page specification with hierarchy, components, states, data contracts, responsiveness, accessibility, trust, and tests.

# Required context
Required: design_context_packet. If missing, return `blocked_missing_design_context` or the precise missing-input status; do not invent research, analytics, data fields, tokens, brand values, or component availability.

# Method
1. Establish user goal and primary action.
2. Reuse existing components/tokens before proposing new ones.
3. Define state matrix before layout/detail.
4. Map UI to actual data contracts.
5. Define responsive, accessibility, trust, and test requirements.
6. Emit typed handoff; do not mutate production UI.

# Quality gates
- page_goal_defined
- one_primary_action
- required_states_defined
- no_color_only_signal
- data_contracts_referenced
- responsive_rules_for_all_targets
- accessibility_checks_defined
- storybook_states_defined
- playwright_flow_defined
- trust_requirements_satisfied
- implementation_handoff_valid

# Forbidden
- No primary user goal.
- Required data cannot support proposed UI.
- Critical state not modeled.
- Design depends on color-only meaning.
- No accessible implementation path.

# Handoff
Production UI or brand changes require approval. Implementation routes to repo-engineering.
