<?php

/**
 * The template for displaying skill archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Aera_Technology
 */

get_header();

// Get hero content - prefer page-level (if present), otherwise use ACF options
$hero_title = function_exists('get_field') ? get_field('skills_archive_title', 'option') : '';
$hero_description = function_exists('get_field') ? get_field('skills_archive_description', 'option') : '';

// Provide sensible defaults if options are empty
if (empty($hero_title)) {
  $hero_title = __('Aera Skills™', 'aera');
}
if (empty($hero_description)) {
  $hero_description = __('Explore our comprehensive suite of business decision skills powered by the Aera Decision Cloud™.', 'aera');
}

// CTA button for archive (options)
$hero_button_text = function_exists('get_field') ? get_field('skills_archive_button_text', 'option') : '';
$hero_button_link = function_exists('get_field') ? get_field('skills_archive_button_link', 'option') : '';

// Get skill categories for filtering
$skill_categories = get_terms(array(
  'taxonomy' => 'skill_category',
  'hide_empty' => true,
  'orderby' => 'name',
  'order' => 'ASC',
));

// Get current filters from URL
$current_search = isset($_GET['skill_search']) ? sanitize_text_field(is_array($_GET['skill_search']) ? $_GET['skill_search'][0] : $_GET['skill_search']) : '';
$current_skills = isset($_GET['skills']) ? array_map('intval', (array)$_GET['skills']) : array();
$current_sort = isset($_GET['sort']) ? sanitize_text_field(is_array($_GET['sort']) ? $_GET['sort'][0] : $_GET['sort']) : 'menu_order';

// Prevent WordPress from processing our custom parameters as query vars
add_filter('request', function ($query_vars) {
  // Remove our custom parameters from WordPress's query processing
  unset($query_vars['skills']);
  unset($query_vars['skill_search']);
  unset($query_vars['sort']);
  return $query_vars;
});

// Modify the main query to add our filters
add_action('pre_get_posts', function ($query) use ($current_search, $current_skills, $current_sort) {
  if (!is_admin() && $query->is_main_query() && is_post_type_archive('skill')) {

    // Add search filter
    if (!empty($current_search)) {
      $query->set('s', $current_search);
    }

    // Add specific skill IDs filter
    if (!empty($current_skills)) {
      $query->set('post__in', $current_skills);
    }

    // Add sorting
    switch ($current_sort) {
      case 'title':
        $query->set('orderby', 'title');
        $query->set('order', 'ASC');
        break;
      case 'date':
        $query->set('orderby', 'date');
        $query->set('order', 'DESC');
        break;
      default:
        $query->set('orderby', 'menu_order');
        $query->set('order', 'ASC');
    }
  }
});
?>

<main id="primary" class="site-main site-main--skills">
  <?php
  // Prepare hero data
  $hero_args = array(
    'hero_title' => $hero_title,
    'hero_text' => $hero_description,
    'hero_full_height' => false,
    'hero_variation' => 'skillset',
    'hero_button_text' => $hero_button_text,
    'hero_button_link' => $hero_button_link,
  );

  get_template_part('template-parts/components/hero', null, $hero_args);
  ?>

  <!-- Skills Archive Section -->
  <section class="skills skills--archive">
    <div class="skills__container">
      <div class="skills__row">

        <!-- Sidebar Filter -->
        <aside class="skills-filter">
          <h3 class="skills-filter__title"><?php esc_html_e('All Skills', 'aera'); ?></h3>

          <div class="skills-filter__toggle" id="filterToggle">
            <?php esc_html_e('Filter Skills', 'aera'); ?>
          </div>

          <div class="skills-filter__content" id="filterContent">

            <!-- Search Bar -->
            <div class="skills-filter__search">
              <form role="search" method="get" action="<?php echo esc_url(get_post_type_archive_link('skill')); ?>" id="skillsSearchForm" class="skills-filter__search-form">
                <div class="skills-filter__search-wrapper">
                  <input type="search" name="skill_search" placeholder="<?php esc_attr_e('Search skills...', 'aera'); ?>" value="<?php echo esc_attr($current_search); ?>" class="skills-filter__search-input">
                  <button type="submit" class="skills-filter__search-button" aria-label="<?php esc_attr_e('Search', 'aera'); ?>">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="10" r="6" stroke="currentColor" stroke-width="2" />
                      <path d="M14.5 14.5L20 20" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>

            <!-- Categories Filter -->
            <?php if (!empty($skill_categories) && !is_wp_error($skill_categories)) : ?>
              <form method="get" action="<?php echo esc_url(get_post_type_archive_link('skill')); ?>" id="skillsFilterForm">
                <!-- Preserve search parameter -->
                <?php if (!empty($current_search)) : ?>
                  <input type="hidden" name="skill_search" value="<?php echo esc_attr($current_search); ?>">
                <?php endif; ?>

                <!-- Preserve sort parameter -->
                <?php if (!empty($current_sort) && $current_sort !== 'menu_order') : ?>
                  <input type="hidden" name="sort" value="<?php echo esc_attr($current_sort); ?>">
                <?php endif; ?>

                <div class="skills-filter__functions">


                  <?php foreach ($skill_categories as $category) :
                    // Get skills in this category
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
                      'orderby' => 'title',
                      'order' => 'ASC',
                    ));

                    if (empty($skills_in_category)) continue;

                    // Get parent function name if available
                    $parent_function_id = function_exists('get_field') ? get_field('parent_function', 'skill_category_' . $category->term_id) : null;
                    $parent_function_name = '';
                    if ($parent_function_id) {
                      $parent_function = get_term($parent_function_id, 'skill_function');
                      if ($parent_function && !is_wp_error($parent_function)) {
                        $parent_function_name = $parent_function->name;
                      }
                    }
                  ?>
                    <div class="skills-filter__function">
                      <div class="skills-filter__function-header" data-function="<?php echo esc_attr($category->slug); ?>">
                        <span class="skills-filter__function-name">
                          <?php echo esc_html($category->name); ?>
                        </span>
                        <span class="skills-filter__function-icon">+</span>
                      </div>
                      <div class="skills-filter__function-skills" id="function-<?php echo esc_attr($category->slug); ?>">
                        <?php foreach ($skills_in_category as $skill) :
                          $is_checked = in_array($skill->ID, $current_skills);
                        ?>
                          <label class="skills-filter__skill-item">
                            <input type="checkbox" name="skills[]" value="<?php echo esc_attr($skill->ID); ?>" class="skills-filter__checkbox" <?php checked($is_checked); ?>>
                            <span><?php echo esc_html($skill->post_title); ?></span>
                          </label>
                        <?php endforeach; ?>
                      </div>
                    </div>
                  <?php endforeach; ?>
                </div>


              </form>
            <?php endif; ?>

          </div>
        </aside>

        <!-- Skills Grid -->
        <div class="skills-grid">
          <?php if (have_posts()) : ?>
            <div class="skills-grid__list">
              <?php
              while (have_posts()) :
                the_post();
                get_template_part('template-parts/content', 'icon-card');
              endwhile;
              ?>
            </div>

            <!-- Pagination -->
            <?php
            $pagination = paginate_links(array(
              'type' => 'array',
              'prev_text' => __('&laquo; Previous', 'aera'),
              'next_text' => __('Next &raquo;', 'aera'),
            ));

            if ($pagination) :
            ?>
              <nav class="skills-pagination" aria-label="<?php esc_attr_e('Skills pagination', 'aera'); ?>">
                <ul class="pagination">
                  <?php foreach ($pagination as $page) : ?>
                    <li><?php echo wp_kses_post($page); ?></li>
                  <?php endforeach; ?>
                </ul>
              </nav>
            <?php endif; ?>

          <?php else : ?>
            <div class="skills-grid__empty">
              <p><?php esc_html_e('No skills found matching your criteria.', 'aera'); ?></p>
            </div>
          <?php endif; ?>
        </div>

      </div>
    </div>
  </section>
