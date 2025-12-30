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
  $skill_videos = get_field('skill_videos'); // Repeater field for video cards
  $how_aera_helps_items = get_field('how_aera_helps_items'); // Repeater for help items
  $related_skills = get_field('related_skills');
  $related_resources = get_field('related_resources');
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
    <nav class="skill-tabs">
      <div class="skill-tabs__container">
        <ul class="skill-tabs__list">
          <li class="skill-tabs__item">
            <a href="#overview" class="skill-tabs__link active"><?php esc_html_e('Overview', 'aera'); ?></a>
          </li>
          <li class="skill-tabs__item">
            <a href="#skills" class="skill-tabs__link"><?php esc_html_e('Skills', 'aera'); ?></a>
          </li>
          <li class="skill-tabs__item">
            <a href="#use-cases" class="skill-tabs__link"><?php esc_html_e('Use Cases', 'aera'); ?></a>
          </li>
          <li class="skill-tabs__item">
            <a href="#product-demo" class="skill-tabs__link"><?php esc_html_e('Product Demo', 'aera'); ?></a>
          </li>
          <li class="skill-tabs__item">
            <a href="#analyst-coverage" class="skill-tabs__link"><?php esc_html_e('Analyst Coverage', 'aera'); ?></a>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Main Content Section -->
    <section class="skill-detail" id="overview">
      <div class="skill-detail__container">
        <div class="skill-detail__layout">

          <!-- Sidebar Navigation -->
          <aside class="skill-detail__sidebar">
            <h3 class="skill-detail__sidebar-title"><?php esc_html_e('Content', 'aera'); ?></h3>
            <ul class="skill-detail__sidebar-nav">
              <?php if ($skill_videos && is_array($skill_videos)) : ?>
                <?php foreach ($skill_videos as $index => $video) : ?>
                  <li>
                    <a href="#video-<?php echo esc_attr($index); ?>" class="<?php echo $index === 0 ? 'active' : ''; ?>">
                      <?php echo esc_html($video['video_title'] ?: sprintf(__('Video %d', 'aera'), $index + 1)); ?>
                    </a>
                  </li>
                <?php endforeach; ?>
              <?php endif; ?>
            </ul>
          </aside>

          <!-- Main Content -->
          <div class="skill-detail__main">

            <!-- Video Cards -->
            <?php if ($skill_videos && is_array($skill_videos)) : ?>
              <?php foreach ($skill_videos as $index => $video) : ?>
                <article class="video-card" id="video-<?php echo esc_attr($index); ?>">
                  <?php if (!empty($video['video_thumbnail'])) : ?>
                    <div class="video-card__thumbnail" style="background-image: url('<?php echo esc_url($video['video_thumbnail']['url']); ?>');">
                      <div class="video-card__play-button"></div>
                    </div>
                  <?php endif; ?>

                  <div class="video-card__content">
                    <?php if (!empty($video['video_title'])) : ?>
                      <h2 class="video-card__title"><?php echo esc_html($video['video_title']); ?></h2>
                    <?php endif; ?>

                    <?php if (!empty($video['video_description'])) : ?>
                      <p class="video-card__description"><?php echo esc_html($video['video_description']); ?></p>
                    <?php endif; ?>

                    <?php
                    $has_details = !empty($video['overview']) || !empty($video['capabilities']) || !empty($video['use_cases']);

                    if ($has_details) :
                    ?>
                      <button class="video-card__toggle" data-target="details-<?php echo esc_attr($index); ?>">
                        <?php esc_html_e('View Details', 'aera'); ?>
                      </button>

                      <div class="video-card__expandable" id="details-<?php echo esc_attr($index); ?>">
                        <div class="video-card__details">
                          <div class="video-card__details-grid">
                            <?php if (!empty($video['overview'])) : ?>
                              <div class="video-card__detail-item">
                                <h4><?php esc_html_e('Overview', 'aera'); ?></h4>
                                <p><?php echo esc_html($video['overview']); ?></p>
                              </div>
                            <?php endif; ?>

                            <?php if (!empty($video['capabilities'])) : ?>
                              <div class="video-card__detail-item">
                                <h4><?php esc_html_e('Capabilities', 'aera'); ?></h4>
                                <p><?php echo esc_html($video['capabilities']); ?></p>
                              </div>
                            <?php endif; ?>

                            <?php if (!empty($video['use_cases'])) : ?>
                              <div class="video-card__detail-item">
                                <h4><?php esc_html_e('Use Cases', 'aera'); ?></h4>
                                <?php if (is_array($video['use_cases'])) : ?>
                                  <ul>
                                    <?php foreach ($video['use_cases'] as $use_case) : ?>
                                      <li><?php echo esc_html($use_case['text']); ?></li>
                                    <?php endforeach; ?>
                                  </ul>
                                <?php else : ?>
                                  <p><?php echo esc_html($video['use_cases']); ?></p>
                                <?php endif; ?>
                              </div>
                            <?php endif; ?>
                          </div>
                        </div>
                      </div>
                    <?php endif; ?>
                  </div>
                </article>
              <?php endforeach; ?>
            <?php else : ?>
              <!-- Fallback: Use the post content -->
              <div class="skill-detail__content">
                <?php the_content(); ?>
              </div>
            <?php endif; ?>

          </div>

        </div>
      </div>
    </section>

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

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      // Video card expand/collapse
      const toggleButtons = document.querySelectorAll('.video-card__toggle');

      toggleButtons.forEach(function(button) {
        button.addEventListener('click', function() {
          const targetId = this.getAttribute('data-target');
          const expandable = document.getElementById(targetId);

          if (expandable) {
            this.classList.toggle('active');
            expandable.classList.toggle('active');
          }
        });
      });

      // Tab navigation
      const tabLinks = document.querySelectorAll('.skill-tabs__link');

      tabLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
          e.preventDefault();

          // Remove active class from all tabs
          tabLinks.forEach(function(l) {
            l.classList.remove('active');
          });

          // Add active class to clicked tab
          this.classList.add('active');

          // Scroll to section (optional)
          const targetId = this.getAttribute('href');
          const targetSection = document.querySelector(targetId);
          if (targetSection) {
            targetSection.scrollIntoView({
              behavior: 'smooth'
            });
          }
        });
      });

      // Sidebar navigation
      const sidebarLinks = document.querySelectorAll('.skill-detail__sidebar-nav a');

      sidebarLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
          e.preventDefault();

          // Remove active class from all links
          sidebarLinks.forEach(function(l) {
            l.classList.remove('active');
          });

          // Add active class to clicked link
          this.classList.add('active');

          // Scroll to video card
          const targetId = this.getAttribute('href');
          const targetCard = document.querySelector(targetId);
          if (targetCard) {
            targetCard.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });
    });
  </script>

<?php endwhile; ?>

<?php
get_footer();
