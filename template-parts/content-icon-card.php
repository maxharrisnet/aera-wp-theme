<?php

/**
 * Template part for displaying icon cards (archive page)
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Aera_Technology
 */

$skill_icon = get_field('skill_icon');
$skill_description = get_field('skill_description') ?: get_the_excerpt();
?>

<div class="icon-card">
	<a href="<?php the_permalink(); ?>" class="icon-card__link">
		<div class="icon-card__top-stripe"></div>

		<div class="icon-card__content">
			<?php if ($skill_icon) : ?>
				<div class="icon-card__icon">
					<img src="<?php echo esc_url($skill_icon['url']); ?>" alt="<?php echo esc_attr($skill_icon['alt'] ?: get_the_title()); ?>" />
				</div>
			<?php endif; ?>

			<h3 class="icon-card__title"><?php the_title(); ?></h3>

			<?php if ($skill_description) : ?>
				<p class="icon-card__excerpt">
					<?php
					// Limit description to 120 characters
					$description = wp_strip_all_tags($skill_description);
					if (strlen($description) > 120) {
						echo esc_html(substr($description, 0, 120) . '...');
					} else {
						echo esc_html($description);
					}
					?>
				</p>
			<?php endif; ?>
		</div>
	</a>
</div>

