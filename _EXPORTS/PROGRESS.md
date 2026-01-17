# Import Revision Progress

## ✅ Completed

1. **Folder Structure**: Created `_EXPORTS/` with subfolders
2. **ACF Fields**: Added `resource_start_date` and `resource_end_date` to resource fields group
3. **Press Releases Script**: Completely rewritten
   - ✅ Matches Article Template Page with News Item cards
   - ✅ Gets card image from News Item
   - ✅ Gets featured image from Article Template Page
   - ✅ Adds `_resource_card_image` field key
   - ✅ Filters by publishedAt
   - ✅ Auto-detects latest export file
   - ✅ Adds start/end date fields
   - ✅ Uses date field for post_date

## 🚧 In Progress

4. **Whitepapers Script**: Need to update
5. **Podcasts Script**: Need to create/update
6. **Blogs Script**: Need to verify card image mapping
7. **News Script**: Need to add start/end dates

## 📋 Still To Do

8. Image download/upload scripts for each type
9. Move existing files to _EXPORTS folder
10. Create README files for each import type

## Notes

- Press Releases script is in `_EXPORTS/scripts/`
- Need to test all scripts after updates
- Card image issue: Missing `_resource_card_image` field key was the main problem
