<?php
/**
 * Featured webinar card partial (large display for upcoming webinars).
 *
 * @package Aera_Technology
 */

$post_id = get_the_ID();
$title = get_the_title($post_id);

// Get ACF fields
$webinar_date = function_exists('get_field') ? get_field('webinar_date', $post_id) : '';
$webinar_featured_image = function_exists('get_field') ? get_field('webinar_featured_image', $post_id) : '';
$webinar_video = function_exists('get_field') ? get_field('webinar_video', $post_id) : '';
$webinar_form_or_video = function_exists('get_field') ? get_field('webinar_form_or_video', $post_id) : '';
$webinar_type = function_exists('get_field') ? get_field('webinar_type', $post_id) : '';

// Get excerpt
$excerpt = '';
if (function_exists('get_field')) {
  $acf_excerpt = get_field('resource_excerpt', $post_id);
  if (!empty($acf_excerpt)) {
    $excerpt = wp_strip_all_tags($acf_excerpt);
  }
}
if (empty($excerpt)) {
  $excerpt = wp_strip_all_tags(get_the_excerpt($post_id));
}

// Format date
$display_date = '';
$date_value = '';
if ($webinar_date) {
  $date_value = $webinar_date;
  $display_date = date_i18n(get_option('date_format'), strtotime($webinar_date));
}

// Determine link and CTA label - for upcoming webinars, use "Register"
$link = get_permalink($post_id);
if ($webinar_form_or_video === 'Video' && $webinar_video) {
  $link = esc_url($webinar_video);
} elseif ($webinar_form_or_video === 'Form') {
  $link = get_permalink($post_id);
}

$is_external = ($webinar_form_or_video === 'Video' && $webinar_video) ? true : false;
$cta_label = __('Register', 'aera'); // Featured upcoming webinars use "Register"

// Get featured image
$featured_image_markup = '';
if ($webinar_featured_image && !empty($webinar_featured_image['url'])) {
  $featured_image_markup = sprintf(
    '<img src="%1$s" alt="%2$s" class="webinar-featured-card__image" loading="lazy" width="%3$d" height="%4$d" />',
    esc_url($webinar_featured_image['url']),
    esc_attr($webinar_featured_image['alt'] ?? $title),
    esc_attr($webinar_featured_image['width'] ?? ''),
    esc_attr($webinar_featured_image['height'] ?? '')
  );
} else {
  // Fallback to post thumbnail
  $thumbnail = get_the_post_thumbnail(
    $post_id,
    'large',
    array(
      'class'   => 'webinar-featured-card__image',
      'loading' => 'lazy',
      'alt'     => $title,
    )
  );
  if ($thumbnail) {
    $featured_image_markup = $thumbnail;
  }
}

$link_attrs = array(
  'href' => esc_url($link),
);

if ($is_external) {
  $link_attrs['target'] = '_blank';
  $link_attrs['rel'] = 'noopener noreferrer';
}

$link_attr_string = '';
foreach ($link_attrs as $attr => $value) {
  $link_attr_string .= sprintf(' %1$s="%2$s"', $attr, $value);
}
?>

<article class="webinar-featured-card">
  <div class="webinar-featured-card__wrapper">
    <div class="webinar-featured-card__row">
      <?php if ($webinar_type) : ?>
        <span class="webinar-featured-card__type"><?php echo esc_html($webinar_type); ?></span>
      <?php endif; ?>
      <span class="webinar-featured-card__line" aria-hidden="true"></span>
      <?php if ($display_date) : ?>
        <time class="webinar-featured-card__date" datetime="<?php echo esc_attr($date_value); ?>">
          <?php echo esc_html($display_date); ?>
        </time>
      <?php endif; ?>
    </div>

    <div class="webinar-featured-card__row">
      <div class="webinar-featured-card__content">
        <h3 class="webinar-featured-card__title">
          <a<?php echo $link_attr_string; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
            <?php echo esc_html($title); ?>
          </a>
        </h3>
      </div>
    </div>

    <?php if ($featured_image_markup || $excerpt) : ?>
      <div class="webinar-featured-card__row">
        <?php if ($featured_image_markup) : ?>
          <div class="webinar-featured-card__col1">
            <div class="webinar-featured-card__figure">
              <?php echo $featured_image_markup; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
            </div>
          </div>
        <?php endif; ?>

        <div class="webinar-featured-card__col3">
          <?php if ($excerpt) : ?>
            <p class="webinar-featured-card__text"><?php echo esc_html($excerpt); ?></p>
          <?php endif; ?>

          <a<?php echo $link_attr_string; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> class="webinar-featured-card__link">
            <?php echo esc_html($cta_label); ?>
          </a>
        </div>
        <div class="webinar-featured-card__clearfix"></div>
      </div>
    <?php endif; ?>
  </div>
</article>

