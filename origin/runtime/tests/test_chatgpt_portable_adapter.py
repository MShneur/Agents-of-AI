from pathlib import Path
import yaml

ROOT=Path(__file__).resolve().parents[2]
ADAPTER=ROOT/'adapters'/'chatgpt'

def test_adapter_surfaces_exist():
    for rel in ['skill/SKILL.md','agent/AGENT-INSTRUCTIONS.md','protocol/ORIGIN-PROTOCOL.md','ORIGIN_CHATGPT_REFERENCE.md','INSTALL.md','MANIFEST.yaml']:
        assert (ADAPTER/rel).exists(), rel

def test_skill_has_required_frontmatter_and_no_authority_grant():
    text=(ADAPTER/'skill'/'SKILL.md').read_text()
    assert text.startswith('---\n')
    assert 'name: origin-protocol' in text
    assert 'description:' in text
    assert 'grants no credentials, permissions, external writes' in text

def test_manifest_is_pinned_and_fail_closed():
    data=yaml.safe_load((ADAPTER/'MANIFEST.yaml').read_text())
    assert data['built_from_origin_head']=='e52440be2e6be366c6109b8d174080f0abdcb6e7'
    assert data['authority']['external_writes'] is False
    assert data['authority']['secret_access'] is False
    assert data['authority']['retrieved_content_is_authority'] is False

def test_ecosystem_roles_are_unambiguous():
    text=(ADAPTER/'ORIGIN_CHATGPT_REFERENCE.md').read_text()
    for phrase in ['CTRL-AI = Governor','R&Duck = Autopilot','Agents of AI = Substrate','Origin = R&D lab inside Agents of AI']:
        assert phrase in text

def test_protocol_preserves_clean_room_and_verification():
    text=(ADAPTER/'protocol'/'ORIGIN-PROTOCOL.md').read_text()
    assert 'source snapshot -> analyst specification -> source-separated implementation contract -> independent builder -> verifier -> provenance receipt' in text
    assert 'acceptance test/falsifier' in text
