#!/usr/bin/env python3
"""
Convert Contentful Module Template Pages to WordPress Platform Detail pages
"""
import json
import xml.etree.ElementTree as ET
from xml.dom import minidom
from datetime import datetime
import re

print("📖 Reading Contentful export file...")
with open('contentful-export-mh1amgo8m7ts-master-2025-11-24T23-06-28.json', 'r') as f:
    data = json.load(f)

print("✅ File loaded successfully")

# Create assets lookup dictionary
assets_lookup = {}
for asset in data.get('assets', []):
    asset_id = asset.get('sys', {}).get('id', '')
    if asset_id:
        file_info = asset.get('fields', {}).get('file', {}).get('en-US', {})
        title = asset.get('fields', {}).get('title', {}).get('en-US', '')
        assets_lookup[asset_id] = {
            'url': file_info.get('url', ''),
            'filename': file_info.get('fileName', ''),
            'title': title,
            'contentType': file_info.get('contentType', '')
        }

print(f"✅ Loaded {len(assets_lookup)} assets")

# Get module template page entries
module_entries = []
for entry in data.get('entries', []):
    ct_id = entry.get('sys', {}).get('contentType', {}).get('sys', {}).get('id', '')
    if ct_id == 'moduleTemplatePage':
        module_entries.append(entry)

# Sort by updated date (most recent first)
module_entries.sort(key=lambda x: x.get('sys', {}).get('updatedAt', ''), reverse=True)

print(f"✅ Found {len(module_entries)} Module Template Page entries")

print(f"\n✨ Converting all {len(module_entries)} module pages:")
for i, entry in enumerate(module_entries, 1):
    title = entry.get('fields', {}).get('title', {}).get('en-US', 'No title')
    slug = entry.get('fields', {}).get('slug', {}).get('en-US', '')
    print(f"  {i}. {title} ({slug})")

# Function to resolve asset URL
def resolve_asset(asset_link):
    if not asset_link:
        return None
    asset_id = asset_link.get('sys', {}).get('id', '')
    asset_info = assets_lookup.get(asset_id, {})
    if asset_info.get('url'):
        url = asset_info['url']
        if url.startswith('//'):
            url = 'https:' + url
        return url
    return None

# Function to create WordPress post slug
def create_slug(title):
    slug = title.lower()
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'\s+', '-', slug)
    slug = re.sub(r'-+', '-', slug)
    return slug.strip('-')

