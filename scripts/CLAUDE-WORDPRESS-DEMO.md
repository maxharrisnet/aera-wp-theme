# CLAUDE.md — Acme Digital WordPress Demo Site

## Project Context

This is a demo/staging WordPress site for **Acme Digital**, a fictional SaaS company used to
showcase an AI-powered marketing automation system. The site demonstrates how Claude AI can
automate content operations across WordPress, Slack, Google Drive, Figma, and HubSpot.

The site is hosted on a subdomain of the developer's portfolio. It receives content from an
external pipeline (Google Drive → Claude AI → WordPress REST API) and serves as the publishing
endpoint for automated content workflows.

**This is NOT a production site for a real company.** All content, branding, and data are
fictional. The purpose is to demonstrate the automation capabilities to potential clients.

---

## WordPress Configuration

### Starter Theme Setup

This site uses a custom starter theme. The following CPTs, ACF fields, and taxonomies must be
registered. If they don't exist in the starter theme, **create them**.

### Custom Post Types (CPTs)

Each content type is its own CPT (there is NO unified `resource` CPT).
All must have `show_in_rest: true` for REST API access.

Register these in `inc/post-types.php` or equivalent:

| CPT Slug        | Label          | Has Editor | Rewrite Slug       | Notes                             |
| --------------- | -------------- | ---------- | ------------------ | --------------------------------- |
| `blog`          | Blogs          | Yes        | `blogs`            | Primary content type for demo     |
| `press-release` | Press Releases | Yes        | `news`             | Official announcements            |
| `case-study`    | Case Studies   | No         | `case-study`       | Customer stories (~18 ACF fields) |
| `whitepaper`    | Whitepapers    | No         | `whitepapers`      | Gated downloads (HubSpot forms)   |
| `news`          | News           | No         | `news-coverage`    | External links only, no single    |
| `video`         | Videos         | No         | `videos`           | External links only, no single    |
| `podcast`       | Podcasts       | No         | `podcasts`         | External links only, no single    |
| `report`        | Reports        | No         | `reports`          | External links only, no single    |

CPT registration example:

```php
register_post_type('blog', [
    'labels' => ['name' => 'Blogs', 'singular_name' => 'Blog'],
    'public' => true,
    'has_archive' => true,
    'rewrite' => ['slug' => 'blogs'],
    'show_in_rest' => true,  // REQUIRED for API access
    'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'author'],
    'menu_icon' => 'dashicons-edit',
]);
```

For CPTs without editor (case-study, whitepaper, news, video, podcast, report), remove
`'editor'` from the `supports` array. Content lives entirely in ACF fields.

### ACF Field Groups

ACF Pro must be installed. All field groups must have `show_in_rest: 1` enabled so fields
appear under `acf: {}` in REST API responses.

If field groups don't exist, create them via ACF admin UI or register via PHP/JSON.

#### Resource Card Fields (shared — apply to ALL resource CPTs)

Field group: `group_resource_fields`
Location rule: Post Type == blog OR press-release OR case-study OR whitepaper OR news OR video OR podcast OR report

| Field Name              | Type       | Required | Notes                                        |
| ----------------------- | ---------- | -------- | -------------------------------------------- |
| `resource_card_title`   | text       | No       | Short card title (falls back to post title)  |
| `resource_card_image`   | image      | Yes*     | Card thumbnail (returns attachment ID)       |
| `resource_excerpt`      | textarea   | No       | 1-2 sentence card summary for listings       |
| `resource_cta_text`     | text       | No       | CTA button text (e.g., "Read", "Watch")      |
| `resource_external_url` | text       | No       | External link (overrides permalink)          |
| `resource_coming_soon`  | true_false | No       | Marks item as "Coming Soon"                  |

*`resource_card_image` is required on blog CPT. The automation pipeline uploads and assigns this.

#### Case Study Fields

Field group: `group_case_study`
Location rule: Post Type == case-study

| Field Name                      | Type     | Notes                     |
| ------------------------------- | -------- | ------------------------- |
| `case_study_type`               | text     | Default: "Case Study"     |
| `case_study_company_type`       | text     | e.g., "Enterprise SaaS"  |
| `case_study_icon`               | image    | Company logo/icon         |
| `case_study_employees`          | text     | Employee count/range      |
| `case_study_revenue`            | text     | Revenue range             |
| `case_study_business_problem`   | textarea | Card display problem text |
| `case_study_business_statement` | text     | Card tagline              |
| `case_study_company_name`       | text     | Company name              |
| `case_study_industry`           | text     | Industry                  |
| `case_study_featured_image`     | image    | Page hero image           |
| `case_study_body_copy`          | wysiwyg  | Main intro text           |
| `case_study_business_need`      | wysiwyg  | Business need section     |
| `case_study_short_solution`     | wysiwyg  | Brief solution summary    |
| `case_study_short_result`       | wysiwyg  | Brief results summary     |
| `case_study_challenges`         | wysiwyg  | Challenges section        |
| `case_study_solution`           | wysiwyg  | Full solution section     |
| `case_study_results`            | wysiwyg  | Full results section      |
| `case_study_top_quote`          | wysiwyg  | Featured quote            |
| `case_study_quote`              | wysiwyg  | Additional quote          |

#### Whitepaper Fields

Field group: `group_whitepaper`
Location rule: Post Type == whitepaper

| Field Name                | Type | Notes                              |
| ------------------------- | ---- | ---------------------------------- |
| `whitepaper_hubspot_form` | text | HubSpot form ID for gated download |

#### Video Fields

Field group: `group_video`
Location rule: Post Type == video

