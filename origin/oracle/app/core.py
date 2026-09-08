from __future__ import annotations
from copy import deepcopy
from hashlib import sha256
from uuid import uuid4

TRUTH_LABELS = {"VERIFIED","INFERRED","UNKNOWN","CONFLICT","PREFERENCE","REJECTED"}
TASKS: dict[str, dict] = {}
ARTIFACTS: dict[str, dict] = {}

ROUTES = {
    "/research": ("evidence-research","research","R2"),
    "/code": ("repo-engineering","coding","R2"),
    "/design": ("ux-design","ux_design","R2"),
    "/market": ("conversion-copy","marketing_seo","R2"),
    "/scrape": ("source-extraction","data_scraping","R2"),
    "/deal": ("deal-evaluation","product_ecommerce","R2"),
    "/audit": ("adversarial-audit","governance","R2"),
    "/route": ("ai-routing","ai_routing","R2"),
    "/build": ("product-requirements","strategy","R2"),
}
QUORUMS = {
    "evidence-research":["bea_moreno","dante_wu","ravi_sethi","mira_sato","noah_strake"],
    "repo-engineering":["mara_kade","priya_nwosu","anton_reyes","june_park","noah_strake"],
    "ux-design":["sora_bell","lucian_hart","nia_calder","owen_rhee","iris_laurent"],
    "conversion-copy":["rowan_vale","elena_maris","samir_holt","tessa_rowan","malik_ortez"],
    "source-extraction":["ishan_vale","ravi_sethi","bea_moreno","anton_reyes","tomas_ilyan"],
    "deal-evaluation":["dante_wu","bea_moreno","avery_quinn","mina_sloane","helena_moss"],
    "adversarial-audit":["kieran_sol","lydia_farrow","maya_chen","anika_rao","theo_mercer"],
    "ai-routing":["anika_rao","theo_mercer","maya_chen","kieran_sol","lydia_farrow"],
}

def resolve_skill(request: str) -> dict:
    text=request.strip().lower()
    for prefix,(skill,lane,risk) in ROUTES.items():
        if text.startswith(prefix):
            return {"skill_id":skill,"lane":lane,"risk_level":risk,"quorum_required":risk!="R0"}
    return {"skill_id":"router","lane":"strategy","risk_level":"R1","quorum_required":True}

def select_quorum(skill_id: str) -> list[str]:
    return list(QUORUMS.get(skill_id, ["mara_kade","bea_moreno","kieran_sol"]))

def create_task(objective: str, project_id: str|None=None) -> dict:
    tid=str(uuid4())
    route=resolve_skill(objective)
    task={"id":tid,"project_id":project_id,"objective":objective,"status":"classified",**route}
    TASKS[tid]=task
    return deepcopy(task)

def run_independent_quorum(task: dict, persona_ids: list[str]) -> dict:
    outputs=[]
    for pid in persona_ids:
        packet={"task_id":task["id"],"objective":task["objective"],"persona":pid}
        digest=sha256(repr(sorted(packet.items())).encode()).hexdigest()[:12]
        outputs.append({"persona":pid,"packet_hash":digest,"objection":f"{pid}: identify one failure/evidence gap before approval.","seen_peer_outputs":False})
    return {"independent":all(not o["seen_peer_outputs"] for o in outputs),"outputs":outputs}

def evaluate_claim(claim: str, evidence: list[dict]) -> dict:
    valid=[e for e in evidence if e.get("source") and e.get("observed_at")]
    if not valid:
        return {"label":"UNKNOWN","claim":claim,"evidence_refs":[],"smallest_test":"Provide a source with observation time and scope."}
    refs=[e.get("evidence_id", f"e-{i}") for i,e in enumerate(valid)]
    return {"label":"VERIFIED","claim":claim,"evidence_refs":refs,"smallest_test":None}

def build_research_brief(task: dict, evidence: list[dict]) -> dict:
    claim=evaluate_claim(task["objective"], evidence)
    personas=select_quorum(task["skill_id"])
    quorum=run_independent_quorum(task, personas)
    return {"task_id":task["id"],"route":{"skill_id":task["skill_id"],"lane":task["lane"],"risk_level":task["risk_level"]},"claim_ledger":[claim],"dissent_ledger":quorum["outputs"],"unknowns":[claim["smallest_test"]] if claim["label"]=="UNKNOWN" else [],"next_test":claim["smallest_test"] or "Re-check dynamic evidence before public use.","external_write_performed":False}
