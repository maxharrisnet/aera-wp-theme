<?php

/**
 * Resource card partial.
 *
 * @package Aera_Technology
 */

use function Aera\get_resource_cta_label;
use function Aera\get_resource_fallback_media;
use function Aera\get_resource_label_for_post_type;

$is_demo = ! empty($args['is_demo']);
$post_id = $args['post_id'] ?? get_the_ID();
$post_type = $args['post_type'] ?? get_post_type($post_id) ?? 'resource';

$title = $args['title'] ?? get_the_title($post_id);

// Get excerpt: ACF field first, then args, then WordPress excerpt
$excerpt = '';
if (!$is_demo && function_exists('get_field')) {
  $acf_excerpt = get_field('resource_excerpt', $post_id);
  if (!empty($acf_excerpt)) {
    $excerpt = wp_strip_all_tags($acf_excerpt);
  }
}
if (empty($excerpt) && isset($args['excerpt'])) {
  $excerpt = $args['excerpt'];
}
if (empty($excerpt)) {
  $excerpt = wp_strip_all_tags(get_the_excerpt($post_id));
}

$type_label = $args['type_label'] ?? get_resource_label_for_post_type($post_type);
$date_value = $args['date'] ?? get_the_date('c', $post_id);
$display_date = $date_value ? date_i18n(get_option('date_format'), strtotime($date_value)) : '';

$external_url = $args['external_url'] ?? (function_exists('get_field') ? get_field('resource_external_url', $post_id) : '');
$link = $args['link'] ?? ($external_url ?: get_permalink($post_id));
$is_external = ! empty($external_url) || (isset($args['link']) && str_contains($args['link'], 'http'));
$cta_label = $args['cta_label'] ?? get_resource_cta_label($post_type);
$custom_image = $args['image'] ?? '';
$custom_image_alt = $args['image_alt'] ?? $title;

// Get card image from ACF field, fallback to featured image
$card_image = '';
if (!$is_demo && function_exists('get_field')) {
  $card_image_data = get_field('resource_card_image', $post_id);
  if ($card_image_data && !empty($card_image_data['url'])) {
    $card_image = sprintf(
      '<img src="%1$s" alt="%2$s" class="resource-card__image" loading="lazy" width="%3$d" height="%4$d" />',
      esc_url($card_image_data['url']),
      esc_attr($card_image_data['alt'] ?? $title),
      esc_attr($card_image_data['width'] ?? ''),
      esc_attr($card_image_data['height'] ?? '')
    );
  }
}

$thumbnail = $card_image ?: ($is_demo ? '' : get_the_post_thumbnail(
  $post_id,
  'resource_card',
  array(
    'class'   => 'resource-card__image',
    'loading' => 'lazy',
    'alt'     => $title,
  )
));

$fallback_media = ($thumbnail || $card_image) ? array() : get_resource_fallback_media($post_type);
$media_markup = $card_image ?: $thumbnail;

if (! $media_markup && $custom_image) {
  $media_markup = sprintf(
    '<img src="%1$s" alt="%2$s" class="resource-card__image" loading="lazy" />',
    esc_url($custom_image),
    esc_attr($custom_image_alt)
  );
}

if (! $media_markup && ! empty($fallback_media['url'])) {
  $media_classes = array('resource-card__image');
  if (! empty($fallback_media['is_logo'])) {
    $media_classes[] = 'resource-card__image--logo';
  }
  $media_markup = sprintf(
    '<img src="%1$s" alt="%2$s" class="%3$s" loading="lazy" />',
    esc_url($fallback_media['url']),
    esc_attr($title),
    esc_attr(implode(' ', $media_classes))
  );
}

// Get author fields
$authors = array();
if (!$is_demo && function_exists('get_field')) {
  for ($i = 1; $i <= 3; $i++) {
    $author = get_field("resource_author_{$i}", $post_id);
    if (!empty($author)) {
      $authors[] = $author;
    }
  }
}

$card_classes = array('resource-card');
if ($media_markup) {
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

<article class="<?php echo esc_attr(implode(' ', $card_classes)); ?>" data-resource-type="<?php echo esc_attr($post_type); ?>">
  <a<?php echo $wrapper_attr_string; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
    ?>>
    <?php if ($media_markup) : ?>
      <div class="resource-card__figure" aria-hidden="true">
        <?php echo $media_markup; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        ?>
      </div>
    <?php endif; ?>

    <div class="resource-card__inner">
      <?php if ($type_label) : ?>
        <div class="resource-card__row resource-card__row--meta">
          <span class="resource-card__type"><?php echo esc_html($type_label); ?></span>
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

          <?php if (!empty($authors)) : ?>
            <div class="resource-card__authors">
              <?php foreach ($authors as $author) : ?>
                <div class="resource-card__author">
                  <?php echo wp_kses_post(wpautop($author)); ?>
                </div>
              <?php endforeach; ?>
            </div>
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