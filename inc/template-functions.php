<?php
/**
 * Functions which enhance the theme by hooking into WordPress
 *
 * @package Aera_Technology
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function aera_technology_body_classes( $classes ) {
	// Adds a class of hfeed to non-singular pages.
	if ( ! is_singular() ) {
		$classes[] = 'hfeed';
	}

	// Adds a class of no-sidebar when there is no sidebar present.
	if ( ! is_active_sidebar( 'sidebar-1' ) ) {
		$classes[] = 'no-sidebar';
	}

	return $classes;
}
add_filter( 'body_class', 'aera_technology_body_classes' );

/**
 * Add a pingback url auto-discovery header for single posts, pages, or attachments.
 */
function aera_technology_pingback_header() {
	if ( is_singular() && pings_open() ) {
		printf( '<link rel="pingback" href="%s">', esc_url( get_bloginfo( 'pingback_url' ) ) );
	}
}
add_action( 'wp_head', 'aera_technology_pingback_header' );

/**
 * Remove "Archive:" prefix from archive titles and strip HTML tags.
 *
 * @param string $title Archive title.
 * @return string Cleaned archive title.
 */
function aera_clean_archive_title( $title ) {
	if ( is_archive() ) {
		// Remove "Archives:" or "Archive:" prefix (case insensitive)
		$title = preg_replace( '/^Archives?\s*:\s*/i', '', $title );

		// Strip all HTML tags and decode entities
		$title = wp_strip_all_tags( $title );
		$title = html_entity_decode( $title, ENT_QUOTES, get_bloginfo( 'charset' ) );

		// Trim whitespace
		$title = trim( $title );
	}

	return $title;
}
add_filter( 'get_the_archive_title', 'aera_clean_archive_title', 10, 1 );
