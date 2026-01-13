#!/usr/bin/env python3
"""
Convert Contentful Case Studies (Card entries) to WordPress WXR import format
These are the card entries that link to the full case study pages
Matches existing case-study posts by slug and updates card fields
"""
import json
import xml.etree.ElementTree as ET
from xml.dom import minidom
from datetime import datetime
import re
import os

print("📄 Converting Case Study Cards from Contentful to WordPress")
print("=" * 80)

# Read Contentful export
contentful_file = 'contentful-export-mh1amgo8m7ts-master-2025-11-24T23-06-28.json'
print(f"\n📖 Reading: {contentful_file}\n")

with open(contentful_file, 'r') as f:
    data = json.load(f)

# Extract case study cards
case_study_cards = []
image_refs = {}

# First, collect all assets for image lookup
print("📸 Collecting image assets...")
for asset in data.get('assets', []):
    asset_id = asset.get('sys', {}).get('id')
    if asset_id:
        file_data = asset.get('fields', {}).get('file', {}).get('en-US', {})
        if file_data:
            image_refs[asset_id] = {
                'url': file_data.get('url', ''),
                'filename': file_data.get('fileName', ''),
                'title': asset.get('fields', {}).get('title', {}).get('en-US', '')
            }

print(f"✅ Found {len(image_refs)} assets")

# Extract caseStudies entries
print("\n📄 Extracting case study card entries...")
for entry in data.get('entries', []):
    content_type = entry.get('sys', {}).get('contentType', {}).get('sys', {}).get('id', '')

    # Only process published entries
    if not entry.get('sys', {}).get('publishedAt'):
        continue

    if content_type == 'caseStudies':
        fields = entry.get('fields', {})

        # Get icon image URL
        icon_id = fields.get('icon', {}).get('en-US', {}).get('sys', {}).get('id')
        icon_url = ''
        if icon_id and icon_id in image_refs:
            icon_url = 'https:' + image_refs[icon_id]['url'] if image_refs[icon_id]['url'].startswith('//') else image_refs[icon_id]['url']

        # Get link and normalize slug
        link = fields.get('link', {}).get('en-US', '')
        slug = link
        if slug.startswith('/case-study/'):
            slug = slug.replace('/case-study/', '')
        elif slug.startswith('case-study/'):
            slug = slug.replace('case-study/', '')

        case_study_card = {
            'id': entry['sys']['id'],
            'type': fields.get('type', {}).get('en-US', 'Case Study'),
            'company_type': fields.get('title', {}).get('en-US', ''),  # This is the "Company Type" field
            'link': link,
            'slug': slug,
            'employees': fields.get('employees', {}).get('en-US', ''),
            'revenue': fields.get('revenue', {}).get('en-US', ''),
            'business_problem': fields.get('text', {}).get('en-US', ''),  # This is the "Business Problem" field
            'business_statement': fields.get('businessStatement', {}).get('en-US', ''),
            'icon_url': icon_url,
            'icon_id': icon_id or ''
        }

        if case_study_card['company_type']:
            case_study_cards.append(case_study_card)
            print(f"  ✓ {case_study_card['company_type']} -> {case_study_card['slug']}")

print(f"\n✅ Found {len(case_study_cards)} case study cards")

# Sort by company type
case_study_cards.sort(key=lambda x: x['company_type'])

