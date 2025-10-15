#!/usr/bin/env node

/**
 * Upload placeholder content to Prismic
 * Run with: node scripts/upload-content.mjs
 */

import * as prismic from '@prismicio/client';
import { config } from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
config({ path: resolve(__dirname, '../.env.local') });

const repositoryName = process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME;
const accessToken = process.env.PRISMIC_ACCESS_TOKEN;

if (!repositoryName || !accessToken) {
  console.error('❌ Missing required environment variables');
  console.error('   NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME:', repositoryName ? '✓' : '✗');
  console.error('   PRISMIC_ACCESS_TOKEN:', accessToken ? '✓' : '✗');
  process.exit(1);
}

const endpoint = prismic.getRepositoryEndpoint(repositoryName);
const client = prismic.createClient(endpoint, {
  accessToken,
  routes: [
    { type: 'project', path: '/work/:uid' },
    { type: 'case_study', path: '/case-study/:uid' },
    { type: 'post', path: '/blog/:uid' },
  ],
});

console.log('🚀 Starting content upload to Prismic...');
console.log(`📦 Repository: ${repositoryName}`);
console.log(`🔗 Endpoint: ${endpoint}\n`);

// Helper to create rich text
const richText = (text) => [
  {
    type: 'paragraph',
    text,
    spans: [],
  },
];

// Content to upload
const content = {
  settings: {
    id: 'settings',
    type: 'settings',
    data: {
      site_title: 'Alex Waters — Principal Creative Technologist',
      site_description: richText(
        'Alex Waters collaborates with design-forward teams to shape expressive, high-performance product experiences.'
      ),
      og_image: null,
      color_primary: '#0b1120',
      color_secondary: '#1f2937',
      color_accent: '#f97316',
      font_primary: 'Space Grotesk, Inter, sans-serif',
      font_secondary: 'Fraunces, Georgia, serif',
    },
  },
  navigation: {
    id: 'navigation',
    type: 'navigation',
    data: {
      items: [
        { label: 'Work', link: { link_type: 'Web', url: '/work' } },
        { label: 'About', link: { link_type: 'Web', url: '/about' } },
        { label: 'Case Studies', link: { link_type: 'Web', url: '/case-study' } },
        { label: 'Writing', link: { link_type: 'Web', url: '/blog' } },
      ],
      social_links: [
        {
          platform: 'LinkedIn',
          url: { link_type: 'Web', url: 'https://www.linkedin.com/in/alexwaters' },
        },
        {
          platform: 'Dribbble',
          url: { link_type: 'Web', url: 'https://dribbble.com/awaters' },
        },
      ],
    },
  },
  projects: [
    {
      id: 'project-guilded',
      uid: 'guilded-platform-refresh',
      type: 'project',
      lang: 'en-us',
      tags: ['featured'],
      data: {
        title: 'Guilded Platform Refresh',
        summary: richText(
          'Led the comprehensive redesign of Guilded's community platform, introducing a modern visual language and improved navigation patterns that increased user engagement by 40%.'
        ),
        services: [
          { label: 'Product Design' },
          { label: 'Design Systems' },
          { label: 'Frontend Architecture' },
        ],
        roles: [{ label: 'Principal Designer' }, { label: 'Technical Lead' }],
        year: 2024,
        client: 'Guilded',
        duration: '8 months',
        links: [],
        tags: [],
        skills: [],
        metrics: [
          { label: 'User Engagement', value: '+40%', context: 'Increase in daily active users' },
          { label: 'Performance', value: '2.5s', context: 'Average load time improvement' },
          { label: 'Team Size', value: '12', context: 'Cross-functional contributors' },
        ],
        gallery: [],
        body: [],
      },
    },
    {
      id: 'project-vesto',
      uid: 'vesto-wealth',
      type: 'project',
      lang: 'en-us',
      tags: ['featured'],
      data: {
        title: 'Vesto Wealth Orchestration',
        summary: richText(
          'Designed and built a sophisticated wealth management platform that simplifies complex financial operations through intuitive interfaces and real-time data visualization.'
        ),
        services: [
          { label: 'UX Research' },
          { label: 'Product Strategy' },
          { label: 'System Design' },
        ],
        roles: [{ label: 'Design Lead' }, { label: 'Strategy Consultant' }],
        year: 2023,
        client: 'Vesto',
        duration: '6 months',
        links: [],
        tags: [],
        skills: [],
        metrics: [
          { label: 'AUM Growth', value: '+250M', context: 'Assets under management increase' },
          { label: 'Client Satisfaction', value: '4.8/5', context: 'Average user rating' },
        ],
        gallery: [],
        body: [],
      },
    },
    {
      id: 'project-tona',
      uid: 'tona-guilded',
      type: 'project',
      lang: 'en-us',
      tags: [],
      data: {
        title: 'Tona Guilded Campaigns',
        summary: richText(
          'Created dynamic campaign experiences for Guilded's partnership initiatives, focusing on community engagement and brand storytelling.'
        ),
        services: [{ label: 'Creative Direction' }, { label: 'Motion Design' }],
        roles: [{ label: 'Creative Director' }],
        year: 2023,
        client: 'Tona x Guilded',
        duration: '3 months',
        links: [],
        tags: [],
        skills: [],
        metrics: [
          { label: 'Reach', value: '2M+', context: 'Total impressions' },
          { label: 'Conversion', value: '8.5%', context: 'Campaign CTR' },
        ],
        gallery: [],
        body: [],
      },
    },
  ],
  posts: [
    {
      id: 'post-design-systems',
      uid: 'building-design-systems-scale',
      type: 'post',
      lang: 'en-us',
      tags: ['design-systems', 'frontend'],
      data: {
        title: 'Building Design Systems at Scale',
        excerpt: richText(
          'Lessons learned from architecting design systems for teams of 100+ engineers across multiple product lines.'
        ),
        publish_date: '2024-09-15',
        author: 'Alex Waters',
        cover: null,
        body: [],
      },
    },
    {
      id: 'post-product-thinking',
      uid: 'product-thinking-technical-teams',
      type: 'post',
      lang: 'en-us',
      tags: ['product', 'leadership'],
      data: {
        title: 'Product Thinking for Technical Teams',
        excerpt: richText(
          'How to bridge the gap between technical excellence and user-centered product development.'
        ),
        publish_date: '2024-08-22',
        author: 'Alex Waters',
        cover: null,
        body: [],
      },
    },
  ],
};

