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

  // Prepare hero data
  $hero_args = array(
    'hero_title' => get_the_title(),
    'hero_text' => get_field('resource_excerpt') ?: get_the_excerpt(),
  );

?>

  <main id="primary" class="site-main site-main--case-study">

    <?php get_template_part('template-parts/components/hero', null, $hero_args); ?>

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
            <?php echo wp_kses_post($top_quote); ?>
          </div>
        <?php endif; ?>

        <?php if ($results) : ?>
          <div class="case-study__results">
            <h3><?php esc_html_e('Results', 'aera'); ?></h3>
            <div class="case-study__resultsContent">
              <?php echo wp_kses_post($results); ?>
            </div>
          </div>
        <?php endif; ?>
      </div>
    </div>

  </main>

<?php
endwhile;

get_footer();
