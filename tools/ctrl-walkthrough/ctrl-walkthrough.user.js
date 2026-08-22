// ==UserScript==
// @name         CTRL Walkthrough
// @namespace    https://github.com/MShneur/Agents-of-AI
// @version      0.4.0
// @description  Tiny step-by-step navigation HUD for public and private setup walkthroughs.
// @match        https://*/*
// @match        http://localhost/*
// @noframes
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_openInTab
// @grant        GM_setClipboard
// @grant        GM_registerMenuCommand
// @run-at       document-idle
// @downloadURL  https://raw.githubusercontent.com/MShneur/Agents-of-AI/main/tools/ctrl-walkthrough/ctrl-walkthrough.user.js
// @updateURL    https://raw.githubusercontent.com/MShneur/Agents-of-AI/main/tools/ctrl-walkthrough/ctrl-walkthrough.user.js
// ==/UserScript==

(() => {
  'use strict';

  const VERSION = '0.4.0';
  const CANONICAL_MANIFEST = 'https://raw.githubusercontent.com/MShneur/Agents-of-AI/main/tools/ctrl-walkthrough/manifest.json';
  const STATE_KEY = 'ctrlw:v3:state';
  const CACHE_KEY = 'ctrlw:v3:canonical-cache';
  const CUSTOM_KEY = 'ctrlw:v3:custom-modules';
  const PENDING_GITHUB_KEY = 'ctrlw:v3:pending-github-import';
  const PRIVATE_KEY = 'ctrlw:v4:temporary-private-values';
  const MAX_BYTES = 250000;
  const MAX_STEPS = 100;
  const ID_RE = /^[a-z0-9][a-z0-9-]{0,63}$/;
  const KEY_RE = /^[a-zA-Z0-9._:-]{1,80}$/;
  const GH_PART_RE = /^[A-Za-z0-9_.-]+$/;
  const GH_REF_RE = /^[A-Za-z0-9._/-]{1,120}$/;

  const state = loadJson(STATE_KEY, {
    activeId: '', step: {}, completed: {}, selectedId: '', expanded: false, autoOpenOnce: false,
  });
  delete state.open;
  let canonical = [];
  let custom = loadJson(CUSTOM_KEY, []);
  let privateValues = loadJson(PRIVATE_KEY, {});
  let lastError = null;
  let panelOpen = false;
  let showAllSteps = false;

  function cloneValue(value) { return JSON.parse(JSON.stringify(value)); }
  function loadJson(key, fallback) {
    try {
      const raw = GM_getValue(key, '');
      return raw ? JSON.parse(raw) : cloneValue(fallback);
    } catch (_) { return cloneValue(fallback); }
  }
  function saveState() { GM_setValue(STATE_KEY, JSON.stringify(state)); }
  function saveCustom() { GM_setValue(CUSTOM_KEY, JSON.stringify(custom)); }
  function savePrivate() { GM_setValue(PRIVATE_KEY, JSON.stringify(privateValues)); }
  function norm(s) { return String(s || '').replace(/\s+/g, ' ').trim().toLowerCase(); }
  function safeText(s, max = 1200) { return String(s || '').slice(0, max); }
  function isExpired(mod) {
    if (!mod?._temporary || !mod.handoffExpiresAt) return false;
    const t = Date.parse(mod.handoffExpiresAt);
    return Number.isFinite(t) && t <= Date.now();
  }
  function purgeExpired() {
    const before = custom.length;
    const expiredIds = custom.filter(isExpired).map(m => m.id);
    custom = custom.filter(m => !isExpired(m));
    if (custom.length !== before) saveCustom();
    expiredIds.forEach(clearPrivateForWalkthrough);
    if (expiredIds.includes(state.activeId)) state.activeId = '';
    if (expiredIds.includes(state.selectedId)) state.selectedId = '';
    saveState();
  }

  function validateModule(mod) {
    if (!mod || mod.schemaVersion !== 2 || !ID_RE.test(mod.id || '') || typeof mod.title !== 'string') throw new Error('Invalid walkthrough header');
    if (!Array.isArray(mod.steps) || mod.steps.length < 1 || mod.steps.length > MAX_STEPS) throw new Error('Invalid walkthrough steps');
    mod.steps.forEach((step, i) => {
      if (!step || typeof step.title !== 'string' || typeof step.body !== 'string') throw new Error(`Invalid step ${i + 1}`);
      const action = step.action || { type: 'none' };
      if (!['none', 'open', 'copy', 'find', 'click', 'download', 'generate', 'capture', 'copySaved'].includes(action.type)) throw new Error(`Unsupported action at step ${i + 1}`);
      if (action.type === 'open' && !/^https:\/\//.test(action.url || '')) throw new Error(`Only HTTPS URLs are allowed at step ${i + 1}`);
      if (action.type === 'copy' && typeof action.text !== 'string') throw new Error(`Invalid copy action at step ${i + 1}`);
      if (action.type === 'download' && (typeof action.filename !== 'string' || typeof action.text !== 'string')) throw new Error(`Invalid download action at step ${i + 1}`);
      if (['generate', 'capture', 'copySaved'].includes(action.type) && !KEY_RE.test(action.key || '')) throw new Error(`Invalid local key at step ${i + 1}`);
      if (action.type === 'click' && action.safe !== true) throw new Error(`Auto-click requires safe=true at step ${i + 1}`);
      if (step.humanGate && action.type === 'click') throw new Error(`Human-gated step cannot auto-click at step ${i + 1}`);
      if (step.target) validateLocator(step.target, i);
      if (action.target) validateLocator(action.target, i);
      if (action.fallbackTarget) validateLocator(action.fallbackTarget, i);
      if (step.success) validateLocator(step.success, i, true);
    });
    return mod;
  }
  function validateLocator(loc, i, allowUrl = false) {
    if (typeof loc !== 'object' || loc === null) throw new Error(`Invalid locator at step ${i + 1}`);
    if (loc.selectors && !Array.isArray(loc.selectors)) throw new Error(`Invalid selectors at step ${i + 1}`);
    if (loc.text && !Array.isArray(loc.text)) throw new Error(`Invalid text locator at step ${i + 1}`);
    if (!allowUrl && loc.urlIncludes) throw new Error(`urlIncludes not allowed here at step ${i + 1}`);
  }
  async function fetchJson(url) {
    const u = new URL(url, location.href);
    if (u.protocol !== 'https:') throw new Error('Only HTTPS walkthrough sources are allowed');
    const res = await fetch(u.href, { cache: 'no-store', credentials: 'omit' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    if (!text || text.length > MAX_BYTES) throw new Error('Walkthrough file is empty or too large');
    return JSON.parse(text);
  }
  async function loadCanonical() {
    setStatus('Loading...');
    try {
      const manifest = await fetchJson(CANONICAL_MANIFEST);
      if (manifest.schemaVersion !== 2 || !Array.isArray(manifest.modules)) throw new Error('Invalid manifest');
      const base = new URL('.', CANONICAL_MANIFEST);
      const loaded = [];
      for (const item of manifest.modules.filter(x => x.enabled !== false)) {
        if (!ID_RE.test(item.id || '') || typeof item.path !== 'string') continue;
        try {
          const mod = validateModule(await fetchJson(new URL(item.path, base).href));
          loaded.push({ ...mod, source: 'canonical' });
        } catch (err) { rememberError(err, `module:${item.id}`); }
      }
      canonical = loaded;
      GM_setValue(CACHE_KEY, JSON.stringify(canonical));
      setStatus(`CTRL ${VERSION} - ${canonical.length + custom.length} guides`);
    } catch (err) {
      rememberError(err, 'manifest');
      canonical = loadJson(CACHE_KEY, []);
      setStatus(canonical.length ? 'Offline - cached guides' : 'Could not load guides');
    }
    refreshLauncher();
    if (panelOpen) renderCurrent();
  }
  function allModules() {
    const byId = new Map();
    canonical.forEach(m => byId.set(m.id, m));
    custom.forEach(m => byId.set(m.id, { ...m, source: 'custom' }));
    return [...byId.values()].sort((a, b) => a.title.localeCompare(b.title));
  }
  function moduleById(id) { return allModules().find(m => m.id === id) || null; }
  function rememberError(err, scope) {
    lastError = { version: VERSION, scope, code: err?.name || 'Error', message: safeText(err?.message || err, 500), url: `${location.origin}${location.pathname}`, active: state.activeId || null, step: state.activeId ? Number(state.step[state.activeId] || 0) + 1 : null, time: new Date().toISOString() };
  }

  const pageStyle = document.createElement('style');
  pageStyle.textContent = '.ctrl-walkthrough-page-highlight{outline:4px solid #f47a20!important;outline-offset:3px!important;box-shadow:0 0 0 8px rgba(244,122,32,.18)!important}';
  (document.head || document.documentElement).appendChild(pageStyle);

  const host = document.createElement('div');
  host.id = 'ctrl-walkthrough-host-v4';
  document.documentElement.appendChild(host);
  const root = host.attachShadow({ mode: 'closed' });
  root.innerHTML = `
    <style>
      :host{all:initial}*{box-sizing:border-box}.cw-launch{position:fixed;right:8px;bottom:10px;z-index:2147483647;min-width:42px;height:32px;padding:0 9px;border:1px solid #334155;border-radius:16px;background:#07111c;color:#fff;font:800 10.5px system-ui;box-shadow:0 6px 20px #0005}.cw-panel{position:fixed;right:10px;bottom:10px;z-index:2147483646;width:min(390px,calc(100vw - 20px));max-height:min(620px,60vh);display:none;flex-direction:column;background:#07111c;color:#f8fafc;border:1px solid #334155;border-radius:15px;box-shadow:0 18px 60px #0008;font:12.5px/1.32 system-ui,-apple-system,sans-serif;overflow:hidden}.cw-panel.open{display:flex}.cw-head{display:flex;align-items:center;gap:5px;padding:6px 7px;border-bottom:1px solid #263648}.cw-head strong{flex:1;font-size:12.5px}.cw-icon{border:0;border-radius:8px;padding:5px 7px;background:#1f2937;color:#fff;font:800 11px system-ui}.cw-status{padding:3px 8px;background:#0d1b28;color:#91a4b7;font-size:9.5px;border-bottom:1px solid #263648}.cw-progress{height:2px;background:#1e293b}.cw-progress span{display:block;height:100%;background:#f47a20}.cw-content{overflow:auto;padding:9px}.cw-kicker{font-size:9px;font-weight:800;letter-spacing:.08em;color:#f7a45f;text-transform:uppercase}.cw-title{font-size:14px;font-weight:800;margin:2px 0 4px}.cw-why{font-size:10.5px;color:#a9bac9;margin:0 0 6px}.cw-body{font-size:11px;color:#e2e8f0;white-space:pre-wrap;margin:0 0 8px}.cw-next{margin-top:7px;padding:6px 7px;border:1px solid #223348;border-radius:9px;background:#0a1622;color:#8293a5;font-size:10px}.cw-next b{color:#aab7c4}.cw-row{display:flex;gap:6px;flex-wrap:wrap}.cw-btn{border:0;border-radius:9px;padding:7px 9px;font:750 11px system-ui;background:#1f2937;color:#fff}.cw-primary{flex:1;background:#f47a20;color:#111}.cw-muted{background:#162331;color:#b6c3cf}.cw-danger{background:#442020;color:#fecaca}.cw-msg{margin-top:7px;padding:7px;border-radius:8px;background:#132536;color:#d3dfeb;font-size:10px}.cw-warn{background:#3b2b0d;color:#fde7ae}.cw-ok{background:#12311f;color:#c6f6d5}.cw-bad{background:#3a1515;color:#fecaca}.cw-step-list{display:flex;flex-direction:column;gap:5px}.cw-step{width:100%;text-align:left;border:1px solid #23364b;border-radius:9px;padding:7px;background:#0b1723;color:#8798a8;font:600 10.5px system-ui}.cw-step.current{border-color:#f47a20;color:#fff;background:#17212b}.cw-step.done{color:#b8c7d4}.cw-step small{display:block;color:#718394;margin-top:2px}.cw-card{padding:7px;border:1px solid #294057;border-radius:10px;background:#0d1b28;margin-top:7px}.cw-file{display:none}select,input[type=url],input[type=password],textarea{width:100%;border:1px solid #475569;border-radius:9px;background:#0b1623;color:#fff;padding:7px 8px;font:600 11px system-ui}textarea{min-height:74px;resize:vertical;font-family:ui-monospace,SFMono-Regular,Consolas,monospace;font-size:10px}
      @media(max-width:640px){.cw-launch{right:6px;bottom:8px;height:30px;min-width:38px;font-size:9.5px}.cw-panel{left:7px;right:7px;bottom:7px;width:auto;max-height:30vh;border-radius:12px;font-size:11px}.cw-panel.expanded{max-height:66vh}.cw-head{padding:4px 6px}.cw-head strong{font-size:11px}.cw-icon{padding:4px 6px;font-size:10px}.cw-status{font-size:8.5px;padding:3px 6px}.cw-content{padding:7px}.cw-kicker{font-size:8px}.cw-title{font-size:12.5px}.cw-why{font-size:9.5px}.cw-body{font-size:10px;margin-bottom:6px}.cw-btn{padding:6px 7px;font-size:10px}.cw-next{font-size:9px;padding:5px 6px}.cw-step{font-size:9.5px;padding:6px}select,input[type=url],input[type=password],textarea{padding:6px 7px;font-size:10px}}
    </style>
    <button class="cw-launch" aria-label="Open CTRL Walkthrough">CW</button>
    <section class="cw-panel" role="dialog" aria-label="CTRL Walkthrough">
      <div class="cw-head"><strong>CTRL</strong><button class="cw-icon" data-act="back" title="Back">&lt;</button><button class="cw-icon" data-act="steps" title="All steps">Steps</button><button class="cw-icon" data-act="add" title="Add walkthrough">+</button><button class="cw-icon" data-act="expand" title="Expand">^</button><button class="cw-icon" data-act="min" title="Minimize">-</button></div>
      <div class="cw-status">Starting...</div><div class="cw-progress"><span style="width:0%"></span></div><div class="cw-content"></div><input class="cw-file" type="file" accept="application/json,.json,.walkthrough.json">
    </section>`;

  const launch = root.querySelector('.cw-launch');
  const panel = root.querySelector('.cw-panel');
  const content = root.querySelector('.cw-content');
  const status = root.querySelector('.cw-status');
  const progress = root.querySelector('.cw-progress span');
  const fileInput = root.querySelector('.cw-file');
  function setStatus(s) { status.textContent = s; }
  function clearContent() { while (content.firstChild) content.removeChild(content.firstChild); }
  function el(tag, cls, text) { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }
  function btn(label, cls, fn) { const b = el('button', `cw-btn ${cls || ''}`, label); b.type = 'button'; b.addEventListener('click', fn); return b; }
  function message(text, cls = '') { const d = el('div', `cw-msg ${cls}`, text); content.appendChild(d); return d; }
  function updateViewportMode() { panel.classList.toggle('expanded', Boolean(state.expanded || showAllSteps)); }
  window.addEventListener('resize', updateViewportMode, { passive: true });
  window.visualViewport?.addEventListener('resize', updateViewportMode, { passive: true });
  function setPanelOpen(open) { panelOpen = Boolean(open); panel.classList.toggle('open', panelOpen); launch.style.display = panelOpen ? 'none' : 'block'; if (panelOpen) renderCurrent(); }
  function refreshLauncher() {
    const mod = moduleById(state.activeId);
    if (!mod) { launch.textContent = 'CW'; return; }
    const i = Math.min(Number(state.step[mod.id] || 0), mod.steps.length - 1);
    launch.textContent = `CW ${i + 1}/${mod.steps.length}`;
  }
  function renderCurrent() { const active = moduleById(state.activeId); if (showAllSteps && active) renderAllSteps(active); else if (active) renderStep(active); else renderHome(); }

  function renderHome() {
    clearContent(); progress.style.width = '0%';
    const mods = allModules();
    content.appendChild(el('div', 'cw-kicker', 'Choose a guide'));
    content.appendChild(el('div', 'cw-title', 'What are we doing?'));
    content.appendChild(el('div', 'cw-body', 'Pick one walkthrough. CTRL will show only the current step and the next step.'));
    const select = el('select'); const p = el('option', '', mods.length ? 'Select walkthrough...' : 'No walkthroughs loaded'); p.value = ''; select.appendChild(p);
    mods.forEach(m => { const o = el('option', '', `${m.title}${m.source === 'custom' ? ' - custom' : ''}`); o.value = m.id; select.appendChild(o); });
    select.value = state.selectedId && moduleById(state.selectedId) ? state.selectedId : '';
    select.addEventListener('change', () => { state.selectedId = select.value; saveState(); renderHome(); }); content.appendChild(select);
    const selected = moduleById(state.selectedId);
    if (selected) {
      const card = el('div', 'cw-card'); card.appendChild(el('div', 'cw-body', selected.description || ''));
      card.appendChild(btn('Start this walkthrough', 'cw-primary', () => startWalkthrough(selected))); content.appendChild(card);
    }
  }
  function startWalkthrough(mod) {
    state.activeId = mod.id; state.selectedId = mod.id; state.step[mod.id] = 0; state.completed[mod.id] = false; saveState(); refreshLauncher(); showAllSteps = false; renderStep(mod);
  }
  function renderStep(mod) {
    clearContent(); showAllSteps = false; updateViewportMode();
    const i = Math.min(Number(state.step[mod.id] || 0), mod.steps.length - 1); state.step[mod.id] = i; saveState(); refreshLauncher();
    const step = mod.steps[i]; progress.style.width = `${((i + 1) / mod.steps.length) * 100}%`;
    content.appendChild(el('div', 'cw-kicker', `Now - step ${i + 1} of ${mod.steps.length}`));
    content.appendChild(el('div', 'cw-title', step.title));
    if (step.why) content.appendChild(el('div', 'cw-why', `Why: ${step.why}`));
    content.appendChild(el('div', 'cw-body', step.body));
    if (step.humanGate) message(step.humanGate, 'cw-warn');
    renderPrimaryAction(mod, step, i);
    const next = mod.steps[i + 1];
    if (next) { const n = el('div', 'cw-next'); n.appendChild(el('b', '', 'Next: ')); n.appendChild(document.createTextNode(next.title)); content.appendChild(n); }
  }
  function renderPrimaryAction(mod, step, i) {
    const action = step.action || { type: 'none' };
    const row = el('div', 'cw-row');
    const add = (label, fn) => row.appendChild(btn(label, 'cw-primary', fn));
    if (action.type === 'open') add(action.label || 'Open this page', () => { if (action.autoAdvance) moveStep(mod, 1, true); openUrl(action.url); });
    else if (action.type === 'copy') add(action.label || 'Copy', () => { GM_setClipboard(action.text); message('Copied.', 'cw-ok'); if (action.autoAdvance) setTimeout(() => moveStep(mod, 1, true), 250); });
    else if (action.type === 'find') add(action.label || 'Show me where', () => findAndHighlight(step.target || action.target));
    else if (action.type === 'click') add(action.label || 'Click it for me', () => safeAutoClick(mod, step, action));
    else if (action.type === 'download') add(action.label || `Download ${action.filename}`, () => { downloadText(action.filename, action.text); message('Downloaded. Keep this file for the step that asks for it.', 'cw-ok'); if (action.autoAdvance) setTimeout(() => moveStep(mod, 1, true), 250); });
    else if (action.type === 'generate') add(action.label || 'Generate & copy', () => { generatePrivate(mod.id, action.key, Number(action.bytes || 32)); message('Generated locally and copied. It is stored only in this Tampermonkey walkthrough until you finish.', 'cw-ok'); if (action.autoAdvance) setTimeout(() => moveStep(mod, 1, true), 250); });
    else if (action.type === 'copySaved') add(action.label || 'Copy saved value', () => { const v = getPrivate(mod.id, action.key); if (!v) message('That value is not saved yet. Go back to the step where it is created or entered.', 'cw-bad'); else { GM_setClipboard(v); message('Copied from temporary local walkthrough memory.', 'cw-ok'); if (action.autoAdvance) setTimeout(() => moveStep(mod, 1, true), 250); } });
    else if (action.type === 'capture') {
      const input = el('input'); input.type = 'password'; input.placeholder = action.placeholder || 'Paste value here'; content.appendChild(input);
      add(action.label || 'Save on this device & continue', () => { const v = input.value.trim(); if (!v) { message('Nothing was entered.', 'cw-bad'); return; } setPrivate(mod.id, action.key, v); input.value = ''; message('Saved only in temporary Tampermonkey walkthrough memory.', 'cw-ok'); moveStep(mod, 1, true); });
    } else if (step.success) add(step.manualLabel || 'Check & continue', () => { if (checkSuccess(step.success, false)) moveStep(mod, 1, true); });
    else add(step.manualLabel || (step.humanGate ? "I've done this - continue" : (i === mod.steps.length - 1 ? 'Finish' : 'Next')), () => moveStep(mod, 1, true));
    content.appendChild(row);
  }
  function moveStep(mod, delta, preserveOpen = false) {
    let i = Number(state.step[mod.id] || 0) + delta;
    if (i >= mod.steps.length) {
      state.completed[mod.id] = true; state.activeId = ''; clearPrivateForWalkthrough(mod.id);
      if (mod._temporary) { custom = custom.filter(x => x.id !== mod.id); saveCustom(); if (state.selectedId === mod.id) state.selectedId = ''; }
      saveState(); refreshLauncher(); clearContent(); progress.style.width = '100%'; content.appendChild(el('div', 'cw-title', 'Done')); content.appendChild(el('div', 'cw-body', 'This walkthrough is complete. Temporary private values for it were cleared.')); content.appendChild(btn('Choose another', 'cw-primary', renderHome)); return;
    }
    i = Math.max(0, i); state.step[mod.id] = i; if (preserveOpen) state.autoOpenOnce = true; saveState(); refreshLauncher(); renderStep(mod);
  }
  function renderAllSteps(mod) {
    clearContent(); showAllSteps = true; updateViewportMode();
    const current = Math.min(Number(state.step[mod.id] || 0), mod.steps.length - 1);
    content.appendChild(el('div', 'cw-kicker', 'Route'));
    content.appendChild(el('div', 'cw-title', mod.title));
    content.appendChild(el('div', 'cw-body', 'Scroll if you want the whole route. Tap a step to jump to it.'));
    const list = el('div', 'cw-step-list');
    mod.steps.forEach((step, idx) => { const cls = idx === current ? 'current' : idx < current ? 'done' : ''; const b = el('button', `cw-step ${cls}`, `${idx < current ? '✓ ' : ''}${idx + 1}. ${step.title}`); b.type = 'button'; if (step.why) b.appendChild(el('small', '', step.why)); b.addEventListener('click', () => { state.step[mod.id] = idx; saveState(); showAllSteps = false; renderStep(mod); }); list.appendChild(b); }); content.appendChild(list);
    const row = el('div', 'cw-row'); row.style.marginTop = '7px'; row.appendChild(btn('Back to current step', 'cw-primary', () => { showAllSteps = false; renderStep(mod); })); row.appendChild(btn('End walkthrough', 'cw-danger', () => endWalkthrough(mod))); content.appendChild(row);
  }
  function endWalkthrough(mod) { state.activeId = ''; clearPrivateForWalkthrough(mod.id); saveState(); refreshLauncher(); showAllSteps = false; renderHome(); }

  function openUrl(url) {
    try { const u = new URL(url); if (u.protocol !== 'https:') throw new Error('Only HTTPS URLs are allowed'); state.autoOpenOnce = true; saveState(); location.assign(u.href); }
    catch (err) { rememberError(err, 'open'); message(err.message, 'cw-bad'); }
  }
  function candidatesFromText(texts) {
    const wanted = (texts || []).map(norm).filter(Boolean); if (!wanted.length) return [];
    const nodes = [...document.querySelectorAll('button,a,input,select,textarea,label,[role="button"],[role="link"],[tabindex]')];
    return nodes.filter(node => { const blob = norm(`${node.innerText || ''} ${node.textContent || ''} ${node.getAttribute?.('aria-label') || ''} ${node.getAttribute?.('title') || ''} ${node.value || ''}`); return wanted.some(t => blob.includes(t)); });
  }
  function locate(spec) {
    if (!spec) return null;
    for (const selector of spec.selectors || []) { try { const found = document.querySelector(selector); if (found) return found; } catch (_) {} }
    return candidatesFromText(spec.text)[0] || null;
  }
  function clearHighlights() { document.querySelectorAll('.ctrl-walkthrough-page-highlight').forEach(n => n.classList.remove('ctrl-walkthrough-page-highlight')); }
  function findAndHighlight(spec) {
    clearHighlights(); const node = locate(spec);
    if (!node) { message("I couldn't find it. The page may have changed. Use Steps to see what we're looking for, then do this one step yourself.", 'cw-bad'); return false; }
    node.classList.add('ctrl-walkthrough-page-highlight'); node.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' }); message('Found it - highlighted on the page.', 'cw-ok'); setTimeout(() => node.classList.remove('ctrl-walkthrough-page-highlight'), 10000); return true;
  }
  function safeAutoClick(mod, step, action) {
    const node = locate(step.target || action.target);
    if (!node) { message("I couldn't find that button. I did not guess or click anything else.", 'cw-bad'); if (action.fallbackTarget) findAndHighlight(action.fallbackTarget); return; }
    if (node.disabled || node.getAttribute?.('aria-disabled') === 'true') { message('I found it, but it is disabled right now.', 'cw-bad'); return; }
    node.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' }); node.classList.add('ctrl-walkthrough-page-highlight');
    state.autoOpenOnce = true; saveState();
    setTimeout(() => { try { node.click(); moveStep(mod, 1, true); } catch (err) { rememberError(err, 'auto-click'); message("I found it but couldn't click it. Please tap the highlighted control yourself.", 'cw-bad'); } }, 250);
  }
  function checkSuccess(spec, show = true) {
    let ok = false; if (spec.urlIncludes && String(location.href).includes(spec.urlIncludes)) ok = true; if (!ok && (spec.selectors || spec.text)) ok = Boolean(locate(spec));
    if (show || !ok) message(ok ? (spec.successMessage || 'Looks ready.') : (spec.failureMessage || "I can't confirm it yet. Finish this step, then try again."), ok ? 'cw-ok' : 'cw-warn'); return ok;
  }
  function downloadText(filename, text) { const blob = new Blob([text], { type: 'text/plain;charset=utf-8' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = filename; a.style.display = 'none'; document.documentElement.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); }

  function privateBucket(id) { if (!privateValues[id]) privateValues[id] = {}; return privateValues[id]; }
  function setPrivate(id, key, value) { privateBucket(id)[key] = value; savePrivate(); }
  function getPrivate(id, key) { return privateValues[id]?.[key] || ''; }
  function clearPrivateForWalkthrough(id) { if (privateValues[id]) { delete privateValues[id]; savePrivate(); } }
  function generatePrivate(id, key, bytes) { const arr = new Uint8Array(Math.max(16, Math.min(64, bytes || 32))); crypto.getRandomValues(arr); const raw = String.fromCharCode(...arr); const value = btoa(raw).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, ''); setPrivate(id, key, value); GM_setClipboard(value); return value; }

  function cleanPortableModule(mod) { const out = cloneValue(mod); delete out.source; delete out._remoteUrl; delete out._githubPointer; delete out._temporary; return out; }
  function downloadModule(mod) { downloadText(`${mod.id}.walkthrough.json`, JSON.stringify(cleanPortableModule(mod), null, 2) + '\n'); }
  function upsertCustom(mod, meta = {}) { custom = custom.filter(x => x.id !== mod.id); custom.push({ ...cleanPortableModule(mod), source: 'custom', ...meta }); saveCustom(); state.selectedId = mod.id; saveState(); }

  function normalizePastedCode(raw) {
    let s = String(raw || '').trim().normalize('NFKC');
    s = s.replace(/^```[a-zA-Z0-9_-]*\s*/i, '').replace(/```\s*$/i, '').trim();
    const marker = s.match(/CWZ2:|CW2:|CWG1:/i);
    if (marker && marker.index > 0) s = s.slice(marker.index);
    return s;
  }
  function cleanB64urlPayload(text) {
    const clean = String(text || '').normalize('NFKC').replace(/[\s`'"\u200B-\u200D\uFEFF\u00AD]/g, '');
    if (!/^[A-Za-z0-9_-]+$/.test(clean)) throw new Error('The pasted code contains a damaged character. Copy the code again, or use Import file.');
    return clean;
  }
  function decodeBase64UrlBytes(text) { const clean = cleanB64urlPayload(text).replace(/-/g, '+').replace(/_/g, '/'); const padded = clean + '='.repeat((4 - (clean.length % 4)) % 4); const binary = atob(padded); return Uint8Array.from(binary, c => c.charCodeAt(0)); }
  function decodeCW2(payload) { return JSON.parse(new TextDecoder().decode(decodeBase64UrlBytes(payload))); }
  async function decodeCWZ2(payload) { if (typeof DecompressionStream !== 'function') throw new Error('This browser cannot decode CWZ2. Use Import file instead.'); const bytes = decodeBase64UrlBytes(payload); const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip')); const text = await new Response(stream).text(); if (text.length > MAX_BYTES) throw new Error('Walkthrough code is too large'); return JSON.parse(text); }

  function parseGitHubPointer(text) {
    const s = String(text || '').trim();
    if (s.startsWith('CWG1:')) { const body = s.slice(5); const colon = body.indexOf(':'); const at = body.indexOf('@'); if (at <= 0 || colon <= at + 1) throw new Error('Invalid CWG1 code'); const [owner, repo] = body.slice(0, at).split('/'); return validateGitHubPointer({ owner, repo, ref: body.slice(at + 1, colon), path: body.slice(colon + 1).replace(/^\/+/, '') }); }
    try { const u = new URL(s); if (u.hostname !== 'github.com') return null; const parts = u.pathname.split('/').filter(Boolean); if (parts.length < 5 || parts[2] !== 'blob') return null; return validateGitHubPointer({ owner: parts[0], repo: parts[1], ref: parts[3], path: parts.slice(4).join('/') }); } catch (_) { return null; }
  }
  function validateGitHubPointer(pointer) { const { owner, repo, ref, path } = pointer || {}; if (!GH_PART_RE.test(owner || '') || !GH_PART_RE.test(repo || '') || !GH_REF_RE.test(ref || '')) throw new Error('Invalid GitHub walkthrough pointer'); const cleanPath = String(path || '').replace(/\\/g, '/').replace(/^\/+/, ''); if (!cleanPath || cleanPath.length > 500 || cleanPath.includes('..') || cleanPath.includes('//')) throw new Error('Invalid GitHub walkthrough path'); return { owner, repo, ref, path: cleanPath }; }
  function githubBlobUrl(pointer) { const p = validateGitHubPointer(pointer); const path = p.path.split('/').map(encodeURIComponent).join('/'); return `https://github.com/${encodeURIComponent(p.owner)}/${encodeURIComponent(p.repo)}/blob/${encodeURIComponent(p.ref)}/${path}#ctrl-walkthrough-import`; }
  function pointerFromCurrentGitHubPage() { if (location.hostname !== 'github.com') return null; return parseGitHubPointer(location.href); }
  async function fetchPrivateGitHubWalkthrough(pointer) { const p = validateGitHubPointer(pointer); if (location.hostname !== 'github.com') throw new Error('Open the GitHub page first'); if (!location.pathname.startsWith(`/${p.owner}/${p.repo}/`)) throw new Error('Open the matching GitHub repository first'); const path = p.path.split('/').map(encodeURIComponent).join('/'); const rawUrl = `https://github.com/${encodeURIComponent(p.owner)}/${encodeURIComponent(p.repo)}/raw/${encodeURIComponent(p.ref)}/${path}`; const res = await fetch(rawUrl, { credentials: 'include', cache: 'no-store', redirect: 'follow' }); if (!res.ok) throw new Error(`GitHub returned HTTP ${res.status}`); const text = await res.text(); if (!text || text.length > MAX_BYTES || /^\s*</.test(text)) throw new Error('Private GitHub import is not available in this browser. Use CWZ2 or Import file.'); return validateModule(JSON.parse(text)); }
  async function attemptGitHubImport(pointer) { try { const mod = await fetchPrivateGitHubWalkthrough(pointer); upsertCustom(mod, { _temporary: true, _githubPointer: pointer }); GM_deleteValue(PENDING_GITHUB_KEY); state.activeId = mod.id; state.step[mod.id] = 0; saveState(); setPanelOpen(true); message(`Loaded ${mod.title}.`, 'cw-ok'); return true; } catch (err) { rememberError(err, 'github-private-import'); setPanelOpen(true); renderAdd(); message('Private GitHub import failed in this browser. Use a CWZ2 code or Import file instead.', 'cw-warn'); return false; } }
  function beginGitHubImport(pointer) { const p = validateGitHubPointer(pointer); GM_setValue(PENDING_GITHUB_KEY, JSON.stringify(p)); location.assign(githubBlobUrl(p)); }

  async function importText(raw) {
    const text = normalizePastedCode(raw); if (!text) throw new Error('Paste a walkthrough code, JSON, GitHub link, or HTTPS URL');
    if (text.startsWith('CWZ2:')) { const mod = validateModule(await decodeCWZ2(text.slice(5))); upsertCustom(mod, { _temporary: true }); return { mod, mode: 'temporary handoff' }; }
    if (text.startsWith('CW2:')) { const mod = validateModule(decodeCW2(text.slice(4))); upsertCustom(mod, { _temporary: true }); return { mod, mode: 'temporary handoff' }; }
    if (text.startsWith('{')) { const mod = validateModule(JSON.parse(text)); upsertCustom(mod, { _temporary: true }); return { mod, mode: 'temporary JSON' }; }
    const gh = parseGitHubPointer(text); if (gh) { beginGitHubImport(gh); return { mod: null, mode: 'GitHub pointer' }; }
    if (/^https:\/\//.test(text)) { const mod = validateModule(await fetchJson(text)); upsertCustom(mod, { _remoteUrl: text }); return { mod, mode: 'remote URL' }; }
    throw new Error('Unknown handoff. Use CWZ2, CW2, JSON, Import file, or a public HTTPS walkthrough URL.');
  }
  function renderAdd() {
    clearContent(); progress.style.width = '0%';
    content.appendChild(el('div', 'cw-kicker', 'Add guide')); content.appendChild(el('div', 'cw-title', 'Paste or import')); content.appendChild(el('div', 'cw-body', 'Best for private fixes: paste the CWZ2 code an AI gives you. If copy/paste is awkward, use Import file.'));
    const input = el('textarea'); input.placeholder = 'Paste CWZ2 / CW2 / JSON / URL'; input.autocapitalize = 'off'; input.autocomplete = 'off'; input.spellcheck = false; content.appendChild(input);
    const row = el('div', 'cw-row'); row.appendChild(btn('Load pasted code', 'cw-primary', async () => { try { const result = await importText(input.value); if (result.mod) { state.activeId = result.mod.id; state.step[result.mod.id] = 0; saveState(); renderStep(result.mod); message(`Loaded ${result.mod.title}.`, 'cw-ok'); } } catch (err) { rememberError(err, 'paste-import'); message(err.message, 'cw-bad'); } })); row.appendChild(btn('Import file', 'cw-muted', () => fileInput.click())); content.appendChild(row);
  }
  fileInput.addEventListener('change', async () => { const file = fileInput.files?.[0]; fileInput.value = ''; if (!file) return; try { if (file.size > MAX_BYTES) throw new Error('Walkthrough file is too large'); const mod = validateModule(JSON.parse(await file.text())); upsertCustom(mod); state.activeId = mod.id; state.step[mod.id] = 0; saveState(); renderStep(mod); message(`Loaded ${mod.title}.`, 'cw-ok'); } catch (err) { rememberError(err, 'custom-file'); renderAdd(); message(err.message, 'cw-bad'); } });

  root.addEventListener('click', (e) => {
    const act = e.target?.dataset?.act; if (!act) return;
    const mod = moduleById(state.activeId);
    if (act === 'min') setPanelOpen(false);
    if (act === 'add') { showAllSteps = false; renderAdd(); }
    if (act === 'steps') { if (mod) { showAllSteps = !showAllSteps; renderCurrent(); } else renderHome(); }
    if (act === 'expand') { state.expanded = !state.expanded; saveState(); updateViewportMode(); }
    if (act === 'back') { if (showAllSteps && mod) { showAllSteps = false; renderStep(mod); } else if (mod && Number(state.step[mod.id] || 0) > 0) moveStep(mod, -1); else renderHome(); }
  });
  launch.addEventListener('click', () => setPanelOpen(true));
  GM_registerMenuCommand('Open CTRL Walkthrough', () => setPanelOpen(true));
  GM_registerMenuCommand('Add / import walkthrough', () => { setPanelOpen(true); renderAdd(); });
  GM_registerMenuCommand('Reload CTRL Walkthroughs', () => loadCanonical());
  GM_registerMenuCommand('Copy redacted CTRL error', () => GM_setClipboard(JSON.stringify(lastError || { version: VERSION, message: 'No error recorded', url: `${location.origin}${location.pathname}` }, null, 2)));

  async function bootstrapPrivateImport() {
    let pointer = null;
    try { const raw = GM_getValue(PENDING_GITHUB_KEY, ''); if (raw) pointer = validateGitHubPointer(JSON.parse(raw)); } catch (_) { GM_deleteValue(PENDING_GITHUB_KEY); }
    if (!pointer && location.hash === '#ctrl-walkthrough-import') { try { pointer = pointerFromCurrentGitHubPage(); } catch (_) {} }
    if (pointer && location.hostname === 'github.com' && location.pathname.startsWith(`/${pointer.owner}/${pointer.repo}/`)) await attemptGitHubImport(pointer);
  }

  purgeExpired();
  refreshLauncher();
  updateViewportMode();
  if (state.autoOpenOnce && state.activeId) { state.autoOpenOnce = false; saveState(); panelOpen = true; panel.classList.add('open'); launch.style.display = 'none'; }
  bootstrapPrivateImport().finally(loadCanonical);
})();