| Field Name   | Type     | Notes                   |
| ------------ | -------- | ----------------------- |
| `video_type` | text     | Category/type           |
| `video_tags` | textarea | Tags (one per line)     |
| `video_url`  | url      | YouTube/Vimeo embed URL |

#### Podcast Fields

Field group: `group_podcast`
Location rule: Post Type == podcast

| Field Name     | Type     | Notes                   |
| -------------- | -------- | ----------------------- |
| `podcast_type` | text     | Category/type           |
| `podcast_tags` | textarea | Tags (one per line)     |
| `podcast_video`| url      | YouTube/Vimeo embed URL |

#### Press Release Fields

Field group: `group_press_release`
Location rule: Post Type == press-release

| Field Name                  | Type  | Notes              |
| --------------------------- | ----- | ------------------ |
| `press_release_publication` | text  | Publication name   |
| `press_release_logo`        | image | Publication logo   |

### WordPress Excerpt vs. ACF resource_excerpt

These are **two different things** — both are used:

- **`excerpt`** (WP core field) → Yoast SEO uses this as the meta description. Set via
  `excerpt` in the REST API POST body. Should be ~155 characters, optimized for search.
- **`resource_excerpt`** (ACF field) → Displayed on resource listing cards. Can be longer,
  written for human scanning, not SEO.

The automation pipeline populates both separately.

### Users / Authors

The pipeline resolves author names from Google Docs to WordPress users via
`GET /wp-json/wp/v2/users?search={name}`. Create WordPress users for common authors.

Recommended demo users:
- Admin account (for API access)
- 2-3 fictional author accounts (e.g., "Sarah Chen", "Marcus Rivera", "Emily Nakamura")

---

## REST API Reference

**Base URL:** `https://{your-subdomain}/wp-json/wp/v2/`

### Endpoints (one per CPT)

```
POST /wp-json/wp/v2/blog           — Create blog post
POST /wp-json/wp/v2/press-release  — Create press release
POST /wp-json/wp/v2/case-study     — Create case study
POST /wp-json/wp/v2/whitepaper     — Create whitepaper
POST /wp-json/wp/v2/news           — Create news item
POST /wp-json/wp/v2/video          — Create video
POST /wp-json/wp/v2/podcast        — Create podcast
POST /wp-json/wp/v2/report         — Create report
POST /wp-json/wp/v2/media          — Upload image (multipart/form-data)
GET  /wp-json/wp/v2/users?search=  — Search users by name
```

### Example POST body (blog)

```json
{
  "title": "Post Title",
  "content": "<p>HTML body content</p>",
  "excerpt": "SEO meta description for Yoast (~155 chars)",
  "status": "draft",
  "slug": "post-slug",
  "author": 2,
  "featured_media": 45,
  "acf": {
    "resource_card_title": "Short Card Title",
    "resource_card_image": 44,
    "resource_excerpt": "Card summary text for listings",
    "resource_cta_text": "Read More"
  }
}
```

### Authentication

Application Password via Basic Auth:
```
Authorization: Basic base64(username:app_password)
```

### Known Gotchas

- WordPress may return PHP warnings (HTML) before JSON — parse response as text, find first `{`
- Image ACF fields store attachment IDs (integers), not URLs
- `slug` should NOT include CPT prefix (use `my-post` not `blogs/my-post`)
- All posts must be created as `status: draft` first, then published separately
- `resource_card_image` is required on blog — must be a valid attachment ID (not 0)
- `featured_media` (Hero Banner) and `resource_card_image` (Card image) are different images

---

## Google Drive Image Convention

The pipeline classifies images by filename (case-insensitive):
- Contains "Author Banner" or "card" → `resource_card_image` ACF field
- Contains "Hero Banner" or "featured" → `featured_media` (WP featured image)
- Other images → uploaded to media library only

---

## Recommended Plugins

| Plugin                     | Purpose                                  |
| -------------------------- | ---------------------------------------- |
| Advanced Custom Fields Pro | Field management (REQUIRED)              |
| Classic Editor             | Disables Gutenberg (simpler for demo)    |
| Yoast SEO                 | SEO (uses WP excerpt for meta)           |
| Google Tag Manager         | Analytics tracking (optional)            |
| HubSpot                   | Forms + tracking (V2.5 milestone)        |

---

## Environment Variables

```
WP_BASE_URL=https://your-subdomain.example.com
WP_USERNAME=admin
WP_APP_PASSWORD=xxxx xxxx xxxx xxxx xxxx xxxx
```

---

## Content Strategy (Fictional)

Acme Digital is a SaaS platform for [pick one: supply chain optimization / marketing analytics /
workflow automation]. Generate demo content that feels realistic:

- Blog posts: thought leadership, how-to guides, industry trends
- Case studies: fictional enterprise customers with real-sounding metrics
- Press releases: product launches, partnerships, funding rounds
- Whitepapers: gated research reports with HubSpot form IDs
- News: fictional third-party coverage (TechCrunch, Forbes, etc.)
- Videos/Podcasts: conference talks, product demos, interviews

---

## Roadmap Context

This site is one component of a multi-platform automation demo:

| Phase | Focus                                                          |
| ----- | -------------------------------------------------------------- |
| V1.0  | Hosted demo site + Slack bot (conversational via Claude)       |
| V1.5  | Google Drive as source of truth + Figma integration            |
| V2.0  | Figma → Claude Code → WordPress page templates                |
| V2.5  | HubSpot (forms, email, landing pages, lead workflows)          |
| V3.0  | JIRA (sprint-based content workflows)                          |
| V3.5+ | Email marketing (Klaviyo), social media, analytics             |
