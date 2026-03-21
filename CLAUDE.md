# CLAUDE.md — Aera Technology WordPress AI Integration

## Project context for Claude Code

---

## Project Overview

This is a local development environment for building and demoing an AI-assisted marketing
automation system on top of a WordPress site. The site is a production-accurate local copy
of aeratechnology.com, migrated from Contentful to WordPress in late 2025.

The immediate goal is a proof-of-concept demo showing one end-to-end workflow:
a content brief created externally (Google Doc or plain text) gets processed by Claude
and published to WordPress as a formatted post or resource entry — with correct CPT
assignment, taxonomy tagging, ACF field population, and a Slack confirmation.

Longer term, this codebase becomes the foundation for a full marketing automation
system connecting WordPress, Slack, Google Drive, Figma, HubSpot, JIRA, and GA4.

---

## Local Environment

- **Setup:** Local by Flywheel
- **Site:** aeratechnology.com (local copy of the migrated production site)
- **WordPress version:** Check via `wp core version` in Local's shell
- **PHP version:** Check via `php -v` in Local's shell
- **Database:** MySQL via Local's built-in DB tools
- **Theme:** Custom theme built during the 2025 Contentful-to-WordPress migration
- **Local URL:** Typically http://aeratechnology.local (confirm in Local app)

To open a shell for WP-CLI commands: Open Local > right-click site > Open Site Shell

---

## WordPress Architecture

### Custom Post Types (CPTs)

The following CPTs were built during the migration. Field details need to be confirmed
by inspecting the actual registration code in the theme or a custom plugin.

| CPT Slug      | Label     | Notes                                                                            |
| ------------- | --------- | -------------------------------------------------------------------------------- |
| `resource`    | Resources | Blog posts, whitepapers, case studies, press releases, podcasts, videos, reports |
| `skill`       | Skills    | Aera Skills directory (60+ entries, AJAX-filtered archive)                       |
| `customer`    | Customers | Customer logos and case study references                                         |
| `event`       | Events    | In-person events and webinars                                                    |
| `team_member` | Team      | Leadership/team pages (if registered)                                            |

**To confirm all registered CPTs:**

```bash
wp post-type list --fields=name,label,public --url=http://aeratechnology.local
```

---

### Taxonomies

| Taxonomy Slug    | Associated CPT     | Notes                                                               |
| ---------------- | ------------------ | ------------------------------------------------------------------- |
| `resource_type`  | resource           | blog, whitepaper, case-study, press-release, podcast, video, report |
| `skill_category` | skill              | Supply Chain, Procurement, Sales & Marketing, Finance, HR, ESG      |
| `skill_function` | skill              | Second taxonomy for Skills filtering                                |
| `industry`       | resource, customer | Industry tags used across content types                             |

**To confirm all registered taxonomies:**

```bash
wp taxonomy list --fields=name,label,object_type --url=http://aeratechnology.local
```

---

### ACF Field Groups

ACF (Advanced Custom Fields) is used extensively. Key field groups to map:

**Resources (`resource` CPT)**

- `resource_type` — select or taxonomy (maps to resource_type taxonomy)
- `featured_image` — image field or standard WP featured image
- `summary` / `excerpt` — short description for archive cards
- `external_url` — for resources that link out (news mentions, podcast episodes)
- `gated` — boolean, whether content requires HubSpot form
- `hubspot_form_id` — HubSpot form ID for gated content
- `video_url` — for video resources
- `publish_date` — may override standard WP date

**Skills (`skill` CPT)**

- `skill_icon` — SVG or image
- `skill_description` — longer body text
- `skill_function_tags` — taxonomy reference
- `gated_video` — boolean
- `video_modal_url` — URL for gated video modal
- `hubspot_form_id` — for gated video access

**To list all ACF field groups and fields:**

```bash
wp acf field-group list --url=http://aeratechnology.local
```

Or inspect directly: WordPress admin > Custom Fields > Field Groups

---

### Key Templates

