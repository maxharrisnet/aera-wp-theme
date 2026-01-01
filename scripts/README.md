# Webinars to WXR

This script extracts the `const blogs` array from `_ORIGINAL_FILES/AllResources.js` and generates a WordPress WXR XML file containing `webinar` post_type items.

Usage:

1. Ensure Node.js is installed (v12+).
2. From the theme root, run:

```bash
node scripts/webinars-to-wxr.js
```

3. Output is written to `_ORIGINAL_FILES/webinars-wxr.xml`.

Images:

- To let the WordPress importer fetch images automatically (recommended): the WXR now includes attachment items and `_thumbnail_id` postmeta — when you re-import with "Download and import file attachments" enabled, WP will fetch images from their remote URLs.
- To download images locally first, run:

```bash
node scripts/download-webinar-images.js
```

Images will be saved to `_ORIGINAL_FILES/webinar-images/`.

Notes:
- The script places the original meeting link in a custom field `original_link` and the image URL in `image_url`.
- Adjust the `<link>` value in the script header (`https://your-site.example/`) to match your site before importing if needed.
