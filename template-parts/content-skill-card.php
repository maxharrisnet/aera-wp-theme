<?php

/**
 * Template part for displaying skill cards
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Aera_Technology
 */

$is_featured = isset($args['featured']) && $args['featured'];
$card_class = $is_featured ? 'skill-card skill-card--featured' : 'skill-card';

$skill_card_image = get_field('skill_card_image');
?>

<div class="<?php echo esc_attr($card_class); ?>">
  <a href="<?php the_permalink(); ?>" class="skill-card__link">
    <?php if ($skill_card_image) : ?>
      <div class="skill-card__image">
        <img src="<?php echo esc_url($skill_card_image['url']); ?>" alt="<?php echo esc_attr($skill_card_image['alt'] ?: get_the_title()); ?>" />
      </div>
    <?php endif; ?>

    <div class="skill-card__stripe"></div>

    <div class="skill-card__content">
      <h3 class="skill-card__title"><?php the_title(); ?></h3>
    </div>
  </a>
</div>