<?php

/**
 * Template part for blog author section.
 *
 * @package Aera_Technology
 */

defined('ABSPATH') || exit;

// Get author fields from ACF
// Try new field name first, fallback to old for backwards compatibility
$author_photo = function_exists('get_field') ? get_field('blog_author_image') : null;
if (!$author_photo && function_exists('get_field')) {
  $author_photo = get_field('blog_author_photo'); // Backwards compatibility
}

$lead_text = function_exists('get_field') ? (string) get_field('blog_lead') : '';
$lead_paragraphs = array_values(array_filter(array_map('trim', preg_split('/\r\n|\r|\n/', $lead_text ?? ''))));

// Use blog_author from Blog Post fields, fallback to resource_author from Archive Card fields
$author_text = '';
if (function_exists('get_field')) {
  $author_text = (string) get_field('blog_author');
  // Fallback to resource_author for backwards compatibility
  if (empty($author_text)) {
    $author_text = (string) get_field('resource_author');
  }
  // Final fallback to old field name
  if (empty($author_text)) {
    $author_text = (string) get_field('resource_author_1');
  }
}
$author_paragraphs = array_values(array_filter(array_map('trim', preg_split('/\r\n|\r|\n/', $author_text ?? ''))));

// Only show if there's content
$has_content = $author_photo || ! empty($lead_paragraphs) || ! empty($author_paragraphs);

if (! $has_content) {
  return;
}
?>

<section class="article-author">
  <div class="article-author__container">
    <div class="article-author__row">
      <div class="article-author__col">
        <?php if ($author_photo && is_array($author_photo) && ! empty($author_photo['url'])) : ?>
          <div class="article-author__image">
            <img src="<?php echo esc_url($author_photo['url']); ?>" alt="<?php echo esc_attr($author_photo['alt'] ?? ''); ?>" />
          </div>
        <?php endif; ?>

        <?php if (! empty($lead_paragraphs)) : ?>
          <?php foreach ($lead_paragraphs as $paragraph) : ?>
            <p class="article-author__lead">
              <span class="article-author__leadName"><?php echo esc_html($paragraph); ?></span>
            </p>
          <?php endforeach; ?>
        <?php endif; ?>

        <?php if (! empty($author_paragraphs)) : ?>
          <?php foreach ($author_paragraphs as $paragraph) : ?>
            <p class="article-author__lead">
              <span class="article-author__leadName"><?php echo esc_html($paragraph); ?></span>
            </p>
          <?php endforeach; ?>
        <?php endif; ?>
      </div>
    </div>
  </div>
</section>