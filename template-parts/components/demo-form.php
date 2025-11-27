<?php
/**
 * Demo form component template.
 *
 * @package Aera_Technology
 */

namespace Aera;

defined('ABSPATH') || exit;

// Accept demo form data as parameter, or get from ACF if not provided
if (!isset($title)) {
	$title = function_exists('get_field') ? get_field('demo_title') : '';
	if (empty($title)) {
		$title = __('Meet Aera: Schedule a demo today.', 'aera');
	}
}

if (!isset($text)) {
	$text = function_exists('get_field') ? get_field('demo_text') : '';
	if (empty($text)) {
		$text = __('Learn why leaders in consumer goods, life sciences, technology, and beyond trust Aera to digitize and automate decisions. Schedule a personalized demo of Aera Decision Cloud and see how you can start to benefit from AI-powered insights in as little as 2 to 4 weeks.', 'aera');
	}
}

if (!isset($hubspot_portal_id)) {
	$hubspot_portal_id = function_exists('get_field') ? get_field('hubspot_portal_id') : '4455954';
}

if (!isset($hubspot_form_id)) {
	$hubspot_form_id = function_exists('get_field') ? get_field('hubspot_form_id') : '9fa1d4a1-4c89-44d5-add1-37df812fc7bd';
}

if (!isset($dashboard_image)) {
	$dashboard_image = function_exists('get_field') ? get_field('demo_dashboard_image') : '';
	if (empty($dashboard_image)) {
		$dashboard_image = get_template_directory_uri() . '/assets/images/demoform/dashboards.png';
	}
}

// Background image
$background_image = function_exists('get_field') ? get_field('demo_background_image') : '';
if (empty($background_image)) {
	$background_image = get_template_directory_uri() . '/assets/images/demoform/bg_helix.jpg';
}
$background_style = !empty($background_image) ? 'background-image: url(' . esc_url($background_image) . ');' : '';
?>

<div class="demo-form">
	<div class="demo-form__formSectionWrapper">
		<div class="demo-form__formSection" style="<?php echo esc_attr($background_style); ?>">
			<div class="demo-form__formContainer">
				<div class="demo-form__formRow">
					<div class="demo-form__formCopy">
						<h1><?php echo esc_html($title); ?></h1>
						<p class="demo-form__mTop30">
							<?php echo esc_html($text); ?>
						</p>
						<div class="demo-form__contentwrapper">
							<div id="hubspotForm"></div>
						</div>
					</div>
					<?php if (!empty($dashboard_image)) : ?>
						<div class="demo-form__formDashboard">
							<img src="<?php echo esc_url($dashboard_image); ?>" alt="<?php esc_attr_e('Dashboard', 'aera'); ?>" />
						</div>
					<?php endif; ?>
				</div>
			</div>
		</div>
	</div>
</div>

<script>
	document.addEventListener('DOMContentLoaded', function() {
		// Load HubSpot forms script
		const script = document.createElement('script');
		script.src = 'https://js.hsforms.net/forms/embed/v2.js';
		document.body.appendChild(script);

		script.addEventListener('load', function() {
			if (window.hbspt) {
				window.hbspt.forms.create({
					portalId: '<?php echo esc_js($hubspot_portal_id); ?>',
					formId: '<?php echo esc_js($hubspot_form_id); ?>',
					target: '#hubspotForm'
				});
			}
		});
	});
</script>

