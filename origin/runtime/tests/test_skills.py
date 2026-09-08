from pathlib import Path
import json
import yaml
from origin_core.skills import (
    validate_skill_package, missing_inputs, resolve_route, validate_handoff,
    claim_ledger_supports_public_claims, seo_schema_absence_status, pr_external_action_allowed
)

ROOT = Path(__file__).resolve().parents[2]

def y(path):
    return yaml.safe_load((ROOT / path).read_text())

def j(path):
    return json.loads((ROOT / path).read_text())

def test_skill_packages_complete():
    for skill in ["router","conversion-copy","seo-audit","pr-communications"]:
        assert validate_skill_package(ROOT / "skills" / skill) == []

def test_router_known_and_unknown():
    table = y("skills/router/routing-table.yaml")
    r = resolve_route("please write homepage headline", table, "R1")
    assert r and r.primary_skill == "conversion-copy" and r.model_alias == "copy_critical"
    assert resolve_route("perform unconfigured ritual", table, "R0") is None

def test_required_inputs_not_invented():
    manifest = y("skills/conversion-copy/manifest.yaml")
    missing = missing_inputs(manifest, {"page_type":"homepage","audience":"buyers"})
    assert "primary_action" in missing and "product_or_offer" in missing

def test_handoff_schema():
    payload={"handoff":{"from_skill":"conversion-copy","to_skill":"seo-audit","reason":"needs SEO validation",
      "owner_persona":"samir_holt","model_alias":"research_long","required_inputs":["page-copy.md"],
      "expected_outputs":["findings.json"],"acceptance_gate":"claims validate"}}
    validate_handoff(payload, j("schemas/skill-handoff.schema.json"))

def test_public_claim_requires_evidence():
    bad={"claims":[{"text":"best","type":"verified_observation","allowed":True,"evidence_id":None,"source":None,"observed_at":None,"caveat":""}],
         "unsupported_removed":[],"required_disclosures":[]}
    good={"claims":[{"text":"observed","type":"verified_observation","allowed":True,"evidence_id":"E1","source":"artifact","observed_at":"2026-09-07","caveat":""}],
         "unsupported_removed":[],"required_disclosures":[]}
    assert not claim_ledger_supports_public_claims(bad)
    assert claim_ledger_supports_public_claims(good)

def test_static_fetch_cannot_prove_schema_absence():
    assert seo_schema_absence_status("static_fetch", False) == "UNKNOWN"
    assert seo_schema_absence_status("browser_render", False) == "ABSENT"
    assert seo_schema_absence_status("static_fetch", True) == "PRESENT"

def test_pr_distribution_is_not_executable_by_skill():
    m=y("skills/pr-communications/manifest.yaml")
    assert not pr_external_action_allowed(m,"publish")
    assert not pr_external_action_allowed(m,"send")
    assert not pr_external_action_allowed(m,"contact_media")
