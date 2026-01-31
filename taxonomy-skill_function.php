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

// Get category parameter from URL (for tab activation)
$active_category = isset($_GET['category']) ? sanitize_text_field($_GET['category']) : '';

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

// Get default HubSpot form ID for this function's videos
$default_hubspot_form_id = function_exists('get_field') ? get_field('hubspot_form_id', 'skill_function_' . $current_function->term_id) : '';
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
        <!-- Category Tab Navigation (only show if more than one category) -->
        <?php if (count($function_categories) > 1) : ?>
          <nav class="skills-function__tabs" role="tablist">
            <?php foreach ($function_categories as $index => $category) :
              // Check if this category matches the URL parameter or is the first category
              $is_active = (!empty($active_category) && $active_category === $category->slug) || (empty($active_category) && $index === 0);
            ?>
              <button
                class="skills-function__tab <?php echo $is_active ? 'active' : ''; ?>"
                role="tab"
                aria-selected="<?php echo $is_active ? 'true' : 'false'; ?>"
                aria-controls="category-<?php echo esc_attr($category->slug); ?>"
                id="tab-<?php echo esc_attr($category->slug); ?>"
                data-category="<?php echo esc_attr($category->slug); ?>">
                <?php echo esc_html($category->name); ?>
              </button>
            <?php endforeach; ?>
          </nav>
        <?php endif; ?>

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

            // Check if this category should be active based on URL parameter or default to first
            $is_panel_active = (!empty($active_category) && $active_category === $category->slug) || (empty($active_category) && $index === 0);
          ?>
            <!-- Category Content Panel -->
            <div
              class="skills-function__panel <?php echo $is_panel_active ? 'active' : ''; ?>"
              role="tabpanel"
              id="category-<?php echo esc_attr($category->slug); ?>"
              aria-labelledby="tab-<?php echo esc_attr($category->slug); ?>">

              <div class="skills-function__panel-inner <?php echo count($skills_in_category) <= 1 ? 'skills-function__panel-inner--no-sidebar' : ''; ?>">

                <!-- Sidebar Navigation for Skills (only show if more than one skill) -->
                <?php if (count($skills_in_category) > 1) : ?>
                  <aside class="skills-function__sidebar">
                    <div class="skills-function__sidebar-sticky">
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
                <?php endif; ?>

                <!-- Main Content: All Skills Stacked -->
                <div class="skills-function__main">
                  <?php foreach ($skills_in_category as $skill) :
                    // Get skill data
                    $skill_description = function_exists('get_field') ? get_field('skill_description', $skill->ID) : '';
                    $skill_icon = function_exists('get_field') ? get_field('skill_icon', $skill->ID) : null;

                    // Get video data
                    $video_thumbnail = function_exists('get_field') ? get_field('video_thumbnail', $skill->ID) : null;
                    $video_url = function_exists('get_field') ? get_field('video_url', $skill->ID) : '';

                    // Get form ID for this skill (use skill-specific or default)
                    $skill_form_id = function_exists('get_field') ? get_field('hubspot_form_id', $skill->ID) : '';
                    $hubspot_form_id = !empty($skill_form_id) ? $skill_form_id : $default_hubspot_form_id;
                  ?>
                    <article
                      id="skill-<?php echo esc_attr($skill->post_name); ?>"
                      class="skill-content">

                      <?php if ($video_thumbnail && is_array($video_thumbnail)) : ?>
                        <div class="skill-content__video">
                          <?php if ($video_url) : ?>
                            <button
                              class="skill-content__video-thumbnail"
                              data-video-url="<?php echo esc_attr($video_url); ?>"
                              data-hubspot-form="<?php echo esc_attr($hubspot_form_id); ?>"
                              data-skill-id="<?php echo esc_attr($skill->ID); ?>"
                              aria-label="<?php esc_attr_e('Play video', 'aera'); ?>">
                              <img src="<?php echo esc_url($video_thumbnail['url']); ?>"
                              alt="<?php echo esc_attr(!empty($video_thumbnail['alt']) ? $video_thumbnail['alt'] : $skill->post_title . ' video'); ?>" />
                              <span class="skill-content__video-play-icon">
                                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <circle cx="40" cy="40" r="40" fill="rgba(0,0,0,0.7)" />
                                  <path d="M32 26L56 40L32 54V26Z" fill="white" />
                                </svg>
                              </span>
                            </button>
                          <?php else : ?>
                            <img src="<?php echo esc_url($video_thumbnail['url']); ?>" alt="<?php echo esc_attr(!empty($video_thumbnail['alt']) ? $video_thumbnail['alt'] : $skill->post_title); ?>" />
                          <?php endif; ?>
                        </div>
                      <?php endif; ?> <div class="skill-content__header">

                        <h2 class="skill-content__title">
                          <?php echo esc_html($skill->post_title); ?>
                        </h2>

                        <?php if ($skill_description) : ?>
                          <div class="skill-content__description">
                            <?php echo wp_kses_post(wpautop($skill_description)); ?>
                          </div>
                        <?php endif; ?>
                      </div>

                      <?php
                      // Display Content Sections (from ACF repeater field)
                      $content_sections = function_exists('get_field') ? get_field('content_sections', $skill->ID) : array();
                      // Ensure $content_sections is an array
                      if (!is_array($content_sections)) {
                        $content_sections = array();
                      }
                      if (!empty($content_sections)) :
                      ?>
                        <div class="skill-content__body">
                          <?php foreach ($content_sections as $section) : ?>
                            <?php if (!empty($section['content'])) : ?>
                              <?php echo wp_kses_post(wpautop($section['content'])); ?>
                            <?php endif; ?>
                          <?php endforeach; ?>
                        </div>
                      <?php endif; ?>

                      <?php
                      // Display CTA buttons (from repeater field)
                      $cta_buttons = function_exists('get_field') ? get_field('cta_buttons', $skill->ID) : array();

                      if (!empty($cta_buttons) && is_array($cta_buttons)) :
                      ?>
                        <div class="skill-content__cta">
                          <?php foreach ($cta_buttons as $button) : ?>
                            <?php
                            // Process button link
                            $link = '';
                            if (!empty($button['link_type']) && $button['link_type'] === 'internal' && !empty($button['link_internal'])) {
                              $link = get_permalink($button['link_internal']);
                            } elseif (!empty($button['link_type']) && $button['link_type'] === 'resource' && !empty($button['link_resource'])) {
                              $link = get_permalink($button['link_resource']);
                            } elseif (!empty($button['link_external'])) {
                              $link = $button['link_external'];
                            } elseif (!empty($button['link'])) {
                              // Legacy support
                              $link = $button['link'];
                            } elseif (!empty($button['url'])) {
                              // Legacy support for old 'url' field
                              $link = $button['url'];
                            }

                            $text = $button['text'] ?? $button['label'] ?? '';

                            if (!empty($text) && !empty($link)) :
                            ?>
                              <a href="<?php echo esc_url($link); ?>" class="button button--outline" target="_blank" rel="noopener noreferrer">
                                <?php echo esc_html($text); ?>
                              </a>
                            <?php endif; ?>
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

  <!-- Related Functions Section -->
  <?php
  // Get related skill functions from ACF repeater field
  $related_functions = function_exists('get_field') ? get_field('related_skill_functions', 'skill_function_' . $current_function->term_id) : array();

  if (!empty($related_functions) && is_array($related_functions)) :
    // Convert repeater items to term objects
    $related_function_terms = array();
    foreach ($related_functions as $related_function) {
      // Repeater returns an array with the sub-field key
      $function_term = isset($related_function['related_skill_function']) ? $related_function['related_skill_function'] : $related_function;

      // If it's already a term object, use it directly
      if (is_object($function_term) && isset($function_term->term_id)) {
        $related_function_terms[] = $function_term;
      } elseif (is_numeric($function_term)) {
        // If it's just an ID, get the term object
        $term = get_term($function_term, 'skill_function');
        if ($term && !is_wp_error($term)) {
          $related_function_terms[] = $term;
        }
      }
    }

    if (!empty($related_function_terms)) :
  ?>
      <section class="skills-function__related">
        <div class="skills-function__container">
          <h2 class="skills-home__resources-title"><?php esc_html_e('Explore Other Business Functions', 'aera'); ?></h2>

          <?php
          get_template_part('template-parts/components/skill-functions-grid', null, array(
            'functions' => $related_function_terms,
            'grid_class' => 'skills-home__resources-grid',
            'card_class' => 'skill-card',
          ));
          ?>

          <div class="skills-home__cta">
            <a href="<?php echo esc_url(get_post_type_archive_link('skill')); ?>" class="button button--outline">
              <?php esc_html_e('View All Skills', 'aera'); ?>
            </a>
          </div>
        </div>
      </section>
  <?php
    endif;
  endif;
  ?>

  <!-- Resources Section -->
  <?php get_template_part('template-parts/components/resources-section'); ?>

  <!-- CTA Section -->
  <?php
  // Get skills-specific CTA from options, or let component use defaults
  $skills_cta_title = function_exists('get_field') ? get_field('skills_cta_title', 'option') : '';
  $skills_cta_buttons = function_exists('get_field') ? get_field('skills_cta_buttons', 'option') : array();

  // Only pass custom data if skills-specific CTA is configured in options
  if (!empty($skills_cta_title) || !empty($skills_cta_buttons)) {
    get_template_part('template-parts/components/cta', null, array(
      'cta' => array(
        'title' => $skills_cta_title,
        'buttons' => $skills_cta_buttons,
      ),
    ));
  } else {
    // Use default CTA from component
    get_template_part('template-parts/components/cta');
  }
  ?>

  <!-- Video Modal -->
  <div id="skillVideoModal" class="skill-video-modal" style="display: none;">
    <div class="skill-video-modal__overlay"></div>
    <div class="skill-video-modal__content">
      <button class="skill-video-modal__close" id="closeSkillVideoModal" aria-label="<?php esc_attr_e('Close video', 'aera'); ?>">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.5 2.5L2.5 13.5" stroke="#5C6475" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M2.5 2.5L13.5 13.5" stroke="#5C6475" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <div class="skill-video-modal__player">
        <!-- HubSpot Form (shown initially if gated) -->
        <div id="skillVideoForm" class="skill-video-modal__form" style="display: none;">
          <h3 class="skill-video-modal__form-title"><?php esc_html_e('Watch This Video', 'aera'); ?></h3>
          <p class="skill-video-modal__form-description"><?php esc_html_e('Please fill out the form below to access this content.', 'aera'); ?></p>
          <div id="skillVideoHubspotForm"></div>
        </div>

        <!-- Video Container (shown after form submission or immediately if ungated) -->
        <div id="skillVideoPlayer" class="skill-video-modal__video-wrapper" style="display: none;">
          <iframe
            id="skillVideoIframe"
            src=""
            frameborder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowfullscreen>
          </iframe>
        </div>
      </div>
    </div>
  </div>

