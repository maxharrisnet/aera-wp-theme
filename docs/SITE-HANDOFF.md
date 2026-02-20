# Aera Technology Site — Handoff Documentation

This document is for engineers and admins taking over management of the Aera Technology WordPress site. It describes where custom functionality lives, how content is structured, and how to find or change key behaviors.

**Theme:** `aera-technology`  
**Text domain:** `aera`  
**Namespace:** `Aera` (PHP)

---

## 1. Custom Post Types (CPTs)

**Registered in:** `inc/post-types.php` (namespace `Aera`, action `init`).

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

**Admin menus:** Resource CPTs are grouped under **Resources**; company CPTs under **Company**. Events and Webinars are top-level; Skills is top-level.

**Permalinks for archive-only CPTs:** Card/permalinks use ACF `resource_external_url` when set; otherwise they point to the post type archive (see `filter_archive_only_permalink` in `inc/post-types.php`).

---

## 2. Taxonomies

**Registered in:** `inc/taxonomies.php` (namespace `Aera`, action `init` priority 11).

| Taxonomy | Post types | Public/front-end | Admin location |
|----------|------------|------------------|----------------|
| `resource_topic` | All resource CPTs | No (filtering only) | Per post type |
| `industry` | All resource CPTs | No | **Company** hub → Industries (redirect) |
| `webinar_solution_area` | webinar | No | Under Webinars |
| `webinar_job_function` | webinar | No | Under Webinars |
| **`skill_function`** | skill | **Yes** — `/skills/{function-slug}/` | Under Skills |
| `skill_category` | skill | No (used to group skills under a function) | Under Skills; has ACF `parent_function` to link to a skill_function |

**Important:** `/skills/{slug}` is served by the **skill_function** taxonomy (rewrite in `post-types.php`). Individual skill posts do not have their own URLs; they redirect to their skill function term page.

---

## 3. Custom Fields (ACF) — Where They Are Managed

**ACF JSON:** Field groups are stored in the theme at **`acf-json/`**. Sync is configured in `inc/acf.php`: save/load path is the theme’s `acf-json` folder. Edit field groups in WP Admin; they sync to JSON for version control.

### Options pages (site-wide defaults)

Registered in **`inc/admin.php`** → `register_acf_options_pages()`:

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
- **FAQ Page** — Page(s) using the FAQ template: `company_faq_title`, `company_faq_intro`, `company_faq_sections` (repeater: section title, description, FAQ items).
- **Skill Function** (term) — ACF on `skill_function` terms: e.g. `hubspot_form_id` for gated skill videos.
- **Skill Category** (term) — `parent_function` (relationship to `skill_function`) so categories are grouped under functions.

Exact field names and locations are in each `acf-json/group_*.json` file; the ACF UI in WP Admin shows the same structure.

---

## 4. Resource Page (Resources)

- **Template:** `page-resources.php` (Template Name: Resources).
- **Query/filtering:** Uses **`inc/resources.php`**: `get_resource_types()`, `get_active_resource_type()`, `build_resource_query_args()`. Resource types map to post types (e.g. “Blogs” → `blog`, “Case Studies” → `case-study`).
- **URL filtering:** `?type=` or `?category=` (sanitized to a valid type). Case studies use a dedicated query that respects `menu_order`.
- **Client-side:** `assets/js/min/resources-filter.min.js` (source: `js/resources-filter.js`) is enqueued on this template for any filter UI behavior.
- **Hero:** From ACF group “Resources” (page-level) — e.g. `resources_hero` (title, description). Fallbacks are in the template.

---

## 5. Webinars — Filtering and Sorting

- **Archive template:** `archive-webinar.php`.
- **Hero:** Defaults in template; overridden by **Webinars Options** ACF: `webinars_hero_title`, `webinars_hero_text`, etc.
- **Queries:**  
  - Featured webinars: `webinar_featured` = true, ordered by `menu_order` then `date`.  
  - Rest: ordered by `menu_order` then ACF `webinar_date` (meta), excluding featured IDs.
- **Filtering:** By **industry**, **webinar_solution_area**, **webinar_job_function** (terms from `get_terms`; filter UI and query params in the same template).
- **Sorting:** Uses `menu_order` for “custom” order — **Intuitive CPO** (or manual order) is used to drag-and-drop webinar order.
- **HubSpot:** Webinar archive is one of the pages that load the HubSpot forms script (see **HubSpot** section below).

---

## 6. Skills — Page Wiring

