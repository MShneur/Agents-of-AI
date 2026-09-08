from pathlib import Path
import json,yaml
import pytest
from jsonschema import Draft202012Validator
from origin_core.ecommerce import *
from origin_core.skills import validate_skill_package

ROOT=Path(__file__).resolve().parents[2]
def j(p): return json.loads((ROOT/p).read_text())
def y(p): return yaml.safe_load((ROOT/p).read_text())

def test_core_schemas_accept_separated_entities():
    Draft202012Validator(j("schemas/canonical-product.schema.json")).validate({
      "product_id":"p1","title":"Drill","product_type":"drill","identity_confidence":{"state":"exact_identifier","score":1,"reasons":["gtin"]},"created_at":"2026-09-07T20:00:00Z"})
    Draft202012Validator(j("schemas/product-variant.schema.json")).validate({"variant_id":"v1","product_id":"p1","identity":{"gtin":"0123456789012","color":"red"},"condition":"new"})
    Draft202012Validator(j("schemas/retailer-offer.schema.json")).validate({"offer_id":"o1","variant_id":"v1","retailer":"Retailer","retailer_url":"https://example.com/p","condition":"new","source_policy_status":"approved"})
    Draft202012Validator(j("schemas/channel-listing.schema.json")).validate({"listing_id":"l1","offer_id":"o1","channel":"in_store","currency":"USD","store_id":"123"})

def test_product_and_offer_cannot_absorb_time_bound_state():
    errs=commerce_entity_separation({"product_id":"p","current_price":1},{"offer_id":"o"},{"observed_at":"now","channel":"online"})
    assert "product_contains_offer_state" in errs
    errs=commerce_entity_separation({"product_id":"p"},{"offer_id":"o","availability":"in_stock"},{"observed_at":"now","channel":"online"})
    assert "offer_contains_time_bound_state" in errs

def test_observation_requires_time_and_channel():
    assert set(commerce_entity_separation({}, {}, {}))=={"observation_missing_time","observation_missing_channel"}

def test_editorial_rank_rejects_commercial_economics():
    with pytest.raises(ValueError): editorial_rank_inputs({"evidence_quality":1,"affiliate_commission_rate":0.10})
    assert editorial_rank_inputs({"evidence_quality":1,"freshness":0.9})=={"evidence_quality":1,"freshness":0.9}

def test_affiliate_disclosure_must_be_understandable_and_proximate():
    ok,p=disclosure_gate(required=True,text="Affiliate link",placement="footer"); assert not ok
    ok,p=disclosure_gate(required=True,text="Some links may earn us a commission at no extra cost to you.",placement="adjacent"); assert ok

def test_list_price_only_is_qualified_not_savings_claim():
    d=evaluate_deal(current_price=49.99,list_price=99.99)
    assert d.classification=="price_drop_observed"
    assert "50% below displayed list price" in d.allowed_copy
    assert all("save" not in x.casefold() for x in d.allowed_copy)

def test_historical_low_requires_defined_exact_variant_coverage():
    d=evaluate_deal(current_price=49.99,history={"exact_variant":{"days":90,"observed_min":49.99,"records":30}})
    assert d.classification=="strong_value"
    assert d.allowed_copy==("lowest observed by this system in the last 90 days",)

def test_community_report_is_local_and_score_capped():
    d=evaluate_deal(current_price=.01,community_report=True)
    assert d.classification=="community_reported" and d.score<=45 and d.publication_status=="needs_review"
    assert "Availability may vary." in d.caveats

def test_variant_ambiguity_caps_and_blocks_clean_publish():
    d=evaluate_deal(current_price=20,exact_identity=False)
    assert d.score<=35 and d.publication_status=="needs_review"

def test_stale_price_caps_and_requires_validation():
    d=evaluate_deal(current_price=20,stale=True)
    assert d.score<=40 and d.publication_status=="pending_validation"

def test_conflicting_price_suppresses_publication():
    d=evaluate_deal(current_price=49.99,conflicting=True)
    assert d.score<=20 and d.classification=="conflicting" and d.publication_status=="suppressed"

def test_unknown_coupon_caps_score_and_adds_caveat():
    d=evaluate_deal(current_price=20,coupon_required=True,coupon_terms=None)
    assert d.score<=60 and "Coupon eligibility not confirmed." in d.caveats

def test_missing_affiliate_disclosure_suppresses():
    d=evaluate_deal(current_price=20,disclosure_required=True)
    assert d.publication_status=="suppressed"

def test_taxonomy_requires_user_decision_value():
    assert taxonomy_facet_allowed(predictable=True,changes_discovery=True,reliable=True,duplicates=False)
    assert not taxonomy_facet_allowed(predictable=True,changes_discovery=False,reliable=True,duplicates=False)

def test_corrections_preserve_history_and_retract_if_unsupported():
    sev,acts=correction_triage("false_price_claim"); assert sev=="critical" and "suppress_public_claim_immediately" in acts
    state,acts=correction_resolution(supportable=False); assert state=="retracted" and "preserve_original_record" in acts and "create_regression_fixture" in acts

def test_three_b06_skill_packages_complete():
    for skill in ["deal-evaluation","product-ecommerce","corrections"]:
        assert validate_skill_package(ROOT/"skills"/skill)==[]

def test_router_has_product_deal_and_correction_routes():
    routes=y("skills/router/routing-table.yaml")["routes"]
    primaries={r["primary_skill"] for r in routes}
    assert {"deal-evaluation","product-ecommerce","corrections"} <= primaries

def test_ecommerce_boundary_prohibits_checkout():
    text=(ROOT/"policies/ecommerce-boundary.md").read_text().casefold()
    assert "checkout engine" in text and "automated buyer" in text
