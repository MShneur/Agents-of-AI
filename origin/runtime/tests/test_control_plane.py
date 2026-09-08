from origin_core.capabilities import CapabilityRegistry, Provider
from origin_core.lifecycle import TransitionEngine, InvalidTransition
from origin_core.trace import redact


def test_capability_resolution_is_provider_neutral():
    providers = [
        Provider("p1", "m1", frozenset({"research"}), frozenset({"long_context"}),
                 frozenset({"public"}), True, 0.92, 0.99),
        Provider("p2", "m2", frozenset({"research"}), frozenset({"long_context"}),
                 frozenset({"public"}), True, 0.97, 0.98),
    ]
    picked = CapabilityRegistry(providers).resolve(
        "research", required_properties={"long_context"}, data_classes={"public"}
    )
    assert picked and picked.provider_id == "p2"


def test_illegal_lifecycle_transition_is_rejected():
    engine = TransitionEngine({"states": {"intake": {"next": ["preflight"]}, "accepted": {"next": []}}})
    try:
        engine.transition("intake", "accepted")
    except InvalidTransition:
        pass
    else:
        raise AssertionError("illegal transition was accepted")


def test_required_state_data_is_enforced():
    engine = TransitionEngine({"states": {"classified": {"required": ["risk_level"], "next": ["routed"]}}})
    try:
        engine.transition("classified", "routed", {})
    except InvalidTransition:
        pass
    else:
        raise AssertionError("required state data was not enforced")


def test_trace_redacts_secret_fields():
    payload = {"routing": {"provider": "x"}, "api_key": "super-secret", "nested": {"Authorization": "Bearer x"}}
    cleaned = redact(payload)
    assert cleaned["api_key"] == "[REDACTED]"
    assert cleaned["nested"]["Authorization"] == "[REDACTED]"
    assert cleaned["routing"]["provider"] == "x"
