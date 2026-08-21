#!/usr/bin/env python3
"""Create a CTRL Walkthrough paste handoff from a schema-v2 JSON file.

Default output is CWZ2: gzip-compressed JSON encoded as Base64URL. CW2 is the
uncompressed Base64URL fallback. These formats are transport encodings, not
encryption. Never place credentials or secrets in a walkthrough handoff.
"""

from __future__ import annotations

import argparse
import base64
import copy
import datetime as dt
import gzip
import json
import re
import sys
from pathlib import Path

ID_RE = re.compile(r"^[a-z0-9][a-z0-9-]{0,63}$")
SECRET_VALUE_PATTERNS = [
    re.compile(r"-----BEGIN [A-Z ]*PRIVATE KEY-----"),
    re.compile(r"\bgithub_pat_[A-Za-z0-9_]{20,}\b"),
    re.compile(r"\bgh[pousr]_[A-Za-z0-9]{20,}\b"),
    re.compile(r"\bAKIA[0-9A-Z]{16}\b"),
    re.compile(r"\bBearer\s+[A-Za-z0-9._~+/=-]{20,}\b", re.IGNORECASE),
    re.compile(r"\beyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b"),
]
SENSITIVE_KEYS = {
    "password", "passwd", "api_key", "apikey", "access_token", "refresh_token",
    "private_key", "client_secret", "recovery_code", "recovery_codes", "cookie",
    "session_cookie", "authorization",
}


def fail(message: str) -> "NoReturn":
    print(f"ERROR: {message}", file=sys.stderr)
    raise SystemExit(2)


def validate_module(data: object) -> dict:
    if not isinstance(data, dict):
        fail("walkthrough must be a JSON object")
    if data.get("schemaVersion") != 2:
        fail("schemaVersion must be 2")
    if not ID_RE.fullmatch(str(data.get("id", ""))):
        fail("id must be lowercase letters/numbers/hyphens and at most 64 characters")
    if not isinstance(data.get("title"), str) or not data["title"].strip():
        fail("title is required")
    steps = data.get("steps")
    if not isinstance(steps, list) or not 1 <= len(steps) <= 100:
        fail("steps must contain 1-100 entries")
    for index, step in enumerate(steps, 1):
        if not isinstance(step, dict):
            fail(f"step {index} must be an object")
        if not isinstance(step.get("title"), str) or not isinstance(step.get("body"), str):
            fail(f"step {index} requires string title and body")
    return data


def scan_secrets(value: object, path: str = "$") -> None:
    if isinstance(value, dict):
        for key, item in value.items():
            if str(key).lower() in SENSITIVE_KEYS and item not in (None, "", "<placeholder>", "PLACEHOLDER"):
                fail(f"possible secret-bearing field at {path}.{key}; use a placeholder and enter the secret directly at the provider/local environment")
            scan_secrets(item, f"{path}.{key}")
        return
    if isinstance(value, list):
        for index, item in enumerate(value):
            scan_secrets(item, f"{path}[{index}]")
        return
    if isinstance(value, str):
        for pattern in SECRET_VALUE_PATTERNS:
            if pattern.search(value):
                fail(f"possible credential/secret detected at {path}; handoff generation refused")


def b64url(raw: bytes) -> str:
    return base64.urlsafe_b64encode(raw).decode("ascii").rstrip("=")


def add_expiry(data: dict, ttl_hours: float) -> dict:
    out = copy.deepcopy(data)
    if ttl_hours > 0:
        expires = dt.datetime.now(dt.timezone.utc) + dt.timedelta(hours=ttl_hours)
        out["handoffExpiresAt"] = expires.replace(microsecond=0).isoformat().replace("+00:00", "Z")
    else:
        out.pop("handoffExpiresAt", None)
    return out


def encode(data: dict, fmt: str) -> str:
    raw = json.dumps(data, ensure_ascii=False, separators=(",", ":"), sort_keys=True).encode("utf-8")
    if fmt == "cwz2":
        packed = gzip.compress(raw, compresslevel=9, mtime=0)
        return "CWZ2:" + b64url(packed)
    if fmt == "cw2":
        return "CW2:" + b64url(raw)
    raise AssertionError(fmt)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Create a CTRL Walkthrough paste code")
    parser.add_argument("walkthrough", type=Path, help="schema-v2 .json/.walkthrough.json file")
    parser.add_argument("--format", choices=("cwz2", "cw2"), default="cwz2")
    parser.add_argument("--ttl-hours", type=float, default=24.0, help="handoff expiry; 0 disables embedded expiry (default: 24)")
    parser.add_argument("--output", type=Path, help="write the one-line code to a file instead of stdout")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    if args.ttl_hours < 0:
        fail("--ttl-hours cannot be negative")
    try:
        data = json.loads(args.walkthrough.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        fail(str(exc))
    validate_module(data)
    scan_secrets(data)
    payload = add_expiry(data, args.ttl_hours)
    code = encode(payload, args.format)
    if args.output:
        args.output.write_text(code + "\n", encoding="utf-8")
    else:
        print(code)
    print(
        f"format={args.format} chars={len(code)} ttl_hours={args.ttl_hours:g} id={data['id']}",
        file=sys.stderr,
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
