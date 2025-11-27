<?php
/**
 * Hero component template.
 *
 * @package Aera_Technology
 */

namespace Aera;

defined('ABSPATH') || exit;

// Get hero fields from ACF
$hero_title = get_field('hero_title');
$hero_title_line_two = get_field('hero_title_line_two');
$hero_subtitle = get_field('hero_subtitle');
$hero_text = get_field('hero_text');
$hero_button_text = get_field('hero_button_text');
$hero_button_link = get_field('hero_button_link');
$hero_full_height = get_field('hero_full_height');
$hero_variation = get_field('hero_variation') ?: 'default';

// Build classes
$hero_classes = array('hero');
if ($hero_full_height) {
	$hero_classes[] = 'hero--full-height';
}
if ($hero_variation && 'default' !== $hero_variation) {
	$hero_classes[] = 'hero--' . esc_attr($hero_variation);
}

// Only render if we have at least a title
if (empty($hero_title)) {
	return;
}
?>

<div class="<?php echo esc_attr(implode(' ', $hero_classes)); ?>">
	<div class="hero__container">
		<?php if ($hero_title) : ?>
			<h1 class="hero__title">
				<?php echo esc_html($hero_title); ?>
				<?php if ($hero_title_line_two) : ?>
					<span>
						<br />
						<?php echo esc_html($hero_title_line_two); ?>
					</span>
				<?php endif; ?>
			</h1>
		<?php endif; ?>

		<?php if ($hero_subtitle) : ?>
			<h2 class="hero__subtitle">
				<?php echo esc_html($hero_subtitle); ?>
			</h2>
		<?php endif; ?>

		<?php if ($hero_text) : ?>
			<?php
			$paragraphs = array_filter(
				array_map('trim', explode("\n", $hero_text)),
				function ($p) {
					return ! empty($p);
				}
			);
			foreach ($paragraphs as $paragraph) :
				?>
				<p class="hero__text">
					<?php echo esc_html($paragraph); ?>
				</p>
			<?php endforeach; ?>
		<?php endif; ?>

		<?php if ($hero_button_text && $hero_button_link) : ?>
			<p class="hero__button">
				<a href="<?php echo esc_url($hero_button_link); ?>" class="hero__button-link">
					<?php echo esc_html($hero_button_text); ?>
				</a>
			</p>
		<?php endif; ?>
	</div>
</div>

