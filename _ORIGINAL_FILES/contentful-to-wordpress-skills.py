#!/usr/bin/env python3
"""
Convert Skills spreadsheet to WordPress WXR import format
"""
import csv
import json
import xml.etree.ElementTree as ET
from xml.dom import minidom
from datetime import datetime
import re

print("📊 Converting Skills Spreadsheet to WordPress")
print("=" * 80)

# Read the CSV file
csv_file = '../_SKILLS_PAGES/Skills Project - Website and Videos - Website Content Skills.csv'

print(f"\n📖 Reading: {csv_file}\n")

skills_data = []
taxonomy_terms = {
    'skill_function': set(),
    'skill_category': set()
}

with open(csv_file, 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    rows = list(reader)

    # Find the header row
    header_row_idx = None
    for i, row in enumerate(rows):
        if row and 'Function' in str(row):
            header_row_idx = i
            break

    if header_row_idx is None:
        print("❌ Could not find header row")
        exit(1)

    print(f"✅ Found headers at row {header_row_idx + 1}")

    # Track current function/category for rows without them
    current_function = ''
    current_category = ''

    # Parse data rows
    skill_count = 0
    for row_idx in range(header_row_idx + 1, len(rows)):
        row = rows[row_idx]

        # Skip empty rows
        if not any(row):
            continue

        # Extract data
        function = row[1].strip() if len(row) > 1 and row[1] else ''
        category = row[2].strip() if len(row) > 2 and row[2] else ''
        skill_name = row[3].strip() if len(row) > 3 and row[3] else ''
        website_content = row[4].strip() if len(row) > 4 and row[4] else ''
        card_definition = row[5].strip() if len(row) > 5 and row[5] else ''
        demo_video_link = row[6].strip() if len(row) > 6 and row[6] else ''
        screenshots = row[7].strip() if len(row) > 7 and row[7] else ''
        attachments = row[8].strip() if len(row) > 8 and row[8] else ''

        # Skip if no skill name or if it's a note
        if not skill_name or 'Add these 3 skills' in skill_name:
            continue

        # Update current function/category if provided
        if function:
            current_function = function
        if category:
            current_category = category

        # Use current function/category if not specified in this row
        if not function:
            function = current_function
        if not category:
            category = current_category

        skill_count += 1

        # Track taxonomy terms
        if function:
            taxonomy_terms['skill_function'].add(function)
        if category:
            taxonomy_terms['skill_category'].add(category)

        # Store skill data
        skill_data = {
            'id': skill_count,
            'function': function,
            'category': category,
            'skill_name': skill_name,
            'website_content': website_content,
            'card_definition': card_definition,
            'demo_video_link': demo_video_link,
            'screenshots': screenshots,
            'attachments': attachments
        }

        skills_data.append(skill_data)

        print(f"  {skill_count}. {skill_name}")
        if function:
            print(f"     Function: {function}, Category: {category}")

print(f"\n✅ Found {skill_count} skills")
print(f"   Functions: {len(taxonomy_terms['skill_function'])}")
print(f"   Categories: {len(taxonomy_terms['skill_category'])}")

# Function to parse "How Aera Helps" items from website content
def parse_features(content):
    """Parse Understands/Recommends/Acts/Learns from content"""
    features = []

    # Define patterns
    patterns = {
        'Understands': r'Understands:?\s*(.*?)(?=Recommends|Acts|Learns|$)',
        'Recommends': r'Recommends:?\s*(.*?)(?=Acts|Learns|Understands|$)',
        'Acts': r'Acts:?\s*(.*?)(?=Learns|Understands|Recommends|$)',
        'Learns': r'Learns:?\s*(.*?)(?=Understands|Recommends|Acts|$)'
    }

    for title, pattern in patterns.items():
        match = re.search(pattern, content, re.DOTALL | re.IGNORECASE)
        if match:
            description = match.group(1).strip()
            # Clean up the description
            description = re.sub(r'\s+', ' ', description)
            description = description.strip()

            if description:
                features.append({
                    'title': title,
                    'description': description
                })

    return features

# Function to parse attachments/resources
def parse_resources(attachments, demo_video_link):
    """Parse resources from attachments and video links"""
    resources = []

    # Add demo video if it exists and looks like a URL or reference
    if demo_video_link and demo_video_link not in ['NA', 'N/A', '']:
        resource_type = 'Video' if 'video' in demo_video_link.lower() else 'Demo'
        resources.append({
            'title': demo_video_link if not demo_video_link.startswith('http') else 'View Demo',
            'text': demo_video_link,
            'type': resource_type,
            'link': demo_video_link if demo_video_link.startswith('http') else ''
        })

    # Parse attachments (format: "Type: Title\n\nType: Title")
    if attachments and attachments not in ['NA', 'N/A', 'None available', 'Generic', '']:
        # Split by double newlines or common delimiters
        items = re.split(r'\n\n+', attachments)

        for item in items:
            item = item.strip()
            if not item:
                continue

            # Try to extract type and title (e.g., "Blog: Title" or "Video: Title")
            match = re.match(r'(Blog|Video|Webinar|WP|Case\s*Study|Whitepaper|Impact\s*at):?\s*(.*)', item, re.IGNORECASE)
            if match:
                resource_type = match.group(1).strip()
                title = match.group(2).strip()

                # Clean up resource type
                if resource_type.lower() == 'wp':
                    resource_type = 'Whitepaper'
                elif 'impact' in resource_type.lower():
                    resource_type = 'Case Study'

                resources.append({
                    'title': title if title else item,
                    'text': '',
                    'type': resource_type,
                    'link': ''
                })
            else:
                # Just use the whole item as title
                resources.append({
                    'title': item,
                    'text': '',
                    'type': 'Resource',
                    'link': ''
                })

    return resources

# Function to create slug
def create_slug(title):
    slug = title.lower()
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'\s+', '-', slug)
    slug = re.sub(r'-+', '-', slug)
    return slug.strip('-')

