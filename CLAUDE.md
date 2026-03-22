# CLAUDE.md — Aera Technology WordPress AI Integration

## Project context for Claude Code

---

## Project Overview

This is a local development environment for building and demoing an AI-assisted marketing
automation system on top of a WordPress site. The site is a production-accurate local copy
of aeratechnology.com, migrated from Contentful to WordPress in late 2025.

The immediate goal is a proof-of-concept demo showing one end-to-end workflow:
a content brief created externally (Google Doc or plain text) gets processed by Claude
and published to WordPress as a formatted post — with correct CPT assignment, taxonomy
tagging, ACF field population, and a Slack confirmation.

Longer term, this codebase becomes the foundation for a full marketing automation
system connecting WordPress, Slack, Google Drive, Figma, HubSpot, JIRA, and GA4.

---

## Local Environment

- **Setup:** Local by Flywheel
- **Site:** aeratechnology.com (local copy of the migrated production site)
- **WordPress version:** Check via `wp core version` in Local's shell
- **PHP version:** Check via `php -v` in Local's shell
- **Database:** MySQL via Local's built-in DB tools
- **Theme:** Custom theme at `wp-content/themes/aera-technology/`
- **Local URL:** Typically http://aeratechnology.local (confirm in Local app)

To open a shell for WP-CLI commands: Open Local > right-click site > Open Site Shell

---

## WordPress Architecture

### Custom Post Types (CPTs)

Each content type is registered as its own CPT (there is NO unified `resource` CPT).
Registered in `inc/post-types.php`.

**Resource CPTs** (grouped under "Resources Hub" admin menu):

| CPT Slug        | Label          | Front-end URL Strategy                        | Has Editor |
| --------------- | -------------- | --------------------------------------------- | ---------- |
| `blog`          | Blogs          | Single + Archive (`/blogs/`)                  | Yes        |
| `press-release` | Press Releases | Single only (`/news/{slug}`)                  | Yes        |
| `whitepaper`    | Whitepapers    | Single only (`/whitepapers/{slug}`)           | No         |
| `case-study`    | Case Studies   | Single only (`/case-study/{slug}`)            | No         |
| `news`          | News           | No front-end (external links only)            | No         |
| `video`         | Videos         | No front-end (external links only)            | No         |
| `podcast`       | Podcasts       | No front-end (external links only)            | No         |
| `report`        | Reports        | No front-end (external links only)            | No         |
| `webinar`       | Webinars       | Archive only (`/webinars/`), singles redirect | No         |

**Company CPTs** (grouped under "Company Hub" admin menu):

| CPT Slug       | Label         | Front-end URL Strategy                         | Has Editor |
| -------------- | ------------- | ---------------------------------------------- | ---------- |
| `customer`     | Customers     | Archive only (`/customers/`), singles redirect | No         |
| `event`        | Events        | Archive only (`/events/`), singles redirect    | No         |
| `partner`      | Partners      | Archive + single (`/partners/`)                | Yes        |
| `team_member`  | Leadership    | No front-end (admin only)                      | No         |
| `board_member` | Board Members | No front-end (admin only)                      | No         |

**Skills CPT:**

| CPT Slug | Label  | Front-end URL Strategy                                   |
| -------- | ------ | -------------------------------------------------------- |
| `skill`  | Skills | Archive (`/skills/`), singles redirect to skill_function |

All CPTs have `show_in_rest: true` so they're accessible via the REST API.

---

### Taxonomies

Registered in `inc/taxonomies.php`.

| Taxonomy Slug           | Associated CPT | Front-end | Notes                                           |
| ----------------------- | -------------- | --------- | ----------------------------------------------- |
| `resource_topic`        | webinar        | No        | Admin-only topic grouping                       |
| `industry`              | webinar        | No        | Hierarchical; admin menu nested under Webinars  |
| `webinar_solution_area` | webinar        | No        | Hierarchical; admin-only filtering              |
| `webinar_job_function`  | webinar        | No        | Hierarchical; admin-only filtering              |
| `skill_function`        | skill          | Yes       | Front-end at `/skills/{slug}/`; main skills nav |
| `skill_category`        | skill          | No        | Hierarchical; admin column visible              |

**Note:** There is NO `resource_type` taxonomy. Content types are differentiated by CPT slug.

