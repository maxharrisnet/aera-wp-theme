<?php
/**
 * Featured webinar card partial (FeatEventsItem style - large horizontal cards).
 *
 * @package Aera_Technology
 */

$post_id = get_the_ID();
$title = get_the_title($post_id);

// Get ACF fields
$webinar_date = function_exists('get_field') ? get_field('webinar_date', $post_id) : '';
$webinar_featured_image = function_exists('get_field') ? get_field('webinar_featured_image', $post_id) : '';
$webinar_featured = function_exists('get_field') ? get_field('webinar_featured', $post_id) : false;
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
// Truncate excerpt to 140 characters
$excerpt = mb_substr($excerpt, 0, 140) . (mb_strlen($excerpt) > 140 ? '...' : '');

// Truncate title to 130 characters
$title_truncated = mb_substr($title, 0, 130) . (mb_strlen($title) > 130 ? '...' : '');

// Determine if upcoming or on-demand
$today = current_time('Y-m-d');
$is_upcoming = false;
$event_type = __('On-Demand', 'aera');

if ($webinar_date) {
  $is_upcoming = strtotime($webinar_date) >= strtotime($today);
  $event_type = $is_upcoming ? __('Upcoming Webinar', 'aera') : __('On-Demand', 'aera');
}

// Determine link and CTA
$link = get_permalink($post_id);
$cta_text = $is_upcoming ? __('Register Now', 'aera') : __('Watch Now', 'aera');

// Get featured image
$image_url = '';
if ($webinar_featured_image && !empty($webinar_featured_image['url'])) {
  $image_url = $webinar_featured_image['url'];
} else {
  $thumbnail_id = get_post_thumbnail_id($post_id);
  if ($thumbnail_id) {
    $thumbnail = wp_get_attachment_image_src($thumbnail_id, 'large');
    if ($thumbnail) {
      $image_url = $thumbnail[0];
    }
  }
}
?>

<a href="<?php echo esc_url($link); ?>" class="newsItem" resource-type="Webinar" resource-class="resources" target="_blank">
  <div class="news__featuredEventsDetails">
    <div class="news__detailsWrapper">
      <?php if ($event_type) : ?>
        <div class="news__type"><?php echo esc_html($event_type); ?></div>
      <?php endif; ?>

      <h2 class="news__heading">
        <?php echo esc_html($title_truncated); ?>
      </h2>

      <?php if ($excerpt) : ?>
        <p class="news__subheading">
          <?php echo esc_html($excerpt); ?>
        </p>
      <?php endif; ?>
    </div>

    <div class="news__buttonWrapper">
      <span class="newsItem__highlight highlighted"><?php echo esc_html($cta_text); ?></span>
    </div>
  </div>

  <?php if ($image_url) : ?>
    <div class="news__featuredEventsImage">
      <img src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($title); ?>" loading="lazy" />
    </div>
  <?php endif; ?>
</a>

