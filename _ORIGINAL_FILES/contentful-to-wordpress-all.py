#!/usr/bin/env python3
"""
Convert ALL remaining Contentful customer data to WordPress WXR format
"""
import json
import xml.etree.ElementTree as ET
from xml.dom import minidom
from datetime import datetime
import re

# Read the Contentful export file
print("📖 Reading Contentful export file...")
with open('contentful-export-mh1amgo8m7ts-master-2025-11-24T23-06-28.json', 'r') as f:
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

    # Only process published entries
    if not entry.get('sys', {}).get('publishedAt'):
        continue

    if ct_id == 'customerPageCards':
        customer_entries.append(entry)

# Sort by updated date (most recent first)
customer_entries.sort(key=lambda x: x.get('sys', {}).get('updatedAt', ''), reverse=True)

print(f"✅ Found {len(customer_entries)} customer card entries")

# Companies already converted
ALREADY_CONVERTED = [
    'bp', 'castrol', 'bp-castrol',
    'pmi', 'philip morris',
    'astrazeneca'
]

# Filter function
def is_already_converted(company_name):
    """Check if company was already converted"""
    name_lower = company_name.lower()
    for converted in ALREADY_CONVERTED:
        if converted in name_lower:
            return True
    return False

def is_unilever(entry, assets_lookup):
    """Check if entry is Unilever"""
    title = entry.get('fields', {}).get('title', {}).get('en-US', '').lower()
    company_text = entry.get('fields', {}).get('companyText', {}).get('en-US', '').lower()

    hero_image_link = entry.get('fields', {}).get('heroImage', {}).get('en-US', {})
    hero_asset_id = hero_image_link.get('sys', {}).get('id', '') if hero_image_link else ''
    hero_info = assets_lookup.get(hero_asset_id, {})
    hero_filename = hero_info.get('filename', '').lower()

    logo_link = entry.get('fields', {}).get('companyLogo', {}).get('en-US', {})
    logo_asset_id = logo_link.get('sys', {}).get('id', '') if logo_link else ''
    logo_info = assets_lookup.get(logo_asset_id, {})
    logo_filename = logo_info.get('filename', '').lower()

    return (
        'unilever' in title or
        'unilever' in company_text or
        'unilever' in hero_filename or
        'unilever' in logo_filename
    )

def clean_company_name(name):
    """Clean up extracted company name"""
    # Remove file suffixes like (1), _1, etc.
    name = re.sub(r'\s*\(\d+\)\s*', '', name)
    name = re.sub(r'\s+\d+\s*$', '', name)  # Remove trailing numbers like "Group 0"
    name = re.sub(r'^\d+\s+', '', name)  # Remove leading numbers

    # Remove common file artifacts
    name = re.sub(r'new\s*$', '', name, flags=re.IGNORECASE)
    name = re.sub(r'Logo|_logo|-logo|logo', '', name, flags=re.IGNORECASE)
    name = re.sub(r'blank', '', name, flags=re.IGNORECASE)
    name = re.sub(r'thumb|thumbnail', '', name, flags=re.IGNORECASE)
    name = re.sub(r'color|colour', '', name, flags=re.IGNORECASE)
    name = re.sub(r'\s+ey\s*$', '', name, flags=re.IGNORECASE)  # Remove "EY" suffix

    # Clean up spacing and punctuation
    name = re.sub(r'[_-]', ' ', name)
    name = re.sub(r'\s+', ' ', name)
    name = name.strip()

    # Capitalize properly
    if name and not any(c.islower() for c in name):
        # All caps - convert to title case
        name = name.title()

    return name

