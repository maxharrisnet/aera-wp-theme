<?php

/**
 * Template part for recent blog posts.
 *
 * @package Aera_Technology
 */

defined('ABSPATH') || exit;

// Get recent posts (exclude current post)
$recent_posts = get_posts(
  array(
    'post_type'      => 'blog',
    'posts_per_page' => 5,
    'post__not_in'   => array(get_the_ID()),
    'orderby'        => 'date',
    'order'          => 'DESC',
  )
);

if (empty($recent_posts)) {
  return;
}
?>

<section class="blog-related">
  <div class="blog-related__container">
    <h3><?php esc_html_e('Recent Articles', 'aera'); ?></h3>
    <div class="blog-related__list">
      <div class="blog-related__col">
        <?php foreach ($recent_posts as $post) : setup_postdata($post); ?>
          <div class="blog-related__item">
            <div class="blog-related__itemRow">
              <div class="blog-related__itemWrapper">
                <a href="<?php echo esc_url(get_permalink($post->ID)); ?>">
                  <?php
                  // Get card image from ACF field, fallback to featured image
                  $card_image = '';
                  if (function_exists('get_field')) {
                    $card_image_data = get_field('resource_card_image', $post->ID);
                    if ($card_image_data && !empty($card_image_data['url'])) {
                      $card_image = sprintf(
                        '<img src="%1$s" alt="%2$s" loading="lazy" />',
                        esc_url($card_image_data['url']),
                        esc_attr($card_image_data['alt'] ?? get_the_title($post->ID))
                      );
                    }
                  }

                  // Use card image if available, otherwise featured image
                  if ($card_image) {
                    echo $card_image; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                  } else {
                    $thumbnail = get_the_post_thumbnail($post->ID, 'medium');
                    if ($thumbnail) {
                      echo $thumbnail; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                    }
                  }
                  ?>
                  <?php
                  // Get author - strip HTML and get first line (matching NewsItem.js structure)
                  $author = '';
                  if (function_exists('get_field')) {
                    // Try new field name first, fallback to old for backwards compatibility
                    $author_raw = get_field('resource_author', $post->ID);
                    if (empty($author_raw)) {
                      $author_raw = get_field('resource_author_1', $post->ID);
                    }
                    if ($author_raw) {
                      // Strip HTML tags completely
                      $author_text = wp_strip_all_tags($author_raw);
                      // Get first line only
                      $author_lines = array_filter(array_map('trim', preg_split('/\r\n|\r|\n/', $author_text)));
                      if (!empty($author_lines)) {
                        $author = reset($author_lines);
                      }
                    }
                  }
                  if ($author) :
                  ?>
                    <p class="blog-related__author">
                      <?php echo esc_html($author); ?>
                    </p>
                  <?php endif; ?>
                  <h3 class="blog-related__title"><?php echo esc_html(get_the_title($post->ID)); ?></h3>
                </a>
              </div>
            </div>
          </div>
        <?php endforeach; ?>
        <?php wp_reset_postdata(); ?>
      </div>
    </div>
  </div>
</section>