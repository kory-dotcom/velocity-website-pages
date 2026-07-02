#!/usr/bin/env node
/**
 * Generate Dallas/ HTML modules from Houston sources.
 * Run: node scripts/build-dallas-modules.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TRIPLESEAT_DALLAS =
  'https://velocitysimracinglounge.tripleseat.com/dynamic_party_request/3383?hide_banner=1';

const PAGES = [
  { src: 'Home/velocity-home-elementor.html', dest: 'Dallas/Home/velocity-home-elementor.html' },
  { src: 'Party Packs/velocity-party-packs-elementor.html', dest: 'Dallas/Party Packs/velocity-party-packs-elementor.html' },
  { src: 'Book Now/velocity-book-now-elementor.html', dest: 'Dallas/Book Now/velocity-book-now-elementor.html', special: 'book-now' },
  { src: 'Contact/velocity-contact-elementor.html', dest: 'Dallas/Contact/velocity-contact-elementor.html', special: 'contact' },
  { src: 'Parties & Events/velocity-parties-events-elementor.html', dest: 'Dallas/Parties & Events/velocity-parties-events-elementor.html' },
  { src: 'Corporate Events/velocity-corporate-events-elementor.html', dest: 'Dallas/Corporate Events/velocity-corporate-events-elementor.html' },
  { src: 'Food & Drink/velocity-food-drink-elementor.html', dest: 'Dallas/Food & Drink/velocity-food-drink-elementor.html' },
  { src: 'Semi-Private/velocity-semi-private-elementor.html', dest: 'Dallas/Semi-Private/velocity-semi-private-elementor.html' },
  { src: 'Promotions/velocity-promotions-elementor.html', dest: 'Dallas/Promotions/velocity-promotions-elementor.html' },
  { src: 'Buyout/velocity-buyout-elementor.html', dest: 'Dallas/Buyout/velocity-buyout-elementor.html' }
];

const DALLAS_SLUGS = [
  'party-packs', 'book-now', 'contact', 'group-events', 'corporate-events',
  'food-and-drink', 'semi-private', 'promotions', 'buyout'
];

const HOUSTON_TRIPLESEAT = [
  /https:\/\/velocitysimracinglounge\.tripleseat\.com\/party_request\/49933/g,
  /https:\/\/velocitysimracinglounge\.tripleseat\.com\/party_request\/45152/g,
  /https:\/\/velocitysimracinglounge\.tripleseat\.com\/party_request\/45556/g,
  /https:\/\/velocitysimracinglounge\.tripleseat\.com\/party_request\/45723/g
];

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function rewriteInternalLinks(html) {
  let out = html;
  out = out.replace(/\?loc=(houston|dallas)/gi, '');
  out = out.replace(/https:\/\/velocitysimlounge\.com\/dallas(?!\/)/g, 'https://velocitysimlounge.com/dallas/');

  for (const slug of DALLAS_SLUGS) {
    const re = new RegExp(`https://velocitysimlounge\\.com/${slug}/`, 'g');
    out = out.replace(re, `https://velocitysimlounge.com/dallas/${slug}/`);
  }
  out = out.replace(/https:\/\/velocitysimlounge\.com\/"(?!dallas)/g, 'https://velocitysimlounge.com/dallas/"');
  out = out.replace(/https:\/\/velocitysimlounge\.com\/'/g, "https://velocitysimlounge.com/dallas/'");
  return out;
}

function baseTransform(html) {
  let out = html;
  out = out.replace(/book\.velocitysimlounge\.com/g, 'book-dtx.velocitysimlounge.com');
  for (const re of HOUSTON_TRIPLESEAT) {
    out = out.replace(re, TRIPLESEAT_DALLAS);
  }
  out = rewriteInternalLinks(out);
  out = out.replace(/VSL_LOCATION\.setupHoustonOnlyPage\([^)]*\);?\s*/g, '');
  out = out.replace(/setupHoustonOnlyPage\([^)]*\);?\s*/g, '');
  return out;
}

