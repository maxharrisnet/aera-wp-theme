<?php

/**
 * Announcement Banner helpers.
 *
 * @package Aera_Technology
 */

namespace Aera;

defined('ABSPATH') || exit;

/**
 * Check if the banner should display on the current page.
 *
 * @return bool
 */
function is_banner_active(): bool
{
  if (!\function_exists('get_field')) {
    return false;
  }

  // Master toggle
  if (!\get_field('show_banner', 'option')) {
    return false;
  }

  // Hide on home page
  if (\get_field('banner_hide_on_home', 'option') && \is_front_page()) {
    return false;
  }

  // Hide on archives (blog, skills, etc.)
  if (\get_field('banner_hide_on_archives', 'option') && \is_archive()) {
    return false;
  }

  // Hide on single posts (not pages)
  if (\get_field('banner_hide_on_singles', 'option') && \is_singular() && !\is_page()) {
    return false;
  }

  // Hide on specific pages
  $hidden_pages = \get_field('banner_hide_on_pages', 'option');
  if (!empty($hidden_pages) && \is_array($hidden_pages)) {
    $current_page_id = \get_queried_object_id();
    if (\in_array($current_page_id, $hidden_pages, true)) {
      return false;
    }
  }

  return true;
}

/**
 * Get banner data from Site Options.
 *
 * @return array|null
 */
function get_banner_data(): ?array
{
  if (!is_banner_active()) {
    return null;
  }

  $text = \get_field('announcement_text', 'option');
  $url = \get_field('announcement_url', 'option');

  // Must have at least text or link
  if (empty($text) && empty($url)) {
    return null;
  }

  return [
    'text'              => $text ?: '',
    'btn_text'          => \get_field('announcement_btn_text', 'option') ?: 'Read Now',
    'url'               => $url ?: '',
    'target'            => \get_field('announcement_target', 'option') ?: '_self',
    'bg_color'          => \get_field('announcement_bg_color', 'option') ?: '#bde1fb',
    'text_color'        => \get_field('announcement_text_color', 'option') ?: '#1a1a1a',
    'btn_bg'            => \get_field('announcement_btn_bg', 'option') ?: '#ffffff',
    'btn_color'         => \get_field('announcement_btn_color', 'option') ?: '#1a1a1a',
  ];
}

/**
 * Resolve the banner link URL.
 *
 * @param string $url Raw URL from field.
 * @return string
 */
function resolve_banner_url(string $url): string
{
  if (empty($url)) {
    return '';
  }

  // Relative URL - prepend home_url
  if (strpos($url, '/') === 0) {
    return \home_url($url);
  }

  return $url;
}

/**
 * Render the announcement banner.
 *
 * @return void
 */
function render_banner(): void
{
  $banner = get_banner_data();

  if (!$banner) {
    return;
  }

  $url = resolve_banner_url($banner['url']);

  $styles = sprintf(
    '--banner-bg-color: %s; --banner-text-color: %s; --banner-button-bg-color: %s; --banner-button-text-color: %s;',
    \esc_attr($banner['bg_color']),
    \esc_attr($banner['text_color']),
    \esc_attr($banner['btn_bg']),
    \esc_attr($banner['btn_color'])
  );

?>
  <div class="header__topBanner" style="<?php echo \esc_attr($styles); ?>" data-announcement-banner>
    <?php if (!empty($banner['text'])) : ?>
      <strong class="header__topBanner-text">
        <?php echo \wp_kses($banner['text'], ['b' => [], 'strong' => [], 'em' => [], 'i' => []]); ?>
      </strong>
    <?php endif; ?>
    <?php if (!empty($url) && !empty($banner['btn_text'])) : ?>
      <span class="header__topBanner-cta">
        <a href="<?php echo \esc_url($url); ?>" target="<?php echo \esc_attr($banner['target']); ?>" <?php echo $banner['target'] === '_blank' ? ' rel="noopener noreferrer"' : ''; ?>>
          <?php echo \esc_html($banner['btn_text']); ?>
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
 * @return array
 */
function add_banner_body_class(array $classes): array
{
  if (is_banner_active()) {
    $classes[] = 'has-announcement-banner';
  }

  return $classes;
}
\add_filter('body_class', __NAMESPACE__ . '\\add_banner_body_class');

/**
 * Output banner CSS variables in head.
 *
 * @return void
 */
function output_banner_css_variables(): void
{
  $banner = get_banner_data();

  if (!$banner) {
    return;
  }

  echo '<style id="aera-banner-vars">' . "\n";
  echo ':root {' . "\n";
  echo '  --banner-bg-color: ' . \esc_attr($banner['bg_color']) . ';' . "\n";
  echo '  --banner-text-color: ' . \esc_attr($banner['text_color']) . ';' . "\n";
  echo '  --banner-button-bg-color: ' . \esc_attr($banner['btn_bg']) . ';' . "\n";
  echo '  --banner-button-text-color: ' . \esc_attr($banner['btn_color']) . ';' . "\n";
  echo '}' . "\n";
  echo '</style>' . "\n";
}
\add_action('wp_head', __NAMESPACE__ . '\\output_banner_css_variables', 5);