---

### ACF Field Groups

ACF (Advanced Custom Fields) Pro is used extensively. Field definitions are synced
via JSON in `acf-json/`. Key groups verified from the JSON files:

**Resource Card (shared across all resource CPTs)** — `group_aera_resource_fields`
Applied to: news, press-release, video, whitepaper, blog, case-study, podcast, event, webinar, report

| Field Name              | Type       | Notes                                        |
| ----------------------- | ---------- | -------------------------------------------- |
| `resource_card_title`   | text       | Custom card title (falls back to post title) |
| `resource_card_image`   | image      | Card image (falls back to featured image)    |
| `resource_excerpt`      | textarea   | Card excerpt text                            |
| `resource_cta_text`     | text       | Custom CTA text (e.g., "Watch", "Read")      |
| `resource_external_url` | text       | External link URL (overrides permalink)      |
| `resource_coming_soon`  | true_false | Marks item as "Coming Soon"                  |

**Blog** — `group_aera_blog` (active)

| Field Name  | Type     | Notes                           |
| ----------- | -------- | ------------------------------- |
| `blog_lead` | textarea | Lead text below title (wpautop) |

**Press Release** — `group_aera_press_release` (inactive)

| Field Name                  | Type  | Notes                       |
| --------------------------- | ----- | --------------------------- |
| `press_release_publication` | text  | Publication name (required) |
| `press_release_logo`        | image | Publication logo            |

**Case Study** — `group_aera_case_study` (active)

| Field Name                      | Type     | Notes                     |
| ------------------------------- | -------- | ------------------------- |
| `case_study_type`               | text     | Default: "Case Study"     |
| `case_study_company_type`       | text     | e.g., FMCG, Manufacturing |
| `case_study_icon`               | image    | Card icon/logo            |
| `case_study_employees`          | text     | Employee count/range      |
| `case_study_revenue`            | text     | Revenue range             |
| `case_study_business_problem`   | textarea | Card display problem text |
| `case_study_business_statement` | text     | Card tagline              |
| `case_study_company_name`       | text     | Company name              |
| `case_study_industry`           | text     | Industry text field       |
| `case_study_featured_image`     | image    | Page featured image       |
| `case_study_body_copy`          | wysiwyg  | Main intro text           |
| `case_study_business_need`      | wysiwyg  | Business need section     |
| `case_study_short_solution`     | wysiwyg  | Brief solution summary    |
| `case_study_short_result`       | wysiwyg  | Brief results summary     |
| `case_study_challenges`         | wysiwyg  | Challenges section        |
| `case_study_solution`           | wysiwyg  | Full solution section     |
| `case_study_results`            | wysiwyg  | Full results section      |
| `case_study_top_quote`          | wysiwyg  | Featured quote            |
| `case_study_quote`              | wysiwyg  | Additional quote          |

**Whitepaper** — `group_aera_whitepaper` (inactive)

| Field Name                | Type | Notes                      |
| ------------------------- | ---- | -------------------------- |
| `whitepaper_hubspot_form` | text | HubSpot form ID for gating |

**Video** — `group_aera_video` (inactive)

| Field Name            | Type        | Notes               |
| --------------------- | ----------- | ------------------- |
| `video_type`          | text        | Video category      |
| `video_tags`          | textarea    | Tags (one per line) |
| `video_end_date`      | date_picker | End date            |
| `video_city`          | text        | City                |
| `video_form_or_video` | select      | "Form" or "Video"   |
| `video_attachment`    | file        | Video file upload   |
| `video_url`           | url         | YouTube/Vimeo URL   |

**Podcast** — `group_aera_podcast` (inactive)

| Field Name              | Type        | Notes               |
| ----------------------- | ----------- | ------------------- |
| `podcast_type`          | text        | Podcast category    |
| `podcast_tags`          | textarea    | Tags (one per line) |
| `podcast_end_date`      | date_picker | End date            |
| `podcast_city`          | text        | City                |
| `podcast_form_or_video` | select      | "Form" or "Video"   |
| `podcast_attachment`    | file        | Audio file upload   |
| `podcast_video`         | url         | YouTube/Vimeo URL   |

**Webinar** — `group_aera_webinar` (active)

