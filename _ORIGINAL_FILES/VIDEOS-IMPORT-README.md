# Videos Import - Quick Guide

Complete guide for importing 26 Decision Intelligence videos from Contentful.

## 📦 What Was Created

**26 Videos** - All external content linking to meet.aeratechnology.com

## 🧹 Fields Simplified

### ❌ Removed Legacy Fields:
- Deactivated `acf-json/group_aera_video.json`
- Removed fields: Type, Tags, End Date, City, Attachment, Video URL, Form or Video

### ✅ Using Resource Card Fields:
Videos now use the existing **Resource Card** field group:
- `resource_external_url` - External link (meet.aeratechnology.com)
- `resource_card_image` - Video card image
- `resource_excerpt` - Video description
- `resource_cta_text` - "Watch Now" button text

Plus standard WordPress fields:
- Post Title
- Post Content/Excerpt
- Featured Image
- Post Date

## 📊 Import Summary

- **26 videos** total
- **24/26** have external links (2 need manual links)
- **26/26** have dates
- **26/26** have images
- **Post IDs:** 6001-6026

## 🚀 Import Instructions

### Step 1: Sync ACF Field Groups

1. Go to **Custom Fields** in WordPress admin
2. Click **Sync available** at the top
3. Check **"Video Fields (DEPRECATED)"**
4. Click **Sync** to deactivate legacy fields

### Step 2: Download Images

```bash
cd _ORIGINAL_FILES
./download-video-images.sh
```

This creates `video-images/` folder with 26 images.

### Step 3: Upload Images to WordPress

1. Go to **Media** → **Add New**
2. Upload all images from `video-images/` folder
3. Note: You'll manually set these as featured images after import

### Step 4: Import Videos

1. Go to **Tools** → **Import** → **WordPress**
2. Upload `wordpress-videos-import.xml`
3. Assign posts to admin user
4. Click **Submit**

### Step 5: Set Featured Images

For each video post (6001-6026):
1. Edit the video post
2. Set the featured image (uploaded in Step 3)
3. The filename format is: `video-{number}-{contentful-id}.jpg`

### Step 6: Verify External Links

24 videos with links will automatically redirect to meet.aeratechnology.com via the `resource_external_url` field.

For the 2 without links:
- **CXO Talk with Aera's Fred Laluyaux and People-Centered Internet's David Bray**
- **CXO Talk with Reckitt's Saqib Mehmood**

Add links manually if available.

## 🗺️ Field Mapping

| Contentful Field | WordPress Field | Type | Notes |
|-----------------|-----------------|------|-------|
| title | `post_title` | Standard | Post title |
| text | `post_content` & `post_excerpt` | Standard | Description |
| date | `post_date` | Standard | Publish date (100% populated) |
| image | Featured Image | Standard | Manually set after import |
| link | `resource_external_url` | ACF | External URL (meet.aeratechnology.com) |
| - | `resource_cta_text` | ACF | Set to "Watch Now" |
| text | `resource_excerpt` | ACF | Same as content |

## 📝 All 26 Videos

### Most Recent Videos (2024-2025):
1. Beyond Buzzwords: Where Are Companies Getting Value with AI Today and What's Ahead?
2. The Real Impact of Decision Intelligence at Dell Technologies
3. The Real Impact of Decision Intelligence at The Kraft Heinz Company
4. The Real Impact of Decision Intelligence at Becle
5. The evolution of Aera and Decision Intelligence
6. Decision Intelligence in the Age of Agentic AI
7. Speed, Simplicity, Value: Innovations in Aera Decision Cloud™
8. The Real Impact of Decision Intelligence at Merck
9. Prepare for the Future of Decision Intelligence at Work
10. Starting and scaling with Aera - Laurent Lefouet

### Educational Content:
11. Disambiguation Podcast: "The Use of AI in Decision Intelligence"
12. Getting Started with Aera: Test Drive
13. Scaling Decision Intelligence Success
14. An Overview of Aera Decision Cloud™
15. Setting up for DI Success: Accelerating time to value
16. Accelerating Time to Value with Decision Intelligence
17. Decision Intelligence Impact, Value, and Learning
18. Introduction to the Aera Skills™ Library
19. A Framework for Delivering Business Value with Decision Intelligence

### Earlier Content (2020-2023):
20. inNOWvate 2022: "Future Fit Supply Chain Decision Making at Unilever"
21. Decision Intelligence for the CPG Industry
22. Supply Chain Matters Podcast Episode 21
23. Agility trumps planning in fast-moving industries
24. Welcome to the Self-Driving Enterprise

### CXO Talks (2019):
25. CXO Talk with Aera's Fred Laluyaux and People-Centered Internet's David Bray
26. CXO Talk with Reckitt's Saqib Mehmood

## 🔧 How External Links Work

When a video has `resource_external_url` set:
- The card on archive pages links to the external URL
- The "Watch Now" button links to the external URL
- The single post page can redirect to the external URL (if template is set up)

No custom video fields needed - it all works through Resource Card fields!

## 📚 Generated Files

- **`wordpress-videos-import.xml`** (70KB) - WordPress import file
- **`videos-import-summary.json`** (7.2KB) - Import summary
- **`download-video-images.sh`** (6.7KB) - Image download script
- **`contentful-to-wordpress-videos.py`** - Conversion script

## 🔄 Re-running Conversion

To regenerate the import file:

```bash
cd _ORIGINAL_FILES
python3 contentful-to-wordpress-videos.py
```

---

**Generated:** December 30, 2025
**Source:** Contentful Export
**WordPress Post Type:** `video`
**Post IDs:** 6001-6026
**Total Videos:** 26
**Fields:** Resource Card (no custom video fields needed)

