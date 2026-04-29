/* ========================================================================
   Velocity CMS — Admin Application
   ======================================================================== */

const API = {
  async get(url) {
    const r = await fetch(url);
    if (r.status === 401) { window.location.href = '/admin/login.html'; return null; }
    return r.json();
  },
  async post(url, body) {
    const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (r.status === 401) { window.location.href = '/admin/login.html'; return null; }
    const data = await r.json().catch(() => ({}));
    if (!r.ok) {
      return { ok: false, error: data.error || data.detail || `${r.status} ${r.statusText}`, ...data };
    }
    return data;
  },
  async put(url, body) {
    const r = await fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (r.status === 401) { window.location.href = '/admin/login.html'; return null; }
    return r.json();
  },
  async del(url) {
    const r = await fetch(url, { method: 'DELETE' });
    if (r.status === 401) { window.location.href = '/admin/login.html'; return null; }
    return r.json();
  },
  async upload(file) {
    const fd = new FormData();
    fd.append('file', file);
    const r = await fetch('/api/upload', { method: 'POST', body: fd });
    if (r.status === 401) { window.location.href = '/admin/login.html'; return null; }
    return r.json();
  }
};

// ---------------------------------------------------------------------------
// Toast notifications
// ---------------------------------------------------------------------------
function toast(message, type = 'success') {
  const container = document.getElementById('toasts');
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.textContent = message;
  container.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; setTimeout(() => el.remove(), 300); }, 3000);
}

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------
let currentView = null;
let pages = [];
let locations = [];
/** @type {null | { deployEnv: string, savePublishesLocally: boolean, showPublishToProduction: boolean, publicContentEnvDefault: string }} */
let cmsConfig = null;

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------
function setupPublishToProductionButton() {
  if (!cmsConfig || !cmsConfig.showPublishToProduction) return;
  const slot = document.getElementById('globalTopbarSlot');
  if (!slot || slot.querySelector('[data-global-publish]')) return;
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.dataset.globalPublish = '1';
  btn.className = 'btn btn-primary btn-sm';
  btn.textContent = 'Publish to Production';
  btn.title = 'Push staging content to the live site (all pages + globals)';
  btn.addEventListener('click', async () => {
    if (!confirm('Push ALL staging content (pages, pricing, banners, forms, locations) to production?')) return;
    const r = await API.post('/api/sync/to-production', { pages: 'all' });
    if (r && r.ok) toast('Synced to production');
    else toast((r && r.error) || 'Sync failed', 'error');
  });
  slot.appendChild(btn);
}

async function init() {
  const me = await API.get('/api/me');
  if (!me) return;
  cmsConfig = await API.get('/api/config') || {};
  document.getElementById('currentUser').textContent = me.username;

  const sub = document.querySelector('.sidebar-brand span');
  if (sub && cmsConfig.deployEnv && cmsConfig.deployEnv !== 'development') {
    sub.textContent = `Content Management · ${cmsConfig.deployEnv}`;
  }

  setupPublishToProductionButton();

  document.getElementById('logoutBtn').addEventListener('click', async () => {
    await API.post('/api/logout');
    window.location.href = '/admin/login.html';
  });

  pages = await API.get('/api/pages') || [];
  locations = await API.get('/api/locations') || [];

  buildSidebar();

  // Load first page if available
  if (pages.length > 0) {
    navigateTo('page', pages[0].id);
  }
}

function buildSidebar() {
  const nav = document.getElementById('sidebarNav');
  const contentSection = nav.querySelector('.sidebar-section');

  // Remove any existing page links
  nav.querySelectorAll('.sidebar-link[data-page]').forEach(el => el.remove());

  // Insert page links after the "Content" section header
  let insertAfter = contentSection;
  pages.forEach(page => {
    const a = document.createElement('a');
    a.className = 'sidebar-link';
    a.dataset.page = page.id;
    a.innerHTML = `<span class="icon">&#9633;</span> ${page.label || page.id} <span class="badge status-badge" id="status-${page.id}" style="display:none"></span>`;
    a.addEventListener('click', () => navigateTo('page', page.id));
    insertAfter.after(a);
    insertAfter = a;

    // Check publish status
    API.get(`/api/status/${page.id}`).then(status => {
      if (status && status.hasUnpublished) {
        const badge = document.getElementById(`status-${page.id}`);
        if (badge) {
          badge.textContent = 'Draft';
          badge.className = 'badge status-badge status-draft';
          badge.style.display = '';
        }
      }
    });
  });

  // Tool links
  nav.querySelectorAll('.sidebar-link[data-view]').forEach(link => {
    link.addEventListener('click', () => navigateTo(link.dataset.view));
  });
}

