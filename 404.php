<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package Aera_Technology
 */

get_header();
?>

<main id="primary" class="site-main">
	<div class="blognotFound">
		<div class="blognotFound__container">
			<div class="blognotFound__row">
				<div class="blognotFound__col">
					<div class="blognotFound__content">
						<h1 class="blognotFound__title"><?php esc_html_e('Page not found.', 'aera'); ?></h1>
						<p class="blognotFound__subline"><?php esc_html_e('It is possible that the page has moved or changed or may no longer be available. Please check the page address and try again.', 'aera'); ?></p>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>

<?php
get_footer();
