<?php

/**
 * Press release single post content partial
 *
 * @package Aera_Technology
 */

$post_id = get_the_ID();
$title = get_the_title($post_id);
$featured_image = get_the_post_thumbnail_url($post_id, 'large');
$resource_author = function_exists('get_field') ? get_field('resource_author', $post_id) : '';
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('press-release-article'); ?>>

  <!-- Header with Title and Metadata -->
  <header class="press-release-article__header">
    <h1 class="press-release-article__title"><?php echo esc_html($title); ?></h1>

    <?php if ($resource_author) : ?>
      <div class="press-release-article__meta">
        <span class="press-release-article__author"><?php echo esc_html($resource_author); ?></span>
        <span class="press-release-article__date"><?php echo esc_html(get_the_date('F j, Y')); ?></span>
      </div>
    <?php else : ?>
      <div class="press-release-article__meta">
        <span class="press-release-article__date"><?php echo esc_html(get_the_date('F j, Y')); ?></span>
      </div>
    <?php endif; ?>
  </header>

  <!-- Featured Image -->
  <?php if ($featured_image) : ?>
    <div class="press-release-article__featured-image">
      <img src="<?php echo esc_url($featured_image); ?>" alt="<?php echo esc_attr($title); ?>" />
    </div>
  <?php endif; ?>

  <!-- Main Content -->
  <div class="press-release-article__content">
    <?php
    the_content();
    wp_link_pages(
      array(
        'before' => '<div class="press-release-article__pages">' . esc_html__('Pages:', 'aera'),
        'after'  => '</div>',
      )
    );
    ?>
  </div>

  <!-- External Link CTA -->
  <?php
  $external_url = function_exists('get_field') ? get_field('resource_external_url', $post_id) : '';
  $cta_text = function_exists('get_field') ? get_field('resource_cta_text', $post_id) : 'Read';
  if (empty($cta_text)) {
    $cta_text = 'Read';
  }
  ?>
  <?php if ($external_url) : ?>
    <div class="press-release-article__cta">
      <a href="<?php echo esc_url($external_url); ?>" class="press-release-article__cta-button" target="_blank" rel="noopener noreferrer">
        <?php echo esc_html($cta_text); ?>
        <svg class="press-release-article__cta-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </a>
    </div>
  <?php endif; ?>

</article>