function navigateTo(view, pageId) {
  // Update active sidebar link
  document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));

  if (view === 'page' && pageId) {
    const link = document.querySelector(`.sidebar-link[data-page="${pageId}"]`);
    if (link) link.classList.add('active');
    currentView = { type: 'page', pageId };
    loadPageEditor(pageId);
  } else {
    const link = document.querySelector(`.sidebar-link[data-view="${view}"]`);
    if (link) link.classList.add('active');
    currentView = { type: view };
    switch (view) {
      case 'pricing': loadPricingEditor(); break;
      case 'banners': loadBannerEditor(); break;
      case 'forms': loadFormsManager(); break;
      case 'media': loadMediaLibrary(); break;
      case 'locations': loadLocationManager(); break;
    }
  }
}

// =========================================================================
// PAGE CONTENT EDITOR
// =========================================================================
async function loadPageEditor(pageId) {
  const schema = await API.get(`/api/schemas/${pageId}`);
  // Use raw=true to get unprocessed content (preserves price refs, schedule metadata)
  const staging = await API.get(`/api/content/${pageId}?env=staging&raw=true`);
  const status = await API.get(`/api/status/${pageId}`);
  if (!schema) return;

  const content = staging || {};
  const title = schema.label || pageId;

  document.getElementById('viewTitle').textContent = title;

  // Top bar actions
  const actions = document.getElementById('topbarActions');
  actions.innerHTML = '';

  if (status && status.hasBackup) {
    const revertBtn = document.createElement('button');
    revertBtn.className = 'btn btn-danger btn-sm';
    revertBtn.textContent = 'Undo Last Save';
    revertBtn.addEventListener('click', async () => {
      if (confirm('Revert to the version before your last save? This will undo your most recent changes.')) {
        await API.post(`/api/revert/${pageId}`);
        toast('Reverted to previous version');
        buildSidebar();
        loadPageEditor(pageId);
      }
    });
    actions.appendChild(revertBtn);
  }

  const previewBtn = document.createElement('a');
  previewBtn.className = 'btn btn-secondary btn-sm';
  previewBtn.textContent = 'Preview';
  const prevQs = cmsConfig && cmsConfig.publicContentEnvDefault === 'staging' ? '?env=staging' : '';
  previewBtn.href = `/${pageId}${prevQs}`;
  previewBtn.target = '_blank';
  actions.appendChild(previewBtn);

  const saveBtn = document.createElement('button');
  saveBtn.className = 'btn btn-primary btn-sm';
  saveBtn.textContent = 'Save';
  saveBtn.id = 'saveBtn';
  actions.appendChild(saveBtn);

  const saveDraftBtn = document.createElement('button');
  saveDraftBtn.className = 'btn btn-secondary btn-sm';
  saveDraftBtn.textContent = 'Save as Draft';
  saveDraftBtn.addEventListener('click', async () => {
    collectFormData(pageId, schema, content);
    await API.put(`/api/content/${pageId}`, content);
    toast('Draft saved (not published yet)');
    buildSidebar();
  });
  actions.appendChild(saveDraftBtn);

  // Build the editor
  const area = document.getElementById('contentArea');
  area.innerHTML = '';

  // Content sections
  const sections = schema.sections || {};
  for (const [sectionKey, section] of Object.entries(sections)) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<div class="card-header"><h3>${section.label || sectionKey}</h3></div>`;
    const body = document.createElement('div');

    const sectionData = content[sectionKey] || {};
    renderFields(body, section.fields || {}, sectionData, `${sectionKey}`);

    card.appendChild(body);
    area.appendChild(card);
  }

  // SEO section
  if (schema.seo) {
    const seoCard = document.createElement('div');
    seoCard.className = 'card';
    seoCard.innerHTML = `<div class="card-header"><h3>SEO / Meta</h3></div>`;
    const seoBody = document.createElement('div');

    const seoData = content._seo || {};
    renderFields(seoBody, schema.seo, seoData, '_seo');

    // SEO Preview
    const preview = document.createElement('div');
    preview.className = 'form-group';
    preview.innerHTML = `
      <label>Search Result Preview</label>
      <div class="seo-preview">
        <div class="seo-preview-title" id="seoPreviewTitle">${seoData.title || title}</div>
        <div class="seo-preview-url">velocitysimlounge.com/${pageId}</div>
        <div class="seo-preview-desc" id="seoPreviewDesc">${seoData.description || ''}</div>
      </div>
    `;
    seoBody.appendChild(preview);

    seoCard.appendChild(seoBody);
    area.appendChild(seoCard);
  }

  // Save: development runs local publish; staging/production save to staging only (server /api/config)
  const shouldLocalPublish =
    cmsConfig == null || cmsConfig.savePublishesLocally === true;
  saveBtn.addEventListener('click', async () => {
    collectFormData(pageId, schema, content);
    await API.put(`/api/content/${pageId}`, content);
    if (shouldLocalPublish) {
      const pub = await API.post(`/api/publish/${pageId}`);
      if (pub && pub.error) {
        toast('Saved to staging');
      } else {
        toast('Saved and published');
      }
    } else {
      toast('Saved to staging');
    }
    buildSidebar();
  });
}

// ---------------------------------------------------------------------------
// Field rendering
// ---------------------------------------------------------------------------
function renderFields(container, fields, data, prefix) {
  for (const [fieldKey, field] of Object.entries(fields)) {
    if (field.type === 'repeater') {
      renderRepeater(container, fieldKey, field, data[fieldKey] || [], `${prefix}.${fieldKey}`);
    } else {
      renderField(container, fieldKey, field, data[fieldKey], `${prefix}.${fieldKey}`);
    }
  }
}

function renderField(container, key, field, value, path) {
  const group = document.createElement('div');
  group.className = 'form-group';

  const label = document.createElement('label');
  label.textContent = field.label || key;
  label.setAttribute('for', `field-${path}`);
  group.appendChild(label);

  if (field.perLocation) {
    // Per-location field: show tabs
    const locTabs = document.createElement('div');
    locTabs.className = 'location-tabs';
    const locContent = document.createElement('div');

    const valueObj = (typeof value === 'object' && value !== null && value._perLocation) ? value : { _perLocation: true, _default: value || '' };

    locations.forEach((loc, i) => {
      const tab = document.createElement('button');
      tab.className = `location-tab ${i === 0 ? 'active' : ''}`;
      tab.textContent = loc;
      tab.addEventListener('click', () => {
        locTabs.querySelectorAll('.location-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        locContent.querySelectorAll('.loc-field').forEach(f => f.style.display = 'none');
        locContent.querySelector(`[data-loc="${loc}"]`).style.display = '';
      });
      locTabs.appendChild(tab);
    });

    group.appendChild(locTabs);

    locations.forEach((loc, i) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'loc-field';
      wrapper.dataset.loc = loc;
      wrapper.style.display = i === 0 ? '' : 'none';
      const locVal = valueObj[loc] || valueObj._default || '';
      renderSingleInput(wrapper, field, locVal, `${path}.${loc}`);
      locContent.appendChild(wrapper);
    });

    group.appendChild(locContent);
  } else {
    renderSingleInput(group, field, value, path);
  }

  container.appendChild(group);
}

function renderSingleInput(container, field, value, path) {
  switch (field.type) {
    case 'text':
    case 'url':
    case 'email':
    case 'tel':
    case 'price': {
      const input = document.createElement('input');
      input.type = field.type === 'price' ? 'text' : field.type;
      input.className = 'form-input';
      input.id = `field-${path}`;
      input.dataset.path = path;
      input.value = value || '';
      input.placeholder = field.placeholder || '';

      if (path.includes('_seo.title')) {
        input.addEventListener('input', () => {
          const el = document.getElementById('seoPreviewTitle');
          if (el) el.textContent = input.value || 'Page Title';
        });
      }
      container.appendChild(input);

      // Show accent hint for heading fields
      const isHeading = /heading$/i.test(field.label || '') || /heading$/i.test(path);
      if (isHeading && field.type === 'text') {
        const hint = document.createElement('div');
        hint.style.cssText = 'font-size:0.6875rem;color:var(--text-dim);margin-top:4px;';
        hint.textContent = 'Wrap in *asterisks* or **double** for accent color, e.g. How it *works*';
        container.appendChild(hint);
      }
      break;
    }
    case 'textarea': {
      const textarea = document.createElement('textarea');
      textarea.className = 'form-textarea';
      textarea.id = `field-${path}`;
      textarea.dataset.path = path;
      textarea.value = value || '';
      textarea.placeholder = field.placeholder || '';

      if (path.includes('_seo.description')) {
        textarea.addEventListener('input', () => {
          const el = document.getElementById('seoPreviewDesc');
          if (el) el.textContent = textarea.value || '';
        });
      }
      container.appendChild(textarea);
      break;
    }
    case 'number': {
      const input = document.createElement('input');
      input.type = 'number';
      input.className = 'form-input';
      input.id = `field-${path}`;
      input.dataset.path = path;
      input.value = value || '';
      if (field.min !== undefined) input.min = field.min;
      if (field.max !== undefined) input.max = field.max;
      container.appendChild(input);
      break;
    }
    case 'datetime':
    case 'date': {
      const input = document.createElement('input');
      input.type = field.type === 'datetime' ? 'datetime-local' : 'date';
      input.className = 'form-input';
      input.id = `field-${path}`;
      input.dataset.path = path;
      input.value = value ? value.slice(0, field.type === 'datetime' ? 16 : 10) : '';
      container.appendChild(input);
      break;
    }
    case 'boolean': {
      const wrapper = document.createElement('div');
      wrapper.className = 'form-checkbox';
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.id = `field-${path}`;
      cb.dataset.path = path;
      cb.checked = !!value;
      const lbl = document.createElement('label');
      lbl.setAttribute('for', `field-${path}`);
      lbl.textContent = field.label || 'Enabled';
      lbl.style.marginBottom = '0';
      wrapper.appendChild(cb);
      wrapper.appendChild(lbl);
      container.appendChild(wrapper);
      break;
    }
    case 'select': {
      const select = document.createElement('select');
      select.className = 'form-select';
      select.id = `field-${path}`;
      select.dataset.path = path;
      (field.options || []).forEach(opt => {
        const o = document.createElement('option');
        o.value = opt;
        o.textContent = opt;
        if (opt === value) o.selected = true;
        select.appendChild(o);
      });
      container.appendChild(select);
      break;
    }
    case 'image': {
      const wrapper = document.createElement('div');
      wrapper.className = 'image-picker';

      const preview = document.createElement('div');
      preview.className = 'image-preview';
      if (value) {
        preview.innerHTML = `<img src="${value}" alt="">`;
      } else {
        preview.textContent = 'No image';
      }

      const inputGroup = document.createElement('div');
      const urlInput = document.createElement('input');
      urlInput.type = 'text';
      urlInput.className = 'form-input';
      urlInput.style.marginBottom = '6px';
      urlInput.id = `field-${path}`;
      urlInput.dataset.path = path;
      urlInput.value = value || '';
      urlInput.placeholder = 'Image URL or upload';
      urlInput.addEventListener('input', () => {
        if (urlInput.value) {
          preview.innerHTML = `<img src="${urlInput.value}" alt="">`;
        } else {
          preview.innerHTML = 'No image';
        }
      });

      const uploadBtn = document.createElement('input');
      uploadBtn.type = 'file';
      uploadBtn.accept = 'image/*';
      uploadBtn.style.fontSize = '0.75rem';
      uploadBtn.addEventListener('change', async () => {
        if (uploadBtn.files[0]) {
          const result = await API.upload(uploadBtn.files[0]);
          if (result && result.original) {
            urlInput.value = result.original;
            preview.innerHTML = `<img src="${result.thumb || result.original}" alt="">`;
            toast('Image uploaded');
          }
        }
      });

      inputGroup.appendChild(urlInput);
      inputGroup.appendChild(uploadBtn);
      wrapper.appendChild(preview);
      wrapper.appendChild(inputGroup);
      container.appendChild(wrapper);
      break;
    }
    default: {
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'form-input';
      input.id = `field-${path}`;
      input.dataset.path = path;
      input.value = value || '';
      container.appendChild(input);
    }
  }
}

// ---------------------------------------------------------------------------
// Repeater rendering
// ---------------------------------------------------------------------------
function renderRepeater(container, key, field, items, prefix) {
  const wrapper = document.createElement('div');
  wrapper.dataset.repeater = prefix;

  const header = document.createElement('div');
  header.style.cssText = 'display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;';
  header.innerHTML = `<label style="font-weight:600;color:#aaa;font-size:0.8125rem">${field.label || key}</label>`;
  wrapper.appendChild(header);

  const itemsContainer = document.createElement('div');
  itemsContainer.className = 'repeater-items';
  itemsContainer.dataset.repeaterItems = prefix;

  (items || []).forEach((item, idx) => {
    renderRepeaterItem(itemsContainer, field.fields, item, `${prefix}[${idx}]`, idx, items);
  });

  wrapper.appendChild(itemsContainer);

  const addBtn = document.createElement('button');
  addBtn.className = 'repeater-add';
  addBtn.innerHTML = `+ Add ${field.label || 'Item'}`;
  addBtn.addEventListener('click', () => {
    const newItem = {};
    for (const fk of Object.keys(field.fields)) {
      newItem[fk] = field.fields[fk].type === 'boolean' ? false : '';
    }
    items.push(newItem);
    const idx = items.length - 1;
    renderRepeaterItem(itemsContainer, field.fields, newItem, `${prefix}[${idx}]`, idx, items);
  });
  wrapper.appendChild(addBtn);

  container.appendChild(wrapper);
}

function renderRepeaterItem(container, fields, data, prefix, index, itemsArray) {
  const item = document.createElement('div');
  item.className = 'repeater-item';

  const header = document.createElement('div');
  header.className = 'repeater-item-header';

  const titleVal = data.title || data.name || data.company || data.heading || `Item ${index + 1}`;
  header.innerHTML = `<span class="item-label">${titleVal}</span>`;

  const actions = document.createElement('div');
  actions.className = 'repeater-item-actions';

  // Move up
  if (index > 0) {
    const upBtn = document.createElement('button');
    upBtn.className = 'btn btn-secondary btn-sm';
    upBtn.textContent = '\u2191';
    upBtn.addEventListener('click', () => {
      [itemsArray[index - 1], itemsArray[index]] = [itemsArray[index], itemsArray[index - 1]];
      refreshRepeater(container, fields, itemsArray, prefix.replace(/\[\d+\]$/, ''));
    });
    actions.appendChild(upBtn);
  }

  // Move down
  if (index < itemsArray.length - 1) {
    const downBtn = document.createElement('button');
    downBtn.className = 'btn btn-secondary btn-sm';
    downBtn.textContent = '\u2193';
    downBtn.addEventListener('click', () => {
      [itemsArray[index], itemsArray[index + 1]] = [itemsArray[index + 1], itemsArray[index]];
      refreshRepeater(container, fields, itemsArray, prefix.replace(/\[\d+\]$/, ''));
    });
    actions.appendChild(downBtn);
  }

  // Delete
  const delBtn = document.createElement('button');
  delBtn.className = 'btn btn-danger btn-sm';
  delBtn.textContent = '\u00D7';
  delBtn.addEventListener('click', () => {
    itemsArray.splice(index, 1);
    refreshRepeater(container, fields, itemsArray, prefix.replace(/\[\d+\]$/, ''));
  });
  actions.appendChild(delBtn);

  header.appendChild(actions);
  item.appendChild(header);

  // Render nested fields (skip nested repeaters for now to keep manageable)
  for (const [fk, fDef] of Object.entries(fields)) {
    if (fDef.type === 'repeater') continue;
    renderField(item, fk, fDef, data[fk], `${prefix}.${fk}`);
  }

  container.appendChild(item);
}

function refreshRepeater(container, fields, items, prefix) {
  container.innerHTML = '';
  items.forEach((item, idx) => {
    renderRepeaterItem(container, fields, item, `${prefix}[${idx}]`, idx, items);
  });
}

// ---------------------------------------------------------------------------
// Collect form data back into content object
// ---------------------------------------------------------------------------
function collectFormData(pageId, schema, content) {
  document.querySelectorAll('[data-path]').forEach(input => {
    const pathStr = input.dataset.path;
    const value = input.type === 'checkbox' ? input.checked : input.value;
    setNestedValue(content, pathStr, value);
  });
}

function setNestedValue(obj, pathStr, value) {
  const parts = pathStr.split(/\.|\[(\d+)\]/).filter(Boolean);

  // The first part is usually the section key (e.g. "hero", "_seo")
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    const nextPart = parts[i + 1];
    const isNextIndex = /^\d+$/.test(nextPart);

    if (current[part] === undefined) {
      current[part] = isNextIndex ? [] : {};
    }

    // Handle per-location objects
    if (typeof current[part] === 'object' && current[part] !== null && current[part]._perLocation) {
      // Don't descend into perLocation object normally
    }

    current = current[part];
  }

  const lastKey = parts[parts.length - 1];
  current[lastKey] = value;
}

// =========================================================================
// PRICING EDITOR
// =========================================================================
async function loadPricingEditor() {
  document.getElementById('viewTitle').textContent = 'Pricing';
  document.getElementById('topbarActions').innerHTML = '';

  const pricing = await API.get('/api/pricing') || {};
  const area = document.getElementById('contentArea');
  area.innerHTML = '';

  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <div class="card-header">
      <div>
        <h3>Pricing Registry</h3>
        <span class="subtitle">Central pricing used across all pages. Reference with {{price:key}} in content.</span>
      </div>
    </div>
  `;

  const table = document.createElement('table');
  table.className = 'data-table';
  table.innerHTML = `<thead><tr><th>Key</th><th>Value</th><th></th></tr></thead>`;
  const tbody = document.createElement('tbody');
  tbody.id = 'pricingBody';

  for (const [key, val] of Object.entries(pricing)) {
    addPricingRow(tbody, key, val);
  }

  table.appendChild(tbody);
  card.appendChild(table);

  // Add row button
  const addRow = document.createElement('div');
  addRow.style.padding = '12px 0';
  const addBtn = document.createElement('button');
  addBtn.className = 'btn btn-secondary btn-sm';
  addBtn.textContent = '+ Add Price';
  addBtn.addEventListener('click', () => addPricingRow(tbody, '', ''));
  addRow.appendChild(addBtn);
  card.appendChild(addRow);

  // Save button
  const saveBtn = document.createElement('button');
  saveBtn.className = 'btn btn-primary';
  saveBtn.textContent = 'Save Pricing';
  saveBtn.addEventListener('click', async () => {
    const newPricing = {};
    tbody.querySelectorAll('tr').forEach(row => {
      const key = row.querySelector('.pricing-key')?.value?.trim();
      const val = row.querySelector('.pricing-val')?.value?.trim();
      if (key) newPricing[key] = val;
    });
    await API.put('/api/pricing', newPricing);
    toast('Pricing saved');
  });
  card.appendChild(saveBtn);

  area.appendChild(card);
}

