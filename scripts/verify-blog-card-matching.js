#!/usr/bin/env node
/**
 * Verify Blog to Card Matching
 *
 * This script helps verify that Community Template Pages are correctly
 * matched to Community Cards and shows which images are assigned.
 */

const fs = require('fs');
const path = require('path');

function firstLocalized(f) {
	if (!f) return null;
	if (typeof f === 'string') return f;
	if (typeof f === 'object') {
		const k = Object.keys(f)[0];
		return f[k];
	}
	return null;
}

function extractAssetId(field) {
	if (!field) return null;
	if (field.sys && field.sys.type === 'Link' && field.sys.linkType === 'Asset') {
		return field.sys.id;
	}
	if (typeof field === 'object') {
		for (const locale of Object.keys(field)) {
			const val = field[locale];
			if (val && val.sys && val.sys.type === 'Link' && val.sys.linkType === 'Asset') {
				return val.sys.id;
			}
		}
	}
	return null;
}

function getLatestExportFile() {
	const exportDir = path.resolve(__dirname, '../export_blogs_sample');
	const files = fs
		.readdirSync(exportDir)
		.filter((f) => f.includes('contentful-export') && f.endsWith('.json'))
		.map((f) => ({
			name: f,
			path: path.join(exportDir, f),
			mtime: fs.statSync(path.join(exportDir, f)).mtime,
		}))
		.sort((a, b) => b.mtime - a.mtime);

	return files[0].path;
}

const SRC = getLatestExportFile();
const data = JSON.parse(fs.readFileSync(SRC, 'utf8'));

// Build assets map
const assets = data.assets || [];
const assetsMap = {};
assets.forEach((a) => {
	const id = a.sys && a.sys.id;
	if (!id) return;
	const fileObj = (a.fields && a.fields.file) || null;
	if (!fileObj) {
		for (const k of Object.keys(a.fields || {})) {
			if (a.fields[k] && a.fields[k].file) {
				const url = a.fields[k].file.url || '';
				assetsMap[id] = url.startsWith('//') ? 'https:' + url : url;
				break;
			}
		}
	} else {
		const locale = Object.keys(fileObj)[0];
		const file = fileObj[locale];
		if (file && file.url) {
			assetsMap[id] = file.url.startsWith('//') ? 'https:' + file.url : file.url;
		}
	}
});

// Get entries
const entries = data.entries || [];
const blogPosts = entries.filter((e) => {
	return e.sys?.contentType?.sys?.id === 'communityTemplatePage' && e.sys?.publishedAt;
});
const cards = entries.filter((e) => {
	return e.sys?.contentType?.sys?.id === 'communityCard' && e.sys?.publishedAt;
});

// Build card map
const cardsMap = new Map();
cards.forEach((card) => {
	const cardFields = card.fields || {};
	const cardTitle = firstLocalized(cardFields.title);
	const cardLink = firstLocalized(cardFields.link);
	let matched = false;

	blogPosts.forEach((blog) => {
		const blogTitle = firstLocalized(blog.fields?.title);
		if (blogTitle === cardTitle) {
			cardsMap.set(blog.sys.id, card);
			matched = true;
		}
	});

	if (!matched && cardLink) {
		blogPosts.forEach((blog) => {
			const blogSlug = firstLocalized(blog.fields?.slug);
			if (blogSlug) {
				const normalizedCardLink = cardLink.replace(/^\/blogs\//, '').replace(/^\//, '').replace(/\/$/, '');
				const normalizedBlogSlug = blogSlug.replace(/^\/blogs\//, '').replace(/^\//, '').replace(/\/$/, '');
				if (normalizedCardLink === normalizedBlogSlug || normalizedCardLink.includes(normalizedBlogSlug) || normalizedBlogSlug.includes(normalizedCardLink)) {
					cardsMap.set(blog.sys.id, card);
					matched = true;
				}
			}
		});
	}
});

// Sort blogs by date
blogPosts.sort((a, b) => {
	const dateA = firstLocalized(a.fields?.date) || a.sys.updatedAt || a.sys.createdAt;
	const dateB = firstLocalized(b.fields?.date) || b.sys.updatedAt || b.sys.createdAt;
	return new Date(dateB) - new Date(dateA);
});

console.log('Blog to Card Matching Verification\n');
console.log('='.repeat(80));
console.log(`Total blogs: ${blogPosts.length}`);
console.log(`Total cards: ${cards.length}`);
console.log(`Matched: ${cardsMap.size}`);
console.log('='.repeat(80));
console.log('');

// Show first 12 (matching the LIMIT)
blogPosts.slice(0, 12).forEach((blog, i) => {
	const fields = blog.fields || {};
	const title = firstLocalized(fields.title);
	const card = cardsMap.get(blog.sys.id);

	const ogImageUrl = firstLocalized(fields.ogImageUrl);
	const imageAssetId = extractAssetId(fields.image);
	const featuredUrl = ogImageUrl || (imageAssetId && assetsMap[imageAssetId]) || 'N/A';

	let cardImageUrl = 'N/A';
	if (card) {
		const cardImageAssetId = extractAssetId(card.fields?.image);
		cardImageUrl = cardImageAssetId && assetsMap[cardImageAssetId] ? assetsMap[cardImageAssetId] : 'NOT FOUND';
	}

	console.log(`${i + 1}. ${title}`);
	console.log(`   Featured: ${featuredUrl.split('/').pop()}`);
	console.log(`   Card: ${card ? cardImageUrl.split('/').pop() : 'NO CARD MATCHED'}`);
	console.log(`   Same? ${featuredUrl === cardImageUrl}`);
	console.log('');
});
