// Real content extracted verbatim from the Velocity Local Replica pages

module.exports = {

home: {
  hero: {
    heading: "",
    subheading: "",
    backgroundImage: "",
    ctaText: "",
    ctaLink: ""
  },
  promos: {
    heading: "What\u2019s *Happening*",
    subcopy: "From memberships to happy hour to parties \u2014 there\u2019s always a reason to race.",
    cards: [
      { image: "", badge: "Popular", title: "Drive.More. Membership", description: "A free hour of play every month, a free appetizer every visit, and bring up to five guests \u2014 all for just $20/month.", ctaText: "Memberships", ctaLink: "/membership/", active: true },
      { image: "", badge: "Mon\u2013Thu", title: "Happy Hour", description: "Half-off sim racing Monday through Thursday when you book online. No codes, no coupons \u2014 just straight-up savings.", ctaText: "Book Now", ctaLink: "/book-now/", recurringDays: ["monday","tuesday","wednesday","thursday"], active: true },
      { image: "", badge: "", title: "Group Events", description: "Birthdays, bachelor parties, corporate team-building, and celebrations. Book online for up to 24 guests quickly and easily.", ctaText: "Book Now", ctaLink: "/group-events/", active: true },
      { image: "", badge: "Wednesdays", title: "Ladies Night", description: "Every Wednesday night \u2014 special pricing on drinks and sim sessions. Bring your crew for a race night that\u2019s anything but ordinary.", ctaText: "Learn More", ctaLink: "/book-now/", recurringDays: ["wednesday"], active: true },
      { image: "", badge: "Limited Time", title: "Eat & Race Bundles", description: "Sim racing + food packages at special pricing. Grab your crew and fuel up before you race \u2014 April 2026 only.", ctaText: "View Bundles", ctaLink: "/fathers-day/", startDate: "2026-04-01T00:00:00", endDate: "2026-04-30T23:59:59", active: true }
    ]
  },
  howItWorks: {
    heading: "Racers, Start Your Engines",
    subcopy: "New to sim racing or a seasoned pro \u2014 here\u2019s how to get on track in four easy steps.",
    steps: [
      { number: "1", title: "Book Online", description: "Reserve a simulator for you and your crew. Walk-ins welcome, but online booking is the fastest way to lock in your seat." },
      { number: "2", title: "Eat & Drink", description: "From wagyu sliders to craft cocktails, fuel up about an hour before your session so you\u2019re ready when the green flag drops." },
      { number: "3", title: "Choose Your Ride", description: "Pick from a selection of cars, tracks, and experiences \u2014 including a virtual Houston 610 loop. Race solo or go head-to-head." },
      { number: "4", title: "Race & Win", description: "Hit the track and compete. Join monthly leaderboard challenges for bragging rights, prizes, and the top spot on our boards." }
    ]
  },
  builtFor: {
    heading: "Built for *Every Kind* of Racer",
    body: "Velocity isn\u2019t just Houston\u2019s sim racing destination \u2014 it\u2019s where Houston comes to race, celebrate, and hang out. We are the go-to spot for:",
    checklist: [
      "Friends\u2019 nights out you\u2019ll be talking about all week",
      "Date nights \u2014 we\u2019ve got everything to rev your night up",
      "Birthday parties and celebrations",
      "Corporate team-building and bachelor/bachelorette events",
      "Car meets and special community events"
    ],
    secondParagraph: "Part of your crew not in the competitive spirit? No worries \u2014 we\u2019ve got a full restaurant and bar to keep everyone occupied and happy.",
    ctaText: "Plan Your Event"
  },
  simulators: {
    heading: "The Best Racing Simulators in Texas",
    subcopy: "Professional-grade rigs designed for realism, comfort, and competition. From motion platforms to triple-screen setups, we\u2019ve got the most immersive sim racing experience in Houston.",
    cards: [
      { title: "Standard Rigs", tag: "Triple Screen Setup", image: "" },
      { title: "Pro Rigs", tag: "Direct Drive Force Feedback", image: "" },
      { title: "Ultimate Motion Rig", tag: "Full Motion Platform", image: "" }
    ],
    ctaText: "Learn More About Our Sims"
  },
  reviews: {
    heading: "What Racers Are Saying",
    rating: "4.8",
    reviewCount: "Based on 707 Google reviews",
    reviews: [
      { stars: "5", quote: "We had an incredible time hosting a birthday party here! Every single guest had an absolute blast. The staff were beyond friendly and the owner personally checked in on us multiple times. Couldn\u2019t have asked for a better place to celebrate!", author: "Theresa" },
      { stars: "5", quote: "The best experience in Houston hands down. I\u2019ve been coming here time and time again. All the employees are amazing with A1 service. Best hang out spot after a good long week \u2014 and the food is amazing enough to make me get 2nds and 3rds.", author: "Trusty R." },
      { stars: "5", quote: "Great for company events, especially if you have a competitive team! The staff is incredibly personable, the atmosphere is fun and easy to get everyone engaged, and the food was really good. They accommodated food allergies and preferences. Highly recommended!", author: "Corporate Event Guest" }
    ],
    reviewsLink: "Read All Reviews on Google"
  },
  cta: {
    heading: "Ready to Race?",
    subcopy: "Whether it\u2019s your first lap or your hundredth, the starting grid is always open. Book online and get behind the wheel today.",
    primaryText: "Book a Simulator",
    primaryLink: "/book-now/",
    secondaryText: "View Our Menu",
    secondaryLink: "/food-and-drink/"
  },
  _seo: { title: "Velocity Sim Racing Lounge | Houston", description: "Houston\u2019s premier sim racing lounge with professional-grade simulators, full bar & restaurant, and event space.", ogImage: "", ogTitle: "Velocity Sim Racing Lounge", noIndex: false }
},

promotions: {
  hero: { eyebrow: "Save More, Race More", heading: "Deals & *Promotions*", subcopy: "Exclusive discounts for those who serve, learn, and teach \u2014 plus seasonal deals you won\u2019t want to miss.", heroImage: "" },
  discounts: { heading: "Everyday *Discounts*", subcopy: "We believe everyone deserves a seat behind the wheel. Show a valid ID at check-in to unlock your discount.", cards: [
    { title: "Service Member Discount", description: "Active duty, veterans, reservists, and military families \u2014 thank you for your service.", badge: "Discount at check-in", note: "Present a valid military ID, DD-214, or veteran status card." },
    { title: "Student Discount", description: "College, university, or high school students can save on every visit. Study hard, race harder.", badge: "Discount at check-in", note: "Present a valid student ID with current enrollment date." },
    { title: "Teacher Discount", description: "Educators and school staff deserve a break. Bring your crew for a race after a long semester.", badge: "Discount at check-in", note: "Present a valid teacher or school employee ID." }
  ]},
  ladiesNight: { heading: "Ladies *Night*", schedule: "Every Wednesday", time: "6 PM \u2013 11 PM", description: "One free race for the ladies, every Wednesday night. No reservation needed \u2014 just walk in, hop on a sim, and hit the track.", image: "", tags: "1 Free Race, Walk-ins only" },
  spotlight: { heading: "On the *Calendar*", subcopy: "Limited-time packages and surprise drops throughout the year \u2014 follow Velocity on social and join the list so you never miss a deal.", cards: [
    { title: "Holiday Specials", description: "Spring break, summer, Thanksgiving weekend, and winter holiday packages with limited-time pricing." },
    { title: "Valentine\u2019s Day", description: "Date night with a twist. Couples packages on our 2-seater motion simulator \u2014 the ultimate speed date." },
    { title: "Flash Sales", description: "Surprise drops throughout the year \u2014 follow our socials and join the mailing list to get notified first." }
  ]},
  seasonal: { heading: "Seasonal *Promotions*", subcopy: "Our biggest windows of the year \u2014 when they drop, simulators go fast. Start with the headline event below.", title: "Black Friday", description: "Our most-anticipated sale of the year. Last year we sold out from 10 AM to midnight \u2014 every simulator was booked solid. Don\u2019t sleep on early access.", highlight: "Sold out 10 AM \u2013 12 AM last year", image: "" },
  explore: { heading: "Explore *More*", subcopy: "Combine your discount with one of our packages for even more value.", cards: [
    { title: "Bundles", tag: "Eat & Race packages from {{price:springSprint}}", image: "", link: "/fathers-day/" },
    { title: "Party Packs", tag: "Birthdays, celebrations & group fun", image: "", link: "/party-packs/" },
    { title: "Events", tag: "Corporate, private & semi-private", image: "", link: "/group-events/" }
  ]},
  cta: { heading: "Ready to Race?", subcopy: "Book your experience today and bring a valid ID to unlock your discount at check-in. Seasonal deals are first come, first served.", primaryText: "Book now", primaryLink: "/book-now/", secondaryText: "View bundles", secondaryLink: "/fathers-day/" },
  _seo: { title: "Deals & Promotions | Velocity Sim Racing Lounge", description: "Exclusive discounts for service members, students, and teachers. Plus seasonal deals and Ladies Night every Wednesday.", ogImage: "", ogTitle: "Velocity Promotions", noIndex: false }
},

membership: {
  hero: { heading: "Become a *member* and take your Velocity experience to the next level", subcopy: "Memberships start at {{price:membership.racer}}/month and offer unbeatable value", ctaText: "Learn more" },
  benefits: { heading: "What\u2019s included in your membership", cards: [
    { image: "", frontTitle: "Monthly races", backTitle: "Monthly races", backDescription: "Membership includes monthly races as well as exclusive members-only leagues, competitions, and social events." },
    { image: "", frontTitle: "Members only events", backTitle: "Members only events", backDescription: "League nights, car rallies, and track experiences reserved for members." },
    { image: "", frontTitle: "Early access to new experiences", backTitle: "Early access", backDescription: "Be first to try new sims, formats, and venue features before the public." },
    { image: "", frontTitle: "Food & drink discounts", backTitle: "Food & drink discounts", backDescription: "Ongoing savings on the full food and beverage menu for members." },
    { image: "", frontTitle: "Exclusive perks", backTitle: "Exclusive perks", backDescription: "Automotive partnerships and member-only perks beyond the simulator." }
  ]},
  tiers: { heading: "Choose your membership tier", subcopy: "Ready, set, go! Enjoy unbeatable benefits. Cancel anytime.", plans: [
    { name: "Racer", price: "{{price:membership.racer}}", period: "/mo", tag: "Drive more, save more.", features: "4 races per month\nMonday \u2013 Friday\nRacer sim only\n10% off additional bookings (excludes happy hour)\nMembers only events", joinLink: "", ctaText: "Join now" },
    { name: "Pro", price: "{{price:membership.pro}}", period: "/mo", tag: "Can\u2019t get enough? We\u2019ve got you.", features: "6 races per month\nSunday \u2013 Friday\nPro or Racer sim\n10% off additional bookings\n10% off food & non-alcoholic drinks\n10% off competition fees", joinLink: "", ctaText: "Join now" },
    { name: "Ultimate", price: "{{price:membership.ultimate}}", period: "/mo", tag: "Everything in Pro, dialed to eleven. Extremely limited availability.", features: "8 races per month\nAny day, any location\nAny sim\n15% off additional bookings\n10% off food & non-alcoholic drinks\nEarly access to new experiences & VIP events", joinLink: "", ctaText: "Join now" }
  ]},
  faq: { heading: "You may be wondering:", items: [
    { question: "How do I redeem my monthly races?", answer: "To redeem your monthly races, please visit Velocity in store. For Ultimate memberships, you can also call in ahead of time to book via phone." },
    { question: "How do I receive my monthly card?", answer: "Each month you will receive a new monthly card for the month. You\u2019ll be able to use the monthly membership card to redeem your monthly races as well as other membership benefits." },
    { question: "When does my membership begin?", answer: "Your membership begins the day your first payment is processed. The monthly cards will be available immediately upon this payment, please visit the store in person to redeem your card." },
    { question: "Can I redeem my monthly races via online booking?", answer: "Not at this time, we are working on a new system to enable this and we appreciate your patience in the meantime." },
    { question: "Do my unused monthly races roll over to the next month?", answer: "No, they do not roll over." },
    { question: "What are some other membership benefits?", answer: "The Velocity membership goes well beyond sim racing. We\u2019re excited to bring together unique members-only events from car rallies to special celebrations." },
    { question: "Can I share my monthly races?", answer: "You can share monthly races if you choose but you need to be present with your guest in order to do so." },
    { question: "Can I share other membership benefits?", answer: "You cannot share benefits beyond monthly races. For example, early access to certain products and experiences can only be redeemed by a current card holder." },
    { question: "What type of experiences are included in the Ultimate membership?", answer: "The Ultimate membership is limited to just a lucky 24 members. These members will have exclusive access to new driving experiences, professional coaching, and more." },
    { question: "What is included in the competition discount?", answer: "Pro & Ultimate tiers get 10% off of leagues and Race of Champions fees. This excludes Endurance races, Car Meet races, and spontaneous races (such as April Fool\u2019s race)." },
    { question: "When can I use my additional booking discounts?", answer: "Discounts are available after you\u2019ve used all of your monthly sessions. Walk-ins only and excludes Happy Hour." },
    { question: "How do I cancel my monthly membership?", answer: "To cancel your membership, please call Velocity (832-627-4981) or visit us in store." }
  ]},
  _seo: { title: "Membership | Velocity Sim Racing Lounge", description: "Velocity memberships start at $99/month. Monthly races, food & drink discounts, members-only events, and exclusive perks.", ogImage: "", ogTitle: "Velocity Membership", noIndex: false }
},

about: {
  hero: { heading: "How it *works*", subcopy: "From your first session to your fastest lap, we make sim racing simple and fun.", heroVideo: "", heroImage: "" },
  intro: { heading: "What to expect at Velocity", body: "Expect a premium racing inspired venue with a fun and approachable sim racing experience. You\u2019ll be greeted warmly by our staff who will help you select from a variety of cars, tracks, and driving experiences. The Drivers Briefing will help orient and familiarize you with operating a racing simulator. From start to finish, Velocity\u2019s team is there for you so you can have an amazing time.", asideTitle: "Support tailored to your comfort level", asideBody: "New to sim racing or trying Pro/Ultimate for the first time? Our team helps with setup, controls, and pacing so you can enjoy the experience with confidence." },
  racing: { heading: "Four elements of The Velocity Experience", subcopy: "Every session is built around these four elements: check-in, cars, tracks, and simulator tier.", steps: [
    { number: "1", title: "Book your session", description: "Choose your simulator tier (Racer, Pro, or Ultimate) and session length (Quick Race or Double Race) when you book online. Walk-ins are also welcome, though we strongly recommend booking online for the weekends." },
    { number: "2", title: "Check in", description: "Arrive and check in. First-time drivers complete a one-time waiver and driver profile. Returning drivers are ready to go straight to Race Control." },
    { number: "3", title: "Pick your car and track", description: "Choose from a variety of car classes such as GT4, GT3, open-wheel, and more. Pair it with a track that matches your comfort level, from beginner-friendly to expert. Not interested in racing the track? We even have a virtual Houston for you to relive your Fast & Furious dreams." },
    { number: "4", title: "Race", description: "Structure your time however you want: all practice, a full race format, or anything in between. Drive solo or race together with friends and talk through built-in headsets." }
  ], quickRaceTitle: "Quick Race", quickRaceDesc: "Each race is divided into a Qualifying and Race period, with approximately 25 minutes of total drive time. If you\u2019re driving solo, you\u2019ll get 25-30 minutes of practice time.", doubleRaceTitle: "Double Race", doubleRaceDesc: "Two separate sessions \u2014 pick any car and track for each. Or one long session with extended practice, qualifying, and race." },
  simulators: { heading: "The BEST Simulators \u2014 *Only at Velocity*", tiers: [
    { name: "Racer", image: "", features: "Best first step\nMotion system with 3 axis of movement\nSingle large 57\" curved display\nSimucube direct drive for precision controls\nBeginner friendly \u2014 great for first-timers" },
    { name: "Pro", image: "", features: "Enhanced immersion\nAdvanced motion with \"traction-loss\" \u2014 feel the rear tires sliding mid-corner\nTriple 45\" curved displays for incredible immersion\nSimucube Pro direct drive with open-wheel style steering" },
    { name: "Ultimate", image: "", features: "Maximum realism\nThe only one in Texas\nMost advanced motion system available with 6 axis of movement\nSimucube Ultimate wheel and Simucube Active pedals\nMassive triple 55\" curved displays and custom canopy for maximum immersion" },
    { name: "2-Seater", image: "", features: "Race together\nThe only motion 2-seater system in America\nHuge triple 65\" OLED displays\nSimucube direct drive\nShare the experience with a passenger \u2014 swap drivers at any point during your session" }
  ]},
  carsAndTracks: { heading: "Cars and tracks worth coming back for", proTipTitle: "Pro tip", proTipBody: "If you are new, start with a GT4 or Skip Barber car on a Beginner track to get comfortable. From there, step up to GT3, open-wheel, or Intermediate and Expert tracks as your confidence grows." },
  faq: { heading: "Frequently asked questions", items: [
    { question: "I am new. Is this still for me?", answer: "Yes. You do not need prior sim-racing experience. Our staff helps you with controls, setup, and pacing so you can enjoy your first session confidently." },
    { question: "Will Pro or Ultimate be too much?", answer: "Not if we guide you in. Pro and Ultimate are more immersive, but the onboarding process stays beginner-friendly, and we tune setup based on your comfort." },
    { question: "How do I pick the right car and track?", answer: "Tell us your goals and comfort level. We will recommend a car class and circuit that gives the right mix of confidence, challenge, and fun." },
    { question: "Can I race with friends who have different skill levels?", answer: "Absolutely. We can format sessions for mixed groups so everyone feels included, from first-timers to experienced racers." },
    { question: "How do Quick Races and Double Races work?", answer: "Each race is divided into a Qualifying and Race period, with approximately 25 minutes of total drive time. If you\u2019re driving solo, you\u2019ll get 25-30 minutes of practice time. Any format can be raced solo or with friends, complete with headsets for comms." }
  ]},
  cta: { heading: "Ready to race?", subcopy: "Book your session and our team will help you choose the right simulator, car, and track when you arrive.", ctaText: "Book now", ctaLink: "/book-now/" },
  _seo: { title: "How It Works | Velocity Sim Racing Lounge", description: "Learn how Velocity sim racing works. Professional simulators, easy booking, and an unforgettable experience.", ogImage: "", ogTitle: "How It Works \u2014 Velocity", noIndex: false }
},

"book-now": {
  experiences: { heading: "Choose Your Experience" },
  mainExperiences: { cards: [
    { title: "Quick Race", price: "From {{price:quickRace}}", badge: "", image: "", bullets: "Perfect for first-time drivers\nApprox. 25 minute experience\nRace solo or with friends", bookingLink: "" },
    { title: "Double Race", price: "From {{price:doubleRace}}", badge: "Most Popular", image: "", bullets: "Drive more save more, great value\nApprox. 55 minute experience\nTwo races, double the fun", bookingLink: "" },
    { title: "610 Challenge", price: "From {{price:sixTen}}", badge: "", image: "", bullets: "A Velocity Exclusive\nRace a virtual Houston 610 Loop\nNearly 40 miles with AI traffic", bookingLink: "" },
    { title: "Leaderboard Challenge", price: "From {{price:leaderboard}}", badge: "", image: "", bullets: "Competitive time-attack mode\nMonthly prizes for Top 3 drivers\n30-minute qualifying session", bookingLink: "" }
  ]},
  twoSeater: { cards: [
    { title: "2-Seater Quick Race", price: "From {{price:twoSeaterQuick}}", image: "", bullets: "Share the experience and swap drivers at any time\nApprox. 25 minute experience\nThe only motion 2-seater in America", bookingLink: "" },
    { title: "2-Seater Double Race", price: "From {{price:twoSeaterDouble}}", image: "", bullets: "Save over 30%\nApprox. 55 minute experience\nDrive and race on famous tracks together", bookingLink: "" }
  ]},
  springBundles: { intro: "Limited time, 2 driver bundles offer unbeatable value. Eat & Race TOGETHER.", cards: [
    { title: "Quick Race", price: "From {{price:springQuick}}", image: "", bullets: "Eat & Race bundle for 2 drivers\nEach driver gets their own sim\n2 food tickets included\nApprox. 25 minute experience", bookingLink: "" },
    { title: "Double Race", price: "From {{price:springDouble}}", image: "", bullets: "Double the races, double the fun\nSave over 20% with this bundle\nChoose 2 different cars & tracks to race together\nIncludes 2 food tickets for entree of your choice", bookingLink: "" },
    { title: "Eat & Race, 1 Race (2-Seater)", price: "From {{price:springSprint}}", image: "", bullets: "Eat & Race bundle for 2\nApprox. 25 minute experience\nIncludes 2 food tickets for entree of your choice", bookingLink: "" },
    { title: "Eat & Race, 2 Races (2-Seater)", price: "From {{price:springEndurance}}", badge: "Best Value", image: "", bullets: "Double the drive time, approx. 55 minute experience\n2 food tickets\nChoose from a variety of driving options", bookingLink: "" }
  ]},
  features: { items: [
    { icon: "", label: "Recommended Height: 5\u2019 or Taller" },
    { icon: "", label: "Race Together With Friends" },
    { icon: "", label: "Famous Tracks & Cars" },
    { icon: "", label: "Headsets for Group Chat" }
  ]},
  membershipPromo: { eyebrow: "Members Club", heading: "Race More, Pay Less", description: "Monthly races, food & drink discounts, priority booking, members-only events, and exclusive perks \u2014 starting at just {{price:membership.racer}}/mo.", ctaText: "View Memberships", ctaLink: "/membership/", tierChips: [
    { name: "Racer", price: "{{price:membership.racer}}/mo" },
    { name: "Pro", price: "{{price:membership.pro}}/mo" },
    { name: "Ultimate", price: "{{price:membership.ultimate}}/mo" }
  ]},
  faq: { heading: "Frequently Asked", items: [
    { question: "Is sim racing beginner friendly?", answer: "Yes, Velocity\u2019s sim racing experience is all about fun for every skill level. Our Pit Crew team is trained to help you select a fun driving experience whether it is your first time or you\u2019re an experienced driver preparing for your next trackday \u2014 there\u2019s something for everyone at Velocity." },
    { question: "Is there an age requirement?", answer: "Velocity is a family friendly venue. However, we serve alcohol on premise and ask that parents please keep children under supervision at all times." },
    { question: "Is there a height requirement?", answer: "There is no age requirement to drive at Velocity, however, there is a minimum height recommendation of 5\u2019 or taller to comfortably operate the simulators. If you are close to 5\u2019 we recommend visiting in store before booking online." },
    { question: "Am I racing alone or with people?", answer: "If you come alone, you can drive solo and challenge the leaderboard. You also have the option to race AI. If you come as a group, you\u2019ll be racing with each other \u2014 complete with headsets so you can talk to one another." },
    { question: "How early do I need to arrive?", answer: "If you\u2019re planning to eat or drink before your race, we recommend arriving 30\u201345 minutes before your booking. You can also enjoy food and drinks after your driving session." },
    { question: "What type of cars are available?", answer: "We have a huge selection of cars spanning different driving series and classes from GT3 to IndyCar and much more. Learn more about available cars on our Cars page." },
    { question: "What type of tracks are available?", answer: "We have virtually every major track in the world including regional tracks from around America and Europe. There are nearly 100+ available tracks." },
    { question: "Do you serve food & drinks at Velocity?", answer: "Yes, we have great food & drinks including fresh made flatbreads and craft cocktails & mocktails." },
    { question: "Do you offer group discounts or promotions?", answer: "We offer students, service members, and teachers discounts (20% off) available in store only. We also have Eat & Race bundles for 2 drivers. We also offer event packages for large groups." }
  ]},
  _seo: { title: "Book Now | Velocity Sim Racing Lounge", description: "Book your sim racing session at Velocity. Quick races, double races, 2-seater experiences, and Eat & Race bundles.", ogImage: "", ogTitle: "Book Now \u2014 Velocity", noIndex: false }
},

"corporate-events": {
  hero: { heading: "Corporate Events at *Velocity*", subcopy: "From team building to product launches \u2014 Velocity delivers a high-adrenaline, fully custom event experience your team will never forget.", heroImage: "", ctaText: "Inquire Today", ctaLink: "" },
  venue: { heading: "Your Private Racetrack", subcopy: "Full venue buyout for a completely private experience. From planning to execution, our event staff handles every detail.", image: "", stats: [
    { number: "214", label: "Guests Indoors" },
    { number: "60", label: "Outdoor Patio" }
  ], bullets: "Custom branded racetracks and cars\nSpecialty cocktails and mocktails\nCurated food menus\nFully dedicated event team and manager" },
  perfectFor: { heading: "Perfect For", subcopy: "Whatever the occasion, Velocity creates an unforgettable experience.", items: [
    { label: "Corporate Celebrations" }, { label: "Holiday Parties" }, { label: "Product Launches" }, { label: "Team Building Events" }, { label: "Large Social Events" }
  ]},
  enhancements: { heading: "Unique Enhancements", subcopy: "Elevate your event with personalized touches only Velocity can deliver.", cards: [
    { title: "Custom Racetrack Branding", description: "Feature your company logo or message directly on the in-sim racetrack for a fully branded racing experience." },
    { title: "Custom Branded Trophies", description: "Celebrate your top performers with custom branded trophies and a full podium ceremony for an authentic racing finish." },
    { title: "Specialty Event Drinks", description: "Our in-house mixologists craft a custom specialty drink tailored to your event, from signature cocktails to branded mocktails." }
  ]},
  mobileSim: { heading: "We Bring Racing to You", subcopy: "Transport and set up a full motion racing simulator at your event, anywhere.", checklist: "Dedicated staff on-site to assist your guests\nLive leaderboard tracking the best lap times\nCustomization options including branding and messaging", image: "" },
  included: { heading: "What\u2019s Included", subcopy: "Every corporate event at Velocity comes with everything you need.", items: [
    { title: "Dedicated Racing Simulators" }, { title: "Reserved Area & Seating" }, { title: "Choice of Menu" }, { title: "Event Manager & Staff" }
  ]},
  cta: { heading: "Book Your Corporate Event", subcopy: "Ready to create an unforgettable experience? Our team is standing by to make it happen.", primaryText: "Inquire Today", primaryLink: "", secondaryText: "Back to All Events", secondaryLink: "/group-events/" },
  _seo: { title: "Corporate Events | Velocity Sim Racing Lounge", description: "Host your next corporate event at Velocity. Team building, client entertainment, product launches, and private venue buyouts.", ogImage: "", ogTitle: "Velocity Corporate Events", noIndex: false }
},

"parties-events": {
  hero: { heading: "Group *Events* at *Velocity*", tagline: "Houston\u2019s most exciting event space \u2014 drive together, dine together, & celebrate together.", heroVideo: "", heroImage: "", testimonialQuote: "Great for company events, especially if you have a competitive team! The staff is incredibly personable, the atmosphere is fun and easy to get everyone engaged and the food was really good.", testimonialAuthor: "Google Review", testimonialStars: "5" },
  eventTypes: { heading: "Choose Your *Experience*", subcopy: "From corporate groups to private celebrations \u2014 we have an event format for every occasion.", cards: [
    { title: "Corporate Events", description: "Team building, client entertaining, offsites, and holiday parties with dedicated coordinators and chef-driven catering.", meta: "Custom packages \u2022 A/V available", image: "", primaryText: "Inquire", primaryLink: "", secondaryText: "Learn more", secondaryLink: "/corporate-events/" },
    { title: "Semi-Private", description: "Dedicated space with racing, dining, and bar service. Perfect for team building, mixers, and celebrations.", meta: "10\u201340 guests", image: "", primaryText: "Inquire", primaryLink: "", secondaryText: "Learn more", secondaryLink: "/semi-private/" },
    { title: "Full Buyout", description: "The entire venue is yours \u2014 274 capacity with custom racetracks, specialty cocktails, and a dedicated event team.", meta: "Up to 274 guests", image: "", primaryText: "Inquire", primaryLink: "", secondaryText: "Learn more", secondaryLink: "" },
    { title: "Party Packs", description: "Birthdays, bachelor/bachelorette, and graduations. Dedicated simulators, reserved seating, and the full dinner-and-drinks experience.", meta: "Groups of 5\u201316", image: "", primaryText: "Book now", primaryLink: "/party-packs/", secondaryText: "Learn more", secondaryLink: "/party-packs/" }
  ]},
  includes: { heading: "Every Event *Includes*", items: [
    { label: "Dedicated Racing Simulators" }, { label: "Reserved Area & Seating" }, { label: "Choice of Menu" }, { label: "Event Manager & Staff" }
  ]},
  difference: { heading: "The *Velocity* Difference", subcopy: "More than racing \u2014 a full-service event experience your guests will talk about for years.", cards: [
    { title: "Fun for All Skill Levels", description: "No experience needed \u2014 first-timers and seasoned racers alike will have a blast. Our team guides every guest through the experience." },
    { title: "Chef-Crafted Menu", description: "Full restaurant and craft bar on-site. Choose from curated catering packages or let your guests order from our full menu." },
    { title: "Flexible Venue", description: "214 indoor capacity plus a 60-person patio. Accommodate groups from 5 to 200+ with modular layouts for any event format." },
    { title: "Unique Event Upgrades", description: "Custom branded racetracks, winner trophies, specialty cocktails & mocktails, and A/V for presentations. Make it truly yours." }
  ]},
  faq: { heading: "Frequently Asked Questions", items: [
    { question: "How much does an event cost?", answer: "Pricing varies by event type, group size, and package options. Visit the Corporate Events, Semi-Private, or Party Packs pages for details, or submit an inquiry and our events team will put together a custom quote." },
    { question: "Can I bring my own food or cake?", answer: "Outside food policies depend on the event type. Contact our events team to discuss options \u2014 we\u2019re happy to accommodate special requests like celebration cakes whenever possible." },
    { question: "Do you offer A/V equipment for presentations?", answer: "Yes! Our semi-private and corporate event packages include access to A/V solutions for workshops, presentations, and team meetings. Let our events team know your requirements and we\u2019ll set everything up." },
    { question: "Is there a minimum group size?", answer: "Party Packs start at just 5 guests, making them perfect for smaller celebrations. Semi-private events are ideal for groups of 10\u201340, and corporate buyouts can host up to 274 guests across our indoor and patio spaces." },
    { question: "Can you do off-site events?", answer: "Yes \u2014 we offer a mobile simulator experience. We transport and set up a full-motion racing simulator at your event with dedicated staff, a live leaderboard, and optional custom branding." }
  ]},
  cta: { heading: "Book Your Group Event Today", subcopy: "From corporate groups to families, dates, watch parties, and everything in between \u2014 Velocity is the group events destination where everyone can eat, drink, race, and create memories that last.", primaryText: "Book now", primaryLink: "/book-now/", secondaryText: "Inquire today", secondaryLink: "" },
  _seo: { title: "Group Events | Velocity Sim Racing Lounge", description: "Host your next group event at Velocity. Corporate events, semi-private, party packs, and full venue buyouts in Houston.", ogImage: "", ogTitle: "Velocity Group Events", noIndex: false }
},

"party-packs": {
  hero: { eyebrow: "Group Events", heading: "Party Packs", subcopy: "Big thrills for social celebrations. Dedicated simulators, reserved seating, and the full Velocity dinner-and-drinks experience \u2014 all in one unbeatable package.", heroVideo: "", heroImage: "", ctaText: "Book Your Party Pack" },
  overview: { heading: "Choose Your Party Pack", subcopy: "Select the pack that fits your group and book instantly.", bullets: "", image: "", ctaText: "", ctaLink: "" },
  packs: [
    { title: "Racer Pack", price: "from {{price:partyPack.racer}}", image: "", bullets: "Great for groups of 5-10 drivers\n5 racer rigs for 2 hours of racing\n2 x Triple Crown Platters\nReserved Seating\nDedicated Pit Crew\nUpgrades available", bookingLink: "", ctaText: "Book Now" },
    { title: "Pro Pack", price: "from {{price:partyPack.pro}}", image: "", bullets: "Take it to the next level with 6 Pro rigs, for groups of 6-18\n2 hours of racing\n3 x Triple Crown Platters\nReserved Seating\nDedicated Pit Crew\nUpgrades available", bookingLink: "", ctaText: "Book Now" }
  ],
  included: { heading: "What\u2019s Included", cards: [
    { title: "Dedicated Racing Simulators", description: "Professional-grade simulators reserved exclusively for your group throughout the event." },
    { title: "Reserved Area & Seating", description: "Your own section of the lounge \u2014 a private space to gather, eat, and celebrate between races." },
    { title: "Choice of Menu", description: "Every Party Pack includes our best selling Triple Crown Platter to get the party started the right way!" },
    { title: "Event Manager & Staff", description: "A dedicated event coordinator and support team to handle every detail from start to finish." }
  ]},
  perfectFor: { heading: "Perfect For", subcopy: "Party Packs are designed for groups ready to celebrate. Whatever the occasion, Velocity makes it unforgettable.", occasions: [
    { title: "Birthday Parties", description: "Make it a birthday to remember. Race your friends, then celebrate with food and drinks at the lounge." },
    { title: "Bachelor & Bachelorette", description: "An adrenaline-fueled celebration before the big day. Compete, laugh, and make memories on the track." },
    { title: "Graduation Celebrations", description: "They earned it \u2014 now celebrate it. Graduation parties at Velocity are anything but ordinary." },
    { title: "Coming-of-Age Milestones", description: "Mark the milestone in style. A premium, high-energy venue for teens and young adults ready to celebrate." },
    { title: "Any Special Occasion", description: "Anniversaries, promotions, or just because \u2014 any milestone is worth celebrating at full throttle." }
  ]},
  cta: { heading: "Planning Something Bigger?", subcopy: "If you\u2019re planning an even larger celebration with 20+ guests, check out our Semi-Private and Full Buyout options.", primaryText: "View Group Events", primaryLink: "/group-events/", secondaryText: "", secondaryLink: "" },
  _seo: { title: "Party Packs | Velocity Sim Racing Lounge", description: "All-inclusive party packages with racing, food, and reserved seating. Racer Pack from $499, Pro Pack from $725.", ogImage: "", ogTitle: "Velocity Party Packs", noIndex: false }
},

"semi-private": {
  hero: { heading: "Semi-Private *Group Events*", subcopy: "Host a fun and memorable event at Velocity. Dedicated space, premium experience, and nonstop energy \u2014 perfect for groups who want more than the ordinary.", heroImage: "", ctaText: "Inquire Today", ctaLink: "" },
  features: { heading: "What You Get", bullets: "Dedicated simulators for your group\nReserved lounge area\nCurated food and drink options from our craft bar and kitchen\nComprehensive audio and video solutions for workshops and group presentations\nIdeal for groups of 10\u201340", image: "" },
  useCases: { heading: "Perfect For", subcopy: "Whatever the occasion, we\u2019ll make it unforgettable.", items: [
    { title: "Corporate Team Building" }, { title: "Holiday Celebrations" }, { title: "Workshops & Sales Meetings" }, { title: "Networking Mixers" }
  ]},
  gallery: { images: [
    { image: "", alt: "Racer in a professional sim racing rig at Velocity" },
    { image: "", alt: "Lively event atmosphere at Velocity Sim Racing Lounge" },
    { image: "", alt: "Velocity Sim Racing Lounge venue interior" }
  ]},
  included: { heading: "What\u2019s Included", subcopy: "Everything your group needs for an incredible experience.", cards: [
    { title: "Dedicated Racing Simulators", image: "" },
    { title: "Reserved Area & Seating", image: "" },
    { title: "Choice of Menu", image: "" },
    { title: "Event Manager & Staff", image: "" }
  ]},
  cta: { heading: "Book Your Semi-Private Event", subcopy: "Ready to host something extraordinary? Get in touch and let us plan the perfect event for your group.", primaryText: "Inquire Today", primaryLink: "", secondaryText: "Back to All Events", secondaryLink: "/group-events/" },
  _seo: { title: "Semi-Private Events | Velocity Sim Racing Lounge", description: "Reserve dedicated space at Velocity for groups of 10-40. Racing, dining, bar service, and full event support.", ogImage: "", ogTitle: "Velocity Semi-Private Events", noIndex: false }
},

"fathers-day": {
  hero: { eyebrowWeek: "Father's Day week", eyebrowDates: "June 15–21, 2026", heading: "Father's Day<br>*Eat & Race Bundles*", heroVideo: "https://vimeo.com/1194083193", heroImage: "" },
  twoDriver: { heading: "Father's Day *Bundles*", subcopy: "Eat & Race at Velocity • Father's Day week (June 15–21, 2026)", packages: [
    { title: "Eat & Race, Racer Bundle", price: "From $225", image: "", bullets: "Families that race together, stay together! Share the fun of sim racing with dad this Father\u2019s Day.\n4 Racer rigs for a family of 4\nApprox. 55 minutes of racing for the whole family\n1 x Triple Crown Platter (cheesy sliders, chicken taquitos, and chips & queso)\nReserved seating\nUpgrades available", bookingLink: "https://book.velocitysimlounge.com/book/racer-party-pack-4-rigs/27?selectedMonth=6#", ctaText: "Select bundle" },
    { title: "Eat & Race, Pro Bundle", price: "From $255", image: "", bullets: "Take it up a notch with our PRO rig bundle - more advanced and immersive motion rigs.\n4 Pro rigs for a family of 4\nApprox. 55 minutes of racing for the whole family\n1 x Triple Crown Platter (cheesy sliders, chicken taquitos, and chips & queso)\nReserved seating\nUpgrades available", bookingLink: "https://book.velocitysimlounge.com/book/racer-party-pack-4-rigs/28?selectedMonth=6#", ctaText: "Select bundle" }
  ]},
  _seo: { title: "Eat & Race Bundles | Velocity Sim Racing Lounge", description: "Father\u2019s Day week Eat & Race bundles at Velocity. June 15\u201321, 2026.", ogImage: "", ogTitle: "Velocity Eat & Race Bundles", noIndex: false }
},

contact: {
  hero: { heading: "Houston", subcopy: "Houston\u2019s premier sim racing lounge, bar & event venue. 16 professional-grade simulators, full bar & restaurant, and 5,000 sqft of private event space." },
  locations: { items: [
    {
      name: "Velocity Houston",
      address: "2110 Edwards St\nHouston, TX 77007",
      phone: "832-627-4981",
      email: "info@velocitysimlounge.com",
      hours: "Mon \u2014 2PM \u2013 11PM\nTue \u2014 Private events only\nWed\u2013Thu \u2014 2PM \u2013 11PM\nFri \u2014 12PM \u2013 12AM\nSat \u2014 11AM \u2013 12AM\nSun \u2014 11AM \u2013 10PM",
      mapEmbed: ""
    },
    {
      name: "Velocity Dallas",
      address: "",
      phone: "",
      email: "",
      hours: "Coming Summer 2026",
      mapEmbed: ""
    }
  ]},
  features: [
    "16 Professional Simulators", "4K Displays & Screens", "Full Bar & Restaurant",
    "Free Wi-Fi", "Private Event Spaces", "5,000 sqft Venue",
    "70-Foot Covered Patio", "On-Site Parking", "214-Person Capacity"
  ],
  about: {
    heading: "About Velocity Houston",
    body: "Welcome to Velocity Sim Racing Lounge in Houston \u2014 the city\u2019s premier destination for high-performance sim racing, world-class dining, and unforgettable events. Whether you\u2019re a seasoned racer looking to sharpen your skills or a first-timer ready for the thrill of the track, our 16 professional-grade simulators deliver an experience unlike anything else in Texas. Grab a drink from our full bar, fuel up with chef-crafted shareables, and compete with friends on iconic circuits from around the world. With nearly 5,000 square feet of event space, a 70-foot patio, and dedicated event coordinators, Velocity is where racing meets hospitality.",
    ctaText: "Book Your Session"
  },
  dallas: {
    badge: "Coming Summer 2026",
    heading: "We\u2019re Coming to Dallas",
    body: "Velocity Sim Racing Lounge is expanding. Be the first to know when we open our doors \u2014 follow us on social media or reach out for more details."
  },
  faq: { heading: "Frequently Asked Questions", subcopy: "Everything you need to know before your visit.", items: [
    { question: "Is there a minimum age to race?", answer: "No, but there is a minimum height requirement of 5\u20190\u201d. Drivers must be able to reach the pedals to operate the simulators. Additionally, drivers under the age of 17 must have a guardian/parent sign a waiver." },
    { question: "Do I need a drivers license to race?", answer: "No license or experience is required to drive Velocity\u2019s simulators." },
    { question: "Can I just watch other people race?", answer: "Absolutely! Come in and enjoy some great food and drinks while taking in all the racing action. We also have watch parties for racing and other sporting events." },
    { question: "What should I wear?", answer: "We encourage you to wear comfortable clothing so that you can operate the pedals and steering wheels. While it is possible to drive with heels, flat or athletic shoes will be easier to use." },
    { question: "Do you play live watch parties?", answer: "Yes, we do our best to show live watch parties for famous races and sporting events from around the world." },
    { question: "How much does it cost to drive a simulator?", answer: "Prices can vary based on the type of simulator and experience that you choose. Check out our Book Now page for more information." },
    { question: "Do you have food and drinks?", answer: "Yes, Velocity has a full bar and kitchen. We are proud to feature signature cocktails and delicious fresh made food. Check out our Menu for more information." },
    { question: "Can I rent out the space?", answer: "Yes, Velocity is available for private events. We have nearly 5,000sqft of space with a 214 occupancy rating (inside) and a large 70\u2019 patio for more guests. We offer food and drinks and can provide an all inclusive package. For more information, please reach out to events@velocitysimlounge.com." }
  ]},
  cta: { heading: "Ready to Race?", primaryText: "Book Now", primaryLink: "/book-now/", secondaryText: "Plan an Event", secondaryLink: "/group-events/" },
  _seo: { title: "Contact | Velocity Sim Racing Lounge Houston", description: "Visit Velocity Sim Racing Lounge at 2110 Edwards St, Houston TX 77007. 16 simulators, full bar & restaurant, 5,000 sqft event space.", ogImage: "", ogTitle: "Velocity Houston", noIndex: false }
},

"food-drink": {
  hero: { heading: "Our Menu", subcopy: "Take a Break, Grab a Bite \u2014 Whether you\u2019re celebrating a victory or just in need of a quick pit stop, our in-house bar and restaurant has everything you need. Fuel up, grab some drinks, then grid up!", backgroundImage: { _perLocation: true, houston: "", dallas: "", _default: "" } },
  categories: { items: [
    { name: "Entrees", description: "Main courses", menuItems: [
      { name: "Chicken Diavolo Taquitos", description: "Spicy baked chicken taquitos filled with shredded chicken, cream cheese, sour cream, cheddar jack, with a chipotle sauce.", price: "$12", image: "" },
      { name: "Beef Taquitos", description: "Ground beef taquitos smothered in queso and sour cream.", price: "$12", image: "" },
      { name: "Cheesy Sliders", description: "Beef sliders with caramelized onions, dill relish, and cheese.", price: "$14", image: "" },
      { name: "Bacon Cheeseburger", description: "Beef burger with caramelized onions and cheese. Add chips +$2.", price: "$10", image: "" },
      { name: "Wagyu Sliders", description: "Wagyu sliders with caramelized onions, garlic mustard aioli, and cheese, with a side of fries.", price: "$18", image: "" },
      { name: "Margherita Flatbread", description: "Tomatoes, fresh mozzarella, and fresh basil flatbread.", price: "$15", image: "" },
      { name: "BBQ Cheese Flatbread", description: "Gochujang BBQ sauce, mozzarella, cheddar, and sliced red onions.", price: "$15", image: "" },
      { name: "Tsukune Meatballs", description: "Japanese-style teriyaki chicken meatballs on creamy, mashed garlic sweet potatoes.", price: "$15", image: "" },
      { name: "Pork Belly Lettuce Wraps", description: "Pineapple marinated pork belly, pickled carrots, bean sprouts, lettuce, with gochujang sauce.", price: "$16", image: "" }
    ]},
    { name: "Appetizers", description: "Starters and shareable plates", menuItems: [
      { name: "Triple Crown Platter", description: "Chips & queso, chicken diavolo taquitos, and cheesy sliders.", price: "$18", image: "" },
      { name: "Charcuterie Board", description: "Brie, cheddar, goat cheese, soppressata, salami, cranberries, almonds, olives, fig jam, crackers.", price: "$22", image: "" },
      { name: "Salmon Dip", description: "Smoked salmon, onions, dill, scallions, capers, lemon juice, kettle-cooked chips.", price: "$12", image: "" }
    ]},
    { name: "Signature Cocktails", description: "Craft cocktails", menuItems: [
      { name: "Suzuka Old Fashioned", description: "Suntory whiskey, simple, bitters, orange, cherry.", price: "", image: "" },
      { name: "Rain Master Caipirinha", description: "Cacha\u00e7a, lime, orange, mint.", price: "", image: "" },
      { name: "Cafe Racer Carajillo", description: "Cold brew, liqueur 43, topped with cinnamon.", price: "", image: "" },
      { name: "Le Mans 75", description: "Gin, prosecco, elderflower, chambord, lemon.", price: "", image: "" },
      { name: "Pace Car", description: "Remy Martin VSOP, cointreau, lemon, orange.", price: "", image: "" },
      { name: "The Green Hell", description: "Absinthe, elderflower, melon liqueur, lime, pineapple, midori with a digestif chaser.", price: "", image: "" }
    ]},
    { name: "Classics", description: "Classic cocktails", menuItems: [
      { name: "Margarita", description: "Blanco tequila, lime, agave.", price: "", image: "" },
      { name: "Pimm\u2019s Cup", description: "Pimm\u2019s #1, gin, lemon, cucumber, ginger ale.", price: "", image: "" },
      { name: "Irish Mule", description: "Irish whiskey, lime, ginger beer.", price: "", image: "" },
      { name: "Ranch Water", description: "Tequila, cointreau, lime, topo chico.", price: "", image: "" }
    ]},
    { name: "Zero Proof", description: "Non-alcoholic drinks", menuItems: [
      { name: "Agua de Jamaica", description: "Hibiscus, lime, sugar, water.", price: "", image: "" },
      { name: "The Quattro", description: "Lemon, mint & white peach syrup, topo chico.", price: "", image: "" },
      { name: "Virgin Mojito", description: "Lime, mint, sugar, soda.", price: "", image: "" },
      { name: "Specialty Lemonades", description: "Spicy ginger, mint lavender, strawberry.", price: "", image: "" }
    ]}
  ]},
  _seo: { title: "Menu | Velocity Sim Racing Lounge", description: "Explore Velocity\u2019s full food and drink menu. Wagyu sliders, craft cocktails, flatbreads, and more.", ogImage: "", ogTitle: "Velocity Menu", noIndex: false }
},

"menu-2025": {
  hero: { heading: "Our Menu", subcopy: "Take a Break, Grab a Bite \u2014 Whether you\u2019re celebrating a victory or just in need of a quick pit stop, our in-house bar and restaurant has everything you need.", backgroundImage: { _perLocation: true, houston: "", dallas: "", _default: "" } },
  categories: { items: [
    { name: "Entrees", description: "Main courses", menuItems: "" },
    { name: "Appetizers", description: "Starters", menuItems: "" },
    { name: "Signature Cocktails", description: "Craft cocktails", menuItems: "" },
    { name: "Classics", description: "Classic cocktails", menuItems: "" },
    { name: "Zero Proof", description: "Non-alcoholic", menuItems: "" },
    { name: "Beer + Wine", description: "Domestic, import, draft, wine", menuItems: "" },
    { name: "Flights", description: "Whiskey and cocktail flights", menuItems: "" }
  ]},
  _seo: { title: "2025 Menu | Velocity Sim Racing Lounge", description: "Velocity\u2019s 2025 menu featuring entrees, craft cocktails, beer & wine, and whiskey flights.", ogImage: "", ogTitle: "Velocity 2025 Menu", noIndex: false }
}

};
