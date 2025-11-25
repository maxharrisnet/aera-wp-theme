<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Aera_Technology
 */

get_header();

while ( have_posts() ) :
	the_post();

	// Get optional lead text from ACF field
	$lead_text = function_exists('get_field') ? (string) get_field('page_lead') : '';
	$lead_paragraphs = array_values(array_filter(array_map('trim', preg_split('/\r\n|\r|\n/', $lead_text ?? ''))));

	// Get date (optional, can be hidden via ACF or use post date)
	$show_date = function_exists('get_field') ? get_field('page_show_date') : true;
	$date_value = get_the_date('c');
	$display_date = get_the_date();
	?>

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

	<?php
	// If comments are open or we have at least one comment, load up the comment template.
	if ( comments_open() || get_comments_number() ) :
		comments_template();
	endif;

endwhile; // End of the loop.

get_footer();
