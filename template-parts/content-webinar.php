<?php
/**
 * Webinar card partial (for on-demand webinars).
 *
 * @package Aera_Technology
 */

use function Aera\get_resource_cta_label;
use function Aera\get_resource_fallback_media;

$post_id = get_the_ID();
$title = get_the_title($post_id);

// Get ACF fields
$webinar_date = function_exists('get_field') ? get_field('webinar_date', $post_id) : '';
$webinar_logo = function_exists('get_field') ? get_field('webinar_logo', $post_id) : '';
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

// Determine link
$link = get_permalink($post_id);
if ($webinar_form_or_video === 'Video' && $webinar_video) {
  $link = esc_url($webinar_video);
} elseif ($webinar_form_or_video === 'Form') {
  $link = get_permalink($post_id);
}

$is_external = ($webinar_form_or_video === 'Video' && $webinar_video) ? true : false;
$cta_label = get_resource_cta_label('webinar');

// Get card image - prefer logo, then featured image, then thumbnail, then fallback
$card_image_markup = '';
if ($webinar_logo && !empty($webinar_logo['url'])) {
  $card_image_markup = sprintf(
    '<img src="%1$s" alt="%2$s" class="resource-card__image resource-card__image--logo" loading="lazy" width="%3$d" height="%4$d" />',
    esc_url($webinar_logo['url']),
    esc_attr($webinar_logo['alt'] ?? $title),
    esc_attr($webinar_logo['width'] ?? ''),
    esc_attr($webinar_logo['height'] ?? '')
  );
} else {
  // Try featured image
  $thumbnail = get_the_post_thumbnail(
    $post_id,
    'resource_card',
    array(
      'class'   => 'resource-card__image',
      'loading' => 'lazy',
      'alt'     => $title,
    )
  );
  if ($thumbnail) {
    $card_image_markup = $thumbnail;
  } else {
    // Fallback media
    $fallback_media = get_resource_fallback_media('webinar');
    if (!empty($fallback_media['url'])) {
      $media_classes = array('resource-card__image');
      if (!empty($fallback_media['is_logo'])) {
        $media_classes[] = 'resource-card__image--logo';
      }
      $card_image_markup = sprintf(
        '<img src="%1$s" alt="%2$s" class="%3$s" loading="lazy" />',
        esc_url($fallback_media['url']),
        esc_attr($title),
        esc_attr(implode(' ', $media_classes))
      );
    }
  }
}

$card_classes = array('resource-card');
if ($card_image_markup) {
  $card_classes[] = 'resource-card--has-media';
} else {
  $card_classes[] = 'resource-card--text';
}

$wrapper_attrs = array(
  'class' => 'resource-card__wrapper',
  'href'  => esc_url($link),
);

if ($is_external) {
  $wrapper_attrs['target'] = '_blank';
  $wrapper_attrs['rel'] = 'noopener noreferrer';
}

$wrapper_attr_string = '';
foreach ($wrapper_attrs as $attr => $value) {
  $wrapper_attr_string .= sprintf(' %1$s="%2$s"', $attr, $value);
}
?>

<article class="<?php echo esc_attr(implode(' ', $card_classes)); ?>" data-resource-type="webinar">
  <a<?php echo $wrapper_attr_string; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
    <?php if ($card_image_markup) : ?>
      <div class="resource-card__figure" aria-hidden="true">
        <?php echo $card_image_markup; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
      </div>
    <?php endif; ?>

    <div class="resource-card__inner">
      <?php if ($webinar_type) : ?>
        <div class="resource-card__row resource-card__row--meta">
          <span class="resource-card__type"><?php echo esc_html($webinar_type); ?></span>
        </div>
      <?php endif; ?>

      <div class="resource-card__row">
        <div class="resource-card__content">
          <h3 class="resource-card__title">
            <?php echo esc_html($title); ?>
          </h3>

          <?php if ($excerpt) : ?>
            <p class="resource-card__text"><?php echo esc_html($excerpt); ?></p>
          <?php endif; ?>
        </div>
      </div>

      <div class="resource-card__footerRow">
        <?php if ($display_date) : ?>
          <time class="resource-card__date" datetime="<?php echo esc_attr($date_value); ?>">
            <?php echo esc_html($display_date); ?>
          </time>
        <?php endif; ?>
        <span class="resource-card__line" aria-hidden="true"></span>
        <span class="resource-card__ctaLabel"><?php echo esc_html($cta_label); ?></span>
      </div>
    </div>
  </a>
</article>

