#!/bin/bash

# Download press release images from the WXR file
# Extracts attachment URLs and downloads them to _ORIGINAL_FILES/press-images/

WXR_FILE="/Users/max/Local Sites/aera-technology/app/public/wp-content/themes/aera-technology/_ORIGINAL_FILES/press-releases-wxr.xml"
IMAGE_DIR="/Users/max/Local Sites/aera-technology/app/public/wp-content/themes/aera-technology/_ORIGINAL_FILES/press-images"

# Create directory if it doesn't exist
mkdir -p "$IMAGE_DIR"

# Extract image URLs from WXR file and download them
echo "Downloading press release images..."
echo "WXR file: $WXR_FILE"
echo "Image directory: $IMAGE_DIR"
echo ""

# Use sed to find attachment URLs and extract them (macOS compatible)
cat "$WXR_FILE" | grep '<wp:attachment_url>' | sed 's/.*<wp:attachment_url>\(.*\)<\/wp:attachment_url>.*/\1/' | sort | uniq | while read -r url; do
  # Skip empty lines
  if [ -z "$url" ]; then
    continue
  fi

  # Extract filename from URL
  filename=$(basename "$url")

  # Check if file already exists
  if [ -f "$IMAGE_DIR/$filename" ]; then
    echo "✓ Already downloaded: $filename"
  else
    echo "Downloading: $filename"
    curl -s -o "$IMAGE_DIR/$filename" "$url"

    # Check if download was successful
    if [ -f "$IMAGE_DIR/$filename" ] && [ -s "$IMAGE_DIR/$filename" ]; then
      echo "✓ Downloaded: $filename"
    else
      echo "✗ Failed to download: $filename"
    fi
  fi
done

echo ""
echo "Download complete!"
echo "Images saved to: $IMAGE_DIR"
echo "Total images: $(find "$IMAGE_DIR" -type f | wc -l)"
