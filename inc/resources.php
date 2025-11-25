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
        'customer',
        'event',
        'webinar',
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
    'customers'     => array(
      'label'      => __('Customers', 'aera'),
      'post_types' => array('customer'),
    ),
    'events'        => array(
      'label'      => __('Events', 'aera'),
      'post_types' => array('event', 'webinar'),
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

  if (! isset($types[$slug])) {
    return 'all';
  }

  return $slug;
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

  return array(
    'post_type'      => $postTypes,
    'posts_per_page' => 12,
    'paged'          => max(1, $paged),
    'post_status'    => 'publish',
    'orderby'        => 'date',
    'order'          => 'DESC',
  );
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

  foreach ($types as $type) {
    if (! empty($type['post_types']) && in_array($postType, $type['post_types'], true)) {
      return $type['label'];
    }
  }

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
    'video'        => __('Watch', 'aera'),
    'webinar'      => __('Watch', 'aera'),
    'event'        => __('Register', 'aera'),
    'press-release'=> __('Read', 'aera'),
    'news'         => __('Read', 'aera'),
    'whitepaper'   => __('Download', 'aera'),
    'podcast'      => __('Listen', 'aera'),
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
    'whitepaper'=> array('path' => 'blogs/smarter-waste.jpg'),
  );

  if (! isset($map[$postType])) {
    return array();
  }

  return array(
    'url'     => $base . $map[$postType]['path'],
    'is_logo' => ! empty($map[$postType]['is_logo']),
  );
}
