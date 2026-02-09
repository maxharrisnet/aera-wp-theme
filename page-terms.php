<?php

/**
 * Template Name: Terms Page
 * Template Post Type: page
 *
 * A simple page template that mirrors the original TemplatePage component
 * from the legacy site. Shows an optional date, lead paragraphs, optional
 * featured image, and the page content.
 *
 * @package Aera_Technology
 */

defined('ABSPATH') || exit;

get_header();

while (have_posts()) : the_post();
  // Prefer ACF fields when available
  $date = function_exists('get_field') ? get_field('template_date') : '';
  if (empty($date)) {
    $date = get_the_date('Y-m-d');
  }

  $lead = function_exists('get_field') ? (string) get_field('template_lead') : '';
  if (empty($lead)) {
    $lead = function_exists('get_field') ? (string) get_field('lead') : '';
  }

  // Featured image: prefer ACF image field, then post thumbnail
  $featured = null;
  if (function_exists('get_field')) {
    $featured = get_field('template_image');
  }
  if (empty($featured) && has_post_thumbnail()) {
    $thumb_id = get_post_thumbnail_id();
    if ($thumb_id) {
      $featured = array('ID' => $thumb_id);
    }
  }
?>

  <article class="templatePage">
    <div class="templatePage__container">
      <div class="templatePage__row">
        <div class="templatePage__col">

          <header class="templatePage__header">
            <?php if (!empty($date)) : ?>
              <p class="templatePage__date"><time datetime="<?php echo esc_attr($date); ?>"><?php echo esc_html($date); ?></time></p>
            <?php endif; ?>

            <h1 class="templatePage__title"><?php the_title(); ?></h1>

            <?php if (!empty($lead)) : ?>
              <?php foreach (preg_split('/\r\n|\r|\n/', $lead) as $p) :
                $p = trim($p);
                if ($p === '') continue;
              ?>
                <p class="templatePage__lead"><?php echo esc_html($p); ?></p>
              <?php endforeach; ?>
            <?php endif; ?>
          </header>

          <?php if (!empty($featured) && is_array($featured)) : ?>
            <div class="templatePage__image">
              <?php
              $att = $featured['ID'] ?? $featured['id'] ?? null;
              if ($att) {
                echo wp_get_attachment_image($att, 'large', false, array('alt' => get_the_title(), 'class' => 'templatePage__imageImg'));
              } elseif (!empty($featured['url'])) {
                echo '<img src="' . esc_url($featured['url']) . '" alt="' . esc_attr(get_the_title()) . '" class="templatePage__imageImg" />';
              }
              ?>
            </div>
          <?php endif; ?>

          <section class="templatePage__content">
            <?php the_content(); ?>
          </section>

        </div>
      </div>
    </div>
  </article>

<?php
endwhile;

get_footer();
