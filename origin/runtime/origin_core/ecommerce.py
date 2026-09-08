from __future__ import annotations
from dataclasses import dataclass
from typing import Any

COMMERCIAL_FIELDS = {
    "affiliate_commission_rate","merchant_payout","affiliate_network_preference",
    "retailer_relationship","sponsor_payment","expected_revenue_per_click",
}
ALLOWED_EDITORIAL_FIELDS = {
    "evidence_quality","product_identity_confidence","current_price_context",
    "historical_price_context","cross_retailer_comparison","condition",
    "shipping_and_membership_clarity","freshness","user_selected_preferences",
}
CAPS = {
    "community_report_only":45,
    "variant_ambiguous":35,
    "price_stale":40,
    "conflicting_price":20,
    "coupon_or_membership_unknown":60,
}
SCORE_COMPONENTS = {
    "exact_identity_confidence":25,
    "current_price_evidence":15,
    "historical_price_context":20,
    "cross_retailer_context":15,
    "all_in_price_clarity":10,
    "availability_confidence":5,
    "source_reliability":10,
}

@dataclass(frozen=True)
class DealDecision:
    score: float
    classification: str
    publication_status: str
    caveats: tuple[str,...]
    allowed_copy: tuple[str,...]

def editorial_rank_inputs(payload: dict[str, Any]) -> dict[str, Any]:
    if COMMERCIAL_FIELDS.intersection(payload):
        raise ValueError("commercial_input_in_editorial_rank")
    return {k:v for k,v in payload.items() if k in ALLOWED_EDITORIAL_FIELDS}

def commerce_entity_separation(product:dict[str,Any], offer:dict[str,Any], observation:dict[str,Any]) -> list[str]:
    errors=[]
    if any(k in product for k in ("price","current_price","availability","inventory")):
        errors.append("product_contains_offer_state")
    if any(k in offer for k in ("current_price","availability","inventory")):
        errors.append("offer_contains_time_bound_state")
    if not observation.get("observed_at"):
        errors.append("observation_missing_time")
    if not observation.get("channel"):
        errors.append("observation_missing_channel")
    return errors

def disclosure_gate(*, required:bool, text:str|None, placement:str|None) -> tuple[bool,list[str]]:
    if not required:
        return True,[]
    problems=[]
    normalized=(text or "").casefold()
    if not text or not any(x in normalized for x in ("earn","paid","commission")):
        problems.append("relationship_not_understandable")
    if placement not in {"adjacent","immediately_before"}:
        problems.append("disclosure_not_proximate")
    return not problems,problems

def compute_score(component_fraction:dict[str,float], flags:set[str]|None=None) -> float:
    total=0.0
    for name,max_points in SCORE_COMPONENTS.items():
        frac=max(0.0,min(1.0,float(component_fraction.get(name,0.0))))
        total += max_points*frac
    for flag in flags or set():
        if flag in CAPS:
            total=min(total,CAPS[flag])
    return round(total,2)

def evaluate_deal(*, current_price:float, list_price:float|None=None, exact_identity:bool=True,
                  history:dict[str,Any]|None=None, comparables:list[dict[str,Any]]|None=None,
                  community_report:bool=False, stale:bool=False, conflicting:bool=False,
                  coupon_required:bool=False, coupon_terms:str|None=None,
                  membership_required:bool=False, membership_terms:str|None=None,
                  disclosure_required:bool=False, disclosure_text:str|None=None,
                  disclosure_placement:str|None=None) -> DealDecision:
    flags=set()
    caveats=[]
    allowed=[]
    if not exact_identity:
        flags.add("variant_ambiguous"); caveats.append("Exact variant identity is not confirmed.")
    if community_report:
        flags.add("community_report_only"); caveats.extend(["Reported at one store or by the community.","Availability may vary."])
    if stale:
        flags.add("price_stale"); caveats.append("The observed price is stale.")
    if conflicting:
        flags.add("conflicting_price"); caveats.append("Conflicting price observations require review.")
    if coupon_required and not coupon_terms:
        flags.add("coupon_or_membership_unknown"); caveats.append("Coupon eligibility not confirmed.")
    if membership_required and not membership_terms:
        flags.add("coupon_or_membership_unknown"); caveats.append("Membership terms not confirmed.")
    disclosure_ok, problems=disclosure_gate(required=disclosure_required,text=disclosure_text,placement=disclosure_placement)
    if not disclosure_ok:
        caveats.extend(problems)

    fractions={
      "exact_identity_confidence":1.0 if exact_identity else .5,
      "current_price_evidence":1.0,
      "historical_price_context":1.0 if history else 0.0,
      "cross_retailer_context":1.0 if comparables else 0.0,
      "all_in_price_clarity":1.0 if not {"coupon_or_membership_unknown"}.intersection(flags) else .25,
      "availability_confidence":0.5 if community_report else 1.0,
      "source_reliability":0.5 if community_report else 1.0,
    }
    score=compute_score(fractions,flags)

    if conflicting:
        classification="conflicting"; publication="suppressed"
    elif community_report:
        classification="community_reported"; publication="needs_review"
    elif list_price is not None and not history and not comparables:
        classification="price_drop_observed"; publication="eligible" if disclosure_ok else "suppressed"
        pct=(list_price-current_price)/list_price*100 if list_price>0 else 0
        allowed.append(f"{pct:.0f}% below displayed list price")
    elif history and history.get("exact_variant") and current_price <= history["exact_variant"].get("observed_min", current_price):
        classification="strong_value"; publication="eligible" if disclosure_ok else "suppressed"
        h=history["exact_variant"]
        if h.get("days") and h.get("records"):
            allowed.append(f"lowest observed by this system in the last {h['days']} days")
    elif exact_identity:
        classification="possible_value"; publication="eligible" if disclosure_ok else "suppressed"
    else:
        classification="insufficient_evidence"; publication="needs_review"

    if flags.intersection({"variant_ambiguous","price_stale","coupon_or_membership_unknown"}) and publication=="eligible":
        publication="pending_validation"
    return DealDecision(score,classification,publication,tuple(caveats),tuple(allowed))

def taxonomy_facet_allowed(*, predictable:bool, changes_discovery:bool, reliable:bool, duplicates:bool) -> bool:
    return predictable and changes_discovery and reliable and not duplicates

def correction_triage(reason:str) -> tuple[str,tuple[str,...]]:
    critical={"recalled_product_misidentified","false_price_claim","undisclosed_affiliate_link"}
    if reason in critical:
        return "critical",("suppress_public_claim_immediately","mark_under_review")
    return "normal",("mark_stale_or_review","investigate")

def correction_resolution(*, supportable:bool) -> tuple[str,tuple[str,...]]:
    if supportable:
        return "corrected",("preserve_original_record","preserve_original_evidence","preserve_change_log","create_regression_fixture")
    return "retracted",("preserve_original_record","preserve_original_evidence","preserve_change_log","create_regression_fixture")
