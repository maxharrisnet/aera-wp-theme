<?php

/**
 * The template for displaying event archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Aera_Technology
 */

use function Aera\get_resource_label_for_post_type;

get_header();

// Get hero content - try ACF first, then use defaults
$hero_title = __('Events & Webinars', 'aera');
$hero_description = __('Discover upcoming in-person events and webinars, or explore our library of past sessions. Filter by event type, industry, or topic to find content most relevant to you.', 'aera');

$paged = max(1, get_query_var('paged') ?: get_query_var('page') ?: 1);

// Get today's date for comparison
$today = current_time('Y-m-d');

// Query for featured events (featured = true)
$featured_args = array(
  'post_type'      => 'event',
  'posts_per_page' => 6,
  'post_status'    => 'publish',
  'orderby'        => 'date',
  'order'          => 'DESC',
  'meta_query'     => array(
    array(
      'key'     => 'event_featured',
      'value'   => '1',
      'compare' => '=',
    ),
  ),
);

$featured_query = new WP_Query($featured_args);

// Query for all events (excluding featured ones for the main list)
$event_query_args = array(
  'post_type'      => 'event',
  'posts_per_page' => 12,
  'paged'          => $paged,
  'post_status'    => 'publish',
  'orderby'        => 'date',
  'order'          => 'DESC',
  'meta_query'     => array(
    'relation' => 'OR',
    array(
      'key'     => 'event_featured',
      'compare' => 'NOT EXISTS',
    ),
    array(
      'key'     => 'event_featured',
      'value'   => '0',
      'compare' => '=',
    ),
  ),
);

$event_query = new WP_Query($event_query_args);

$demo_media_base = trailingslashit(get_template_directory_uri()) . 'assets/placeholder/';
?>

<main id="primary" class="site-main site-main--events">

  <?php get_template_part('template-parts/components/hero'); ?>

  <div class="events">
    <div class="events__container">
      <?php if ($featured_query->have_posts()) : ?>
        <section class="events-featured">
          <h2 class="events-featured__title"><?php esc_html_e('Featured Events', 'aera'); ?></h2>
          <div class="events-featured__list">
            <div class="events-featured__col">
              <?php
              while ($featured_query->have_posts()) :
                $featured_query->the_post();
                get_template_part(
                  'template-parts/content',
                  'resource-card',
                  array(
                    'post_id'     => get_the_ID(),
                    'type_label'  => get_resource_label_for_post_type('event'),
                    'external_url' => function_exists('get_field') ? get_field('resource_external_url') : '',
                    'post_type'   => 'event',
                  )
                );
              endwhile;
              ?>
            </div>
          </div>
        </section>
      <?php endif; ?>
      <?php wp_reset_postdata(); ?>

      <?php if ($event_query->have_posts()) : ?>
        <section class="events-list">
          <h2 class="events-list__title"><?php esc_html_e('All Events', 'aera'); ?></h2>
          <div class="events-list__items">
            <div class="events-list__col">
              <?php
              while ($event_query->have_posts()) :
                $event_query->the_post();
                get_template_part(
                  'template-parts/content',
                  'resource-card',
                  array(
                    'post_id'     => get_the_ID(),
                    'type_label'  => get_resource_label_for_post_type('event'),
                    'external_url' => function_exists('get_field') ? get_field('resource_external_url') : '',
                    'post_type'   => 'event',
                  )
                );
              endwhile;
              ?>
            </div>
          </div>

          <?php
          $pagination = paginate_links(
            array(
              'total'   => $event_query->max_num_pages,
              'current' => $paged,
              'type'    => 'list',
            )
          );
          if ($pagination) :
          ?>
            <nav class="events-list__pagination" aria-label="<?php esc_attr_e('Events pagination', 'aera'); ?>">
              <?php echo wp_kses_post($pagination); ?>
            </nav>
          <?php endif; ?>
        </section>
      <?php else : ?>
        <div class="events-list">
          <div class="events-list__col">
            <p><?php esc_html_e('No events available at this time.', 'aera'); ?></p>
          </div>
        </div>
      <?php endif; ?>
    </div>
  </div>

</main>

<?php
wp_reset_postdata();
get_footer();
