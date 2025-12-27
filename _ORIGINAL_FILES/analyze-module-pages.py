#!/usr/bin/env python3
"""
Analyze Module Template Page entries from Contentful
"""
import json

print("📖 Reading Contentful export file...")
with open('contentful-export-mh1amgo8m7ts-master-2025-11-24T23-06-28.json', 'r') as f:
    data = json.load(f)

print("✅ File loaded successfully\n")

# Find Module Template Page content type definition
print("🔍 Looking for Module Template Page content type...\n")
module_content_type = None
for ct in data.get('contentTypes', []):
    if ct.get('sys', {}).get('id', '') == 'moduleTemplatePage':
        module_content_type = ct
        break

if module_content_type:
    print("✅ Found Module Template Page content type")
    print(f"   Name: {module_content_type.get('name', '')}")
    print(f"   Description: {module_content_type.get('description', '')}\n")

    print("📋 Content Type Fields:")
    for field in module_content_type.get('fields', []):
        field_id = field.get('id', '')
        field_name = field.get('name', '')
        field_type = field.get('type', '')
        required = field.get('required', False)
        req_indicator = "🔴 REQUIRED" if required else "⚪️ Optional"
        print(f"   {req_indicator} {field_id} ({field_name}) - Type: {field_type}")
else:
    print("❌ Module Template Page content type not found")
    exit(1)

print("\n" + "="*80)
print("📦 Module Template Page Entries")
print("="*80 + "\n")

# Find all module template page entries
module_entries = []
for entry in data.get('entries', []):
    ct_id = entry.get('sys', {}).get('contentType', {}).get('sys', {}).get('id', '')
    if ct_id == 'moduleTemplatePage':
        module_entries.append(entry)

# Sort by updated date
module_entries.sort(key=lambda x: x.get('sys', {}).get('updatedAt', ''), reverse=True)

print(f"✅ Found {len(module_entries)} Module Template Page entries\n")

# Display each entry
for idx, entry in enumerate(module_entries, 1):
    fields = entry.get('fields', {})
    sys_info = entry.get('sys', {})

    title = fields.get('title', {}).get('en-US', 'No title')
    slug = fields.get('slug', {}).get('en-US', '')
    description = fields.get('description', {}).get('en-US', '')
    body_copy = fields.get('bodyCopy', {}).get('en-US', '')
    features = fields.get('features', {}).get('en-US', '')
    benefits = fields.get('benefits', {}).get('en-US', '')
    featured_image = fields.get('featuredImage', {}).get('en-US')

    # Get metadata
    created_at = sys_info.get('createdAt', '')[:10]
    updated_at = sys_info.get('updatedAt', '')[:10]

    print(f"{idx}. {title}")
    print(f"   📝 Slug: {slug}")
    print(f"   📅 Created: {created_at}, Updated: {updated_at}")

    # Show what content exists
    content_indicators = []
    if description:
        content_indicators.append(f"Description ({len(description)} chars)")
    if body_copy:
        content_indicators.append(f"Body Copy ({len(body_copy)} chars)")
    if features:
        content_indicators.append(f"Features ({len(features)} chars)")
    if benefits:
        content_indicators.append(f"Benefits ({len(benefits)} chars)")
    if featured_image:
        content_indicators.append("Featured Image ✓")

    if content_indicators:
        print(f"   📄 Content: {', '.join(content_indicators)}")
    else:
        print(f"   ⚠️  No content fields populated")

    print()

# Save detailed data
print("💾 Saving detailed analysis to module-pages-analysis.json...")
output_data = {
    'content_type': {
        'id': 'moduleTemplatePage',
        'name': module_content_type.get('name', ''),
        'description': module_content_type.get('description', ''),
        'fields': [
            {
                'id': f.get('id', ''),
                'name': f.get('name', ''),
                'type': f.get('type', ''),
                'required': f.get('required', False)
            }
            for f in module_content_type.get('fields', [])
        ]
    },
    'total_entries': len(module_entries),
    'entries': [
        {
            'title': entry.get('fields', {}).get('title', {}).get('en-US', ''),
            'slug': entry.get('fields', {}).get('slug', {}).get('en-US', ''),
            'created': entry.get('sys', {}).get('createdAt', ''),
            'updated': entry.get('sys', {}).get('updatedAt', ''),
            'has_description': bool(entry.get('fields', {}).get('description', {}).get('en-US')),
            'has_body_copy': bool(entry.get('fields', {}).get('bodyCopy', {}).get('en-US')),
            'has_features': bool(entry.get('fields', {}).get('features', {}).get('en-US')),
            'has_benefits': bool(entry.get('fields', {}).get('benefits', {}).get('en-US')),
            'has_featured_image': bool(entry.get('fields', {}).get('featuredImage', {}).get('en-US')),
        }
        for entry in module_entries
    ]
}

with open('module-pages-analysis.json', 'w') as f:
    json.dump(output_data, f, indent=2)

print("✅ Analysis saved")

print("\n" + "="*80)
print("🗺️  FIELD MAPPING ANALYSIS")
print("="*80 + "\n")

print("Contentful Fields → WordPress ACF Fields")
print("-" * 80)
print("✓ title               → post_title (WordPress standard)")
print("✓ slug                → post_name (WordPress standard)")
print("✓ description         → page_lead (or intro text?)")
print("✓ bodyCopy            → platform_body_copy")
print("✓ benefits            → platform_benefits")
print("✓ features            → platform_features")
print("✓ featuredImage       → platform_featured_image")
print()
print("⚠️  Missing in Contentful (may need defaults):")
print("  - platform_intro_title")
print("  - platform_intro_text")
print("  - platform_show_not_found")
print("  - platform_not_found_title")
print("  - platform_not_found_text")
print("  - page_show_date")
print()
print("✅ The mapping looks compatible!")
print("   Module Template Page data can be imported to Platform Detail pages.")