# Create WordPress WXR XML
def create_wxr_xml(modules):
    rss = ET.Element('rss', {
        'version': '2.0',
        'xmlns:excerpt': 'http://wordpress.org/export/1.2/excerpt/',
        'xmlns:content': 'http://purl.org/rss/1.0/modules/content/',
        'xmlns:wfw': 'http://wellformedweb.org/CommentAPI/',
        'xmlns:dc': 'http://purl.org/dc/elements/1.1/',
        'xmlns:wp': 'http://wordpress.org/export/1.2/'
    })

    channel = ET.SubElement(rss, 'channel')

    ET.SubElement(channel, 'title').text = 'Aera Technology Module Template Pages'
    ET.SubElement(channel, 'link').text = 'https://aeratechnology.com'
    ET.SubElement(channel, 'description').text = 'Module Template Pages import from Contentful'
    ET.SubElement(channel, 'pubDate').text = datetime.now().strftime('%a, %d %b %Y %H:%M:%S +0000')
    ET.SubElement(channel, 'language').text = 'en-US'
    ET.SubElement(channel, 'wp:wxr_version').text = '1.2'

    # Track images
    images_to_download = []

    # Add each module as a WordPress page (starting at 3001)
    for idx, module in enumerate(modules, start=1):
        fields = module.get('fields', {})
        sys_info = module.get('sys', {})

        # Extract fields
        title = fields.get('title', {}).get('en-US', f'Module {idx}')
        slug = fields.get('slug', {}).get('en-US', create_slug(title))
        description = fields.get('description', {}).get('en-US', '')
        body_copy = fields.get('bodyCopy', {}).get('en-US', '')
        features = fields.get('features', {}).get('en-US', '')
        benefits = fields.get('benefits', {}).get('en-US', '')
        content = fields.get('content', {}).get('en-US', '')
        meta_title = fields.get('metaTitle', {}).get('en-US', '')
        meta_description = fields.get('metaDescription', {}).get('en-US', '')

        featured_image_link = fields.get('featuredImage', {}).get('en-US', {})
        featured_image_url = resolve_asset(featured_image_link)

        if featured_image_url:
            images_to_download.append({
                'url': featured_image_url,
                'page': title,
                'slug': slug
            })

        # Dates
        created_at = sys_info.get('createdAt', datetime.now().isoformat())
        created_date = datetime.fromisoformat(created_at.replace('Z', '+00:00'))
        pub_date = created_date.strftime('%a, %d %b %Y %H:%M:%S +0000')

        # Create item (page)
        item = ET.SubElement(channel, 'item')
        ET.SubElement(item, 'title').text = title
        ET.SubElement(item, 'link').text = f'https://aeratechnology.com/{slug}'
        ET.SubElement(item, 'pubDate').text = pub_date
        ET.SubElement(item, 'dc:creator').text = 'admin'
        ET.SubElement(item, 'guid', {'isPermaLink': 'false'}).text = f'https://aeratechnology.com/?page_id={3000 + idx}'
        ET.SubElement(item, 'description')

        # Content - use content field if available, otherwise empty
        ET.SubElement(item, 'content:encoded').text = content if content else ''
        ET.SubElement(item, 'excerpt:encoded').text = description if description else ''

        ET.SubElement(item, 'wp:post_id').text = str(3000 + idx)
        ET.SubElement(item, 'wp:post_date').text = created_date.strftime('%Y-%m-%d %H:%M:%S')
        ET.SubElement(item, 'wp:post_date_gmt').text = created_date.strftime('%Y-%m-%d %H:%M:%S')
        ET.SubElement(item, 'wp:post_modified').text = created_date.strftime('%Y-%m-%d %H:%M:%S')
        ET.SubElement(item, 'wp:post_modified_gmt').text = created_date.strftime('%Y-%m-%d %H:%M:%S')
        ET.SubElement(item, 'wp:comment_status').text = 'closed'
        ET.SubElement(item, 'wp:ping_status').text = 'closed'
        ET.SubElement(item, 'wp:post_name').text = slug
        ET.SubElement(item, 'wp:status').text = 'publish'
        ET.SubElement(item, 'wp:post_parent').text = '0'
        ET.SubElement(item, 'wp:menu_order').text = '0'
        ET.SubElement(item, 'wp:post_type').text = 'page'
        ET.SubElement(item, 'wp:post_password').text = ''
        ET.SubElement(item, 'wp:is_sticky').text = '0'

        # Set page template
        add_postmeta(item, '_wp_page_template', 'page-platform-detail.php')

        # Add ACF custom fields for platform detail page
        # Description goes to page_lead
        if description:
            add_postmeta(item, 'page_lead', description)

        # Core platform fields
        if body_copy:
            add_postmeta(item, 'platform_body_copy', body_copy)

        if features:
            add_postmeta(item, 'platform_features', features)

        if benefits:
            add_postmeta(item, 'platform_benefits', benefits)

        if featured_image_url:
            add_postmeta(item, 'platform_featured_image', f'{{MEDIA_PATH}}/{featured_image_url.split("/")[-1]}')
            add_postmeta(item, '_platform_featured_image_url', featured_image_url)

        # SEO fields
        if meta_title:
            add_postmeta(item, '_yoast_wpseo_title', meta_title)

        if meta_description:
            add_postmeta(item, '_yoast_wpseo_metadesc', meta_description)

        # Store original Contentful slug for reference
        add_postmeta(item, '_original_contentful_slug', slug)

        # Default optional fields
        add_postmeta(item, 'page_show_date', '0')  # Don't show date by default
        add_postmeta(item, 'platform_show_not_found', '0')  # Don't show not found by default

        print(f"  ✓ {title} - {len(body_copy)} chars body, {len(features)} chars features, {len(benefits)} chars benefits")

    return rss, images_to_download

