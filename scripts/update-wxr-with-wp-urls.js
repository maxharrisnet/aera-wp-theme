#!/usr/bin/env node
/**
 * Update WXR File with WordPress URLs
 *
 * Replaces Contentful CDN URLs in WXR file with WordPress media library URLs
 * using the mapping file created by upload-blog-images-to-wp.php
 */

const fs = require('fs');
const path = require('path');

const WXR_FILE = path.resolve(__dirname, '../_ORIGINAL_FILES/blogs-wxr.xml');
const MAPPING_FILE = path.resolve(__dirname, '../_ORIGINAL_FILES/image-url-mapping.json');
const OUTPUT_FILE = path.resolve(__dirname, '../_ORIGINAL_FILES/blogs-wxr-wordpress-urls.xml');

if (!fs.existsSync(MAPPING_FILE)) {
	console.error('❌ Mapping file not found:', MAPPING_FILE);
	console.error('Please run: wp eval-file scripts/upload-blog-images-to-wp.php');
	process.exit(1);
}

if (!fs.existsSync(WXR_FILE)) {
	console.error('❌ WXR file not found:', WXR_FILE);
	console.error('Please run: node scripts/contentful-blogs-to-wxr.js');
	process.exit(1);
}

const mapping = JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf8'));
const wxr = fs.readFileSync(WXR_FILE, 'utf8');

// Create reverse mapping: CDN URL -> WordPress URL
const urlMapping = {};
Object.entries(mapping).forEach(([filename, data]) => {
	// Find all CDN URLs in WXR that match this filename
	const cdnUrlRegex = new RegExp(`https://images\\.ctfassets\\.net/[^"<]*/${filename.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g');
	const matches = wxr.match(cdnUrlRegex);
	if (matches) {
		matches.forEach(cdnUrl => {
			urlMapping[cdnUrl] = data.url;
		});
	}
});

console.log(`Found ${Object.keys(urlMapping).length} URL mappings`);

// Replace CDN URLs with WordPress URLs
let updatedWxr = wxr;
let replacements = 0;

Object.entries(urlMapping).forEach(([cdnUrl, wpUrl]) => {
	const regex = new RegExp(cdnUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
	const count = (updatedWxr.match(regex) || []).length;
	if (count > 0) {
		updatedWxr = updatedWxr.replace(regex, wpUrl);
		replacements += count;
		console.log(`  Replaced ${count} occurrence(s) of: ${cdnUrl.split('/').pop()}`);
	}
});

fs.writeFileSync(OUTPUT_FILE, updatedWxr);

console.log(`\n✅ WXR updated!`);
console.log(`📁 Original: ${WXR_FILE}`);
console.log(`📁 Updated: ${OUTPUT_FILE}`);
console.log(`📊 Total replacements: ${replacements}`);
console.log(`\nNext step: Import ${OUTPUT_FILE} into WordPress`);
