/* ========================================================================
   Velocity CMS Page Builder
   
   Reads the original Elementor HTML page modules, injects data-cms attributes
   on specific elements (preserving all styling & structure), and wraps each
   in a full HTML document with navbar/footer/CMS hydration script.
   
   Usage: node scripts/build-pages.js
   ======================================================================== */

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const REPLICA_DIR = path.join(__dirname, '..', 'replica');
const PAGES_DIR = path.join(__dirname, '..', 'pages');
const NAVBAR_PATH = path.join(REPLICA_DIR, 'velocity-navbar.html');

// Source page modules (original Elementor HTML)
const PAGES = {
  'home': {
    source: 'Home/velocity-home-elementor.html',
    title: 'Velocity Sim Racing Lounge | Houston',
    cms: [
      // Promos section
      { selector: '#home-promos h2', attr: 'data-cms-html', value: 'promos.heading' },
      { selector: '#home-promos .vsl-home-promos__sub', attr: 'data-cms', value: 'promos.subcopy' },
      { repeater: {
        path: 'promos.cards',
        container: '#home-promos [data-promos-track]',
        item: '.vsl-home-promo-card',
        fields: {
          'badge': '.vsl-home-promo-card__badge',
          'title': '.vsl-home-promo-card__name',
          'description': '.vsl-home-promo-card__desc',
          'ctaText': '.vsl-home-promo-card__cta',
          'ctaLink': { selector: '.vsl-home-promo-card__cta', attr: 'href' },
          'image': { selector: '.vsl-home-promo-card__media img', attr: 'src' }
        }
      }},
      // How It Works section
      { selector: '#home-how-it-works h2', attr: 'data-cms-html', value: 'howItWorks.heading' },
      { selector: '#home-how-it-works .vsl-home-how__sub', attr: 'data-cms', value: 'howItWorks.subcopy' },
      { repeater: {
        path: 'howItWorks.steps',
        container: '#home-how-it-works .vsl-home-how__steps',
        item: '.vsl-home-step',
        fields: {
          'number': '.vsl-home-step__badge-num, .vsl-home-step__num',
          'title': '.vsl-home-step__title-label, .vsl-home-step__title',
          'description': '.vsl-home-step__text'
        }
      }},
      // Built For section
      { selector: '#home-built-for h2', attr: 'data-cms-html', value: 'builtFor.heading' },
      { selector: '#home-built-for .vsl-home-built__text:first-of-type', attr: 'data-cms', value: 'builtFor.body' },
      { selector: '#home-built-for .vsl-home-built__list', attr: 'data-cms-lines-items', value: 'builtFor.checklist' },
      { selector: '#home-built-for .vsl-home-built__text:last-of-type', attr: 'data-cms', value: 'builtFor.secondParagraph' },
      { selector: '#home-built-for .vsl-home-built__cta', attr: 'data-cms', value: 'builtFor.ctaText' },
      // Simulators section
      { selector: '#home-sims h2', attr: 'data-cms-html', value: 'simulators.heading' },
      { selector: '#home-sims .vsl-home-sims__sub', attr: 'data-cms', value: 'simulators.subcopy' },
      { repeater: {
        path: 'simulators.cards',
        container: '#home-sims .vsl-home-sims__grid',
        item: '.vsl-home-sim-card',
        fields: {
          'title': '.vsl-home-sim-card__title',
          'tag': '.vsl-home-sim-card__tag',
          'image': { selector: 'img', attr: 'src' }
        }
      }},
      { selector: '#home-sims .vsl-home-sims__cta', attr: 'data-cms', value: 'simulators.ctaText' },
      // Reviews section
      { selector: '#home-reviews h2', attr: 'data-cms-html', value: 'reviews.heading' },
      { selector: '#home-reviews .vsl-home-reviews__rating', attr: 'data-cms', value: 'reviews.rating' },
      { selector: '#home-reviews .vsl-home-reviews__count', attr: 'data-cms', value: 'reviews.reviewCount' },
      { repeater: {
        path: 'reviews.reviews',
        container: '#home-reviews .vsl-home-reviews__grid',
        item: '.vsl-home-review',
        fields: {
          'quote': '.vsl-home-review__text',
          'author': '.vsl-home-review__author'
        }
      }},
      // CTA section
      { selector: '.vsl-home-cta h2', attr: 'data-cms-html', value: 'cta.heading' },
      { selector: '.vsl-home-cta .vsl-home-cta__text', attr: 'data-cms', value: 'cta.subcopy' }
    ]
  },

  'about': {
    source: 'About : How it Works Page_files/velocity-about-how-it-works-elementor.html',
    title: 'How it Works | Velocity Sim Racing Lounge',
    cms: [
      { selector: '#how-hero h1', attr: 'data-cms-html', value: 'hero.heading' },
      { selector: '#how-hero .vsl-how-hero__sub', attr: 'data-cms', value: 'hero.subcopy' },
      { selector: '#how-intro h2', attr: 'data-cms-html', value: 'intro.heading' },
      { selector: '#how-intro .vsl-how-intro__copy .vsl-how-copy', attr: 'data-cms', value: 'intro.body' },
      { selector: '#how-intro aside h3', attr: 'data-cms', value: 'intro.asideTitle' },
      { selector: '#how-intro aside p', attr: 'data-cms', value: 'intro.asideBody' },
      { selector: '#racing h2', attr: 'data-cms-html', value: 'racing.heading' },
      { repeater: {
        path: 'racing.steps',
        container: '#racing .vsl-how-flow__steps',
        item: '.vsl-how-step',
        fields: {
          'number': '.vsl-how-step__num',
          'title': 'h3',
          'description': 'p'
        }
      }},
      { selector: '#our_simulators h2', attr: 'data-cms-html', value: 'simulators.heading' },
      { selector: '#how-cars-tracks h2', attr: 'data-cms-html', value: 'carsAndTracks.heading' },
      { selector: '#how-cars-tracks aside h3', attr: 'data-cms', value: 'carsAndTracks.proTipTitle' },
      { selector: '#how-cars-tracks aside p', attr: 'data-cms', value: 'carsAndTracks.proTipBody' },
      { selector: '#how-faq h2', attr: 'data-cms-html', value: 'faq.heading' },
      { repeater: {
        path: 'faq.items',
        container: '#how-faq .vsl-how-faq',
        item: '.vsl-how-faq__item',
        fields: {
          'question': '.vsl-how-faq__label',
          'answer': '.vsl-how-faq__answer'
        }
      }},
      { selector: '#how-cta h2', attr: 'data-cms-html', value: 'cta.heading' },
      { selector: '#how-cta .vsl-how-cta__panel > p', attr: 'data-cms', value: 'cta.subcopy' }
    ]
  },

  'promotions': {
    source: 'Promotions/velocity-promotions-elementor.html',
    title: 'Deals & Promotions | Velocity Sim Racing Lounge',
    cms: [
      { selector: '#promo-hero .vsl-promo-hero__eyebrow', attr: 'data-cms', value: 'hero.eyebrow' },
      { selector: '#promo-hero h1', attr: 'data-cms-html', value: 'hero.heading' },
      { selector: '#promo-hero .vsl-promo-hero__sub', attr: 'data-cms', value: 'hero.subcopy' },
      { selector: '#promo-discounts h2', attr: 'data-cms-html', value: 'discounts.heading' },
      { selector: '#promo-discounts .vsl-promo-section-sub', attr: 'data-cms', value: 'discounts.subcopy' },
      { repeater: {
        path: 'discounts.cards',
        container: '#promo-discounts .vsl-promo-discounts__grid',
        item: '.vsl-promo-discount-card',
        fields: {
          'title': '.vsl-promo-discount-card__name',
          'description': '.vsl-promo-discount-card__desc',
          'badge': '.vsl-promo-discount-card__badge',
          'note': '.vsl-promo-discount-card__note'
        }
      }},
      { selector: '#promo-ladies h2', attr: 'data-cms-html', value: 'ladiesNight.heading' },
      { selector: '#promo-ladies .vsl-promo-ladies__eyebrow', attr: 'data-cms', value: 'ladiesNight.schedule' },
      { selector: '#promo-ladies .vsl-promo-ladies__time', attr: 'data-cms', value: 'ladiesNight.time' },
      { selector: '#promo-ladies .vsl-promo-ladies__desc', attr: 'data-cms', value: 'ladiesNight.description' },
      { selector: '#promo-spotlight h2', attr: 'data-cms-html', value: 'spotlight.heading' },
      { selector: '#promo-spotlight .vsl-promo-section-sub', attr: 'data-cms', value: 'spotlight.subcopy' },
      { repeater: {
        path: 'spotlight.cards',
        container: '#promo-spotlight .vsl-promo-spotlight__grid',
        item: '.vsl-promo-spotlight-card',
        fields: {
          'title': 'h3',
          'description': '.vsl-promo-spotlight-card__desc'
        }
      }},
      { selector: '#promo-seasonal h2', attr: 'data-cms-html', value: 'seasonal.heading' },
      { selector: '#promo-seasonal .vsl-promo-section-sub', attr: 'data-cms', value: 'seasonal.subcopy' },
      { selector: '#promo-seasonal h3', attr: 'data-cms-html', value: 'seasonal.title' },
      { selector: '#promo-seasonal .vsl-promo-seasonal__copy', attr: 'data-cms', value: 'seasonal.description' }
    ]
  },

  'membership': {
    source: 'Membership Page/velocity-membership-elementor.html',
    title: 'Membership | Velocity Sim Racing Lounge',
    cms: [
      { selector: '#membership-hero h1', attr: 'data-cms-html', value: 'hero.heading' },
      { selector: '#membership-hero .vsl-membership-hero__sub', attr: 'data-cms', value: 'hero.subcopy' },
      { selector: '#memberships h2', attr: 'data-cms-html', value: 'tiers.heading' },
      { selector: '#memberships .vsl-pricing__sub', attr: 'data-cms', value: 'tiers.subcopy' },
      { repeater: {
        path: 'tiers.plans',
        container: '#memberships .vsl-pricing__grid',
        item: '.vsl-tier',
        fields: {
          'name': '.vsl-tier__name',
          'price': '.vsl-tier__price',
          'tag': '.vsl-tier__tag',
          'features': { selector: '.vsl-tier__list', lines: true },
          'joinLink': { selector: '', attr: 'href', applyToItem: true }
        }
      }},
      { selector: '#membership-faq h2', attr: 'data-cms-html', value: 'faq.heading' },
      { repeater: {
        path: 'faq.items',
        container: '#membership-faq .vsl-faq__list',
        item: '.vsl-faq__item',
        fields: {
          'question': '.vsl-faq__label',
          'answer': '.vsl-faq__answer'
        }
      }}
    ]
  },

  'contact': {
    source: 'Contact/velocity-contact-elementor.html',
    title: 'Contact | Velocity Sim Racing Lounge',
    cms: [
      { selector: '#loc-hero h1', attr: 'data-cms', value: 'hero.heading' },
      { selector: '#loc-hero .vsl-loc-hero__sub', attr: 'data-cms', value: 'hero.subcopy' },
      { selector: '#loc-about h2', attr: 'data-cms-html', value: 'about.heading' },
      { selector: '#loc-about .vsl-loc-about__text', attr: 'data-cms', value: 'about.body' },
      { selector: '#faq h2', attr: 'data-cms-html', value: 'faq.heading' },
      { repeater: {
        path: 'faq.items',
        container: '#faq .vsl-faq__list',
        item: '.vsl-faq__item',
        fields: {
          'question': '.vsl-faq__label',
          'answer': '.vsl-faq__answer'
        }
      }}
    ]
  },

  'corporate-events': {
    source: 'Corporate Events/velocity-corporate-events-elementor.html',
    title: 'Corporate Events | Velocity Sim Racing Lounge',
    cms: [
      { selector: '#corporate-hero h1', attr: 'data-cms-html', value: 'hero.heading' },
      { selector: '#corporate-hero .vsl-corp-hero__sub', attr: 'data-cms', value: 'hero.subcopy' },
      { selector: '#corporate-hero .vsl-corp-hero__cta', attr: 'data-cms', value: 'hero.ctaText' },
      { selector: '#corporate-venue h2', attr: 'data-cms-html', value: 'venue.heading' },
      { selector: '#corporate-venue .vsl-corp-section__sub', attr: 'data-cms', value: 'venue.subcopy' },
      { selector: '#corporate-perfect-for h2', attr: 'data-cms-html', value: 'perfectFor.heading' },
      { selector: '#corporate-enhancements h2', attr: 'data-cms-html', value: 'enhancements.heading' },
      { repeater: {
        path: 'enhancements.cards',
        container: '#corporate-enhancements .vsl-corp-enh__grid',
        item: '.vsl-corp-enh-card',
        fields: {
          'title': 'h3',
          'description': 'p'
        }
      }},
      { selector: '#corporate-mobile-sim h2', attr: 'data-cms-html', value: 'mobileSim.heading' },
      { selector: '#corporate-included h2', attr: 'data-cms-html', value: 'included.heading' },
      { selector: '#corporate-book h2', attr: 'data-cms-html', value: 'cta.heading' }
    ]
  },

  'parties-events': {
    source: 'Parties & Events/velocity-parties-events-elementor.html',
    title: 'Group Events | Velocity Sim Racing Lounge',
    cms: [
      { selector: '#events-hero h1', attr: 'data-cms-html', value: 'hero.heading' },
      { selector: '#events-hero .vsl-events-hero__tagline', attr: 'data-cms', value: 'hero.tagline' },
      { selector: '#events-types h2', attr: 'data-cms-html', value: 'eventTypes.heading' },
      { repeater: {
        path: 'eventTypes.cards',
        container: '#events-types .vsl-events-types__grid',
        item: '.vsl-events-card',
        fields: {
          'title': '.vsl-events-card__name',
          'description': '.vsl-events-card__desc',
          'meta': '.vsl-events-card__meta'
        }
      }},
      { selector: '#events-includes h2', attr: 'data-cms-html', value: 'includes.heading' },
      { selector: '#events-difference h2', attr: 'data-cms-html', value: 'difference.heading' },
      { selector: '#events-faq h2', attr: 'data-cms-html', value: 'faq.heading' },
      { selector: '#events-cta h2', attr: 'data-cms-html', value: 'cta.heading' }
    ]
  },

  'party-packs': {
    source: 'Party Packs/velocity-party-packs-elementor.html',
    title: 'Party Packs | Velocity Sim Racing Lounge',
    cms: [
      { selector: '#pp-hero .vsl-pp-hero__eyebrow', attr: 'data-cms', value: 'hero.eyebrow' },
      { selector: '#pp-hero h1', attr: 'data-cms-html', value: 'hero.heading' },
      { selector: '#pp-hero .vsl-pp-hero__sub', attr: 'data-cms', value: 'hero.subcopy' },
      { selector: '#pp-included h2', attr: 'data-cms-html', value: 'included.heading' },
      { repeater: {
        path: 'included.cards',
        container: '#pp-included .vsl-pp-included__grid',
        item: '.vsl-pp-included-card',
        fields: {
          'title': '.vsl-pp-included-card__name',
          'description': '.vsl-pp-included-card__desc'
        }
      }},
      { repeater: {
        path: 'packs',
        container: '.vsl-pp-pack-grid',
        item: '.vsl-pp-pack-card',
        fields: {
          'title': '.vsl-pp-pack-card__name',
          'price': '.vsl-pp-pack-card__price'
        }
      }},
      { selector: '#pp-perfect-for h2', attr: 'data-cms-html', value: 'perfectFor.heading' },
      { selector: '#pp-cta h2', attr: 'data-cms-html', value: 'cta.heading' }
    ]
  },

  'semi-private': {
    source: 'Semi-Private/velocity-semi-private-elementor.html',
    title: 'Semi-Private Events | Velocity Sim Racing Lounge',
    cms: [
      { selector: '#sp-hero h1', attr: 'data-cms-html', value: 'hero.heading' },
      { selector: '#sp-hero .vsl-sp-hero__sub', attr: 'data-cms', value: 'hero.subcopy' },
      { selector: '#sp-features h2', attr: 'data-cms', value: 'features.heading' },
      { selector: '#sp-usecases h2', attr: 'data-cms', value: 'useCases.heading' },
      { selector: '#sp-included h2', attr: 'data-cms', value: 'included.heading' },
      { selector: '#sp-cta h2', attr: 'data-cms', value: 'cta.heading' }
    ]
  },

  'spring-bundles': {
    source: 'Spring Bundles/velocity-spring-bundles-elementor.html',
    title: "Father's Day Bundles | Velocity Sim Racing Lounge",
    cms: [
      { selector: '#spring-hero .vsl-spring-hero__eyebrow-line:first-of-type', attr: 'data-cms', value: 'hero.eyebrowWeek' },
      { selector: '#spring-hero .vsl-spring-hero__eyebrow-line--date', attr: 'data-cms', value: 'hero.eyebrowDates' },
      { selector: '#spring-hero h1', attr: 'data-cms-html', value: 'hero.heading' },
      { selector: '#spring-bundles h2', attr: 'data-cms-html', value: 'twoDriver.heading' },
      { selector: '#spring-bundles .vsl-spring-section-sub', attr: 'data-cms', value: 'twoDriver.subcopy' }
    ]
  },

  'book-now': {
    source: 'Book Now/velocity-book-now-elementor.html',
    title: 'Book Now | Velocity Sim Racing Lounge',
    cms: [
      { selector: '.vsl-bn-experiences h2', attr: 'data-cms-html', value: 'experiences.heading' },
      { repeater: {
        path: 'mainExperiences.cards',
        container: '#panel-main .vsl-bn-grid',
        item: '.vsl-bn-card',
        fields: {
          'title': '.vsl-bn-card__overlay-name',
          'price': '.vsl-bn-card__price-badge'
        }
      }},
      { repeater: {
        path: 'twoSeater.cards',
        container: '#panel-2seater .vsl-bn-grid',
        item: '.vsl-bn-card',
        fields: {
          'title': '.vsl-bn-card__overlay-name',
          'price': '.vsl-bn-card__price-badge'
        }
      }},
      { repeater: {
        path: 'springBundles.cards',
        container: '#panel-spring .vsl-bn-grid',
        item: '.vsl-bn-card',
        fields: {
          'title': '.vsl-bn-card__overlay-name',
          'price': '.vsl-bn-card__price-badge'
        }
      }},
      { selector: '.vsl-bn-membership h2', attr: 'data-cms-html', value: 'membershipPromo.heading' },
      { selector: '.vsl-bn-membership .vsl-bn-membership__desc', attr: 'data-cms', value: 'membershipPromo.description' },
      { selector: '#bn-faq h2', attr: 'data-cms-html', value: 'faq.heading' }
    ]
  },

  'food-drink': {
    source: 'Food & Drink/velocity-food-drink-elementor.html',
    title: 'Menu | Velocity Sim Racing Lounge',
    cms: [
      { selector: '#food-hero h1', attr: 'data-cms-html', value: 'hero.heading' },
      { selector: '#food-hero .vsl-fooddrink-hero__sub', attr: 'data-cms', value: 'hero.subcopy' }
    ]
  }
};

