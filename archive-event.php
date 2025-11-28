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
$hero = function_exists('get_field') ? (array) get_field('events_hero') : array();
$hero_title = !empty($hero['title']) ? $hero['title'] : __('Events & Webinars', 'aera');
$hero_description = !empty($hero['description']) ? $hero['description'] : __('Discover upcoming in-person events and webinars, or explore our library of past sessions. Filter by event type, industry, or topic to find content most relevant to you.', 'aera');

// Query for all events and webinars
$all_resources_args = array(
  'post_type'      => array('event', 'webinar'),
  'posts_per_page' => -1, // Get all for display
  'post_status'    => 'publish',
  'orderby'        => 'date',
  'order'          => 'DESC',
);

$all_resources_query = new WP_Query($all_resources_args);
?>

<main id="primary" class="site-main site-main--events">
  <!-- Intro Section -->
  <section class="intro intro--events">
    <div class="intro__container">
      <h1 class="intro__title"><?php echo esc_html($hero_title); ?></h1>
      <?php if (!empty($hero_description)) : ?>
        <p class="intro__text"><?php echo esc_html($hero_description); ?></p>
      <?php endif; ?>
    </div>
  </section>

  <!-- All Resources Section -->
  <?php if ($all_resources_query->have_posts()) : ?>
    <section class="news news--events">
      <div class="news__container">
        <div class="news__list">
          <div class="news__col">
            <?php
            while ($all_resources_query->have_posts()) :
              $all_resources_query->the_post();
              $post_id = get_the_ID();
              $post_type = get_post_type($post_id);

              // Determine event type label
              $type_label = '';
              $event_city = '';
              $event_date = '';

              if ($post_type === 'event') {
                $type_label = __('In-Person Event', 'aera');
                $event_city = function_exists('get_field') ? get_field('event_city', $post_id) : '';
                $event_start_date = function_exists('get_field') ? get_field('event_start_date', $post_id) : '';
                if ($event_start_date) {
                  $event_date = date_i18n(get_option('date_format'), strtotime($event_start_date));
                } else {
                  $event_date = get_the_date(get_option('date_format'), $post_id);
                }
              } else {
                $type_label = __('Webinar', 'aera');
                $webinar_date = function_exists('get_field') ? get_field('webinar_date', $post_id) : '';
                if ($webinar_date) {
                  $event_date = date_i18n(get_option('date_format'), strtotime($webinar_date));
                } else {
                  $event_date = get_the_date(get_option('date_format'), $post_id);
                }
              }

              // Get CTA text
              $cta_text = '';
              if ($post_type === 'event') {
                $event_status = function_exists('get_field') ? get_field('event_status', $post_id) : '';
                switch ($event_status) {
                  case 'coming_soon':
                    $cta_text = __('Coming Soon', 'aera');
                    break;
                  case 'register':
                    $cta_text = __('Register', 'aera');
                    break;
                  case 'past':
                    $cta_text = __('View', 'aera');
                    break;
                  default:
                    $cta_text = __('Learn More', 'aera');
                }
              } else {
                $today = current_time('Y-m-d');
                $webinar_date = function_exists('get_field') ? get_field('webinar_date', $post_id) : '';
                $is_upcoming = false;
                if ($webinar_date) {
                  $is_upcoming = strtotime($webinar_date) >= strtotime($today);
                }
                $cta_text = $is_upcoming ? __('Register', 'aera') : __('Watch Now', 'aera');
              }

              get_template_part(
                'template-parts/content',
                'resource-card',
                array(
                  'post_id'     => $post_id,
                  'post_type'   => $post_type,
                  'type_label'  => $type_label,
                  'date'        => $event_date,
                  'cta_label'   => $cta_text,
                )
              );
            endwhile;
            ?>
          </div>
        </div>
      </div>
    </section>
  <?php else : ?>
    <section class="news news--events">
      <div class="news__container">
        <div class="news__col">
          <p><?php esc_html_e('No events available at this time.', 'aera'); ?></p>
        </div>
      </div>
    </section>
  <?php endif; ?>
  <?php wp_reset_postdata(); ?>
</main>

<?php
get_footer();
