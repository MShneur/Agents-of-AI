from pathlib import Path
import json, yaml, sys
from jsonschema import Draft202012Validator

ROOT=Path(__file__).resolve().parents[1]
skills=["router","conversion-copy","seo-audit","pr-communications"]
required={"SKILL.md","manifest.yaml","input.schema.json","output.schema.json","rubric.yaml","evals/fixtures.jsonl","evals/assertions.yaml","references/allowed-sources.md","references/methods.md","policies/boundaries.md"}
errors=[]
for s in skills:
    d=ROOT/"skills"/s
    miss=[x for x in sorted(required) if not (d/x).exists()]
    if miss: errors.append(f"{s}: missing {miss}")
    for schema in ["input.schema.json","output.schema.json"]:
        Draft202012Validator.check_schema(json.loads((d/schema).read_text()))
    yaml.safe_load((d/"manifest.yaml").read_text()); yaml.safe_load((d/"rubric.yaml").read_text()); yaml.safe_load((d/"evals/assertions.yaml").read_text())
for p in (ROOT/"schemas").glob("*.schema.json"): Draft202012Validator.check_schema(json.loads(p.read_text()))
print("B02 validation PASS" if not errors else "\n".join(errors)); sys.exit(1 if errors else 0)
