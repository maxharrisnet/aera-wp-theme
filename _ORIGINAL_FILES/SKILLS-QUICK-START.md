# Skills Import - Quick Start Guide

## 🚀 5-Minute Import

### 1️⃣ Import to WordPress (2 min)
```
WordPress Admin → Tools → Import → WordPress
Upload: wordpress-skills-import.xml
Click: Submit
```

### 2️⃣ Flush Permalinks (30 sec)
```
Settings → Permalinks → Save Changes
```

### 3️⃣ Verify Import (2 min)
```
✓ Skills → All Skills (64 posts)
✓ Skills → Functions (6 terms)
✓ Skills → Categories (18 terms)
```

### 4️⃣ View on Site (30 sec)
```
Visit: /skills (Skills Home)
Click any skill to test detail page
```

## ✅ What's Included

✅ 64 skill posts (complete data)
✅ 6 business functions
✅ 18 categories
✅ All ACF fields populated
✅ SEO meta data
✅ Content sections
✅ Features (Understands/Recommends/Acts/Learns)
✅ Related resources

## ⏸️ What's Left Empty (Add Manually)

⏸️ Skill icons (placeholder icon available at `assets/images/icons/skill-placeholder.svg`)
⏸️ Demo video embeds (references only)

## ✅ What's Already Set

✅ 6 featured skills (one per function) automatically marked
✅ All skill card descriptions populated
✅ Taxonomies assigned

## 🏷️ Taxonomies Created

### Functions (6):
- Supply Chain (32 skills)
- Sales & Marketing (11 skills)
- Procurement (9 skills)
- Finance (9 skills)
- ESG (2 skills)
- HR (1 skill)

### Categories (18):
Demand, Inventory, Order, Logistics, Control Tower, Master Data Management, Procurement, S&OP, Revenue Optimization, Marketing Management, Sales Planning, GTM Strategy, IBP, P&L, FP&A, Strategic Finance, Workforce Planning, ESG

## 📝 Post-Import Checklist

- [ ] Import XML file
- [ ] Flush permalinks
- [ ] Verify 64 skills imported
- [ ] Verify taxonomies created
- [ ] Verify 6 skills marked as "Featured" (one per function)
- [ ] Add placeholder icons to skills (optional)
- [ ] (Optional) Rename "How Aera Helps" field label to "Features"

## 🔗 Archive Pages

After import, these pages work automatically:

- `/skills` - Skills home (all skills grouped by function)
- `/function/{slug}` - Filter by function
- `/category/{slug}` - Filter by category
- `/skill/{skill-name}` - Individual skill detail

## ⚠️ Troubleshooting

**Q:** Taxonomies not showing?
**A:** Flush permalinks (Settings → Permalinks → Save)

**Q:** ACF fields empty?
**A:** Verify ACF plugin is active and field group exists

**Q:** Can't upload SVG icons?
**A:** Add SVG support (see main README)

**Q:** Skills not grouped on home page?
**A:** Check `page-skills-home.php` template queries

## 📚 Full Documentation

See `SKILLS-IMPORT-README.md` for complete details.

---

**Need help?** Check the full README for detailed field mapping, data structure, and troubleshooting.

