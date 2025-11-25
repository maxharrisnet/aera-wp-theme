<?php
/**
 * Template part for blog related sidebar (Other Resources links).
 *
 * @package Aera_Technology
 */

defined('ABSPATH') || exit;
?>

<div class="blog-related__sidebar">
  <h3><?php esc_html_e('Other Resources', 'aera'); ?></h3>
  <ul>
    <li>
      <a href="<?php echo esc_url(get_permalink(get_page_by_path('what-is-decision-intelligence')) ?: '#'); ?>">
        <?php esc_html_e('What is Decision Intelligence?', 'aera'); ?>
      </a>
    </li>
    <li>
      <a href="<?php echo esc_url(get_post_type_archive_link('news') ?: '#'); ?>">
        <?php esc_html_e('News', 'aera'); ?>
      </a>
    </li>
    <li>
      <a href="<?php echo esc_url(get_post_type_archive_link('press-release') ?: '#'); ?>">
        <?php esc_html_e('Press Releases', 'aera'); ?>
      </a>
    </li>
    <li>
      <a href="<?php echo esc_url(get_post_type_archive_link('video') ?: '#'); ?>">
        <?php esc_html_e('Videos', 'aera'); ?>
      </a>
    </li>
    <li>
      <a href="<?php echo esc_url(get_post_type_archive_link('whitepaper') ?: '#'); ?>">
        <?php esc_html_e('Whitepapers', 'aera'); ?>
      </a>
    </li>
    <li>
      <a href="<?php echo esc_url(get_post_type_archive_link('blog') ?: '#'); ?>">
        <?php esc_html_e('Blogs', 'aera'); ?>
      </a>
    </li>
    <li>
      <a href="<?php echo esc_url(get_post_type_archive_link('case-study') ?: '#'); ?>">
        <?php esc_html_e('Case Studies', 'aera'); ?>
      </a>
    </li>
    <li>
      <a href="<?php echo esc_url(get_post_type_archive_link('podcast') ?: '#'); ?>">
        <?php esc_html_e('Podcasts', 'aera'); ?>
      </a>
    </li>
  </ul>
</div>

