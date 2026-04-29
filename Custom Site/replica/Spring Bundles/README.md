# Velocity Spring Bundles (April 2026)

Elementor HTML widget for the **Eat, Drink, & Race** spring bundles landing page. Aligned with **VSM 1.0.0** brand identity.

## File

| File | Use |
|------|-----|
| **[velocity-spring-bundles-elementor.html](velocity-spring-bundles-elementor.html)** | Paste into one Elementor **HTML widget** in a full-width section (column padding 0). Contains config script, Google Fonts, styles, markup, and binding JS. |

## Sections

| ID | Section |
|----|---------|
| `#spring-hero` | Hero with eyebrow, headline, CTA, and finish-line strip |
| `#spring-bundles` | Eat, Drink & Race bundles — 2×2 card grid (Quick Race Racer/Pro + Double Race Racer/Pro) |
| `#spring-2seater` | 2-Seater Spring bundles — 2-card row (The Sprint / The Endurance) |
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

## Elementor notes

- If Elementor strips `<script>`, use a "Custom Code" plugin or allow scripts for the widget.
- The snippet uses `:has()` to remove Elementor widget container padding. If a white hairline appears above/below, tune `--vsl-bleed-top` / `--vsl-bleed-bottom` in Custom CSS.
- Set page-level SEO (title, description, OG tags) via your SEO plugin — the widget does not set meta tags.
