from pathlib import Path
import json,yaml
from jsonschema import Draft202012Validator
root=Path(__file__).resolve().parents[1]
for p in root.rglob("*.json"):
    try: json.loads(p.read_text())
    except Exception as e: raise SystemExit(f"JSON FAIL {p}: {e}")
for p in root.rglob("*.yaml"):
    try: yaml.safe_load(p.read_text())
    except Exception as e: raise SystemExit(f"YAML FAIL {p}: {e}")
for p in root.rglob("*.schema.json"):
    Draft202012Validator.check_schema(json.loads(p.read_text()))
print("B07 JSON/YAML/all-schema validation PASS")
