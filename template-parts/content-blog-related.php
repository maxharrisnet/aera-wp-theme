<?php
/**
 * Template part for related blog posts.
 *
 * @package Aera_Technology
 */

defined('ABSPATH') || exit;

// Get related posts (exclude current post)
$related_posts = get_posts(
  array(
    'post_type'      => 'blog',
    'posts_per_page' => 5,
    'post__not_in'   => array(get_the_ID()),
    'orderby'        => 'date',
    'order'          => 'DESC',
  )
);

if (empty($related_posts)) {
  return;
}
?>

<section class="blog-related">
  <div class="blog-related__container">
    <h3><?php esc_html_e('Recent Articles', 'aera'); ?></h3>
    <div class="blog-related__list">
      <div class="blog-related__col">
        <?php foreach ($related_posts as $post) : setup_postdata($post); ?>
          <div class="blog-related__item">
            <div class="blog-related__itemRow">
              <div class="blog-related__itemWrapper">
                <a href="<?php echo esc_url(get_permalink($post->ID)); ?>">
                  <?php
                  $thumbnail = get_the_post_thumbnail($post->ID, 'medium');
                  if ($thumbnail) :
                    echo $thumbnail; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                  endif;
                  ?>
                  <?php
                  $author = function_exists('get_field') ? get_field('resource_author_1', $post->ID) : '';
                  if ($author) :
                    $author_paragraphs = array_values(array_filter(array_map('trim', preg_split('/\r\n|\r|\n/', $author ?? ''))));
                    if (! empty($author_paragraphs)) :
                      ?>
                      <p class="blog-related__author">
                        <?php echo esc_html($author_paragraphs[0]); ?>
                      </p>
                    <?php endif; ?>
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

