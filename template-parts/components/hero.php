<?php
/**
 * Hero component template.
 *
 * @package Aera_Technology
 */

namespace Aera;

defined('ABSPATH') || exit;

// Initialize $args if not provided (for backward compatibility)
$args = $args ?? array();

// Priority order for hero data:
// 1. Arguments passed directly (for archive pages, etc.)
// 2. ACF page/post fields (for regular pages)
// 3. ACF Options page fields (for archive defaults)
// 4. Fallback defaults

$hero_title = $args['hero_title'] ?? null;
$hero_title_line_two = $args['hero_title_line_two'] ?? null;
$hero_subtitle = $args['hero_subtitle'] ?? null;
$hero_text = $args['hero_text'] ?? null;
$hero_button_text = $args['hero_button_text'] ?? null;
$hero_button_link = $args['hero_button_link'] ?? null;
$hero_full_height = $args['hero_full_height'] ?? null;
$hero_variation = $args['hero_variation'] ?? null;

// Fallback to ACF page/post fields if arguments not provided
if ($hero_title === null) {
$hero_title = get_field('hero_title');
}
if ($hero_title_line_two === null) {
$hero_title_line_two = get_field('hero_title_line_two');
}
if ($hero_subtitle === null) {
$hero_subtitle = get_field('hero_subtitle');
}
if ($hero_text === null) {
$hero_text = get_field('hero_text');
}
if ($hero_button_text === null) {
$hero_button_text = get_field('hero_button_text');
}
if ($hero_button_link === null) {
$hero_button_link = get_field('hero_button_link');
}
if ($hero_full_height === null) {
$hero_full_height = get_field('hero_full_height');
}
if ($hero_variation === null) {
$hero_variation = get_field('hero_variation') ?: 'default';
}

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

