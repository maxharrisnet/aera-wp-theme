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

