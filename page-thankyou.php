<?php

/**
 * Template Name: Thank You
 *
 * Thank you page shown after form submissions (e.g. contact, demo).
 * Uses the hero component. Set hero fields on this page or leave blank for defaults.
 *
 * To get URL /thankyou/: create a Page with slug "thankyou" and assign this template.
 *
 * @package Aera_Technology
 */

get_header();

// Hero uses ACF on this page when set; otherwise these defaults
$hero_title = function_exists('get_field') ? get_field('hero_title') : '';
$hero_text  = function_exists('get_field') ? get_field('hero_text') : '';
if (empty($hero_title)) {
  $hero_title = __('Thanks for your interest in Aera!', 'aera');
}
if (empty($hero_text)) {
  $hero_text = __('We will be in touch shortly.', 'aera');
}

$hero_args = array(
  'hero_title' => $hero_title,
  'hero_text'  => $hero_text,
);
?>

<main id="primary" class="site-main site-main--thankyou">
  <?php get_template_part('template-parts/components/hero', null, $hero_args); ?>
</main>

<?php
get_footer();