function transformBookNow(html) {
  let out = baseTransform(html);
  const linksDallasMatch = out.match(/"linksDallas"\s*:\s*\{[\s\S]*?\n  \}/);
  if (linksDallasMatch) {
    const linksDallasBlock = linksDallasMatch[0].replace('"linksDallas"', '"links"');
    out = out.replace(/"links"\s*:\s*\{[\s\S]*?\n  \},\s*"linksDallas"\s*:\s*\{[\s\S]*?\n  \}/, linksDallasBlock + ',\n  "bookNow": "https://velocitysimlounge.com/dallas/book-now/"');
  }
  out = out.replace(/data-bn-loc-city>Houston/g, 'data-bn-loc-city>Dallas');
  out = out.replace(/function applyLocationLinks[\s\S]*?bindLocationSync\(applyLocationLinks\);?\s*/g, '');
  out = out.replace(/applyLocationLinks\(readLocation\(\)\);?\s*/g, '');
  out = out.replace(/vsl-bn-card--soon/g, 'vsl-bn-card--soon');
  return out;
}

function transformContact(html) {
  let out = baseTransform(html);
  out = out.replace(/applyLocation\(readLocation\(\)\);?\s*bindLocationSync\(applyLocation\);?\s*/g, 'applyLocation("dallas");');
  out = out.replace(/bookNow: 'https:\/\/velocitysimlounge\.com\/dallas\/book-now\/'/g, "bookNow: 'https://velocitysimlounge.com/dallas/book-now/'");
  out = out.replace(/planEvent: 'https:\/\/velocitysimlounge\.com\/dallas\/'/g, `planEvent: '${TRIPLESEAT_DALLAS}'`);
  return out;
}

function transformHome(html) {
  let out = baseTransform(html);
  out = out.replace(/VSL_HOME_LOCATIONS[\s\S]*?function applyHomeLocation[\s\S]*?bindLocationSync\(applyHomeLocation\);?\s*/g, '');
  out = out.replace(/book:\s*'https:\/\/velocitysimlounge\.com\/dallas\/book-now\/'/g, "book: 'https://velocitysimlounge.com/dallas/book-now/'");
  out = out.replace(/https:\/\/velocitysimlounge\.com\/book-now\/?/g, 'https://velocitysimlounge.com/dallas/book-now/');
  return out;
}

function transformPartyPacks(html) {
  let out = baseTransform(html);
  out = out.replace(/function vslPPApplyLocation[\s\S]*?vslPPApplyLocation\(vslPPReadLocation\(\)\);[\s\S]*?}\s*}\s*\n/g, '');
  out = out.replace(/vslPPIsRoverdBookingUrl[\s\S]*?return u\.hostname === 'book\.velocitysimlounge\.com';/,
    "vslPPIsRoverdBookingUrl(href) {\n    if (!href || href.charAt(0) === '#') return false;\n    try {\n      var u = new URL(href, window.location.href);\n      return u.hostname === 'book.velocitysimlounge.com' || u.hostname === 'book-dtx.velocitysimlounge.com';");
  out = out.replace(/class="vsl-partypack"/, 'class="vsl-partypack vsl-partypack--dallas"');
  return out;
}

function transformPromotions(html) {
  let out = baseTransform(html);
  out = out.replace(/springBundles[^,]*fathers-day[^"]*"/g, 'springBundles":"https://velocitysimlounge.com/dallas/promotions/"');
  out = out.replace(/View bundles/g, 'View promotions');
  return out;
}

for (const page of PAGES) {
  const srcPath = path.join(ROOT, page.src);
  const destPath = path.join(ROOT, page.dest);
  let html = fs.readFileSync(srcPath, 'utf8');

  switch (page.special) {
    case 'book-now':
      html = transformBookNow(html);
      break;
    case 'contact':
      html = transformContact(html);
      break;
    default:
      html = baseTransform(html);
      if (page.src.startsWith('Home/')) html = transformHome(html);
      if (page.src.startsWith('Party Packs/')) html = transformPartyPacks(html);
      if (page.src.startsWith('Promotions/')) html = transformPromotions(html);
  }

  ensureDir(destPath);
  fs.writeFileSync(destPath, html, 'utf8');
  console.log('Wrote', page.dest);
}

console.log('Done.');
