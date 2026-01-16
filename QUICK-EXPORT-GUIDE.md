# Quick Guide: Export Blog Content from Contentful

## The Error You're Seeing

`ContentfulMultiError: Errors occurred` means the Contentful API returned multiple errors. Common causes:
1. **Invalid or expired Management API token**
2. **Missing permissions** on the token
3. **Content type doesn't exist** (e.g., `communityCard` might not exist in your space)
4. **Rate limiting** (too many API calls)

## Easiest Solution: Use Contentful CLI

If you have `contentful-cli` installed, this is the simplest method:

```bash
# Export everything (will include both content types)
contentful space export \
  --space-id mh1amgo8m7ts \
  --export-dir ./export_blogs_full

# The file will be in:
# ./export_blogs_full/contentful-export-mh1amgo8m7ts-[timestamp].json
```

Then copy that file to `export_blogs_sample/` and I can update the script.

## Alternative: Install Dependencies and Use Script

If you want to use the Management API script:

1. **Install dependencies:**
   ```bash
   cd /Users/max/Local\ Sites/aera-technology/app/public/wp-content/themes/aera-technology
   npm install contentful-management
   ```

2. **Get your Management API token:**
   - Go to: https://app.contentful.com/spaces/mh1amgo8m7ts/api/keys
   - Click "Content management tokens" tab
   - Create a new token or use existing one
   - Copy the token

3. **Set the token and run:**
   ```bash
   export CONTENTFUL_MANAGEMENT_TOKEN="your-token-here"
   node scripts/export-contentful-blogs.js
   ```

## Troubleshooting ContentfulMultiError

If you get the error, check:

1. **Token permissions**: The token needs "Content management" access
2. **Content type exists**: Run this to check:
   ```bash
   node -e "
   const contentful = require('contentful-management');
   const client = contentful.createClient({
     accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN
   });
   client.getSpace('mh1amgo8m7ts')
     .then(space => space.getEnvironment('master'))
     .then(env => env.getContentTypes())
     .then(cts => {
       console.log('Available content types:');
       cts.items.forEach(ct => console.log('  -', ct.sys.id));
     })
     .catch(console.error);
   "
   ```

3. **Check if communityCard exists**: The error might be because `communityCard` content type doesn't exist. That's OK - we can work with just the template pages.

## What to Do Next

Once you have the export file (either from CLI or script), place it in `export_blogs_sample/` and let me know. I'll update the blog import script to properly handle the Community Card entries and their images.
