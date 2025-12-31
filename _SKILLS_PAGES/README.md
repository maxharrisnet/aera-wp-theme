# Skills Pages Implementation

This document outlines the new Skills pages implementation for the Aera Technology website, based on the provided Figma designs.

## ✨ Recent Updates

### Function-Based Home Page
**Major change:** The Skills Home page now displays **Functions** (taxonomy terms) instead of individual skill posts.

**What Changed:**
- Home page grid shows all "skill-category" taxonomy terms as cards
- Each function has its own image (managed via ACF taxonomy fields)
- Clicking a function card filters the archive to show only skills in that function
- Removed: `skill_card_image` and `featured_skill` fields from individual skills
- Added: `function_image` field to the skill-category taxonomy

**Benefits:**
- Simpler content management (one image per function, not per skill)
- Better information architecture (users browse by function, then drill down to specific skills)
- Archive automatically filters by function when clicking from home page
- Native WordPress taxonomy functionality (no custom code needed)

### Dynamic Navigation System
The skill detail page now features a flexible, dynamic navigation system similar to the Decision Intelligence page:

**Key Features:**
- **Dynamic Content Sections**: Add unlimited sections via ACF repeater with custom labels and content
- **Dual Navigation**: Top tabs AND sidebar navigation automatically generated from sections
- **Scroll Tracking**: Active state updates as user scrolls through content
- **Smooth Scrolling**: Click any tab/sidebar link to smoothly scroll to that section
- **Auto-anchors**: Anchor IDs auto-generated from labels (or manually specified)
- **WYSIWYG Content**: Full editor for each section with media upload support

**New Files:**
- `js/skill-detail.js` - Navigation scroll tracking and smooth scrolling
- Updated `single-skill.php` to use dynamic sections
- New "Content Sections" tab in ACF with repeater field (requires ACF Pro)

**Benefits:**
- Content editors can customize navigation labels and content structure
- Flexible section layout per skill
- Consistent with site navigation patterns (matches decision intelligence page)
- Better UX with automatic scroll tracking and active states

### Skills Fields Simplification
Streamlined the Skills ACF field structure:

**Removed:**
- Tagline field (not needed)
- Card List Items field (not used)
- Videos tab and all video fields (content should be inline)

**Reorganized:**
- Renamed "Basic Info" tab → "Card"
- Card layout: Card Image (50%), Icon (25%), Featured (25%)
- Combined "Related Skills" and "Resources" tabs → "Related Content"

**Result:** Cleaner, more focused admin interface with only the fields needed for the current design.

### Card Types Redesign
The Skills pages now use two distinct card types based on their context:

**Skill Card (Home Page):**
- Simplified design with full-width image, color stripe, and title only
- Images are now sourced from the `skill_card_image` ACF field
- Replaced background-image approach with inline images
- Featured cards (top 2) are 2x width

**Icon Card (Archive Page):**
- New dedicated template for archive listing
- Shows icon (light blue tint), title, and short excerpt
- Top stripe adds visual distinction
- Optimized for 4-column grid layout

### Initial Fields Cleanup
The Skills ACF fields were initially cleaned up to match the current Figma designs:

**Removed old fields:**
- Benefits Section, Featured Skills repeater, Key Decisions Needed, Demo Video Form
- Old WYSIWYG fields replaced with structured repeater items

**Key improvements:**
- Related Skills changed from repeater to relationship field (no longer requires ACF Pro)
- Added customizable section titles
- Organized into logical tabs

## 🃏 Two Card Types

### Skill Card (Home Page)
Used on the Skills Home page (`page-skills-home.php`):
- **Design**: Full-width image at top, 8px dark blue stripe divider, white content section with left-aligned title
- **Layout**: 4 columns, with top 2 cards twice as wide (creating a 2-column featured row)
- **Dimensions**: Cards are responsive with drop shadow and rounded corners (6px)
- **Image Source**: `skill_card_image` ACF field
- **Template**: `template-parts/content-skill-card.php`

### Icon Card (Archive Page)
Used on the All Skills archive (`archive-skill.php`):
- **Design**: 8px dark blue top stripe, light blue icon, centered heading, short excerpt
- **Layout**: 4 columns (215 x 328 px target size)
- **Dimensions**: Drop shadow and rounded corners (8px)
- **Image Source**: `skill_icon` ACF field (with light blue filter applied)
- **Template**: `template-parts/content-icon-card.php`

## 🎨 Skill Tile Background Images (Deprecated)

~~Skill cards used to display background images based on the post slug.~~ This approach has been replaced with the `skill_card_image` ACF field for better flexibility.

