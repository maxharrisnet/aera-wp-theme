# Skills Pages Implementation

This document outlines the new Skills pages implementation for the Aera Technology website, based on the provided Figma designs.

## 📁 Files Created

### SCSS Files (Styles)
- `sass/components/_skill-card.scss` - Skill card component styles (used in archive and home)
- `sass/pages/_skills-home.scss` - Skills Home landing page styles
- `sass/pages/_skills-archive.scss` - All Skills archive page styles
- `sass/pages/_skills-detail.scss` - Single Skill detail page styles

### PHP Templates
- `page-skills-home.php` - Skills Home landing page template
- `archive-skill.php` - Updated All Skills archive template with sidebar filters
- `single-skill.php` - Updated Single Skill detail page template
- `template-parts/content-skill-card.php` - Skill card template part (supports regular and featured variants)

### ACF JSON Files
- `acf-json/group_aera_skills_home.json` - Fields for Skills Home page
- `acf-json/group_aera_skills_options.json` - Options page fields for archive
- `acf-json/group_aera_skill.json` - Updated with new fields for videos, help items, list items, and featured flag

## 🎨 Three Page Types

### 1. Skills Home Page (`page-skills-home.php`)
Landing page featuring:
- Hero section with title and description
- 2 large featured skill cards at top
- 8 regular skill cards below
- "View All Skills" CTA button
- Icon section with 4 columns
- Resources section (3 featured resources)
- "See Aera in Action" CTA section with 2 buttons

**Setup:**
1. Create a new page in WordPress
2. Select "Skills Home" template
3. Configure ACF fields:
   - Use Page Hero fields for hero section
   - Set Icon Section Title and Icon Items (4 items recommended)
   - Select 3 Featured Resources
   - Configure Action Section title and buttons

### 2. All Skills Archive (`archive-skill.php`)
Archive page with:
- Hero section
- Left sidebar with category filters
- Filterable/sortable skills grid (4 columns)
- Pagination

**Setup:**
1. Skills automatically appear on archive at `/skill/`
2. Configure archive hero in ACF Options > Skills Archive Options
3. Create taxonomy `skill-category` for filtering (optional)
4. Mark skills as "Featured" to show on home page

### 3. Skill Detail/Single (`single-skill.php`)
Individual skill page with:
- Hero with skill name and description
- Tab navigation (Overview, Skills, Use Cases, Product Demo, Analyst Coverage)
- Left sidebar content navigation
- Video cards with expandable details
- "How Aera Helps" section
- "Explore Other Business Functions" section
- Resources section
- CTA section

**Setup:**
Configure these ACF fields when editing a skill:
- Basic: Icon, Tagline, Description
- Skill Videos: Add video cards with thumbnails, titles, descriptions, and expandable details
- How Aera Helps Items: Add help items with icons
- Card List Items: Add up to 4 bullet points for card display
- Related Skills: Link to other skills
- Related Resources: Link to resources
- Featured Skill: Check to show on home page

## 🔧 Required Setup

### 1. Create Skills Options Page
Add this to your `functions.php` or relevant plugin:

```php
if (function_exists('acf_add_options_page')) {
    acf_add_options_page(array(
        'page_title' => 'Skills Archive Options',
        'menu_title' => 'Skills Options',
        'menu_slug' => 'skills-options',
        'capability' => 'edit_posts',
        'parent_slug' => 'edit.php?post_type=skill',
        'position' => false,
        'icon_url' => false,
    ));
}
```

### 2. Register Taxonomy (Optional)
If you want category filtering on the archive, register this taxonomy:

```php
register_taxonomy('skill-category', 'skill', array(
    'labels' => array(
        'name' => __('Skill Categories', 'aera'),
        'singular_name' => __('Skill Category', 'aera'),
    ),
    'public' => true,
    'hierarchical' => true,
    'show_in_rest' => true,
    'show_admin_column' => true,
));
```

### 3. Compile CSS
The CSS has already been compiled, but for future changes run:
```bash
npm run build:css
```

## 📝 ACF Field Requirements

