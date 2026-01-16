<?php

/**
 * CTA component template.
 *
 * @package Aera_Technology
 */

namespace Aera;

defined('ABSPATH') || exit;

// Accept CTA data as parameter, or get from ACF if not provided
if (!isset($cta) || empty($cta)) {
  $cta = function_exists('get_field') ? (array) get_field('cta') : array();
}

// Set defaults
$cta = wp_parse_args(
  $cta,
  array(
    'title' => __('See Aera in action.', 'aera'),
    'buttons' => array(
      array(
        'text' => __('Schedule Demo', 'aera'),
        'link' => home_url('/demo'),
      )
    ),
  )
);

// Don't render if required fields are missing
if (empty($cta['title'])) {
  return;
}

// Support legacy single button format (text/link keys)
if (!empty($cta['text']) && !empty($cta['link'])) {
  $cta['buttons'] = array(
    array(
      'text' => $cta['text'],
      'link' => $cta['link'],
    )
  );
}
?>

<section class="cta-section">
  <div class="cta-section__container">
    <div class="cta-section__content">
      <h2 class="cta-section__title"><?php echo esc_html($cta['title']); ?></h2>

      <?php if (!empty($cta['buttons'])) : ?>
        <div class="cta-section__buttons">
          <?php foreach ($cta['buttons'] as $button) : ?>
            <?php if (!empty($button['text']) && !empty($button['link'])) : ?>
              <a class="button button--outline" href="<?php echo esc_url($button['link']); ?>">
                <?php echo esc_html($button['text']); ?>
              </a>
            <?php endif; ?>
          <?php endforeach; ?>
        </div>
      <?php endif; ?>
    </div>
  </div>
</section>