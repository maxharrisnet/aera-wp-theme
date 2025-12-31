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
        <div class="skills-home__grid">
          <?php
          // Get all skill functions (skill-category taxonomy)
          $functions = get_terms(array(
            'taxonomy' => 'skill_function',
            'hide_empty' => true,
            'orderby' => 'term_order',
            'order' => 'DESC',
          ));

          if (!empty($functions) && !is_wp_error($functions)) :
            foreach ($functions as $function) :
              // Get function image from ACF
              $function_image = function_exists('get_field') ? get_field('featured_image', 'skill_function_' . $function->term_id) : null;
              $function_url = get_term_link($function);
          ?>
              <div class="skill-card">
                <div class="skill-card__wrapper">
                  <a href="<?php echo esc_url($function_url); ?>">
                    <?php if ($function_image) : ?>
                      <figure class="skill-card__image-container">
                        <img src="<?php echo esc_url($function_image['url']); ?>" alt="<?php echo esc_attr($function_image['alt'] ?: $function->name); ?>" class="skill-card__image" />
                      </figure>
                    <?php endif; ?>

                    <div class="skill-card__stripe"></div>

                    <div class="skill-card__content">
                      <h3 class="skill-card__title"><?php echo esc_html($function->name); ?></h3>
                    </div>
                  </a>
                </div>
              </div>
          <?php
            endforeach;
          endif;
          ?>
        </div>

        <!-- View All Skills CTA -->
        <div class="skills-home__cta">
          <a href="<?php echo esc_url(get_post_type_archive_link('skill')); ?>" class="skills-home__cta-button">
            <?php esc_html_e('View All Skills', 'aera'); ?>
          </a>
        </div>
      </div>
    </section>

    <!-- Icon Section -->
    <?php
    $icon_section_title = get_field('icon_section_title');
    $icon_section_description = get_field('icon_section_description');

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
          <div class="skills-home__icon-grid">
            <?php for ($i = 1; $i <= 4; $i++) :
              $icon = get_field("icon_{$i}_icon");
              $title = get_field("icon_{$i}_title");
              $description = get_field("icon_{$i}_description");

              if ($title) :
            ?>
                <div class="skills-home__icon-item">
                  <?php if ($icon) : ?>
                    <div class="skills-home__icon-image">
                      <img src="<?php echo esc_url($icon['url']); ?>" alt="<?php echo esc_attr($icon['alt'] ?: $title); ?>" />
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
    <?php
    $resources_title = get_field('resources_section_title') ?: __('Resources', 'aera');

    // Check if any resources are configured
    $has_resources = false;
    for ($i = 1; $i <= 3; $i++) {
      $resource_type = get_field("resource_{$i}_type");
      if ($resource_type === 'post' && get_field("resource_{$i}_post")) {
        $has_resources = true;
        break;
      } elseif ($resource_type === 'page' && get_field("resource_{$i}_page")) {
        $has_resources = true;
        break;
      } elseif ($resource_type === 'external' && get_field("resource_{$i}_title") && get_field("resource_{$i}_url")) {
        $has_resources = true;
        break;
      }
    }

    if ($has_resources) :
    ?>
      <section class="skills-home__resources-section">
        <div class="skills-home__container">
          <h2 class="skills-home__resources-title"><?php echo esc_html($resources_title); ?></h2>
          <div class="skills-home__resources-grid">
            <?php
            // Loop through 3 individual resource fields
            for ($i = 1; $i <= 3; $i++) :
              $resource_type = get_field("resource_{$i}_type") ?: 'post';

              if ($resource_type === 'post') :
                $post_obj = get_field("resource_{$i}_post");
                if ($post_obj) :
                  $post_obj = is_array($post_obj) ? $post_obj[0] : $post_obj;
                  if (is_object($post_obj) && isset($post_obj->ID)) :
                    $post_id = $post_obj->ID;
                    $post_title = get_the_title($post_id);
                    $post_excerpt = get_the_excerpt($post_id);
                    $post_url = get_permalink($post_id);

                    // Check for custom image first, fall back to featured image
                    $custom_image = get_field("resource_{$i}_image");
                    if ($custom_image) {
                      $image_url = $custom_image['url'];
                    } else {
                      $thumbnail_id = get_post_thumbnail_id($post_id);
                      $image_url = $thumbnail_id ? wp_get_attachment_image_url($thumbnail_id, 'medium') : '';
                    }

                    get_template_part('template-parts/content', 'related-card', array(
                      'title' => $post_title,
                      'description' => $post_excerpt,
                      'url' => $post_url,
                      'image_url' => $image_url,
                      'external' => false,
                    ));
                  endif;
                endif;

              elseif ($resource_type === 'page') :
                $page_obj = get_field("resource_{$i}_page");
                if ($page_obj) :
                  $page_obj = is_array($page_obj) ? $page_obj[0] : $page_obj;
                  if (is_object($page_obj) && isset($page_obj->ID)) :
                    $post_id = $page_obj->ID;
                    $post_title = get_the_title($post_id);
                    $post_excerpt = has_excerpt($post_id) ? get_the_excerpt($post_id) : wp_trim_words(get_the_content(null, false, $page_obj), 20);
                    $post_url = get_permalink($post_id);

                    // Check for custom image first, fall back to featured image
                    $custom_image = get_field("resource_{$i}_image");
                    if ($custom_image) {
                      $image_url = $custom_image['url'];
                    } else {
                      $thumbnail_id = get_post_thumbnail_id($post_id);
                      $image_url = $thumbnail_id ? wp_get_attachment_image_url($thumbnail_id, 'medium') : '';
                    }

                    get_template_part('template-parts/content', 'related-card', array(
                      'title' => $post_title,
                      'description' => $post_excerpt,
                      'url' => $post_url,
                      'image_url' => $image_url,
                      'external' => false,
                    ));
                  endif;
                endif;

              elseif ($resource_type === 'external') :
                $title = get_field("resource_{$i}_title");
                $description = get_field("resource_{$i}_description");
                $url = get_field("resource_{$i}_url");
                $image = get_field("resource_{$i}_image");

                if ($title && $url) :
                  $image_url = $image ? $image['url'] : '';

                  get_template_part('template-parts/content', 'related-card', array(
                    'title' => $title,
                    'description' => $description,
                    'url' => $url,
                    'image_url' => $image_url,
                    'external' => true,
                  ));
                endif;
              endif;
            endfor;
            ?>
          </div>
        </div>
      </section>
    <?php endif; ?>

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
