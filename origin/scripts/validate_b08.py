from pathlib import Path
import json,yaml
from jsonschema import Draft202012Validator
root=Path(__file__).resolve().parents[1]
for p in root.rglob('*.json'):
    obj=json.loads(p.read_text())
    if p.name.endswith('.schema.json'): Draft202012Validator.check_schema(obj)
for p in root.rglob('*.yaml'): yaml.safe_load(p.read_text())
print('B08 JSON/YAML/all-schema validation PASS')
