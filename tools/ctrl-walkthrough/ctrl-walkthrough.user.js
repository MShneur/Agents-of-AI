// ==UserScript==
// @name         CTRL Walkthrough
// @namespace    https://github.com/MShneur/Agents-of-AI
// @version      0.2.0
// @description  Responsive, public, data-only setup walkthrough runner with custom walkthrough imports.
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

  const VERSION = '0.2.0';
  const CANONICAL_MANIFEST = 'https://raw.githubusercontent.com/MShneur/Agents-of-AI/main/tools/ctrl-walkthrough/manifest.json';
  const STATE_KEY = 'ctrlw:v2:state';
  const CACHE_KEY = 'ctrlw:v2:canonical-cache';
  const CUSTOM_KEY = 'ctrlw:v2:custom-modules';
  const MAX_BYTES = 250000;
  const MAX_STEPS = 100;
  const ID_RE = /^[a-z0-9][a-z0-9-]{0,63}$/;

  const state = loadJson(STATE_KEY, { open: false, activeId: '', step: {}, completed: {}, selectedId: '', expanded: false });
  let canonical = [];
  let custom = loadJson(CUSTOM_KEY, []);
  let lastError = null;
  let compact = false;

  function loadJson(key, fallback) {
    try {
      const raw = GM_getValue(key, '');
      return raw ? JSON.parse(raw) : structuredClone(fallback);
    } catch (_) { return structuredClone(fallback); }
  }
  function saveState() { GM_setValue(STATE_KEY, JSON.stringify(state)); }
  function saveCustom() { GM_setValue(CUSTOM_KEY, JSON.stringify(custom)); }
  function norm(s) { return String(s || '').replace(/\s+/g, ' ').trim().toLowerCase(); }
  function safeText(s, max = 1200) { return String(s || '').slice(0, max); }

  function validateModule(mod) {
    if (!mod || mod.schemaVersion !== 2 || !ID_RE.test(mod.id || '') || typeof mod.title !== 'string') throw new Error('Invalid walkthrough header');
    if (!Array.isArray(mod.steps) || mod.steps.length < 1 || mod.steps.length > MAX_STEPS) throw new Error('Invalid walkthrough steps');
    mod.steps.forEach((step, i) => {
      if (!step || typeof step.title !== 'string' || typeof step.body !== 'string') throw new Error(`Invalid step ${i + 1}`);
      const action = step.action || { type: 'none' };
      if (!['none', 'open', 'copy', 'find'].includes(action.type)) throw new Error(`Unsupported action at step ${i + 1}`);
      if (action.type === 'open' && !/^https:\/\//.test(action.url || '')) throw new Error(`Only HTTPS URLs are allowed at step ${i + 1}`);
      if (action.type === 'copy' && typeof action.text !== 'string') throw new Error(`Invalid copy action at step ${i + 1}`);
      if (step.target) validateLocator(step.target, i);
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
    setStatus('Loading walkthroughs…');
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
      setStatus(`CTRL ${VERSION} · ${canonical.length + custom.length} walkthroughs`);
    } catch (err) {
      rememberError(err, 'manifest');
      canonical = loadJson(CACHE_KEY, []);
      setStatus(canonical.length ? 'Offline · using cached walkthroughs' : 'Could not load walkthroughs');
    }
    renderHome();
  }
  function allModules() {
    const byId = new Map();
    canonical.forEach(m => byId.set(m.id, m));
    custom.forEach(m => byId.set(m.id, { ...m, source: 'custom' }));
    return [...byId.values()].sort((a, b) => a.title.localeCompare(b.title));
  }
  function moduleById(id) { return allModules().find(m => m.id === id) || null; }
  function rememberError(err, scope) {
    lastError = { version: VERSION, scope, code: err?.name || 'Error', message: safeText(err?.message || err, 500), url: `${location.origin}${location.pathname}`, active: state.activeId || null, step: state.activeId ? (Number(state.step[state.activeId] || 0) + 1) : null, time: new Date().toISOString() };
  }

  const host = document.createElement('div');
  host.id = 'ctrl-walkthrough-host';
  document.documentElement.appendChild(host);
  const root = host.attachShadow({ mode: 'closed' });
  root.innerHTML = `
    <style>
      :host{all:initial}*{box-sizing:border-box}.cw-launch{position:fixed;right:12px;bottom:12px;z-index:2147483647;width:46px;height:46px;border:0;border-radius:15px;background:#111827;color:#fff;font:800 12px system-ui;box-shadow:0 8px 28px #0006}.cw-panel{position:fixed;right:12px;bottom:12px;z-index:2147483646;width:min(430px,calc(100vw - 24px));max-height:min(760px,calc(100vh - 24px));display:none;flex-direction:column;background:#07111c;color:#f8fafc;border:1px solid #334155;border-radius:18px;box-shadow:0 20px 70px #0008;font:14px/1.4 system-ui,-apple-system,sans-serif;overflow:hidden}.cw-panel.open{display:flex}.cw-hidden{display:none!important}.cw-head{display:flex;align-items:center;gap:7px;padding:9px 10px;border-bottom:1px solid #263648}.cw-head strong{flex:1;font-size:14px}.cw-icon{border:0;border-radius:9px;padding:6px 9px;background:#1f2937;color:#fff;font:800 13px system-ui}.cw-status{padding:5px 10px;background:#0d1b28;color:#9fb3c7;font-size:11px;border-bottom:1px solid #263648}.cw-content{overflow:auto;padding:12px}.cw-title{font-size:17px;font-weight:800;margin:0 0 5px}.cw-desc{font-size:12.5px;color:#b9c7d5;margin:0 0 10px}.cw-meta{font-size:11px;color:#93a4b5;margin:0 0 6px}select,input[type=url]{width:100%;border:1px solid #475569;border-radius:10px;background:#0b1623;color:#fff;padding:9px 10px;font:600 13px system-ui}.cw-row{display:flex;gap:7px;flex-wrap:wrap}.cw-btn{border:0;border-radius:10px;padding:8px 10px;font:750 12.5px system-ui;background:#1f2937;color:#fff}.cw-primary{background:#f47a20;color:#111}.cw-light{background:#e5e7eb;color:#111}.cw-danger{background:#442020;color:#fecaca}.cw-card{padding:9px;border:1px solid #294057;border-radius:12px;background:#0d1b28;margin-top:9px}.cw-stepbody{font-size:12.5px;color:#e2e8f0;white-space:pre-wrap;margin:7px 0 10px}.cw-progress{height:3px;background:#1e293b}.cw-progress span{display:block;height:100%;background:#f47a20}.cw-tools{padding:8px 10px;border-top:1px solid #263648;display:flex;gap:6px;flex-wrap:wrap}.cw-tools .cw-btn{font-size:11px;padding:6px 8px}.cw-msg{margin-top:8px;padding:8px;border-radius:9px;background:#132536;color:#d3dfeb;font-size:11.5px}.cw-warn{background:#3b2b0d;color:#fde7ae}.cw-ok{background:#12311f;color:#c6f6d5}.cw-bad{background:#3a1515;color:#fecaca}.cw-file{display:none}.cw-highlight{outline:4px solid #f47a20!important;outline-offset:3px!important;box-shadow:0 0 0 8px rgba(244,122,32,.18)!important}@media(max-width:640px){.cw-launch{width:40px;height:40px;border-radius:13px;right:8px;bottom:8px;font-size:11px}.cw-panel{left:8px;right:8px;bottom:8px;width:auto;max-height:44vh;border-radius:14px;font-size:12px}.cw-panel.expanded{max-height:78vh}.cw-head{padding:6px 8px}.cw-head strong{font-size:12.5px}.cw-icon{padding:4px 7px;font-size:12px}.cw-status{padding:4px 8px;font-size:10px}.cw-content{padding:8px}.cw-title{font-size:14px}.cw-desc,.cw-stepbody{font-size:11px}.cw-meta{font-size:9.5px}select,input[type=url]{padding:7px 8px;font-size:11.5px}.cw-btn{padding:6px 8px;font-size:11px;border-radius:8px}.cw-card{padding:7px;margin-top:7px}.cw-tools{padding:6px 8px}.cw-tools .cw-btn{font-size:10px;padding:5px 7px}}
    </style>
    <button class="cw-launch" aria-label="Open CTRL Walkthrough">CW</button>
    <section class="cw-panel" role="dialog" aria-label="CTRL Walkthrough"><div class="cw-head"><strong>CTRL Walkthrough</strong><button class="cw-icon" data-act="home" title="Walkthrough list">⌂</button><button class="cw-icon" data-act="expand" title="Expand or compact">↕</button><button class="cw-icon" data-act="settings" title="Custom walkthroughs">⋮</button><button class="cw-icon" data-act="close" title="Close">×</button></div><div class="cw-status">Starting…</div><div class="cw-progress"><span style="width:0%"></span></div><div class="cw-content"></div><div class="cw-tools"><button class="cw-btn" data-act="reload">Reload walkthroughs</button><button class="cw-btn" data-act="error">Copy error</button></div><input class="cw-file" type="file" accept="application/json,.json,.walkthrough.json"></section>`;

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
  function updateViewportMode() { compact = window.innerWidth <= 640 || (window.visualViewport && window.visualViewport.width <= 640); panel.classList.toggle('expanded', compact && state.expanded); }
  window.addEventListener('resize', updateViewportMode, { passive: true });
  window.visualViewport?.addEventListener('resize', updateViewportMode, { passive: true });
  updateViewportMode();
  function setOpen(open) { state.open = Boolean(open); saveState(); panel.classList.toggle('open', state.open); launch.classList.toggle('cw-hidden', state.open); if (state.open) renderCurrent(); }
  function renderCurrent() { const active = moduleById(state.activeId); if (active) renderStep(active); else renderHome(); }

  function renderHome() {
    clearContent(); progress.style.width = '0%';
    const mods = allModules();
    content.appendChild(el('div', 'cw-title', 'Choose a walkthrough'));
    content.appendChild(el('div', 'cw-desc', 'Pick a setup guide, then press Start. Canonical guides are public; custom guides stay in this browser unless you choose a remote URL.'));
    const select = el('select');
    const placeholder = el('option', '', mods.length ? 'Select walkthrough…' : 'No walkthroughs loaded'); placeholder.value = ''; select.appendChild(placeholder);
    mods.forEach(m => { const o = el('option', '', `${m.title}${m.source === 'custom' ? ' · custom' : ''}`); o.value = m.id; select.appendChild(o); });
    select.value = state.selectedId && moduleById(state.selectedId) ? state.selectedId : '';
    select.addEventListener('change', () => { state.selectedId = select.value; saveState(); renderHome(); }); content.appendChild(select);
    const selected = moduleById(state.selectedId);
    if (selected) {
      const card = el('div', 'cw-card'); card.appendChild(el('div', 'cw-meta', `Walkthrough key: ${selected.id}`)); card.appendChild(el('div', 'cw-desc', selected.description || ''));
      const row = el('div', 'cw-row'); row.appendChild(btn('Start walkthrough', 'cw-primary', () => startWalkthrough(selected))); row.appendChild(btn('Copy key', '', () => GM_setClipboard(selected.id))); card.appendChild(row); content.appendChild(card);
    }
    const active = moduleById(state.activeId);
    if (active) { const row = el('div', 'cw-row'); row.style.marginTop = '9px'; row.appendChild(btn(`Resume ${active.title}`, 'cw-light', () => renderStep(active))); row.appendChild(btn('End', '', () => { state.activeId = ''; saveState(); renderHome(); })); content.appendChild(row); }
  }

  function startWalkthrough(mod) {
    state.activeId = mod.id; state.selectedId = mod.id; state.step[mod.id] = 0; state.completed[mod.id] = false; saveState(); renderStep(mod);
    const first = mod.steps[0]; if (first?.action?.type === 'open' && first.action.url) openUrl(first.action.url, true);
  }
  function renderStep(mod) {
    clearContent(); const i = Math.min(Number(state.step[mod.id] || 0), mod.steps.length - 1); state.step[mod.id] = i; saveState(); const step = mod.steps[i]; progress.style.width = `${((i + 1) / mod.steps.length) * 100}%`;
    content.appendChild(el('div', 'cw-meta', `${mod.title} · step ${i + 1}/${mod.steps.length} · key ${mod.id}`)); content.appendChild(el('div', 'cw-title', step.title)); content.appendChild(el('div', 'cw-stepbody', step.body)); if (step.humanGate) message(step.humanGate, 'cw-warn');
    const row = el('div', 'cw-row'); const action = step.action || { type: 'none' };
    if (action.type === 'open') row.appendChild(btn(action.label || 'Open page', 'cw-primary', () => openUrl(action.url, false)));
    if (action.type === 'copy') row.appendChild(btn(action.label || 'Copy', 'cw-primary', () => GM_setClipboard(action.text)));
    if (action.type === 'find' || step.target) row.appendChild(btn(action.label || 'Find on page', 'cw-primary', () => findAndHighlight(step.target || action.target)));
    if (step.success) row.appendChild(btn('Check page', '', () => checkSuccess(step.success)));
    if (i > 0) row.appendChild(btn('Back', '', () => moveStep(mod, -1)));
    row.appendChild(btn(i === mod.steps.length - 1 ? 'Finish' : 'Continue', 'cw-light', () => moveStep(mod, 1))); content.appendChild(row);
  }
  function moveStep(mod, delta) {
    let i = Number(state.step[mod.id] || 0) + delta;
    if (i >= mod.steps.length) { state.completed[mod.id] = true; state.activeId = ''; saveState(); clearContent(); progress.style.width = '100%'; content.appendChild(el('div', 'cw-title', 'Walkthrough complete')); content.appendChild(el('div', 'cw-desc', `${mod.title} is marked complete on this device.`)); content.appendChild(btn('Choose another', 'cw-primary', renderHome)); return; }
    i = Math.max(0, i); state.step[mod.id] = i; saveState(); renderStep(mod);
  }
  function openUrl(url, fromStart) {
    try { const u = new URL(url); if (u.protocol !== 'https:') throw new Error('Only HTTPS URLs are allowed'); if (fromStart) location.assign(u.href); else GM_openInTab(u.href, { active: true, insert: true, setParent: true }); }
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
  function clearHighlights() { document.querySelectorAll('.cw-highlight').forEach(n => n.classList.remove('cw-highlight')); }
  function findAndHighlight(spec) {
    clearHighlights(); const node = locate(spec);
    if (!node) { message('I could not find that control on this page. The provider may have changed its UI; you can continue manually or update the walkthrough.', 'cw-warn'); return; }
    node.classList.add('cw-highlight'); node.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' }); message(`Found: ${safeText(node.innerText || node.getAttribute?.('aria-label') || node.textContent || node.tagName, 120)}`, 'cw-ok'); setTimeout(() => node.classList.remove('cw-highlight'), 10000);
  }
  function checkSuccess(spec) {
    let ok = false; if (spec.urlIncludes && String(location.href).includes(spec.urlIncludes)) ok = true; if (!ok && (spec.selectors || spec.text)) ok = Boolean(locate(spec));
    message(ok ? (spec.successMessage || 'This page looks ready. You can continue.') : (spec.failureMessage || 'I cannot confirm that state yet. Complete the page step manually, then check again.'), ok ? 'cw-ok' : 'cw-warn');
  }

  function renderSettings() {
    clearContent(); progress.style.width = '0%'; content.appendChild(el('div', 'cw-title', 'Custom walkthroughs')); content.appendChild(el('div', 'cw-desc', 'Import a data-only JSON walkthrough. No JavaScript in walkthrough files is executed. Local imports are stored only in Tampermonkey storage on this browser.'));
    const row = el('div', 'cw-row'); row.appendChild(btn('Import JSON file', 'cw-primary', () => fileInput.click())); row.appendChild(btn('Load from URL', '', () => renderUrlImport())); content.appendChild(row);
    custom.forEach(m => { const card = el('div', 'cw-card'); card.appendChild(el('div', 'cw-meta', `Custom key: ${m.id}`)); card.appendChild(el('div', 'cw-desc', m.title)); card.appendChild(btn('Remove', 'cw-danger', () => { custom = custom.filter(x => x.id !== m.id); if (state.activeId === m.id) state.activeId = ''; if (state.selectedId === m.id) state.selectedId = ''; saveCustom(); saveState(); renderSettings(); })); content.appendChild(card); });
  }
  function renderUrlImport() {
    clearContent(); content.appendChild(el('div', 'cw-title', 'Load walkthrough URL')); content.appendChild(el('div', 'cw-desc', 'Enter a public HTTPS JSON URL that permits browser CORS. If it does not, download the JSON and use Import JSON file instead.'));
    const input = el('input'); input.type = 'url'; input.placeholder = 'https://example.com/my.walkthrough.json'; content.appendChild(input); const row = el('div', 'cw-row'); row.style.marginTop = '8px';
    row.appendChild(btn('Load', 'cw-primary', async () => { try { const mod = validateModule(await fetchJson(input.value.trim())); upsertCustom(mod); message(`Loaded ${mod.title}`, 'cw-ok'); } catch (err) { rememberError(err, 'custom-url'); message(err.message, 'cw-bad'); } })); row.appendChild(btn('Back', '', renderSettings)); content.appendChild(row);
  }
  function upsertCustom(mod) { custom = custom.filter(x => x.id !== mod.id); custom.push({ ...mod, source: 'custom' }); saveCustom(); state.selectedId = mod.id; saveState(); }
  fileInput.addEventListener('change', async () => {
    const file = fileInput.files?.[0]; fileInput.value = ''; if (!file) return;
    try { if (file.size > MAX_BYTES) throw new Error('Walkthrough file is too large'); const mod = validateModule(JSON.parse(await file.text())); upsertCustom(mod); renderSettings(); message(`Imported ${mod.title}`, 'cw-ok'); }
    catch (err) { rememberError(err, 'custom-file'); renderSettings(); message(err.message, 'cw-bad'); }
  });

  root.addEventListener('click', (e) => {
    const act = e.target?.dataset?.act; if (!act) return;
    if (act === 'close') setOpen(false); if (act === 'home') renderHome(); if (act === 'settings') renderSettings(); if (act === 'expand') { state.expanded = !state.expanded; saveState(); updateViewportMode(); } if (act === 'reload') loadCanonical();
    if (act === 'error') { GM_setClipboard(JSON.stringify(lastError || { version: VERSION, message: 'No error recorded', url: `${location.origin}${location.pathname}` }, null, 2)); setStatus('Redacted error copied'); }
  });
  launch.addEventListener('click', () => setOpen(true));
  GM_registerMenuCommand('Open CTRL Walkthrough', () => setOpen(true));
  GM_registerMenuCommand('Reload CTRL Walkthroughs', () => loadCanonical());
  if (state.open) setOpen(true);
  loadCanonical();
})();
