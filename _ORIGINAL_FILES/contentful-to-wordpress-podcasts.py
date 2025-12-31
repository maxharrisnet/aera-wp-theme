#!/usr/bin/env python3
"""
Convert Contentful Podcasts to WordPress WXR import format
Uses Resource Card fields - no podcast-specific fields needed
"""
import json
import xml.etree.ElementTree as ET
from xml.dom import minidom
from datetime import datetime
import re
import os

print("🎙️  Converting Podcasts from Contentful to WordPress")
print("=" * 80)

# Read Contentful export
contentful_file = 'contentful-export-mh1amgo8m7ts-master-2025-11-24T23-06-28.json'
print(f"\n📖 Reading: {contentful_file}\n")

with open(contentful_file, 'r') as f:
    data = json.load(f)

# Extract podcasts
podcasts = []
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

# Extract podcast entries
print("\n🎙️  Extracting podcast entries...")
for entry in data.get('entries', []):
    content_type = entry.get('sys', {}).get('contentType', {}).get('sys', {}).get('id', '')

    # Only process published entries
    if not entry.get('sys', {}).get('publishedAt'):
        continue

    if content_type == 'podcasts':
        fields = entry.get('fields', {})

        # Get image URL
        image_id = fields.get('image', {}).get('en-US', {}).get('sys', {}).get('id')
        image_url = ''
        if image_id and image_id in image_refs:
            image_url = 'https:' + image_refs[image_id]['url'] if image_refs[image_id]['url'].startswith('//') else image_refs[image_id]['url']

        podcast = {
            'id': entry['sys']['id'],
            'title': fields.get('title', {}).get('en-US', ''),
            'date': fields.get('date', {}).get('en-US', ''),
            'text': fields.get('text', {}).get('en-US', ''),
            'link': fields.get('link', {}).get('en-US', ''),
            'image_url': image_url,
            'image_id': image_id or ''
        }

        if podcast['title']:
            podcasts.append(podcast)
            print(f"  ✓ {podcast['title']}")

print(f"\n✅ Found {len(podcasts)} podcasts")

# Sort by date (most recent first)
podcasts.sort(key=lambda x: x['date'] if x['date'] else '1900-01-01', reverse=True)

# Create slug function
def create_slug(title):
    slug = title.lower()
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'\s+', '-', slug)
    slug = re.sub(r'-+', '-', slug)
    return slug.strip('-')

# Create WordPress WXR XML
def create_wxr_xml(podcasts):
    rss = ET.Element('rss', {
        'version': '2.0',
        'xmlns:excerpt': 'http://wordpress.org/export/1.2/excerpt/',
        'xmlns:content': 'http://purl.org/rss/1.0/modules/content/',
        'xmlns:wfw': 'http://wellformedweb.org/CommentAPI/',
        'xmlns:dc': 'http://purl.org/dc/elements/1.1/',
        'xmlns:wp': 'http://wordpress.org/export/1.2/'
    })

    channel = ET.SubElement(rss, 'channel')

    ET.SubElement(channel, 'title').text = 'Aera Technology Podcasts'
    ET.SubElement(channel, 'link').text = 'https://aeratechnology.com'
    ET.SubElement(channel, 'description').text = 'Podcast imports from Contentful'
    ET.SubElement(channel, 'pubDate').text = datetime.now().strftime('%a, %d %b %Y %H:%M:%S +0000')
    ET.SubElement(channel, 'language').text = 'en-US'
    ET.SubElement(channel, 'wp:wxr_version').text = '1.2'

    # Add podcasts as posts
    print(f"\n📝 Generating podcast posts...")

    image_downloads = []

    for idx, podcast in enumerate(podcasts, start=1):
        title = podcast['title']
        slug = create_slug(title)

        # Parse date
        pub_date_str = datetime.now().strftime('%a, %d %b %Y %H:%M:%S +0000')
        post_date_str = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        if podcast['date']:
            try:
                date_obj = datetime.strptime(podcast['date'], '%Y-%m-%d')
                pub_date_str = date_obj.strftime('%a, %d %b %Y %H:%M:%S +0000')
                post_date_str = date_obj.strftime('%Y-%m-%d %H:%M:%S')
            except:
                pass

        # Create item (post)
        item = ET.SubElement(channel, 'item')
        ET.SubElement(item, 'title').text = title
        ET.SubElement(item, 'link').text = f'https://aeratechnology.com/podcast/{slug}'
        ET.SubElement(item, 'pubDate').text = pub_date_str
        ET.SubElement(item, 'dc:creator').text = 'admin'
        ET.SubElement(item, 'guid', {'isPermaLink': 'false'}).text = f'https://aeratechnology.com/?post_type=podcast&p={5000 + idx}'
        ET.SubElement(item, 'description')
        ET.SubElement(item, 'content:encoded').text = podcast['text']
        ET.SubElement(item, 'excerpt:encoded').text = podcast['text'][:200] if podcast['text'] else ''

        ET.SubElement(item, 'wp:post_id').text = str(5000 + idx)
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
        ET.SubElement(item, 'wp:post_type').text = 'podcast'
        ET.SubElement(item, 'wp:post_password').text = ''
        ET.SubElement(item, 'wp:is_sticky').text = '0'

        # Resource Card ACF Fields
        # External URL (the meet.aeratechnology.com link)
        if podcast['link']:
            add_postmeta(item, 'resource_external_url', podcast['link'])

        # Custom CTA text
        add_postmeta(item, 'resource_cta_text', 'Listen Now')

        # Card excerpt (same as content for podcasts)
        if podcast['text']:
            add_postmeta(item, 'resource_excerpt', podcast['text'])

        # Yoast SEO
        add_postmeta(item, '_yoast_wpseo_title', f'{title} | Aera Technology')
        if podcast['text']:
            meta_desc = podcast['text'][:155]
            add_postmeta(item, '_yoast_wpseo_metadesc', meta_desc)
        add_postmeta(item, '_yoast_wpseo_focuskw', 'decision intelligence podcast')

        # Track image for download
        if podcast['image_url']:
            image_filename = f"podcast-{idx}-{podcast['image_id']}.jpg"
            image_downloads.append({
                'url': podcast['image_url'],
                'filename': image_filename,
                'podcast_title': title
            })

        external_marker = " 🔗" if podcast['link'] else ""
        print(f"  ✓ {title}{external_marker}")

    return rss, image_downloads

