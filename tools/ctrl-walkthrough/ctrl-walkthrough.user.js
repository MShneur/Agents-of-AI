// ==UserScript==
// @name         Control Walkthrough
// @namespace    https://github.com/MShneur/Agents-of-AI
// @version      0.5.0
// @description  Autonomous, novice-first step-by-step navigation rail for public and private setup walkthroughs.
// @match        https://*/*
// @match        http://localhost/*
// @noframes
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_setClipboard
// @grant        GM_registerMenuCommand
// @run-at       document-idle
// @downloadURL  https://raw.githubusercontent.com/MShneur/Agents-of-AI/main/tools/ctrl-walkthrough/ctrl-walkthrough.user.js
// @updateURL    https://raw.githubusercontent.com/MShneur/Agents-of-AI/main/tools/ctrl-walkthrough/ctrl-walkthrough.user.js
// ==/UserScript==

(() => {
  'use strict';

  const VERSION = '0.5.0';
  const CANONICAL_MANIFEST = 'https://raw.githubusercontent.com/MShneur/Agents-of-AI/main/tools/ctrl-walkthrough/manifest.json';
  const STATE_KEY = 'ctrlw:v3:state';
  const CACHE_KEY = 'ctrlw:v3:canonical-cache';
  const CUSTOM_KEY = 'ctrlw:v3:custom-modules';
  const PENDING_GITHUB_KEY = 'ctrlw:v3:pending-github-import';
  const PRIVATE_KEY = 'ctrlw:v4:temporary-private-values';
  const MAX_BYTES = 250000;
  const MAX_STEPS = 120;
  const ID_RE = /^[a-z0-9][a-z0-9-]{0,63}$/;
  const KEY_RE = /^[a-zA-Z0-9._:-]{1,80}$/;
  const GH_PART_RE = /^[A-Za-z0-9_.-]+$/;
  const GH_REF_RE = /^[A-Za-z0-9._/-]{1,120}$/;
  const SAFE_EVENTS = new Set(['click', 'change', 'input', 'submit']);
  const DANGEROUS_CLICK_RE = /\b(delete|remove|revoke|destroy|purchase|buy|checkout|pay|subscribe|upgrade|trial|authorize|approve|grant|allow|accept|agree|publish|release|deploy|create|generate token|regenerate|rotate|reset|submit|save changes|confirm)\b/i;

  const state = loadJson(STATE_KEY, {
    activeId: '', step: {}, completed: {}, selectedId: '', expanded: false, autoOpenOnce: false,
    pending: null, dock: 'auto',
  });
  if (!state.step) state.step = {};
  if (!state.completed) state.completed = {};
  if (!('pending' in state)) state.pending = null;
  if (!state.dock) state.dock = 'auto';

  let canonical = [];
  let custom = loadJson(CUSTOM_KEY, []);
  let privateValues = loadJson(PRIVATE_KEY, {});
  let lastError = null;
  let panelOpen = false;
  let showAllSteps = false;
  let currentAdvanceCleanup = null;
  const autoAttempts = new Set();

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
  function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
  function stepIndex(mod) { return Math.min(Math.max(0, Number(state.step[mod.id] || 0)), mod.steps.length - 1); }
  function rememberError(err, scope) {
    lastError = {
      version: VERSION, scope, code: err?.name || 'Error', message: safeText(err?.message || err, 500),
      url: `${location.origin}${location.pathname}`, active: state.activeId || null,
      step: state.activeId ? Number(state.step[state.activeId] || 0) + 1 : null, time: new Date().toISOString(),
    };
  }

  function isExpired(mod) {
    if (!mod?._temporary || !mod.handoffExpiresAt) return false;
    const t = Date.parse(mod.handoffExpiresAt);
    return Number.isFinite(t) && t <= Date.now();
  }
  function purgeExpired() {
    const expiredIds = custom.filter(isExpired).map(m => m.id);
    if (!expiredIds.length) return;
    custom = custom.filter(m => !isExpired(m));
    saveCustom();
    expiredIds.forEach(clearPrivateForWalkthrough);
    if (expiredIds.includes(state.activeId)) state.activeId = '';
    if (expiredIds.includes(state.selectedId)) state.selectedId = '';
    if (state.pending && expiredIds.includes(state.pending.id)) state.pending = null;
    saveState();
  }

  function validateLocator(loc, i, allowUrl = false) {
    if (typeof loc !== 'object' || loc === null) throw new Error(`Invalid locator at step ${i + 1}`);
    if (loc.selectors && !Array.isArray(loc.selectors)) throw new Error(`Invalid selectors at step ${i + 1}`);
    if (loc.text && !Array.isArray(loc.text)) throw new Error(`Invalid text locator at step ${i + 1}`);
    if (!allowUrl && (loc.urlIncludes || loc.urlMatches)) throw new Error(`URL matcher not allowed here at step ${i + 1}`);
    if (loc.urlMatches) {
      try { new RegExp(loc.urlMatches); } catch (_) { throw new Error(`Invalid URL regex at step ${i + 1}`); }
    }
  }
  function validateModule(mod) {
    if (!mod || mod.schemaVersion !== 2 || !ID_RE.test(mod.id || '') || typeof mod.title !== 'string') throw new Error('Invalid walkthrough header');
    if (!Array.isArray(mod.steps) || mod.steps.length < 1 || mod.steps.length > MAX_STEPS) throw new Error('Invalid walkthrough steps');
    mod.steps.forEach((step, i) => {
      if (!step || typeof step.title !== 'string' || typeof step.body !== 'string') throw new Error(`Invalid step ${i + 1}`);
      const action = step.action || { type: 'none' };
      const types = ['none', 'open', 'copy', 'find', 'click', 'fill', 'fillSaved', 'download', 'generate', 'capture', 'copySaved'];
      if (!types.includes(action.type)) throw new Error(`Unsupported action at step ${i + 1}`);
      if (action.type === 'open' && !/^https:\/\//.test(action.url || '')) throw new Error(`Only HTTPS URLs are allowed at step ${i + 1}`);
      if (['copy', 'fill'].includes(action.type) && typeof (action.text ?? action.value) !== 'string') throw new Error(`Invalid text action at step ${i + 1}`);
      if (action.type === 'download' && (typeof action.filename !== 'string' || typeof action.text !== 'string')) throw new Error(`Invalid download action at step ${i + 1}`);
      if (['generate', 'capture', 'copySaved', 'fillSaved'].includes(action.type) && !KEY_RE.test(action.key || '')) throw new Error(`Invalid local key at step ${i + 1}`);
      if (action.type === 'click' && action.safe !== true) throw new Error(`Auto-click requires safe=true at step ${i + 1}`);
      if (step.humanGate && action.type === 'click' && action.auto === true) throw new Error(`Human-gated step cannot auto-click at step ${i + 1}`);
      if (step.target) validateLocator(step.target, i);
      if (action.target) validateLocator(action.target, i);
      if (action.fallbackTarget) validateLocator(action.fallbackTarget, i);
      if (step.success) validateLocator(step.success, i, true);
      if (action.verify) validateLocator(action.verify, i, true);
      if (step.advanceOn) {
        if (!SAFE_EVENTS.has(step.advanceOn.event || '')) throw new Error(`Invalid advanceOn event at step ${i + 1}`);
        validateLocator(step.advanceOn.target || step.target, i);
      }
    });
    return mod;
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
    setCompactStatus('loading');
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
    } catch (err) {
      rememberError(err, 'manifest');
      canonical = loadJson(CACHE_KEY, []);
    }
    setCompactStatus('ready');
    refreshChrome();
    if (panelOpen) renderCurrent();
  }
  function allModules() {
    const byId = new Map();
    canonical.forEach(m => byId.set(m.id, m));
    custom.forEach(m => byId.set(m.id, { ...m, source: 'custom' }));
    return [...byId.values()].sort((a, b) => a.title.localeCompare(b.title));
  }
  function moduleById(id) { return allModules().find(m => m.id === id) || null; }

  const pageStyle = document.createElement('style');
  pageStyle.textContent = '.ctrl-walkthrough-page-highlight{outline:4px solid #f47a20!important;outline-offset:3px!important;box-shadow:0 0 0 8px rgba(244,122,32,.18)!important}';
  (document.head || document.documentElement).appendChild(pageStyle);

  const host = document.createElement('div');
  host.id = 'ctrl-walkthrough-host-v5';
  document.documentElement.appendChild(host);
  const root = host.attachShadow({ mode: 'closed' });
  root.innerHTML = `
    <style>
      :host{all:initial}*{box-sizing:border-box}
      .cw-launch{position:fixed;z-index:2147483647;top:44%;width:42px;min-height:46px;border:1px solid #334155;background:#07111c;color:#fff;font:800 9.5px/1.05 system-ui;box-shadow:0 6px 20px #0006;display:flex;align-items:center;justify-content:center;text-align:center;padding:5px;white-space:pre-line}
      .cw-launch.right{right:0;border-radius:12px 0 0 12px}.cw-launch.left{left:0;border-radius:0 12px 12px 0}
      .cw-panel{position:fixed;z-index:2147483646;top:50%;transform:translateY(-50%);width:min(330px,calc(100vw - 24px));max-height:72vh;display:none;flex-direction:column;background:#07111c;color:#f8fafc;border:1px solid #334155;border-radius:14px;box-shadow:0 18px 60px #0008;font:12px/1.32 system-ui,-apple-system,sans-serif;overflow:hidden}
      .cw-panel.right{right:8px}.cw-panel.left{left:8px}.cw-panel.open{display:flex}.cw-panel.expanded{max-height:88vh}
      .cw-head{display:flex;align-items:center;gap:4px;padding:5px 6px;border-bottom:1px solid #263648;background:#091522}.cw-brand{flex:1;min-width:0;font:800 11px system-ui;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.cw-meta{color:#8293a5;font-weight:650;font-size:9px}.cw-icon,.cw-route{border:0;border-radius:7px;padding:4px 6px;background:#172433;color:#fff;font:800 9.5px system-ui}.cw-route{background:#263648}.cw-progress{height:2px;background:#1e293b}.cw-progress span{display:block;height:100%;background:#f47a20}.cw-content{overflow:auto;padding:8px}.cw-kicker{font-size:8px;font-weight:800;letter-spacing:.08em;color:#f7a45f;text-transform:uppercase}.cw-title{font-size:13px;font-weight:800;margin:2px 0 3px}.cw-why{font-size:9.5px;color:#a9bac9;margin:0 0 5px}.cw-body{font-size:10.5px;color:#e2e8f0;white-space:pre-wrap;margin:0 0 7px}.cw-next{margin-top:6px;padding:5px 6px;border:1px solid #223348;border-radius:8px;background:#0a1622;color:#8293a5;font-size:9px}.cw-next b{color:#aab7c4}.cw-row{display:flex;gap:5px;flex-wrap:wrap}.cw-btn{border:0;border-radius:8px;padding:6px 8px;font:750 10px system-ui;background:#1f2937;color:#fff}.cw-primary{flex:1;background:#f47a20;color:#111}.cw-muted{background:#162331;color:#b6c3cf}.cw-danger{background:#442020;color:#fecaca}.cw-msg{margin-top:6px;padding:6px;border-radius:8px;background:#132536;color:#d3dfeb;font-size:9.5px}.cw-warn{background:#3b2b0d;color:#fde7ae}.cw-ok{background:#12311f;color:#c6f6d5}.cw-bad{background:#3a1515;color:#fecaca}.cw-step-list{display:flex;flex-direction:column;gap:4px}.cw-step{width:100%;text-align:left;border:1px solid #23364b;border-radius:8px;padding:6px;background:#0b1723;color:#8798a8;font:600 9.5px system-ui}.cw-step.current{border-color:#f47a20;color:#fff;background:#17212b}.cw-step.done{color:#b8c7d4}.cw-step small{display:block;color:#718394;margin-top:2px}.cw-card{padding:7px;border:1px solid #294057;border-radius:9px;background:#0d1b28;margin-top:7px}.cw-file{display:none}select,input[type=url],input[type=password],textarea{width:100%;border:1px solid #475569;border-radius:8px;background:#0b1623;color:#fff;padding:6px 7px;font:600 10px system-ui}textarea{min-height:72px;resize:vertical;font-family:ui-monospace,SFMono-Regular,Consolas,monospace;font-size:9.5px}
      @media(max-width:640px){.cw-panel{width:min(270px,74vw);max-height:68vh;border-radius:11px}.cw-panel.right{right:4px}.cw-panel.left{left:4px}.cw-launch{width:36px;min-height:44px;font-size:8.5px}.cw-head{padding:4px}.cw-brand{font-size:9.5px}.cw-meta{font-size:8px}.cw-icon,.cw-route{font-size:8.5px;padding:4px 5px}.cw-content{padding:6px}.cw-title{font-size:11.5px}.cw-body{font-size:9.5px}.cw-why{font-size:8.7px}.cw-btn{font-size:9px;padding:5px 6px}.cw-next{font-size:8.5px}}
    </style>
    <button class="cw-launch right" aria-label="Open Control Walkthrough">🧭\nCW</button>
    <section class="cw-panel right" role="dialog" aria-label="Control Walkthrough">
      <div class="cw-head"><div class="cw-brand">🧭 Control Walkthrough <span class="cw-meta"></span></div><button class="cw-route" data-act="steps" title="Route">-/-</button><button class="cw-icon" data-act="menu" title="Menu">⋯</button><button class="cw-icon" data-act="min" title="Minimize">−</button></div>
      <div class="cw-progress"><span style="width:0%"></span></div><div class="cw-content"></div><input class="cw-file" type="file" accept="application/json,.json,.walkthrough.json">
    </section>`;

  const launch = root.querySelector('.cw-launch');
  const panel = root.querySelector('.cw-panel');
  const content = root.querySelector('.cw-content');
  const progress = root.querySelector('.cw-progress span');
  const fileInput = root.querySelector('.cw-file');
  const meta = root.querySelector('.cw-meta');
  const routeButton = root.querySelector('.cw-route');

  function el(tag, cls, text) { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }
  function btn(label, cls, fn) { const b = el('button', `cw-btn ${cls || ''}`, label); b.type = 'button'; b.addEventListener('click', fn); return b; }
  function message(text, cls = '') { const d = el('div', `cw-msg ${cls}`, text); content.appendChild(d); return d; }
  function clearContent() { while (content.firstChild) content.removeChild(content.firstChild); }
  function setCompactStatus() { refreshChrome(); }
  function updateViewportMode() { panel.classList.toggle('expanded', Boolean(state.expanded || showAllSteps)); }
  window.addEventListener('resize', updateViewportMode, { passive: true });
  window.visualViewport?.addEventListener('resize', updateViewportMode, { passive: true });

  function setDock(side) {
    const chosen = side === 'left' ? 'left' : 'right';
    panel.classList.toggle('left', chosen === 'left'); panel.classList.toggle('right', chosen === 'right');
    launch.classList.toggle('left', chosen === 'left'); launch.classList.toggle('right', chosen === 'right');
  }
  function dockAwayFrom(node) {
    if (state.dock === 'left' || state.dock === 'right') { setDock(state.dock); return; }
    if (!node?.getBoundingClientRect) { setDock('right'); return; }
    const r = node.getBoundingClientRect();
    setDock((r.left + r.width / 2) > innerWidth / 2 ? 'left' : 'right');
  }
  function setPanelOpen(open) {
    panelOpen = Boolean(open); panel.classList.toggle('open', panelOpen); launch.style.display = panelOpen ? 'none' : 'flex';
    if (panelOpen) renderCurrent();
  }
  function refreshChrome() {
    const mods = allModules();
    const mod = moduleById(state.activeId);
    meta.textContent = `v${VERSION} · ${mods.length}g`;
    if (!mod) { launch.textContent = '🧭\nCW'; routeButton.textContent = '-/-'; return; }
    const i = stepIndex(mod);
    launch.textContent = `🧭\n${i + 1}/${mod.steps.length}`;
    routeButton.textContent = `${i + 1}/${mod.steps.length}`;
  }

  function isVisible(node) {
    if (!node || !node.isConnected) return false;
    const r = node.getBoundingClientRect?.();
    const s = getComputedStyle(node);
    return Boolean(r && r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none');
  }
  function nodeBlob(node) {
    return norm(`${node.innerText || ''} ${node.textContent || ''} ${node.getAttribute?.('aria-label') || ''} ${node.getAttribute?.('title') || ''} ${node.getAttribute?.('placeholder') || ''} ${node.value || ''}`);
  }
  function textScore(blob, wanted) {
    if (!blob || !wanted) return 0;
    if (blob === wanted) return 100;
    if (blob.startsWith(wanted)) return 80;
    if (blob.includes(wanted)) return 55;
    return 0;
  }
  function locateDetailed(spec) {
    if (!spec) return { node: null, reason: 'missing-locator' };
    for (const selector of spec.selectors || []) {
      try {
        const matches = [...document.querySelectorAll(selector)].filter(isVisible);
        if (matches.length === 1) return { node: matches[0], reason: 'selector' };
        if (matches.length > 1 && spec.allowFirst === true) return { node: matches[0], reason: 'selector-first' };
      } catch (_) {}
    }
    const wanted = (spec.text || []).map(norm).filter(Boolean);
    if (!wanted.length) return { node: null, reason: 'not-found' };
    const nodes = [...document.querySelectorAll('button,a,input,select,textarea,label,[role="button"],[role="link"],[role="menuitem"],[role="tab"],[tabindex]')].filter(isVisible);
    const scored = [];
    for (const node of nodes) {
      const blob = nodeBlob(node);
      const score = Math.max(0, ...wanted.map(w => textScore(blob, w)));
      if (score) scored.push({ node, score });
    }
    scored.sort((a, b) => b.score - a.score);
    if (!scored.length) return { node: null, reason: 'not-found' };
    if (scored.length > 1 && scored[0].score === scored[1].score && spec.allowFirst !== true) return { node: null, reason: 'ambiguous' };
    return { node: scored[0].node, reason: 'text' };
  }
  function locate(spec) { return locateDetailed(spec).node; }
  function clearHighlights() { document.querySelectorAll('.ctrl-walkthrough-page-highlight').forEach(n => n.classList.remove('ctrl-walkthrough-page-highlight')); }
  function highlight(node, ms = 8000) {
    clearHighlights(); if (!node) return;
    dockAwayFrom(node); node.classList.add('ctrl-walkthrough-page-highlight');
    node.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    setTimeout(() => node.classList.remove('ctrl-walkthrough-page-highlight'), ms);
  }
  function findAndHighlight(spec) {
    const found = locateDetailed(spec);
    if (!found.node) {
      message(found.reason === 'ambiguous' ? 'I found more than one possible control, so I did not guess.' : "I couldn't find that control on this version of the page.", 'cw-bad');
      return false;
    }
    highlight(found.node); message('Found it and highlighted it.', 'cw-ok'); return true;
  }

  function verifySpec(spec) {
    if (!spec) return false;
    let ok = false;
    if (spec.urlIncludes && String(location.href).includes(spec.urlIncludes)) ok = true;
    if (!ok && spec.urlMatches) { try { ok = new RegExp(spec.urlMatches).test(String(location.href)); } catch (_) {} }
    if (!ok && (spec.selectors || spec.text)) ok = Boolean(locate(spec));
    return ok;
  }
  function successSpec(step, action) { return step.success || action?.verify || null; }
  async function waitForSuccess(spec, timeoutMs = 9000) {
    if (!spec) return true;
    if (verifySpec(spec)) return true;
    return await new Promise(resolve => {
      let done = false;
      const finish = value => { if (done) return; done = true; observer.disconnect(); clearInterval(timer); clearTimeout(timeout); resolve(value); };
      const check = () => { if (verifySpec(spec)) finish(true); };
      const observer = new MutationObserver(check);
      try { observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true }); } catch (_) {}
      const timer = setInterval(check, 250);
      const timeout = setTimeout(() => finish(false), Math.max(1000, Math.min(30000, Number(timeoutMs || 9000))));
    });
  }
  async function waitForTarget(spec, timeoutMs = 7000) {
    const immediate = locateDetailed(spec); if (immediate.node) return immediate;
    return await new Promise(resolve => {
      let done = false;
      const finish = value => { if (done) return; done = true; observer.disconnect(); clearTimeout(timeout); resolve(value); };
      const check = () => { const x = locateDetailed(spec); if (x.node) finish(x); };
      const observer = new MutationObserver(check);
      try { observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true }); } catch (_) {}
      const timeout = setTimeout(() => finish(locateDetailed(spec)), Math.max(500, Math.min(30000, Number(timeoutMs || 7000))));
    });
  }

  function setPending(mod, index, kind) { state.pending = { id: mod.id, index, kind, startedAt: Date.now() }; state.autoOpenOnce = true; saveState(); }
  function clearPending() { state.pending = null; saveState(); }
  async function verifyThenAdvance(mod, step, action, index, successText = 'Verified. Continuing.') {
    const spec = successSpec(step, action);
    if (!spec) { clearPending(); moveStep(mod, 1, true); return true; }
    const ok = await waitForSuccess(spec, action?.verifyTimeoutMs || step.verifyTimeoutMs || 10000);
    if (!ok) {
      message(spec.failureMessage || "I did the safe action, but I can't verify the expected result yet. I stopped here instead of guessing.", 'cw-warn');
      return false;
    }
    clearPending(); message(spec.successMessage || successText, 'cw-ok'); await sleep(180); moveStep(mod, 1, true); return true;
  }

  function clickLooksSafe(node, action) {
    if (!node || action.safe !== true) return false;
    if (node.disabled || node.getAttribute?.('aria-disabled') === 'true') return false;
    const tag = node.tagName?.toLowerCase();
    const type = String(node.getAttribute?.('type') || '').toLowerCase();
    if (tag === 'input' && ['submit', 'reset', 'button'].includes(type) && DANGEROUS_CLICK_RE.test(nodeBlob(node))) return false;
    if (tag === 'button' && (!type || type === 'submit') && node.closest?.('form')) return false;
    if (DANGEROUS_CLICK_RE.test(nodeBlob(node)) && action.allowConsequential !== true) return false;
    return true;
  }
  function setNativeValue(node, value) {
    const proto = node instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : node instanceof HTMLSelectElement ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
    const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set;
    if (setter) setter.call(node, value); else node.value = value;
    node.dispatchEvent(new Event('input', { bubbles: true }));
    node.dispatchEvent(new Event('change', { bubbles: true }));
  }
  async function safeFill(mod, step, action, index, value) {
    const spec = action.target || step.target;
    const found = await waitForTarget(spec, action.waitForTargetMs || 7000);
    if (!found.node) { message("I couldn't find the field, so I did not type anywhere else.", 'cw-bad'); if (action.fallbackTarget) findAndHighlight(action.fallbackTarget); return; }
    const node = found.node;
    const tag = node.tagName?.toLowerCase();
    if (!['input', 'textarea', 'select'].includes(tag) || node.disabled || node.readOnly) { message('I found the target, but it is not a safe editable field.', 'cw-bad'); return; }
    highlight(node, 3000); setNativeValue(node, value);
    if (String(node.value) !== String(value)) { message("I tried to fill it, but the page didn't keep the value. Please enter it manually.", 'cw-bad'); return; }
    message(action.secret ? 'Filled from temporary local memory.' : 'Filled it in.', 'cw-ok');
    if (action.autoAdvance !== false) moveStep(mod, 1, true);
  }
  async function safeAutoClick(mod, step, action, index) {
    const spec = action.target || step.target;
    const found = await waitForTarget(spec, action.waitForTargetMs || 7000);
    if (!found.node) {
      message(found.reason === 'ambiguous' ? 'I found multiple possible buttons, so I stopped.' : "I couldn't find that button. I did not guess or click anything else.", 'cw-bad');
      if (action.fallbackTarget) findAndHighlight(action.fallbackTarget); return;
    }
    const node = found.node;
    if (!clickLooksSafe(node, action)) { highlight(node); message('I found it, but this control may have a consequential effect. You press it; I can verify what happens next.', 'cw-warn'); return; }
    highlight(node, 3000); setPending(mod, index, 'click');
    try { node.click(); } catch (err) { clearPending(); rememberError(err, 'auto-click'); message("I found it but couldn't click it. Please tap the highlighted control.", 'cw-bad'); return; }
    await verifyThenAdvance(mod, step, action, index);
  }
  async function openUrlAction(mod, step, action, index) {
    try {
      const u = new URL(action.url); if (u.protocol !== 'https:') throw new Error('Only HTTPS URLs are allowed');
      const spec = successSpec(step, action);
      if (spec && verifySpec(spec)) { moveStep(mod, 1, true); return; }
      if (spec) setPending(mod, index, 'open');
      else if (action.autoAdvance) moveStep(mod, 1, true);
      else state.autoOpenOnce = true;
      saveState(); location.assign(u.href);
    } catch (err) { rememberError(err, 'open'); message(err.message, 'cw-bad'); }
  }

  function privateBucket(id) { if (!privateValues[id]) privateValues[id] = {}; return privateValues[id]; }
  function setPrivate(id, key, value) { privateBucket(id)[key] = value; savePrivate(); }
  function getPrivate(id, key) { return privateValues[id]?.[key] || ''; }
  function clearPrivateForWalkthrough(id) { if (privateValues[id]) { delete privateValues[id]; savePrivate(); } }
  function generatePrivate(id, key, bytes) {
    const arr = new Uint8Array(Math.max(16, Math.min(64, bytes || 32))); crypto.getRandomValues(arr);
    const value = btoa(String.fromCharCode(...arr)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
    setPrivate(id, key, value); GM_setClipboard(value); return value;
  }
  function downloadText(filename, text) {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' }); const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = filename; a.style.display = 'none'; document.documentElement.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function cleanPortableModule(mod) { const out = cloneValue(mod); delete out.source; delete out._remoteUrl; delete out._githubPointer; delete out._temporary; return out; }
  function upsertCustom(mod, metaInfo = {}) { custom = custom.filter(x => x.id !== mod.id); custom.push({ ...cleanPortableModule(mod), source: 'custom', ...metaInfo }); saveCustom(); state.selectedId = mod.id; saveState(); }
  function normalizePastedCode(raw) { let s = String(raw || '').trim().normalize('NFKC'); s = s.replace(/^```[a-zA-Z0-9_-]*\s*/i, '').replace(/```\s*$/i, '').trim(); const marker = s.match(/CWZ2:|CW2:|CWG1:/i); if (marker && marker.index > 0) s = s.slice(marker.index); return s; }
  function cleanB64urlPayload(text) { const clean = String(text || '').normalize('NFKC').replace(/[\s`'"\u200B-\u200D\uFEFF\u00AD]/g, ''); if (!/^[A-Za-z0-9_-]+$/.test(clean)) throw new Error('The pasted code contains a damaged character. Copy it again, or use Import file.'); return clean; }
  function decodeBase64UrlBytes(text) { const clean = cleanB64urlPayload(text).replace(/-/g, '+').replace(/_/g, '/'); const padded = clean + '='.repeat((4 - (clean.length % 4)) % 4); const binary = atob(padded); return Uint8Array.from(binary, c => c.charCodeAt(0)); }
  function decodeCW2(payload) { return JSON.parse(new TextDecoder().decode(decodeBase64UrlBytes(payload))); }
  async function decodeCWZ2(payload) { if (typeof DecompressionStream !== 'function') throw new Error('This browser cannot decode CWZ2. Use Import file instead.'); const bytes = decodeBase64UrlBytes(payload); const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip')); const text = await new Response(stream).text(); if (text.length > MAX_BYTES) throw new Error('Walkthrough code is too large'); return JSON.parse(text); }
  function validateGitHubPointer(pointer) { const { owner, repo, ref, path } = pointer || {}; if (!GH_PART_RE.test(owner || '') || !GH_PART_RE.test(repo || '') || !GH_REF_RE.test(ref || '')) throw new Error('Invalid GitHub walkthrough pointer'); const cleanPath = String(path || '').replace(/\\/g, '/').replace(/^\/+/, ''); if (!cleanPath || cleanPath.length > 500 || cleanPath.includes('..') || cleanPath.includes('//')) throw new Error('Invalid GitHub walkthrough path'); return { owner, repo, ref, path: cleanPath }; }
  function parseGitHubPointer(text) { const s = String(text || '').trim(); if (s.startsWith('CWG1:')) { const body = s.slice(5); const colon = body.indexOf(':'); const at = body.indexOf('@'); if (at <= 0 || colon <= at + 1) throw new Error('Invalid CWG1 code'); const [owner, repo] = body.slice(0, at).split('/'); return validateGitHubPointer({ owner, repo, ref: body.slice(at + 1, colon), path: body.slice(colon + 1).replace(/^\/+/, '') }); } try { const u = new URL(s); if (u.hostname !== 'github.com') return null; const parts = u.pathname.split('/').filter(Boolean); if (parts.length < 5 || parts[2] !== 'blob') return null; return validateGitHubPointer({ owner: parts[0], repo: parts[1], ref: parts[3], path: parts.slice(4).join('/') }); } catch (_) { return null; } }
  function githubBlobUrl(pointer) { const p = validateGitHubPointer(pointer); const path = p.path.split('/').map(encodeURIComponent).join('/'); return `https://github.com/${encodeURIComponent(p.owner)}/${encodeURIComponent(p.repo)}/blob/${encodeURIComponent(p.ref)}/${path}#ctrl-walkthrough-import`; }
  function pointerFromCurrentGitHubPage() { if (location.hostname !== 'github.com') return null; return parseGitHubPointer(location.href); }
  async function fetchPrivateGitHubWalkthrough(pointer) { const p = validateGitHubPointer(pointer); if (location.hostname !== 'github.com') throw new Error('Open the GitHub page first'); if (!location.pathname.startsWith(`/${p.owner}/${p.repo}/`)) throw new Error('Open the matching GitHub repository first'); const path = p.path.split('/').map(encodeURIComponent).join('/'); const rawUrl = `https://github.com/${encodeURIComponent(p.owner)}/${encodeURIComponent(p.repo)}/raw/${encodeURIComponent(p.ref)}/${path}`; const res = await fetch(rawUrl, { credentials: 'include', cache: 'no-store', redirect: 'follow' }); if (!res.ok) throw new Error(`GitHub returned HTTP ${res.status}`); const text = await res.text(); if (!text || text.length > MAX_BYTES || /^\s*</.test(text)) throw new Error('Private GitHub import is not available in this browser. Use CWZ2 or Import file.'); return validateModule(JSON.parse(text)); }
  async function attemptGitHubImport(pointer) { try { const mod = await fetchPrivateGitHubWalkthrough(pointer); upsertCustom(mod, { _temporary: true, _githubPointer: pointer }); GM_deleteValue(PENDING_GITHUB_KEY); state.activeId = mod.id; state.step[mod.id] = 0; saveState(); setPanelOpen(true); message(`Loaded ${mod.title}.`, 'cw-ok'); return true; } catch (err) { rememberError(err, 'github-private-import'); setPanelOpen(true); renderAdd(); message('Private GitHub import failed in this browser. Use CWZ2 or Import file instead.', 'cw-warn'); return false; } }
  function beginGitHubImport(pointer) { const p = validateGitHubPointer(pointer); GM_setValue(PENDING_GITHUB_KEY, JSON.stringify(p)); location.assign(githubBlobUrl(p)); }
  async function importText(raw) { const text = normalizePastedCode(raw); if (!text) throw new Error('Paste a walkthrough code, JSON, GitHub link, or HTTPS URL'); if (text.startsWith('CWZ2:')) { const mod = validateModule(await decodeCWZ2(text.slice(5))); upsertCustom(mod, { _temporary: true }); return { mod, mode: 'temporary handoff' }; } if (text.startsWith('CW2:')) { const mod = validateModule(decodeCW2(text.slice(4))); upsertCustom(mod, { _temporary: true }); return { mod, mode: 'temporary handoff' }; } if (text.startsWith('{')) { const mod = validateModule(JSON.parse(text)); upsertCustom(mod, { _temporary: true }); return { mod, mode: 'temporary JSON' }; } const gh = parseGitHubPointer(text); if (gh) { beginGitHubImport(gh); return { mod: null, mode: 'GitHub pointer' }; } if (/^https:\/\//.test(text)) { const mod = validateModule(await fetchJson(text)); upsertCustom(mod, { _remoteUrl: text }); return { mod, mode: 'remote URL' }; } throw new Error('Unknown handoff. Use CWZ2, CW2, JSON, Import file, or a public HTTPS walkthrough URL.'); }

  function renderCurrent() { const active = moduleById(state.activeId); if (showAllSteps && active) renderAllSteps(active); else if (active) renderStep(active); else renderHome(); }
  function renderHome() {
    cleanupAdvanceListener(); clearContent(); progress.style.width = '0%'; refreshChrome();
    const mods = allModules(); content.appendChild(el('div', 'cw-kicker', 'Guides')); content.appendChild(el('div', 'cw-title', 'What are we doing?')); content.appendChild(el('div', 'cw-body', 'Pick one guide. Control Walkthrough will automate safe navigation and stop only when you need to decide or enter something.'));
    const select = el('select'); const p = el('option', '', mods.length ? 'Select walkthrough...' : 'No walkthroughs loaded'); p.value = ''; select.appendChild(p);
    mods.forEach(m => { const o = el('option', '', `${m.title}${m.source === 'custom' ? ' - custom' : ''}`); o.value = m.id; select.appendChild(o); });
    select.value = state.selectedId && moduleById(state.selectedId) ? state.selectedId : '';
    select.addEventListener('change', () => { state.selectedId = select.value; saveState(); renderHome(); }); content.appendChild(select);
    const selected = moduleById(state.selectedId);
    if (selected) { const card = el('div', 'cw-card'); card.appendChild(el('div', 'cw-body', selected.description || '')); card.appendChild(btn('Start', 'cw-primary', () => startWalkthrough(selected))); content.appendChild(card); }
    const row = el('div', 'cw-row'); row.style.marginTop = '7px'; row.appendChild(btn('Import guide', 'cw-muted', renderAdd)); content.appendChild(row);
  }
  function startWalkthrough(mod) { state.activeId = mod.id; state.selectedId = mod.id; state.step[mod.id] = 0; state.completed[mod.id] = false; state.pending = null; saveState(); showAllSteps = false; refreshChrome(); renderStep(mod); }
  function cleanupAdvanceListener() { if (currentAdvanceCleanup) { currentAdvanceCleanup(); currentAdvanceCleanup = null; } }
  function armAdvanceOn(mod, step, index) {
    cleanupAdvanceListener(); if (!step.advanceOn) return;
    const eventName = step.advanceOn.event; const spec = step.advanceOn.target || step.target;
    const handler = async e => {
      const target = locate(spec); if (!target) return;
      if (!(e.target === target || target.contains?.(e.target))) return;
      setPending(mod, index, `event:${eventName}`);
      await verifyThenAdvance(mod, step, step.action || {}, index, 'Verified your action. Continuing.');
    };
    document.addEventListener(eventName, handler, true); currentAdvanceCleanup = () => document.removeEventListener(eventName, handler, true);
  }
  function renderStep(mod) {
    cleanupAdvanceListener(); clearContent(); showAllSteps = false; updateViewportMode();
    const i = stepIndex(mod); state.step[mod.id] = i; saveState(); refreshChrome();
    const step = mod.steps[i]; progress.style.width = `${((i + 1) / mod.steps.length) * 100}%`;
    content.appendChild(el('div', 'cw-kicker', `Now · step ${i + 1} of ${mod.steps.length}`)); content.appendChild(el('div', 'cw-title', step.title));
    if (step.why) content.appendChild(el('div', 'cw-why', `Why: ${step.why}`)); content.appendChild(el('div', 'cw-body', step.body));
    if (step.humanGate) message(step.humanGate, 'cw-warn'); renderPrimaryAction(mod, step, i); armAdvanceOn(mod, step, i);
    const next = mod.steps[i + 1]; if (next) { const n = el('div', 'cw-next'); n.appendChild(el('b', '', 'Next: ')); n.appendChild(document.createTextNode(next.title)); content.appendChild(n); }
    setTimeout(() => maybeAutoRun(mod, step, i), 120);
  }
  function renderPrimaryAction(mod, step, i) {
    const action = step.action || { type: 'none' }; const row = el('div', 'cw-row'); const add = (label, fn) => row.appendChild(btn(label, 'cw-primary', fn));
    if (action.type === 'open') add(action.label || 'Open this page', () => openUrlAction(mod, step, action, i));
    else if (action.type === 'copy') add(action.label || 'Copy', () => { GM_setClipboard(action.text ?? action.value); message('Copied.', 'cw-ok'); if (action.autoAdvance) setTimeout(() => moveStep(mod, 1, true), 180); });
    else if (action.type === 'find') add(action.label || 'Show me where', () => findAndHighlight(step.target || action.target));
    else if (action.type === 'click') add(action.label || 'Click it for me', () => safeAutoClick(mod, step, action, i));
    else if (action.type === 'fill') add(action.label || 'Fill it for me', () => safeFill(mod, step, action, i, action.text ?? action.value));
    else if (action.type === 'fillSaved') add(action.label || 'Fill saved value', () => { const v = getPrivate(mod.id, action.key); if (!v) message('That value is not saved yet.', 'cw-bad'); else safeFill(mod, step, { ...action, secret: true }, i, v); });
    else if (action.type === 'download') add(action.label || `Download ${action.filename}`, () => { downloadText(action.filename, action.text); message('Downloaded.', 'cw-ok'); if (action.autoAdvance) setTimeout(() => moveStep(mod, 1, true), 180); });
    else if (action.type === 'generate') add(action.label || 'Generate & copy', () => { generatePrivate(mod.id, action.key, Number(action.bytes || 32)); message('Generated locally and copied.', 'cw-ok'); if (action.autoAdvance) setTimeout(() => moveStep(mod, 1, true), 180); });
    else if (action.type === 'copySaved') add(action.label || 'Copy saved value', () => { const v = getPrivate(mod.id, action.key); if (!v) message('That value is not saved yet.', 'cw-bad'); else { GM_setClipboard(v); message('Copied from temporary local memory.', 'cw-ok'); if (action.autoAdvance) setTimeout(() => moveStep(mod, 1, true), 180); } });
    else if (action.type === 'capture') { const input = el('input'); input.type = 'password'; input.placeholder = action.placeholder || 'Paste value here'; content.appendChild(input); add(action.label || 'Save locally & continue', () => { const v = input.value.trim(); if (!v) { message('Nothing was entered.', 'cw-bad'); return; } setPrivate(mod.id, action.key, v); input.value = ''; message('Saved only in temporary local memory.', 'cw-ok'); moveStep(mod, 1, true); }); }
    else if (step.success) add(step.manualLabel || 'Verify & continue', async () => { if (await waitForSuccess(step.success, step.verifyTimeoutMs || 5000)) moveStep(mod, 1, true); else message(step.success.failureMessage || "I can't verify it yet.", 'cw-warn'); });
    else add(step.manualLabel || (step.humanGate ? "I've done this" : (i === mod.steps.length - 1 ? 'Finish' : 'Next')), () => moveStep(mod, 1, true));
    content.appendChild(row);
  }
  async function maybeAutoRun(mod, step, index) {
    if (state.activeId !== mod.id || stepIndex(mod) !== index || step.humanGate) return;
    const action = step.action || { type: 'none' };
    const key = `${mod.id}:${index}:${location.href}`;
    if (autoAttempts.has(key)) return;
    const spec = successSpec(step, action);
    if ((step.autoVerify === true || action.auto === true) && spec && verifySpec(spec)) { autoAttempts.add(key); moveStep(mod, 1, true); return; }
    if (action.auto !== true) return;
    autoAttempts.add(key);
    if (action.type === 'open') await openUrlAction(mod, step, action, index);
    else if (action.type === 'click') await safeAutoClick(mod, step, action, index);
    else if (action.type === 'fill') await safeFill(mod, step, action, index, action.text ?? action.value);
    else if (action.type === 'fillSaved') { const v = getPrivate(mod.id, action.key); if (v) await safeFill(mod, step, { ...action, secret: true }, index, v); }
    else if (action.type === 'copy') { GM_setClipboard(action.text ?? action.value); if (action.autoAdvance !== false) moveStep(mod, 1, true); }
    else if (action.type === 'generate') { generatePrivate(mod.id, action.key, Number(action.bytes || 32)); if (action.autoAdvance !== false) moveStep(mod, 1, true); }
    else if (action.type === 'copySaved') { const v = getPrivate(mod.id, action.key); if (v) { GM_setClipboard(v); if (action.autoAdvance !== false) moveStep(mod, 1, true); } }
  }
  function moveStep(mod, delta, preserveOpen = false) {
    cleanupAdvanceListener();
    let i = stepIndex(mod) + delta;
    if (i >= mod.steps.length) {
      state.completed[mod.id] = true; state.activeId = ''; state.pending = null; clearPrivateForWalkthrough(mod.id);
      if (mod._temporary) { custom = custom.filter(x => x.id !== mod.id); saveCustom(); if (state.selectedId === mod.id) state.selectedId = ''; }
      saveState(); refreshChrome(); clearContent(); progress.style.width = '100%'; content.appendChild(el('div', 'cw-title', 'Done')); content.appendChild(el('div', 'cw-body', 'This walkthrough is complete. Temporary private values were cleared.')); content.appendChild(btn('Choose another', 'cw-primary', renderHome)); return;
    }
    i = Math.max(0, i); state.step[mod.id] = i; if (preserveOpen) state.autoOpenOnce = true; saveState(); refreshChrome(); renderStep(mod);
  }
  function renderAllSteps(mod) {
    cleanupAdvanceListener(); clearContent(); showAllSteps = true; updateViewportMode();
    const current = stepIndex(mod); content.appendChild(el('div', 'cw-kicker', 'Route')); content.appendChild(el('div', 'cw-title', mod.title));
    const list = el('div', 'cw-step-list');
    mod.steps.forEach((step, idx) => { const cls = idx === current ? 'current' : idx < current ? 'done' : ''; const b = el('button', `cw-step ${cls}`, `${idx < current ? '✓ ' : ''}${idx + 1}. ${step.title}`); b.type = 'button'; if (step.why) b.appendChild(el('small', '', step.why)); b.addEventListener('click', () => { state.step[mod.id] = idx; state.pending = null; saveState(); showAllSteps = false; renderStep(mod); }); list.appendChild(b); }); content.appendChild(list);
    const row = el('div', 'cw-row'); row.style.marginTop = '7px'; row.appendChild(btn('Back to current', 'cw-primary', () => { showAllSteps = false; renderStep(mod); })); content.appendChild(row);
  }
  function renderMenu() {
    cleanupAdvanceListener(); clearContent(); progress.style.width = '0%'; content.appendChild(el('div', 'cw-kicker', 'Menu')); content.appendChild(el('div', 'cw-title', 'Control Walkthrough'));
    const mod = moduleById(state.activeId); const row = el('div', 'cw-row'); row.appendChild(btn('Import guide', 'cw-muted', renderAdd)); row.appendChild(btn(state.expanded ? 'Compact' : 'Expand', 'cw-muted', () => { state.expanded = !state.expanded; saveState(); updateViewportMode(); renderMenu(); })); content.appendChild(row);
    const dock = el('div', 'cw-row'); dock.style.marginTop = '6px'; dock.appendChild(btn('Auto side', 'cw-muted', () => { state.dock = 'auto'; saveState(); setDock('right'); })); dock.appendChild(btn('Left', 'cw-muted', () => { state.dock = 'left'; saveState(); setDock('left'); })); dock.appendChild(btn('Right', 'cw-muted', () => { state.dock = 'right'; saveState(); setDock('right'); })); content.appendChild(dock);
    if (mod) { const end = el('div', 'cw-row'); end.style.marginTop = '6px'; end.appendChild(btn('Back to step', 'cw-primary', () => renderStep(mod))); end.appendChild(btn('End guide', 'cw-danger', () => endWalkthrough(mod))); content.appendChild(end); }
  }
  function endWalkthrough(mod) { cleanupAdvanceListener(); state.activeId = ''; state.pending = null; clearPrivateForWalkthrough(mod.id); saveState(); refreshChrome(); showAllSteps = false; renderHome(); }
  function renderAdd() {
    cleanupAdvanceListener(); clearContent(); progress.style.width = '0%'; content.appendChild(el('div', 'cw-kicker', 'Import')); content.appendChild(el('div', 'cw-title', 'Add a guide')); content.appendChild(el('div', 'cw-body', 'Paste CWZ2/CW2/JSON/URL, or import a walkthrough file.'));
    const input = el('textarea'); input.placeholder = 'Paste walkthrough code / JSON / URL'; input.autocapitalize = 'off'; input.autocomplete = 'off'; input.spellcheck = false; content.appendChild(input);
    const row = el('div', 'cw-row'); row.appendChild(btn('Load', 'cw-primary', async () => { try { const result = await importText(input.value); if (result.mod) { state.activeId = result.mod.id; state.step[result.mod.id] = 0; state.pending = null; saveState(); renderStep(result.mod); message(`Loaded ${result.mod.title}.`, 'cw-ok'); } } catch (err) { rememberError(err, 'paste-import'); message(err.message, 'cw-bad'); } })); row.appendChild(btn('Import file', 'cw-muted', () => fileInput.click())); content.appendChild(row);
  }
  fileInput.addEventListener('change', async () => { const file = fileInput.files?.[0]; fileInput.value = ''; if (!file) return; try { if (file.size > MAX_BYTES) throw new Error('Walkthrough file is too large'); const mod = validateModule(JSON.parse(await file.text())); upsertCustom(mod); state.activeId = mod.id; state.step[mod.id] = 0; state.pending = null; saveState(); renderStep(mod); message(`Loaded ${mod.title}.`, 'cw-ok'); } catch (err) { rememberError(err, 'custom-file'); renderAdd(); message(err.message, 'cw-bad'); } });

  async function resumePendingAndAutomation() {
    const mod = moduleById(state.activeId); if (!mod) return;
    const i = stepIndex(mod); const step = mod.steps[i]; const action = step.action || {};
    if (state.pending && state.pending.id === mod.id && state.pending.index === i) {
      const spec = successSpec(step, action);
      if (spec) {
        const ok = await waitForSuccess(spec, action.verifyTimeoutMs || step.verifyTimeoutMs || 10000);
        if (ok) { clearPending(); moveStep(mod, 1, true); return; }
        if (panelOpen) message(spec.failureMessage || "I reached the new page, but I can't verify the expected result yet. I stopped here instead of repeating the action.", 'cw-warn');
        return;
      }
      clearPending();
    }
    if ((step.autoVerify === true || action.auto === true) && successSpec(step, action) && verifySpec(successSpec(step, action))) { moveStep(mod, 1, true); return; }
    if (action.auto === true && !step.humanGate) maybeAutoRun(mod, step, i);
  }

  root.addEventListener('click', e => {
    const act = e.target?.dataset?.act; if (!act) return; const mod = moduleById(state.activeId);
    if (act === 'min') setPanelOpen(false);
    if (act === 'steps') { if (mod) { showAllSteps = !showAllSteps; renderCurrent(); } else renderHome(); }
    if (act === 'menu') renderMenu();
  });
  launch.addEventListener('click', () => setPanelOpen(true));
  GM_registerMenuCommand('Open Control Walkthrough', () => setPanelOpen(true));
  GM_registerMenuCommand('Add / import walkthrough', () => { setPanelOpen(true); renderAdd(); });
  GM_registerMenuCommand('Reload walkthroughs', () => loadCanonical().then(resumePendingAndAutomation));
  GM_registerMenuCommand('Copy redacted Control Walkthrough error', () => GM_setClipboard(JSON.stringify(lastError || { version: VERSION, message: 'No error recorded', url: `${location.origin}${location.pathname}` }, null, 2)));

  async function bootstrapPrivateImport() {
    let pointer = null;
    try { const raw = GM_getValue(PENDING_GITHUB_KEY, ''); if (raw) pointer = validateGitHubPointer(JSON.parse(raw)); } catch (_) { GM_deleteValue(PENDING_GITHUB_KEY); }
    if (!pointer && location.hash === '#ctrl-walkthrough-import') { try { pointer = pointerFromCurrentGitHubPage(); } catch (_) {} }
    if (pointer && location.hostname === 'github.com' && location.pathname.startsWith(`/${pointer.owner}/${pointer.repo}/`)) await attemptGitHubImport(pointer);
  }

  purgeExpired(); setDock(state.dock === 'left' ? 'left' : 'right'); refreshChrome(); updateViewportMode();
  if (state.autoOpenOnce && state.activeId) { state.autoOpenOnce = false; saveState(); panelOpen = true; panel.classList.add('open'); launch.style.display = 'none'; }
  bootstrapPrivateImport().finally(async () => { await loadCanonical(); renderCurrent(); await resumePendingAndAutomation(); });
})();
