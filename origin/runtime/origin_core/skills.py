from __future__ import annotations
from dataclasses import dataclass
from pathlib import Path
from typing import Any
import json
import yaml
from jsonschema import Draft202012Validator

MANDATORY_SKILL_FILES = {
    "SKILL.md",
    "manifest.yaml",
    "input.schema.json",
    "output.schema.json",
    "rubric.yaml",
    "evals/fixtures.jsonl",
    "evals/assertions.yaml",
    "references/allowed-sources.md",
    "references/methods.md",
    "policies/boundaries.md",
}

@dataclass(frozen=True)
class Route:
    lane: str
    primary_skill: str
    secondary_skills: tuple[str, ...]
    model_alias: str
    quorum_required: bool

def validate_skill_package(skill_dir: Path) -> list[str]:
    missing = [name for name in sorted(MANDATORY_SKILL_FILES) if not (skill_dir / name).exists()]
    return missing

def required_inputs(manifest: dict[str, Any]) -> list[str]:
    return list(manifest.get("inputs", {}).get("required", []))

def missing_inputs(manifest: dict[str, Any], payload: dict[str, Any]) -> list[str]:
    return [name for name in required_inputs(manifest) if name not in payload or payload[name] in (None, "", [])]

def load_yaml(path: Path) -> dict[str, Any]:
    data = yaml.safe_load(path.read_text(encoding="utf-8"))
    return data or {}

def resolve_route(request: str, routing_table: dict[str, Any], risk_level: str | None = None) -> Route | None:
    text = request.casefold()
    for route in routing_table.get("routes", []):
        intents = route.get("match", {}).get("intents", [])
        if any(intent.casefold() in text for intent in intents):
            risk = (risk_level or "").upper()
            quorum = risk in {"R2","R3","R4"} or route.get("lane") in {"pr","governance"}
            return Route(
                lane=route["lane"],
                primary_skill=route["primary_skill"],
                secondary_skills=tuple(route.get("secondary_skills", [])),
                model_alias=route["model_alias"],
                quorum_required=quorum,
            )
    return None

def validate_handoff(payload: dict[str, Any], schema: dict[str, Any]) -> None:
    Draft202012Validator(schema).validate(payload)

def claim_ledger_supports_public_claims(ledger: dict[str, Any]) -> bool:
    for claim in ledger.get("claims", []):
        if claim.get("allowed") and claim.get("type") == "verified_observation":
            if not claim.get("evidence_id") or not claim.get("source"):
                return False
    return True

def seo_schema_absence_status(detection_method: str, schema_seen: bool) -> str:
    if schema_seen:
        return "PRESENT"
    capable = {"browser_render","dom_query","rich_results_test","rendered_crawler","source_inspection"}
    return "ABSENT" if detection_method in capable else "UNKNOWN"

def pr_external_action_allowed(manifest: dict[str, Any], action: str) -> bool:
    prohibited = set(manifest.get("tools", {}).get("prohibited", []))
    approvals = set(manifest.get("handoff", {}).get("approval_required_for", []))
    if action in prohibited or action in {"send","publish","post","send_email","contact_media"}:
        return False
    return action not in approvals
