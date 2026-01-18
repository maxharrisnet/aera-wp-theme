#!/bin/bash
# Fix news card images: Copy featured image to card image field
# Usage: bash _EXPORTS/fix-news-card-images.sh

cd "$(dirname "$0")/../.." || exit

wp eval "
\$updated = 0;
\$skipped = 0;
\$posts = get_posts(['post_type' => 'news', 'posts_per_page' => -1, 'post_status' => 'publish']);

foreach (\$posts as \$post) {
    \$featured_id = get_post_thumbnail_id(\$post->ID);

    if (!\$featured_id) {
        echo \"⚠️  Skipping: {\$post->post_title} (ID: {\$post->ID}) - No featured image\n\";
        \$skipped++;
        continue;
    }

    // Get current card image
    \$current_card_id = get_post_meta(\$post->ID, 'resource_card_image', true);

    // If card image already matches featured, skip
    if (\$current_card_id == \$featured_id) {
        echo \"✓ Already set: {\$post->post_title} (ID: {\$post->ID})\n\";
        \$skipped++;
        continue;
    }

    // Set card image to featured image
    update_post_meta(\$post->ID, 'resource_card_image', \$featured_id);
    update_post_meta(\$post->ID, '_resource_card_image', 'field_resource_card_image');

    echo \"✓ Updated: {\$post->post_title} (ID: {\$post->ID}) - Card image = Featured image (ID: {\$featured_id})\n\";
    \$updated++;
}

echo \"\n📊 Summary:\n\";
echo \"   Updated: \$updated posts\n\";
echo \"   Skipped: \$skipped posts\n\";
echo \"   Total: \" . count(\$posts) . \" posts\n\";
"
