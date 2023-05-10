<?php
/**
 * The sidebar containing the main widget area
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Aera
 */

if ( ! is_active_sidebar( 'aera-sidebar' ) ) {
	return;
}
?>

<div class="col-12 col-lg-4">
    <div class="aera-blog--sidebar">
		<?php dynamic_sidebar( 'aera-sidebar' ); ?>
    </div>
</div>

