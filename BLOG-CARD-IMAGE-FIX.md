# Blog Card Image Fix

## Issue

After importing blog posts, some card images are not being set correctly:
- Some posts have correct featured images but no card images
- Some posts have card images set as featured images
- Some posts have wrong card images assigned

## Root Cause

The WXR file is generating correctly with separate card image attachments, but WordPress import may not be processing ACF image fields correctly during import.

## Solution

### Option 1: Regenerate WXR and Re-import (Recommended)

1. **Regenerate WXR file**:
   ```bash
   node scripts/contentful-blogs-to-wxr.js
   ```

2. **Delete existing blog posts** (if re-importing):
   - Go to WordPress Admin → Posts → Blog
   - Select all and delete

3. **Re-import WXR file**:
   - Tools → Import → WordPress
   - Upload `_ORIGINAL_FILES/blogs-wxr.xml`
   - Map authors and import

4. **Run fix script** (if needed):
   ```bash
   wp eval-file scripts/fix-blog-card-images.php
   ```

### Option 2: Fix Existing Posts

If you don't want to re-import, run the fix script:

```bash
wp eval-file scripts/fix-blog-card-images.php
```

This script will:
- Find all blog posts
- Look for card image attachments (title contains "card image")
- Set the `resource_card_image` ACF field if it's missing or incorrect
- Skip posts that already have correct card images

## Verification

After import or fix, verify:

1. **Check a blog post in admin**:
   - Edit the post
   - Scroll to "Resource Card" section
   - `resource_card_image` should be set (different from featured image)

2. **Check frontend**:
   - Visit blog archive page
   - Card images should display correctly
   - Card images should be different from featured images

## Current WXR Status

✅ **WXR file is correct**:
- Card images are sourced from Community Card's `image` field
- Card images are always different from featured images
- Separate attachments are created for card images
- ACF field keys are set correctly (`resource_card_image` + `_resource_card_image`)

## Known Issues

- WordPress import may not always process ACF image fields correctly
- Attachment IDs may be remapped during import
- The fix script should resolve these issues