| Field Name         | Type        | Notes                                |
| ------------------ | ----------- | ------------------------------------ |
| `webinar_date`     | date_picker | Used for upcoming vs on-demand logic |
| `webinar_featured` | true_false  | Featured on webinars page            |
| `webinar_excerpt`  | textarea    | Short description                    |

**Event** — `group_aera_event` (active)

| Field Name         | Type        | Notes                                 |
| ------------------ | ----------- | ------------------------------------- |
| `event_city`       | text        | City (required); "Virtual" for online |
| `event_status`     | select      | coming_soon / register / past         |
| `event_start_date` | date_picker | Start date                            |
| `event_end_date`   | date_picker | End date                              |

**Customer** — `group_aera_customer` (active)

| Field Name                   | Type     | Notes                               |
| ---------------------------- | -------- | ----------------------------------- |
| `customer_card_title`        | text     | Display title on card               |
| `customer_hero_image`        | image    | Card background image               |
| `customer_company_name`      | text     | Company name (fallback for logo)    |
| `customer_logo`              | image    | Company logo                        |
| `customer_type`              | text     | e.g., "Case Study", "Success Story" |
| `customer_industry_taxonomy` | taxonomy | Multi-select industry terms         |
| `customer_asset_1_title`     | text     | First asset link title              |
| `customer_asset_1_cta`       | text     | First asset CTA text                |
| `customer_asset_1_url`       | url      | First asset URL                     |
| `customer_asset_2_title`     | text     | Second asset link title             |
| `customer_asset_2_cta`       | text     | Second asset CTA text               |
| `customer_asset_2_url`       | url      | Second asset URL                    |

**Skill** — `group_aera_skill` (active)

| Field Name          | Type     | Notes                                                                              |
| ------------------- | -------- | ---------------------------------------------------------------------------------- |
| `skill_icon`        | select   | Icon from library (not image upload)                                               |
| `skill_description` | textarea | Main description text                                                              |
| `video_thumbnail`   | image    | Thumbnail for gated video modal                                                    |
| `video_url`         | url      | Vimeo/YouTube embed URL                                                            |
| `hubspot_form_id`   | text     | HubSpot form ID to gate the video                                                  |
| `content_sections`  | repeater | Sub-fields: `label`, `anchor`, `content`                                           |
| `cta_buttons`       | repeater | Sub-fields: `text`, `link_type`, `link_external`, `link_internal`, `link_resource` |

**Additional field groups** (in acf-json/ but not detailed above):

- `group_aera_page_hero` — Page hero sections
- `group_aera_page_cta` — Page CTA sections
- `group_aera_resources_options` — Resources archive options
- `group_aera_skills_options` — Skills archive options
- `group_aera_webinars_options` — Webinars archive options
- `group_aera_events_options` — Events archive options
- `group_aera_global_settings` — Site-wide settings
- `group_aera_home` — Homepage fields
- `group_aera_landing_page` — Landing page fields
- `group_aera_decision_cloud` — Decision Cloud page
- `group_aera_skills_home` — Skills home page
- `group_aera_columns_content` — Columns content layout
- `group_aera_faq_page` — FAQ page
- `group_aera_careers` — Careers page
- `group_aera_company_options` — Company section options
- `group_aera_partners_page` — Partners page
- `group_aera_team_member` — Team member fields
- `group_aera_platform_detail` — Platform detail page
- `group_skill_function_settings` — Skill function taxonomy settings
- `group_aera_skill_category` — Skill category taxonomy settings
- `group_aera_skill_category_fields` — Skill category fields
- `group_aera_resources` — Resources page layout

---

### Key Templates

**Single templates:**

| Template File              | Purpose                                             |
| -------------------------- | --------------------------------------------------- |
| `single-case-study.php`    | Individual case study page                          |
| `single-press-release.php` | Individual press release page                       |
| `single-skill.php`         | Individual skill page (redirects to skill_function) |

**Archive templates:**

| Template File          | Purpose                              |
| ---------------------- | ------------------------------------ |
| `archive-blog.php`     | Blog listing page                    |
| `archive-customer.php` | Customer stories grid                |
| `archive-event.php`    | Events listing                       |
| `archive-partner.php`  | Partners listing                     |
| `archive-skill.php`    | Skills directory with AJAX filtering |
| `archive-webinar.php`  | Webinars (upcoming + on-demand)      |

