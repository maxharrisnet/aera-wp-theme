#!/usr/bin/env node
import 'dotenv/config';
import Anthropic from '@anthropic-ai/sdk';
import { readFileSync } from 'fs';
import { createInterface } from 'readline';

// ── Config ──────────────────────────────────────────────────────────────────
const WP_BASE = process.env.WP_BASE_URL;
const WP_AUTH = 'Basic ' + Buffer.from(`${process.env.WP_USERNAME}:${process.env.WP_APP_PASSWORD}`).toString('base64');
const claude = new Anthropic();

// ── CPT schemas (tells Claude what fields each CPT expects) ─────────────────
const CPT_SCHEMAS = {
  blog: {
    endpoint: '/wp-json/wp/v2/blog',
    acf: ['blog_lead', 'resource_card_title', 'resource_card_image', 'resource_excerpt', 'resource_cta_text', 'resource_external_url', 'resource_coming_soon'],
    hasEditor: true,
  },
  'press-release': {
    endpoint: '/wp-json/wp/v2/press-release',
    acf: ['press_release_publication', 'press_release_logo', 'resource_card_title', 'resource_excerpt', 'resource_external_url'],
    hasEditor: true,
  },
  'case-study': {
    endpoint: '/wp-json/wp/v2/case-study',
    acf: [
      'case_study_type', 'case_study_company_type', 'case_study_icon', 'case_study_employees',
      'case_study_revenue', 'case_study_business_problem', 'case_study_business_statement',
      'case_study_company_name', 'case_study_industry', 'case_study_featured_image',
      'case_study_body_copy', 'case_study_business_need', 'case_study_short_solution',
      'case_study_short_result', 'case_study_challenges', 'case_study_solution',
      'case_study_results', 'case_study_top_quote', 'case_study_quote',
      'resource_card_title', 'resource_excerpt',
    ],
    hasEditor: false,
  },
  whitepaper: {
    endpoint: '/wp-json/wp/v2/whitepaper',
    acf: ['whitepaper_hubspot_form', 'resource_card_title', 'resource_excerpt', 'resource_external_url'],
    hasEditor: false,
  },
  news: {
    endpoint: '/wp-json/wp/v2/news',
    acf: ['resource_card_title', 'resource_excerpt', 'resource_external_url'],
    hasEditor: false,
  },
  video: {
    endpoint: '/wp-json/wp/v2/video',
    acf: ['video_type', 'video_tags', 'video_url', 'resource_card_title', 'resource_excerpt'],
    hasEditor: false,
  },
  podcast: {
    endpoint: '/wp-json/wp/v2/podcast',
    acf: ['podcast_type', 'podcast_tags', 'podcast_video', 'resource_card_title', 'resource_excerpt'],
    hasEditor: false,
  },
  report: {
    endpoint: '/wp-json/wp/v2/report',
    acf: ['resource_card_title', 'resource_excerpt', 'resource_external_url'],
    hasEditor: false,
  },
};

// ── System prompt for Claude ────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are a content analyst for Aera Technology's WordPress site.
Given a content brief, determine the best Custom Post Type and extract structured fields.

Available CPTs and their ACF fields:
${Object.entries(CPT_SCHEMAS).map(([slug, s]) => `- ${slug}: ACF fields: ${s.acf.join(', ')}. ${s.hasEditor ? 'Has post body editor.' : 'No post body — use ACF fields only.'}`).join('\n')}

Respond with ONLY valid JSON (no markdown, no explanation):
{
  "cpt": "the-cpt-slug",
  "title": "Post title",
  "content": "HTML body content (only if CPT hasEditor, otherwise empty string)",
  "acf": {
    "field_name": "value",
    ...only include fields that have meaningful content from the brief
  },
  "reasoning": "One sentence explaining why you chose this CPT"
}

