#!/usr/bin/env node
/**
 * Export Blog Content from Contentful
 *
 * Exports Community Template Page and Community Card entries from Contentful
 * using the Management API.
 *
 * Usage:
 *   node scripts/export-contentful-blogs.js
 *
 * Requires:
 *   - CONTENTFUL_MANAGEMENT_TOKEN environment variable
 *   - Or set it in .env file
 */

// Try to load dotenv if available
try {
  require('dotenv').config();
} catch (e) {
  // dotenv not installed, that's OK
}

const contentful = require('contentful-management');
const fs = require('fs');
const path = require('path');

const SPACE_ID = 'mh1amgo8m7ts';
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN || process.env.CONTENTFUL_MANAGEMENT_API_TOKEN;

if (!MANAGEMENT_TOKEN) {
  console.error('Error: CONTENTFUL_MANAGEMENT_TOKEN environment variable is required');
  console.error('Get your token from: https://app.contentful.com/spaces/' + SPACE_ID + '/api/keys');
  process.exit(1);
}

async function exportBlogs() {
  console.log('Connecting to Contentful...');
  const client = contentful.createClient({
    accessToken: MANAGEMENT_TOKEN,
  });

  try {
    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment('master');

    console.log('Fetching Community Template Pages...');
    let templatePages;
    try {
      templatePages = await environment.getEntries({
        content_type: 'communityTemplatePage',
        limit: 1000,
        include: 10, // Include linked entries and assets
      });
      console.log(`Found ${templatePages.items.length} template pages`);
    } catch (e) {
      console.error('Failed to fetch template pages:', e.message);
      throw e;
    }

    console.log('Fetching Community Cards...');
    let cards;
    try {
      cards = await environment.getEntries({
        content_type: 'communityCard',
        limit: 1000,
        include: 10,
      });
      console.log(`Found ${cards.items.length} cards`);
    } catch (e) {
      console.error('Failed to fetch cards:', e.message);
      // Cards might not exist, so continue anyway
      cards = { items: [] };
    }

    // Collect all asset IDs
    const assetIds = new Set();
    const collectAssetIds = (item) => {
      if (item.sys?.type === 'Link' && item.sys?.linkType === 'Asset') {
        assetIds.add(item.sys.id);
      }
      if (item.fields) {
        Object.values(item.fields).forEach(field => {
          Object.values(field || {}).forEach(value => {
            if (value?.sys) {
              collectAssetIds(value.sys);
            }
            if (Array.isArray(value)) {
              value.forEach(v => {
                if (v?.sys) collectAssetIds(v.sys);
              });
            }
          });
        });
      }
    };

    [...templatePages.items, ...cards.items].forEach(item => {
      collectAssetIds(item);
    });

    console.log(`Found ${assetIds.size} unique asset references`);

    // Get content types
    console.log('Fetching content types...');
    let templatePageCt, cardCt;
    try {
      templatePageCt = await environment.getContentType('communityTemplatePage');
    } catch (e) {
      console.error('Failed to fetch communityTemplatePage content type:', e.message);
      throw e;
    }

    try {
      cardCt = await environment.getContentType('communityCard');
    } catch (e) {
      console.warn('⚠️  Could not fetch communityCard content type (may not exist):', e.message);
      // Continue without card content type
      cardCt = null;
    }

    // Get all assets
    console.log('Fetching assets...');
    const assets = [];
    let count = 0;
    const assetErrors = [];
    for (const assetId of assetIds) {
      try {
        const asset = await environment.getAsset(assetId);
        assets.push({
          sys: asset.sys,
          fields: asset.fields,
        });
        count++;
        if (count % 10 === 0) {
          process.stdout.write(`\rFetched ${count}/${assetIds.size} assets...`);
        }
      } catch (e) {
        assetErrors.push({ id: assetId, error: e.message });
        // Continue with other assets
      }
    }
    console.log(`\nFetched ${assets.length} assets`);
    if (assetErrors.length > 0) {
      console.warn(`⚠️  ${assetErrors.length} assets could not be fetched (this is usually OK)`);
    }

    // Create export structure matching Contentful export format
    const exportData = {
      entries: [
        ...templatePages.items.map(item => ({
          sys: item.sys,
          fields: item.fields,
        })),
        ...cards.items.map(item => ({
          sys: item.sys,
          fields: item.fields,
        })),
      ],
      assets: assets,
      contentTypes: [
        {
          sys: templatePageCt.sys,
          fields: templatePageCt.fields,
        },
        ...(cardCt ? [{
          sys: cardCt.sys,
          fields: cardCt.fields,
        }] : []),
      ],
    };

    // Save export
    const outputDir = path.resolve(__dirname, '../export_blogs_sample');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0] + 'T' +
                      new Date().toISOString().replace(/[:.]/g, '-').split('T')[1].split('.')[0];
    const filename = `contentful-export-blogs-${timestamp}.json`;
    const filepath = path.join(outputDir, filename);

    fs.writeFileSync(filepath, JSON.stringify(exportData, null, 2));

    console.log('\n✅ Export complete!');
    console.log(`📁 Saved to: ${filepath}`);
    console.log(`\n📊 Summary:`);
    console.log(`   Template Pages: ${templatePages.items.length}`);
    console.log(`   Cards: ${cards.items.length}`);
    console.log(`   Published Cards: ${cards.items.filter(c => c.sys?.publishedAt).length}`);
    console.log(`   Assets: ${assets.length}`);
  } catch (error) {
    console.error('\n❌ Export failed!');
    if (error.name === 'ContentfulMultiError') {
      console.error('Multiple errors occurred:');
      error.errors.forEach((err, i) => {
        console.error(`\nError ${i + 1}:`);
        console.error('  Message:', err.message);
        console.error('  Details:', err.details);
        if (err.sys) {
          console.error('  System:', err.sys);
        }
      });
    } else {
      console.error('Error:', error.message);
      if (error.stack) {
        console.error('\nStack trace:');
        console.error(error.stack);
      }
      if (error.response) {
        console.error('\nAPI Response:', error.response);
      }
    }
    process.exit(1);
  }
}

exportBlogs();
