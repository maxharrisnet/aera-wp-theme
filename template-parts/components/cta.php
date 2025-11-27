<?php
/**
 * CTA component template.
 *
 * @package Aera_Technology
 */

namespace Aera;

defined('ABSPATH') || exit;

// Accept CTA data as parameter, or get from ACF if not provided
if (!isset($cta) || empty($cta)) {
	$cta = function_exists('get_field') ? (array) get_field('cta') : array();
}

// Set defaults
$cta = wp_parse_args(
	$cta,
	array(
		'title' => __('See Aera in action.', 'aera'),
		'text'  => __('Schedule Demo', 'aera'),
		'link'  => home_url('/demo'),
	)
);

// Don't render if required fields are missing
if (empty($cta['title']) || empty($cta['text']) || empty($cta['link'])) {
	return;
}
?>

<section class="request">
	<div class="request__container">
		<div class="request__content">
			<h2 class="request__title"><?php echo esc_html($cta['title']); ?></h2>
			<a class="button button--outline" href="<?php echo esc_url($cta['link']); ?>"><?php echo esc_html($cta['text']); ?></a>
		</div>
	</div>
</section>

