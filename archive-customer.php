<?php

/**
 * The template for displaying customer archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Aera_Technology
 */

use function Aera\get_resource_label_for_post_type;

get_header();

// Get hero content from Company Options (preferred), then page ACF, then defaults
$hero_options = array();
if (function_exists('get_field')) {
  $hero_options['title']       = (string) get_field('company_customer_hero_title', 'option');
  $hero_options['description'] = (string) get_field('company_customer_hero_text', 'option');
  $hero_options['button_text'] = (string) get_field('company_customer_hero_button_text', 'option');
  $hero_options['button_link'] = (string) get_field('company_customer_hero_button_link', 'option');
}

// Legacy per-page/group field support (secondary)
$hero_page = function_exists('get_field') ? (array) get_field('customers_hero') : array();
$hero_page = wp_parse_args(
  $hero_page,
  array(
    'title'       => '',
    'description' => '',
  )
);

// Defaults (fallback)
$hero_defaults = array(
  'title'       => __('Customers', 'aera'),
  'description' => __('From supply chain and procurement to revenue management and marketing, some of the world\'s largest organizations are achieving breakthrough agility by transforming how they make and execute decisions.', 'aera'),
);
?>

<main id="primary" class="site-main site-main--customers">
  <?php
  // Prepare hero data - try ACF group field first, then use defaults
  $hero_args = array();

  // Title: prefer Company Options, then page/group, then default
  if (!empty($hero_options['title'])) {
    $hero_args['hero_title'] = $hero_options['title'];
  } elseif (!empty($hero_page['title'])) {
    $hero_args['hero_title'] = $hero_page['title'];
  } else {
    $hero_args['hero_title'] = $hero_defaults['title'];
  }

  // Text/Description: prefer Company Options, then page/group, then default
  if (!empty($hero_options['description'])) {
    $hero_args['hero_text'] = $hero_options['description'];
  } elseif (!empty($hero_page['description'])) {
    $hero_args['hero_text'] = $hero_page['description'];
  } else {
    $hero_args['hero_text'] = $hero_defaults['description'];
  }

  // Optional: Add subtitle if needed
  // $hero_args['hero_subtitle'] = __('Your subtitle here', 'aera');

  // Optional: Add button from Company Options if provided
  if (!empty($hero_options['button_text']) && !empty($hero_options['button_link'])) {
    $hero_args['hero_button_text'] = $hero_options['button_text'];
    $hero_args['hero_button_link'] = $hero_options['button_link'];
  }

  // Optional: Full height hero
  // $hero_args['hero_full_height'] = true;

  // Optional: Hero variation (home, careers, team, skillset)
  // $hero_args['hero_variation'] = 'default';

  get_template_part('template-parts/components/hero', null, $hero_args);
  ?>

  <!-- Customers Listing Section -->
  <?php if (have_posts()) : ?>
    <div class="feature-card">
      <div class="feature-card__wrapper">
        <div class="feature-card__cardwrapper">
          <?php
          while (have_posts()) :
            the_post();
            get_template_part(
              'template-parts/content',
              'customer-card',
              array(
                'post_id' => get_the_ID(),
              )
            );
          endwhile;
          ?>
        </div>
      </div>
    </div>

    <?php
    $paged = max(1, get_query_var('paged') ?: get_query_var('page') ?: 1);
    $pagination = paginate_links(
      array(
        'total'   => $GLOBALS['wp_query']->max_num_pages,
        'current' => $paged,
        'type'    => 'list',
      )
    );
    if ($pagination) :
    ?>
      <div class="customers">
        <div class="customers__container">
          <nav class="customers__pagination" aria-label="<?php esc_attr_e('Customers pagination', 'aera'); ?>">
            <?php echo wp_kses_post($pagination); ?>
          </nav>
        </div>
      </div>
    <?php endif; ?>
  <?php else : ?>
    <div class="feature-card">
      <div class="feature-card__wrapper">
        <div class="feature-card__cardwrapper">
          <p><?php esc_html_e('No customers available at this time.', 'aera'); ?></p>
        </div>
      </div>
    </div>
  <?php endif; ?>

  <?php
  // CTA section - "See Aera in action"
  $cta_title = __('See Aera in action.', 'aera');
  $cta_text = __('Schedule Demo', 'aera');
  $cta_link = home_url('/demo');
  ?>
  <div class="customers__cta">
    <h2 class="customers__ctaTitle"><?php echo esc_html($cta_title); ?></h2>
    <a href="<?php echo esc_url($cta_link); ?>" class="customers__ctaButton"><?php echo esc_html($cta_text); ?></a>
  </div>

</main>

<?php
get_footer();