def add_postmeta(item, key, value):
    """Add a postmeta field to a WordPress item"""
    if value or value == '0':
        postmeta = ET.SubElement(item, 'wp:postmeta')
        ET.SubElement(postmeta, 'wp:meta_key').text = key
        ET.SubElement(postmeta, 'wp:meta_value').text = str(value)

# Generate the WXR XML
print(f"\n🔨 Generating WordPress WXR XML...")
rss, image_downloads = create_wxr_xml(podcasts)

# Pretty print XML
xml_str = ET.tostring(rss, encoding='unicode')
dom = minidom.parseString(xml_str)
pretty_xml = dom.toprettyxml(indent='  ')
pretty_xml = '\n'.join([line for line in pretty_xml.split('\n') if line.strip()])

# Save to file
script_dir = os.path.dirname(os.path.abspath(__file__))
output_file = os.path.join(script_dir, 'wordpress-podcasts-import.xml')

try:
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(pretty_xml)
    print(f"\n💾 Saved WordPress import file: wordpress-podcasts-import.xml")
except Exception as e:
    print(f"\n❌ Error saving XML: {e}")
    output_file = 'wordpress-podcasts-import.xml'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(pretty_xml)
    print(f"💾 Saved to alternate location: {output_file}")

# Generate image download script
download_script = os.path.join(script_dir, 'download-podcast-images.sh')
with open(download_script, 'w') as f:
    f.write('#!/bin/bash\n\n')
    f.write('# Download podcast images from Contentful\n')
    f.write('# After running this script, upload images to WordPress Media Library\n\n')
    f.write('mkdir -p podcast-images\n')
    f.write('cd podcast-images\n\n')

    for img in image_downloads:
        f.write(f"# {img['podcast_title']}\n")
        f.write(f"curl -o \"{img['filename']}\" \"{img['url']}\"\n\n")

    f.write('echo "✅ Downloaded all podcast images to podcast-images/"\n')

os.chmod(download_script, 0o755)
print(f"💾 Saved image download script: download-podcast-images.sh")

# Generate summary
summary = {
    'export_date': datetime.now().strftime('%Y-%m-%d'),
    'total_podcasts': len(podcasts),
    'with_external_links': sum(1 for p in podcasts if p['link']),
    'with_dates': sum(1 for p in podcasts if p['date']),
    'with_images': sum(1 for p in podcasts if p['image_url']),
    'post_ids': f'5001-{5000 + len(podcasts)}',
    'podcasts': [
        {
            'title': p['title'],
            'date': p['date'],
            'link': p['link'],
            'has_image': bool(p['image_url'])
        }
        for p in podcasts
    ]
}

summary_file = os.path.join(script_dir, 'podcasts-import-summary.json')
try:
    with open(summary_file, 'w') as f:
        json.dump(summary, f, indent=2)
    print(f"💾 Saved summary: podcasts-import-summary.json")
except:
    with open('podcasts-import-summary.json', 'w') as f:
        json.dump(summary, f, indent=2)
    print(f"💾 Saved summary to alternate location")

print(f"\n✨ Done!")
print(f"\n📝 Summary:")
print(f"   - {len(podcasts)} podcasts converted")
print(f"   - {summary['with_external_links']}/{len(podcasts)} have external links")
print(f"   - {summary['with_dates']}/{len(podcasts)} have dates")
print(f"   - {summary['with_images']}/{len(podcasts)} have images")
print(f"   - Post IDs: 5001-{5000 + len(podcasts)}")
print(f"\n🚀 Next steps:")
print(f"   1. Run ./download-podcast-images.sh to download images")
print(f"   2. Upload images to WordPress Media Library")
print(f"   3. Import wordpress-podcasts-import.xml to WordPress")
print(f"   4. Set featured images for each podcast post")
print(f"   5. External links will work automatically via resource_external_url field")

