# Related Skill Functions Setup

## Overview

The skill function taxonomy pages now display related skill functions using a repeater field. This allows editors to specify which skill functions appear as related cards on each function's detail page.

## Required ACF Field Configuration

### Field Group: Skill Function Settings

- **Location**: Skill Function (taxonomy)
- **Field Name**: `related_skill_functions`
- **Field Label**: Related Skill Functions
- **Field Type**: Repeater

### Repeater Sub-Field:

- **Field Name**: `related_skill_function`
- **Field Label**: Skill Function
- **Field Type**: Taxonomy (Select)
- **Taxonomy**: skill_function
- **Allow Multiple Selection**: No
- **Display Format**: name

## How It Works

1. **Skills Home Page** (`page-skills-home.php`)
   - Displays all skill functions in a 3-column grid using the `skill-functions-grid` template part

2. **Skill Function Detail Page** (`taxonomy-skill_function.php`)
   - Shows related functions above the Resources section
   - Gets related functions from the `related_skill_functions` repeater field
   - Displays them in the same 3-column grid layout

3. **Reusable Template** (`template-parts/components/skill-functions-grid.php`)
   - DRY component that renders the skill function cards
   - Accepts configurable grid and card CSS classes
   - Automatically fetches ACF featured_image field for each function

## Implementation Details

The related functions section is only displayed if:

- The `related_skill_functions` repeater field has at least one item
- The related function term exists and is valid

## Styling

CSS classes for styling the related section:

- `.skills-function__related` - Container
- `.skills-function__related-title` - Section heading
- `.skills-function__related-grid` - Grid wrapper
- `.skill-card` - Individual card (shared with home page)

The grid uses:

- 3 columns on desktop
- 2 columns on tablets
- 1 column on mobile
