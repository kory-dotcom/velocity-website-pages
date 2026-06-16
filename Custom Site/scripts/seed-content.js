const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '..', 'content');

function writeJSON(filepath, data) {
  const dir = path.dirname(filepath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
}

// -- Locations ---------------------------------------------------------------
writeJSON(path.join(CONTENT_DIR, 'locations.json'), ['houston', 'dallas']);

// -- Pricing -----------------------------------------------------------------
writeJSON(path.join(CONTENT_DIR, 'pricing.json'), {
  "membership.racer": "$99",
  "membership.pro": "$169",
  "membership.ultimate": "$299",
  "quickRace": "$29",
  "doubleRace": "$49",
  "twoSeaterQuick": "$45",
  "twoSeaterDouble": "$59",
  "leaderboard": "$29",
  "sixTen": "$29",
  "springQuick": "$85",
  "springDouble": "$115",
  "springSprint": "$65",
  "springEndurance": "$89",
  "partyPack.racer": "$499",
  "partyPack.pro": "$725"
});

// -- Banners -----------------------------------------------------------------
writeJSON(path.join(CONTENT_DIR, 'banners.json'), [
  {
    id: "welcome",
    text: "Welcome to the Velocity CMS test site! This is a sample banner.",
    type: "info",
    locations: [],
    startDate: null,
    endDate: null,
    dismissable: true,
    priority: 1,
    active: true
  },
  {
    id: "houston-hours",
    text: "Houston: Saturday open until midnight; Sunday we close at 10pm.",
    type: "promo",
    locations: ["houston"],
    startDate: null,
    endDate: null,
    dismissable: true,
    priority: 2,
    active: true
  }
]);

// -- Schemas -----------------------------------------------------------------

// Home page schema
writeJSON(path.join(CONTENT_DIR, 'schemas', 'home.json'), {
  page: "home",
  label: "Home Page",
  sections: {
    hero: {
      label: "Hero Section",
      fields: {
        heading: { type: "text", label: "Hero Heading" },
        subheading: { type: "textarea", label: "Hero Subheading" },
        backgroundImage: { type: "image", label: "Background Image", perLocation: true },
        ctaText: { type: "text", label: "CTA Button Text" },
        ctaLink: { type: "url", label: "CTA Button Link", perLocation: true }
      }
    },
    promos: {
      label: "Promotions Carousel",
      fields: {
        heading: { type: "text", label: "Section Heading" },
        subcopy: { type: "textarea", label: "Section Subcopy" },
        cards: {
          type: "repeater",
          label: "Promo Cards",
          fields: {
            image: { type: "image", label: "Card Image" },
            badge: { type: "text", label: "Badge Text" },
            title: { type: "text", label: "Card Title" },
            description: { type: "textarea", label: "Description" },
            ctaText: { type: "text", label: "Button Text" },
            ctaLink: { type: "url", label: "Button Link", perLocation: true },
            startDate: { type: "datetime", label: "Start Date" },
            endDate: { type: "datetime", label: "End Date" }
          }
        }
      }
    },
    howItWorks: {
      label: "How It Works",
      fields: {
        heading: { type: "text", label: "Section Heading" },
        subcopy: { type: "textarea", label: "Section Subcopy" },
        steps: {
          type: "repeater",
          label: "Steps",
          fields: {
            number: { type: "text", label: "Step Number" },
            title: { type: "text", label: "Step Title" },
            description: { type: "textarea", label: "Step Description" }
          }
        }
      }
    },
    reviews: {
      label: "Reviews",
      fields: {
        rating: { type: "text", label: "Star Rating" },
        reviewCount: { type: "text", label: "Review Count" },
        reviews: {
          type: "repeater",
          label: "Featured Reviews",
          fields: {
            stars: { type: "text", label: "Stars (1-5)" },
            quote: { type: "textarea", label: "Review Text" },
            author: { type: "text", label: "Author Name" }
          }
        }
      }
    },
    cta: {
      label: "Bottom CTA",
      fields: {
        heading: { type: "text", label: "CTA Heading" },
        subcopy: { type: "textarea", label: "CTA Text" },
        primaryText: { type: "text", label: "Primary Button Text" },
        primaryLink: { type: "url", label: "Primary Button Link", perLocation: true },
        secondaryText: { type: "text", label: "Secondary Button Text" },
        secondaryLink: { type: "url", label: "Secondary Button Link", perLocation: true }
      }
    }
  },
  seo: {
    title: { type: "text", label: "Page Title" },
    description: { type: "textarea", label: "Meta Description" },
    ogImage: { type: "image", label: "Social Share Image" },
    ogTitle: { type: "text", label: "Social Share Title" },
    noIndex: { type: "boolean", label: "Hide from Search Engines" }
  }
});

// Food & Drink page schema (key matches replica-app.js "food-drink")
writeJSON(path.join(CONTENT_DIR, 'schemas', 'food-drink.json'), {
  page: "food-drink",
  label: "Food & Drink",
  sections: {
    hero: {
      label: "Hero Section",
      fields: {
        heading: { type: "text", label: "Page Heading" },
        subcopy: { type: "textarea", label: "Intro Text" },
        backgroundImage: { type: "image", label: "Hero Background", perLocation: true }
      }
    },
    categories: {
      label: "Menu Categories",
      fields: {
        items: {
          type: "repeater",
          label: "Categories",
          fields: {
            name: { type: "text", label: "Category Name" },
            description: { type: "textarea", label: "Category Description" },
            menuItems: {
              type: "repeater",
              label: "Menu Items",
              fields: {
                name: { type: "text", label: "Item Name" },
                description: { type: "textarea", label: "Description" },
                price: { type: "text", label: "Price" },
                image: { type: "image", label: "Photo" },
                locations: { type: "locations", label: "Available At" }
              }
            }
          }
        }
      }
    }
  },
  seo: {
    title: { type: "text", label: "Page Title" },
    description: { type: "textarea", label: "Meta Description" },
    ogImage: { type: "image", label: "Social Share Image" },
    ogTitle: { type: "text", label: "Social Share Title" },
    noIndex: { type: "boolean", label: "Hide from Search Engines" }
  }
});

// Contact page schema -- most fields are per-location since each location has different info
writeJSON(path.join(CONTENT_DIR, 'schemas', 'contact.json'), {
  page: "contact",
  label: "Contact Page",
  sections: {
    hero: {
      label: "Hero Section",
      fields: {
        heading: { type: "text", label: "City Name", perLocation: true },
        subcopy: { type: "textarea", label: "Tagline", perLocation: true },
        heroImage: { type: "image", label: "Hero Image", perLocation: true }
      }
    },
    info: {
      label: "Contact Info",
      fields: {
        address: { type: "textarea", label: "Address", perLocation: true },
        phone: { type: "text", label: "Phone", perLocation: true },
        email: { type: "text", label: "Email", perLocation: true },
        hours: { type: "textarea", label: "Hours", perLocation: true },
        mapEmbed: { type: "url", label: "Google Maps Link", perLocation: true },
        bookNowLink: { type: "url", label: "Book Now Link", perLocation: true },
        inquiryLink: { type: "url", label: "Event Inquiry Link", perLocation: true }
      }
    },
    about: {
      label: "About Section",
      fields: {
        heading: { type: "text", label: "About Heading", perLocation: true },
        body: { type: "textarea", label: "About Text", perLocation: true },
        ctaText: { type: "text", label: "CTA Button Text" },
        venueImage: { type: "image", label: "Venue Image", perLocation: true }
      }
    },
    features: {
      label: "Features & Amenities",
      fields: {
        heading: { type: "text", label: "Section Heading" },
        items: { type: "repeater", label: "Feature Items", fields: {
          label: { type: "text", label: "Feature Text" }
        }}
      }
    },
    faq: {
      label: "FAQ",
      fields: {
        heading: { type: "text", label: "Section Heading" },
        subcopy: { type: "textarea", label: "Section Subcopy" },
        items: { type: "repeater", label: "FAQ Items", fields: {
          question: { type: "text", label: "Question" },
          answer: { type: "textarea", label: "Answer" }
        }}
      }
    },
    cta: {
      label: "Bottom CTA",
      fields: {
        heading: { type: "text", label: "Heading" },
        primaryText: { type: "text", label: "Primary Button" },
        primaryLink: { type: "url", label: "Primary Link", perLocation: true },
        secondaryText: { type: "text", label: "Secondary Button" },
        secondaryLink: { type: "url", label: "Secondary Link", perLocation: true }
      }
    }
  },
  seo: {
    title: { type: "text", label: "Page Title" },
    description: { type: "textarea", label: "Meta Description" },
    ogImage: { type: "image", label: "Social Share Image" },
    ogTitle: { type: "text", label: "Social Share Title" },
    noIndex: { type: "boolean", label: "Hide from Search Engines" }
  }
});

// ============================================================================
// SCHEMAS — All pages matching replica-app.js keys
// perLocation: true = shows Houston/Dallas tabs in admin
// ============================================================================

const seoFields = {
  title: { type: "text", label: "Page Title" },
  description: { type: "textarea", label: "Meta Description" },
  ogImage: { type: "image", label: "Social Share Image" },
  ogTitle: { type: "text", label: "Social Share Title" },
  noIndex: { type: "boolean", label: "Hide from Search Engines" }
};

// Shorthand for fields that differ by location
const PL = { perLocation: true };

// -- Promotions --
writeJSON(path.join(CONTENT_DIR, 'schemas', 'promotions.json'), {
  page: "promotions", label: "Promotions",
  sections: {
    hero: { label: "Hero", fields: {
      eyebrow: { type: "text", label: "Eyebrow Text" },
      heading: { type: "text", label: "Heading" },
      subcopy: { type: "textarea", label: "Subcopy" },
      heroImage: { type: "image", label: "Hero Photo", ...PL }
    }},
    discounts: { label: "Everyday Discounts", fields: {
      heading: { type: "text", label: "Section Heading" },
      subcopy: { type: "textarea", label: "Section Subcopy" },
      cards: { type: "repeater", label: "Discount Cards", fields: {
        title: { type: "text", label: "Title" },
        description: { type: "textarea", label: "Description" },
        badge: { type: "text", label: "Badge Text" },
        note: { type: "text", label: "Note" }
      }}
    }},
    ladiesNight: { label: "Ladies Night", fields: {
      heading: { type: "text", label: "Heading" },
      schedule: { type: "text", label: "Schedule", ...PL },
      time: { type: "text", label: "Time", ...PL },
      description: { type: "textarea", label: "Description" },
      image: { type: "image", label: "Photo", ...PL },
      tags: { type: "text", label: "Tags (comma-separated)" }
    }},
    spotlight: { label: "Calendar Spotlight", fields: {
      heading: { type: "text", label: "Section Heading" },
      subcopy: { type: "textarea", label: "Section Subcopy" },
      cards: { type: "repeater", label: "Spotlight Items", fields: {
        title: { type: "text", label: "Title" },
        description: { type: "textarea", label: "Description" }
      }}
    }},
    seasonal: { label: "Seasonal Promotion", fields: {
      heading: { type: "text", label: "Heading" },
      subcopy: { type: "textarea", label: "Subcopy" },
      title: { type: "text", label: "Featured Promo Title" },
      description: { type: "textarea", label: "Description" },
      highlight: { type: "text", label: "Highlight Line" },
      image: { type: "image", label: "Image", ...PL },
      startDate: { type: "datetime", label: "Start Date" },
      endDate: { type: "datetime", label: "End Date" }
    }},
    explore: { label: "Explore More", fields: {
      heading: { type: "text", label: "Section Heading" },
      subcopy: { type: "textarea", label: "Section Subcopy" },
      cards: { type: "repeater", label: "Crosslink Cards", fields: {
        title: { type: "text", label: "Title" },
        tag: { type: "text", label: "Tag (e.g. from $65)" },
        image: { type: "image", label: "Image" },
        link: { type: "url", label: "Link" }
      }}
    }},
    cta: { label: "Bottom CTA", fields: {
      heading: { type: "text", label: "Heading" },
      subcopy: { type: "textarea", label: "Subcopy" },
      primaryText: { type: "text", label: "Primary Button" },
      primaryLink: { type: "url", label: "Primary Link", ...PL },
      secondaryText: { type: "text", label: "Secondary Button" },
      secondaryLink: { type: "url", label: "Secondary Link", ...PL }
    }}
  },
  seo: seoFields
});

// -- Membership --
writeJSON(path.join(CONTENT_DIR, 'schemas', 'membership.json'), {
  page: "membership", label: "Membership",
  sections: {
    hero: { label: "Hero", fields: {
      heading: { type: "text", label: "Heading" },
      subcopy: { type: "textarea", label: "Subcopy (price teaser)" },
      ctaText: { type: "text", label: "CTA Button Text" }
    }},
    benefits: { label: "Benefits", fields: {
      heading: { type: "text", label: "Section Heading" },
      cards: { type: "repeater", label: "Benefit Cards", fields: {
        image: { type: "image", label: "Card Image" },
        frontTitle: { type: "text", label: "Front Title" },
        backTitle: { type: "text", label: "Back Title" },
        backDescription: { type: "textarea", label: "Back Description" }
      }}
    }},
    tiers: { label: "Pricing Tiers", fields: {
      heading: { type: "text", label: "Section Heading" },
      subcopy: { type: "textarea", label: "Section Subcopy" },
      plans: { type: "repeater", label: "Tier Plans", fields: {
        name: { type: "text", label: "Tier Name" },
        price: { type: "text", label: "Price" },
        period: { type: "text", label: "Period (e.g. /month)" },
        tag: { type: "text", label: "Tag Line" },
        features: { type: "textarea", label: "Features (one per line)" },
        joinLink: { type: "url", label: "Join Link", ...PL },
        ctaText: { type: "text", label: "Button Text" }
      }}
    }},
    faq: { label: "FAQ", fields: {
      heading: { type: "text", label: "Section Heading" },
      items: { type: "repeater", label: "FAQ Items", fields: {
        question: { type: "text", label: "Question" },
        answer: { type: "textarea", label: "Answer" }
      }}
    }}
  },
  seo: seoFields
});

// -- About / How It Works --
writeJSON(path.join(CONTENT_DIR, 'schemas', 'about.json'), {
  page: "about", label: "About / How It Works",
  sections: {
    hero: { label: "Hero", fields: {
      heading: { type: "text", label: "Heading" },
      subcopy: { type: "textarea", label: "Subcopy" },
      heroVideo: { type: "url", label: "Background Video URL" },
      heroImage: { type: "image", label: "Fallback Hero Image" }
    }},
    intro: { label: "Intro", fields: {
      heading: { type: "text", label: "Heading" },
      body: { type: "textarea", label: "Body Text" },
      asideTitle: { type: "text", label: "Aside Title" },
      asideBody: { type: "textarea", label: "Aside Text" }
    }},
    video: { label: "Video Walkthrough", fields: {
      heading: { type: "text", label: "Heading" },
      embedUrl: { type: "url", label: "Video Embed URL", ...PL }
    }},
    racing: { label: "Racing Flow", fields: {
      heading: { type: "text", label: "Section Heading" },
      subcopy: { type: "textarea", label: "Intro Text" },
      steps: { type: "repeater", label: "Steps", fields: {
        number: { type: "text", label: "Step Number" },
        title: { type: "text", label: "Title" },
        description: { type: "textarea", label: "Description" }
      }},
      quickRaceTitle: { type: "text", label: "Quick Race Title" },
      quickRaceDesc: { type: "textarea", label: "Quick Race Description" },
      doubleRaceTitle: { type: "text", label: "Double Race Title" },
      doubleRaceDesc: { type: "textarea", label: "Double Race Description" }
    }},
    simulators: { label: "Simulators", fields: {
      heading: { type: "text", label: "Section Heading" },
      tiers: { type: "repeater", label: "Simulator Tiers", fields: {
        name: { type: "text", label: "Tier Name" },
        image: { type: "image", label: "Tier Image" },
        features: { type: "textarea", label: "Features (one per line)" }
      }}
    }},
    carsAndTracks: { label: "Cars & Tracks", fields: {
      heading: { type: "text", label: "Section Heading" },
      proTipTitle: { type: "text", label: "Pro Tip Title" },
      proTipBody: { type: "textarea", label: "Pro Tip Text" }
    }},
    faq: { label: "FAQ", fields: {
      heading: { type: "text", label: "Section Heading" },
      items: { type: "repeater", label: "FAQ Items", fields: {
        question: { type: "text", label: "Question" },
        answer: { type: "textarea", label: "Answer" }
      }}
    }},
    cta: { label: "Bottom CTA", fields: {
      heading: { type: "text", label: "Heading" },
      subcopy: { type: "textarea", label: "Subcopy" },
      ctaText: { type: "text", label: "Button Text" },
      ctaLink: { type: "url", label: "Button Link" }
    }}
  },
  seo: seoFields
});

// -- Book Now --
writeJSON(path.join(CONTENT_DIR, 'schemas', 'book-now.json'), {
  page: "book-now", label: "Book Now",
  sections: {
    experiences: { label: "Experiences", fields: {
      heading: { type: "text", label: "Section Heading" },
      tabs: { type: "repeater", label: "Experience Tabs", fields: {
        tabName: { type: "text", label: "Tab Name" },
        cards: { type: "textarea", label: "Cards JSON (advanced)" }
      }}
    }},
    mainExperiences: { label: "Main Experiences", fields: {
      cards: { type: "repeater", label: "Booking Cards", fields: {
        title: { type: "text", label: "Title" },
        price: { type: "text", label: "Price Display (e.g. From $30)" },
        badge: { type: "text", label: "Badge (e.g. Most Popular)" },
        image: { type: "image", label: "Card Image" },
        bullets: { type: "textarea", label: "Features (one per line)" },
        bookingLink: { type: "url", label: "Booking Link", ...PL }
      }}
    }},
    twoSeater: { label: "2-Seater Experiences", fields: {
      cards: { type: "repeater", label: "2-Seater Cards", fields: {
        title: { type: "text", label: "Title" },
        price: { type: "text", label: "Price Display" },
        image: { type: "image", label: "Card Image" },
        bullets: { type: "textarea", label: "Features (one per line)" },
        bookingLink: { type: "url", label: "Booking Link", ...PL }
      }}
    }},
    springBundles: { label: "Spring Bundle Experiences", fields: {
      intro: { type: "textarea", label: "Intro Text" },
      cards: { type: "repeater", label: "Bundle Cards", fields: {
        title: { type: "text", label: "Title" },
        price: { type: "text", label: "Price Display" },
        image: { type: "image", label: "Card Image" },
        bullets: { type: "textarea", label: "Features (one per line)" },
        bookingLink: { type: "url", label: "Booking Link", ...PL }
      }}
    }},
    features: { label: "Feature Strip", fields: {
      items: { type: "repeater", label: "Features", fields: {
        icon: { type: "image", label: "Icon" },
        label: { type: "text", label: "Label" }
      }}
    }},
    membershipPromo: { label: "Membership Promo", fields: {
      eyebrow: { type: "text", label: "Eyebrow" },
      heading: { type: "text", label: "Heading" },
      description: { type: "textarea", label: "Description" },
      ctaText: { type: "text", label: "CTA Text" },
      ctaLink: { type: "url", label: "CTA Link" },
      tierChips: { type: "repeater", label: "Tier Price Chips", fields: {
        name: { type: "text", label: "Tier Name" },
        price: { type: "text", label: "Price" }
      }}
    }},
    faq: { label: "FAQ", fields: {
      heading: { type: "text", label: "Section Heading" },
      items: { type: "repeater", label: "FAQ Items", fields: {
        question: { type: "text", label: "Question" },
        answer: { type: "textarea", label: "Answer" }
      }}
    }}
  },
  seo: seoFields
});

// -- Corporate Events --
writeJSON(path.join(CONTENT_DIR, 'schemas', 'corporate-events.json'), {
  page: "corporate-events", label: "Corporate Events",
  sections: {
    hero: { label: "Hero", fields: {
      heading: { type: "text", label: "Heading" },
      subcopy: { type: "textarea", label: "Subcopy" },
      heroImage: { type: "image", label: "Hero Image", ...PL },
      ctaText: { type: "text", label: "CTA Button Text" },
      ctaLink: { type: "url", label: "CTA Link (Inquiry)", ...PL }
    }},
    venue: { label: "Venue / Buyout", fields: {
      heading: { type: "text", label: "Heading" },
      subcopy: { type: "textarea", label: "Subcopy", ...PL },
      image: { type: "image", label: "Venue Image", ...PL },
      stats: { type: "repeater", label: "Stats", fields: {
        number: { type: "text", label: "Number", ...PL },
        label: { type: "text", label: "Label" }
      }},
      bullets: { type: "textarea", label: "Feature Bullets (one per line)" }
    }},
    perfectFor: { label: "Perfect For", fields: {
      heading: { type: "text", label: "Heading" },
      subcopy: { type: "textarea", label: "Subcopy" },
      items: { type: "repeater", label: "Use Cases", fields: {
        label: { type: "text", label: "Label" }
      }}
    }},
    enhancements: { label: "Enhancements", fields: {
      heading: { type: "text", label: "Heading" },
      subcopy: { type: "textarea", label: "Subcopy" },
      cards: { type: "repeater", label: "Enhancement Cards", fields: {
        title: { type: "text", label: "Title" },
        description: { type: "textarea", label: "Description" }
      }}
    }},
    mobileSim: { label: "Mobile Sim", fields: {
      heading: { type: "text", label: "Heading" },
      subcopy: { type: "textarea", label: "Subcopy" },
      checklist: { type: "textarea", label: "Checklist Items (one per line)" },
      image: { type: "image", label: "Image" }
    }},
    included: { label: "What's Included", fields: {
      heading: { type: "text", label: "Heading" },
      subcopy: { type: "textarea", label: "Subcopy" },
      items: { type: "repeater", label: "Included Items", fields: {
        title: { type: "text", label: "Title" }
      }}
    }},
    cta: { label: "Bottom CTA", fields: {
      heading: { type: "text", label: "Heading" },
      subcopy: { type: "textarea", label: "Subcopy" },
      primaryText: { type: "text", label: "Primary Button" },
      primaryLink: { type: "url", label: "Primary Link", ...PL },
      secondaryText: { type: "text", label: "Secondary Button" },
      secondaryLink: { type: "url", label: "Secondary Link", ...PL }
    }}
  },
  seo: seoFields
});

// -- Group Events (Parties & Events) --
writeJSON(path.join(CONTENT_DIR, 'schemas', 'parties-events.json'), {
  page: "parties-events", label: "Group Events",
  sections: {
    hero: { label: "Hero", fields: {
      heading: { type: "text", label: "Heading" },
      tagline: { type: "text", label: "Tagline", ...PL },
      heroVideo: { type: "url", label: "Hero Video URL", ...PL },
      heroImage: { type: "image", label: "Fallback Hero Image", ...PL },
      testimonialQuote: { type: "textarea", label: "Testimonial Quote" },
      testimonialAuthor: { type: "text", label: "Testimonial Author" },
      testimonialStars: { type: "text", label: "Star Rating" }
    }},
    eventTypes: { label: "Event Types", fields: {
      heading: { type: "text", label: "Section Heading" },
      subcopy: { type: "textarea", label: "Section Subcopy" },
      cards: { type: "repeater", label: "Event Type Cards", fields: {
        title: { type: "text", label: "Title" },
        description: { type: "textarea", label: "Description" },
        meta: { type: "text", label: "Meta Line (e.g. capacity)", ...PL },
        image: { type: "image", label: "Image", ...PL },
        primaryText: { type: "text", label: "Primary CTA Text" },
        primaryLink: { type: "url", label: "Primary CTA Link", ...PL },
        secondaryText: { type: "text", label: "Secondary CTA Text" },
        secondaryLink: { type: "url", label: "Secondary CTA Link", ...PL }
      }}
    }},
    includes: { label: "Every Event Includes", fields: {
      heading: { type: "text", label: "Heading" },
      items: { type: "repeater", label: "Included Items", fields: {
        label: { type: "text", label: "Label" }
      }}
    }},
    difference: { label: "The Velocity Difference", fields: {
      heading: { type: "text", label: "Heading" },
      subcopy: { type: "textarea", label: "Subcopy" },
      cards: { type: "repeater", label: "Differentiator Cards", fields: {
        title: { type: "text", label: "Title" },
        description: { type: "textarea", label: "Description" }
      }}
    }},
    faq: { label: "FAQ", fields: {
      heading: { type: "text", label: "Section Heading" },
      items: { type: "repeater", label: "FAQ Items", fields: {
        question: { type: "text", label: "Question" },
        answer: { type: "textarea", label: "Answer" }
      }}
    }},
    cta: { label: "Bottom CTA", fields: {
      heading: { type: "text", label: "Heading" },
      subcopy: { type: "textarea", label: "Subcopy", ...PL },
      primaryText: { type: "text", label: "Primary Button" },
      primaryLink: { type: "url", label: "Primary Link", ...PL },
      secondaryText: { type: "text", label: "Secondary Button" },
      secondaryLink: { type: "url", label: "Secondary Link", ...PL }
    }}
  },
  seo: seoFields
});

// -- Party Packs --
writeJSON(path.join(CONTENT_DIR, 'schemas', 'party-packs.json'), {
  page: "party-packs", label: "Party Packs",
  sections: {
    hero: { label: "Hero", fields: {
      eyebrow: { type: "text", label: "Eyebrow Text" },
      heading: { type: "text", label: "Heading" },
      subcopy: { type: "textarea", label: "Subcopy" },
      heroVideo: { type: "url", label: "Hero Video URL", ...PL },
      heroImage: { type: "image", label: "Fallback Hero Image", ...PL },
      ctaText: { type: "text", label: "CTA Button Text" }
    }},
    overview: { label: "Overview", fields: {
      heading: { type: "text", label: "Heading" },
      subcopy: { type: "textarea", label: "Subcopy" },
      bullets: { type: "textarea", label: "Bullet Points (one per line)" },
      image: { type: "image", label: "Overview Image", ...PL },
      ctaText: { type: "text", label: "CTA Text" },
      ctaLink: { type: "url", label: "CTA Link", ...PL }
    }},
    perfectFor: { label: "Perfect For", fields: {
      heading: { type: "text", label: "Heading" },
      subcopy: { type: "textarea", label: "Subcopy" },
      occasions: { type: "repeater", label: "Occasions", fields: {
        title: { type: "text", label: "Occasion Title" },
        description: { type: "textarea", label: "Description" }
      }}
    }},
    included: { label: "What's Included", fields: {
      heading: { type: "text", label: "Heading" },
      cards: { type: "repeater", label: "Included Items", fields: {
        title: { type: "text", label: "Title" },
        description: { type: "textarea", label: "Description" }
      }}
    }},
    cta: { label: "Bottom CTA", fields: {
      heading: { type: "text", label: "Heading" },
      subcopy: { type: "textarea", label: "Subcopy" },
      primaryText: { type: "text", label: "Primary Button" },
      primaryLink: { type: "url", label: "Primary Link" },
      secondaryText: { type: "text", label: "Secondary Button" },
      secondaryLink: { type: "url", label: "Secondary Link" }
    }}
  },
  seo: seoFields
});

// -- Semi-Private --
writeJSON(path.join(CONTENT_DIR, 'schemas', 'semi-private.json'), {
  page: "semi-private", label: "Semi-Private Events",
  sections: {
    hero: { label: "Hero", fields: {
      heading: { type: "text", label: "Heading" },
      subcopy: { type: "textarea", label: "Subcopy" },
      heroImage: { type: "image", label: "Hero Image", ...PL },
      ctaText: { type: "text", label: "CTA Button Text" },
      ctaLink: { type: "url", label: "CTA Link (Inquiry)", ...PL }
    }},
    features: { label: "What You Get", fields: {
      heading: { type: "text", label: "Heading" },
      bullets: { type: "textarea", label: "Feature List (one per line)", ...PL },
      image: { type: "image", label: "Side Image", ...PL }
    }},
    useCases: { label: "Perfect For", fields: {
      heading: { type: "text", label: "Heading" },
      subcopy: { type: "textarea", label: "Subcopy" },
      items: { type: "repeater", label: "Use Cases", fields: {
        title: { type: "text", label: "Title" }
      }}
    }},
    gallery: { label: "Gallery", fields: {
      images: { type: "repeater", label: "Gallery Images", fields: {
        image: { type: "image", label: "Image" },
        alt: { type: "text", label: "Alt Text" }
      }}
    }},
    included: { label: "What's Included", fields: {
      heading: { type: "text", label: "Heading" },
      subcopy: { type: "textarea", label: "Subcopy" },
      cards: { type: "repeater", label: "Included Items", fields: {
        title: { type: "text", label: "Title" },
        image: { type: "image", label: "Image" }
      }}
    }},
    cta: { label: "Bottom CTA", fields: {
      heading: { type: "text", label: "Heading" },
      subcopy: { type: "textarea", label: "Subcopy" },
      primaryText: { type: "text", label: "Primary Button" },
      primaryLink: { type: "url", label: "Primary Link" },
      secondaryText: { type: "text", label: "Secondary Button" },
      secondaryLink: { type: "url", label: "Secondary Link" }
    }}
  },
  seo: seoFields
});

// -- Father's Day bundles page --
writeJSON(path.join(CONTENT_DIR, 'schemas', 'fathers-day.json'), {
  page: "fathers-day", label: "Father's Day Bundles",
  sections: {
    hero: { label: "Hero", fields: {
      eyebrowWeek: { type: "text", label: "Promo eyebrow — line 1 (e.g. Father's Day week)" },
      eyebrowDates: { type: "text", label: "Promo eyebrow — line 2 (dates)" },
      heading: { type: "text", label: "Heading" },
      heroVideo: { type: "url", label: "Hero Video URL", ...PL },
      heroImage: { type: "image", label: "Fallback Hero Image", ...PL }
    }},
    twoDriver: { label: "Father's Day Bundles", fields: {
      heading: { type: "text", label: "Section Heading" },
      subcopy: { type: "textarea", label: "Subcopy" },
      packages: { type: "repeater", label: "Bundles", fields: {
        title: { type: "text", label: "Bundle name" },
        price: { type: "text", label: "Price Display (e.g. From $65)" },
        image: { type: "image", label: "Bundle image" },
        bullets: { type: "textarea", label: "Features (one per line)" },
        bookingLink: { type: "url", label: "Booking Link", ...PL },
        ctaText: { type: "text", label: "Button text (e.g. Select bundle)" }
      }}
    }}
  },
  seo: seoFields
});

// -- Menu 2025 --
writeJSON(path.join(CONTENT_DIR, 'schemas', 'menu-2025.json'), {
  page: "menu-2025", label: "Menu 2025",
  sections: {
    hero: { label: "Hero", fields: {
      heading: { type: "text", label: "Heading" },
      subcopy: { type: "textarea", label: "Subcopy" },
      backgroundImage: { type: "image", label: "Hero Background", perLocation: true }
    }},
    categories: { label: "Menu Categories", fields: {
      items: { type: "repeater", label: "Categories", fields: {
        name: { type: "text", label: "Category Name" },
        description: { type: "textarea", label: "Category Description" },
        menuItems: { type: "textarea", label: "Menu Items JSON (advanced)" }
      }}
    }}
  },
  seo: seoFields
});

// ============================================================================
// CONTENT — Real data extracted from the Velocity Local Replica pages
// ============================================================================
const seedData = require('./seed-data.js');

const homeContent = seedData['home'];
const foodDrinkContent = seedData['food-drink'];
const contactContent = seedData['contact'];
const promotionsContent = seedData['promotions'];
const membershipContent = seedData['membership'];
const aboutContent = seedData['about'];
const bookNowContent = seedData['book-now'];
const corporateEventsContent = seedData['corporate-events'];
const partiesEventsContent = seedData['parties-events'];
const partyPacksContent = seedData['party-packs'];
const semiPrivateContent = seedData['semi-private'];
const springBundlesContent = seedData['fathers-day'];
const menu2025Content = seedData['menu-2025'];

// Legacy block kept for reference — actual data now in seed-data.js
if (false) {
const _homeContent = {
  hero: {
    heading: "Velocity Sim Racing Lounge",
    subheading: "The most immersive sim racing experience in Texas. Professional-grade simulators, competitive leagues, and unforgettable events.",
    backgroundImage: "",
    ctaText: "Book Now",
    ctaLink: "/book"
  },
  promos: {
    heading: "What's Happening",
    subcopy: "Check out our latest deals and events",
    cards: [
      {
        image: "",
        badge: "Popular",
        title: "Membership",
        description: "Unlimited racing starting at {{price:membership.monthly}}/month. The best value for regular racers.",
        ctaText: "Learn More",
        ctaLink: "/membership",
        startDate: null,
        endDate: null,
        active: true
      },
      {
        image: "",
        badge: "Limited Time",
        title: "Spring Bundle",
        description: "Race + food combo starting at {{price:partyPack.basic}}. Perfect for groups.",
        ctaText: "View Bundles",
        ctaLink: "/bundles",
        startDate: "2026-03-01T00:00:00",
        endDate: "2026-05-31T23:59:59",
        active: true
      },
      {
        image: "",
        badge: "",
        title: "Happy Hour Racing",
        description: "Discounted races at {{price:happyHour.race}} every weekday 3-6pm.",
        ctaText: "Book a Slot",
        ctaLink: "/book",
        recurringDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
        active: true
      },
      {
        image: "",
        badge: "Every Thursday",
        title: "Ladies Night",
        description: "Free race for ladies every Thursday from 6-9pm. Walk-ins welcome!",
        ctaText: "Learn More",
        ctaLink: "/promos",
        recurringDays: ["thursday"],
        active: true
      }
    ]
  },
  howItWorks: {
    heading: "How It Works",
    subcopy: "Getting started is easy",
    steps: [
      { number: "1", title: "Book Online", description: "Reserve your simulator time slot through our easy booking system." },
      { number: "2", title: "Show Up & Race", description: "Arrive at your scheduled time. We'll get you set up in under 5 minutes." },
      { number: "3", title: "Compete", description: "Race against friends, set lap records, or join our weekly leagues." },
      { number: "4", title: "Celebrate", description: "Enjoy food and drinks from our full menu while you review your race data." }
    ]
  },
  reviews: {
    rating: "4.8",
    reviewCount: "750+",
    reviews: [
      { stars: "5", quote: "Best sim racing experience in Houston! The equipment is top-notch and the staff is incredibly helpful.", author: "Marcus T." },
      { stars: "5", quote: "Had our corporate event here and everyone loved it. Already planning the next one.", author: "Jennifer L." },
      { stars: "5", quote: "The food is surprisingly great for a racing venue. The smash burgers are a must-try.", author: "David R." }
    ]
  },
  cta: {
    heading: "Ready to Race?",
    subcopy: "Book your simulator session today and experience the thrill of professional sim racing.",
    primaryText: "Book Now",
    primaryLink: "/book",
    secondaryText: "View Menu",
    secondaryLink: "/menu"
  },
  _seo: {
    title: "Velocity Sim Racing Lounge | Houston & Dallas",
    description: "Professional sim racing experiences in Houston and Dallas. Book simulators, host events, enjoy food & drinks.",
    ogImage: "",
    ogTitle: "Velocity Sim Racing Lounge",
    noIndex: false
  }
};

const foodDrinkContent = {
  hero: {
    heading: "Our Menu",
    subcopy: "Fuel up before, during, or after your race. From craft cocktails to smash burgers, we've got you covered.",
    backgroundImage: { _perLocation: true, houston: "", dallas: "", _default: "" }
  },
  categories: {
    items: [
      {
        name: "Entrees",
        description: "Hearty meals to fuel your racing",
        menuItems: [
          { name: "Velocity Smash Burger", description: "Double smashed patties, American cheese, house sauce, pickles", price: "$16", image: "" },
          { name: "Chicken Tenders", description: "Hand-breaded tenders with fries and your choice of sauce", price: "$14", image: "" },
          { name: "Loaded Nachos", description: "Tortilla chips, queso, jalapeños, pico, sour cream", price: "$13", image: "" }
        ]
      },
      {
        name: "Appetizers",
        description: "Perfect for sharing between races",
        menuItems: [
          { name: "Pretzel Bites", description: "Warm soft pretzel bites with beer cheese", price: "$10", image: "" },
          { name: "Wings", description: "Choice of buffalo, BBQ, or garlic parmesan. 6 or 12 count.", price: "$12 / $20", image: "" }
        ]
      },
      {
        name: "Cocktails",
        description: "Craft cocktails and signature drinks",
        menuItems: [
          { name: "Checkered Flag", description: "Vodka, blue curaçao, lemonade, sparkling water", price: "$12", image: "" },
          { name: "Pit Stop Old Fashioned", description: "Bourbon, bitters, orange peel, smoked", price: "$14", image: "" },
          { name: "Draft Beers", description: "Rotating selection of local and craft beers", price: "$7-$9", image: "" }
        ]
      }
    ]
  },
  _seo: {
    title: "Menu | Velocity Sim Racing Lounge",
    description: "Explore our full food and drink menu. Smash burgers, craft cocktails, appetizers, and more.",
    ogImage: "",
    ogTitle: "Velocity Menu",
    noIndex: false
  }
};

const contactContent = {
  hero: {
    heading: "Contact Us",
    subcopy: "Have a question or want to plan an event? We'd love to hear from you."
  },
  locations: {
    items: [
      {
        name: "Velocity Houston",
        address: "123 Racing Blvd\nHouston, TX 77001",
        phone: "(713) 555-RACE",
        email: "houston@velocitysimlounge.com",
        hours: "Mon-Thu: 12pm-10pm\nFri: 12pm-12am\nSat: 10am-12am\nSun: 10am-10pm",
        mapEmbed: ""
      },
      {
        name: "Velocity Dallas",
        address: "456 Speed Way\nDallas, TX 75201",
        phone: "(214) 555-RACE",
        email: "dallas@velocitysimlounge.com",
        hours: "Mon-Thu: 12pm-10pm\nFri: 12pm-12am\nSat: 10am-12am\nSun: 10am-8pm",
        mapEmbed: ""
      }
    ]
  },
  _seo: {
    title: "Contact | Velocity Sim Racing Lounge",
    description: "Get in touch with Velocity Sim Racing Lounge. Locations in Houston and Dallas.",
    ogImage: "",
    ogTitle: "Contact Velocity",
    noIndex: false
  }
};

const promotionsContent = {
  hero: { eyebrow: "Save More, Race More", heading: "Deals & Promotions", subcopy: "From everyday discounts to seasonal specials, we've got ways to save on every visit.", heroImage: "" },
  discounts: { heading: "Everyday Discounts", subcopy: "Available any time \u2014 just walk in and ask.", cards: [
    { title: "Service Industry", description: "15% off racing for service industry workers. Show your badge or uniform.", badge: "15% Off", note: "Walk-ins only" },
    { title: "Student Discount", description: "10% off with valid student ID. Available all day, every day.", badge: "10% Off", note: "Walk-ins only" },
    { title: "Teacher Appreciation", description: "15% off for educators. Thank you for shaping the future.", badge: "15% Off", note: "Walk-ins only" }
  ]},
  ladiesNight: { heading: "Ladies Night", schedule: "Every Thursday", time: "6:00 PM - 9:00 PM", description: "Free race for ladies every Thursday! Walk-ins welcome. Bring your crew for a night of racing and fun.", image: "", tags: "Free Race, Walk-ins Welcome" },
  spotlight: { heading: "Calendar Spotlight", subcopy: "Mark your calendar for these special events.", cards: [
    { title: "Holiday Racing", description: "Special holiday hours and themed racing events throughout the year." },
    { title: "Valentine's Day", description: "Couples racing packages with food and drink specials." },
    { title: "Flash Sales", description: "Follow us on social media for surprise flash deals on racing packages." }
  ]},
  seasonal: { heading: "Seasonal Specials", subcopy: "Limited-time offers and holiday events.", title: "Spring Bundle", description: "Race + food combo starting at {{price:partyPack.basic}}. Perfect for groups. Available March through May.", highlight: "Includes food for two!", image: "", startDate: "2026-03-01T00:00:00", endDate: "2026-05-31T23:59:59" },
  explore: { heading: "Explore More", subcopy: "Check out our other offerings.", cards: [
    { title: "Father's Day Bundles", tag: "from {{price:partyPack.basic}}", image: "", link: "/fathers-day" },
    { title: "Party Packs", tag: "from {{price:partyPack.basic}}", image: "", link: "/party-packs" },
    { title: "Group Events", tag: "from {{price:groupEvent.perPerson}}/person", image: "", link: "/group-events" }
  ]},
  cta: { heading: "Ready to Race?", subcopy: "Book your simulator session and take advantage of our latest deals.", primaryText: "Book Now", primaryLink: "/book-now", secondaryText: "View Bundles", secondaryLink: "/fathers-day" },
  _seo: { title: "Promotions & Deals | Velocity Sim Racing Lounge", description: "Check out our latest deals, everyday discounts, and seasonal promotions.", ogImage: "", ogTitle: "Velocity Promotions", noIndex: false }
};

const membershipContent = {
  hero: { heading: "Membership", subcopy: "Unlimited racing starting at {{price:membership.monthly}}/month. The best value for regular racers.", ctaText: "See Plans" },
  benefits: { heading: "Member Benefits", cards: [
    { image: "", frontTitle: "Unlimited Racing", backTitle: "Race Anytime", backDescription: "Race as much as you want, any time we're open. No session limits, no blackout dates." },
    { image: "", frontTitle: "Priority Booking", backTitle: "Book First", backDescription: "Reserve simulators before they're available to the public. Never miss a prime time slot." },
    { image: "", frontTitle: "Guest Passes", backTitle: "Bring Friends", backDescription: "2 free guest passes per month. Share the experience with friends and family." },
    { image: "", frontTitle: "Food & Drink Deals", backTitle: "Save More", backDescription: "10% off all food and beverages every visit. Adds up fast." },
    { image: "", frontTitle: "League Access", backTitle: "Compete", backDescription: "Free entry to weekly racing leagues and tournaments. Climb the leaderboard." }
  ]},
  tiers: { heading: "Choose Your Plan", subcopy: "All plans include unlimited racing and member perks.", plans: [
    { name: "Racer", price: "{{price:membership.monthly}}", period: "/month", tag: "Great for casual racers", features: "Unlimited racing\nPriority booking\n1 guest pass/month\n5% food & drink discount", joinLink: "", ctaText: "Join Racer" },
    { name: "Pro", price: "$35", period: "/month", tag: "Most popular", features: "Unlimited racing\nPriority booking\n2 guest passes/month\n10% food & drink discount\nLeague access\nMember events", joinLink: "", ctaText: "Join Pro" },
    { name: "Ultimate", price: "$50", period: "/month", tag: "The full experience", features: "Unlimited racing\nPriority booking\n4 guest passes/month\n15% food & drink discount\nLeague access\nMember events\nPro simulator upgrades\nExclusive merch", joinLink: "", ctaText: "Join Ultimate" }
  ]},
  faq: { heading: "Membership FAQ", items: [
    { question: "Can I cancel anytime?", answer: "Yes, memberships are month-to-month with no long-term commitment. Cancel anytime from your account." },
    { question: "Do guest passes roll over?", answer: "Guest passes reset each month and do not roll over." },
    { question: "Can I upgrade my plan?", answer: "Yes, you can upgrade or downgrade at any time. Changes take effect on your next billing date." },
    { question: "Is there a family plan?", answer: "Not currently, but each family member can have their own membership at any tier." },
    { question: "Do I need to book in advance?", answer: "Members get priority booking but can also walk in. We recommend booking during peak hours to guarantee a sim." }
  ]},
  _seo: { title: "Membership | Velocity Sim Racing Lounge", description: "Join Velocity membership for unlimited racing, priority booking, and exclusive perks starting at $20/month.", ogImage: "", ogTitle: "Velocity Membership", noIndex: false }
};

const aboutContent = {
  hero: { heading: "How It Works", subcopy: "Everything you need to know about the Velocity experience, from booking to racing.", heroVideo: "", heroImage: "" },
  intro: { heading: "The Velocity Experience", body: "We've built the most immersive sim racing experience in Texas. Professional-grade simulators, realistic force feedback, and a curated selection of the world's best racing titles.", asideTitle: "No experience needed", asideBody: "Whether you're a first-timer or a seasoned sim racer, our team will get you set up and racing in minutes." },
  video: { heading: "Watch the Walkthrough", embedUrl: "" },
  racing: { heading: "The Racing Flow", subcopy: "Here's what a typical visit looks like.", steps: [
    { number: "1", title: "Check In", description: "Arrive at your scheduled time and check in at the front desk." },
    { number: "2", title: "Get Briefed", description: "Quick 2-minute orientation on the sim controls and safety." },
    { number: "3", title: "Race", description: "Jump in your simulator and hit the track. Pick from 20+ real-world circuits." },
    { number: "4", title: "Review & Celebrate", description: "Check your lap times, compare with friends, and enjoy food & drinks." }
  ], quickRaceTitle: "Quick Race", quickRaceDesc: "15-minute session. Perfect for first-timers or a quick lunch break race.", doubleRaceTitle: "Double Race", doubleRaceDesc: "30-minute session. More laps, more time to dial in your setup and chase faster times." },
  simulators: { heading: "Our Simulators", tiers: [
    { name: "Racer", image: "", features: "Direct-drive wheel\nTriple monitors\nRacing seat\nSurround sound" },
    { name: "Pro", image: "", features: "Direct-drive wheel\nTriple monitors\nMotion platform\nRacing seat\nWind simulation" },
    { name: "Ultimate", image: "", features: "Direct-drive wheel\nTriple curved monitors\nFull motion platform\nButtkicker\nWind simulation\nVR option" },
    { name: "2-Seater", image: "", features: "Side-by-side racing\nDirect-drive wheels\nTriple monitors\nGreat for couples/friends" }
  ]},
  carsAndTracks: { heading: "Cars & Tracks", proTipTitle: "Pro Tip", proTipBody: "Ask our staff for track recommendations based on your skill level. We'll help you find the perfect challenge." },
  faq: { heading: "FAQ", items: [
    { question: "Do I need to bring anything?", answer: "Nope! Everything is provided. Just show up and race." },
    { question: "What racing games do you have?", answer: "We run iRacing, Assetto Corsa Competizione, and Gran Turismo depending on the sim tier." },
    { question: "Can kids race?", answer: "Yes! We welcome racers of all ages. Kids under 12 should be accompanied by an adult." },
    { question: "Is there a height/weight limit?", answer: "Our sims accommodate most body types. The 2-Seater has the most spacious cockpit." },
    { question: "What if I've never sim raced before?", answer: "Most of our guests are first-timers. Our staff will walk you through everything before your session." }
  ]},
  cta: { heading: "Ready to Try It?", subcopy: "Book your first session and experience sim racing the way it's meant to be.", ctaText: "Book Now", ctaLink: "/book-now" },
  _seo: { title: "How It Works | Velocity Sim Racing Lounge", description: "Learn how Velocity sim racing works. Professional simulators, easy booking, and an unforgettable experience.", ogImage: "", ogTitle: "How It Works - Velocity", noIndex: false }
};

const bookNowContent = {
  experiences: { heading: "Choose Your Experience" },
  mainExperiences: { cards: [
    { title: "Quick Race", price: "From {{price:race.single}}", badge: "", image: "", bullets: "15-minute session\nPerfect for beginners\nAll sim tiers available", bookingLink: "" },
    { title: "Double Race", price: "From {{price:race.double}}", badge: "Most Popular", image: "", bullets: "30-minute session\nMore laps, faster times\nAll sim tiers available", bookingLink: "" },
    { title: "Six Ten Race", price: "From $75", badge: "", image: "", bullets: "60-minute session\nFor serious racers\nPro & Ultimate sims", bookingLink: "" },
    { title: "Leaderboard Challenge", price: "From $35", badge: "", image: "", bullets: "Timed hot laps\nCompete for top spot\nWeekly prizes", bookingLink: "" }
  ]},
  twoSeater: { cards: [
    { title: "2-Seater Quick", price: "From $55", image: "", bullets: "15 minutes side-by-side\nGreat for couples\nNo experience needed", bookingLink: "" },
    { title: "2-Seater Double", price: "From $90", image: "", bullets: "30 minutes side-by-side\nRace each other\nThe ultimate date", bookingLink: "" }
  ]},
  springBundles: { intro: "Limited-time spring bundles \u2014 racing + food combos at special prices.", cards: [
    { title: "Spring Quick Bundle", price: "From {{price:partyPack.basic}}", image: "", bullets: "Quick race for 2\nFood for 2 included\nAny sim tier", bookingLink: "" },
    { title: "Spring Double Bundle", price: "From $99", image: "", bullets: "Double race for 2\nFood for 2 included\nAny sim tier", bookingLink: "" }
  ]},
  features: { items: [
    { icon: "", label: "Adjustable seat height" },
    { icon: "", label: "Race with friends" },
    { icon: "", label: "20+ real tracks" },
    { icon: "", label: "VR headset option" }
  ]},
  membershipPromo: { eyebrow: "Save More", heading: "Become a Member", description: "Unlimited racing, priority booking, and exclusive perks. The best value for regular racers.", ctaText: "View Plans", ctaLink: "/membership", tierChips: [
    { name: "Racer", price: "{{price:membership.monthly}}/mo" },
    { name: "Pro", price: "$35/mo" },
    { name: "Ultimate", price: "$50/mo" }
  ]},
  faq: { heading: "Booking FAQ", items: [
    { question: "How far in advance should I book?", answer: "We recommend booking at least 24 hours in advance, especially for weekends. Walk-ins are welcome but subject to availability." },
    { question: "Can I cancel or reschedule?", answer: "Yes, you can cancel or reschedule up to 2 hours before your session." },
    { question: "How many people per simulator?", answer: "One person per simulator, except the 2-Seater which holds two." },
    { question: "Do you offer group rates?", answer: "Yes! Check out our Party Packs and Group Events pages for group pricing." },
    { question: "What payment methods do you accept?", answer: "We accept all major credit cards, Apple Pay, and Google Pay." }
  ]},
  _seo: { title: "Book Now | Velocity Sim Racing Lounge", description: "Book your sim racing session at Velocity. Quick races, double races, 2-seater experiences, and spring bundles.", ogImage: "", ogTitle: "Book Now - Velocity", noIndex: false }
};

const corporateEventsContent = {
  hero: { heading: "Corporate Events", subcopy: "Team building, client entertainment, and private venue buyouts. Velocity delivers an experience your team won't forget.", heroImage: "", ctaText: "Inquire Now", ctaLink: "" },
  venue: { heading: "Your Venue", subcopy: "Full venue buyout available for the ultimate private experience.", image: "", stats: [
    { number: "20+", label: "Simulators" },
    { number: "100+", label: "Guest Capacity" }
  ], bullets: "Private venue access\nDedicated event coordinator\nCustom racing formats\nFull food & drink service\nA/V and presentation setup\nBranded experience options" },
  perfectFor: { heading: "Perfect For", subcopy: "Whatever the occasion, we make it unforgettable.", items: [
    { label: "Team Building" }, { label: "Client Entertainment" }, { label: "Product Launches" }, { label: "Holiday Parties" }, { label: "Award Ceremonies" }
  ]},
  enhancements: { heading: "Event Enhancements", subcopy: "Take your event to the next level.", cards: [
    { title: "Custom Leaderboard", description: "Branded digital leaderboard tracking everyone's best laps in real-time." },
    { title: "Catered Menu", description: "Custom food and drink packages tailored to your event and budget." },
    { title: "Championship Format", description: "Multi-round tournament brackets with qualifying, semifinals, and a grand finale." }
  ]},
  mobileSim: { heading: "Mobile Simulator", subcopy: "Can't come to us? We'll bring the racing to you.", checklist: "On-site delivery and setup\nProfessional race marshals\nFull branding options", image: "" },
  included: { heading: "Every Event Includes", subcopy: "Standard with all corporate packages.", items: [
    { title: "Event Coordinator" }, { title: "Race Briefing" }, { title: "Leaderboard" }, { title: "Photo Opportunities" }
  ]},
  cta: { heading: "Let's Plan Your Event", subcopy: "Tell us about your event and we'll put together a custom proposal.", primaryText: "Inquire Now", primaryLink: "", secondaryText: "View All Events", secondaryLink: "/group-events" },
  _seo: { title: "Corporate Events | Velocity Sim Racing Lounge", description: "Host your next corporate event at Velocity. Team building, client entertainment, and private venue buyouts in Houston and Dallas.", ogImage: "", ogTitle: "Velocity Corporate Events", noIndex: false }
};

const partiesEventsContent = {
  hero: { heading: "Group Events", tagline: "The best group experience in town", heroVideo: "", heroImage: "", testimonialQuote: "Had our team outing here and it was the most fun we've had as a company. Everyone from the CEO to the interns was competitive!", testimonialAuthor: "Sarah K., Marketing Director", testimonialStars: "5" },
  eventTypes: { heading: "Event Types", subcopy: "From intimate gatherings to full venue buyouts.", cards: [
    { title: "Semi-Private Event", description: "Reserve a section of our venue for your group while enjoying the full Velocity atmosphere.", meta: "8-20 guests", image: "", primaryText: "Learn More", primaryLink: "/semi-private", secondaryText: "Inquire", secondaryLink: "" },
    { title: "Party Pack", description: "All-inclusive packages with racing, food, and drinks. Perfect for birthdays, celebrations, and team outings.", meta: "6-15 guests", image: "", primaryText: "View Packs", primaryLink: "/party-packs", secondaryText: "Inquire", secondaryLink: "" },
    { title: "Corporate Event", description: "Team building, client entertainment, and custom race formats with a dedicated event coordinator.", meta: "15-100+ guests", image: "", primaryText: "Learn More", primaryLink: "/corporate-events", secondaryText: "Inquire", secondaryLink: "" },
    { title: "Full Venue Buyout", description: "The entire venue is yours. Complete privacy, full customization, and an unforgettable experience.", meta: "50-100+ guests", image: "", primaryText: "Inquire", primaryLink: "", secondaryText: "", secondaryLink: "" }
  ]},
  includes: { heading: "Every Event Includes", items: [
    { label: "Dedicated event space" }, { label: "Race briefing & support" }, { label: "Digital leaderboard" }, { label: "Photo opportunities" }
  ]},
  difference: { heading: "The Velocity Difference", subcopy: "Why groups choose us over traditional event venues.", cards: [
    { title: "Unique Experience", description: "Nothing else like it. Your guests will talk about this for months." },
    { title: "All Skill Levels", description: "First-timers and experienced racers all have a blast. No one sits on the sideline." },
    { title: "Food & Drink", description: "Full menu and bar service. No need to go anywhere else." },
    { title: "Hassle-Free", description: "We handle everything. Just show up with your group and have fun." }
  ]},
  faq: { heading: "Group Events FAQ", items: [
    { question: "How far in advance should I book?", answer: "We recommend at least 2 weeks for group events, and 4+ weeks for large corporate events or full buyouts." },
    { question: "Can I customize the event format?", answer: "Absolutely. We work with you to create custom race formats, tournament brackets, and themed experiences." },
    { question: "Do you provide food and drinks?", answer: "Yes, we have a full kitchen and bar. We offer preset menus for events or can customize based on your needs." },
    { question: "What's the minimum group size?", answer: "Party Packs start at 6 guests. Semi-Private events start at 8. There's no minimum for a corporate inquiry." },
    { question: "Is there a deposit?", answer: "A deposit is required for all event bookings. The amount depends on the event type and group size." }
  ]},
  cta: { heading: "Ready to Plan?", subcopy: "Let us help you create an unforgettable event.", primaryText: "Book Now", primaryLink: "/book-now", secondaryText: "Inquire", secondaryLink: "" },
  _seo: { title: "Group Events | Velocity Sim Racing Lounge", description: "Host your next group event at Velocity. Semi-private events, party packs, corporate events, and full venue buyouts.", ogImage: "", ogTitle: "Velocity Group Events", noIndex: false }
};

const partyPacksContent = {
  hero: { eyebrow: "All-Inclusive Fun", heading: "Party Packs", subcopy: "Everything you need for an epic celebration. Racing, food, drinks, and memories \u2014 all in one package.", heroVideo: "", heroImage: "", ctaText: "Inquire Now" },
  overview: { heading: "What's a Party Pack?", subcopy: "All-inclusive group experiences designed for celebrations. Pick a pack, invite your crew, and leave the rest to us.", bullets: "Racing sessions for everyone\nFood and drinks included\nDedicated party area\nNo planning stress", image: "", ctaText: "See Pricing", ctaLink: "" },
  perfectFor: { heading: "Perfect For", subcopy: "Party Packs are great for any celebration.", occasions: [
    { title: "Birthday Parties", description: "The most unique birthday experience in town." },
    { title: "Bachelor/Bachelorette", description: "An unforgettable pre-wedding celebration." },
    { title: "Graduations", description: "Celebrate achievements with friends and family." },
    { title: "Team Celebrations", description: "Reward your team with a fun group outing." },
    { title: "Just Because", description: "No occasion needed. Get your friends together and race." }
  ]},
  included: { heading: "Every Pack Includes", cards: [
    { title: "Racing Sessions", description: "Sim time for every guest in your group." },
    { title: "Food & Drinks", description: "Curated menu options included in every pack." },
    { title: "Party Area", description: "Dedicated space for your group to hang out between races." },
    { title: "Event Support", description: "A Velocity team member to run your event smoothly." }
  ]},
  cta: { heading: "Let's Party", subcopy: "Tell us about your event and we'll find the perfect pack.", primaryText: "Inquire Now", primaryLink: "", secondaryText: "Back to Events", secondaryLink: "/group-events" },
  _seo: { title: "Party Packs | Velocity Sim Racing Lounge", description: "All-inclusive party packages with racing, food, and drinks. Perfect for birthdays, celebrations, and group outings.", ogImage: "", ogTitle: "Velocity Party Packs", noIndex: false }
};

const semiPrivateContent = {
  hero: { heading: "Semi-Private Events", subcopy: "Reserve a section of our venue for your group. All the Velocity energy with your own dedicated space.", heroImage: "", ctaText: "Inquire Now", ctaLink: "" },
  features: { heading: "What You Get", bullets: "Dedicated section of the venue\n8-20 guests\nPrivate racing area\nFood & drink service\nDedicated event support\nCustom race formats available", image: "" },
  useCases: { heading: "Perfect For", subcopy: "Semi-private works great for mid-size groups.", items: [
    { title: "Date Nights" }, { title: "Friend Groups" }, { title: "Small Team Outings" }, { title: "Birthday Parties" }
  ]},
  gallery: { images: [
    { image: "", alt: "Racing action" },
    { image: "", alt: "Venue atmosphere" },
    { image: "", alt: "Group celebration" }
  ]},
  included: { heading: "What's Included", subcopy: "Standard with every semi-private booking.", cards: [
    { title: "Reserved Racing Sims", image: "" },
    { title: "Dedicated Seating", image: "" },
    { title: "Event Coordinator", image: "" },
    { title: "Leaderboard Display", image: "" }
  ]},
  cta: { heading: "Reserve Your Space", subcopy: "Tell us about your group and preferred date.", primaryText: "Inquire Now", primaryLink: "", secondaryText: "View All Events", secondaryLink: "/group-events" },
  _seo: { title: "Semi-Private Events | Velocity Sim Racing Lounge", description: "Reserve a section of Velocity for your group. 8-20 guests, dedicated racing area, and full event support.", ogImage: "", ogTitle: "Velocity Semi-Private Events", noIndex: false }
};

const springBundlesContent = {
  hero: { eyebrowWeek: "Father's Day week", eyebrowDates: "June 15–21, 2026", heading: "Father's Day *Eat & Race*", heroVideo: "https://vimeo.com/1194083193", heroImage: "" },
  twoDriver: { heading: "Two-Driver Bundles", subcopy: "Race together, eat together. Limited time only.", packages: [
    { title: "Quick Racer Bundle", price: "From {{price:partyPack.basic}}", image: "", bullets: "Quick race for 2\nFood for 2 included\nRacer-tier simulators", bookingLink: "", ctaText: "Book Now" },
    { title: "Double Pro Bundle", price: "From $99", image: "", bullets: "Double race for 2\nFood for 2 included\nPro-tier simulators", bookingLink: "", ctaText: "Book Now" }
  ]},
  _seo: { title: "Spring Bundles | Velocity Sim Racing Lounge", description: "Limited-time spring bundle deals at Velocity. Race + food combos starting at $65. Grab a friend and save.", ogImage: "", ogTitle: "Velocity Spring Bundles", noIndex: false }
};

const menu2025Content = {
  hero: { heading: "2025 Menu", subcopy: "Our latest menu featuring new entrees, craft cocktails, and seasonal specials.", backgroundImage: { _perLocation: true, houston: "", dallas: "", _default: "" } },
  categories: { items: [
    { name: "New Additions", description: "Fresh items added for 2025", menuItems: "" },
    { name: "Entrees", description: "Hearty meals to fuel your racing", menuItems: "" },
    { name: "Appetizers", description: "Perfect for sharing between races", menuItems: "" },
    { name: "Cocktails", description: "Craft cocktails and signature drinks", menuItems: "" },
    { name: "Beer & Wine", description: "Local and craft selections", menuItems: "" }
  ]},
  _seo: { title: "2025 Menu | Velocity Sim Racing Lounge", description: "Check out Velocity's 2025 menu. New entrees, craft cocktails, and seasonal specials.", ogImage: "", ogTitle: "Velocity 2025 Menu", noIndex: false }
};

} // end of legacy if(false) block

// ============================================================================
// Write all content to staging + production
// ============================================================================
const allContent = {
  'home': homeContent,
  'food-drink': foodDrinkContent,
  'contact': contactContent,
  'promotions': promotionsContent,
  'membership': membershipContent,
  'about': aboutContent,
  'book-now': bookNowContent,
  'corporate-events': corporateEventsContent,
  'parties-events': partiesEventsContent,
  'party-packs': partyPacksContent,
  'semi-private': semiPrivateContent,
  'fathers-day': springBundlesContent,
  'menu-2025': menu2025Content
};

['staging', 'production'].forEach(env => {
  Object.entries(allContent).forEach(([key, content]) => {
    writeJSON(path.join(CONTENT_DIR, env, `${key}.json`), content);
  });
});

// -- Forms -------------------------------------------------------------------
writeJSON(path.join(CONTENT_DIR, 'forms', 'contact.json'), {
  id: "contact", title: "Contact Us",
  fields: [
    { name: "name", type: "text", label: "Your Name", required: true, placeholder: "John Doe" },
    { name: "email", type: "email", label: "Email Address", required: true, placeholder: "john@example.com" },
    { name: "phone", type: "tel", label: "Phone Number", required: false, placeholder: "(555) 555-5555" },
    { name: "location", type: "select", label: "Preferred Location", required: true, options: ["Houston", "Dallas"] },
    { name: "subject", type: "select", label: "Subject", required: true, options: ["General Inquiry", "Booking Help", "Event Planning", "Feedback", "Other"] },
    { name: "message", type: "textarea", label: "Message", required: true, placeholder: "Tell us what's on your mind..." }
  ],
  successMessage: "Thanks for reaching out! We'll get back to you within 24 hours.", submitTo: ""
});

writeJSON(path.join(CONTENT_DIR, 'forms', 'corporate-inquiry.json'), {
  id: "corporate-inquiry", title: "Corporate Event Inquiry",
  fields: [
    { name: "company", type: "text", label: "Company Name", required: true, placeholder: "Acme Corp" },
    { name: "contactName", type: "text", label: "Contact Name", required: true, placeholder: "Jane Smith" },
    { name: "email", type: "email", label: "Email", required: true, placeholder: "jane@acme.com" },
    { name: "phone", type: "tel", label: "Phone", required: true, placeholder: "(555) 555-5555" },
    { name: "guests", type: "number", label: "Number of Guests", required: true, min: 5, placeholder: "20" },
    { name: "date", type: "date", label: "Preferred Date", required: false },
    { name: "location", type: "select", label: "Location", required: true, options: ["Houston", "Dallas", "Either"] },
    { name: "budget", type: "select", label: "Budget Range", required: false, options: ["Under $1,000", "$1,000-$2,500", "$2,500-$5,000", "$5,000+"] },
    { name: "details", type: "textarea", label: "Event Details", required: false, placeholder: "Tell us about your event goals, any special requests, etc." }
  ],
  successMessage: "Thanks for your interest in hosting a corporate event! Our events team will reach out within 48 hours.", submitTo: ""
});

const pageList = Object.keys(allContent).join(', ');
console.log('Seed data written successfully!');
console.log(`  - Locations: houston, dallas`);
console.log(`  - Pricing: 9 entries`);
console.log(`  - Banners: 2 entries`);
console.log(`  - Schemas: ${pageList}`);
console.log(`  - Content: ${pageList} (staging + production)`);
console.log(`  - Forms: contact, corporate-inquiry`);
