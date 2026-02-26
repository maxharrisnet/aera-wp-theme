<?php

/**
 * The template for displaying event archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Aera_Technology
 */

get_header();

// Hero section - from ACF Events Options
$hero_title = __('Events & Webinars', 'aera');
$hero_title_line_two = '';
$hero_subtitle = '';
$hero_text = '';
$hero_button_text = '';
$hero_button_link = '';
$hero_full_height = false;
$hero_variation = 'default';

if (function_exists('get_field')) {
  $acf_title = get_field('events_hero_title', 'option');
  $acf_title_line_two = get_field('events_hero_title_line_two', 'option');
  $acf_subtitle = get_field('events_hero_subtitle', 'option');
  $acf_text = get_field('events_hero_text', 'option');
  $acf_button_text = get_field('events_hero_button_text', 'option');
  $acf_button_link = get_field('events_hero_button_link', 'option');
  $acf_full_height = get_field('events_hero_full_height', 'option');
  $acf_variation = get_field('events_hero_variation', 'option');

  if (!empty($acf_title)) {
    $hero_title = $acf_title;
  }
  if (!empty($acf_title_line_two)) {
    $hero_title_line_two = $acf_title_line_two;
  }
  if (!empty($acf_subtitle)) {
    $hero_subtitle = $acf_subtitle;
  }
  if (!empty($acf_text)) {
    $hero_text = $acf_text;
  }
  if (!empty($acf_button_text)) {
    $hero_button_text = $acf_button_text;
  }
  if (!empty($acf_button_link)) {
    $hero_button_link = $acf_button_link;
  }
  if ($acf_full_height) {
    $hero_full_height = (bool) $acf_full_height;
  }
  if (!empty($acf_variation)) {
    $hero_variation = $acf_variation;
  }
}

// Query for all events
$all_resources_args = array(
  'post_type'      => 'event',
  'posts_per_page' => -1, // Get all for display
  'post_status'    => 'publish',
  'meta_key'       => 'event_start_date',
  'orderby'        => 'meta_value',
  'order'          => 'ASC', // Most recent events first
);

$all_resources_query = new WP_Query($all_resources_args);
?>

<main id="primary" class="site-main site-main--events">
  <?php
  // Prepare hero data
  $hero_args = array(
    'hero_title'          => $hero_title,
    'hero_title_line_two' => $hero_title_line_two,
    'hero_subtitle'       => $hero_subtitle,
    'hero_text'           => $hero_text,
    'hero_button_text'   => $hero_button_text,
    'hero_button_link'   => $hero_button_link,
    'hero_full_height'   => $hero_full_height,
    'hero_variation'     => $hero_variation,
  );

  get_template_part('template-parts/components/hero', null, $hero_args);
  ?>

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
              $post_type = 'event';

              // Determine event type label
              $type_label = __('In-Person Event', 'aera');
              $event_city = function_exists('get_field') ? get_field('event_city', $post_id) : '';
              $event_start_date = function_exists('get_field') ? get_field('event_start_date', $post_id) : '';
              $event_date = '';
              if ($event_start_date) {
                $event_date = date_i18n('Y-m-d', strtotime($event_start_date));
              } else {
                $event_date = get_the_date('Y-m-d', $post_id);
              }

              // Get CTA text
              $cta_text = '';
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

              get_template_part(
                'template-parts/content',
                'resource-card',
                array(
                  'post_id'     => $post_id,
                  'post_type'   => $post_type,
                  'type_label'  => $type_label,
                  'date'        => $event_date,
                  'cta_label'   => $cta_text,
                  'city'        => $event_city,
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
