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
  <meta name="msapplication-square150x150logo" content="<?php echo esc_url($favicons_base . '/mstile-150x150.png'); ?>">
  <link rel="apple-touch-icon" sizes="180x180" href="<?php echo esc_url($favicons_base . '/apple-touch-icon.png'); ?>">
  <link rel="mask-icon" href="<?php echo esc_url($favicons_base . '/safari-pinned-tab.svg'); ?>" color="#8ac4e8">
  <link rel="icon" type="image/png" href="<?php echo esc_url($favicons_base . '/favicon-32x32.png'); ?>" sizes="32x32">
  <link rel="icon" type="image/png" href="<?php echo esc_url($favicons_base . '/favicon-16x16.png'); ?>" sizes="16x16">
  <link rel="icon" sizes="16x16 32x32" href="<?php echo esc_url($favicons_base . '/favicon.ico'); ?>">
  <link rel="manifest" href="<?php echo esc_url(home_url('/manifest.json')); ?>">
  <?php
}
add_action('wp_head', __NAMESPACE__ . '\\aera_output_head_meta', 2);

/**
 * Output Organization JSON-LD on front page to match original site.
 */
function aera_output_organization_schema()
{
  if (! is_front_page()) {
    return;
  }

  $home = 'https://www.aeratechnology.com';
  $schema = array(
    '@context'    => 'http://www.schema.org',
    '@type'       => 'Organization',
    'name'        => 'Aera Technology',
    'url'         => trailingslashit($home),
    'logo'        => $home . '/aera-logo.svg',
    'image'       => $home . '/aera-logo.svg',
    'description' => 'Aera Technology is the Decision Intelligence company that makes business agility happen. In the era of digital acceleration, Aera helps enterprises around the world transform how they respond to the ever-changing environment',
    'address'     => array(
      array(
        '@type'           => 'PostalAddress',
        'streetAddress'   => 'Aera Technology Headquarter, 707 California Street Mountain View, CA 94041',
        'addressLocality' => 'Mountain View',
        'addressRegion'   => 'California',
        'postalCode'      => '94041',
        'addressCountry'  => 'United States of America',
        'telephone'       => '+1 408-524-2222',
      ),
    ),
  );
  echo '<script type="application/ld+json">' . "\n" . wp_json_encode($schema) . "\n" . '</script>' . "\n";
}
add_action('wp_head', __NAMESPACE__ . '\\aera_output_organization_schema', 5);
