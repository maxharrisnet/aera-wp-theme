<?php
/**
 * Template part for displaying blog items in archive
 *
 * @package Aera_Technology
 */

defined('ABSPATH') || exit;

$post_id = get_the_ID();
$permalink = get_permalink($post_id);
$title = get_the_title($post_id);

// Get card image from ACF field, fallback to featured image
$card_image = '';
if (function_exists('get_field')) {
	$card_image_data = get_field('resource_card_image', $post_id);
	if ($card_image_data && !empty($card_image_data['url'])) {
		$card_image = sprintf(
			'<img src="%1$s" alt="%2$s" loading="lazy" />',
			esc_url($card_image_data['url']),
			esc_attr($card_image_data['alt'] ?? $title)
		);
	}
}

// Use card image if available, otherwise featured image
if (!$card_image) {
	$thumbnail = get_the_post_thumbnail($post_id, 'medium');
	if ($thumbnail) {
		$card_image = $thumbnail;
	}
}

// Get author - use WordPress post author
$author = '';
$author_id = get_post_field('post_author', $post_id);
if ($author_id) {
	$author = get_the_author_meta('display_name', $author_id);
	if (empty($author)) {
		$author = get_the_author_meta('user_login', $author_id);
	}
}
?>

<div class="blogItem">
	<div class="blogItem__row">
		<div class="blogItem__boxWrapper">
			<a href="<?php echo esc_url($permalink); ?>">
				<?php if ($card_image) : ?>
					<?php echo $card_image; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				<?php endif; ?>
				<?php if ($author) : ?>
					<p class="blogItem__author">
						<?php echo esc_html($author); ?>
					</p>
				<?php endif; ?>
				<h3 class="blogItem__title"><?php echo esc_html($title); ?></h3>
			</a>
		</div>
	</div>
</div>

