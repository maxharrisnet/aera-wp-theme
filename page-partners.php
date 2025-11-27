<?php

/**
 * Template Name: Partners
 *
 * @package Aera_Technology
 */

get_header();

// Hero section
$hero_title = function_exists('get_field') ? get_field('hero_title') : __('Partners', 'aera');
$hero_text = function_exists('get_field') ? get_field('hero_text') : __('We are partnering with a select group of organizations, from consulting firms to technology platforms and data service providers, to accelerate time to value and value over time. Together, we are delivering and scaling Decision Intelligence across the globe.', 'aera');
$hero_full_height = function_exists('get_field') ? get_field('hero_full_height') : true;

// CTA section
$cta_title = function_exists('get_field') ? get_field('partners_cta_title') : __('Interested in becoming a partner?', 'aera');
$cta_text = function_exists('get_field') ? get_field('partners_cta_text') : __('Schedule Demo', 'aera');
$cta_link = function_exists('get_field') ? get_field('partners_cta_link') : home_url('/demo');

// Get partners
$partners = get_posts(array(
  'post_type' => 'partner',
  'posts_per_page' => -1,
  'orderby' => 'menu_order',
  'order' => 'ASC',
  'post_status' => 'publish',
));

?>

<main id="primary" class="site-main site-main--partners">
  <?php get_template_part('template-parts/components/hero'); ?>

  <!-- Partners Content Section -->
  <?php if (!empty($partners)) : ?>
    <section class="partners">
      <div class="partners__wrapper">
        <?php foreach ($partners as $partner) : ?>
          <?php
          $partner_id = $partner->ID;
          $partner_title = get_the_title($partner_id);
          $partner_text = get_field('partner_text', $partner_id) ?: get_the_excerpt($partner_id);
          $partner_image = get_field('partner_image', $partner_id);
          $partner_link = get_field('partner_link', $partner_id);

          // Fallback to featured image if no ACF image
          if (!$partner_image && has_post_thumbnail($partner_id)) {
            $partner_image = array('url' => get_the_post_thumbnail_url($partner_id, 'full'));
          }
          ?>
          <div class="partners__components">
            <?php if (!empty($partner_image['url'])) : ?>
              <div class="partners__cosImage">
                <?php if ($partner_link) : ?>
                  <a href="<?php echo esc_url($partner_link); ?>" target="_blank" rel="noopener noreferrer">
                    <img src="<?php echo esc_url($partner_image['url']); ?>" alt="<?php echo esc_attr($partner_title); ?>" loading="lazy" />
                  </a>
                <?php else : ?>
                  <img src="<?php echo esc_url($partner_image['url']); ?>" alt="<?php echo esc_attr($partner_title); ?>" loading="lazy" />
                <?php endif; ?>
              </div>
            <?php endif; ?>
            <div class="partners__cosText">
              <?php if (!empty($partner_title)) : ?>
                <h3><?php echo esc_html($partner_title); ?></h3>
              <?php endif; ?>
              <?php if (!empty($partner_text)) : ?>
                <p><?php echo wp_kses_post($partner_text); ?></p>
              <?php endif; ?>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
    </section>
  <?php endif; ?>

  <!-- Request/CTA Section -->
  <section class="request">
    <div class="request__container">
      <div class="request__content">
        <h2 class="request__title"><?php echo esc_html($cta_title); ?></h2>
        <a class="button button--outline" href="<?php echo esc_url($cta_link); ?>"><?php echo esc_html($cta_text); ?></a>
      </div>
    </div>
  </section>
</main>

<?php
get_footer();

