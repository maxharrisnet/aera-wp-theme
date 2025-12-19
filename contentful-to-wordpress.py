#!/usr/bin/env python3
"""
Convert Contentful customer data to WordPress WXR (WordPress eXtended RSS) import format
"""
import json
import xml.etree.ElementTree as ET
from xml.dom import minidom
from datetime import datetime

# Read the Contentful export file
print("📖 Reading Contentful export file...")
with open('_ORIGINAL_FILES/contentful-export-mh1amgo8m7ts-master-2025-11-24T23-06-28.json', 'r') as f:
    data = json.load(f)

print(f"✅ File loaded successfully")

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

# Get customer page cards entries
customer_entries = []
for entry in data.get('entries', []):
    ct_id = entry.get('sys', {}).get('contentType', {}).get('sys', {}).get('id', '')
    if ct_id == 'customerPageCards':
        customer_entries.append(entry)

# Sort by updated date (most recent first)
customer_entries.sort(key=lambda x: x.get('sys', {}).get('updatedAt', ''), reverse=True)

print(f"✅ Found {len(customer_entries)} customer card entries")

# Filter out Unilever and get the 3 most recent
selected_customers = []
for entry in customer_entries:
    title = entry.get('fields', {}).get('title', {}).get('en-US', '').lower()
    company_text = entry.get('fields', {}).get('companyText', {}).get('en-US', '').lower()

    # Check hero image and logo URLs for Unilever references
    hero_image_link = entry.get('fields', {}).get('heroImage', {}).get('en-US', {})
    hero_asset_id = hero_image_link.get('sys', {}).get('id', '') if hero_image_link else ''
    hero_info = assets_lookup.get(hero_asset_id, {})
    hero_filename = hero_info.get('filename', '').lower()

    logo_link = entry.get('fields', {}).get('companyLogo', {}).get('en-US', {})
    logo_asset_id = logo_link.get('sys', {}).get('id', '') if logo_link else ''
    logo_info = assets_lookup.get(logo_asset_id, {})
    logo_filename = logo_info.get('filename', '').lower()

    is_unilever = (
        'unilever' in title or
        'unilever' in company_text or
        'unilever' in hero_filename or
        'unilever' in logo_filename
    )

    if not is_unilever:
        selected_customers.append(entry)
        if len(selected_customers) == 3:
            break

print(f"\n✨ Selected 3 most recent customers (excluding Unilever):")
for i, customer in enumerate(selected_customers):
    title = customer.get('fields', {}).get('title', {}).get('en-US', 'No title')
    print(f"  {i+1}. {title}")

# Function to resolve asset URL
def resolve_asset(asset_link):
    if not asset_link:
        return None
    asset_id = asset_link.get('sys', {}).get('id', '')
    asset_info = assets_lookup.get(asset_id, {})
    if asset_info.get('url'):
        # Add https: if URL starts with //
        url = asset_info['url']
        if url.startswith('//'):
            url = 'https:' + url
        return url
    return None

# Function to create WordPress post slug from title
def create_slug(title):
    import re
    slug = title.lower()
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'\s+', '-', slug)
    slug = re.sub(r'-+', '-', slug)
    return slug.strip('-')

