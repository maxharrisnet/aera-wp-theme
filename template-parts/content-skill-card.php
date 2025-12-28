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

$skill_icon = get_field('skill_icon');
$skill_description = get_field('skill_description') ?: get_the_excerpt();
$skill_list_items = get_field('skill_list_items'); // Optional: list items for the card
?>

<div class="<?php echo esc_attr($card_class); ?>">
	<div class="skill-card__wrapper">
		<a href="<?php the_permalink(); ?>">
			<?php if ($skill_icon) : ?>
				<div class="skill-card__icon">
					<img src="<?php echo esc_url($skill_icon['url']); ?>" alt="<?php echo esc_attr($skill_icon['alt'] ?: get_the_title()); ?>" />
				</div>
			<?php endif; ?>

			<div class="skill-card__content">
				<h3 class="skill-card__title"><?php the_title(); ?></h3>

				<?php if ($skill_description) : ?>
					<p class="skill-card__description">
						<?php
						// Limit description to 100 characters for regular cards, 150 for featured
						$limit = $is_featured ? 150 : 100;
						$description = wp_strip_all_tags($skill_description);
						if (strlen($description) > $limit) {
							echo esc_html(substr($description, 0, $limit) . '...');
						} else {
							echo esc_html($description);
						}
						?>
					</p>
				<?php endif; ?>

				<?php if ($skill_list_items && is_array($skill_list_items) && !$is_featured) : ?>
					<ul class="skill-card__list">
						<?php
						// Show max 4 items on cards
						$items_to_show = array_slice($skill_list_items, 0, 4);
						foreach ($items_to_show as $item) :
							if (!empty($item['item_text'])) :
								?>
								<li><?php echo esc_html($item['item_text']); ?></li>
							<?php endif; ?>
						<?php endforeach; ?>
					</ul>
				<?php endif; ?>
			</div>
		</a>
	</div>
</div>

