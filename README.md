# Aera Technology Theme (`aera-technology`)

Production WordPress theme for Aera Technology.

This README replaces the default `_s` starter documentation and is now the primary handoff + developer reference for this repository.

- Theme slug: `aera-technology`
- Text domain: `aera`
- Primary namespace used in theme code: `Aera`

---

## Requirements

- Node.js (for asset pipeline)
- npm
- Composer (for PHP tooling)
- WordPress with this theme activated
- ACF Pro (expected by theme field architecture)

---

## Local Development

Install dependencies:

```bash
composer install
npm install
```

Common commands:

```bash
npm run dev           # watch CSS + JS bundles
npm run build         # production CSS + JS bundles
npm run build:css     # compressed CSS, no sourcemap
npm run build:js      # production JS bundle(s)
npm run build:scripts # production page scripts
composer lint:php
composer lint:wpcs
```

### CSS output and performance

- Canonical runtime stylesheet is `assets/css/aera.css`.
- Dev CSS (`npm run dev:css`) is expanded and includes sourcemaps.
- Production CSS (`npm run build:css`) is compressed and excludes sourcemaps.

### Deploy recommendation (WP Engine)

Before pushing/deploying to WP Engine, run:

```bash
npm run build
```

This ensures compressed production assets are committed/deployed and avoids shipping debug/watch output.

### Release checklist

1. Pull latest changes and resolve merge conflicts.
2. Run `npm ci` (or `npm install` if needed).
3. Run `npm run build`.
4. Run `composer lint:php` and `composer lint:wpcs`.
5. Verify key templates/pages locally (home, resources, webinars, skills, one content single).
6. Deploy to WP Engine environment.
7. In WP Admin, sync ACF JSON changes if prompted.
8. Purge WP Engine cache/CDN and validate frontend + forms.

### Platform notes and docs

- WP Engine docs (deploying, environments, cache):
  - https://wpengine.com/support/
  - https://wpengine.com/support/cache/
  - https://wpengine.com/support/environments/
- ACF docs (field groups, Local JSON, options pages):
  - https://www.advancedcustomfields.com/resources/
  - https://www.advancedcustomfields.com/resources/local-json/
  - https://www.advancedcustomfields.com/resources/options-page/
- Yoast SEO docs:
  - https://yoast.com/help/
  - https://developer.yoast.com/

Operational notes:

- Treat `acf-json/` as version-controlled source for field group definitions.
- Always deploy production-built assets from `assets/css/` and `assets/js/`.
- If SEO output or scoring changes unexpectedly, validate both Yoast settings and ACF field mappings in `inc/yoast-acf.php`.

---

## Project Architecture

## 1. Custom Post Types (CPTs)

Registered in: `inc/post-types.php` (namespace `Aera`, action `init`).

### Summary

| CPT | Front-end URL | Notes |
|-----|----------------|--------|
| **Resources (under Resources hub)** | | |
| `news` | No | External links only; no archive/single |
| `press-release` | `/news/{slug}` | Single only |
| `video` | No | External links only |
| `whitepaper` | `/whitepapers/{slug}` | Single only |
| `blog` | `/blogs` archive + single | Uses editor + ACF |
| `case-study` | `/case-study/{slug}` | Single only |
| `podcast` | No | External links only |
| `report` | No | External links only |
| **Webinars & Events** | | |
| `webinar` | `/webinars` archive only | Singles redirect to archive |
| `event` | `/events` archive only | Singles redirect to archive |
| **Company (under Company hub)** | | |
| `customer` | `/customers` archive only | Singles redirect to archive |
| `partner` | `/partners` archive only | Singles redirect to archive |
| `team_member` | No | Used in About/Leadership blocks |
| `board_member` | No | Used in company sections |
| **Skills** | | |
| `skill` | `/skills` archive only | Singles redirect to **skill function** taxonomy page |

Admin menus: Resource CPTs are grouped under **Resources**; company CPTs under **Company**. Events and Webinars are top-level; Skills is top-level.

Permalinks for archive-only CPTs: Card/permalinks use ACF `resource_external_url` when set; otherwise they point to the post type archive (see `filter_archive_only_permalink` in `inc/post-types.php`).

---

## 2. Taxonomies

Registered in: `inc/taxonomies.php` (namespace `Aera`, action `init` priority 11).

| Taxonomy | Post types | Public/front-end | Admin location |
|----------|------------|------------------|----------------|
| `resource_topic` | All resource CPTs | No (filtering only) | Per post type |
| `industry` | All resource CPTs | No | **Company** hub → Industries (redirect) |
| `webinar_solution_area` | webinar | No | Under Webinars |
| `webinar_job_function` | webinar | No | Under Webinars |
| **`skill_function`** | skill | **Yes** — `/skills/{function-slug}/` | Under Skills |
| `skill_category` | skill | No (used to group skills under a function) | Under Skills; has ACF `parent_function` to link to a skill_function |

