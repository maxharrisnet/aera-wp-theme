<?php

/**
 * The template for displaying single press release posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Aera_Technology
 */

get_header();
?>

<main id="primary" class="site-main">
  <?php
  if ('press-release' === get_post_type()) :
    while (have_posts()) :
      the_post();
  ?>
      <div class="blog-article">
        <div>
          <div class="blog-article__row">
            <div class="blog-article__left">
              <?php get_template_part('template-parts/content', 'press-release'); ?>
            </div>
            <div class="blog-article__right">
              <?php
              // Social sharing section
              get_template_part('template-parts/content', 'press-release-share');
              ?>

              <?php
              // Sidebar with related resources
              get_template_part('template-parts/content', 'press-release-sidebar');
              ?>
            </div>
          </div>
        </div>
      </div>
  <?php
    endwhile;
  else :
    while (have_posts()) :
      the_post();
      get_template_part('template-parts/content', get_post_type());
    endwhile;
    get_sidebar();
  endif;
  ?>
</main>

<?php
get_footer();
