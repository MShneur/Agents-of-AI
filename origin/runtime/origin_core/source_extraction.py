from __future__ import annotations
from dataclasses import dataclass
from datetime import datetime, timezone
from hashlib import sha256
from html import unescape
import json, re
from typing import Any

METHOD_RANK = ["official_api","official_feed","json_ld","microdata","rdfa","opengraph","server_html","rendered_dom","manual_report","llm_normalization"]
PROHIBITED_JOB_FLAGS = {"uses_credentials","bypass_mode"}
SUSPICIOUS_PATTERNS = [
    r"ignore (all|any|the) previous instructions",
    r"system prompt",
    r"developer message",
    r"send .*secret",
    r"exfiltrat",
    r"use (this|the) tool",
    r"browse to https?://",
]

@dataclass(frozen=True)
class AdmissionDecision:
    status: str
    reasons: tuple[str, ...]

def source_admission_decision(record: dict[str, Any]) -> AdmissionDecision:
    reasons=[]
    if record.get("status") == "rejected": reasons.append("policy_rejected")
    if record.get("authentication_required"): reasons.append("authentication_required")
    if not record.get("kill_switch"): reasons.append("kill_switch_missing")
    rl=record.get("rate_limit") or {}
    if not rl.get("requests") or not rl.get("per_seconds"): reasons.append("rate_limit_missing")
    if not record.get("allowed_request_pattern"): reasons.append("request_pattern_missing")
    if reasons: return AdmissionDecision("REJECTED", tuple(reasons))
    if record.get("status") in {"approved","limited"}: return AdmissionDecision("ADMITTED", ())
    return AdmissionDecision("REVIEW_REQUIRED", ("source_not_approved",))

def choose_extraction_method(available: list[str]) -> str | None:
    aset=set(available)
    return next((m for m in METHOD_RANK if m in aset), None)

def browser_escalation_allowed(*, structured_available: bool, browser_approved: bool, access_challenge: bool=False, login_required: bool=False) -> bool:
    return browser_approved and not structured_available and not access_challenge and not login_required

def content_hash(content: str|bytes) -> str:
    b=content.encode() if isinstance(content,str) else content
    return sha256(b).hexdigest()

def build_snapshot(*, source_id:str, source_url:str, content:str, retrieved_at:str, storage_ref:str, content_type:str="text/html") -> dict[str,Any]:
    return {"snapshot_id":f"snap-{content_hash(content)[:16]}","source_id":source_id,"source_url":source_url,"retrieved_at":retrieved_at,"content_hash":content_hash(content),"content_bytes":len(content.encode()),"content_type":content_type,"storage_ref":storage_ref,"redactions":[]}

def _jsonld_blocks(html:str):
    rx=re.compile(r'<script\b[^>]*\btype\s*=\s*(["\'])application/ld\+json\1[^>]*>(.*?)</script>', re.I|re.S)
    for _quote, raw in rx.findall(html):
        raw=unescape(raw).strip()
        if not raw: continue
        try:
            data=json.loads(raw)
        except json.JSONDecodeError:
            continue
        if isinstance(data,list):
            yield from data
        elif isinstance(data,dict) and isinstance(data.get("@graph"),list):
            yield from data["@graph"]
        elif isinstance(data,dict):
            yield data

def extract_product_offer_jsonld(html:str) -> dict[str,Any] | None:
    for item in _jsonld_blocks(html):
        typ=item.get("@type")
        types={typ} if isinstance(typ,str) else set(typ or [])
        if "Product" not in types: continue
        offer=item.get("offers")
        if isinstance(offer,list): offer=offer[0] if offer else {}
        offer=offer if isinstance(offer,dict) else {}
        price=offer.get("price")
        if price is None and isinstance(offer.get("priceSpecification"),dict):
            price=offer["priceSpecification"].get("price")
        return {"title":item.get("name"),"sku":item.get("sku"),"gtin":item.get("gtin") or item.get("gtin13") or item.get("gtin12"),"price":price,"currency":offer.get("priceCurrency"),"availability":offer.get("availability"),"url":offer.get("url") or item.get("url")}
    return None