Important: `/skills/{slug}` is served by the **skill_function** taxonomy (rewrite in `post-types.php`). Individual skill posts do not have their own URLs; they redirect to their skill function term page.

---

## 3. Custom Fields (ACF) — Where They Are Managed

ACF JSON: Field groups are stored in theme `acf-json/`.

Sync is configured in `inc/acf.php`: save/load path is the theme’s `acf-json` folder.

### Options pages (site-wide defaults)

Registered in `inc/admin.php` → `register_acf_options_pages()`:

- **Resources Options** — parent: Resources hub → `acf-options-resources-options`
- **Events Options** — parent: Events menu → `acf-options-events-options`
- **Webinars Options** — parent: Webinars menu → `acf-options-webinars-options`
- **Company Options** — parent: Company hub → `acf-options-company-options`
  - Also holds **Page CTA** defaults (title + buttons) and **Partners** hero overrides.
- **Skills Options** — parent: Skills menu → `acf-options-skills-options`
- **Site Options** — top-level (Settings area) → `acf-options-site-options`
  - Announcement banner, etc.

### Field groups by area (high level)

- **Page Hero** — Pages (and options for some archives). Fields: `hero_title`, `hero_title_line_two`, `hero_subtitle`, `hero_text`, `hero_button_*`, `hero_variation`, `hero_full_height`.
- **Page CTA** — Pages + **Company Options** (default CTA for site).
- **Resource Card** — Shared across resource-like CPTs: `resource_card_title`, `resource_card_image`, `resource_excerpt`, `resource_external_url`, `resource_cta_text`, `resource_coming_soon`, etc.
- **CPT-specific groups** — e.g. Blog, Case Study, Whitepaper, Webinar, Event, Customer, Partner, Skill, Team Member, etc. Each has its own JSON in `acf-json/`.
- **FAQ Page** — page(s) using FAQ template: `company_faq_title`, `company_faq_intro`, `company_faq_sections` (repeater: section title, description, FAQ items).
- **Skill Function** (term) — ACF on `skill_function` terms, e.g. `hubspot_form_id` for gated skill videos.
- **Skill Category** (term) — `parent_function` relationship field linking to a `skill_function`.

---

## 4. Resource Page (Resources)

- Template: `page-resources.php` (Template Name: Resources).
- Query/filtering: `inc/resources.php` (`get_resource_types()`, `get_active_resource_type()`, `build_resource_query_args()`).
- URL filtering: `?type=` or `?category=`.
- Client-side filter behavior: `js/resources-filter.js` (compiled to `assets/js/min/resources-filter.min.js`).
- Hero from page-level ACF (`resources_hero`) with template fallbacks.

---

## 5. Webinars — Filtering and Sorting

- Archive template: `archive-webinar.php`.
- Hero defaults in template, overrides from Webinars Options ACF (`webinars_hero_*`).
- Featured webinars: `webinar_featured = true`, ordered by `menu_order` then date.
- Remaining webinars: ordered by `menu_order` then ACF `webinar_date`, excluding featured IDs.
- Filtering by taxonomies: `industry`, `webinar_solution_area`, `webinar_job_function`.
- Sorting relies on `menu_order` (typically managed via Intuitive CPO).
- HubSpot forms script is loaded on webinar archive.

---

## 6. Skills — Page Wiring

- Skills landing page: `page-skills-home.php`.
- Skills archive: `archive-skill.php`.
- Archive filtering is client-side in `js/skills-filter.js` with all skills loaded (`posts_per_page = -1`).
- URL params include `skill_search`, `sort`, `categories`.
- Query behavior in `functions.php` → `aera_technology_skill_archive_pre_get_posts`.

### Skill function pages

- Taxonomy template: `taxonomy-skill_function.php`
- URL: `/skills/{function-slug}/`
- Hero uses term name/description.
- Skill categories grouped via `skill_category` + ACF `parent_function`.
- Skills are ordered by `menu_order`.
- Skill cards route to skill function URL (not single skill URL).

### Related scripts

- `js/skill-detail.js` (single skill context)
- `js/skills-video-modal.js` (skill function pages)
- `js/skills-filter.js` (skills archive)

---

## 7. Hero and CTA Components

### Hero

- Component: `template-parts/components/hero.php`
- Data priority:
  1. Explicit `$args` from template
  2. Page-level ACF fields
  3. Options-level ACF fields
  4. Template defaults
- Component renders only when `hero_title` is present.

### CTA

- Component: `template-parts/components/cta.php`
- Data priority:
  1. `$args['cta']` passed from template
  2. Page-level ACF
  3. Company Options fallback
  4. Hardcoded fallback (`See Aera in action.` + `/demo`)

---

## 8. HubSpot

