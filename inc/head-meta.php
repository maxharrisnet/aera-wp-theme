<?php

/**
 * Output head meta and link tags to match original site (Contentful/React).
 * Source of truth: original site <head>.
 *
 * @package Aera_Technology
 */

namespace Aera;

if (! defined('ABSPATH')) {
  exit;
}

/**
 * Base URL for favicons and manifest. Defaults to theme URI + assets/favicons.
 * Filter 'aera_favicons_base_url' to override (e.g. site root or CDN).
 *
 * @return string
 */
function aera_favicons_base_url()
{
  $url = get_template_directory_uri() . '/assets/favicons';
  return (string) apply_filters('aera_favicons_base_url', $url);
}

/**
 * Output meta and link tags that match the original site.
 */
function aera_output_head_meta()
{
  $favicons_base = aera_favicons_base_url();
?>
  <!-- Aera: meta/link to match original site -->
  <meta name="google-site-verification" content="UPEFpocP7qNk3bXQc962_ql03GcojuTqs2xbbVu35Ic">
  <meta name="theme-color" content="#ffffff">
  <meta http-equiv="Permissions-Policy" content="unload=()">
  <meta name="msapplication-square150x150logo" content="<?php echo esc_url($favicons_base . '/mstile-150x150.png'); ?>">
  <link rel="apple-touch-icon" sizes="180x180" href="<?php echo esc_url($favicons_base . '/apple-touch-icon.png'); ?>">
  <link rel="mask-icon" href="<?php echo esc_url($favicons_base . '/safari-pinned-tab.svg'); ?>" color="#8ac4e8">
  <link rel="icon" type="image/png" href="<?php echo esc_url($favicons_base . '/favicon-32x32.png'); ?>" sizes="32x32">
  <link rel="icon" type="image/png" href="<?php echo esc_url($favicons_base . '/favicon-16x16.png'); ?>" sizes="16x16">
  <link rel="icon" sizes="16x16 32x32" href="<?php echo esc_url($favicons_base . '/favicon.ico'); ?>">
  <link rel="manifest" href="<?php echo esc_url(aera_favicons_base_url() . '/manifest.json'); ?>">
<?php
}
add_action('wp_head', __NAMESPACE__ . '\\aera_output_head_meta', 2);

/**
 * Enhance Yoast's Organization schema with address data.
 *
 * Instead of outputting a duplicate Organization JSON-LD block,
 * we hook into Yoast's schema graph and add the address to the
 * existing Organization piece. This avoids duplicate schemas.
 *
 * @param array $data The Organization schema data.
 * @return array
 */
function aera_enhance_yoast_organization_schema($data)
{
  $data['address'] = array(
    '@type'           => 'PostalAddress',
    'streetAddress'   => '707 California Street',
    'addressLocality' => 'Mountain View',
    'addressRegion'   => 'CA',
    'postalCode'      => '94041',
    'addressCountry'  => 'US',
    'telephone'       => '+1 408-524-2222',
  );

  return $data;
}
add_filter('wpseo_schema_organization', __NAMESPACE__ . '\\aera_enhance_yoast_organization_schema');
