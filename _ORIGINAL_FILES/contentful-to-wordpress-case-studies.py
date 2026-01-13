#!/usr/bin/env python3
"""
Convert Contentful Case Studies to WordPress WXR import format
Combines customerTemplatePage (full page content) with caseStudies (card data)
Matches by slug and creates unified case-study posts
"""
import json
import xml.etree.ElementTree as ET
from xml.dom import minidom
from datetime import datetime
import re
import os

print("📄 Converting Case Studies from Contentful to WordPress")
print("=" * 80)

# Read Contentful export
contentful_file = 'contentful-export-mh1amgo8m7ts-master-2025-11-24T23-06-28.json'
print(f"\n📖 Reading: {contentful_file}\n")

with open(contentful_file, 'r') as f:
    data = json.load(f)

# Collect all assets for image lookup
print("📸 Collecting image assets...")
image_refs = {}
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

# Step 1: Extract customerTemplatePage entries (full page content)
print("\n📄 Step 1: Extracting case study page entries (customerTemplatePage)...")
case_study_pages = {}

for entry in data.get('entries', []):
    content_type = entry.get('sys', {}).get('contentType', {}).get('sys', {}).get('id', '')

    # Only process published entries
    if not entry.get('sys', {}).get('publishedAt'):
        continue

    if content_type == 'customerTemplatePage':
        fields = entry.get('fields', {})

        # Get featured image URL
        image_id = fields.get('featuredImage', {}).get('en-US', {}).get('sys', {}).get('id')
        image_url = ''
        if image_id and image_id in image_refs:
            image_url = 'https:' + image_refs[image_id]['url'] if image_refs[image_id]['url'].startswith('//') else image_refs[image_id]['url']

        # Get slug (remove case-study/ prefix if present)
        slug = fields.get('slug', {}).get('en-US', '')
        if slug.startswith('case-study/'):
            slug = slug.replace('case-study/', '')

        case_study_pages[slug] = {
            'id': entry['sys']['id'],
            'title': fields.get('title', {}).get('en-US', ''),
            'slug': slug,
            'description': fields.get('description', {}).get('en-US', ''),
            'company_name': fields.get('companyName', {}).get('en-US', ''),
            'industry': fields.get('industry', {}).get('en-US', ''),
            'body_copy': fields.get('bodyCopy', {}).get('en-US', ''),
            'business_need': fields.get('businessNeed', {}).get('en-US', ''),
            'short_solution': fields.get('shortSolution', {}).get('en-US', ''),
            'short_result': fields.get('shortResult', {}).get('en-US', ''),
            'challenges': fields.get('challenges', {}).get('en-US', ''),
            'solution': fields.get('solution', {}).get('en-US', ''),
            'results': fields.get('results', {}).get('en-US', ''),
            'top_quote': fields.get('topQuote', {}).get('en-US', ''),
            'quote': fields.get('quote', {}).get('en-US', ''),
            'meta_title': fields.get('metaTitle', {}).get('en-US', ''),
            'meta_description': fields.get('metaDescription', {}).get('en-US', ''),
            'featured_image_url': image_url,
            'featured_image_id': image_id or ''
        }

        if case_study_pages[slug]['title']:
            print(f"  ✓ {case_study_pages[slug]['title']} (slug: {slug})")

print(f"✅ Found {len(case_study_pages)} case study pages")

# Step 2: Extract caseStudies entries (card data) and match by slug
print("\n📄 Step 2: Extracting case study card entries (caseStudies) and matching...")
case_study_cards = {}

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

        case_study_cards[slug] = {
            'id': entry['sys']['id'],
            'type': fields.get('type', {}).get('en-US', 'Case Study'),
            'company_type': fields.get('title', {}).get('en-US', ''),  # This is the "Company Type" field
            'employees': fields.get('employees', {}).get('en-US', ''),
            'revenue': fields.get('revenue', {}).get('en-US', ''),
            'business_problem': fields.get('text', {}).get('en-US', ''),  # This is the "Business Problem" field
            'business_statement': fields.get('businessStatement', {}).get('en-US', ''),
            'icon_url': icon_url,
            'icon_id': icon_id or ''
        }

        if case_study_cards[slug]['company_type']:
            print(f"  ✓ {case_study_cards[slug]['company_type']} -> {slug}")