// ============================================================================
// Navbar localization (map production URLs to local paths)
// ============================================================================
function processNavbar(navbarHtml) {
  const $ = cheerio.load(navbarHtml, { decodeEntities: false });

  const navMap = {
    'https://velocitysimlounge.com/': '/',
    'https://velocitysimlounge.com/book-now/': '/book-now',
    'https://velocitysimlounge.com/about/': '/about',
    'https://velocitysimlounge.com/membership/': '/membership',
    'https://velocitysimlounge.com/food-and-drink/': '/food-drink',
    'https://velocitysimlounge.com/group-events/': '/parties-events',
    'https://velocitysimlounge.com/corporate-events/': '/corporate-events',
    'https://velocitysimlounge.com/party-packs/': '/party-packs',
    'https://velocitysimlounge.com/semi-private/': '/semi-private',
    'https://velocitysimlounge.com/spring-bundles/': '/spring-bundles',
    'https://velocitysimlounge.com/promotions/': '/promotions',
    'https://velocitysimlounge.com/contact/': '/contact'
  };

  $('a[href]').each((_, el) => {
    const href = $(el).attr('href');
    if (navMap[href]) $(el).attr('href', navMap[href]);
  });

  // Fix relative asset paths
  $('img[src^="navbar-assets/"]').each((_, el) => {
    const src = $(el).attr('src');
    $(el).attr('src', '/' + src);
  });

  return $.html();
}

