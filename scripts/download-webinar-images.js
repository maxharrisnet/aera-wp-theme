#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const url = require('url');
const vm = require('vm');

const SRC = path.resolve(__dirname, '../_ORIGINAL_FILES/AllResources.js');
const OUTDIR = path.resolve(__dirname, '../_ORIGINAL_FILES/webinar-images');

if (!fs.existsSync(OUTDIR)) fs.mkdirSync(OUTDIR, { recursive: true });

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
	return sandbox.blogs || [];
}

function downloadFile(fileUrl, dest) {
	return new Promise((resolve, reject) => {
		const parsed = url.parse(fileUrl);
		const get = parsed.protocol === 'http:' ? http.get : https.get;
		const req = get(fileUrl, (res) => {
			if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
				// follow redirect
				return resolve(downloadFile(res.headers.location, dest));
			}
			if (res.statusCode !== 200) return reject(new Error('Status ' + res.statusCode));
			const file = fs.createWriteStream(dest);
			res.pipe(file);
			file.on('finish', () => file.close(resolve));
			file.on('error', (err) => reject(err));
		});
		req.on('error', reject);
	});
}

function basenameFromUrl(u) {
	try {
		const p = url.parse(u).pathname || '';
		const base = path.basename(p);
		if (!base) return 'image';
		return base.split('?')[0];
	} catch (e) {
		return 'image';
	}
}

async function run() {
	const src = fs.readFileSync(SRC, 'utf8');
	const arrayText = findArrayText(src, 'const blogs =');
	const blogs = safeEvalArray(arrayText);
	for (let i = 0; i < blogs.length; i++) {
		const b = blogs[i];
		const img = b.image;
		if (!img) continue;
		const name = basenameFromUrl(img);
		const dest = path.join(OUTDIR, `${String(i).padStart(3, '0')}-${name}`);
		if (fs.existsSync(dest)) {
			console.log('exists', dest);
			continue;
		}
		try {
			console.log('download', img, '->', dest);
			// eslint-disable-next-line no-await-in-loop
			await downloadFile(img, dest);
		} catch (e) {
			console.error('failed', img, e.message);
		}
	}
	console.log('done');
}

run().catch((e) => {
	console.error(e);
	process.exit(1);
});
