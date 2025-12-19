# All Remaining Customers - Contentful to WordPress Import

This document covers the conversion of **all remaining 23 customer entries** from Contentful to WordPress format.

## 📦 Customers Converted

### Total: 23 Customers
- **Already Imported (Separately):** BP-Castrol, PMI, AstraZeneca
- **Excluded:** Unilever (per request)
- **Remaining:** 23 customers now ready for import

### Customer List by Industry

#### Manufacturing (4)
1. **Deacero** - 3 assets
2. **InfraBuild** - 1 asset
3. **Mitsubishi Chemical Group** - 1 asset
4. **Manufacturing** (Anonymous) - 0 assets

#### CPG (Consumer Packaged Goods) (5)
5. **J.D. Irving** - 1 asset
6. **Kraft Heinz** - 1 asset
7. **Becle** - 4 assets
8. **Mars** - 3 assets
9. **Global CPG** (Anonymous) - 1 asset

#### Life Sciences (2)
10. **Baxter** - 1 asset
11. **Merck Animal Health** - 2 assets

#### Pharmaceutical (3)
12. **GSK** - 1 asset
13. **Alcon** - 1 asset
14. **Pharmaceutical** (Anonymous) - 1 asset

#### Technology (2)
15. **Dell** - 2 assets
16. **Science & Technology** (Anonymous) - 1 asset

#### Automotive (1)
17. **Lucid** - 1 asset

#### Higher Education (1)
18. **Western Governors University** - 3 assets

#### Chemicals (1)
19. **Mitsubishi Chemical Group** - 1 asset

#### Other/Anonymous (6)
20. **Health & Hygiene** - 1 asset
21. **Animal Health Products** - 1 asset
22. **Petrochemical** (Anonymous) - 1 asset
23. **Global FMCG** (Anonymous, duplicate entry) - 1 asset each

## 📁 Generated Files

- **`wordpress-customers-import-all.xml`** (73KB) - WordPress import file
- **`customer-import-all-summary.json`** (7.4KB) - Detailed customer data summary
- **`download-all-customer-images.sh`** (8.1KB) - Image download script
- **`contentful-to-wordpress-all.py`** - Conversion script

## 🎯 Key Features

### Company Name Extraction
The script intelligently extracts company names from:
1. `companyText` field (primary)
2. Logo filenames and titles
3. Hero image metadata
4. Title patterns (e.g., "Company Name: Description", "At Company Name")
5. Known brand mappings for proper capitalization

### Proper Brand Capitalization
- J.D. Irving (not "jdirving")
- Kraft Heinz (not "KraftHeinz")
- InfraBuild (not "infrabuild")
- GSK (not "Gsk")

### Field Mapping
All fields mapped to ACF custom fields:
- `customer_card_title` = Company name
- `customer_company_name` = Company name (same value)
- `customer_hero_image` = Hero background image
- `customer_logo` = Company logo
- `customer_type` = Industry/type
- `customer_asset_1_*` = First asset (title, CTA, URL)
- `customer_asset_2_*` = Second asset (title, CTA, URL)

**Note:** Some customers have 3-4 assets in Contentful, but ACF only supports 2. Additional assets are stored as meta fields (`_customer_asset_3_*` and `_customer_asset_4_*`) for reference.

## 🚀 Import Instructions

### Step 1: Download Images (Optional first, or after import)

```bash
cd _ORIGINAL_FILES
bash download-all-customer-images.sh
```

This will download **37 images** to `customer-images-all/` directory.

### Step 2: Import Customer Posts to WordPress

1. Log into WordPress admin
2. Go to **Tools** → **Import** → **WordPress**
3. Upload `wordpress-customers-import-all.xml`
4. Assign posts to admin user
5. Click **Submit**

This creates 23 customer posts (IDs 2001-2023) with all ACF fields populated.

### Step 3: Upload Images to WordPress Media Library

1. Go to **Media** → **Add New**
2. Upload all images from `customer-images-all/`
3. Note the attachment IDs (or use filenames to reference later)

### Step 4: Link Images to Customer Posts

For each of the 23 customer posts:

1. Go to **Customers** in WordPress admin
2. Edit the customer post
3. Update `Hero Image` and `Company Logo` ACF fields
4. Select the corresponding images you uploaded

**Tip:** Original Contentful URLs are stored in `_customer_hero_image_url` and `_customer_logo_url` meta fields for reference.

### Step 5: Setup Industry Taxonomy (Recommended)

Create taxonomy terms for:
- Manufacturing
- CPG (Consumer Packaged Goods)
- Life Sciences
- Pharmaceutical
- Technology
- Automotive
- Higher Education
- Chemicals
- Health & Hygiene
- Animal Health Products
- Petrochemical
- FMCG

Then assign appropriate terms to each customer post via the `customer_industry_taxonomy` field.

## 📊 Data Summary

### Assets
- **Total Assets:** 37 across 23 customers
- **Average:** 1.6 assets per customer
- **Range:** 0-4 assets per customer
- **Most Assets:** Becle (4 assets)

### Images
- **37 images total** (hero images + logos)
- **20 customers** have both hero image and logo
- **3 customers** have hero image only (anonymous entries)

### Anonymous/Generic Entries
**6 customers** use generic industry names instead of specific company names:
- Global CPG (2 entries)
- Health & Hygiene
- Animal Health Products
- Petrochemical
- Global FMCG
- Pharmaceutical
- Science & Technology
- Manufacturing

These appear to be confidential/NDA customers where the actual company name cannot be disclosed.

## 🔧 Troubleshooting

### Duplicate Slug Warning
If you see "Global FMCG" duplicate warnings, WordPress will automatically append numbers (global-fmcg, global-fmcg-2). This is expected for the two anonymous FMCG entries.

### Missing Company Names
Some entries show industry names (e.g., "Manufacturing", "Pharmaceutical") because:
- No company logo/name was provided in Contentful
- Entry is intentionally anonymous (NDA/confidential)

### Images Not Linking
If ACF image fields don't save:
- Ensure ACF field return format is set to "Array"
- Verify attachment IDs are correct
- Check file permissions in WordPress uploads directory

### Additional Assets
If a customer has 3-4 assets in Contentful:
- Assets 1-2 go into ACF fields
- Assets 3-4 are stored in meta fields: `_customer_asset_3_*` and `_customer_asset_4_*`
- You can manually copy these to create additional asset sections in your template

## 📝 Post IDs

WordPress Post IDs: **2001-2023**
- This range avoids conflicts with the first batch (1001-1003)
- Sequential IDs for easy reference

## 🔄 Re-running the Conversion

To modify selection criteria or update data:

```bash
cd _ORIGINAL_FILES
nano contentful-to-wordpress-all.py  # Edit as needed
python3 contentful-to-wordpress-all.py
```

New files will overwrite existing ones in `_ORIGINAL_FILES/`.

## 📚 Related Files

- **First Batch (3 customers):** `wordpress-customers-import.xml` (IDs 1001-1003)
- **All Remaining:** `wordpress-customers-import-all.xml` (IDs 2001-2023)
- **Combined Total:** 26 customers imported (excluding Unilever, 27 total in Contentful)

---

**Generated:** December 19, 2025
**Contentful Space:** mh1amgo8m7ts (master environment)
**WordPress Post Type:** `customer`
**Script:** `contentful-to-wordpress-all.py`

