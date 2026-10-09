#!/usr/bin/env python3
"""Portable, offline AoA transfer-record validator (stdlib only)."""
import argparse
import json
import sys
from pathlib import Path

STATES = {"PASSED", "FAILED", "NOT_TESTED", "BLOCKED", "IN_PROGRESS", "UNKNOWN"}
CHECK_STATES = {"PASS", "FAIL", "NOT_TESTED", "BLOCKED"}
MODALITIES = {"OBSERVED", "PROPOSED", "APPROVED", "REJECTED", "HYPOTHESIS"}


def is_nonempty(value):
    return isinstance(value, str) and bool(value.strip())


def enum_member(value, allowed):
    return isinstance(value, str) and value in allowed


def same_target(a, b):
    return isinstance(a, dict) and isinstance(b, dict) and (
        is_nonempty(a.get("kind")) and is_nonempty(a.get("id"))
        and a.get("kind") == b.get("kind") and a.get("id") == b.get("id")
    )


def validate(record):
    """Return an ordered list of defects; never infer verification from narrative."""
    problems = []
    if not isinstance(record, dict):
        return ["record: expected object"]
    for field in ("schema_version", "task_id", "objective", "source_ref"):
        if not is_nonempty(record.get(field)):
            problems.append(f"{field}: missing string")
    if record.get("schema_version") != "1.0":
        problems.append("schema_version: expected 1.0")
    target = record.get("requested_target")
    if not same_target(target, target):
        problems.append("requested_target: expected nonempty kind and id")
    if not enum_member(record.get("status"), STATES):
        problems.append("status: invalid")
    actor = record.get("actor")
    if not isinstance(actor, dict) or not all(is_nonempty(actor.get(k)) for k in ("provider", "model", "access_scope")):
        problems.append("actor: provider, model, and access_scope are required")
    checks = record.get("checks")
    evidence = record.get("evidence")
    if not isinstance(checks, list) or not checks:
        problems.append("checks: expected nonempty array")
        checks = []
    if not isinstance(evidence, list):
        problems.append("evidence: expected array")
        evidence = []
    evidence_by_id = {}
    for i, proof in enumerate(evidence):
        if not isinstance(proof, dict):
            problems.append(f"evidence[{i}]: expected object")
            continue
        eid = proof.get("id")
        if not is_nonempty(eid) or eid in evidence_by_id:
            problems.append(f"evidence[{i}]: missing or repeated id")
        else:
            evidence_by_id[eid] = proof
        if not enum_member(proof.get("result"), CHECK_STATES):
            problems.append(f"evidence[{i}]: invalid result")
        if not is_nonempty(proof.get("source")):
            problems.append(f"evidence[{i}]: missing source pointer")
        if not same_target(proof.get("target"), proof.get("target")):
            problems.append(f"evidence[{i}]: missing target")
    ids = set()
    for i, check in enumerate(checks):
        if not isinstance(check, dict):
            problems.append(f"checks[{i}]: expected object")
            continue
        cid = check.get("id")
        if not is_nonempty(cid) or cid in ids:
            problems.append(f"checks[{i}]: missing or repeated id")
        if is_nonempty(cid):
            ids.add(cid)
        if type(check.get("required")) is not bool:
            problems.append(f"checks[{i}]: required must be boolean")
        if not enum_member(check.get("status"), CHECK_STATES):
            problems.append(f"checks[{i}]: invalid status")
        refs = check.get("evidence_ids")
        if not isinstance(refs, list):
            problems.append(f"checks[{i}]: evidence_ids must be array")
            refs = []
        linked = [evidence_by_id[r] for r in refs if isinstance(r, str) and r in evidence_by_id]
        for r in refs:
            if not isinstance(r, str) or r not in evidence_by_id:
                problems.append(f"checks[{i}]: unresolved evidence ref {r!r}")
        if check.get("status") == "PASS" and not any(
            e.get("result") == "PASS" and same_target(e.get("target"), target)
            for e in linked
        ):
            problems.append(f"checks[{i}]: PASS lacks proof for requested_target")
    decisions = record.get("decisions", [])
    if not isinstance(decisions, list):
        problems.append("decisions: expected array")
        decisions = []
    for i, decision in enumerate(decisions):
        if not isinstance(decision, dict) or not enum_member(decision.get("modality"), MODALITIES) or not is_nonempty(decision.get("text")) or not is_nonempty(decision.get("source")):
            problems.append(f"decisions[{i}]: modality, text, and source required")
        elif decision["modality"] == "APPROVED" and not is_nonempty(decision.get("approved_by")):
            problems.append(f"decisions[{i}]: APPROVED requires approved_by")
    if record.get("status") == "PASSED":
        if not checks or any(c.get("required") and c.get("status") != "PASS" for c in checks if isinstance(c, dict)):
            problems.append("status: PASSED requires all required checks PASS")
        if not any(isinstance(c, dict) and c.get("required") for c in checks):
            problems.append("status: PASSED requires at least one required check")
    next_step = record.get("next")
    if record.get("status") != "PASSED" and (not isinstance(next_step, dict) or not is_nonempty(next_step.get("action"))):
        problems.append("next.action: required when status is not PASSED")
    return problems


def operator_view(record):
    """Render minimal operator view, never an automatic acceptance certificate."""
    status = record["status"]
    if status == "PASSED":
        return "Fixed - Required checks passed for the requested target."
    line = "Broken - " + ("Requested-target verification is missing." if status in {"NOT_TESTED", "UNKNOWN", "IN_PROGRESS"} else "Task is blocked or failed.")
    return line + "\nRecommendation - " + record["next"]["action"]


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("record", type=Path)
    parser.add_argument("--operator", action="store_true", help="Print the concise human view only after validation")
    args = parser.parse_args(argv)
    try:
        record = json.loads(args.record.read_text(encoding="utf-8"))
    except (OSError, ValueError) as exc:
        print(f"INVALID: {exc}", file=sys.stderr)
        return 2
    errors = validate(record)
    if errors:
        for problem in errors:
            print("INVALID: " + problem, file=sys.stderr)
        return 1
    print(operator_view(record) if args.operator else "VALID", file=sys.stdout)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
