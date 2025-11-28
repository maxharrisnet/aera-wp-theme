<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package Aera_Technology
 */

get_header();
?>

<main id="primary" class="site-main">
	<?php
	if ( 'blog' === get_post_type() ) :
		while ( have_posts() ) :
			the_post();
			?>
			<div class="blog-article">
				<div class="blog-article__container">
					<div class="blog-article__row">
						<div class="blog-article__left">
							<?php get_template_part( 'template-parts/content', get_post_type() ); ?>
						</div>
						<div class="blog-article__right">
							<?php
							// Author section (if multiple authors)
							get_template_part('template-parts/content', 'blog-author');
							?>

							<?php
							// Social sharing section
							get_template_part('template-parts/content', 'blog-share');
							?>

							<?php
							// Related posts section (full list)
							get_template_part('template-parts/content', 'blog-related');
							?>

							<?php
							// Related posts sidebar (just the "Other Resources" links)
							get_template_part('template-parts/content', 'blog-related-sidebar');
							?>
						</div>
					</div>
				</div>
			</div>
			<?php
		endwhile;
	else :
		while ( have_posts() ) :
			the_post();
			get_template_part( 'template-parts/content', get_post_type() );
		endwhile;
		get_sidebar();
	endif;
	?>
</main>

<?php
get_footer();
