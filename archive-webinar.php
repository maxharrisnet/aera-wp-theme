<?php

/**
 * The template for displaying webinar archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Aera_Technology
 */

get_header();

// Get hero content - try ACF first, then use defaults
$hero = function_exists('get_field') ? (array) get_field('webinars_hero') : array();
$hero = wp_parse_args(
  $hero,
  array(
    'title'       => get_the_archive_title('', false),
    'description' => get_the_archive_description() ?: __('Register for upcoming webinars or explore our library of past sessions. Filter videos by industry, solution area or job function to find the content most relevant to you.', 'aera'),
  )
);

// Get today's date for comparison
$today = current_time('Y-m-d');

// Query for featured upcoming webinars (featured = true AND date >= today)
$featured_upcoming_args = array(
  'post_type'      => 'webinar',
  'posts_per_page' => 6,
  'post_status'    => 'publish',
  'orderby'        => 'meta_value',
  'meta_key'       => 'webinar_date',
  'order'          => 'ASC',
  'meta_query'     => array(
    'relation' => 'AND',
    array(
      'key'     => 'webinar_featured',
      'value'   => '1',
      'compare' => '=',
    ),
    array(
      'key'     => 'webinar_date',
      'value'   => $today,
      'compare' => '>=',
      'type'    => 'DATE',
    ),
  ),
);

$featured_upcoming_query = new WP_Query($featured_upcoming_args);

// Query for on-demand webinars (date < today OR no date)
// Note: We'll modify the main query to exclude featured upcoming webinars
$on_demand_args = array(
  'post_type'      => 'webinar',
  'posts_per_page' => 12,
  'post_status'    => 'publish',
  'orderby'        => array(
    'meta_value' => 'DESC',
    'date'       => 'DESC',
  ),
  'meta_key'       => 'webinar_date',
  'meta_query'     => array(
    'relation' => 'OR',
    array(
      'key'     => 'webinar_date',
      'value'   => $today,
      'compare' => '<',
      'type'    => 'DATE',
    ),
    array(
      'key'     => 'webinar_date',
      'compare' => 'NOT EXISTS',
    ),
  ),
);

$paged = max(1, get_query_var('paged') ?: get_query_var('page') ?: 1);
$on_demand_args['paged'] = $paged;
$on_demand_query = new WP_Query($on_demand_args);
?>

<main id="primary" class="site-main site-main--webinars">
  <section class="webinars-hero">
    <div class="webinars-hero__container">
      <h1 class="webinars-hero__title">Webinars</h1>
      <?php if (!empty($hero['description'])) : ?>
        <p class="webinars-hero__description"><?php echo esc_html($hero['description']); ?></p>
      <?php endif; ?>
    </div>
  </section>

  <?php if ($featured_upcoming_query->have_posts()) : ?>
    <section class="webinars-featured">
      <div class="webinars-featured__container">
        <h2 class="webinars-featured__title"><?php esc_html_e('Featured Upcoming Webinars', 'aera'); ?></h2>
        <div class="webinars-featured__list">
          <?php
          while ($featured_upcoming_query->have_posts()) :
            $featured_upcoming_query->the_post();
            get_template_part('template-parts/content', 'webinar-featured');
          endwhile;
          ?>
        </div>
      </div>
    </section>
  <?php endif; ?>
  <?php wp_reset_postdata(); ?>

  <section class="webinars-on-demand">
    <div class="webinars-on-demand__container">
      <?php if ($on_demand_query->have_posts()) : ?>
        <div class="webinars-on-demand__list">
          <?php
          while ($on_demand_query->have_posts()) :
            $on_demand_query->the_post();
            get_template_part('template-parts/content', 'webinar');
          endwhile;
          ?>
        </div>

        <?php
        $pagination = paginate_links(
          array(
            'total'   => $on_demand_query->max_num_pages,
            'current' => $paged,
            'type'    => 'list',
          )
        );
        if ($pagination) :
        ?>
          <nav class="webinars-on-demand__pagination" aria-label="<?php esc_attr_e('Webinars pagination', 'aera'); ?>">
            <?php echo wp_kses_post($pagination); ?>
          </nav>
        <?php endif; ?>
      <?php else : ?>
        <p class="webinars-on-demand__empty"><?php esc_html_e('No on-demand webinars available at this time.', 'aera'); ?></p>
      <?php endif; ?>
    </div>
  </section>
</main>

<?php
wp_reset_postdata();
get_footer();
