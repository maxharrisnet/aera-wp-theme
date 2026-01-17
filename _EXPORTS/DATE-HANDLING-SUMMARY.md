# Date Handling Summary

## Format Used

All scripts use the same date format to avoid timezone issues:
- **Format**: `YYYY-MM-DD 12:00:00` (date-only values get noon time added)
- **Both `post_date` and `post_date_gmt`**: Set to the same value for date-only fields
- **Avoids timezone conversion issues** that caused off-by-one day errors

## Script-Specific Date Sources

### Blogs
- **Primary**: Community Template Page `date` field
- **Fallback**: Community Card `date` field (this is what shows on archive)
- **Rationale**: Card date is what's displayed on the frontend archive page

### Press Releases
- **Primary**: Article Template Page `date` field
- **Fallback**: News Item card `date` field
- **Final Fallback**: Creation date from `sys.createdAt`

### News
- **Source**: News Item `date` field
- **Fallback**: Creation date from `sys.createdAt`

### Whitepapers
- **Source**: Events `date` field
- **Fallback**: Creation date from `sys.createdAt`

### Podcasts
- **Source**: Podcast `date` field
- **Fallback**: Creation date from `sys.createdAt`

## Template Fix

Updated `template-parts/content-resource-card.php`:
- Changed from `get_the_date('c')` (ISO 8601 with timezone) to `get_the_date('Y-m-d')`
- Directly uses `Y-m-d` format without timezone conversion
- Fixes display issues where dates showed as just "2025" instead of full date

## Example

For a date value `2025-10-21`:
- **WXR**: `post_date` = `2025-10-21 12:00:00`, `post_date_gmt` = `2025-10-21 12:00:00`
- **WordPress**: Stores as October 21, 2025 12:00 PM
- **Template**: Displays as `2025-10-21` (via `get_the_date('Y-m-d')`)

## Verification

All scripts verified to use:
- ✅ Simple `YYYY-MM-DD 12:00:00` format
- ✅ Same value for both `post_date` and `post_date_gmt`
- ✅ Proper fallback to creation date if no date field
