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
    "gift-cards": { title: "Gift Cards", modulePath: "../Gift Cards/velocity-gift-cards-elementor.html" },
    "holiday-parties": { title: "Holiday Parties", modulePath: "../Holiday Parties/velocity-holiday-parties-elementor.html" },
    lemans: { title: "3-Hour Le Mans Endurance", modulePath: "../Le Mans Endurance/velocity-le-mans-elementor.html" },
    halloween: { title: "Fast & Frightening Halloween Party", modulePath: "../Halloween/velocity-halloween-elementor.html" },
    spookeasy: { title: "Spookeasy Halloween Party (tickets)", modulePath: "../Halloween/velocity-spookeasy-elementor.html" },
    blackfriday: { title: "Black Friday 2026", modulePath: "../Black Friday/velocity-blackfriday-elementor.html" },
    "parties-events": { title: "Group Events", modulePath: "../Parties & Events/velocity-parties-events-elementor.html" },
    "party-packs": { title: "Party Packs", modulePath: "../Party Packs/velocity-party-packs-elementor.html" },
    "semi-private": { title: "Semi-Private", modulePath: "../Semi-Private/velocity-semi-private-elementor.html" },
    "fathers-day": { title: "Father's Day Bundles", modulePath: "../Bundles Page/velocity-fathers-day-elementor.html" },
    "summer-special": { title: "Student Summer Special", modulePath: "../Summer Special/velocity-summer-special-elementor.html" },
    "laborday-banner": { title: "Labor Day Banner (home popup preview)", modulePath: "../Labor Day/laborday-promo-banner.html" },
    "roc-banner": { title: "Race of Champions Banner (home popup preview)", modulePath: "../Race of Champions/race-of-champions-promo-banner.html" },
    "league-banner": { title: "Dallas League Banner (home popup preview)", modulePath: "../Dallas/Leagues/league-promo-banner.html" },
    "halloween-banner": { title: "Halloween Banner (home popup preview)", modulePath: "../Halloween/halloween-promo-banner.html" },
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
    "dallas-buyout": { title: "Dallas Buyout", modulePath: "../Dallas/Buyout/velocity-buyout-elementor.html" },
    "dallas-leagues": { title: "Dallas Leagues", modulePath: "../Dallas/Leagues/velocity-leagues-elementor.html" },
    "dallas-membership": { title: "Dallas Membership", modulePath: "../Dallas/Memberships/velocity-membership-elementor.html" }
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
    "/gift-cards/": "index.html?p=gift-cards",
    "/gift-cards": "index.html?p=gift-cards",
    "/holiday-parties/": "index.html?p=holiday-parties",
    "/holiday-parties": "index.html?p=holiday-parties",
    "/million-laps/": "index.html?p=home",
    "/million-laps": "index.html?p=home",
    "/millionlaps/": "index.html?p=home",
    "/millionlaps": "index.html?p=home",
    "/lemans/": "index.html?p=lemans",
    "/lemans": "index.html?p=lemans",
    "/halloween/": "index.html?p=halloween",
    "/halloween": "index.html?p=halloween",
    "/halloween/spookeasy/": "index.html?p=spookeasy",
    "/halloween/spookeasy": "index.html?p=spookeasy",
    "/blackfriday/": "index.html?p=blackfriday",
    "/blackfriday": "index.html?p=blackfriday",
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
    "/dallas/buyout": "index.html?p=dallas-buyout",
    "/dallas/leagues/": "index.html?p=dallas-leagues",
    "/dallas/leagues": "index.html?p=dallas-leagues",
    "/dallas/membership/": "index.html?p=membership",
    "/dallas/membership": "index.html?p=membership",
    "/dallas/memberships/": "index.html?p=membership",
    "/dallas/memberships": "index.html?p=membership",
    /* Houston has no leagues page yet — route to the Dallas league until it exists */
    "/leagues/": "index.html?p=dallas-leagues",
    "/leagues": "index.html?p=dallas-leagues"
  };
  var EXTERNAL_LOCAL_MAP = {
    /* book.velocitysimlounge.com (Roverd) must keep real https URLs — the Book Now page
       sets modal iframe src from link href; rewriting to index.html?p=book-now loads the
       replica inside the iframe and breaks in-flow booking. */
    // Inquiry forms on Tripleseat: keep mapped to local Group Events for replica UX
    // "velocitysimracinglounge.tripleseat.com" intentionally omitted if staging differs
  };

  /* Velocity Bookings trial, staging only.
     On the Houston Book Now page the races open the practice lounge of the new
     booking system instead of Roverd. Nothing booked there is real: test cards
     only, and no seat at a real lounge is held. The page module itself keeps its
     Roverd links, so what gets pasted into the live site is unchanged. Party
     packs are not sold in the practice lounge yet and stay on Roverd.
     To go back to Roverd on staging, empty PRACTICE_BOOKING_PAGES. */
  var PRACTICE_BOOKING_BASE = "https://members.velocitysimlounge.com/reserve/test/";
  var PRACTICE_BOOKING_PAGES = { "book-now": true };
  var PRACTICE_BOOKING_RACES = {
    "/book/grand-prix-approx-30-mins/1": "quick-race",
    "/book/double-race-approx-60-mins/2": "double-race",
    "/book/610-challenge/15": "610-challenge",
    "/book/monthly-hot-lap-challenge-30-mins/6": "leaderboard-challenge",
    "/book/2-seater-quick-race/22": "2-seater-quick-race",
    "/book/2-seater-double-race/23": "2-seater-double-race"
  };

  function practiceBookingHref(href) {
    if (typeof href !== "string" || href.indexOf("book.velocitysimlounge.com") === -1) return null;
    var parsed;
    try {
      parsed = new URL(href);
    } catch (e) {
      return null;
    }
    if (parsed.hostname !== "book.velocitysimlounge.com") return null;
    var race = PRACTICE_BOOKING_RACES[parsed.pathname.replace(/\/+$/, "")];
    return race ? PRACTICE_BOOKING_BASE + race : null;
  }

  /* Runs on the module before it is mounted, so the page's own script reads the
     practice links from data-cfg when it sets up its cards. */
  function applyPracticeBooking(scope, moduleKey) {
    if (!scope || !PRACTICE_BOOKING_PAGES[moduleKey]) return;
    scope.querySelectorAll("a[href]").forEach(function (a) {
      var practice = practiceBookingHref(a.getAttribute("href"));
      if (practice) a.setAttribute("href", practice);
    });
    scope.querySelectorAll("[data-cfg]").forEach(function (el) {
      var cfg;
      try {
        cfg = JSON.parse(el.getAttribute("data-cfg"));
      } catch (e) {
        return;
      }
      if (!cfg || !cfg.links) return;
      var changed = false;
      Object.keys(cfg.links).forEach(function (key) {
        var practice = practiceBookingHref(cfg.links[key]);
        if (!practice) return;
        cfg.links[key] = practice;
        changed = true;
      });
      if (changed) el.setAttribute("data-cfg", JSON.stringify(cfg));
    });
  }

  /* Sign in, staging only (the Velocity Bookings trial).
     A small account button in the header. Signed out, it asks for an email and the
     Velocity API emails a sign-in link: no password. Opening the link comes back to
     this page with a key after the # in the address. The key is kept on this browser
     and only reads: first name, membership level and bookings (no card or contact
     details). Signed in, the panel shows what is coming up, with the group page and
     calendar, and "Book again" for what was booked before. Members sign in the same
     way, and the link signs them in to their member account on the members site too.
     Added here and not in velocity-navbar.html, so what gets pasted into the live
     site is unchanged. */
  var ACCOUNT_BASE = "https://members.velocitysimlounge.com";
  var ACCOUNT_STORE = "vsl-signin";
  try {
    /* A developer's machine can point at a local members app. */
    if (/^(localhost|127\.0\.0\.1)$/.test(window.location.hostname) && window.localStorage.getItem("vsl-members-base")) {
      ACCOUNT_BASE = window.localStorage.getItem("vsl-members-base");
    }
  } catch (e) {}
  var ACCOUNT_CSS =
    ".vsl-acct{position:relative;flex:0 0 auto;display:flex;align-items:stretch;font-family:var(--font-body,'Archivo Narrow',sans-serif)}" +
    ".vsl-acct--open{z-index:calc(var(--z-overlay,10000) + 1)}" +
    ".vsl-acct__btn{appearance:none;-webkit-appearance:none;display:inline-flex;align-items:center;gap:8px;min-height:calc(44px * var(--vsl-ui-scale,1));padding:0 calc(12px * var(--vsl-ui-scale,1));border:1px solid rgba(234,234,234,.14);border-radius:calc(8px * var(--vsl-ui-scale,1));background:rgba(41,56,147,.35);color:#fff;cursor:pointer;font-family:var(--font-head,'Khand',sans-serif);font-size:calc(14px * var(--vsl-ui-scale,1));font-weight:700;font-style:italic;letter-spacing:.08em;text-transform:uppercase;line-height:1;white-space:nowrap;transition:background .2s ease,border-color .2s ease}" +
    ".vsl-acct__btn:hover,.vsl-acct--open .vsl-acct__btn{background:rgba(41,56,147,.55);border-color:rgba(234,234,234,.26)}" +
    ".vsl-acct__btn:focus-visible{outline:2px solid var(--yellow,#fdc70c);outline-offset:2px}" +
    ".vsl-acct__btn svg{width:18px;height:18px;flex:0 0 auto;stroke:var(--yellow,#fdc70c);fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}" +
    ".vsl-acct__avatar{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;background:var(--magenta,#ee265f);color:#fff;font-style:normal;font-size:14px;letter-spacing:0;box-shadow:0 0 0 2px rgba(255,255,255,.18)}" +
    ".vsl-acct__name{max-width:9ch;overflow:hidden;text-overflow:ellipsis}" +
    ".vsl-acct__panel{position:absolute;top:calc(100% + 8px);right:0;width:min(380px,calc(100vw - 24px));max-height:min(620px,calc(100vh - 120px));overflow:auto;overscroll-behavior:contain;background:var(--navy-deep,#191840);border:1px solid rgba(104,124,238,.3);border-radius:12px;box-shadow:0 18px 44px rgba(0,0,0,.45),0 2px 8px rgba(0,0,0,.2);color:#fff;text-align:left;opacity:0;visibility:hidden;transform:translateY(-6px);transition:opacity .2s ease,transform .2s ease,visibility .2s ease}" +
    ".vsl-acct--open .vsl-acct__panel{opacity:1;visibility:visible;transform:none}" +
    ".vsl-acct__pad{padding:18px}" +
    ".vsl-acct__title{margin:0 0 6px;font-family:var(--font-head,'Khand',sans-serif);font-size:24px;font-weight:700;font-style:italic;letter-spacing:.04em;text-transform:uppercase;line-height:1.1}" +
    ".vsl-acct__text{margin:0 0 14px;font-size:15px;line-height:1.45;color:rgba(234,234,234,.82)}" +
    ".vsl-acct__text b{color:#fff}" +
    ".vsl-acct__form label{display:block;margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:rgba(234,234,234,.75)}" +
    ".vsl-acct__form input{display:block;width:100%;box-sizing:border-box;height:46px;margin:0 0 10px;padding:0 14px;border:1px solid rgba(255,255,255,.28);border-radius:8px;background:rgba(8,12,34,.6);color:#fff;font:inherit;font-size:16px}" +
    ".vsl-acct__form input::placeholder{color:rgba(255,255,255,.4)}" +
    ".vsl-acct__form input:focus{outline:2px solid var(--yellow,#fdc70c);outline-offset:1px}" +
    ".vsl-acct__send{appearance:none;display:block;width:100%;height:46px;border:0;border-radius:8px;background:var(--magenta,#ee265f);color:#fff;cursor:pointer;font-family:var(--font-head,'Khand',sans-serif);font-size:17px;font-weight:700;font-style:italic;letter-spacing:.08em;text-transform:uppercase}" +
    ".vsl-acct__send:hover{filter:brightness(1.1)}" +
    ".vsl-acct__send[disabled]{opacity:.6;cursor:default}" +
    ".vsl-acct__note{margin:10px 0 0;font-size:13.5px;line-height:1.4;color:rgba(234,234,234,.7)}" +
    ".vsl-acct__note[data-tone='bad']{color:#ff9aa0}" +
    ".vsl-acct__link{appearance:none;border:0;background:none;padding:0;color:#fff;font:inherit;font-size:14px;text-decoration:underline;text-underline-offset:3px;cursor:pointer}" +
    ".vsl-acct__link:hover{color:var(--yellow,#fdc70c)}" +
    ".vsl-acct__head{padding:16px 18px 14px;border-bottom:1px solid rgba(234,234,234,.1);background:linear-gradient(135deg,rgba(41,56,147,.5),rgba(41,56,147,.12))}" +
    ".vsl-acct__hello{font-family:var(--font-head,'Khand',sans-serif);font-size:24px;font-weight:700;font-style:italic;letter-spacing:.04em;text-transform:uppercase;line-height:1.1}" +
    ".vsl-acct__sub{margin-top:4px;font-size:14px;color:rgba(234,234,234,.78)}" +
    ".vsl-acct__member{display:inline-flex;align-items:center;gap:6px;margin-top:8px;padding:4px 10px;border-radius:999px;background:rgba(253,199,12,.14);border:1px solid rgba(253,199,12,.45);color:var(--yellow,#fdc70c);font-size:12.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase}" +
    ".vsl-acct__member i{font-style:normal;font-weight:600;color:rgba(255,255,255,.85);text-transform:none;letter-spacing:0}" +
    ".vsl-acct__sec{padding:14px 18px 4px}" +
    ".vsl-acct__sec h4{margin:0 0 8px;font-family:var(--font-body,'Archivo Narrow',sans-serif);font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(234,234,234,.6)}" +
    ".vsl-acct__bk{margin:0 0 10px;padding:12px;border:1px solid rgba(234,234,234,.12);border-radius:10px;background:rgba(255,255,255,.04)}" +
    ".vsl-acct__bk[data-off='1']{opacity:.6}" +
    ".vsl-acct__bk-top{display:flex;align-items:center;justify-content:space-between;gap:10px}" +
    ".vsl-acct__bk-top strong{font-family:var(--font-head,'Khand',sans-serif);font-size:19px;font-weight:700;font-style:italic;letter-spacing:.04em;text-transform:uppercase;line-height:1.1}" +
    ".vsl-acct__chip{flex:0 0 auto;padding:3px 8px;border-radius:999px;background:rgba(61,220,151,.14);border:1px solid rgba(61,220,151,.4);color:#3ddc97;font-size:11.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap}" +
    ".vsl-acct__chip[data-tone='off']{background:rgba(255,154,160,.1);border-color:rgba(255,154,160,.4);color:#ff9aa0}" +
    ".vsl-acct__bk-when{margin-top:4px;font-size:14.5px;line-height:1.35;color:rgba(234,234,234,.85)}" +
    ".vsl-acct__bk-acts{display:flex;gap:8px;margin-top:10px}" +
    ".vsl-acct__act{flex:1 1 0;display:inline-flex;align-items:center;justify-content:center;min-height:36px;padding:0 10px;border:1px solid rgba(234,234,234,.2);border-radius:7px;background:rgba(255,255,255,.05);color:#fff;font-family:var(--font-head,'Khand',sans-serif);font-size:13.5px;font-weight:700;font-style:italic;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;white-space:nowrap}" +
    ".vsl-acct__act:hover{background:rgba(41,56,147,.5);border-color:rgba(234,234,234,.34);color:#fff}" +
    ".vsl-acct__act--go{border-color:transparent;background:var(--magenta,#ee265f)}" +
    ".vsl-acct__act--go:hover{background:var(--magenta,#ee265f);filter:brightness(1.1)}" +
    ".vsl-acct__again{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:0 0 8px;padding:10px 12px;border:1px solid rgba(234,234,234,.12);border-radius:10px;background:rgba(255,255,255,.04)}" +
    ".vsl-acct__again div{min-width:0}" +
    ".vsl-acct__again strong{display:block;font-size:15.5px;font-weight:700;line-height:1.25}" +
    ".vsl-acct__again span{display:block;font-size:13px;color:rgba(234,234,234,.65)}" +
    ".vsl-acct__again .vsl-acct__act{flex:0 0 auto}" +
    ".vsl-acct__empty{margin:0 0 12px;font-size:14.5px;line-height:1.45;color:rgba(234,234,234,.78)}" +
    ".vsl-acct__foot{display:flex;flex-wrap:wrap;align-items:center;gap:6px 16px;margin-top:8px;padding:12px 18px 14px;border-top:1px solid rgba(234,234,234,.1)}" +
    ".vsl-acct__foot a{color:#fff;font-size:14px;text-decoration:underline;text-underline-offset:3px}" +
    ".vsl-acct__foot a:hover{color:var(--yellow,#fdc70c)}" +
    ".vsl-acct__foot .vsl-acct__link{margin-left:auto;color:rgba(234,234,234,.7)}" +
    /* The header is tight: the name only shows where there is room for it. */
    "@media (max-width:1759px){.vsl-acct__btn .vsl-acct__name{display:none}.vsl-acct__btn{padding:0 calc(11px * var(--vsl-ui-scale,1))}}" +
    /* ...and on laptop-width screens the menu links sit a little closer together, which pays for the
       button's width, so Book Now is no further right than it was without it. */
    "@media (min-width:1025px) and (max-width:1759px){.vsl-navbar .vsl-navbar__menu .vsl-navbar__link{padding-left:calc(11px * var(--vsl-ui-scale,1));padding-right:calc(11px * var(--vsl-ui-scale,1))}.vsl-navbar .vsl-navbar__menu .vsl-navbar__link.vsl-navbar__race-trigger{padding-left:calc(16px * var(--vsl-ui-scale,1));padding-right:calc(16px * var(--vsl-ui-scale,1))}}" +
    "@media (max-width:1024px){.vsl-acct{margin-left:8px;align-items:center}.vsl-acct__btn{min-height:44px;padding:0 11px;border-radius:8px}.vsl-acct__panel{position:fixed;top:var(--vsl-acct-top,70px);left:12px;right:12px;width:auto;max-height:calc(100vh - var(--vsl-acct-top,70px) - var(--vsl-acct-gap,16px))}}" +
    "@media (prefers-reduced-motion:reduce){.vsl-acct__panel,.vsl-acct__btn{transition:none}}";

  var account = { key: null, name: null, me: null, loadedAt: 0, loading: false, failed: false, sentTo: null, fresh: false, el: null };

  function accountEsc(text) {
    return String(text == null ? "" : text).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function accountRead() {
    try {
      var saved = JSON.parse(window.localStorage.getItem(ACCOUNT_STORE) || "null");
      if (saved && /^[A-Za-z0-9_-]{32}$/.test(saved.key)) {
        account.key = saved.key;
        account.name = typeof saved.name === "string" ? saved.name : null;
        return;
      }
    } catch (e) {}
    account.key = null;
    account.name = null;
  }

  function accountSave() {
    try {
      if (account.key) window.localStorage.setItem(ACCOUNT_STORE, JSON.stringify({ key: account.key, name: account.name }));
      else window.localStorage.removeItem(ACCOUNT_STORE);
    } catch (e) {}
  }

  /* Back from the emailed link: the key is after the # and is taken out of the address at once. */
  function accountTakeKey() {
    var found = /(?:^#|&)vb-signin=([A-Za-z0-9_-]{32})(?:&|$)/.exec(window.location.hash || "");
    if (!found) return false;
    account.key = found[1];
    account.name = null;
    account.me = null;
    account.fresh = true;
    accountSave();
    try {
      window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
    } catch (e) {}
    return true;
  }

  function accountWhen(b) {
    try {
      var at = new Date(b.starts_at);
      var day = new Intl.DateTimeFormat("en-US", { timeZone: b.timezone, weekday: "short", month: "short", day: "numeric" }).format(at);
      var time = new Intl.DateTimeFormat("en-US", { timeZone: b.timezone, hour: "numeric", minute: "2-digit" }).format(at);
      return { day: day, time: time };
    } catch (e) {
      return { day: "", time: "" };
    }
  }

  function accountDrivers(n) {
    return n === 1 ? "1 driver" : n + " drivers";
  }

  function accountButtonHtml() {
    if (account.key) {
      var name = (account.me && account.me.first_name) || account.name || "";
      var initial = name ? name.charAt(0).toUpperCase() : "";
      return (
        '<span class="vsl-acct__avatar" aria-hidden="true">' +
        (initial ? accountEsc(initial) : '<svg viewBox="0 0 24 24" style="stroke:#fff;width:15px;height:15px"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg>') +
        "</span>" +
        '<span class="vsl-acct__name">' + accountEsc(name || "Account") + "</span>"
      );
    }
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg><span class="vsl-acct__name">Sign in</span>';
  }

  function accountSignedOutHtml() {
    if (account.sentTo) {
      return (
        '<div class="vsl-acct__pad">' +
        '<p class="vsl-acct__title">Check your email</p>' +
        '<p class="vsl-acct__text">If <b>' + accountEsc(account.sentTo) + "</b> has booked with us or is a member, a sign-in link is on its way. Open it on this device and you will land back here, signed in.</p>" +
        '<p class="vsl-acct__text">It can take a minute, and it sometimes lands in spam. New here? Just book: your booking will be waiting here next time.</p>' +
        '<button type="button" class="vsl-acct__link" data-acct="retry">Use a different email</button>' +
        "</div>"
      );
    }
    return (
      '<form class="vsl-acct__form vsl-acct__pad" novalidate>' +
      '<p class="vsl-acct__title">Sign in</p>' +
      '<p class="vsl-acct__text">See what you have booked, open your group page and book the same again in a few taps. Members, use your member email.</p>' +
      '<label for="vsl-acct-email">Email</label>' +
      '<input id="vsl-acct-email" type="email" inputmode="email" autocomplete="email" maxlength="254" placeholder="you@example.com" required>' +
      '<button type="submit" class="vsl-acct__send">Email me a sign-in link</button>' +
      '<p class="vsl-acct__note" role="status" aria-live="polite">No password. We email you a link that signs you in.</p>' +
      "</form>"
    );
  }

  function accountBookingHtml(b, index) {
    var when = accountWhen(b);
    var chip = b.cancelled ? '<span class="vsl-acct__chip" data-tone="off">Cancelled</span>' : b.when ? '<span class="vsl-acct__chip">' + accountEsc(b.when) + "</span>" : "";
    var acts =
      !b.cancelled && (b.group_url || b.calendar_url)
        ? '<div class="vsl-acct__bk-acts">' +
          (b.group_url ? '<a class="vsl-acct__act' + (index === 0 ? " vsl-acct__act--go" : "") + '" href="' + accountEsc(b.group_url) + '" title="Your drivers, their waivers, and the track and car">Group page</a>' : "") +
          (b.calendar_url ? '<a class="vsl-acct__act" href="' + accountEsc(b.calendar_url) + '">Add to calendar</a>' : "") +
          "</div>"
        : "";
    return (
      '<div class="vsl-acct__bk"' + (b.cancelled ? ' data-off="1"' : "") + ">" +
      '<div class="vsl-acct__bk-top"><strong>' + accountEsc(b.activity) + "</strong>" + chip + "</div>" +
      '<div class="vsl-acct__bk-when">' + accountEsc(when.day) + " at " + accountEsc(when.time) + " · " + accountEsc(accountDrivers(b.drivers)) + " · " + accountEsc(b.lounge) + "</div>" +
      acts +
      "</div>"
    );
  }

  /* What can be booked again: the latest of each race-and-tickets combination, most recent first. */
  function accountAgainList(me) {
    var seen = {};
    var out = [];
    var all = (me.past || []).concat(me.upcoming || []);
    all.forEach(function (b) {
      if (!b.again || b.cancelled || out.length >= 3) return;
      var sig = b.again.url + "|" + b.again.tickets.map(function (t) { return t.option_id + ":" + t.quantity; }).join(",");
      if (seen[sig]) return;
      seen[sig] = true;
      out.push(b);
    });
    return out;
  }

  function accountSignedInHtml() {
    var me = account.me;
    var name = (me && me.first_name) || account.name;
    var head =
      '<div class="vsl-acct__head">' +
      '<div class="vsl-acct__hello">' + (name ? "Hi, " + accountEsc(name) : "You are signed in") + "</div>" +
      (account.fresh ? '<div class="vsl-acct__sub">You are signed in on this browser.</div>' : "") +
      (me && me.member
        ? '<div class="vsl-acct__member">' + accountEsc(me.member.tier) + " member" + (me.member.discount_pct > 0 ? " <i>" + accountEsc(me.member.discount_pct) + "% off your own ticket</i>" : "") + "</div>"
        : "") +
      "</div>";
    if (!me) {
      return (
        head +
        '<div class="vsl-acct__sec"><p class="vsl-acct__empty">' +
        (account.failed ? 'We could not load your bookings. <button type="button" class="vsl-acct__link" data-acct="reload">Try again</button>' : "Loading your bookings…") +
        "</p></div>" +
        '<div class="vsl-acct__foot"><button type="button" class="vsl-acct__link" data-acct="out">Sign out</button></div>'
      );
    }
    var upcoming = me.upcoming || [];
    var again = accountAgainList(me);
    var coming =
      '<div class="vsl-acct__sec"><h4>Coming up</h4>' +
      (upcoming.length
        ? upcoming.slice(0, 4).map(accountBookingHtml).join("") + (upcoming.length > 4 ? '<p class="vsl-acct__empty">And ' + (upcoming.length - 4) + " more in all my bookings.</p>" : "")
        : '<p class="vsl-acct__empty">Nothing booked right now.' + (again.length ? "" : " Pick a race and it will show up here.") + "</p>") +
      "</div>";
    var rebook = again.length
      ? '<div class="vsl-acct__sec"><h4>Book again</h4>' +
        again
          .map(function (b) {
            var when = accountWhen(b);
            return (
              '<div class="vsl-acct__again"><div><strong>' + accountEsc(b.activity) + " · " + accountEsc(accountDrivers(b.drivers)) + "</strong>" +
              "<span>" + (b.when ? "Booked for " : "Last raced ") + accountEsc(when.day) + " · " + accountEsc(b.lounge) + "</span></div>" +
              '<a class="vsl-acct__act vsl-acct__act--go" href="' + accountEsc(b.again.url + "#again=" + encodeURIComponent(b.id) + "&k=" + account.key) + '" title="Same race and tickets. You pick the new day and time.">Book again</a></div>'
            );
          })
          .join("") +
        "</div>"
      : "";
    var foot =
      '<div class="vsl-acct__foot">' +
      (me.bookings_url && (upcoming.length || (me.past || []).length) ? '<a href="' + accountEsc(me.bookings_url) + '">All my bookings</a>' : "") +
      (me.account_url ? '<a href="' + accountEsc(me.account_url) + '">' + (me.member ? "Member dashboard" : "My account") + "</a>" : "") +
      '<button type="button" class="vsl-acct__link" data-acct="out">Sign out</button>' +
      "</div>";
    return head + coming + rebook + foot;
  }

  function accountRender() {
    var el = account.el;
    if (!el) return;
    var btn = el.querySelector(".vsl-acct__btn");
    var panel = el.querySelector(".vsl-acct__panel");
    btn.innerHTML = accountButtonHtml();
    btn.setAttribute("data-in", account.key ? "1" : "0");
    btn.setAttribute("aria-label", account.key ? "Your bookings" : "Sign in");
    /* Typing is not thrown away by a redraw of the same form. */
    var typed = panel.querySelector("#vsl-acct-email");
    var keep = typed ? typed.value : "";
    panel.innerHTML = account.key ? accountSignedInHtml() : accountSignedOutHtml();
    var input = panel.querySelector("#vsl-acct-email");
    if (input && keep) input.value = keep;
  }

  function accountOpen(open) {
    var el = account.el;
    if (!el) return;
    var btn = el.querySelector(".vsl-acct__btn");
    el.classList.toggle("vsl-acct--open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    if (!open) return;
    /* On a phone the panel hangs under the header, edge to edge. */
    el.style.setProperty("--vsl-acct-top", Math.round(btn.getBoundingClientRect().bottom + 8) + "px");
    /* ...and stops above the Book Now bar pinned to the bottom of the screen. */
    var pinned = document.querySelector(".vsl-navbar__mcta");
    var below = pinned ? pinned.getBoundingClientRect() : null;
    el.style.setProperty("--vsl-acct-gap", (below && below.height && below.top < window.innerHeight ? Math.round(window.innerHeight - below.top + 10) : 16) + "px");
    if (account.key) {
      if (!account.loading && Date.now() - account.loadedAt > 60000) accountLoad();
    } else {
      var input = el.querySelector("#vsl-acct-email");
      if (input && window.matchMedia && window.matchMedia("(pointer:fine)").matches) input.focus();
    }
  }

  function accountLoad() {
    if (!account.key || account.loading) return;
    var key = account.key;
    account.loading = true;
    account.failed = false;
    fetch(ACCOUNT_BASE + "/api/my-bookings/me", { headers: { Authorization: "Bearer " + key }, cache: "no-store" })
      .then(function (res) {
        if (res.status === 401) return { signedOut: true };
        if (!res.ok) throw new Error("status " + res.status);
        return res.json();
      })
      .then(function (out) {
        if (account.key !== key) return;
        if (out.signedOut) {
          /* The key ran out, or was signed out somewhere else. */
          account.key = null;
          account.name = null;
          account.me = null;
          accountSave();
        } else {
          account.me = out;
          account.loadedAt = Date.now();
          if (out.first_name && out.first_name !== account.name) {
            account.name = out.first_name;
            accountSave();
          }
        }
      })
      .catch(function () {
        if (account.key === key) account.failed = true;
      })
      .then(function () {
        account.loading = false;
        accountRender();
      });
  }

  function accountNote(form, text, tone) {
    var note = form.querySelector(".vsl-acct__note");
    if (!note) return;
    note.textContent = text;
    if (tone) note.setAttribute("data-tone", tone);
    else note.removeAttribute("data-tone");
  }

  function accountSend(form) {
    var input = form.querySelector("input");
    var send = form.querySelector(".vsl-acct__send");
    var email = input ? input.value.trim() : "";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      accountNote(form, "Enter your email address.", "bad");
      return;
    }
    if (send.disabled) return;
    send.disabled = true;
    send.textContent = "Sending…";
    fetch(ACCOUNT_BASE + "/api/my-bookings/link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      /* The page to come back to once the link is opened. */
      body: JSON.stringify({ email: email, back: window.location.href.split("#")[0] })
    })
      .then(function (res) {
        if (res.ok) {
          account.sentTo = email;
          accountRender();
          return;
        }
        send.disabled = false;
        send.textContent = "Email me a sign-in link";
        if (res.status === 429) accountNote(form, "Too many tries. Wait a minute, then try again.", "bad");
        else if (res.status === 400) accountNote(form, "Enter your email address.", "bad");
        else accountNote(form, "We could not send the link just now. Try again in a minute.", "bad");
      })
      .catch(function () {
        send.disabled = false;
        send.textContent = "Email me a sign-in link";
        accountNote(form, "We could not reach Velocity. Check your connection and try again.", "bad");
      });
  }

  function accountSignOut() {
    var key = account.key;
    account.key = null;
    account.name = null;
    account.me = null;
    account.fresh = false;
    account.sentTo = null;
    accountSave();
    accountRender();
    /* The key stops working, not just forgotten here. */
    if (key) fetch(ACCOUNT_BASE + "/api/my-bookings/me", { method: "DELETE", headers: { Authorization: "Bearer " + key }, keepalive: true }).catch(function () {});
  }

  /* Puts the button in the header, between the lounge picker and Book Now. Safe to call again. */
  function mountAccount(root) {
    var actions = root && root.querySelector ? root.querySelector(".vsl-navbar__actions") : null;
    if (!actions || actions.querySelector(".vsl-acct")) return;
    if (!document.querySelector("style[data-vsl-acct]")) {
      var style = document.createElement("style");
      style.setAttribute("data-vsl-acct", "");
      /* Under .vsl-navbar, so the header's own reset (".vsl-navbar *") does not undo the spacing. */
      style.textContent = ACCOUNT_CSS.replace(/(^|[{},])(\.vsl-acct)/g, "$1.vsl-navbar $2");
      document.head.appendChild(style);
    }
    var el = document.createElement("div");
    el.className = "vsl-acct";
    el.innerHTML =
      '<button type="button" class="vsl-acct__btn" aria-haspopup="dialog" aria-expanded="false" aria-controls="vsl-acct-panel"></button>' +
      '<div class="vsl-acct__panel" id="vsl-acct-panel" role="dialog" aria-label="Your Velocity bookings"></div>';
    var cta = actions.querySelector(".vsl-navbar__cta");
    if (cta && cta.parentNode === actions) actions.insertBefore(el, cta);
    else actions.appendChild(el);
    account.el = el;

    /* A click in the panel can redraw it, taking the clicked thing off the page: noted here, so it is not read as a click outside. */
    var clickedInside = false;
    el.addEventListener("click", function (event) {
      var target = event.target;
      clickedInside = true;
      if (target.closest(".vsl-acct__btn")) {
        accountOpen(!el.classList.contains("vsl-acct--open"));
        return;
      }
      var act = target.closest("[data-acct]");
      if (!act) return;
      var what = act.getAttribute("data-acct");
      if (what === "out") accountSignOut();
      else if (what === "reload") accountLoad();
      else if (what === "retry") {
        account.sentTo = null;
        accountRender();
        var input = el.querySelector("#vsl-acct-email");
        if (input) input.focus();
      }
    });
    el.addEventListener("submit", function (event) {
      if (!event.target.classList.contains("vsl-acct__form")) return;
      event.preventDefault();
      accountSend(event.target);
    });
    document.addEventListener("click", function (event) {
      var inside = clickedInside || el.contains(event.target);
      clickedInside = false;
      if (el.classList.contains("vsl-acct--open") && !inside) accountOpen(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape" || !el.classList.contains("vsl-acct--open")) return;
      accountOpen(false);
      el.querySelector(".vsl-acct__btn").focus();
    });
    /* Signed in (or out) in another tab: the link from the email often opens in a new one. */
    window.addEventListener("storage", function (event) {
      if (event.key !== ACCOUNT_STORE) return;
      accountRead();
      account.me = null;
      account.loadedAt = 0;
      account.sentTo = null;
      accountRender();
      if (account.key) accountLoad();
    });

    accountRead();
    var arrived = accountTakeKey();
    accountRender();
    if (account.key) accountLoad();
    /* Straight back from the email: show them they are in. */
    if (arrived) accountOpen(true);
  }

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
    ignition: 1,
    "summer-special": 1,
    "fathers-day": 1,
    "spring-bundles": 1,
    "menu-2025": 1,
    "gift-cards": 1,
    "holiday-parties": 1,
    lemans: 1,
    halloween: 1,
    spookeasy: 1,
    blackfriday: 1,
    blog: 1
  };

  /* One URL serves both lounges; arriving here must not overwrite the visitor's saved city. */
  var SHARED_LOCATION_PAGE_KEYS = { "gift-cards": 1, "holiday-parties": 1, lemans: 1, halloween: 1, membership: 1, blackfriday: 1 };

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
    /* Houston league page not built yet; both locations resolve to the Dallas module */
    leagues: { houston: "dallas-leagues", dallas: "dallas-leagues" },
    about: { houston: "about", dallas: "dallas-home" },
    membership: { houston: "membership", dallas: "membership" },
    "gift-cards": { houston: "gift-cards", dallas: "gift-cards" },
    "holiday-parties": { houston: "holiday-parties", dallas: "holiday-parties" },
    lemans: { houston: "lemans", dallas: "lemans" },
    halloween: { houston: "halloween", dallas: "halloween" },
    spookeasy: { houston: "spookeasy", dallas: "spookeasy" },
    ignition: { houston: "ignition", dallas: "dallas-contact" },
    "summer-special": { houston: "summer-special", dallas: "dallas-home" },
    "fathers-day": { houston: "fathers-day", dallas: "dallas-home" }
  };

  window.VSL_REPLICA_BUILD_URL = function (loc, slug) {
    loc = loc === "dallas" ? "dallas" : "houston";
    /* Houston-only pages always resolve to Houston replica keys (matches production nav rewrite). */
    if (HOUSTON_ONLY_SLUGS[slug]) loc = "houston";
    var dallasPages = ["home", "party-packs", "book-now", "contact", "group-events", "corporate-events", "food-and-drink", "semi-private", "promotions", "buyout", "leagues"];
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
    "gift-cards": "gift-cards",
    "holiday-parties": "holiday-parties",
    lemans: "lemans",
    halloween: "halloween",
    spookeasy: "spookeasy",
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
    "dallas-buyout": "buyout",
    "dallas-leagues": "leagues",
    "dallas-membership": "membership"
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
  if (pageKey === "millionlaps" || pageKey === "million-laps") pageKey = "home";
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
    if (key === "millionlaps" || key === "million-laps") return "home";
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
    if (SHARED_LOCATION_PAGE_KEYS[key]) return null;
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
    var loc = resolveLocationFromPageKey(pageKey);
    if (loc !== "dallas" && loc !== "houston") return;
    syncLocationState(loc, "replica-page-key");
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
      '<li><a href="index.html?p=gift-cards">Gift Cards</a></li>' +
      '<li><a href="index.html?p=holiday-parties">Holiday Parties</a></li>' +
      '<li><a href="index.html?p=lemans">3-Hour Le Mans Endurance</a></li>' +
      '<li><a href="index.html?p=halloween">Fast &amp; Frightening Halloween Party</a></li>' +
      '<li><a href="index.html?p=spookeasy">Spookeasy Halloween Party (tickets)</a></li>' +
      '<li><a href="index.html?p=halloween-banner">Halloween home popup (preview)</a></li>' +
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
      '<li><a href="index.html?p=dallas-leagues">Dallas Leagues</a></li>' +
      '<li><a href="index.html?p=dallas-membership">Dallas Membership</a></li>' +
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
    applyPracticeBooking(wrapper, moduleKey);
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
      loadPromoBanner();
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
    /* The Dallas league banner is retired (league cancelled Oct 2026) and only
       loads on its own preview key. The Halloween popup owns the Houston and
       Dallas home pages until Oct 31 (its script hides it after). ROC stays on
       Book Now (its own script hides it after Sept 19). Nodes are moved to
       <body>, so drop any previous copy before injecting the page's banner. */
    var promoRoot = document.getElementById("replica-promo-root");
    [
      "roc-promo-card", "roc-promo-minimized", "roc-promo-strip", "roc-promo-strip-spacer",
      "sb-promo-card", "sb-promo-minimized", "sb-promo-strip", "sb-promo-strip-spacer",
      "dlg-promo-card", "dlg-promo-minimized", "dlg-promo-strip", "dlg-promo-strip-spacer",
      "hw-promo-card", "hw-promo-minimized"
    ].forEach(function (id) {
      var nodes = document.querySelectorAll("#" + id);
      for (var i = nodes.length - 1; i >= 0; i--) {
        if (nodes[i].parentNode) nodes[i].parentNode.removeChild(nodes[i]);
      }
    });
    if (promoRoot) promoRoot.innerHTML = "";
    if (!promoRoot) return Promise.resolve();
    if (pageKey === "league-banner") {
      return fetchReplicaText("../Dallas/Leagues/league-promo-banner.html", "league banner")
        .then(function (html) {
          promoRoot.innerHTML = html;
          executeInlineScripts(promoRoot);
        })
        .catch(function (err) {
          if (window.console && console.warn) console.warn("[Staging] League banner load failed:", err.message);
        });
    }
    if (pageKey === "home" || pageKey === "dallas-home" || pageKey === "halloween-banner") {
      return fetchReplicaText("../Halloween/halloween-promo-banner.html", "Halloween banner")
        .then(function (html) {
          promoRoot.innerHTML = html;
          executeInlineScripts(promoRoot);
        })
        .catch(function (err) {
          if (window.console && console.warn) console.warn("[Staging] Halloween banner load failed:", err.message);
        });
    }
    if (
      pageKey !== "book-now" &&
      pageKey !== "dallas-book-now" &&
      pageKey !== "roc-banner"
    ) {
      return Promise.resolve();
    }
    return fetchReplicaText("../Race of Champions/race-of-champions-promo-banner.html", "promo banner")
      .then(function (html) {
        promoRoot.innerHTML = html;
        executeInlineScripts(promoRoot);
      })
      .catch(function (err) {
        if (window.console && console.warn) console.warn("[Staging] Promo banner load failed:", err.message);
      });
  }

  function loadVslLocation() {
    return fetchReplicaText("../vsl-location.js?v=20261009a", "vsl-location.js")
      .then(function (js) {
        var s = document.createElement("script");
        s.textContent = js;
        document.head.appendChild(s);
      });
  }

  loadVslLocation()
    .catch(function () {})
    .then(function () {
      return fetchReplicaText("../velocity-navbar.html?v=20261009a", "navbar");
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
      mountAccount(navbarRoot);
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
