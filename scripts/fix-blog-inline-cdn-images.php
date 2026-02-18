<?php
/**
 * Fix Inline CDN Images in Blog Posts (CPT: blog)
 *
 * Finds blog posts whose post_content contains Contentful CDN URLs
 * (https://images.ctfassets.net/...), resolves each to a WordPress
 * media URL (existing attachment by filename or download + add to media),
 * then replaces URLs in post_content.
 *
 * Usage (from WordPress root; args after script path are passed to the script):
 *   # Dry run (report only, no changes):
 *   wp eval-file wp-content/themes/aera-technology/scripts/fix-blog-inline-cdn-images.php dry_run
 *
 *   # Fix posts, download missing images and add to media library:
 *   wp eval-file wp-content/themes/aera-technology/scripts/fix-blog-inline-cdn-images.php
 *
 *   # Fix posts, but skip downloading (only replace where attachment exists):
 *   wp eval-file wp-content/themes/aera-technology/scripts/fix-blog-inline-cdn-images.php no_download
 *
 *   # Output missing CDN URLs (one per line) for pre-downloading, then exit:
 *   wp eval-file wp-content/themes/aera-technology/scripts/fix-blog-inline-cdn-images.php list_missing
 *
 *   # Process all post types (not just blog) – fixes protocol-relative //images... in pages, etc.:
 *   wp eval-file wp-content/themes/aera-technology/scripts/fix-blog-inline-cdn-images.php all_posts
 *   (Combine with dry_run or no_download as needed.)
 */

if (!defined('ABSPATH')) {
    // When run directly: cd to theme dir first, then php scripts/fix-blog-inline-cdn-images.php
    $wp_load = dirname(__DIR__, 3) . '/wp-load.php';
    if (!is_file($wp_load)) {
        $wp_load = dirname(__DIR__, 4) . '/wp-load.php';
    }
    if (is_file($wp_load)) {
        require_once $wp_load;
    }
}

// Parse CLI args: WP-CLI passes them as $args; use words (no dashes) so WP-CLI doesn't eat them
if (isset($args) && is_array($args)) {
    $cli_args = $args;
} elseif (isset($argv) && is_array($argv)) {
    $cli_args = array_slice($argv, 1);
} else {
    $cli_args = [];
}
$dry_run = in_array('dry_run', $cli_args, true);
$no_download = in_array('no_download', $cli_args, true);
$list_missing = in_array('list_missing', $cli_args, true);
$all_posts = in_array('all_posts', $cli_args, true);
if ($list_missing) {
    $no_download = true; // Collect missing URLs only, no downloads
}

// Match CDN URLs in multiple forms
// 1. Normal: https://images.ctfassets.net/... (allow newlines in path)
$cdn_regex_normal = '#https?://images\.ctfassets\.net/[^"\'<>]+#';
// 2. JSON form in block editor: https:\/\/images.ctfassets.net\/...
$cdn_regex_json   = '#https?:\\\\/\\\\/images\.ctfassets\.net(?:\\\\/[^"\'<>]+)+#';
// 3. Fallback: protocol-relative or anything containing the domain until " or ' or <
$cdn_regex_fallback = '#(?:https?:)?//images\.ctfassets\.net/[^"\'<>]+#';

/**
 * Extract filename from CDN URL (after last slash).
 *
 * @param string $url CDN URL
 * @return string Filename only, or empty
 */
function get_filename_from_cdn_url($url) {
    $url = str_replace('\\/', '/', $url); // JSON-escaped slashes
    $path = wp_parse_url($url, PHP_URL_PATH);
    if (!$path) {
        return '';
    }
    $parts = explode('/', trim($path, '/'));
    $filename = end($parts);
    $filename = strtok($filename, '?');
    return $filename ? trim($filename) : '';
}

/**
 * Find attachment ID by filename (WordPress may store as "year/month/filename" or "filename").
 *
 * @param string $filename Basename only
 * @return int|null Attachment ID or null
 */
function find_attachment_by_filename($filename) {
    if (!$filename) {
        return null;
    }
    global $wpdb;
    $like = $wpdb->esc_like($filename);
    $ids = $wpdb->get_col($wpdb->prepare(
        "SELECT post_id FROM {$wpdb->postmeta} WHERE meta_key = '_wp_attached_file' AND meta_value LIKE %s",
        '%' . $like . '%'
    ));
    if (empty($ids)) {
        return null;
    }
    // Prefer exact match on basename, then first result
    foreach ($ids as $id) {
        $file = get_post_meta((int) $id, '_wp_attached_file', true);
        if ($file && basename($file) === $filename) {
            return (int) $id;
        }
    }
    return (int) $ids[0];
}