- **Skills “home” (landing):** Static page using **`page-skills-home.php`**. Hero/CTA from page ACF or **Skills Options**.
- **Skills archive:** `archive-skill.php` — lists all skills; hero from **Skills Options** (`skills_archive_title`, `skills_archive_description`, etc.).
- **Filtering:** Category filter is **client-side**: all skills loaded in one query (`posts_per_page = -1`), then filtered by `data-category-ids` via **`js/skills-filter.js`**. URL params: `?skill_search=`, `?sort=title|date|menu_order`, `?categories=`. Query changes (search, sort) are in **`functions.php`** → `aera_technology_skill_archive_pre_get_posts`.
- **Skill function pages (main skill UX):** **`taxonomy-skill_function.php`**.  
  - URL: `/skills/{function-slug}/`.  
  - Shows the **skill_function** term name as hero; then **skill_category** tabs (categories linked to this function via ACF `parent_function`).  
  - Each category panel lists **skill** posts (ordered by `menu_order`).  
  - **Skill cards** link to the **skill function** URL (not to a single skill post). So “where this skill lives” = its function’s taxonomy URL.
- **Skill function template content:** Skills listed with video thumbnails, CTAs, and optional **HubSpot form** in a modal. HubSpot form ID comes from the skill post’s ACF `hubspot_form_id`, or the **skill_function** term’s `hubspot_form_id` as default.
- **Scripts:**  
  - `js/skill-detail.js` on single skill (redirects in practice).  
  - `js/skills-video-modal.js` on skill function taxonomy pages (video modal + HubSpot).  
  - `js/skills-filter.js` on skills archive.

---

## 7. Hero and CTA Components

### Hero

- **Template:** `template-parts/components/hero.php`.
- **Logic:**  
  1. Explicit `$args` passed from the calling template (e.g. archive).  
  2. Else ACF on current page: `hero_title`, `hero_title_line_two`, `hero_subtitle`, `hero_text`, `hero_button_*`, `hero_full_height`, `hero_variation`.  
  3. Else ACF Options (for archives that use options).  
  4. Component only renders if `hero_title` is non-empty.
- **Overrides / defaults:**  
  - **Pages:** Use **Page Hero** ACF on the page.  
  - **Webinars archive:** Hard-coded defaults in `archive-webinar.php`; overridden by **Webinars Options** (`webinars_hero_*`).  
  - **Events archive:** Same pattern with **Events Options** (`events_hero_*`).  
  - **Partners archive:** **Company Options** (`company_partner_hero_title`, `company_partner_hero_text`).  
  - **Skills archive:** **Skills Options** (`skills_archive_title`, `skills_archive_description`, button).  
  - **Skills home page:** Page ACF or **Skills Options** (`skills_home_hero_title`, etc.).  
  - **Skill function taxonomy:** Term name + term description (no ACF hero on term).

### CTA

- **Template:** `template-parts/components/cta.php`.
- **Logic:**  
  1. If template passes `$args['cta']` (title + buttons), use it (with link resolution for internal/resource/external).  
  2. Else: page-level ACF `cta_title` / `cta_buttons`; if empty, **Company Options** `cta_title` / `cta_buttons`.  
  3. Hard-coded defaults: title “See Aera in action.”, one button “Schedule Demo” → `/demo`.
- **Where overridden:**  
  - **Company Options** = site-wide default CTA.  
  - **Page CTA** ACF on individual pages overrides that.  
  - Some templates (e.g. Skills home, Partners, Decision Cloud) pass a custom `cta` array into the component instead of relying on ACF.

---

## 8. HubSpot

- **Usage:** Forms are embedded via HubSpot’s embed script (`https://js.hsforms.net/forms/embed/v2.js`). It is preloaded only on pages that have a form (`functions.php` → `aera_has_hubspot_form()`).
- **Pages with HubSpot:** Demo page template, Landing Page template, Test Drive template, **skill_function** taxonomy pages, **webinar** archive.
- **Theme:** No HubSpot plugin logic in theme; forms are either:  
  - Rendered by **Leadin (HubSpot)** plugin (e.g. Gutenberg block `wp-block-leadin-hubspot-form-block`), or  
  - Inline embeds via ACF (e.g. Landing Page: HubSpot Portal ID + Form ID; Skill/Skill Function: `hubspot_form_id`).  
  Theme CSS in `assets/css/aera.css` styles `.wp-block-leadin-hubspot-form-block` and `.hubspotForm__*` / `#hubspotForm`, and the skill video modal form container.
- **Config:** Form IDs and portal IDs come from ACF (per page, per landing template, or per skill/skill function term). No hard-coded form IDs in theme.

---

## 9. Yoast SEO

