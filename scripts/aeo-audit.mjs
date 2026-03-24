#!/usr/bin/env node
import 'dotenv/config';
import Anthropic from '@anthropic-ai/sdk';

// ── Config ──────────────────────────────────────────────────────────────────
const WP_BASE = process.env.WP_BASE_URL;
const WP_AUTH = 'Basic ' + Buffer.from(`${process.env.WP_USERNAME}:${process.env.WP_APP_PASSWORD}`).toString('base64');
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
  const stats = plain.match(/\d+[\d,.]*\s*%|\$\d+[\d,.]*[BMK]?|\d+[\d,.]*x\b/gi) || [];
  return stats;
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

  // Extract first ~200 words as the opening for citability analysis
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
      schema: yoast.schema ? Object.keys(yoast.schema).length > 0 : false,
      schemaTypes: yoast.schema?.['@graph']?.map(s => s['@type']).filter(Boolean) || [],
    },
    acf: {
      blog_lead: acf.blog_lead || null,
      resource_card_title: acf.resource_card_title || null,
      resource_excerpt: acf.resource_excerpt || null,
    },
    editLink: `${WP_BASE}/wp-admin/post.php?post=${post.id}&action=edit`,
  };
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

  const summaries = posts.map(buildPostSummary);

  console.log(`Found ${summaries.length} post(s). Analyzing with Claude...\n`);

  for (const s of summaries) {
    console.log(`─── ${s.title} ───`);
    console.log(`    Status: ${s.status} | Words: ${s.wordCount} | Stats: ${s.stats.length} | Question headings: ${s.questionHeadings.length}`);
    console.log(`    Edit: ${s.editLink}\n`);
  }

  const prompt = `You are an AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization) expert. You specialize in optimizing content so that AI systems — ChatGPT, Perplexity, Google AI Overviews, Gemini, Claude — can discover, understand, and cite it.

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
   - Suggest 3-5 natural-language questions this content SHOULD answer (e.g., "How can AI reduce production waste?")
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

  const response = await claude.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }],
  });

  console.log(response.content[0].text);
  console.log();
} catch (err) {
  console.error('Error:', err.message);
  process.exit(1);
}
