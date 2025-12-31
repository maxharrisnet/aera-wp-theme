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

<div class="resource-card resource-card--horizontal">
  <div class="resource-card__wrapper">
    <a href="<?php echo esc_url($url); ?>" class="resource-card__link-wrapper"<?php echo $target; ?>>
      <div class="resource-card__inner">
        <?php if ($image_url) : ?>
          <div class="resource-card__image-col">
            <figure class="resource-card__figure">
              <div class="resource-card__bgImage resource-card__imageBorder" style="background-image: url('<?php echo esc_url($image_url); ?>');"></div>
            </figure>
          </div>
        <?php endif; ?>

        <div class="resource-card__content-col">
          <div class="resource-card__content">
            <h3 class="resource-card__title"><?php echo esc_html($title); ?></h3>

            <?php if ($description) : ?>
              <p class="resource-card__text"><?php echo esc_html($description); ?></p>
            <?php endif; ?>

            <div class="resource-card__lastRow">
              <span class="resource-card__link">
                <?php echo $external ? esc_html__('View Resource', 'aera') : esc_html__('Learn More', 'aera'); ?>
              </span>
            </div>
          </div>
        </div>
      </div>
    </a>
  </div>
</div>
