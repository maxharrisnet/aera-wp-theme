# Podcasts Import - Quick Guide

Complete guide for importing 15 Decision Intelligence podcasts from Contentful.

## 📦 What Was Created

**15 Podcasts** - All external content linking to meet.aeratechnology.com

## 🧹 Fields Simplified

### ❌ Removed Legacy Fields:
- Deleted `acf-json/group_aera_podcast.json` (no longer needed)
- Removed fields: Type, Tags, End Date, City, Attachment, Video URL, Form or Video

### ✅ Using Resource Card Fields:
Podcasts now use the existing **Resource Card** field group:
- `resource_external_url` - External link (meet.aeratechnology.com)
- `resource_card_image` - Podcast card image
- `resource_excerpt` - Podcast description
- `resource_cta_text` - "Listen Now" button text

Plus standard WordPress fields:
- Post Title
- Post Content/Excerpt
- Featured Image
- Post Date

## 📊 Import Summary

- **15 podcasts** total
- **13/15** have external links (2 need manual links)
- **13/15** have dates
- **15/15** have images
- **Post IDs:** 5001-5015

## 🚀 Import Instructions

### Step 1: Download Images

```bash
cd _ORIGINAL_FILES
./download-podcast-images.sh
```

This creates `podcast-images/` folder with 15 images.

### Step 2: Upload Images to WordPress

1. Go to **Media** → **Add New**
2. Upload all images from `podcast-images/` folder
3. Note: You'll manually set these as featured images after import

### Step 3: Import Podcasts

1. Go to **Tools** → **Import** → **WordPress**
2. Upload `wordpress-podcasts-import.xml`
3. Assign posts to admin user
4. Click **Submit**

### Step 4: Set Featured Images

For each podcast post (5001-5015):
1. Edit the podcast post
2. Set the featured image (uploaded in Step 2)
3. The filename format is: `podcast-{number}-{contentful-id}.jpg`

### Step 5: Verify External Links

All 13 podcasts with links will automatically redirect to meet.aeratechnology.com via the `resource_external_url` field.

For the 2 without links:
- **J.D. Irving: Enabling a competitive advantage through Decision Intelligence**
- **InfraBuild: Transforming Service & Inventory Management with Decision Intelligence**

Add links manually if available.

## 🗺️ Field Mapping

| Contentful Field | WordPress Field | Type | Notes |
|-----------------|-----------------|------|-------|
| title | `post_title` | Standard | Post title |
| text | `post_content` & `post_excerpt` | Standard | Description |
| date | `post_date` | Standard | Publish date |
| image | Featured Image | Standard | Manually set after import |
| link | `resource_external_url` | ACF | External URL (meet.aeratechnology.com) |
| - | `resource_cta_text` | ACF | Set to "Listen Now" |
| text | `resource_excerpt` | ACF | Same as content |

## 📝 All 15 Podcasts

### With External Links (13):
1. Avantor: Building Smarter Life Science Supply Chains with Decision Intelligence
2. Fred Laluyaux: How Decision Intelligence & AI Agents Are Redefining Enterprise Operations
3. Fred Laluyaux on Decision Intelligence, AI Adoption, and the Future of Work
4. Decision Intelligence and AI with Frederic Laluyuax of Aera Technology
5. How AI is Remaking Decision-Making Systems
6. The Rise of the Autonomous Enterprise: Tom Davenport on AI-Driven Decision Making
7. Revolutionizing Higher Ed: How Decision Intelligence is Shaping Student Success at WGU
8. Reason Driven™ decision-making
9. Baxter Healthcare: Elevating Service and Care with Decision Intelligence
10. Unlocking AI's ROI Potential: Insights from Ray Wang
11. Reshaping the Future of Work with Decision Intelligence
12. Philip Morris International: Scaling Decision Intelligence to Improve Supply Chain Agility and Efficiency
13. Unilever: How Decision Intelligence is Revolutionizing Demand Sensing for the CPG Market

### Without External Links (2):
14. J.D. Irving: Enabling a competitive advantage through Decision Intelligence
15. InfraBuild: Transforming Service & Inventory Management with Decision Intelligence

## 🔧 How External Links Work

When a podcast has `resource_external_url` set:
- The card on archive pages links to the external URL
- The "Listen Now" button links to the external URL
- The single post page can redirect to the external URL (if template is set up)

No custom podcast fields needed - it all works through Resource Card fields!

## 📚 Generated Files

- **`wordpress-podcasts-import.xml`** (45KB) - WordPress import file
- **`podcasts-import-summary.json`** (4.1KB) - Import summary
- **`download-podcast-images.sh`** (4.2KB) - Image download script
- **`contentful-to-wordpress-podcasts.py`** - Conversion script

## 🔄 Re-running Conversion

To regenerate the import file:

```bash
cd _ORIGINAL_FILES
python3 contentful-to-wordpress-podcasts.py
```

---

**Generated:** December 30, 2025
**Source:** Contentful Export
**WordPress Post Type:** `podcast`
**Post IDs:** 5001-5015
**Total Podcasts:** 15
**Fields:** Resource Card (no custom podcast fields needed)

