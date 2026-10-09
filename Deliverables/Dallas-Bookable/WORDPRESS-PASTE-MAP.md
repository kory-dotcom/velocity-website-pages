# WordPress paste map — Dallas Local SEO pages

Create parent page **Dallas** (slug: `dallas`) then child pages with matching slugs.
Paste HTML from `Dallas/{Folder}/velocity-*-elementor.html` into Elementor HTML widgets.
Configure Rank Math per page (unique Dallas title, description, self-referencing canonical).

| WP URL | Paste from |
|--------|------------|
| `/dallas/` | `Dallas/Home/velocity-home-elementor.html` |
| `/dallas/party-packs/` | `Dallas/Party Packs/velocity-party-packs-elementor.html` |
| `/dallas/book-now/` | `Dallas/Book Now/velocity-book-now-elementor.html` |
| `/dallas/contact/` | `Dallas/Contact/velocity-contact-elementor.html` |
| `/dallas/group-events/` | `Dallas/Parties & Events/velocity-parties-events-elementor.html` |
| `/dallas/corporate-events/` | `Dallas/Corporate Events/velocity-corporate-events-elementor.html` |
| `/dallas/food-and-drink/` | `Dallas/Food & Drink/velocity-food-drink-elementor.html` |
| `/dallas/semi-private/` | `Dallas/Semi-Private/velocity-semi-private-elementor.html` |
| `/dallas/promotions/` | `Dallas/Promotions/velocity-promotions-elementor.html` |
| `/dallas/membership/` | `Dallas/Memberships/velocity-membership-elementor.html` |
| `/dallas/buyout/` | `Dallas/Buyout/velocity-buyout-elementor.html` |
| `/dallas/leagues/` | `Dallas/Leagues/velocity-leagues-elementor.html` |

**Leagues page (coming-soon holding page, Oct 2026).** The fall-2026 league was cancelled, so `Dallas/Leagues/velocity-leagues-elementor.html` is now a hero + location page with no registration, leaderboard, calendar, cars or tracks. The `data-vsl-config` JSON only carries `bookNow` / `contact` / `membership` / `maps` / `notify` (mailto) links.

- The full season build is archived at `Dallas/Leagues/archive/velocity-leagues-elementor-fall-2026-full-season.html`. When a new season is announced, start from that file: set `links.register` (Stripe Payment Link), `links.leaderboard`, `season.startDate`, `season.price` / `season.tax`, and point the Payment Link's after-payment redirect at `https://velocitysimlounge.com/dallas/leagues/?registered=1`.
- The league promo banner (`Dallas/Leagues/league-promo-banner.html`) was removed from `velocity-navbar.html`; re-embed it from that file when the league returns.

Paste updated `velocity-navbar.html` + `velocity-footer.html` into Elementor global widgets (location logic is inlined in the navbar — no separate `vsl-location.js` upload).

See `rank-math-redirects.txt` and `gsc-urls.txt` for post-launch SEO steps.
