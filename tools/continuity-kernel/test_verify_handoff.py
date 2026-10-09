import copy
import unittest
from verify_handoff import validate, operator_view


def baseline():
    return {
        "schema_version": "1.0", "task_id": "W3", "objective": "Verify requested Home Depot journey",
        "source_ref": "owner/repo@sha:path", "requested_target": {"kind": "website", "id": "https://www.homedepot.com/"},
        "actor": {"provider": "other-ai", "model": "provider-model", "access_scope": "localhost only"},
        "status": "NOT_TESTED", "checks": [{"id": "journey", "required": True, "status": "NOT_TESTED", "evidence_ids": ["local"]}],
        "evidence": [{"id": "local", "result": "PASS", "source": "file:local-report.json", "target": {"kind": "website", "id": "http://localhost:3000/"}}],
        "decisions": [{"modality": "PROPOSED", "text": "Run actual target test", "source": "issue#1"}],
        "next": {"action": "Verify Home Depot with authorized browser"}
    }


class ContractTests(unittest.TestCase):
    def test_local_pass_is_not_requested_pass(self):
        record = baseline()
        self.assertEqual(validate(record), [])
        self.assertIn("Broken", operator_view(record))
        record["checks"][0]["status"] = "PASS"
        record["status"] = "PASSED"
        self.assertTrue(any("lacks proof" in e for e in validate(record)))

    def test_exact_target_proof_allows_pass(self):
        record = baseline()
        record["evidence"][0]["target"] = record["requested_target"]
        record["checks"][0]["status"] = "PASS"
        record["status"] = "PASSED"
        self.assertEqual(validate(record), [])

    def test_proposal_cannot_be_promoted_silently(self):
        record = baseline()
        record["decisions"][0]["modality"] = "APPROVED"
        self.assertTrue(any("approved_by" in e for e in validate(record)))

    def test_unobserved_access_scope_is_invalid(self):
        record = baseline()
        record["actor"].pop("access_scope")
        self.assertTrue(any("access_scope" in e for e in validate(record)))

    def test_status_without_required_check_rejected(self):
        record = baseline()
        record["status"] = "PASSED"
        record["checks"][0]["required"] = False
        self.assertTrue(any("required check" in e for e in validate(record)))

    def test_no_evidence_pointer_is_invalid(self):
        record = baseline()
        record["evidence"][0]["source"] = ""
        self.assertTrue(any("source" in e for e in validate(record)))


if __name__ == "__main__":
    unittest.main()
