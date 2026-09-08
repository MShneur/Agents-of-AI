from pathlib import Path
import yaml

ROOT=Path(__file__).resolve().parents[2]

def test_executive_five_preserve_historical_directory_and_names():
    expected={
      'mara_kade':'mara-kade.yaml','bea_moreno':'bea-moreno.yaml','nia_calder':'nia-calder.yaml',
      'rowan_vale':'rowan-vale.yaml','kieran_sol':'kieran-sol.yaml'
    }
    reg=yaml.safe_load((ROOT/'config'/'persona-registry.yaml').read_text())
    assert reg['executive_five']==list(expected)
    by_id={p['id']:p for p in reg['personas']}
    for pid,filename in expected.items():
        assert by_id[pid]['path']==f'origin/personas/executive/{filename}'
        assert (ROOT/'personas'/'executive'/filename).exists()

def test_all_persona_registry_paths_exist():
    reg=yaml.safe_load((ROOT/'config'/'persona-registry.yaml').read_text())
    for persona in reg['personas']:
        rel=Path(persona['path']).relative_to('origin')
        assert (ROOT/rel).exists(), persona['id']
