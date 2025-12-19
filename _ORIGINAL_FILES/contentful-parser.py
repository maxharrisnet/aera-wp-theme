#!/usr/bin/env python3
"""
Parse Contentful export JSON and extract customer entries
"""
import json
import sys
from datetime import datetime

# Read the Contentful export file
print("📖 Reading Contentful export file...")
with open('_ORIGINAL_FILES/contentful-export-mh1amgo8m7ts-master-2025-11-24T23-06-28.json', 'r') as f:
    data = json.load(f)

print(f"✅ File loaded successfully")

# Find all content types
print("\n🔍 Available content types:")
for ct in data.get('contentTypes', []):
    ct_id = ct.get('sys', {}).get('id', '')
    ct_name = ct.get('name', '')
    print(f"  - {ct_id}: {ct_name}")

# Search for customer-related content types
customer_content_types = []
for ct in data.get('contentTypes', []):
    ct_id = ct.get('sys', {}).get('id', '').lower()
    ct_name = ct.get('name', '').lower()
    if 'customer' in ct_id or 'customer' in ct_name or 'client' in ct_id or 'client' in ct_name:
        customer_content_types.append({
            'id': ct.get('sys', {}).get('id', ''),
            'name': ct.get('name', '')
        })
        print(f"\n🎯 Found customer-related content type: {ct.get('sys', {}).get('id', '')} ({ct.get('name', '')})")
        print(f"   Fields:")
        for field in ct.get('fields', []):
            print(f"     - {field.get('id', '')}: {field.get('name', '')} ({field.get('type', '')})")

# If no customer content type found, list all entries to help find it
if not customer_content_types:
    print("\n⚠️  No customer content type found. Listing all entry types...")
    entry_types = {}
    for entry in data.get('entries', []):
        ct_id = entry.get('sys', {}).get('contentType', {}).get('sys', {}).get('id', '')
        if ct_id:
            entry_types[ct_id] = entry_types.get(ct_id, 0) + 1
    
    for ct_id, count in sorted(entry_types.items(), key=lambda x: x[1], reverse=True):
        print(f"  - {ct_id}: {count} entries")
else:
    # Extract customer entries
    print(f"\n📦 Extracting customer entries...")
    customer_entries = []
    for entry in data.get('entries', []):
        ct_id = entry.get('sys', {}).get('contentType', {}).get('sys', {}).get('id', '')
        if ct_id in [ct['id'] for ct in customer_content_types]:
            customer_entries.append(entry)
    
    print(f"✅ Found {len(customer_entries)} customer entries")
    
    # Sort by updatedAt date (most recent first)
    customer_entries.sort(key=lambda x: x.get('sys', {}).get('updatedAt', ''), reverse=True)
    
    # Show the most recent entries
    print(f"\n📋 Most recent customer entries:")
    for i, entry in enumerate(customer_entries[:10]):
        title = entry.get('fields', {}).get('title', {}).get('en-US', 'No title')
        company = entry.get('fields', {}).get('companyName', {}).get('en-US', '')
        updated = entry.get('sys', {}).get('updatedAt', '')
        print(f"  {i+1}. {title} {f'({company})' if company else ''} - Updated: {updated}")
    
    # Save the customer entries to a separate file for inspection
    output_path = '_ORIGINAL_FILES/customer-entries.json'
    with open(output_path, 'w') as f:
        json.dump(customer_entries[:10], f, indent=2)
    
    print(f"\n💾 Saved top 10 customer entries to {output_path}")

