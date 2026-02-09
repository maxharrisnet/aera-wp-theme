<?php

/**
 * Webinar card partial (ResourceItem style - for grid display).
 *
 * @package Aera_Technology
 */

$post_id = get_the_ID();
$title = get_the_title($post_id);

// Get ACF fields
$webinar_date = function_exists('get_field') ? get_field('webinar_date', $post_id) : '';
$resource_card_image = function_exists('get_field') ? get_field('resource_card_image', $post_id) : '';
$webinar_excerpt = function_exists('get_field') ? get_field('webinar_excerpt', $post_id) : '';

// Get excerpt - prefer ACF excerpt, then WordPress excerpt
$excerpt = '';
if (!empty($webinar_excerpt)) {
  $excerpt = wp_strip_all_tags($webinar_excerpt);
} else {
  $wp_excerpt = get_the_excerpt($post_id);
  if (!empty($wp_excerpt)) {
    $excerpt = wp_strip_all_tags($wp_excerpt);
  }
}

// Determine if upcoming or on-demand
$today = current_time('Y-m-d');
$is_upcoming = false;
$webinar_type = __('On-Demand', 'aera');

if ($webinar_date) {
  $is_upcoming = strtotime($webinar_date) >= strtotime($today);
  $webinar_type = $is_upcoming ? __('Webinar', 'aera') : __('On-Demand', 'aera');
}

// Get external URL from resource fields, fallback to permalink
$external_url = function_exists('get_field') ? get_field('resource_external_url', $post_id) : '';
$link = !empty($external_url) ? $external_url : get_permalink($post_id);

// Get custom CTA text from resource fields, fallback to default
$resource_cta_text = function_exists('get_field') ? get_field('resource_cta_text', $post_id) : '';
if (!empty($resource_cta_text)) {
  $cta_text = $resource_cta_text;
} else {
  // Default CTA for webinars should be "Watch Now" (use same wording for upcoming and on-demand)
  $cta_text = __('Watch Now', 'aera');
}

// Get featured or card image - prefer attachment sizes
$image_url = '';
if (!empty($resource_card_image) && is_array($resource_card_image)) {
  $att = $resource_card_image['ID'] ?? $resource_card_image['id'] ?? null;
  if ($att) {
    // Use the original uploaded image for the background to avoid
    // small, potentially blurry thumbnails on larger / high-DPI screens.
    $image_url = wp_get_attachment_image_url($att, 'full') ?: ($resource_card_image['url'] ?? '');
  } else {
    $image_url = $resource_card_image['url'];
  }
} else {
  $thumbnail_id = get_post_thumbnail_id($post_id);
  if ($thumbnail_id) {
    $image_url = wp_get_attachment_image_url($thumbnail_id, 'full') ?: $image_url;
  }
}

// Get right arrow icon
$assets_base = trailingslashit(get_template_directory_uri()) . 'assets/';
$right_arrow = $assets_base . 'images/rightArrow.jpg';

// Collect taxonomy slugs for client-side filtering
$industry_terms = get_the_terms($post_id, 'industry');
$solution_area_terms = get_the_terms($post_id, 'webinar_solution_area');
$job_function_terms = get_the_terms($post_id, 'webinar_job_function');

$industry_slugs = $industry_terms && !is_wp_error($industry_terms) ? wp_list_pluck($industry_terms, 'slug') : array();
$solution_area_slugs = $solution_area_terms && !is_wp_error($solution_area_terms) ? wp_list_pluck($solution_area_terms, 'slug') : array();
$job_function_slugs = $job_function_terms && !is_wp_error($job_function_terms) ? wp_list_pluck($job_function_terms, 'slug') : array();

// Determine attachment ID for rendering an <img> with srcset when available
$image_att = null;
if (! empty($resource_card_image) && is_array($resource_card_image)) {
  $image_att = $resource_card_image['ID'] ?? $resource_card_image['id'] ?? null;
} else {
  $image_att = get_post_thumbnail_id($post_id) ?: null;
}
?>

<div class="newsItem" resource-type="<?php echo esc_attr($webinar_type); ?>" resource-class="resources" data-industries="<?php echo esc_attr(implode(',', $industry_slugs)); ?>" data-solution-areas="<?php echo esc_attr(implode(',', $solution_area_slugs)); ?>" data-job-functions="<?php echo esc_attr(implode(',', $job_function_slugs)); ?>">
  <div class="newsItem__wrapper">
    <?php if ($image_url) : ?>
      <div class="newsItem__figure">
        <a href="<?php echo esc_url($link); ?>" class="newsItem__image newsItem__imageBorder" target="_blank">
          <?php
          // Prefer the attachment ID so WordPress outputs responsive `srcset` and
          // plugins like Perfect Images can generate WebP/retina variants.
          if (! empty($image_att)) {
            echo wp_get_attachment_image((int) $image_att, 'full', false, array(
              'class' => 'newsItem__img newsItem__bgImage',
              'alt'   => esc_attr($title),
              'loading' => 'lazy',
            ));
          } else {
            // Fallback to the URL we resolved earlier.
            echo '<img class="newsItem__img newsItem__bgImage" src="' . esc_url($image_url) . '" alt="' . esc_attr($title) . '" loading="lazy" />';
          }
          ?>
        </a>
      </div>
    <?php endif; ?>

    <a href="<?php echo esc_url($link); ?>" target="_blank" data-event-category="Section" data-event-action="Click" data-event-name="<?php echo esc_attr($title); ?>">
      <div class="newsItem__row">
        <div class="newsItem__content">
          <h2 class="newsItem__title">
            <?php echo esc_html($title); ?>
          </h2>
        </div>
      </div>

      <div class="newsItem__lastRow">
        <div class="newsItem__row">
          <span class="newsItem__link">
            <?php echo esc_html($cta_text); ?>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: inline-block; margin-left: 8px; vertical-align: middle;">
              <path d="M8.5 1L13 5M13 5L8.5 9M13 5H1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  </div>
</div>