print(f"✅ Found {len(case_study_cards)} case study cards")

# Step 3: Combine page and card data
print("\n📄 Step 3: Combining page and card data...")
combined_case_studies = []

for slug, page_data in case_study_pages.items():
    card_data = case_study_cards.get(slug, {})

    combined = {
        'slug': slug,
        'title': page_data['title'],
        'description': page_data['description'],
        'company_name': page_data['company_name'],
        'industry': page_data['industry'],
        'body_copy': page_data['body_copy'],
        'business_need': page_data['business_need'],
        'short_solution': page_data['short_solution'],
        'short_result': page_data['short_result'],
        'challenges': page_data['challenges'],
        'solution': page_data['solution'],
        'results': page_data['results'],
        'top_quote': page_data['top_quote'],
        'quote': page_data['quote'],
        'meta_title': page_data['meta_title'],
        'meta_description': page_data['meta_description'],
        'featured_image_url': page_data['featured_image_url'],
        'featured_image_id': page_data['featured_image_id'],
        # Card fields
        'type': card_data.get('type', 'Case Study'),
        'company_type': card_data.get('company_type', ''),
        'employees': card_data.get('employees', ''),
        'revenue': card_data.get('revenue', ''),
        'business_problem': card_data.get('business_problem', ''),
        'business_statement': card_data.get('business_statement', ''),
        'icon_url': card_data.get('icon_url', ''),
        'icon_id': card_data.get('icon_id', '')
    }

    combined_case_studies.append(combined)
    match_status = "✓ Matched" if card_data else "⚠ No card data"
    print(f"  {match_status}: {combined['title']} (slug: {slug})")

print(f"\n✅ Combined {len(combined_case_studies)} case studies")

# Sort by title
combined_case_studies.sort(key=lambda x: x['title'])

# Create slug function
def create_slug(title):
    slug = title.lower()
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'\s+', '-', slug)
    slug = re.sub(r'-+', '-', slug)
    return slug.strip('-')

