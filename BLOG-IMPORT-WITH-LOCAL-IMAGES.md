# Blog Import with Local Images

## Problem

WordPress import may fail to download images from Contentful CDN URLs (`https://images.ctfassets.net/...`) due to:
- Network timeouts
- PHP execution time limits
- Firewall/security restrictions
- Large file sizes

## Solution: Pre-download and Upload Images

This approach downloads images locally first, uploads them to WordPress media library, then updates the WXR file to use WordPress URLs instead of CDN URLs.

## Step-by-Step Process

### Step 1: Download Images Locally

```bash
node scripts/download-blog-images.js
```

This downloads all images from Contentful CDN to:
- `_ORIGINAL_FILES/blog-images/` (featured and card images)
- `_ORIGINAL_FILES/blog-author-images/` (author photos)

### Step 2: Upload Images to WordPress Media Library

```bash
wp eval-file scripts/upload-blog-images-to-wp.php
```

This script:
- Uploads all downloaded images to WordPress media library
- Creates a mapping file (`_ORIGINAL_FILES/image-url-mapping.json`) that maps filenames to WordPress URLs
- Skips images that are already uploaded

### Step 3: Update WXR File with WordPress URLs

```bash
node scripts/update-wxr-with-wp-urls.js
```

This script:
- Reads the mapping file
- Replaces all Contentful CDN URLs in the WXR file with WordPress media library URLs
- Creates a new file: `_ORIGINAL_FILES/blogs-wxr-wordpress-urls.xml`

### Step 4: Import Updated WXR File

1. Go to WordPress Admin: **Tools → Import → WordPress**
2. Upload: `_ORIGINAL_FILES/blogs-wxr-wordpress-urls.xml`
3. **Important**: Uncheck "Download and import file attachments" (images are already uploaded)
4. Map authors and import

### Step 5: Fix Card Images (if needed)

After import, run the fix script to ensure card images are properly set:

```bash
wp eval-file scripts/fix-blog-card-images.php
```

## Alternative: Test CDN Download First

If you want to try importing directly from CDN first:

1. Import `_ORIGINAL_FILES/blogs-wxr.xml` with "Download and import file attachments" checked
2. Check if images downloaded successfully
3. If images failed to download, use the local upload method above

## Files Created

- `_ORIGINAL_FILES/blog-images/` - Downloaded featured/card images
- `_ORIGINAL_FILES/blog-author-images/` - Downloaded author photos
- `_ORIGINAL_FILES/image-url-mapping.json` - Mapping of filenames to WordPress URLs
- `_ORIGINAL_FILES/blogs-wxr-wordpress-urls.xml` - WXR file with WordPress URLs

## Troubleshooting

### Images not uploading

- Check file permissions on `_ORIGINAL_FILES/blog-images/`
- Verify images were downloaded successfully
- Check WordPress upload directory permissions

### Mapping file not created

- Ensure `upload-blog-images-to-wp.php` completed successfully
- Check that images directory exists and contains files

### WXR update fails

- Verify mapping file exists and is valid JSON
- Check that WXR file contains the CDN URLs
- Review console output for specific errors
