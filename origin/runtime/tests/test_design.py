from pathlib import Path
import json, yaml
from jsonschema import Draft202012Validator
from origin_core.design import *
ROOT=Path(__file__).resolve().parents[2]

def j(p): return json.loads((ROOT/p).read_text())
def y(p): return yaml.safe_load((ROOT/p).read_text())

def test_design_context_schema_and_missing_context():
    sample={"task_id":"D1","project_id":"p","page":{"route":"/x","page_type":"detail","primary_user_goal":"decide","primary_action":"open"},
    "implementation":{"framework":"Next","language":"TS","styling":"Tailwind","components":"registry","test_stack":["Storybook"]},
    "available_components":["Button"],"data_contracts":["offer.json"],"required_states":["loading","error"],"trust_requirements":["source"],
    "responsive_targets":[{"name":"small","width":320},{"name":"desktop","width":1280}]}
    Draft202012Validator(j("design/design-context.schema.json")).validate(sample)
    assert missing_design_context(sample)==[]
    assert "data_contracts" in missing_design_context({})

def test_page_spec_requires_state_and_tests():
    schema=j("design/page-spec.schema.json")
    valid={"task_id":"D1","page_goal":"decide","primary_action":"open","information_hierarchy":[{"rank":1,"element":"price","purpose":"decision"}],
    "component_inventory":[{"component":"Card","reuse_or_new":"reuse","states":["loading"],"data_requirements":["price"]}],
    "state_matrix":[{}],"responsive_rules":[{}],"accessibility_rules":[{}],"trust_rules":[],"tests":[{}],"handoff":{}}
    Draft202012Validator(schema).validate(valid)

def test_component_state_gate_rejects_happy_path_only():
    s,m=component_state_gate(["default","hover"],["loading","error","unknown"])
    assert s=="FAIL" and set(m)=={"loading","error","unknown"}

def test_color_only_signal_rejected():
    assert not color_only_allowed(False)
    assert color_only_allowed(True)

def test_accessibility_requires_automation_and_manual_when_applicable():
    assert accessibility_gate(automated_critical=0,automated_serious=0,manual_required=True,manual_status="NOT_RUN")[0]=="FAIL"
    assert accessibility_gate(automated_critical=0,automated_serious=0,manual_required=True,manual_status="PASS")[0]=="PASS"
    assert accessibility_gate(automated_critical=1,automated_serious=0,manual_required=False,manual_status="NOT_RUN")[0]=="FAIL"

def test_visual_gate_rejects_screenshot_only_and_component_only():
    assert visual_gate(stories_complete=True,route_rendered=False)[0]=="FAIL"
    assert visual_gate(stories_complete=True,route_rendered=True,screenshots_only=True)[0]=="FAIL"
    assert visual_gate(stories_complete=True,route_rendered=True)[0]=="PASS"

def test_plugin_requires_owner_license_and_security_review():
    good={"owner":"ux","source":{"license_status":"approved","security_review":True}}
    assert plugin_intake_allowed(good)
    assert not plugin_intake_allowed({"owner":"ux","source":{"license_status":"review_required","security_review":True}})
    assert not plugin_intake_allowed({"source":{"license_status":"approved","security_review":True}})

def test_token_policy_blocks_duplicate_and_raw_arbitrary_debt():
    assert not token_change_allowed(semantic_intent_duplicate=True,repeated_arbitrary_value=False,promoted_to_token=False,global_breaking=False,approved=False)
    assert not token_change_allowed(semantic_intent_duplicate=False,repeated_arbitrary_value=True,promoted_to_token=False,global_breaking=False,approved=False)
    assert token_change_allowed(semantic_intent_duplicate=False,repeated_arbitrary_value=True,promoted_to_token=True,global_breaking=False,approved=False)
    assert not token_change_allowed(semantic_intent_duplicate=False,repeated_arbitrary_value=False,promoted_to_token=False,global_breaking=True,approved=False)

def test_trust_sensitive_ui_requires_evidence_fields():
    assert trust_ui_gate(trust_sensitive=True,source=True,observed_at=True,status=True,caveat=False)[0]=="FAIL"
    assert trust_ui_gate(trust_sensitive=True,source=True,observed_at=True,status=True,caveat=True)[0]=="PASS"

def test_skill_packages_are_complete():
    required={"SKILL.md","manifest.yaml","input.schema.json","output.schema.json","rubric.yaml","evals/fixtures.jsonl","evals/assertions.yaml","references/allowed-sources.md","references/methods.md","policies/boundaries.md"}
    for skill in ["ux-design","design-system"]:
        base=ROOT/"skills"/skill
        present={str(p.relative_to(base)) for p in base.rglob("*") if p.is_file()}
        assert required<=present
