# Contentful Export Status

The export is running! Here's what to expect:

## Export Process

The Contentful CLI export will:
1. ✅ Fetch content types (25 found)
2. ⏳ Fetch all entries (this includes Community Template Pages and Community Cards)
3. ⏳ Fetch all assets (images, etc.)
4. ⏳ Save to `./export_blogs_full/contentful-export-mh1amgo8m7ts-[timestamp].json`

## Once Export Completes

1. **Check the file was created:**
   ```bash
   ls -lh export_blogs_full/
   ```

2. **Copy to export_blogs_sample:**
   ```bash
   cp export_blogs_full/contentful-export-mh1amgo8m7ts-*.json export_blogs_sample/
   ```

3. **Verify it has the content types:**
   ```bash
   node -e "
   const fs = require('fs');
   const files = fs.readdirSync('export_blogs_sample').filter(f =>
     f.includes('contentful-export') && f.includes('mh1amgo8m7ts')
   );
   const latest = files.sort().pop();
   if (!latest) {
     console.log('No export file found yet');
     process.exit(1);
   }
   const data = JSON.parse(fs.readFileSync('export_blogs_sample/' + latest, 'utf8'));
   console.log('✅ Export file loaded:', latest);
   console.log('\\n📊 Content Summary:');
   console.log('  Total entries:', data.entries.length);
   console.log('  Template Pages:', data.entries.filter(e => e.sys?.contentType?.sys?.id === 'communityTemplatePage').length);
   console.log('  Cards:', data.entries.filter(e => e.sys?.contentType?.sys?.id === 'communityCard').length);
   console.log('  Published Cards:', data.entries.filter(e => e.sys?.contentType?.sys?.id === 'communityCard' && e.sys?.publishedAt).length);
   console.log('  Assets:', data.assets?.length || 0);
   "
   ```

4. **Let me know when it's done** and I'll update the blog import script to properly handle the Community Card images!

## If Export Fails

If you get an error, you can try:
- Exporting only content (no assets): `--content-only`
- Or let me know the error and I'll help troubleshoot
