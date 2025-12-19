#!/bin/bash
# Download all customer images from Contentful

echo "📥 Downloading all customer images from Contentful..."

mkdir -p customer-images-all

echo "1. Downloading Deacero hero..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/10vP4ATq4QtGSVE3YnV9g0/ed5293bcb83a5b204095418978ec4ad8/Deacero_thumb_v2.webp" -o "customer-images-all/deacero-hero.webp"

echo "2. Downloading Deacero logo..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/20Rs1GrKUH15f6VZ1TK2ML/09eef7591e64a2523be7b2c52d5c5c64/DEACERO.png" -o "customer-images-all/deacero-logo.png"

echo "3. Downloading J.D. Irving hero..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/1yj3IObTiWiJyc9RFmD2o9/a70647ea231dbb733af63f0adf1414c7/JDI_THUMB.webp" -o "customer-images-all/jd-irving-hero.webp"

echo "4. Downloading J.D. Irving logo..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/47hmxdmu5lL4qMHb4M4IuO/3d5ed6a4888a28d7c89bd4efc4c6110a/jdirving.webp" -o "customer-images-all/jd-irving-logo.webp"

echo "5. Downloading Kraft Heinz hero..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/70X1G49EzEetuWSbKpUBfU/d24ca9bb4fee9a7f60fadae06bbed211/KRAFT_THUMB.webp" -o "customer-images-all/kraft-heinz-hero.webp"

echo "6. Downloading Kraft Heinz logo..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/1Rs0VAk66PFeZSfoalybPq/8373d3dec8d084cdc605efe8b36a818b/KraftHeinz_Logonew__1_.png" -o "customer-images-all/kraft-heinz-logo.png"

echo "7. Downloading InfraBuild hero..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/67MOT3SZXEOfFGO8SvymES/8a7e8a090e1e04ee5b2d205be6faf6bd/INFRABUILD_THUMB.webp" -o "customer-images-all/infrabuild-hero.webp"

echo "8. Downloading InfraBuild logo..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/6L2a5FYyfHdoN7ETQmwVZQ/8ba935dc9c3810fd69d57c342707cac0/infrabuild_1__1_.png" -o "customer-images-all/infrabuild-logo.png"

echo "9. Downloading Baxter hero..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/3hiQaUCYxWDxkzCV2bCWkY/addb5003f959239f2bf2cb0cee0ea189/BAXTER_THUMB.webp" -o "customer-images-all/baxter-hero.webp"

echo "10. Downloading Baxter logo..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/6jxpCamFfp9c0zQUIYAC16/97759c0768cac83912dd318dd2094c3f/Baxter.jpg" -o "customer-images-all/baxter-logo.jpg"

echo "11. Downloading Becle hero..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/YaVpDBRlVur1KU2Fq4csI/db3dc067e43f44b0541ffc599b66c85c/Proximo_thumb_v2.webp" -o "customer-images-all/becle-hero.webp"

echo "12. Downloading Becle logo..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/vOCjmeMmr3AxI2EWMQ1Sg/e460a7da1b7bce24175dd6ae36cf3622/becle.png" -o "customer-images-all/becle-logo.png"

echo "13. Downloading Merck Animal Health hero..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/335d5VQVyEE2hCANq3flId/4382dbab90033be9b87d0bcc887beead/Merck_thumb_v2.webp" -o "customer-images-all/merck-animal-health-hero.webp"

echo "14. Downloading Merck Animal Health logo..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/5zcgQZv3BTKmvv5YpL2rYs/2f90a6327f48cf7d92f7682dee1c31a9/MERCK_ANIMAL_HEALTH.png" -o "customer-images-all/merck-animal-health-logo.png"

echo "15. Downloading Western Governors University hero..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/3oTxb9W1t0Qxd5dRuOW93x/80af7cb0173e2991a98e46e10f5a1b85/WGO_thumb__1_.webp" -o "customer-images-all/western-governors-university-hero.webp"

echo "16. Downloading Western Governors University logo..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/uwFtjCA2KuNJRbmmllaUh/268fe2e8158293750aca7cf03b7e7526/Western_Governors_University__1_.png" -o "customer-images-all/western-governors-university-logo.png"

echo "17. Downloading Dell hero..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/45pGBoK8Q1nt53jWVmx8Gh/959f26d25dbcc39b3327fae1bd9276cb/Dell_thuimb_v2.webp" -o "customer-images-all/dell-hero.webp"

echo "18. Downloading Dell logo..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/5YU25NRtoW4QeqUJtuvB68/04b5ee381133527ea2683c62fc76bd1b/DELL_LOGO.png" -o "customer-images-all/dell-logo.png"

echo "19. Downloading Mars hero..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/5Mu90HXMpLYc9ybjOwZ5V0/32b9f04d31381f64337a4042efa51895/Mars_thumb_v2.webp" -o "customer-images-all/mars-hero.webp"

