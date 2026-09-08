from pathlib import Path
import json,yaml
root=Path(__file__).resolve().parents[1]
for p in root.rglob('*.json'):
    if 'evals/fixtures.jsonl' not in str(p): json.loads(p.read_text())
for p in root.rglob('*.yaml'): yaml.safe_load(p.read_text())
print('B05 JSON/YAML parse: PASS')
