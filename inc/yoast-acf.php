<?php

/**
 * ACF Content Analysis for Yoast SEO — field mapping.
 *
 * Maps ACF custom fields to Yoast SEO content analysis so that
 * field content is included (or excluded) from readability and
 * keyword scoring.
 *
 * Requires plugin: ACF Content Analysis for Yoast SEO
 *
 * @link https://en-ca.wordpress.org/plugins/acf-content-analysis-for-yoast-seo/
 *
 * @package Aera_Technology
 */

namespace Aera;

defined('ABSPATH') || exit;

/**
 * =========================================================================
 * FIELD MAP OVERVIEW
 * =========================================================================
 *
 * SCORED (included in Yoast analysis):
 * ─────────────────────────────────────────────────────────────────────────
 * Pages (group_aera_page_hero)
 *   hero_title           text      h1 — main page heading
 *   hero_title_line_two  text      h1 — continuation of page heading
 *   hero_subtitle        text      h2
 *   hero_text            textarea  body text
 *
 * Blogs (group_aera_blog)
 *   blog_lead            textarea  lead/intro text
 *
 * Press Releases (group_aera_press_release)
 *   press_release_publication  text  publication name
 *
 * Case Studies — Page Content (group_aera_case_study)
 *   case_study_company_name   text      company name
 *   case_study_industry       text      industry/sector
 *   case_study_body_copy      wysiwyg   main body copy
 *   case_study_business_need  wysiwyg   business need description
 *   case_study_short_solution wysiwyg   solution summary
 *   case_study_short_result   wysiwyg   results summary
 *   case_study_challenges     wysiwyg   challenges section
 *   case_study_solution       wysiwyg   solution section
 *   case_study_results        wysiwyg   results section
 *   case_study_top_quote      wysiwyg   featured quote
 *   case_study_quote          wysiwyg   additional quote
 *
 * Skills (group_aera_skill)
 *   skill_description    textarea  skill description
 *   content_sections     repeater  → sub-field "content" (wysiwyg) is scored
 *
 * Resource Card (group_aera_resource_fields) — on all CPTs
 *   resource_card_title  text      card title (keyword-relevant)
 *   resource_excerpt     textarea  card excerpt (also used in case study hero)
 *
 * Home Page (group_aera_home)
 *   home_hero → title       text      h1
 *   home_hero → tagline     text      h2
 *   home_hero → description textarea  body text
 *   home_technology_sections → title       text      h2
 *   home_technology_sections → description textarea  body text
 *   home_technology_sections → messages → text textarea  message text
 *   home_additional_text     textarea  h2 supporting text
 *
 * BLACKLISTED (excluded from Yoast analysis):
 * ─────────────────────────────────────────────────────────────────────────
 * See yoast_acf_blacklist_fields() below for the full list and reasons.
 * Additionally, non-text field types (image, url, true_false, post_object,
 * etc.) are excluded globally via yoast_acf_blacklist_types().
 * =========================================================================
 */

/**
 * Blacklist specific ACF fields that should NOT be included in
 * Yoast SEO content analysis.
 *
 * These are fields containing URLs, form IDs, style settings,
 * images, toggles, card-only metadata, or other non-content data.
 *
 * @param object $blacklist_name The blacklist object.
 * @return object
 */