def normalize_known_brands(name):
    """Normalize known brand names to proper capitalization"""
    name_lower = name.lower()

    # Known brand mappings
    brand_mappings = {
        'jdirving': 'J.D. Irving',
        'j d irving': 'J.D. Irving',
        'kraftheinz': 'Kraft Heinz',
        'kraft heinz': 'Kraft Heinz',
        'infrabuild': 'InfraBuild',
        'becle': 'Becle',
        'mitsubishi chemical group': 'Mitsubishi Chemical Group',
        'the mitsubishi chemical group': 'Mitsubishi Chemical Group',
        'lucid': 'Lucid',
        'gsk': 'GSK',
        'alcon': 'Alcon',
        'dell': 'Dell',
        'mars': 'Mars',
        'baxter': 'Baxter',
        'deacero': 'Deacero',
        'merck animal health': 'Merck Animal Health',
        'western governors university': 'Western Governors University',
    }

    for key, proper_name in brand_mappings.items():
        if name_lower == key or name_lower.startswith(key + ' '):
            return proper_name

    return name

def extract_company_name(entry, assets_lookup):
    """Extract/infer company name from various fields"""
    fields = entry.get('fields', {})

    # Try companyText first
    company_text = fields.get('companyText', {}).get('en-US', '').strip()
    if company_text:
        return normalize_known_brands(clean_company_name(company_text))

    # Try logo filename
    logo_link = fields.get('companyLogo', {}).get('en-US', {})
    if logo_link:
        logo_asset_id = logo_link.get('sys', {}).get('id', '')
        logo_info = assets_lookup.get(logo_asset_id, {})
        logo_filename = logo_info.get('filename', '')
        logo_title = logo_info.get('title', '')

        # Try logo title first
        if logo_title and len(logo_title) > 2:
            cleaned = clean_company_name(logo_title)
            if cleaned and len(cleaned) > 2:
                return normalize_known_brands(cleaned)

        # Try logo filename
        if logo_filename:
            # Remove extension and clean up
            name = re.sub(r'\.(png|jpg|jpeg|svg|webp)$', '', logo_filename, flags=re.IGNORECASE)
            cleaned = clean_company_name(name)
            if cleaned and len(cleaned) > 2:
                return normalize_known_brands(cleaned)

    # Try hero image title/filename
    hero_link = fields.get('heroImage', {}).get('en-US', {})
    if hero_link:
        hero_asset_id = hero_link.get('sys', {}).get('id', '')
        hero_info = assets_lookup.get(hero_asset_id, {})
        hero_title = hero_info.get('title', '')

        if hero_title and len(hero_title) > 2:
            cleaned = clean_company_name(hero_title)
            if cleaned and len(cleaned) > 2 and cleaned.lower() not in ['thumb', 'thumbnail', 'image', 'hero']:
                return normalize_known_brands(cleaned)

    # Try title - extract company name from title
    title = fields.get('title', {}).get('en-US', '')

    # Specific patterns for extracting company names from titles
    title_patterns = [
        # "Company Name's Something" or "Company Name: Something"
        r"^([A-Z][A-Za-z0-9\.\s&'-]+?)(?:'s|:|\s+-\s+|\s+partners|\s+uses)",
        # "At Company Name" or "with Company Name"
        r"(?:at|with)\s+([A-Z][A-Za-z0-9\.\s&'-]+?)(?:\s+and\s+|\s*$)",
        # "Decision Intelligence at Company Name"
        r"Decision Intelligence at\s+([A-Z][A-Za-z0-9\.\s&'-]+?)(?:\s*$)",
        # "From Vision to Execution: Company Name"
        r":\s+([A-Z][A-Za-z0-9\.\s&'-]+?)(?:'s|$)",
        # "Company Name is/transforms/leverages"
        r"^([A-Z][A-Za-z0-9\.\s&'-]+?)(?:\s+is\s+|\s+transforms?|\s+leverages?)",
        # "Conversation with Company Name"
        r"(?:with|from)\s+([A-Z][A-Za-z0-9\.\s&'-]+?)\s+and",
    ]

    for pattern in title_patterns:
        match = re.search(pattern, title)
        if match:
            company = match.group(1).strip()
            # Clean up common words that got captured
            company = re.sub(r'\s+and\s+$', '', company, flags=re.IGNORECASE)
            company = re.sub(r'^The\s+', '', company)
            cleaned = clean_company_name(company)
            if cleaned and len(cleaned) > 2:
                return normalize_known_brands(cleaned)

    # Try first few words if they're capitalized
    words = title.split()
    if words and words[0] and words[0][0].isupper():
        # Take first 1-3 capitalized words
        company_words = []
        for word in words[:4]:
            if word and (word[0].isupper() or word in ['&', 'and', '.']):
                company_words.append(word)
            else:
                break
        if company_words:
            return normalize_known_brands(clean_company_name(' '.join(company_words)))

    # Check customer_type field - some entries use this as company indicator
    customer_type = fields.get('type', {}).get('en-US', '')

    # If customer_type looks like a company name (not generic like "CPG")
    generic_types = ['cpg', 'pharmaceutical', 'manufacturing', 'technology', 'life sciences',
                     'chemicals', 'automotive', 'petrochemical', 'fmcg', 'animal health',
                     'health & hygiene', 'higher education', 'science & technology']

    if customer_type and customer_type.lower() not in generic_types:
        cleaned = clean_company_name(customer_type)
        if cleaned and len(cleaned) > 2:
            return normalize_known_brands(cleaned)

    # Fallback to cleaned title
    result = clean_company_name(title) if title else 'Unknown Company'

    # Normalize known brands
    return normalize_known_brands(result)

