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
    __('Resources', 'aera'),
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
 * Renders the placeholder Resources hub page.
 *
 * @return void
 */
function render_resources_hub_page(): void
{
  ?>
  <div class="wrap">
    <h1><?php esc_html_e('Resources Hub', 'aera'); ?></h1>
    <p><?php esc_html_e('Use the submenu links to manage News, Blogs, Press Releases, and the rest of the resource types.', 'aera'); ?></p>
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
    __('Company', 'aera'),
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
 * Renders the placeholder Company hub page.
 *
 * @return void
 */
function render_company_hub_page(): void
{
  ?>
  <div class="wrap">
    <h1><?php esc_html_e('Company Hub', 'aera'); ?></h1>
    <p><?php esc_html_e('Use the submenu links to manage Team Members, Partners, and Customers.', 'aera'); ?></p>
  </div>
  <?php
}

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

