<?php
/**
 * Category Template
 */

get_header();

if ( have_posts() ) :
	get_template_part( 'template-parts/blog', 'list-category' );
else : ?>
    <div class="aera-blog--wrapper aera-blog--search-page">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h3 class="aera-blog--search-page__title"><?php esc_html_e( 'Sorry, no posts matched your criteria.', 'aera' ); ?></h3>
                    <div class="aera-blog--search-page__search-form">
						<?php get_search_form( true ); ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
<?php endif;

get_footer();