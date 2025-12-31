#!/usr/bin/env python3
"""
Convert Contentful Videos to WordPress WXR import format
Uses Resource Card fields - no video-specific fields needed
"""
import json
import xml.etree.ElementTree as ET
from xml.dom import minidom
from datetime import datetime
import re
import os

print("📹 Converting Videos from Contentful to WordPress")
print("=" * 80)

# Read Contentful export
contentful_file = 'contentful-export-mh1amgo8m7ts-master-2025-11-24T23-06-28.json'
print(f"\n📖 Reading: {contentful_file}\n")

with open(contentful_file, 'r') as f:
    data = json.load(f)

# Extract videos
videos = []
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

# Extract video entries
print("\n📹 Extracting video entries...")
for entry in data.get('entries', []):
    content_type = entry.get('sys', {}).get('contentType', {}).get('sys', {}).get('id', '')

    if content_type == 'videos':
        fields = entry.get('fields', {})

        # Get image URL
        image_id = fields.get('image', {}).get('en-US', {}).get('sys', {}).get('id')
        image_url = ''
        if image_id and image_id in image_refs:
            image_url = 'https:' + image_refs[image_id]['url'] if image_refs[image_id]['url'].startswith('//') else image_refs[image_id]['url']

        video = {
            'id': entry['sys']['id'],
            'title': fields.get('title', {}).get('en-US', ''),
            'date': fields.get('date', {}).get('en-US', ''),
            'text': fields.get('text', {}).get('en-US', ''),
            'link': fields.get('link', {}).get('en-US', ''),
            'type': fields.get('type', {}).get('en-US', ''),
            'image_url': image_url,
            'image_id': image_id or ''
        }

        if video['title']:
            videos.append(video)
            print(f"  ✓ {video['title']}")

print(f"\n✅ Found {len(videos)} videos")

# Sort by date (most recent first)
videos.sort(key=lambda x: x['date'] if x['date'] else '1900-01-01', reverse=True)

# Create slug function
def create_slug(title):
    slug = title.lower()
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'\s+', '-', slug)
    slug = re.sub(r'-+', '-', slug)
    return slug.strip('-')

# Create WordPress WXR XML
def create_wxr_xml(videos):
    rss = ET.Element('rss', {
        'version': '2.0',
        'xmlns:excerpt': 'http://wordpress.org/export/1.2/excerpt/',
        'xmlns:content': 'http://purl.org/rss/1.0/modules/content/',
        'xmlns:wfw': 'http://wellformedweb.org/CommentAPI/',
        'xmlns:dc': 'http://purl.org/dc/elements/1.1/',
        'xmlns:wp': 'http://wordpress.org/export/1.2/'
    })

    channel = ET.SubElement(rss, 'channel')

    ET.SubElement(channel, 'title').text = 'Aera Technology Videos'
    ET.SubElement(channel, 'link').text = 'https://aeratechnology.com'
    ET.SubElement(channel, 'description').text = 'Video imports from Contentful'
    ET.SubElement(channel, 'pubDate').text = datetime.now().strftime('%a, %d %b %Y %H:%M:%S +0000')
    ET.SubElement(channel, 'language').text = 'en-US'
    ET.SubElement(channel, 'wp:wxr_version').text = '1.2'

    # Add videos as posts
    print(f"\n📝 Generating video posts...")

    image_downloads = []

    for idx, video in enumerate(videos, start=1):
        title = video['title']
        slug = create_slug(title)

        # Parse date
        pub_date_str = datetime.now().strftime('%a, %d %b %Y %H:%M:%S +0000')
        post_date_str = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        if video['date']:
            try:
                date_obj = datetime.strptime(video['date'], '%Y-%m-%d')
                pub_date_str = date_obj.strftime('%a, %d %b %Y %H:%M:%S +0000')
                post_date_str = date_obj.strftime('%Y-%m-%d %H:%M:%S')
            except:
                pass

        # Create item (post)
        item = ET.SubElement(channel, 'item')
        ET.SubElement(item, 'title').text = title
        ET.SubElement(item, 'link').text = f'https://aeratechnology.com/video/{slug}'
        ET.SubElement(item, 'pubDate').text = pub_date_str
        ET.SubElement(item, 'dc:creator').text = 'admin'
        ET.SubElement(item, 'guid', {'isPermaLink': 'false'}).text = f'https://aeratechnology.com/?post_type=video&p={6000 + idx}'
        ET.SubElement(item, 'description')
        ET.SubElement(item, 'content:encoded').text = video['text']
        ET.SubElement(item, 'excerpt:encoded').text = video['text'][:200] if video['text'] else ''

        ET.SubElement(item, 'wp:post_id').text = str(6000 + idx)
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
        ET.SubElement(item, 'wp:post_type').text = 'video'
        ET.SubElement(item, 'wp:post_password').text = ''
        ET.SubElement(item, 'wp:is_sticky').text = '0'

        # Resource Card ACF Fields
        # External URL (the meet.aeratechnology.com link)
        if video['link']:
            add_postmeta(item, 'resource_external_url', video['link'])

        # Custom CTA text
        add_postmeta(item, 'resource_cta_text', 'Watch Now')

        # Card excerpt (same as content for videos)
        if video['text']:
            add_postmeta(item, 'resource_excerpt', video['text'])

        # Yoast SEO
        add_postmeta(item, '_yoast_wpseo_title', f'{title} | Aera Technology')
        if video['text']:
            meta_desc = video['text'][:155]
            add_postmeta(item, '_yoast_wpseo_metadesc', meta_desc)
        add_postmeta(item, '_yoast_wpseo_focuskw', 'decision intelligence video')

        # Track image for download
        if video['image_url']:
            image_filename = f"video-{idx}-{video['image_id']}.jpg"
            image_downloads.append({
                'url': video['image_url'],
                'filename': image_filename,
                'video_title': title
            })

        external_marker = " 🔗" if video['link'] else ""
        type_marker = f" [{video['type']}]" if video['type'] else ""
        print(f"  ✓ {title}{type_marker}{external_marker}")

    return rss, image_downloads

