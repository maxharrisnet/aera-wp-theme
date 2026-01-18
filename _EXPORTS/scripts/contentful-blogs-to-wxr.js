#!/usr/bin/env node
/**
 * Contentful Blogs to WordPress WXR Converter
 *
 * Converts Community Template Page entries from Contentful to WordPress WXR format
 * for import into the 'blog' custom post type.
 *
 * Features:
 * - Maps Community Template Page entries (main blog posts)
 * - Maps Community Card entries (archive/card data)
 * - Creates WordPress users for authors
 * - Downloads and maps images (featured image from ogImageUrl, card image from card)
 * - Preserves all markup and links
 * - Maps to Yoast SEO fields
 * - Filters deprecated posts
 * - Only includes published posts
 */

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const striptags = require('striptags');

const OUT = path.resolve(__dirname, '../blogs/blogs-wxr.xml');
const DEPRECATED_CSV = path.resolve(__dirname, '../../_ORIGINAL_FILES/Website Cleanup - Nov 2025  - Aditya - Blogs.csv');
const LIMIT = 999; // Start with 12 most recent for testing

// LATEST EXPORT FILE (with Community Cards): contentful-export-mh1amgo8m7ts-master-2026-01-16T12-53-01.json
// This file includes both Community Template Pages and Community Cards
// Auto-detect latest export file
function getLatestExportFile() {
	const exportDir = path.resolve(__dirname, '../../export_blogs_sample');
	if (!fs.existsSync(exportDir)) {
		throw new Error('Export directory not found: ' + exportDir);
	}
	const files = fs
		.readdirSync(exportDir)
		.filter((f) => f.includes('contentful-export') && f.endsWith('.json'))
		.map((f) => ({
			name: f,
			path: path.join(exportDir, f),
			mtime: fs.statSync(path.join(exportDir, f)).mtime,
		}))
		.sort((a, b) => b.mtime - a.mtime);

	if (files.length === 0) {
		throw new Error('No export files found in: ' + exportDir);
	}

	console.error('📁 Using latest export file:', files[0].name);
	console.error('   Modified:', files[0].mtime.toISOString());

	return files[0].path;
}

const SRC = getLatestExportFile();

