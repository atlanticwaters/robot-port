#!/usr/bin/env node

/**
 * Push custom types to Prismic using the Custom Types API
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const REPO_NAME = 'fairway';
const ACCESS_TOKEN = 'MC5hTzdvSHhJQUFCOEFaYlBq.77-977-977-9E--_vUbvv73vv70e77-9Fe-_ve-_ve-_vTjvv71R77-977-977-977-977-977-977-977-9P--_ve-_vW4A77-977-9';

const customTypes = ['settings', 'navigation', 'project', 'post'];

async function pushCustomType(typeName) {
  const filePath = resolve(__dirname, `customtypes/${typeName}/index.json`);
  const typeData = JSON.parse(readFileSync(filePath, 'utf-8'));

  const url = `https://customtypes.prismic.io/customtypes/${typeData.id}`;

  console.log(`\n📦 Pushing custom type: ${typeName}`);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'repository': REPO_NAME,
      },
      body: JSON.stringify(typeData),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HTTP ${response.status}: ${error}`);
    }

    const result = await response.json();
    console.log(`   ✅ ${typeName} pushed successfully`);
    return result;
  } catch (error) {
    console.error(`   ❌ ${typeName} failed:`, error.message);
    throw error;
  }
}

async function main() {
  console.log('🚀 Pushing custom types to Prismic...');
  console.log(`📦 Repository: ${REPO_NAME}\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const typeName of customTypes) {
    try {
      await pushCustomType(typeName);
      successCount++;
    } catch (error) {
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`✨ Push Complete!`);
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log('='.repeat(50));

  if (successCount > 0) {
    console.log('\n🎉 Custom types are now in Prismic!');
    console.log('   Next: Create documents at https://fairway.prismic.io');
  }
}

main().catch((error) => {
  console.error('\n💥 Fatal error:', error);
  process.exit(1);
});