def add_postmeta(item, key, value):
    """Add a postmeta field to a WordPress item"""
    if value or value == '0':
        postmeta = ET.SubElement(item, 'wp:postmeta')
        ET.SubElement(postmeta, 'wp:meta_key').text = key
        ET.SubElement(postmeta, 'wp:meta_value').text = str(value)

# Generate the WXR XML
print(f"\n🔨 Generating WordPress WXR XML...")
rss, image_downloads = create_wxr_xml(videos)

# Pretty print XML
xml_str = ET.tostring(rss, encoding='unicode')
dom = minidom.parseString(xml_str)
pretty_xml = dom.toprettyxml(indent='  ')
pretty_xml = '\n'.join([line for line in pretty_xml.split('\n') if line.strip()])

# Save to file
script_dir = os.path.dirname(os.path.abspath(__file__))
output_file = os.path.join(script_dir, 'wordpress-videos-import.xml')

try:
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(pretty_xml)
    print(f"\n💾 Saved WordPress import file: wordpress-videos-import.xml")
except Exception as e:
    print(f"\n❌ Error saving XML: {e}")
    output_file = 'wordpress-videos-import.xml'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(pretty_xml)
    print(f"💾 Saved to alternate location: {output_file}")

# Generate image download script
download_script = os.path.join(script_dir, 'download-video-images.sh')
with open(download_script, 'w') as f:
    f.write('#!/bin/bash\n\n')
    f.write('# Download video images from Contentful\n')
    f.write('# After running this script, upload images to WordPress Media Library\n\n')
    f.write('mkdir -p video-images\n')
    f.write('cd video-images\n\n')

    for img in image_downloads:
        f.write(f"# {img['video_title']}\n")
        f.write(f"curl -o \"{img['filename']}\" \"{img['url']}\"\n\n")

    f.write('echo "✅ Downloaded all video images to video-images/"\n')

os.chmod(download_script, 0o755)
print(f"💾 Saved image download script: download-video-images.sh")

# Generate summary
summary = {
    'export_date': datetime.now().strftime('%Y-%m-%d'),
    'total_videos': len(videos),
    'with_external_links': sum(1 for v in videos if v['link']),
    'with_dates': sum(1 for v in videos if v['date']),
    'with_images': sum(1 for v in videos if v['image_url']),
    'post_ids': f'6001-{6000 + len(videos)}',
    'videos': [
        {
            'title': v['title'],
            'date': v['date'],
            'type': v['type'],
            'link': v['link'],
            'has_image': bool(v['image_url'])
        }
        for v in videos
    ]
}

summary_file = os.path.join(script_dir, 'videos-import-summary.json')
try:
    with open(summary_file, 'w') as f:
        json.dump(summary, f, indent=2)
    print(f"💾 Saved summary: videos-import-summary.json")
except:
    with open('videos-import-summary.json', 'w') as f:
        json.dump(summary, f, indent=2)
    print(f"💾 Saved summary to alternate location")

print(f"\n✨ Done!")
print(f"\n📝 Summary:")
print(f"   - {len(videos)} videos converted")
print(f"   - {summary['with_external_links']}/{len(videos)} have external links")
print(f"   - {summary['with_dates']}/{len(videos)} have dates")
print(f"   - {summary['with_images']}/{len(videos)} have images")
print(f"   - Post IDs: 6001-{6000 + len(videos)}")
print(f"\n🚀 Next steps:")
print(f"   1. Sync ACF field groups to deactivate Video Fields")
print(f"   2. Run ./download-video-images.sh to download images")
print(f"   3. Upload images to WordPress Media Library")
print(f"   4. Import wordpress-videos-import.xml to WordPress")
print(f"   5. Set featured images for each video post")
print(f"   6. External links will work automatically via resource_external_url field")