# Create WordPress WXR XML
def create_wxr_xml(combined_case_studies):
    rss = ET.Element('rss', {
        'version': '2.0',
        'xmlns:excerpt': 'http://wordpress.org/export/1.2/excerpt/',
        'xmlns:content': 'http://purl.org/rss/1.0/modules/content/',
        'xmlns:wfw': 'http://wellformedweb.org/CommentAPI/',
        'xmlns:dc': 'http://purl.org/dc/elements/1.1/',
        'xmlns:wp': 'http://wordpress.org/export/1.2/'
    })

    channel = ET.SubElement(rss, 'channel')

    ET.SubElement(channel, 'title').text = 'Aera Technology Case Studies'
    ET.SubElement(channel, 'link').text = 'https://aeratechnology.com'
    ET.SubElement(channel, 'description').text = 'Case study imports from Contentful (combined page and card data)'
    ET.SubElement(channel, 'pubDate').text = datetime.now().strftime('%a, %d %b %Y %H:%M:%S +0000')
    ET.SubElement(channel, 'language').text = 'en-US'
    ET.SubElement(channel, 'wp:wxr_version').text = '1.2'

    # Add case studies as posts
    print(f"\n📝 Generating case study posts...")

    image_downloads = []

    for idx, case_study in enumerate(combined_case_studies, start=1):
        title = case_study['title']
        slug = case_study['slug'] or create_slug(title)

        # Use current date
        pub_date_str = datetime.now().strftime('%a, %d %b %Y %H:%M:%S +0000')
        post_date_str = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        # Create item (post)
        item = ET.SubElement(channel, 'item')
        ET.SubElement(item, 'title').text = title
        ET.SubElement(item, 'link').text = f'https://aeratechnology.com/case-study/{slug}'
        ET.SubElement(item, 'pubDate').text = pub_date_str
        ET.SubElement(item, 'dc:creator').text = 'admin'
        ET.SubElement(item, 'guid', {'isPermaLink': 'false'}).text = f'https://aeratechnology.com/?post_type=case-study&p={8000 + idx}'
        ET.SubElement(item, 'description')

        # Build content from description and body copy
        content_parts = []
        if case_study['description']:
            content_parts.append(f'<p>{case_study["description"]}</p>')
        if case_study['body_copy']:
            content_parts.append(case_study['body_copy'])
        content = '\n\n'.join(content_parts) if content_parts else ''

        ET.SubElement(item, 'content:encoded').text = content
        ET.SubElement(item, 'excerpt:encoded').text = case_study['description'] or ''

        ET.SubElement(item, 'wp:post_id').text = str(8000 + idx)
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

        # Resource Card ACF Fields (for archive display)
        # Use company_type for card title if available, otherwise use title
        card_title = case_study['company_type'] or title
        add_postmeta(item, 'resource_card_title', card_title)
        if case_study['description']:
            add_postmeta(item, 'resource_excerpt', case_study['description'])

        # Case Study Card ACF Fields
        if case_study['type']:
            add_postmeta(item, 'case_study_type', case_study['type'])
        if case_study['company_type']:
            add_postmeta(item, 'case_study_company_type', case_study['company_type'])
        if case_study['employees']:
            add_postmeta(item, 'case_study_employees', case_study['employees'])
        if case_study['revenue']:
            add_postmeta(item, 'case_study_revenue', case_study['revenue'])
        if case_study['business_problem']:
            add_postmeta(item, 'case_study_business_problem', case_study['business_problem'])
        if case_study['business_statement']:
            add_postmeta(item, 'case_study_business_statement', case_study['business_statement'])

        # Case Study Page Content ACF Fields
        if case_study['company_name']:
            add_postmeta(item, 'case_study_company_name', case_study['company_name'])
        if case_study['industry']:
            add_postmeta(item, 'case_study_industry', case_study['industry'])
        if case_study['body_copy']:
            add_postmeta(item, 'case_study_body_copy', case_study['body_copy'])
        if case_study['business_need']:
            add_postmeta(item, 'case_study_business_need', case_study['business_need'])
        if case_study['short_solution']:
            add_postmeta(item, 'case_study_short_solution', case_study['short_solution'])
        if case_study['short_result']:
            add_postmeta(item, 'case_study_short_result', case_study['short_result'])
        if case_study['challenges']:
            add_postmeta(item, 'case_study_challenges', case_study['challenges'])
        if case_study['solution']:
            add_postmeta(item, 'case_study_solution', case_study['solution'])
        if case_study['results']:
            add_postmeta(item, 'case_study_results', case_study['results'])
        if case_study['top_quote']:
            add_postmeta(item, 'case_study_top_quote', case_study['top_quote'])
        if case_study['quote']:
            add_postmeta(item, 'case_study_quote', case_study['quote'])

        # Yoast SEO
        meta_title = case_study['meta_title'] or f'{title} | Aera Technology'
        add_postmeta(item, '_yoast_wpseo_title', meta_title)
        meta_desc = case_study['meta_description'] or case_study['description'] or ''
        if meta_desc:
            meta_desc = meta_desc[:155]
            add_postmeta(item, '_yoast_wpseo_metadesc', meta_desc)
        add_postmeta(item, '_yoast_wpseo_focuskw', 'case study decision intelligence')

        # Track images for download
        if case_study['featured_image_url']:
            image_filename = f"case-study-featured-{idx}-{case_study['featured_image_id']}.jpg"
            image_downloads.append({
                'url': case_study['featured_image_url'],
                'filename': image_filename,
                'type': 'featured',
                'case_study_title': title,
                'slug': slug
            })

        if case_study['icon_url']:
            icon_ext = case_study['icon_url'].split('.')[-1].split('?')[0]
            icon_filename = f"case-study-icon-{idx}-{case_study['icon_id']}.{icon_ext}"
            image_downloads.append({
                'url': case_study['icon_url'],
                'filename': icon_filename,
                'type': 'icon',
                'case_study_title': title,
                'slug': slug
            })

        print(f"  ✓ {title}")

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
rss, image_downloads = create_wxr_xml(combined_case_studies)

