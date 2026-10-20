#!/usr/bin/env python3
"""Read-only evidence extractor for saved provider HTML (stdlib; no network or secrets).

Extracts only values whose *role* can be established. A scanned DNS record
is not evidence of assigned authoritative nameservers. Outputs a status, not a
recommendation to press Save. No session data, account identifiers or HTML
contents are logged; all extracted hostnames remain private unless the caller
chooses to share the result.
"""
from __future__ import annotations

import argparse
from html.parser import HTMLParser
import json
from pathlib import Path
import re

CLOUDFLARE_NS = re.compile(r"(?<![\w-])([a-z][a-z0-9-]{0,62}\.ns\.cloudflare\.com)(?![\w-])", re.I)
IPV4 = re.compile(r"(?<![\d.])(?:\d{1,3}\.){3}\d{1,3}(?![\d.])")
SAVED_URL = re.compile(r"Page saved with SingleFile\s*url:\s*(https?://[^\s<>]+)", re.I)
ASSIGNMENT_LABELS = (
    "your cloudflare nameservers",
    "assigned cloudflare nameservers",
    "cloudflare nameservers assigned",
    "replace with cloudflare nameservers",
    "change your nameservers to",
)


class TextOnly(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.skip_depth = 0
        self.parts: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag in {"style", "script", "svg", "noscript"}:
            self.skip_depth += 1
        if tag in {"br", "tr", "p", "h1", "h2", "h3", "li", "section", "div"} and not self.skip_depth:
            self.parts.append(" ")

    def handle_endtag(self, tag: str) -> None:
        if tag in {"style", "script", "svg", "noscript"} and self.skip_depth:
            self.skip_depth -= 1
        if tag in {"tr", "p", "h1", "h2", "h3", "li", "section", "div"} and not self.skip_depth:
            self.parts.append(" ")

    def handle_data(self, data: str) -> None:
        if not self.skip_depth:
            self.parts.append(data)


def unique(values: list[str]) -> list[str]:
    return list(dict.fromkeys(v.lower().rstrip(".") for v in values))


def inspect_html(source: str) -> dict:
    parser = TextOnly()
    parser.feed(source)
    visible = re.sub(r"\s+", " ", " ".join(parser.parts)).strip()
    lowered = visible.lower()
    saved = SAVED_URL.search(source[:4000])
    scan_stage = bool(saved and "/confirm-scanned-records" in saved.group(1))
    # Also detect unlabeled screenshot exports captured on the DNS-import page.
    scan_stage = scan_stage or ("confirm scanned records" in lowered)
    matches = list(CLOUDFLARE_NS.finditer(visible))
    values = unique([m.group(1) for m in matches])
    ip_values = unique(IPV4.findall(visible))
    # Assignment context must be physically close to the actual values in
    # rendered text, not in an unrelated page menu/script/documentation example.
    labeled = any(
        any(token in lowered[max(0, m.start()-420):min(len(lowered), m.end()+220)] for token in ASSIGNMENT_LABELS)
        for m in matches
    )
    if scan_stage:
        status = "DNS_SCAN_NOT_NAMESERVER_ASSIGNMENT"
        names = []
    elif len(values) == 2 and labeled:
        status = "TWO_LABELED_NAMESERVERS_FOUND_VERIFY_WITH_CURRENT_SCREEN"
        names = values
    elif values:
        status = "CANDIDATES_UNVERIFIED_DO_NOT_PASTE"
        names = []
    else:
        status = "ASSIGNED_NAMESERVERS_ABSENT"
        names = []
    return {
        "status": status,
        "cloudflare_nameservers": names,
        "unverified_cloudflare_host_count": len(values) if not names else 0,
        "dns_record_ips_present": bool(ip_values),
        "dns_record_ips_are_not_nameservers": True,
        "on_scanned_records_page": scan_stage,
        "source_type": "saved_html_rendered_text",
        "next_action": (
            "Continue to activation in Cloudflare, then capture the assigned nameservers screen."
            if scan_stage else
            "Verify the pair in the current provider screen before copying into registrar fields."
            if names else
            "Provide the provider page showing the assigned nameservers; do not use DNS record IPs."
        ),
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="Read-only evidence extraction from a saved HTML file")
    parser.add_argument("html_file", type=Path)
    args = parser.parse_args()
    value = inspect_html(args.html_file.read_text(encoding="utf-8", errors="replace"))
    print(json.dumps(value, indent=2))
    return 0 if value["cloudflare_nameservers"] else 2  # NO_MATCH is distinct from verified input.


if __name__ == "__main__":
    raise SystemExit(main())
