<?php

/**
 * Resource helper functions.
 *
 * @package Aera_Technology
 */

namespace Aera;

defined('ABSPATH') || exit;

/**
 * Returns resource type metadata used for filtering and labeling.
 *
 * @return array<string, array>
 */
function get_resource_types(): array
{
  $types = array(
    'all'           => array(
      'label'      => __('All Types', 'aera'),
      'post_types' => array(
        'news',
        'press-release',
        'video',
        'whitepaper',
        'blog',
        'case-study',
        'podcast',
        'report',
      ),
    ),
    'news'          => array(
      'label'      => __('News', 'aera'),
      'post_types' => array('news'),
    ),
    'press-release' => array(
      'label'      => __('Press Releases', 'aera'),
      'post_types' => array('press-release'),
    ),
    'videos'        => array(
      'label'      => __('Videos', 'aera'),
      'post_types' => array('video'),
    ),
    'whitepapers'   => array(
      'label'      => __('Whitepapers', 'aera'),
      'post_types' => array('whitepaper'),
    ),
    'blogs'         => array(
      'label'      => __('Blogs', 'aera'),
      'post_types' => array('blog'),
    ),
    'case-studies'  => array(
      'label'      => __('Case Studies', 'aera'),
      'post_types' => array('case-study'),
    ),
    'podcasts'      => array(
      'label'      => __('Podcasts', 'aera'),
      'post_types' => array('podcast'),
    ),
    'reports'       => array(
      'label'      => __('Reports', 'aera'),
      'post_types' => array('report'),
    ),
  );

  return $types;
}

/**
 * Returns a sanitized resource type key.
 *
 * @param string|null $slug Request slug.
 * @return string
 */
function get_active_resource_type(string $slug = null): string
{
  $slug = $slug ? sanitize_key($slug) : 'all';
  $types = get_resource_types();

  // If the slug matches a defined type key, return it.
  if (isset($types[$slug])) {
    return $slug;
  }

  // If the slug instead is a post type (e.g. 'report'), map it to the
  // resource type key that includes that post type (e.g. 'reports'). This
  // makes the `?type=` parameter tolerant of singular/plural mismatches.
  foreach ($types as $key => $type) {
    if (! empty($type['post_types']) && in_array($slug, $type['post_types'], true)) {
      return $key;
    }
  }

  return 'all';
}

/**
 * Builds a WP_Query argument array for the requested resource category.
 *
 * @param string $slug Resource slug.
 * @param int    $paged Current page.
 * @return array<string, mixed>
 */
function build_resource_query_args(string $slug, int $paged = 1): array
{
  $types = get_resource_types();
  $postTypes = $types[$slug]['post_types'] ?? $types['all']['post_types'];

  // Coming Soon
  $args = array(
    'post_type'      => $postTypes,
    'posts_per_page' => -1,
    'paged'          => max(1, $paged),
    'post_status'    => 'publish',
    'meta_key'       => 'resource_coming_soon',
  );

  $args['orderby'] = array(
    'meta_value_num' => 'ASC',
    'date'           => 'DESC',
  );

  // Order By Menu Order
  if ($slug === 'case-study') {
    $args['orderby'] = array(
      'menu_order'     => 'ASC',
      // 'meta_value_num' => 'ASC',
      // 'date'           => 'DESC',
    );
  }

  return $args;
}

/**
 * Resolves a display label for a post type.
 *
 * @param string $postType Post type slug.
 * @return string
 */
function get_resource_label_for_post_type(string $postType): string
{
  $types = get_resource_types();

  // Skip 'all' type and check specific types first
  foreach ($types as $key => $type) {
    if ($key === 'all') {
      continue;
    }
    if (! empty($type['post_types']) && in_array($postType, $type['post_types'], true)) {
      return $type['label'];
    }
  }

  // Fallback: format the post type name
  return ucfirst(str_replace('-', ' ', $postType));
}

/**
 * Returns the CTA label based on the resource post type.
 *
 * @param string $postType Post type slug.
 * @return string
 */
function get_resource_cta_label(string $postType): string
{
  $map = array(
    'video'        => __('Watch Now', 'aera'),
    'webinar'      => __('Watch', 'aera'),
    'event'        => __('Register', 'aera'),
    'press-release' => __('Read', 'aera'),
    // 'news'         => __('Read More', 'aera'),
    'whitepaper'   => __('Download', 'aera'),
    'podcast'      => __('Watch Now', 'aera'),
    'customer'     => __('Explore', 'aera'),
    'case-study'   => __('Explore', 'aera'),
  );

  return $map[$postType] ?? __('Read', 'aera');
}

/**
 * Provides a fallback media asset for demo cards or posts missing thumbnails.
 *
 * @param string $postType Post type slug.
 * @return array<string, mixed>
 */
function get_resource_fallback_media(string $postType): array
{
  $base = trailingslashit(get_template_directory_uri()) . 'assets/content/';
  $map = array(
    'blog'      => array('path' => 'blogs/smarter-waste.jpg'),
    'news'      => array('path' => 'news/logistics-viewpoints.jpg', 'is_logo' => true),
    'press-release' => array('path' => 'news/logistics-viewpoints.jpg', 'is_logo' => true),
    'podcast'   => array('path' => 'podcasts/eye-on-ai.jpg'),
    'video'     => array('path' => 'webinars/agentic-decision-intel.jpg'),
    'webinar'   => array('path' => 'webinars/agentic-decision-intel.jpg'),
    'event'     => array('path' => 'webinars/agentic-decision-intel.jpg'),
    'whitepaper' => array('path' => 'blogs/smarter-waste.jpg'),
  );

  if (! isset($map[$postType])) {
    return array();
  }

  return array(
    'url'     => $base . $map[$postType]['path'],
    'is_logo' => ! empty($map[$postType]['is_logo']),
  );
}