def public_price_claim_allowed(evidence:dict[str,Any], *, variant_resolved:bool, conflicting:bool=False) -> tuple[bool,list[str]]:
    missing=[]
    for k in ["source_url","observed_at","content_hash","parser_version"]:
        if not evidence.get(k): missing.append(k)
    integ=evidence.get("integrity") or {}
    if not integ.get("snapshot_stored"): missing.append("snapshot")
    if not integ.get("schema_valid"): missing.append("schema_valid")
    price=(evidence.get("fields") or {}).get("current_price") or {}
    currency=(evidence.get("fields") or {}).get("currency") or {}
    if price.get("normalized_value") is None: missing.append("current_price")
    if not currency.get("normalized_value"): missing.append("currency")
    if evidence.get("acquisition_method") == "llm_normalization": missing.append("llm_is_not_original_evidence")
    if not variant_resolved: missing.append("variant_unresolved")
    if conflicting: missing.append("conflicting_evidence")
    return (not missing, missing)

def freshness_status(observed_at:str|None, now:str, slo_minutes:int, aging_fraction:float=.75)->str:
    if not observed_at: return "unknown"
    a=datetime.fromisoformat(observed_at.replace('Z','+00:00'))
    b=datetime.fromisoformat(now.replace('Z','+00:00'))
    age=(b-a).total_seconds()/60
    if age > slo_minutes: return "stale"
    if age > slo_minutes*aging_fraction: return "aging"
    return "fresh"

def scraper_job_allowed(job:dict[str,Any])->tuple[bool,list[str]]:
    reasons=[]
    if not job.get("bounded_scope"): reasons.append("unbounded_scope")
    if job.get("uses_credentials"): reasons.append("credential_use")
    if job.get("bypass_mode"): reasons.append("bypass_mode")
    if not job.get("idempotency_key"): reasons.append("idempotency_missing")
    if not job.get("dlq_enabled"): reasons.append("dlq_missing")
    if not job.get("kill_switch"): reasons.append("kill_switch_missing")
    if int(job.get("max_concurrency",0))<1: reasons.append("concurrency_limit_missing")
    if int(job.get("max_attempts",0))<1 or int(job.get("max_attempts",99))>5: reasons.append("retry_budget_invalid")
    if int(job.get("freshness_slo_minutes",0))<1: reasons.append("freshness_slo_missing")
    return (not reasons,reasons)

def classify_change(*, previous:dict[str,Any], current:dict[str,Any]) -> str|None:
    if previous.get("identity") != current.get("identity"): return "conflict"
    pp,cp=previous.get("price"),current.get("price")
    if pp is not None and cp is not None and cp < pp: return "price_drop"
    if pp is not None and cp is not None and cp > pp: return "price_increase"
    pa,ca=previous.get("availability"),current.get("availability")
    if pa != ca:
        if str(pa).lower().endswith("outofstock") and str(ca).lower().endswith("instock"): return "restock"
        if str(ca).lower().endswith("outofstock"): return "out_of_stock"
        return "availability_change"
    return None

def change_dedupe_key(offer_id:str,event_type:str,before:Any,after:Any)->str:
    payload=json.dumps([offer_id,event_type,before,after],sort_keys=True,separators=(",",":"),default=str)
    return sha256(payload.encode()).hexdigest()

def quarantine_source_text(text:str)->dict[str,Any]:
    suspicious=any(re.search(p,text,re.I) for p in SUSPICIOUS_PATTERNS)
    return {"classification":"data_only","suspicious":suspicious,"wrapped":f"<untrusted_source_data>\n{text}\n</untrusted_source_data>","tool_authority":False}

def conflicts_suppress_publication(conflicts:list[str])->bool:
    return bool(conflicts)