function addPricingRow(tbody, key, val) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><input class="form-input pricing-key" value="${key}" placeholder="e.g. membership.monthly" style="margin:0"></td>
    <td><input class="form-input pricing-val" value="${val}" placeholder="e.g. $20" style="margin:0"></td>
    <td><button class="btn btn-danger btn-sm" onclick="this.closest('tr').remove()">Remove</button></td>
  `;
  tbody.appendChild(tr);
}

// =========================================================================
// BANNER EDITOR
// =========================================================================
async function loadBannerEditor() {
  document.getElementById('viewTitle').textContent = 'Banners';
  document.getElementById('topbarActions').innerHTML = '';

  const banners = await API.get('/api/banners/all') || [];
  const area = document.getElementById('contentArea');
  area.innerHTML = '';

  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <div class="card-header">
      <div>
        <h3>Site Banners</h3>
        <span class="subtitle">Announcements displayed at the top of every page. Supports scheduling and location targeting.</span>
      </div>
    </div>
  `;

  const bannersContainer = document.createElement('div');
  bannersContainer.id = 'bannersContainer';

  banners.forEach((banner, idx) => {
    renderBannerItem(bannersContainer, banner, idx, banners);
  });

  card.appendChild(bannersContainer);

  const addBtn = document.createElement('button');
  addBtn.className = 'repeater-add';
  addBtn.textContent = '+ Add Banner';
  addBtn.style.marginTop = '12px';
  addBtn.addEventListener('click', () => {
    const newBanner = {
      id: 'banner-' + Date.now(),
      text: '',
      type: 'info',
      locations: [],
      startDate: null,
      endDate: null,
      dismissable: true,
      priority: 0,
      active: true
    };
    banners.push(newBanner);
    renderBannerItem(bannersContainer, newBanner, banners.length - 1, banners);
  });
  card.appendChild(addBtn);

  const saveBtn = document.createElement('button');
  saveBtn.className = 'btn btn-primary';
  saveBtn.textContent = 'Save Banners';
  saveBtn.style.marginTop = '16px';
  saveBtn.addEventListener('click', async () => {
    // Collect from DOM
    const items = [];
    bannersContainer.querySelectorAll('.repeater-item').forEach(el => {
      items.push({
        id: el.querySelector('[data-field="id"]').value,
        text: el.querySelector('[data-field="text"]').value,
        type: el.querySelector('[data-field="type"]').value,
        locations: el.querySelector('[data-field="locations"]').value.split(',').map(s => s.trim()).filter(Boolean),
        startDate: el.querySelector('[data-field="startDate"]').value || null,
        endDate: el.querySelector('[data-field="endDate"]').value || null,
        dismissable: el.querySelector('[data-field="dismissable"]').checked,
        priority: parseInt(el.querySelector('[data-field="priority"]').value) || 0,
        active: el.querySelector('[data-field="active"]').checked
      });
    });
    await API.put('/api/banners', items);
    toast('Banners saved');
  });
  card.appendChild(saveBtn);

  area.appendChild(card);
}

