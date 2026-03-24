#!/usr/bin/env node
import 'dotenv/config';
import { buildPostSummary, runAeoAudit } from './lib/audit.mjs';

// ── Config ──────────────────────────────────────────────────────────────────
const WP_BASE = process.env.WP_BASE_URL;
const WP_AUTH = 'Basic ' + Buffer.from(`${process.env.WP_USERNAME}:${process.env.WP_APP_PASSWORD}`).toString('base64');

async function wpFetch(path) {
  const res = await fetch(`${WP_BASE}${path}`, {
    headers: { Authorization: WP_AUTH },
  });
  if (!res.ok) throw new Error(`WP API ${res.status}: ${path}`);
  return res.json();
}

// ── Main ────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const count = parseInt(args.find(a => !a.startsWith('--'))) || 1;
const statusFilter = args.includes('--draft') ? 'draft' : args.includes('--all') ? 'any' : 'publish';

console.log(`\n🤖 AEO/GEO Audit — fetching ${count} latest ${statusFilter} blog post(s)...\n`);

try {
  const statusParam = statusFilter === 'any' ? 'draft,publish' : statusFilter;
  const posts = await wpFetch(
    `/wp-json/wp/v2/blog?status=${statusParam}&orderby=date&order=desc&per_page=${count}&context=edit`
  );

  if (!posts.length) {
    console.log('No blog posts found matching that filter.');
    process.exit(0);
  }

  const summaries = posts.map(p => buildPostSummary(p, WP_BASE));

  console.log(`Found ${summaries.length} post(s). Analyzing with Claude...\n`);

  for (const s of summaries) {
    console.log(`─── ${s.title} ───`);
    console.log(`    Status: ${s.status} | Words: ${s.wordCount} | Stats: ${s.stats.length} | Question headings: ${s.questionHeadings.length}`);
    console.log(`    Edit: ${s.editLink}\n`);
  }

  const report = await runAeoAudit(summaries);
  console.log(report);
  console.log();
} catch (err) {
  console.error('Error:', err.message);
  process.exit(1);
}
