<?php
/**
 * Fix Blog Card Images After Import
 *
 * This script fixes card images for blog posts that were imported from Contentful.
 * It ensures that card images are properly set in the ACF resource_card_image field.
 *
 * Usage: wp eval-file scripts/fix-blog-card-images.php
 */

// Get all blog posts
$blog_posts = get_posts([
    'post_type' => 'blog',
    'posts_per_page' => -1,
    'post_status' => 'any',
]);

$fixed = 0;
$skipped = 0;
$errors = 0;

foreach ($blog_posts as $post) {
    $post_id = $post->ID;
    $title = $post->post_title;

    // Get current card image
    $current_card_image = get_field('resource_card_image', $post_id);
    $featured_image_id = get_post_thumbnail_id($post_id);

    // Skip if card image is already set and different from featured
    if ($current_card_image && $current_card_image != $featured_image_id) {
        $skipped++;
        continue;
    }

    // Check if there's a card image attachment as a child of this post
    $attachments = get_children([
        'post_parent' => $post_id,
        'post_type' => 'attachment',
        'post_mime_type' => 'image',
        'numberposts' => -1,
    ]);

    // Look for card image attachment (title contains "card image")
    $card_attachment = null;
    foreach ($attachments as $attachment) {
        if (stripos($attachment->post_title, 'card image') !== false) {
            $card_attachment = $attachment;
            break;
        }
    }

    // If we found a card attachment and it's different from featured, set it
    if ($card_attachment && $card_attachment->ID != $featured_image_id) {
        update_field('resource_card_image', $card_attachment->ID, $post_id);
        echo "✓ Fixed: {$title} (Post ID: {$post_id}, Card Image ID: {$card_attachment->ID})\n";
        $fixed++;
    } else {
        echo "⚠ Skipped: {$title} (Post ID: {$post_id}) - No card image attachment found\n";
        $errors++;
    }
}

echo "\n";
echo "Summary:\n";
echo "  Fixed: {$fixed}\n";
echo "  Skipped (already correct): {$skipped}\n";
echo "  Errors (no card image found): {$errors}\n";
