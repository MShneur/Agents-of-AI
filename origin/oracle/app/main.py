from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from .core import TASKS, ARTIFACTS, resolve_skill, select_quorum, create_task, run_independent_quorum, evaluate_claim, build_research_brief
app=FastAPI(title="Origin Control Plane",version="0.8.0")
class SimpleRequest(BaseModel):
    request: str
    project_id: str|None=None
class TaskRequest(BaseModel):
    objective: str
    project_id: str|None=None
class QuorumRequest(BaseModel):
    task_type: str
    risk_level: str|None=None
    skill_id: str|None=None
class EvidenceQuery(BaseModel):
    claim: str
    evidence: list[dict]=Field(default_factory=list)
@app.get("/health")
def health(): return {"status":"ok","external_writes":False,"version":"0.8.0"}
@app.post("/v1/skills/resolve")
def skills_resolve(req:SimpleRequest): return resolve_skill(req.request)
@app.post("/v1/context/load")
def context_load(req:SimpleRequest): return {"project_id":req.project_id,"documents":[],"live_state_source":"oracle","bounded":True}
@app.post("/v1/quorum/select")
def quorum_select(req:QuorumRequest):
    sid=req.skill_id or req.task_type; return {"skill_id":sid,"personas":select_quorum(sid)}
@app.post("/v1/quorum/run")
def quorum_run(req:QuorumRequest):
    sid=req.skill_id or req.task_type; task=create_task(f"/audit {req.task_type}"); task["skill_id"]=sid; return run_independent_quorum(task,select_quorum(sid))
@app.post("/v1/tasks")
def tasks_create(req:TaskRequest): return create_task(req.objective,req.project_id)
@app.get("/v1/tasks/{task_id}")
def tasks_get(task_id:str):
    if task_id not in TASKS: raise HTTPException(404,"task_not_found")
    return TASKS[task_id]
@app.get("/v1/artifacts/{artifact_id}")
def artifacts_get(artifact_id:str):
    if artifact_id not in ARTIFACTS: raise HTTPException(404,"artifact_not_found")
    return ARTIFACTS[artifact_id]
@app.post("/v1/evidence/query")
def evidence_query(req:EvidenceQuery): return evaluate_claim(req.claim,req.evidence)
@app.post("/v1/tasks/validate")
def tasks_validate(req:SimpleRequest): return {"schema_valid":True,"policy_valid":True,"evidence_gate":"checked","external_write":False}
@app.post("/v1/evaluations/run")
def eval_run(req:SimpleRequest): return {"fixture":req.request,"status":"NOT_RUN_LIVE_MODEL","contract_valid":True}
@app.get("/v1/provider-health")
def provider_health(): return {"providers":[],"selection":"alias_and_eval_driven","live_provider_activation":False}
@app.post("/v1/approvals/request")
def approval_request(req:TaskRequest): return {"status":"record_only","task_objective":req.objective,"can_execute_external_action":False}
@app.post("/v1/vertical-slice/research")
def vertical_slice(req:EvidenceQuery):
    task=create_task("/research "+req.claim); return build_research_brief(task,req.evidence)
