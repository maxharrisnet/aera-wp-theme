# Skills Import - Spreadsheet to WordPress

Complete guide for importing 64 Decision Intelligence Skills from spreadsheet to WordPress.

## 📦 What Was Created

**64 Skills** across **6 business functions** and **18 categories** have been converted to WordPress format.

## 🏗️ Taxonomy Structure Created

### New Taxonomies Added to `inc/taxonomies.php`:
1. **`skill_function`** - Top-level business functions (hierarchical)
2. **`skill_category`** - Sub-categories within functions (hierarchical)

### 6 Functions:
- **Supply Chain** (32 skills)
- **Sales & Marketing** (11 skills)
- **Procurement** (9 skills)
- **Finance** (9 skills)
- **ESG** (2 skills)
- **HR** (1 skill)

### 18 Categories:
- **Supply Chain:** Demand, Inventory, Order, Logistics, Control Tower, Master Data Management
- **Procurement:** Procurement
- **Sales & Marketing:** S&OP, Revenue Optimization, Marketing Management, Sales Planning, GTM Strategy
- **Finance:** IBP, P&L, FP&A, Strategic Finance
- **HR:** Workforce Planning
- **ESG:** ESG

## 🗺️ Field Mapping Summary

| Spreadsheet Column | WordPress Field | Type | Implementation |
|-------------------|-----------------|------|----------------|
| Function | `skill_function` | Taxonomy | ✅ Created |
| Category | `skill_category` | Taxonomy | ✅ Created |
| Skill | `post_title` | Standard | ✅ Mapped |
| Card Definitions | `skill_description` | ACF | ✅ Mapped |
| Website Content | Multiple fields | ACF | ✅ Parsed (see below) |
| Demo Video Link | `content_sections` + `related_resources` | ACF Repeater | ✅ Mapped |
| Attachments | `related_resources` | ACF Repeater | ✅ Parsed |

### Website Content Parsing:

The "Website Content" column contains structured text that was parsed into:

1. **Content Section** (`content_sections` repeater):
   - Label: "Overview"
   - Content: Full website content text

2. **Features** (`how_aera_helps_items` repeater):
   - **Understands** → Title + Description
   - **Recommends** → Title + Description
   - **Acts** → Title + Description
   - **Learns** → Title + Description

3. **Demo Section** (if video/screenshot reference exists):
   - Label: "Demo"
   - Content: Demo reference text

## ✅ ACF Fields Populated

### Card Tab:
- ✅ `skill_description` - Short card description (from "Card Definitions" column)
- ⏸️ `skill_card_image` - (empty, add manually if needed)
- ⏸️ `skill_icon` - (empty, supports SVG, placeholder available at `assets/images/icons/skill-placeholder.svg`)
- ✅ `featured_skill` - 6 skills automatically marked (one per function)

### Content Sections Tab:
- ✅ `content_sections` (repeater)
  - Overview section with full content
  - Demo section (if applicable)

### How Aera Helps Tab (rename to "Features"):
- ✅ `how_aera_helps_items` (repeater)
  - 4 items: Understands, Recommends, Acts, Learns
  - **Note:** No feature icons field - only the main skill icon is used

### Related Content Tab:
- ✅ `related_resources` (repeater)
  - Demo video references
  - Blogs, case studies, webinars
  - Type labels extracted from attachments

### Yoast SEO:
- ✅ `_yoast_wpseo_title` - "{Skill Name} | Aera Technology"
- ✅ `_yoast_wpseo_metadesc` - First 155 chars of card definition
- ✅ `_yoast_wpseo_focuskw` - Skill name (lowercased)

## 📁 Generated Files

- **`wordpress-skills-import.xml`** (432KB) - WordPress WXR import file
- **`skills-import-summary.json`** (562B) - Import summary
- **`contentful-to-wordpress-skills.py`** - Conversion script
- **`SKILLS-ACF-FIELD-CHANGE-NEEDED.md`** - Manual update instructions

## 🚀 Import Instructions

### Step 1: Import Skills to WordPress

1. Log into WordPress admin
2. Go to **Tools** → **Import** → **WordPress**
3. Upload `wordpress-skills-import.xml`
4. Assign posts to admin user
5. Click **Submit**

This creates:
- ✅ 64 skill posts (IDs 4001-4064)
- ✅ 6 function taxonomy terms
- ✅ 18 category taxonomy terms
- ✅ All ACF fields populated
- ✅ Yoast SEO fields populated

### Step 2: Verify Taxonomies

1. Go to **Skills** → **Functions** (or **Categories**)
2. Verify all terms were imported correctly
3. Check that skills are properly categorized

### Step 3: Update ACF Field Labels (Optional but Recommended)

See `SKILLS-ACF-FIELD-CHANGE-NEEDED.md` for instructions to change "How Aera Helps" to "Features" or similar.

You can update via:
- **Method A:** WordPress Admin → Custom Fields → Edit field group
- **Method B:** Edit `acf-json/group_aera_skill.json` directly

Recommended change: **"How Aera Helps" → "Features"**

### Step 4: Add Icons (Optional)

