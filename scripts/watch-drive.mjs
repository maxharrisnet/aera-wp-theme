#!/usr/bin/env node
import 'dotenv/config';
import { google } from 'googleapis';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import Anthropic from '@anthropic-ai/sdk';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Config ──────────────────────────────────────────────────────────────────
const WP_BASE = process.env.WP_BASE_URL;
const WP_AUTH = 'Basic ' + Buffer.from(`${process.env.WP_USERNAME}:${process.env.WP_APP_PASSWORD}`).toString('base64');
const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;
const KEY_FILE = resolve(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
const POLL_INTERVAL = parseInt(process.env.POLL_INTERVAL || '15000', 10); // 15s default
const STATE_FILE = resolve(__dirname, '.watch-state.json');

const claude = new Anthropic();

// ── Google Auth ─────────────────────────────────────────────────────────────
const auth = new google.auth.GoogleAuth({
  keyFile: KEY_FILE,
  scopes: [
    'https://www.googleapis.com/auth/drive.readonly',
    'https://www.googleapis.com/auth/documents.readonly',
  ],
});
const drive = google.drive({ version: 'v3', auth });
const docs = google.docs({ version: 'v1', auth });

// ── CPT schemas (same as publish.mjs) ──────────────────────────────────────
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

// ── State: track which docs we've already processed ─────────────────────────
function loadState() {
  if (existsSync(STATE_FILE)) {
    return JSON.parse(readFileSync(STATE_FILE, 'utf-8'));
  }
  return { processed: {} };
}

function saveState(state) {
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

// ── Google Docs: extract plain text ─────────────────────────────────────────
function extractText(doc) {
  let text = '';
  for (const element of doc.body.content) {
    if (element.paragraph) {
      for (const run of element.paragraph.elements) {
        if (run.textRun) {
          text += run.textRun.content;
        }
      }
    }
    if (element.table) {
      for (const row of element.table.tableRows) {
        for (const cell of row.tableCells) {
          for (const cellElement of cell.content) {
            if (cellElement.paragraph) {
              for (const run of cellElement.paragraph.elements) {
                if (run.textRun) {
                  text += run.textRun.content + '\t';
                }
              }
            }
          }
        }
        text += '\n';
      }
    }
  }
  return text.trim();
}

// ── Claude: analyze brief ───────────────────────────────────────────────────
async function analyzeBrief(brief) {
  const msg = await claude.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: brief }],
  });

  let text = msg.content[0].text;
  // Strip markdown code fences if present
  text = text.replace(/^```(?:json)?\s*\n?/i, '').replace(/\n?```\s*$/i, '');
  try {
    return JSON.parse(text);
  } catch {
    console.error('  Claude returned invalid JSON:', text.slice(0, 200));
    return null;
  }
}

// ── WordPress: create draft ─────────────────────────────────────────────────
async function createDraft(parsed) {
  const schema = CPT_SCHEMAS[parsed.cpt];
  if (!schema) {
    console.error(`  Unknown CPT: ${parsed.cpt}`);
    return null;
  }

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
    console.error(`  WP API error (${res.status}):`, JSON.stringify(err));
    return null;
  }

  return res.json();
}

// ── Slack notification ──────────────────────────────────────────────────────
async function notifySlack(message) {
  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (!webhook) return;

  await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: message }),
  });
}

// ── Process a single Google Doc ─────────────────────────────────────────────
async function processDoc(file) {
  console.log(`\n--- Processing: ${file.name} ---`);

  // Fetch doc content
  const doc = await docs.documents.get({ documentId: file.id });
  const text = extractText(doc.data);

  if (!text || text.length < 50) {
    console.log('  Skipped: too short or empty');
    return null;
  }

  console.log(`  Extracted ${text.length} chars from Google Doc`);

  // Claude analysis
  console.log('  Analyzing with Claude...');
  const parsed = await analyzeBrief(text);
  if (!parsed) return null;

  console.log(`  CPT: ${parsed.cpt} | Title: ${parsed.title}`);
  console.log(`  Reason: ${parsed.reasoning}`);

  // Create WP draft
  console.log('  Creating WordPress draft...');
  const draft = await createDraft(parsed);
  if (!draft) return null;

  const editUrl = `${WP_BASE}/wp-admin/post.php?post=${draft.id}&action=edit`;
  console.log(`  Draft created! ID: ${draft.id}`);
  console.log(`  Edit: ${editUrl}`);

  // Slack notification
  await notifySlack(
    `New draft from Google Docs:\n*${parsed.title}* (${parsed.cpt})\nSource: ${file.name}\nEdit: ${editUrl}`
  );
  console.log('  Slack notified');

  return { postId: draft.id, cpt: parsed.cpt, title: parsed.title };
}

// ── Poll loop ───────────────────────────────────────────────────────────────
async function poll() {
  const state = loadState();

  const res = await drive.files.list({
    q: `'${FOLDER_ID}' in parents and mimeType = 'application/vnd.google-apps.document' and trashed = false`,
    fields: 'files(id, name, modifiedTime)',
    orderBy: 'modifiedTime desc',
    pageSize: 20,
  });

  const files = res.data.files || [];

  for (const file of files) {
    const prev = state.processed[file.id];

    // Skip if already processed and not modified since
    if (prev && prev.modifiedTime === file.modifiedTime) {
      continue;
    }

    try {
      const result = await processDoc(file);
      if (result) {
        state.processed[file.id] = {
          modifiedTime: file.modifiedTime,
          postId: result.postId,
          cpt: result.cpt,
          title: result.title,
          processedAt: new Date().toISOString(),
        };
        saveState(state);
      }
    } catch (err) {
      console.error(`  Error processing ${file.name}:`, err.message);
    }
  }
}

// ── Main ────────────────────────────────────────────────────────────────────
async function main() {
  console.log('Aera AI Publisher — Google Drive Watcher');
  console.log(`Watching folder: ${FOLDER_ID}`);
  console.log(`Poll interval: ${POLL_INTERVAL / 1000}s`);
  console.log('Press Ctrl+C to stop.\n');

  // Initial poll
  await poll();

  // Continue polling
  setInterval(async () => {
    try {
      await poll();
    } catch (err) {
      console.error('Poll error:', err.message);
    }
  }, POLL_INTERVAL);
}

main().catch((err) => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
