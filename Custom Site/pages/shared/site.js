/* ========================================================================
   Velocity CMS-Native Site JS
   - Injects shared navbar/footer
   - Handles CMS hydration for the current page
   - Manages location switching (Houston/Dallas)
   - Renders banners, FAQ accordion, etc.
   ======================================================================== */

(function () {
  'use strict';

  const ACCENT_COLOR = '#EE265F';
  const deploy = typeof window !== 'undefined' && window.__VSL_DEPLOY__ ? window.__VSL_DEPLOY__ : {};
  const params = new URLSearchParams(window.location.search);
  const env = params.get('env') || deploy.env || 'production';
  const API = window.location.origin;

  // Location: URL param > localStorage > default houston
  let currentLoc = params.get('loc') || localStorage.getItem('vslPreferredLocation') || 'houston';
  localStorage.setItem('vslPreferredLocation', currentLoc);

  // Expose for page-specific scripts if needed
  window.VelocitySite = {
    env, loc: currentLoc,
    hydrate, renderAccent, setLocation
  };

  // -----------------------------------------------------------------------
  // Accent text renderer
  // -----------------------------------------------------------------------
  function renderAccent(text) {
    if (typeof text !== 'string') return text;
    return text
      .replace(/\*\*([^*]+)\*\*/g, `<span class="vsl-accent">$1</span>`)
      .replace(/\*([^*]+)\*/g, `<span class="vsl-accent">$1</span>`);
  }

  function setText(el, value) {
    if (!el || value === undefined || value === null) return;
    if (typeof value === 'string' && /\*/.test(value)) {
      el.innerHTML = renderAccent(value);
    } else {
      el.textContent = value;
    }
  }

  function setHTML(el, value) {
    if (!el || value === undefined || value === null) return;
    el.innerHTML = renderAccent(String(value));
  }

  // -----------------------------------------------------------------------
  // Nested value getter with per-location support
  // -----------------------------------------------------------------------
  function get(obj, path) {
    return path.split('.').reduce((o, k) => (o && o[k] !== undefined) ? o[k] : undefined, obj);
  }

  // -----------------------------------------------------------------------
  // Shared navbar injection
  // -----------------------------------------------------------------------
  function injectNavbar(currentPage) {
    const nav = document.getElementById('site-nav-root');
    if (!nav) return;

    const pages = [
      { key: 'home', label: 'Home', url: '/' },
      { key: 'about', label: 'How it Works', url: '/about' },
      { key: 'food-drink', label: 'Menu', url: '/food-drink' },
      { key: 'parties-events', label: 'Events', url: '/parties-events' },
      { key: 'membership', label: 'Membership', url: '/membership' },
      { key: 'promotions', label: 'Promotions', url: '/promotions' },
      { key: 'contact', label: 'Contact', url: '/contact' }
    ];

    nav.innerHTML = `
      <nav class="site-nav">
        <div class="container">
          <a href="/" class="nav-logo">Velocity<span>.</span></a>
          <div class="nav-links">
            ${pages.map(p => `<a href="${p.url}${preserveQuery()}" class="${p.key === currentPage ? 'active' : ''}">${p.label}</a>`).join('')}
            <div class="loc-switcher" role="group" aria-label="Location">
              <button data-loc="houston" class="${currentLoc === 'houston' ? 'active' : ''}">Houston</button>
              <button data-loc="dallas" class="${currentLoc === 'dallas' ? 'active' : ''}">Dallas</button>
            </div>
            <a href="/book-now${preserveQuery()}" class="nav-cta">Book Now</a>
          </div>
        </div>
      </nav>
    `;

    nav.querySelectorAll('.loc-switcher button').forEach(btn => {
      btn.addEventListener('click', () => setLocation(btn.dataset.loc));
    });
  }

  function preserveQuery() {
    const qs = [];
    if (env === 'staging') qs.push('env=staging');
    return qs.length ? '?' + qs.join('&') : '';
  }

  function setLocation(loc) {
    if (loc !== 'houston' && loc !== 'dallas') return;
    currentLoc = loc;
    localStorage.setItem('vslPreferredLocation', loc);
    // Reload to re-hydrate with new location content
    const url = new URL(window.location);
    url.searchParams.set('loc', loc);
    window.location.href = url.toString();
  }

  // -----------------------------------------------------------------------
  // Shared footer injection
  // -----------------------------------------------------------------------
  function injectFooter() {
    const footer = document.getElementById('site-footer-root');
    if (!footer) return;

    footer.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <p>&copy; ${new Date().getFullYear()} Velocity Sim Racing Lounge</p>
          <p>Houston &amp; Dallas (coming summer 2026)</p>
        </div>
      </footer>
    `;
  }

  // -----------------------------------------------------------------------
  // Staging indicator
  // -----------------------------------------------------------------------
  function injectStagingIndicator() {
    if (env !== 'staging' && !deploy.banner) return;
    const el = document.createElement('div');
    el.className = 'staging-indicator';
    el.textContent = deploy.siteUrl
      ? `Staging environment — ${deploy.siteUrl} — not the live site`
      : 'Staging Preview — Changes are not live on the public website';
    document.body.prepend(el);
  }

  // -----------------------------------------------------------------------
  // CMS hydration
  // -----------------------------------------------------------------------
  async function hydrate(pageKey) {
    if (!pageKey) pageKey = document.body.dataset.page;
    if (!pageKey) return;

    try {
      const url = `${API}/api/content/${pageKey}?env=${env}&loc=${currentLoc}`;
      const res = await fetch(url);
      if (!res.ok) {
        console.warn('[CMS] Content fetch failed:', pageKey);
        return;
      }
      const content = await res.json();

      // Walk the DOM and apply content to every [data-cms] element
      hydrateNode(document.body, content);

      // Banners
      await loadBanners();

      // SEO
      if (content._seo) hydrateSEO(content._seo);

      // Wire up FAQ accordion
      wireFAQ();

    } catch (err) {
      console.warn('[CMS] Hydration error:', err);
    }
  }

  function hydrateNode(root, content) {
    // Plain text
    root.querySelectorAll('[data-cms]').forEach(el => {
      const value = get(content, el.dataset.cms);
      setText(el, value);
    });

    // HTML (preserves/adds tags)
    root.querySelectorAll('[data-cms-html]').forEach(el => {
      setHTML(el, get(content, el.dataset.cmsHtml));
    });

    // Image src
    root.querySelectorAll('[data-cms-src]').forEach(el => {
      const value = get(content, el.dataset.cmsSrc);
      if (value) el.src = value;
    });

    // Background image
    root.querySelectorAll('[data-cms-bg]').forEach(el => {
      const value = get(content, el.dataset.cmsBg);
      if (value) el.style.backgroundImage = `url(${value})`;
    });

    // Href
    root.querySelectorAll('[data-cms-href]').forEach(el => {
      const value = get(content, el.dataset.cmsHref);
      if (value) el.href = value;
    });

    // Conditional visibility
    root.querySelectorAll('[data-cms-if]').forEach(el => {
      const value = get(content, el.dataset.cmsIf);
      el.style.display = (value === undefined || value === null || value === '' || value === false) ? 'none' : '';
    });

    // Repeaters
    root.querySelectorAll('[data-cms-repeat]').forEach(el => {
      if (el.dataset.cmsRepeatTemplate === 'true') return;
      const path = el.dataset.cmsRepeat;
      const items = get(content, path);
      if (!Array.isArray(items)) return;

      // Mark and hide template
      el.dataset.cmsRepeatTemplate = 'true';
      const template = el.cloneNode(true);
      template.removeAttribute('data-cms-repeat-template');
      el.style.display = 'none';

      // Remove any previously rendered clones
      const parent = el.parentNode;
      parent.querySelectorAll(`[data-cms-repeat-clone="${path}"]`).forEach(c => c.remove());

      // Render each item
      items.forEach(item => {
        const clone = template.cloneNode(true);
        clone.removeAttribute('data-cms-repeat');
        clone.dataset.cmsRepeatClone = path;
        clone.style.display = '';

        // Handle attributes on the item element itself (e.g. <a href>)
        const itemHrefAttr = clone.getAttribute('data-cms-field-href-self');
        if (itemHrefAttr && item[itemHrefAttr] !== undefined) clone.href = item[itemHrefAttr];

        // Some cards are anchor tags where data-cms-field-href is on the root
        if (clone.tagName === 'A' && clone.dataset.cmsFieldHref) {
          const v = item[clone.dataset.cmsFieldHref];
          if (v) clone.href = v;
          clone.removeAttribute('data-cms-field-href');
        }

        // Fill clone with item data using data-cms-field
        clone.querySelectorAll('[data-cms-field]').forEach(f => setText(f, item[f.dataset.cmsField]));
        clone.querySelectorAll('[data-cms-field-html]').forEach(f => setHTML(f, item[f.dataset.cmsFieldHtml]));
        clone.querySelectorAll('[data-cms-field-src]').forEach(f => {
          const v = item[f.dataset.cmsFieldSrc]; if (v) f.src = v;
        });
        clone.querySelectorAll('[data-cms-field-bg]').forEach(f => {
          const v = item[f.dataset.cmsFieldBg]; if (v) f.style.backgroundImage = `url(${v})`;
        });
        clone.querySelectorAll('[data-cms-field-href]').forEach(f => {
          const v = item[f.dataset.cmsFieldHref]; if (v) f.href = v;
        });
        clone.querySelectorAll('[data-cms-field-if]').forEach(f => {
          const v = item[f.dataset.cmsFieldIf];
          f.style.display = (v === undefined || v === null || v === '' || v === false) ? 'none' : '';
        });
        // Lines (split a string by \n into <li>s)
        clone.querySelectorAll('[data-cms-field-lines]').forEach(f => {
          const v = item[f.dataset.cmsFieldLines];
          if (typeof v !== 'string') return;
          f.innerHTML = '';
          v.split('\n').filter(Boolean).forEach(line => {
            const li = document.createElement('li');
            li.innerHTML = renderAccent(line);
            f.appendChild(li);
          });
        });

        parent.insertBefore(clone, el);
      });
    });

    // Lines on non-repeater elements (creates plain child text)
    root.querySelectorAll('[data-cms-lines]').forEach(el => {
      const value = get(content, el.dataset.cmsLines);
      if (typeof value !== 'string') return;
      el.innerHTML = value.split('\n').filter(Boolean).map(l => renderAccent(l)).join('<br>');
    });

    // Lines as list items (replaces all <li> children)
    root.querySelectorAll('[data-cms-lines-items]').forEach(el => {
      const value = get(content, el.dataset.cmsLinesItems);
      if (!value) return;
      const lines = Array.isArray(value) ? value : String(value).split('\n').filter(Boolean);
      if (lines.length === 0) return;

      // Preserve the structure of the first existing <li> if any
      const firstLi = el.querySelector('li');
      const liTemplate = firstLi ? firstLi.cloneNode(true) : null;

      // Clear existing items
      el.querySelectorAll('li').forEach(li => li.remove());

      lines.forEach(line => {
        const li = liTemplate ? liTemplate.cloneNode(true) : document.createElement('li');
        // Find text node and update it, keeping any icons
        const textNode = findLastTextNode(li) || li;
        if (textNode.nodeType === 3) {
          textNode.textContent = ' ' + line;
        } else {
          // Append text if no text node found
          const span = document.createElement('span');
          span.innerHTML = renderAccent(line);
          li.appendChild(span);
        }
        el.appendChild(li);
      });
    });
  }

  function findLastTextNode(el) {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    let last = null;
    while (walker.nextNode()) {
      if (walker.currentNode.textContent.trim()) last = walker.currentNode;
    }
    return last;
  }

  // -----------------------------------------------------------------------
  // Banners
  // -----------------------------------------------------------------------
  async function loadBanners() {
    try {
      const res = await fetch(`${API}/api/banners?loc=${currentLoc}`);
      if (!res.ok) return;
      const banners = await res.json();
      renderBanners(banners);
    } catch {}
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
      el.style.cssText = `padding:10px 20px;display:flex;align-items:center;justify-content:space-between;background:${style.bg};color:${style.text};border-bottom:1px solid ${style.border};font-size:0.8125rem;`;
      el.innerHTML = `<span>${banner.text}</span>`;
      if (banner.dismissable) {
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '×';
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
  // SEO
  // -----------------------------------------------------------------------
  function hydrateSEO(seo) {
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
  // FAQ accordion
  // -----------------------------------------------------------------------
  function wireFAQ() {
    document.querySelectorAll('.faq-item__trigger').forEach(btn => {
      if (btn.dataset.wired) return;
      btn.dataset.wired = '1';
      btn.addEventListener('click', () => {
        btn.closest('.faq-item').classList.toggle('is-open');
      });
    });
  }

  // -----------------------------------------------------------------------
  // Wire location switcher into the real Velocity navbar
  // -----------------------------------------------------------------------
  function wireNavbarLocationSwitcher() {
    // The real navbar has buttons with data-location-button attribute
    document.querySelectorAll('[data-location-button]').forEach(btn => {
      const loc = btn.dataset.locationButton;
      if (loc === currentLoc) btn.classList.add('is-active');
      btn.addEventListener('click', e => {
        e.preventDefault();
        setLocation(loc);
      });
    });
    // Handle mobile location anchors too
    document.querySelectorAll('a[data-mobile-location]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        setLocation(a.dataset.mobileLocation);
      });
    });
  }

  // -----------------------------------------------------------------------
  // Init
  // -----------------------------------------------------------------------
  function init() {
    const pageKey = document.body.dataset.page;
    injectStagingIndicator();
    // Inject footer if no real footer present
    if (document.getElementById('site-footer-root')) injectFooter();
    hydrate(pageKey);
    // Wire navbar after a brief delay so the navbar script has time to inject
    setTimeout(wireNavbarLocationSwitcher, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
