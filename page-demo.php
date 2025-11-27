<?php
/**
 * Template Name: Demo
 *
 * @package Aera_Technology
 */

get_header();

// Get demo page fields from ACF
$demo_title = function_exists('get_field') ? get_field('demo_title') : '';
$demo_text = function_exists('get_field') ? get_field('demo_text') : '';

// Set defaults
if (empty($demo_title)) {
	$demo_title = __('Meet Aera: Schedule a demo today.', 'aera');
}

if (empty($demo_text)) {
	$demo_text = __('Learn why leaders in consumer goods, life sciences, technology, and beyond trust Aera to digitize and automate decisions. Schedule a personalized demo of Aera Decision Cloud and see how you can start to benefit from AI-powered insights in as little as 2 to 4 weeks.', 'aera');
}

// HubSpot form configuration
$hubspot_portal_id = function_exists('get_field') ? get_field('hubspot_portal_id') : '4455954';
$hubspot_form_id = function_exists('get_field') ? get_field('hubspot_form_id') : '9fa1d4a1-4c89-44d5-add1-37df812fc7bd';

// Dashboard image
$dashboard_image = function_exists('get_field') ? get_field('demo_dashboard_image') : '';
if (empty($dashboard_image)) {
	$dashboard_image = get_template_directory_uri() . '/assets/images/demoform/dashboards.png';
}

// Background image
$background_image = function_exists('get_field') ? get_field('demo_background_image') : '';
if (empty($background_image)) {
	$background_image = get_template_directory_uri() . '/assets/images/demoform/bg_helix.jpg';
}

?>

<main id="primary" class="site-main site-main--demo">
	<?php get_template_part('template-parts/components/demo-form', null, array(
		'title' => $demo_title,
		'text' => $demo_text,
		'hubspot_portal_id' => $hubspot_portal_id,
		'hubspot_form_id' => $hubspot_form_id,
		'dashboard_image' => $dashboard_image,
		'background_image' => $background_image,
	)); ?>
</main>

<?php
get_footer();

