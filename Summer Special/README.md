# Velocity Student Summer Special

Elementor HTML widget for the **Student Summer Special** promotion landing page (route **`/summer-special`**). Cloned from the Father's Day bundles page and aligned with **VSM 1.0.0** brand identity. Runs all of **July 2026**.

## File

| File | Use |
|------|-----|
| **[velocity-summer-special-elementor.html](velocity-summer-special-elementor.html)** | Paste into one Elementor **HTML widget** in a full-width section (column padding 0). Contains config script, Google Fonts, styles, markup, and binding JS. |

## Sections

| ID | Section |
|----|---------|
| `#summer-hero` | Hero with eyebrow, headline, and "See the deal" soft-scroll CTA |
| `#summer-offer` | Single featured offer card — Student Summer Special |
| `#summer-cta` | Closing CTA promoting Party Packs (link **`partyPacks`**) |

## Offer

| Item | Value |
|------|-------|
| Price | **$19.99 per race** (student) |
| Upgrades | Pro & Ultimate available at booking |
| Ages | 5+ |
| Duration | 25 minute racing experience |
| Format | Drive solo or with friends |
| Level | Beginner friendly |

## Configuration (`VSL_SUMMER_CONFIG`)

Edit `data-vsl-config` JSON on `.vsl-summer`:

- **`links.studentRace`** — Roverd booking URL for the $19.99 student Quick Race (`book.velocitysimlounge.com/book/student-summer-special-approx-25-mins/33`). Opens in the in-page booking modal automatically.
- **`links.partyPacks`** — Velocity Party Packs page (`/party-packs/`).
- **`images.offer`** — booking-card image. Currently Kelci's `Card.png` (1600×900). Recommend re-uploading as `.webp` for weight.
- **`heroVideo`** — hero background. Currently Kelci's cockpit shot `HERO.png` (1920×1080). Accepts a Vimeo URL, a video file, or an image URL; images render as the hero banner behind a legibility scrim. Recommend re-uploading as `.webp`.
- **`elementorColumnOutdentPx`** — Compensates for Elementor column padding (try 12–18 if a hairline appears).

## Location gating

Uses `data-vsl-houston-only` + `VSL_LOCATION.setupHoustonOnlyPage`, so the offer is shown as **Houston-only** (consistent with prior promotions). If the special also runs in Dallas, remove the `data-vsl-houston-only` wrapper (or update the `setupHoustonOnlyPage` call) in the markup.

## Local preview

Registered in the staging router (`VelocityStagingSite/replica-app.js`) as page key **`summer-special`**:

- `http://localhost:8000/VelocityStagingSite/index.html?p=summer-special`
- Path aliases `/summer-special` and `/summer-special/` map to it.

## Elementor notes

- If Elementor strips `<script>`, use a "Custom Code" plugin or allow scripts for the widget.
- Set page-level SEO (title, description, OG tags) via your SEO plugin — the widget does not set meta tags.
