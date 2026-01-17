# Blog Import Steps

## Current Status

✅ **Script Ready**: `contentful-blogs-to-wxr.js` is configured and tested
✅ **Export File**: Using latest export with Community Cards (108 cards, 108 template pages)
✅ **Card Matching**: 107 of 108 blogs matched to Community Cards
✅ **Image Mapping**: Card images sourced from Community Card's `image` field
✅ **ACF Fields**: Card images mapped to `resource_card_image` with proper field key

## Step 1: Generate WXR File

```bash
cd /Users/max/Local\ Sites/aera-technology/app/public/wp-content/themes/aera-technology
node scripts/contentful-blogs-to-wxr.js
```

**Output**: `_ORIGINAL_FILES/blogs-wxr.xml`

**What it includes**:
- 12 most recent blog posts (configurable via `LIMIT` variable)
- Featured images from `ogImageUrl` or template page `image` field
- Card images from Community Card's `image` field
- Author photos
- All content converted from markdown to HTML
- Dates from custom `date` field
- Yoast SEO fields mapped

## Step 2: Download Images (Optional but Recommended)

```bash
node scripts/download-blog-images.js
```

This downloads:
- Featured images → `_ORIGINAL_FILES/blog-images/`
- Card images → `_ORIGINAL_FILES/blog-images/`
- Author photos → `_ORIGINAL_FILES/blog-author-images/`

**Note**: WordPress will also download images during import, but having them locally is useful for reference.

## Step 3: Import into WordPress

1. **Go to WordPress Admin**: Tools → Import → WordPress
2. **Upload WXR file**: `_ORIGINAL_FILES/blogs-wxr.xml`
3. **Map Authors**:
   - Match Contentful author names to WordPress users
   - WordPress will create new users if names don't match
   - Make sure usernames are close to author names
4. **Import Options**:
   - ✓ Import posts/pages
   - ✓ Download and import file attachments (images)
   - Set posts to "Publish"
5. **Click "Submit"**

## Step 4: Verify Import

After import, check:

1. **Card Images**:
   - Go to a blog post in admin
   - Check "Resource Card" ACF fields
   - `resource_card_image` should be set (different from featured image)

2. **Frontend Display**:
   - Visit blog archive page
   - Card images should display (not default placeholder)
   - Images should be different from featured images

3. **Authors**:
   - Check that authors appear in sidebar
   - Author photos should display (via `get_avatar` filter)
   - Author positions should appear below names

4. **Content**:
   - Featured image should appear at top of post (replaces inline Blog_Hero_Banner_ images)
   - Content should be HTML (not markdown)
   - All links should work

## Step 5: Fix Images (If Needed)

If images don't appear on frontend until you manually save each post:

1. **Option A**: Manually save each post (quickest for small batches)
2. **Option B**: Use WP-CLI: `wp media regenerate --yes`
3. **Option C**: Use Regenerate Thumbnails plugin

## Step 6: Import More Batches

After verifying the first 12 posts work:

1. **Update LIMIT** in `contentful-blogs-to-wxr.js`:
   ```javascript
   const LIMIT = 24; // or 48, etc.
   ```

2. **Regenerate WXR**:
   ```bash
   node scripts/contentful-blogs-to-wxr.js
   ```

3. **Import next batch**

4. **Repeat** until all 108 posts are imported

## Troubleshooting

### Card Images Not Showing

- Check that `resource_card_image` ACF field is set in post
- Verify the field has both `resource_card_image` (ID) and `_resource_card_image` (field key) meta
- Check that Community Card was matched (107 of 108 should match)

### Authors Not Appearing

- Verify WordPress users were created/mapped during import
- Check user meta: `author_photo_url` and `author_position` should be set
- The `get_avatar` filter in `functions.php` should use `author_photo_url`

### Images Need Manual Save

- This is normal - WordPress doesn't always process attachment metadata during import
- Use WP-CLI `wp media regenerate` or manually save posts
- Or use Regenerate Thumbnails plugin

## Current Configuration

- **Export File**: Auto-detects latest in `export_blogs_sample/`
- **Current File**: `contentful-export-mh1amgo8m7ts-master-2026-01-16T12-53-01.json`
- **Limit**: 12 posts (for testing)
- **Card Matching**: By title (104) or link/slug (3) = 107 matched
