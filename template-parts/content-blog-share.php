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
          <svg viewBox="0 0 64 64" width="32" height="32">
            <circle cx="32" cy="32" r="31" fill="#3b5998"></circle>
            <path d="M34.1,47V33.3h4.6l0.7-5.3h-5.3v-3.4c0-1.5,0.4-2.6,2.6-2.6l2.8,0v-4.8c-0.5-0.1-2.2-0.2-4.1-0.2 c-4.1,0-6.9,2.5-6.9,7V28H24v5.3h4.6V47H34.1z" fill="white"></path>
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
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="-480 -466.815 2160 2160">
            <circle cx="600" cy="613.185" r="1080" />
            <path fill="#fff" d="M306.615 79.694H144.011L892.476 1150.3h162.604ZM0 0h357.328l309.814 450.883L1055.03 0h105.86L714.15 519.295 1200 1226.37H842.672L515.493 750.215 105.866 1226.37H0l468.485-544.568Z" />
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
          <svg viewBox="0 0 64 64" width="32" height="32">
            <circle cx="32" cy="32" r="31" fill="#007fb1"></circle>
            <path d="M20.4,44h5.4V26.6h-5.4V44z M23.1,18c-1.7,0-3.1,1.4-3.1,3.1c0,1.7,1.4,3.1,3.1,3.1 c1.7,0,3.1-1.4,3.1-3.1C26.2,19.4,24.8,18,23.1,18z M39.5,26.2c-2.6,0-4.4,1.4-5.1,2.8h-0.1v-2.4h-5.2V44h5.4v-8.6 c0-2.3,0.4-4.5,3.2-4.5c2.8,0,2.8,2.6,2.8,4.6V44H46v-9.5C46,29.8,45,26.2,39.5,26.2z" fill="white"></path>
          </svg>
        </a>
      </div>

      <div class="blog-share__network">
        <a
          href="mailto:?subject=<?php echo esc_attr(rawurlencode($share_title)); ?>&body=<?php echo esc_attr(rawurlencode($share_url)); ?>"
          class="blog-share__button"
          aria-label="<?php esc_attr_e('Share via Email', 'aera'); ?>">
          <svg viewBox="0 0 64 64" width="32" height="32">
            <circle cx="32" cy="32" r="31" fill="#7f7f7f"></circle>
            <path d="M17,22v20h30V22H17z M41.1,25L32,32.1L22.9,25H41.1z M20,39V26.6l12,9.3l12-9.3V39H20z" fill="white"></path>
          </svg>
        </a>
      </div>
    </div>
  </div>
</section>