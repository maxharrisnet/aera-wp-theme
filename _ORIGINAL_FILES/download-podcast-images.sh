#!/bin/bash

# Download podcast images from Contentful
# After running this script, upload images to WordPress Media Library

mkdir -p podcast-images
cd podcast-images

# Avantor: Building Smarter Life Science Supply Chains with Decision Intelligence
curl -o "podcast-1-389C7FdgVFVpHBLsayQPkP.jpg" "https://images.ctfassets.net/mh1amgo8m7ts/389C7FdgVFVpHBLsayQPkP/ecaf23e9abbd9dda165cd03c2110b46b/Jared_Guckenberger_Avantor_Website_resource_card.jpg"

# Fred Laluyaux: How Decision Intelligence & AI Agents Are Redefining Enterprise Operations
curl -o "podcast-2-7DmjYfIBI0rdPBAcdyFxtp.jpg" "https://images.ctfassets.net/mh1amgo8m7ts/7DmjYfIBI0rdPBAcdyFxtp/03fe660e9d39fb93765055b92fcc5ff0/eye_on_ai_cover.jpg"

# Fred Laluyaux on Decision Intelligence, AI Adoption, and the Future of Work
curl -o "podcast-3-5vKNx15KdEIJ0ZI4MwLnw8.jpg" "https://images.ctfassets.net/mh1amgo8m7ts/5vKNx15KdEIJ0ZI4MwLnw8/1ef95c856ade5e9a50cbca858155e589/pmi_logo_ogShare.png"

# Decision Intelligence and AI with Frederic Laluyuax of Aera Technology, Leaders in Tech and Ecommerce Podcast
curl -o "podcast-4-4HXCKYhXaZ1fLLz2ADOXcr.jpg" "https://images.ctfassets.net/mh1amgo8m7ts/4HXCKYhXaZ1fLLz2ADOXcr/ad19d5864bba6bf97be6bf48ad3f2186/Alcott_Global.jpg"

# How AI is Remaking Decision-Making Systems
curl -o "podcast-5-1e28ULnrC15GwhiyPd7mcJ.jpg" "https://images.ctfassets.net/mh1amgo8m7ts/1e28ULnrC15GwhiyPd7mcJ/2667eb67b1b75be01c1baedc877b12bb/Enterprise_Times_Podcast.jpg"

# The Rise of the Autonomous Enterprise: Tom Davenport on AI-Driven Decision Making
curl -o "podcast-6-506EyimkQQ9vmQpDjAcJxZ.jpg" "https://images.ctfassets.net/mh1amgo8m7ts/506EyimkQQ9vmQpDjAcJxZ/84a27f365cdd3ce8d071245d65efdf47/Tom_Davenport_Babson_College_Website_resource_card.jpg"

# Revolutionizing Higher Ed: How Decision Intelligence is Shaping Student Success at WGU
curl -o "podcast-7-6E6fud9v1mDPVQ32hsTiYL.jpg" "https://images.ctfassets.net/mh1amgo8m7ts/6E6fud9v1mDPVQ32hsTiYL/e9f53fbc175adda815c22047821fbe5a/Joe_Dery_WGU_Website_resource_card.jpg"

# Reason Driven™ decision-making
curl -o "podcast-8-1S3FPRM3Jlu2WficrM5puP.jpg" "https://images.ctfassets.net/mh1amgo8m7ts/1S3FPRM3Jlu2WficrM5puP/05f28cd11de1f285e348438023aaa865/Brian_Evergreen_The_Future_Solving_Company_Website_resource_card.jpg"

# Baxter Healthcare: Elevating Service and Care with Decision Intelligence
curl -o "podcast-9-6Ugr5JN8QBWJOrOcEdrhEn.jpg" "https://images.ctfassets.net/mh1amgo8m7ts/6Ugr5JN8QBWJOrOcEdrhEn/b8dc3b72cdf75d8d9f38a6ae1e0ac876/Paul_Ives_Baxter_Website_resource_card.jpg"

# Unlocking AI’s ROI Potential: Insights from Ray Wang
curl -o "podcast-10-45yDfCFiXdAmKSEnAVAYij.jpg" "https://images.ctfassets.net/mh1amgo8m7ts/45yDfCFiXdAmKSEnAVAYij/3439149712551a3583150541e8f365c8/Ray_Wang_Constellation_Research_Website_resource_card.jpg"

# Reshaping the Future of Work with Decision Intelligence
curl -o "podcast-11-5HW4BtlnRGqd9hvDt0NKO1.jpg" "https://images.ctfassets.net/mh1amgo8m7ts/5HW4BtlnRGqd9hvDt0NKO1/4b2030e833a14f0f05cf684dd7374401/Joe_Fuller_Harvard_Business_School_Website_resource_card.jpg"

# Philip Morris International: Scaling Decision Intelligence to Improve Supply Chain Agility and Efficiency
curl -o "podcast-12-2N31NjENuTQ9aznvvYd4Cb.jpg" "https://images.ctfassets.net/mh1amgo8m7ts/2N31NjENuTQ9aznvvYd4Cb/73c2b6d7841142e55373e6996717659c/Gualtiero_Cerrato_Philip_Morris_International_Website_resource_card.jpg"

# Unilever: How Decision Intelligence is Revolutionizing Demand Sensing for the CPG Market
curl -o "podcast-13-1DT0KpFSbfG9fxIiMKVgI0.jpg" "https://images.ctfassets.net/mh1amgo8m7ts/1DT0KpFSbfG9fxIiMKVgI0/bcb98dffbb1b11877e8ac12ba68fe83f/Juan_Carlos_Parada_Unilever_Website_resource_card.jpg"

# J.D. Irving: Enabling a competitive advantage through Decision Intelligence
curl -o "podcast-14-IaloY7k5lJchbVKQ1D7lN.jpg" "https://images.ctfassets.net/mh1amgo8m7ts/IaloY7k5lJchbVKQ1D7lN/2e033fa1a946ad65c3484d70547abc7b/Georges_Tetegan_JDI_Website_resource_card.jpg"

# InfraBuild: Transforming Service & Inventory Management with Decision Intelligence
curl -o "podcast-15-7sxHWmEBmp2wPwYb3onP10.jpg" "https://images.ctfassets.net/mh1amgo8m7ts/7sxHWmEBmp2wPwYb3onP10/f3a3265ca82cd57bdb77da03b1328499/Evgeny_Krapovnitskiy_InfraBuild_Website_resource_card.jpg"

echo "✅ Downloaded all podcast images to podcast-images/"