A placeholder icon is available at `assets/images/icons/skill-placeholder.svg`.

To add icons to skills:

1. Edit skill posts
2. Add **Skill Icon** (SVG supported)
3. Use placeholder or custom icons

### Step 5: Verify Featured Skills

6 skills are automatically marked as featured (one per function):

- ⭐ **Supply Chain:** Touchless Demand Forecasting
- ⭐ **Procurement:** Spend Optimization
- ⭐ **Sales & Marketing:** Sales & Operations Planning (S&OP)
- ⭐ **Finance:** Integrated Business Planning
- ⭐ **HR:** Headcount/Capacity Planning
- ⭐ **ESG:** Carbon-Footprint optimization

These will display in the 3-column grid (2 rows) on the Skills Home page.

## 📊 Skills by Function

### Supply Chain (32 skills)
**Demand (6):**
- Touchless Demand Forecasting
- Short-Term Demand Sensing
- Mid-Term Demand Planning
- Product Lifecycle Forecasting
- SKU Transition and Activation
- New Product Introduction

**Inventory (8):**
- Dynamic Inventory Management
- Stock Rebalancing
- Ageing Inventory Management
- Supply Chain Loss Prevention
- Supply Chain Loss Mitigation
- Stockout Prevention
- Dynamic Norm Setting
- Dynamic Replenishment & Deployment

**Order (6):**
- Available to Promise
- Dynamic Order Fulfillment
- Dynamic Supply Response
- Backorder Management
- Claims Management
- Order Lifecycle Management

**Logistics (7):**
- Efficient Shipping Plan
- Slot Scheduling
- Container Utilization
- Direct Shipment
- Logistics Event Management
- Dynamic Lead Time
- Reverse Logistics Management

**Control Tower (3):**
- Supply Chain Control Tower: Order Lifecycle Management
- Root Cause Analysis & Prediction
- Supply Scorecard and Ranking

**Master Data Management (2):**
- Master Data Management
- End-to-End Lead Time Visibility

### Procurement (9 skills)
- Spend Optimization
- Best Supplier Selection
- Supply Resilience
- Supplier Buyer Collaboration
- PO Lifecycle Automation
- Four-Way Match
- Purchase Price Variance
- Contract Coverage
- Material Risk Management

### Sales & Marketing (11 skills)
**S&OP (1):**
- Sales & Operations Planning

**Revenue Optimization (2):**
- Trade Promotion Optimization
- Price Optimization

**Marketing Management (3):**
- Demand Shaping
- Media Optimization
- Marketing Performance Management

**Sales Planning (2):**
- Sales Forecasting
- Sales Incentives

**GTM Strategy (3):**
- Sales Resource Planning
- Territory Planning
- Quota Planning

### Finance (9 skills)
**IBP (3):**
- Integrated Business Planning
- Financial Supply Planning
- Cash & Liquidity Forecasting

**P&L (2):**
- Profit and Loss Planning and Forecasting
- Tariff Risk Mitigation

**FP&A (3):**
- Budget Planning
- Long Range Planning
- Zero Based Budgeting

**Strategic Finance (1):**
- Product & Customer Profitability

### HR (1 skill)
**Workforce Planning (1):**
- Headcount/Capacity Planning

### ESG (2 skills)
**ESG (2):**
- Carbon-Footprint optimization
- Circular Economy Scenario Planning

## 🔧 Troubleshooting

### Taxonomies Not Showing
- Verify `inc/taxonomies.php` was updated correctly
- Flush permalinks: Settings → Permalinks → Save Changes
- Check that `register_taxonomies()` function runs

### ACF Fields Not Populated
- Ensure ACF field group is active
- Check field names match exactly (case-sensitive)
- Verify repeater field data format

### Icons Not Uploading (SVG)
Add SVG support to WordPress if needed:

```php
// In functions.php or plugin
add_filter('upload_mimes', function($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
});
```

### Resources Not Displaying
- Resources are text references, not actual links
- You may need to manually update URLs
- Some are marked as "NA" or "None available"

## 📝 Data Quality Notes

- **Video References:** Most are text references ("Current Website Video", "Screenshot X") not URLs
- **Resources:** Parsed from attachments column, may need manual URL additions
- **Icons:** Placeholder icon available at `assets/images/icons/skill-placeholder.svg`
- **Featured Skills:** 6 skills automatically marked (one per function)
- **Card Descriptions:** Populated from "Card Definitions" spreadsheet column

## 🔄 Re-running Conversion

To regenerate the import file:

```bash
cd _ORIGINAL_FILES
python3 contentful-to-wordpress-skills.py
```

New files will overwrite existing ones.

## 📚 Related Documentation

- **Taxonomy Code:** `inc/taxonomies.php`
- **ACF Fields:** `acf-json/group_aera_skill.json`
- **Source Spreadsheet:** `../_SKILLS_PAGES/Skills Project - Website and Videos - Website Content Skills.csv`

---

**Generated:** December 30, 2025
**Source:** Skills Project Spreadsheet
**WordPress Post Type:** `skill`
**Post IDs:** 4001-4064
**Total Skills:** 64

