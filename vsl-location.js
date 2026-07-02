/**
 * Velocity site-wide location helper (path /dallas/... + legacy ?loc=).
 * Upload to WordPress (e.g. wp-content/uploads/2026/06/vsl-location.js)
 * and include via <script src="..."> in navbar + each page HTML widget.
 */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'vslPreferredLocation';
  var SITE_ORIGIN = 'https://velocitysimlounge.com';
  var DALLAS_PAGE = SITE_ORIGIN + '/dallas/';

  var DALLAS_PAGES = [
    'home', 'party-packs', 'book-now', 'contact', 'group-events',
    'corporate-events', 'food-and-drink', 'semi-private', 'promotions', 'buyout'
  ];

  var HOUSTON_ONLY_SLUGS = {
    about: true,
    membership: true,
    ignition: true,
    'summer-special': true,
    'fathers-day': true,
    'spring-bundles': true,
    'menu-2025': true,
    blog: true
  };

  var INTERNAL_PATH_SLUGS = {
    '/': 'home',
    '/about/': 'about',
    '/book-now/': 'book-now',
    '/contact/': 'contact',
    '/membership/': 'membership',
    '/food-and-drink/': 'food-and-drink',
    '/ignition/': 'ignition',
    '/group-events/': 'group-events',
    '/corporate-events/': 'corporate-events',
    '/party-packs/': 'party-packs',
    '/semi-private/': 'semi-private',
    '/promotions/': 'promotions',
    '/buyout/': 'buyout',
    '/summer-special/': 'summer-special',
    '/fathers-day/': 'fathers-day',
    '/spring-bundles/': 'fathers-day',
    '/blog/': 'blog',
    '/dallas/': 'home',
    '/dallas/book-now/': 'book-now',
    '/dallas/contact/': 'contact',
    '/dallas/food-and-drink/': 'food-and-drink',
    '/dallas/group-events/': 'group-events',
    '/dallas/corporate-events/': 'corporate-events',
    '/dallas/party-packs/': 'party-packs',
    '/dallas/semi-private/': 'semi-private',
    '/dallas/promotions/': 'promotions',
    '/dallas/buyout/': 'buyout'
  };

  function normalize(key) {
    return key === 'dallas' ? 'dallas' : 'houston';
  }

  function normalizePathname(pathname) {
    if (!pathname) return '/';
    var p = pathname.split('?')[0].split('#')[0];
    if (p.length > 1 && p.charAt(p.length - 1) !== '/') return p + '/';
    return p;
  }

  function readFromPath() {
    try {
      if (/^\/dallas(\/|$)/.test(global.location.pathname)) return 'dallas';
    } catch (_) {}
    return null;
  }

  function readFromUrlParam() {
    try {
      var q = new URLSearchParams(global.location.search).get('loc');
      if (!q) return null;
      q = String(q).toLowerCase();
      if (q === 'dallas' || q === 'houston') return q;
    } catch (_) {}
    return null;
  }

  function readFromStagingPageKey() {
    try {
      if (!global.__VSL_SITE_REPLICA__) return null;
      var p = new URLSearchParams(global.location.search).get('p') || '';
      if (p.indexOf('dallas-') === 0 || p === 'dallas-home') return 'dallas';
    } catch (_) {}
    return null;
  }

  function readLocation() {
    var fromPath = readFromPath() || readFromStagingPageKey();
    if (fromPath) {
      try { global.localStorage.setItem(STORAGE_KEY, fromPath); } catch (_) {}
      return normalize(fromPath);
    }
    var fromUrl = readFromUrlParam();
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

  function getPageSlug() {
    try {
      if (global.__VSL_SITE_REPLICA__) {
        var p = new URLSearchParams(global.location.search).get('p') || 'home';
        if (p === 'spring-bundles') return 'fathers-day';
        if (p.indexOf('dallas-') === 0) {
          var dSlug = p.slice(7);
          if (dSlug === 'home') return 'home';
          if (dSlug === 'parties-events') return 'group-events';
          if (dSlug === 'food-drink') return 'food-and-drink';
          return dSlug;
        }
        if (p === 'parties-events') return 'group-events';
        if (p === 'food-drink') return 'food-and-drink';
        return p;
      }
      var path = normalizePathname(global.location.pathname);
      if (INTERNAL_PATH_SLUGS[path]) return INTERNAL_PATH_SLUGS[path];
      if (/^\/dallas\/([^/]+)\/?$/.test(path)) {
        return path.replace(/^\/dallas\//, '').replace(/\/$/, '');
      }
      if (path === '/dallas/' || path === '/dallas') return 'home';
      if (path === '/') return 'home';
    } catch (_) {}
    return 'home';
  }

  function getLocationPrefix(loc) {
    return normalize(loc) === 'dallas' ? '/dallas' : '';
  }

  function buildLocationUrl(loc, slug) {
    loc = normalize(loc);
    slug = slug || getPageSlug();
    if (loc === 'dallas' && DALLAS_PAGES.indexOf(slug) === -1) slug = 'home';
    if (loc === 'houston' && slug === 'home') return SITE_ORIGIN + '/';
    if (loc === 'dallas' && slug === 'home') return DALLAS_PAGE;
    var prefix = loc === 'dallas' ? '/dallas' : '';
    return SITE_ORIGIN + prefix + '/' + slug + '/';
  }

  function isDallasPath() {
    return readFromPath() === 'dallas' || readFromStagingPageKey() === 'dallas';
  }

  function rewriteInternalHref(href, loc) {
    if (!href || href.charAt(0) === '#') return href;
    if (/^(mailto:|tel:|javascript:)/i.test(href)) return href;
    loc = normalize(loc || readLocation());
    var prefix = getLocationPrefix(loc);

    try {
      var u = new URL(href, global.location.href);
      var isSite =
        u.hostname === 'velocitysimlounge.com' ||
        u.hostname === 'www.velocitysimlounge.com';
      if (!isSite) return href;

      var path = normalizePathname(u.pathname);
      var slug = INTERNAL_PATH_SLUGS[path];
      if (!slug && /^\/dallas\/([^/]+)\/?$/.test(path)) {
        slug = path.replace(/^\/dallas\//, '').replace(/\/$/, '');
      }
      if (!slug && (path === '/dallas/' || path === '/dallas')) slug = 'home';
      if (!slug && path === '/') slug = 'home';

      if (!slug) return href;
      if (HOUSTON_ONLY_SLUGS[slug]) return href;

      if (loc === 'dallas') {
        if (slug === 'home') return DALLAS_PAGE + u.hash;
        return SITE_ORIGIN + '/dallas/' + slug + '/' + u.hash;
      }
      if (slug === 'home') return SITE_ORIGIN + '/' + u.hash;
      return SITE_ORIGIN + '/' + slug + '/' + u.hash;
    } catch (_) {
      return href;
    }
  }

  function bootstrap() {
    var fromUrl = readFromUrlParam();
    var fromPath = readFromPath() || readFromStagingPageKey();
    var loc = fromPath || fromUrl;
    if (!loc) return;
    try { global.localStorage.setItem(STORAGE_KEY, loc); } catch (_) {}
    try {
      global.dispatchEvent(new CustomEvent('_vslLocationChanged', { detail: { location: loc } }));
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
    SITE_ORIGIN: SITE_ORIGIN,
    DALLAS_PAGE: DALLAS_PAGE,
    DALLAS_PAGES: DALLAS_PAGES,
    normalize: normalize,
    readFromPath: readFromPath,
    readLocation: readLocation,
    getPageSlug: getPageSlug,
    getLocationPrefix: getLocationPrefix,
    buildLocationUrl: buildLocationUrl,
    rewriteInternalHref: rewriteInternalHref,
    isDallasPath: isDallasPath,
    bootstrap: bootstrap,
    bindLocationSync: bindLocationSync,
    setupHoustonOnlyPage: setupHoustonOnlyPage
  };
  global.vslReadLocation = readLocation;
  global.vslBootstrapLocationFromUrl = bootstrap;

  injectStyles();
  bootstrap();
})(window);
