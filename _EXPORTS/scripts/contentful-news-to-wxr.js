#!/usr/bin/env node
/**
 * Contentful News to WordPress WXR Converter
 *
 * Converts News Item entries from Contentful to WordPress WXR format
 * for import into the 'news' custom post type.
 *
 * Requirements:
 * - Only imports "News Item" content type
 * - Filters by type="News" (not Press Release, Video, etc.)
 * - Only includes published entries
 * - Uses "date" custom field (not publishedAt)
 * - Sorts by date (newest first)
 * - Note: News Items only have "date" field, not start/end dates
 */

const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '../news/news-wxr.xml');

// Auto-detect latest export file (same export contains all content types)
function getLatestExportFile() {
	const exportDir = path.resolve(__dirname, '../../export_blogs_sample');
	if (!fs.existsSync(exportDir)) {
		throw new Error('Export directory not found: ' + exportDir);
	}
	const files = fs.readdirSync(exportDir)
		.filter(f => f.includes('contentful-export') && f.endsWith('.json'))
		.map(f => ({
			name: f,
			path: path.join(exportDir, f),
			mtime: fs.statSync(path.join(exportDir, f)).mtime
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
	if (s == null) {
		return '';
	}
	return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function firstLocalized(f) {
	if (!f) {
		return null;
	}
	if (typeof f === 'string') {
		return f;
	}
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

function buildWxr(items, assetsMap) {
	const now = new Date().toUTCString();
	const DEFAULT_IMAGE_URL = 'https://images.ctfassets.net/mh1amgo8m7ts/4prFu00cABgTGVeGvbCo8b/a2ac7f09d24154c85cd0dee9ee72096b/Aera_tile.png';
	let out = '';
	out += '<?xml version="1.0" encoding="UTF-8"?>\n';
	out += '<rss version="2.0" xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/" xmlns:content="http://wordpress.org/export/1.2/excerpt/" xmlns:wfw="http://wellformedweb.org/CommentAPI/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:wp="http://wordpress.org/export/1.2/">\n';
	out += '<channel>\n';
	out += '<title>News Export</title>\n';
	out += '<link>https://your-site.example/</link>\n';
	out += `<wp:wxr_version>1.2</wp:wxr_version>\n`;

	let postId = 500000;
	let attachId = 600000;

	items.forEach((it) => {
		const fields = it.fields || {};
		const title = firstLocalized(fields.title) || '(no title)';
		const excerpt = firstLocalized(fields.text) || '';
		const externalLink = firstLocalized(fields.link) || '';
		const author = firstLocalized(fields.publication) || firstLocalized(fields.author) || '';
		const cta = firstLocalized(fields.ctaText) || 'Read More';

		// Get date from custom "date" field (not publishedAt)
		let postDate = firstLocalized(fields.date);
		if (postDate) {
			// If it's just a date (YYYY-MM-DD), add time
			if (postDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
				postDate = postDate + ' 12:00:00';
			}
		} else {
			// Fallback to creation date if no date field
			const createdDate = it.sys.createdAt ? new Date(it.sys.createdAt) : new Date();
			postDate = createdDate.toISOString().replace('T', ' ').substring(0, 19);
		}

		// Get image
		let imageUrl = null;
		const imageAssetId = extractAssetId(fields.image);
		if (imageAssetId && assetsMap[imageAssetId]) {
			imageUrl = assetsMap[imageAssetId];
		}
		if (!imageUrl) {
			imageUrl = DEFAULT_IMAGE_URL;
		}

		const currentPostId = postId++;
		const featuredAttachId = attachId++;

		out += '<item>\n';
		out += `<title><![CDATA[${title}]]></title>\n`;
		out += `<link>${escXml(externalLink || 'https://example.com/news/' + currentPostId)}</link>\n`;
		out += `<pubDate>${now}</pubDate>\n`;
		out += `<dc:creator>admin</dc:creator>\n`;
		out += `<excerpt:encoded><![CDATA[${excerpt || ''}]]></excerpt:encoded>\n`;
		out += `<wp:post_excerpt><![CDATA[${excerpt || ''}]]></wp:post_excerpt>\n`;
		out += `<guid isPermaLink="false">news-${it.sys && it.sys.id}</guid>\n`;
		out += `<content:encoded><![CDATA[${excerpt || ''}]]></content:encoded>\n`;
		out += `<wp:post_id>${currentPostId}</wp:post_id>\n`;
		out += `<wp:post_date>${postDate}</wp:post_date>\n`;
		out += `<wp:post_date_gmt>${postDate}</wp:post_date_gmt>\n`;
		out += `<wp:comment_status>closed</wp:comment_status>\n`;
		out += `<wp:ping_status>closed</wp:ping_status>\n`;
		out += `<wp:post_name>${escXml(
			(title || '')
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/(^-|-$)/g, '')
		)}</wp:post_name>\n`;
		out += `<wp:status>publish</wp:status>\n`;
		out += `<wp:post_type>news</wp:post_type>\n`;

		function meta(k, v) {
			if (v == null || v === '') {
				return;
			}
			out += `<wp:postmeta>\n<wp:meta_key>${escXml(k)}</wp:meta_key>\n<wp:meta_value><![CDATA[${v}]]></wp:meta_value>\n</wp:postmeta>\n`;
		}

		meta('resource_card_title', title);
		if (author) {
			meta('resource_author', author);
		}
		if (excerpt) {
			meta('resource_excerpt', excerpt);
		}
		if (cta) {
			meta('resource_cta_text', cta);
		}
		if (externalLink) {
			meta('resource_external_url', externalLink);
		}
		if (it.sys && it.sys.id) {
			meta('original_contentful_id', it.sys.id);
		}

		// Set featured image
		meta('_thumbnail_id', featuredAttachId);

		// Card image - ACF image field needs both value and field key
		meta('resource_card_image', featuredAttachId);
		meta('_resource_card_image', 'field_resource_card_image'); // ACF field key reference

		out += '</item>\n';

		// Image attachment
		out += '<item>\n';
		out += `<title><![CDATA[${title} image]]></title>\n`;
		out += `<link>${escXml(imageUrl)}</link>\n`;
		out += `<pubDate>${now}</pubDate>\n`;
		out += `<dc:creator>admin</dc:creator>\n`;
		out += `<guid isPermaLink="false">attachment-${featuredAttachId}</guid>\n`;
		out += `<wp:post_id>${featuredAttachId}</wp:post_id>\n`;
		out += `<wp:post_date>${postDate}</wp:post_date>\n`;
		out += `<wp:post_date_gmt>${postDate}</wp:post_date_gmt>\n`;
		out += `<wp:post_status>inherit</wp:post_status>\n`;
		out += `<wp:post_parent>${currentPostId}</wp:post_parent>\n`;
		out += `<wp:post_type>attachment</wp:post_type>\n`;
		out += `<wp:attachment_url>${escXml(imageUrl)}</wp:attachment_url>\n`;
		out += '</item>\n';
	});

	out += '</channel>\n</rss>\n';
	return out;
}

function run() {
	const raw = fs.readFileSync(SRC, 'utf8');
	const j = JSON.parse(raw);
	const contentTypes = j.contentTypes || [];
	const newsCt = contentTypes.find((ct) => ct.sys?.id === 'newsItem');

	if (!newsCt) {
		console.error('News Item content type not found');
		process.exit(1);
	}

	const entries = j.entries || [];
	const assets = j.assets || [];

	// Build assets map
	const assetsMap = {};
	assets.forEach((a) => {
		const id = a.sys && a.sys.id;
		if (!id) {
			return;
		}
		const fileObj = (a.fields && a.fields.file) || null;
		if (!fileObj) {
			// sometimes localized
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

	// Filter: Only News Item content type, published, and type="News"
	const newsEntries = entries.filter((e) => {
		// Must be News Item content type
		if (e.sys?.contentType?.sys?.id !== 'newsItem') {
			return false;
		}
		// Must be published
		if (!e.sys?.publishedAt) {
			return false;
		}
		// Must have type="News" (not Press Release, Video, etc.)
		const type = firstLocalized(e.fields?.type);
		return type === 'News';
	});

	console.error('News Item contentType:', newsCt.name, newsCt.sys?.id);
	console.error('Total published News Items:', entries.filter(e => e.sys?.contentType?.sys?.id === 'newsItem' && e.sys?.publishedAt).length);
	console.error('Filtered to type="News":', newsEntries.length);

	// Sort by date field (newest first)
	newsEntries.sort((a, b) => {
		const dateA = firstLocalized(a.fields?.date) || a.sys.createdAt || '';
		const dateB = firstLocalized(b.fields?.date) || b.sys.createdAt || '';
		return new Date(dateB) - new Date(dateA);
	});

	const wxr = buildWxr(newsEntries, assetsMap);
	fs.writeFileSync(OUT, wxr, 'utf8');
	console.log('WXR written to', OUT);
	console.log(`\nExported ${newsEntries.length} news items`);
	console.log(`Sorted by date field (newest first)`);
}

run();
