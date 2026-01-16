#!/usr/bin/env node
/**
 * Download Blog Images Script
 *
 * Downloads all images referenced in the blog WXR file:
 * - Featured images (from ogImageUrl or image field)
 * - Card images (from Community Card)
 * - Author photos
 *
 * Saves images to _ORIGINAL_FILES/blog-images/ without duplicates
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

const WXR_FILE = path.resolve(__dirname, '../_ORIGINAL_FILES/blogs-wxr.xml');
const OUTPUT_DIR = path.resolve(__dirname, '../_ORIGINAL_FILES/blog-images');
const AUTHOR_IMAGES_DIR = path.resolve(__dirname, '../_ORIGINAL_FILES/blog-author-images');

function ensureDir(dir) {
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}
}

function downloadFile(url, outputPath) {
	return new Promise((resolve, reject) => {
		const parsedUrl = new URL(url);
		const protocol = parsedUrl.protocol === 'https:' ? https : http;

		const file = fs.createWriteStream(outputPath);

		protocol.get(url, (response) => {
			if (response.statusCode === 301 || response.statusCode === 302) {
				// Handle redirects
				return downloadFile(response.headers.location, outputPath).then(resolve).catch(reject);
			}

			if (response.statusCode !== 200) {
				file.close();
				fs.unlinkSync(outputPath);
				reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
				return;
			}

			response.pipe(file);

			file.on('finish', () => {
				file.close();
				resolve(outputPath);
			});
		}).on('error', (err) => {
			file.close();
			if (fs.existsSync(outputPath)) {
				fs.unlinkSync(outputPath);
			}
			reject(err);
		});
	});
}

function getFileNameFromUrl(url) {
	try {
		const parsedUrl = new URL(url);
		const pathname = parsedUrl.pathname;
		const parts = pathname.split('/');
		let filename = parts[parts.length - 1];

		// Remove query string
		filename = filename.split('?')[0];

		// If no extension, try to get from Content-Type or default to .jpg
		if (!filename.includes('.')) {
			filename = filename + '.jpg';
		}

		// Sanitize filename
		filename = filename.replace(/[^a-zA-Z0-9._-]/g, '_');

		return filename;
	} catch (e) {
		return 'image.jpg';
	}
}

function extractImageUrls(wxrContent) {
	const urls = new Set();
	const urlTypes = new Map(); // Track if it's featured, card, or author

	// Extract attachment URLs - handle both CDATA and plain text formats
	const attachmentRegex = /<wp:attachment_url>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/wp:attachment_url>/g;
	let match;

	while ((match = attachmentRegex.exec(wxrContent)) !== null) {
		const url = match[1];
		if (url && !url.includes('Aera_tile.png')) { // Skip default placeholder
			urls.add(url);
		}
	}

	// Try to determine type from context (title or parent)
	// Handle both CDATA and plain text formats
	const featuredRegex = /<title>(?:<!\[CDATA\[)?(.*?)\s+featured image(?:\]\]>)?<\/title>[\s\S]*?<wp:attachment_url>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/wp:attachment_url>/g;
	while ((match = featuredRegex.exec(wxrContent)) !== null) {
		urlTypes.set(match[2], 'featured');
	}

	const cardRegex = /<title>(?:<!\[CDATA\[)?(.*?)\s+card image(?:\]\]>)?<\/title>[\s\S]*?<wp:attachment_url>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/wp:attachment_url>/g;
	while ((match = cardRegex.exec(wxrContent)) !== null) {
		urlTypes.set(match[2], 'card');
	}

	const authorRegex = /<title>(?:<!\[CDATA\[)?(.*?)\s+author photo(?:\]\]>)?<\/title>[\s\S]*?<wp:attachment_url>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/wp:attachment_url>/g;
	while ((match = authorRegex.exec(wxrContent)) !== null) {
		urlTypes.set(match[2], 'author');
	}

	return { urls: Array.from(urls), urlTypes };
}

async function run() {
	if (!fs.existsSync(WXR_FILE)) {
		console.error(`WXR file not found: ${WXR_FILE}`);
		console.error('Please run contentful-blogs-to-wxr.js first to generate the WXR file.');
		process.exit(1);
	}

	ensureDir(OUTPUT_DIR);
	ensureDir(AUTHOR_IMAGES_DIR);

	const wxrContent = fs.readFileSync(WXR_FILE, 'utf8');
	const { urls, urlTypes } = extractImageUrls(wxrContent);

	console.error(`Found ${urls.length} unique image URLs`);

	const downloaded = new Set();
	const failed = [];

	for (let i = 0; i < urls.length; i++) {
		const url = urls[i];
		const type = urlTypes.get(url) || 'featured';

		// Skip if already downloaded (by filename)
		const filename = getFileNameFromUrl(url);
		const outputDir = type === 'author' ? AUTHOR_IMAGES_DIR : OUTPUT_DIR;
		const outputPath = path.join(outputDir, filename);

		if (fs.existsSync(outputPath)) {
			console.error(`[${i + 1}/${urls.length}] Skipping (exists): ${filename}`);
			downloaded.add(url);
			continue;
		}

		try {
			console.error(`[${i + 1}/${urls.length}] Downloading ${type}: ${filename}`);
			await downloadFile(url, outputPath);
			downloaded.add(url);
			console.error(`  ✓ Saved to ${outputPath}`);
		} catch (error) {
			console.error(`  ✗ Failed: ${error.message}`);
			failed.push({ url, error: error.message });
		}

		// Small delay to avoid overwhelming the server
		await new Promise(resolve => setTimeout(resolve, 100));
	}

	console.log(`\nDownload complete!`);
	console.log(`  Successfully downloaded: ${downloaded.size}`);
	console.log(`  Failed: ${failed.length}`);

	if (failed.length > 0) {
		console.log(`\nFailed downloads:`);
		failed.forEach(({ url, error }) => {
			console.log(`  - ${url}: ${error}`);
		});
	}

	console.log(`\nImages saved to:`);
	console.log(`  Featured/Card images: ${OUTPUT_DIR}`);
	console.log(`  Author images: ${AUTHOR_IMAGES_DIR}`);
}

run().catch(console.error);