- Embed script: `https://js.hsforms.net/forms/embed/v2.js`
- Loaded conditionally via `aera_has_hubspot_form()` in `functions.php`
- Tracking logic in `inc/hubspot-tracker.php` (`setPath` + `trackPageView` behavior)
- Used on Demo, Landing, Test Drive, `skill_function` taxonomy, and Webinar archive
- Theme CSS for HubSpot forms lives in `assets/css/aera.css`

---

## 9. Yoast SEO

Integration file: `inc/yoast-acf.php`

- Yoast metabox priority lowered below ACF.
- ACF fields injected into Yoast custom field analysis per post type.
- Meta description fallbacks configured for selected post types.
- Optional compatibility tuning for “ACF Content Analysis for Yoast SEO”.

---

## 10. Image Sizes

Defined in `functions.php` (`aera_technology_setup()`):

| Size name | Dimensions | Crop | Usage |
|-----------|------------|------|--------|
| `logo` | 480×204 | no | Retina logos |
| `resource_card_image` | 342×96 | — | Resource cards |
| `webinar_card_image` | 333×180 | — | Webinar/card |
| `webinar_featured` | 800×450 | yes | Featured webinars |
| `card_logo` | 150×150 | no | Card logos |
| `blog_hero` | 890×0 | — | Blog hero |
| `skill_hero` | 738×0 | — | Skill hero images |

---

## 11. Company Pages / Sections

- About Us: `page-about-us.php` (team/board sections use `menu_order`)
- Partners: `archive-partner.php` (hero/CTA from Company Options)
- Customers: `archive-customer.php`
- Careers: `page-careers.php` (`inc/lever.php` integration support)
- Industries taxonomy managed under Company hub

---

## 12. Archive Pages (General)

- Blog: `archive-blog.php`
- Webinars: `archive-webinar.php`
- Events: `archive-event.php`
- Partners: `archive-partner.php`
- Customers: `archive-customer.php`
- Skills: `archive-skill.php`

Document title overrides for webinars/events are in `functions.php` (`aera_technology_custom_archive_title`).

---

## 13. Menus

Registered in `functions.php`:

- `primary`
- `primary-utility`
- `footer-aera`
- `footer-skills`
- `footer-company`
- `footer-resources`
- `footer-customers`
- `footer-events`
- `footer-cta`
- `footer-social`

---

## 14. Static / Key Pages

- Home: `front-page.php`
- AeraHub pages: `page-aerahub-2025.php`, `page-aerahub-2025-london.php`
- Decision Cloud: `page-decision-cloud.php`
- Contact / Demo / Test Drive / Landing: custom templates with HubSpot

---

## 15. FAQs

- Template: `page-faq.php`
- Data source: page ACF fields (`group_aera_faq_page`)
- Rendering helpers: `inc/faq.php`
- Shortcode: `[aera_faq]`

---

## 16. Custom Ordering (Intuitive CPO)

`menu_order` is used in key surfaces (webinars, partners, skills, leadership blocks, case-study ordering contexts). Maintain ordering in admin using your ordering plugin workflow.

---

## 17. Custom Page Templates (Quick Reference)

| Template file | Uses ACF |
|---------------|----------|
| `page-resources.php` | Yes |
| `page-skills-home.php` | Yes |
| `page-faq.php` | Yes |
| `page-about-us.php` | Yes |
| `page-careers.php` | Yes |
| `page-contact-us.php` | Yes |
| `page-demo.php` | Yes |
| `page-test-drive.php` | Yes |
| `page-landing-page.php` | Yes |
| `page-decision-cloud.php` | Yes |
| `page-what-is-decision-intelligence.php` | Yes |
| `page-platform-detail.php` | Yes |
| `page-aerahub-2025.php` | Yes |
| `page-aerahub-2025-london.php` | Yes |

---

## 18. Redirects (legacy React)

Historical redirect list source: `_SITEMAPS/index.js` from legacy app. Import redirects to WordPress/server config as needed.

---

## 19. Other Notable Items

- Default WP `post` type is disabled on front-end routes.
- Comments are disabled site-wide by theme logic.
- Author meta fields (`author_photo_url`, `author_position`) are used in blog author blocks.
- ACF icon select fields are populated from `assets/images/icons/`.
- Announcement banner is driven from Site Options (`inc/banner.php`).
- Head/favicons logic in `inc/head-meta.php`.

---

## 20. File Map

| Area | Location |
|------|----------|
| CPTs | `inc/post-types.php` |
| Taxonomies | `inc/taxonomies.php` |
| Resource helpers | `inc/resources.php` |
| ACF integration | `inc/acf.php` |
| ACF + Yoast | `inc/yoast-acf.php` |
| HubSpot tracker | `inc/hubspot-tracker.php` |
| FAQ helpers | `inc/faq.php` |
| Admin/options pages | `inc/admin.php` |
| Hero component | `template-parts/components/hero.php` |
| CTA component | `template-parts/components/cta.php` |
| Versioned ACF definitions | `acf-json/*.json` |

---

## Source of truth note

This README is the canonical handoff and technical reference for this theme.
