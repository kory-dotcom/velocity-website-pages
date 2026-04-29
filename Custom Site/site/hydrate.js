/* ========================================================================
   Velocity CMS — Hydration Layer
   Works with the Local Replica's dynamic page-loading system.
   
   Usage:
     - Include this script in Local Replica/index.html
     - After each page module loads, call: window.VelocityCMS.hydratePage(pageKey)
     - Banners load automatically on init
   ======================================================================== */

(function () {
  'use strict';

  const params = new URLSearchParams(window.location.search);
  const env = params.get('env') || 'production';
  const loc = params.get('loc') || localStorage.getItem('vslPreferredLocation') || '';

  const API_BASE = window.location.origin;

  // -----------------------------------------------------------------------
  // Public API
  // -----------------------------------------------------------------------
  window.VelocityCMS = {
    hydratePage,
    hydrateElement,
    loadBanners,
    env,
    loc
  };

  // -----------------------------------------------------------------------
  // Page hydration (called by replica-app.js after each module loads)
  // -----------------------------------------------------------------------
  async function hydratePage(pageKey) {
    if (!pageKey) return;

    try {
      const res = await fetch(`${API_BASE}/api/content/${pageKey}?env=${env}&loc=${loc}`);
      if (!res.ok) return;
      const content = await res.json();

      const pageRoot = document.getElementById('replica-page-root') || document.body;

      // Use selector map if available (for existing Elementor pages without data-cms attrs)
      const selectorMap = window.CMS_SELECTOR_MAP && window.CMS_SELECTOR_MAP[pageKey];
      if (selectorMap) {
        hydrateWithSelectors(pageRoot, content, selectorMap);
      }

      // Also run standard data-cms attribute hydration
      hydrateNode(pageRoot, content);

      if (content._seo) hydrateSEO(content._seo);

      const formEls = pageRoot.querySelectorAll('[data-cms-form]');
      formEls.forEach(el => renderForm(el, el.dataset.cmsForm));

    } catch (err) {
      console.warn('[CMS] Hydration error for page:', pageKey, err);
    }
  }

  // -----------------------------------------------------------------------
  // Selector-based hydration (for pages without data-cms attributes)
  // -----------------------------------------------------------------------
  // Convert *word* or **word** syntax to accent-colored span
  const ACCENT_COLOR = '#EE265F';
  function renderAccentText(text) {
    if (typeof text !== 'string') return text;
    // Match **double** first, then *single*
    return text
      .replace(/\*\*([^*]+)\*\*/g, `<span style="color:${ACCENT_COLOR};-webkit-text-fill-color:${ACCENT_COLOR}">$1</span>`)
      .replace(/\*([^*]+)\*/g, `<span style="color:${ACCENT_COLOR};-webkit-text-fill-color:${ACCENT_COLOR}">$1</span>`);
  }

  // Update element text while preserving child elements (e.g. price "/mo" spans, "From" prefixes)
  function updateElementText(el, value) {
    if (typeof value !== 'string') return;
    const rendered = renderAccentText(value);
    if (rendered !== value) {
      el.innerHTML = rendered;
      return;
    }

    // If element has child elements we want to preserve (like <span>/mo</span>),
    // only update the direct text nodes
    const childElements = el.querySelectorAll('*');
    if (childElements.length > 0) {
      // Preserve child elements, replace content intelligently
      el.innerHTML = value;
    } else {
      el.textContent = value;
    }
  }

  function hydrateWithSelectors(root, content, map) {
    for (const [contentPath, selector] of Object.entries(map)) {
      if (contentPath === '_repeaters') continue;

      const value = getNestedValue(content, contentPath);
      if (value === undefined || value === null || typeof value === 'object') continue;

      const el = root.querySelector(selector);
      if (!el) continue;

      updateElementText(el, value);
    }

    // Handle repeaters from selector map
    const repeaters = map._repeaters;
    if (!repeaters) return;

    for (const [contentPath, config] of Object.entries(repeaters)) {
      const items = getNestedValue(content, contentPath);
      if (!Array.isArray(items) || items.length === 0) continue;

      const container = root.querySelector(config.container);
      if (!container) continue;

      const existingItems = container.querySelectorAll(config.item);
      if (existingItems.length === 0) continue;

      existingItems.forEach((el, idx) => {
        if (idx >= items.length) return;
        const item = items[idx];

        for (const [fieldKey, fieldSelector] of Object.entries(config.fields)) {
          const fieldEl = el.querySelector(fieldSelector);
          if (!fieldEl || item[fieldKey] === undefined) continue;
          updateElementText(fieldEl, item[fieldKey]);
        }
      });
    }
  }

  // Hydrate a specific DOM element with data
  function hydrateElement(root, data) {
    hydrateNode(root, data);
  }

  // -----------------------------------------------------------------------
  // Content hydration
  // -----------------------------------------------------------------------
  function hydrateNode(root, data) {
    if (!data || typeof data !== 'object') return;

    // Simple text fields
    root.querySelectorAll('[data-cms]').forEach(el => {
      const key = el.dataset.cms;
      const value = getNestedValue(data, key);
      if (value !== undefined && value !== null && typeof value !== 'object') {
        el.textContent = value;
      }
    });

    // HTML fields (preserves formatting)
    root.querySelectorAll('[data-cms-html]').forEach(el => {
      const key = el.dataset.cmsHtml;
      const value = getNestedValue(data, key);
      if (value !== undefined && value !== null) {
        el.innerHTML = value;
      }
    });

    // Image src
    root.querySelectorAll('[data-cms-src]').forEach(el => {
      const key = el.dataset.cmsSrc;
      const value = getNestedValue(data, key);
      if (value) el.src = value;
    });

    // Background image
    root.querySelectorAll('[data-cms-bg]').forEach(el => {
      const key = el.dataset.cmsBg;
      const value = getNestedValue(data, key);
      if (value) el.style.backgroundImage = `url(${value})`;
    });

    // Links
    root.querySelectorAll('[data-cms-href]').forEach(el => {
      const key = el.dataset.cmsHref;
      const value = getNestedValue(data, key);
      if (value) el.href = value;
    });

    // Repeaters
    root.querySelectorAll('[data-cms-repeater]').forEach(el => {
      if (el.dataset.cmsRepeaterTemplate === 'true') return;

      const key = el.dataset.cmsRepeater;
      const items = getNestedValue(data, key);
      if (!Array.isArray(items) || items.length === 0) return;

      const template = el.cloneNode(true);
      const parent = el.parentNode;

      // Remove existing clones
      parent.querySelectorAll(`[data-cms-repeater="${key}"]`).forEach((sib, i) => {
        if (i > 0) sib.remove();
      });

      el.style.display = 'none';
      el.dataset.cmsRepeaterTemplate = 'true';

      items.forEach(item => {
        const clone = template.cloneNode(true);
        clone.removeAttribute('data-cms-repeater');
        delete clone.dataset.cmsRepeaterTemplate;
        clone.style.display = '';

        clone.querySelectorAll('[data-cms-field]').forEach(field => {
          const fKey = field.dataset.cmsField;
          const val = item[fKey];
          if (val === undefined || val === null) return;

          if (field.tagName === 'IMG') {
            field.src = val;
          } else if (field.tagName === 'A') {
            field.textContent = val;
            if (field.dataset.cmsFieldHref && item[field.dataset.cmsFieldHref]) {
              field.href = item[field.dataset.cmsFieldHref];
            }
          } else {
            field.textContent = val;
          }
        });

        clone.querySelectorAll('[data-cms-field-src]').forEach(img => {
          const fKey = img.dataset.cmsFieldSrc;
          if (item[fKey]) img.src = item[fKey];
        });

        clone.querySelectorAll('[data-cms-field-href]').forEach(a => {
          const fKey = a.dataset.cmsFieldHref;
          if (item[fKey]) a.href = item[fKey];
        });

        clone.querySelectorAll('[data-cms-field-bg]').forEach(bgEl => {
          const fKey = bgEl.dataset.cmsFieldBg;
          if (item[fKey]) bgEl.style.backgroundImage = `url(${item[fKey]})`;
        });

        parent.insertBefore(clone, el);
      });
    });
  }

  function getNestedValue(obj, path) {
    return path.split('.').reduce((o, k) => (o && o[k] !== undefined) ? o[k] : undefined, obj);
  }

  // -----------------------------------------------------------------------
  // SEO
  // -----------------------------------------------------------------------
  function hydrateSEO(seo) {
    if (!seo) return;
    if (seo.title) document.title = seo.title;
    setMeta('description', seo.description);
    setMeta('og:title', seo.ogTitle || seo.title, 'property');
    setMeta('og:description', seo.description, 'property');
    if (seo.ogImage) setMeta('og:image', seo.ogImage, 'property');
    if (seo.noIndex) setMeta('robots', 'noindex, nofollow');
  }

  function setMeta(name, content, attr = 'name') {
    if (!content) return;
    let meta = document.querySelector(`meta[${attr}="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attr, name);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  }

  // -----------------------------------------------------------------------
  // Banners
  // -----------------------------------------------------------------------
  async function loadBanners() {
    try {
      const res = await fetch(`${API_BASE}/api/banners?loc=${loc}`);
      if (!res.ok) return;
      const banners = await res.json();
      renderBanners(banners);
    } catch (err) {
      console.warn('[CMS] Banner load error:', err);
    }
  }

  function renderBanners(banners) {
    if (!banners || banners.length === 0) return;

    let container = document.getElementById('cms-banners');
    if (!container) {
      container = document.createElement('div');
      container.id = 'cms-banners';
      document.body.prepend(container);
    }
    container.innerHTML = '';

    const dismissed = JSON.parse(localStorage.getItem('vsl_dismissed_banners') || '[]');

    const colors = {
      info:    { bg: '#1e3a5f', text: '#7ec8e3', border: '#3498db' },
      warning: { bg: '#5f4b1e', text: '#f5d76e', border: '#f39c12' },
      promo:   { bg: '#1e5f3a', text: '#7ee3a0', border: '#2ecc71' },
      urgent:  { bg: '#5f1e1e', text: '#f8a0a7', border: '#e63946' }
    };

    banners.forEach(banner => {
      if (banner.dismissable && dismissed.includes(banner.id)) return;

      const style = colors[banner.type] || colors.info;
      const el = document.createElement('div');
      el.style.cssText = `
        padding: 10px 20px; display: flex; align-items: center; justify-content: space-between;
        background: ${style.bg}; color: ${style.text}; border-bottom: 1px solid ${style.border};
        font-size: 0.8125rem; font-family: Inter, -apple-system, sans-serif;
      `;
      el.innerHTML = `<span>${banner.text}</span>`;

      if (banner.dismissable) {
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '\u00D7';
        closeBtn.style.cssText = `background:none;border:none;color:${style.text};font-size:1.25rem;cursor:pointer;padding:0 0 0 16px;`;
        closeBtn.addEventListener('click', () => {
          dismissed.push(banner.id);
          localStorage.setItem('vsl_dismissed_banners', JSON.stringify(dismissed));
          el.remove();
        });
        el.appendChild(closeBtn);
      }

      container.appendChild(el);
    });
  }

  // -----------------------------------------------------------------------
  // Form renderer
  // -----------------------------------------------------------------------
  async function renderForm(container, formId) {
    try {
      const res = await fetch(`${API_BASE}/api/forms/${formId}`);
      if (!res.ok) return;
      const form = await res.json();

      const formEl = document.createElement('form');
      formEl.className = 'cms-form';
      formEl.style.cssText = 'max-width:500px;margin:0 auto;';

      if (form.title) {
        const title = document.createElement('h3');
        title.textContent = form.title;
        title.style.cssText = 'margin-bottom:20px;font-size:1.25rem;color:#eaeaea;font-family:Inter,sans-serif;';
        formEl.appendChild(title);
      }

      (form.fields || []).forEach(field => {
        const group = document.createElement('div');
        group.style.cssText = 'margin-bottom:16px;';

        const label = document.createElement('label');
        label.textContent = field.label + (field.required ? ' *' : '');
        label.style.cssText = 'display:block;margin-bottom:4px;font-size:0.8125rem;font-weight:500;color:#b2aebf;font-family:Inter,sans-serif;';
        group.appendChild(label);

        let input;
        if (field.type === 'textarea') {
          input = document.createElement('textarea');
          input.rows = 4;
        } else if (field.type === 'select') {
          input = document.createElement('select');
          const blank = document.createElement('option');
          blank.value = '';
          blank.textContent = 'Select...';
          input.appendChild(blank);
          (field.options || []).forEach(opt => {
            const o = document.createElement('option');
            o.value = opt;
            o.textContent = opt;
            input.appendChild(o);
          });
        } else {
          input = document.createElement('input');
          input.type = field.type || 'text';
        }

        input.name = field.name;
        input.required = !!field.required;
        if (field.placeholder) input.placeholder = field.placeholder;
        if (field.min !== undefined) input.min = field.min;
        input.style.cssText = 'width:100%;padding:9px 12px;border:1px solid rgba(234,234,234,0.16);border-radius:8px;background:rgba(255,255,255,0.05);color:#eaeaea;font-size:0.875rem;font-family:Inter,sans-serif;outline:none;';
        group.appendChild(input);

        formEl.appendChild(group);
      });

      const submitBtn = document.createElement('button');
      submitBtn.type = 'submit';
      submitBtn.textContent = 'Submit';
      submitBtn.style.cssText = 'padding:10px 24px;background:#ee265f;color:#fff;border:none;border-radius:8px;font-size:0.9375rem;font-weight:600;cursor:pointer;font-family:Inter,sans-serif;';
      formEl.appendChild(submitBtn);

      const msgEl = document.createElement('div');
      msgEl.style.cssText = 'margin-top:12px;font-size:0.875rem;display:none;font-family:Inter,sans-serif;';
      formEl.appendChild(msgEl);

      formEl.addEventListener('submit', async (e) => {
        e.preventDefault();
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';

        const formData = {};
        new FormData(formEl).forEach((val, key) => { formData[key] = val; });

        try {
          const r = await fetch(`${API_BASE}/api/forms/${formId}/submit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          });
          const result = await r.json();

          if (r.ok) {
            msgEl.textContent = result.message;
            msgEl.style.color = '#2ecc71';
            msgEl.style.display = 'block';
            formEl.reset();
          } else {
            msgEl.textContent = (result.errors || [result.error]).join(', ');
            msgEl.style.color = '#ee265f';
            msgEl.style.display = 'block';
          }
        } catch {
          msgEl.textContent = 'Connection error. Please try again.';
          msgEl.style.color = '#ee265f';
          msgEl.style.display = 'block';
        }

        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit';
      });

      container.appendChild(formEl);
    } catch (err) {
      console.warn('[CMS] Form render error:', formId, err);
    }
  }

  // -----------------------------------------------------------------------
  // Auto-load banners on page load + staging indicator
  // -----------------------------------------------------------------------
  function initCMS() {
    if (env === 'staging') {
      const indicator = document.createElement('div');
      indicator.style.cssText = 'background:#5f4b1e;color:#f5d76e;text-align:center;padding:6px;font-size:0.75rem;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;font-family:Inter,sans-serif;position:fixed;top:0;left:0;right:0;z-index:10000;';
      indicator.textContent = 'Staging Preview \u2014 Changes are not live';
      document.body.prepend(indicator);
      document.body.style.paddingTop = '28px';
    }

    loadBanners();

    // Auto-hydrate standalone pages (not the Local Replica, which calls hydratePage manually)
    const isReplica = !!document.getElementById('replica-page-root');
    if (!isReplica && pageName) {
      hydratePage(pageName);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCMS);
  } else {
    initCMS();
  }
})();
