<?php

/**
 * Advanced Custom Fields helpers.
 *
 * @package Aera_Technology
 */

namespace Aera;

defined('ABSPATH') || exit;

/**
 * Defines the save location for synced ACF JSON files.
 *
 * @return string
 */
function set_acf_json_save_path(): string
{
  $path = get_stylesheet_directory() . '/acf-json';

  if (! is_dir($path)) {
    wp_mkdir_p($path);
  }

  return $path;
}
add_filter('acf/settings/save_json', __NAMESPACE__ . '\\set_acf_json_save_path');

/**
 * Loads local JSON field definitions in addition to the plugin defaults.
 *
 * @param array $paths Existing ACF JSON paths.
 * @return array
 */
function set_acf_json_load_paths(array $paths): array
{
  $paths[] = get_stylesheet_directory() . '/acf-json';

  return $paths;
}
add_filter('acf/settings/load_json', __NAMESPACE__ . '\\set_acf_json_load_paths');

/**
 * Normalize meet subdomain URLs: strip erroneous "www" (meet.www.aeratechnology.com → meet.aeratechnology.com).
 * Webinar and other resource links should point to meet.aeratechnology.com; if stored or built with www
 * (e.g. from site URL having www), fix at load time so all output uses the correct host.
 *
 * @param mixed $value   Field value.
 * @param int   $post_id Post ID.
 * @param array $field   ACF field array.
 * @return mixed
 */
function normalize_meet_subdomain_url($value, $post_id, $field)
{
  if (! is_string($value) || empty($value)) {
    return $value;
  }
  if (isset($field['name']) && $field['name'] !== 'resource_external_url') {
    return $value;
  }
  $wrong_host = 'meet.www.aeratechnology.com';
  $correct_host = 'meet.aeratechnology.com';
  if (strpos($value, $wrong_host) !== false) {
    return str_replace($wrong_host, $correct_host, $value);
  }
  return $value;
}
add_filter('acf/load_value/name=resource_external_url', __NAMESPACE__ . '\\normalize_meet_subdomain_url', 10, 3);

/**
 * Keep Page Hero above and Page CTA below other page-level ACF groups.
 *
 * @param array $field_group ACF field group definition.
 * @return array
 */
function adjust_field_group_order(array $field_group): array
{
  if (($field_group['key'] ?? '') === 'group_aera_page_hero') {
    $field_group['menu_order'] = -20;
  }

  if (($field_group['key'] ?? '') === 'group_aera_page_cta') {
    $field_group['menu_order'] = 200;
  }

  return $field_group;
}
add_filter('acf/load_field_group', __NAMESPACE__ . '\\adjust_field_group_order');

/**
 * Apply editor-focused field tweaks without relying on JSON edits.
 *
 * @param array $field ACF field definition.
 * @return array
 */
function adjust_field_settings(array $field): array
{
  $field_name = $field['name'] ?? '';
  $field_key = $field['key'] ?? '';

  if ($field_name === 'hero_title') {
    $field['required'] = 0;
  }

  if ($field_name === 'video_thumbnail') {
    $field['required'] = 1;
    if (!isset($field['wrapper']) || !is_array($field['wrapper'])) {
      $field['wrapper'] = array();
    }
    $field['wrapper']['width'] = '100';
  }

  if ($field_name === 'video_url') {
    if (!isset($field['wrapper']) || !is_array($field['wrapper'])) {
      $field['wrapper'] = array();
    }
    $field['wrapper']['width'] = '50';
  }

  if ($field_name === 'hubspot_form_id') {
    if (!isset($field['wrapper']) || !is_array($field['wrapper'])) {
      $field['wrapper'] = array();
    }
    $field['wrapper']['width'] = '50';
  }

  if (
    $field_key === 'field_cta_button_link_external' ||
    $field_key === 'field_cta_button_link_internal' ||
    $field_key === 'field_cta_button_link_resource'
  ) {
    if (!isset($field['wrapper']) || !is_array($field['wrapper'])) {
      $field['wrapper'] = array();
    }
    $field['wrapper']['width'] = '33.33';
  }

  return $field;
}
add_filter('acf/load_field', __NAMESPACE__ . '\\adjust_field_settings');

/**
 * Hide all editable "Posts Per Page" option fields in ACF option screens.
 *
 * @param array $field ACF field definition.
 * @return array|false
 */
function hide_posts_per_page_option_fields($field)
{
  $field_name = is_array($field) ? ($field['name'] ?? '') : '';
  if (is_string($field_name) && preg_match('/_posts_per_page$/', $field_name)) {
    return false;
  }

  return $field;
}
add_filter('acf/prepare_field', __NAMESPACE__ . '\\hide_posts_per_page_option_fields');

/**
 * Keep Yoast SEO metabox below ACF/custom fields.
 *
 * @return string
 */
function set_yoast_metabox_priority(): string
{
  return 'low';
}
add_filter('wpseo_metabox_prio', __NAMESPACE__ . '\\set_yoast_metabox_priority');
