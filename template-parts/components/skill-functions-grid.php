<?php

/**
 * Template part for displaying a grid of skill function cards
 *
 * @package Aera_Technology
 */

$functions = $args['functions'] ?? array();
$grid_class = $args['grid_class'] ?? 'skills-home__grid';
$card_class = $args['card_class'] ?? 'skill-card';

if (empty($functions) || is_wp_error($functions)) {
  return;
}
?>

<div class="<?php echo esc_attr($grid_class); ?>">
  <?php foreach ($functions as $function) :
    // Get function image from ACF
    $function_image = function_exists('get_field') ? get_field('featured_image', 'skill_function_' . $function->term_id) : null;
    $function_url = get_term_link($function);
  ?>
    <div class="<?php echo esc_attr($card_class); ?>" data-function="<?php echo esc_attr($function->slug); ?>">
      <div class="<?php echo esc_attr($card_class); ?>__wrapper">
        <a href="<?php echo esc_url($function_url); ?>">
          <?php if ($function_image) : ?>
            <figure class="<?php echo esc_attr($card_class); ?>__image-container">
              <?php
              $att = $function_image['ID'] ?? $function_image['id'] ?? null;
              if ($att) {
                echo wp_get_attachment_image($att, 'webinar_card_image', false, array(
                  'alt'      => ($function_image['alt'] ?: $function->name),
                  'class'    => esc_attr($card_class) . '__image',
                  'loading'  => 'lazy',
                  'decoding' => 'async',
                ));
              } else {
                echo '<img src="' . esc_url($function_image['url']) . '" alt="' . esc_attr($function_image['alt'] ?: $function->name) . '" class="' . esc_attr($card_class) . '__image" loading="lazy" decoding="async" />';
              }
              ?>
            </figure>
          <?php endif; ?>

          <div class="<?php echo esc_attr($card_class); ?>__stripe"></div>

          <div class="<?php echo esc_attr($card_class); ?>__content">
            <h3 class="<?php echo esc_attr($card_class); ?>__title"><?php echo esc_html($function->name); ?></h3>
            <?php if (!empty($function->description)) : ?>
              <p class="<?php echo esc_attr($card_class); ?>__description"><?php echo esc_html($function->description); ?></p>
            <?php endif; ?>
          </div>
        </a>
      </div>
    </div>
  <?php endforeach; ?>
</div>