<?php

/**
 * Admin-specific helpers.
 *
 * @package Aera_Technology
 */

namespace Aera;

defined('ABSPATH') || exit;

/**
 * Registers the Resources hub menu used to group resource CPTs.
 *
 * @return void
 */
function register_resources_hub_menu(): void
{
  add_menu_page(
    __('Resources Options', 'aera'),
    __('Resources', 'aera'),
    'edit_posts',
    'aera-resources-hub',
    __NAMESPACE__ . '\\render_resources_hub_page',
    'dashicons-media-document',
    5
  );
}
add_action('admin_menu', __NAMESPACE__ . '\\register_resources_hub_menu', 5);

/**
 * Renders the Resources options page.
 *
 * @return void
 */
function render_resources_hub_page(): void
{
  if (function_exists('acf_add_options_page')) {
    // Redirect to ACF options page if available
    wp_safe_redirect(admin_url('admin.php?page=acf-options-resources-options'));
    exit;
  }
  ?>
  <div class="wrap">
    <h1><?php esc_html_e('Resources Options', 'aera'); ?></h1>
    <p><?php esc_html_e('Configure settings for Resources post types. ACF Options Page is required for full functionality.', 'aera'); ?></p>
  </div>
  <?php
}

/**
 * Registers the Company hub menu used to group company-related CPTs.
 *
 * @return void
 */
function register_company_hub_menu(): void
{
  add_menu_page(
    __('Company Options', 'aera'),
    __('Company', 'aera'),
    'edit_posts',
    'aera-company-hub',
    __NAMESPACE__ . '\\render_company_hub_page',
    'dashicons-building',
    7
  );
}
add_action('admin_menu', __NAMESPACE__ . '\\register_company_hub_menu', 5);

/**
 * Renders the Company options page.
 *
 * @return void
 */
function render_company_hub_page(): void
{
  if (function_exists('acf_add_options_page')) {
    // Redirect to ACF options page if available
    wp_safe_redirect(admin_url('admin.php?page=acf-options-company-options'));
    exit;
  }
  ?>
  <div class="wrap">
    <h1><?php esc_html_e('Company Options', 'aera'); ?></h1>
    <p><?php esc_html_e('Configure settings for Company post types. ACF Options Page is required for full functionality.', 'aera'); ?></p>
  </div>
  <?php
}

/**
 * Registers ACF options pages for CPT sections.
 *
 * @return void
 */
function register_acf_options_pages(): void
{
  if (!function_exists('acf_add_options_page')) {
    return;
  }

  // Resources Options
  acf_add_options_page(array(
    'page_title' => __('Resources Options', 'aera'),
    'menu_title' => __('Resources Options', 'aera'),
    'menu_slug'  => 'acf-options-resources-options',
    'capability' => 'edit_posts',
    'parent_slug' => 'aera-resources-hub',
    'icon_url'   => 'dashicons-media-document',
  ));

  // Events Options
  acf_add_options_page(array(
    'page_title' => __('Events Options', 'aera'),
    'menu_title' => __('Events Options', 'aera'),
    'menu_slug'  => 'acf-options-events-options',
    'capability' => 'edit_posts',
    'parent_slug' => 'edit.php?post_type=event',
    'icon_url'   => 'dashicons-calendar-alt',
  ));

  // Webinars Options
  acf_add_options_page(array(
    'page_title' => __('Webinars Options', 'aera'),
    'menu_title' => __('Webinars Options', 'aera'),
    'menu_slug'  => 'acf-options-webinars-options',
    'capability' => 'edit_posts',
    'parent_slug' => 'edit.php?post_type=webinar',
    'icon_url'   => 'dashicons-video-alt2',
  ));

  // Company Options
  acf_add_options_page(array(
    'page_title' => __('Company Options', 'aera'),
    'menu_title' => __('Company Options', 'aera'),
    'menu_slug'  => 'acf-options-company-options',
    'capability' => 'edit_posts',
    'parent_slug' => 'aera-company-hub',
    'icon_url'   => 'dashicons-building',
  ));

  // Skills Options
  acf_add_options_page(array(
    'page_title' => __('Skills Options', 'aera'),
    'menu_title' => __('Skills Options', 'aera'),
    'menu_slug'  => 'acf-options-skills-options',
    'capability' => 'edit_posts',
    'parent_slug' => 'edit.php?post_type=skill',
    'icon_url'   => 'dashicons-awards',
  ));

  // Site Options (global settings, banners, etc.)
  acf_add_options_page(array(
    'page_title' => __('Site Options', 'aera'),
    'menu_title' => __('Site Options', 'aera'),
    'menu_slug'  => 'acf-options-site-options',
    'capability' => 'manage_options',
    'parent_slug' => '',
    'icon_url'   => 'dashicons-admin-settings',
    'position'   => 2,
    'redirect'   => false,
  ));
}
add_action('acf/init', __NAMESPACE__ . '\\register_acf_options_pages');

/**
 * Forces a visible Customizer entry under Appearance for quick access.
 *
 * @return void
 */
function add_customizer_location(): void
{
  add_theme_page(
    __('Customizer', 'aera'),
    __('Customizer', 'aera'),
    'customize',
    'aera-customizer-redirect',
    __NAMESPACE__ . '\\redirect_to_customizer'
  );
}
add_action('admin_menu', __NAMESPACE__ . '\\add_customizer_location', 2);

/**
 * Redirects the faux theme page to the Customizer.
 *
 * @return void
 */
function redirect_to_customizer(): void
{
  wp_safe_redirect(admin_url('customize.php'));
  exit;
}

/**
 * Removes WordPress admin bar top padding/margin when admin bar is moved to bottom.
 *
 * @return void
 */
function remove_admin_bar_top_padding(): void
{
  if (is_admin_bar_showing()) {
    // Remove inline styles WordPress adds for top padding
    add_filter('show_admin_bar', '__return_true');
    add_action('wp_head', function () {
      echo '<style type="text/css">' . "\n";
      echo '  html { margin-top: 0 !important; }' . "\n";
      echo '  body.admin-bar { padding-top: 0 !important; }' . "\n";
      echo '</style>' . "\n";
    }, 100);
  }
}
add_action('init', __NAMESPACE__ . '\\remove_admin_bar_top_padding', 100);

