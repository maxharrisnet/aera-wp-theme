# Contentful Export File Information

## Latest Export File

**File**: `contentful-export-mh1amgo8m7ts-master-2026-01-16T12-53-01.json`
**Location**: `export_blogs_sample/`
**Date**: January 16, 2026
**Size**: ~6.6 MB

## What's Included

This export file contains:
- ✅ **108 Community Template Pages** (blog posts)
- ✅ **108 Community Cards** (archive card data - all published)
- ✅ **121 News Items** (all published)
- ✅ **1,339 Assets** (images, etc.)
- ✅ All other content types from Contentful

## Usage

Both import scripts (`contentful-blogs-to-wxr.js` and `contentful-news-to-wxr.js`) now **auto-detect the latest export file** in the `export_blogs_sample/` directory.

The scripts will:
1. Find all `.json` files matching `contentful-export*`
2. Sort by modification date (newest first)
3. Use the most recent file automatically
4. Display which file is being used when you run the script

## Creating a New Export

When you create a new export from Contentful:

1. **Using Contentful CLI**:
   ```bash
   contentful space export \
     --space-id mh1amgo8m7ts \
     --export-dir ./export_blogs_full
   ```

2. **Copy to export_blogs_sample/**:
   ```bash
   cp export_blogs_full/contentful-export-*.json export_blogs_sample/
   ```

3. **Run import scripts** - they'll automatically use the new file!

## File Naming Convention

Export files follow this pattern:
```
contentful-export-mh1amgo8m7ts-master-YYYY-MM-DDTHH-MM-SS.json
```

The scripts will always use the file with the latest modification date.
