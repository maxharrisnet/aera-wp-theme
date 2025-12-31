# 🎬 VIDEOS IMPORT - QUICK START

## ⚡️ Quick Import (3 Steps)

### 1. Import Videos to WordPress
```bash
# In WordPress Admin:
Tools > Import > WordPress Importer > Run Importer
# Upload: wordpress-videos-complete-import.xml
```

### 2. Download Images
```bash
cd _ORIGINAL_FILES
./download-all-video-images.sh
```

### 3. Upload Images to WordPress
1. Go to: `Media > Add New > Upload Files`
2. Select all images from `video-images-complete/` folder
3. The filenames match the video IDs automatically

---

## 📊 What You're Getting

- **42 Total Videos** (26 old + 16 new)
  - 26 from old deprecated `videos` content type
  - 16 from new `newsItem` content type (type='Video')
- **All have images** ✅
- **All have dates** ✅
- **39/42 have external links** 🔗
- **Post IDs**: 6001-6042

---

## 🎯 Key Videos Included

### Recent (from newsItem):
- ✨ Managing Supply Chain Waste with Aera
- ✨ Next-Gen Supply Chain with Accenture - From Automation to Full Autonomy
- ✨ How Unilever is envisioning the Autonomous Supply Chain with Agentic AI
- ✨ Warp-Speed Supply Chain: Decision Intelligence Powering PMI's Smoke-Free Future
- ✨ Accelerating Cross-Functional Agility BP-Castrol's AI-Driven Supply Chain Transformation

### Featured (from old videos):
- 🎥 Starting and scaling with Aera - Laurent Lefouet
- 🎥 Decision Intelligence in the Age of Agentic AI
- 🎥 The Real Impact of Decision Intelligence at Dell Technologies
- 🎥 The Real Impact of Decision Intelligence at The Kraft Heinz Company

---

## ⚠️ Important Notes

1. **This is the COMPLETE import** - includes both old and new video content types
2. **ACF Fields Used**: Resource Card Fields (shared across Podcasts, Videos, Whitepapers)
   - `resource_external_url` - the meet.aeratechnology.com link
   - `resource_cta_text` - "Watch Now"
   - `resource_excerpt` - video description
   - Featured Image - video thumbnail
3. **External Links**: Most videos link to meet.aeratechnology.com or other external platforms
4. **Post Type**: `video`

---

## 🔍 What Changed?

### ❌ Old Import (INCOMPLETE)
- Only had 26 videos
- Only included the old deprecated `videos` content type
- Missing all the recent videos from 2025

### ✅ New Import (COMPLETE)
- Has all 42 videos
- Includes both `videos` AND `newsItem` (type='Video')
- All recent videos from 2025 are included

---

## 🛠 Files in This Import

1. **wordpress-videos-complete-import.xml** - WordPress WXR import file (42 videos)
2. **download-all-video-images.sh** - Downloads all 42 images
3. **videos-complete-import-summary.json** - Import statistics
4. **contentful-to-wordpress-videos-updated.py** - Conversion script (for reference)

---

## 💡 Need Help?

- Images not showing? Make sure you uploaded them to Media Library
- External links not working? Check the `resource_external_url` ACF field
- Wrong content? The script pulls from TWO content types (videos + newsItem)

