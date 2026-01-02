# Press Release Image Mapping - Update Summary

## Change Made

Removed unused "Publication Logo" styling from press release SCSS since images are now solely handled through the Resource Card - Card Image field.

## Image Mapping Details

### Contentful → WordPress Flow

```
Contentful Fields (image, cardImage, heroImage)
    ↓
contentful-press-releases-to-wxr.js extracts image asset
    ↓
Maps to WXR post meta:
  - _thumbnail_id (WordPress featured image)
  - resource_card_image (ACF field)
    ↓
WordPress Import:
  - Creates attachment from image URL
  - Sets as featured image via _thumbnail_id
  - Sets ACF field via resource_card_image
    ↓
Single Template:
  - content-press-release.php retrieves featured image
  - Displays as featured image in article
```

### ACF Field Mapping

- **Field**: `resource_card_image` (image type)
- **Source**: Per-entry Contentful image asset or default fallback
- **Mapping**: WXR meta key `resource_card_image` = attachment ID
- **Display**: Used by Resource Card components and featured image

## Exporter Logic (contentful-press-releases-to-wxr.js)

### Image Detection Order

1. Try `fields.image` (primary field)
2. Fall back to `fields.cardImage` (alternate)
3. Fall back to `fields.heroImage` (alternate)
4. Fall back to default: `Aera_tile.png`

### Localization Support

- Handles multi-locale fields automatically
- Extracts first available locale value
- Works with both simple and complex field structures

### Attachment Generation

- Creates separate attachment item for each press release
- Links image asset to post via `wp:post_parent`
- Sets correct mime type based on asset URL

## SCSS Updates

### Removed Styles

The following legacy styles (from React News listing layout) have been removed:

- `.pressItem__col1` - Logo column (not used in single template)
- `.pressItem__col2` - Date column (not used in single template)
- `.pressItem__logo` - Logo styling
- `.pressItem__date` - Date styling (now in header metadata)

### Retained Styles

- `.pressItem__row` - Row layout (still used for archive listing)
- `.pressItem__col3` - Content column (still used for archive listing)
- `.pressItem__title` - Title styling (still used for archive listing)
- `.pressItem__link` - Link styling (still used for archive listing)

## Current Image Display

### Single Press Release Page

- **Source**: Featured image (set via `_thumbnail_id`)
- **Display**: `.press-release-article__featured-image` in content partial
- **Size**: Large (full width above content)
- **ACF Backup**: `resource_card_image` field stores image ID

### Archive/Listing Page

- **Source**: Resource Card component (shared styling)
- **Display**: Card image preview
- **Size**: Card thumbnail

## Data Verification

### Sample WXR Output (verified)

```xml
<wp:postmeta>
  <wp:meta_key>_thumbnail_id</wp:meta_key>
  <wp:meta_value><![CDATA[800000]]></wp:meta_value>
</wp:postmeta>
<wp:postmeta>
  <wp:meta_key>resource_card_image</wp:meta_key>
  <wp:meta_value><![CDATA[800000]]></wp:meta_value>
</wp:postmeta>
<item>
  <title><![CDATA[Press Release Title image]]></title>
  <wp:attachment_url>https://images.ctfassets.net/mh1amgo8m7ts/.../image.png</wp:attachment_url>
</item>
```

### Downloaded Images (45 press releases)

- 6 unique images identified
- All images successfully downloaded to `_ORIGINAL_FILES/press-images/`
- Remaining 39 press releases use default fallback image

## Files Modified

- `/sass/components/_press-release.scss` - Removed unused logo/date column styles

## Files Already Correct (No Changes Needed)

- `/scripts/contentful-press-releases-to-wxr.js` - Already properly maps images ✅
- `/template-parts/content-press-release.php` - Already uses featured image ✅
- `acf-json/group_aera_resource_fields.json` - `resource_card_image` field ready ✅

## Next Steps

1. SASS compilation (if not auto-compiled)
2. WXR import to WordPress (unchanged - still at `_ORIGINAL_FILES/press-releases-wxr.xml`)
3. Verify featured images display correctly on single press release pages
4. Test archive listing with Resource Card styling

## Status: ✅ Complete

Image mapping is optimized and only uses the Resource Card - Card Image field. No publication logos displayed separately - all images handled through WordPress featured image and ACF field.
