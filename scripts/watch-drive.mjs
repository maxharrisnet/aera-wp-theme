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

The input may include two sections:
1. CONTENT — the full blog post / article text
2. METADATA — a separate tab with title, slug, card content, SEO fields, etc.

If metadata is provided, use it as the authoritative source for title, slug, resource_card_title, resource_excerpt, and any other fields it specifies. The content section is the post body.

Respond with ONLY valid JSON (no markdown, no explanation):
{
  "cpt": "the-cpt-slug",
  "title": "Post title (from metadata if available)",
  "slug": "url-slug (from metadata if available, otherwise derive from title)",
  "content": "HTML body content (only if CPT hasEditor, otherwise empty string)",
  "acf": {
    "field_name": "value",
    ...only include fields that have meaningful content
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
- For resource_excerpt, write a 1-2 sentence summary for card display — but prefer the metadata tab's excerpt if provided
- For resource_card_title, use the metadata tab's card title if provided
- Use clean HTML for content (paragraphs, headers, lists — no inline styles)
- If the metadata tab includes a slug, use it exactly as provided`;

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

// ── Google Drive: recursively find all Google Docs in folder tree ────────────
async function listDocsRecursive(folderId) {
  const allDocs = [];

  // Get Google Docs directly in this folder
  const docsRes = await drive.files.list({
    q: `'${folderId}' in parents and mimeType = 'application/vnd.google-apps.document' and trashed = false`,
    fields: 'files(id, name, modifiedTime)',
    orderBy: 'modifiedTime desc',
    pageSize: 50,
  });
  allDocs.push(...(docsRes.data.files || []));

  // Get subfolders and recurse
  const foldersRes = await drive.files.list({
    q: `'${folderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
    fields: 'files(id, name)',
    pageSize: 50,
  });
  for (const folder of foldersRes.data.files || []) {
    const subDocs = await listDocsRecursive(folder.id);
    for (const doc of subDocs) {
      doc.folderName = doc.folderName || folder.name;
    }
    allDocs.push(...subDocs);
  }

  return allDocs;
}

// ── Google Drive: find image files in the same folder as a doc ───────────────
async function findSiblingImages(docId) {
  const fileRes = await drive.files.get({ fileId: docId, fields: 'parents' });
  const parents = fileRes.data.parents || [];
  if (parents.length === 0) return [];

  const imgRes = await drive.files.list({
    q: `'${parents[0]}' in parents and mimeType contains 'image/' and trashed = false`,
    fields: 'files(id, name, mimeType)',
    pageSize: 20,
  });
  return imgRes.data.files || [];
}

// ── Google Docs: extract inline image object IDs ─────────────────────────────
function extractInlineImageIds(doc) {
  const imageIds = [];

  // Gather all body content arrays (tabs or legacy single body)
  const bodies = [];
  if (doc.tabs) {
    for (const tab of doc.tabs) {
      const content = tab.documentTab?.body?.content;
      if (content) bodies.push(content);
    }
  }
  if (doc.body?.content) bodies.push(doc.body.content);

  for (const bodyContent of bodies) {
    for (const element of bodyContent) {
      if (element.paragraph) {
        for (const run of element.paragraph.elements) {
          if (run.inlineObjectElement) {
            imageIds.push(run.inlineObjectElement.inlineObjectId);
          }
        }
      }
    }
  }
  return imageIds;
}

// ── Download image from Drive file or Docs inline object ─────────────────────
async function downloadDriveFile(fileId) {
  const [res, meta] = await Promise.all([
    drive.files.get({ fileId, alt: 'media' }, { responseType: 'arraybuffer' }),
    drive.files.get({ fileId, fields: 'name, mimeType' }),
  ]);
  return {
    buffer: Buffer.from(res.data),
    name: meta.data.name,
    mimeType: meta.data.mimeType,
  };
}

