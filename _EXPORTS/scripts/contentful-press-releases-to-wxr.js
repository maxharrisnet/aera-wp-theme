#!/usr/bin/env node
/**
 * Contentful Press Releases to WordPress WXR Converter
 *
 * Converts Article Template Page entries (main content) matched with News Item entries (cards)
 * from Contentful to WordPress WXR format for import into the 'press-release' custom post type.
 *
 * Data Model:
 * - Main content: Article Template Page
 * - Card data: News Item with type="Press Release"
 * - Match by: title and url/slug
 * - Card image: from News Item's image field
 * - Featured image: from Article Template Page (ogImageUrl or image field)
 */

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const striptags = require('striptags');

const OUT = path.resolve(__dirname, '../press-releases/press-releases-wxr.xml');

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

function buildWxr(articlePages, cardsMap, assetsMap) {
	const now = new Date().toUTCString();
	const DEFAULT_IMAGE_URL = 'https://images.ctfassets.net/mh1amgo8m7ts/4prFu00cABgTGVeGvbCo8b/a2ac7f09d24154c85cd0dee9ee72096b/Aera_tile.png';
	let out = '';
	out += '<?xml version="1.0" encoding="UTF-8"?>\n';
	out += '<rss version="2.0" xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:wfw="http://wellformedweb.org/CommentAPI/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:wp="http://wordpress.org/export/1.2/">\n';
	out += '<channel>\n';
	out += '<title>Press Releases Export</title>\n';
	out += '<link>https://your-site.example/</link>\n';
	out += `<wp:wxr_version>1.2</wp:wxr_version>\n`;

	let postId = 700000;
	let attachId = 800000;

	articlePages.forEach((article, i) => {
		const fields = article.fields || {};
		const title = firstLocalized(fields.title) || '(no title)';
		const content = firstLocalized(fields.content) || '';
		const lead = firstLocalized(fields.lead) || '';
		const author = firstLocalized(fields.author) || 'Aera Technology';
		const slug = firstLocalized(fields.slug) || '';
		const articleUrl = firstLocalized(fields.articleUrl) || '';

		// Get matched card first (needed for date fallback)
		const card = cardsMap.get(article.sys.id) || null;
		const cardFields = card?.fields || {};

		// Get date: prefer Article Template Page date, fallback to card date, then creation date
		let dateValue = firstLocalized(fields.date);
		if (!dateValue && card) {
			// Use card's date if article doesn't have one
			dateValue = firstLocalized(cardFields.date);
		}

		let postDate = null;
		if (dateValue) {
			// If it's just a date (YYYY-MM-DD), use noon to avoid timezone issues
			if (dateValue.match(/^\d{4}-\d{2}-\d{2}$/)) {
				postDate = dateValue + ' 12:00:00';
			} else {
				postDate = dateValue;
			}
		} else {
			// Fallback to creation date
			const createdDate = article.sys.createdAt ? new Date(article.sys.createdAt) : new Date();
			postDate = createdDate.toISOString().replace('T', ' ').substring(0, 19);
		}

		// Note: Only single "date" field exists for press releases (no start/end dates)

		// Featured image: from Article Template Page (ogImageUrl or image field)
		let featuredImageUrl = null;
		const ogImageUrl = firstLocalized(fields.ogImageUrl);
		const imageAssetId = extractAssetId(fields.image);
		if (ogImageUrl) {
			featuredImageUrl = ogImageUrl.startsWith('//') ? 'https:' + ogImageUrl : ogImageUrl;
		} else if (imageAssetId && assetsMap[imageAssetId]) {
			featuredImageUrl = assetsMap[imageAssetId];
		}
		if (!featuredImageUrl) {
			featuredImageUrl = DEFAULT_IMAGE_URL;
		}

		// Card image: from News Item card's image field
		let cardImageUrl = null;
		const cardImageAssetId = extractAssetId(cardFields.image);
		if (cardImageAssetId && assetsMap[cardImageAssetId]) {
			cardImageUrl = assetsMap[cardImageAssetId];
		}
		// If no card image, use featured image
		if (!cardImageUrl) {
			cardImageUrl = featuredImageUrl;
		}

		// Excerpt from card or lead
		const excerpt = firstLocalized(cardFields.text) || lead || '';

		// Meta fields
		const metaTitle = firstLocalized(fields.metaTitle) || title;
		let metaDescription = firstLocalized(fields.metaDescription) || excerpt || '';
		try {
			metaDescription = striptags(marked.parse(String(metaDescription)));
		} catch (e) {
			metaDescription = String(metaDescription).replace(/\*\*/g, '');
		}

		// Convert content from markdown to HTML
		let htmlContent = '';
		try {
			htmlContent = marked.parse(String(content));
		} catch (e) {
			htmlContent = escXml(String(content));
		}

		const currentPostId = postId++;
		const featuredAttachId = attachId++;
		const cardAttachId = cardImageUrl && cardImageUrl !== featuredImageUrl ? attachId++ : featuredAttachId;

		out += '<item>\n';
		out += `<title><![CDATA[${title}]]></title>\n`;
		out += `<link>${escXml(articleUrl || slug || 'https://example.com/press-releases/' + currentPostId)}</link>\n`;
		out += `<pubDate>${now}</pubDate>\n`;
		out += `<dc:creator>${escXml(author)}</dc:creator>\n`;
		out += `<excerpt:encoded><![CDATA[${excerpt || ''}]]></excerpt:encoded>\n`;
		out += `<wp:post_excerpt><![CDATA[${excerpt || ''}]]></wp:post_excerpt>\n`;
		out += `<guid isPermaLink="false">press-release-${article.sys.id}</guid>\n`;
		out += `<content:encoded><![CDATA[${htmlContent || ''}]]></content:encoded>\n`;
		out += `<wp:post_id>${currentPostId}</wp:post_id>\n`;
		out += `<wp:post_date>${postDate}</wp:post_date>\n`;
		out += `<wp:post_date_gmt>${postDate}</wp:post_date_gmt>\n`;
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
		out += `<wp:post_type>press-release</wp:post_type>\n`;

		function meta(k, v) {
			if (v == null || v === '') return;
			out += `<wp:postmeta>\n<wp:meta_key>${escXml(k)}</wp:meta_key>\n<wp:meta_value><![CDATA[${v}]]></wp:meta_value>\n</wp:postmeta>\n`;
		}

		// Resource card fields
		meta('resource_card_title', title);
		if (author) meta('resource_author', author);
		if (excerpt) meta('resource_excerpt', excerpt);
		meta('resource_cta_text', 'Read');
		if (articleUrl) meta('resource_external_url', articleUrl);

		// Note: Date is already set in post_date above

		// Images
		meta('_thumbnail_id', featuredAttachId);
		if (cardImageUrl && cardAttachId && cardAttachId !== featuredAttachId) {
			meta('resource_card_image', cardAttachId);
			meta('_resource_card_image', 'field_resource_card_image'); // ACF field key reference
		} else {
			meta('resource_card_image', featuredAttachId);
			meta('_resource_card_image', 'field_resource_card_image'); // ACF field key reference
		}

		// Yoast SEO
		meta('_yoast_wpseo_title', metaTitle);
		meta('_yoast_wpseo_metadesc', metaDescription);

		// Original ID
		meta('original_contentful_id', article.sys.id);

		out += '</item>\n';

		// Featured image attachment
		out += '<item>\n';
		out += `<title><![CDATA[${title} featured image]]></title>\n`;
		out += `<link>${escXml(featuredImageUrl)}</link>\n`;
		out += `<pubDate>${now}</pubDate>\n`;
		out += `<dc:creator>${escXml(author)}</dc:creator>\n`;
		out += `<guid isPermaLink="false">attachment-${featuredAttachId}</guid>\n`;
		out += `<wp:post_id>${featuredAttachId}</wp:post_id>\n`;
		out += `<wp:post_date>${postDate}</wp:post_date>\n`;
		out += `<wp:post_date_gmt>${postDate}</wp:post_date_gmt>\n`;
		out += `<wp:post_status>inherit</wp:post_status>\n`;
		out += `<wp:post_parent>${currentPostId}</wp:post_parent>\n`;
		out += `<wp:post_type>attachment</wp:post_type>\n`;
		out += `<wp:attachment_url>${escXml(featuredImageUrl)}</wp:attachment_url>\n`;
		out += '</item>\n';

		// Card image attachment (if different from featured)
		if (cardImageUrl && cardAttachId && cardAttachId !== featuredAttachId) {
			out += '<item>\n';
			out += `<title><![CDATA[${title} card image]]></title>\n`;
			out += `<link>${escXml(cardImageUrl)}</link>\n`;
			out += `<pubDate>${now}</pubDate>\n`;
			out += `<dc:creator>${escXml(author)}</dc:creator>\n`;
			out += `<guid isPermaLink="false">attachment-${cardAttachId}</guid>\n`;
			out += `<wp:post_id>${cardAttachId}</wp:post_id>\n`;
			out += `<wp:post_date>${postDate}</wp:post_date>\n`;
			out += `<wp:post_date_gmt>${postDate}</wp:post_date_gmt>\n`;
			out += `<wp:post_status>inherit</wp:post_status>\n`;
			out += `<wp:post_parent>${currentPostId}</wp:post_parent>\n`;
			out += `<wp:post_type>attachment</wp:post_type>\n`;
			out += `<wp:attachment_url>${escXml(cardImageUrl)}</wp:attachment_url>\n`;
			out += '</item>\n';
		}
	});

	out += '</channel>\n</rss>\n';
	return out;
}

