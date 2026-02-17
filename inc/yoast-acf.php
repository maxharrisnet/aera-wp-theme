<?php

/**
 * Yoast SEO + ACF integration — field mapping.
 *
 * Uses Yoast Premium's built-in custom fields analysis mechanism
 * (WPSEO_Custom_Fields_Plugin) to include ACF field content in
 * the Yoast content analysis, plus the ACF Content Analysis plugin
 * filters as a secondary layer.
 *
 * @package Aera_Technology
 */

namespace Aera;

defined('ABSPATH') || exit;

/**
 * =========================================================================
 * FIELD MAP — Yoast Premium Custom Fields (primary mechanism)
 * =========================================================================
 *
 * Yoast Premium reads meta key names from the `wpseo_titles` option
 * under `page-analyse-extra-{post_type}` and passes them to its JS
 * analysis plugin. The JS reads the saved meta values and includes
 * them in real-time content analysis.
 *
 * This filter injects the correct ACF meta key names per post type
 * so no manual Yoast UI configuration is needed.
 * =========================================================================
 */

/**
 * Inject ACF field meta keys into Yoast Premium's custom fields
 * analysis, keyed by post type.
 *
 * @param array $options The wpseo_titles option values.
 * @return array Modified options with custom field names per CPT.
 */
function yoast_register_custom_fields_for_analysis($options)
{
  // Map of post_type => comma-separated meta key names to analyse.
  $fields_map = array(

    // ─── Blog ───────────────────────────────────────────────
    'blog' => implode(',', array(
      'blog_lead',             // Lead/intro text (textarea)
      'resource_card_title',   // Card title (text)
      'resource_excerpt',      // Card excerpt / description (textarea)
    )),

    // ─── Pages (including front-page) ──────────────────────
    'page' => implode(',', array(
      'hero_title',            // Hero <h1> (text)
      'hero_title_line_two',   // Hero <h1> line 2 (text)
      'hero_subtitle',         // Hero <h2> (text)
      'hero_text',             // Hero body text (textarea)
      'home_additional_text',  // Home supporting text (textarea)
      // Home technology sections repeater (up to 5 rows)
      'home_technology_sections_0_title',
      'home_technology_sections_0_description',
      'home_technology_sections_1_title',
      'home_technology_sections_1_description',
      'home_technology_sections_2_title',
      'home_technology_sections_2_description',
      'home_technology_sections_3_title',
      'home_technology_sections_3_description',
      'home_technology_sections_4_title',
      'home_technology_sections_4_description',
    )),

    // ─── Press Releases ─────────────────────────────────────
    'press-release' => implode(',', array(
      'press_release_publication', // Publication name (text)
      'resource_card_title',
      'resource_excerpt',
    )),

    // ─── Case Studies ───────────────────────────────────────
    'case-study' => implode(',', array(
      'case_study_company_name',   // Company name (text)
      'case_study_industry',       // Industry (text)
      'case_study_body_copy',      // Main body (wysiwyg)
      'case_study_business_need',  // Business need (wysiwyg)
      'case_study_short_solution', // Solution summary (wysiwyg)
      'case_study_short_result',   // Results summary (wysiwyg)
      'case_study_challenges',     // Challenges (wysiwyg)
      'case_study_solution',       // Solution detail (wysiwyg)
      'case_study_results',        // Results detail (wysiwyg)
      'case_study_top_quote',      // Featured quote (wysiwyg)
      'case_study_quote',          // Additional quote (wysiwyg)
      'resource_card_title',
      'resource_excerpt',
    )),

    // ─── Whitepapers ────────────────────────────────────────
    'whitepaper' => implode(',', array(
      'resource_card_title',
      'resource_excerpt',
    )),

    // ─── Skills ─────────────────────────────────────────────
    // Note: content_sections is a repeater — sub-field meta keys
    // use the pattern content_sections_{n}_content. We include
    // up to 10 rows; extra keys with no data are harmless.
    'skill' => implode(',', array(
      'skill_description',
      'resource_card_title',
      'resource_excerpt',
      'content_sections_0_content',
      'content_sections_1_content',
      'content_sections_2_content',
      'content_sections_3_content',
      'content_sections_4_content',
      'content_sections_5_content',
      'content_sections_6_content',
      'content_sections_7_content',
      'content_sections_8_content',
      'content_sections_9_content',
    )),
  );

  foreach ($fields_map as $post_type => $field_names) {
    $option_key = 'page-analyse-extra-' . $post_type;

    // Merge with any manually-configured fields from the Yoast UI.
    $existing = isset($options[$option_key]) ? trim($options[$option_key]) : '';
    if (!empty($existing)) {
      // Avoid duplicates: combine existing + our fields, deduplicate.
      $all = array_unique(array_filter(array_map('trim', explode(',', $existing . ',' . $field_names))));
      $options[$option_key] = implode(',', $all);
    } else {
      $options[$option_key] = $field_names;
    }
  }

  /**
   * Meta description fallback templates.
   *
   * Uses Yoast's %%cf_<field>%% replacement variable to pull from ACF fields
   * when no per-page meta description is set. Only injects a template if one
   * is not already configured.
   *
   * Note: These are fallbacks. The homepage and key pages should still get
   * hand-written meta descriptions via the Yoast meta box.
   */
  $metadesc_templates = array(
    'metadesc-page'          => '%%cf_hero_text%%',
    'metadesc-blog'          => '%%cf_blog_lead%%',
    'metadesc-case-study'    => '%%cf_resource_excerpt%%',
    'metadesc-press-release' => '%%cf_resource_excerpt%%',
    'metadesc-whitepaper'    => '%%cf_resource_excerpt%%',
    'metadesc-skill'         => '%%cf_skill_description%%',
  );

  foreach ($metadesc_templates as $key => $template) {
    if (empty($options[$key])) {
      $options[$key] = $template;
    }
  }

  return $options;
}
add_filter('option_wpseo_titles', __NAMESPACE__ . '\\yoast_register_custom_fields_for_analysis');

