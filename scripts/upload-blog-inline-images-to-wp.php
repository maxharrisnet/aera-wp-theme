<?php
/**
 * Upload pre-downloaded blog inline images to WordPress Media Library.
 *
 * Use after: node scripts/download-blog-inline-cdn-images.js cdn-urls.txt
 * Then run: wp eval-file scripts/fix-blog-inline-cdn-images.php -- --no-download
 *
 * Usage: wp eval-file scripts/upload-blog-inline-images-to-wp.php
 */

$inline_images_dir = __DIR__ . '/../_ORIGINAL_FILES/blog-inline-images';

if (!is_dir($inline_images_dir)) {
    echo "Directory not found: {$inline_images_dir}\n";
    echo "Run first: wp eval-file .../fix-blog-inline-cdn-images.php list_missing > cdn-urls.txt\n";
    echo "Then: node scripts/download-blog-inline-cdn-images.js cdn-urls.txt\n";
    exit(1);
}

require_once ABSPATH . 'wp-admin/includes/file.php';
require_once ABSPATH . 'wp-admin/includes/media.php';
require_once ABSPATH . 'wp-admin/includes/image.php';

$files = array_diff(scandir($inline_images_dir), ['.', '..']);
$uploaded = 0;
$skipped = 0;

foreach ($files as $file) {
    $file_path = $inline_images_dir . '/' . $file;
    if (!is_file($file_path)) {
        continue;
    }

    global $wpdb;
    $like = $wpdb->esc_like($file);
    $existing = get_posts([
        'post_type' => 'attachment',
        'post_mime_type' => 'image',
        'meta_query' => [
            [
                'key' => '_wp_attached_file',
                'value' => '%' . $like . '%',
                'compare' => 'LIKE',
            ],
        ],
        'posts_per_page' => 1,
    ]);

    if (!empty($existing)) {
        echo "✓ Exists: {$file} (ID: {$existing[0]->ID})\n";
        $skipped++;
        continue;
    }

    $upload = wp_upload_bits($file, null, file_get_contents($file_path));
    if (!empty($upload['error'])) {
        echo "✗ Failed: {$file} - {$upload['error']}\n";
        continue;
    }

    $attachment_id = wp_insert_attachment([
        'post_mime_type' => $upload['type'],
        'post_title' => sanitize_file_name(pathinfo($file, PATHINFO_FILENAME)),
        'post_content' => '',
        'post_status' => 'inherit',
    ], $upload['file']);

    if (is_wp_error($attachment_id)) {
        echo "✗ Insert failed: {$file}\n";
        continue;
    }

    $meta = wp_generate_attachment_metadata($attachment_id, $upload['file']);
    if ($meta) {
        wp_update_attachment_metadata($attachment_id, $meta);
    }
    echo "✓ Uploaded: {$file} (ID: {$attachment_id})\n";
    $uploaded++;
}

echo "\nDone. Uploaded: {$uploaded}, already in library: {$skipped}\n";
echo "Run: wp eval-file .../fix-blog-inline-cdn-images.php no_download\n";
