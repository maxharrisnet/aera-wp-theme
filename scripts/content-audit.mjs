#!/usr/bin/env node
import 'dotenv/config';
import Anthropic from '@anthropic-ai/sdk';

// ── Config ──────────────────────────────────────────────────────────────────
const WP_BASE = process.env.WP_BASE_URL;
const WP_AUTH = 'Basic ' + Buffer.from(`${process.env.WP_USERNAME}:${process.env.WP_APP_PASSWORD}`).toString('base64');
const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK_URL;
const claude = new Anthropic();

// ── Helpers ─────────────────────────────────────────────────────────────────
async function wpFetch(path) {
  const res = await fetch(`${WP_BASE}${path}`, {
    headers: { Authorization: WP_AUTH },
  });
  if (!res.ok) throw new Error(`WP API ${res.status}: ${path}`);
  return res.json();
}

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, '');
}

function extractHeadings(html) {
  const headings = [];
  const re = /<h([2-6])[^>]*>(.*?)<\/h\1>/gi;
  let m;
  while ((m = re.exec(html))) {
    headings.push({ level: parseInt(m[1]), text: stripHtml(m[2]) });
  }
  return headings;
}

function countWords(html) {
  return stripHtml(html).split(/\s+/).filter(Boolean).length;
}

function extractLinks(html) {
  const links = [];
  const re = /<a[^>]+href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi;
  let m;
  while ((m = re.exec(html))) {
    links.push({ url: m[1], text: stripHtml(m[2]) });
  }
  return links;
}

function extractImages(html) {
  const imgs = [];
  const re = /<img[^>]+>/gi;
  let m;
  while ((m = re.exec(html))) {
    const alt = m[0].match(/alt=["']([^"']*?)["']/i);
    imgs.push({ hasAlt: !!(alt && alt[1].trim()), alt: alt?.[1] || '' });
  }
  return imgs;
}

function extractLists(html) {
  const ordered = (html.match(/<ol[\s>]/gi) || []).length;
  const unordered = (html.match(/<ul[\s>]/gi) || []).length;
  return { ordered, unordered, total: ordered + unordered };
}

function extractBoldClaims(html) {
  const claims = [];
  const re = /<strong>(.*?)<\/strong>/gi;
  let m;
  while ((m = re.exec(html))) {
    claims.push(stripHtml(m[1]));
  }
  return claims;
}

function extractStats(text) {
  const plain = stripHtml(text);
  return plain.match(/\d+[\d,.]*\s*%|\$\d+[\d,.]*[BMK]?|\d+[\d,.]*x\b/gi) || [];
}

function extractQuestionHeadings(headings) {
  return headings.filter(h =>
    /^(what|why|how|when|where|who|which|can|does|do|is|are|should|will)\b/i.test(h.text) ||
    h.text.endsWith('?')
  );
}

function buildPostSummary(post) {
  const content = post.content?.raw || post.content?.rendered || '';
  const title = post.title?.raw || post.title?.rendered || '';
  const plainContent = stripHtml(content);
  const yoast = post.yoast_head_json || {};
  const acf = post.acf || {};
  const headings = extractHeadings(content);
  const links = extractLinks(content);
  const images = extractImages(content);
  const wordCount = countWords(content);
  const lists = extractLists(content);
  const boldClaims = extractBoldClaims(content);
  const stats = extractStats(content);
  const questionHeadings = extractQuestionHeadings(headings);
  const openingWords = plainContent.split(/\s+/).slice(0, 200).join(' ');

  return {
    id: post.id,
    status: post.status,
    title,
    slug: post.slug,
    wordCount,
    headings,
    questionHeadings,
    links,
    images,
    lists,
    boldClaims,
    stats,
    openingWords,
    fullContent: plainContent,
    seo: {
      seoTitle: yoast.title || null,
      metaDescription: yoast.description || null,
      ogTitle: yoast.og_title || null,
      ogDescription: yoast.og_description || null,
      ogImage: yoast.og_image?.[0]?.url || null,
      canonical: yoast.canonical || null,
      readingTime: yoast.twitter_misc?.['Est. reading time'] || null,
      schema: yoast.schema ? Object.keys(yoast.schema).length > 0 : false,
      schemaTypes: yoast.schema?.['@graph']?.map(s => s['@type']).filter(Boolean) || [],
    },
    acf: {
      blog_lead: acf.blog_lead || null,
      resource_card_title: acf.resource_card_title || null,
      resource_card_image: acf.resource_card_image || null,
      resource_excerpt: acf.resource_excerpt || null,
      resource_cta_text: acf.resource_cta_text || null,
    },
    featuredMedia: post.featured_media || null,
    editLink: `${WP_BASE}/wp-admin/post.php?post=${post.id}&action=edit`,
  };
}

