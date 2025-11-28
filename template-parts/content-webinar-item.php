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
$webinar_featured_image = function_exists('get_field') ? get_field('webinar_featured_image', $post_id) : '';
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

// Determine link and CTA
$link = get_permalink($post_id);
$cta_text = $is_upcoming ? __('Register', 'aera') : __('WATCH NOW', 'aera');

// Get featured image
$image_url = '';
if ($webinar_featured_image && !empty($webinar_featured_image['url'])) {
  $image_url = $webinar_featured_image['url'];
} else {
  $thumbnail_id = get_post_thumbnail_id($post_id);
  if ($thumbnail_id) {
    $thumbnail = wp_get_attachment_image_src($thumbnail_id, 'medium');
    if ($thumbnail) {
      $image_url = $thumbnail[0];
    }
  }
}

// Get right arrow icon
$assets_base = trailingslashit(get_template_directory_uri()) . 'assets/';
$right_arrow = $assets_base . 'images/rightArrow.jpg';
?>

<div class="newsItem" resource-type="<?php echo esc_attr($webinar_type); ?>" resource-class="resources">
  <div class="newsItem__wrapper">
    <?php if ($image_url) : ?>
      <div class="newsItem__figure">
        <a href="<?php echo esc_url($link); ?>" class="newsItem__image newsItem__bgImage newsItem__imageBorder" target="_blank" style="background-image: url('<?php echo esc_url($image_url); ?>');"></a>
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
            <?php if (file_exists(get_template_directory() . '/assets/images/rightArrow.jpg')) : ?>
              <img src="<?php echo esc_url($right_arrow); ?>" alt="<?php esc_attr_e('right arrow', 'aera'); ?>" />
            <?php endif; ?>
          </span>
        </div>
      </div>
    </a>
  </div>
</div>

