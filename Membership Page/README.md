# Velocity membership landing (VSM 1.0.0)

Static HTML aligned with **Visual Standard Manual (VSM1.0.0) — Velocity Sim Racing Lounge** and the membership mockups (benefits grid, three tiers, FAQ). Build the **top hero / intro band in Elementor** (or Theme Builder); this snippet starts at **what’s included**.

## Files

| File | Use |
|------|-----|
| **[velocity-membership-elementor.html](velocity-membership-elementor.html)** | **Recommended for Elementor:** one paste — benefits, pricing, FAQ, fonts, styles, scripts. No duplicate `<head>`/schema (set SEO on the WP page). |
| [velocity-membership-page.html](velocity-membership-page.html) | Standalone browser preview + full **SEO** (`<head>`, JSON-LD). |
| [velocity-membership-cards.html](velocity-membership-cards.html) | **Benefits only** if you build pricing/FAQ with native Elementor widgets. |

**Maintenance:** Copy changes between **elementor** and **page** files as needed, or treat [velocity-membership-page.html](velocity-membership-page.html) as the source of truth and regenerate the Elementor bundle.

### Better fit with the rest of the site (optional)

For the closest match to your global theme: keep **header/footer** (and typography, if possible) from **Theme Builder** / the active theme; use **Elementor sections** for hero and simple blocks; use this HTML widget for flip-cards and the exact VSM layout below the hero. Global colors: add the same CSS variables under **Site Settings → Custom CSS** or a child theme so other sections can share the palette.

## VSM color tokens (reference)

These match the annotated tokens in the HTML; confirm against the PDF if brand updates. Per VSM: **accent gradients** (e.g. Sector Red + Digital Magenta) are for high-restraint CTAs and special cases—not large section backgrounds. The pricing block uses **Obsidian Core** with a subtle **Obsidian + Deep Indigo** neutral wash on **`.vsl-pricing::before`**, then the **Light Map** motif on **`.vsl-pricing::after`** (above the wash so it isn’t painted over by the gradient). Source: `Deliverables/Light Map Assets/SVG/Map Motifs - LightAsset 164.svg`, recolored to white **~14%** fill-opacity, **`background-size: min(130vw, 2000px)`**, **`50% 45%`** (see `.vsl-pricing::before` / `::after` in the HTML).

| Token | Hex | Notes |
|-------|-----|--------|
| Sector Red | `#D22026` | Accents |
| Digital Magenta | `#EE265F` | CTAs, accents |
| Apex Yellow | `#FDC70C` | Dark-surface highlights, hero button outline |
| Synthetic Blue | `#293893` | Benefits heading |
| Obsidian Core | `#10182B` | Primary dark backgrounds (pricing band, card backs); FAQ uses light `#fafafa` like benefits |
| Deep Indigo | `#191B4D` | Neutral background gradients only (with Obsidian)—not for accent washes |
| Circuit White | `#EAEAEA` | **Light text on Obsidian** (e.g. pricing subcopy)—**not** the large off-white section fill; benefits + FAQ bands use **`#fafafa`** |
| Alloy Silver | `#DFDFDE` | Light section backgrounds |
| Mist Gray | `#B2AEBF` | Softer secondary on dark where contrast allows (e.g. flip-card backs); **pricing band intro** uses **Circuit White** for readability |
| Slate Violet | `#5F5782` | Paragraph text on **light** surfaces (tier bullets, FAQ answers)—not in gradients |

**Typography:** **Inter** loads from Google Fonts for body/UI. **Khand** (italic) loads for **display headings**: hero title, section titles (benefits / pricing / FAQ), benefit card `h3` labels and backs, tier names (**Racer / Pro / Ultimate**), and FAQ question labels—all set to **uppercase** via CSS. `--font-display` defaults to **Khand**. When **VSRL** is licensed, upload it in **Elementor → Custom Fonts** (or enqueue in a child theme), then override in **Custom CSS**: `.vsl-membership { --font-display: "VSRL", "Khand", system-ui, sans-serif; }` (use the exact family name Elementor outputs).

**Implemented scale (rem, Perfect Fourth from 16px base):** `--vsl-text-xs` (12px), `--vsl-text-body` (16px), `--vsl-text-body-lg` (≈21px). **Fluid clamps (rem + vw)** for breakpoints: `--vsl-text-section` (benefits / pricing / FAQ titles), `--vsl-text-section-sub` (pricing intro + tier tags), `--vsl-text-tier-price`, `--vsl-text-tier-name` (extra bump for **Racer / Pro / Ultimate** under **639px**), `--vsl-text-card-label`, `--vsl-text-card-back-title`, `--vsl-text-card-back-body` (flip-card back copy), `--vsl-text-faq-label`. Section titles use `text-wrap: balance` where supported; under **639px** width, title `line-height` bumps to **1.2**, benefit cards get larger label/back type, label band uses `min-height: 0` + centered title, card back is top-aligned with bigger headings/body, and `.vsl-card-inner` aspect is **118%** (was 120%). Spacing tokens: `--gutter` 24px, `--page-margin` 64px, `--soft` 8px.

