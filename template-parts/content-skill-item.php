<?php
/**
 * Template part for displaying skill items in archive
 *
 * @package Aera_Technology
 */

defined('ABSPATH') || exit;

$post_id = get_the_ID();
$permalink = get_permalink($post_id);
$title = get_the_title($post_id);
$excerpt = get_the_excerpt($post_id);

// Get ACF fields
$skill_icon = function_exists('get_field') ? get_field('skill_icon', $post_id) : '';
$skill_tagline = function_exists('get_field') ? get_field('skill_tagline', $post_id) : '';
?>

<div class="skills__item">
  <a href="<?php echo esc_url($permalink); ?>" class="skills__itemLink">
    <?php if ($skill_icon && !empty($skill_icon['url'])) : ?>
      <div class="skills__itemIcon">
        <img src="<?php echo esc_url($skill_icon['url']); ?>" alt="<?php echo esc_attr($skill_icon['alt'] ?? $title); ?>" />
      </div>
    <?php endif; ?>
    <h3 class="skills__itemTitle"><?php echo esc_html($title); ?></h3>
    <?php if ($skill_tagline) : ?>
      <p class="skills__itemTagline"><?php echo esc_html($skill_tagline); ?></p>
    <?php elseif ($excerpt) : ?>
      <p class="skills__itemExcerpt"><?php echo esc_html(wp_strip_all_tags($excerpt)); ?></p>
    <?php endif; ?>
  </a>
</div>

