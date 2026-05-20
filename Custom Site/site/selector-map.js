/* ========================================================================
   CMS Selector Map
   Maps CMS content paths to CSS selectors in the existing Elementor HTML.
   Used by hydrate.js to inject CMS content without modifying page HTML.
   ======================================================================== */

window.CMS_SELECTOR_MAP = {

  home: {
    "promos.heading":       "#home-promos h2",
    "promos.subcopy":       "#home-promos p.vsl-home-promos__sub",
    "howItWorks.heading":   "#home-how-it-works h2",
    "howItWorks.subcopy":   "#home-how-it-works p.vsl-home-how__sub",
    "reviews.rating":       "#home-reviews .vsl-home-reviews__rating",
    "reviews.reviewCount":  "#home-reviews .vsl-home-reviews__count",
    "cta.heading":          ".vsl-home section:last-of-type h2",
    "cta.subcopy":          ".vsl-home section:last-of-type p",
    "_repeaters": {
      "promos.cards": {
        container: "#home-promos .vsl-home-promo-carousel",
        item: ".vsl-home-promo-card",
        fields: {
          "badge":   ".vsl-home-promo-card__badge",
          "title":   ".vsl-home-promo-card__name",
          "description": ".vsl-home-promo-card__desc",
          "ctaText": ".vsl-home-promo-card__cta"
        }
      },
      "howItWorks.steps": {
        container: "#home-how-it-works .vsl-home-how__steps",
        item: ".vsl-home-step",
        fields: {
          "number":  ".vsl-home-step__badge-num, .vsl-home-step__num",
          "title":   ".vsl-home-step__title-label, .vsl-home-step__title",
          "description": ".vsl-home-step__text"
        }
      },
      "reviews.reviews": {
        container: "#home-reviews .vsl-home-reviews__grid",
        item: ".vsl-home-review",
        fields: {
          "quote":  ".vsl-home-review__text",
          "author": ".vsl-home-review__author"
        }
      }
    }
  },

  about: {
    "hero.heading":             "#how-hero h1",
    "hero.subcopy":             "#how-hero .vsl-how-hero__sub",
    "intro.heading":            "#how-intro h2",
    "intro.body":               "#how-intro .vsl-how-intro__copy .vsl-how-copy",
    "intro.asideTitle":         "#how-intro aside h3",
    "intro.asideBody":          "#how-intro aside p",
    "racing.heading":           "#racing h2",
    "racing.subcopy":           "#racing > .vsl-how-grid > p.vsl-how-copy",
    "simulators.heading":       "#our_simulators h2",
    "carsAndTracks.heading":    "#how-cars-tracks h2",
    "carsAndTracks.proTipTitle":"#how-cars-tracks aside h3",
    "carsAndTracks.proTipBody": "#how-cars-tracks aside p",
    "faq.heading":              "#how-faq h2",
    "cta.heading":              "#how-cta h2",
    "cta.subcopy":              "#how-cta .vsl-how-cta__panel > p",
    "_repeaters": {
      "racing.steps": {
        container: "#racing .vsl-how-flow__steps",
        item: ".vsl-how-step",
        fields: {
          "number": ".vsl-how-step__num",
          "title":  "h3",
          "description": "p"
        }
      },
      "faq.items": {
        container: "#how-faq .vsl-how-faq",
        item: ".vsl-how-faq__item",
        fields: {
          "question": ".vsl-how-faq__label",
          "answer":   ".vsl-how-faq__answer"
        }
      }
    }
  },

  promotions: {
    "hero.eyebrow":             "#promo-hero .vsl-promo-hero__eyebrow",
    "hero.heading":             "#promo-hero h1",
    "hero.subcopy":             "#promo-hero .vsl-promo-hero__sub",
    "discounts.heading":        "#promo-discounts h2",
    "discounts.subcopy":        "#promo-discounts .vsl-promo-section-sub",
    "ladiesNight.heading":      "#promo-ladies h2",
    "ladiesNight.schedule":     "#promo-ladies .vsl-promo-ladies__eyebrow",
    "ladiesNight.time":         "#promo-ladies .vsl-promo-ladies__time",
    "ladiesNight.description":  "#promo-ladies .vsl-promo-ladies__body",
    "spotlight.heading":        "#promo-spotlight h2",
    "spotlight.subcopy":        "#promo-spotlight .vsl-promo-section-sub",
    "seasonal.heading":         "#promo-seasonal h2",
    "seasonal.subcopy":         "#promo-seasonal .vsl-promo-section-sub",
    "seasonal.title":           "#promo-seasonal h3",
    "seasonal.description":     "#promo-seasonal .vsl-promo-seasonal__copy",
    "seasonal.highlight":       "#promo-seasonal .vsl-promo-seasonal__highlight",
    "explore.heading":          "#promo-explore h2",
    "explore.subcopy":          "#promo-explore .vsl-promo-section-sub",
    "cta.heading":              ".vsl-promo-cta h2",
    "cta.subcopy":              ".vsl-promo-cta p",
    "_repeaters": {
      "discounts.cards": {
        container: "#promo-discounts .vsl-promo-discounts__grid",
        item: ".vsl-promo-discount-card",
        fields: {
          "title":       ".vsl-promo-discount-card__name",
          "description": ".vsl-promo-discount-card__desc",
          "badge":       ".vsl-promo-discount-card__badge",
          "note":        ".vsl-promo-discount-card__note"
        }
      },
      "spotlight.cards": {
        container: "#promo-spotlight .vsl-promo-spotlight__grid",
        item: ".vsl-promo-spotlight-card",
        fields: {
          "title":       "h3",
          "description": ".vsl-promo-spotlight-card__desc"
        }
      }
    }
  },

  membership: {
    "hero.heading":     "#membership-hero h1",
    "hero.subcopy":     "#membership-hero .vsl-membership-hero__sub",
    "benefits.heading": "#membership-benefits h2",
    "tiers.heading":    "#memberships h2",
    "tiers.subcopy":    "#memberships .vsl-membership-tiers__sub",
    "faq.heading":      "#membership-faq h2",
    "_repeaters": {
      "tiers.plans": {
        container: "#memberships .vsl-membership-tiers__grid",
        item: ".vsl-tier",
        fields: {
          "name":    ".vsl-tier__name",
          "price":   ".vsl-tier__price",
          "tag":     ".vsl-tier__tag",
          "ctaText": ".vsl-tier__cta-label"
        }
      },
      "faq.items": {
        container: "#membership-faq .vsl-membership-faq__list",
        item: ".vsl-membership-faq__item",
        fields: {
          "question": ".vsl-membership-faq__trigger",
          "answer":   ".vsl-membership-faq__answer"
        }
      }
    }
  },

  contact: {
    "hero.heading": "#loc-hero h1",
    "hero.subcopy": "#loc-hero .vsl-loc-hero__sub",
    "about.heading": "#loc-about h2",
    "about.body":    "#loc-about .vsl-loc-about__text",
    "faq.heading":   "#faq h2",
    "cta.heading":   "#contact-cta h2",
    "_repeaters": {
      "faq.items": {
        container: "#faq .vsl-loc-faq__list",
        item: ".vsl-loc-faq__item",
        fields: {
          "question": ".vsl-loc-faq__trigger",
          "answer":   ".vsl-loc-faq__answer"
        }
      }
    }
  },

  "corporate-events": {
    "hero.heading":           "#corporate-hero h1",
    "hero.subcopy":           "#corporate-hero .vsl-corporate-hero__sub",
    "venue.heading":          "#corporate-venue h2",
    "venue.subcopy":          "#corporate-venue .vsl-corporate-venue__sub",
    "perfectFor.heading":     "#corporate-perfect-for h2",
    "perfectFor.subcopy":     "#corporate-perfect-for .vsl-corporate-pf__sub",
    "enhancements.heading":   "#corporate-enhancements h2",
    "enhancements.subcopy":   "#corporate-enhancements .vsl-corporate-enh__sub",
    "mobileSim.heading":      "#corporate-mobile-sim h2",
    "mobileSim.subcopy":      "#corporate-mobile-sim .vsl-corporate-mobile__sub",
    "included.heading":       "#corporate-included h2",
    "included.subcopy":       "#corporate-included .vsl-corporate-included__sub",
    "cta.heading":            "#corporate-book h2",
    "cta.subcopy":            "#corporate-book .vsl-corporate-cta__sub",
    "_repeaters": {
      "enhancements.cards": {
        container: "#corporate-enhancements .vsl-corporate-enh__grid",
        item: ".vsl-corporate-enh-card",
        fields: {
          "title":       "h3",
          "description": "p"
        }
      }
    }
  },

  "parties-events": {
    "hero.heading":          "#events-hero h1",
    "eventTypes.heading":    "#events-types h2",
    "eventTypes.subcopy":    "#events-types .vsl-events-types__sub",
    "includes.heading":      "#events-includes h2",
    "difference.heading":    "#events-difference h2",
    "difference.subcopy":    "#events-difference .vsl-events-diff__sub",
    "faq.heading":           "#events-faq h2",
    "cta.heading":           "#events-cta h2",
    "cta.subcopy":           "#events-cta .vsl-events-cta__body",
    "_repeaters": {
      "eventTypes.cards": {
        container: "#events-types .vsl-events-types__grid",
        item: ".vsl-events-card",
        fields: {
          "title":       "h3",
          "description": ".vsl-events-card__desc",
          "meta":        ".vsl-events-card__meta"
        }
      },
      "difference.cards": {
        container: "#events-difference .vsl-events-diff__grid",
        item: ".vsl-events-diff-card",
        fields: {
          "title":       "h3",
          "description": ".vsl-events-diff-card__body"
        }
      },
      "faq.items": {
        container: "#events-faq .vsl-events-faq__list",
        item: ".vsl-events-faq__item",
        fields: {
          "question": ".vsl-events-faq__trigger",
          "answer":   ".vsl-events-faq__answer"
        }
      }
    }
  },

  "party-packs": {
    "hero.eyebrow":        "#pp-hero .vsl-pp-hero__eyebrow",
    "hero.heading":        "#pp-hero h1",
    "hero.subcopy":        "#pp-hero .vsl-pp-hero__sub",
    "included.heading":    "#pp-included h2",
    "perfectFor.heading":  "#pp-perfect-for h2",
    "perfectFor.subcopy":  "#pp-perfect-for .vsl-pp-pf__sub",
    "cta.heading":         "#pp-cta h2",
    "cta.subcopy":         "#pp-cta .vsl-pp-cta__sub",
    "_repeaters": {
      "packs": {
        container: ".vsl-pp-pack-grid",
        item: ".vsl-pp-pack-card",
        fields: {
          "title": ".vsl-pp-pack-card__name",
          "price": ".vsl-pp-pack-card__price"
        }
      },
      "included.cards": {
        container: "#pp-included .vsl-pp-included__grid",
        item: ".vsl-pp-included-card",
        fields: {
          "title":       "h3",
          "description": "p"
        }
      }
    }
  },

  "semi-private": {
    "hero.heading":       "#sp-hero h1",
    "hero.subcopy":       "#sp-hero .vsl-sp-hero__sub",
    "features.heading":   "#sp-features h2",
    "useCases.heading":   "#sp-usecases h2",
    "useCases.subcopy":   "#sp-usecases .vsl-sp-usecases__sub",
    "included.heading":   "#sp-included h2",
    "included.subcopy":   "#sp-included .vsl-sp-included__sub",
    "cta.heading":        "#sp-cta h2",
    "cta.subcopy":        "#sp-cta .vsl-sp-cta__sub"
  },

  "fathers-day": {
    "hero.eyebrowWeek":  "#spring-hero .vsl-spring-hero__eyebrow-line:first-of-type",
    "hero.eyebrowDates": "#spring-hero .vsl-spring-hero__eyebrow-line--date",
    "hero.heading":       "#spring-hero h1",
    "twoDriver.heading":  "#spring-bundles h2",
    "twoDriver.subcopy":  "#spring-bundles .vsl-spring-section-sub"
  },

  "book-now": {
    "experiences.heading": ".vsl-bn-experiences h2",
    "faq.heading":         "#bn-faq h2",
    "membershipPromo.eyebrow":    ".vsl-bn-membership .vsl-bn-membership__eyebrow",
    "membershipPromo.heading":    ".vsl-bn-membership h2",
    "membershipPromo.description":".vsl-bn-membership .vsl-bn-membership__desc",
    "_repeaters": {
      "mainExperiences.cards": {
        container: "#panel-main .vsl-bn-grid",
        item: ".vsl-bn-card",
        fields: {
          "title": ".vsl-bn-card__overlay-name",
          "price": ".vsl-bn-card__price-badge"
        }
      },
      "twoSeater.cards": {
        container: "#panel-2seater .vsl-bn-grid",
        item: ".vsl-bn-card",
        fields: {
          "title": ".vsl-bn-card__overlay-name",
          "price": ".vsl-bn-card__price-badge"
        }
      },
      "faq.items": {
        container: "#bn-faq .vsl-bn-faq__list",
        item: ".vsl-bn-faq__item",
        fields: {
          "question": ".vsl-bn-faq__trigger",
          "answer":   ".vsl-bn-faq__answer"
        }
      }
    }
  },

  "food-drink": {
    "hero.heading": "#food-hero h1",
    "hero.subcopy": "#food-hero .vsl-fooddrink-hero__sub"
  },

  "menu-2025": {
    "hero.heading": "#food-hero h1",
    "hero.subcopy": "#food-hero .vsl-fooddrink-hero__sub"
  },

  buyout: {
    "hero.eyebrow":           "#buyout-hero .vsl-bo-hero__eyebrow",
    "hero.heading":           "#buyout-hero h1",
    "hero.subcopy":           "#buyout-hero .vsl-bo-hero__sub",
    "venue.heading":          "#buyout-venue h2",
    "venue.subcopy":          "#buyout-venue .vsl-bo-section__sub",
    "included.heading":       "#buyout-included h2",
    "included.subcopy":       "#buyout-included .vsl-bo-included__sub",
    "perfectFor.heading":     "#buyout-perfect-for h2",
    "perfectFor.subcopy":     "#buyout-perfect-for .vsl-bo-section__sub",
    "enhancements.heading":   "#buyout-enhancements h2",
    "enhancements.subcopy":   "#buyout-enhancements .vsl-bo-section__sub",
    "faq.heading":            "#buyout-faq h2",
    "cta.heading":            "#buyout-cta h2",
    "cta.subcopy":            "#buyout-cta .vsl-bo-section__sub",
    "_repeaters": {
      "included.cards": {
        container: "#buyout-included .vsl-bo-included__grid",
        item: ".vsl-bo-included-card",
        fields: {
          "title": ".vsl-bo-included-card__label"
        }
      },
      "enhancements.cards": {
        container: "#buyout-enhancements .vsl-bo-enhance__grid",
        item: ".vsl-bo-enhance-card",
        fields: {
          "title":       "h3",
          "description": "p"
        }
      },
      "faq.items": {
        container: "#buyout-faq .vsl-bo-faq__list",
        item: ".vsl-bo-faq__item",
        fields: {
          "question": ".vsl-bo-faq__trigger",
          "answer":   ".vsl-bo-faq__answer"
        }
      }
    }
  }

};