### VSM typography & layout (reference for edits)

| Topic | Rule of thumb |
|--------|----------------|
| **Scale** | Perfect Fourth (**1.333**) from 16pt body; oversized display for impact, Inter for readable body. |
| **Alignment** | **Prefer left** for dense or multi-line content (menus, tiers, FAQ). **Center** only when supporting copy is **≤2 lines**; don’t mix center headings with left body. **Never right-align** type. |
| **Short statements** | Marketing H1-style lines: **3–5 words**, break near the **midpoint** for optical balance; color pairs depend on **light vs Obsidian** background (see VSM “Short Statement Typography”). |
| **Accent on dark UI** | Use accent **sparingly** for **interaction** (CTAs, key data)—not full-bleed section backgrounds. |
| **Grid** | **12-column** logic, **24px** gutters, **64px** outer margin target, **8px** internal “soft” padding on clickable controls. |
| **Brand shapes (e.g. swoosh)** | Low-context areas; may **bleed** past the grid from the left; pairings: neutral+neutral, neutral+accent, neutral+monochrome—**not** random accent gradients on large membership surfaces. |

**Current snippet behavior:** **Benefits**, **pricing**, and **FAQ** section titles are **centered**; benefits use two lines (Synthetic Blue + Digital Magenta on light `#fafafa`). **Pricing** title stays **Apex Yellow** on the Obsidian band; intro subcopy is **Circuit White** (medium weight) for contrast, centered. Each **tier card** is a single **link** to checkout (`data-vsl-join`); **Join now** is visual only; hover **scales** the active tier slightly on fine pointers. **FAQ** sits on light `#fafafa` with **Synthetic Blue** title; open rows keep the **same** header background as closed (no magenta bar); answers have **extra padding**; section has **extra bottom padding** before the theme footer. Tier lists and FAQ answers use **Slate Violet** on white panels. Benefit flip cards no longer show a “hover or tap” hint line.

## Section anchor IDs (CTAs)

| ID | Section |
|----|---------|
| `#membership-benefits` | What’s included (flip cards) — first block in this paste |
| `#memberships` / `.memberships` | Pricing (membership tiers) — same section: `id` for anchors, `class` for extra CSS |
| `#membership-faq` | FAQ |

Set **`VSL_CONFIG.joinLinks`** (`racer`, `pro`, `ultimate`) to your checkout/landing URLs. For the hero **Learn more** (or equivalent), set the link to **`#membership-benefits`** on the same page (or the full page URL + `#membership-benefits`) so it scrolls to **What’s included in your membership**.

## SEO & Google (full page HTML)

[velocity-membership-page.html](velocity-membership-page.html) includes:

| Item | Purpose |
|------|--------|
| **Title + meta description** | Clear query targets (sim racing, membership, pricing). |
| **robots / googlebot** | Indexing + default snippet/image preview hints. |
| **Canonical URL** | One preferred URL to avoid duplicate-content issues. |
| **Open Graph + Twitter Card** | Correct title/description/image when links are shared. |
| **`<main id="primary-content">`** | Landmark for assistive tech (indirectly helps quality signals). |
| **JSON-LD (`WebSite`, `Organization`, `WebPage`, `BreadcrumbList`, `FAQPage`)** | Structured data for rich-result eligibility (especially FAQ). |

**Before launch, search-and-replace** every `https://www.example.com` (and image paths) with your real domain—canonical, `og:url`, `twitter`, and all `@id` / `url` fields in the JSON-LD block must stay in sync.

- Add **one** high-quality **1200×630** image at the URL used in `og:image` / `twitter:image` (replace `og-velocity-membership.jpg`).
- Point **Organization `logo`** and **`sameAs`** (in JSON-LD) to your real logo file and public social profiles (empty `sameAs` is valid until you fill it).

**WordPress / plugins:** Let **one system** own the global title, meta description, and canonical (Yoast SEO, Rank Math, SEOPress, etc.). If the plugin outputs its own **FAQ** or **Organization** schema, **remove or disable the duplicate block** in the HTML widget to avoid conflicting structured data—keep FAQ answer text in sync with whatever schema you ship.