# Create WordPress WXR XML
# This script updates existing posts, so we'll create a minimal XML that can be used
# to update the card fields via postmeta
def create_wxr_xml(case_study_cards):
    rss = ET.Element('rss', {
        'version': '2.0',
        'xmlns:excerpt': 'http://wordpress.org/export/1.2/excerpt/',
        'xmlns:content': 'http://purl.org/rss/1.0/modules/content/',
        'xmlns:wfw': 'http://wellformedweb.org/CommentAPI/',
        'xmlns:dc': 'http://purl.org/dc/elements/1.1/',
        'xmlns:wp': 'http://wordpress.org/export/1.2/'
    })

    channel = ET.SubElement(rss, 'channel')

    ET.SubElement(channel, 'title').text = 'Aera Technology Case Study Cards'
    ET.SubElement(channel, 'link').text = 'https://aeratechnology.com'
    ET.SubElement(channel, 'description').text = 'Case study card field updates from Contentful'
    ET.SubElement(channel, 'pubDate').text = datetime.now().strftime('%a, %d %b %Y %H:%M:%S +0000')
    ET.SubElement(channel, 'language').text = 'en-US'
    ET.SubElement(channel, 'wp:wxr_version').text = '1.2'

    # Add case study cards as post updates
    # Note: These will need to be matched to existing posts by slug
    print(f"\n📝 Generating case study card field updates...")

    image_downloads = []

    for idx, card in enumerate(case_study_cards, start=1):
        # Use slug to find matching post
        slug = card['slug']
        company_type = card['company_type']

        # Use current date
        pub_date_str = datetime.now().strftime('%a, %d %b %Y %H:%M:%S +0000')
        post_date_str = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        # Create item (post update)
        item = ET.SubElement(channel, 'item')
        ET.SubElement(item, 'title').text = company_type  # This will be matched by slug
        ET.SubElement(item, 'link').text = f'https://aeratechnology.com/case-study/{slug}'
        ET.SubElement(item, 'pubDate').text = pub_date_str
        ET.SubElement(item, 'dc:creator').text = 'admin'
        ET.SubElement(item, 'guid', {'isPermaLink': 'false'}).text = f'https://aeratechnology.com/?post_type=case-study&p={9000 + idx}'
        ET.SubElement(item, 'description')
        ET.SubElement(item, 'content:encoded').text = ''
        ET.SubElement(item, 'excerpt:encoded').text = ''

        ET.SubElement(item, 'wp:post_id').text = str(9000 + idx)
        ET.SubElement(item, 'wp:post_date').text = post_date_str
        ET.SubElement(item, 'wp:post_date_gmt').text = post_date_str
        ET.SubElement(item, 'wp:post_modified').text = post_date_str
        ET.SubElement(item, 'wp:post_modified_gmt').text = post_date_str
        ET.SubElement(item, 'wp:comment_status').text = 'closed'
        ET.SubElement(item, 'wp:ping_status').text = 'closed'
        ET.SubElement(item, 'wp:post_name').text = slug
        ET.SubElement(item, 'wp:status').text = 'publish'
        ET.SubElement(item, 'wp:post_parent').text = '0'
        ET.SubElement(item, 'wp:menu_order').text = '0'
        ET.SubElement(item, 'wp:post_type').text = 'case-study'
        ET.SubElement(item, 'wp:post_password').text = ''
        ET.SubElement(item, 'wp:is_sticky').text = '0'

        # Case Study Card ACF Fields
        if card['type']:
            add_postmeta(item, 'case_study_type', card['type'])
        if card['company_type']:
            add_postmeta(item, 'case_study_company_type', card['company_type'])
        if card['employees']:
            add_postmeta(item, 'case_study_employees', card['employees'])
        if card['revenue']:
            add_postmeta(item, 'case_study_revenue', card['revenue'])
        if card['business_problem']:
            add_postmeta(item, 'case_study_business_problem', card['business_problem'])
        if card['business_statement']:
            add_postmeta(item, 'case_study_business_statement', card['business_statement'])

        # Resource Card fields (for archive display)
        if card['company_type']:
            add_postmeta(item, 'resource_card_title', card['company_type'])
        if card['business_statement']:
            add_postmeta(item, 'resource_excerpt', card['business_statement'])

        # Track icon for download
        if card['icon_url']:
            image_filename = f"case-study-icon-{idx}-{card['icon_id']}.{card['icon_url'].split('.')[-1].split('?')[0]}"
            image_downloads.append({
                'url': card['icon_url'],
                'filename': image_filename,
                'company_type': company_type,
                'slug': slug
            })

        print(f"  ✓ {company_type} (slug: {slug})")

    return rss, image_downloads