function renderBannerItem(container, banner, index, banners) {
  const item = document.createElement('div');
  item.className = 'repeater-item';
  item.innerHTML = `
    <div class="repeater-item-header">
      <span class="item-label">${banner.text || 'New Banner'}</span>
      <div class="repeater-item-actions">
        <button class="btn btn-danger btn-sm" onclick="this.closest('.repeater-item').remove()">Remove</button>
      </div>
    </div>
    <input type="hidden" data-field="id" value="${banner.id}">
    <div class="form-group">
      <label>Banner Text</label>
      <input class="form-input" data-field="text" value="${banner.text || ''}" placeholder="Banner message...">
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group">
        <label>Type</label>
        <select class="form-select" data-field="type">
          <option value="info" ${banner.type === 'info' ? 'selected' : ''}>Info</option>
          <option value="warning" ${banner.type === 'warning' ? 'selected' : ''}>Warning</option>
          <option value="promo" ${banner.type === 'promo' ? 'selected' : ''}>Promo</option>
          <option value="urgent" ${banner.type === 'urgent' ? 'selected' : ''}>Urgent</option>
        </select>
      </div>
      <div class="form-group">
        <label>Priority</label>
        <input class="form-input" type="number" data-field="priority" value="${banner.priority || 0}">
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group">
        <label>Start Date</label>
        <input class="form-input" type="datetime-local" data-field="startDate" value="${banner.startDate ? banner.startDate.slice(0, 16) : ''}">
      </div>
      <div class="form-group">
        <label>End Date</label>
        <input class="form-input" type="datetime-local" data-field="endDate" value="${banner.endDate ? banner.endDate.slice(0, 16) : ''}">
      </div>
    </div>
    <div class="form-group">
      <label>Locations (comma-separated, leave empty for all)</label>
      <input class="form-input" data-field="locations" value="${(banner.locations || []).join(', ')}" placeholder="houston, dallas">
    </div>
    <div style="display:flex;gap:20px">
      <div class="form-checkbox">
        <input type="checkbox" data-field="dismissable" ${banner.dismissable ? 'checked' : ''}>
        <label>Dismissable</label>
      </div>
      <div class="form-checkbox">
        <input type="checkbox" data-field="active" ${banner.active !== false ? 'checked' : ''}>
        <label>Active</label>
      </div>
    </div>
  `;
  container.appendChild(item);
}

