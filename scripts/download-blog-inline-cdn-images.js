#!/usr/bin/env node
/**
 * Download inline CDN images (for use after fix-blog-inline-cdn-images.php --list-missing).
 *
 * Usage:
 *   1. Get list of missing CDN URLs:
 *      wp eval-file .../fix-blog-inline-cdn-images.php list_missing > cdn-urls.txt
 *   2. Download them (filename = last segment of URL):
 *      node scripts/download-blog-inline-cdn-images.js cdn-urls.txt
 *
 * Saves to _ORIGINAL_FILES/blog-inline-images/ by default. Then run:
 *   3. wp eval-file scripts/upload-blog-inline-images-to-wp.php
 *   (or run fix-blog-inline-cdn-images.php again with no_download so it uses existing attachments)
 *
 * Or run fix-blog-inline-cdn-images.php without no_download and it will download and replace in one go.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

const DEFAULT_OUT = path.resolve(__dirname, '../_ORIGINAL_FILES/blog-inline-images');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function filenameFromUrl(url) {
  try {
    const p = new URL(url).pathname;
    const parts = p.split('/').filter(Boolean);
    let name = parts[parts.length - 1] || 'image.jpg';
    name = name.split('?')[0];
    if (!name.includes('.')) name += '.jpg';
    return name.replace(/[^a-zA-Z0-9._-]/g, '_');
  } catch {
    return 'image.jpg';
  }
}

function download(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = filenameFromUrl(url);
    protocol.get(url, { headers: { 'User-Agent': 'Aera-Blog-Inline-Image-Download' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        reject(new Error(`${res.statusCode}`));
        return;
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function main() {
  const listPath = process.argv[2];
  const outDir = process.argv[3] || DEFAULT_OUT;

  if (!listPath || !fs.existsSync(listPath)) {
    console.error('Usage: node download-blog-inline-cdn-images.js <cdn-urls.txt> [output-dir]');
    console.error('  cdn-urls.txt: one CDN URL per line (e.g. from wp eval-file ... -- --list-missing > cdn-urls.txt)');
    process.exit(1);
  }

  const lines = fs.readFileSync(listPath, 'utf8').split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const cdnPrefix = 'https://images.ctfassets.net/';
  const urls = lines.filter((l) => l.startsWith(cdnPrefix) || l.startsWith('http'));

  ensureDir(outDir);
  console.error(`Downloading ${urls.length} images to ${outDir}`);

  let ok = 0;
  let fail = 0;
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const file = filenameFromUrl(url);
    const outPath = path.join(outDir, file);
    if (fs.existsSync(outPath)) {
      console.error(`[${i + 1}/${urls.length}] Skip (exists): ${file}`);
      ok++;
      continue;
    }
    try {
      const buf = await download(url);
      fs.writeFileSync(outPath, buf);
      console.error(`[${i + 1}/${urls.length}] OK: ${file}`);
      ok++;
    } catch (e) {
      console.error(`[${i + 1}/${urls.length}] FAIL: ${file} - ${e.message}`);
      fail++;
    }
    await new Promise((r) => setTimeout(r, 80));
  }

  console.error(`Done: ${ok} ok, ${fail} failed`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
