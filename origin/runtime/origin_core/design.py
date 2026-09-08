from __future__ import annotations
from typing import Any

REQUIRED_STATE_FAMILIES={
 "data":{"populated","partial","unknown","stale","conflicting","unavailable"},
 "lifecycle":{"initial","loading","refreshing","success","empty","error"},
 "interaction":{"default","hover","focus_visible","active","disabled","selected"},
 "accessibility":{"keyboard","screen_reader","forced_colors","reduced_motion","zoomed","narrow_viewport"},
}

def missing_design_context(payload:dict[str,Any])->list[str]:
    required=["task_id","project_id","page","implementation","available_components","data_contracts","required_states","trust_requirements","responsive_targets"]
    return [k for k in required if k not in payload or payload[k] in (None,"",[])]

def component_state_gate(states:list[str], required:list[str])->tuple[str,list[str]]:
    missing=[s for s in required if s not in states]
    return ("PASS",[]) if not missing else ("FAIL",missing)

def color_only_allowed(has_text_or_semantic_equivalent:bool)->bool:
    return bool(has_text_or_semantic_equivalent)

def accessibility_gate(*, automated_critical:int, automated_serious:int, manual_required:bool, manual_status:str)->tuple[str,list[str]]:
    reasons=[]
    if automated_critical: reasons.append("critical_axe_violation")
    if automated_serious: reasons.append("serious_axe_violation")
    if manual_required and manual_status!="PASS": reasons.append("manual_accessibility_not_passed")
    return ("PASS",[]) if not reasons else ("FAIL",reasons)

def visual_gate(*, stories_complete:bool, route_rendered:bool, screenshots_only:bool=False)->tuple[str,list[str]]:
    reasons=[]
    if not stories_complete: reasons.append("storybook_state_coverage")
    if not route_rendered: reasons.append("route_rendered_verification")
    if screenshots_only: reasons.append("screenshot_only_not_sufficient")
    return ("PASS",[]) if not reasons else ("FAIL",reasons)

def plugin_intake_allowed(plugin:dict[str,Any])->bool:
    src=plugin.get("source",{})
    return src.get("license_status")=="approved" and src.get("security_review") is True and bool(plugin.get("owner"))

def token_change_allowed(*, semantic_intent_duplicate:bool, repeated_arbitrary_value:bool, promoted_to_token:bool, global_breaking:bool, approved:bool)->bool:
    if semantic_intent_duplicate: return False
    if repeated_arbitrary_value and not promoted_to_token: return False
    if global_breaking and not approved: return False
    return True

def trust_ui_gate(*, trust_sensitive:bool, source:bool, observed_at:bool, status:bool, caveat:bool)->tuple[str,list[str]]:
    if not trust_sensitive: return ("PASS",[])
    missing=[name for name,val in [("source",source),("observed_at",observed_at),("status",status),("caveat",caveat)] if not val]
    return ("PASS",[]) if not missing else ("FAIL",missing)
