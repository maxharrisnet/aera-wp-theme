<?php

/**
 * Template part for blog author section.
 *
 * @package Aera_Technology
 */

defined('ABSPATH') || exit;

// Get author fields from ACF
$author_photo = function_exists('get_field') ? get_field('blog_author_photo') : null;
$author_photo_2 = function_exists('get_field') ? get_field('blog_author_photo_2') : null;
$author_photo_3 = function_exists('get_field') ? get_field('blog_author_photo_3') : null;

$publisher_2 = function_exists('get_field') ? (string) get_field('blog_publisher_2') : '';
$publisher_2_paragraphs = array_values(array_filter(array_map('trim', preg_split('/\r\n|\r|\n/', $publisher_2 ?? ''))));

// Use resource_author_2 from resource fields
$author_2 = function_exists('get_field') ? (string) get_field('resource_author_2') : '';
$author_2_paragraphs = array_values(array_filter(array_map('trim', preg_split('/\r\n|\r|\n/', $author_2 ?? ''))));

$publisher_3 = function_exists('get_field') ? (string) get_field('blog_publisher_3') : '';
$publisher_3_paragraphs = array_values(array_filter(array_map('trim', preg_split('/\r\n|\r|\n/', $publisher_3 ?? ''))));

// Use resource_author_3 from resource fields
$author_3 = function_exists('get_field') ? (string) get_field('resource_author_3') : '';
$author_3_paragraphs = array_values(array_filter(array_map('trim', preg_split('/\r\n|\r|\n/', $author_3 ?? ''))));

$lead_text = function_exists('get_field') ? (string) get_field('blog_lead') : '';
$lead_paragraphs = array_values(array_filter(array_map('trim', preg_split('/\r\n|\r|\n/', $lead_text ?? ''))));

// Use resource_author_1 from resource fields instead of blog_author
$author_text = function_exists('get_field') ? (string) get_field('resource_author_1') : '';
$author_paragraphs = array_values(array_filter(array_map('trim', preg_split('/\r\n|\r|\n/', $author_text ?? ''))));

// Only show if there's content
$has_content = $author_photo || $author_photo_2 || $author_photo_3 || ! empty($lead_paragraphs) || ! empty($author_paragraphs) || ! empty($publisher_2_paragraphs) || ! empty($author_2_paragraphs) || ! empty($publisher_3_paragraphs) || ! empty($author_3_paragraphs);

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

      <?php if ($author_photo_2 || ! empty($publisher_2_paragraphs) || ! empty($author_2_paragraphs)) : ?>
        <div class="article-author__col">
          <?php if ($author_photo_2 && is_array($author_photo_2) && ! empty($author_photo_2['url'])) : ?>
            <div class="article-author__image">
              <img src="<?php echo esc_url($author_photo_2['url']); ?>" alt="<?php echo esc_attr($author_photo_2['alt'] ?? ''); ?>" />
            </div>
          <?php endif; ?>

          <?php if (! empty($publisher_2_paragraphs)) : ?>
            <?php foreach ($publisher_2_paragraphs as $paragraph) : ?>
              <p class="article-author__lead">
                <span class="article-author__leadName"><?php echo esc_html($paragraph); ?></span>
              </p>
            <?php endforeach; ?>
          <?php endif; ?>

          <?php if (! empty($author_2_paragraphs)) : ?>
            <?php foreach ($author_2_paragraphs as $paragraph) : ?>
              <p class="article-author__lead">
                <span class="article-author__leadName"><?php echo esc_html($paragraph); ?></span>
              </p>
            <?php endforeach; ?>
          <?php endif; ?>
        </div>
      <?php endif; ?>

      <?php if ($author_photo_3 || ! empty($publisher_3_paragraphs) || ! empty($author_3_paragraphs)) : ?>
        <div class="article-author__col">
          <?php if ($author_photo_3 && is_array($author_photo_3) && ! empty($author_photo_3['url'])) : ?>
            <div class="article-author__image">
              <img src="<?php echo esc_url($author_photo_3['url']); ?>" alt="<?php echo esc_attr($author_photo_3['alt'] ?? ''); ?>" />
            </div>
          <?php endif; ?>

          <?php if (! empty($publisher_3_paragraphs)) : ?>
            <?php foreach ($publisher_3_paragraphs as $paragraph) : ?>
              <p class="article-author__lead">
                <span class="article-author__leadName"><?php echo esc_html($paragraph); ?></span>
              </p>
            <?php endforeach; ?>
          <?php endif; ?>

          <?php if (! empty($author_3_paragraphs)) : ?>
            <?php foreach ($author_3_paragraphs as $paragraph) : ?>
              <p class="article-author__lead">
                <span class="article-author__leadName"><?php echo esc_html($paragraph); ?></span>
              </p>
            <?php endforeach; ?>
          <?php endif; ?>
        </div>
      <?php endif; ?>
    </div>
  </div>
</section>