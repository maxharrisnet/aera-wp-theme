# 🎯 Customer Data Import - Complete Guide

Complete documentation for importing Contentful customer data into WordPress.

## 📦 Summary

**Total Customers Available:** 27 in Contentful
**Excluded:** Unilever (1)
**Converted:** 26 customers in 2 batches

### Batch 1: Sample Data (3 customers)
- **File:** `wordpress-customers-import.xml`
- **Post IDs:** 1001-1003
- **Customers:** BP-Castrol, PMI, AstraZeneca
- **Purpose:** Initial sample/test import

### Batch 2: All Remaining (23 customers)
- **File:** `wordpress-customers-import-all.xml`
- **Post IDs:** 2001-2023
- **Customers:** All remaining (see list below)
- **Purpose:** Full production import

## 🗂️ File Structure

```
_ORIGINAL_FILES/
├── contentful-export-mh1amgo8m7ts-master-2025-11-24T23-06-28.json  (Source data)
│
├── BATCH 1 - Sample (3 customers)
│   ├── wordpress-customers-import.xml                 (10KB)
│   ├── customer-data-summary.json                      (5.6KB)
│   ├── download-customer-images.sh                     (Executable)
│   ├── customer-images/                                (6 images)
│   ├── CUSTOMER-IMPORT-README.md                       (Detailed guide)
│   └── QUICK-START.md                                  (Quick reference)
│
├── BATCH 2 - All Remaining (23 customers)
│   ├── wordpress-customers-import-all.xml             (73KB)
│   ├── customer-import-all-summary.json               (7.4KB)
│   ├── download-all-customer-images.sh                (Executable)
│   ├── customer-images-all/                           (37 images)
│   └── CUSTOMER-IMPORT-ALL-README.md                  (Detailed guide)
│
├── SCRIPTS
│   ├── contentful-parser.py                           (Analysis tool)
│   ├── contentful-to-wordpress.py                     (Batch 1 converter)
│   └── contentful-to-wordpress-all.py                 (Batch 2 converter)
│
└── THIS FILE
    └── README-CUSTOMER-IMPORTS.md                     (Master guide)
```

## 🚀 Quick Start - Import All Customers

### Option A: Import Both Batches (Recommended)

```bash
cd _ORIGINAL_FILES

# Download all images
bash download-customer-images.sh
bash download-all-customer-images.sh
```

Then in WordPress admin:
1. Import `wordpress-customers-import.xml` (3 customers)
2. Import `wordpress-customers-import-all.xml` (23 customers)
3. Upload all images from `customer-images/` and `customer-images-all/`
4. Link images to customer posts via ACF fields

### Option B: Import Only Remaining Customers

If you already imported Batch 1:

```bash
cd _ORIGINAL_FILES
bash download-all-customer-images.sh
```

Then import only `wordpress-customers-import-all.xml` to WordPress.

## 📊 Complete Customer List (26 Total)

### Batch 1: Sample Data (IDs 1001-1003)
1. **BP-Castrol** - Petrochemical
2. **PMI (Philip Morris International)** - CPG
3. **AstraZeneca** - Pharmaceutical

### Batch 2: All Remaining (IDs 2001-2023)

#### Named Companies (17)
4. **Deacero** - Manufacturing
5. **J.D. Irving** - CPG
6. **Kraft Heinz** - CPG
7. **InfraBuild** - Manufacturing
8. **Baxter** - Life Sciences
9. **Becle** - CPG
10. **Merck Animal Health** - Life Sciences
11. **Western Governors University** - Higher Education
12. **Dell** - Technology
13. **Mars** - CPG
14. **Mitsubishi Chemical Group** - Chemicals
15. **Lucid** - Automotive
16. **GSK** - Pharmaceutical
17. **Alcon** - Pharmaceutical

#### Anonymous/Confidential Companies (6)
18. **Global CPG** - CPG (confidential)
19. **Health & Hygiene** - Health & Hygiene (confidential)
20. **Animal Health Products** - Animal Health (confidential)
21. **Petrochemical** - Petrochemical (confidential)
22. **Global FMCG** - FMCG (confidential, 2 entries)
23. **Pharmaceutical** - Pharmaceutical (confidential)
24. **Science & Technology** - Tech (confidential)
25. **Manufacturing** - Manufacturing (confidential)

## 🎨 Key Features