# Create WordPress WXR XML
def create_wxr_xml(skills):
    rss = ET.Element('rss', {
        'version': '2.0',
        'xmlns:excerpt': 'http://wordpress.org/export/1.2/excerpt/',
        'xmlns:content': 'http://purl.org/rss/1.0/modules/content/',
        'xmlns:wfw': 'http://wellformedweb.org/CommentAPI/',
        'xmlns:dc': 'http://purl.org/dc/elements/1.1/',
        'xmlns:wp': 'http://wordpress.org/export/1.2/'
    })

    channel = ET.SubElement(rss, 'channel')

    ET.SubElement(channel, 'title').text = 'Aera Technology Skills'
    ET.SubElement(channel, 'link').text = 'https://aeratechnology.com'
    ET.SubElement(channel, 'description').text = 'Skills data import from spreadsheet'
    ET.SubElement(channel, 'pubDate').text = datetime.now().strftime('%a, %d %b %Y %H:%M:%S +0000')
    ET.SubElement(channel, 'language').text = 'en-US'
    ET.SubElement(channel, 'wp:wxr_version').text = '1.2'

    # Add taxonomy terms first
    print(f"\n🏷️  Generating taxonomy terms...")
    term_id = 1

    for term_name in sorted(taxonomy_terms['skill_function']):
        term = ET.SubElement(channel, 'wp:term')
        ET.SubElement(term, 'wp:term_id').text = str(term_id)
        ET.SubElement(term, 'wp:term_taxonomy').text = 'skill_function'
        ET.SubElement(term, 'wp:term_slug').text = create_slug(term_name)
        ET.SubElement(term, 'wp:term_name').text = term_name
        term_id += 1
        print(f"  ✓ Function: {term_name}")

    for term_name in sorted(taxonomy_terms['skill_category']):
        term = ET.SubElement(channel, 'wp:term')
        ET.SubElement(term, 'wp:term_id').text = str(term_id)
        ET.SubElement(term, 'wp:term_taxonomy').text = 'skill_category'
        ET.SubElement(term, 'wp:term_slug').text = create_slug(term_name)
        ET.SubElement(term, 'wp:term_name').text = term_name
        term_id += 1
        print(f"  ✓ Category: {term_name}")

    # Track featured skills (one per function)
    featured_functions = set()
    featured_skills_to_mark = []

    # Add skills as posts
    print(f"\n📝 Generating skill posts...")
    for idx, skill in enumerate(skills, start=1):
        title = skill['skill_name']
        slug = create_slug(title)

        # Mark first skill from each function as featured
        if skill['function'] and skill['function'] not in featured_functions:
            featured_functions.add(skill['function'])
            featured_skills_to_mark.append(title)

        # Dates
        pub_date = datetime.now().strftime('%a, %d %b %Y %H:%M:%S +0000')
        post_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        # Create item (post)
        item = ET.SubElement(channel, 'item')
        ET.SubElement(item, 'title').text = title
        ET.SubElement(item, 'link').text = f'https://aeratechnology.com/skill/{slug}'
        ET.SubElement(item, 'pubDate').text = pub_date
        ET.SubElement(item, 'dc:creator').text = 'admin'
        ET.SubElement(item, 'guid', {'isPermaLink': 'false'}).text = f'https://aeratechnology.com/?post_type=skill&p={4000 + idx}'
        ET.SubElement(item, 'description')
        ET.SubElement(item, 'content:encoded').text = ''
        ET.SubElement(item, 'excerpt:encoded').text = skill['card_definition'][:200] if skill['card_definition'] else ''

        ET.SubElement(item, 'wp:post_id').text = str(4000 + idx)
        ET.SubElement(item, 'wp:post_date').text = post_date
        ET.SubElement(item, 'wp:post_date_gmt').text = post_date
        ET.SubElement(item, 'wp:post_modified').text = post_date
        ET.SubElement(item, 'wp:post_modified_gmt').text = post_date
        ET.SubElement(item, 'wp:comment_status').text = 'closed'
        ET.SubElement(item, 'wp:ping_status').text = 'closed'
        ET.SubElement(item, 'wp:post_name').text = slug
        ET.SubElement(item, 'wp:status').text = 'publish'
        ET.SubElement(item, 'wp:post_parent').text = '0'
        ET.SubElement(item, 'wp:menu_order').text = '0'
        ET.SubElement(item, 'wp:post_type').text = 'skill'
        ET.SubElement(item, 'wp:post_password').text = ''
        ET.SubElement(item, 'wp:is_sticky').text = '0'

        # Add taxonomy terms
        if skill['function']:
            category = ET.SubElement(item, 'category', {
                'domain': 'skill_function',
                'nicename': create_slug(skill['function'])
            })
            category.text = skill['function']

        if skill['category']:
            category = ET.SubElement(item, 'category', {
                'domain': 'skill_category',
                'nicename': create_slug(skill['category'])
            })
            category.text = skill['category']

        # ACF Fields
        # Card description (from "Card Definitions" column)
        if skill['card_definition']:
            add_postmeta(item, 'skill_description', skill['card_definition'])

        # Featured skill - mark one per function (6 total)
        is_featured = '1' if title in featured_skills_to_mark else '0'
        add_postmeta(item, 'featured_skill', is_featured)

        # Content sections - add Overview section
        if skill['website_content']:
            add_postmeta(item, 'content_sections', '1')  # Number of repeater rows
            add_postmeta(item, 'content_sections_0_label', 'Overview')
            add_postmeta(item, 'content_sections_0_anchor', 'overview')
            add_postmeta(item, 'content_sections_0_content', skill['website_content'])

            # Add demo video/screenshot as additional section if present
            if skill['demo_video_link'] and skill['demo_video_link'] not in ['NA', 'N/A', '']:
                add_postmeta(item, 'content_sections', '2')  # Increase count
                add_postmeta(item, 'content_sections_1_label', 'Demo')
                add_postmeta(item, 'content_sections_1_anchor', 'demo')
                add_postmeta(item, 'content_sections_1_content', f'<p><strong>Demo Reference:</strong> {skill["demo_video_link"]}</p>')

        # How Aera Helps items (Features)
        # Note: Feature icons field not included - only using the main skill icon
        features = parse_features(skill['website_content'])
        if features:
            add_postmeta(item, 'how_aera_helps_items', str(len(features)))
            for i, feature in enumerate(features):
                add_postmeta(item, f'how_aera_helps_items_{i}_title', feature['title'])
                add_postmeta(item, f'how_aera_helps_items_{i}_description', feature['description'])

        # Related resources
        resources = parse_resources(skill['attachments'], skill['demo_video_link'])
        if resources:
            add_postmeta(item, 'related_resources', str(len(resources)))
            for i, resource in enumerate(resources):
                add_postmeta(item, f'related_resources_{i}_title', resource['title'])
                add_postmeta(item, f'related_resources_{i}_text', resource['text'])
                add_postmeta(item, f'related_resources_{i}_type', resource['type'])
                if resource['link']:
                    add_postmeta(item, f'related_resources_{i}_link', resource['link'])

        # Yoast SEO fields
        add_postmeta(item, '_yoast_wpseo_title', f'{title} | Aera Technology')
        if skill['card_definition']:
            meta_desc = skill['card_definition'][:155]
            add_postmeta(item, '_yoast_wpseo_metadesc', meta_desc)
        add_postmeta(item, '_yoast_wpseo_focuskw', title.lower())

        featured_marker = " ⭐ FEATURED" if is_featured == '1' else ""
        print(f"  ✓ {title} ({skill['function']} > {skill['category']}){featured_marker}")

    return rss, featured_skills_to_mark

