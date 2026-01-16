<?php

/**
 * Template part for blog author section.
 *
 * @package Aera_Technology
 */

defined('ABSPATH') || exit;

// Get WordPress post author
$author_id = get_the_author_meta('ID');
$author_name = get_the_author();
$author_url = get_author_posts_url($author_id);

// Get author photo from user meta or avatar
$author_photo_url = get_user_meta($author_id, 'author_photo_url', true);
$author_position = get_user_meta($author_id, 'author_position', true);

// Get lead text from ACF
$lead_text = function_exists('get_field') ? (string) get_field('blog_lead') : '';
$lead_paragraphs = array_values(array_filter(array_map('trim', preg_split('/\r\n|\r|\n/', $lead_text ?? ''))));

// Only show if there's content
$has_content = ($author_id && $author_name) || ! empty($lead_paragraphs) || $author_photo_url;

if (! $has_content) {
  return;
}
?>

<section class="article-author">
  <div class="article-author__container">
    <div class="article-author__row">
      <div class="article-author__col">
        <?php if ($author_id && $author_name) : ?>
          <?php if ($author_photo_url) : ?>
            <div class="article-author__image">
              <img src="<?php echo esc_url($author_photo_url); ?>" alt="<?php echo esc_attr($author_name); ?>" />
            </div>
          <?php else : ?>
            <div class="article-author__image">
              <?php echo get_avatar($author_id, 96, '', $author_name); ?>
            </div>
          <?php endif; ?>

          <p class="article-author__lead">
            <span class="article-author__leadName">
              <?php if ($author_url) : ?>
                <a href="<?php echo esc_url($author_url); ?>"><?php echo esc_html($author_name); ?></a>
              <?php else : ?>
                <?php echo esc_html($author_name); ?>
              <?php endif; ?>
            </span>
            <?php if ($author_position) : ?>
              <span class="article-author__position"><?php echo esc_html($author_position); ?></span>
            <?php endif; ?>
          </p>
        <?php endif; ?>

        <?php if (! empty($lead_paragraphs)) : ?>
          <?php foreach ($lead_paragraphs as $paragraph) : ?>
            <p class="article-author__lead">
              <span class="article-author__leadName"><?php echo esc_html($paragraph); ?></span>
            </p>
          <?php endforeach; ?>
        <?php endif; ?>
      </div>
    </div>
  </div>
</section>