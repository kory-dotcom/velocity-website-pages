/**
 * Velocity site-wide location helper (?loc=houston|dallas).
 * Upload to WordPress (e.g. wp-content/uploads/2026/06/vsl-location.js)
 * and include via <script src="..."> in navbar + each page HTML widget.
 */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'vslPreferredLocation';
  var DALLAS_PAGE = 'https://velocitysimlounge.com/dallas';

  function normalize(key) {
    return key === 'dallas' ? 'dallas' : 'houston';
  }

  function readFromUrl() {
    try {
      var q = new URLSearchParams(global.location.search).get('loc');
      if (!q) return null;
      q = String(q).toLowerCase();
      if (q === 'dallas' || q === 'houston') return q;
    } catch (_) {}
    return null;
  }

  function readLocation() {
    var fromUrl = readFromUrl();
    if (fromUrl) {
      try { global.localStorage.setItem(STORAGE_KEY, fromUrl); } catch (_) {}
      return normalize(fromUrl);
    }
    try {
      return normalize(global.localStorage.getItem(STORAGE_KEY));
    } catch (_) {
      return 'houston';
    }
  }

  function bootstrap() {
    var fromUrl = readFromUrl();
    if (!fromUrl) return;
    try { global.localStorage.setItem(STORAGE_KEY, fromUrl); } catch (_) {}
    try {
      global.dispatchEvent(new CustomEvent('_vslLocationChanged', { detail: { location: fromUrl } }));
    } catch (_) {}
  }

  function bindLocationSync(applyFn) {
    if (typeof applyFn !== 'function') return;
    applyFn(readLocation());
    if (bindLocationSync._bound) return;
    bindLocationSync._bound = true;
    global.addEventListener('storage', function (e) {
      if (e.key === STORAGE_KEY && e.newValue) applyFn(normalize(e.newValue));
    });
    global.addEventListener('_vslLocationChanged', function (e) {
      if (e.detail && e.detail.location) applyFn(normalize(e.detail.location));
    });
  }

  function injectStyles() {
    if (global.document.getElementById('vsl-location-styles')) return;
    var style = global.document.createElement('style');
    style.id = 'vsl-location-styles';
    style.textContent = [
      '.vsl-dallas-soon[hidden]{display:none!important}',
      '.vsl-dallas-soon{max-width:min(720px,100%);margin:clamp(2.5rem,6vh,4rem) auto;padding:clamp(1.75rem,4vw,2.75rem);text-align:center;border-radius:18px;border:1px solid rgba(253,199,12,.35);background:rgba(16,24,43,.06);color:#10182B}',
      '.vsl-loc--dallas .vsl-dallas-soon:not([hidden]){display:block}',
      '.vsl-dallas-soon--on-dark{border-color:rgba(253,199,12,.35);background:rgba(255,255,255,.06);color:#EAEAEA}',
      '.vsl-dallas-soon__eyebrow{margin:0 0 .65rem;font-family:Khand,system-ui,sans-serif;font-size:.85rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#FDC70C}',
      '.vsl-dallas-soon__title{margin:0 0 .85rem;font-family:Khand,system-ui,sans-serif;font-size:clamp(1.65rem,1.1rem + 2vw,2.25rem);font-weight:600;line-height:1.15}',
      '.vsl-dallas-soon__text{margin:0 0 1.35rem;font-size:clamp(1rem,.9rem + .35vw,1.125rem);line-height:1.55;opacity:.9}',
      '.vsl-dallas-soon__cta{display:inline-flex;align-items:center;justify-content:center;padding:.75rem 1.35rem;border-radius:999px;background:#EE265F;color:#fff!important;font-weight:600;text-decoration:none!important}',
      '.vsl-dallas-soon__cta:hover,.vsl-dallas-soon__cta:focus-visible{filter:brightness(1.06)}'
    ].join('');
    global.document.head.appendChild(style);
  }

  function defaultDallasHtml(title, text) {
    return (
      '<p class="vsl-dallas-soon__eyebrow">Dallas</p>' +
      '<p class="vsl-dallas-soon__title">' + (title || 'Coming to Dallas Summer 2026') + '</p>' +
      '<p class="vsl-dallas-soon__text">' + (text || 'This page is available in Houston today. Get Dallas opening updates\u2014or switch to Houston in the navbar.') + '</p>' +
      '<a class="vsl-dallas-soon__cta" href="' + DALLAS_PAGE + '">Dallas \u2014 Coming Summer 2026</a>'
    );
  }

  /**
   * Houston-only pages: hide [data-vsl-houston-only], show [data-vsl-dallas-soon] when loc=dallas.
   */
  function setupHoustonOnlyPage(root, options) {
    if (!root) return;
    options = options || {};
    injectStyles();
    var houstonSelector = options.houstonSelector || '[data-vsl-houston-only]';
    var dallasSelector = options.dallasSelector || '[data-vsl-dallas-soon]';
    var onDark = options.onDark !== false;

    var dallasEl = root.querySelector(dallasSelector);
    if (!dallasEl) {
      dallasEl = global.document.createElement('div');
      dallasEl.className = 'vsl-dallas-soon' + (onDark ? ' vsl-dallas-soon--on-dark' : '');
      dallasEl.setAttribute('data-vsl-dallas-soon', '');
      dallasEl.setAttribute('role', 'status');
      dallasEl.setAttribute('aria-live', 'polite');
      dallasEl.hidden = true;
      dallasEl.innerHTML = defaultDallasHtml(options.title, options.text);
      var host = root.querySelector('main') || root;
      host.appendChild(dallasEl);
    }

    function apply(loc) {
      var isDallas = loc === 'dallas';
      root.classList.toggle('vsl-loc--dallas', isDallas);
      root.classList.toggle('vsl-loc--houston', !isDallas);
      root.querySelectorAll(houstonSelector).forEach(function (el) {
        el.hidden = isDallas;
        el.setAttribute('aria-hidden', isDallas ? 'true' : 'false');
      });
      dallasEl.hidden = !isDallas;
    }

    bindLocationSync(apply);
  }

  global.VSL_LOCATION = {
    STORAGE_KEY: STORAGE_KEY,
    DALLAS_PAGE: DALLAS_PAGE,
    normalize: normalize,
    readLocation: readLocation,
    bootstrap: bootstrap,
    bindLocationSync: bindLocationSync,
    setupHoustonOnlyPage: setupHoustonOnlyPage
  };
  global.vslReadLocation = readLocation;
  global.vslBootstrapLocationFromUrl = bootstrap;

  injectStyles();
  bootstrap();
})(window);