// =========================================================================
// FORMS MANAGER
// =========================================================================
async function loadFormsManager() {
  document.getElementById('viewTitle').textContent = 'Forms';
  document.getElementById('topbarActions').innerHTML = '';

  const forms = await API.get('/api/forms') || [];
  const area = document.getElementById('contentArea');
  area.innerHTML = '';

  // Tabs: Form Definitions | Submissions
  const tabs = document.createElement('div');
  tabs.className = 'tabs';
  tabs.innerHTML = `
    <button class="tab active" data-tab="definitions">Form Definitions</button>
    <button class="tab" data-tab="submissions">Submissions</button>
  `;
  area.appendChild(tabs);

  const tabContent = document.createElement('div');
  tabContent.id = 'formsTabContent';
  area.appendChild(tabContent);

  tabs.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      if (tab.dataset.tab === 'definitions') renderFormDefinitions(tabContent, forms);
      else renderFormSubmissions(tabContent, forms);
    });
  });

  renderFormDefinitions(tabContent, forms);
}

function renderFormDefinitions(container, forms) {
  container.innerHTML = '';

  forms.forEach(form => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-header">
        <div>
          <h3>${form.title || form.id}</h3>
          <span class="subtitle">ID: ${form.id} | ${(form.fields || []).length} fields</span>
        </div>
        <div>
          <span class="subtitle">Embed: &lt;div data-cms-form="${form.id}"&gt;&lt;/div&gt;</span>
        </div>
      </div>
    `;

    const table = document.createElement('table');
    table.className = 'data-table';
    table.innerHTML = `<thead><tr><th>Field</th><th>Type</th><th>Required</th><th>Options</th></tr></thead>`;
    const tbody = document.createElement('tbody');

    (form.fields || []).forEach(field => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${field.label || field.name}</td>
        <td><code style="color:var(--accent)">${field.type}</code></td>
        <td>${field.required ? 'Yes' : 'No'}</td>
        <td>${field.options ? field.options.join(', ') : '—'}</td>
      `;
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    card.appendChild(table);

    const successMsg = document.createElement('div');
    successMsg.style.cssText = 'margin-top:12px;font-size:0.8125rem;color:var(--text-muted)';
    successMsg.innerHTML = `<strong>Success message:</strong> ${form.successMessage || '—'}`;
    card.appendChild(successMsg);

    container.appendChild(card);
  });
}

