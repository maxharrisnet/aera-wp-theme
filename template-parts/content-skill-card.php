<?php

/**
 * Template part for displaying skill cards (Home Page)
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Aera_Technology
 */

$skill_card_image = get_field('skill_card_image');
?>

<div class="skill-card">
  <div class="skill-card__wrapper">
    <a href="<?php the_permalink(); ?>">
      <?php if ($skill_card_image) : ?>
        <figure class="skill-card__image-container">
          <img src="<?php echo esc_url($skill_card_image['url']); ?>" alt="<?php echo esc_attr($skill_card_image['alt'] ?: get_the_title()); ?>" class="skill-card__image" />
        </figure>
      <?php endif; ?>

      <div class="skill-card__stripe"></div>

      <div class="skill-card__content">
        <h3 class="skill-card__title"><?php the_title(); ?></h3>
      </div>
    </a>
  </div>
</div>