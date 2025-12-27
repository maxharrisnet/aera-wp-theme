# Module Template Pages - Contentful to WordPress Import

Complete guide for importing 16 Module Template Pages from Contentful to WordPress as Platform Detail pages.

## 📦 What Was Converted

**16 Platform/Product Pages** from Contentful's "Module Template Page" content type to WordPress pages using the "Platform Detail Page" template.

## 📋 Complete Page List

All pages are complete with body copy, features, benefits, and featured images:

### Recently Updated (2024-2025)
1. **Aera Workspaces** (`aera-workspaces`) - Updated: 2025-09-18
2. **Agentic Ambient Orchestration** (`agentic-ambient-orchestration`) - Updated: 2025-09-17
3. **Decision Engines** (`decision-engines`) - Updated: 2025-09-17
4. **Data Workbench™** (`data-workbench`) - Updated: 2025-05-28
5. **Aera Control Room** (`aera-control-room`) - Updated: 2025-05-19
6. **Aera Chat** (`aera-chat`) - Updated: 2024-11-21
7. **Aera Inbox** (`aera-inbox`) - Updated: 2024-11-21
8. **Aera Discovery™** (`aera-discovery`) - Updated: 2024-05-23
9. **Decision Data Model™** (`decision-data-model`) - Updated: 2024-04-16
10. **Aera Cortex™** (`cortex-ai-ml`) - Updated: 2024-02-01

### Older Pages (2023)
11. **Business Rules** (`business-rules`) - Updated: 2023-12-04
12. **Data Crawlers** (`data-crawlers`) - Updated: 2023-12-04
13. **Decision Board** (`decision-board`) - Updated: 2023-12-04
14. **Decision Engagement** (`decision-engagement`) - Updated: 2023-12-04
15. **Process Builder** (`process-builder`) - Updated: 2023-12-04
16. **Simulation & Planning** (`simulation-and-planning`) - Updated: 2023-12-04

## 🗺️ Field Mapping

Contentful "Module Template Page" fields mapped to WordPress "Platform Detail Page" template:

| Contentful Field | WordPress Field | Type | Notes |
|-----------------|-----------------|------|-------|
| `title` | `post_title` | Standard | Page title |
| `slug` | `post_name` | Standard | URL slug |
| `description` | `page_lead` | ACF | Lead text/description |
| `bodyCopy` | `platform_body_copy` | ACF | Main body content |
| `features` | `platform_features` | ACF | Features list/text |
| `benefits` | `platform_benefits` | ACF | Benefits list/text |
| `featuredImage` | `platform_featured_image` | ACF | Hero/featured image |
| `content` | `post_content` | Standard | Additional content (if any) |
| `metaTitle` | `_yoast_wpseo_title` | Meta | SEO title |
| `metaDescription` | `_yoast_wpseo_metadesc` | Meta | SEO description |

### WordPress-Specific Defaults

These fields don't exist in Contentful but are set to sensible defaults:

- `_wp_page_template` → `page-platform-detail.php` (Page template)
- `page_show_date` → `0` (Hide dates on platform pages)
- `platform_show_not_found` → `0` (Don't show "not found" message)
- `platform_intro_title` → Empty (optional intro section)
- `platform_intro_text` → Empty (optional intro section)

## 📁 Generated Files

- **`wordpress-module-pages-import.xml`** (82KB) - WordPress WXR import file
- **`module-pages-import-summary.json`** (5.9KB) - Data summary
- **`download-module-images.sh`** (3.6KB, executable) - Image downloader
- **`module-pages-analysis.json`** - Detailed field analysis
- **`contentful-to-wordpress-modules.py`** - Conversion script

## 🚀 Import Instructions

### Step 1: Download Images (16 featured images)

```bash
cd _ORIGINAL_FILES
bash download-module-images.sh
```

This downloads 16 featured images to `module-images/` directory.

### Step 2: Import Pages to WordPress

1. Log into WordPress admin
2. Go to **Tools** → **Import** → **WordPress**
3. Upload `wordpress-module-pages-import.xml`
4. Assign pages to admin user
5. Click **Submit**

This creates **16 WordPress pages** (IDs 3001-3016) with:
- ✅ Page template set to "Platform Detail Page"
- ✅ All ACF fields populated
- ✅ Proper slugs and titles
- ✅ SEO metadata (if available)

### Step 3: Upload Images to WordPress Media Library

1. Go to **Media** → **Add New**
2. Upload all images from `module-images/`
3. Note the attachment IDs for each image

### Step 4: Link Images to Pages

For each of the 16 pages:

1. Go to **Pages** in WordPress admin
2. Edit the page
3. In the ACF fields, update `platform_featured_image`
4. Select the corresponding image you uploaded

**Tip:** Original Contentful image URLs are stored in `_platform_featured_image_url` meta field for reference.

### Step 5: Verify Template Assignment

Each page should automatically use the "Platform Detail Page" template. Verify by:

1. Editing each page
2. Check "Page Attributes" → "Template" shows "Platform Detail Page"
3. If not, select it from the dropdown and update

## 📊 Data Quality

### Content Statistics
- **Body Copy:** 350-1,200 characters per page
- **Features:** 350-1,081 characters per page
- **Benefits:** 418-1,127 characters per page
- **Descriptions:** 37-85 characters per page

### Completeness
- ✅ 16/16 pages have body copy
- ✅ 16/16 pages have features
- ✅ 16/16 pages have benefits
- ✅ 16/16 pages have featured images
- ✅ 16/16 pages have descriptions
- ⭐️ 100% complete data

## 🎨 Template Features

The `page-platform-detail.php` template will render:

### Default View (Standard Content)
If platform fields are populated:
- Hero section
- Optional intro section (if `platform_intro_title`/`platform_intro_text` set)
- Module template page component showing:
  - Body copy
  - Features
  - Benefits
  - Featured image

### Fallback View
If platform fields are empty:
- Hero section
- Standard page content from editor
- Template page layout

Since all converted pages have complete platform fields, they'll all use the default module template view.

## 🔧 Troubleshooting

### Template Not Applied
If pages don't use the Platform Detail template:
- Manually edit each page
- Set "Template" to "Platform Detail Page" in Page Attributes
- Update page

### Images Not Displaying
- Verify images were uploaded to Media Library
- Check ACF field `platform_featured_image` return format is "Array"
- Ensure correct attachment IDs are assigned

### Missing ACF Fields
- Verify ACF field group is active
- Check that field names match exactly:
  - `page_lead`
  - `platform_body_copy`
  - `platform_features`
  - `platform_benefits`
  - `platform_featured_image`

### Content Not Showing
Your template uses conditional logic:
- If `platform_body_copy`, `platform_benefits`, `platform_features`, or `platform_featured_image` exist, show module template
- Otherwise, show standard page content

All imported pages have these fields populated, so module template view will be used.

## 📝 Page IDs

WordPress Page IDs: **3001-3016**
- Avoids conflicts with:
  - Customer posts: 1001-1003, 2001-2023
  - Standard WordPress pages: typically < 1000

## 🎯 Use Cases

These pages are ideal for:
- Product/feature detail pages
- Platform component pages
- Tool/capability pages
- Service descriptions
- Technical feature documentation

## 🔄 Re-running Conversion

To modify or re-convert:

```bash
cd _ORIGINAL_FILES
nano contentful-to-wordpress-modules.py  # Edit as needed
python3 contentful-to-wordpress-modules.py
```

New files will overwrite existing ones in `_ORIGINAL_FILES/`.

## 📚 Related Documentation

- **Template File:** `page-platform-detail.php`
- **Component:** `template-parts/components/module-template-page.php`
- **ACF Field Group:** Platform Detail Page fields
- **Parent Page:** Decision Cloud (recommended)

## 🏗️ Recommended Page Structure

These pages work best as children of a parent "Decision Cloud" or "Platform" page:

```
Decision Cloud (parent)
├── Aera Workspaces
├── Agentic Ambient Orchestration
├── Decision Engines
├── Data Workbench™
├── Aera Control Room
├── Aera Chat
├── Aera Inbox
├── Aera Discovery™
├── Decision Data Model™
├── Aera Cortex™
├── Business Rules
├── Data Crawlers
├── Decision Board
├── Decision Engagement
├── Process Builder
└── Simulation & Planning
```

After import, you can set the parent page by editing each page and selecting the parent in "Page Attributes".

---

**Export Date:** November 24, 2025 (from Contentful)
**Conversion Date:** December 19, 2025
**Contentful Content Type:** `moduleTemplatePage`
**WordPress Template:** `page-platform-detail.php`
**WordPress Post Type:** `page`
**Total Pages:** 16
**Page IDs:** 3001-3016