async function renderFormSubmissions(container, forms) {
  container.innerHTML = '';

  for (const form of forms) {
    const subs = await API.get(`/api/forms/${form.id}/submissions`) || [];

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-header">
        <div>
          <h3>${form.title || form.id}</h3>
          <span class="subtitle">${subs.length} submission(s)</span>
        </div>
      </div>
    `;

    if (subs.length === 0) {
      card.innerHTML += `<div class="empty-state"><p>No submissions yet</p></div>`;
    } else {
      const table = document.createElement('table');
      table.className = 'data-table';

      const fieldNames = (form.fields || []).map(f => f.name);
      table.innerHTML = `<thead><tr>${fieldNames.map(n => `<th>${n}</th>`).join('')}<th>Date</th><th></th></tr></thead>`;
      const tbody = document.createElement('tbody');

      subs.reverse().forEach(sub => {
        const tr = document.createElement('tr');
        tr.innerHTML = fieldNames.map(n => `<td>${sub.data[n] || '—'}</td>`).join('') +
          `<td>${new Date(sub.submittedAt).toLocaleDateString()}</td>` +
          `<td><button class="btn btn-danger btn-sm" data-delete-sub="${sub.id}" data-form="${form.id}">Del</button></td>`;
        tbody.appendChild(tr);
      });

      table.appendChild(tbody);
      card.appendChild(table);

      card.addEventListener('click', async (e) => {
        const btn = e.target.closest('[data-delete-sub]');
        if (btn) {
          await API.del(`/api/forms/${btn.dataset.form}/submissions/${btn.dataset.deleteSub}`);
          toast('Submission deleted');
          renderFormSubmissions(container, forms);
        }
      });
    }

    container.appendChild(card);
  }
}

// =========================================================================
// MEDIA LIBRARY
// =========================================================================
async function loadMediaLibrary() {
  document.getElementById('viewTitle').textContent = 'Media Library';

  const actions = document.getElementById('topbarActions');
  actions.innerHTML = '';

  const uploadInput = document.createElement('input');
  uploadInput.type = 'file';
  uploadInput.accept = 'image/*';
  uploadInput.multiple = true;
  uploadInput.style.display = 'none';
  uploadInput.id = 'mediaUploadInput';

  const uploadBtn = document.createElement('button');
  uploadBtn.className = 'btn btn-primary btn-sm';
  uploadBtn.textContent = 'Upload Images';
  uploadBtn.addEventListener('click', () => uploadInput.click());

  uploadInput.addEventListener('change', async () => {
    for (const file of uploadInput.files) {
      await API.upload(file);
    }
    toast(`${uploadInput.files.length} image(s) uploaded`);
    loadMediaLibrary();
  });

  actions.appendChild(uploadInput);
  actions.appendChild(uploadBtn);

  const media = await API.get('/api/media') || [];
  const area = document.getElementById('contentArea');
  area.innerHTML = '';

  if (media.length === 0) {
    area.innerHTML = `<div class="empty-state"><div class="icon">&#9635;</div><p>No images uploaded yet. Use the Upload button above.</p></div>`;
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'media-grid';

  media.forEach(item => {
    const el = document.createElement('div');
    el.className = 'media-item';
    el.innerHTML = `
      <img src="${item.thumb}" alt="">
      <div class="media-item-actions">
        <button class="btn btn-danger btn-sm" title="Delete" data-delete="${item.id}">&#10005;</button>
      </div>
    `;
    el.addEventListener('click', (e) => {
      if (e.target.closest('[data-delete]')) {
        if (confirm('Delete this image?')) {
          API.del(`/api/media/${item.id}`).then(() => {
            toast('Image deleted');
            loadMediaLibrary();
          });
        }
        return;
      }
      // Copy URL to clipboard
      navigator.clipboard.writeText(item.original).then(() => {
        toast('Image URL copied to clipboard', 'info');
      });
    });
    grid.appendChild(el);
  });

  area.appendChild(grid);
}

// =========================================================================
// LOCATIONS MANAGER
// =========================================================================
async function loadLocationManager() {
  document.getElementById('viewTitle').textContent = 'Locations';
  document.getElementById('topbarActions').innerHTML = '';

  locations = await API.get('/api/locations') || [];
  const area = document.getElementById('contentArea');
  area.innerHTML = '';

  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <div class="card-header">
      <div>
        <h3>Locations</h3>
        <span class="subtitle">Manage Velocity locations. Per-location content fields will show tabs for each.</span>
      </div>
    </div>
  `;

  const list = document.createElement('div');
  locations.forEach(loc => {
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border)';
    row.innerHTML = `
      <span style="text-transform:capitalize;font-weight:500">${loc}</span>
      <button class="btn btn-danger btn-sm" data-delete-loc="${loc}">Remove</button>
    `;
    row.querySelector('button').addEventListener('click', async () => {
      if (confirm(`Remove ${loc}? This won't delete content, but per-location fields will no longer show a tab for it.`)) {
        await API.del(`/api/locations/${loc}`);
        toast(`${loc} removed`);
        loadLocationManager();
      }
    });
    list.appendChild(row);
  });
  card.appendChild(list);

  const addForm = document.createElement('div');
  addForm.style.cssText = 'display:flex;gap:8px;margin-top:16px';
  addForm.innerHTML = `
    <input class="form-input" id="newLocationInput" placeholder="New location name" style="margin:0;flex:1">
    <button class="btn btn-primary" id="addLocationBtn">Add</button>
  `;
  card.appendChild(addForm);

  area.appendChild(card);

  document.getElementById('addLocationBtn').addEventListener('click', async () => {
    const input = document.getElementById('newLocationInput');
    if (input.value.trim()) {
      await API.post('/api/locations', { location: input.value.trim() });
      toast('Location added');
      loadLocationManager();
    }
  });
}

// =========================================================================
// Boot
// =========================================================================
init();
