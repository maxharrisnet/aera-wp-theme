#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SRC = path.resolve(__dirname, '../_ORIGINAL_FILES/AllResources.js');
const OUT = path.resolve(__dirname, '../_ORIGINAL_FILES/webinars-wxr.xml');

function findArrayText(src, anchor) {
	const idx = src.indexOf(anchor);
	if (idx === -1) throw new Error('anchor not found');
	const start = src.indexOf('[', idx);
	if (start === -1) throw new Error('array start not found');
	let depth = 0;
	for (let i = start; i < src.length; i++) {
		const ch = src[i];
		if (ch === '[') depth++;
		else if (ch === ']') depth--;
		if (depth === 0) return src.slice(start, i + 1);
	}
	throw new Error('matching bracket not found');
}

function safeEvalArray(arrayText) {
	const sandbox = {};
	vm.createContext(sandbox);
	const code = 'blogs = ' + arrayText + ';';
	vm.runInContext(code, sandbox);
	if (!Array.isArray(sandbox.blogs)) throw new Error('evaluated value is not array');
	return sandbox.blogs;
}

function escXml(s) {
	if (s == null) return '';
	return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function buildWxr(blogs) {
	const now = new Date().toUTCString();
	let out = '';
	out += '<?xml version="1.0" encoding="UTF-8"?>\n';
	out += '<rss version="2.0" xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:wfw="http://wellformedweb.org/CommentAPI/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:wp="http://wordpress.org/export/1.2/">\n';
	out += '<channel>\n';
	out += '<title>Webinars Export</title>\n';
	out += '<link>https://your-site.example/</link>\n';
	out += `<wp:wxr_version>1.2</wp:wxr_version>\n`;

	// collect unique taxonomy terms
	const industryTerms = new Map();
	const solutionTerms = new Map();
	const jobTerms = new Map();

	function slugify(s) {
		return String(s)
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/(^-|-$)/g, '')
			.slice(0, 200);
	}

	function parseDateFromString(s) {
		if (!s) return null;
		// try DD-MM-YYYY or D-M-YYYY
		let m = s.match(/(\d{1,2})[-._](\d{1,2})[-._](\d{4})/);
		if (m) {
			const day = String(m[1]).padStart(2, '0');
			const mon = String(m[2]).padStart(2, '0');
			const year = m[3];
			return `${year}-${mon}-${day}`;
		}
		// try YYYY[-_/]MM[-_/]DD
		m = s.match(/(\d{4})[-._](\d{1,2})[-._](\d{1,2})/);
		if (m) {
			const year = m[1];
			const mon = String(m[2]).padStart(2, '0');
			const day = String(m[3]).padStart(2, '0');
			return `${year}-${mon}-${day}`;
		}
		// try month name + day + optional year, e.g., -nov20 or -nov-20-2024
		m = s.match(/(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*[-_]?\.?\s?(\d{1,2})(?:[-._]?(\d{2,4}))?/i);
		if (m) {
			const monthNames = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };
			const mon = String(monthNames[m[1].toLowerCase()] || 1).padStart(2, '0');
			const day = String(m[2]).padStart(2, '0');
			let year = m[3];
			if (!year) year = new Date().getFullYear();
			else if (year.length === 2) {
				const y = parseInt(year, 10);
				year = y > 70 ? '19' + year : '20' + year;
			}
			return `${year}-${mon}-${day}`;
		}
		// fallback: any 4-digit year
		m = s.match(/(19|20)\d{2}/);
		if (m) {
			return `${m[0]}-01-01`;
		}
		return null;
	}

	blogs.forEach((b) => {
		const inds = Array.isArray(b.industry) ? b.industry : b.industry ? [b.industry] : [];
		inds.forEach((v) => {
			if (v) industryTerms.set(v, slugify(v));
		});
		const sols = Array.isArray(b.solutionArea) ? b.solutionArea : b.solutionArea ? [b.solutionArea] : [];
		sols.forEach((v) => {
			if (v) solutionTerms.set(v, slugify(v));
		});
		const jobs = Array.isArray(b.jobFunction) ? b.jobFunction : b.jobFunction ? [b.jobFunction] : [];
		jobs.forEach((v) => {
			if (v) jobTerms.set(v, slugify(v));
		});
	});

	// emit term definitions to help importer create terms
	let termId = 1000;
	const emitTerm = (name, slug, taxonomy) => {
		out += '<wp:term>\n';
		out += `<wp:term_id>${termId++}</wp:term_id>\n`;
		out += `<wp:term_slug>${escXml(slug)}</wp:term_slug>\n`;
		out += `<wp:term_name><![CDATA[${name}]]></wp:term_name>\n`;
		out += `<wp:term_taxonomy><![CDATA[${taxonomy}]]></wp:term_taxonomy>\n`;
		out += '</wp:term>\n';
	};

	industryTerms.forEach((slug, name) => emitTerm(name, slug, 'industry'));
	solutionTerms.forEach((slug, name) => emitTerm(name, slug, 'webinar_solution_area'));
	jobTerms.forEach((slug, name) => emitTerm(name, slug, 'webinar_job_function'));

	// now emit items
	blogs.forEach((b, i) => {
		const postId = 100000 + i;
		const attachId = 200000 + i;
		const title = escXml(b.title || '');
		const link = escXml(b.link || '');
		const image = escXml(b.image || '');
		const industry = Array.isArray(b.industry) ? b.industry : b.industry ? [b.industry] : [];
		const solutionArea = Array.isArray(b.solutionArea) ? b.solutionArea : b.solutionArea ? [b.solutionArea] : [];
		const jobFunction = Array.isArray(b.jobFunction) ? b.jobFunction : b.jobFunction ? [b.jobFunction] : [];

		out += '<item>\n';
		out += `<title>${title}</title>\n`;
		out += `<link>${link}</link>\n`;
		// Use webinarDate (parsed Y-m-d) for item pubDate/post_date when available.
		function ymdToIsoStart(ymd) {
			// Create an ISO datetime at midnight UTC for the given Y-m-d
			return new Date(ymd + 'T00:00:00Z').toISOString();
		}
		function ymdToRfc1123(ymd) {
			return new Date(ymd + 'T00:00:00Z').toUTCString();
		}

		const parsed = parseDateFromString(b.link || b.title || '');
		const webinarDate = parsed || new Date().toISOString().slice(0, 10);
		const itemPub = webinarDate ? ymdToRfc1123(webinarDate) : now;
		out += `<pubDate>${itemPub}</pubDate>\n`;
		out += `<dc:creator>admin</dc:creator>\n`;
		out += `<guid isPermaLink="false">webinar-${b.id || i}</guid>\n`;
		const content = `- Original link: <a href="${link}">${link}</a><br/><img src=\"${image}\" alt=\"${escXml(b.title)}\" />`;
		out += `<content:encoded><![CDATA[${content}]]></content:encoded>\n`;
		out += `<wp:post_id>${postId}</wp:post_id>\n`;
		const postIso = webinarDate ? ymdToIsoStart(webinarDate) : new Date().toISOString();
		out += `<wp:post_date>${postIso}</wp:post_date>\n`;
		out += `<wp:post_date_gmt>${postIso}</wp:post_date_gmt>\n`;
		out += `<wp:comment_status>closed</wp:comment_status>\n`;
		out += `<wp:ping_status>closed</wp:ping_status>\n`;
		out += `<wp:post_name>${escXml(
			(b.title || '')
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/(^-|-$)/g, '')
		)}</wp:post_name>\n`;
		out += `<wp:status>publish</wp:status>\n`;
		out += `<wp:post_type>webinar</wp:post_type>\n`;

		// taxonomy category entries
		industry.forEach((name) => {
			const slug = slugify(name);
			out += `<category domain="industry" nicename="${escXml(slug)}">${escXml(name)}</category>\n`;
		});
		solutionArea.forEach((name) => {
			const slug = slugify(name);
			out += `<category domain="webinar_solution_area" nicename="${escXml(slug)}">${escXml(name)}</category>\n`;
		});
		jobFunction.forEach((name) => {
			const slug = slugify(name);
			out += `<category domain="webinar_job_function" nicename="${escXml(slug)}">${escXml(name)}</category>\n`;
		});

		// custom fields (keep originals for compatibility)
		function meta(key, value) {
			out += `<wp:postmeta>\n<wp:meta_key>${escXml(key)}</wp:meta_key>\n<wp:meta_value><![CDATA[${value}]]></wp:meta_value>\n</wp:postmeta>\n`;
		}

		if (link) {
			meta('original_link', link);
			meta('resource_external_url', link);
		}
		if (image) meta('image_url', image);
		if (industry && industry.length) meta('industry', industry.join(', '));
		if (solutionArea && solutionArea.length) meta('solution_area', solutionArea.join(', '));
		if (jobFunction && jobFunction.length) meta('job_function', jobFunction.join(', '));

		// add webinar_date meta: attempt to parse from link/title, else use today's date
		// webinarDate already parsed above; ensure meta is set.
		if (webinarDate) meta('webinar_date', webinarDate);

		// set featured image relation: will point to attachment created below
		if (image) meta('_thumbnail_id', attachId);
		// also set ACF image fields to attachment id so ACF will return arrays after import
		if (image) {
			meta('resource_card_image', attachId);
		}

		out += '</item>\n';

		// Emit attachment item so WP importer will fetch the image and create media
		if (image) {
			out += '<item>\n';
			out += `<title>${escXml((b.title || '') + ' - image')}</title>\n`;
			out += `<link>${image}</link>\n`;
			const attachPub = webinarDate ? ymdToRfc1123(webinarDate) : now;
			out += `<pubDate>${attachPub}</pubDate>\n`;
			out += `<dc:creator>admin</dc:creator>\n`;
			out += `<guid isPermaLink="false">attachment-${attachId}</guid>\n`;
			out += `<wp:post_id>${attachId}</wp:post_id>\n`;
			out += `<wp:post_date>${postIso}</wp:post_date>\n`;
			out += `<wp:post_date_gmt>${postIso}</wp:post_date_gmt>\n`;
			out += `<wp:comment_status>closed</wp:comment_status>\n`;
			out += `<wp:ping_status>closed</wp:ping_status>\n`;
			out += `<wp:post_name>${escXml('attachment-' + (b.id || i))}</wp:post_name>\n`;
			out += `<wp:status>inherit</wp:status>\n`;
			out += `<wp:post_parent>${postId}</wp:post_parent>\n`;
			out += `<wp:post_type>attachment</wp:post_type>\n`;
			out += `<wp:attachment_url>${image}</wp:attachment_url>\n`;
			out += '</item>\n';
		}
	});

	out += '</channel>\n</rss>\n';
	return out;
}

function run() {
	const src = fs.readFileSync(SRC, 'utf8');
	const arrayText = findArrayText(src, 'const blogs =');
	const blogs = safeEvalArray(arrayText);
	const wxr = buildWxr(blogs);
	fs.writeFileSync(OUT, wxr, 'utf8');
	console.log('WXR written to', OUT);
}

run();