### Skills Home Page Fields
- **Icon Section Title** (text)
- **Icon Items** (repeater) - icon, title, description
- **Resources Section Title** (text)
- **Featured Resources** (relationship) - select 3 posts
- **Action Section Title** (text)
- **Action Buttons** (text + URL for 2 buttons)

### Single Skill Fields (New)
- **Skill Videos** (repeater):
  - Video Title
  - Description
  - Thumbnail
  - Video URL
  - Overview (expandable)
  - Capabilities (expandable)
  - Use Cases (expandable)

- **How Aera Helps Items** (repeater):
  - Icon
  - Title
  - Description

- **Card List Items** (repeater):
  - Item Text (max 4 for card display)

- **Featured Skill** (true/false):
  - Shows on Skills Home page if checked

## 🎯 Demo Content

To populate demo content:

1. **Create Skills** with:
   - Icon (SVG or PNG, ~80x80px recommended)
   - Description (100-150 characters for cards)
   - 2-4 list items for card bullets
   - Mark 2 as "Featured" for home page

2. **Skills Home Page**:
   - Create page, select "Skills Home" template
   - Add 4 icon items
   - Select 3 resources
   - Configure CTA buttons

3. **Skill Detail Pages**:
   - Add 3-6 video cards per skill
   - Add 2-4 "How Aera Helps" items
   - Link 3 related skills
   - Link 3 related resources

## 🎨 Design Notes

### Colors Used
- Primary: `$color-bahamablue` (#00619e)
- Background: `$color-aquahaze` (#f7f9fa)
- Text: `$color-codgray` (#1a1a1a)
- Secondary Text: `$color-shuttlegray` (#5c6476)
- Buttons: `$color-hawkesblue` / `$color-oysterbay`

### Responsive Breakpoints
- Desktop: 4 columns (skills grid)
- Tablet (1024px): 3 columns
- Mobile (720px): 1 column, stacked layout

### Card Variants
- **Featured Cards**: Larger, used on home page (2 cards)
- **Regular Cards**: Standard size, used in archive and home page grid

## 🔍 Existing vs New

**What Changed:**
- ✅ New Skills Home landing page template
- ✅ Updated archive with sidebar filters and modern grid
- ✅ Updated single with video cards and expandable content
- ✅ New skill-card component matching designs
- ✅ Added ACF fields for all new features

**What's Preserved:**
- ✅ Existing `sass/components/_skills.scss` (for old single page features if needed)
- ✅ Existing `content-skill-item.php` (backwards compatible)
- ✅ Existing ACF fields from `group_aera_skill.json` (extended, not replaced)

## 🚀 Next Steps

1. **Sync ACF Fields**: Go to Custom Fields > Sync to import new field groups
2. **Create Skills Home Page**: Create page and select "Skills Home" template
3. **Add Demo Content**: Create 10 skills with all required fields
4. **Test Filtering**: Add skill categories and test archive filtering
5. **Add Video Content**: Populate video cards on skill detail pages
6. **Customize Content**: Update hero text, CTA buttons, featured resources

## 📚 File Structure

```
themes/aera-technology/
├── sass/
│   ├── components/
│   │   └── _skill-card.scss          ← New skill card styles
│   └── pages/
│       ├── _skills-home.scss          ← New home page styles
│       ├── _skills-archive.scss       ← New archive styles
│       └── _skills-detail.scss        ← New detail page styles
├── template-parts/
│   └── content-skill-card.php         ← New card template
├── acf-json/
│   ├── group_aera_skills_home.json    ← New home page fields
│   ├── group_aera_skills_options.json ← New options fields
│   └── group_aera_skill.json          ← Updated skill fields
├── page-skills-home.php               ← New home template
├── archive-skill.php                  ← Updated archive template
└── single-skill.php                   ← Updated single template
```

## 💡 Tips

- **Featured Skills**: Mark exactly 2 skills as featured for best home page layout
- **Card Descriptions**: Keep descriptions under 100 characters for best card appearance
- **Video Thumbnails**: Use 16:9 aspect ratio images
- **Icons**: Use consistent icon style (line icons or filled) across all skills
- **List Items**: Max 4 items per skill for card display (more are hidden)

---

**Questions or Issues?**
Check the source design files in `_SKILLS_PAGES/_SKILLS IMAGES/` for reference.

