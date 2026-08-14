/* Velocity Staging Site router */
(function () {
  window.__VSL_SITE_REPLICA__ = true;
  var REPLICA_PAGES = {
    home: { title: "Home", modulePath: "../Home/velocity-home-elementor.html" },
    about: { title: "About", modulePath: "../About : How it Works Page_files/velocity-about-how-it-works-elementor.html" },
    "book-now": { title: "Book Now", modulePath: "../Book Now/velocity-book-now-elementor.html" },
    contact: { title: "Contact", modulePath: "../Contact/velocity-contact-elementor.html" },
    "corporate-events": { title: "Corporate Events", modulePath: "../Corporate Events/velocity-corporate-events-elementor.html" },
    "food-drink": { title: "Food & Drink", modulePath: "../Food & Drink/velocity-food-drink-elementor.html" },
    ignition: { title: "Ignition", modulePath: "../Ignition/velocity-ignition-elementor.html" },
    "menu-2025": { title: "Menu 2025", modulePath: "../Food & Drink/velocity-menu-2025.html" },
    membership: { title: "Membership", modulePath: "../Membership Page/velocity-membership-elementor.html" },
    "parties-events": { title: "Group Events", modulePath: "../Parties & Events/velocity-parties-events-elementor.html" },
    "party-packs": { title: "Party Packs", modulePath: "../Party Packs/velocity-party-packs-elementor.html" },
    "semi-private": { title: "Semi-Private", modulePath: "../Semi-Private/velocity-semi-private-elementor.html" },
    "fathers-day": { title: "Father's Day Bundles", modulePath: "../Bundles Page/velocity-fathers-day-elementor.html" },
    "summer-special": { title: "Student Summer Special", modulePath: "../Summer Special/velocity-summer-special-elementor.html" },
    "promotions": { title: "Promotions", modulePath: "../Promotions/velocity-promotions-elementor.html" },
    "buyout": { title: "Full Venue Buyout", modulePath: "../Buyout/velocity-buyout-elementor.html" },
    "dallas-home": { title: "Dallas Home", modulePath: "../Dallas/Home/velocity-home-elementor.html" },
    "dallas-book-now": { title: "Dallas Book Now", modulePath: "../Dallas/Book Now/velocity-book-now-elementor.html" },
    "dallas-contact": { title: "Dallas Contact", modulePath: "../Dallas/Contact/velocity-contact-elementor.html" },
    "dallas-corporate-events": { title: "Dallas Corporate Events", modulePath: "../Dallas/Corporate Events/velocity-corporate-events-elementor.html" },
    "dallas-food-drink": { title: "Dallas Food & Drink", modulePath: "../Dallas/Food & Drink/velocity-food-drink-elementor.html" },
    "dallas-parties-events": { title: "Dallas Group Events", modulePath: "../Dallas/Parties & Events/velocity-parties-events-elementor.html" },
    "dallas-party-packs": { title: "Dallas Party Packs", modulePath: "../Dallas/Party Packs/velocity-party-packs-elementor.html" },
    "dallas-semi-private": { title: "Dallas Semi-Private", modulePath: "../Dallas/Semi-Private/velocity-semi-private-elementor.html" },
    "dallas-promotions": { title: "Dallas Promotions", modulePath: "../Dallas/Promotions/velocity-promotions-elementor.html" },
    "dallas-buyout": { title: "Dallas Buyout", modulePath: "../Dallas/Buyout/velocity-buyout-elementor.html" }
  };

  var NAV_PATH_MAP = {
    "/": "index.html?p=home",
    "/about/": "index.html?p=about",
    "/about": "index.html?p=about",
    "/book-now/": "index.html?p=book-now",
    "/book-now": "index.html?p=book-now",
    "/contact/": "index.html?p=contact",
    "/contact": "index.html?p=contact",
    "/membership/": "index.html?p=membership",
    "/membership": "index.html?p=membership",
    "/food-and-drink/": "index.html?p=food-drink",
    "/food-and-drink": "index.html?p=food-drink",
    "/ignition/": "index.html?p=ignition",
    "/ignition": "index.html?p=ignition",
    "/Food%20%26%20Drink/velocity-menu-2025.html": "index.html?p=menu-2025",
    "/Food & Drink/velocity-menu-2025.html": "index.html?p=menu-2025",
    "/group-events/": "index.html?p=parties-events",
    "/group-events": "index.html?p=parties-events",
    "/corporate-events/": "index.html?p=corporate-events",
    "/corporate-events": "index.html?p=corporate-events",
    "/party-packs/": "index.html?p=party-packs",
    "/party-packs": "index.html?p=party-packs",
    "/semi-private/": "index.html?p=semi-private",
    "/semi-private": "index.html?p=semi-private",
    "/fathers-day/": "index.html?p=fathers-day",
    "/fathers-day": "index.html?p=fathers-day",
    "/spring-bundles/": "index.html?p=fathers-day",
    "/spring-bundles": "index.html?p=fathers-day",
    "/summer-special/": "index.html?p=summer-special",
    "/summer-special": "index.html?p=summer-special",
    "/Summer Special/velocity-summer-special-elementor.html": "index.html?p=summer-special",
    "/VelocityStagingSite/Summer Special/velocity-summer-special-elementor.html": "index.html?p=summer-special",
    "/promotions/": "index.html?p=promotions",
    "/promotions": "index.html?p=promotions",
    "/Promotions/velocity-promotions-elementor.html": "index.html?p=promotions",
    "/VelocityStagingSite/Promotions/velocity-promotions-elementor.html": "index.html?p=promotions",
    "/buyout/": "index.html?p=buyout",
    "/buyout": "index.html?p=buyout",
    "/dallas/": "index.html?p=dallas-home",
    "/dallas": "index.html?p=dallas-home",
    "/dallas/book-now/": "index.html?p=dallas-book-now",
    "/dallas/book-now": "index.html?p=dallas-book-now",
    "/dallas/contact/": "index.html?p=dallas-contact",
    "/dallas/contact": "index.html?p=dallas-contact",
    "/dallas/corporate-events/": "index.html?p=dallas-corporate-events",
    "/dallas/corporate-events": "index.html?p=dallas-corporate-events",
    "/dallas/food-and-drink/": "index.html?p=dallas-food-drink",
    "/dallas/food-and-drink": "index.html?p=dallas-food-drink",
    "/dallas/group-events/": "index.html?p=dallas-parties-events",
    "/dallas/group-events": "index.html?p=dallas-parties-events",
    "/dallas/party-packs/": "index.html?p=dallas-party-packs",
    "/dallas/party-packs": "index.html?p=dallas-party-packs",
    "/dallas/semi-private/": "index.html?p=dallas-semi-private",
    "/dallas/semi-private": "index.html?p=dallas-semi-private",
    "/dallas/promotions/": "index.html?p=dallas-promotions",
    "/dallas/promotions": "index.html?p=dallas-promotions",
    "/dallas/buyout/": "index.html?p=dallas-buyout",
    "/dallas/buyout": "index.html?p=dallas-buyout"
  };
  var EXTERNAL_LOCAL_MAP = {
    /* book.velocitysimlounge.com (Roverd) must keep real https URLs — the Book Now page
       sets modal iframe src from link href; rewriting to index.html?p=book-now loads the
       replica inside the iframe and breaks in-flow booking. */
    // Inquiry forms on Tripleseat: keep mapped to local Group Events for replica UX
    // "velocitysimracinglounge.tripleseat.com" intentionally omitted if staging differs
  };

  /** Browser tab: 'Page name' : Velocity Staging Site */
  function replicaDocumentTitle(pageTitle) {
    return "'" + pageTitle + "' : Velocity Staging Site";
  }

  function getRepoRootUrl() {
    var script = document.querySelector('script[src*="replica-app.js"]');
    if (script && script.src) {
      try {
        return new URL("../", script.src).href;
      } catch (e) {}
    }
    return new URL("../", window.location.href).href;
  }

  /** Fetch repo assets; tries .html path then extensionless (serve cleanUrls fallback). */
  function fetchReplicaText(relativePath, label) {
    var rel = String(relativePath || "").replace(/^\.\.\//, "");
    var repoRoot = getRepoRootUrl();
    var urls = [
      new URL(rel, repoRoot).href,
      new URL(rel.replace(/\.html(?=[?#]|$)/, ""), repoRoot).href
    ];
    var i = 0;
    function attempt() {
      if (i >= urls.length) {
        return Promise.reject(new Error("Failed to fetch " + (label || rel)));
      }
      var url = urls[i++];
      return fetch(url, { cache: "no-store" }).then(function (res) {
        if (!res.ok) return attempt();
        return res.text();
      }, function () {
        return attempt();
      });
    }
    return attempt();
  }

  /* Keep in sync with velocity-navbar.html HOUSTON_ONLY_SLUGS */
  var HOUSTON_ONLY_SLUGS = {
    about: 1,
    membership: 1,
    ignition: 1,
    "summer-special": 1,
    "fathers-day": 1,
    "spring-bundles": 1,
    "menu-2025": 1,
    blog: 1
  };

  var REPLICA_SLUG_PAGE_KEYS = {
    home: { houston: "home", dallas: "dallas-home" },
    "party-packs": { houston: "party-packs", dallas: "dallas-party-packs" },
    "book-now": { houston: "book-now", dallas: "dallas-book-now" },
    contact: { houston: "contact", dallas: "dallas-contact" },
    "group-events": { houston: "parties-events", dallas: "dallas-parties-events" },
    "corporate-events": { houston: "corporate-events", dallas: "dallas-corporate-events" },
    "food-and-drink": { houston: "food-drink", dallas: "dallas-food-drink" },
    "semi-private": { houston: "semi-private", dallas: "dallas-semi-private" },
    promotions: { houston: "promotions", dallas: "dallas-promotions" },
    buyout: { houston: "buyout", dallas: "dallas-buyout" },
    about: { houston: "about", dallas: "dallas-home" },
    membership: { houston: "membership", dallas: "dallas-home" },
    ignition: { houston: "ignition", dallas: "dallas-contact" },
    "summer-special": { houston: "summer-special", dallas: "dallas-home" },
    "fathers-day": { houston: "fathers-day", dallas: "dallas-home" }
  };

  window.VSL_REPLICA_BUILD_URL = function (loc, slug) {
    loc = loc === "dallas" ? "dallas" : "houston";
    /* Houston-only pages always resolve to Houston replica keys (matches production nav rewrite). */
    if (HOUSTON_ONLY_SLUGS[slug]) loc = "houston";
    var dallasPages = ["home", "party-packs", "book-now", "contact", "group-events", "corporate-events", "food-and-drink", "semi-private", "promotions", "buyout"];
    if (loc === "dallas" && dallasPages.indexOf(slug) === -1) slug = "home";
    var map = REPLICA_SLUG_PAGE_KEYS[slug];
    var key = map ? map[loc] : (loc === "dallas" ? "dallas-home" : "home");
    return "index.html?p=" + key;
  };

  /* Explicit map — do not derive from REPLICA_SLUG_PAGE_KEYS (many slugs share dallas-home). */
  var REPLICA_PAGE_KEY_TO_SLUG = {
    home: "home",
    about: "about",
    "book-now": "book-now",
    contact: "contact",
    "food-drink": "food-and-drink",
    ignition: "ignition",
    "menu-2025": "menu-2025",
    membership: "membership",
    "parties-events": "group-events",
    "party-packs": "party-packs",
    "semi-private": "semi-private",
    "corporate-events": "corporate-events",
    "fathers-day": "fathers-day",
    "summer-special": "summer-special",
    promotions: "promotions",
    buyout: "buyout",
    "dallas-home": "home",
    "dallas-book-now": "book-now",
    "dallas-contact": "contact",
    "dallas-food-drink": "food-and-drink",
    "dallas-parties-events": "group-events",
    "dallas-party-packs": "party-packs",
    "dallas-semi-private": "semi-private",
    "dallas-corporate-events": "corporate-events",
    "dallas-promotions": "promotions",
    "dallas-buyout": "buyout"
  };

  function replicaSlugFromNavHref(href) {
    if (!href || href.charAt(0) === "#") return null;
    if (/instagram|facebook|tiktok|maps\.|google\.|tripleseat|book-/.test(href)) return null;

    var hashIdx = href.indexOf("#");
    var hrefPath = hashIdx !== -1 ? href.slice(0, hashIdx) : href;

    var qMatch = hrefPath.match(/[?&]p=([^&#]+)/i);
    if (qMatch) {
      var pk = decodeURIComponent(qMatch[1]).toLowerCase();
      if (pk === "spring-bundles") pk = "fathers-day";
      return REPLICA_PAGE_KEY_TO_SLUG[pk] || null;
    }

    if (hrefPath.indexOf("velocitysimlounge.com") !== -1) {
      try {
        var u = new URL(hrefPath, window.location.href);
        var path = u.pathname.replace(/\/+$/, "").toLowerCase();
        if (!path || path === "/") return "home";
        var dallasMatch = path.match(/\/dallas\/([^/]+)$/);
        if (dallasMatch) return dallasMatch[1];
        if (path === "/dallas") return "home";
        var parts = path.split("/").filter(Boolean);
        var last = parts[parts.length - 1];
        if (last === "index.html" && parts.length > 1) last = parts[parts.length - 2];
        if (last === "spring-bundles") return "fathers-day";
        return last || "home";
      } catch (e) {}
    }

    return null;
  }

  function replicaHrefFromSiteUrl(href, loc) {
    if (!href) return null;
    if (/instagram|facebook|tiktok|maps\.|google\.|tripleseat|book-/.test(href)) return null;
    if (window.VSL_LOCATION && href.indexOf("velocitysimlounge.com") !== -1) {
      return toLocalHref(window.VSL_LOCATION.rewriteInternalHref(href, loc));
    }
    return toLocalHref(href);
  }

  window.VSL_REPLICA_TO_LOCAL_HREF = toLocalHref;

  window.VSL_REPLICA_BOOKING_HREF = function (loc) {
    return loc === "dallas" ? "index.html?p=dallas-book-now" : "index.html?p=book-now";
  };

  window.VSL_REPLICA_APPLY_NAV_LINKS = function (loc) {
    loc = loc === "dallas" ? "dallas" : "houston";
    var root = document.getElementById("replica-navbar-root") || document;

    root.querySelectorAll("a[href]").forEach(function (a) {
      var href = a.getAttribute("href");
      if (!href || href.charAt(0) === "#") return;

      var hash = "";
      var hashIdx = href.indexOf("#");
      if (hashIdx !== -1) hash = href.slice(hashIdx);

      var slug = replicaSlugFromNavHref(href);
      if (slug && window.VSL_REPLICA_BUILD_URL) {
        a.setAttribute("href", window.VSL_REPLICA_BUILD_URL(loc, slug) + hash);
        return;
      }

      if (href.indexOf("velocitysimlounge.com") !== -1) {
        var local = replicaHrefFromSiteUrl(href, loc);
        if (local) a.setAttribute("href", local);
      }
    });

    root.querySelectorAll('a[href="https://velocitysimlounge.com/dallas"]').forEach(function (a) {
      a.setAttribute("href", loc === "dallas" ? "index.html?p=dallas-home" : "index.html?p=home");
    });
    var logo = root.querySelector(".vsl-navbar__logo");
    if (logo) logo.setAttribute("href", loc === "dallas" ? "index.html?p=dallas-home" : "index.html?p=home");
  };

  window.VSL_REPLICA_APPLY_FOOTER_LINKS = function (loc) {
    loc = loc === "dallas" ? "dallas" : "houston";
    var root = document.getElementById("replica-footer-root");
    if (!root) return;
    root.querySelectorAll("[data-footer-nav]").forEach(function (a) {
      var href = a.getAttribute("href");
      if (!href) return;

      var hash = "";
      var hashIdx = href.indexOf("#");
      if (hashIdx !== -1) hash = href.slice(hashIdx);

      var slug = replicaSlugFromNavHref(href);
      if (slug && window.VSL_REPLICA_BUILD_URL) {
        a.setAttribute("href", window.VSL_REPLICA_BUILD_URL(loc, slug) + hash);
        return;
      }

      if (href.indexOf("velocitysimlounge.com") !== -1) {
        var local = replicaHrefFromSiteUrl(href, loc);
        if (local) a.setAttribute("href", local);
      }
    });
    var logo = root.querySelector(".vsl-site-footer__logo");
    if (logo) {
      var localHome = window.VSL_REPLICA_BUILD_URL
        ? window.VSL_REPLICA_BUILD_URL(loc, "home")
        : replicaHrefFromSiteUrl("https://velocitysimlounge.com/", loc);
      if (localHome) logo.setAttribute("href", localHome);
    }
  };

  var navbarRoot = document.getElementById("replica-navbar-root");
  var pageRoot = document.getElementById("replica-page-root");
  var footerRoot = document.getElementById("replica-footer-root");
  var params = new URLSearchParams(window.location.search);
  var pageKey = params.get("p") || "home";
  if (pageKey === "spring-bundles") pageKey = "fathers-day";
  var forcedLoc = params.get("loc");
  var revealObserver = null;
  var moduleCache = Object.create(null);
  var pageLoadToken = 0;
  var routerReady = false;

  if (!REPLICA_PAGES[pageKey]) pageKey = "home";

  var MEGA_CARD_IMAGES = [
    "https://velocitysimlounge.com/wp-content/uploads/2026/01/premium-motion-sim-racing-simulator-1024x576.jpg",
    "https://velocitysimlounge.com/wp-content/uploads/2026/04/party_packs_hero-1024x576.webp",
    "https://velocitysimlounge.com/wp-content/uploads/2026/04/how_it_works-1024x576.webp",
    "https://velocitysimlounge.com/wp-content/uploads/2026/04/memberships-1024x576.webp",
    "https://velocitysimlounge.com/wp-content/uploads/2026/04/Corp-page.webp",
    "https://velocitysimlounge.com/wp-content/uploads/2026/04/Velocity_610Launch_QUITNGUYEN_DSCF3971-1024x683.jpg"
  ];

  function normalizePageKey(key) {
    if (!key || key === "spring-bundles") return "fathers-day";
    return REPLICA_PAGES[key] ? key : "home";
  }

  function kickExploreMegaPreloads() {
    if (typeof window.vslWarmMegaMenuAssets === "function") {
      window.vslWarmMegaMenuAssets();
      return;
    }
    MEGA_CARD_IMAGES.forEach(function (url) {
      if (!document.querySelector('link[rel="preload"][href="' + url + '"]')) {
        var link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = url;
        document.head.appendChild(link);
      }
      var img = new Image();
      img.decoding = "async";
      img.src = url;
    });
  }

  kickExploreMegaPreloads();
  fetchModuleHtml(normalizePageKey(pageKey));

  function pageKeyFromLocalHref(href) {
    if (!href || href.charAt(0) === "#") return null;
    var match = String(href).match(/(?:^|\/)index\.html\?p=([^&#]+)/i);
    if (!match) return null;
    return normalizePageKey(decodeURIComponent(match[1]));
  }

  function finalizeModuleMount(html, moduleKey) {
    injectModuleHtml(html, moduleKey);
    var mountPage = function () {
      executeInlineScripts(pageRoot);
      applyLocalLinks(pageRoot);
      notifyReplicaAfterLocalLinks(pageRoot);
      applySectionReveals(pageRoot);
      if (typeof window.vslUpdateNavbarActiveLink === "function") {
        window.vslUpdateNavbarActiveLink();
      }
      if (window.VSL_LOCATION && typeof window.VSL_REPLICA_APPLY_FOOTER_LINKS === "function") {
        window.VSL_REPLICA_APPLY_FOOTER_LINKS(window.VSL_LOCATION.readLocation());
      }
      if (typeof window.vslUpdateFooterActiveNav === "function") {
        window.vslUpdateFooterActiveNav();
      }
    };
    var megaReady = window.vslMegaMenuReady || Promise.resolve();
    megaReady.then(function () {
      requestAnimationFrame(mountPage);
    });
  }

  function fetchModuleHtml(key) {
    if (moduleCache[key]) return Promise.resolve(moduleCache[key]);
    var page = REPLICA_PAGES[key];
    if (!page || !page.modulePath) return Promise.resolve(null);
    var moduleUrl = page.modulePath + (page.modulePath.indexOf("?") >= 0 ? "&" : "?") + "_=" + Date.now();
    return fetchReplicaText(moduleUrl, "page module (" + key + ")").then(function (html) {
      moduleCache[key] = html;
      return html;
    });
  }

  function prefetchModulePage(key) {
    key = normalizePageKey(key);
    if (moduleCache[key]) return;
    fetchModuleHtml(key).catch(function () {});
  }

  function ensureVisibleReveals() {
    if (document.hidden || !pageRoot) return;
    pageRoot.querySelectorAll(".vsl-reveal:not(.is-visible)").forEach(function (section) {
      if (isInViewport(section)) section.classList.add("is-visible");
    });
  }

  function executeInlineScripts(scopeNode) {
    var scripts = scopeNode.querySelectorAll("script");
    scripts.forEach(function (script) {
      var replacement = document.createElement("script");
      if (script.src) {
        replacement.src = script.src;
        if (script.type) replacement.type = script.type;
      } else {
        replacement.textContent = script.textContent;
      }
      Array.prototype.slice.call(script.attributes).forEach(function (attr) {
        if (attr.name !== "src" && attr.name !== "type") replacement.setAttribute(attr.name, attr.value);
      });
      script.parentNode.replaceChild(replacement, script);
    });
  }

  function ensureRevealStyles() {
    if (document.getElementById("vsl-replica-reveal-styles")) return;
    var style = document.createElement("style");
    style.id = "vsl-replica-reveal-styles";
    style.textContent = [
      /* Base: gentle lift. No blur — keeps colors accurate and scroll smooth. */
      ".vsl-reveal{opacity:0;transform:translateY(32px);transition:opacity .7s cubic-bezier(.25,.46,.45,.94),transform .7s cubic-bezier(.25,.46,.45,.94);will-change:opacity,transform;}",
      ".vsl-reveal.is-visible{opacity:1;transform:translateY(0);}",

      /* Slide from left */
      ".vsl-reveal--left{transform:translateX(-40px) translateY(16px);}",
      ".vsl-reveal--left.is-visible{transform:translateX(0) translateY(0);}",

      /* Slide from right */
      ".vsl-reveal--right{transform:translateX(40px) translateY(16px);}",
      ".vsl-reveal--right.is-visible{transform:translateX(0) translateY(0);}",

      /* Scale up (images/media) */
      ".vsl-reveal--scale{transform:translateY(24px) scale(.94);transform-origin:center bottom;}",
      ".vsl-reveal--scale.is-visible{transform:translateY(0) scale(1);}",

      /* Staggered children inside revealed sections */
      ".vsl-reveal [data-vsl-stagger]{opacity:0;transform:translateY(18px);transition:opacity .55s cubic-bezier(.25,.46,.45,.94),transform .55s cubic-bezier(.25,.46,.45,.94);}",
      ".vsl-reveal.is-visible [data-vsl-stagger]{opacity:1;transform:translateY(0);transition-delay:calc(var(--vsl-si,0) * 80ms + 80ms);}",

      /* Hero/first section: always visible immediately */
      ".vsl-reveal--hero{opacity:1 !important;transform:none !important;}",
      ".vsl-reveal--hero [data-vsl-stagger]{opacity:1 !important;transform:none !important;}",

      /* Reduced motion */
      "@media(prefers-reduced-motion:reduce){.vsl-reveal,.vsl-reveal [data-vsl-stagger]{opacity:1!important;transform:none!important;transition:none!important;}}"
    ].join("\n");
    document.head.appendChild(style);
  }

  function clearRevealObserver() {
    if (!revealObserver) return;
    revealObserver.disconnect();
    revealObserver = null;
  }

  function pickVariant(section, idx) {
    if (idx === 0) return "vsl-reveal--hero";
    var hasMedia = !!section.querySelector("img, video, picture");
    if (hasMedia && idx % 2 === 0) return "vsl-reveal--scale";
    var cycle = idx % 3;
    if (cycle === 1) return "vsl-reveal--left";
    if (cycle === 2) return "vsl-reveal--right";
    return "";
  }

  function isInViewport(el) {
    var rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }

  function applySectionReveals(scope) {
    clearRevealObserver();
    ensureRevealStyles();
    if (!scope) return;

    var sections = scope.querySelectorAll("section");
    if (!sections.length) return;

    sections.forEach(function (section, idx) {
      section.classList.remove("vsl-reveal", "is-visible", "vsl-reveal--hero", "vsl-reveal--left", "vsl-reveal--right", "vsl-reveal--scale");
      section.classList.add("vsl-reveal");

      var variant = pickVariant(section, idx);
      if (variant) section.classList.add(variant);

      /* Hero Eat/Drink/Race tiles run their own clip + word reveal — never stagger them */
      if (section.classList.contains("vsl-home-edr")) {
        section.querySelectorAll(".vsl-home-edr__col[data-vsl-stagger]").forEach(function (col) {
          col.removeAttribute("data-vsl-stagger");
          col.style.removeProperty("--vsl-si");
        });
      } else {
        var children = section.querySelectorAll(":scope > div > h2, :scope > div > h3, :scope > div > p, :scope > div > a[class], :scope > div > div > h2, :scope > div > div > h3, :scope > div > div > p");
        var count = 0;
        children.forEach(function (child) {
          if (count >= 6) return;
          if (child.classList.contains("vsl-home-edr__col")) return;
          child.setAttribute("data-vsl-stagger", "");
          child.style.setProperty("--vsl-si", String(count));
          count++;
        });
      }

      if (isInViewport(section)) {
        section.classList.add("is-visible");
      }
    });

    revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -4% 0px" });

    sections.forEach(function (section) {
      if (!section.classList.contains("is-visible")) {
        revealObserver.observe(section);
      }
    });
  }

  var NAVBAR_LOC_CONFIG = {
    houston: {
      label: "Houston",
      bookingUrl: "https://velocitysimlounge.com/book-now/",
      ariaBook: "Book now at Houston"
    },
    dallas: {
      label: "Dallas",
      bookingUrl: "https://velocitysimlounge.com/dallas/book-now/",
      ariaBook: "Book now at Dallas"
    }
  };

  function syncNavbarLocationDom(loc) {
    if (loc !== "houston" && loc !== "dallas") return;
    var config = NAVBAR_LOC_CONFIG[loc];
    if (!config) return;
    var bookHref = toLocalHref(config.bookingUrl) || config.bookingUrl;
    var root = document.getElementById("replica-navbar-root") || document;
    root.querySelectorAll("[data-book-now-location]").forEach(function (el) {
      el.textContent = config.label;
    });
    root.querySelectorAll("[data-sticky-location]").forEach(function (el) {
      el.textContent = config.label;
    });
    root.querySelectorAll("[data-book-now-primary]").forEach(function (el) {
      el.href = bookHref;
      el.setAttribute("aria-label", config.ariaBook);
    });
    root.querySelectorAll("[data-sticky-book-now]").forEach(function (el) {
      el.href = bookHref;
    });
    root.querySelectorAll("[data-book-now-mobile-primary]").forEach(function (el) {
      el.href = bookHref;
    });
    root.querySelectorAll("[data-location-option]").forEach(function (el) {
      var isCurrent = el.getAttribute("data-location-option") === loc;
      el.classList.toggle("is-current", isCurrent);
      if (isCurrent) el.setAttribute("aria-current", "true");
      else el.removeAttribute("aria-current");
    });
    root.querySelectorAll("[data-loc-detail]").forEach(function (el) {
      el.classList.toggle("is-active", el.getAttribute("data-loc-detail") === loc);
    });
  }

  function resolveLocationFromPageKey(key) {
    key = String(key || pageKey || "home");
    if (window.VSL_LOCATION && window.VSL_LOCATION.locationFromPageKey) {
      return window.VSL_LOCATION.locationFromPageKey(key);
    }
    return key.indexOf("dallas-") === 0 || key === "dallas-home" ? "dallas" : "houston";
  }

  function syncLocationState(loc, source) {
    loc = loc === "dallas" ? "dallas" : "houston";
    if (forcedLoc) {
      var forced = String(forcedLoc).toLowerCase();
      if (forced === "houston" || forced === "dallas") loc = forced;
    }
    try {
      localStorage.setItem("vslPreferredLocation", loc);
    } catch (e) {}
    syncNavbarLocationDom(loc);
    try {
      window.dispatchEvent(new CustomEvent("_vslLocationChanged", {
        detail: { location: loc, source: source || "replica-router" }
      }));
    } catch (e) {}
    return loc;
  }

  function setLocationFromPageKey() {
    syncLocationState(resolveLocationFromPageKey(pageKey), "replica-page-key");
  }

  function replicaTargetPageKey(loc, slug) {
    var targetUrl = window.VSL_REPLICA_BUILD_URL(loc, slug || "home");
    return (new URLSearchParams(String(targetUrl).split("?")[1] || "")).get("p") || "home";
  }

  window.VSL_REPLICA_SWITCH_LOCATION = function (loc) {
    loc = loc === "dallas" ? "dallas" : "houston";
    var slug = window.VSL_LOCATION && window.VSL_LOCATION.getPageSlug
      ? window.VSL_LOCATION.getPageSlug()
      : "home";
    var targetKey = replicaTargetPageKey(loc, slug);
    if (targetKey !== pageKey) {
      return navigateToPageKey(targetKey);
    }
    syncLocationState(loc, "replica-switch-same-page");
    return Promise.resolve();
  };

  function setLocationFromQuery() {
    setLocationFromPageKey();
  }

  function normalizePath(pathname) {
    if (!pathname) return "/";
    if (pathname.length > 1 && pathname.charAt(pathname.length - 1) !== "/") return pathname + "/";
    return pathname;
  }

  function toLocalHref(rawHref) {
    if (!rawHref) return null;
    if (rawHref.charAt(0) === "#") return rawHref;
    if (rawHref.indexOf("mailto:") === 0 || rawHref.indexOf("tel:") === 0 || rawHref.indexOf("javascript:") === 0) return null;

    var parsed;
    try {
      parsed = new URL(rawHref, window.location.href);
    } catch (e) {
      return null;
    }

    // Roverd booking: never rewrite to replica routes — modals/iframes and CTAs
    // depend on the real https://book… URLs.
    if (parsed.hostname === "book.velocitysimlounge.com" ||
        parsed.hostname === "book-dtx.velocitysimlounge.com") {
      return null;
    }

    // Already staging-site URLs (path includes /VelocityStagingSite/).
    if (parsed.origin === window.location.origin && parsed.pathname.indexOf("/VelocityStagingSite/") !== -1) {
      var tailPath = "/" + parsed.pathname.split("/VelocityStagingSite/")[1];
      var mappedTail = NAV_PATH_MAP[tailPath] || NAV_PATH_MAP[normalizePath(tailPath)] || NAV_PATH_MAP[parsed.pathname];
      if (mappedTail) {
        if (parsed.hash) mappedTail += parsed.hash;
        return mappedTail;
      }
      return parsed.pathname.split("/VelocityStagingSite/")[1] + parsed.search + parsed.hash;
    }

    // Known external booking/event hosts should stay inside local mock.
    if (EXTERNAL_LOCAL_MAP[parsed.hostname]) {
      return EXTERNAL_LOCAL_MAP[parsed.hostname];
    }

    var isVelocityHost =
      parsed.hostname === "velocitysimlounge.com" ||
      parsed.hostname === "www.velocitysimlounge.com";
    if (!isVelocityHost && parsed.origin !== window.location.origin) return null;

    var localHref = NAV_PATH_MAP[normalizePath(parsed.pathname)] || NAV_PATH_MAP[parsed.pathname];
    if (!localHref) return null;

    if (parsed.hash) localHref += parsed.hash;
    return localHref;
  }

  function applyLocalLinks(scope) {
    if (!scope) return;
    scope.querySelectorAll("a[href]").forEach(function (a) {
      var mapped = toLocalHref(a.getAttribute("href"));
      if (!mapped) return;
      a.setAttribute("href", mapped);
    });
  }

  function notifyReplicaAfterLocalLinks(scope) {
    try {
      window.dispatchEvent(new CustomEvent("vslReplicaAfterLocalLinks", { detail: { scope: scope } }));
    } catch (e) {}
  }

  function localizeNavbarLinks() {
    if (!navbarRoot) return;

    var loc = window.VSL_LOCATION ? window.VSL_LOCATION.readLocation() : "houston";
    var logo = navbarRoot.querySelector(".vsl-navbar__logo");
    if (logo) {
      logo.setAttribute("href", loc === "dallas" ? "index.html?p=dallas-home" : "index.html?p=home");
    }

    navbarRoot.querySelectorAll("img[src^='navbar-assets/']").forEach(function (img) {
      img.src = "../" + img.getAttribute("src");
    });

    if (typeof window.VSL_REPLICA_APPLY_NAV_LINKS === "function") {
      window.VSL_REPLICA_APPLY_NAV_LINKS(loc);
      return;
    }

    navbarRoot.querySelectorAll("a[href]").forEach(function (a) {
      var href = a.getAttribute("href");
      if (!href || href.charAt(0) === "#") return;

      // Handle anchors used by mobile location buttons.
      if (href === "#") {
        var mobileLoc = a.getAttribute("data-mobile-location");
        if (mobileLoc === "dallas" || mobileLoc === "houston") {
          a.setAttribute("href", mobileLoc === "dallas" ? "index.html?p=dallas-home" : "index.html?p=contact");
        }
        return;
      }

      var mapped = toLocalHref(href);
      if (mapped) a.setAttribute("href", mapped);
    });
  }

  function makeHomeMarkup() {
    return (
      '<section class="vsl-local-home">' +
      '<div class="vsl-local-home__inner">' +
      "<h1>Velocity Staging Site</h1>" +
      "<p>This staging build mirrors your current modules and navbar for review/testing.</p>" +
      '<ul class="vsl-local-grid">' +
      '<li><a href="index.html?p=book-now">Book Now</a></li>' +
      '<li><a href="index.html?p=about">About / How It Works</a></li>' +
      '<li><a href="index.html?p=food-drink">Food &amp; Drink</a></li>' +
      '<li><a href="index.html?p=menu-2025">Menu 2025</a></li>' +
      '<li><a href="index.html?p=parties-events">Group Events</a></li>' +
      '<li><a href="index.html?p=corporate-events">Corporate Events</a></li>' +
      '<li><a href="index.html?p=semi-private">Semi-Private</a></li>' +
      '<li><a href="index.html?p=party-packs">Party Packs</a></li>' +
      '<li><a href="index.html?p=membership">Membership</a></li>' +
      '<li><a href="index.html?p=fathers-day">Father\'s Day Bundles</a></li>' +
      '<li><a href="index.html?p=summer-special">Student Summer Special</a></li>' +
      '<li><a href="index.html?p=promotions">Promotions</a></li>' +
      '<li><a href="index.html?p=buyout">Full Venue Buyout</a></li>' +
      '<li><a href="index.html?p=contact">Contact (Houston)</a></li>' +
      "</ul>" +
      "<h2>Dallas pages</h2>" +
      '<ul class="vsl-local-grid">' +
      '<li><a href="index.html?p=dallas-home">Dallas Home</a></li>' +
      '<li><a href="index.html?p=dallas-book-now">Dallas Book Now</a></li>' +
      '<li><a href="index.html?p=dallas-contact">Dallas Contact</a></li>' +
      '<li><a href="index.html?p=dallas-party-packs">Dallas Party Packs</a></li>' +
      '<li><a href="index.html?p=dallas-parties-events">Dallas Group Events</a></li>' +
      '<li><a href="index.html?p=dallas-corporate-events">Dallas Corporate Events</a></li>' +
      '<li><a href="index.html?p=dallas-food-drink">Dallas Food &amp; Drink</a></li>' +
      '<li><a href="index.html?p=dallas-semi-private">Dallas Semi-Private</a></li>' +
      '<li><a href="index.html?p=dallas-promotions">Dallas Promotions</a></li>' +
      '<li><a href="index.html?p=dallas-buyout">Dallas Buyout</a></li>' +
      "</ul>" +
      "</div>" +
      "</section>"
    );
  }

  function clearModuleHeadAssets(moduleKey) {
    document.querySelectorAll('[data-vsl-module-asset="' + moduleKey + '"]').forEach(function (el) {
      el.remove();
    });
  }

  /** Hoist <style>/<link> into <head> so module CSS applies reliably (innerHTML in a div can miss rules). */
  function injectModuleHtml(html, moduleKey) {
    clearModuleHeadAssets(moduleKey);
    var wrapper = document.createElement("div");
    wrapper.innerHTML = html.trim();
    wrapper.querySelectorAll("style, link[rel='stylesheet'], link[rel='preconnect']").forEach(function (el) {
      el.setAttribute("data-vsl-module-asset", moduleKey);
      document.head.appendChild(el);
    });
    pageRoot.innerHTML = wrapper.innerHTML;
  }

  function loadModulePage(options) {
    options = options || {};
    var expectedToken = options.token;
    var key = normalizePageKey(pageKey);
    pageKey = key;
    var page = REPLICA_PAGES[pageKey];
    document.title = replicaDocumentTitle(page.title);

    function isStale() {
      return expectedToken != null && expectedToken !== pageLoadToken;
    }

    if (!page.modulePath) {
      clearModuleHeadAssets(pageKey);
      if (!isStale()) {
        pageRoot.innerHTML = makeHomeMarkup();
        applySectionReveals(pageRoot);
      }
      return Promise.resolve();
    }

    if (moduleCache[pageKey]) {
      if (!isStale()) finalizeModuleMount(moduleCache[pageKey], pageKey);
      document.title = replicaDocumentTitle(page.title);
      return Promise.resolve();
    }

    return fetchModuleHtml(pageKey)
      .then(function (html) {
        if (isStale()) return;
        finalizeModuleMount(html, pageKey);
        document.title = replicaDocumentTitle(page.title);
      })
      .catch(function (err) {
        if (isStale()) return;
        document.title = replicaDocumentTitle(page.title);
        pageRoot.innerHTML =
          '<div style="padding:24px;color:#eaeaea;font-family:Inter,sans-serif;">' +
          "<h2>Unable to load page module</h2>" +
          "<p>" + err.message + "</p>" +
          "</div>";
      });
  }

  function navigateToPageKey(nextKey, options) {
    options = options || {};
    nextKey = normalizePageKey(nextKey);
    if (!routerReady) {
      window.location.href = "index.html?p=" + nextKey + (window.location.hash || "");
      return Promise.resolve();
    }
    if (nextKey === pageKey && !options.force) return Promise.resolve();

    var token = ++pageLoadToken;
    pageKey = nextKey;
    notifyReplicaNavigate(nextKey);
    var nextUrl = "index.html?p=" + pageKey + (window.location.hash || "");

    if (options.replace) history.replaceState({ p: pageKey }, "", nextUrl);
    else history.pushState({ p: pageKey }, "", nextUrl);

    document.title = replicaDocumentTitle(REPLICA_PAGES[pageKey].title);
    setLocationFromPageKey();

    return loadModulePage({ token: token }).then(function () {
      if (options.scrollTop !== false) window.scrollTo(0, 0);
      ensureVisibleReveals();
    });
  }

  function notifyReplicaNavigate(nextKey) {
    try {
      window.dispatchEvent(new CustomEvent("vslReplicaNavigate", { detail: { pageKey: nextKey } }));
    } catch (e) {}
  }

  window.VSL_REPLICA_NAVIGATE = function (urlOrKey) {
    if (!urlOrKey) return Promise.resolve();
    var key = pageKeyFromLocalHref(urlOrKey) || normalizePageKey(String(urlOrKey).replace(/^.*[?&]p=/, "").split(/[#&]/)[0]);
    return navigateToPageKey(key);
  };

  function loadFooter() {
    if (!footerRoot) return Promise.resolve();
    return fetchReplicaText("../velocity-footer.html", "footer")
      .then(function (html) {
        footerRoot.innerHTML = html;
        executeInlineScripts(footerRoot);
        applyLocalLinks(footerRoot);
        notifyReplicaAfterLocalLinks(footerRoot);
      })
      .catch(function (err) {
        if (window.console && console.warn) console.warn("[Staging] Footer load failed:", err.message);
      });
  }

  function loadPromoBanner() {
    /* Competitions promo lives in the home hero Race column — keep promo root empty. */
    var promoRoot = document.getElementById("replica-promo-root");
    if (promoRoot) promoRoot.innerHTML = "";
    return Promise.resolve();
  }

  function loadVslLocation() {
    return fetchReplicaText("../vsl-location.js", "vsl-location.js")
      .then(function (js) {
        var s = document.createElement("script");
        s.textContent = js;
        document.head.appendChild(s);
      });
  }

  loadVslLocation()
    .catch(function () {})
    .then(function () {
      return fetchReplicaText("../velocity-navbar.html?v=20260713b", "navbar");
    })
    .then(function (html) {
      navbarRoot.innerHTML = html;
      setLocationFromQuery();
      executeInlineScripts(navbarRoot);
      localizeNavbarLinks();
      applyLocalLinks(navbarRoot);
      if (typeof window.vslUpdateNavbarActiveLink === "function") {
        window.vslUpdateNavbarActiveLink();
      }
      setLocationFromQuery();
      if (window.VSL_LOCATION) syncNavbarLocationDom(window.VSL_LOCATION.readLocation());
      return loadModulePage();
    })
    .then(loadFooter)
    .then(function () {
      if (window.VSL_LOCATION && typeof window.VSL_REPLICA_APPLY_FOOTER_LINKS === "function") {
        window.VSL_REPLICA_APPLY_FOOTER_LINKS(window.VSL_LOCATION.readLocation());
      }
      routerReady = true;
      try {
        history.replaceState({ p: pageKey }, "", window.location.pathname + window.location.search + window.location.hash);
      } catch (e) {}
      return loadPromoBanner();
    })
    .catch(function (err) {
      document.title = replicaDocumentTitle("Navbar");
      navbarRoot.innerHTML = "";
      pageRoot.innerHTML =
        '<div style="padding:24px;color:#eaeaea;font-family:Inter,sans-serif;">' +
        "<h2>Unable to load navbar</h2>" +
        "<p>" + err.message + "</p>" +
        "</div>";
    });

  document.addEventListener("click", function (evt) {
    var a = evt.target && evt.target.closest ? evt.target.closest("a[href]") : null;
    if (!a) return;
    if (a.target === "_blank" || evt.metaKey || evt.ctrlKey || evt.shiftKey || evt.altKey) return;

    var href = a.getAttribute("href");
    if (!href || href.charAt(0) === "#") return;

    var mapped = toLocalHref(href) || href;
    var key = pageKeyFromLocalHref(mapped);
    if (!key) return;

    evt.preventDefault();
    navigateToPageKey(key);
  });

  window.addEventListener("popstate", function (evt) {
    if (!routerReady) return;
    var key = normalizePageKey((evt.state && evt.state.p) || new URLSearchParams(window.location.search).get("p") || "home");
    navigateToPageKey(key, { replace: true, scrollTop: false, force: true });
  });

  document.addEventListener("mouseover", function (evt) {
    var a = evt.target && evt.target.closest ? evt.target.closest("a[href]") : null;
    if (!a) return;
    var mapped = toLocalHref(a.getAttribute("href")) || a.getAttribute("href");
    var key = pageKeyFromLocalHref(mapped);
    if (key) prefetchModulePage(key);
  }, true);

  document.addEventListener("visibilitychange", ensureVisibleReveals);
  window.addEventListener("pageshow", ensureVisibleReveals);

  window.addEventListener("_vslLocationChanged", function (e) {
    if (!e.detail || !e.detail.location) return;
    var loc = e.detail.location;
    if (typeof window.VSL_REPLICA_APPLY_NAV_LINKS === "function") {
      window.VSL_REPLICA_APPLY_NAV_LINKS(loc);
    }
    if (typeof window.vslUpdateNavbarActiveLink === "function") {
      window.vslUpdateNavbarActiveLink();
    }
    if (typeof window.VSL_REPLICA_APPLY_FOOTER_LINKS === "function") {
      window.VSL_REPLICA_APPLY_FOOTER_LINKS(loc);
    }
    if (typeof window.vslUpdateFooterActiveNav === "function") {
      window.vslUpdateFooterActiveNav();
    }
    syncNavbarLocationDom(loc);
  });
})();
