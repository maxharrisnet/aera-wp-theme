<?php

/**
 * Template part for recent news items (News CPT).
 * Used on single press release to show 5 most recent news items as linked titles.
 *
 * @package Aera_Technology
 */

defined('ABSPATH') || exit;

$recent_news = get_posts(
  array(
    'post_type'      => 'news',
    'posts_per_page' => 5,
    'orderby'        => 'date',
    'order'          => 'DESC',
  )
);

if (empty($recent_news)) {
  return;
}
?>

<section class="news-recent">
  <div class="news-recent__container">
    <h3><?php esc_html_e('Recent News', 'aera'); ?></h3>
    <div class="news-recent__list">
      <div class="news-recent__col">
        <?php foreach ($recent_news as $post) : setup_postdata($post);
          $external_url = function_exists('get_field') ? get_field('resource_external_url', $post->ID) : '';
          $link = !empty($external_url) ? $external_url : get_permalink($post->ID);
          $is_external = !empty($external_url);
        ?>
          <div class="news-recent__item">
            <div class="news-recent__itemRow">
              <p class="news-recent__title">
                <a href="<?php echo esc_url($link); ?>"<?php echo $is_external ? ' target="_blank" rel="noopener noreferrer"' : ''; ?>>
                  <?php echo esc_html(get_the_title($post->ID)); ?>
                </a>
              </p>
            </div>
          </div>
        <?php endforeach; ?>
        <?php wp_reset_postdata(); ?>
      </div>
    </div>
  </div>
</section>
