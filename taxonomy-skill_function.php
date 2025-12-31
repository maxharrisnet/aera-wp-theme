<?php

/**
 * The template for displaying skill function (taxonomy) archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Aera_Technology
 */

get_header();

// Get current taxonomy term
$current_term = get_queried_object();

// Get hero content from taxonomy term or fallback
$hero_title = $current_term->name;
$hero_description = $current_term->description ?: sprintf(
  /* translators: %s: function name */
  __('Explore %s skills powered by the Aera Decision Cloud™.', 'aera'),
  $current_term->name
);

// Get skill categories/taxonomies for filtering
$skill_categories = get_terms(array(
  'taxonomy' => 'skill_function',
  'hide_empty' => true,
));

// Get current filters from URL
$current_search = isset($_GET['skill_search']) ? sanitize_text_field($_GET['skill_search']) : '';
$current_skills = isset($_GET['skill']) ? array_map('intval', (array)$_GET['skill']) : array();
$current_sort = isset($_GET['sort']) ? sanitize_text_field($_GET['sort']) : 'menu_order';

// Modify the main query to add our filters
add_action('pre_get_posts', function ($query) use ($current_search, $current_skills, $current_sort) {
  if (!is_admin() && $query->is_main_query() && is_tax('skill_function')) {

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
    'hero_full_height' => true,
    'hero_variation' => 'skillset'
  );

  get_template_part('template-parts/components/hero', null, $hero_args);
  ?>

  <!-- Skills Archive Section -->
  <section class="skills skills--archive">
    <div class="skills__container">
      <div class="skills__row">

        <!-- Sidebar Filter -->
        <aside class="skills-filter">
          <div class="skills-filter__toggle" id="filterToggle">
            <?php esc_html_e('Filter Skills', 'aera'); ?>
          </div>

          <div class="skills-filter__content" id="filterContent">

            <!-- Search Bar -->
            <div class="skills-filter__search">
              <form role="search" method="get" action="<?php echo esc_url(get_term_link($current_term)); ?>" id="skillsSearchForm">
                <input type="search" name="skill_search" placeholder="<?php esc_attr_e('Search skills...', 'aera'); ?>" value="<?php echo esc_attr($current_search); ?>" class="skills-filter__search-input">
                <button type="submit" class="skills-filter__search-button">
                  <?php esc_html_e('Search', 'aera'); ?>
                </button>
              </form>
            </div>

            <!-- Functions Filter -->
            <?php if (!empty($skill_categories) && !is_wp_error($skill_categories)) : ?>
              <form method="get" action="<?php echo esc_url(get_term_link($current_term)); ?>" id="skillsFilterForm">
                <!-- Preserve search parameter -->
                <?php if (!empty($current_search)) : ?>
                  <input type="hidden" name="skill_search" value="<?php echo esc_attr($current_search); ?>">
                <?php endif; ?>

                <!-- Preserve sort parameter -->
                <?php if (!empty($current_sort) && $current_sort !== 'menu_order') : ?>
                  <input type="hidden" name="sort" value="<?php echo esc_attr($current_sort); ?>">
                <?php endif; ?>

                <div class="skills-filter__functions">
                  <h3 class="skills-filter__title"><?php esc_html_e('By Function', 'aera'); ?></h3>

                  <?php foreach ($skill_categories as $category) :
                    // Get skills in this category
                    $skills_in_category = get_posts(array(
                      'post_type' => 'skill',
                      'posts_per_page' => -1,
                      'tax_query' => array(
                        array(
                          'taxonomy' => 'skill_function',
                          'field' => 'term_id',
                          'terms' => $category->term_id,
                        ),
                      ),
                      'orderby' => 'title',
                      'order' => 'ASC',
                    ));

                    if (empty($skills_in_category)) continue;

                    // Auto-expand current function
                    $is_current = ($category->term_id === $current_term->term_id);
                  ?>
                    <div class="skills-filter__function">
                      <div class="skills-filter__function-header <?php echo $is_current ? 'active' : ''; ?>" data-function="<?php echo esc_attr($category->slug); ?>">
                        <span class="skills-filter__function-icon"><?php echo $is_current ? '−' : '+'; ?></span>
                        <span class="skills-filter__function-name"><?php echo esc_html($category->name); ?></span>
                        <span class="skills-filter__function-count">(<?php echo count($skills_in_category); ?>)</span>
                      </div>
                      <div class="skills-filter__function-skills <?php echo $is_current ? 'active' : ''; ?>" id="function-<?php echo esc_attr($category->slug); ?>">
                        <?php foreach ($skills_in_category as $skill) :
                          $is_checked = in_array($skill->ID, $current_skills);
                        ?>
                          <label class="skills-filter__skill-item">
                            <input type="checkbox" name="skill[]" value="<?php echo esc_attr($skill->ID); ?>" class="skills-filter__checkbox" <?php checked($is_checked); ?>>
                            <span><?php echo esc_html($skill->post_title); ?></span>
                          </label>
                        <?php endforeach; ?>
                      </div>
                    </div>
                  <?php endforeach; ?>
                </div>

                <!-- Filter Actions -->
                <div class="skills-filter__actions">
                  <button type="submit" class="skills-filter__apply-button">
                    <?php esc_html_e('Apply Filters', 'aera'); ?>
                  </button>
                  <a href="<?php echo esc_url(get_term_link($current_term)); ?>" class="skills-filter__clear-button">
                    <?php esc_html_e('Clear All', 'aera'); ?>
                  </a>
                </div>
              </form>
            <?php endif; ?>

          </div>
        </aside>

        <!-- Skills Grid -->
        <div class="skills-grid">
          <div class="skills-grid__header">
            <div class="skills-grid__count">
              <?php
              global $wp_query;
              printf(
                /* translators: %d: number of skills */
                esc_html(_n('%d skill found', '%d skills found', $wp_query->found_posts, 'aera')),
                esc_html(number_format_i18n($wp_query->found_posts))
              );
              ?>
            </div>

            <div class="skills-grid__sort">
              <label for="skillSort"><?php esc_html_e('Sort by:', 'aera'); ?></label>
              <select name="sort" id="skillSort">
                <option value="menu_order" <?php selected($current_sort, 'menu_order'); ?>><?php esc_html_e('Default', 'aera'); ?></option>
                <option value="title" <?php selected($current_sort, 'title'); ?>><?php esc_html_e('Name (A-Z)', 'aera'); ?></option>
                <option value="date" <?php selected($current_sort, 'date'); ?>><?php esc_html_e('Recently Added', 'aera'); ?></option>
              </select>
            </div>
          </div>

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