/**
 * Download image from CDN and add to WordPress media library.
 *
 * @param string $cdn_url Full CDN URL
 * @param string $filename Filename to use
 * @return array{url: string, attachment_id: int}|array{error: string}
 */
/**
 * Normalize a CDN URL (possibly with JSON backslashes or newlines) for fetching.
 *
 * @param string $url Raw URL as stored in content
 * @return string Clean URL valid for wp_remote_get
 */
function normalize_cdn_url_for_fetch($url) {
    $url = trim($url);
    $url = str_replace(["\r", "\n", "\t", " "], '', $url);
    $url = str_replace('\\/', '/', $url);
    $url = str_replace('\\', '/', $url); // any remaining backslashes
    if (preg_match('#^//#', $url)) {
        $url = 'https:' . $url;
    }
    return $url;
}

function download_and_attach($cdn_url, $filename) {
    $fetch_url = normalize_cdn_url_for_fetch($cdn_url);
    if (!preg_match('#^https?://#', $fetch_url)) {
        return ['error' => 'Invalid URL after normalize'];
    }
    $fetch_url = esc_url_raw($fetch_url, ['https', 'http']);
    if (empty($fetch_url)) {
        return ['error' => 'URL rejected by esc_url_raw'];
    }
    $response = wp_remote_get($fetch_url, [
        'timeout' => 30,
        'redirection' => 5,
        'user-agent' => 'WordPress/Aera-Blog-Image-Migration',
    ]);

    if (is_wp_error($response)) {
        return ['error' => $response->get_error_message()];
    }

    $code = wp_remote_retrieve_response_code($response);
    if ($code !== 200) {
        return ['error' => "HTTP {$code}"];
    }

    $body = wp_remote_retrieve_body($response);
    if (empty($body)) {
        return ['error' => 'Empty response'];
    }

    $upload = wp_upload_bits($filename, null, $body);
    if (!empty($upload['error'])) {
        return ['error' => $upload['error']];
    }

    $attachment = [
        'post_mime_type' => $upload['type'],
        'post_title' => sanitize_file_name(pathinfo($filename, PATHINFO_FILENAME)),
        'post_content' => '',
        'post_status' => 'inherit',
    ];

    $attachment_id = wp_insert_attachment($attachment, $upload['file']);
    if (is_wp_error($attachment_id)) {
        return ['error' => $attachment_id->get_error_message()];
    }

    require_once ABSPATH . 'wp-admin/includes/image.php';
    $meta = wp_generate_attachment_metadata($attachment_id, $upload['file']);
    if ($meta) {
        wp_update_attachment_metadata($attachment_id, $meta);
    }

    return [
        'url' => wp_get_attachment_url($attachment_id),
        'attachment_id' => $attachment_id,
    ];
}

// --- Main ---
// Find posts containing the CDN domain in post_content or post_excerpt
global $wpdb;
$like = $wpdb->esc_like('images.ctfassets.net');
if ($all_posts) {
    $posts_with_cdn = $wpdb->get_col($wpdb->prepare(
        "SELECT ID FROM {$wpdb->posts} WHERE post_status != 'trash'
         AND (post_content LIKE %s OR post_excerpt LIKE %s) ORDER BY ID",
        '%' . $like . '%',
        '%' . $like . '%'
    ));
} else {
    $posts_with_cdn = $wpdb->get_col($wpdb->prepare(
        "SELECT ID FROM {$wpdb->posts} WHERE post_type = 'blog' AND post_status != 'trash'
         AND (post_content LIKE %s OR post_excerpt LIKE %s) ORDER BY ID",
        '%' . $like . '%',
        '%' . $like . '%'
    ));
}
$posts_with_cdn = array_map('intval', $posts_with_cdn);

$type_label = $all_posts ? 'Posts (all types) with CDN URLs in content' : 'Blog posts with CDN URLs in content';
echo $type_label . ': ' . count($posts_with_cdn) . "\n";
if (!empty($posts_with_cdn)) {
    echo "\nPosts:\n";
    foreach ($posts_with_cdn as $post_id) {
        $post_type = get_post_type($post_id);
        $title = get_the_title($post_id);
        echo "  - [ID {$post_id}] [{$post_type}] " . $title . "\n";
    }
    echo "\n";
}
if (empty($posts_with_cdn)) {
    exit(0);
}

// Collect all unique CDN URLs
$cdn_to_wp = [];
$missing = [];
$errors = [];