def add_postmeta(item, key, value):
    """Add a postmeta field to a WordPress item"""
    if value or value == '0':
        postmeta = ET.SubElement(item, 'wp:postmeta')
        ET.SubElement(postmeta, 'wp:meta_key').text = key
        ET.SubElement(postmeta, 'wp:meta_value').text = str(value)

# Generate the WXR XML
print(f"\n🔨 Generating WordPress WXR XML...")
rss, featured_skills = create_wxr_xml(skills_data)

# Pretty print XML
xml_str = ET.tostring(rss, encoding='unicode')
dom = minidom.parseString(xml_str)
pretty_xml = dom.toprettyxml(indent='  ')
pretty_xml = '\n'.join([line for line in pretty_xml.split('\n') if line.strip()])

# Save to file
import os
script_dir = os.path.dirname(os.path.abspath(__file__))
output_file = os.path.join(script_dir, 'wordpress-skills-import.xml')

try:
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(pretty_xml)
    print(f"\n💾 Saved WordPress import file: wordpress-skills-import.xml")
except Exception as e:
    print(f"\n❌ Error saving XML: {e}")
    # Try alternate location
    output_file = 'wordpress-skills-import.xml'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(pretty_xml)
    print(f"💾 Saved to alternate location: {output_file}")

# Generate summary
summary = {
    'export_date': datetime.now().strftime('%Y-%m-%d'),
    'total_skills': len(skills_data),
    'featured_skills': featured_skills,
    'functions': sorted(list(taxonomy_terms['skill_function'])),
    'categories': sorted(list(taxonomy_terms['skill_category'])),
    'post_ids': f'4001-{4000 + len(skills_data)}'
}

