# Blog Import from Contentful

This document describes the process for importing blog posts from Contentful to WordPress.

## Overview

The import process converts Community Template Page entries from Contentful into WordPress WXR format for the `blog` custom post type. The script handles:

- Mapping blog content and metadata
- Creating WordPress users for authors
- Downloading and mapping images
- Preserving all markup and links
- Filtering deprecated posts
- Mapping to Yoast SEO fields

## Files

- **`scripts/contentful-blogs-to-wxr.js`** - Main conversion script
- **`scripts/download-blog-images.js`** - Image download script
- **`_ORIGINAL_FILES/blogs-wxr.xml`** - Generated WXR file for import
- **`_ORIGINAL_FILES/blog-images/`** - Downloaded featured/card images
- **`_ORIGINAL_FILES/blog-author-images/`** - Downloaded author photos

## Step 1: Generate WXR File

Run the conversion script to generate the WXR file:

```bash
cd scripts
node contentful-blogs-to-wxr.js
```

This will:
- Load the Contentful export JSON
- Filter for published Community Template Page entries
- Exclude deprecated posts (from CSV)
- Sort by date (most recent first)
- Generate WXR with 12 most recent posts (configurable via `LIMIT`)

**Output**: `_ORIGINAL_FILES/blogs-wxr.xml`

## Step 2: Download Images

Download all images referenced in the WXR:

```bash
node scripts/download-blog-images.js
```

This downloads:
- Featured images (from `ogImageUrl` or `image` field)
- Card images (from Community Card, if available)
- Author photos

Images are saved without duplicates to:
- `_ORIGINAL_FILES/blog-images/` (featured/card images)
- `_ORIGINAL_FILES/blog-author-images/` (author photos)

## Step 3: Create WordPress Users for Authors

Before importing, create WordPress users for each author. The WXR file uses `dc:creator` to reference authors by name.

**Option A: Create users manually**
1. Go to Users → Add New in WordPress admin
2. Create a user for each author name found in the WXR
3. Username should match the author name (or be close)
4. Set role to "Author" or "Contributor"
5. Add author position/role as user meta (if needed)

**Option B: Use a script** (recommended for many authors)
Create a script that reads author names from the WXR and creates users programmatically.

## Step 4: Import WXR into WordPress

1. Go to **Tools → Import → WordPress** in WordPress admin
2. Upload `_ORIGINAL_FILES/blogs-wxr.xml`
3. **Map authors**: Match Contentful author names to WordPress users
   - If author doesn't exist, WordPress will create a new user
   - Make sure usernames match or are close to the author names
4. **Import options**:
   - ✓ Import posts/pages
   - ✓ Download and import file attachments (images will be downloaded from URLs)
   - Set posts to "Publish"
5. Click "Submit"

## Step 5: Post-Import Tasks

### Update Author Photos

After import, you may need to:
1. Download author photos manually (if not done in Step 2)
2. Upload them to WordPress Media Library
3. Set them as user avatars or store in user meta

### Verify Permalinks

Check that permalinks match Contentful URLs:
- Contentful slugs are in format: `blogs/slug-name`
- WordPress permalink structure should be: `/blogs/%postname%/`
- Update permalink structure in Settings → Permalinks if needed

### Verify Images

1. Check that featured images are set correctly
2. Verify card images (if using archive cards)
3. Ensure all images loaded properly

## Field Mapping

### Contentful → WordPress

| Contentful Field | WordPress Field | Notes |
|-----------------|-----------------|-------|
| `title` | `post_title` | Post title |
| `content` or `richText` | `post_content` | Main content (preserves markup) |
| `slug` | `post_name` | Removes "blogs/" prefix if present |
| `date` | `post_date` | Publication date |
| `lead` (Publisher) | `post_author` | Creates/maps to WordPress user |
| `author` (Role) | User meta `author_position` | Author's role/position |
| `authorPhoto` | User meta `author_photo_url` | Author photo URL |
| `ogImageUrl` | `_thumbnail_id` | Featured image (preferred) |
| `image` | `_thumbnail_id` | Featured image (fallback) |
| Card `image` | `resource_card_image` | Archive card image |
| Card `text` | `post_excerpt` | Excerpt for archive |
| `metaTitle` | `_yoast_wpseo_title` | SEO title |
| `metaDescription` | `_yoast_wpseo_metadesc` | SEO description |
| `schemaArticle` | `_yoast_wpseo_schema_article` | Schema markup (if present) |

### ACF Fields

The blog post type uses these ACF fields:
- `blog_lead` - Lead text (replaces old author field)

**Note**: Author information is now handled via WordPress users, not ACF fields.

## Batch Processing

After testing with 12 posts, process in batches:

1. **Update LIMIT** in `contentful-blogs-to-wxr.js`:
   ```javascript
   const LIMIT = 24; // or 48, etc.
   ```

2. **Run script again** to generate new WXR

3. **Import batch** into WordPress

4. **Verify** each batch before proceeding

## Troubleshooting

### Authors Not Matching

If authors don't match during import:
- Check that WordPress usernames match Contentful author names
- WordPress will create new users if names don't match
- You can manually reassign posts to correct authors after import

### Images Not Loading

- Check that image URLs are accessible
- Run `download-blog-images.js` to download images locally
- Upload images manually to WordPress Media Library if needed

### Permalinks Not Working

- Verify permalink structure matches Contentful format
- Check Settings → Permalinks
- May need to flush rewrite rules after import

### Missing Card Data

If Community Card entries aren't in the export:
- Card data (excerpt, card image) will be pulled from template page fields
- Excerpt falls back to `metaDescription` if card text not available

## Deprecated Posts

Posts marked as "Retire" in the CSV file are automatically excluded from import. The script loads the deprecated list from:
`_ORIGINAL_FILES/Website Cleanup - Nov 2025  - Aditya - Blogs.csv`

## Notes

- **Markup Preservation**: All HTML/markdown in content is preserved exactly as in Contentful
- **Links**: All internal and external links are maintained
- **Dates**: Original publication dates are preserved
- **Published Only**: Only published entries are imported
- **No Duplicates**: Images are downloaded without duplicates
