<?php

/**
 * Registers custom taxonomies used by the theme.
 *
 * @package Aera_Technology
 */

namespace Aera;

defined('ABSPATH') || exit;

/**
 * Registers taxonomies for content grouping and filtering.
 *
 * @return void
 */
function register_taxonomies(): void
{
  $resourceTypes = array(
    'news',
    'press-release',
    'video',
    'whitepaper',
    'blog',
    'case-study',
    'podcast',
    'customer',
    'event',
    'webinar',
    'faq',
    'media-item',
  );

  $taxonomies = array(
    'resource_topic'    => array(
      'singular' => __('Resource Topic', 'aera'),
      'plural'   => __('Resource Topics', 'aera'),
      'slug'     => 'resource-topic',
      'args'     => array(
        'hierarchical' => false,
      ),
      'post_types' => $resourceTypes,
    ),
    'industry' => array(
      'singular' => __('Industry', 'aera'),
      'plural'   => __('Industries', 'aera'),
      'slug'     => 'industry',
      'args'     => array(
        'hierarchical' => true,
      ),
      'post_types' => $resourceTypes, // Already includes webinar
    ),
    'webinar_solution_area' => array(
      'singular' => __('Solution Area', 'aera'),
      'plural'   => __('Solution Areas', 'aera'),
      'slug'     => 'webinar-solution-area',
      'args'     => array(
        'hierarchical' => true,
      ),
      'post_types' => array('webinar'),
    ),
    'webinar_job_function' => array(
      'singular' => __('Job Function', 'aera'),
      'plural'   => __('Job Functions', 'aera'),
      'slug'     => 'webinar-job-function',
      'args'     => array(
        'hierarchical' => true,
      ),
      'post_types' => array('webinar'),
    ),
    'skill_function' => array(
      'singular' => __('Function', 'aera'),
      'plural'   => __('Functions', 'aera'),
      'slug'     => 'function',
      'args'     => array(
        'hierarchical' => true,
        'show_admin_column' => false,
      ),
      'post_types' => array('skill'),
    ),
    'skill_category' => array(
      'singular' => __('Skill Category', 'aera'),
      'plural'   => __('Skill Categories', 'aera'),
      'slug'     => 'category',
      'args'     => array(
        'hierarchical' => true,
        'show_admin_column' => true,
      ),
      'post_types' => array('skill'),
    ),
  );

  foreach ($taxonomies as $taxonomy => $settings) {
    $labels = array(
      'name'              => $settings['plural'],
      'singular_name'     => $settings['singular'],
      'search_items'      => sprintf(__('Search %s', 'aera'), $settings['plural']),
      'all_items'         => sprintf(__('All %s', 'aera'), $settings['plural']),
      'parent_item'       => sprintf(__('Parent %s', 'aera'), $settings['singular']),
      'parent_item_colon' => sprintf(__('Parent %s:', 'aera'), $settings['singular']),
      'edit_item'         => sprintf(__('Edit %s', 'aera'), $settings['singular']),
      'update_item'       => sprintf(__('Update %s', 'aera'), $settings['singular']),
      'add_new_item'      => sprintf(__('Add New %s', 'aera'), $settings['singular']),
      'new_item_name'     => sprintf(__('New %s Name', 'aera'), $settings['singular']),
      'menu_name'         => $settings['plural'],
    );

    $args = array(
      'labels'            => $labels,
      'show_admin_column' => true,
      'rewrite'           => array(
        'slug'       => $settings['slug'],
        'with_front' => false,
      ),
      'show_in_rest'      => true,
      'public'            => true,
    );

    $args = array_merge($args, $settings['args']);

    $postTypes = $settings['post_types'] ?? $resourceTypes;

    register_taxonomy($taxonomy, $postTypes, $args);

    foreach ($postTypes as $type) {
      register_taxonomy_for_object_type($taxonomy, $type);
    }
  }
}

add_action('init', __NAMESPACE__ . '\\register_taxonomies', 11);

/**
 * Moves the Industry taxonomy menu item under the Company hub menu.
 *
 * @return void
 */
function nest_industry_taxonomy_menu(): void
{
  global $submenu;

  // Remove Industry from its default location (under each post type)
  if (isset($submenu['aera-company-hub'])) {
    // Find and remove Industry taxonomy menu items from other locations
    foreach ($submenu as $parent => $items) {
      if ($parent !== 'aera-company-hub' && is_array($items)) {
        foreach ($items as $key => $item) {
          if (isset($item[2]) && strpos($item[2], 'edit-tags.php?taxonomy=industry') !== false) {
            unset($submenu[$parent][$key]);
          }
        }
      }
    }

    // Add Industry taxonomy under Company hub
    $taxonomy = get_taxonomy('industry');
    if ($taxonomy && current_user_can($taxonomy->cap->manage_terms)) {
      add_submenu_page(
        'aera-company-hub',
        $taxonomy->labels->name,
        $taxonomy->labels->menu_name,
        $taxonomy->cap->manage_terms,
        'edit-tags.php?taxonomy=industry'
      );
    }
  }
}
add_action('admin_menu', __NAMESPACE__ . '\\nest_industry_taxonomy_menu', 20);

/**
 * Set the number of skills to display per page in admin.
 *
 * @param int $per_page Number of posts per page.
 * @return int Modified number of posts per page.
 */
function set_skills_per_page(int $per_page): int
{
  return 100;
}
add_filter('edit_skill_per_page', __NAMESPACE__ . '\\set_skills_per_page');

/**
 * Add custom column to skill_category admin to show parent function.
 *
 * @param array $columns Existing columns.
 * @return array Modified columns.
 */
function add_skill_category_parent_function_column(array $columns): array
{
  // Insert after the 'name' column
  $new_columns = array();
  foreach ($columns as $key => $value) {
    $new_columns[$key] = $value;
    if ($key === 'name') {
      $new_columns['parent_function'] = __('Parent Function', 'aera');
    }
  }
  return $new_columns;
}
add_filter('manage_edit-skill_category_columns', __NAMESPACE__ . '\\add_skill_category_parent_function_column');

/**
 * Populate the parent function column in skill_category admin.
 *
 * @param string $content Column content.
 * @param string $column_name Column name.
 * @param int $term_id Term ID.
 * @return string Column content.
 */
function populate_skill_category_parent_function_column(string $content, string $column_name, int $term_id): string
{
  if ($column_name === 'parent_function') {
    $parent_function_id = function_exists('get_field') ? get_field('parent_function', 'skill_category_' . $term_id) : null;

    if ($parent_function_id) {
      $parent_function = get_term($parent_function_id, 'skill_function');
      if ($parent_function && !is_wp_error($parent_function)) {
        return esc_html($parent_function->name);
      }
    }
    return '—';
  }
  return $content;
}
add_filter('manage_skill_category_custom_column', __NAMESPACE__ . '\\populate_skill_category_parent_function_column', 10, 3);
