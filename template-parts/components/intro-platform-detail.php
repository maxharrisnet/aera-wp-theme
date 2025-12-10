<?php

/**
 * Intro Platform Detail component template.
 *
 * @package Aera_Technology
 */

namespace Aera;

defined('ABSPATH') || exit;

// Initialize $args if not provided
$args = $args ?? array();

$intro_title = $args['title'] ?? '';
$intro_text = $args['text'] ?? '';

// Fallback to ACF fields if arguments not provided
if (empty($intro_title) && function_exists('get_field')) {
  $intro_title = get_field('platform_intro_title');
}
if (empty($intro_text) && function_exists('get_field')) {
  $intro_text = get_field('platform_intro_text');
}

// Only render if we have content
if (empty($intro_title) && empty($intro_text)) {
  return;
}
?>

<section class="intro-platform-detail">
	<div class="intro-platform-detail__container">
		<?php if (!empty($intro_title)) : ?>
			<h1 class="intro-platform-detail__title"><?php echo wp_kses_post($intro_title); ?></h1>
		<?php endif; ?>

		<?php if (!empty($intro_text)) : ?>
			<?php
			$paragraphs = array_filter(
				array_map('trim', explode("\n", $intro_text)),
				function ($p) {
					return ! empty($p);
				}
			);
			foreach ($paragraphs as $paragraph) :
			?>
				<p class="intro-platform-detail__text">
					<?php echo wp_kses_post($paragraph); ?>
				</p>
			<?php endforeach; ?>
		<?php endif; ?>
	</div>
</section>