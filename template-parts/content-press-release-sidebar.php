<?php

/**
 * Press release sidebar with related resources partial
 *
 * @package Aera_Technology
 */

?>

<aside class="press-release-sidebar">
  <h3 class="press-release-sidebar__title"><?php esc_html_e('Other Resources', 'aera'); ?></h3>

  <nav class="press-release-sidebar__nav">
    <ul class="press-release-sidebar__list">
      <li class="press-release-sidebar__item">
        <a href="<?php echo esc_url(home_url('/what-is-decision-intelligence/')); ?>" class="press-release-sidebar__link">
          <?php esc_html_e('What is Decision Intelligence?', 'aera'); ?>
        </a>
      </li>

      <li class="press-release-sidebar__item">
        <a href="<?php echo esc_url(home_url('/blog/')); ?>" class="press-release-sidebar__link">
          <?php esc_html_e('News', 'aera'); ?>
        </a>
      </li>

      <li class="press-release-sidebar__item">
        <a href="<?php echo esc_url(home_url('/press-releases/')); ?>" class="press-release-sidebar__link">
          <?php esc_html_e('Press Releases', 'aera'); ?>
        </a>
      </li>

      <li class="press-release-sidebar__item">
        <a href="<?php echo esc_url(home_url('/resources/?filter=video')); ?>" class="press-release-sidebar__link">
          <?php esc_html_e('Videos', 'aera'); ?>
        </a>
      </li>

      <li class="press-release-sidebar__item">
        <a href="<?php echo esc_url(home_url('/resources/?filter=whitepaper')); ?>" class="press-release-sidebar__link">
          <?php esc_html_e('Whitepapers', 'aera'); ?>
        </a>
      </li>

      <li class="press-release-sidebar__item">
        <a href="<?php echo esc_url(home_url('/blog/')); ?>" class="press-release-sidebar__link">
          <?php esc_html_e('Blog', 'aera'); ?>
        </a>
      </li>

      <li class="press-release-sidebar__item">
        <a href="<?php echo esc_url(home_url('/resources/?filter=case-study')); ?>" class="press-release-sidebar__link">
          <?php esc_html_e('Case Studies', 'aera'); ?>
        </a>
      </li>

      <li class="press-release-sidebar__item">
        <a href="<?php echo esc_url(home_url('/resources/?filter=podcast')); ?>" class="press-release-sidebar__link">
          <?php esc_html_e('Podcasts', 'aera'); ?>
        </a>
      </li>

      <li class="press-release-sidebar__item">
        <a href="<?php echo esc_url(home_url('/resources/?filter=webinar')); ?>" class="press-release-sidebar__link">
          <?php esc_html_e('Webinars', 'aera'); ?>
        </a>
      </li>
    </ul>
  </nav>
</aside>