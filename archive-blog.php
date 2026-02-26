<?php
/**
 * The template for displaying blog archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Aera_Technology
 */

get_header();
?>

<main id="primary" class="site-main">
	<div class="blog">
		<div class="blog__container">
			<h3><?php esc_html_e('Recent Articles', 'aera'); ?></h3>
			<div>
				<?php if (have_posts()) : ?>
					<div class="blog__list">
						<div class="blog__col">
							<?php
							while (have_posts()) :
								the_post();
								get_template_part('template-parts/content', 'blog-item');
							endwhile;
							?>
						</div>
					</div>

					<?php
					the_posts_navigation(
						array(
							'prev_text' => __('&larr; Older posts', 'aera'),
							'next_text' => __('Newer posts &rarr;', 'aera'),
						)
					);
					?>

				<?php else : ?>
					<div class="blog__list">
						<div class="blog__col">
							<p><?php esc_html_e('No blog posts found.', 'aera'); ?></p>
						</div>
					</div>
				<?php endif; ?>
			</div>

			<div class="blog__sidebar">
				<h3><?php esc_html_e('Other Resources', 'aera'); ?></h3>
				<ul>
					<li>
						<a href="<?php echo esc_url(get_permalink(get_page_by_path('what-is-decision-intelligence')) ?: '#'); ?>">
							<?php esc_html_e('What is Decision Intelligence?', 'aera'); ?>
						</a>
					</li>
					<li>
						<a href="<?php echo esc_url(get_post_type_archive_link('news') ?: '#'); ?>">
							<?php esc_html_e('News', 'aera'); ?>
						</a>
					</li>
					<li>
						<a href="<?php echo esc_url(get_post_type_archive_link('press-release') ?: '#'); ?>">
							<?php esc_html_e('Press Releases', 'aera'); ?>
						</a>
					</li>
					<li>
						<a href="<?php echo esc_url(get_post_type_archive_link('video') ?: '#'); ?>">
							<?php esc_html_e('Videos', 'aera'); ?>
						</a>
					</li>
					<li>
						<a href="<?php echo esc_url(get_post_type_archive_link('whitepaper') ?: '#'); ?>">
							<?php esc_html_e('Whitepapers', 'aera'); ?>
						</a>
					</li>
					<li>
						<a href="<?php echo esc_url(get_post_type_archive_link('blog') ?: '#'); ?>">
							<?php esc_html_e('Blogs', 'aera'); ?>
						</a>
					</li>
					<li>
						<a href="<?php echo esc_url(get_post_type_archive_link('case-study') ?: '#'); ?>">
							<?php esc_html_e('Case Studies', 'aera'); ?>
						</a>
					</li>
					<li>
						<a href="<?php echo esc_url(get_post_type_archive_link('podcast') ?: '#'); ?>">
							<?php esc_html_e('Podcasts', 'aera'); ?>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</main>

<?php
get_footer();

