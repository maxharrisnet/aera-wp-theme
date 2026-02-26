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
                  // Get author from WordPress post author (consistent with content-blog-item)
                  $author = '';
                  $author_id = get_post_field('post_author', $post->ID);
                  if ($author_id) {
                    $author = get_the_author_meta('display_name', $author_id);
                    if (empty($author)) {
                      $author = get_the_author_meta('user_login', $author_id);
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