The in-page **FAQ answers** match the **FAQPage** JSON-LD; if you change copy in Elementor accordions, update the JSON-LD (or remove it and rely on the plugin).

**The benefits-only snippet** ([velocity-membership-cards.html](velocity-membership-cards.html)) has no `<head>` meta; SEO for that embed is handled by the WordPress page + plugin.

## Responsive behavior

- **Benefits:** 5 columns (≥1200px) → 2 columns (640px–1199px) → 1 column (&lt;640px).
- **Pricing:** 3 columns desktop → 1 column ≤900px.
- **Flip cards:** Hover flip on fine pointers; tap toggles on touch; **Enter** / **Space** when focused. `prefers-reduced-motion` removes transition; hover flip is disabled in that mode so content isn’t motion-only.

## Image URLs (`VSL_CONFIG`)

Edit **`window.VSL_CONFIG`** in the **first `<script>` block** right under the file’s intro comment ([velocity-membership-elementor.html](velocity-membership-elementor.html) / [velocity-membership-cards.html](velocity-membership-cards.html)), or at the **top of `<head>`** right after `<meta viewport>` on the [standalone page](velocity-membership-page.html):

- **`images`** — `benefit1` … `benefit5`: full **https://…** URLs from **Media → Library** (Copy URL). **`heroFinishLine`** — checkered strip PNG for the dark membership hero (defaults to the Velocity CDN URL if omitted).
- **`joinLinks`** — `racer`, `pro`, `ultimate`: full URLs for each **Join now** button.

Images are applied on load via `data-vsl-benefit`; empty strings keep a gray placeholder until you add URLs.

**Side gap in Elementor:** Columns/widgets add horizontal padding. `.vsl-membership` uses **`elementorColumnOutdentPx`** (CSS variable `--vsl-outdent`) to widen slightly and pull flush. The benefits snippet defaults to **12**; the full page defaults to **0** (avoid horizontal scroll in local preview). If the strip persists, try **14–18** or set the HTML widget **Advanced → Padding** to **0**, and/or reduce column padding in Elementor.

**White line above/below the snippet:** The snippet zeros **`main`** vertical spacing, applies **`--vsl-hero-bleed-top`** and **`--vsl-hero-bleed-bottom`** (defaults **-12px** each) when the dark hero is the first section, and (in supporting browsers) removes **Elementor HTML widget** top and bottom padding via `:has(.vsl-membership)`. Tune in **Custom CSS** on `.vsl-membership` (e.g. **-18px** if a hairline remains, **0** if content overlaps the header or footer).

**Hairline under header:** The benefits section uses **`--vsl-benefits-top-pull`** (default **8px**) — a small negative top margin plus matching padding so the background meets the section above (e.g. a theme header or another Elementor block). **When the built-in dark membership hero (`.vsl-membership-hero`) sits directly above benefits**, that pull is turned off automatically so the checkered finish line is not covered by the white band. If a gap appears above benefits in other layouts, add **Custom CSS**: `.vsl-benefits { --vsl-benefits-top-pull: 12px; }` (try up to **16px**).

Optional background assets from [Deliverables/](Deliverables/): V Swoosh and map motif SVGs (upload to Media Library).

## WordPress / Elementor

### Recommended (maintainable)

- Build **header/nav** in **Theme Builder**, not inside these snippets.
- **Hero**: Section + Heading + Text + Button in Elementor; dark background + optional finish-line / checkered art from brand assets ([Deliverables/Finish Line/](Deliverables/Finish%20Line/SVG/) etc.).
- **Benefits**: Either paste [velocity-membership-cards.html](velocity-membership-cards.html) into an **HTML** widget, or rebuild with Image + Text widgets in a 5-column container (no flip).
- **Pricing**: Three containers or a pricing widget; match colors to tokens (all tiers styled equally unless you add a badge in Elementor).
- **FAQ:** Prefer **Elementor Accordion** for editor-friendly updates. Use the FAQ *questions* from the mockup; paste answers from your ops/legal team. If you use the accordion, omit the FAQ block from the HTML paste.

Custom CSS for Elementor can mirror `.vsl-*` rules under a parent class to avoid theme clashes.

### Single HTML widget (full membership content)

1. Open **[velocity-membership-elementor.html](velocity-membership-elementor.html)**.
2. Select all → copy → paste into one **HTML** widget in a **full-width** section (column padding 0 if possible).
3. If Elementor strips `<script>`, allow scripts for that widget or use a “Custom Code” plugin—test on staging.
4. For SEO, configure the **WordPress page** title/description/FAQ schema; do **not** expect the widget to set meta tags.
