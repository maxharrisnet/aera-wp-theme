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
    'team_group'        => array(
      'singular' => __('Team Group', 'aera'),
      'plural'   => __('Team Groups', 'aera'),
      'slug'     => 'team-group',
      'args'     => array(
        'hierarchical' => true,
      ),
      'post_types' => array('team_member'),
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
    'skillset'      => array(
      'singular' => __('Skillset', 'aera'),
      'plural'   => __('Skillsets', 'aera'),
      'slug'     => 'skillset',
      'args'     => array(
        'hierarchical' => true,
      ),
      'post_types' => array('skill'),
    ),
    'skill_category' => array(
      'singular' => __('Skill Category', 'aera'),
      'plural'   => __('Skill Categories', 'aera'),
      'slug'     => 'skill-category',
      'args'     => array(
        'hierarchical' => true,
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

