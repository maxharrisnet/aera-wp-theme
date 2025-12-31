<?php

/**
 * Template part for displaying horizontal resource cards
 * Used in Skills Home and other pages
 *
 * @package Aera_Technology
 */

// Get passed arguments
$title = $args['title'] ?? '';
$description = $args['description'] ?? '';
$url = $args['url'] ?? '';
$image_url = $args['image_url'] ?? '';
$external = $args['external'] ?? false;

if (!$title || !$url) {
  return;
}

$target = $external ? ' target="_blank" rel="noopener noreferrer"' : '';
?>

<div class="resource-card">
  <div class="resource-card__wrapper">
    <?php if ($image_url) : ?>
      <div class="resource-card__figure">
        <a href="<?php echo esc_url($url); ?>"<?php echo $target; ?>>
          <div class="resource-card__bgImage resource-card__imageBorder" style="background-image: url('<?php echo esc_url($image_url); ?>');"></div>
        </a>
      </div>
    <?php endif; ?>

    <a href="<?php echo esc_url($url); ?>"<?php echo $target; ?>>
      <div class="resource-card__row">
        <div class="resource-card__content">
          <h3 class="resource-card__title"><?php echo esc_html($title); ?></h3>

          <?php if ($description) : ?>
            <p class="resource-card__text"><?php echo esc_html($description); ?></p>
          <?php endif; ?>
        </div>
      </div>

      <div class="resource-card__lastRow">
        <div class="resource-card__row">
          <div class="resource-card__line"></div>
          <span class="resource-card__link">
            <?php echo $external ? esc_html__('View Resource', 'aera') : esc_html__('Learn More', 'aera'); ?>
          </span>
        </div>
      </div>
    </a>
  </div>
</div>