# Create WordPress WXR XML
def create_wxr_xml(customers):
    # Create root RSS element
    rss = ET.Element('rss', {
        'version': '2.0',
        'xmlns:excerpt': 'http://wordpress.org/export/1.2/excerpt/',
        'xmlns:content': 'http://purl.org/rss/1.0/modules/content/',
        'xmlns:wfw': 'http://wellformedweb.org/CommentAPI/',
        'xmlns:dc': 'http://purl.org/dc/elements/1.1/',
        'xmlns:wp': 'http://wordpress.org/export/1.2/'
    })

    channel = ET.SubElement(rss, 'channel')

    # Add channel metadata
    ET.SubElement(channel, 'title').text = 'Aera Technology Customers'
    ET.SubElement(channel, 'link').text = 'https://aeratechnology.com'
    ET.SubElement(channel, 'description').text = 'Customer data import from Contentful'
    ET.SubElement(channel, 'pubDate').text = datetime.now().strftime('%a, %d %b %Y %H:%M:%S +0000')
    ET.SubElement(channel, 'language').text = 'en-US'
    ET.SubElement(channel, 'wp:wxr_version').text = '1.2'

    # Add each customer as a post
    for idx, customer in enumerate(customers, start=1):
        fields = customer.get('fields', {})
        sys_info = customer.get('sys', {})

        # Extract fields
        title = fields.get('title', {}).get('en-US', f'Customer {idx}')
        company_name = fields.get('companyText', {}).get('en-US', '')
        customer_type = fields.get('type', {}).get('en-US', '')

        hero_image_link = fields.get('heroImage', {}).get('en-US', {})
        hero_image_url = resolve_asset(hero_image_link)

        logo_link = fields.get('companyLogo', {}).get('en-US', {})
        logo_url = resolve_asset(logo_link)

        # Asset 1
        asset1_title = fields.get('assetTitle', {}).get('en-US', '')
        asset1_cta = fields.get('assetType', {}).get('en-US', '')
        asset1_url = fields.get('assetLink', {}).get('en-US', '')

        # Asset 2
        asset2_title = fields.get('assetTitle2', {}).get('en-US', '')
        asset2_cta = fields.get('assetType2', {}).get('en-US', '')
        asset2_url = fields.get('assetLink2', {}).get('en-US', '')

        # Dates
        created_at = sys_info.get('createdAt', datetime.now().isoformat())
        updated_at = sys_info.get('updatedAt', datetime.now().isoformat())

        # Parse dates
        created_date = datetime.fromisoformat(created_at.replace('Z', '+00:00'))
        pub_date = created_date.strftime('%a, %d %b %Y %H:%M:%S +0000')

        # Create item (post)
        item = ET.SubElement(channel, 'item')
        ET.SubElement(item, 'title').text = title
        ET.SubElement(item, 'link').text = f'https://aeratechnology.com/customer/{create_slug(title)}'
        ET.SubElement(item, 'pubDate').text = pub_date
        ET.SubElement(item, 'dc:creator').text = 'admin'
        ET.SubElement(item, 'guid', {'isPermaLink': 'false'}).text = f'https://aeratechnology.com/?post_type=customer&p={1000 + idx}'
        ET.SubElement(item, 'description')
        ET.SubElement(item, 'content:encoded').text = ''
        ET.SubElement(item, 'excerpt:encoded').text = ''
        ET.SubElement(item, 'wp:post_id').text = str(1000 + idx)
        ET.SubElement(item, 'wp:post_date').text = created_date.strftime('%Y-%m-%d %H:%M:%S')
        ET.SubElement(item, 'wp:post_date_gmt').text = created_date.strftime('%Y-%m-%d %H:%M:%S')
        ET.SubElement(item, 'wp:post_modified').text = created_date.strftime('%Y-%m-%d %H:%M:%S')
        ET.SubElement(item, 'wp:post_modified_gmt').text = created_date.strftime('%Y-%m-%d %H:%M:%S')
        ET.SubElement(item, 'wp:comment_status').text = 'closed'
        ET.SubElement(item, 'wp:ping_status').text = 'closed'
        ET.SubElement(item, 'wp:post_name').text = create_slug(title)
        ET.SubElement(item, 'wp:status').text = 'publish'
        ET.SubElement(item, 'wp:post_parent').text = '0'
        ET.SubElement(item, 'wp:menu_order').text = '0'
        ET.SubElement(item, 'wp:post_type').text = 'customer'
        ET.SubElement(item, 'wp:post_password').text = ''
        ET.SubElement(item, 'wp:is_sticky').text = '0'

        # Add ACF custom fields as postmeta
        # Mapping:
        # customer_card_title -> title
        add_postmeta(item, 'customer_card_title', title)

        # customer_hero_image -> hero_image_url (placeholder path)
        if hero_image_url:
            add_postmeta(item, 'customer_hero_image', f'{{MEDIA_PATH}}/{hero_image_url.split("/")[-1]}')
            add_postmeta(item, '_customer_hero_image_url', hero_image_url)

        # customer_company_name -> company_name
        if company_name:
            add_postmeta(item, 'customer_company_name', company_name)

        # customer_logo -> logo_url (placeholder path)
        if logo_url:
            add_postmeta(item, 'customer_logo', f'{{MEDIA_PATH}}/{logo_url.split("/")[-1]}')
            add_postmeta(item, '_customer_logo_url', logo_url)

        # customer_type -> customer_type
        if customer_type:
            add_postmeta(item, 'customer_type', customer_type)

        # Asset 1
        if asset1_title:
            add_postmeta(item, 'customer_asset_1_title', asset1_title)
        if asset1_cta:
            add_postmeta(item, 'customer_asset_1_cta', asset1_cta)
        if asset1_url:
            add_postmeta(item, 'customer_asset_1_url', asset1_url)

        # Asset 2
        if asset2_title:
            add_postmeta(item, 'customer_asset_2_title', asset2_title)
        if asset2_cta:
            add_postmeta(item, 'customer_asset_2_cta', asset2_cta)
        if asset2_url:
            add_postmeta(item, 'customer_asset_2_url', asset2_url)

        print(f"\n✅ Created WordPress post for: {title}")
        print(f"   Company: {company_name or 'N/A'}")
        print(f"   Type: {customer_type or 'N/A'}")
        print(f"   Hero Image: {hero_image_url or 'N/A'}")
        print(f"   Logo: {logo_url or 'N/A'}")
        print(f"   Assets: {1 if asset1_title else 0} + {1 if asset2_title else 0}")

    return rss

def add_postmeta(item, key, value):
    """Add a postmeta field to a WordPress item"""
    if value:
        postmeta = ET.SubElement(item, 'wp:postmeta')
        ET.SubElement(postmeta, 'wp:meta_key').text = key
        ET.SubElement(postmeta, 'wp:meta_value').text = str(value)

# Generate the WXR XML
print("\n🔨 Generating WordPress WXR XML...")
rss = create_wxr_xml(selected_customers)

# Pretty print XML
xml_str = ET.tostring(rss, encoding='unicode')
dom = minidom.parseString(xml_str)
pretty_xml = dom.toprettyxml(indent='  ')

# Remove extra blank lines
pretty_xml = '\n'.join([line for line in pretty_xml.split('\n') if line.strip()])

# Save to file
output_file = '_ORIGINAL_FILES/wordpress-customers-import.xml'
with open(output_file, 'w', encoding='utf-8') as f:
    f.write(pretty_xml)

print(f"\n💾 Saved WordPress import file to: {output_file}")
print(f"\n✨ Done! You can now import this file into WordPress using Tools > Import > WordPress")
print(f"\n📝 Note: Image URLs are marked with {{MEDIA_PATH}} placeholder. You'll need to:")
print(f"   1. Download the images from Contentful (URLs stored in _customer_hero_image_url and _customer_logo_url meta fields)")
print(f"   2. Upload them to WordPress Media Library")
print(f"   3. Update the ACF image fields with the WordPress attachment IDs")

