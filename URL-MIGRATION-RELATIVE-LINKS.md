# URL migration: make aeratechnology.com links relative

## Goal
Replace `https://www.aeratechnology.com` (and optional `http://` variant) with nothing so links and image URLs become relative (e.g. `/page/`, `/wp-content/uploads/...`). This keeps the site working on any domain (staging, new production).

## Where URLs appear
- **Post content** (`wp_posts.post_content`): `<a href="...">` and `<img src="...">` — one replace fixes both; relative paths work for both.
- **ACF / meta** (`wp_postmeta`, `wp_options`): CTA External URL, hero button links, resource external URL, banner link URL, etc. Stored as plain or serialized strings; same replace works.

## What not to change
- **Emails**: `info@aeratechnology.com`, `security@aeratechnology.com` — the search string `https://www.aeratechnology.com` does not appear inside these, so they are safe.
- **Theme/plugin code**: Only the database is updated; no PHP/JS files are touched.
- **Subdomains**: If you have `https://meet.aeratechnology.com` in content, a replace of `https://www.aeratechnology.com` only will not change those (different string). If you want those relative too, run a separate pass for `https://meet.aeratechnology.com` → `` (optional).

## Copy-paste commands

**Dry run (no writes, excludes `wp_users`):**
```bash
wp search-replace 'https://www.aeratechnology.com' '' --dry-run --all-tables --skip-tables=wp_users
wp search-replace 'http://www.aeratechnology.com' '' --dry-run --all-tables --skip-tables=wp_users
```

**Live run (back up DB first; excludes `wp_users`):**
```bash
wp search-replace 'https://www.aeratechnology.com' '' --all-tables --skip-tables=wp_users
wp search-replace 'http://www.aeratechnology.com' '' --all-tables --skip-tables=wp_users
```

**Dry run script (from WordPress root):**  
Runs both URLs in dry run and prints what would change. No DB writes.
```bash
bash wp-content/themes/aera-technology/url-migration-dry-run.sh
```
If your DB table prefix is not `wp_`, edit the script and set `SKIP_TABLES` to your users table (e.g. `myprefix_users`).

---

## Recommended approach

### 1. Backup
- Full DB backup (and optionally `wp-content/uploads` if you want to revert media paths).
- Export a small XML or run a quick DB dump before any replace.

### 2. Dry run (WP-CLI)
From site root (where `wp-content` lives):

```bash
# Dry run: show what would change (no writes)
wp search-replace 'https://www.aeratechnology.com' '' --dry-run --all-tables

# If you use http as well (e.g. old content)
wp search-replace 'http://www.aeratechnology.com' '' --dry-run --all-tables
```

Check the reported tables and row counts. `--all-tables` includes `wp_posts`, `wp_postmeta`, `wp_options`, etc., and WP-CLI fixes serialized data after replace.

### 3. Run the replace
When the dry run looks correct:

```bash
# Exclude wp_users so user "website" URLs stay absolute (or fix manually)
wp search-replace 'https://www.aeratechnology.com' '' --all-tables --skip-tables=wp_users
wp search-replace 'http://www.aeratechnology.com' '' --all-tables --skip-tables=wp_users
```

If you prefer to include all tables (e.g. no user has the full site URL as their profile URL), omit `--skip-tables=wp_users`.

### 4. Optional: limit to specific tables
If you prefer to do it in stages:

```bash
# Content only
wp search-replace 'https://www.aeratechnology.com' '' wp_posts --dry-run
wp search-replace 'https://www.aeratechnology.com' '' wp_posts

# Then post meta (ACF, etc.)
wp search-replace 'https://www.aeratechnology.com' '' wp_postmeta --dry-run
wp search-replace 'https://www.aeratechnology.com' '' wp_postmeta

# Then options (site/ACF options)
wp search-replace 'https://www.aeratechnology.com' '' wp_options --dry-run
wp search-replace 'https://www.aeratechnology.com' '' wp_options
```

### 5. Using Better Find Replace (plugin)
- Use the same search: `https://www.aeratechnology.com`, replace: leave empty (or a single space then trim in DB if the plugin requires non-empty).
- Run dry run first, then execute.
- Ensure the plugin is set to handle serialized data (most do).

## Links vs images
You do **not** need to differentiate for this migration:
- In HTML, both `href` and `src` become relative (e.g. `href="/demo"`, `src="/wp-content/uploads/..."`), which is correct.
- In ACF fields, values are plain URLs; making them relative is what you want.

## After migration
- Clear any caches (object cache, page cache, CDN).
- Spot-check: a few pages, a CTA button, an image in content, and one ACF option (e.g. banner or CTA URL).
- If something still points to the old domain, search the DB for `aeratechnology.com` (e.g. `wp db query "SELECT * FROM wp_posts WHERE post_content LIKE '%aeratechnology.com%'"`) and fix or run replace again for the variant you missed (e.g. with/without trailing slash).

## Trailing slash
If the dry run showed URLs like `https://www.aeratechnology.com/something` (no trailing slash after domain), replacing `https://www.aeratechnology.com` with `` gives `/something`, which is correct. If you also have `https://www.aeratechnology.com/` (home with trailing slash) stored anywhere, that becomes `/`, which is correct. No need to run a separate pass for trailing slash unless you have a different pattern (e.g. only replace when followed by path).
