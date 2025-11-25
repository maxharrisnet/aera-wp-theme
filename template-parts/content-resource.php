<?php

/**
 * Resource card partial.
 *
 * @package Aera_Technology
 */

$is_demo = ! empty($args['is_demo']);
$post_id = $args['post_id'] ?? get_the_ID();

$title = $args['title'] ?? get_the_title($post_id);
$excerpt = $args['excerpt'] ?? wp_strip_all_tags(get_the_excerpt($post_id));
$type_label = $args['type_label'] ?? '';
$date_value = $args['date'] ?? get_the_date('c', $post_id);
$display_date = $date_value ? date_i18n(get_option('date_format'), strtotime($date_value)) : '';

$external_url = $args['external_url'] ?? '';
$link = $args['link'] ?? ($external_url ?: get_permalink($post_id));
$is_external = ! empty($external_url) || (isset($args['link']) && str_contains($args['link'], 'http'));

$thumbnail = $is_demo ? '' : get_the_post_thumbnail($post_id, 'resource_card', array('class' => 'resource-card__image', 'loading' => 'lazy'));
?>

<article class="resource-card">
  <?php if ($thumbnail) : ?>
    <div class="resource-card__media">
      <?php echo $thumbnail; // phpcs:ignore WordPress.Security.EscapeOutput
      ?>
    </div>
  <?php endif; ?>

  <div class="resource-card__body">
    <div class="resource-card__meta">
      <?php if ($type_label) : ?>
        <span class="resource-card__type"><?php echo esc_html($type_label); ?></span>
      <?php endif; ?>
      <?php if ($display_date) : ?>
        <time class="resource-card__date" datetime="<?php echo esc_attr($date_value); ?>">
          <?php echo esc_html($display_date); ?>
        </time>
      <?php endif; ?>
    </div>

    <h3 class="resource-card__title">
      <a href="<?php echo esc_url($link); ?>" <?php echo $is_external ? ' target="_blank" rel="noopener noreferrer"' : ''; ?>>
        <?php echo esc_html($title); ?>
      </a>
    </h3>

    <p class="resource-card__excerpt"><?php echo esc_html($excerpt); ?></p>
    <span class="resource-card__cta"><?php esc_html_e('Learn more', 'aera'); ?></span>
  </div>
</article>