// ── Prompts ─────────────────────────────────────────────────────────────────
function seoPrompt(summaries) {
  return `You are an SEO expert reviewing blog posts for a B2B enterprise software company (Aera Technology — decision intelligence / supply chain AI).

Analyze these blog posts and provide actionable SEO feedback. For each post, cover:

1. **Title & Slug** — length, keyword placement, truncation risk (Google truncates at ~60 chars for title, ~160 for meta description)
2. **Meta Description** — quality, length, keyword inclusion, call-to-action
3. **Content Structure** — heading hierarchy (H2/H3), word count adequacy (1200+ ideal for B2B), readability
4. **Internal Linking** — are there links? Should there be links to /skills/, /resources/, /demo/, or other blog posts?
5. **Images** — are there inline images? Do they have alt text?
6. **ACF Fields** — is blog_lead filled? resource_card_title set? resource_excerpt compelling? resource_card_image present?
7. **Overall Score** — rate each post 1-10 and list the top 3 priority fixes

Be specific. Reference actual content from the post. Format as markdown.

Here are the posts to analyze:

${JSON.stringify(summaries, null, 2)}`;
}

function aeoPrompt(summaries) {
  return `You are an AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization) expert. You specialize in optimizing content so that AI systems — ChatGPT, Perplexity, Google AI Overviews, Gemini, Claude — can discover, understand, and cite it.

You are reviewing blog posts for Aera Technology, a B2B enterprise software company in decision intelligence and supply chain AI.

Analyze each post across these AEO/GEO dimensions:

1. **Citability Score** — Can an AI confidently quote or paraphrase specific claims from this content? Look for:
   - Clear, self-contained statements that answer a specific question
   - Concrete numbers, percentages, or outcomes (not vague claims)
   - Properly attributed data ("Aera customers achieved X" vs "companies can achieve X")
   - Quotable one-sentence summaries per section

2. **Entity Clarity** — Will AI systems correctly identify what this content is about?
   - Is "Aera" clearly identified as the company/product name?
   - Are product names (Skills, Decision Intelligence) consistently used and defined?
   - Is the target audience explicit (supply chain planners, CPG manufacturers, etc.)?
   - Would an AI confuse this content with a competitor's?

3. **Question Targeting** — Does the content directly answer questions people ask AI?
   - Are headings phrased as questions or clear topic labels?
   - Does the first paragraph under each heading directly answer the implied question?
   - Suggest 3-5 natural-language questions this content SHOULD answer
   - Rate how well the current content answers each suggested question

4. **Structured Data & Formatting** — Can AI systems parse the structure?
   - Schema markup present? (Article, FAQPage, HowTo, etc.)
   - Lists and tables that AI can extract
   - Bold/strong tags marking key claims
   - Clear definition patterns ("X is Y" sentences)

5. **Source Authority Signals** — Will AI systems trust this source?
   - Does the content include first-party data or case study results?
   - Are claims specific ("99% coverage") vs vague ("significant improvement")?
   - Is there a clear author/company authority signal?
   - Does the content reference methodology or how results were measured?

6. **Content Gaps for AI Visibility** — What's missing?
   - FAQ section that AI can directly index
   - Comparison content ("X vs Y", "traditional vs AI-driven")
   - Definition/explainer paragraphs for key terms
   - Summary/TL;DR that AI can use as a snippet

7. **Overall AEO/GEO Score** — Rate 1-10 and list the top 3 priority improvements

For each recommendation, explain WHY it matters for AI citation specifically (not just traditional SEO). Be concrete — provide example rewrites where helpful.

Here are the posts to analyze:

${JSON.stringify(summaries, null, 2)}`;
}

