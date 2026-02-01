<?php

/**
 * Announcement Banner helpers.
 *
 * @package Aera_Technology
 */

namespace Aera;

defined('ABSPATH') || exit;

/**
 * Check if a banner should be visible on the current page.
 *
 * @param array $banner Banner data from ACF.
 * @return bool
 */
function is_banner_visible(array $banner): bool
{
  // Check if banner is enabled
  if (empty($banner['banner_enabled'])) {
    return false;
  }

  // Check scheduling - start date
  if (!empty($banner['banner_start_date'])) {
    $start_time = strtotime($banner['banner_start_date']);
    if ($start_time && time() < $start_time) {
      return false;
    }
  }

  // Check scheduling - end date
  if (!empty($banner['banner_end_date'])) {
    $end_time = strtotime($banner['banner_end_date']);
    if ($end_time && time() > $end_time) {
      return false;
    }
  }

  // Check hide on home
  if (!empty($banner['banner_hide_on_home']) && is_front_page()) {
    return false;
  }

  // Check hide on archive
  if (!empty($banner['banner_hide_on_archive']) && is_archive()) {
    return false;
  }

  // Check hide on single
  if (!empty($banner['banner_hide_on_single']) && is_singular() && !is_page()) {
    return false;
  }

  // Check visibility mode
  $visibility_mode = $banner['banner_visibility_mode'] ?? 'all';
  $selected_pages  = $banner['banner_pages'] ?? array();

  if ($visibility_mode !== 'all' && !empty($selected_pages)) {
    $current_page_id = get_queried_object_id();

    if ($visibility_mode === 'include') {
      // Only show on selected pages
      if (!in_array($current_page_id, $selected_pages, true)) {
        return false;
      }
    } elseif ($visibility_mode === 'exclude') {
      // Hide on selected pages
      if (in_array($current_page_id, $selected_pages, true)) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Get the active banner for the current page.
 * Returns the first enabled and visible banner.
 *
 * @return array|null Banner data or null if no banner should display.
 */
function get_active_banner(): ?array
{
  // Check if ACF is available
  if (!function_exists('get_field')) {
    return null;
  }

  // Check master toggle
  $banners_enabled = get_field('site_banners_enabled', 'option');
  if (!$banners_enabled) {
    return null;
  }

  // Get all banners
  $banners = get_field('site_banners', 'option');
  if (empty($banners) || !is_array($banners)) {
    return null;
  }

  // Find the first active and visible banner
  foreach ($banners as $banner) {
    if (is_banner_visible($banner)) {
      return $banner;
    }
  }

  return null;
}

/**
 * Get banner inline styles.
 *
 * @param array $banner Banner data.
 * @return string CSS custom properties.
 */
function get_banner_styles(array $banner): string
{
  $bg_color          = $banner['banner_bg_color'] ?? '#bde1fb';
  $text_color        = $banner['banner_text_color'] ?? '#1a1a1a';
  $button_bg_color   = $banner['banner_button_bg_color'] ?? '#ffffff';
  $button_text_color = $banner['banner_button_text_color'] ?? '#1a1a1a';

  return sprintf(
    '--banner-bg-color: %s; --banner-text-color: %s; --banner-button-bg-color: %s; --banner-button-text-color: %s;',
    esc_attr($bg_color),
    esc_attr($text_color),
    esc_attr($button_bg_color),
    esc_attr($button_text_color)
  );
}

/**
 * Render the announcement banner.
 *
 * @return void
 */
function render_banner(): void
{
  $banner = get_active_banner();

  if (!$banner) {
    return;
  }

  $banner_text        = $banner['banner_text'] ?? '';
  $link_text          = $banner['banner_link_text'] ?? '';
  $link_url           = $banner['banner_link_url'] ?? '';
  $link_target        = $banner['banner_link_target'] ?? '_blank';
  $banner_styles      = get_banner_styles($banner);

  if (empty($banner_text) && empty($link_url)) {
    return;
  }

  ?>
  <div class="header__topBanner" style="<?php echo esc_attr($banner_styles); ?>" data-announcement-banner>
    <?php if (!empty($banner_text)) : ?>
      <span class="header__topBanner-text">
        <?php echo wp_kses($banner_text, array('b' => array(), 'strong' => array(), 'em' => array(), 'i' => array())); ?>
      </span>
    <?php endif; ?>
    <?php if (!empty($link_url) && !empty($link_text)) : ?>
      <span class="header__topBanner-cta">
        <a href="<?php echo esc_url($link_url); ?>" target="<?php echo esc_attr($link_target); ?>"<?php echo $link_target === '_blank' ? ' rel="noopener noreferrer"' : ''; ?>>
          <?php echo esc_html($link_text); ?>
        </a>
      </span>
    <?php endif; ?>
  </div>
  <?php
}

/**
 * Add body class when banner is active.
 *
 * @param array $classes Body classes.
 * @return array Modified body classes.
 */
function add_banner_body_class(array $classes): array
{
  $banner = get_active_banner();

  if ($banner) {
    $classes[] = 'has-announcement-banner';
  }

  return $classes;
}
add_filter('body_class', __NAMESPACE__ . '\\add_banner_body_class');

/**
 * Output banner CSS variables in head.
 * This provides default values that can be overridden by inline styles.
 *
 * @return void
 */
function output_banner_css_variables(): void
{
  $banner = get_active_banner();

  if (!$banner) {
    return;
  }

  $bg_color          = $banner['banner_bg_color'] ?? '#bde1fb';
  $text_color        = $banner['banner_text_color'] ?? '#1a1a1a';
  $button_bg_color   = $banner['banner_button_bg_color'] ?? '#ffffff';
  $button_text_color = $banner['banner_button_text_color'] ?? '#1a1a1a';

  echo '<style id="aera-banner-vars">' . "\n";
  echo ':root {' . "\n";
  echo '  --banner-bg-color: ' . esc_attr($bg_color) . ';' . "\n";
  echo '  --banner-text-color: ' . esc_attr($text_color) . ';' . "\n";
  echo '  --banner-button-bg-color: ' . esc_attr($button_bg_color) . ';' . "\n";
  echo '  --banner-button-text-color: ' . esc_attr($button_text_color) . ';' . "\n";
  echo '}' . "\n";
  echo '</style>' . "\n";
}
add_action('wp_head', __NAMESPACE__ . '\\output_banner_css_variables', 5);
