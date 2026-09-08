from __future__ import annotations
from dataclasses import dataclass
from datetime import datetime, timezone
from hashlib import sha256
import json
import re
from typing import Any

RISK_ORDER = {"R0":0,"R1":1,"R2":2,"R3":3,"R4":4}
SECRET_KEY_MARKERS = ("password","passwd","secret","api_key","apikey","authorization","cookie","session_id","session_token","access_token","refresh_token","private_key","connection_string")
SECRET_VALUE_PATTERNS = (
    re.compile(r"(?i)\b(?:OPENAI|ANTHROPIC|GOOGLE|GITHUB|GITLAB|AWS|AZURE)_[A-Z0-9_]*(?:KEY|TOKEN|SECRET)\s*=\s*\S+"),
    re.compile(r"(?i)\bBearer\s+[A-Za-z0-9._~+/=-]{12,}"),
    re.compile(r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----"),
)
INJECTION_PATTERNS = (
    re.compile(r"(?i)ignore (?:all |any |the )?previous instructions"),
    re.compile(r"(?i)reveal (?:the )?(?:system prompt|api key|secret)"),
    re.compile(r"(?i)(?:call|use) (?:this |the )?tool"),
    re.compile(r"(?i)(?:change|override) (?:permissions|policy)"),
    re.compile(r"(?i)send .*secret"),
)

@dataclass(frozen=True)
class Decision:
    decision: str
    rule_id: str
    risk_level: str
    reasons: tuple[str, ...] = ()
    constraints_checked: tuple[str, ...] = ()

def payload_hash(payload: Any) -> str:
    canonical=json.dumps(payload, sort_keys=True, separators=(",",":"), ensure_ascii=False)
    return sha256(canonical.encode()).hexdigest()

def contains_secret(value: Any) -> bool:
    if isinstance(value, dict):
        for k,v in value.items():
            if any(m in str(k).lower() for m in SECRET_KEY_MARKERS):
                return True
            if contains_secret(v): return True
        return False
    if isinstance(value, list):
        return any(contains_secret(v) for v in value)
    if isinstance(value, str):
        return any(rx.search(value) for rx in SECRET_VALUE_PATTERNS)
    return False

def redact_secrets(value: Any) -> Any:
    if isinstance(value, dict):
        out={}
        for k,v in value.items():
            if any(m in str(k).lower() for m in SECRET_KEY_MARKERS):
                out[k]="[REDACTED]"
            else:
                out[k]=redact_secrets(v)
        return out
    if isinstance(value, list):
        return [redact_secrets(v) for v in value]
    if isinstance(value, str):
        red=value
        for rx in SECRET_VALUE_PATTERNS:
            red=rx.sub("[REDACTED]", red)
        return red
    return value

def classify_untrusted_content(content: str) -> dict[str, Any]:
    hits=[rx.pattern for rx in INJECTION_PATTERNS if rx.search(content or "")]
    return {"content_trust":"untrusted","suspicious":bool(hits),"signals":hits,"authority":"data_only"}

def approval_valid(approval: dict[str,Any] | None, *, task_id:str, action_type:str, target:str, payload:Any, now:datetime|None=None) -> bool:
    if not approval: return False
    required={"approval_id","task_id","action_type","target","payload_hash","approver","issued_at","expires_at"}
    if not required.issubset(approval): return False
    if approval["task_id"] != task_id or approval["action_type"] != action_type or approval["target"] != target: return False
    if approval["payload_hash"] != payload_hash(payload): return False
    try:
        exp=datetime.fromisoformat(approval["expires_at"].replace("Z","+00:00"))
    except Exception:
        return False
    now=now or datetime.now(timezone.utc)
    if exp.tzinfo is None: exp=exp.replace(tzinfo=timezone.utc)
    return exp > now

def tool_decision(*, tool_name:str, lane:str, risk_level:str, permission:dict[str,Any], approval:dict[str,Any]|None=None, task_id:str="", target:str="", payload:Any=None, tool_metadata_trusted:bool=False) -> Decision:
    # Tool descriptions/annotations are deliberately ignored for authorization.
    allowed_lanes=set(permission.get("allowed_lanes",[]))
    if "all" not in allowed_lanes and lane not in allowed_lanes:
        return Decision("deny","TP-LANE",risk_level,("tool_not_in_lane_allowlist",))
    default=permission.get("default","deny")
    if default=="deny_until_approved":
        if not approval_valid(approval, task_id=task_id, action_type=tool_name, target=target, payload=payload):
            return Decision("approval_required","TP-APPROVAL",risk_level,("bound_approval_missing_or_invalid",))
    return Decision("allow","TP-ALLOW",risk_level,(),tuple(permission.get("constraints",[])))

def data_model_access_allowed(classification:str, *, minimized:bool=False, authorized:bool=False, specific_policy:bool=False) -> bool:
    if classification=="secret": return False
    if classification in {"public","internal"}: return True
    if classification=="restricted": return minimized and authorized
    if classification=="regulated_or_high_risk": return minimized and authorized and specific_policy
    return False

def evaluation_passes(alias:str, scores:dict[str,float], thresholds:dict[str,Any]) -> bool:
    t=thresholds.get(alias,{})
    for key,val in t.items():
        if key.endswith("_min"):
            metric=key[:-4]
            if scores.get(metric, float("-inf")) < val: return False
        elif key.endswith("_max"):
            metric=key[:-4]
            if scores.get(metric, float("inf")) > val: return False
    return True

def fallback_allowed(*, reason:str, risk_level:str, provider_data_policy_compatible:bool, semantic_change:bool=False, public_claim:bool=False, security_review:bool=False) -> bool:
    if not provider_data_policy_compatible: return False
    if risk_level in {"R3","R4"}: return False
    if security_review or public_claim or semantic_change: return False
    return reason in {"primary_timeout","primary_rate_limited","primary_unavailable","primary_schema_failure_after_one_repair"}

def circuit_breaker_should_open(health:dict[str,Any]) -> bool:
    req=max(int(health.get("requests",0)),1)
    timeout_rate=float(health.get("timeout_errors",0))/req
    return (
        timeout_rate > .20
        or (req >= 30 and float(health.get("schema_valid_rate",1)) < .90)
        or int(health.get("policy_failures",0)) > 0
        or bool(health.get("unexpected_sensitive_output"))
        or bool(health.get("quota_exhausted"))
    )

def repair_loop_action(attempts:int, max_repairs:int) -> str:
    return "stop_and_escalate" if attempts > max_repairs else "continue"

def policy_exception_valid(record:dict[str,Any], now:datetime|None=None) -> bool:
    required={"exception_id","rule_id","owner","rationale","scope","approved_by","created_at","expires_at","review_record"}
    if not required.issubset(record): return False
    if not record["owner"] or not record["review_record"] or record["scope"] in {"*","all","global"}: return False
    try:
        exp=datetime.fromisoformat(record["expires_at"].replace("Z","+00:00"))
    except Exception: return False
    now=now or datetime.now(timezone.utc)
    if exp.tzinfo is None: exp=exp.replace(tzinfo=timezone.utc)
    return exp>now

def mcp_auth_valid(*, response_issuer:str, expected_issuer:str, credential_issuer:str) -> bool:
    return bool(response_issuer) and response_issuer==expected_issuer==credential_issuer

def memory_promotion_allowed(*, source_trust:str, human_or_policy_review:bool) -> bool:
    return source_trust=="trusted" or human_or_policy_review

def incident_required(*, policy_violation:bool=False, secret_exposure:bool=False, unauthorized_tool_attempt:bool=False, memory_poisoning:bool=False, circuit_open:bool=False) -> bool:
    return any((policy_violation,secret_exposure,unauthorized_tool_attempt,memory_poisoning,circuit_open))
