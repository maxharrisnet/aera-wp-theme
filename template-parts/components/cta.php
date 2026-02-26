<?php

/**
 * CTA component template.
 *
 * @package Aera_Technology
 */

namespace Aera;

defined('ABSPATH') || exit;

// Extract CTA data from $args if passed via get_template_part()
$cta = $args['cta'] ?? null;

// Accept CTA data as parameter, or get from ACF if not provided. Prefer
// page-level fields and fall back to site-level defaults (options).
if (!isset($cta) || $cta === null || empty($cta)) {
  if (function_exists('get_field')) {
    // Load both page-level and site-level fields and merge intelligently.
    $page_cta_title = get_field('cta_title');
    $page_cta_buttons = get_field('cta_buttons');

    $site_cta_title = get_field('cta_title', 'option');
    $site_cta_buttons = get_field('cta_buttons', 'option');

    // Prefer page title when present, otherwise use site default.
    $source_title = !empty($page_cta_title) ? $page_cta_title : $site_cta_title;

    // Prefer page buttons when present; otherwise fall back to site defaults.
    $source_buttons = !empty($page_cta_buttons) && is_array($page_cta_buttons) ? $page_cta_buttons : $site_cta_buttons;

    if (!empty($source_title) || !empty($source_buttons)) {
      $cta = array(
        'title' => $source_title ?: '',
        'buttons' => array(),
      );

      // Process buttons to resolve link types
      if (!empty($source_buttons) && is_array($source_buttons)) {
        foreach ($source_buttons as $button) {
          $link = '';
          if (!empty($button['link_type']) && $button['link_type'] === 'internal' && !empty($button['link_internal'])) {
            $link = get_permalink($button['link_internal']);
          } elseif (!empty($button['link_type']) && $button['link_type'] === 'resource' && !empty($button['link_resource'])) {
            $link = get_permalink($button['link_resource']);
          } elseif (!empty($button['link_external'])) {
            $link = $button['link_external'];
          } elseif (!empty($button['link'])) {
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
    } elseif (isset($button['link_type']) && $button['link_type'] === 'resource' && isset($button['link_resource'])) {
      $button['link'] = get_permalink($button['link_resource']);
      unset($button['link_type'], $button['link_internal'], $button['link_external'], $button['link_resource']);
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

// Deduplicate and sanitize buttons (avoid accidental double renders)
if (!empty($cta['buttons']) && is_array($cta['buttons'])) {
  $deduped_buttons = array();
  $seen = array();

  foreach ($cta['buttons'] as $btn) {
    $text = isset($btn['text']) ? trim($btn['text']) : '';
    $link = isset($btn['link']) ? trim($btn['link']) : '';

    if ($text === '' || $link === '') {
      continue;
    }

    $key = md5($text . '|' . $link);
    if (isset($seen[$key])) {
      continue; // skip duplicates
    }
    $seen[$key] = true;

    $deduped_buttons[] = array(
      'text' => $text,
      'link' => $link,
    );
  }

  $cta['buttons'] = $deduped_buttons;
}
?>

<section class="cta-section">
  <div class="cta-section__container">
    <div class="cta-section__content">
      <h2 class="cta-section__title"><?php echo esc_html($cta['title']); ?></h2>

      <?php if (!empty($cta['buttons'])) : ?>
        <div class="cta-section__buttons">
          <?php foreach ($cta['buttons'] as $index => $button) : ?>
            <?php if (!empty($button['text']) && !empty($button['link'])) : ?>
              <?php
              // Second button gets solid style; others remain outline
              $button_class = $index === 1 ? 'button button--solid' : 'button button--outline';
              ?>
              <a class="<?php echo esc_attr($button_class); ?>" href="<?php echo esc_url($button['link']); ?>">
                <?php echo esc_html($button['text']); ?>
              </a>
            <?php endif; ?>
          <?php endforeach; ?>
        </div>
      <?php endif; ?>
    </div>
  </div>
</section>