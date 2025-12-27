<?php

/**
 * Template Name: Platform Detail Page
 *
 * Template for displaying platform detail pages (sub-pages of Decision Cloud)
 *
 * @package Aera_Technology
 */

get_header();

while (have_posts()) :
  the_post();

  // Get optional lead text from ACF field
  $lead_text = function_exists('get_field') ? (string) get_field('page_lead') : '';
  $lead_paragraphs = array_values(array_filter(array_map('trim', preg_split('/\r\n|\r|\n/', $lead_text ?? ''))));

  // Get date (optional, can be hidden via ACF or use post date)
  $show_date = function_exists('get_field') ? get_field('page_show_date') : true;
  $date_value = get_the_date('c');
  $display_date = get_the_date();

  // Get module template page fields
  $body_copy = function_exists('get_field') ? get_field('platform_body_copy') : '';
  $benefits = function_exists('get_field') ? get_field('platform_benefits') : '';
  $features = function_exists('get_field') ? get_field('platform_features') : '';
  $featured_image = function_exists('get_field') ? get_field('platform_featured_image') : null;

  // Determine if we should show not found message (no content exists)
  $has_content = !empty($body_copy) || !empty($benefits) || !empty($features) || !empty($featured_image) || !empty(get_the_content());
?>

	<main id="primary" class="site-main site-main--platform-detail">
		<?php get_template_part('template-parts/components/hero'); ?>

		<?php if (!$has_content) : ?>
			<?php
			get_template_part('template-parts/components/module-not-found');
			?>
		<?php else : ?>
			<?php
			// Use module template page if we have the required fields, otherwise use standard template-page
			if (!empty($body_copy) || !empty($benefits) || !empty($features) || !empty($featured_image)) :
			?>
				<div class="platformnew">
					<div class="platformnew__wrapper">
						<div class="platformnew__right">
							<?php
							get_template_part(
								'template-parts/components/module-template-page',
								null,
								array(
									'body_copy'     => $body_copy,
									'benefits'      => $benefits,
									'features'      => $features,
									'featured_image' => $featured_image,
								)
							);
							?>
						</div>
						<div class="platformnew__clearfix"></div>
					</div>
					<div class="platformnew__clearfix"></div>
				</div>
			<?php else : ?>
				<article id="post-<?php the_ID(); ?>" <?php post_class('template-page'); ?>>
					<div class="template-page__container">
						<div class="template-page__row">
							<div class="template-page__col">
								<header class="template-page__header">
									<?php if ($show_date && $display_date) : ?>
										<p class="template-page__date">
											<time datetime="<?php echo esc_attr($date_value); ?>">
												<?php echo esc_html($display_date); ?>
											</time>
										</p>
									<?php endif; ?>

									<?php the_title('<h1 class="template-page__title">', '</h1>'); ?>

									<?php if (!empty($lead_paragraphs)) : ?>
										<?php foreach ($lead_paragraphs as $paragraph) : ?>
											<p class="template-page__lead">
												<?php echo esc_html($paragraph); ?>
											</p>
										<?php endforeach; ?>
									<?php endif; ?>
								</header>

								<section class="template-page__content">
									<?php
									the_content();

									wp_link_pages(
										array(
											'before' => '<div class="page-links">' . esc_html__('Pages:', 'aera'),
											'after'  => '</div>',
										)
									);
									?>
								</section>
							</div>
						</div>
					</div>
				</article><!-- #post-<?php the_ID(); ?> -->
			<?php endif; ?>
		<?php endif; ?>
	</main>

<?php
endwhile; // End of the loop.

get_footer();
