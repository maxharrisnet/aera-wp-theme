<?php

/**
 * The template for displaying skill function (taxonomy) archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Aera_Technology
 */

get_header();

// Get current taxonomy term (Function)
$current_function = get_queried_object();

// Get hero content from taxonomy term or fallback
$hero_title = $current_function->name;
$hero_description = $current_function->description ?: sprintf(
  /* translators: %s: function name */
  __('Explore %s skills powered by the Aera Decision Cloud™.', 'aera'),
  $current_function->name
);

// Get all categories that belong to this function
$all_categories = get_terms(array(
  'taxonomy' => 'skill_category',
  'hide_empty' => true,
  'orderby' => 'term_order',
  'order' => 'ASC',
));

// Filter categories to only those linked to this function via ACF
$function_categories = array();
if (!empty($all_categories) && !is_wp_error($all_categories)) {
  foreach ($all_categories as $category) {
    $parent_function_id = function_exists('get_field') ? get_field('parent_function', 'skill_category_' . $category->term_id) : null;
    if ($parent_function_id == $current_function->term_id) {
      $function_categories[] = $category;
    }
  }
}
?>

<main id="primary" class="site-main site-main--skills-function">
  <?php
  // Prepare hero data
  $hero_args = array(
    'hero_title' => $hero_title,
    'hero_text' => $hero_description,
    'hero_full_height' => true,
    'hero_variation' => 'skillset'
  );

  get_template_part('template-parts/components/hero', null, $hero_args);
  ?>

  <!-- Skills Function Content Section -->
  <section class="skills-function">
    <div class="skills-function__container">

      <?php if (!empty($function_categories)) : ?>
        <!-- Category Tab Navigation -->
        <nav class="skills-function__tabs" role="tablist">
          <?php foreach ($function_categories as $index => $category) : ?>
            <button
              class="skills-function__tab <?php echo $index === 0 ? 'active' : ''; ?>"
              role="tab"
              aria-selected="<?php echo $index === 0 ? 'true' : 'false'; ?>"
              aria-controls="category-<?php echo esc_attr($category->slug); ?>"
              id="tab-<?php echo esc_attr($category->slug); ?>"
              data-category="<?php echo esc_attr($category->slug); ?>">
              <?php echo esc_html($category->name); ?>
            </button>
          <?php endforeach; ?>
        </nav>

        <div class="skills-function__content-wrapper">
          <?php foreach ($function_categories as $index => $category) :
            // Get all skills in this category
            $skills_in_category = get_posts(array(
              'post_type' => 'skill',
              'posts_per_page' => -1,
              'tax_query' => array(
                array(
                  'taxonomy' => 'skill_category',
                  'field' => 'term_id',
                  'terms' => $category->term_id,
                ),
              ),
              'orderby' => 'menu_order',
              'order' => 'ASC',
            ));

            if (empty($skills_in_category)) continue;
          ?>
            <!-- Category Content Panel -->
            <div
              class="skills-function__panel <?php echo $index === 0 ? 'active' : ''; ?>"
              role="tabpanel"
              id="category-<?php echo esc_attr($category->slug); ?>"
              aria-labelledby="tab-<?php echo esc_attr($category->slug); ?>">

              <div class="skills-function__panel-inner">

                <!-- Sidebar Navigation for Skills -->
                <aside class="skills-function__sidebar">
                  <div class="skills-function__sidebar-sticky">
                    <h3 class="skills-function__sidebar-title"><?php echo esc_html($category->name); ?></h3>
                    <nav class="skills-function__sidebar-nav">
                      <?php foreach ($skills_in_category as $skill_index => $skill) : ?>
                        <a
                          href="#skill-<?php echo esc_attr($skill->post_name); ?>"
                          class="skills-function__sidebar-link <?php echo $skill_index === 0 ? 'active' : ''; ?>"
                          data-skill="<?php echo esc_attr($skill->post_name); ?>">
                          <?php echo esc_html($skill->post_title); ?>
                        </a>
                      <?php endforeach; ?>
                    </nav>
                  </div>
                </aside>

                <!-- Main Content: All Skills Stacked -->
                <div class="skills-function__main">
                  <?php foreach ($skills_in_category as $skill) :
                    // Get skill data
                    $skill_description = function_exists('get_field') ? get_field('skill_description', $skill->ID) : '';
                    $skill_icon = function_exists('get_field') ? get_field('skill_icon', $skill->ID) : null;
                  ?>
                    <article
                      id="skill-<?php echo esc_attr($skill->post_name); ?>"
                      class="skill-content">

                      <div class="skill-content__header">
                        <?php if ($skill_icon) :
                          // Handle both old (image array) and new (icon path string) formats
                          $icon_url = is_array($skill_icon) ? $skill_icon['url'] : $skill_icon;
                          if ($icon_url && !filter_var($icon_url, FILTER_VALIDATE_URL)) {
                            $icon_url = get_template_directory_uri() . '/' . ltrim($icon_url, '/');
                          }
                          if ($icon_url) :
                        ?>
                          <div class="skill-content__icon">
                            <img src="<?php echo esc_url($icon_url); ?>" alt="<?php echo esc_attr($skill->post_title); ?>" />
                          </div>
                        <?php endif; endif; ?>

                        <h2 class="skill-content__title">
                          <?php echo esc_html($skill->post_title); ?>
                        </h2>
                      </div>

                      <?php if ($skill_description) : ?>
                        <div class="skill-content__description">
                          <?php echo wp_kses_post(wpautop($skill_description)); ?>
                        </div>
                      <?php endif; ?>

                      <?php if ($skill->post_content) : ?>
                        <div class="skill-content__body">
                          <?php echo apply_filters('the_content', $skill->post_content); ?>
                        </div>
                      <?php endif; ?>

                      <!-- Optional: Add custom sections if they exist -->
                      <?php
                      $content_sections = function_exists('get_field') ? get_field('content_sections', $skill->ID) : array();
                      if (!empty($content_sections)) :
                      ?>
                        <div class="skill-content__sections">
                          <?php foreach ($content_sections as $section) : ?>
                            <div class="skill-content__section">
                              <?php if (!empty($section['section_label'])) : ?>
                                <h3 class="skill-content__section-title"><?php echo esc_html($section['section_label']); ?></h3>
                              <?php endif; ?>
                              <?php if (!empty($section['section_content'])) : ?>
                                <div class="skill-content__section-content">
                                  <?php echo wp_kses_post(wpautop($section['section_content'])); ?>
                                </div>
                              <?php endif; ?>
                            </div>
                          <?php endforeach; ?>
                        </div>
                      <?php endif; ?>

                    </article>
                  <?php endforeach; ?>
                </div>

              </div>
            </div>
          <?php endforeach; ?>
        </div>

      <?php else : ?>
        <div class="skills-function__empty">
          <p><?php esc_html_e('No categories or skills found for this function.', 'aera'); ?></p>
        </div>
      <?php endif; ?>

    </div>
  </section>