The tile images are still available in `/assets/images/skills/` if needed for migration or reference:
- skill-tile-supply-chain.png
- skill-tile-procurement.png
- skill-tile-manufacturing-operations.png
- skill-tile-product-management.png
- skill-tile-sales-marketing.png
- skill-tile-customer-success.png
- skill-tile-finance.png
- skill-tile-hr.png
- skill-tile-it.png
- skill-tile-esg.png

## 📁 Files Created

### SCSS Files (Styles)
- `sass/components/_skill-card.scss` - Skill card component styles (home page - with image, stripe, title)
- `sass/components/_icon-card.scss` - Icon card component styles (archive page - with icon, title, excerpt)
- `sass/pages/_skills-home.scss` - Skills Home landing page styles
- `sass/pages/_skills-archive.scss` - All Skills archive page styles
- `sass/pages/_skills-detail.scss` - Single Skill detail page styles

### PHP Templates
- `page-skills-home.php` - Skills Home landing page template
- `archive-skill.php` - Updated All Skills archive template with sidebar filters
- `single-skill.php` - Updated Single Skill detail page template
- `template-parts/content-skill-card.php` - Skill card template part for home page (supports regular and featured variants)
- `template-parts/content-icon-card.php` - Icon card template part for archive page

### ACF JSON Files
- `acf-json/group_aera_skills_home.json` - Fields for Skills Home page
- `acf-json/group_aera_skills_options.json` - Options page fields for archive
- `acf-json/group_aera_skill.json` - Fields for individual skills (icon, description, content sections, etc.)
- `acf-json/group_aera_skill_category.json` - **NEW**: Taxonomy fields for Functions (function_image)

## 🎨 Three Page Types

### 1. Skills Home Page (`page-skills-home.php`)
Landing page featuring:
- Hero section with title and description
- **6 Function cards in 3-column grid** (displays taxonomy terms, not individual skills)
- "View All Skills" CTA button
- Icon section with 4 columns
- Resources section (3 featured resources)
- "See Aera in Action" CTA section

**How It Works:**
- Displays all "Functions" (skill-category taxonomy terms) as cards
- Each function card shows an image and the function name
- Clicking a function card takes you to the archive filtered by that function
- Images are managed per-function via ACF taxonomy fields

**Setup:**
1. Create a new page in WordPress
2. Select "Skills Home" template
3. Configure ACF fields:
   - Use Page Hero fields for hero section
   - Set Icon Section Title and Icon Items (4 items recommended)
   - Select 3 Featured Resources
   - Configure Action Section title and button
4. For each Function (skill-category term):
   - Edit the term in WordPress admin
   - Add a "Function Image" via ACF (will display on home page cards)

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
- Dynamic tab navigation (generated from Content Sections)
- Left sidebar content navigation (synced with tabs)
- Scrollable sections with automatic active state tracking
- "How Aera Helps" section
- "Explore Other Business Functions" section
- Resources section
- CTA section

**Setup:**
Configure these ACF fields when editing a skill:

**Basic Info:**
- **Icon**: Icon image (displayed on archive cards)
- **Description**: Main description text (used in hero and archive cards)

**Content Sections Tab:**
- **Content Sections** (repeater): Define the main content sections for this skill *(Requires ACF Pro)*
  - **Navigation Label**: Label shown in tabs and sidebar (e.g., "Overview", "Use Cases")
  - **Anchor ID**: Unique anchor ID (optional, auto-generated from label if empty)
  - **Content**: WYSIWYG editor with full formatting and media upload support

**How Aera Helps Tab:**
- **Section Title**: Optional custom title (defaults to "How Aera Helps")
- **How Aera Helps Items**: Icon/title/description items *(Requires ACF Pro)*

**Related Content Tab:**
- **Related Skills Section Title**: Optional custom title (defaults to "Explore Other Business Functions")
- **Related Skills**: Relationship field to select other skills
- **Resources Section Title**: Optional custom title (defaults to "Resources")
- **Related Resources**: Manually add resources with title, description, type label, URL, and image. Supports external links *(Requires ACF Pro)*

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
- **Icon Section Description** (textarea) - paragraph that appears under the title
- **Icon Items** - 4 individual icon sets (Icon 1-4). Each has:
  - Icon (image)
  - Title (text)
  - Description (textarea)
- **Resources Section Title** (text)
- **Featured Resources** - 3 individual resource fields (Resource 1, 2, 3). For each, choose resource type:
  - **Post/Resource**: Select from existing posts (news, video, whitepaper, case-study, blog, etc.) - pulls featured image, title, excerpt automatically
  - **Page**: Select from existing pages - pulls featured image, title, excerpt/content automatically
  - **External Link**: Manually enter title (50% width), type label (50% width), description, URL, and image
- **Action Section Title** (text) - used for the CTA component
- **Action Button 2 Text & URL** - primary CTA button (Button 1 fields are deprecated)

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