function run() {
	const raw = fs.readFileSync(SRC, 'utf8');
	const j = JSON.parse(raw);
	const entries = j.entries || [];
	const assets = j.assets || [];

	// Build assets map
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

	// Get Article Template Pages (main content) - only published
	const articlePages = entries.filter((e) => {
		return e.sys?.contentType?.sys?.id === 'articleTemplatePage' && e.sys?.publishedAt;
	});

	// Get News Items with type="Press Release" (cards) - only published
	const pressReleaseCards = entries.filter((e) => {
		if (e.sys?.contentType?.sys?.id !== 'newsItem') return false;
		if (!e.sys?.publishedAt) return false;
		const type = firstLocalized(e.fields?.type);
		return type && type.includes('Press') && type.includes('Release');
	});

	console.error('Article Template Pages (published):', articlePages.length);
	console.error('Press Release Cards (published):', pressReleaseCards.length);

	// Match cards to articles by title and url/slug
	const cardsMap = new Map();
	articlePages.forEach((article) => {
		const articleTitle = firstLocalized(article.fields?.title);
		const articleSlug = firstLocalized(article.fields?.slug);
		const articleUrl = firstLocalized(article.fields?.articleUrl);

		// Try to match by title first
		const cardByTitle = pressReleaseCards.find((card) => {
			const cardTitle = firstLocalized(card.fields?.title);
			return cardTitle === articleTitle;
		});

		if (cardByTitle) {
			cardsMap.set(article.sys.id, cardByTitle);
		} else {
			// Try to match by url/slug
			const cardByUrl = pressReleaseCards.find((card) => {
				const cardLink = firstLocalized(card.fields?.link);
				if (!cardLink || (!articleSlug && !articleUrl)) return false;
				const normalizedCardLink = cardLink
					.replace(/^\/news\//, '')
					.replace(/^\//, '')
					.replace(/\/$/, '');
				const normalizedArticleSlug = (articleSlug || articleUrl || '')
					.replace(/^\/news\//, '')
					.replace(/^\//, '')
					.replace(/\/$/, '');
				return normalizedCardLink === normalizedArticleSlug || normalizedCardLink.includes(normalizedArticleSlug) || normalizedArticleSlug.includes(normalizedCardLink);
			});

			if (cardByUrl) {
				cardsMap.set(article.sys.id, cardByUrl);
			}
		}
	});

	console.error('Cards matched to articles:', cardsMap.size);

	// Sort by date (newest first) - use card date as fallback if article date missing
	articlePages.sort((a, b) => {
		// Get article date first, fallback to card date (card is already matched)
		let dateA = firstLocalized(a.fields?.date);
		if (!dateA) {
			const cardA = cardsMap.get(a.sys.id);
			if (cardA) {
				dateA = firstLocalized(cardA.fields?.date);
			}
		}
		let dateB = firstLocalized(b.fields?.date);
		if (!dateB) {
			const cardB = cardsMap.get(b.sys.id);
			if (cardB) {
				dateB = firstLocalized(cardB.fields?.date);
			}
		}

		// Only use custom date field - if missing, sort to end (use far past date)
		dateA = dateA || '1970-01-01';
		dateB = dateB || '1970-01-01';

		return new Date(dateB) - new Date(dateA);
	});

	const wxr = buildWxr(articlePages, cardsMap, assetsMap);
	fs.writeFileSync(OUT, wxr, 'utf8');
	console.log('WXR written to', OUT);
}

run();