</main>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabs = document.querySelectorAll('.skills-function__tab');
    const panels = document.querySelectorAll('.skills-function__panel');

    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        const categorySlug = this.getAttribute('data-category');

        // Update tabs
        tabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');

        // Update panels
        panels.forEach(p => p.classList.remove('active'));
        const targetPanel = document.getElementById('category-' + categorySlug);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }

        // Reset sidebar active states for new panel
        updateSidebarActiveState();
      });
    });

    // Smooth scroll for sidebar navigation
    const sidebarLinks = document.querySelectorAll('.skills-function__sidebar-link');
    sidebarLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          const offset = 100; // Adjust for fixed header
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Update active link
          sidebarLinks.forEach(l => l.classList.remove('active'));
          this.classList.add('active');
        }
      });
    });

    // Update sidebar active state on scroll
    function updateSidebarActiveState() {
      const activePanel = document.querySelector('.skills-function__panel.active');
      if (!activePanel) return;

      const skills = activePanel.querySelectorAll('.skill-content');
      const sidebarLinks = activePanel.querySelectorAll('.skills-function__sidebar-link');

      let currentSkillIndex = 0;
      const scrollPosition = window.scrollY + 150;

      skills.forEach(function(skill, index) {
        if (skill.offsetTop <= scrollPosition) {
          currentSkillIndex = index;
        }
      });

      sidebarLinks.forEach((link, index) => {
        if (index === currentSkillIndex) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }

    // Throttle scroll events for performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }
      scrollTimeout = window.requestAnimationFrame(function() {
        updateSidebarActiveState();
      });
    });

    // Initial check
    updateSidebarActiveState();
  });
</script>

<?php
get_footer();
