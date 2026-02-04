<?php

/**
 * Module Template Page component template.
 *
 * @package Aera_Technology
 */

namespace Aera;

defined('ABSPATH') || exit;

// Initialize $args if not provided
$args = $args ?? array();

$body_copy = $args['body_copy'] ?? '';
$benefits = $args['benefits'] ?? '';
$features = $args['features'] ?? '';
$featured_image = $args['featured_image'] ?? null;

// Fallback to ACF fields if arguments not provided
if (empty($body_copy) && function_exists('get_field')) {
  $body_copy = get_field('platform_body_copy');
}
if (empty($benefits) && function_exists('get_field')) {
  $benefits = get_field('platform_benefits');
}
if (empty($features) && function_exists('get_field')) {
  $features = get_field('platform_features');
}
if (empty($featured_image) && function_exists('get_field')) {
  $featured_image = get_field('platform_featured_image');
}
?>

<div class="module-template">
  <?php if (!empty($body_copy) || !empty($featured_image)) : ?>
    <div class="module-template__imagetext">
      <div class="module-template__container">
        <div class="module-template__row">
          <?php if (!empty($body_copy)) : ?>
            <div class="module-template__bodyCopy">
              <?php echo wp_kses_post(wpautop($body_copy)); ?>
            </div>
          <?php endif; ?>
          <?php if (!empty($featured_image) && is_array($featured_image)) : ?>
            <div class="module-template__featImage">
              <?php
              $att = $featured_image['ID'] ?? $featured_image['id'] ?? null;
              if ($att) {
                echo wp_get_attachment_image($att, 'large', false, array('alt' => ($featured_image['alt'] ?? '')));
              } else {
                echo '<img src="' . esc_url($featured_image['url']) . '" alt="' . esc_attr($featured_image['alt'] ?? '') . '" />';
              }
              ?>
            </div>
          <?php endif; ?>
        </div>
      </div>
    </div>
  <?php endif; ?>

  <?php if (!empty($benefits) || !empty($features)) : ?>
    <div class="module-template__container">
      <div class="module-template__row">
        <div class="module-template__content">
          <div class="module-template__detailWrapper">
            <?php if (!empty($benefits)) : ?>
              <div class="module-template__list">
                <h3><?php esc_html_e('Benefits', 'aera'); ?></h3>
                <?php echo wp_kses_post(wpautop($benefits)); ?>
              </div>
            <?php endif; ?>
            <?php if (!empty($features)) : ?>
              <div class="module-template__list">
                <h3><?php esc_html_e('Features', 'aera'); ?></h3>
                <?php echo wp_kses_post(wpautop($features)); ?>
              </div>
            <?php endif; ?>
            <div class="module-template__clearfix"></div>
          </div>
        </div>
      </div>
    </div>
  <?php endif; ?>
</div>

<?php
// Add CTA component at the bottom
// Accept CTA data as parameter, or get from ACF if not provided
$cta = $args['cta'] ?? null;
if (empty($cta) && function_exists('get_field')) {
  $cta = get_field('cta');
}

// Use default CTA if none provided
if (empty($cta)) {
  $cta = array(
    'title' => __('See Aera in action.', 'aera'),
    'text'  => __('Schedule Demo', 'aera'),
    'link'  => home_url('/demo'),
  );
}

get_template_part('template-parts/components/cta', null, array('cta' => $cta));
?>