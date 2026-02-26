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
    'revisions',
  );

  $resourcesMenuSlug = 'aera-resources-hub';
  $resourcesMenuTypes = array(
    'news',
    'press-release',
    'video',
    'whitepaper',
    'blog',
    'case-study',
    'podcast',
    'report',
    'webinar',
  );

  $companyMenuSlug = 'aera-company-hub';
  $companyMenuTypes = array(
    'team_member',
    'board_member',
    'partner',
    'customer',
  );

  // ---------------------------------------------------------------
  // CPT URL strategy:
  //
  // SINGLE + ARCHIVE: blog, skill (archive only, singles redirect)
  // SINGLE ONLY:      press-release (slug: news), whitepaper, case-study
  // ARCHIVE ONLY:     webinar, event, customer, partner (singles redirect)
  // NO FRONT-END:     news, video, podcast, report
  //                   team_member, board_member
  // ---------------------------------------------------------------

  $postTypes = array(
    // --- External-link CPTs: No front-end URLs ---
    'news'          => array(
      'singular'  => __('News Item', 'aera'),
      'plural'    => __('News', 'aera'),
      'rewrite'   => false,
      'menu_icon' => 'dashicons-megaphone',
      'publicly_queryable' => false,
      'has_archive' => false,
      'exclude_from_search' => true,
      'query_var' => false,
    ),
    'video'         => array(
      'singular'  => __('Video', 'aera'),
      'plural'    => __('Videos', 'aera'),
      'rewrite'   => false,
      'menu_icon' => 'dashicons-video-alt3',
      'publicly_queryable' => false,
      'has_archive' => false,
      'exclude_from_search' => true,
      'query_var' => false,
    ),
    'podcast'       => array(
      'singular'  => __('Podcast Episode', 'aera'),
      'plural'    => __('Podcasts', 'aera'),
      'rewrite'   => false,
      'menu_icon' => 'dashicons-microphone',
      'publicly_queryable' => false,
      'has_archive' => false,
      'exclude_from_search' => true,
      'query_var' => false,
    ),
    'report'        => array(
      'singular'  => __('Report', 'aera'),
      'plural'    => __('Reports', 'aera'),
      'rewrite'   => false,
      'menu_icon' => 'dashicons-media-document',
      'publicly_queryable' => false,
      'has_archive' => false,
      'exclude_from_search' => true,
      'query_var' => false,
    ),
    // --- Single-page CPTs: Have template pages, no archive ---
    'press-release' => array(
      'singular'  => __('Press Release', 'aera'),
      'plural'    => __('Press Releases', 'aera'),
      'rewrite'   => 'news', // Original site: /news/{slug}
      'menu_icon' => 'dashicons-media-text',
      'has_archive' => false,
    ),
    'whitepaper'    => array(
      'singular'  => __('Whitepaper', 'aera'),
      'plural'    => __('Whitepapers', 'aera'),
      'rewrite'   => 'whitepapers',
      'menu_icon' => 'dashicons-media-document',
      'has_archive' => false,
    ),
    'case-study'    => array(
      'singular'  => __('Case Study', 'aera'),
      'plural'    => __('Case Studies', 'aera'),
      'rewrite'   => 'case-study',
      'menu_icon' => 'dashicons-chart-area',
      'has_archive' => false,
    ),

    // --- Single + Archive CPTs ---
    'blog'          => array(
      'singular'  => __('Blog Article', 'aera'),
      'plural'    => __('Blogs', 'aera'),
      'rewrite'   => 'blogs',
      'menu_icon' => 'dashicons-edit',
      'supports'  => array_merge($defaultSupports, array('excerpt', 'thumbnail', 'author')),
    ),

    // --- Archive-only CPTs: Have archive templates, singles redirect ---
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
      'menu_position' => 6,
    ),
    'webinar'       => array(
      'singular'  => __('Webinar', 'aera'),
      'plural'    => __('Webinars', 'aera'),
      'rewrite'   => 'webinars',
      'menu_icon' => 'dashicons-video-alt2',
      'menu_position' => 7,
    ),
    'partner'       => array(
      'singular'  => __('Partner', 'aera'),
      'plural'    => __('Partners', 'aera'),
      'rewrite'   => 'partners',
      'menu_icon' => 'dashicons-groups',
      'supports'  => array('title', 'editor', 'revisions'),
      'public'    => true,
      'has_archive' => true,
      'publicly_queryable' => true,
    ),

    // --- Skills: Archive + taxonomy pages, individual skills redirect ---
    'skill'         => array(
      'singular'  => __('Skill', 'aera'),
      'plural'    => __('Skills', 'aera'),
      'rewrite'   => 'skills',
      'menu_icon' => 'dashicons-awards',
      'menu_position' => 8,
      'supports'  => array_merge($defaultSupports, array('custom-fields')),
    ),

    // --- Internal-only CPTs: No front-end URLs ---
    'team_member'   => array(
      'singular'  => __('Leader', 'aera'),
      'plural'    => __('Leadership', 'aera'),
      'rewrite'   => false,
      'menu_icon' => 'dashicons-groups',
      'supports'  => array('title', 'revisions'),
      'public'    => true,
      'has_archive' => false,
      'publicly_queryable' => false,
      'query_var' => false,
    ),
    'board_member'  => array(
      'singular'  => __('Board Member', 'aera'),
      'plural'    => __('Board Members', 'aera'),
      'rewrite'   => false,
      'menu_icon' => 'dashicons-groups',
      'supports'  => array('title', 'revisions'),
      'public'    => true,
      'has_archive' => false,
      'publicly_queryable' => false,
      'query_var' => false,
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

    $rewrite = false;
    if (!empty($settings['rewrite']) && $settings['rewrite'] !== false) {
      $rewrite = array('slug' => $settings['rewrite'], 'with_front' => false);
    }

    $args = array(
      'labels'              => $labels,
      'public'              => $settings['public'] ?? true,
      'has_archive'         => $settings['has_archive'] ?? true,
      'rewrite'             => $rewrite,
      'show_in_rest'        => true,
      'menu_position'       => $settings['menu_position'] ?? 20,
      'menu_icon'           => $settings['menu_icon'],
      'supports'            => $settings['supports'] ?? $defaultSupports,
      'taxonomies'          => array(),
      'show_in_nav_menus'   => true,
      'publicly_queryable'  => $settings['publicly_queryable'] ?? true,
      'exclude_from_search' => $settings['exclude_from_search'] ?? false,
      'query_var'           => $settings['query_var'] ?? true,
      'hierarchical'        => false,
      'show_in_menu'        => isset($settings['show_in_menu']) ? $settings['show_in_menu'] : (($type === 'event' || $type === 'webinar') ? true : (in_array($type, $resourcesMenuTypes, true) ? $resourcesMenuSlug : (in_array($type, $companyMenuTypes, true) ? $companyMenuSlug : true))),
    );

    register_post_type($type, $args);
  }
}
add_action('init', __NAMESPACE__ . '\\register_post_types');