### ✅ Intelligent Company Name Extraction
The conversion script intelligently determines company names from:
- Contentful `companyText` field
- Logo filenames and asset metadata
- Title patterns ("Company Name: Description", "At Company Name")
- Known brand mappings for proper capitalization

### ✅ Proper Brand Names
- J.D. Irving (not "jdirving")
- Kraft Heinz (not "kraftheinz")
- InfraBuild (proper camelCase)
- GSK (all caps)
- All other brands properly capitalized

### ✅ Complete Field Mapping
Every Contentful field mapped to WordPress ACF:
- `customer_card_title` = Company name
- `customer_company_name` = Company name (same value)
- `customer_hero_image` = Background image
- `customer_logo` = Company logo
- `customer_type` = Industry/category
- `customer_industry_taxonomy` = (for taxonomy assignment)
- `customer_asset_1_*` = First asset (title, CTA, URL)
- `customer_asset_2_*` = Second asset (title, CTA, URL)
- `_customer_asset_3_*` = Third asset (stored as meta, if exists)
- `_customer_asset_4_*` = Fourth asset (stored as meta, if exists)
- `_original_contentful_title` = Original descriptive title

## 📈 Statistics

### By Industry
- **CPG:** 6 customers
- **Manufacturing:** 4 customers
- **Pharmaceutical:** 4 customers
- **Life Sciences:** 2 customers
- **Technology:** 2 customers
- **FMCG:** 2 customers
- **Automotive:** 1 customer
- **Chemicals:** 1 customer
- **Petrochemical:** 2 customers
- **Higher Education:** 1 customer
- **Health & Hygiene:** 1 customer

### Assets
- **Total Assets:** 40+ across all customers
- **Most Assets:** Becle (4 assets)
- **Average:** 1.5 assets per customer

### Images
- **Total Images:** 43 (hero images + logos)
- **Batch 1:** 6 images
- **Batch 2:** 37 images

## 🔧 Advanced Usage

### Re-converting Data

If you need to modify or re-convert:

```bash
cd _ORIGINAL_FILES

# Edit the conversion script
nano contentful-to-wordpress-all.py

# Run conversion
python3 contentful-to-wordpress-all.py

# New files will be generated
```

### Adding More Customers

To include additional customers:
1. Edit `contentful-to-wordpress-all.py`
2. Modify the `ALREADY_CONVERTED` list
3. Adjust filtering logic as needed
4. Re-run the script

### Custom Field Mapping

To change field mappings:
1. Edit the `create_wxr_xml()` function in the conversion script
2. Update `add_postmeta()` calls to match your ACF field names
3. Re-run conversion

## 📚 Documentation Files

- **`README-CUSTOMER-IMPORTS.md`** (this file) - Master overview
- **`CUSTOMER-IMPORT-README.md`** - Batch 1 detailed guide
- **`CUSTOMER-IMPORT-ALL-README.md`** - Batch 2 detailed guide
- **`QUICK-START.md`** - Quick reference for Batch 1
- **`customer-data-summary.json`** - Batch 1 data structure
- **`customer-import-all-summary.json`** - Batch 2 data structure

## ⚠️ Important Notes

1. **Post IDs:** Batch 1 uses 1001-1003, Batch 2 uses 2001-2023 (no conflicts)
2. **Images:** Must be manually uploaded and linked after import
3. **Taxonomy:** Industry terms must be created manually
4. **Anonymous Entries:** Some customers are intentionally anonymous (NDA/confidential)
5. **Extra Assets:** Customers with 3-4 assets store extras in meta fields

## 🆘 Troubleshooting

### Import Fails
- Increase PHP memory limit in `wp-config.php`
- Check file upload size limit
- Verify WordPress Importer plugin is active

### Images Not Displaying
- Confirm images were uploaded to Media Library
- Check ACF return format is set to "Array"
- Verify attachment IDs are correct

### Duplicate Company Names
WordPress will append numbers to duplicate slugs (e.g., global-fmcg-2). This is expected for anonymous entries.

## 📞 Support

For issues or questions:
1. Check the detailed README files for each batch
2. Review the JSON summary files for data verification
3. Examine the conversion scripts for field mapping details

---

**Export Date:** November 24, 2025 (from Contentful)
**Conversion Date:** December 19, 2025
**Contentful Space ID:** mh1amgo8m7ts
**Environment:** master
**WordPress Post Type:** `customer`
**Total Records:** 26 customers (27 in Contentful, excluding Unilever)

