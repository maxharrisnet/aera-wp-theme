<?php

/**
 * Template part for blog related sidebar (Other Resources links).
 *
 * @package Aera_Technology
 */

defined('ABSPATH') || exit;

$resources_url = get_permalink(get_page_by_path('resources')) ?: home_url('/resources/');
?>

<div class="blog-related">
  <div class="blog-related__container">


    <h3><?php esc_html_e('Other Resources', 'aera'); ?></h3>
    <ul>
      <li>
        <a href="<?php echo esc_url(get_permalink(get_page_by_path('e')) ?: '#'); ?>">
          <?php esc_html_e('What is Decision Intelligence?', 'aera'); ?>
        </a>
      </li>
      <li>
        <a href="<?php echo esc_url(add_query_arg('category', 'news', $resources_url)); ?>">
          <?php esc_html_e('News', 'aera'); ?>
        </a>
      </li>
      <li>
        <a href="<?php echo esc_url(add_query_arg('category', 'press-release', $resources_url)); ?>">
          <?php esc_html_e('Press Releases', 'aera'); ?>
        </a>
      </li>
      <li>
        <a href="<?php echo esc_url(add_query_arg('category', 'video', $resources_url)); ?>">
          <?php esc_html_e('Videos', 'aera'); ?>
        </a>
      </li>
      <li>
        <a href="<?php echo esc_url(add_query_arg('category', 'whitepaper', $resources_url)); ?>">
          <?php esc_html_e('Whitepapers', 'aera'); ?>
        </a>
      </li>
      <li>
        <a href="<?php echo esc_url(add_query_arg('category', 'blog', $resources_url)); ?>">
          <?php esc_html_e('Blogs', 'aera'); ?>
        </a>
      </li>
      <li>
        <a href="<?php echo esc_url(add_query_arg('category', 'case-study', $resources_url)); ?>">
          <?php esc_html_e('Case Studies', 'aera'); ?>
        </a>
      </li>
      <li>
        <a href="<?php echo esc_url(add_query_arg('category', 'podcast', $resources_url)); ?>">
          <?php esc_html_e('Podcasts', 'aera'); ?>
        </a>
      </li>
      <li>
        <a href="<?php echo esc_url(add_query_arg('category', 'report', $resources_url)); ?>">
          <?php esc_html_e('Reports', 'aera'); ?>
        </a>
      </li>
    </ul>
  </div>
</div>