/**
 * Removes the default WordPress content editor for resource post types that use
 * ACF fields or other templates instead. Only blog and press-release use the_content().
 *
 * @return void
 */
function remove_editor_from_resource_post_types(): void
{
  $post_types_without_editor = array(
    'news',
    'video',
    'whitepaper',
    'case-study',
    'podcast',
    'report',
    'webinar',
    'customer',
    'event',
    'partner',
    'skill',
  );

  foreach ($post_types_without_editor as $post_type) {
    if (post_type_exists($post_type)) {
      remove_post_type_support($post_type, 'editor');
    }
  }
}
add_action('init', __NAMESPACE__ . '\\remove_editor_from_resource_post_types', 20);

/**
 * Adds a top-priority rewrite rule so /skills/{slug} resolves to the
 * skill_function taxonomy instead of individual skill posts.
 *
 * @return void
 */
function add_skill_function_rewrite_rule(): void
{
  add_rewrite_rule(
    'skills/([^/]+)/?$',
    'index.php?skill_function=$matches[1]',
    'top'
  );
}
add_action('init', __NAMESPACE__ . '\\add_skill_function_rewrite_rule');

/**
 * Redirects single-post pages for archive-only CPTs.
 *
 * Webinars, events, customers, and partners only display on their
 * archive templates. Individual post URLs redirect to the archive page.
 * Individual skill posts redirect to their associated skill_function
 * taxonomy page.
 *
 * @return void
 */
function redirect_archive_only_singles(): void
{
  // Archive-only CPTs: redirect singles to their archive page.
  $archive_only_types = array('webinar', 'event', 'customer', 'partner');
  if (is_singular($archive_only_types)) {
    $archive_url = get_post_type_archive_link(get_post_type());
    if ($archive_url) {
      wp_redirect($archive_url, 301);
      exit;
    }
  }

  // Skills: redirect individual skill pages to skill_function taxonomy page.
  if (is_singular('skill')) {
    $functions = wp_get_post_terms(get_the_ID(), 'skill_function');
    if (!empty($functions) && !is_wp_error($functions)) {
      wp_redirect(get_term_link($functions[0]), 301);
      exit;
    }
    // Fallback: redirect to skills archive.
    wp_redirect(get_post_type_archive_link('skill'), 301);
    exit;
  }
}
add_action('template_redirect', __NAMESPACE__ . '\\redirect_archive_only_singles');

/**
 * Filters the permalink for archive-only CPTs so that card templates
 * and other links point to the external URL (ACF field) or archive.
 *
 * @param string  $post_link The post permalink.
 * @param WP_Post $post      The post object.
 * @return string
 */
function filter_archive_only_permalink(string $post_link, \WP_Post $post): string
{
  $archive_only_types = array('webinar', 'event', 'customer', 'partner');
  if (!in_array($post->post_type, $archive_only_types, true)) {
    return $post_link;
  }

  // If ACF external URL field exists, use it.
  if (function_exists('get_field')) {
    $external_url = get_field('resource_external_url', $post->ID);
    if (!empty($external_url)) {
      return esc_url($external_url);
    }
  }

  // Fallback: point to the archive page.
  $archive_url = get_post_type_archive_link($post->post_type);
  return $archive_url ?: $post_link;
}
add_filter('post_type_link', __NAMESPACE__ . '\\filter_archive_only_permalink', 10, 2);

/**
 * Exclude archive-only and no-frontend CPTs from Yoast XML sitemaps.
 *
 * Post types that are publicly_queryable=false are already excluded
 * automatically. This handles the archive-only types that remain
 * publicly_queryable=true.
 *
 * @param bool   $excluded  Whether the post type is excluded.
 * @param string $post_type The post type slug.
 * @return bool
 */
function exclude_cpts_from_yoast_sitemap(bool $excluded, string $post_type): bool
{
  // Exclude individual posts for archive-only CPTs from Yoast sitemap.
  $no_single_sitemap = array('webinar', 'event', 'customer', 'partner', 'skill');
  if (in_array($post_type, $no_single_sitemap, true)) {
    return true;
  }

  return $excluded;
}
add_filter('wpseo_sitemap_exclude_post_type', __NAMESPACE__ . '\\exclude_cpts_from_yoast_sitemap', 10, 2);
