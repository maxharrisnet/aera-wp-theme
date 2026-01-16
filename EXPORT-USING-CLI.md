# Export Blog Content Using Contentful CLI

The easiest way to export is using the Contentful CLI, which uses browser-based OAuth authentication (no token needed!).

## Step 1: Install Contentful CLI

```bash
npm install -g contentful-cli
```

## Step 2: Login

```bash
contentful login
```

This will open your browser to authenticate. After logging in, you'll be authenticated.

## Step 3: Export Everything

```bash
cd /Users/max/Local\ Sites/aera-technology/app/public/wp-content/themes/aera-technology

contentful space export \
  --space-id mh1amgo8m7ts \
  --export-dir ./export_blogs_full
```

This will create a folder like:
```
./export_blogs_full/contentful-export-mh1amgo8m7ts-2025-01-16T12-00-00.json
```

## Step 4: Copy to the Right Location

```bash
# Copy the export file to export_blogs_sample
cp ./export_blogs_full/contentful-export-mh1amgo8m7ts-*.json ./export_blogs_sample/
```

## Step 5: Verify It Has Both Content Types

```bash
node -e "
const fs = require('fs');
const files = fs.readdirSync('export_blogs_sample').filter(f => f.includes('contentful-export') && f.includes('mh1amgo8m7ts'));
const latest = files.sort().pop();
const data = JSON.parse(fs.readFileSync('export_blogs_sample/' + latest, 'utf8'));
console.log('Template Pages:', data.entries.filter(e => e.sys?.contentType?.sys?.id === 'communityTemplatePage').length);
console.log('Cards:', data.entries.filter(e => e.sys?.contentType?.sys?.id === 'communityCard').length);
console.log('Published Cards:', data.entries.filter(e => e.sys?.contentType?.sys?.id === 'communityCard' && e.sys?.publishedAt).length);
"
```

## Alternative: Export Only Published Entries

If you want to filter to only published entries:

```bash
contentful space export \
  --space-id mh1amgo8m7ts \
  --export-dir ./export_blogs_full \
  --content-only
```

## What This Gives You

The export will include:
- ✅ All `communityTemplatePage` entries
- ✅ All `communityCard` entries (if they exist)
- ✅ All referenced assets (images, etc.)
- ✅ Content type definitions

Once you have this file, I can update the blog import script to properly map the Community Card images!