summary_file = os.path.join(script_dir, 'skills-import-summary.json')
try:
    with open(summary_file, 'w') as f:
        json.dump(summary, f, indent=2)
    print(f"💾 Saved summary: skills-import-summary.json")
except:
    with open('skills-import-summary.json', 'w') as f:
        json.dump(summary, f, indent=2)
    print(f"💾 Saved summary to alternate location")

print(f"\n✨ Done!")
print(f"\n📝 Summary:")
print(f"   - {len(skills_data)} skills converted")
print(f"   - {len(featured_skills)} featured skills (one per function)")
print(f"   - {len(taxonomy_terms['skill_function'])} functions")
print(f"   - {len(taxonomy_terms['skill_category'])} categories")
print(f"   - Post IDs: 4001-{4000 + len(skills_data)}")
print(f"\n⭐ Featured Skills:")
for skill in featured_skills:
    print(f"   - {skill}")
print(f"\n🚀 Next steps:")
print(f"   1. Import wordpress-skills-import.xml to WordPress (Tools → Import → WordPress)")
print(f"   2. Verify 6 featured skills are marked correctly")
print(f"   3. Add placeholder icon (assets/images/icons/skill-placeholder.svg) to skills")
print(f"   4. (Optional) Update ACF field labels (see SKILLS-ACF-FIELD-CHANGE-NEEDED.md)")