def add_postmeta(item, key, value):
    """Add a postmeta field to a WordPress item"""
    if value or value == '0':  # Allow '0' as a valid value
        postmeta = ET.SubElement(item, 'wp:postmeta')
        ET.SubElement(postmeta, 'wp:meta_key').text = key
        ET.SubElement(postmeta, 'wp:meta_value').text = str(value)

# Generate the WXR XML
print(f"\n🔨 Generating WordPress WXR XML for {len(module_entries)} pages...")
rss, images_to_download = create_wxr_xml(module_entries)

# Pretty print XML
xml_str = ET.tostring(rss, encoding='unicode')
dom = minidom.parseString(xml_str)
pretty_xml = dom.toprettyxml(indent='  ')
pretty_xml = '\n'.join([line for line in pretty_xml.split('\n') if line.strip()])

# Save to file
output_file = 'wordpress-module-pages-import.xml'
with open(output_file, 'w', encoding='utf-8') as f:
    f.write(pretty_xml)

print(f"\n💾 Saved WordPress import file: {output_file}")

# Generate download script
print(f"\n🔧 Generating image download script...")
with open('download-module-images.sh', 'w') as f:
    f.write('#!/bin/bash\n')
    f.write('# Download module page featured images from Contentful\n\n')
    f.write('echo "📥 Downloading module page images from Contentful..."\n\n')
    f.write('mkdir -p module-images\n\n')

    for idx, img in enumerate(images_to_download, start=1):
        filename = img['url'].split('/')[-1]
        output_name = f"{img['slug']}.{filename.split('.')[-1]}"
        f.write(f'echo "{idx}. Downloading {img["page"]}..."\n')
        f.write(f'curl -L "{img["url"]}" -o "module-images/{output_name}"\n\n')

    f.write('echo "✅ All images downloaded to module-images/"\n')

print(f"💾 Saved download script: download-module-images.sh")

# Generate summary JSON
print(f"\n📊 Generating summary JSON...")
summary = {
    'export_date': datetime.now().strftime('%Y-%m-%d'),
    'total_pages': len(module_entries),
    'pages': []
}

for idx, module in enumerate(module_entries, start=1):
    fields = module.get('fields', {})

    page_data = {
        'id': idx,
        'wordpress_page_id': 3000 + idx,
        'title': fields.get('title', {}).get('en-US', ''),
        'slug': fields.get('slug', {}).get('en-US', ''),
        'description': fields.get('description', {}).get('en-US', '')[:100] + '...' if fields.get('description', {}).get('en-US') else '',
        'has_body_copy': bool(fields.get('bodyCopy', {}).get('en-US')),
        'has_features': bool(fields.get('features', {}).get('en-US')),
        'has_benefits': bool(fields.get('benefits', {}).get('en-US')),
        'has_featured_image': bool(fields.get('featuredImage', {}).get('en-US')),
        'updated': module.get('sys', {}).get('updatedAt', '')[:10]
    }
    summary['pages'].append(page_data)

with open('module-pages-import-summary.json', 'w') as f:
    json.dump(summary, f, indent=2)

print(f"💾 Saved summary: module-pages-import-summary.json")

print(f"\n✨ Done!")
print(f"\n📝 Summary:")
print(f"   - {len(module_entries)} module pages converted")
print(f"   - {len(images_to_download)} featured images to download")
print(f"   - Page IDs: 3001-{3000 + len(module_entries)}")
print(f"   - Template: page-platform-detail.php")
print(f"   - Import file: {output_file}")
print(f"\n🚀 Next steps:")
print(f"   1. bash download-module-images.sh")
print(f"   2. Import {output_file} to WordPress")
print(f"   3. Upload images to Media Library")
print(f"   4. Link images to pages via ACF fields")