echo "20. Downloading Mars logo..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/7yY2oLTqjgkTavLcFCocuS/9d6d6f6e8a77d150e36094596bea4b34/logoMars.png" -o "customer-images-all/mars-logo.png"

echo "21. Downloading Mitsubishi Chemical Group hero..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/5NhomXILJTrpcBlA1Ab4Vu/638162d6ea3a2dc4eecb1fdec30e5931/Mitzubishi_thumb_v2.webp" -o "customer-images-all/mitsubishi-chemical-group-hero.webp"

echo "22. Downloading Mitsubishi Chemical Group logo..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/3iIO8i3hkBHojcKwswdBXt/4220130a18f5d4bf1da0360a3d9fac0f/The_Mitsubishi_Chemical_Group-0_1.png" -o "customer-images-all/mitsubishi-chemical-group-logo.png"

echo "23. Downloading Lucid hero..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/2YdeYBjE4uhi9Eiv2Nr1Wm/563e32fcd778add2c8baccb07c28e62d/LUCID_THUMB.webp" -o "customer-images-all/lucid-hero.webp"

echo "24. Downloading Lucid logo..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/7tsMcbDT8v1LpnaDwi2k2P/883ee93c4bd0bfe7be40678c542ef1c1/blank__1_.png" -o "customer-images-all/lucid-logo.png"

echo "25. Downloading GSK hero..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/4b0JPNsfiEuJqpTQ9zeCVT/0bf223fa6b318202ff1bc98579805c84/GSK_thumb_v2.webp" -o "customer-images-all/gsk-hero.webp"

echo "26. Downloading GSK logo..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/165b07y5cb60pJnIOmf2zp/38c0f05d165316db13638e89f926ba9c/GSK_Color_1.png" -o "customer-images-all/gsk-logo.png"

echo "27. Downloading Global CPG hero..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/7aRbMyaNqyLXI2sr63KmPk/b56898d2566cf95fea87853afd264760/CPG_THUMB.webp" -o "customer-images-all/global-cpg-hero.webp"

echo "28. Downloading Health & Hygiene hero..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/2rHEI6WSouzBvJTJRY9zzB/b4095a333d4153729dba3c5810097924/HEALTH_HYGIENE_CASESTUDY.webp" -o "customer-images-all/health-hygiene-hero.webp"

echo "29. Downloading Animal Health Products hero..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/5e2yygU4cXp8k7Pk93wSNF/6b4247350765d8d94ea2a34cf99d5744/ANIMAL_HEALTHCARE_CASESTUDY.webp" -o "customer-images-all/animal-health-products-hero.webp"

echo "30. Downloading Petrochemical hero..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/9SkYQlgxFPvSGYDoNxZfc/ccd66e507ce96cc327eef31f8ac523af/PETROCHEM_CASESTUDY.webp" -o "customer-images-all/petrochemical-hero.webp"

echo "31. Downloading Global FMCG hero..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/5fDuShonDSEUmK0XV3Bdkn/407f2b4d0ac91c73a292a92df63e3296/FMCG_CASESTUDY.webp" -o "customer-images-all/global-fmcg-hero.webp"

echo "32. Downloading Pharmaceutical hero..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/qF9Rf9aTl3c8rljQXQdOO/92ca63c38197552f0d7a42914e93636a/PHARMA_CASESTUDY.webp" -o "customer-images-all/pharmaceutical-hero.webp"

echo "33. Downloading Science & Technology hero..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/56PDdaSTTetgIZ2zVkIYET/ecda5bfa05de29e8edbd100708a80304/SCIENCE_TECH_CASESTUDY.webp" -o "customer-images-all/science-technology-hero.webp"

echo "34. Downloading Global FMCG hero..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/7dj1CiF3Gqym56Esf1sgXc/06b5771906aa75c3ab22845614ab683a/GLOBAL_FMCG_CASESTUDY.webp" -o "customer-images-all/global-fmcg-hero.webp"

echo "35. Downloading Alcon hero..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/6kv20bqti7D8j8Dqgt0mN8/289f0ad44d3bdcc44af0ff6b276fd406/ALCON_EY_THUMB.png" -o "customer-images-all/alcon-hero.png"

echo "36. Downloading Alcon logo..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/67fN5yqxYybANtIa9SJzTi/c9d802ce72b7608fb9071a72c27971d3/EY_1.png" -o "customer-images-all/alcon-logo.png"

echo "37. Downloading Manufacturing hero..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/3alLnWk4qtYLl88qnFFK60/ff21d1c369dd24f129b89fdd6f4ef7ee/MANUFACTURING_CASESTUDY.jpg" -o "customer-images-all/manufacturing-hero.jpg"

echo "✅ All images downloaded to customer-images-all/"
