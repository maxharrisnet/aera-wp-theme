<?php

/**
 * Template Name: Skills Home
 * Description: Landing page for Aera Skills with featured skills grid
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Aera_Technology
 */

get_header();
?>

<main id="primary" class="site-main site-main--skills-home">
  <?php
  while (have_posts()) :
    the_post();

    // Get ACF hero fields if they exist
    $hero_title = get_field('hero_title') ?: __('Aera Skills™', 'aera');
    $hero_text = get_field('hero_text') ?: __('Powered by the Aera Decision Cloud™, Aera Skills provide real-time insights, recommendations, and predictions. Aera Skills deliver prepackaged content, logic, and interactions that augment and automate business decisions.', 'aera');

    // Prepare hero data
    $hero_args = array(
      'hero_title' => $hero_title,
      'hero_text' => $hero_text,
      'hero_full_height' => true,
    );

    get_template_part('template-parts/components/hero', null, $hero_args);
  ?>

    <!-- Functions Grid Section -->
    <section class="skills-home">
      <div class="skills-home__container">

        <!-- Functions Grid (taxonomy terms in 3-column layout) -->
        <?php
        // Get all skill functions (skill_function taxonomy)
        $functions = get_terms(array(
          'taxonomy' => 'skill_function',
          'hide_empty' => true,
          'orderby' => 'term_order',
          'order' => 'DESC',
        ));

        get_template_part('template-parts/components/skill-functions-grid', null, array(
          'functions' => $functions,
          'grid_class' => 'skills-home__grid',
          'card_class' => 'skill-card',
        ));
        ?>

        <!-- View All Skills CTA -->
        <div class="skills-home__cta">
          <a href="<?php echo esc_url(get_post_type_archive_link('skill')); ?>" class="button button--outline">
            <?php esc_html_e('View All Skills', 'aera'); ?>
          </a>
        </div>
      </div>
    </section>

    <!-- Icon Section -->
    <?php
    $icon_section_title = get_field('icon_section_title');
    $icon_section_description = get_field('icon_section_description');
    $icon_section_subheading = get_field('icon_section_subheading');

    // Check if any icons are configured
    $has_icons = false;
    for ($i = 1; $i <= 4; $i++) {
      if (get_field("icon_{$i}_title")) {
        $has_icons = true;
        break;
      }
    }

    if ($icon_section_title || $has_icons) :
    ?>
      <section class="skills-home__icon-section">
        <div class="skills-home__container">
          <?php if ($icon_section_title) : ?>
            <h2 class="skills-home__icon-title"><?php echo esc_html($icon_section_title); ?></h2>
          <?php endif; ?>
          <?php if ($icon_section_description) : ?>
            <p class="skills-home__icon-description"><?php echo esc_html($icon_section_description); ?></p>
          <?php endif; ?>
          <?php if ($icon_section_subheading) : ?>
            <h3 class="skills-home__icon-subheading"><?php echo esc_html($icon_section_subheading); ?></h3>
          <?php endif; ?>
          <div class="skills-home__icon-grid">
            <?php for ($i = 1; $i <= 4; $i++) :
              $icon = get_field("icon_{$i}_icon");
              $title = get_field("icon_{$i}_title");
              $description = get_field("icon_{$i}_description");

              // Handle both image array (old) and URL string (new select field)
              $icon_url = '';
              $icon_alt = $title;
              if ($icon) {
                if (is_array($icon)) {
                  $icon_url = $icon['url'];
                  $icon_alt = $icon['alt'] ?: $title;
                } else {
                  $icon_url = $icon;
                }
              }

              if ($title) :
            ?>
                <div class="skills-home__icon-item">
                  <?php if ($icon_url) : ?>
                    <div class="skills-home__icon-image">
                      <img src="<?php echo esc_url($icon_url); ?>" alt="<?php echo esc_attr($icon_alt); ?>" />
                    </div>
                  <?php endif; ?>
                  <h3 class="skills-home__icon-item-title"><?php echo esc_html($title); ?></h3>
                  <?php if ($description) : ?>
                    <p class="skills-home__icon-item-text"><?php echo esc_html($description); ?></p>
                  <?php endif; ?>
                </div>
            <?php
              endif;
            endfor;
            ?>
          </div>
        </div>
      </section>
    <?php endif; ?>

    <!-- Resources Section -->
    <?php get_template_part('template-parts/components/resources-section'); ?>

    <!-- CTA Section -->
    <?php
    $cta_title = get_field('action_section_title') ?: __('See Aera in action.', 'aera');
    $cta_text = get_field('action_button_2_text') ?: __('Schedule Demo', 'aera');
    $cta_link = get_field('action_button_2_url') ?: home_url('/demo');

    get_template_part('template-parts/components/cta', null, array(
      'cta' => array(
        'title' => $cta_title,
        'text' => $cta_text,
        'link' => $cta_link,
      ),
    ));
    ?>

  <?php endwhile; ?>
</main>

<?php
get_footer();
