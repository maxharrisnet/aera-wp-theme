<?php

/**
 * The template for displaying skill archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Aera_Technology
 */

get_header();

// Get hero content - try ACF first, then use defaults
$hero = function_exists('get_field') ? (array) get_field('skills_hero') : array();
$hero = wp_parse_args(
  $hero,
  array(
    'title'       => __('Aera Skills', 'aera'),
    'description' => __('Learn more about Aera Skills™', 'aera'),
  )
);
?>

<main id="primary" class="site-main site-main--skills">
  <?php
  // Prepare hero data
  $hero_args = array();

  if (!empty($hero['title'])) {
    $hero_args['hero_title'] = $hero['title'];
  } else {
    $hero_args['hero_title'] = __('Aera Skills', 'aera');
  }

  if (!empty($hero['description'])) {
    $hero_args['hero_text'] = $hero['description'];
  } else {
    $hero_args['hero_text'] = __('Learn more about Aera Skills™', 'aera');
  }

  $hero_args['hero_full_height'] = true;

  get_template_part('template-parts/components/hero', null, $hero_args);
  ?>

  <!-- Skills List Section -->
  <?php if (have_posts()) : ?>
    <section class="skills skills--archive">
      <div class="skills__container">
        <div class="skills__row">
          <?php
          while (have_posts()) :
            the_post();
            get_template_part('template-parts/content', 'skill-item');
          endwhile;
          ?>
        </div>
      </div>
    </section>
  <?php else : ?>
    <section class="skills skills--archive">
      <div class="skills__container">
        <p><?php esc_html_e('No skills found.', 'aera'); ?></p>
      </div>
    </section>
  <?php endif; ?>
</main>

<?php
get_footer();

