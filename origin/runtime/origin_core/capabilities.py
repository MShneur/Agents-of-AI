from __future__ import annotations
from dataclasses import dataclass
from typing import Iterable


@dataclass(frozen=True)
class Provider:
    provider_id: str
    model_id: str
    capabilities: frozenset[str]
    properties: frozenset[str]
    allowed_data_classes: frozenset[str]
    healthy: bool = True
    eval_pass_rate: float = 0.0
    schema_compliance: float = 0.0


class CapabilityRegistry:
    """Provider-neutral resolver.

    The code intentionally contains no domain-specific skill/persona branches and
    no hard-coded provider names. Capability IDs are configuration data.
    """

    def __init__(self, providers: Iterable[Provider]):
        self._providers = tuple(providers)

    def resolve(
        self,
        capability_id: str,
        *,
        required_properties: Iterable[str] = (),
        data_classes: Iterable[str] = (),
    ) -> Provider | None:
        props = set(required_properties)
        data = set(data_classes)
        candidates = [
            p
            for p in self._providers
            if p.healthy
            and capability_id in p.capabilities
            and props.issubset(p.properties)
            and data.issubset(p.allowed_data_classes)
        ]
        candidates.sort(
            key=lambda p: (p.eval_pass_rate, p.schema_compliance),
            reverse=True,
        )
        return candidates[0] if candidates else None