# Pretty print XML
xml_str = ET.tostring(rss, encoding='unicode')
dom = minidom.parseString(xml_str)
pretty_xml = dom.toprettyxml(indent='  ')
pretty_xml = '\n'.join([line for line in pretty_xml.split('\n') if line.strip()])

# Save to file
script_dir = os.path.dirname(os.path.abspath(__file__))
output_file = os.path.join(script_dir, 'wordpress-case-studies-import.xml')

try:
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(pretty_xml)
    print(f"\n💾 Saved WordPress import file: wordpress-case-studies-import.xml")
except Exception as e:
    print(f"\n❌ Error saving XML: {e}")
    output_file = 'wordpress-case-studies-import.xml'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(pretty_xml)
    print(f"💾 Saved to alternate location: {output_file}")

# Generate image download script
if image_downloads:
    download_script = os.path.join(script_dir, 'download-case-study-images.sh')
    with open(download_script, 'w') as f:
        f.write('#!/bin/bash\n\n')
        f.write('# Download case study images from Contentful\n')
        f.write('# After running this script, upload images to WordPress Media Library\n\n')
        f.write('mkdir -p case-study-images\n')
        f.write('cd case-study-images\n\n')

        for img in image_downloads:
            f.write(f"# {img['case_study_title']} - {img['type']} ({img['slug']})\n")
            f.write(f"curl -o \"{img['filename']}\" \"{img['url']}\"\n\n")

        f.write('echo "✅ Downloaded all case study images to case-study-images/"\n')

    os.chmod(download_script, 0o755)
    print(f"💾 Saved image download script: download-case-study-images.sh")

# Generate summary
summary = {
    'export_date': datetime.now().strftime('%Y-%m-%d'),
    'total_case_studies': len(combined_case_studies),
    'with_featured_images': sum(1 for cs in combined_case_studies if cs['featured_image_url']),
    'with_icons': sum(1 for cs in combined_case_studies if cs['icon_url']),
    'with_card_data': sum(1 for cs in combined_case_studies if cs['company_type']),
    'post_ids': f'8001-{8000 + len(combined_case_studies)}',
    'case_studies': [
        {
            'title': cs['title'],
            'slug': cs['slug'],
            'company_type': cs['company_type'],
            'has_featured_image': bool(cs['featured_image_url']),
            'has_icon': bool(cs['icon_url']),
            'has_card_data': bool(cs['company_type'])
        }
        for cs in combined_case_studies
    ]
}

summary_file = os.path.join(script_dir, 'case-studies-import-summary.json')
try:
    with open(summary_file, 'w') as f:
        json.dump(summary, f, indent=2)
    print(f"💾 Saved summary: case-studies-import-summary.json")
except:
    with open('case-studies-import-summary.json', 'w') as f:
        json.dump(summary, f, indent=2)
    print(f"💾 Saved summary to alternate location")

print(f"\n✨ Done!")
print(f"\n📝 Summary:")
print(f"   - {len(combined_case_studies)} case studies converted (combined page + card data)")
print(f"   - {summary['with_featured_images']}/{len(combined_case_studies)} have featured images")
print(f"   - {summary['with_icons']}/{len(combined_case_studies)} have card icons")
print(f"   - {summary['with_card_data']}/{len(combined_case_studies)} have card data")
print(f"   - Post IDs: 8001-{8000 + len(combined_case_studies)}")
print(f"\n🚀 Next steps:")
print(f"   1. Run ./download-case-study-images.sh to download images")
print(f"   2. Upload images to WordPress Media Library")
print(f"   3. Import wordpress-case-studies-import.xml to WordPress")
print(f"   4. Set featured images for each case study post")
print(f"   5. Set icon images for each case study post via ACF")
