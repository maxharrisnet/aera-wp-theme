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

function buildPostSummary(post) {
  const content = post.content?.raw || post.content?.rendered || '';
  const title = post.title?.raw || post.title?.rendered || '';
  const yoast = post.yoast_head_json || {};
  const acf = post.acf || {};
  const headings = extractHeadings(content);
  const links = extractLinks(content);
  const images = extractImages(content);
  const wordCount = countWords(content);

  return {
    id: post.id,
    status: post.status,
    title,
    slug: post.slug,
    wordCount,
    headings,
    links,
    images,
    seo: {
      seoTitle: yoast.title || null,
      metaDescription: yoast.description || null,
      ogTitle: yoast.og_title || null,
      ogDescription: yoast.og_description || null,
      ogImage: yoast.og_image?.[0]?.url || null,
      canonical: yoast.canonical || null,
      readingTime: yoast.twitter_misc?.['Est. reading time'] || null,
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

// ── Main ────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const count = parseInt(args.find(a => !a.startsWith('--'))) || 1;
const statusFilter = args.includes('--draft') ? 'draft' : args.includes('--all') ? 'any' : 'publish';

console.log(`\n🔍 SEO Audit — fetching ${count} latest ${statusFilter} blog post(s)...\n`);

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
    console.log(`    Status: ${s.status} | Words: ${s.wordCount} | Slug: ${s.slug}`);
    console.log(`    Edit: ${s.editLink}\n`);
  }

  const prompt = `You are an SEO expert reviewing blog posts for a B2B enterprise software company (Aera Technology — decision intelligence / supply chain AI).

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