- **Integration:** `inc/yoast-acf.php`.  
  - Yoast metabox is moved **below** ACF (filter `wpseo_metabox_prio` → `low`).  
  - **Custom fields for analysis:** ACF field meta keys are injected per post type into Yoast’s “custom fields” analysis (option `wpseo_titles`, keys `page-analyse-extra-{post_type}`) so that Yoast scores ACF content.  
  - **Meta description fallbacks:** Uses `%%cf_<field>%%` for some post types (e.g. page → `hero_text`, blog → `blog_lead`, case-study → `resource_excerpt`).  
  - **ACF Content Analysis for Yoast:** If the “ACF Content Analysis for Yoast SEO” plugin is used, `yoast-acf.php` blacklists non-content fields (buttons, images, URLs, etc.) and sets heading levels for hero/home fields so that analysis is accurate.

---

## 10. Image Sizes

**Defined in:** `functions.php` → `aera_technology_setup()`.

| Size name | Dimensions | Crop | Usage |
|-----------|------------|------|--------|
| `logo` | 480×204 | no | Retina logos |
| `resource_card_image` | 342×96 | — | Resource cards |
| `webinar_card_image` | 333×180 | — | Webinar/card |
| `webinar_featured` | 800×450 | yes | Featured webinars |
| `card_logo` | 150×150 | no | Card logos |
| `blog_hero` | 890×0 | — | Blog hero |
| `skill_hero` | 738×0 | — | Skill function hero images |

Names are exposed in the media library selector via `aera_technology_image_sizes` (`image_size_names_choose`).

---

## 11. Company Pages / Sections

- **About Us:** `page-about-us.php`. Leadership and board sections use **team_member** and **board_member** CPTs; queries order by `menu_order`.
- **Partners:** Archive `archive-partner.php`; hero from **Company Options**; CTA from Company Options. Partner entries are **partner** CPT; order by `menu_order` (in `functions.php` → `aera_technology_partner_archive_order`).
- **Customers:** Archive `archive-customer.php`; **customer** CPT; cards use ACF (e.g. customer hero image, assets, CTAs).
- **Careers:** `page-careers.php`; uses ACF (e.g. careers content). Lever API integration is in **`inc/lever.php`** for job listings if used.
- **Industries:** Taxonomy `industry`; managed under **Company** hub (redirect submenu in `inc/taxonomies.php`).

---

## 12. Archive Pages (General)

- **Blog:** `archive-blog.php` — standard archive; uses editor + ACF for content.
- **Webinars:** `archive-webinar.php` — featured block + grid; filters; order by `menu_order` + date; hero from Webinars Options.
- **Events:** `archive-event.php` — list of events; hero from Events Options; event cards with CTA (Register / View / Learn More).
- **Partners:** `archive-partner.php` — hero from Company Options; CTA from Company Options; partner list by `menu_order`.
- **Customers:** `archive-customer.php` — customer cards (ACF hero image, assets).
- **Skills:** `archive-skill.php` — hero from Skills Options; client-side category filter; sort by title/date/menu_order.

Document titles for Webinars and Events archives are set in **`functions.php`** → `aera_technology_custom_archive_title` (filter `document_title_parts`).

---

## 13. Menus

**Registered in:** `functions.php` → `aera_technology_setup()`.

- **primary** — Primary Navigation  
- **primary-utility** — Utility Navigation  
- **footer-aera** — Footer: Aera Decision Cloud  
- **footer-skills** — Footer: Aera Skills  
- **footer-company** — Footer: Company  
- **footer-resources** — Footer: Resources  
- **footer-customers** — Footer: Customers  
- **footer-events** — Footer: Events  
- **footer-cta** — Footer: CTA  
- **footer-social** — Footer: Social Links  

Menus are assigned under **Appearance → Menus** in WP Admin.

---

## 14. Static / Key Pages

- **Home:** Uses front page template (e.g. `front-page.php` if present). Hero and content from **Home** ACF group (`group_aera_home`).
- **AeraHub:** Static pages such as **`page-aerahub-2025.php`** and **`page-aerahub-2025-london.php`**; each has its own script (e.g. `aerahub-2025.js`, `aerahub-2025-london.js`) enqueued in `functions.php` when the template is in use. Content and CTAs are template/ACF-specific.
- **Decision Cloud:** `page-decision-cloud.php` — hero + CTA component (custom CTA array in template).
- **Contact / Demo / Test Drive / Landing:** Use HubSpot forms; templates: `page-contact-us.php`, `page-demo.php`, `page-test-drive.php`, `page-landing-page.php`. Landing page has ACF for HubSpot form ID and shortcode fallback.

---