</main>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Video Modal functionality
    const modal = document.getElementById('skillVideoModal');
    const closeBtn = document.getElementById('closeSkillVideoModal');
    const videoPlayerWrapper = document.getElementById('skillVideoPlayer');
    const videoFormWrapper = document.getElementById('skillVideoForm');
    const videoIframe = document.getElementById('skillVideoIframe');
    const hubspotFormContainer = document.getElementById('skillVideoHubspotForm');

    let currentVideoUrl = '';
    let currentFormId = '';

    // Open video modal
    document.querySelectorAll('.skill-content__video-thumbnail').forEach(function(button) {
      button.addEventListener('click', function() {
        currentVideoUrl = this.getAttribute('data-video-url');
        currentFormId = this.getAttribute('data-hubspot-form');

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        // Check if video needs to be gated
        if (currentFormId && currentFormId.trim() !== '') {
          // Show form, hide video
          videoFormWrapper.style.display = 'block';
          videoPlayerWrapper.style.display = 'none';

          // Load HubSpot form if not already loaded
          if (hubspotFormContainer && hubspotFormContainer.innerHTML === '') {
            if (typeof hbspt !== 'undefined') {
              hbspt.forms.create({
                region: 'na1',
                portalId: '4455954',
                formId: currentFormId,
                target: '#skillVideoHubspotForm',
                onFormSubmit: function() {
                  // Show video after form submission
                  setTimeout(function() {
                    videoFormWrapper.style.display = 'none';
                    videoPlayerWrapper.style.display = 'block';
                    closeBtn.classList.add('skill-video-modal__close--video');
                    videoIframe.src = currentVideoUrl;
                  }, 500);
                }
              });
            } else {
              console.error('HubSpot forms library not loaded');
              // Fallback: show video anyway
              videoFormWrapper.style.display = 'none';
              videoPlayerWrapper.style.display = 'block';
              closeBtn.classList.add('skill-video-modal__close--video');
              videoIframe.src = currentVideoUrl;
            }
          }
        } else {
          // No gating, show video directly
          videoFormWrapper.style.display = 'none';
          videoPlayerWrapper.style.display = 'block';
          closeBtn.classList.add('skill-video-modal__close--video');
          videoIframe.src = currentVideoUrl;
        }
      });
    });

    // Close modal
    function closeModal() {
      modal.style.display = 'none';
      document.body.style.overflow = '';
      videoIframe.src = '';
      if (hubspotFormContainer) {
        hubspotFormContainer.innerHTML = '';
      }
      videoFormWrapper.style.display = 'none';
      videoPlayerWrapper.style.display = 'none';
      closeBtn.classList.remove('skill-video-modal__close--video');
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    // Close on overlay click
    modal.querySelector('.skill-video-modal__overlay').addEventListener('click', closeModal);

    // Close on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModal();
      }
    });

    // Tab switching (only if tabs exist)
    const tabs = document.querySelectorAll('.skills-function__tab');
    const panels = document.querySelectorAll('.skills-function__panel');

    if (tabs.length > 0) {
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
    }

    // Smooth scroll for sidebar navigation (only if sidebar exists)
    const sidebarLinks = document.querySelectorAll('.skills-function__sidebar-link');
    if (sidebarLinks.length > 0) {
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
    }

    // Update sidebar active state on scroll
    function updateSidebarActiveState() {
      const activePanel = document.querySelector('.skills-function__panel.active');
      if (!activePanel) return;

      const skills = activePanel.querySelectorAll('.skill-content');
      const sidebarLinks = activePanel.querySelectorAll('.skills-function__sidebar-link');

      // Only run if sidebar exists
      if (sidebarLinks.length === 0 || skills.length === 0) return;

      let currentSkillIndex = 0;
      const viewportCenter = window.innerHeight / 2;

      let closestDistance = Infinity;
      skills.forEach(function(skill, index) {
        const rect = skill.getBoundingClientRect();
        const skillCenter = rect.top + rect.height / 2;
        const distance = Math.abs(skillCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
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

    // Throttle scroll events for performance (only if sidebar exists)
    if (document.querySelector('.skills-function__sidebar')) {
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
    }

    // Fade-in animation on scroll using IntersectionObserver
    const skillContents = document.querySelectorAll('.skill-content');
    if (skillContents.length > 0) {
      const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            // Element is in viewport - fade in
            entry.target.style.opacity = '1';
          } else {
            // Element is below viewport - start faded
            entry.target.style.opacity = '0.3';
          }
        });
      }, {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -100px 0px' // Start animation 100px before element enters viewport
      });

      skillContents.forEach(function(skill) {
        // Set initial opacity
        skill.style.opacity = '0.3';
        fadeInObserver.observe(skill);
      });
    }
  });
</script>

<?php
get_footer();
