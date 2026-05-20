# Velocity Father's Day Bundles

Elementor HTML widget for the **Eat & Race** Father's Day bundles landing page. Aligned with **VSM 1.0.0** brand identity.

## File

| File | Use |
|------|-----|
| **[velocity-fathers-day-elementor.html](velocity-fathers-day-elementor.html)** | Paste into one Elementor **HTML widget** in a full-width section (column padding 0). Contains config script, Google Fonts, styles, markup, and binding JS. |
| **[fathers-day-promo-banner.html](fathers-day-promo-banner.html)** | Optional slim promo strip / banner markup (used by Velocity Staging preview). |

## Sections

| ID | Section |
|----|---------|
| `#spring-hero` | Hero with eyebrow, headline, CTA, and finish-line strip |
| `#spring-bundles` | Eat, Drink & Race bundles — card grid |
| `#spring-2seater` | 2-Seater bundles — 2-card row (when present in markup) |
| `#spring-cta` | Closing CTA panel with Book Now button |

## Configuration (`VSL_SPRING_CONFIG`)

Edit the `<script>` block at the top of the file:

- **`links`** — `quickRacer`, `quickPro`, `doubleRacer`, `doublePro`, `sprint`, `endurance`: checkout URLs for each Select Package button. `bookNow`: closing CTA link.
- **`images`** — `quickRacer`, `quickPro`, `doubleRacer`, `doublePro`, `sprint`, `endurance`: card hero images (full `https://…` URLs from Media Library). `heroFinishLine`: checkered finish-line strip image.
- **`elementorColumnOutdentPx`** — Widen slightly to compensate for Elementor column padding (try 12–18).

## Bundle pricing

| Bundle | Price | Regular |
|--------|-------|---------|
| Quick Race — Racer | $105 | $130 |
| Quick Race — Pro | $125 | $155 |
| Double Race — Racer | $135 | $180 |
| Double Race — Pro | $155 | $195 |
| The Sprint (2-seater) | $89 | $115 |
| The Endurance (2-seater) | $110 | $134 |

## Responsive behavior

- **Cards:** 2 columns ≥ 900px, 1 column below.
- **Hero:** Fluid clamp sizing for title and subcopy.
- **`prefers-reduced-motion`:** Disables card hover lift and button scale transforms.

## In-page scroll (hero → bundles)

Hero **View bundles** uses `data-vsl-soft-scroll href="#spring-bundles"` so the site header’s shared script (`velocity-navbar.html`) scrolls with `window.scrollTo` under the sticky nav—avoiding theme **scroll snap** jumps from raw `#` navigation. Add the same attribute to any Velocity hero CTA whose `href` is an in-page hash.

## Elementor notes

- If Elementor strips `<script>`, use a "Custom Code" plugin or allow scripts for the widget.
- The snippet uses `:has()` to remove Elementor widget container padding. If a white hairline appears above/below, tune `--vsl-bleed-top` / `--vsl-bleed-bottom` in Custom CSS.
- Set page-level SEO (title, description, OG tags) via your SEO plugin — the widget does not set meta tags.