// ── Slack ────────────────────────────────────────────────────────────────────
function truncateForSlack(markdown) {
  let text = markdown
    .replace(/^### (.*)/gm, '*$1*')
    .replace(/^## (.*)/gm, '\n*$1*')
    .replace(/^# (.*)/gm, '\n*$1*')
    .replace(/\*\*(.*?)\*\*/g, '*$1*');

  // Slack section text limit is 3000 chars
  if (text.length > 2900) {
    text = text.slice(0, 2900) + '\n\n_(truncated — see full report in terminal)_';
  }
  return text;
}

async function sendToSlack(posts, seoReport, aeoReport) {
  if (!SLACK_WEBHOOK) {
    console.log('ℹ️  No SLACK_WEBHOOK_URL configured — skipping Slack.\n');
    return;
  }

  const postList = posts.map(p =>
    `• *${p.title}* (${p.status}, ${p.wordCount} words)\n  <${p.editLink}|Edit in WP>`
  ).join('\n');

  const blocks = [
    {
      type: 'header',
      text: { type: 'plain_text', text: `Content Audit: ${posts.length} Blog Post(s)` },
    },
    {
      type: 'section',
      text: { type: 'mrkdwn', text: postList },
    },
    { type: 'divider' },
    {
      type: 'header',
      text: { type: 'plain_text', text: 'SEO Audit' },
    },
    {
      type: 'section',
      text: { type: 'mrkdwn', text: truncateForSlack(seoReport) },
    },
    { type: 'divider' },
    {
      type: 'header',
      text: { type: 'plain_text', text: 'AEO/GEO Audit' },
    },
    {
      type: 'section',
      text: { type: 'mrkdwn', text: truncateForSlack(aeoReport) },
    },
  ];

  await fetch(SLACK_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ blocks }),
  });

  console.log('📣 Reports sent to Slack.\n');
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

  const summaries = posts.map(buildPostSummary);

  for (const s of summaries) {
    console.log(`─── ${s.title} ───`);
    console.log(`    Status: ${s.status} | Words: ${s.wordCount} | Stats: ${s.stats.length}`);
    console.log(`    Edit: ${s.editLink}\n`);
  }

  // Run both audits in parallel
  console.log('Running SEO + AEO/GEO audits in parallel...\n');

  const [seoResponse, aeoResponse] = await Promise.all([
    claude.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [{ role: 'user', content: seoPrompt(summaries) }],
    }),
    claude.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [{ role: 'user', content: aeoPrompt(summaries) }],
    }),
  ]);

  const seoReport = seoResponse.content[0].text;
  const aeoReport = aeoResponse.content[0].text;

  // Print to terminal
  console.log('═══════════════════════════════════════════════════');
  console.log('  SEO AUDIT');
  console.log('═══════════════════════════════════════════════════\n');
  console.log(seoReport);

  console.log('\n═══════════════════════════════════════════════════');
  console.log('  AEO / GEO AUDIT');
  console.log('═══════════════════════════════════════════════════\n');
  console.log(aeoReport);

  // Send to Slack
  await sendToSlack(summaries, seoReport, aeoReport);

} catch (err) {
  console.error('Error:', err.message);
  process.exit(1);
}
