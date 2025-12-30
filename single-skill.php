<?php

/**
 * The template for displaying single skill posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Aera_Technology
 */

get_header();

while (have_posts()) :
  the_post();

  $skill_description = get_field('skill_description') ?: get_the_excerpt();
  $content_sections = get_field('content_sections'); // Dynamic content sections
  $how_aera_helps_items = get_field('how_aera_helps_items'); // Repeater for help items
  $related_skills = get_field('related_skills');
  $related_resources = get_field('related_resources');

  // Helper function to sanitize anchor IDs
  function generate_anchor_id($text)
  {
    return sanitize_title($text);
  }
?>

  <main id="primary" class="site-main site-main--skill-detail">

    <?php
    // Prepare hero data
    $hero_args = array(
      'hero_title' => get_the_title(),
      'hero_text' => $skill_description,
      'hero_full_height' => true,
      'hero_variation' => 'skillset'
    );

    get_template_part('template-parts/components/hero', null, $hero_args);
    ?>

    <!-- Tab Navigation -->
    <?php if ($content_sections && is_array($content_sections) && count($content_sections) > 0) : ?>
      <nav class="skill-tabs">
        <div class="skill-tabs__container">
          <ul class="skill-tabs__list">
            <?php foreach ($content_sections as $index => $section) :
              $anchor = !empty($section['anchor']) ? sanitize_title($section['anchor']) : generate_anchor_id($section['label']);
              $is_first = ($index === 0);
            ?>
              <li class="skill-tabs__item">
                <a href="#<?php echo esc_attr($anchor); ?>" class="skill-tabs__link<?php echo $is_first ? ' active' : ''; ?>">
                  <?php echo esc_html($section['label']); ?>
                </a>
              </li>
            <?php endforeach; ?>
          </ul>
        </div>
      </nav>
    <?php endif; ?>

    <!-- Main Content Section -->
    <?php if ($content_sections && is_array($content_sections) && count($content_sections) > 0) : ?>
      <div class="skill-detail">
        <div class="skill-detail__container">
          <div class="skill-detail__layout">

            <!-- Sidebar Navigation -->
            <aside class="skill-detail__sidebar">
              <h3 class="skill-detail__sidebar-title"><?php esc_html_e('On This Page', 'aera'); ?></h3>
              <ul class="skill-detail__sidebar-nav">
                <?php foreach ($content_sections as $index => $section) :
                  $anchor = !empty($section['anchor']) ? sanitize_title($section['anchor']) : generate_anchor_id($section['label']);
                  $is_first = ($index === 0);
                ?>
                  <li>
                    <a href="#<?php echo esc_attr($anchor); ?>" class="<?php echo $is_first ? 'active' : ''; ?>">
                      <?php echo esc_html($section['label']); ?>
                    </a>
                  </li>
                <?php endforeach; ?>
              </ul>
            </aside>

            <!-- Main Content with Sections -->
            <div class="skill-detail__main" id="skillMainContent">
              <?php foreach ($content_sections as $index => $section) :
                $anchor = !empty($section['anchor']) ? sanitize_title($section['anchor']) : generate_anchor_id($section['label']);
              ?>
                <section class="skill-detail__section" id="<?php echo esc_attr($anchor); ?>">
                  <h2 class="skill-detail__section-title"><?php echo esc_html($section['label']); ?></h2>
                  <div class="skill-detail__section-content">
                    <?php echo wp_kses_post($section['content']); ?>
                  </div>
                </section>
              <?php endforeach; ?>
            </div>

          </div>
        </div>
      </div>
    <?php else : ?>
      <!-- Fallback: Use the post content if no sections defined -->
      <div class="skill-detail">
        <div class="skill-detail__container">
          <div class="skill-detail__content">
            <?php the_content(); ?>
          </div>
        </div>
      </div>
    <?php endif; ?>

    <!-- How Aera Helps Section -->
    <?php if ($how_aera_helps_items && is_array($how_aera_helps_items)) : ?>
      <section class="how-aera-helps">
        <div class="how-aera-helps__container">
          <?php
          $how_aera_helps_title = get_field('how_aera_helps_title') ?: __('How Aera Helps', 'aera');
          ?>
          <h2 class="how-aera-helps__title"><?php echo esc_html($how_aera_helps_title); ?></h2>
          <div class="how-aera-helps__grid">
            <?php foreach ($how_aera_helps_items as $item) : ?>
              <div class="how-aera-helps__item">
                <?php if (!empty($item['icon'])) : ?>
                  <div class="how-aera-helps__icon">
                    <img src="<?php echo esc_url($item['icon']['url']); ?>" alt="<?php echo esc_attr($item['icon']['alt'] ?: $item['title']); ?>" />
                  </div>
                <?php endif; ?>
                <?php if (!empty($item['title'])) : ?>
                  <h3 class="how-aera-helps__item-title"><?php echo esc_html($item['title']); ?></h3>
                <?php endif; ?>
                <?php if (!empty($item['description'])) : ?>
                  <p class="how-aera-helps__item-text"><?php echo esc_html($item['description']); ?></p>
                <?php endif; ?>
              </div>
            <?php endforeach; ?>
          </div>
        </div>
      </section>
    <?php endif; ?>

    <!-- Explore Other Business Functions -->
    <?php if ($related_skills && is_array($related_skills)) : ?>
      <section class="explore-functions">
        <div class="explore-functions__container">
          <?php
          $related_skills_title = get_field('related_skills_title') ?: __('Explore Other Business Functions', 'aera');
          ?>
          <h2 class="explore-functions__title"><?php echo esc_html($related_skills_title); ?></h2>
          <div class="explore-functions__grid">
            <?php
            foreach ($related_skills as $related_skill) :
              if (is_object($related_skill) && isset($related_skill->ID)) :
                $post_id = $related_skill->ID;
                setup_postdata($related_skill);
            ?>
                <a href="<?php the_permalink($post_id); ?>" class="explore-functions__item">
                  <?php get_template_part('template-parts/content', 'skill-card'); ?>
                </a>
            <?php
                wp_reset_postdata();
              endif;
            endforeach;
            ?>
          </div>
        </div>
      </section>
    <?php endif; ?>

    <!-- Resources Section -->
    <?php if ($related_resources && is_array($related_resources)) : ?>
      <section class="skills-home__resources-section">
        <div class="skills-home__container">
          <?php
          $resources_title = get_field('resources_title') ?: __('Resources', 'aera');
          ?>
          <h2 class="skills-home__resources-title"><?php echo esc_html($resources_title); ?></h2>
          <div class="skills-home__resources-grid">
            <?php
            foreach ($related_resources as $resource) :
              $title = $resource['title'] ?? '';
              $text = $resource['text'] ?? '';
              $link = $resource['link'] ?? '';
              $type = $resource['type'] ?? '';
              $image = $resource['image'] ?? '';

              if ($title && $link) :
            ?>
                <div class="resource-card">
                  <div class="resource-card__wrapper">
                    <a href="<?php echo esc_url($link); ?>" <?php echo strpos($link, home_url()) === false ? 'target="_blank" rel="noopener noreferrer"' : ''; ?>>
                      <?php if ($image) : ?>
                        <figure class="resource-card__figure">
                          <div class="resource-card__bgImage resource-card__imageBorder" style="background-image: url('<?php echo esc_url($image['url']); ?>');"></div>
                        </figure>
                      <?php endif; ?>

                      <div class="resource-card__content">
                        <?php if ($type) : ?>
                          <div class="resource-card__row">
                            <span class="resource-card__type"><?php echo esc_html($type); ?></span>
                          </div>
                        <?php endif; ?>

                        <h3 class="resource-card__title"><?php echo esc_html($title); ?></h3>

                        <?php if ($text) : ?>
                          <p class="resource-card__text"><?php echo esc_html($text); ?></p>
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
            endforeach;
            ?>
          </div>
        </div>
      </section>
    <?php endif; ?>

    <!-- See Aera in Action CTA -->
    <section class="skills-home__action-section">
      <div class="skills-home__container">
        <h2 class="skills-home__action-title"><?php esc_html_e('See Aera in Action', 'aera'); ?></h2>
        <div class="skills-home__action-buttons">
          <a href="<?php echo esc_url(home_url('/platform')); ?>" class="skills-home__action-button">
            <?php esc_html_e('Learn About the Platform', 'aera'); ?>
          </a>
          <a href="<?php echo esc_url(home_url('/demo')); ?>" class="skills-home__action-button">
            <?php esc_html_e('Schedule Demo', 'aera'); ?>
          </a>
        </div>
      </div>
    </section>

  </main>


<?php endwhile; ?>

<?php
get_footer();
