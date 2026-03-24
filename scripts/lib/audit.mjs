/**
 * Shared audit logic for SEO and AEO/GEO analysis.
 * Used by seo-audit.mjs, aeo-audit.mjs, content-audit.mjs, and watch-drive.mjs.
 */
import Anthropic from '@anthropic-ai/sdk';

const claude = new Anthropic();

// ── Extraction helpers ──────────────────────────────────────────────────────
export function stripHtml(html) {
  return html.replace(/<[^>]+>/g, '');
}

export function extractHeadings(html) {
  const headings = [];
  const re = /<h([2-6])[^>]*>(.*?)<\/h\1>/gi;
  let m;
  while ((m = re.exec(html))) {
    headings.push({ level: parseInt(m[1]), text: stripHtml(m[2]) });
  }
  return headings;
}

export function countWords(html) {
  return stripHtml(html).split(/\s+/).filter(Boolean).length;
}

export function extractLinks(html) {
  const links = [];
  const re = /<a[^>]+href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi;
  let m;
  while ((m = re.exec(html))) {
    links.push({ url: m[1], text: stripHtml(m[2]) });
  }
  return links;
}

export function extractImages(html) {
  const imgs = [];
  const re = /<img[^>]+>/gi;
  let m;
  while ((m = re.exec(html))) {
    const alt = m[0].match(/alt=["']([^"']*?)["']/i);
    imgs.push({ hasAlt: !!(alt && alt[1].trim()), alt: alt?.[1] || '' });
  }
  return imgs;
}

export function extractLists(html) {
  const ordered = (html.match(/<ol[\s>]/gi) || []).length;
  const unordered = (html.match(/<ul[\s>]/gi) || []).length;
  return { ordered, unordered, total: ordered + unordered };
}

export function extractBoldClaims(html) {
  const claims = [];
  const re = /<strong>(.*?)<\/strong>/gi;
  let m;
  while ((m = re.exec(html))) {
    claims.push(stripHtml(m[1]));
  }
  return claims;
}

export function extractStats(text) {
  const plain = stripHtml(text);
  return plain.match(/\d+[\d,.]*\s*%|\$\d+[\d,.]*[BMK]?|\d+[\d,.]*x\b/gi) || [];
}

export function extractQuestionHeadings(headings) {
  return headings.filter(h =>
    /^(what|why|how|when|where|who|which|can|does|do|is|are|should|will)\b/i.test(h.text) ||
    h.text.endsWith('?')
  );
}

// ── Build post summary from WP API response ─────────────────────────────────
export function buildPostSummary(post, wpBase) {
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
    editLink: `${wpBase}/wp-admin/post.php?post=${post.id}&action=edit`,
  };
}

// ── Prompts ─────────────────────────────────────────────────────────────────
export function seoPrompt(summaries) {
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

export function aeoPrompt(summaries) {
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

// ── Summary prompt (concise, for Slack) ─────────────────────────────────────
function summaryPrompt(summaries) {
  return `You are a content strategist reviewing blog posts for Aera Technology (B2B decision intelligence / supply chain AI).

Give a brief combined SEO + AEO/GEO scorecard for each post. Be direct and concise — this goes to Slack.

For each post, return ONLY:

1. **SEO Score: X/10** — one sentence summary of SEO health
2. **AEO/GEO Score: X/10** — one sentence summary of AI citability
3. **Top recommendations** — 3 to 5 bullet points, strongest recommendations only. Each bullet should be a specific, actionable fix (not a category label). Skip strengths — only what needs to change.

Prefix each score line with a colored circle emoji based on the score:
- 🔴 for 1-3 (poor)
- 🟠 for 4-5 (needs work)
- 🟡 for 6-7 (decent)
- 🟢 for 8-10 (strong)

Example: 🟡 **SEO Score: 6/10** — Title too long, missing internal links.

Keep the entire response under 600 words total across all posts. No headers larger than bold text. No detailed breakdowns or category-by-category analysis.

Here are the posts:

${JSON.stringify(summaries, null, 2)}`;
}

// ── Run audits ──────────────────────────────────────────────────────────────
export async function runSummaryAudit(summaries) {
  const response = await claude.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2048,
    messages: [{ role: 'user', content: summaryPrompt(summaries) }],
  });
  return response.content[0].text;
}

export async function runSeoAudit(summaries) {
  const response = await claude.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [{ role: 'user', content: seoPrompt(summaries) }],
  });
  return response.content[0].text;
}

export async function runAeoAudit(summaries) {
  const response = await claude.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [{ role: 'user', content: aeoPrompt(summaries) }],
  });
  return response.content[0].text;
}

export async function runBothAudits(summaries) {
  const [seoReport, aeoReport] = await Promise.all([
    runSeoAudit(summaries),
    runAeoAudit(summaries),
  ]);
  return { seoReport, aeoReport };
}

// ── Slack formatting ────────────────────────────────────────────────────────
export function truncateForSlack(markdown) {
  let text = markdown
    .replace(/^### (.*)/gm, '*$1*')
    .replace(/^## (.*)/gm, '\n*$1*')
    .replace(/^# (.*)/gm, '\n*$1*')
    .replace(/\*\*(.*?)\*\*/g, '*$1*');

  if (text.length > 2900) {
    text = text.slice(0, 2900) + '\n\n_(truncated — see full report in terminal)_';
  }
  return text;
}

export async function sendSummaryToSlack(webhook, posts, summaryReport) {
  if (!webhook) return;

  const postList = posts.map(p =>
    `\u2022 *${p.title}* (${p.status}, ${p.wordCount} words)\n  <${p.editLink}|Edit in WP>`
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
      type: 'section',
      text: { type: 'mrkdwn', text: truncateForSlack(summaryReport) },
    },
    { type: 'divider' },
    {
      type: 'context',
      elements: [{
        type: 'mrkdwn',
        text: 'Run `npm run content-audit -- --draft` for the full SEO + AEO/GEO breakdown (Slack command coming soon)',
      }],
    },
  ];

  await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ blocks }),
  });
}

export async function sendAuditToSlack(webhook, posts, seoReport, aeoReport) {
  if (!webhook) return;

  const postList = posts.map(p =>
    `\u2022 *${p.title}* (${p.status}, ${p.wordCount} words)\n  <${p.editLink}|Edit in WP>`
  ).join('\n');

  const blocks = [
    {
      type: 'header',
      text: { type: 'plain_text', text: `Full Content Audit: ${posts.length} Blog Post(s)` },
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

  await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ blocks }),
  });
}
