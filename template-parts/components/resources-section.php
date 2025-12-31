<?php

/**
 * Template part for displaying a resources section
 * Used on Skills Home, Decision Cloud, and Skill Detail pages
 *
 * @package Aera_Technology
 */

// Get passed arguments or ACF fields
$section_title = $args['section_title'] ?? (function_exists('get_field') ? get_field('resources_section_title') : __('Resources', 'aera'));
$resources = $args['resources'] ?? array();

// If no resources passed, try to get from ACF
if (empty($resources) && function_exists('get_field')) {
  // Check for repeater field first (used on skill detail pages)
  $related_resources = get_field('related_resources');
  if ($related_resources && is_array($related_resources)) {
    foreach ($related_resources as $resource) {
      $title = $resource['title'] ?? '';
      $url = $resource['link'] ?? '';
      if ($title && $url) {
        $resources[] = array(
          'title' => $title,
          'description' => $resource['text'] ?? '',
          'url' => $url,
          'image' => $resource['image'] ?? null,
          'external' => strpos($url, home_url()) === false || strpos($url, 'http') === 0,
        );
      }
    }
  } else {
    // Check for numbered fields (used on skills home and decision cloud pages)
    for ($i = 1; $i <= 3; $i++) {
      $title = get_field("resource_{$i}_title");
      $url = get_field("resource_{$i}_url");
      if ($title && $url) {
        $resources[] = array(
          'title' => $title,
          'description' => get_field("resource_{$i}_description"),
          'url' => $url,
          'image' => get_field("resource_{$i}_image"),
          'external' => strpos($url, home_url()) === false || strpos($url, 'http') === 0,
        );
      }
    }
  }
}

// Check if any resources are configured
if (empty($resources)) {
  return;
}
?>

<section class="resources-section">
  <div class="resources-section__container">
    <?php if ($section_title) : ?>
      <h2><?php echo esc_html($section_title); ?></h2>
    <?php endif; ?>
    <div class="resources-section__row">
      <?php foreach ($resources as $resource) : ?>
        <?php
        $image_url = $resource['image'] && !empty($resource['image']['url']) ? $resource['image']['url'] : '';
        $target = ($resource['external'] ?? false) ? ' target="_blank" rel="noopener noreferrer"' : '';
        ?>
        <a href="<?php echo esc_url($resource['url']); ?>" class="resources-section__card"<?php echo $target; ?>>
          <?php if ($image_url) : ?>
            <img src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($resource['title']); ?>" loading="lazy" />
          <?php endif; ?>
          <div class="resources-section__cardWrapper">
            <h3 class="resources-section__cardTitle"><?php echo esc_html($resource['title']); ?></h3>
            <?php if (!empty($resource['description'])) : ?>
              <p class="resources-section__cardDescription"><?php echo esc_html($resource['description']); ?></p>
            <?php endif; ?>
          </div>
        </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>

