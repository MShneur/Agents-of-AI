from pathlib import Path
import json, yaml
from jsonschema import Draft202012Validator
from origin_core.repo_engineering import *
ROOT=Path(__file__).resolve().parents[2]

def y(p): return yaml.safe_load((ROOT/p).read_text())
def j(p): return json.loads((ROOT/p).read_text())

def test_task_and_context_schemas_accept_bounded_examples():
    Draft202012Validator(j("schemas/code-task-input.schema.json")).validate({"task_id":"T1","repository":"o/r","objective":"fix","file_scope":["src/a.py"],"acceptance_tests":["pytest tests/a.py"]})
    Draft202012Validator(j("context/context-pack.schema.json")).validate({"id":"ctx-T1-v1","task_id":"T1","repo":"o/r","base_commit":"abc","include":[{"path":"src/a.py","reason":"target"}],"exclude":[".env*"],"limits":{"max_files":35,"max_chars":120000,"max_tokens_estimate":30000}})

def test_secret_and_noise_paths_blocked():
    assert not context_path_allowed(".env.production")
    assert not context_path_allowed("node_modules/x.js")
    assert not context_path_allowed("dist/app.js")
    assert context_path_allowed("src/app.py")

def test_lockfile_only_for_dependency_task():
    assert not context_path_allowed("package-lock.json")
    assert context_path_allowed("package-lock.json", dependency_task=True)

def test_command_allowlist_is_deny_by_default():
    p=y("skills/repo-engineering/policies/command-allowlist.yaml")
    assert command_allowed("pytest runtime/tests",p)
    assert command_allowed("git diff --stat",p)
    assert not command_allowed("bash deploy.sh",p)
    assert not command_allowed("git push --force origin main",p)

def test_scope_explosion_requires_approval():
    d=scope_decision(13,200,True); assert not d.allowed and d.approval_required and "file_budget_exceeded" in d.reasons
    d=scope_decision(1,20,False); assert "scope_expansion_detected" in d.reasons

def test_ui_change_requires_rendered_browser_pass():
    assert browser_verification_required(["ui"])
    s,m=validation_gate(required_checks=["unit_tests"],passed_checks=["unit_tests"],independent_review=True,browser_required=True,browser_status="NOT_RUN")
    assert s=="FAIL" and "browser_verification" in m
    s,m=validation_gate(required_checks=["unit_tests"],passed_checks=["unit_tests"],independent_review=True,browser_required=True,browser_status="PASS")
    assert s=="PASS"

def test_author_cannot_self_certify_completion():
    s,m=validation_gate(required_checks=["unit_tests","lint"],passed_checks=["unit_tests","lint"],independent_review=False)
    assert s=="FAIL" and "independent_review" in m

def test_merge_deploy_and_migration_are_approval_bound():
    for a in ["merge","push","deploy","dependency_upgrade","database_migration","secret_change","external_write"]:
        assert not external_action_allowed(a,False)
        assert external_action_allowed(a,True)

def test_repair_loop_escalates_at_budget():
    assert repair_cycle_status(2)=="CONTINUE"
    assert repair_cycle_status(3)=="ESCALATE"

def test_docs_code_conflict_is_explicit():
    assert current_behavior_authority(True)=="CONFLICT_CODE_CURRENT"
