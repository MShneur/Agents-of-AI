from pathlib import Path
import importlib.util, json, yaml
ROOT=Path(__file__).resolve().parents[2]

def test_exactly_20_custom_gpt_knowledge_files():
    files=list((ROOT/'custom-gpt'/'knowledge').glob('*.md'))
    assert len(files)==20
    assert all('Version:' in p.read_text() for p in files)

def test_skill_registry_has_20_primary_and_control_skills():
    reg=yaml.safe_load((ROOT/'config'/'skill-registry.yaml').read_text())
    assert reg['primary_count']==20
    ids=[s['id'] for s in reg['skills']]
    assert len(set(ids))>=24
    for sid in ids: assert (ROOT/'skills'/sid/'manifest.yaml').exists()

def test_historical_skill_manifests_exist_and_vertical_slice_audit_skill_is_complete():
    missing_ids=['vision-to-roadmap','product-requirements','system-architecture','debug-triage','database-schema','api-integration','entity-resolution','browser-verification','growth-lifecycle','adversarial-audit','ship-operate']
    for sid in missing_ids: assert (ROOT/'skills'/sid/'manifest.yaml').exists()
    required={'SKILL.md','manifest.yaml','input.schema.json','output.schema.json','rubric.yaml','evals/fixtures.jsonl','evals/assertions.yaml','references/allowed-sources.md','references/methods.md','policies/boundaries.md'}
    base=ROOT/'skills'/'adversarial-audit'
    got={str(p.relative_to(base)) for p in base.rglob('*') if p.is_file()}
    assert not (required-got), required-got

def test_exactly_30_personas_and_quorums_resolve():
    reg=yaml.safe_load((ROOT/'config'/'persona-registry.yaml').read_text())
    ids={p['id'] for p in reg['personas']}; assert len(ids)==30
    qs=yaml.safe_load((ROOT/'config'/'quorum-selection.yaml').read_text())
    def walk(v):
        if isinstance(v,dict):
            for k,x in v.items():
                if k in {'select','add_for_high_risk','contrarian','evidence_referee'} and isinstance(x,list):
                    for pid in x: assert pid in ids
                walk(x)
        elif isinstance(v,list):
            for x in v: walk(x)
    walk(qs)

def test_openapi_has_no_external_execution_action():
    spec=yaml.safe_load((ROOT/'openapi'/'origin-actions.openapi.yaml').read_text())
    ops=[]
    for path,methods in spec['paths'].items():
        for method,cfg in methods.items():
            if isinstance(cfg,dict) and cfg.get('operationId'): ops.append(cfg['operationId'])
    banned={'executeApprovedAction','deploy','publish','sendEmail','postSocial','writeGithub','rawShell'}
    assert not (set(ops)&banned)
    assert {'resolveSkill','loadContext','selectQuorum','runQuorum','createTask','queryEvidence','validateTask'} <= set(ops)

def test_custom_gpt_pack_has_current_creation_block_and_no_direct_actions():
    cfg=yaml.safe_load((ROOT/'custom-gpt'/'CONFIG.yaml').read_text())
    assert cfg['status']=='package_ready_creation_blocked_on_personal_chatgpt'
    prohibited=set(cfg['actions']['prohibited'])
    assert 'direct_github_write' in prohibited and 'direct_deployment' in prohibited
    text=(ROOT/'custom-gpt'/'00_MASTER_INSTRUCTIONS.md').read_text()
    assert '[VERIFIED]' in text and '[UNKNOWN]' in text and 'Oracle' in text

def test_vertical_slice_contract():
    v=yaml.safe_load((ROOT/'vertical-slice'/'evidence-safe-research.yaml').read_text())
    assert v['external_writes'] is False
    assert len(v['personas'])==5
    assert {'router','evidence-research','adversarial-audit','ai-routing','security-governance'} <= set(v['skills'])
    assert 'at_least_one_meaningful_objection' in v['acceptance']

def test_oracle_core_unknown_and_verified():
    appcore=ROOT/'oracle'/'app'/'core.py'
    spec=importlib.util.spec_from_file_location('origin_b08_core',appcore)
    mod=importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    task=mod.create_task('/research Is SKU-123 discontinued?')
    brief=mod.build_research_brief(task,[])
    assert brief['claim_ledger'][0]['label']=='UNKNOWN'
    assert brief['external_write_performed'] is False
    assert len(brief['dissent_ledger'])==5 and all(x['seen_peer_outputs'] is False for x in brief['dissent_ledger'])
    evidence=[{'evidence_id':'e1','source':'https://example.test/item','observed_at':'2026-09-07T12:00:00Z'}]
    assert mod.evaluate_claim('Observed item exists',evidence)['label']=='VERIFIED'

def test_12_system_acceptance_fixtures():
    rows=[json.loads(x) for x in (ROOT/'evals'/'master-blueprint'/'golden-fixtures.jsonl').read_text().splitlines() if x.strip()]
    assert len(rows)==12
    ids={r['id'] for r in rows}
    assert {'route_correct_skill','quorum_independence','approval_binding','repair_budget'} <= ids

def test_all_b08_json_yaml_parse_and_schemas():
    from jsonschema import Draft202012Validator
    for p in ROOT.rglob('*.json'):
        obj=json.loads(p.read_text())
        if p.name.endswith('.schema.json'): Draft202012Validator.check_schema(obj)
    for p in ROOT.rglob('*.yaml'): yaml.safe_load(p.read_text())