# Filter customers
selected_customers = []
for entry in customer_entries:
    # Skip Unilever
    if is_unilever(entry, assets_lookup):
        continue

    # Extract company name
    company_name = extract_company_name(entry, assets_lookup)

    # Skip already converted
    if is_already_converted(company_name):
        continue

    selected_customers.append(entry)

print(f"\n✨ Selected {len(selected_customers)} customers for conversion (excluding Unilever and already converted):")
for i, customer in enumerate(selected_customers[:10]):
    company_name = extract_company_name(customer, assets_lookup)
    print(f"  {i+1}. {company_name}")

if len(selected_customers) > 10:
    print(f"  ... and {len(selected_customers) - 10} more")

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

# Function to create WordPress post slug from title
def create_slug(title):
    slug = title.lower()
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'\s+', '-', slug)
    slug = re.sub(r'-+', '-', slug)
    return slug.strip('-')

# Create WordPress WXR XML
def create_wxr_xml(customers):
    rss = ET.Element('rss', {
        'version': '2.0',
        'xmlns:excerpt': 'http://wordpress.org/export/1.2/excerpt/',
        'xmlns:content': 'http://purl.org/rss/1.0/modules/content/',
        'xmlns:wfw': 'http://wellformedweb.org/CommentAPI/',
        'xmlns:dc': 'http://purl.org/dc/elements/1.1/',
        'xmlns:wp': 'http://wordpress.org/export/1.2/'
    })

    channel = ET.SubElement(rss, 'channel')

    ET.SubElement(channel, 'title').text = 'Aera Technology Customers - All Remaining'
    ET.SubElement(channel, 'link').text = 'https://aeratechnology.com'
    ET.SubElement(channel, 'description').text = 'All remaining customer data import from Contentful'
    ET.SubElement(channel, 'pubDate').text = datetime.now().strftime('%a, %d %b %Y %H:%M:%S +0000')
    ET.SubElement(channel, 'language').text = 'en-US'
    ET.SubElement(channel, 'wp:wxr_version').text = '1.2'

    # Track image URLs for download script
    images_to_download = []

    # Add each customer as a post (starting at 2001 to avoid conflicts with first batch)
    for idx, customer in enumerate(customers, start=1):
        fields = customer.get('fields', {})
        sys_info = customer.get('sys', {})

        # Extract company name
        company_name = extract_company_name(customer, assets_lookup)

        # Use company name as title
        title = company_name
        original_title = fields.get('title', {}).get('en-US', '')
        customer_type = fields.get('type', {}).get('en-US', '')

        hero_image_link = fields.get('heroImage', {}).get('en-US', {})
        hero_image_url = resolve_asset(hero_image_link)

        logo_link = fields.get('companyLogo', {}).get('en-US', {})
        logo_url = resolve_asset(logo_link)

        # Track images
        if hero_image_url:
            images_to_download.append({
                'url': hero_image_url,
                'company': company_name,
                'type': 'hero'
            })
        if logo_url:
            images_to_download.append({
                'url': logo_url,
                'company': company_name,
                'type': 'logo'
            })

        # Assets
        asset1_title = fields.get('assetTitle', {}).get('en-US', '')
        asset1_cta = fields.get('assetType', {}).get('en-US', '')
        asset1_url = fields.get('assetLink', {}).get('en-US', '')

        asset2_title = fields.get('assetTitle2', {}).get('en-US', '')
        asset2_cta = fields.get('assetType2', {}).get('en-US', '')
        asset2_url = fields.get('assetLink2', {}).get('en-US', '')

        asset3_title = fields.get('assetTitle3', {}).get('en-US', '')
        asset3_cta = fields.get('assetType3', {}).get('en-US', '')
        asset3_url = fields.get('assetLink3', {}).get('en-US', '')

        asset4_title = fields.get('assetTitle4', {}).get('en-US', '')
        asset4_cta = fields.get('assetType4', {}).get('en-US', '')
        asset4_url = fields.get('assetLink4', {}).get('en-US', '')

        # Dates
        created_at = sys_info.get('createdAt', datetime.now().isoformat())
        created_date = datetime.fromisoformat(created_at.replace('Z', '+00:00'))
        pub_date = created_date.strftime('%a, %d %b %Y %H:%M:%S +0000')

        # Create item (post)
        item = ET.SubElement(channel, 'item')
        ET.SubElement(item, 'title').text = title
        ET.SubElement(item, 'link').text = f'https://aeratechnology.com/customer/{create_slug(title)}'
        ET.SubElement(item, 'pubDate').text = pub_date
        ET.SubElement(item, 'dc:creator').text = 'admin'
        ET.SubElement(item, 'guid', {'isPermaLink': 'false'}).text = f'https://aeratechnology.com/?post_type=customer&p={2000 + idx}'
        ET.SubElement(item, 'description')
        ET.SubElement(item, 'content:encoded').text = ''
        ET.SubElement(item, 'excerpt:encoded').text = ''
        ET.SubElement(item, 'wp:post_id').text = str(2000 + idx)
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

        # Add ACF custom fields
        add_postmeta(item, 'customer_card_title', title)
        add_postmeta(item, 'customer_company_name', company_name)
        add_postmeta(item, '_original_contentful_title', original_title)

        if hero_image_url:
            add_postmeta(item, 'customer_hero_image', f'{{MEDIA_PATH}}/{hero_image_url.split("/")[-1]}')
            add_postmeta(item, '_customer_hero_image_url', hero_image_url)

        if logo_url:
            add_postmeta(item, 'customer_logo', f'{{MEDIA_PATH}}/{logo_url.split("/")[-1]}')
            add_postmeta(item, '_customer_logo_url', logo_url)

        if customer_type:
            add_postmeta(item, 'customer_type', customer_type)

        # Assets
        if asset1_title:
            add_postmeta(item, 'customer_asset_1_title', asset1_title)
        if asset1_cta:
            add_postmeta(item, 'customer_asset_1_cta', asset1_cta)
        if asset1_url:
            add_postmeta(item, 'customer_asset_1_url', asset1_url)

        if asset2_title:
            add_postmeta(item, 'customer_asset_2_title', asset2_title)
        if asset2_cta:
            add_postmeta(item, 'customer_asset_2_cta', asset2_cta)
        if asset2_url:
            add_postmeta(item, 'customer_asset_2_url', asset2_url)

        # Note: ACF only has 2 asset fields, but we'll store 3&4 as meta for reference
        if asset3_title:
            add_postmeta(item, '_customer_asset_3_title', asset3_title)
            add_postmeta(item, '_customer_asset_3_cta', asset3_cta)
            add_postmeta(item, '_customer_asset_3_url', asset3_url)

        if asset4_title:
            add_postmeta(item, '_customer_asset_4_title', asset4_title)
            add_postmeta(item, '_customer_asset_4_cta', asset4_cta)
            add_postmeta(item, '_customer_asset_4_url', asset4_url)

        asset_count = sum([1 for t in [asset1_title, asset2_title, asset3_title, asset4_title] if t])

        print(f"  ✓ {company_name} ({customer_type or 'N/A'}) - {asset_count} assets")

    return rss, images_to_download