**Page templates:**

| Template File                            | Purpose                     |
| ---------------------------------------- | --------------------------- |
| `page-resources.php`                     | Main resources hub          |
| `page-skills-home.php`                   | Skills landing page         |
| `page-about-us.php`                      | About page                  |
| `page-aerahub-2025.php`                  | Aera Hub 2025 conference    |
| `page-aerahub-2025-london.php`           | Aera Hub London             |
| `page-careers.php`                       | Careers page                |
| `page-contact-us.php`                    | Contact page                |
| `page-decision-cloud.php`                | Decision Cloud product page |
| `page-demo.php`                          | Demo request page           |
| `page-faq.php`                           | FAQ page                    |
| `page-landing-page.php`                  | Generic landing page        |
| `page-platform-detail.php`               | Platform detail page        |
| `page-test-drive.php`                    | Test drive page             |
| `page-thankyou.php`                      | Thank you page              |
| `page-what-is-decision-intelligence.php` | DI explainer page           |

---

### HubSpot Integration

- HubSpot forms are embedded via the HubSpot tracking script (loaded via GTM or direct enqueue)
- Gated content uses HubSpot form IDs stored in ACF fields (e.g., `hubspot_form_id` on skills, `whitepaper_hubspot_form` on whitepapers)
- Form submission triggers content reveal (JavaScript on the frontend)
- HubSpot portal ID is stored in theme options or `wp-config.php` — do not hardcode in scripts

---

### Key Plugins (confirm via WP admin or WP-CLI)

```bash
wp plugin list --url=http://aeratechnology.local
```

Expected plugins based on the build:

- Advanced Custom Fields Pro
- WP Migrate (or similar, used during migration)
- Yoast SEO
- Custom blocks plugin (if blocks were registered as a separate plugin vs. in-theme)

---

## REST API

The WordPress REST API is the primary interface for programmatic content operations.
Since each content type is its own CPT, each has its own endpoint.

**Base URL:** `http://aeratechnology.local/wp-json/wp/v2/`

**Key endpoints (one per CPT):**

```
GET/POST  /wp-json/wp/v2/blog              — Blog posts
GET/POST  /wp-json/wp/v2/press-release     — Press releases
GET/POST  /wp-json/wp/v2/whitepaper        — Whitepapers
GET/POST  /wp-json/wp/v2/case-study        — Case studies
GET/POST  /wp-json/wp/v2/news              — News items
GET/POST  /wp-json/wp/v2/video             — Videos
GET/POST  /wp-json/wp/v2/podcast           — Podcasts
GET/POST  /wp-json/wp/v2/report            — Reports
GET/POST  /wp-json/wp/v2/webinar           — Webinars
GET/POST  /wp-json/wp/v2/event             — Events
GET/POST  /wp-json/wp/v2/customer          — Customers
GET/POST  /wp-json/wp/v2/partner           — Partners
GET/POST  /wp-json/wp/v2/skill             — Skills
GET/POST  /wp-json/wp/v2/team_member       — Team members
GET/POST  /wp-json/wp/v2/board_member      — Board members
```

**Taxonomy endpoints:**

```
GET  /wp-json/wp/v2/resource_topic         — Resource topics
GET  /wp-json/wp/v2/industry               — Industries
GET  /wp-json/wp/v2/webinar_solution_area  — Webinar solution areas
GET  /wp-json/wp/v2/webinar_job_function   — Webinar job functions
GET  /wp-json/wp/v2/skill_function         — Skill functions
GET  /wp-json/wp/v2/skill_category         — Skill categories
```

**ACF fields in REST API:**
ACF field groups with `show_in_rest: 1` expose fields under `acf: {}` in API responses.

**Authentication for local dev:**
Use Application Passwords (built into WordPress 5.6+):

1. WP Admin > Users > Your Profile > Application Passwords
2. Generate a password labeled "Claude Code Local Dev"
3. Store in `.env` file (never commit to git)

```
WP_BASE_URL=http://aeratechnology.local
WP_USERNAME=your_admin_username
WP_APP_PASSWORD=xxxx xxxx xxxx xxxx xxxx xxxx
```

**Test the connection:**

```bash
curl -u "username:app_password" http://aeratechnology.local/wp-json/wp/v2/users/me
```

