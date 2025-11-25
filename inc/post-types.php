<?php

/**
 * Registers custom post types used across the Aera theme.
 *
 * @package Aera_Technology
 */

namespace Aera;

defined('ABSPATH') || exit;

/**
 * Registers all theme-specific post types.
 *
 * @return void
 */
function register_post_types(): void
{
  $defaultSupports = array(
    'title',
    'editor',
    'excerpt',
    'thumbnail',
    'revisions',
  );

  $contentMenuSlug = 'aera-content-hub';
  $contentMenuTypes = array(
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

  $postTypes = array(
    'news'          => array(
      'singular'  => __('News Item', 'aera'),
      'plural'    => __('News', 'aera'),
      'rewrite'   => 'news',
      'menu_icon' => 'dashicons-megaphone',
    ),
    'press-release' => array(
      'singular'  => __('Press Release', 'aera'),
      'plural'    => __('Press Releases', 'aera'),
      'rewrite'   => 'press-releases',
      'menu_icon' => 'dashicons-media-text',
    ),
    'video'         => array(
      'singular'  => __('Video', 'aera'),
      'plural'    => __('Videos', 'aera'),
      'rewrite'   => 'videos',
      'menu_icon' => 'dashicons-video-alt3',
    ),
    'whitepaper'    => array(
      'singular'  => __('Whitepaper', 'aera'),
      'plural'    => __('Whitepapers', 'aera'),
      'rewrite'   => 'whitepapers',
      'menu_icon' => 'dashicons-media-document',
    ),
    'blog'          => array(
      'singular'  => __('Blog Article', 'aera'),
      'plural'    => __('Blogs', 'aera'),
      'rewrite'   => 'blogs',
      'menu_icon' => 'dashicons-edit',
    ),
    'case-study'    => array(
      'singular'  => __('Case Study', 'aera'),
      'plural'    => __('Case Studies', 'aera'),
      'rewrite'   => 'case-study',
      'menu_icon' => 'dashicons-chart-area',
    ),
    'podcast'       => array(
      'singular'  => __('Podcast Episode', 'aera'),
      'plural'    => __('Podcasts', 'aera'),
      'rewrite'   => 'podcasts',
      'menu_icon' => 'dashicons-microphone',
    ),
    'customer'      => array(
      'singular'  => __('Customer Story', 'aera'),
      'plural'    => __('Customers', 'aera'),
      'rewrite'   => 'customers',
      'menu_icon' => 'dashicons-groups',
    ),
    'event'         => array(
      'singular'  => __('Event', 'aera'),
      'plural'    => __('Events', 'aera'),
      'rewrite'   => 'events',
      'menu_icon' => 'dashicons-calendar-alt',
    ),
    'webinar'       => array(
      'singular'  => __('Webinar', 'aera'),
      'plural'    => __('Webinars', 'aera'),
      'rewrite'   => 'webinars',
      'menu_icon' => 'dashicons-video-alt2',
    ),
    'faq'           => array(
      'singular'  => __('FAQ Item', 'aera'),
      'plural'    => __('FAQs', 'aera'),
      'rewrite'   => 'faq',
      'menu_icon' => 'dashicons-editor-help',
    ),
    'media-item'    => array(
      'singular'  => __('Media Item', 'aera'),
      'plural'    => __('Media Items', 'aera'),
      'rewrite'   => 'media-items',
      'menu_icon' => 'dashicons-portfolio',
      'supports'  => array_merge($defaultSupports, array('custom-fields')),
    ),
  );

  foreach ($postTypes as $type => $settings) {
    $labels = array(
      'name'               => $settings['plural'],
      'singular_name'      => $settings['singular'],
      'menu_name'          => $settings['plural'],
      'name_admin_bar'     => $settings['singular'],
      'add_new'            => __('Add New', 'aera'),
      'add_new_item'       => sprintf(__('Add New %s', 'aera'), $settings['singular']),
      'new_item'           => sprintf(__('New %s', 'aera'), $settings['singular']),
      'edit_item'          => sprintf(__('Edit %s', 'aera'), $settings['singular']),
      'view_item'          => sprintf(__('View %s', 'aera'), $settings['singular']),
      'all_items'          => $settings['plural'],
      'search_items'       => sprintf(__('Search %s', 'aera'), $settings['plural']),
      'parent_item_colon'  => sprintf(__('Parent %s:', 'aera'), $settings['plural']),
      'not_found'          => __('No results found.', 'aera'),
      'not_found_in_trash' => __('No results found in Trash.', 'aera'),
    );

    $args = array(
      'labels'             => $labels,
      'public'             => true,
      'has_archive'        => true,
      'rewrite'            => array('slug' => $settings['rewrite'], 'with_front' => false),
      'show_in_rest'       => true,
      'menu_position'      => 20,
      'menu_icon'          => $settings['menu_icon'],
      'supports'           => $settings['supports'] ?? $defaultSupports,
      'taxonomies'         => array(),
      'show_in_nav_menus'  => true,
      'publicly_queryable' => true,
      'hierarchical'       => false,
      'show_in_menu'       => in_array($type, $contentMenuTypes, true) ? $contentMenuSlug : true,
    );

    register_post_type($type, $args);
  }
}
add_action('init', __NAMESPACE__ . '\\register_post_types');

