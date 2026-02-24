#!/usr/bin/env node
/**
 * Extracts <Redirect path="..." to="..." /> from the React index.js and outputs
 * a Yoast SEO Premium–compatible CSV (Origin, Target, Type, Format).
 *
 * Yoast requirements: 4 columns, UTF-8, Unix line endings (LF), comma separator.
 * Run: node generate-yoast-redirects.js > yoast-redirects-import.csv
 * Or: node generate-yoast-redirects.js (writes to yoast-redirects-import.csv in same dir)
 */

const fs = require('fs');
const path = require('path');

const INDEX_PATH = path.join(__dirname, 'index.js');
const OUT_PATH = path.join(__dirname, 'yoast-redirects-import.csv');

let content = fs.readFileSync(INDEX_PATH, 'utf8');

// Remove block comments so we don't pick up commented-out Redirects
content = content.replace(/\/\*[\s\S]*?\*\//g, '');

// Match <Redirect ... path='...' ... to='...' ... /> or path="/..." to="/..."
// Handles path and to in any order; path/to values can be single or double quoted
const redirectRe = /<Redirect[^>]*?\bpath=(['"])([^'"]+)\1[^>]*?\bto=(['"])([^'"]*)\3[^>]*\/>/g;

const seen = new Set();
const rows = [];

let m;
while ((m = redirectRe.exec(content)) !== null) {
  let origin = m[2].trim();
  let target = m[4].trim();
  if (!origin.startsWith('/')) origin = '/' + origin;
  // Old React had /skills -> /cognitive-skills (commented); on current WP use /skills/
  if (origin === '/skills' && target === '/cognitive-skills') target = '/skills/';
  const key = origin;
  if (seen.has(key)) continue;
  seen.add(key);
  rows.push({ origin, target, type: 301, format: 'plain' });
}

// Skills redirects: old React paths → current WordPress (same path; add trailing slash for consistency)
// WP uses skill_function taxonomy: /skills/, /skills/order/, /skills/inventory/, etc.
const skillsRedirects = [
  { origin: '/skills', target: '/skills/' },
  { origin: '/skills/order', target: '/skills/order/' },
  { origin: '/skills/inventory', target: '/skills/inventory/' },
  { origin: '/skills/logistics', target: '/skills/logistics/' },
  { origin: '/skills/procurement', target: '/skills/procurement/' },
  { origin: '/skills/controltower', target: '/skills/controltower/' },
];

for (const { origin, target } of skillsRedirects) {
  if (!seen.has(origin)) {
    seen.add(origin);
    rows.push({ origin, target, type: 301, format: 'plain' });
  }
}

// Yoast format: "Origin","Target","Type","Format" — quoted to avoid comma in URLs breaking parsing
const header = '"Origin","Target","Type","Format"';
const lines = [header, ...rows.map((r) => `"${r.origin}","${r.target}",${r.type},"${r.format}"`)];

const csv = lines.join('\n') + '\n';
fs.writeFileSync(OUT_PATH, csv, { encoding: 'utf8' });
console.error(`Wrote ${rows.length} redirects to ${OUT_PATH}`);
console.log(csv);
