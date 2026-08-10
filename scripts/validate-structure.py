#!/usr/bin/env python3
"""Lightweight structural validation for the Agents-of-AI library.

Stdlib-only by design. This validates repository structure and references; it does
not score or judge prompt content.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LAYERS = ("personas", "agents", "workflows", "techniques", "modes", "teams", "failures")
LINK_RE = re.compile(r"\[[^\]]*\]\(([^)]+)\)")


def front_matter(text: str) -> dict[str, str]:
    if not text.startswith("---\n"):
        return {}
    end = text.find("\n---\n", 4)
    if end < 0:
        return {"__error__": "unterminated front matter"}
    fields: dict[str, str] = {}
    for raw in text[4:end].splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or ":" not in line:
            continue
        key, value = line.split(":", 1)
        fields[key.strip()] = value.strip()
    return fields


def relative_links(path: Path, text: str):
    for match in LINK_RE.finditer(text):
        raw = match.group(1).strip()
        if not raw or raw.startswith(("http://", "https://", "mailto:", "#", "data:")):
            continue
        target = raw.split("#", 1)[0].split("?", 1)[0]
        if not target or target.startswith("/"):
            continue
        yield raw, (path.parent / target).resolve()


def main() -> int:
    errors: list[str] = []
    ids: dict[str, Path] = {}
    files_checked = 0

    for layer in LAYERS:
        folder = ROOT / layer
        if not folder.is_dir():
            errors.append(f"missing layer directory: {layer}/")
            continue

        for path in sorted(folder.glob("*.md")):
            files_checked += 1
            text = path.read_text(encoding="utf-8")
            meta = front_matter(text)
            rel = path.relative_to(ROOT)

            if "__error__" in meta:
                errors.append(f"{rel}: {meta['__error__']}")
                continue

            # Library entries are expected to carry an ID when they use front matter.
            # Legacy prose-only files remain allowed; CI is structural, not migratory.
            if meta:
                entry_id = meta.get("id", "").strip('"\'')
                entry_type = meta.get("type", "").strip('"\'')
                if not entry_id:
                    errors.append(f"{rel}: front matter missing id")
                else:
                    prior = ids.get(entry_id)
                    if prior is not None:
                        errors.append(
                            f"duplicate id '{entry_id}': {prior.relative_to(ROOT)} and {rel}"
                        )
                    else:
                        ids[entry_id] = path
                if not entry_type:
                    errors.append(f"{rel}: front matter missing type")

            for raw, resolved in relative_links(path, text):
                try:
                    resolved.relative_to(ROOT)
                except ValueError:
                    errors.append(f"{rel}: relative link escapes repository: {raw}")
                    continue
                if not resolved.exists():
                    errors.append(f"{rel}: broken relative link: {raw}")

    if errors:
        print("STRUCTURE VALIDATION FAILED")
        for error in errors:
            print(f"- {error}")
        print(f"\nChecked {files_checked} library files; found {len(errors)} error(s).")
        return 1

    print(f"STRUCTURE VALIDATION OK: {files_checked} library files, {len(ids)} unique IDs")
    return 0


if __name__ == "__main__":
    sys.exit(main())