// Upload function using Prismic's Write API
async function uploadDocument(doc) {
  try {
    const url = `${endpoint}/documents`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'repository': repositoryName,
      },
      body: JSON.stringify(doc),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HTTP ${response.status}: ${error}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`   ❌ Failed: ${error.message}`);
    throw error;
  }
}

// Main upload process
async function main() {
  let successCount = 0;
  let errorCount = 0;

  // Upload Settings
  console.log('📄 Uploading Settings...');
  try {
    await uploadDocument(content.settings);
    console.log('   ✅ Settings uploaded');
    successCount++;
  } catch (error) {
    console.error('   ❌ Settings failed:', error.message);
    errorCount++;
  }

  // Upload Navigation
  console.log('\n📄 Uploading Navigation...');
  try {
    await uploadDocument(content.navigation);
    console.log('   ✅ Navigation uploaded');
    successCount++;
  } catch (error) {
    console.error('   ❌ Navigation failed:', error.message);
    errorCount++;
  }

  // Upload Projects
  console.log('\n📦 Uploading Projects...');
  for (const project of content.projects) {
    try {
      await uploadDocument(project);
      console.log(`   ✅ ${project.data.title}`);
      successCount++;
    } catch (error) {
      console.error(`   ❌ ${project.data.title}:`, error.message);
      errorCount++;
    }
  }

  // Upload Posts
  console.log('\n📝 Uploading Blog Posts...');
  for (const post of content.posts) {
    try {
      await uploadDocument(post);
      console.log(`   ✅ ${post.data.title}`);
      successCount++;
    } catch (error) {
      console.error(`   ❌ ${post.data.title}:`, error.message);
      errorCount++;
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log(`✨ Upload Complete!`);
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log('='.repeat(50));

  if (errorCount > 0) {
    console.log('\n⚠️  Note: Prismic Write API may require documents to be created');
    console.log('   through the Prismic dashboard first, or use the Migration API.');
    console.log('   Check https://prismic.io/docs/migration-api for details.');
  }
}

main().catch((error) => {
  console.error('\n💥 Fatal error:', error);
  process.exit(1);
});
