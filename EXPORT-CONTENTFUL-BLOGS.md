# Exporting Blog Content from Contentful

This guide shows how to export **Community Template Page** and **Community Card** entries from Contentful.

## Method 1: Using Contentful CLI (Recommended)

### Prerequisites
1. Install Contentful CLI if you haven't already:
   ```bash
   npm install -g contentful-cli
   ```

2. Login to Contentful:
   ```bash
   contentful login
   ```

### Export Steps

1. **Export all content types** (this will include both Community Template Page and Community Card):
   ```bash
   contentful space export \
     --space-id mh1amgo8m7ts \
     --export-dir ./contentful-export-blogs \
     --content-only
   ```

   Or if you want to include assets:
   ```bash
   contentful space export \
     --space-id mh1amgo8m7ts \
     --export-dir ./contentful-export-blogs
   ```

2. **Filter for specific content types** (if you only want blogs):
   ```bash
   contentful space export \
     --space-id mh1amgo8m7ts \
     --export-dir ./contentful-export-blogs \
     --content-only \
     --content-model-only
   ```

   Then manually filter the JSON, or use this approach:

3. **Export with query filter** (more targeted):
   ```bash
   # First, get the export
   contentful space export \
     --space-id mh1amgo8m7ts \
     --export-dir ./contentful-export-blogs
   ```

### Filter the Export

After exporting, you can filter the JSON to only include the content types you need:

```bash
# Using Node.js to filter
node -e "
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./contentful-export-blogs/contentful-export-mh1amgo8m7ts-*.json', 'utf8'));

// Filter entries to only Community Template Page and Community Card
const filteredEntries = data.entries.filter(e =>
  e.sys?.contentType?.sys?.id === 'communityTemplatePage' ||
  e.sys?.contentType?.sys?.id === 'communityCard'
);

// Filter content types
const filteredContentTypes = data.contentTypes.filter(ct =>
  ct.sys?.id === 'communityTemplatePage' ||
  ct.sys?.id === 'communityCard'
);

// Get all asset IDs referenced by these entries
const assetIds = new Set();
filteredEntries.forEach(entry => {
  Object.values(entry.fields || {}).forEach(field => {
    const value = Object.values(field || {})[0];
    if (value?.sys?.type === 'Link' && value?.sys?.linkType === 'Asset') {
      assetIds.add(value.sys.id);
    }
  });
});

// Filter assets
const filteredAssets = data.assets.filter(a => assetIds.has(a.sys?.id));

// Create filtered export
const filtered = {
  ...data,
  entries: filteredEntries,
  contentTypes: filteredContentTypes,
  assets: filteredAssets
};

fs.writeFileSync('./contentful-export-blogs-filtered.json', JSON.stringify(filtered, null, 2));
console.log('Filtered export created!');
console.log('Entries:', filteredEntries.length);
console.log('Assets:', filteredAssets.length);
"
```

## Method 2: Using Contentful Web Interface

1. **Go to Contentful Web App**: https://app.contentful.com
2. **Navigate to your space**: Select the space `mh1amgo8m7ts`
3. **Go to Settings** → **Export**
4. **Click "Export"** to download a full export
5. **Or use the Management API** to filter:

### Using Management API with curl

```bash
# Get your Management API token from Contentful Settings → API keys
# Then export specific content types:

curl -X GET \
  "https://api.contentful.com/spaces/mh1amgo8m7ts/environments/master/entries?content_type=communityTemplatePage&limit=1000" \
  -H "Authorization: Bearer YOUR_MANAGEMENT_API_TOKEN" \
  > community-template-pages.json

curl -X GET \
  "https://api.contentful.com/spaces/mh1amgo8m7ts/environments/master/entries?content_type=communityCard&limit=1000" \
  -H "Authorization: Bearer YOUR_MANAGEMENT_API_TOKEN" \
  > community-cards.json
```

## Method 3: Quick Export Script

I can create a Node.js script that uses the Contentful Management API to export only the content types you need. Here's what it would do:

```javascript
// export-blogs-from-contentful.js
const contentful = require('contentful-management');
const fs = require('fs');

const SPACE_ID = 'mh1amgo8m7ts';
const MANAGEMENT_TOKEN = 'YOUR_MANAGEMENT_API_TOKEN'; // Get from Contentful Settings → API keys

async function exportBlogs() {
  const client = contentful.createClient({
    accessToken: MANAGEMENT_TOKEN,
  });

  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment('master');

  // Get all Community Template Pages
  const templatePages = await environment.getEntries({
    content_type: 'communityTemplatePage',
    limit: 1000,
  });

  // Get all Community Cards
  const cards = await environment.getEntries({
    content_type: 'communityCard',
    limit: 1000,
  });

  // Get referenced assets
  const assetIds = new Set();
  [...templatePages.items, ...cards.items].forEach(item => {
    Object.values(item.fields || {}).forEach(field => {
      const value = Object.values(field || {})[0];
      if (value?.sys?.type === 'Link' && value?.sys?.linkType === 'Asset') {
        assetIds.add(value.sys.id);
      }
    });
  });

  const assets = [];
  for (const assetId of assetIds) {
    try {
      const asset = await environment.getAsset(assetId);
      assets.push(asset);
    } catch (e) {
      console.error(`Failed to get asset ${assetId}:`, e.message);
    }
  }

  // Create export structure
  const exportData = {
    entries: [
      ...templatePages.items.map(item => ({
        sys: item.sys,
        fields: item.fields,
      })),
      ...cards.items.map(item => ({
        sys: item.sys,
        fields: item.fields,
      })),
    ],
    assets: assets.map(asset => ({
      sys: asset.sys,
      fields: asset.fields,
    })),
    contentTypes: [
      await environment.getContentType('communityTemplatePage'),
      await environment.getContentType('communityCard'),
    ],
  };

  fs.writeFileSync(
    './contentful-blogs-export.json',
    JSON.stringify(exportData, null, 2)
  );

  console.log('Export complete!');
  console.log(`Template Pages: ${templatePages.items.length}`);
  console.log(`Cards: ${cards.items.length}`);
  console.log(`Assets: ${assets.length}`);
}

exportBlogs().catch(console.error);
```

## Recommended Approach

**Easiest method**: Use Contentful CLI to export everything, then I can help you filter it:

```bash
# Export everything
contentful space export \
  --space-id mh1amgo8m7ts \
  --export-dir ./export_blogs_full

# The export will be in a timestamped folder like:
# ./export_blogs_full/contentful-export-mh1amgo8m7ts-2025-01-16T12-00-00.json
```

Then place that file in `export_blogs_sample/` and I can update the script to use it.

## What to Check

After exporting, verify you have:
- ✅ `communityTemplatePage` entries (the blog posts)
- ✅ `communityCard` entries (the archive card data)
- ✅ Both content types in the `contentTypes` array
- ✅ All referenced assets in the `assets` array

You can check with:
```bash
node -e "
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./export_blogs_full/contentful-export-*.json', 'utf8'));
console.log('Template Pages:', data.entries.filter(e => e.sys?.contentType?.sys?.id === 'communityTemplatePage').length);
console.log('Cards:', data.entries.filter(e => e.sys?.contentType?.sys?.id === 'communityCard').length);
console.log('Published Cards:', data.entries.filter(e => e.sys?.contentType?.sys?.id === 'communityCard' && e.sys?.publishedAt).length);
"
```
