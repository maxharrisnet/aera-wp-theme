# Press Release Template & Import Plan

## Current Status

### Post Type Registration ✅

- **Post Type Slug:** `press-release`
- **Resource Card Fields:** Available (group_aera_resource_fields.json)
  - `resource_card_title`
  - `resource_author`
  - `resource_card_image` (featured image)
  - `resource_excerpt`
  - `resource_cta_text` (default: "Read")
  - `resource_external_url`

### Contentful Data ❌

- No dedicated "Press Release" content type in Contentful export
- Options:
  1. Use "News Item" entries and filter by category/tag
  2. Create Press Release entries manually in WordPress
  3. Use existing data from original site (if available)

## Template Plan

### Single Post Template: `single-press-release.php`

**Layout:** Two-column (similar to single blog)

```
┌─────────────────────────────────┐
│         Hero/Header             │
├─────────────┬───────────────────┤
│             │                   │
│   Main      │   Sidebar:        │
│   Content   │  - Share links    │
│  (Left)     │  - Related items  │
│             │  - CTA buttons    │
│             │                   │
└─────────────┴───────────────────┘
```

### Main Content Handling

**Recommendation:** Use flexible approach

1. **Short-term:** Store as HTML/markup in `resource_excerpt` or custom `resource_content` field
2. **Long-term:** Create custom ACF field group for structured Press Release fields:
   - `press_release_body` (Rich Text Editor)
   - `press_release_date` (Date)
   - `press_release_category` (Taxonomy)
   - etc.

**For now:** We can:

- Use `the_content()` for post body (populated during import via `<content:encoded>`)
- Use `resource_excerpt` for summary/teaser
- Store main HTML in post content during WXR generation

### Sidebar Components

1. **Share Links** - Social sharing (Twitter, LinkedIn, Facebook, Email)
2. **Related Press Releases** - Query related items by category/tag
3. **CTA Section** - Link to resources or external URL
4. **Author Info** - From `resource_author` field

### Template Files Needed

- `single-press-release.php` - Main template
- `template-parts/content-press-release.php` - Post content partial
- `template-parts/content-press-release-share.php` - Share links
- `template-parts/content-press-release-related.php` - Related items

## Import Strategy

### Data Source Options

**Option A: Create manually**

- Create press releases directly in WordPress admin
- Use Resource Card fields

**Option B: Import from News Items**

- Filter News Item entries from Contentful by type/category
- Export to WXR with custom post type mapping
- Script: `scripts/contentful-press-releases-to-wxr.js`

**Option C: Create sample data**

- Create 5-10 sample press releases for testing
- Can source from company website or news section

### Recommended Approach

Start with **Option C** (sample data) to:

1. Develop and test the template
2. Establish the markup/content structure
3. Test sharing functionality and related items logic
4. Then scale to real data

## Content Markup Handling

### Question: How to store HTML content?

**Approach 1: Post Content (WordPress Native)**

- Store HTML in `post_content`
- Use `the_content()` in template
- Pros: Native WordPress, WYSIWYG editor, filtering/hooks
- Cons: Can't separate from main display

**Approach 2: ACF Rich Text Field**

- Create `press_release_body` field
- Pros: Flexible, separate from post content, reusable
- Cons: Need to add ACF field group

**Approach 3: External URL Only**

- Store main content as URL in `resource_external_url`
- Link to external source (news site, etc.)
- Pros: Simple, reference actual article
- Cons: Don't host content locally

### Recommendation

**Use Approach 1** initially:

- Generate WXR with HTML in `<content:encoded>` during import
- WordPress imports it into `post_content`
- Template displays with `the_content()`
- Can always migrate to ACF field later if needed

## Next Steps

1. **Decide data source:** Where should press releases come from?
   - Create sample data manually?
   - Use News Item entries from Contentful?
   - Other source?

2. **Confirm content structure:**
   - What HTML/markup format for the main body?
   - Need special formatting (headings, quotes, lists, etc.)?

3. **Build components:**
   - Create single template
   - Create sidebar partials
   - Add styling

4. **Create exporter (if needed):**
   - Build WXR generator for press releases
   - Test import

5. **Style & Test:**
   - Apply theme styles
   - Test responsive design
   - Verify share links and related items

## Questions for You

1. **Where should press release content come from?**
   - Manual WordPress admin entry?
   - Contentful data (which content type)?
   - Existing data elsewhere?

2. **What markup format for the main content?**
   - Simple HTML (p, h2, h3, ul, ol, blockquote)?
   - Include images, video embeds?
   - Need special styling?

3. **Should sidebar be hardcoded or widget-based?**
   - Keep hardcoded for now (as mentioned)?
   - Future widget system upgrade?

4. **Related items logic:**
   - By category/tag?
   - By date (most recent)?
   - Manual selection via ACF?