// ============================================================================
// Page builder
// ============================================================================
function buildPage(key, config) {
  const sourcePath = path.join(REPLICA_DIR, config.source);
  if (!fs.existsSync(sourcePath)) {
    console.warn(`  ⚠ Source not found: ${config.source}`);
    return;
  }

  let moduleHtml = fs.readFileSync(sourcePath, 'utf8');
  const $ = cheerio.load(moduleHtml, { decodeEntities: false, xmlMode: false });

  // Apply CMS annotations
  let applied = 0;
  let missed = 0;
  (config.cms || []).forEach(rule => {
    if (rule.repeater) {
      const r = rule.repeater;
      const $container = $(r.container);
      if (!$container.length) { missed++; return; }

      // Mark the container
      $container.attr('data-cms-repeat-container', r.path);

      // Mark the first item as the template; subsequent items will be removed by hydrate
      const $items = $container.find(r.item);
      if (!$items.length) { missed++; return; }

      // Mark the first item as the repeater template
      const $template = $items.first();
      $template.attr('data-cms-repeat', r.path);

      // Add field attributes to the template
      for (const [fieldKey, fieldConfig] of Object.entries(r.fields)) {
        if (typeof fieldConfig === 'string') {
          // Simple text field
          $template.find(fieldConfig).first().attr('data-cms-field', fieldKey);
        } else if (typeof fieldConfig === 'object') {
          if (fieldConfig.applyToItem) {
            $template.attr(`data-cms-field-${fieldConfig.attr}`, fieldKey);
          } else if (fieldConfig.attr) {
            const $el = $template.find(fieldConfig.selector).first();
            $el.attr(`data-cms-field-${fieldConfig.attr}`, fieldKey);
          } else if (fieldConfig.lines) {
            $template.find(fieldConfig.selector).first().attr('data-cms-field-lines', fieldKey);
          }
        }
      }

      // Remove extra items from the source HTML (they'll be repopulated by hydration)
      $items.slice(1).remove();
      applied++;
    } else {
      // Simple selector rule
      const $el = $(rule.selector);
      if ($el.length) {
        $el.first().attr(rule.attr, rule.value);
        applied++;
      } else {
        missed++;
      }
    }
  });

  // Localize links inside the page module
  const internalLinks = {
    'https://velocitysimlounge.com/': '/',
    'https://velocitysimlounge.com/book-now/': '/book-now',
    'https://velocitysimlounge.com/about/': '/about',
    'https://velocitysimlounge.com/membership/': '/membership',
    'https://velocitysimlounge.com/food-and-drink/': '/food-drink',
    'https://velocitysimlounge.com/group-events/': '/parties-events',
    'https://velocitysimlounge.com/corporate-events/': '/corporate-events',
    'https://velocitysimlounge.com/party-packs/': '/party-packs',
    'https://velocitysimlounge.com/semi-private/': '/semi-private',
    'https://velocitysimlounge.com/spring-bundles/': '/spring-bundles',
    'https://velocitysimlounge.com/promotions/': '/promotions',
    'https://velocitysimlounge.com/contact/': '/contact'
  };
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href');
    if (internalLinks[href]) $(el).attr('href', internalLinks[href]);
  });

  const processedModuleHtml = $.html();

  // Process navbar
  const navbarHtml = fs.existsSync(NAVBAR_PATH) ? processNavbar(fs.readFileSync(NAVBAR_PATH, 'utf8')) : '';

  // Wrap everything in a full HTML document with navbar embedded directly
  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.title}</title>
  <style>
    html, body { margin: 0; padding: 0; background: #0f1533; overflow-x: clip; }
    .staging-indicator {
      background: #FDC70C; color: #000; text-align: center;
      padding: 8px; font-size: 0.75rem; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.1em;
      font-family: Inter, system-ui, sans-serif;
    }
  </style>
</head>
<body data-page="${key}">
<!-- Velocity Navbar -->
${navbarHtml}
<!-- Page content -->
${processedModuleHtml}
<!-- CMS hydration -->
<script src="/shared/site.js"></script>
</body>
</html>`;

  const outputPath = path.join(PAGES_DIR, `${key}.html`);
  fs.writeFileSync(outputPath, fullHtml, 'utf8');
  console.log(`  ✓ ${key}.html (${applied} rules applied, ${missed} missed)`);
}

// ============================================================================
// Run
// ============================================================================
if (!fs.existsSync(PAGES_DIR)) fs.mkdirSync(PAGES_DIR, { recursive: true });

console.log('\nBuilding CMS-ready pages from Elementor modules...\n');

Object.entries(PAGES).forEach(([key, config]) => buildPage(key, config));

console.log('\nDone. Pages written to /pages/.\n');