Guidelines:
- Blog posts are thought leadership, how-to, or opinion pieces
- Press releases are official company announcements
- Case studies describe a customer's problem, solution with Aera, and results
- News items are third-party coverage (external links)
- Whitepapers are gated downloadable assets
- Videos and podcasts are media content
- Reports are research/analyst reports
- For blog posts, extract a compelling lead paragraph for blog_lead
- For resource_excerpt, write a 1-2 sentence summary for card display
- For resource_card_title, only set if a shorter card-friendly title differs from the main title
- Use clean HTML for content (paragraphs, headers, lists — no inline styles)`;

// ── Claude: analyze brief ───────────────────────────────────────────────────
async function analyzeBrief(brief) {
  console.log('\n🔍 Analyzing brief with Claude...\n');

  const msg = await claude.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2000,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: brief }],
  });

  const text = msg.content[0].text;
  try {
    return JSON.parse(text);
  } catch {
    console.error('Claude returned invalid JSON:', text);
    process.exit(1);
  }
}

// ── WordPress: create draft ─────────────────────────────────────────────────
async function createDraft(parsed) {
  const schema = CPT_SCHEMAS[parsed.cpt];
  if (!schema) {
    console.error(`Unknown CPT: ${parsed.cpt}`);
    process.exit(1);
  }

  // Fetch a default placeholder image for required image fields
  const acf = { ...parsed.acf };
  if (schema.acf.includes('resource_card_image') && !acf.resource_card_image) {
    const mediaRes = await fetch(`${WP_BASE}/wp-json/wp/v2/media?per_page=1`, {
      headers: { 'Authorization': WP_AUTH },
    });
    if (mediaRes.ok) {
      const [img] = await mediaRes.json();
      if (img) acf.resource_card_image = img.id;
    }
  }

  const body = {
    title: parsed.title,
    content: parsed.content || '',
    status: 'draft',
    acf,
  };

  const url = `${WP_BASE}${schema.endpoint}`;
  console.log(`📤 Creating draft at ${url}...\n`);

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': WP_AUTH,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => res.statusText);
    console.error(`WordPress API error (${res.status}):`, JSON.stringify(err, null, 2));
    process.exit(1);
  }

  return res.json();
}

// ── WordPress: publish ──────────────────────────────────────────────────────
async function publishPost(cpt, postId) {
  const schema = CPT_SCHEMAS[cpt];
  const url = `${WP_BASE}${schema.endpoint}/${postId}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': WP_AUTH,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status: 'publish' }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => res.statusText);
    console.error(`Publish error (${res.status}):`, JSON.stringify(err, null, 2));
    process.exit(1);
  }

  return res.json();
}

// ── Slack notification ──────────────────────────────────────────────────────
async function notifySlack(title, url, cpt) {
  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (!webhook) {
    console.log('ℹ️  No SLACK_WEBHOOK_URL configured — skipping notification.\n');
    return;
  }

  await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: `✅ Published: *${title}* (${cpt})\n${url}`,
    }),
  });
  console.log('📣 Slack notification sent.\n');
}

// ── User prompt helper ──────────────────────────────────────────────────────
const rl = createInterface({ input: process.stdin, output: process.stdout });

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim().toLowerCase());
    });
  });
}

// ── Main ────────────────────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);
  const autoYes = args.includes('--yes');
  const filePath = args.find(a => !a.startsWith('--'));

  // Read brief from file arg or stdin
  let brief;
  if (filePath) {
    brief = readFileSync(filePath, 'utf-8');
    console.log(`📄 Read brief from: ${filePath}`);
  } else {
    console.log('Paste your content brief below (press Ctrl+D when done):\n');
    brief = readFileSync('/dev/stdin', 'utf-8');
  }

  if (!brief.trim()) {
    console.error('Empty brief. Provide a file path or paste content via stdin.');
    process.exit(1);
  }

  // Step 1: Claude analyzes the brief
  const parsed = await analyzeBrief(brief);

  console.log(`  CPT:    ${parsed.cpt}`);
  console.log(`  Title:  ${parsed.title}`);
  console.log(`  Reason: ${parsed.reasoning}`);
  if (parsed.acf) {
    const fields = Object.keys(parsed.acf).filter(k => parsed.acf[k]);
    console.log(`  ACF:    ${fields.join(', ') || '(none)'}`);
  }

  // Step 2: Confirm and create draft
  const proceed = autoYes ? 'y' : await ask('\nCreate draft? (y/n) ');
  if (proceed !== 'y') {
    console.log('Cancelled.');
    process.exit(0);
  }

  const draft = await createDraft(parsed);
  const editUrl = `${WP_BASE}/wp-admin/post.php?post=${draft.id}&action=edit`;

  console.log(`\n✅ Draft created!`);
  console.log(`  ID:     ${draft.id}`);
  console.log(`  Edit:   ${editUrl}`);
  if (draft.link) console.log(`  Preview: ${draft.link}`);

  // Step 3: Offer to publish
  const pub = autoYes ? 'y' : await ask('\nPublish now? (y/n) ');
  if (pub === 'y') {
    const published = await publishPost(parsed.cpt, draft.id);
    console.log(`\n🚀 Published!`);
    console.log(`  URL: ${published.link}`);
    await notifySlack(parsed.title, published.link, parsed.cpt);
  } else {
    console.log(`\nLeft as draft. Edit at: ${editUrl}`);
  }
}

main().catch((err) => {
  console.error('Fatal error:', err.message);
  process.exit(1);
}).finally(() => rl.close());