## 15. FAQs

- **Template:** `page-faq.php` (Template Name: FAQ Page).  
- **Data:** Stored on the **page** that uses this template. ACF group **FAQ Page** (`group_aera_faq_page`): `company_faq_title`, `company_faq_intro`, `company_faq_sections` (repeater with section title, description, and FAQ items).
- **Rendering:** `inc/faq.php` — `get_company_faq_data( $post_id )` and `render_faq_markup()`. The FAQ template calls these for the current page.
- **Shortcode:** `[aera_faq]` — renders the same FAQ data for the **current page**; useful if you drop the shortcode on any page. FAQ script is enqueued when the template is used or when the shortcode is present (`enqueue_faq_assets` in `inc/faq.php`).

---

## 16. Custom Ordering (Intuitive CPO)

- **Plugin:** Intuitive Custom Post Order (or similar) is used to set **menu_order** for drag-and-drop ordering.
- **Where order matters:**  
  - **Webinars:** Featured and grid order by `menu_order` then date/meta.  
  - **Events:** Query can use `menu_order` if needed.  
  - **Partners:** Archive orders by `menu_order` (theme’s `pre_get_posts`).  
  - **Skills:** Archive and skill function panels order skills by `menu_order`.  
  - **Case studies:** Resources query for case studies uses `menu_order` then date.  
  - **Leadership/Board:** About Us uses `menu_order` for team_member and board_member.

Theme code uses `orderby => 'menu_order'` (and often `order => 'ASC'`); the plugin provides the UI to set the order.

---

## 17. Custom Page Templates (Quick Reference)

| Template file | Uses custom fields (ACF) |
|---------------|--------------------------|
| `page-resources.php` | Yes — Resources hero |
| `page-skills-home.php` | Yes — Hero, CTA, Skills Options |
| `page-faq.php` | Yes — FAQ Page group |
| `page-about-us.php` | Yes — Content, leadership |
| `page-careers.php` | Yes — Careers group |
| `page-contact-us.php` | Yes (e.g. hero); HubSpot |
| `page-demo.php` | Yes; HubSpot |
| `page-test-drive.php` | Yes; HubSpot |
| `page-landing-page.php` | Yes — Hero, HubSpot form ID/shortcode |
| `page-decision-cloud.php` | Yes — Hero, CTA, content |
| `page-what-is-decision-intelligence.php` | Yes; custom script |
| `page-platform-detail.php` | Yes — Platform detail |
| `page-aerahub-2025.php` | Yes; custom script |
| `page-aerahub-2025-london.php` | Yes; custom script |

All archive and single templates that show hero/CTA use ACF and/or options as described above.

---

## 18. Other Notable Items

- **Default posts/comments:** Default `post` type is disabled from the front (no URLs, no sitemap); comments are disabled site-wide. See `functions.php` (`aera_disable_default_post_type`, `aera_redirect_disabled_archives`, `aera_disable_comments`, etc.). Blog content uses CPT **blog**.
- **Author display:** User meta `author_photo_url` and `author_position` (edited in User profile) are used for blog author blocks; `get_avatar` is filtered to use `author_photo_url` when set.
- **Icon selector:** ACF select fields for “icon” (e.g. skill icon, home technology icons) are populated from **`assets/images/icons/`** via `aera_populate_icon_choices` in `functions.php`; icon preview in admin is added by `aera_add_icon_preview`.
- **Announcement banner:** **Site Options** ACF (show banner, text, button, URL, colors). Rendered via `inc/banner.php`.
- **Lever (Careers):** `inc/lever.php` — integration for job listings if the Lever plugin/API is in use.
- **Head/meta/favicons:** `inc/head-meta.php`.
- **Navigation/footer:** Custom walkers in `inc/class-navigation-walker.php`, `inc/class-footer-walker.php`, `inc/class-footer-social-walker.php`.

---

## 19. File Map (Theme)

| Area | Location |
|------|----------|
| CPTs | `inc/post-types.php` |
| Taxonomies | `inc/taxonomies.php` |
| Resource helpers (types, query args, labels) | `inc/resources.php` |
| ACF (JSON path) | `inc/acf.php` |
| ACF + Yoast | `inc/yoast-acf.php` |
| FAQ data + shortcode | `inc/faq.php` |
| Admin menus + ACF options pages | `inc/admin.php` |
| Hero component | `template-parts/components/hero.php` |
| CTA component | `template-parts/components/cta.php` |
| ACF field definitions (versioned) | `acf-json/*.json` |

For a full list of custom templates, see **Section 17** and the theme’s `page-*.php` and `archive-*.php` files.