function yoast_acf_blacklist_fields($blacklist_name)
{
  // ─── Page Hero (group_aera_page_hero) ─────────────────────
  $blacklist_name->add('hero_button_text');    // Button label (UI element)
  $blacklist_name->add('hero_button_link');    // Button URL
  $blacklist_name->add('hero_variation');      // Style selector
  $blacklist_name->add('hero_full_height');    // Layout toggle

  // ─── Page CTA (group_aera_page_cta) ───────────────────────
  // CTA sections repeat sitewide; not unique page content.
  $blacklist_name->add('cta_title');           // CTA heading
  $blacklist_name->add('cta_buttons');         // CTA button repeater

  // ─── Resource Card (group_aera_resource_fields) ───────────
  // Author: not used — blogs use WP post author, others use
  // "Aera Technology" as author by default.
  $blacklist_name->add('resource_author');
  $blacklist_name->add('resource_card_image'); // Card image (image field)
  $blacklist_name->add('resource_cta_text');   // CTA button label
  $blacklist_name->add('resource_external_url'); // External URL
  $blacklist_name->add('resource_coming_soon'); // Boolean toggle
  $blacklist_name->add('resource_logo');       // Logo image

  // ─── Press Release (group_aera_press_release) ─────────────
  $blacklist_name->add('press_release_logo');  // Publication logo image

  // ─── Case Study — Card Fields (group_aera_case_study) ─────
  // These fields are for archive card display only, not rendered
  // on the single case study template.
  $blacklist_name->add('case_study_type');              // Card label
  $blacklist_name->add('case_study_company_type');      // Card metadata
  $blacklist_name->add('case_study_icon');              // Icon/logo image
  $blacklist_name->add('case_study_employees');         // Card metadata
  $blacklist_name->add('case_study_revenue');           // Card metadata
  $blacklist_name->add('case_study_business_problem');  // Card-only excerpt
  $blacklist_name->add('case_study_business_statement'); // Card-only tagline
  $blacklist_name->add('case_study_featured_image');    // Image field

  // ─── Whitepaper (group_aera_whitepaper) ───────────────────
  $blacklist_name->add('whitepaper_hubspot_form'); // HubSpot form ID

  // ─── Skill (group_aera_skill) ─────────────────────────────
  $blacklist_name->add('skill_icon');          // Icon selector (URL values)
  $blacklist_name->add('video_thumbnail');     // Video thumbnail image
  $blacklist_name->add('video_url');           // Video embed URL
  $blacklist_name->add('hubspot_form_id');     // HubSpot form ID

  // ─── Home Page (group_aera_home) ──────────────────────────
  $blacklist_name->add('home_cta');            // CTA group (sitewide pattern)

  // ─── Repeater / Group Sub-fields ──────────────────────────
  // These sub-field names appear across multiple repeaters and
  // groups and should never be scored.
  $blacklist_name->add('cta_label');           // CTA button label (home hero, tech sections)
  $blacklist_name->add('cta_link');            // CTA URL (home hero, tech sections)
  $blacklist_name->add('speaker');             // Message speaker selector
  $blacklist_name->add('anchor');              // Section anchor ID
  $blacklist_name->add('link_external');       // URL in CTA button sub-fields
  $blacklist_name->add('video');               // Video URL in tech sections

  // ─── Skill Function Taxonomy (group_skill_function_settings)
  $blacklist_name->add('related_skill_functions'); // Taxonomy relationship repeater

  // ─── Customer / Partner Fields ────────────────────────────
  $blacklist_name->add('customer_logo');       // Customer logo image

  return $blacklist_name;
}
add_filter('Yoast\WP\ACF\blacklist_name', __NAMESPACE__ . '\\yoast_acf_blacklist_fields');

/**
 * Blacklist ACF field types that should never contribute text
 * to Yoast SEO content analysis.
 *
 * @param object $blacklist_type The blacklist type object.
 * @return object
 */
function yoast_acf_blacklist_types($blacklist_type)
{
  // Visual / media fields
  $blacklist_type->add('image');
  $blacklist_type->add('file');
  $blacklist_type->add('gallery');

  // URL / link fields
  $blacklist_type->add('url');
  $blacklist_type->add('link');
  $blacklist_type->add('page_link');

  // Boolean / toggle fields
  $blacklist_type->add('true_false');

  // Relationship / reference fields
  $blacklist_type->add('post_object');
  $blacklist_type->add('relationship');
  $blacklist_type->add('taxonomy');
  $blacklist_type->add('user');

  // UI / picker fields
  $blacklist_type->add('color_picker');
  $blacklist_type->add('google_map');
  $blacklist_type->add('button_group');
  $blacklist_type->add('password');
  $blacklist_type->add('date_picker');
  $blacklist_type->add('date_time_picker');
  $blacklist_type->add('time_picker');

  return $blacklist_type;
}
add_filter('Yoast\WP\ACF\blacklist_type', __NAMESPACE__ . '\\yoast_acf_blacklist_types');

/**
 * Define heading levels for specific ACF fields.
 *
 * Tells Yoast which fields represent headings so that the
 * heading structure analysis is accurate.
 *
 * Uses ACF field KEYS (not names) per the plugin API.
 *
 * @param array $headlines Existing headline mappings.
 * @return array
 */
function yoast_acf_headlines($headlines)
{
  // ─── Page Hero ────────────────────────────────────────────
  // hero.php renders hero_title as <h1> and hero_subtitle as <h2>
  $headlines['field_hero_title']          = 1; // <h1>
  $headlines['field_hero_title_line_two'] = 1; // Part of <h1>
  $headlines['field_hero_subtitle']       = 2; // <h2>

  // ─── Home Page ────────────────────────────────────────────
  // front-page.php renders title as <h1>, tagline as <h2>,
  // technology titles as <h2>, additional text as <h2>
  $headlines['field_home_hero_title']        = 1; // <h1>
  $headlines['field_home_hero_tagline']      = 2; // <h2>
  $headlines['field_home_technology_title']  = 2; // <h2>
  $headlines['field_home_additional_text']   = 2; // <h2>

  return $headlines;
}
add_filter('Yoast\WP\ACF\headlines', __NAMESPACE__ . '\\yoast_acf_headlines');

/**
 * Set the content analysis refresh rate.
 *
 * The default can be aggressive; 1000ms provides a good balance
 * between responsiveness and editor performance.
 *
 * @return int Refresh rate in milliseconds.
 */
function yoast_acf_refresh_rate()
{
  return 1000;
}
add_filter('Yoast\WP\ACF\refresh_rate', __NAMESPACE__ . '\\yoast_acf_refresh_rate');
