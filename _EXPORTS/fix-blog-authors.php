<?php
/**
 * Fix blog post authors - restore from post meta if available
 *
 * This script checks if there's author information stored in post meta
 * and can help restore it. Run with: wp eval-file _EXPORTS/fix-blog-authors.php
 *
 * WARNING: This is a diagnostic script. Review the output before making changes.
 */

echo "🔍 Checking for author information in post meta...\n\n";

$blog_posts = get_posts(array(
    'post_type' => 'blog',
    'posts_per_page' => 20, // Check first 20
    'post_status' => 'any',
));

$found_meta_authors = array();

foreach ($blog_posts as $post) {
    $current_author_id = $post->post_author;
    $current_author = get_user_by('ID', $current_author_id);
    $current_author_name = $current_author ? $current_author->display_name : "User ID $current_author_id";

    // Check for any author-related meta
    $all_meta = get_post_meta($post->ID);

    echo "Post ID {$post->ID}: \"{$post->post_title}\"\n";
    echo "  Current author: $current_author_name (ID: $current_author_id)\n";

    // Look for author-related meta keys
    $author_meta_keys = array();
    foreach ($all_meta as $key => $value) {
        if (stripos($key, 'author') !== false) {
            $author_meta_keys[$key] = $value;
        }
    }

    if (!empty($author_meta_keys)) {
        echo "  Found author-related meta:\n";
        foreach ($author_meta_keys as $key => $value) {
            echo "    - $key: " . (is_array($value) ? print_r($value, true) : $value[0]) . "\n";
        }
    } else {
        echo "  No author-related meta found\n";
    }
    echo "\n";
}

echo "\n💡 If authors were changed, you may need to:\n";
echo "1. Check your database backup for original post_author values\n";
echo "2. Or re-import the blog posts with correct authors\n";
echo "3. Or manually update authors in WordPress admin\n";
