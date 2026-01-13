#!/bin/bash

# Download case study images from Contentful
# After running this script, upload images to WordPress Media Library

mkdir -p case-study-images
cd case-study-images

# Fast-moving Consumer Goods - featured (fmcg3)
curl -o "case-study-featured-1-HdgyXCSb5OQIqNurCux6x.jpg" "https://images.ctfassets.net/mh1amgo8m7ts/HdgyXCSb5OQIqNurCux6x/f8e55f20595ad5da400a72b3718631b0/consumergoods.png"

# Fast-moving Consumer Goods - icon (fmcg3)
curl -o "case-study-icon-1-3ojerf6iDuC54CGBsOzY7z.png" "https://images.ctfassets.net/mh1amgo8m7ts/3ojerf6iDuC54CGBsOzY7z/51aed8ef3396bf56e24580646b0d2526/global_fmcg.png"

# Global Animal Health - featured (ahp1)
curl -o "case-study-featured-2-5urdncxNcpDtUDIWgDvaIT.jpg" "https://images.ctfassets.net/mh1amgo8m7ts/5urdncxNcpDtUDIWgDvaIT/c67fa5cbde24b73533efc3ccd5665b12/Pethealth.png"

# Global Animal Health - icon (ahp1)
curl -o "case-study-icon-2-15600jXIuIAHEP2PcyIUVW.png" "https://images.ctfassets.net/mh1amgo8m7ts/15600jXIuIAHEP2PcyIUVW/e0d5833458901ee9c21531a6724b3745/animalhealdth.png"

# Global CPG - featured (ahp2)
curl -o "case-study-featured-3-HdgyXCSb5OQIqNurCux6x.jpg" "https://images.ctfassets.net/mh1amgo8m7ts/HdgyXCSb5OQIqNurCux6x/f8e55f20595ad5da400a72b3718631b0/consumergoods.png"

# Global CPG - icon (ahp2)
curl -o "case-study-icon-3-3ojerf6iDuC54CGBsOzY7z.png" "https://images.ctfassets.net/mh1amgo8m7ts/3ojerf6iDuC54CGBsOzY7z/51aed8ef3396bf56e24580646b0d2526/global_fmcg.png"

# Global FMCG - featured (fmcg1)
curl -o "case-study-featured-4-6yU8XIQii2ULQKfgTbAYwC.jpg" "https://images.ctfassets.net/mh1amgo8m7ts/6yU8XIQii2ULQKfgTbAYwC/51e7cc9773ee3698f86d2cfd617028b7/consumergoods.png"

# Global FMCG - icon (fmcg1)
curl -o "case-study-icon-4-3ojerf6iDuC54CGBsOzY7z.png" "https://images.ctfassets.net/mh1amgo8m7ts/3ojerf6iDuC54CGBsOzY7z/51aed8ef3396bf56e24580646b0d2526/global_fmcg.png"

# Global Science & Technology Company - featured (gstco)
curl -o "case-study-featured-5-6A2VqNQpf6Ml45j19it3lq.jpg" "https://images.ctfassets.net/mh1amgo8m7ts/6A2VqNQpf6Ml45j19it3lq/39c028889711b9e9c8c8fad23db01dfa/Science_and_Tech.png"

# Global Science & Technology Company - icon (gstco)
curl -o "case-study-icon-5-5K2odxIlQZEXn4HL7Ej7UJ.png" "https://images.ctfassets.net/mh1amgo8m7ts/5K2odxIlQZEXn4HL7Ej7UJ/46e3a0b650fbdd06e8b11010c73510d2/sciencetech.png"

# Health & Hygiene - featured (fmcg2)
curl -o "case-study-featured-6-6m38vTu3iUSt9YQ4kS22JA.jpg" "https://images.ctfassets.net/mh1amgo8m7ts/6m38vTu3iUSt9YQ4kS22JA/7f149a8b74c1ea98045f9077cfff68e4/Health_and_Hygiene_blk.png"

# Health & Hygiene - icon (fmcg2)
curl -o "case-study-icon-6-7f0SA3DBbszS9xLpl5scUD.png" "https://images.ctfassets.net/mh1amgo8m7ts/7f0SA3DBbszS9xLpl5scUD/0920cb0239d8f7cf9d94dbb2ae67f785/healthhygiene.png"

# Manufacturing - featured (deacero)
curl -o "case-study-featured-7-5XaoHHZ82jaGYhHVXCffFc.jpg" "https://images.ctfassets.net/mh1amgo8m7ts/5XaoHHZ82jaGYhHVXCffFc/75596afa6634f488749d3a9d9be5c120/manufacture.png"

# Manufacturing - icon (deacero)
curl -o "case-study-icon-7-57Zp9tHw1SqXgikEXzcwaj.png" "https://images.ctfassets.net/mh1amgo8m7ts/57Zp9tHw1SqXgikEXzcwaj/2890def7620d3fe428bcc6a56014a16b/manufacturing.png"

# Petrochemical - featured (petrochemical)
curl -o "case-study-featured-8-64lANvNGTC9SofSshVmW7e.jpg" "https://images.ctfassets.net/mh1amgo8m7ts/64lANvNGTC9SofSshVmW7e/1e4e0ae18fad02257aa0dfdf243157ff/petrochemical.png"

# Petrochemical - icon (petrochemical)
curl -o "case-study-icon-8-2TCkuqkVXu0amcDzYjs89v.png" "https://images.ctfassets.net/mh1amgo8m7ts/2TCkuqkVXu0amcDzYjs89v/8661d031879598b3926b775c3bda5fc6/petrochem.png"

# Pharmaceutical - featured (pharmaceutical)
curl -o "case-study-featured-9-51mH3fR2qZ7yQMml9vq7J5.jpg" "https://images.ctfassets.net/mh1amgo8m7ts/51mH3fR2qZ7yQMml9vq7J5/468276b3c4beb884eb6d047987d5848f/Pharma_icon_gray_432x288.png"

# Pharmaceutical - icon (pharmaceutical)
curl -o "case-study-icon-9-6cfITLiqIf5qT4Ps5pVydP.png" "https://images.ctfassets.net/mh1amgo8m7ts/6cfITLiqIf5qT4Ps5pVydP/24a5565ee8ca987ae4cf659bad2f5f5e/pharmacasestudy.png"

echo "✅ Downloaded all case study images to case-study-images/"
