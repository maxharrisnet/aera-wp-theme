<?php

/**
 * CTA component template.
 *
 * @package Aera_Technology
 */

namespace Aera;

defined('ABSPATH') || exit;

// Accept CTA data as parameter, or get from ACF if not provided
if (!isset($cta) || $cta === null) {
  // Try to get CTA from ACF fields (cta_title and cta_buttons)
  if (function_exists('get_field')) {
    $cta_title = get_field('cta_title');
    $cta_buttons = get_field('cta_buttons');

    if (!empty($cta_title) || !empty($cta_buttons)) {
      $cta = array(
        'title' => $cta_title ?: '',
        'buttons' => array(),
      );

      // Process buttons to resolve link types
      if (!empty($cta_buttons)) {
        foreach ($cta_buttons as $button) {
          $link = '';
          if (!empty($button['link_type']) && $button['link_type'] === 'internal' && !empty($button['link_internal'])) {
            // Internal link - get permalink from post ID
            $link = get_permalink($button['link_internal']);
          } elseif (!empty($button['link_external'])) {
            // External link or relative path
            $link = $button['link_external'];
          } elseif (!empty($button['link'])) {
            // Legacy support for old 'link' field
            $link = $button['link'];
          }

          if (!empty($button['text']) && !empty($link)) {
            $cta['buttons'][] = array(
              'text' => $button['text'],
              'link' => $link,
            );
          }
        }
      }
    } else {
      $cta = array();
    }
  } else {
    $cta = array();
  }
}

// If $cta is already set (passed as param), use it as-is but process link types if needed
if (!empty($cta) && !empty($cta['buttons'])) {
  foreach ($cta['buttons'] as &$button) {
    if (isset($button['link_type']) && $button['link_type'] === 'internal' && isset($button['link_internal'])) {
      $button['link'] = get_permalink($button['link_internal']);
      unset($button['link_type'], $button['link_internal'], $button['link_external']);
    } elseif (isset($button['link_external'])) {
      $button['link'] = $button['link_external'];
      unset($button['link_type'], $button['link_internal'], $button['link_external']);
    }
  }
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