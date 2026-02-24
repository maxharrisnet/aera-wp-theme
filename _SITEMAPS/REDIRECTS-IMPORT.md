# Yoast SEO redirect import

## Why the previous import failed

Yoast SEO Premium expects **4 columns**: `Origin`, `Target`, `Type`, **and `Format`**. The old CSV had only 3 columns. Yoast also requires:

- **UTF-8 encoding**
- **Unix line endings** (LF), not Windows (CRLF)
- Comma separator
- `Format` column value **lowercase** (`plain` or `regex`)

The generated `yoast-redirects-import.csv` in this folder now includes the `Format` column and is written with UTF-8 and LF.

## How to import in Yoast

1. **WordPress Admin** → **Yoast SEO** → **Tools** → **Import and Export**
2. Open **Import redirects**
3. Choose **Import from CSV file**
4. Upload `yoast-redirects-import.csv` (from this `_SITEMAPS` folder)
5. Run the import

If you hit timeouts with a large file, import in smaller chunks or increase `max_execution_time` in PHP.

## Regenerating the CSV

Redirects are extracted from the old React app’s `index.js` (the `<Redirect path="..." to="..." />` components). To regenerate after changing that file or the script:

```bash
cd _SITEMAPS
node generate-yoast-redirects.js
```

This overwrites `yoast-redirects-import.csv` with:

- All non-commented redirects from `index.js`
- **Skills redirects** for the current WordPress site: `/skills` → `/skills/`, `/skills/order` → `/skills/order/`, etc. (trailing slash to match WP’s `skill_function` taxonomy URLs)

## Adding more skills redirects

If you have more old React skill URLs (e.g. `/skills/forecast` or other slugs), add them in `generate-yoast-redirects.js` in the `skillsRedirects` array, then run the script again.
