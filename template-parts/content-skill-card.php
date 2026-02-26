<?php

/**
 * Template part for displaying skill cards (Home Page)
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Aera_Technology
 */

$skill_card_image = get_field('skill_card_image');

// Get the function (skill_function taxonomy) for color coding
$functions = get_the_terms(get_the_ID(), 'skill_function');
$function_slug = (!empty($functions) && !is_wp_error($functions)) ? $functions[0]->slug : '';
?>

<div class="skill-card" data-function="<?php echo esc_attr($function_slug); ?>">
  <div class="skill-card__wrapper">
    <a href="<?php the_permalink(); ?>">
      <?php if ($skill_card_image) : ?>
        <figure class="skill-card__image-container">
          <?php
          $att = $skill_card_image['ID'] ?? $skill_card_image['id'] ?? null;
          if ($att) {
            echo wp_get_attachment_image($att, 'webinar_card_image', false, array(
              'alt'      => ($skill_card_image['alt'] ?: get_the_title()),
              'class'    => 'skill-card__image',
              'loading'  => 'lazy',
              'decoding' => 'async',
            ));
          } else {
            echo '<img src="' . esc_url($skill_card_image['url']) . '" alt="' . esc_attr($skill_card_image['alt'] ?: get_the_title()) . '" class="skill-card__image" loading="lazy" decoding="async" />';
          }
          ?>
        </figure>
      <?php endif; ?>

      <div class="skill-card__stripe"></div>

      <div class="skill-card__content">
        <h3 class="skill-card__title"><?php the_title(); ?></h3>
      </div>
    </a>
  </div>
</div>