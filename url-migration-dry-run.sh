#!/usr/bin/env bash
# URL migration dry run: show what would be replaced, no DB writes.
# Run from WordPress root (parent of wp-content). Excludes wp_users.
# Usage: ./wp-content/themes/aera-technology/url-migration-dry-run.sh
#    or: bash wp-content/themes/aera-technology/url-migration-dry-run.sh

set -e
SEARCH_HTTPS='https://www.aeratechnology.com'
SEARCH_HTTP='http://www.aeratechnology.com'
REPLACE=''
SKIP_TABLES='wp_users'

echo "=============================================="
echo "URL migration dry run (wp_users excluded)"
echo "=============================================="
echo "Search (HTTPS): $SEARCH_HTTPS"
echo "Search (HTTP):  $SEARCH_HTTP"
echo "Replace with:   (empty string → relative URLs)"
echo "Skip tables:    $SKIP_TABLES"
echo "=============================================="
echo ""

echo "--- 1/2 HTTPS ---"
wp search-replace "$SEARCH_HTTPS" "$REPLACE" --dry-run --all-tables --skip-tables="$SKIP_TABLES" --report-changed-only
echo ""

echo "--- 2/2 HTTP ---"
wp search-replace "$SEARCH_HTTP" "$REPLACE" --dry-run --all-tables --skip-tables="$SKIP_TABLES" --report-changed-only
echo ""

echo "=============================================="
echo "Dry run finished. No changes were written."
echo "To run for real, use the commands in URL-MIGRATION-RELATIVE-LINKS.md"
echo "=============================================="
