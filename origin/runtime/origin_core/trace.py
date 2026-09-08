from __future__ import annotations
from copy import deepcopy
import re

DEFAULT_SECRET_MARKERS = (
    "password", "passwd", "secret", "api_key", "apikey",
    "authorization", "cookie", "session_id", "session_token", "access_token", "refresh_token",
    "private_key", "connection_string",
)
DEFAULT_SECRET_PATTERNS = (
    re.compile(r"(?i)\b(?:OPENAI|ANTHROPIC|GOOGLE|GITHUB|GITLAB|AWS|AZURE)_[A-Z0-9_]*(?:KEY|TOKEN|SECRET)\s*=\s*\S+"),
    re.compile(r"(?i)\bBearer\s+[A-Za-z0-9._~+/=-]{12,}"),
    re.compile(r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----"),
)

def redact(value, *, markers=DEFAULT_SECRET_MARKERS, path=""):
    """Recursively redact secret-bearing keys and common secret values from trace payloads."""
    if isinstance(value, dict):
        out = {}
        for key, item in value.items():
            key_l = str(key).lower()
            if any(marker in key_l for marker in markers):
                out[key] = "[REDACTED]"
            else:
                out[key] = redact(item, markers=markers, path=path)
        return out
    if isinstance(value, list):
        return [redact(v, markers=markers, path=path) for v in value]
    if isinstance(value, str):
        out=value
        for rx in DEFAULT_SECRET_PATTERNS:
            out=rx.sub("[REDACTED]", out)
        return out
    return deepcopy(value)

def build_safe_trace(event):
    """Return a redacted trace and force the explicit redaction flag."""
    out=redact(event)
    out.setdefault("context", {})["redaction_applied"]=True
    return out
