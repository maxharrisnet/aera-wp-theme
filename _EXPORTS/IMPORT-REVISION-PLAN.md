# Import Revision Plan

## Issues to Fix

### 1. Dates
- **Problem**: Using published date instead of custom date fields
- **Solution**: Add `start_date` and `end_date` custom fields from Contentful
- **Fields to check**: `date`, `startDate`, `endDate`, `start_date`, `end_date`
- **ACF Fields**: Need to add `resource_start_date` and `resource_end_date` to resource fields group

### 2. Publication Status
- **Problem**: Importing unpublished content
- **Solution**: Filter by `sys.publishedAt` - only import if exists
- **Status**: Already done in news script, need to add to others

### 3. Latest Export File
- **Problem**: Using hardcoded export file paths
- **Solution**: Auto-detect latest export file (like blogs script)
- **Location**: All scripts should use `getLatestExportFile()` function

### 4. Card Image Mapping
- **Problem**: Card images not saving properly
- **Root Cause**: Missing `_resource_card_image` field key reference
- **Solution**: Always set both:
  - `resource_card_image` = attachment ID
  - `_resource_card_image` = 'field_resource_card_image'
- **Status**:
  - ✅ News script has it
  - ❌ Press Releases missing it
  - ❌ Whitepapers missing it
  - ❌ Blogs has it but may have other issues

### 5. Content Type Mapping

#### News
- Contentful: `News Item` with `type="News"`
- Status: ✅ Already correct

#### Press Releases
- Contentful: `Article Template Page` (main) + `News Item` (card)
- Current: Only using `Article Template Page`
- **Fix**: Match cards to templates, get card image from `News Item`

#### Whitepapers
- Contentful: `Events` with `type="Whitepaper"`
- Current: Using `Events` but may not filter by type correctly
- **Fix**: Filter by `type="Whitepaper"` (not "Webinar")

#### Blogs
- Contentful: `Community Template Page` (main) + `Community Card` (card)
- Status: ✅ Already has card matching
- **Fix**: Ensure card image mapping works

#### Podcasts
- Contentful: `Podcasts` with `type="Podcast"`
- **Fix**: Need to check if script exists and filter correctly

## Files to Update

1. `scripts/contentful-press-releases-to-wxr.js`
   - Add card matching (News Item → Article Template Page)
   - Add `_resource_card_image` field key
   - Add start/end date fields
   - Filter by publishedAt
   - Auto-detect latest export

2. `scripts/contentful-whitepapers-to-wxr.js`
   - Filter by `type="Whitepaper"`
   - Add `_resource_card_image` field key
   - Add start/end date fields
   - Filter by publishedAt
   - Auto-detect latest export

3. `scripts/contentful-blogs-to-wxr.js`
   - Verify card image mapping works
   - Add start/end date fields (if they exist)
   - Already has publishedAt filter
   - Already has auto-detect

4. `scripts/contentful-news-to-wxr.js`
   - Add start/end date fields (if they exist)
   - Already has publishedAt filter
   - Already has auto-detect
   - Already has card image field key

5. Create `scripts/contentful-podcasts-to-wxr.js` (if doesn't exist)
   - Filter `Podcasts` by `type="Podcast"`
   - Add card image mapping
   - Add start/end date fields
   - Filter by publishedAt
   - Auto-detect latest export

## ACF Fields to Add

Add to `group_aera_resource_fields.json`:
- `resource_start_date` (date_picker)
- `resource_end_date` (date_picker)

## Image Download/Upload

Create scripts for each type:
- `scripts/download-press-release-images.js`
- `scripts/download-whitepaper-images.js`
- `scripts/download-podcast-images.js`
- `scripts/download-news-images.js`

Then upload scripts:
- `scripts/upload-press-release-images-to-wp.php`
- etc.

## Folder Structure

```
_EXPORTS/
├── blogs/
│   ├── contentful-export-*.json
│   ├── blogs-wxr.xml
│   └── README.md
├── press-releases/
│   ├── contentful-export-*.json
│   ├── press-releases-wxr.xml
│   └── README.md
├── news/
├── whitepapers/
├── podcasts/
├── scripts/
│   └── (all import scripts)
└── docs/
    └── (documentation)
```