def add_postmeta(item, key, value):
    """Add a postmeta field to a WordPress item"""
    if value:
        postmeta = ET.SubElement(item, 'wp:postmeta')
        ET.SubElement(postmeta, 'wp:meta_key').text = key
        ET.SubElement(postmeta, 'wp:meta_value').text = str(value)

# Generate the WXR XML
print(f"\n🔨 Generating WordPress WXR XML for {len(selected_customers)} customers...")
rss, images_to_download = create_wxr_xml(selected_customers)

# Pretty print XML
xml_str = ET.tostring(rss, encoding='unicode')
dom = minidom.parseString(xml_str)
pretty_xml = dom.toprettyxml(indent='  ')
pretty_xml = '\n'.join([line for line in pretty_xml.split('\n') if line.strip()])

# Save to file
output_file = 'wordpress-customers-import-all.xml'
with open(output_file, 'w', encoding='utf-8') as f:
    f.write(pretty_xml)

print(f"\n💾 Saved WordPress import file: {output_file}")

# Generate download script
print(f"\n🔧 Generating image download script...")
with open('download-all-customer-images.sh', 'w') as f:
    f.write('#!/bin/bash\n')
    f.write('# Download all customer images from Contentful\n\n')
    f.write('echo "📥 Downloading all customer images from Contentful..."\n\n')
    f.write('mkdir -p customer-images-all\n\n')

    for idx, img in enumerate(images_to_download, start=1):
        company_slug = create_slug(img['company'])
        filename = img['url'].split('/')[-1]
        output_name = f"{company_slug}-{img['type']}.{filename.split('.')[-1]}"
        f.write(f'echo "{idx}. Downloading {img["company"]} {img["type"]}..."\n')
        f.write(f'curl -L "{img["url"]}" -o "customer-images-all/{output_name}"\n\n')

    f.write('echo "✅ All images downloaded to customer-images-all/"\n')

