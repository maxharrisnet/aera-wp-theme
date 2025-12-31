# 🎬 VIDEOS IMPORT - COMPLETE DOCUMENTATION

## 📋 Overview

This import contains **ALL 42 videos** from the Contentful export, including both the old deprecated content type and the new current content type.

### What Happened?

1. **First attempt** (December 2025): We imported 26 videos from the old `videos` content type
2. **Problem discovered**: The newer videos (2025) were missing - they were in a different content type
3. **Solution**: Created this complete import that includes BOTH content types

### The Two Content Types

#### 1️⃣ Old "videos" Content Type (DEPRECATED)
- **Count**: 26 videos
- **Contentful ID**: `contentType: "videos"`
- **Date Range**: Mostly 2019-2024
- **Status**: Deprecated in Contentful but still contains valid videos

#### 2️⃣ New "newsItem" Content Type (CURRENT)
- **Count**: 16 videos
- **Contentful ID**: `contentType: "newsItem"` with `type: "Video"`
- **Date Range**: Mostly 2025
- **Status**: Active content type in Contentful

---

## 📊 Import Statistics

```
Total Videos:        42 (100%)
├─ Old videos type:  26 (62%)
└─ New newsItem:     16 (38%)

With External Links: 39/42 (93%)
With Dates:          42/42 (100%)
With Images:         42/42 (100%)

Post IDs:            6001-6042
Post Type:           video
```

---

## 🗂 Data Mapping

### Contentful → WordPress

| Contentful Field | WordPress Field | ACF Group | Notes |
|-----------------|----------------|-----------|-------|
| `title` | `post_title` | Core | Video title |
| `text` | `post_content` | Core | Full description |
| `text` (truncated) | `post_excerpt` | Core | Short description |
| `date` | `post_date` | Core | Publication date |
| `link` | `resource_external_url` | Resource Card | meet.aeratechnology.com link |
| `image` | Featured Image | Core | Video thumbnail |
| - | `resource_cta_text` | Resource Card | Set to "Watch Now" |

### ACF Field Group Used

**Resource Card Fields** (`group_aera_resource_fields.json`)
- Shared across: Podcasts, Videos, Whitepapers
- Key fields: `resource_external_url`, `resource_cta_text`, `resource_excerpt`, `resource_card_image`

---

## 🎯 Notable Videos in This Import

### 🆕 Recent Videos (2025 - from newsItem)

1. **Managing Supply Chain Waste with Aera** (Sept 2025)
   - Source: newsItem content type
   - External link: Yes

2. **Warp-Speed Supply Chain: Decision Intelligence Powering PMI's Smoke-Free Future** (June 2025)
   - Source: newsItem content type
   - External link: Yes

3. **Next-Gen Supply Chain with Accenture - From Automation to Full Autonomy** (June 2025)
   - Source: newsItem content type
   - External link: Yes

4. **How Unilever is envisioning the Autonomous Supply Chain with Agentic AI** (June 2025)
   - Source: newsItem content type
   - External link: Yes

5. **Accelerating Cross-Functional Agility BP-Castrol's AI-Driven Supply Chain Transformation** (June 2025)
   - Source: newsItem content type
   - External link: Yes

### 🎥 Featured Videos (from old videos type)

1. **Starting and scaling with Aera - Laurent Lefouet**
   - Source: videos content type
   - One of the videos originally requested

2. **Decision Intelligence in the Age of Agentic AI**
   - Source: videos content type
   - Recent thought leadership

3. **The Real Impact of Decision Intelligence** series
   - Dell Technologies
   - Kraft Heinz Company
   - Becle
   - Merck

---

## 🔄 Import Process

### Step 1: Data Extraction

```python
# The script extracts from TWO content types:
for entry in contentful_data['entries']:
    content_type = entry['sys']['contentType']['sys']['id']

    # Old videos
    if content_type == 'videos':
        extract_video(entry)

    # New videos (in newsItem with type filter)
    if content_type == 'newsItem' and entry['fields']['type'] == 'Video':
        extract_video(entry)
```

### Step 2: Field Mapping

Both content types have similar structures:
- `title` - Video title
- `text` - Description
- `date` - Publication date
- `link` - External URL
- `image` - Thumbnail image

### Step 3: WordPress Conversion