async function downloadInlineImage(doc, inlineObjectId) {
  // Search top-level and per-tab inlineObjects
  let inlineObject = doc.inlineObjects?.[inlineObjectId];
  if (!inlineObject && doc.tabs) {
    for (const tab of doc.tabs) {
      inlineObject = tab.documentTab?.inlineObjects?.[inlineObjectId];
      if (inlineObject) break;
    }
  }
  if (!inlineObject) return null;

  const embeddedObject = inlineObject.inlineObjectProperties?.embeddedObject;
  if (!embeddedObject) return null;

  const contentUri = embeddedObject.imageProperties?.contentUri;
  if (!contentUri) return null;

  const authClient = await auth.getClient();
  const token = await authClient.getAccessToken();

  const res = await fetch(contentUri, {
    headers: { 'Authorization': `Bearer ${token.token}` },
  });
  if (!res.ok) return null;

  const buffer = Buffer.from(await res.arrayBuffer());
  const contentType = res.headers.get('content-type') || 'image/png';
  const ext = contentType.includes('jpeg') || contentType.includes('jpg') ? 'jpg' : 'png';

  return {
    buffer,
    name: `inline-image-${inlineObjectId.slice(0, 8)}.${ext}`,
    mimeType: contentType,
  };
}

// ── WordPress: upload image to media library ─────────────────────────────────
async function uploadImageToWP(imageData) {
  const blob = new Blob([imageData.buffer], { type: imageData.mimeType });
  const formData = new FormData();
  formData.append('file', blob, imageData.name);

  const res = await fetch(`${WP_BASE}/wp-json/wp/v2/media`, {
    method: 'POST',
    headers: { 'Authorization': WP_AUTH },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(`  Image upload failed (${res.status}):`, err.slice(0, 200));
    return null;
  }

  const media = await res.json();
  return { id: media.id, url: media.source_url };
}

// ── Classify image role by filename ──────────────────────────────────────────
// "Author Banner" or "card" → resource_card_image
// "Hero Banner" or "featured" → WordPress featured image (post thumbnail)
// Everything else → general content image
function classifyImage(filename) {
  const lower = filename.toLowerCase();
  if (lower.includes('author banner') || lower.includes('card')) return 'card';
  if (lower.includes('hero banner') || lower.includes('featured')) return 'featured';
  return 'content';
}

// ── Collect all images for a doc (inline + sibling files in folder) ──────────
async function collectImages(doc, fileId) {
  const result = { card: null, featured: null, content: [] };

  // 1. Inline images embedded in the Google Doc (always "content")
  const inlineIds = extractInlineImageIds(doc);
  for (const objId of inlineIds) {
    const imgData = await downloadInlineImage(doc, objId);
    if (imgData) {
      console.log(`  Uploading inline image: ${imgData.name}`);
      const wp = await uploadImageToWP(imgData);
      if (wp) result.content.push(wp);
    }
  }

  // 2. Image files in the same Drive folder — classify by filename
  const siblings = await findSiblingImages(fileId);
  for (const img of siblings) {
    const role = classifyImage(img.name);
    const imgData = await downloadDriveFile(img.id);
    console.log(`  Uploading ${role} image: ${imgData.name}`);
    const wp = await uploadImageToWP(imgData);
    if (!wp) continue;

    if (role === 'card') result.card = wp;
    else if (role === 'featured') result.featured = wp;
    else result.content.push(wp);
  }

  return result;
}

// ── Google Docs: extract plain text from a body content array ────────────────
function extractTextFromBody(bodyContent) {
  let text = '';
  for (const element of bodyContent) {
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

// ── Google Docs: extract tabs (content + metadata) ──────────────────────────
function extractTabs(doc) {
  const tabs = doc.tabs || [];
  let contentText = '';
  let metadataText = '';

  if (tabs.length === 0) {
    // No tabs — legacy single-body doc
    return {
      contentText: extractTextFromBody(doc.body?.content || []),
      metadataText: '',
    };
  }

  for (const tab of tabs) {
    const title = (tab.tabProperties?.title || '').toLowerCase();
    const body = tab.documentTab?.body?.content || [];
    const text = extractTextFromBody(body);

    if (title.includes('metadata') || title.includes('meta data') || title.includes('meta')) {
      metadataText = text;
    } else {
      // First non-metadata tab is the content (usually "Final Blog Post" or similar)
      if (!contentText) contentText = text;
    }
  }

  return { contentText, metadataText };
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
  if (parsed.slug) body.slug = parsed.slug;

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
  const label = file.folderName ? `${file.folderName}/${file.name}` : file.name;
  console.log(`\n--- Processing: ${label} ---`);

  // Fetch doc content (with tabs support)
  const doc = await docs.documents.get({
    documentId: file.id,
    includeTabsContent: true,
  });
  const { contentText, metadataText } = extractTabs(doc.data);

  if (!contentText || contentText.length < 50) {
    console.log('  Skipped: too short or empty');
    return null;
  }

  console.log(`  Extracted ${contentText.length} chars from content tab`);
  if (metadataText) console.log(`  Extracted ${metadataText.length} chars from metadata tab`);

  // Build the brief for Claude — include both tabs if metadata exists
  let brief = `=== CONTENT ===\n${contentText}`;
  if (metadataText) brief += `\n\n=== METADATA ===\n${metadataText}`;

  // Collect and upload images (inline from doc + sibling files in folder)
  console.log('  Checking for images...');
  const images = await collectImages(doc.data, file.id);
  const imgCount = (images.card ? 1 : 0) + (images.featured ? 1 : 0) + images.content.length;
  console.log(`  Uploaded ${imgCount} image(s)` +
    (images.card ? ` | Card: ${images.card.id}` : '') +
    (images.featured ? ` | Featured: ${images.featured.id}` : ''));

  // Claude analysis
  console.log('  Analyzing with Claude...');
  const parsed = await analyzeBrief(brief);
  if (!parsed) return null;

  console.log(`  CPT: ${parsed.cpt} | Title: ${parsed.title}`);
  if (parsed.slug) console.log(`  Slug: ${parsed.slug}`);
  console.log(`  Reason: ${parsed.reasoning}`);

  // Assign card image (Author Banner) to resource_card_image ACF field
  if (images.card) {
    parsed.acf = parsed.acf || {};
    parsed.acf.resource_card_image = images.card.id;
    console.log(`  Set resource_card_image to media ID ${images.card.id}`);
  }

  // Create WP draft
  console.log('  Creating WordPress draft...');
  const draft = await createDraft(parsed);
  if (!draft) return null;

  // Set featured image (Hero Banner) as post thumbnail
  if (images.featured) {
    const schema = CPT_SCHEMAS[parsed.cpt];
    const thumbRes = await fetch(`${WP_BASE}${schema.endpoint}/${draft.id}`, {
      method: 'POST',
      headers: {
        'Authorization': WP_AUTH,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ featured_media: images.featured.id }),
    });
    if (thumbRes.ok) {
      console.log(`  Set featured image to media ID ${images.featured.id}`);
    } else {
      console.error(`  Failed to set featured image: ${thumbRes.status}`);
    }
  }

  const editUrl = `${WP_BASE}/wp-admin/post.php?post=${draft.id}&action=edit`;
  console.log(`  Draft created! ID: ${draft.id}`);
  console.log(`  Edit: ${editUrl}`);

  // Slack notification
  await notifySlack(
    `New draft from Google Docs:\n*${parsed.title}* (${parsed.cpt})\nSource: ${label}\nEdit: ${editUrl}`
  );
  console.log('  Slack notified');

  return { postId: draft.id, cpt: parsed.cpt, title: parsed.title };
}

// ── Poll loop ───────────────────────────────────────────────────────────────
async function poll() {
  const state = loadState();

  // Recursively scan folder tree for Google Docs (supports subfolders)
  const files = await listDocsRecursive(FOLDER_ID);

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