def add_postmeta(item, key, value):
    """Add a postmeta field to a WordPress item"""
    if value or value == '0':
        postmeta = ET.SubElement(item, 'wp:postmeta')
        ET.SubElement(postmeta, 'wp:meta_key').text = key
        # Escape XML special characters
        value_str = str(value).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
        ET.SubElement(postmeta, 'wp:meta_value').text = value_str

# Generate the WXR XML
print(f"\n🔨 Generating WordPress WXR XML...")
rss, image_downloads = create_wxr_xml(case_study_cards)

# Pretty print XML
xml_str = ET.tostring(rss, encoding='unicode')
dom = minidom.parseString(xml_str)
pretty_xml = dom.toprettyxml(indent='  ')
pretty_xml = '\n'.join([line for line in pretty_xml.split('\n') if line.strip()])

# Save to file
script_dir = os.path.dirname(os.path.abspath(__file__))
output_file = os.path.join(script_dir, 'wordpress-case-study-cards-import.xml')

try:
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(pretty_xml)
    print(f"\n💾 Saved WordPress import file: wordpress-case-study-cards-import.xml")
except Exception as e:
    print(f"\n❌ Error saving XML: {e}")
    output_file = 'wordpress-case-study-cards-import.xml'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(pretty_xml)
    print(f"💾 Saved to alternate location: {output_file}")

# Generate image download script
if image_downloads:
    download_script = os.path.join(script_dir, 'download-case-study-card-images.sh')
    with open(download_script, 'w') as f:
        f.write('#!/bin/bash\n\n')
        f.write('# Download case study card icons from Contentful\n')
        f.write('# After running this script, upload images to WordPress Media Library\n\n')
        f.write('mkdir -p case-study-card-images\n')
        f.write('cd case-study-card-images\n\n')

        for img in image_downloads:
            f.write(f"# {img['company_type']} ({img['slug']})\n")
            f.write(f"curl -o \"{img['filename']}\" \"{img['url']}\"\n\n")

        f.write('echo "✅ Downloaded all case study card icons to case-study-card-images/"\n')

    os.chmod(download_script, 0o755)
    print(f"💾 Saved image download script: download-case-study-card-images.sh")

# Generate summary
summary = {
    'export_date': datetime.now().strftime('%Y-%m-%d'),
    'total_case_study_cards': len(case_study_cards),
    'with_icons': sum(1 for cs in case_study_cards if cs['icon_url']),
    'post_ids': f'9001-{9000 + len(case_study_cards)}',
    'note': 'These posts will be matched to existing case-study posts by slug. If a post with matching slug exists, the card fields will be updated.',
    'case_study_cards': [
        {
            'company_type': cs['company_type'],
            'slug': cs['slug'],
            'type': cs['type'],
            'has_icon': bool(cs['icon_url']),
            'has_employees': bool(cs['employees']),
            'has_revenue': bool(cs['revenue'])
        }
        for cs in case_study_cards
    ]
}

summary_file = os.path.join(script_dir, 'case-study-cards-import-summary.json')
try:
    with open(summary_file, 'w') as f:
        json.dump(summary, f, indent=2)
    print(f"💾 Saved summary: case-study-cards-import-summary.json")
except:
    with open('case-study-cards-import-summary.json', 'w') as f:
        json.dump(summary, f, indent=2)
    print(f"💾 Saved summary to alternate location")

print(f"\n✨ Done!")
print(f"\n📝 Summary:")
print(f"   - {len(case_study_cards)} case study cards converted")
print(f"   - {summary['with_icons']}/{len(case_study_cards)} have icons")
print(f"   - Post IDs: 9001-{9000 + len(case_study_cards)}")
print(f"\n⚠️  IMPORTANT:")
print(f"   This import will match existing case-study posts by slug.")
print(f"   Make sure you've already imported the case study pages first!")
print(f"\n🚀 Next steps:")
print(f"   1. Run ./download-case-study-card-images.sh to download icons (if needed)")
print(f"   2. Upload icons to WordPress Media Library")
print(f"   3. Import wordpress-case-study-cards-import.xml to WordPress")
print(f"   4. WordPress will match posts by slug and update card fields")
print(f"   5. Set icon images for each case study post via ACF")
