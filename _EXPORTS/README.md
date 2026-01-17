# Contentful to WordPress Import Scripts

This directory contains all scripts and files for importing content from Contentful to WordPress.

## Folder Structure

```
_EXPORTS/
├── blogs/              # Blog import files
├── press-releases/     # Press release import files
├── news/               # News import files
├── whitepapers/        # Whitepaper import files
├── podcasts/           # Podcast import files
├── scripts/            # All import scripts
└── docs/               # Documentation
```

## Updated Scripts

All scripts have been updated with the following fixes:

### ✅ Common Fixes Applied

1. **Publication Status**: All scripts now filter by `sys.publishedAt` - only importing published content
2. **Auto-detect Latest Export**: All scripts auto-detect the latest Contentful export file
3. **Card Image Mapping**: All scripts now set both:
   - `resource_card_image` = attachment ID
   - `_resource_card_image` = 'field_resource_card_image' (ACF field key)
4. **Date Fields**:
   - Use `date` custom field for `post_date` (not `publishedAt`)
   - Add `resource_start_date` and `resource_end_date` if they exist in Contentful
   - News Items only have `date` field (no start/end dates)

### Script-Specific Updates

#### Press Releases (`contentful-press-releases-to-wxr.js`)
- ✅ Matches Article Template Page (main) with News Item (card)
- ✅ Card image from News Item, featured image from Article Template Page
- ✅ All common fixes applied

#### Whitepapers (`contentful-whitepapers-to-wxr.js`)
- ✅ Filters by `type="Whitepaper"` (not "Webinar")
- ✅ All common fixes applied

#### News (`contentful-news-to-wxr.js`)
- ✅ Filters by `type="News"`
- ✅ Uses `date` field only (no start/end dates)
- ✅ All common fixes applied

#### Blogs (`contentful-blogs-to-wxr.js`)
- ✅ Matches Community Template Page with Community Card
- ✅ Card image from Community Card
- ✅ All common fixes applied
- ⚠️ Note: Content and author processing unchanged (working fine)

#### Podcasts (`contentful-podcasts-to-wxr.js`)
- ✅ Filters by `type="Podcast"` (if type field exists)
- ✅ All common fixes applied

## ACF Fields Added

Added to `group_aera_resource_fields.json`:
- `resource_start_date` (date_picker)
- `resource_end_date` (date_picker)

These fields are available for all resource post types.

## Usage

1. **Generate WXR file**:
   ```bash
   cd _EXPORTS/scripts
   node contentful-[type]-to-wxr.js
   ```

2. **Import into WordPress**:
   - Go to Tools → Import → WordPress
   - Upload the WXR file from the appropriate folder
   - Map authors and import

## Content Type Mapping

- **News**: `News Item` with `type="News"`
- **Press Releases**: `Article Template Page` (main) + `News Item` (card)
- **Whitepapers**: `Events` with `type="Whitepaper"`
- **Blogs**: `Community Template Page` (main) + `Community Card` (card)
- **Podcasts**: `Podcasts` with `type="Podcast"`

## Notes

- All scripts use the latest Contentful export file automatically
- Card images should now save correctly with the ACF field key reference
- Dates are pulled from custom `date` fields, not published dates
- Only published content is imported