/**
 * =========================================================================
 * ACF Content Analysis for Yoast SEO — filter hooks (secondary layer)
 * =========================================================================
 *
 * These filters are for the "ACF Content Analysis for Yoast SEO" plugin.
 * If installed and working, they refine which ACF fields are scored and
 * define heading levels. If the plugin is not active, these are harmless.
 * =========================================================================
 */

/**
 * Blacklist specific ACF fields from the ACF Content Analysis plugin.
 *
 * @param object $blacklist_name The blacklist object.
 * @return object
 */
function yoast_acf_blacklist_fields($blacklist_name)
{
  // Page Hero — UI/style fields
  $blacklist_name->add('hero_button_text');
  $blacklist_name->add('hero_button_link');
  $blacklist_name->add('hero_variation');
  $blacklist_name->add('hero_full_height');

  // Page CTA — sitewide repeated content
  $blacklist_name->add('cta_title');
  $blacklist_name->add('cta_buttons');

  // Resource Card — non-content fields
  $blacklist_name->add('resource_author');
  $blacklist_name->add('resource_card_image');
  $blacklist_name->add('resource_cta_text');
  $blacklist_name->add('resource_external_url');
  $blacklist_name->add('resource_coming_soon');
  $blacklist_name->add('resource_logo');

  // Press Release
  $blacklist_name->add('press_release_logo');

  // Case Study — card-only fields
  $blacklist_name->add('case_study_type');
  $blacklist_name->add('case_study_company_type');
  $blacklist_name->add('case_study_icon');
  $blacklist_name->add('case_study_employees');
  $blacklist_name->add('case_study_revenue');
  $blacklist_name->add('case_study_business_problem');
  $blacklist_name->add('case_study_business_statement');
  $blacklist_name->add('case_study_featured_image');

  // Whitepaper
  $blacklist_name->add('whitepaper_hubspot_form');

  // Skill — non-content fields
  $blacklist_name->add('skill_icon');
  $blacklist_name->add('video_thumbnail');
  $blacklist_name->add('video_url');
  $blacklist_name->add('hubspot_form_id');

  // Home Page
  $blacklist_name->add('home_cta');

  // Repeater / Group sub-fields — non-content
  $blacklist_name->add('cta_label');
  $blacklist_name->add('cta_link');
  $blacklist_name->add('speaker');
  $blacklist_name->add('anchor');
  $blacklist_name->add('link_external');
  $blacklist_name->add('video');

  // Taxonomy / relationship fields
  $blacklist_name->add('related_skill_functions');
  $blacklist_name->add('customer_logo');

  return $blacklist_name;
}
add_filter('Yoast\WP\ACF\blacklist_name', __NAMESPACE__ . '\\yoast_acf_blacklist_fields');

/**
 * Blacklist non-text ACF field types from the ACF Content Analysis plugin.
 *
 * @param object $blacklist_type The blacklist type object.
 * @return object
 */
function yoast_acf_blacklist_types($blacklist_type)
{
  $types = array(
    'image', 'file', 'gallery',
    'url', 'link', 'page_link',
    'true_false',
    'post_object', 'relationship', 'taxonomy', 'user',
    'color_picker', 'google_map', 'button_group',
    'password', 'date_picker', 'date_time_picker', 'time_picker',
  );

  foreach ($types as $type) {
    $blacklist_type->add($type);
  }

  return $blacklist_type;
}
add_filter('Yoast\WP\ACF\blacklist_type', __NAMESPACE__ . '\\yoast_acf_blacklist_types');

/**
 * Define heading levels for ACF fields (ACF Content Analysis plugin).
 *
 * @param array $headlines Existing headline mappings.
 * @return array
 */
function yoast_acf_headlines($headlines)
{
  // Page Hero
  $headlines['field_hero_title']          = 1;
  $headlines['field_hero_title_line_two'] = 1;
  $headlines['field_hero_subtitle']       = 2;

  // Home Page
  $headlines['field_home_hero_title']       = 1;
  $headlines['field_home_hero_tagline']     = 2;
  $headlines['field_home_technology_title'] = 2;
  $headlines['field_home_additional_text']  = 2;

  return $headlines;
}
add_filter('Yoast\WP\ACF\headlines', __NAMESPACE__ . '\\yoast_acf_headlines');

/**
 * Set ACF Content Analysis refresh rate.
 *
 * @return int Milliseconds.
 */
function yoast_acf_refresh_rate()
{
  return 1000;
}
add_filter('Yoast\WP\ACF\refresh_rate', __NAMESPACE__ . '\\yoast_acf_refresh_rate');
