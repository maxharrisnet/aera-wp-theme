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

// Get the first function (skill_function taxonomy) for color coding
$functions = get_the_terms(get_the_ID(), 'skill_function');
$function_slug = (!empty($functions) && !is_wp_error($functions)) ? $functions[0]->slug : '';

// Handle both image array (old) and URL string (new select field)
$icon_url = '';
$icon_alt = get_the_title();
if ($skill_icon) {
	if (is_array($skill_icon)) {
		// Old format: ACF image field returns array
		$icon_url = $skill_icon['url'];
		$icon_alt = $skill_icon['alt'] ?: get_the_title();
	} else {
		// New format: ACF select field returns URL string
		$icon_url = $skill_icon;
	}
}
?>

<div class="icon-card" data-function="<?php echo esc_attr($function_slug); ?>">
	<a href="<?php the_permalink(); ?>" class="icon-card__link">
		<div class="icon-card__top-stripe"></div>

		<div class="icon-card__content">
			<?php if ($icon_url) : ?>
				<div class="icon-card__icon">
					<img src="<?php echo esc_url($icon_url); ?>" alt="<?php echo esc_attr($icon_alt); ?>" />
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