function escXml(s) {
	if (s == null) return '';
	return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

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

function loadDeprecatedPosts() {
	const deprecated = new Set();
	try {
		const csv = fs.readFileSync(DEPRECATED_CSV, 'utf8');
		const lines = csv.split('\n');
		for (let i = 1; i < lines.length; i++) {
			const line = lines[i];
			if (!line.trim()) continue;
			const cols = line.split(',');
			if (cols.length >= 6) {
				const decision = cols[5]?.trim();
				const title = cols[1]?.trim();
				if (decision === 'Retire' && title) {
					deprecated.add(title.toLowerCase().trim());
				}
			}
		}
	} catch (e) {
		console.error('Warning: Could not load deprecated posts CSV:', e.message);
	}
	return deprecated;
}

function buildWxr(blogPosts, cardsMap, assetsMap, authorsMap, deprecated) {
	const now = new Date().toUTCString();
	const DEFAULT_IMAGE_URL = 'https://images.ctfassets.net/mh1amgo8m7ts/4prFu00cABgTGVeGvbCo8b/a2ac7f09d24154c85cd0dee9ee72096b/Aera_tile.png';
	let out = '';
	out += '<?xml version="1.0" encoding="UTF-8"?>\n';
	out += '<rss version="2.0" xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:wfw="http://wellformedweb.org/CommentAPI/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:wp="http://wordpress.org/export/1.2/">\n';
	out += '<channel>\n';
	out += '<title>Blogs Export</title>\n';
	out += '<link>https://your-site.example/</link>\n';
	out += `<wp:wxr_version>1.2</wp:wxr_version>\n`;

	// Note: Authors will be created/mapped during WordPress import
	// The dc:creator field will be used to match or create WordPress users

	let postId = 200000;
	let attachId = 300000;

	blogPosts.forEach((blog, i) => {
		const fields = blog.fields || {};
		const title = firstLocalized(fields.title) || '(no title)';

		// Skip deprecated posts
		if (deprecated.has(title.toLowerCase().trim())) {
			console.error(`Skipping deprecated post: ${title}`);
			return;
		}

		// Get matching card if available
		const card = cardsMap.get(blog.sys.id) || null;
		const cardFields = card?.fields || {};

		if (card) {
			console.error(`\n[${i + 1}] Blog: ${title.substring(0, 60)}`);
			console.error(`  Card matched: ${firstLocalized(cardFields.title) || 'N/A'}`);
		} else {
			console.error(`\n[${i + 1}] Blog: ${title.substring(0, 60)}`);
			console.error(`  ⚠ No card matched`);
		}

		// Extract slug - remove "blogs/" prefix if present
		let slug = firstLocalized(fields.slug) || firstLocalized(cardFields.link) || '';
		if (slug.startsWith('blogs/')) {
			slug = slug.replace(/^blogs\//, '');
		}
		if (slug.startsWith('/blogs/')) {
			slug = slug.replace(/^\/blogs\//, '');
		}
		if (slug.startsWith('/')) {
			slug = slug.substring(1);
		}

		// Get content - prefer richText, then content
		let content = firstLocalized(fields.richText) || firstLocalized(fields.content) || '';
		// Convert markdown to HTML
		if (content) {
			try {
				content = marked.parse(String(content));
				// Remove the first image from content if it matches the featured image pattern
				// This removes Blog_Hero_Banner_ images that should be replaced with featured image
				content = content.replace(/<p>\s*<img[^>]*Blog_Hero_Banner_[^>]*>.*?<\/p>\s*/i, '');
				content = content.replace(/<img[^>]*Blog_Hero_Banner_[^>]*>/i, '');
			} catch (e) {
				// If marked fails, just escape XML
				content = escXml(String(content));
			}
		}

		// Get excerpt from card text field
		const excerpt = firstLocalized(cardFields.text) || firstLocalized(fields.metaDescription) || '';
		const excerptPlain = striptags(excerpt);

		// Get author info
		const publisher = firstLocalized(fields.lead) || firstLocalized(cardFields.publication) || 'Aera Technology';
		const authorRole = firstLocalized(fields.author) || firstLocalized(cardFields.authorTitle) || '';
		const authorName = publisher; // Publisher is the author name

		// Get dates - WordPress format: YYYY-MM-DD HH:MM:SS
		// Prefer blog's date, fallback to card's date (this is what's displayed on the card)
		let dateValue = firstLocalized(fields.date);
		if (!dateValue && card) {
			// Use card's date if blog doesn't have one (card date is what shows on archive)
			dateValue = firstLocalized(cardFields.date);
		}

		let postDateTime = null;
		let postDateTimeGmt = null;

		if (dateValue) {
			// If it's just a date (YYYY-MM-DD), use noon in site timezone
			if (dateValue.match(/^\d{4}-\d{2}-\d{2}$/)) {
				// Simple format: YYYY-MM-DD 12:00:00 (WordPress will handle timezone conversion)
				postDateTime = dateValue + ' 12:00:00';
				postDateTimeGmt = dateValue + ' 12:00:00';
			} else {
				// Already has time, use as-is
				postDateTime = dateValue;
				postDateTimeGmt = dateValue;
			}
		} else {
			// Fallback to creation date
			const createdDate = blog.sys.createdAt ? new Date(blog.sys.createdAt) : new Date();
			postDateTime = createdDate.toISOString().replace('T', ' ').substring(0, 19);
			postDateTimeGmt = createdDate.toISOString().replace('T', ' ').substring(0, 19);
		}

		// Get images
		// Featured image: from Community Template Page (ogImageUrl or image field)
		let featuredImageUrl = null;
		let featuredImageId = null;

		// Try ogImageUrl first (it's a URL string, not an asset reference)
		const ogImageUrl = firstLocalized(fields.ogImageUrl);
		const imageAssetId = extractAssetId(fields.image);

		if (ogImageUrl) {
			// ogImageUrl is the featured image
			featuredImageUrl = ogImageUrl.startsWith('//') ? 'https:' + ogImageUrl : ogImageUrl;
		} else if (imageAssetId && assetsMap[imageAssetId]) {
			// No ogImageUrl, so image field is the featured image
			featuredImageUrl = assetsMap[imageAssetId];
			featuredImageId = imageAssetId;
		}

		// Fallback to default for featured image
		if (!featuredImageUrl) {
			featuredImageUrl = DEFAULT_IMAGE_URL;
		}

		// Card image: ALWAYS from Community Card's image field (if card exists)
		// This is different from the featured image and comes from the card data
		// IMPORTANT: Card image should NEVER be the same as featured image
		let cardImageUrl = null;
		const cardImageAssetId = extractAssetId(cardFields.image);
		if (cardImageAssetId && assetsMap[cardImageAssetId]) {
			cardImageUrl = assetsMap[cardImageAssetId];
			console.error(`  ✓ Card image from Community Card: ${cardImageUrl.split('/').pop()}`);

			// If card image is the same as featured image, that's an error - they should be different
			if (cardImageUrl === featuredImageUrl) {
				console.error(`  ⚠ WARNING: Card image is same as featured image! This should not happen.`);
				// Don't set card image if it's the same as featured
				cardImageUrl = null;
			}
		} else if (card) {
			console.error(`  ⚠ Card exists but no image found`);
		}

		// DO NOT fallback to featured image - card image should be separate or not set at all

		// Meta fields
		const metaTitle = firstLocalized(fields.metaTitle) || title;
		const metaDescription = firstLocalized(fields.metaDescription) || excerptPlain || '';
		const schemaArticle = firstLocalized(fields.schemaArticle) || '';

		// Get author photo
		const authorPhotoAssetId = extractAssetId(fields.authorPhoto);
		const authorPhotoUrl = authorPhotoAssetId && assetsMap[authorPhotoAssetId] ? assetsMap[authorPhotoAssetId] : null;

		// Build post item
		const currentPostId = postId++;
		const featuredAttachId = attachId++;
		// Card image should ALWAYS have its own attachment if it exists and is different from featured
		const cardAttachId = cardImageUrl && cardImageUrl !== featuredImageUrl ? attachId++ : null;
		const authorPhotoAttachId = authorPhotoUrl ? attachId++ : null;

		out += '<item>\n';
		out += `<title><![CDATA[${title}]]></title>\n`;
		out += `<link>/blogs/${escXml(slug)}</link>\n`;
		out += `<pubDate>${now}</pubDate>\n`;
		out += `<dc:creator>${escXml(authorName)}</dc:creator>\n`;
		out += `<excerpt:encoded><![CDATA[${excerptPlain || ''}]]></excerpt:encoded>\n`;
		out += `<wp:post_excerpt><![CDATA[${excerptPlain || ''}]]></wp:post_excerpt>\n`;
		out += `<guid isPermaLink="false">blog-${blog.sys.id}</guid>\n`;
		out += `<content:encoded><![CDATA[${content || ''}]]></content:encoded>\n`;
		out += `<wp:post_id>${currentPostId}</wp:post_id>\n`;
		out += `<wp:post_date>${postDateTime}</wp:post_date>\n`;
		out += `<wp:post_date_gmt>${postDateTimeGmt}</wp:post_date_gmt>\n`;
		out += `<wp:comment_status>closed</wp:comment_status>\n`;
		out += `<wp:ping_status>closed</wp:ping_status>\n`;
		out += `<wp:post_name>${escXml(
			slug ||
				title
					.toLowerCase()
					.replace(/[^a-z0-9]+/g, '-')
					.replace(/(^-|-$)/g, '')
		)}</wp:post_name>\n`;
		out += `<wp:status>publish</wp:status>\n`;
		out += `<wp:post_type>blog</wp:post_type>\n`;

		// ACF and meta fields
		function meta(k, v) {
			if (v == null || v === '') return;
			out += `<wp:postmeta>\n<wp:meta_key>${escXml(k)}</wp:meta_key>\n<wp:meta_value><![CDATA[${v}]]></wp:meta_value>\n</wp:postmeta>\n`;
		}

		// Featured image
		meta('_thumbnail_id', featuredAttachId);

		// Card image (for archive display) - ACF image field needs both value and field key
		// ONLY set card image if it exists and is different from featured image
		if (cardImageUrl && cardAttachId && cardAttachId !== featuredAttachId) {
			meta('resource_card_image', cardAttachId);
			meta('_resource_card_image', 'field_resource_card_image'); // ACF field key reference
		}

		// Author fields (we'll use WordPress author, but keep ACF for backwards compatibility during transition)
		if (excerpt) meta('resource_excerpt', excerpt);

		// Yoast SEO fields
		meta('_yoast_wpseo_title', metaTitle);
		meta('_yoast_wpseo_metadesc', metaDescription);
		if (schemaArticle) meta('_yoast_wpseo_schema_article', schemaArticle);

		// Original Contentful ID for reference
		meta('original_contentful_id', blog.sys.id);

		out += '</item>\n';

		// Featured image attachment
		out += '<item>\n';
		out += `<title><![CDATA[${title} featured image]]></title>\n`;
		out += `<link>${escXml(featuredImageUrl)}</link>\n`;
		out += `<pubDate>${now}</pubDate>\n`;
		out += `<dc:creator>${escXml(authorName)}</dc:creator>\n`;
		out += `<guid isPermaLink="false">attachment-${featuredAttachId}</guid>\n`;
		out += `<wp:post_id>${featuredAttachId}</wp:post_id>\n`;
		out += `<wp:post_date>${postDateTime}</wp:post_date>\n`;
		out += `<wp:post_date_gmt>${postDateTimeGmt}</wp:post_date_gmt>\n`;
		out += `<wp:post_status>inherit</wp:post_status>\n`;
		out += `<wp:post_parent>${currentPostId}</wp:post_parent>\n`;
		out += `<wp:post_type>attachment</wp:post_type>\n`;
		out += `<wp:attachment_url>${escXml(featuredImageUrl)}</wp:attachment_url>\n`;
		out += '</item>\n';

		// Card image attachment (ONLY if card image exists and is different from featured)
		if (cardImageUrl && cardAttachId && cardAttachId !== featuredAttachId) {
			out += '<item>\n';
			out += `<title><![CDATA[${title} card image]]></title>\n`;
			out += `<link>${escXml(cardImageUrl)}</link>\n`;
			out += `<pubDate>${now}</pubDate>\n`;
			out += `<dc:creator>${escXml(authorName)}</dc:creator>\n`;
			out += `<guid isPermaLink="false">attachment-${cardAttachId}</guid>\n`;
			out += `<wp:post_id>${cardAttachId}</wp:post_id>\n`;
			out += `<wp:post_date>${postDateTime}</wp:post_date>\n`;
			out += `<wp:post_date_gmt>${postDateTime}</wp:post_date_gmt>\n`;
			out += `<wp:post_status>inherit</wp:post_status>\n`;
			out += `<wp:post_parent>${currentPostId}</wp:post_parent>\n`;
			out += `<wp:post_type>attachment</wp:post_type>\n`;
			out += `<wp:attachment_url>${escXml(cardImageUrl)}</wp:attachment_url>\n`;
			out += '</item>\n';
		}

		// Author photo attachment (if exists)
		if (authorPhotoUrl && authorPhotoAttachId) {
			out += '<item>\n';
			out += `<title><![CDATA[${authorName} author photo]]></title>\n`;
			out += `<link>${escXml(authorPhotoUrl)}</link>\n`;
			out += `<pubDate>${now}</pubDate>\n`;
			out += `<dc:creator>${escXml(authorName)}</dc:creator>\n`;
			out += `<guid isPermaLink="false">attachment-${authorPhotoAttachId}</guid>\n`;
			out += `<wp:post_id>${authorPhotoAttachId}</wp:post_id>\n`;
			out += `<wp:post_date>${postDateTime}</wp:post_date>\n`;
			out += `<wp:post_date_gmt>${postDateTime}</wp:post_date_gmt>\n`;
			out += `<wp:post_status>inherit</wp:post_status>\n`;
			out += `<wp:post_parent>0</wp:post_parent>\n`;
			out += `<wp:post_type>attachment</wp:post_type>\n`;
			out += `<wp:attachment_url>${escXml(authorPhotoUrl)}</wp:attachment_url>\n`;
			out += '</item>\n';
		}
	});

	out += '</channel>\n</rss>\n';
	return out;
}

function run() {
	const raw = fs.readFileSync(SRC, 'utf8');
	const j = JSON.parse(raw);

	// Find content types
	const contentTypes = j.contentTypes || [];
	const templatePageCt = contentTypes.find((ct) => ct.sys?.id === 'communityTemplatePage');
	const cardCt = contentTypes.find((ct) => ct.sys?.id === 'communityCard');

	if (!templatePageCt) {
		console.error('Community Template Page content type not found');
		process.exit(1);
	}
	if (!cardCt) {
		console.error('Community Card content type not found');
		process.exit(1);
	}

	// Load deprecated posts
	const deprecated = loadDeprecatedPosts();
	console.error('Deprecated posts loaded:', deprecated.size);

	// Build assets map
	const assets = j.assets || [];
	const assetsMap = {};
	assets.forEach((a) => {
		const id = a.sys && a.sys.id;
		if (!id) return;
		const fileObj = (a.fields && a.fields.file) || null;
		if (!fileObj) {
			for (const k of Object.keys(a.fields || {})) {
				if (a.fields[k] && a.fields[k].file) {
					const file = a.fields[k].file;
					const url = file.url || '';
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
	const entries = j.entries || [];

	// Filter blog template pages (published only)
	const blogPosts = entries.filter((e) => {
		return e.sys?.contentType?.sys?.id === 'communityTemplatePage' && e.sys?.publishedAt;
	});

	// Filter community cards
	const cards = entries.filter((e) => {
		return e.sys?.contentType?.sys?.id === 'communityCard' && e.sys?.publishedAt;
	});

	// Build card map - link cards to template pages by matching title or slug
	const cardsMap = new Map();
	cards.forEach((card) => {
		const cardFields = card.fields || {};
		const cardTitle = firstLocalized(cardFields.title);
		const cardLink = firstLocalized(cardFields.link);
		let matched = false;

		// Try to match by title first
		blogPosts.forEach((blog) => {
			const blogTitle = firstLocalized(blog.fields?.title);
			if (blogTitle === cardTitle) {
				cardsMap.set(blog.sys.id, card);
				matched = true;
			}
		});

		// If no match by title, try by link/slug
		if (!matched && cardLink) {
			blogPosts.forEach((blog) => {
				const blogSlug = firstLocalized(blog.fields?.slug);
				if (blogSlug) {
					// Normalize slugs for comparison
					const normalizedCardLink = cardLink
						.replace(/^\/blogs\//, '')
						.replace(/^\//, '')
						.replace(/\/$/, '');
					const normalizedBlogSlug = blogSlug
						.replace(/^\/blogs\//, '')
						.replace(/^\//, '')
						.replace(/\/$/, '');

					if (normalizedCardLink === normalizedBlogSlug || normalizedCardLink.includes(normalizedBlogSlug) || normalizedBlogSlug.includes(normalizedCardLink)) {
						cardsMap.set(blog.sys.id, card);
						matched = true;
					}
				}
			});
		}
	});

	// Build authors map
	const authorsMap = new Map();
	blogPosts.forEach((blog) => {
		const fields = blog.fields || {};
		const publisher = firstLocalized(fields.lead);
		const authorRole = firstLocalized(fields.author);
		const authorPhotoId = extractAssetId(fields.authorPhoto);

		if (publisher) {
			if (!authorsMap.has(publisher)) {
				authorsMap.set(publisher, {
					role: authorRole || '',
					photoUrl: authorPhotoId && assetsMap[authorPhotoId] ? assetsMap[authorPhotoId] : null,
				});
			}
		}
	});

	// Sort by date (most recent first) and limit
	blogPosts.sort((a, b) => {
		const dateA = firstLocalized(a.fields?.date) || a.sys.updatedAt || a.sys.createdAt;
		const dateB = firstLocalized(b.fields?.date) || b.sys.updatedAt || b.sys.createdAt;
		return new Date(dateB) - new Date(dateA);
	});

	const limitedPosts = blogPosts.slice(0, LIMIT);

	console.error('Community Template Page contentType:', templatePageCt.name, templatePageCt.sys?.id);
	console.error('Community Card contentType:', cardCt.name, cardCt.sys?.id);
	console.error('Total blog posts (published):', blogPosts.length);
	console.error('Total cards (published):', cards.length);
	console.error('Cards matched to posts:', cardsMap.size);
	console.error('Unique authors found:', authorsMap.size);
	console.error(`Processing ${limitedPosts.length} most recent posts (limit: ${LIMIT})`);

	const wxr = buildWxr(limitedPosts, cardsMap, assetsMap, authorsMap, deprecated);
	fs.writeFileSync(OUT, wxr, 'utf8');
	console.log('WXR written to', OUT);
	console.log(`\nNext steps:`);
	console.log(`1. Review the WXR file: ${OUT}`);
	console.log(`2. Import into WordPress: Tools → Import → WordPress`);
	console.log(`3. Map authors to WordPress users (or create new users)`);
	console.log(`4. Download images using: node scripts/download-blog-images.js`);
}

run();
