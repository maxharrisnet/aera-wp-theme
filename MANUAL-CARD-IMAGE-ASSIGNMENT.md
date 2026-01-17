# Manual Card Image Assignment Guide

## Quick Reference

For each blog post that needs a card image:

1. **Edit the blog post** in WordPress admin
2. Scroll to **"Resource Card"** section (ACF fields)
3. Set **"Card Image"** field (`resource_card_image`)
4. Select the image from media library (should be different from featured image)
5. Save/Update

## Card Image Naming Convention

Card images from Contentful typically follow this pattern:
- `Blog_Author_Banner_-_[Post_Title].jpg/png` - Card images
- `Blog_Hero_Banner_-_[Post_Title].jpg/png` - Featured images

## Finding Card Images in Media Library

Card images should already be in the media library from the import. Look for:
- Images with "card image" in the title
- Images with "Blog_Author_Banner" in the filename
- Images uploaded during the blog import

## Quick Script to List Posts Needing Card Images

If you want to see which posts are missing card images:

```bash
wp eval "foreach(get_posts(['post_type'=>'blog','posts_per_page'=>-1]) as \$p){ \$card=get_field('resource_card_image',\$p->ID); \$feat=get_post_thumbnail_id(\$p->ID); if(!\$card || \$card==\$feat){ echo \$p->post_title.' (ID: '.\$p->ID.')\n'; } }"
```

## Notes

- Card images should be **different** from featured images
- Card images are used in archive/listing views
- Featured images are used in single post views
- Both should be set for proper display
