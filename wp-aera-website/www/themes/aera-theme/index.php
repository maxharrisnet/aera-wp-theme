<?php
/**
 * Index Page
 *
 * @package aera
 * @since 1.0
 *
 */

get_header();

$paged = get_query_var( 'paged' ) ? absint( get_query_var( 'paged' ) ) : 1;
$term  = get_query_var( 's' );

$args = array(
	'post_type' => 'post',
	'paged'     => $paged,
);

if ( is_search() ) {
	$args['s'] = $term;
}

$posts = new WP_Query( $args );

if ( $posts->have_posts() ) :
	get_template_part( 'template-parts/blog', 'list' );
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