</main>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Mobile filter toggle
    const filterToggle = document.getElementById('filterToggle');
    const filterContent = document.getElementById('filterContent');

    if (filterToggle && filterContent) {
      filterToggle.addEventListener('click', function() {
        filterToggle.classList.toggle('active');
        filterContent.classList.toggle('active');
      });
    }

    // Function expand/collapse
    const functionHeaders = document.querySelectorAll('.skills-filter__function-header');
    functionHeaders.forEach(function(header) {
      header.addEventListener('click', function() {
        const functionSlug = this.getAttribute('data-function');
        const skillsList = document.getElementById('function-' + functionSlug);
        const icon = this.querySelector('.skills-filter__function-icon');

        if (skillsList) {
          skillsList.classList.toggle('active');
          this.classList.toggle('active');
          icon.textContent = skillsList.classList.contains('active') ? '−' : '+';
        }
      });
    });

    // Auto-expand functions that have checked skills
    const checkedCheckboxes = document.querySelectorAll('.skills-filter__checkbox:checked');
    checkedCheckboxes.forEach(function(checkbox) {
      const functionSkills = checkbox.closest('.skills-filter__function-skills');
      const functionHeader = functionSkills ? functionSkills.previousElementSibling : null;

      if (functionSkills && functionHeader) {
        functionSkills.classList.add('active');
        functionHeader.classList.add('active');
        const icon = functionHeader.querySelector('.skills-filter__function-icon');
        if (icon) {
          icon.textContent = '−';
        }
      }
    });

    // Submit form when checkboxes change (fallback only if client-side filter isn't active)
    const skillCheckboxes = document.querySelectorAll('.skills-filter__checkbox');
    skillCheckboxes.forEach(function(checkbox) {
      checkbox.addEventListener('change', function() {
        if (window.AeraSkillsFilterActive) return; // client-side filtering handles it
        const form = document.getElementById('skillsFilterForm');
        if (form) {
          form.submit();
        }
      });
    });

    // Sort dropdown
    const sortSelect = document.getElementById('skillSort');
    if (sortSelect) {
      sortSelect.addEventListener('change', function() {
        const form = document.createElement('form');
        form.method = 'GET';
        form.action = window.location.pathname;

        // Preserve existing parameters
        const url = new URL(window.location.href);
        url.searchParams.forEach(function(value, key) {
          if (key !== 'sort') {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value;
            form.appendChild(input);
          }
        });

        // Add sort parameter
        const sortInput = document.createElement('input');
        sortInput.type = 'hidden';
        sortInput.name = 'sort';
        sortInput.value = this.value;
        form.appendChild(sortInput);

        document.body.appendChild(form);
        form.submit();
      });
    }
  });
</script>

<?php
get_footer();
