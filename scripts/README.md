# Scripts

AI-powered automation scripts for the Aera Technology WordPress site.
All scripts require a configured `.env` file in the theme root (see `.env.example`).

---

## Setup

1. Copy `.env.example` to `.env` and fill in credentials
2. Run `npm install` from the theme root
3. Make sure the local WordPress site is running (Local by Flywheel)

---

## Available Scripts

### Publish a Content Brief

```bash
npm run publish-brief -- path/to/brief.txt
npm run publish-brief -- --yes              # skip confirmation prompt
```

Takes a text file (content brief, blog draft, etc.), sends it to Claude to classify
the content type and extract structured fields, then creates a WordPress draft with
the correct CPT, title, slug, body content, and ACF fields populated. Prompts for
confirmation before publishing. Sends a Slack notification on success.

**Requires:** `WP_BASE_URL`, `WP_USERNAME`, `WP_APP_PASSWORD`, `ANTHROPIC_API_KEY`, `SLACK_WEBHOOK_URL`

---

### Watch Google Drive for New Content

```bash
npm run watch-drive
```

Polls a Google Drive folder every 15 seconds for new or updated Google Docs.
For each doc, it extracts content from the "Final Blog Post" tab and metadata
from the "Website Metadata" tab, downloads inline and sibling images, classifies
images by filename (Author Banner = card image, Hero Banner = featured image),
uploads everything to WordPress, and creates a draft post. Sends a Slack notification
for each new draft.

State is tracked in `.watch-state.json` (gitignored) to avoid reprocessing.

**Requires:** `WP_BASE_URL`, `WP_USERNAME`, `WP_APP_PASSWORD`, `ANTHROPIC_API_KEY`, `SLACK_WEBHOOK_URL`, `GOOGLE_SERVICE_ACCOUNT_JSON`, `GOOGLE_DRIVE_FOLDER_ID`

---

### SEO Audit

```bash
npm run seo-audit                  # latest 1 published blog post
npm run seo-audit -- 3             # latest 3 published posts
npm run seo-audit -- 3 --draft     # latest 3 draft posts
npm run seo-audit -- 10 --all      # latest 10 posts (any status)
```

Fetches blog posts from the WordPress REST API and runs an AI-powered SEO analysis.
For each post, it checks:

- **Title & slug** -- length, keyword placement, Google truncation risk
- **Meta description** -- quality, length, call-to-action
- **Content structure** -- heading hierarchy (H2/H3), word count (1200+ target), readability
- **Internal linking** -- links to /skills/, /resources/, /demo/, related posts
- **Images** -- inline images present, alt text
- **ACF fields** -- blog_lead, resource_card_title, resource_excerpt, resource_card_image, resource_cta_text

Each post gets a score (1-10) and a prioritized list of the top 3 fixes.

**Requires:** `WP_BASE_URL`, `WP_USERNAME`, `WP_APP_PASSWORD`, `ANTHROPIC_API_KEY`

---

### AEO/GEO Audit

```bash
npm run aeo-audit                  # latest 1 published blog post
npm run aeo-audit -- 3             # latest 3 published posts
npm run aeo-audit -- 3 --draft     # latest 3 draft posts
npm run aeo-audit -- 10 --all      # latest 10 posts (any status)
```

Like the SEO audit but focused on **Answer Engine Optimization** and **Generative Engine
Optimization** -- how well your content performs when AI systems (ChatGPT, Perplexity,
Google AI Overviews, Gemini, Claude) try to discover, understand, and cite it.

Checks:

- **Citability** -- quotable claims, concrete stats, properly attributed data
- **Entity clarity** -- brand/product naming consistency, audience specificity
- **Question targeting** -- headings as questions, direct answers, suggests questions the content should answer
- **Structured data** -- schema markup, lists, bold claims, definition patterns
- **Source authority** -- first-party data, methodology references, specificity of claims
- **Content gaps** -- FAQ sections, comparisons, definitions, TL;DR snippets

Each post gets a score (1-10) and a prioritized list of the top 3 improvements.

**Requires:** `WP_BASE_URL`, `WP_USERNAME`, `WP_APP_PASSWORD`, `ANTHROPIC_API_KEY`

---

### Full Content Audit (SEO + AEO/GEO + Slack)

```bash
npm run content-audit                  # latest 1 published blog post
npm run content-audit -- 3             # latest 3 published posts
npm run content-audit -- 3 --draft     # latest 3 draft posts
npm run content-audit -- 10 --all      # latest 10 posts (any status)
```

Runs both the SEO and AEO/GEO audits **in parallel**, prints both reports to the
terminal, then sends them to Slack as a single formatted message with edit links
for each post.

Reports are truncated to fit Slack's block limits -- full output is always in the terminal.

**Requires:** `WP_BASE_URL`, `WP_USERNAME`, `WP_APP_PASSWORD`, `ANTHROPIC_API_KEY`, `SLACK_WEBHOOK_URL`

---

### Clear Cache

```bash
npm run clear-cache
```

Clears cached data. See `scripts/clear-cache.mjs` for details.
