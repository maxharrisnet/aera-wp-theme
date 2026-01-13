#!/bin/bash

# Download case study page images from Contentful
# After running this script, upload images to WordPress Media Library

mkdir -p case-study-page-images
cd case-study-page-images

# Fast-moving Consumer Goods (fmcg3)
curl -o "case-study-page-1-HdgyXCSb5OQIqNurCux6x.jpg" "https://images.ctfassets.net/mh1amgo8m7ts/HdgyXCSb5OQIqNurCux6x/f8e55f20595ad5da400a72b3718631b0/consumergoods.png"

# Global Animal Health (ahp1)
curl -o "case-study-page-2-5urdncxNcpDtUDIWgDvaIT.jpg" "https://images.ctfassets.net/mh1amgo8m7ts/5urdncxNcpDtUDIWgDvaIT/c67fa5cbde24b73533efc3ccd5665b12/Pethealth.png"

# Global CPG (ahp2)
curl -o "case-study-page-3-HdgyXCSb5OQIqNurCux6x.jpg" "https://images.ctfassets.net/mh1amgo8m7ts/HdgyXCSb5OQIqNurCux6x/f8e55f20595ad5da400a72b3718631b0/consumergoods.png"

# Global FMCG (fmcg1)
curl -o "case-study-page-4-6yU8XIQii2ULQKfgTbAYwC.jpg" "https://images.ctfassets.net/mh1amgo8m7ts/6yU8XIQii2ULQKfgTbAYwC/51e7cc9773ee3698f86d2cfd617028b7/consumergoods.png"

# Global Science & Technology Company (gstco)
curl -o "case-study-page-5-6A2VqNQpf6Ml45j19it3lq.jpg" "https://images.ctfassets.net/mh1amgo8m7ts/6A2VqNQpf6Ml45j19it3lq/39c028889711b9e9c8c8fad23db01dfa/Science_and_Tech.png"

# Health & Hygiene (fmcg2)
curl -o "case-study-page-6-6m38vTu3iUSt9YQ4kS22JA.jpg" "https://images.ctfassets.net/mh1amgo8m7ts/6m38vTu3iUSt9YQ4kS22JA/7f149a8b74c1ea98045f9077cfff68e4/Health_and_Hygiene_blk.png"

# Manufacturing (deacero)
curl -o "case-study-page-7-5XaoHHZ82jaGYhHVXCffFc.jpg" "https://images.ctfassets.net/mh1amgo8m7ts/5XaoHHZ82jaGYhHVXCffFc/75596afa6634f488749d3a9d9be5c120/manufacture.png"

# Petrochemical (petrochemical)
curl -o "case-study-page-8-64lANvNGTC9SofSshVmW7e.jpg" "https://images.ctfassets.net/mh1amgo8m7ts/64lANvNGTC9SofSshVmW7e/1e4e0ae18fad02257aa0dfdf243157ff/petrochemical.png"

# Pharmaceutical (pharmaceutical)
curl -o "case-study-page-9-51mH3fR2qZ7yQMml9vq7J5.jpg" "https://images.ctfassets.net/mh1amgo8m7ts/51mH3fR2qZ7yQMml9vq7J5/468276b3c4beb884eb6d047987d5848f/Pharma_icon_gray_432x288.png"

echo "✅ Downloaded all case study page images to case-study-page-images/"