foreach ($posts_with_cdn as $post_id) {
    $content = get_post_field('post_content', $post_id);
    $excerpt = get_post_field('post_excerpt', $post_id);
    $combined = ($content ?? '') . "\n" . ($excerpt ?? '');
    $urls = [];
    if (preg_match_all($cdn_regex_normal, $combined, $m)) {
        $urls = array_merge($urls, $m[0]);
    }
    if (preg_match_all($cdn_regex_json, $combined, $m)) {
        $urls = array_merge($urls, $m[0]);
    }
    if (preg_match_all($cdn_regex_fallback, $combined, $m)) {
        $urls = array_merge($urls, $m[0]);
    }
    $urls = array_unique(array_map('trim', $urls));
    if (empty($urls)) {
        continue;
    }
    foreach ($urls as $cdn_url) {
        $cdn_url = trim($cdn_url);
        if (isset($cdn_to_wp[$cdn_url])) {
            continue;
        }
        $filename = get_filename_from_cdn_url($cdn_url);
        if (!$filename) {
            $errors[] = "Could not get filename: {$cdn_url}";
            continue;
        }

        $attachment_id = find_attachment_by_filename($filename);
        if ($attachment_id) {
            $cdn_to_wp[$cdn_url] = wp_get_attachment_url($attachment_id);
            continue;
        }

        if ($no_download) {
            $missing[] = ['url' => $cdn_url, 'filename' => $filename];
            $cdn_to_wp[$cdn_url] = null;
            continue;
        }

        if (!$dry_run) {
            $result = download_and_attach($cdn_url, $filename);
            if (isset($result['error'])) {
                $errors[] = "{$filename}: {$result['error']}";
                $missing[] = ['url' => $cdn_url, 'filename' => $filename];
                $cdn_to_wp[$cdn_url] = null;
            } else {
                $cdn_to_wp[$cdn_url] = $result['url'];
            }
        } else {
            $missing[] = ['url' => $cdn_url, 'filename' => $filename];
            $cdn_to_wp[$cdn_url] = null;
        }
    }
}

$unique_cdn = count($cdn_to_wp);
$resolved = count(array_filter($cdn_to_wp));
$unresolved = $unique_cdn - $resolved;

if ($unique_cdn === 0 && !empty($posts_with_cdn)) {
    $sample_id = $posts_with_cdn[0];
    $sample = get_post_field('post_content', $sample_id);
    $pos = strpos($sample, 'images.ctfassets.net');
    if ($pos !== false) {
        $start = max(0, $pos - 80);
        $snippet = substr($sample, $start, 200);
        $snippet = str_replace(["\r", "\n"], [' ', ' '], $snippet);
        echo "\n[Debug] Sample content around first CDN domain (post ID {$sample_id}):\n---\n" . $snippet . "\n---\n";
    }
}

echo "Unique CDN URLs: {$unique_cdn}\n";
echo "Resolved (existing or downloaded): {$resolved}\n";
echo "Unresolved: {$unresolved}\n";

if (!empty($errors)) {
    echo "\nErrors:\n";
    foreach (array_slice($errors, 0, 20) as $e) {
        echo "  - {$e}\n";
    }
    if (count($errors) > 20) {
        echo "  ... and " . (count($errors) - 20) . " more\n";
    }
}

if ($list_missing) {
    $urls = array_unique(array_column($missing, 'url'));
    foreach ($urls as $u) {
        echo $u . "\n";
    }
    exit(0);
}

if ($dry_run) {
    if (!empty($missing)) {
        echo "\nWould need to download (or already missing): " . count($missing) . " images\n";
        echo "Run without dry_run to download and replace, or use no_download to only replace existing.\n";
        echo "To list missing URLs for pre-download: pass list_missing as argument.\n";
    }
    echo "\n[DRY RUN] No changes made.\n";
    exit(0);
}

// Replace URLs in each post (content and excerpt; replace both normal and JSON-escaped URL form)
$updated = 0;
foreach ($posts_with_cdn as $post_id) {
    $content = get_post_field('post_content', $post_id);
    $excerpt = get_post_field('post_excerpt', $post_id);
    $content_orig = $content;
    $excerpt_orig = $excerpt;
    foreach ($cdn_to_wp as $cdn_url => $wp_url) {
        if ($wp_url === null) {
            continue;
        }
        $cdn_escaped = str_replace('/', '\\/', $cdn_url); // JSON form in block editor
        $content = str_replace([$cdn_url, $cdn_escaped], $wp_url, $content);
        $excerpt = str_replace([$cdn_url, $cdn_escaped], $wp_url, $excerpt);
    }
    if ($content !== $content_orig || $excerpt !== $excerpt_orig) {
        wp_update_post([
            'ID' => $post_id,
            'post_content' => $content,
            'post_excerpt' => $excerpt,
        ]);
        $updated++;
    }
}

echo "\nUpdated {$updated} posts.\n";
echo "Done.\n";
