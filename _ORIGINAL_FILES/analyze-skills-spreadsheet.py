#!/usr/bin/env python3
"""
Analyze Skills spreadsheet to understand structure and plan WordPress import
"""
import csv
import json
from collections import defaultdict

print("📊 Analyzing Skills Spreadsheet")
print("=" * 80)

# Read the CSV file
csv_file = '../_SKILLS_PAGES/Skills Project - Website and Videos - Website Content Skills.csv'

print(f"\n📖 Reading: {csv_file}\n")

skills_data = []
taxonomy_structure = defaultdict(lambda: defaultdict(list))

with open(csv_file, 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    rows = list(reader)

    # Find the header row (starts after empty rows)
    header_row_idx = None
    for i, row in enumerate(rows):
        if row and 'Function' in str(row):
            header_row_idx = i
            break

    if header_row_idx is None:
        print("❌ Could not find header row")
        exit(1)

    headers = rows[header_row_idx]
    print(f"📋 Headers found at row {header_row_idx + 1}:")
    for i, h in enumerate(headers):
        if h:
            print(f"   Column {chr(65+i)}: {h}")

    print(f"\n" + "=" * 80)
    print("📦 SKILLS DATA")
    print("=" * 80 + "\n")

    # Parse data rows
    skill_count = 0
    for row_idx in range(header_row_idx + 1, len(rows)):
        row = rows[row_idx]

        # Skip empty rows
        if not any(row):
            continue

        # Extract data (accounting for column positions)
        function = row[1] if len(row) > 1 else ''
        category = row[2] if len(row) > 2 else ''
        skill_name = row[3] if len(row) > 3 else ''
        website_content = row[4] if len(row) > 4 else ''
        card_definition = row[5] if len(row) > 5 else ''
        demo_video_link = row[6] if len(row) > 6 else ''
        screenshots = row[7] if len(row) > 7 else ''
        attachments = row[8] if len(row) > 8 else ''

        # Skip if no skill name
        if not skill_name or not skill_name.strip():
            continue

        skill_count += 1

        # Build taxonomy structure
        if function and function.strip():
            if category and category.strip():
                taxonomy_structure[function.strip()][category.strip()].append(skill_name.strip())

        # Store skill data
        skill_data = {
            'id': skill_count,
            'function': function.strip() if function else '',
            'category': category.strip() if category else '',
            'skill_name': skill_name.strip(),
            'website_content': website_content.strip() if website_content else '',
            'card_definition': card_definition.strip() if card_definition else '',
            'demo_video_link': demo_video_link.strip() if demo_video_link else '',
            'screenshots': screenshots.strip() if screenshots else '',
            'attachments': attachments.strip() if attachments else ''
        }

        skills_data.append(skill_data)

        print(f"{skill_count}. {skill_name}")
        if function:
            print(f"   📂 Function: {function}")
        if category:
            print(f"   🏷️  Category: {category}")
        if card_definition:
            print(f"   📝 Card: {card_definition[:80]}...")
        if demo_video_link:
            print(f"   🎥 Video: {demo_video_link[:60]}")
        if attachments:
            print(f"   📎 Resources: {attachments[:60]}")
        print()

print(f"\n{'=' * 80}")
print(f"📊 TAXONOMY STRUCTURE")
print(f"{'=' * 80}\n")

for function, categories in sorted(taxonomy_structure.items()):
    print(f"📂 {function}")
    for category, skills in sorted(categories.items()):
        print(f"   └─ 🏷️  {category} ({len(skills)} skills)")
        for skill in skills:
            print(f"      • {skill}")
    print()

print(f"\n{'=' * 80}")
print(f"🗺️  FIELD MAPPING PLAN")
print(f"{'=' * 80}\n")

print("SPREADSHEET COLUMN → WORDPRESS FIELD")
print("-" * 80)
print("Function            → taxonomy: skill_function (to be created)")
print("Categories          → taxonomy: skill_category (to be created)")
print("Skill               → post_title")
print("Website Content     → Parse into 'How Aera Helps' items")
print("                       (Understands/Recommends/Acts/Learns)")
print("Card Definitions    → skill_description")
print("Demo Video Link     → related_resources (as video resource)")
print("Screenshots         → content_sections (if applicable)")
print("Attachments         → related_resources (as blog/case study)")

print("\n" + "=" * 80)
print("✅ ACF FIELDS AVAILABLE")
print("=" * 80)
print("""
Card Tab:
  • skill_card_image (image)
  • skill_icon (image)
  • featured_skill (true/false)
  • skill_description (textarea) → Card Definitions

Content Sections Tab:
  • content_sections (repeater)
    - label
    - anchor
    - content (wysiwyg) → Website Content (main)

How Aera Helps Tab:
  • how_aera_helps_title (text)
  • how_aera_helps_items (repeater) → Parse from Website Content
    - icon (image)
    - title (text) → Understands/Recommends/Acts/Learns
    - description (text)

Related Content Tab:
  • related_skills (relationship)
  • related_resources (repeater) → Demo Video + Attachments
    - title
    - text
    - type
    - link
    - image
""")

print("=" * 80)
print("⚠️  MISSING/TO CREATE")
print("=" * 80)
print("""
TAXONOMIES (need to be registered):
  1. skill_function (e.g., "Supply Chain", "Finance", etc.)
  2. skill_category (e.g., "Demand", "Supply", "Inventory", etc.)

YOAST SEO FIELDS (will be populated):
  • _yoast_wpseo_title → "{Skill Name} | Aera Technology"
  • _yoast_wpseo_metadesc → Use card_definition (first 155 chars)
  • _yoast_wpseo_focuskw → skill name
""")

print("\n" + "=" * 80)
print("📈 SUMMARY")
print("=" * 80)
print(f"  • Total Skills Found: {skill_count}")
print(f"  • Functions: {len(taxonomy_structure)}")
print(f"  • Categories: {sum(len(cats) for cats in taxonomy_structure.values())}")
print(f"  • Skills with Video: {sum(1 for s in skills_data if s['demo_video_link'])}")
print(f"  • Skills with Attachments: {sum(1 for s in skills_data if s['attachments'])}")

# Save analysis
output = {
    'total_skills': skill_count,
    'taxonomy': {
        'functions': list(taxonomy_structure.keys()),
        'structure': {func: list(cats.keys()) for func, cats in taxonomy_structure.items()}
    },
    'skills': skills_data
}

with open('skills-analysis.json', 'w') as f:
    json.dump(output, f, indent=2)

print(f"\n💾 Detailed analysis saved to: skills-analysis.json")
print("\n✅ Analysis complete! Review the field mapping above before proceeding.\n")