print(f"💾 Saved download script: download-all-customer-images.sh")

# Generate summary JSON
print(f"\n📊 Generating summary JSON...")
summary = {
    'export_date': datetime.now().strftime('%Y-%m-%d'),
    'total_customers': len(selected_customers),
    'customers': []
}

for idx, customer in enumerate(selected_customers, start=1):
    fields = customer.get('fields', {})
    company_name = extract_company_name(customer, assets_lookup)

    customer_data = {
        'id': idx,
        'wordpress_post_id': 2000 + idx,
        'company_name': company_name,
        'slug': create_slug(company_name),
        'original_title': fields.get('title', {}).get('en-US', ''),
        'type': fields.get('type', {}).get('en-US', ''),
        'has_hero_image': bool(fields.get('heroImage', {}).get('en-US')),
        'has_logo': bool(fields.get('companyLogo', {}).get('en-US')),
        'asset_count': sum([
            1 for t in [
                fields.get('assetTitle', {}).get('en-US', ''),
                fields.get('assetTitle2', {}).get('en-US', ''),
                fields.get('assetTitle3', {}).get('en-US', ''),
                fields.get('assetTitle4', {}).get('en-US', '')
            ] if t
        ])
    }
    summary['customers'].append(customer_data)

with open('customer-import-all-summary.json', 'w') as f:
    json.dump(summary, f, indent=2)

print(f"💾 Saved summary: customer-import-all-summary.json")

print(f"\n✨ Done!")
print(f"\n📝 Summary:")
print(f"   - {len(selected_customers)} customers converted")
print(f"   - {len(images_to_download)} images to download")
print(f"   - Import file: {output_file}")
print(f"   - Download script: download-all-customer-images.sh")
print(f"\n🚀 Next steps:")
print(f"   1. bash download-all-customer-images.sh")
print(f"   2. Import {output_file} to WordPress")
print(f"   3. Upload images and link them to customer posts")

