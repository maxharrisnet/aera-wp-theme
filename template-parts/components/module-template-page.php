<?php

/**
 * Module Template Page component template.
 *
 * @package Aera_Technology
 */

namespace Aera;

defined('ABSPATH') || exit;

// Initialize $args if not provided
$args = $args ?? array();

$body_copy = $args['body_copy'] ?? '';
$benefits = $args['benefits'] ?? '';
$features = $args['features'] ?? '';
$featured_image = $args['featured_image'] ?? null;

// Fallback to ACF fields if arguments not provided
if (empty($body_copy) && function_exists('get_field')) {
	$body_copy = get_field('platform_body_copy');
}
if (empty($benefits) && function_exists('get_field')) {
	$benefits = get_field('platform_benefits');
}
if (empty($features) && function_exists('get_field')) {
	$features = get_field('platform_features');
}
if (empty($featured_image) && function_exists('get_field')) {
	$featured_image = get_field('platform_featured_image');
}
?>

<div class="skills">
	<?php if (!empty($body_copy) || !empty($featured_image)) : ?>
		<div class="skills__imagetext">
			<div class="skills__container">
				<div class="skills__row">
					<?php if (!empty($body_copy)) : ?>
						<div class="skills__bodyCopy">
							<?php echo wp_kses_post(wpautop($body_copy)); ?>
						</div>
					<?php endif; ?>
					<?php if (!empty($featured_image) && is_array($featured_image)) : ?>
						<div class="skills__featImage">
							<img src="<?php echo esc_url($featured_image['url']); ?>" alt="<?php echo esc_attr($featured_image['alt'] ?? ''); ?>" />
						</div>
					<?php endif; ?>
				</div>
			</div>
		</div>
	<?php endif; ?>

	<?php if (!empty($benefits) || !empty($features)) : ?>
		<div class="skills__container">
			<div class="skills__row">
				<div class="skills__content">
					<div class="skills__detailWrapper">
						<?php if (!empty($benefits)) : ?>
							<div class="skills__list">
								<h3><?php esc_html_e('Benefits', 'aera'); ?></h3>
								<?php echo wp_kses_post(wpautop($benefits)); ?>
							</div>
						<?php endif; ?>
						<?php if (!empty($features)) : ?>
							<div class="skills__list">
								<h3><?php esc_html_e('Features', 'aera'); ?></h3>
								<?php echo wp_kses_post(wpautop($features)); ?>
							</div>
						<?php endif; ?>
						<div class="skills__clearfix"></div>
					</div>
				</div>
			</div>
		</div>
	<?php endif; ?>
</div>
