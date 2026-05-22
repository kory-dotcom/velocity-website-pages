/* Velocity Local Replica Router */
(function () {
  window.__VSL_SITE_REPLICA__ = true;
  var REPLICA_PAGES = {
    home: { title: "Home", modulePath: "Home/velocity-home-elementor.html" },
    about: { title: "About", modulePath: "About : How it Works Page_files/velocity-about-how-it-works-elementor.html" },
    "book-now": { title: "Book Now", modulePath: "Book Now/velocity-book-now-elementor.html" },
    contact: { title: "Contact", modulePath: "Contact/velocity-contact-elementor.html" },
    "corporate-events": { title: "Corporate Events", modulePath: "Corporate Events/velocity-corporate-events-elementor.html" },
    "food-drink": { title: "Food & Drink", modulePath: "Food & Drink/velocity-food-drink-elementor.html" },
    "menu-2025": { title: "Menu 2025", modulePath: "Food & Drink/velocity-menu-2025.html" },
    membership: { title: "Membership", modulePath: "Membership Page/velocity-membership-elementor.html" },
    "parties-events": { title: "Group Events", modulePath: "Parties & Events/velocity-parties-events-elementor.html" },
    "party-packs": { title: "Party Packs", modulePath: "Party Packs/velocity-party-packs-elementor.html" },
    "semi-private": { title: "Semi-Private", modulePath: "Semi-Private/velocity-semi-private-elementor.html" },
    "fathers-day": { title: "Father's Day Bundles", modulePath: "Fathers Day/velocity-fathers-day-elementor.html" },
    promotions: { title: "Promotions", modulePath: "Promotions/velocity-promotions-elementor.html" },
    buyout: { title: "Full Venue Buyout", modulePath: "Buyout/velocity-buyout-elementor.html" }
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
    "/promotions/": "index.html?p=promotions",
    "/promotions": "index.html?p=promotions",
    "/Promotions/velocity-promotions-elementor.html": "index.html?p=promotions",
    "/Local Replica/Promotions/velocity-promotions-elementor.html": "index.html?p=promotions",
    "/buyout/": "index.html?p=buyout",
    "/buyout": "index.html?p=buyout",
    "/dallas/": "index.html?p=contact&loc=dallas",
    "/dallas": "index.html?p=contact&loc=dallas"
  };
  var EXTERNAL_LOCAL_MAP = {
    /* book.velocitysimlounge.com (Roverd) must keep real https URLs — the Book Now page
       sets modal iframe src from link href; rewriting to index.html?p=book-now loads the
       replica inside the iframe and breaks in-flow booking. */
    "velocitysimracinglounge.tripleseat.com": "index.html?p=parties-events"
  };

  var navbarRoot = document.getElementById("replica-navbar-root");
  var pageRoot = document.getElementById("replica-page-root");
  var footerRoot = document.getElementById("replica-footer-root");
  var params = new URLSearchParams(window.location.search);
  var pageKey = params.get("p") || "home";
  if (pageKey === "spring-bundles") pageKey = "fathers-day";
  var forcedLoc = params.get("loc");
  var envParam = params.get("env");
  var revealObserver = null;

  /** Directory URL for the replica root (parent of `Local Replica/`). Resolved from replica-app.js `src`. */
  var MODULE_BASE = (function resolveModuleBase() {
    var scripts = document.getElementsByTagName("script");
    for (var i = scripts.length - 1; i >= 0; i--) {
      var raw = scripts[i] && scripts[i].getAttribute("src");
      if (!raw || raw.indexOf("replica-app") === -1) continue;
      try {
        var u = new URL(raw, window.location.href);
        var parts = u.pathname.split("/").filter(Boolean);
        for (var j = 0; j < parts.length; j++) {
          var decoded = decodeURIComponent(parts[j]).replace(/\s+/g, " ");
          if (decoded.toLowerCase() === "local replica" && parts[j + 1] === "replica-app.js") {
            var prefix = parts.slice(0, j).join("/");
            var basePath = (prefix ? "/" + prefix + "/" : "/");
            return new URL(basePath, u.origin).href;
          }
        }
      } catch (e) {}
      break;
    }
    var fallback = window.location.href.replace(/(?:Local(?:%20|[\s])Replica\/)?replica-app\.js.*$/i, "");
    try {
      return new URL("./", fallback).href;
    } catch (e2) {
      return new URL("./", window.location.href).href;
    }
  })();

  function replicaAssetUrl(relPath) {
    return new URL(String(relPath).replace(/^\//, ""), MODULE_BASE).href;
  }

  /** Same document path semantics as staging: `/VelocityStagingSite/?p=…` (not `index.html?p=…`). */
  function hrefToReplicaShell(href) {
    var parsed = new URL(href, window.location.href);
    var shell = new URL(window.location.href);
    shell.pathname = shell.pathname.replace(/\/index\.html$/i, "/");
    if (!shell.pathname.endsWith("/")) shell.pathname += "/";
    var merge = new URLSearchParams(parsed.search);
    if (envParam) merge.set("env", envParam);
    else merge.delete("env");
    shell.search = merge.toString();
    shell.hash = parsed.hash;
    return shell.pathname + (shell.search ? "?" + shell.search : "") + shell.hash;
  }

  // Preserve env=staging across navigation (and shell-style URLs)
  function appendEnv(href) {
    return hrefToReplicaShell(href);
  }

  if (!REPLICA_PAGES[pageKey]) pageKey = "home";

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

      var children = section.querySelectorAll(":scope > div > h2, :scope > div > h3, :scope > div > p, :scope > div > a[class], :scope > div > div > h2, :scope > div > div > h3, :scope > div > div > p");
      var count = 0;
      children.forEach(function (child) {
        if (count >= 6) return;
        child.setAttribute("data-vsl-stagger", "");
        child.style.setProperty("--vsl-si", String(count));
        count++;
      });

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

  function setLocationFromQuery() {
    if (!forcedLoc) return;
    if (forcedLoc !== "houston" && forcedLoc !== "dallas") return;
    try {
      localStorage.setItem("vslPreferredLocation", forcedLoc);
      window.dispatchEvent(new CustomEvent("_vslLocationChanged", { detail: { location: forcedLoc } }));
    } catch (e) {}
  }

  function normalizeReplicaShellPathname(pathname) {
    var p = pathname.replace(/\/index\.html$/i, "/");
    if (!p.endsWith("/")) p += "/";
    return p;
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

    // Same replica shell URL (staging: /VelocityStagingSite/?p=…)
    if (
      parsed.origin === window.location.origin &&
      normalizeReplicaShellPathname(parsed.pathname) === normalizeReplicaShellPathname(window.location.pathname)
    ) {
      return hrefToReplicaShell("index.html" + parsed.search + parsed.hash);
    }

    // Roverd booking: never rewrite to replica routes — modals/iframes and CTAs
    // depend on the real https://book… URLs.
    if (parsed.hostname === "book.velocitysimlounge.com") {
      return null;
    }

    // Already local replica URLs (decoded path matches …/Local Replica/… file tree).
    if (parsed.origin === window.location.origin) {
      var decPath = decodeURIComponent(parsed.pathname);
      var lr = decPath.match(/^(.*)\/Local Replica\/([\s\S]+)$/i);
      if (lr) {
        var tailPath = "/" + lr[2].replace(/^\/+/, "");
        var mappedTail =
          NAV_PATH_MAP[tailPath] || NAV_PATH_MAP[normalizePath(tailPath)] || NAV_PATH_MAP[parsed.pathname];
        if (mappedTail) {
          if (parsed.hash) mappedTail += parsed.hash;
          return appendEnv(mappedTail);
        }
        return appendEnv(tailPath + parsed.search + parsed.hash);
      }
    }

    // Known external booking/event hosts should stay inside local mock.
    if (EXTERNAL_LOCAL_MAP[parsed.hostname]) {
      return appendEnv(EXTERNAL_LOCAL_MAP[parsed.hostname]);
    }

    var isVelocityHost =
      parsed.hostname === "velocitysimlounge.com" ||
      parsed.hostname === "www.velocitysimlounge.com";
    if (!isVelocityHost && parsed.origin !== window.location.origin) return null;

    var localHref = NAV_PATH_MAP[normalizePath(parsed.pathname)] || NAV_PATH_MAP[parsed.pathname];
    if (!localHref) return null;

    if (parsed.hash) localHref += parsed.hash;
    return appendEnv(localHref);
  }

  function applyLocalLinks(scope) {
    if (!scope) return;
    scope.querySelectorAll("a[href]").forEach(function (a) {
      var mapped = toLocalHref(a.getAttribute("href"));
      if (!mapped) return;
      a.setAttribute("href", mapped);
    });
  }

  /** Lets page modules re-apply Roverd / external URLs from data-vsl-config after link rewriting. */
  function notifyReplicaAfterLocalLinks(scope) {
    try {
      window.dispatchEvent(new CustomEvent("vslReplicaAfterLocalLinks", { detail: { scope: scope } }));
    } catch (e) {}
  }

  function localizeNavbarLinks() {
    if (!navbarRoot) return;

    var logo = navbarRoot.querySelector('.vsl-navbar__logo[href="https://velocitysimlounge.com/"]');
    if (logo) logo.setAttribute("href", appendEnv("index.html?p=home"));

    navbarRoot.querySelectorAll("img[src^='navbar-assets/']").forEach(function (img) {
      var rel = img.getAttribute("src");
      if (!rel) return;
      img.src = replicaAssetUrl(rel);
    });

    navbarRoot.querySelectorAll("a[href]").forEach(function (a) {
      var href = a.getAttribute("href");
      if (!href || href.charAt(0) === "#") return;

      // Handle anchors used by mobile location buttons.
      if (href === "#") {
        var mobileLoc = a.getAttribute("data-mobile-location");
        if (mobileLoc === "dallas" || mobileLoc === "houston") {
          a.setAttribute("href", appendEnv("index.html?p=contact&loc=" + mobileLoc));
        }
        return;
      }

      var mapped = toLocalHref(href);
      if (mapped) a.setAttribute("href", mapped);
    });
  }

  function makeHomeMarkup() {
    function h(query) {
      return hrefToReplicaShell("index.html" + query);
    }
    return (
      '<section class="vsl-local-home">' +
      '<div class="vsl-local-home__inner">' +
      "<h1>Velocity Local Replica</h1>" +
      "<p>This local build mirrors your current modules and navbar for review/testing.</p>" +
      '<ul class="vsl-local-grid">' +
      '<li><a href="' + h("?p=book-now") + '">Book Now</a></li>' +
      '<li><a href="' + h("?p=about") + '">About / How It Works</a></li>' +
      '<li><a href="' + h("?p=food-drink") + '">Food &amp; Drink</a></li>' +
      '<li><a href="' + h("?p=menu-2025") + '">Menu 2025</a></li>' +
      '<li><a href="' + h("?p=parties-events") + '">Group Events</a></li>' +
      '<li><a href="' + h("?p=corporate-events") + '">Corporate Events</a></li>' +
      '<li><a href="' + h("?p=semi-private") + '">Semi-Private</a></li>' +
      '<li><a href="' + h("?p=party-packs") + '">Party Packs</a></li>' +
      '<li><a href="' + h("?p=membership") + '">Membership</a></li>' +
      '<li><a href="' + h("?p=fathers-day") + '">Father\'s Day Bundles</a></li>' +
      '<li><a href="' + h("?p=promotions") + '">Promotions</a></li>' +
      '<li><a href="' + h("?p=buyout") + '">Full Venue Buyout</a></li>' +
      '<li><a href="' + h("?p=contact") + '">Contact (Houston)</a></li>' +
      '<li><a href="' + h("?p=contact&loc=dallas") + '">Contact (Dallas state)</a></li>' +
      "</ul>" +
      "</div>" +
      "</section>"
    );
  }

  /** Party Packs + Book Now may portal booking modals to body; strip orphans before swapping modules. */
  function removeReplicaPortalModals() {
    document.querySelectorAll("body > #vsl-pp-book-modal, body > #vsl-bn-modal").forEach(function (m) {
      m.remove();
    });
  }

  function loadModulePage() {
    var page = REPLICA_PAGES[pageKey];
    document.title = page.title + " | Velocity Local Replica";

    if (!page.modulePath) {
      removeReplicaPortalModals();
      pageRoot.innerHTML = makeHomeMarkup();
      applySectionReveals(pageRoot);
      return Promise.resolve();
    }

    return fetch(replicaAssetUrl(page.modulePath), { cache: "no-store" })
      .then(function (res) {
        if (!res.ok) throw new Error("Failed to load module: " + page.modulePath);
        return res.text();
      })
      .then(function (html) {
        removeReplicaPortalModals();
        pageRoot.innerHTML = html;
        executeInlineScripts(pageRoot);
        applyLocalLinks(pageRoot);
        notifyReplicaAfterLocalLinks(pageRoot);
        applySectionReveals(pageRoot);
        var afterCms = Promise.resolve();
        if (window.VelocityCMS && window.VelocityCMS.hydratePage) {
          afterCms = Promise.resolve(window.VelocityCMS.hydratePage(pageKey));
        }
        return afterCms
          .catch(function () {})
          .then(function () {
            applyLocalLinks(pageRoot);
            notifyReplicaAfterLocalLinks(pageRoot);
          });
      })
      .catch(function (err) {
        pageRoot.innerHTML =
          '<div style="padding:24px;color:#eaeaea;font-family:Inter,sans-serif;">' +
          "<h2>Unable to load page module</h2>" +
          "<p>" + err.message + "</p>" +
          "</div>";
      });
  }

  function loadFooter() {
    if (!footerRoot) return Promise.resolve();
    return fetch(replicaAssetUrl("velocity-footer.html"), { cache: "no-store" })
      .then(function (res) {
        if (!res.ok) throw new Error("Failed to load footer");
        return res.text();
      })
      .then(function (html) {
        footerRoot.innerHTML = html;
        executeInlineScripts(footerRoot);
        applyLocalLinks(footerRoot);
        notifyReplicaAfterLocalLinks(footerRoot);
      })
      .catch(function (err) {
        if (window.console && console.warn) console.warn("[Replica] Footer load failed:", err.message);
      });
  }

  fetch(replicaAssetUrl("velocity-navbar.html"), { cache: "no-store" })
    .then(function (res) { return res.text(); })
    .then(function (html) {
      navbarRoot.innerHTML = html;
      executeInlineScripts(navbarRoot);
      localizeNavbarLinks();
      applyLocalLinks(navbarRoot);
      setLocationFromQuery();
      return loadModulePage();
    })
    .then(loadFooter)
    .catch(function (err) {
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
    var mapped = toLocalHref(a.getAttribute("href"));
    if (!mapped) return;
    if (a.getAttribute("href") === mapped) return;
    evt.preventDefault();
    window.location.href = mapped;
  });
})();
