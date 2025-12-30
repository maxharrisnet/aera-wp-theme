# ACF Field Label Change Needed

## ⚠️ Manual Update Required

After importing skills, you need to update the ACF field label for better clarity:

### Field to Update:
**Field Group:** `group_aera_skill` (Skill Fields)

**Current Label:** "How Aera Helps"
**Change To:** "Features" or "Value Propositions" or "Benefits"

### Files to Update:

1. **ACF JSON:** `acf-json/group_aera_skill.json`
   - Line ~126-137: Change `field_how_aera_helps_tab` label
   - Line ~136-145: Change `field_how_aera_helps_title` label
   - Line ~147-183: Change `field_how_aera_helps_items` label

2. **Or via WordPress Admin:**
   - Custom Fields → Field Groups → "Skill Fields"
   - Edit the "How Aera Helps" tab/fields
   - Change labels to "Features" or your preferred term
   - Save and export to update JSON

### Recommended Label:
**"Features"** - Clear, concise, and matches the data structure (Understands/Recommends/Acts/Learns)

### Note:
The import script will use `how_aera_helps_items` field name (unchanged) but with a more appropriate admin label.

