#!/bin/bash
# Read user meta for a specific user
# Usage: bash _EXPORTS/read-user-meta.sh [USER_ID or USERNAME]

cd "$(dirname "$0")/../.." || exit

USER_ID=${1:-""}

if [ -z "$USER_ID" ]; then
  echo "Usage: bash _EXPORTS/read-user-meta.sh [USER_ID or USERNAME]"
  echo ""
  echo "Examples:"
  echo "  bash _EXPORTS/read-user-meta.sh 1"
  echo "  bash _EXPORTS/read-user-meta.sh admin"
  echo ""
  echo "To find users, use:"
  echo "  wp user list --format=table"
  exit 1
fi

echo "👤 User Meta for: $USER_ID"
echo "=================================="
echo ""

# Get user info
USER_INFO=$(wp user get $USER_ID --format=json 2>/dev/null)
if [ -z "$USER_INFO" ]; then
  echo "❌ User $USER_ID not found!"
  exit 1
fi

DISPLAY_NAME=$(echo $USER_INFO | wp eval 'echo json_decode(file_get_contents("php://stdin"))->display_name;')
echo "Display Name: $DISPLAY_NAME"
echo ""

# Get all meta
wp user meta list $USER_ID --format=table
