#!/bin/bash
# Download module page featured images from Contentful

echo "📥 Downloading module page images from Contentful..."

mkdir -p module-images

echo "1. Downloading Aera Workspaces..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/1sA8x0aMRTKVLV5gYWEKS8/8f33bf847813b82ee3a4bad420ca067d/aeraworkspaces.png" -o "module-images/aera-workspaces.png"

echo "2. Downloading Agentic Ambient Orchestration..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/3Co483qnGwi4b0H0bks5O9/c63830ba306444f8d5561471f5d077dc/Agentic_Ambient_Orchestration.png" -o "module-images/agentic-ambient-orchestration.png"

echo "3. Downloading Decision Engines..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/oNpafmFoSptnbxQO1Z69v/69f8cf88480ca85d3771461016174598/Decision_Engines__1_.png" -o "module-images/decision-engines.png"

echo "4. Downloading Data Workbench™..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/5yASGBFISb2SAvOyDE1LkX/770f5da61e50784ed2cd5338a834d1c6/datastreams_2x.png" -o "module-images/data-workbench.png"

echo "5. Downloading Aera Control Room..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/7xdVy13XfdirhdQHDOAbd9/3b4e151eb461eb7638728a46642a954c/aeracontrolroom__1_.png" -o "module-images/aera-control-room.png"

echo "6. Downloading Aera Chat..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/2yLZwJOpkVScuTns6b3Fft/1a4760644dcf566a9dc2f8574378deac/aerachat.png" -o "module-images/aera-chat.png"

echo "7. Downloading Aera Inbox..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/3PUk7dbN67ews2WM0vDc6y/e217ed8192e55054ac318b6b7d6b6659/Decision-Workbench_v001.png" -o "module-images/aera-inbox.png"

echo "8. Downloading Aera Discovery™..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/5womnaYOJtlUTwK6niHx1U/1600be78124d4211079db1559c4ad8e7/DISCOVERY_02_3__1_.png" -o "module-images/aera-discovery.png"

echo "9. Downloading Decision Data Model™..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/2vBk3M0Or9Lz9X8vkM3P4f/939b03ce2d45a209c42b3771096f9f87/Decision-Data-Model_v001.png" -o "module-images/decision-data-model.png"

echo "10. Downloading Aera Cortex™..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/1uhXCHkKIPQwLgcV4xrYem/84a0a238f8f4fcd8b8095f1c45a0322a/Comprehensive-Model-Ops_v001.png" -o "module-images/cortex-ai-ml.png"

echo "11. Downloading Business Rules..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/6r71yNQaKMBfmEhxOCZrlS/ff33af56e1587b4b2af44531711d4363/AutomationRules__1_.png" -o "module-images/business-rules.png"

echo "12. Downloading Data Crawlers..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/4ZVI0FemVmxys7W1Qeu9by/6c7423bc35f5cc77a8420cd52e0950b8/datacrawlers_2x.png" -o "module-images/data-crawlers.png"

echo "13. Downloading Decision Board..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/4Y8MzJ17nkOtkHFR3EXHGv/07c7eacc74dd79de96911f99591b8e13/Decision-Board_v001.png" -o "module-images/decision-board.png"

echo "14. Downloading Decision Engagement..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/2owS0hyZXsh9gRdRkvQLk8/d8c139243c48acdd097d8a4c501a9473/Decision-Engagement_v001.png" -o "module-images/decision-engagement.png"

echo "15. Downloading Process Builder..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/5Mc78qy9neFX9uDobTw14v/cba8b5a9faa2e1b638f12228873216bb/processbuilder_2x.png" -o "module-images/process-builder.png"

echo "16. Downloading Simulation & Planning..."
curl -L "https://images.ctfassets.net/mh1amgo8m7ts/5QeYne2eBxMDiO7iqL9P5n/358c92354427e86d5eb08b291f69cfde/SIMULATION_02.png" -o "module-images/simulation-and-planning.png"

echo "✅ All images downloaded to module-images/"
