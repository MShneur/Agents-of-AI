from __future__ import annotations
from copy import deepcopy

DEFAULT_SECRET_MARKERS = (
    "password", "passwd", "secret", "api_key", "apikey",
    "authorization", "cookie", "session_token", "access_token", "refresh_token",
)


def redact(value, *, markers=DEFAULT_SECRET_MARKERS, path=""):
    """Recursively redact obvious secret-bearing fields from trace payloads."""
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
    return deepcopy(value)