| Template File          | Purpose                                |
| ---------------------- | -------------------------------------- |
| `single-resource.php`  | Single resource/blog post view         |
| `archive-resource.php` | Resources listing page                 |
| `single-skill.php`     | Individual Skill page with gated video |
| `archive-skill.php`    | Skills directory with AJAX filtering   |
| `page-hub.php`         | Aera Hub 2025 conference page          |
| `page-gartner.php`     | Gartner campaign landing pages         |

Confirm actual template filenames by inspecting the theme directory:

```bash
ls wp-content/themes/aera-technology/
```

---

### HubSpot Integration

- HubSpot forms are embedded via the HubSpot tracking script (loaded via GTM or direct enqueue)
- Gated content uses HubSpot form IDs stored in ACF fields
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
- Yoast SEO (or Rank Math)
- WP Rocket or similar caching plugin
- Custom blocks plugin (if blocks were registered as a separate plugin vs. in-theme)

---

## REST API

The WordPress REST API is the primary interface for programmatic content operations.

**Base URL:** `http://aeratechnology.local/wp-json/wp/v2/`

**Key endpoints:**

```
GET  /wp-json/wp/v2/posts              — Standard posts
GET  /wp-json/wp/v2/resource           — Resource CPT
GET  /wp-json/wp/v2/skill              — Skill CPT
POST /wp-json/wp/v2/resource           — Create a resource entry
POST /wp-json/wp/v2/skill              — Create a skill entry
GET  /wp-json/wp/v2/resource_type      — Resource type taxonomy terms
GET  /wp-json/acf/v3/resource/{id}     — ACF fields for a resource (requires ACF to REST API plugin or ACF Pro)
```

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
[Claude reads brief, extracts: title, body, resource_type, tags, summary, gated flag]
        |
        v
[Claude formats content to match WordPress/ACF field schema]
        |
        v
[POST to WP REST API — creates draft resource entry with all fields populated]
        |
        v
[Claude confirms: "Draft created — Title: X, Type: Y, Status: Draft. Ready to publish?"]
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
- The team never opens WordPress admin to create a standard resource entry

---

## File Structure for This Project

```
/aera-ai-integration/
  CLAUDE.md                  <- This file
  .env                       <- Local credentials (gitignored)
  .env.example               <- Committed template with placeholder values
  .gitignore
  /scripts/
    publish_resource.js      <- Core REST API publishing script
    map_content.js           <- Content parsing and field mapping logic
    slack_notify.js          <- Slack webhook notification
  /prompts/
    resource_brief.md        <- Prompt template for parsing a content brief
    skill_entry.md           <- Prompt template for creating a Skill entry
  /examples/
    sample_brief.md          <- Example content brief for testing
    sample_output.json       <- Expected API payload for a resource entry
  README.md                  <- Setup instructions for handing off or demoing
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

1. Confirm the local site is running in Local by Flywheel
2. Run `wp post-type list` and `wp taxonomy list` to confirm actual CPT/taxonomy slugs
3. Run `wp acf field-group list` or inspect WP admin to map actual ACF field names
4. Generate a WordPress Application Password and add to `.env`
5. Test the REST API connection with a curl request
6. Inspect `wp-content/themes/aera-technology/` to confirm template filenames
7. Then proceed to building `publish_resource.js`

---

## Broader Roadmap Context

This demo is the foundation for a phased AI automation system:

| Phase                   | Timeline     | Key Milestone                                      |
| ----------------------- | ------------ | -------------------------------------------------- |
| V0.5 — Local demo       | Weeks 1-3    | Publish a resource to local WP via Claude Code     |
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
- When field names are uncertain, query the REST API schema first: `GET /wp-json/wp/v2/resource?context=edit`
- ACF fields are returned under `acf: {}` in the REST API response if ACF to REST API is enabled
- Keep credentials out of all committed files — use `.env` only
- The goal of the demo is legibility: code should be readable and the workflow should be easy to narrate on screen
