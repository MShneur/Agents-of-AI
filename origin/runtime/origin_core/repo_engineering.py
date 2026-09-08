from __future__ import annotations
from dataclasses import dataclass
from pathlib import PurePosixPath
from typing import Any
import fnmatch

SECRET_PATTERNS=(".env",".env.*","*.pem","*.key","id_rsa","secrets.*","credentials.*")
NOISE_PREFIXES=("node_modules/",".next/","dist/","build/","coverage/")

@dataclass(frozen=True)
class ScopeDecision:
    allowed: bool
    approval_required: bool
    reasons: tuple[str,...]

def is_secret_like(path: str) -> bool:
    name=PurePosixPath(path).name
    return any(fnmatch.fnmatch(name,p) or fnmatch.fnmatch(path,p) for p in SECRET_PATTERNS)

def context_path_allowed(path: str, dependency_task: bool=False) -> bool:
    if is_secret_like(path): return False
    if any(path.startswith(p) for p in NOISE_PREFIXES): return False
    if path.endswith((".png",".jpg",".jpeg",".pdf")): return False
    if path.endswith(("package-lock.json","pnpm-lock.yaml","yarn.lock")) and not dependency_task: return False
    return True

def scope_decision(files_changed:int, lines_changed:int, declared_scope_ok:bool=True, max_files:int=12, max_lines:int=800)->ScopeDecision:
    reasons=[]
    if not declared_scope_ok: reasons.append("scope_expansion_detected")
    if files_changed>max_files: reasons.append("file_budget_exceeded")
    if lines_changed>max_lines: reasons.append("line_budget_exceeded")
    approval=bool(reasons)
    return ScopeDecision(allowed=not approval, approval_required=approval, reasons=tuple(reasons))

def command_allowed(command:str, policy:dict[str,Any])->bool:
    c=" ".join(command.strip().split())
    if any(tok in c for tok in policy.get("prohibited_tokens",[])): return False
    return any(c==p or c.startswith(p+" ") for p in policy.get("allowed_prefixes",[]))

def browser_verification_required(change_kinds:list[str])->bool:
    required={"new_user_flow","checkout_or_affiliate_click_flow","sign_up","alert_preferences","search_or_filter","responsive_component","accessibility_sensitive_component","ui"}
    return bool(required.intersection(change_kinds))

def validation_gate(*, required_checks:list[str], passed_checks:list[str], independent_review:bool, browser_required:bool=False, browser_status:str="NOT_RUN")->tuple[str,list[str]]:
    missing=[x for x in required_checks if x not in passed_checks]
    if browser_required and browser_status!="PASS": missing.append("browser_verification")
    if not independent_review: missing.append("independent_review")
    return ("PASS",[]) if not missing else ("FAIL",missing)

def external_action_allowed(action:str, approved:bool)->bool:
    governed={"merge","push","deploy","dependency_upgrade","database_migration","secret_change","external_write"}
    return approved if action in governed else True

def repair_cycle_status(cycles:int,max_cycles:int=3)->str:
    return "ESCALATE" if cycles>=max_cycles else "CONTINUE"

def current_behavior_authority(code_conflicts_docs:bool)->str:
    return "CONFLICT_CODE_CURRENT" if code_conflicts_docs else "NO_CONFLICT"
