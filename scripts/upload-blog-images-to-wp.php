<?php
/**
 * Upload Blog Images to WordPress Media Library
 *
 * This script uploads pre-downloaded blog images to WordPress media library
 * and creates a mapping file to update the WXR file with WordPress attachment URLs.
 *
 * Usage: wp eval-file scripts/upload-blog-images-to-wp.php
 */

$blog_images_dir = __DIR__ . '/../_ORIGINAL_FILES/blog-images';
$author_images_dir = __DIR__ . '/../_ORIGINAL_FILES/blog-author-images';
$mapping_file = __DIR__ . '/../_ORIGINAL_FILES/image-url-mapping.json';

if (!file_exists($blog_images_dir)) {
    echo "❌ Blog images directory not found: {$blog_images_dir}\n";
    echo "Please run: node scripts/download-blog-images.js\n";
    exit(1);
}

require_once(ABSPATH . 'wp-admin/includes/file.php');
require_once(ABSPATH . 'wp-admin/includes/media.php');
require_once(ABSPATH . 'wp-admin/includes/image.php');

$mapping = [];

// Upload blog images (featured and card images)
if (is_dir($blog_images_dir)) {
    $files = array_diff(scandir($blog_images_dir), ['.', '..']);
    foreach ($files as $file) {
        $file_path = $blog_images_dir . '/' . $file;
        if (is_file($file_path)) {
            // Check if already uploaded
            $existing = get_posts([
                'post_type' => 'attachment',
                'post_mime_type' => 'image',
                'meta_query' => [
                    [
                        'key' => '_wp_attached_file',
                        'value' => basename($file),
                        'compare' => 'LIKE'
                    ]
                ],
                'posts_per_page' => 1
            ]);

            if (!empty($existing)) {
                $attachment_id = $existing[0]->ID;
                $attachment_url = wp_get_attachment_url($attachment_id);
                echo "✓ Already exists: {$file} (ID: {$attachment_id})\n";
            } else {
                // Upload file
                $upload = wp_upload_bits($file, null, file_get_contents($file_path));

                if (!$upload['error']) {
                    $attachment = [
                        'post_mime_type' => $upload['type'],
                        'post_title' => sanitize_file_name(pathinfo($file, PATHINFO_FILENAME)),
                        'post_content' => '',
                        'post_status' => 'inherit'
                    ];

                    $attachment_id = wp_insert_attachment($attachment, $upload['file']);

                    if (!is_wp_error($attachment_id)) {
                        $attach_data = wp_generate_attachment_metadata($attachment_id, $upload['file']);
                        wp_update_attachment_metadata($attachment_id, $attach_data);

                        $attachment_url = wp_get_attachment_url($attachment_id);
                        echo "✓ Uploaded: {$file} (ID: {$attachment_id})\n";
                    } else {
                        echo "✗ Failed to create attachment: {$file}\n";
                        continue;
                    }
                } else {
                    echo "✗ Upload failed: {$file} - {$upload['error']}\n";
                    continue;
                }
            }

            // Store mapping: filename -> WordPress URL
            $mapping[basename($file)] = [
                'attachment_id' => $attachment_id,
                'url' => $attachment_url,
                'type' => 'blog'
            ];
        }
    }
}

// Upload author images
if (is_dir($author_images_dir)) {
    $files = array_diff(scandir($author_images_dir), ['.', '..']);
    foreach ($files as $file) {
        $file_path = $author_images_dir . '/' . $file;
        if (is_file($file_path)) {
            // Check if already uploaded
            $existing = get_posts([
                'post_type' => 'attachment',
                'post_mime_type' => 'image',
                'meta_query' => [
                    [
                        'key' => '_wp_attached_file',
                        'value' => basename($file),
                        'compare' => 'LIKE'
                    ]
                ],
                'posts_per_page' => 1
            ]);

            if (!empty($existing)) {
                $attachment_id = $existing[0]->ID;
                $attachment_url = wp_get_attachment_url($attachment_id);
                echo "✓ Already exists: {$file} (ID: {$attachment_id})\n";
            } else {
                // Upload file
                $upload = wp_upload_bits($file, null, file_get_contents($file_path));

                if (!$upload['error']) {
                    $attachment = [
                        'post_mime_type' => $upload['type'],
                        'post_title' => sanitize_file_name(pathinfo($file, PATHINFO_FILENAME)),
                        'post_content' => '',
                        'post_status' => 'inherit'
                    ];

                    $attachment_id = wp_insert_attachment($attachment, $upload['file']);

                    if (!is_wp_error($attachment_id)) {
                        $attach_data = wp_generate_attachment_metadata($attachment_id, $upload['file']);
                        wp_update_attachment_metadata($attachment_id, $attach_data);

                        $attachment_url = wp_get_attachment_url($attachment_id);
                        echo "✓ Uploaded: {$file} (ID: {$attachment_id})\n";
                    } else {
                        echo "✗ Failed to create attachment: {$file}\n";
                        continue;
                    }
                } else {
                    echo "✗ Upload failed: {$file} - {$upload['error']}\n";
                    continue;
                }
            }

            // Store mapping: filename -> WordPress URL
            $mapping[basename($file)] = [
                'attachment_id' => $attachment_id,
                'url' => $attachment_url,
                'type' => 'author'
            ];
        }
    }
}

// Save mapping file
file_put_contents($mapping_file, json_encode($mapping, JSON_PRETTY_PRINT));

echo "\n✅ Upload complete!\n";
echo "📁 Mapping saved to: {$mapping_file}\n";
echo "📊 Total images uploaded: " . count($mapping) . "\n";
echo "\nNext step: Update WXR file to use WordPress URLs\n";
