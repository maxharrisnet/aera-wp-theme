#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const striptags = require('striptags');
const OUT = path.resolve(__dirname, '../_ORIGINAL_FILES/press-releases-wxr.xml');
const SRC = path.resolve(__dirname, '../_ORIGINAL_FILES/contentful-export-mh1amgo8m7ts-master-2025-11-24T23-06-28.json');

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

function buildWxr(items, assetsMap, slugMap) {
	const now = new Date().toUTCString();
	const DEFAULT_IMAGE_URL = 'https://images.ctfassets.net/mh1amgo8m7ts/4prFu00cABgTGVeGvbCo8b/a2ac7f09d24154c85cd0dee9ee72096b/Aera_tile.png';
	let out = '';
	out += '<?xml version="1.0" encoding="UTF-8"?>\n';
	out += '<rss version="2.0" xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:wfw="http://wellformedweb.org/CommentAPI/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:wp="http://wordpress.org/export/1.2/">\n';
	out += '<channel>\n';
	out += '<title>Press Releases Export</title>\n';
	out += '<link>https://your-site.example/</link>\n';
	out += `<wp:wxr_version>1.2</wp:wxr_version>\n`;

	items.forEach((it, i) => {
		const postId = 700000 + i;
		const attachId = 800000 + i;
		const fields = it.fields || {};
		const title = firstLocalized(fields.title) || '(no title)';
		const excerpt = firstLocalized(fields.text) || '';

		const rawPublication = firstLocalized(fields.publication);
		const rawAuthor = firstLocalized(fields.author);
		const publication = rawPublication || rawAuthor || 'Aera Technology';
		const author = rawAuthor || rawPublication || publication;
		const cta = 'Read';

		let articlePageContent = '';
		let metaTitle = title;
		let metaDescription = excerpt || '';

		const linkField = firstLocalized(fields.link);
		let matchedArticle = null;
		if (linkField && linkField.startsWith('/news/')) {
			const slug = 'news/' + linkField.replace('/news/', '');
			if (slugMap[slug]) matchedArticle = slugMap[slug];
		}
		if (matchedArticle) {
			const articleFields = matchedArticle.fields || {};
			articlePageContent = firstLocalized(articleFields.content) || '';
			if (articleFields.metaTitle) metaTitle = firstLocalized(articleFields.metaTitle) || title;
			if (articleFields.metaDescription) metaDescription = firstLocalized(articleFields.metaDescription) || excerpt;
		}

		let content = articlePageContent || excerpt || '';
		try {
			content = marked.parse(String(content));
		} catch (e) {
			content = escXml(String(content));
		}
		try {
			metaDescription = striptags(marked.parse(String(metaDescription)));
		} catch (e) {
			metaDescription = String(metaDescription).replace(/\*\*/g, '');
		}

		let imageUrl = null;
		try {
			const imgField = fields.image || fields.cardImage || fields.heroImage || null;
			let assetId = null;
			if (imgField) {
				if (imgField.sys && imgField.sys.type === 'Link' && imgField.sys.linkType === 'Asset') assetId = imgField.sys.id;
				else if (typeof imgField === 'object') {
					for (const locale of Object.keys(imgField)) {
						const val = imgField[locale];
						if (val && val.sys && val.sys.type === 'Link' && val.sys.linkType === 'Asset') {
							assetId = val.sys.id;
							break;
						}
					}
				}
			}
			if (assetId && assetsMap[assetId]) imageUrl = assetsMap[assetId];
		} catch (e) {
			imageUrl = null;
		}
		if (!imageUrl) imageUrl = DEFAULT_IMAGE_URL;

		out += '<item>\n';
		out += `<title><![CDATA[${title}]]></title>\n`;
		out += `<link>${escXml(linkField || 'https://example.com/press-releases/' + ((it.sys && it.sys.id) || i))}</link>\n`;
		out += `<pubDate>${now}</pubDate>\n`;
		out += `<dc:creator>${escXml(author)}</dc:creator>\n`;
		out += `<excerpt:encoded><![CDATA[${metaDescription || ''}]]></excerpt:encoded>\n`;
		out += `<wp:post_excerpt><![CDATA[${metaDescription || ''}]]></wp:post_excerpt>\n`;
		out += `<guid isPermaLink="false">press-release-${it.sys && it.sys.id}</guid>\n`;
		out += `<content:encoded><![CDATA[${content || ''}]]></content:encoded>\n`;
		out += `<wp:post_id>${postId}</wp:post_id>\n`;
		const postDate = it.sys && it.sys.createdAt ? new Date(it.sys.createdAt).toISOString() : new Date().toISOString();
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
		out += `<wp:post_type>press-release</wp:post_type>\n`;

		function meta(k, v) {
			if (v == null) return;
			out += `<wp:postmeta>\n<wp:meta_key>${escXml(k)}</wp:meta_key>\n<wp:meta_value><![CDATA[${v}]]></wp:meta_value>\n</wp:postmeta>\n`;
		}
		meta('resource_card_title', firstLocalized(fields.title) || title);
		if (author) meta('resource_author', author);
		if (publication) meta('resource_publication', publication);
		if (excerpt) meta('resource_excerpt', excerpt);
		if (cta) meta('resource_cta_text', cta);
		if (linkField) meta('resource_external_url', linkField);
		if (it.sys && it.sys.id) meta('original_id', it.sys.id);
		meta('_thumbnail_id', attachId);
		meta('resource_card_image', attachId);
		meta('_yoast_wpseo_title', metaTitle);
		meta('_yoast_wpseo_metadesc', metaDescription);

		out += '</item>\n';
		out += '<item>\n';
		out += `<title><![CDATA[${title} image]]></title>\n`;
		out += `<link>${escXml(imageUrl)}</link>\n`;
		out += `<pubDate>${now}</pubDate>\n`;
		out += `<dc:creator>admin</dc:creator>\n`;
		out += `<guid isPermaLink="false">attachment-${attachId}</guid>\n`;
		out += `<wp:post_id>${attachId}</wp:post_id>\n`;
		out += `<wp:post_date>${postDate}</wp:post_date>\n`;
		out += `<wp:post_date_gmt>${postDate}</wp:post_date_gmt>\n`;
		out += `<wp:post_status>inherit</wp:post_status>\n`;
		out += `<wp:post_parent>${postId}</wp:post_parent>\n`;
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
	const articleCt = contentTypes.find((ct) => ct.sys?.id === 'articleTemplatePage');
	if (!articleCt) {
		console.error('Article Template Page content type not found');
		process.exit(1);
	}
	const entries = j.entries || [];
	const assets = j.assets || [];
	const assetsMap = {};
	assets.forEach((a) => {
		const id = a.sys && a.sys.id;
		if (!id) return;
		const fileObj = (a.fields && a.fields.file) || null;
		if (!fileObj) {
			for (const k of Object.keys(a.fields || {})) {
				if (a.fields[k] && a.fields[k].file) {
					assetsMap[id] = 'https:' + a.fields[k].file.url;
					break;
				}
			}
		} else {
			const locale = Object.keys(fileObj)[0];
			const file = fileObj[locale];
			if (file && file.url) assetsMap[id] = file.url.startsWith('//') ? 'https:' + file.url : file.url;
		}
	});
	const newsEntries = entries.filter((e) => e.sys && e.sys.contentType && e.sys.contentType.sys && e.sys.contentType.sys.id === (newsCt.sys && newsCt.sys.id));
	const slugMap = {};
	const articleEntries = entries.filter((e) => e.sys && e.sys.contentType && e.sys.contentType.sys && e.sys.contentType.sys.id === (articleCt.sys && articleCt.sys.id));
	articleEntries.forEach((a) => {
		const slug = a.fields && a.fields.slug ? (typeof a.fields.slug === 'object' ? Object.values(a.fields.slug)[0] : a.fields.slug) : null;
		if (slug) slugMap[slug] = a;
	});
	const pressReleases = newsEntries.filter((e) => {
		const typeField = e.fields?.type;
		if (!typeField) return false;
		if (typeof typeField === 'object') {
			const firstVal = Object.values(typeField)[0];
			return typeof firstVal === 'string' && firstVal.includes('Press') && firstVal.includes('Release');
		}
		return false;
	});
	console.error('News contentType:', newsCt.name, newsCt.sys && newsCt.sys.id);
	console.error('Article contentType:', articleCt.name, articleCt.sys && articleCt.sys.id);
	console.error('Total news entries:', newsEntries.length);
	console.error('Article Template Pages found:', articleEntries.length);
	console.error('Press releases found:', pressReleases.length);
	pressReleases.sort((a, b) => new Date(b.sys.updatedAt || b.sys.createdAt) - new Date(a.sys.updatedAt || a.sys.createdAt));
	const wxr = buildWxr(pressReleases, assetsMap, slugMap);
	fs.writeFileSync(OUT, wxr, 'utf8');
	console.log('WXR written to', OUT);
}

run();
