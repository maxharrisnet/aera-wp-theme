<?php

/**
 * The template for displaying single case study posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Aera_Technology
 */

get_header();

while (have_posts()) :
  the_post();

  // Get ACF fields
  $company_name = get_field('case_study_company_name');
  $industry = get_field('case_study_industry');
  $featured_image = get_field('case_study_featured_image');
  $body_copy = get_field('case_study_body_copy');
  $business_need = get_field('case_study_business_need');
  $short_solution = get_field('case_study_short_solution');
  $short_result = get_field('case_study_short_result');
  $challenges = get_field('case_study_challenges');
  $solution = get_field('case_study_solution');
  $results = get_field('case_study_results');
  $top_quote = get_field('case_study_top_quote');
  $quote = get_field('case_study_quote');

?>

  <main id="primary" class="site-main site-main--case-study">

    <?php
    // Case study hero section
    $hero_text = get_field('resource_excerpt') ?: get_the_excerpt();
    ?>
    <section class="hero hero--case-study">
      <div class="hero__container">
        <h1 class="hero__title"><?php echo esc_html(get_the_title()); ?></h1>
        <?php if ($hero_text) : ?>
          <p class="hero__text"><?php echo wp_kses_post($hero_text); ?></p>
        <?php endif; ?>
      </div>
    </section>

    <div class="case-study">
      <div class="case-study__imagetext">
        <div class="case-study__container">
          <?php if ($featured_image || $body_copy) : ?>
            <div class="case-study__row case-study__wrapper">
              <?php if ($featured_image) : ?>
                <div class="case-study__featImage">
                  <img src="<?php echo esc_url($featured_image['url']); ?>" alt="<?php echo esc_attr($featured_image['alt'] ?: get_the_title()); ?>" />
                </div>
              <?php endif; ?>
              <?php if ($body_copy) : ?>
                <div class="case-study__bodyCopy">
                  <?php echo wp_kses_post($body_copy); ?>
                </div>
              <?php endif; ?>
            </div>
          <?php endif; ?>

          <?php if ($business_need || $short_result) : ?>
            <div class="case-study__row case-study__contentWrapper">
              <?php if ($business_need) : ?>
                <div class="case-study__contentBox">
                  <h3><?php esc_html_e('Business Need', 'aera'); ?></h3>
                  <?php echo wp_kses_post($business_need); ?>
                </div>
              <?php endif; ?>
              <?php if ($short_result) : ?>
                <div class="case-study__contentBox">
                  <h3><?php esc_html_e('Results', 'aera'); ?></h3>
                  <?php echo wp_kses_post($short_result); ?>
                </div>
              <?php endif; ?>
            </div>
          <?php endif; ?>

          <?php if ($challenges || $solution) : ?>
            <div class="case-study__row">
              <div class="case-study__content">
                <div class="case-study__detailWrapper">
                  <?php if ($challenges) : ?>
                    <div class="case-study__list">
                      <h3><?php esc_html_e('The Challenges', 'aera'); ?></h3>
                      <?php echo wp_kses_post($challenges); ?>
                    </div>
                  <?php endif; ?>
                  <?php if ($solution) : ?>
                    <div class="case-study__list">
                      <h3><?php esc_html_e('The Solution', 'aera'); ?></h3>
                      <?php echo wp_kses_post($solution); ?>
                    </div>
                  <?php endif; ?>
                  <div class="case-study__clearfix"></div>
                </div>
              </div>
            </div>
          <?php endif; ?>
        </div>

        <?php if ($top_quote) : ?>
          <div class="case-study__results case-study__noBorder case-study__topQuote">
            <div class="case-study__container">
              <div class="case-study__quote-text">
                <?php
                // Decode HTML entities first (in case content is double-escaped)
                $decoded_quote = html_entity_decode($top_quote, ENT_QUOTES | ENT_HTML5, 'UTF-8');
                // Remove inline styles
                $clean_quote = preg_replace('/style\s*=\s*["\'][^"\']*["\']/i', '', $decoded_quote);
                // Output with proper sanitization - wp_kses_post will handle HTML properly
                echo wp_kses_post($clean_quote);
                ?>
              </div>
            </div>
          </div>
        <?php endif; ?>

        <?php if ($results) : ?>
          <div class="case-study__results">
            <div class="case-study__container">
              <h3><?php esc_html_e('Results', 'aera'); ?></h3>
              <div class="case-study__resultsContent">
                <?php echo wp_kses_post($results); ?>
              </div>
            </div>
          </div>
        <?php endif; ?>
      </div>
    </div>

  </main>

<?php
endwhile;

get_footer();
