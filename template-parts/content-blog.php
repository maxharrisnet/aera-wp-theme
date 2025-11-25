<?php

/**
 * Template part for single blog articles.
 *
 * @package Aera_Technology
 */

defined('ABSPATH') || exit;

$lead_text = function_exists('get_field') ? (string) get_field('blog_lead') : '';
$lead_paragraphs = array_values(array_filter(array_map('trim', preg_split('/\r\n|\r|\n/', $lead_text ?? ''))));

// Use resource_author_1 from resource fields instead of blog_author
$author_text = function_exists('get_field') ? (string) get_field('resource_author_1') : '';
$author_paragraphs = array_values(array_filter(array_map('trim', preg_split('/\r\n|\r|\n/', $author_text ?? ''))));

$date_value = get_the_date('c');
$display_date = get_the_date();

$article_classes = array(
  'article-template',
);
?>

<article id="post-<?php the_ID(); ?>" <?php post_class($article_classes); ?>>
  <div class="article-template__container">
    <div class="article-template__row">
      <div class="article-template__col article-template__col--main">
        <header class="article-template__header">
          <?php if ($display_date) : ?>
            <p class="article-template__date">
              <time datetime="<?php echo esc_attr($date_value); ?>">
                <?php echo esc_html($display_date); ?>
              </time>
            </p>
          <?php endif; ?>

          <?php the_title('<h1 class="article-template__title">', '</h1>'); ?>

          <?php if (! empty($lead_paragraphs)) : ?>
            <?php foreach ($lead_paragraphs as $paragraph) : ?>
              <p class="article-template__lead">
                <span class="article-template__leadName"><?php echo esc_html($paragraph); ?></span>
              </p>
            <?php endforeach; ?>
          <?php endif; ?>

          <?php if (! empty($author_paragraphs)) : ?>
            <?php foreach ($author_paragraphs as $paragraph) : ?>
              <p class="article-template__lead">
                <span class="article-template__leadName"><?php echo esc_html($paragraph); ?></span>
              </p>
            <?php endforeach; ?>
          <?php endif; ?>
        </header>

        <div class="article-template__content">
          <?php the_content(); ?>
        </div>

        <?php
        wp_link_pages(
          array(
            'before' => '<nav class="article-template__pagination" aria-label="' . esc_attr__('Article pages', 'aera') . '">',
            'after'  => '</nav>',
          )
        );
        ?>
      </div>

      <aside class="article-template__col article-template__col--sidebar">
        <?php
        // Social sharing section
        get_template_part('template-parts/content', 'blog-share');
        ?>

        <?php
        // Author section (if multiple authors)
        get_template_part('template-parts/content', 'blog-author');
        ?>

        <?php
        // Related posts sidebar (just the "Other Resources" links)
        get_template_part('template-parts/content', 'blog-related-sidebar');
        ?>
      </aside>
    </div>
  </div>
</article>

<?php
// Related posts section (full list below)
get_template_part('template-parts/content', 'blog-related');
?>