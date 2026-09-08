---
name: design-system
description: Create or evolve project-owned design tokens and component contracts with accessibility and migration rules.
version: 0.1.0
---

# Objective
Create or evolve a versioned internal design system using primitive, semantic, component, and state tokens plus governed components and testable usage rules.

# Required context
Required: token_registry, component_registry, implementation_stack. If missing, return `blocked_missing_design_context` or the precise missing-input status; do not invent research, analytics, data fields, tokens, brand values, or component availability.

# Method
1. Establish user goal and primary action.
2. Reuse existing components/tokens before proposing new ones.
3. Define state matrix before layout/detail.
4. Map UI to actual data contracts.
5. Define responsive, accessibility, trust, and test requirements.
6. Emit typed handoff; do not mutate production UI.

# Quality gates
- token_layer_defined
- component_state_model_defined
- accessibility_impacts_reviewed
- migration_path_defined
- no_global_breaking_change_without_flag
- visual_regression_plan_defined

# Forbidden
- New token duplicates existing semantic intent.
- Component has no clear ownership.
- System change requires broad unexplained refactor.

# Handoff
Production UI or brand changes require approval. Implementation routes to repo-engineering.
