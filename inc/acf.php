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

