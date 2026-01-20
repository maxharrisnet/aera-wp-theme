#!/bin/bash
# Read post meta for a specific post
# Usage: bash _EXPORTS/read-post-meta.sh [POST_ID]

cd "$(dirname "$0")/../.." || exit

POST_ID=${1:-""}

if [ -z "$POST_ID" ]; then
  echo "Usage: bash _EXPORTS/read-post-meta.sh [POST_ID]"
  echo ""
  echo "Examples:"
  echo "  bash _EXPORTS/read-post-meta.sh 123"
  echo "  bash _EXPORTS/read-post-meta.sh 123 | grep author"
  echo ""
  echo "To find a post ID, use:"
  echo "  wp post list --post_type=blog --format=table"
  exit 1
fi

echo "📋 Post Meta for Post ID: $POST_ID"
echo "=================================="
echo ""

# Get post title
TITLE=$(wp post get $POST_ID --field=title 2>/dev/null)
if [ -z "$TITLE" ]; then
  echo "❌ Post ID $POST_ID not found!"
  exit 1
fi

echo "Post Title: $TITLE"
echo ""

# Get all meta
wp post meta list $POST_ID --format=table
