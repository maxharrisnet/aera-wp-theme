# Date Fields Summary

## Findings

After checking the Contentful data:

### Resource Types (Blogs, News, Press Releases, Whitepapers, Podcasts)
- **Only have single `date` field** - no start/end dates
- Date is used for:
  - `post_date` and `post_date_gmt` in WordPress
  - Sorting on archive pages
  - Display on cards

### Events
- Have their own ACF fields: `event_start_date` and `event_end_date`
- Located in `group_aera_event.json`
- Not part of resource fields

### Webinars
- Have their own ACF field: `webinar_date`
- Located in `group_aera_webinar.json`
- Not part of resource fields

## Changes Made

1. **Removed** `resource_start_date` and `resource_end_date` from `group_aera_resource_fields.json`
   - These fields don't exist in Contentful for resource types
   - Events and webinars have their own date fields in their specific ACF groups

2. **Updated all import scripts** to remove start/end date logic
   - Scripts now only use the single `date` field
   - Date is set in `post_date` and `post_date_gmt`
   - No additional date meta fields needed

## Result

Cleaner UI - resource types only show a single date field (which is already handled by WordPress `post_date`), while events and webinars have their specialized date fields in their own ACF groups.
