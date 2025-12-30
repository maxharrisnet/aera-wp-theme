<?php

/**
 * The template for displaying skill archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Aera_Technology
 */

get_header();

// Get hero content - try ACF from options page
$hero_title = function_exists('get_field') ? get_field('skills_archive_title', 'option') : '';
$hero_description = function_exists('get_field') ? get_field('skills_archive_description', 'option') : '';

if (empty($hero_title)) {
  $hero_title = __('Aera Skills™', 'aera');
}
if (empty($hero_description)) {
  $hero_description = __('Explore our comprehensive suite of business decision skills powered by the Aera Decision Cloud™.', 'aera');
}

// Get skill categories/taxonomies for filtering
$skill_categories = get_terms(array(
  'taxonomy' => 'skill-category',
  'hide_empty' => true,
));

// Get current filters
$current_category = isset($_GET['skill-category']) ? sanitize_text_field($_GET['skill-category']) : '';
$current_sort = isset($_GET['sort']) ? sanitize_text_field($_GET['sort']) : 'menu_order';
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
            <?php esc_html_e('Filter By Category', 'aera'); ?>
          </div>

          <div class="skills-filter__content" id="filterContent">
            <h3 class="skills-filter__title"><?php esc_html_e('By Skills', 'aera'); ?></h3>

            <?php if (!empty($skill_categories) && !is_wp_error($skill_categories)) : ?>
              <form method="get" action="<?php echo esc_url(get_post_type_archive_link('skill')); ?>" id="skillsFilterForm">
                <ul class="skills-filter__list">
                  <li class="skills-filter__item">
                    <label>
                      <input type="checkbox" name="skill-category" value="" <?php checked($current_category, ''); ?>>
                      <?php esc_html_e('All Skills', 'aera'); ?>
                    </label>
                  </li>
                  <?php foreach ($skill_categories as $category) : ?>
                    <li class="skills-filter__item">
                      <label>
                        <input type="checkbox" name="skill-category" value="<?php echo esc_attr($category->slug); ?>" <?php checked($current_category, $category->slug); ?>>
                        <?php echo esc_html($category->name); ?>
                      </label>
                    </li>
                  <?php endforeach; ?>
                </ul>
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

    // Filter form submission
    const filterForm = document.getElementById('skillsFilterForm');
    const filterCheckboxes = filterForm ? filterForm.querySelectorAll('input[type="checkbox"]') : [];

    filterCheckboxes.forEach(function(checkbox) {
      checkbox.addEventListener('change', function() {
        // Uncheck all other checkboxes
        filterCheckboxes.forEach(function(cb) {
          if (cb !== checkbox) {
            cb.checked = false;
          }
        });
        // Submit the form
        filterForm.submit();
      });
    });

    // Sort dropdown
    const sortSelect = document.getElementById('skillSort');
    if (sortSelect) {
      sortSelect.addEventListener('change', function() {
        const url = new URL(window.location.href);
        url.searchParams.set('sort', this.value);
        window.location.href = url.toString();
      });
    }
  });
</script>

<?php
get_footer();