Each video becomes:
- A `video` post type
- Published status
- Comments closed
- Resource Card ACF fields populated
- Featured image referenced (to be uploaded)

---

## 📁 Files Generated

### 1. wordpress-videos-complete-import.xml
- WordPress WXR format
- 42 video posts
- Post IDs: 6001-6042
- Ready for WordPress Importer

### 2. download-all-video-images.sh
- Bash script to download images
- 42 images total
- Saves to `video-images-complete/`
- Filenames: `video-{id}-{contentful_asset_id}.jpg`

### 3. videos-complete-import-summary.json
- Import statistics
- Metadata about the conversion
- Useful for verification

### 4. contentful-to-wordpress-videos-updated.py
- The conversion script
- Can be re-run if needed
- Includes both content types

---

## 🚀 How to Import

### Prerequisites
- WordPress site running
- WordPress Importer plugin installed
- ACF Pro with Resource Card fields
- `video` post type registered

### Import Steps

#### 1. Import Videos
```bash
# WordPress Admin
Tools > Import > WordPress Importer
# Upload: wordpress-videos-complete-import.xml
```

#### 2. Download Images
```bash
cd _ORIGINAL_FILES
chmod +x download-all-video-images.sh
./download-all-video-images.sh
```

#### 3. Upload Images
```bash
# WordPress Admin
Media > Add New
# Select all from video-images-complete/
```

#### 4. Verify Import
- Check: `/wp-admin/edit.php?post_type=video`
- Should see 42 videos
- All should have external links
- All should have featured images (after upload)

---

## ✅ Post-Import Checklist

- [ ] All 42 videos imported successfully
- [ ] All featured images uploaded
- [ ] External links working (test a few)
- [ ] "Watch Now" CTA text showing
- [ ] Video descriptions displaying
- [ ] Dates are correct
- [ ] Videos display in archives/loops
- [ ] Resource cards render properly

---

## 🐛 Troubleshooting

### Issue: Only 26 videos imported
**Solution**: You imported the old file. Use `wordpress-videos-complete-import.xml`

### Issue: Recent 2025 videos missing
**Solution**: The old import only had the deprecated content type. Use the complete import.

### Issue: Images not showing
**Solution**:
1. Check if images were uploaded to Media Library
2. Verify filenames match (e.g., `video-1-xxxxx.jpg`)
3. Manually set featured image if needed

### Issue: External links not working
**Solution**:
1. Check the `resource_external_url` ACF field
2. Should point to meet.aeratechnology.com
3. 39/42 videos have external links (3 don't, which is expected)

### Issue: Wrong CTA text
**Solution**: Should be "Watch Now" - check Resource Card template part

---

## 🔍 Content Type Comparison

### Old "videos" vs New "newsItem"

| Aspect | Old (videos) | New (newsItem) |
|--------|-------------|----------------|
| Count | 26 | 16 |
| Status | Deprecated | Active |
| Date Range | 2019-2024 | 2019-2025 |
| Fields | title, text, date, link, image, type | Same |
| Filtering | None needed | Filter by type='Video' |
| Usage | Legacy | Current/Future |

### Why Both?

The older videos were not migrated to the new content type in Contentful. Both are valid and should be imported to WordPress.

---

## 📝 Notes

1. **Post IDs start at 6001** to avoid conflicts with other imports
2. **External links** point to meet.aeratechnology.com (marketing landing pages)
3. **Video post type** uses Resource Card fields (shared with Podcasts/Whitepapers)
4. **No custom Video fields** - those were deprecated, we use Resource Card fields
5. **Images** are thumbnails, not actual video files
6. **Videos** are hosted externally (not in WordPress)

---

## 🎯 Next Steps After Import

1. **Review videos** in WordPress admin
2. **Test a few external links** to verify they work
3. **Check video archive page** displays correctly
4. **Test resource cards** in various contexts
5. **Consider taxonomies** if you want to categorize videos (Topics, Industries, etc.)

---

## 📧 Support

If you encounter issues:
1. Check the `videos-complete-import-summary.json` for stats
2. Review the conversion script: `contentful-to-wordpress-videos-updated.py`
3. Verify ACF Resource Card fields are properly configured
4. Check that the `video` post type is registered

---

Generated: December 30, 2025
Total Videos: 42 (26 old + 16 new)
Import File: wordpress-videos-complete-import.xml

