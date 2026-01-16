# How to Get Your Contentful Management API Token

## Step 1: Go to Contentful API Keys

1. Open: https://app.contentful.com/spaces/mh1amgo8m7ts/api/keys
2. Click on the **"Content management tokens"** tab (NOT "Content delivery tokens")
3. You'll see a list of existing tokens, or click **"Generate personal token"**

## Step 2: Create a New Token

1. Click **"Generate personal token"** or **"Create token"**
2. Give it a name like "Blog Export Script"
3. Click **"Generate"**
4. **IMPORTANT**: Copy the token immediately - you won't be able to see it again!

## Step 3: Use the Token

### Option A: Set as environment variable (recommended)
```bash
export CONTENTFUL_MANAGEMENT_TOKEN="your-actual-token-here"
node scripts/export-contentful-blogs.js
```

### Option B: Create a .env file
```bash
# Create .env file in the theme root
echo "CONTENTFUL_MANAGEMENT_TOKEN=your-actual-token-here" > .env
node scripts/export-contentful-blogs.js
```

### Option C: Pass directly in the command
```bash
CONTENTFUL_MANAGEMENT_TOKEN="your-actual-token-here" node scripts/export-contentful-blogs.js
```

## Important Notes

- **Management API tokens** are different from **Content Delivery API tokens**
- Management tokens have full access to your content (read/write)
- Keep them secure - don't commit them to git
- If you lose a token, you'll need to create a new one

## Quick Test

Once you have the token set, test it:

```bash
CONTENTFUL_MANAGEMENT_TOKEN="your-token" node -e "
const contentful = require('contentful-management');
const client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN
});
client.getSpace('mh1amgo8m7ts')
  .then(space => {
    console.log('✅ Token is valid!');
    console.log('Space:', space.name);
  })
  .catch(err => {
    console.error('❌ Error:', err.message);
  });
"
```
