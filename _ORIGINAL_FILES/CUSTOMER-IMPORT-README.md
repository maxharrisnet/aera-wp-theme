# Customer Data Import from Contentful to WordPress

This document explains the Contentful to WordPress customer data conversion process and how to import the sample data.

## 📦 What Was Converted

We've converted **3 most recent customer entries** from Contentful (excluding Unilever) into WordPress-compatible format:

1. **BP-Castrol** - Petrochemical industry
2. **PMI (Philip Morris International)** - CPG industry
3. **AstraZeneca** - Pharmaceutical industry

## 📁 Generated Files

### Import Files
- **`wordpress-customers-import.xml`** - WordPress WXR format import file with all customer data
- **`customer-data-summary.json`** - Human-readable JSON summary of converted data

### Helper Scripts
- **`download-customer-images.sh`** - Bash script to download all customer images from Contentful CDN
- **`../contentful-parser.py`** - Python script to analyze Contentful export structure
- **`../contentful-to-wordpress.py`** - Python script that performs the conversion

## 🗺️ Field Mapping

Contentful fields have been mapped to WordPress ACF custom fields as follows:

| Contentful Field | WordPress ACF Field | Notes |
|-----------------|-------------------|-------|
| `title` | `customer_card_title` | Card display title |
| `heroImage` | `customer_hero_image` | Background image for card |
| `companyLogo` | `customer_logo` | Company logo image |
| `companyText` | `customer_company_name` | Company name (text fallback) |
| `type` | `customer_type` | Industry/type tag |
| `type` | `customer_industry_taxonomy` | Should map to taxonomy term |
| `assetTitle` | `customer_asset_1_title` | First asset title |
| `assetType` | `customer_asset_1_cta` | First asset CTA button text |
| `assetLink` | `customer_asset_1_url` | First asset URL |
| `assetTitle2` | `customer_asset_2_title` | Second asset title |
| `assetType2` | `customer_asset_2_cta` | Second asset CTA button text |
| `assetLink2` | `customer_asset_2_url` | Second asset URL |

## 🚀 Import Process

### Step 1: Download Images

Run the image download script to fetch all customer images from Contentful:

```bash
cd /path/to/theme
bash _ORIGINAL_FILES/download-customer-images.sh
```

This will download 6 images (3 hero images + 3 logos) to `_ORIGINAL_FILES/customer-images/`

### Step 2: Upload Images to WordPress

1. Log into WordPress admin
2. Go to **Media > Add New**
3. Upload all images from `_ORIGINAL_FILES/customer-images/`
4. Note the attachment IDs for each image (you'll need these in Step 4)

### Step 3: Import Customer Posts

1. Go to **Tools > Import**
2. Install the "WordPress Importer" plugin if not already installed
3. Choose **Run Importer**
4. Upload `_ORIGINAL_FILES/wordpress-customers-import.xml`
5. Assign posts to an admin user
6. Click **Submit**

This will create 3 customer posts (post type: `customer`) with all ACF fields populated.

### Step 4: Update Image References

After import, the ACF image fields will have placeholder values. You need to update them with actual WordPress attachment IDs:

1. Go to **Custom Post Type > Customers**
2. Edit each customer post
3. For `customer_hero_image` and `customer_logo` fields:
   - Remove the placeholder text
   - Select the image you uploaded in Step 2
   - The original Contentful URLs are stored in `_customer_hero_image_url` and `_customer_logo_url` meta fields for reference

### Step 5: Setup Industry Taxonomy (Optional)

If you want to use the taxonomy field (`customer_industry_taxonomy`):

1. Create taxonomy terms for: Petrochemical, CPG, Pharmaceutical
2. Edit each customer post
3. Assign the appropriate industry term(s)

## 📊 Customer Data Summary

### 1. BP-Castrol
- **Type:** Petrochemical
- **Assets:** 1 video - "Accelerating Cross-Functional Agility BP-Castrol's AI-Driven Supply Chain Transformation"
- **Images:**
  - Hero: `bp-castrol-hero.jpg`
  - Logo: `bp-castrol-logo.png`

### 2. PMI (Philip Morris International)
- **Type:** CPG
- **Assets:** 2 videos
  1. "Warp-Speed Supply Chain: Decision Intelligence Powering PMI's Smoke-Free Future"
  2. "Leveraging decision intelligence to improve supply chain agility and efficiency"
- **Images:**
  - Hero: `pmi-hero.webp`
  - Logo: `pmi-logo.png`

### 3. AstraZeneca
- **Type:** Pharmaceutical
- **Assets:** 1 video - "Advancing Clinical Trials with Decision Intelligence at AstraZeneca"
- **Images:**
  - Hero: `astrazeneca-hero.jpg`
  - Logo: `astrazeneca-logo.png`

## 🔧 Troubleshooting

### Images Not Displaying
- Verify images were uploaded to Media Library
- Check that ACF image fields are set to return format: `array`
- Ensure attachment IDs are correctly assigned in ACF fields

### Import Fails
- Increase PHP memory limit: `WP_MEMORY_LIMIT` in `wp-config.php`
- Check file upload size limit in PHP settings
- Verify the WordPress Importer plugin is activated

### Missing Custom Fields
- Ensure ACF field group `group_aera_customer` is imported and active
- Check that field group location rules target `post_type == customer`
- Verify the field names match exactly (case-sensitive)

## 📝 Notes

- The Contentful export had 27 customer card entries total
- Unilever was filtered out as requested
- The 3 selected are the most recently updated (as of June 2025)
- All asset links point to Aera's video platform (meet.aeratechnology.com)
- Image URLs use Contentful CDN (images.ctfassets.net)
- Post IDs start at 1001 to avoid conflicts with existing posts

## 🔄 Re-running the Conversion

If you need to convert different customers or update the data:

1. Edit `contentful-to-wordpress.py` to modify selection criteria
2. Run: `python3 contentful-to-wordpress.py`
3. New files will be generated in `_ORIGINAL_FILES/`
4. Follow the import process again

## 📚 Source Files

- **Contentful Export:** `contentful-export-mh1amgo8m7ts-master-2025-11-24T23-06-28.json`
- **ACF Field Definitions:** `../acf-json/group_aera_customer.json`

---

**Generated:** December 19, 2025
**Contentful Space:** mh1amgo8m7ts (master environment)
**WordPress Post Type:** `customer`

