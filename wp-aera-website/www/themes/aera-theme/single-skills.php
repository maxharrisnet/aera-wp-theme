<?php
/**
 * Single Skill page
 */

get_header();

while ( have_posts() ) :
	the_post();

	$post_id = get_the_ID();
	get_template_part( 'template-parts/skills', 'single' );

endwhile;

wp_reset_postdata();

get_footer();


