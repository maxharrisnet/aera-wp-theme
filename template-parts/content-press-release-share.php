<?php

/**
 * Press release social sharing sidebar partial
 *
 * @package Aera_Technology
 */

$post_id = get_the_ID();
$title = get_the_title($post_id);
$url = get_permalink($post_id);
$excerpt = wp_strip_all_tags(get_the_excerpt($post_id));
?>

<div class="press-release-share">
  <h3 class="press-release-share__title"><?php esc_html_e('Share', 'aera'); ?></h3>

  <div class="press-release-share__list">
    <!-- Twitter -->
    <a href="<?php echo esc_url('https://twitter.com/intent/tweet?url=' . urlencode($url) . '&text=' . urlencode($title)); ?>"
      class="press-release-share__link press-release-share__link--twitter"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="<?php esc_attr_e('Share on Twitter', 'aera'); ?>">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7a10.6 10.6 0 01-9-5.5" stroke="currentColor" stroke-width="2" fill="none" />
      </svg>
      <span><?php esc_html_e('Twitter', 'aera'); ?></span>
    </a>

    <!-- LinkedIn -->
    <a href="<?php echo esc_url('https://www.linkedin.com/sharing/share-offsite/?url=' . urlencode($url)); ?>"
      class="press-release-share__link press-release-share__link--linkedin"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="<?php esc_attr_e('Share on LinkedIn', 'aera'); ?>">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" fill="currentColor" />
        <circle cx="4" cy="4" r="2" fill="currentColor" />
      </svg>
      <span><?php esc_html_e('LinkedIn', 'aera'); ?></span>
    </a>

    <!-- Facebook -->
    <a href="<?php echo esc_url('https://www.facebook.com/sharer/sharer.php?u=' . urlencode($url)); ?>"
      class="press-release-share__link press-release-share__link--facebook"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="<?php esc_attr_e('Share on Facebook', 'aera'); ?>">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a6 6 0 00-6 6v9h-2v4h2v1h4v-1h3v-4h-2v-9a2 2 0 012-2h3V2z" fill="currentColor" />
      </svg>
      <span><?php esc_html_e('Facebook', 'aera'); ?></span>
    </a>

    <!-- Email -->
    <a href="<?php echo esc_url('mailto:?subject=' . urlencode($title) . '&body=' . urlencode($excerpt . '\n\n' . $url)); ?>"
      class="press-release-share__link press-release-share__link--email"
      aria-label="<?php esc_attr_e('Share via Email', 'aera'); ?>">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <rect x="2" y="4" width="20" height="16" rx="2" fill="currentColor" opacity="0.2" stroke="currentColor" stroke-width="2" fill="none" />
        <path d="M2 6l10 7.5L22 6" stroke="currentColor" stroke-width="2" fill="none" />
      </svg>
      <span><?php esc_html_e('Email', 'aera'); ?></span>
    </a>
  </div>
</div>