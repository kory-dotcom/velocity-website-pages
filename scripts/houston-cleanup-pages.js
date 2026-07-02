#!/usr/bin/env node
/** Remove legacy ?loc=dallas client toggles from Houston page modules. */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const files = [
  'About : How it Works Page_files/velocity-about-how-it-works-elementor.html',
  'Membership Page/velocity-membership-elementor.html',
  'Ignition/velocity-ignition-elementor.html',
  'Summer Special/velocity-summer-special-elementor.html',
  'Bundles Page/velocity-fathers-day-elementor.html',
  'Buyout/velocity-buyout-elementor.html',
  'Parties & Events/velocity-party-pack-elementor.html',
  'Semi-Private/velocity-semi-private-elementor.html',
  'Promotions/velocity-promotions-elementor.html',
  'Corporate Events/velocity-corporate-events-elementor.html'
];

for (const rel of files) {
  const fp = path.join(ROOT, rel);
  let html = fs.readFileSync(fp, 'utf8');
  html = html.replace(/\n\s*if \(window\.VSL_LOCATION\) VSL_LOCATION\.setupHoustonOnlyPage\([\s\S]*?\);\s*/g, '\n');
  html = html.replace(/\n\s*if \(window\.VSL_LOCATION\) \{\s*VSL_LOCATION\.setupHoustonOnlyPage\([\s\S]*?\);\s*\}\s*/g, '\n');
  fs.writeFileSync(fp, html);
  console.log('Cleaned', rel);
}

console.log('Houston-only page cleanup done.');
