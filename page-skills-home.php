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

    <!-- Skills Grid Section -->
    <section class="skills-home">
      <div class="skills-home__container">

        <!-- Featured Skills Grid (Top 2 large cards) -->
        <div class="skills-home__featured-grid">
          <?php
          // Query for featured skills
          $featured_skills_args = array(
            'post_type' => 'skill',
            'posts_per_page' => 2,
            'orderby' => 'menu_order',
            'order' => 'ASC',
            'meta_query' => array(
              array(
                'key' => 'featured_skill',
                'compare' => 'EXISTS',
              ),
            ),
          );

          $featured_skills = new WP_Query($featured_skills_args);
          $featured_skill_ids = array();

          if ($featured_skills->have_posts()) :
            while ($featured_skills->have_posts()) :
              $featured_skills->the_post();
              $featured_skill_ids[] = get_the_ID(); // Store IDs to exclude later
              get_template_part('template-parts/content', 'skill-card', array('featured' => true));
            endwhile;
            wp_reset_postdata();
          else :
            // Fallback: show first 2 skills if no featured skills
            $fallback_args = array(
              'post_type' => 'skill',
              'posts_per_page' => 2,
              'orderby' => 'menu_order',
              'order' => 'ASC',
            );

            $fallback_query = new WP_Query($fallback_args);

            if ($fallback_query->have_posts()) :
              while ($fallback_query->have_posts()) :
                $fallback_query->the_post();
                $featured_skill_ids[] = get_the_ID(); // Store IDs to exclude later
                get_template_part('template-parts/content', 'skill-card', array('featured' => true));
              endwhile;
              wp_reset_postdata();
            endif;
          endif;
          ?>
        </div>

        <!-- Regular Skills Grid (Next 8 cards, excluding featured) -->
        <div class="skills-home__regular-grid">
          <?php
          // Query for regular skills, excluding the featured ones
          $regular_skills_args = array(
            'post_type' => 'skill',
            'posts_per_page' => 8,
            'orderby' => 'menu_order',
            'order' => 'ASC',
            'post__not_in' => $featured_skill_ids, // Exclude featured skills
          );

          $regular_skills = new WP_Query($regular_skills_args);

          if ($regular_skills->have_posts()) :
            while ($regular_skills->have_posts()) :
              $regular_skills->the_post();
              get_template_part('template-parts/content', 'skill-card');
            endwhile;
            wp_reset_postdata();
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
                    $the_post = $post_obj;
                    $post_id = $the_post->ID;
                    $post_title = get_the_title($post_id);
                    $post_excerpt = get_the_excerpt($post_id);
                    $post_url = get_permalink($post_id);
                    $post_type = get_post_type_object(get_post_type($post_id));
                    $type_label = $post_type ? $post_type->labels->singular_name : __('Resource', 'aera');
                    $thumbnail_id = get_post_thumbnail_id($post_id);
                    $image_url = $thumbnail_id ? wp_get_attachment_image_url($thumbnail_id, 'medium') : '';
            ?>
                    <div class="resource-card">
                      <div class="resource-card__wrapper">
                        <a href="<?php echo esc_url($post_url); ?>">
                          <?php if ($image_url) : ?>
                            <figure class="resource-card__figure">
                              <div class="resource-card__bgImage resource-card__imageBorder" style="background-image: url('<?php echo esc_url($image_url); ?>');"></div>
                            </figure>
                          <?php endif; ?>

                          <div class="resource-card__content">
                            <div class="resource-card__row">
                              <span class="resource-card__type"><?php echo esc_html($type_label); ?></span>
                            </div>

                            <h3 class="resource-card__title"><?php echo esc_html($post_title); ?></h3>

                            <?php if ($post_excerpt) : ?>
                              <p class="resource-card__text"><?php echo esc_html($post_excerpt); ?></p>
                            <?php endif; ?>

                            <div class="resource-card__lastRow">
                              <div class="resource-card__row">
                                <span class="resource-card__link">
                                  <?php esc_html_e('View Resource', 'aera'); ?>
                                </span>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  <?php
                  endif;
                endif;

              elseif ($resource_type === 'page') :
                $page_obj = get_field("resource_{$i}_page");
                if ($page_obj) :
                  $page_obj = is_array($page_obj) ? $page_obj[0] : $page_obj;
                  if (is_object($page_obj) && isset($page_obj->ID)) :
                    $the_post = $page_obj;
                    $post_id = $the_post->ID;
                    $post_title = get_the_title($post_id);
                    $post_excerpt = has_excerpt($post_id) ? get_the_excerpt($post_id) : wp_trim_words(get_the_content(null, false, $the_post), 20);
                    $post_url = get_permalink($post_id);
                    $thumbnail_id = get_post_thumbnail_id($post_id);
                    $image_url = $thumbnail_id ? wp_get_attachment_image_url($thumbnail_id, 'medium') : '';
                  ?>
                    <div class="resource-card">
                      <div class="resource-card__wrapper">
                        <a href="<?php echo esc_url($post_url); ?>">
                          <?php if ($image_url) : ?>
                            <figure class="resource-card__figure">
                              <div class="resource-card__bgImage resource-card__imageBorder" style="background-image: url('<?php echo esc_url($image_url); ?>');"></div>
                            </figure>
                          <?php endif; ?>

                          <div class="resource-card__content">
                            <div class="resource-card__row">
                              <span class="resource-card__type"><?php esc_html_e('Page', 'aera'); ?></span>
                            </div>

                            <h3 class="resource-card__title"><?php echo esc_html($post_title); ?></h3>

                            <?php if ($post_excerpt) : ?>
                              <p class="resource-card__text"><?php echo esc_html($post_excerpt); ?></p>
                            <?php endif; ?>

                            <div class="resource-card__lastRow">
                              <div class="resource-card__row">
                                <span class="resource-card__link">
                                  <?php esc_html_e('Learn More', 'aera'); ?>
                                </span>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  <?php
                  endif;
                endif;

              elseif ($resource_type === 'external') :
                $title = get_field("resource_{$i}_title");
                $description = get_field("resource_{$i}_description");
                $url = get_field("resource_{$i}_url");
                $image = get_field("resource_{$i}_image");
                $type_label = get_field("resource_{$i}_type_label") ?: __('Resource', 'aera');

                if ($title && $url) :
                  ?>
                  <div class="resource-card">
                    <div class="resource-card__wrapper">
                      <a href="<?php echo esc_url($url); ?>" target="_blank" rel="noopener noreferrer">
                        <?php if ($image) : ?>
                          <figure class="resource-card__figure">
                            <div class="resource-card__bgImage resource-card__imageBorder" style="background-image: url('<?php echo esc_url($image['url']); ?>');"></div>
                          </figure>
                        <?php endif; ?>

                        <div class="resource-card__content">
                          <div class="resource-card__row">
                            <span class="resource-card__type"><?php echo esc_html($type_label); ?></span>
                          </div>

                          <h3 class="resource-card__title"><?php echo esc_html($title); ?></h3>

                          <?php if ($description) : ?>
                            <p class="resource-card__text"><?php echo esc_html($description); ?></p>
                          <?php endif; ?>

                          <div class="resource-card__lastRow">
                            <div class="resource-card__row">
                              <span class="resource-card__link">
                                <?php esc_html_e('View Resource', 'aera'); ?>
                              </span>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
            <?php
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
