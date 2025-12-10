<?php

/**
 * Module Not Found component template.
 *
 * @package Aera_Technology
 */

namespace Aera;

defined('ABSPATH') || exit;

// Initialize $args if not provided
$args = $args ?? array();

$not_found_title = $args['title'] ?? '';
$not_found_text = $args['text'] ?? '';

// Fallback to ACF fields if arguments not provided
if (empty($not_found_title) && function_exists('get_field')) {
	$not_found_title = get_field('platform_not_found_title');
}
if (empty($not_found_text) && function_exists('get_field')) {
	$not_found_text = get_field('platform_not_found_text');
}

// Default values if still empty
if (empty($not_found_title)) {
	$not_found_title = __('Page not found.', 'aera');
}
if (empty($not_found_text)) {
	$not_found_text = __('It is possible that the page has moved or changed or may no longer be available. Please check the page address and try again.', 'aera');
}
?>

<div class="articlenotFound">
	<div class="articlenotFound__container">
		<div class="articlenotFound__row">
			<div class="articlenotFound__col">
				<div class="articlenotFound__content">
					<h1 class="articlenotFound__title"><?php echo esc_html($not_found_title); ?></h1>
					<p class="articlenotFound__subline"><?php echo esc_html($not_found_text); ?></p>
				</div>
			</div>
		</div>
	</div>
</div>
