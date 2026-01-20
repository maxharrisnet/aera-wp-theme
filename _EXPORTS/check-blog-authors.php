<?php
/**
 * Check and report blog post authors
 * Run with: wp eval-file _EXPORTS/check-blog-authors.php
 */

$blog_posts = get_posts(array(
    'post_type' => 'blog',
    'posts_per_page' => -1,
    'post_status' => 'any',
));

echo "📊 Blog Post Authors Report\n";
echo "==========================\n\n";

$author_counts = array();
$posts_by_author = array();

foreach ($blog_posts as $post) {
    $author_id = $post->post_author;
    $author = get_user_by('ID', $author_id);
    $author_name = $author ? $author->display_name : "User ID $author_id (not found)";

    if (!isset($author_counts[$author_id])) {
        $author_counts[$author_id] = 0;
        $posts_by_author[$author_id] = array();
    }
    $author_counts[$author_id]++;
    $posts_by_author[$author_id][] = $post->ID;

    echo "Post ID {$post->ID}: \"{$post->post_title}\" → Author: $author_name (ID: $author_id)\n";
}

echo "\n📈 Summary:\n";
echo "Total blog posts: " . count($blog_posts) . "\n";
echo "Unique authors: " . count($author_counts) . "\n\n";

echo "Authors breakdown:\n";
foreach ($author_counts as $author_id => $count) {
    $author = get_user_by('ID', $author_id);
    $author_name = $author ? $author->display_name : "User ID $author_id (not found)";
    echo "  - $author_name (ID: $author_id): $count posts\n";
}

echo "\n👥 Available users (who can be authors):\n";
$users = get_users(array(
    'role__in' => array('administrator', 'editor', 'author'),
    'orderby' => 'display_name',
));
foreach ($users as $user) {
    $can_edit = user_can($user->ID, 'edit_posts');
    echo "  - {$user->display_name} (ID: {$user->ID}, Login: {$user->user_login}, Role: " . implode(', ', $user->roles) . ", Can edit: " . ($can_edit ? 'Yes' : 'No') . ")\n";
}