---

## Demo Workflow (V0.5 Target)

The first demo shows this single end-to-end flow:

```
[Input: text brief or Google Doc URL]
        |
        v
[Claude reads brief, determines CPT (blog, press-release, case-study, etc.)]
[Claude extracts: title, body, ACF fields, taxonomy terms, summary]
        |
        v
[Claude formats content to match the target CPT's ACF field schema]
        |
        v
[POST to the correct WP REST API endpoint (e.g., /wp-json/wp/v2/blog)]
[Creates draft with all fields populated including ACF fields]
        |
        v
[Claude confirms: "Draft created — Title: X, CPT: blog, Status: Draft. Ready to publish?"]
        |
        v
[On confirmation: PATCH to update status to 'publish']
        |
        v
[Slack message: "Published: [Title] — [URL]"]
```

**What this proves:**

- Claude can read unstructured content and map it to a structured CMS schema
- Content operations that currently take 15-30 minutes of manual CMS work happen in under 2 minutes
- The team never opens WordPress admin to create a standard content entry

---

## File Structure for This Project

```
/aera-ai-integration/             <- To be created
  .env                            <- Local credentials (gitignored)
  .env.example                    <- Committed template with placeholder values
  .gitignore
  /scripts/
    publish_content.js            <- Core REST API publishing script
    map_content.js                <- Content parsing and field mapping logic
    slack_notify.js               <- Slack webhook notification
  /prompts/
    resource_brief.md             <- Prompt template for parsing a content brief
    skill_entry.md                <- Prompt template for creating a Skill entry
  /examples/
    sample_brief.md               <- Example content brief for testing
    sample_output.json            <- Expected API payload for a blog entry
```

---

## Environment Variables (.env)

```
# WordPress (Local)
WP_BASE_URL=http://aeratechnology.local
WP_USERNAME=
WP_APP_PASSWORD=

# Slack
SLACK_WEBHOOK_URL=

# Anthropic (if calling Claude API directly from scripts)
ANTHROPIC_API_KEY=

# Google (for Drive integration — V1.0)
GOOGLE_SERVICE_ACCOUNT_JSON=
GOOGLE_DRIVE_FOLDER_ID=
```

---

## What to Do First in a New Chat

1. Read this CLAUDE.md for full architecture context
2. Confirm the local site is running in Local by Flywheel
3. If REST API access is needed, check that `.env` credentials are set
4. Test the REST API connection: `curl -u "user:pass" http://aeratechnology.local/wp-json/wp/v2/users/me`
5. For ACF field discovery beyond what's documented here, query: `GET /wp-json/wp/v2/{cpt}?context=edit`

---

## Broader Roadmap Context

This demo is the foundation for a phased AI automation system:

| Phase                   | Timeline     | Key Milestone                                      |
| ----------------------- | ------------ | -------------------------------------------------- |
| V0.5 — Local demo       | Weeks 1-3    | Publish content to local WP via Claude Code        |
| V1.0 — Live integration | Months 1-3   | Slack + Google Drive + WP Engine dev environment   |
| V1.5 — Content sync     | Months 3-6   | Google Drive as source of truth, Figma integration |
| V2.0 — Project ops      | Months 5-8   | JIRA integration, sprint-based content workflows   |
| V3.0 — MarTech          | Months 7-10  | HubSpot email, landing pages, lead workflows       |
| V4.0+ — Analytics       | Months 10-14 | GA4, AdRoll, social, coordinated campaign launches |

The demo only needs to show V0.5. Everything else is communicated in the pitch deck.

---

## Notes for Claude Code

- Always use draft status first (`status: draft`), then prompt for confirmation before publishing
- Never delete or overwrite existing content without explicit confirmation
- When field names are uncertain, query the REST API schema: `GET /wp-json/wp/v2/{cpt}?context=edit`
- ACF fields are returned under `acf: {}` in the REST API response (field groups have `show_in_rest: 1`)
- Keep credentials out of all committed files — use `.env` only
- The goal of the demo is legibility: code should be readable and the workflow should be easy to narrate on screen
- The `acf-json/` directory is the source of truth for field definitions
- Some field groups are marked `active: false` (press_release, whitepaper, video, podcast) — these may need activation
