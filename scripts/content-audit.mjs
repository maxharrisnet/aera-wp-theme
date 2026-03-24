#!/usr/bin/env node
import 'dotenv/config';
import { buildPostSummary, runBothAudits, sendAuditToSlack } from './lib/audit.mjs';

// ── Config ──────────────────────────────────────────────────────────────────
const WP_BASE = process.env.WP_BASE_URL;
const WP_AUTH = 'Basic ' + Buffer.from(`${process.env.WP_USERNAME}:${process.env.WP_APP_PASSWORD}`).toString('base64');
const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK_URL;

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

console.log(`\n📋 Content Audit — fetching ${count} latest ${statusFilter} blog post(s)...\n`);

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

  for (const s of summaries) {
    console.log(`─── ${s.title} ───`);
    console.log(`    Status: ${s.status} | Words: ${s.wordCount} | Stats: ${s.stats.length}`);
    console.log(`    Edit: ${s.editLink}\n`);
  }

  console.log('Running SEO + AEO/GEO audits in parallel...\n');

  const { seoReport, aeoReport } = await runBothAudits(summaries);

  console.log('═══════════════════════════════════════════════════');
  console.log('  SEO AUDIT');
  console.log('═══════════════════════════════════════════════════\n');
  console.log(seoReport);

  console.log('\n═══════════════════════════════════════════════════');
  console.log('  AEO / GEO AUDIT');
  console.log('═══════════════════════════════════════════════════\n');
  console.log(aeoReport);

  await sendAuditToSlack(SLACK_WEBHOOK, summaries, seoReport, aeoReport);
  if (SLACK_WEBHOOK) console.log('📣 Reports sent to Slack.\n');
  else console.log('ℹ️  No SLACK_WEBHOOK_URL configured — skipping Slack.\n');

} catch (err) {
  console.error('Error:', err.message);
  process.exit(1);
}
