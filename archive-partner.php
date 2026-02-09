<?php

/**
 * The template for displaying partner archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Aera_Technology
 */

get_header();

// Hero section - try ACF Company Options first, then use defaults
$hero_title = __('Partners', 'aera');
$hero_text = __('We partner with a select group of organizations, from consulting firms to technology platforms and data service providers, to accelerate time to value and value over time. Together, we deliver and scale decision intelligence to enterprises across the globe.', 'aera');

if (function_exists('get_field')) {
  $acf_title = get_field('company_partner_hero_title', 'option');
  $acf_text = get_field('company_partner_hero_text', 'option');

  if (!empty($acf_title)) {
    $hero_title = $acf_title;
  }
  if (!empty($acf_text)) {
    $hero_text = $acf_text;
  }
}

$hero_full_height = false;

// CTA section - use the Page CTA field group attached to Company Options
// If no buttons configured, fall back to defaults
$cta = null; // Let the CTA component pull from ACF

?>

<main id="primary" class="site-main site-main--partners">
  <?php
  // Prepare hero data
  $hero_args = array(
    'hero_title' => $hero_title,
    'hero_text' => $hero_text,
    'hero_full_height' => $hero_full_height,
    'hero_variation' => 'partners',
  );
  get_template_part('template-parts/components/hero', null, $hero_args);
  ?>

  <!-- Partners Content Section -->
  <?php if (have_posts()) : ?>
    <section class="partners">
      <div class="partners__wrapper">
        <?php
        while (have_posts()) :
          the_post();
          $partner_id = get_the_ID();
          $partner_title = get_the_title();
          $partner_text = get_field('partner_text', $partner_id) ?: get_the_excerpt();
          $partner_image = get_field('partner_image', $partner_id);
          $partner_link = get_field('partner_link', $partner_id);

          // Fallback to featured image if no ACF image
          if (!$partner_image) {
            if (has_post_thumbnail($partner_id)) {
              $partner_image = array('ID' => get_post_thumbnail_id($partner_id));
            }
          }
        ?>
          <div class="partners__components">
            <?php
            $att = is_array($partner_image) ? ($partner_image['ID'] ?? $partner_image['id'] ?? null) : null;
            if ($att) : ?>
              <div class="partners__cosImage">
                <?php if ($partner_link) : ?>
                  <a href="<?php echo esc_url($partner_link); ?>" target="_blank" rel="noopener noreferrer">
                    <?php echo wp_get_attachment_image($att, 'full', false, array('alt' => $partner_title, 'class' => 'partners__img', 'loading' => 'lazy')); ?>
                  </a>
                <?php else : ?>
                    <?php echo wp_get_attachment_image($att, 'full', false, array('alt' => $partner_title, 'class' => 'partners__img', 'loading' => 'lazy')); ?>
                <?php endif; ?>
              </div>
            <?php elseif (!empty($partner_image['url'])) : ?>
              <div class="partners__cosImage">
                <?php if ($partner_link) : ?>
                  <a href="<?php echo esc_url($partner_link); ?>" target="_blank" rel="noopener noreferrer">
                    <img src="<?php echo esc_url($partner_image['url']); ?>" alt="<?php echo esc_attr($partner_title); ?>" loading="lazy" class="partners__img" />
                  </a>
                <?php else : ?>
                  <img src="<?php echo esc_url($partner_image['url']); ?>" alt="<?php echo esc_attr($partner_title); ?>" loading="lazy" class="partners__img" />
                <?php endif; ?>
              </div>
            <?php endif; ?>
            <div class="partners__cosText">
              <?php if (!empty($partner_title)) : ?>
                <h3><?php echo esc_html($partner_title); ?></h3>
              <?php endif; ?>
              <?php if (!empty($partner_text)) : ?>
                <?php echo wp_kses_post($partner_text); ?>
              <?php endif; ?>
            </div>
          </div>
        <?php endwhile; ?>
      </div>
    </section>
  <?php endif; ?>

  <!-- CTA Section -->
  <?php
  // CTA component will read from Company Options CTA fields
  get_template_part('template-parts/components/cta', null, array('cta' => $cta));
  ?>
</main>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Fade-in animation on scroll using IntersectionObserver
    const partnerComponents = document.querySelectorAll('.partners__components');
    if (partnerComponents.length > 0) {
      const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            // Element is in viewport - fade in
            entry.target.style.opacity = '1';
          } else {
            // Element is below viewport - start faded
            entry.target.style.opacity = '0.3';
          }
        });
      }, {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -100px 0px' // Start animation 100px before element enters viewport
      });

      partnerComponents.forEach(function(component) {
        // Set initial opacity
        component.style.opacity = '0.3';
        fadeInObserver.observe(component);
      });
    }
  });
</script>

<?php
get_footer();
