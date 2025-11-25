<?php
/**
 * Template part for blog social sharing.
 *
 * @package Aera_Technology
 */

defined('ABSPATH') || exit;

$share_url = get_permalink();
$share_title = get_the_title();
?>

<section class="blog-share">
  <div class="blog-share__container">
    <h3><?php esc_html_e('Share This', 'aera'); ?></h3>
    <div class="blog-share__networks">
      <div class="blog-share__network">
        <a
          href="https://www.facebook.com/sharer/sharer.php?u=<?php echo esc_url(rawurlencode($share_url)); ?>"
          target="_blank"
          rel="noopener noreferrer"
          class="blog-share__button"
          aria-label="<?php esc_attr_e('Share on Facebook', 'aera'); ?>">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#1877F2"/>
            <path d="M17.5 16h-1.5v6h-2v-6h-1.5v-2h1.5v-1.5c0-1.5.5-2.5 2-2.5h2v2h-1.5c-.5 0-.5.2-.5.5V14h2l-.5 2z" fill="white"/>
          </svg>
        </a>
      </div>

      <div class="blog-share__network">
        <a
          href="https://twitter.com/intent/tweet?url=<?php echo esc_url(rawurlencode($share_url)); ?>&text=<?php echo esc_attr(rawurlencode($share_title)); ?>"
          target="_blank"
          rel="noopener noreferrer"
          class="blog-share__button"
          aria-label="<?php esc_attr_e('Share on X (Twitter)', 'aera'); ?>">
          <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="31" height="31" rx="15.5" fill="black"/>
            <path d="M20.5 9.5h-2.5l-3 3.5-3-3.5H9.5l4.5 5.5-4.5 5.5h2.5l3-3.5 3 3.5h2.5l-4.5-5.5 4.5-5.5z" fill="white"/>
          </svg>
        </a>
      </div>

      <div class="blog-share__network">
        <a
          href="https://www.linkedin.com/sharing/share-offsite/?url=<?php echo esc_url(rawurlencode($share_url)); ?>"
          target="_blank"
          rel="noopener noreferrer"
          class="blog-share__button"
          aria-label="<?php esc_attr_e('Share on LinkedIn', 'aera'); ?>">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#0077B5"/>
            <path d="M12 10h8v8h-8v-8zm1 7h6v-6h-6v6zm3-8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-4 9.5h8v4h-8v-4zm2 3h4v-2h-4v2z" fill="white"/>
          </svg>
        </a>
      </div>

      <div class="blog-share__network">
        <a
          href="mailto:?subject=<?php echo esc_attr(rawurlencode($share_title)); ?>&body=<?php echo esc_attr(rawurlencode($share_url)); ?>"
          class="blog-share__button"
          aria-label="<?php esc_attr_e('Share via Email', 'aera'); ?>">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#666"/>
            <path d="M10 12h12v8H10v-8zm1 1v6h10v-6H11zm1 1h10v4H12v-4zm0 1v2h10v-2H12z" fill="white"/>
          </svg>
        </a>
      </div>
    </div>
  </div>
</section>

