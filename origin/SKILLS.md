# Origin Skills

Origin skills are narrow, versioned capability packages. They are not personas and they
do not silently expand scope.

## Progressive disclosure

1. Discovery: route using manifest metadata.
2. Activation: load one SKILL.md and its required context.
3. Execution: load only explicitly named references/resources.

## Mandatory package

Each executable skill contains:
- SKILL.md
- manifest.yaml
- input.schema.json
- output.schema.json
- rubric.yaml
- evals/fixtures.jsonl
- evals/assertions.yaml
- references/allowed-sources.md
- references/methods.md
- policies/boundaries.md

## Cross-skill rule

A skill that identifies adjacent work emits a typed handoff. It does not claim it also
performed that work.
