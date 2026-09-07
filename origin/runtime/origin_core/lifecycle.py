from __future__ import annotations


class InvalidTransition(ValueError):
    pass


class TransitionEngine:
    """Configuration-driven state transition validator."""

    def __init__(self, workflow: dict):
        self._states = workflow.get("states", {})

    def allowed(self, current: str, nxt: str) -> bool:
        state = self._states.get(current)
        return bool(state and nxt in state.get("next", []))

    def transition(self, current: str, nxt: str, state_data: dict | None = None) -> str:
        state_data = state_data or {}
        state = self._states.get(current)
        if state is None:
            raise InvalidTransition(f"unknown current state: {current}")
        missing = [key for key in state.get("required", []) if key not in state_data]
        if missing:
            raise InvalidTransition(f"missing required state data: {missing}")
        if nxt not in state.get("next", []):
            raise InvalidTransition(f"illegal transition: {current} -> {nxt}")
        return nxt
