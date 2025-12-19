#!/bin/bash
# Download customer images from Contentful

echo "📥 Downloading customer images from Contentful..."

# Create images directory if it doesn't exist
mkdir -p _ORIGINAL_FILES/customer-images

# BP-Castrol
echo "1️⃣  Downloading BP-Castrol images..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/1W0QR98YCaevBiGxzDuZeX/63168042fc5d2c23d043b4fad8218a44/BP_Castrol.jpg" -o "_ORIGINAL_FILES/customer-images/bp-castrol-hero.jpg"
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/3Cx9goE9yBv3xE8X4dbu32/517833e0d64dd1e597aaa31bc7871b4b/CastrolLogo.png" -o "_ORIGINAL_FILES/customer-images/bp-castrol-logo.png"

# PMI (Philip Morris International)
echo "2️⃣  Downloading PMI images..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/7DNf6kRhwFHGCPSKHDsKa5/53ebf2cefb1e341a5362a3a550c87d53/PMI_thumb_v2.webp" -o "_ORIGINAL_FILES/customer-images/pmi-hero.webp"
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/2i4CyHqG5gJk6M4vCbpIHq/2ececb551dc4edd8ff7e4dc992851422/PMI.png" -o "_ORIGINAL_FILES/customer-images/pmi-logo.png"

# AstraZeneca
echo "3️⃣  Downloading AstraZeneca images..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/2KJuykL80eOEixtygJQdOG/412740c88f6e332faa311f811a58e66d/AstraZeneca.jpg" -o "_ORIGINAL_FILES/customer-images/astrazeneca-hero.jpg"
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/3h4wp6QfAxNhPBH5tBJ8YC/c67fdb6e37f91e51f93ecaccd24fb5c1/AstraZeneca.png" -o "_ORIGINAL_FILES/customer-images/astrazeneca-logo.png"

echo "✅ All images downloaded to _ORIGINAL_FILES/customer-images/"
echo ""
echo "📝 Next steps:"
echo "   1. Review the images in _ORIGINAL_FILES/customer-images/"
echo "   2. Upload them to WordPress Media Library"
echo "   3. Import the WordPress XML file: _ORIGINAL_FILES/wordpress-customers-import.xml"
echo "   4. Update the ACF image fields with the WordPress attachment IDs"

