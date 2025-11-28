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

// Query for featured webinars (featured = true) - show first 3
$featured_args = array(
  'post_type'      => 'webinar',
  'posts_per_page' => 3,
  'post_status'    => 'publish',
  'orderby'        => array(
    'meta_value' => 'DESC',
    'date'       => 'DESC',
  ),
  'meta_key'       => 'webinar_date',
  'meta_query'     => array(
    array(
      'key'     => 'webinar_featured',
      'value'   => '1',
      'compare' => '=',
    ),
  ),
);

$featured_query = new WP_Query($featured_args);

// Query for all on-demand webinars for the grid
$on_demand_args = array(
  'post_type'      => 'webinar',
  'posts_per_page' => -1, // Get all for filtering
  'post_status'    => 'publish',
  'orderby'        => array(
    'meta_value' => 'DESC',
    'date'       => 'DESC',
  ),
  'meta_key'       => 'webinar_date',
);

$on_demand_query = new WP_Query($on_demand_args);
?>

<main id="primary" class="site-main site-main--webinars">
  <!-- Intro Section -->
  <section class="intro intro--webinars">
    <div class="intro__container">
      <h1 class="intro__title">Webinars</h1>
      <?php if (!empty($hero['description'])) : ?>
        <p class="intro__text"><?php echo esc_html($hero['description']); ?></p>
      <?php endif; ?>
    </div>
  </section>

  <!-- Featured Events Section -->
  <?php if ($featured_query->have_posts()) : ?>
    <section class="news news--featured">
      <div class="news__container">
        <div class="news__list">
          <div class="news__col" id="featEvent">
            <?php
            $featured_count = 0;
            while ($featured_query->have_posts() && $featured_count < 3) :
              $featured_query->the_post();
              get_template_part('template-parts/content', 'webinar-featured-item');
              $featured_count++;
            endwhile;
            ?>
          </div>
        </div>
      </div>
    </section>
  <?php endif; ?>
  <?php wp_reset_postdata(); ?>

  <!-- Newsletter Form Section -->
  <section class="news__formSection">
    <div class="news__container">
      <div class="news__col">
        <div class="news__formRow">
          <div class="news__formText">
            <h3><?php esc_html_e('Get the latest resources, blog posts, and updates from Aera Technology.', 'aera'); ?></h3>
            <p><?php esc_html_e('Sign up for updates in your inbox.', 'aera'); ?></p>
          </div>
          <div class="news__formWrapper">
            <div id="webinarForm"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- All Resources Section -->
  <?php if ($on_demand_query->have_posts()) : ?>
    <section class="news news--all-resources">
      <div class="news__container">
        <div class="news__col">
          <h2 class="news__subheading"><?php esc_html_e('Want to learn more?', 'aera'); ?></h2>
          <p class="news__para"><?php esc_html_e('Catch up on our previous webinars.', 'aera'); ?></p>

          <div class="news__filterRow">
            <div>
              <select id="industryFilter" class="news__filter">
                <option value=""><?php esc_html_e('All Industries', 'aera'); ?></option>
                <!-- Populated via JavaScript -->
              </select>
            </div>
            <div>
              <select id="solutionAreaFilter" class="news__filter">
                <option value=""><?php esc_html_e('All Solution Areas', 'aera'); ?></option>
                <!-- Populated via JavaScript -->
              </select>
            </div>
            <div>
              <select id="jobFunctionFilter" class="news__filter">
                <option value=""><?php esc_html_e('All Job Functions', 'aera'); ?></option>
                <!-- Populated via JavaScript -->
              </select>
            </div>
          </div>

          <div class="news__list news__list--grid" id="webinarGrid">
            <?php
            while ($on_demand_query->have_posts()) :
              $on_demand_query->the_post();
              get_template_part('template-parts/content', 'webinar-item');
            endwhile;
            ?>
          </div>
        </div>
      </div>
    </section>
  <?php endif; ?>
  <?php wp_reset_postdata(); ?>
</main>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Load HubSpot forms script
    const script = document.createElement('script');
    script.src = 'https://js.hsforms.net/forms/embed/v2.js';
    document.body.appendChild(script);

    script.addEventListener('load', function() {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: '4455954',
          formId: '23724f92-30b8-4f38-b984-70383520619d',
          target: '#webinarForm'
        });
      }
    });
  });
</script>

<?php
get_footer();
