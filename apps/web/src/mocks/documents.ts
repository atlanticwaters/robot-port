import type {
  ProjectDocument,
  CaseStudyDocument,
  PostDocument,
  SettingsDocument,
  NavigationDocument,
  TagDocument,
  SkillDocument,
} from '@/lib/prismic-schemas';

const richText = (text: string): ProjectDocument['data']['summary'] => [
  {
    type: 'paragraph',
    text,
    spans: [],
  },
];

export const tagMocks: TagDocument[] = [
  {
    id: 'tag-product-strategy',
    uid: 'product-strategy',
    type: 'tag',
    data: {
      label: 'Product Strategy',
      description: 'Bringing clarity to long-term product roadmaps.',
      color: '#0ea5e9',
    },
  },
  {
    id: 'tag-motion',
    uid: 'motion-design',
    type: 'tag',
    data: {
      label: 'Motion Design',
      description: 'Narrative motion to guide complex systems.',
      color: '#a855f7',
    },
  },
  {
    id: 'tag-platforms',
    uid: 'platforms',
    type: 'tag',
    data: {
      label: 'Platforms',
      description: 'Multi-surface platform orchestration.',
      color: '#f97316',
    },
  },
];

export const skillMocks: SkillDocument[] = [
  {
    id: 'skill-creative-direction',
    uid: 'creative-direction',
    type: 'skill',
    data: {
      label: 'Creative Direction',
      description: 'Setting narrative and thematic direction across experiences.',
      category: 'Design',
      color: '#0f172a',
    },
  },
  {
    id: 'skill-systems-architecture',
    uid: 'systems-architecture',
    type: 'skill',
    data: {
      label: 'Systems Architecture',
      description: 'Composing design and engineering systems for velocity.',
      category: 'Engineering',
      color: '#334155',
    },
  },
  {
    id: 'skill-facilitation',
    uid: 'facilitation',
    type: 'skill',
    data: {
      label: 'Facilitation',
      description: 'Guiding stakeholders to co-create outcomes.',
      category: 'Leadership',
      color: '#ef4444',
    },
  },
];

export const projectMocks: ProjectDocument[] = [
  {
    id: 'project-guilded',
    uid: 'guilded-platform-refresh',
    type: 'project',
    lang: 'en-us',
    tags: ['platforms', 'motion'],
    data: {
      title: 'Guilded platform refresh',
      summary: richText(
        'Re-architected Guilded’s cross-platform experience with a new membership model and coherent visual language.',
      ),
      cover: {
        url: 'https://images.prismic.io/robot-port/projects/guilded-cover.jpg',
        alt: 'Guilded marketing screens',
        copyright: null,
      },
      services: [{ label: 'Product Strategy' }, { label: 'Design System' }],
      roles: [{ label: 'Creative Director' }, { label: 'Product Design Lead' }],
      year: 2024,
      client: 'Guilded',
      duration: '12 weeks',
      links: [
        {
          label: 'Explore project',
          url: { link_type: 'Web', url: 'https://guilded.com', target: '_blank' },
        },
      ],
      tags: tagMocks.slice(0, 2).map((tag) => ({ tag })),
      skills: skillMocks.slice(0, 2).map((skill) => ({ skill })),
      metrics: [
        { label: 'Activation', value: '+36%', context: 'Increase in first-week engagement' },
        { label: 'Launch velocity', value: '10 weeks', context: 'Strategy through build' },
      ],
      gallery: [
        {
          media: {
            url: 'https://images.prismic.io/robot-port/projects/guilded-dashboard.jpg',
            alt: 'Dashboard redesign',
            copyright: null,
          },
          caption: 'Unified operations dashboard across web & mobile.',
        },
      ],
      seo: [
        {
          meta_title: 'Guilded platform refresh — Alex Waters',
          meta_description: 'Driving platform growth and retention through a new membership model.',
          og_image: null,
        },
      ],
      body: [],
    },
  },
  {
    id: 'project-vesto',
    uid: 'vesto-wealth',
    type: 'project',
    lang: 'en-us',
    tags: ['product', 'strategy'],
    data: {
      title: 'Vesto wealth orchestration',
      summary: richText(
        'Partnered with Vesto to craft a trust-forward mobile experience for private wealth clients and advisors.',
      ),
      cover: {
        url: 'https://images.prismic.io/robot-port/projects/vesto-cover.jpg',
        alt: 'Vesto mobile app',
        copyright: null,
      },
      services: [{ label: 'Journey Mapping' }, { label: 'Prototype Engineering' }],
      roles: [{ label: 'Product Design Lead' }, { label: 'Principal Engineer' }],
      year: 2023,
      client: 'Vesto',
      duration: '16 weeks',
      links: [
        {
          label: 'Case study',
          url: { link_type: 'Document', id: 'case-study-vesto', type: 'case_study', uid: 'vesto' },
        },
      ],
      tags: tagMocks.slice(0, 1).map((tag) => ({ tag })),
      skills: skillMocks.map((skill) => ({ skill })),
      metrics: [
        { label: 'Client NPS', value: '+22', context: 'After beta launch' },
        { label: 'Advisor efficiency', value: 'x1.8', context: 'Workflow throughput' },
      ],
      gallery: [],
      seo: [],
      body: [],
    },
  },
  {
    id: 'project-tona',
    uid: 'tona-guilded',
    type: 'project',
    lang: 'en-us',
    tags: ['motion'],
    data: {
      title: 'Tona Guilded campaigns',
      summary: richText(
        'Directed motion-led launch campaigns to position Guilded as the home for advanced esports teams.',
      ),
      cover: {
        url: 'https://images.prismic.io/robot-port/projects/tona-cover.jpg',
        alt: 'Campaign visuals',
        copyright: null,
      },
      services: [{ label: 'Motion Direction' }, { label: 'Narrative Design' }],
      roles: [{ label: 'Director' }, { label: 'Producer' }],
      year: 2022,
      client: 'Tona',
      duration: '6 weeks',
      links: [],
      tags: tagMocks.slice(1, 2).map((tag) => ({ tag })),
      skills: [{ skill: skillMocks[0] }],
      metrics: [
        { label: 'Organic reach', value: '4.2M', context: 'Across primary channels' },
      ],
      gallery: [],
      seo: [],
      body: [],
    },
  },
];

export const caseStudyMocks: CaseStudyDocument[] = [
  {
    id: 'case-study-guilded',
    uid: 'guilded',
    type: 'case_study',
    lang: 'en-us',
    data: {
      title: 'Guilded — Building momentum for competitive teams',
      hero_kicker: 'Guilded',
      hero_headline: 'Reorienting the platform around competitive squads',
      hero_description: richText(
        'We transformed Guilded’s product narrative and delivered a cross-platform system aligned with fast-moving communities.',
      ),
      hero_media: {
        url: 'https://images.prismic.io/robot-port/case-studies/guilded-hero.jpg',
        alt: 'Guilded hero image',
        copyright: null,
      },
      problem_statement: richText('Legacy flows and inconsistent surfaces slowed team onboarding and retention.'),
      approach: richText(
        'Established a shared north star, prototyped critical flows, and shipped a refreshed design system.',
      ),
      outcomes: richText('Meaningful lifts in activation, retention, and community sentiment in under a quarter.'),
      metrics: [
        { label: 'Activation', value: '+36%', context: 'Week-one engagement' },
        { label: 'Retention', value: '+18%', context: 'Week-eight retention' },
      ],
      related_projects: projectMocks.map((project) => ({ project })),
      seo: [],
      body: [],
    },
  },
];

export const postMocks: PostDocument[] = [
  {
    id: 'post-motion-systems',
    uid: 'designing-motion-systems',
    type: 'post',
    lang: 'en-us',
    data: {
      title: 'Designing motion systems for trust',
      excerpt:
        'How to build expressive yet accountable motion systems that scale across large product surfaces.',
      author: 'Alex Waters',
      reading_time: 7,
      published_at: '2024-04-12T09:00:00+0000',
      tags: tagMocks.slice(1, 2).map((tag) => ({ tag })),
      canonical_url: { link_type: 'Web', url: 'https://alexwaters.design/blog/motion-systems' },
      seo: [
        {
          meta_title: 'Designing motion systems for trust',
          meta_description: 'Principles for building accountable motion languages.',
          og_image: null,
        },
      ],
      body: [],
    },
  },
  {
    id: 'post-integrated-research',
    uid: 'integrated-research-loops',
    type: 'post',
    lang: 'en-us',
    data: {
      title: 'Integrating research loops into product delivery',
      excerpt: 'Embedding research rituals alongside weekly product cadences.',
      author: 'Alex Waters',
      reading_time: 6,
      published_at: '2024-01-28T09:00:00+0000',
      tags: tagMocks.slice(0, 1).map((tag) => ({ tag })),
      canonical_url: null,
      seo: [],
      body: [],
    },
  },
];

export const settingsMock: SettingsDocument = {
  id: 'settings-default',
  type: 'settings',
  data: {
    site_title: 'Alex Waters — Principal Creative Technologist',
    site_description:
      'Alex Waters collaborates with design-forward teams to shape expressive, high-performance product experiences.',
    tagline: 'Creative technology leadership for expressive products.',
    contact_email: 'hello@alexwaters.design',
    default_og_image: {
      url: 'https://images.prismic.io/robot-port/settings/default-og.jpg',
      alt: 'Alex Waters portfolio',
      copyright: null,
    },
    primary_color: '#0b1120',
    secondary_color: '#1f2937',
    accent_color: '#f97316',
    typeface_primary: 'Space Grotesk, Inter, sans-serif',
    typeface_secondary: 'Fraunces, Georgia, serif',
    analytics_provider: 'Plausible',
    analytics_id: 'awaters.design',
    social_links: [
      {
        label: 'LinkedIn',
        url: { link_type: 'Web', url: 'https://www.linkedin.com/in/alexwaters', target: '_blank' },
        icon: 'linkedin',
      },
      {
        label: 'Dribbble',
        url: { link_type: 'Web', url: 'https://dribbble.com/awaters', target: '_blank' },
        icon: 'dribbble',
      },
      {
        label: 'GitHub',
        url: { link_type: 'Web', url: 'https://github.com/awaters', target: '_blank' },
        icon: 'github',
      },
    ],
    seo_defaults: [
      {
        meta_title_suffix: ' · Alex Waters',
        meta_description:
          'Principal creative technologist designing expressive, high-performance digital products.',
        twitter_handle: '@alexwaters',
      },
    ],
  },
};

export const navigationMock: NavigationDocument = {
  id: 'navigation-default',
  type: 'navigation',
  data: {
    primary_navigation: [
      { label: 'Work', link: { link_type: 'Web', url: '/work' }, description: 'Selected engagements' },
      { label: 'About', link: { link_type: 'Web', url: '/about' }, description: 'Practice & approach' },
      { label: 'Case Studies', link: { link_type: 'Web', url: '/case-study' }, description: 'Deep dives' },
      { label: 'Writing', link: { link_type: 'Web', url: '/blog' }, description: 'Notes & essays' }
    ],
    secondary_navigation: [
      { label: 'Contact', link: { link_type: 'Web', url: '/contact' } },
      { label: 'Capabilities', link: { link_type: 'Web', url: '/about#capabilities' } }
    ],
    footer_navigation: [
      {
        section_label: 'Work',
        label: 'Guilded',
        link: { link_type: 'Web', url: '/work/guilded-platform-refresh' }
      },
      {
        section_label: 'Work',
        label: 'Vesto',
        link: { link_type: 'Web', url: '/work/vesto-wealth' }
      },
      {
        section_label: 'Company',
        label: 'About',
        link: { link_type: 'Web', url: '/about' }
      }
    ],
    social_links: [
      {
        label: 'LinkedIn',
        link: { link_type: 'Web', url: 'https://www.linkedin.com/in/alexwaters', target: '_blank' },
        icon: 'linkedin'
      },
      {
        label: 'Dribbble',
        link: { link_type: 'Web', url: 'https://dribbble.com/awaters', target: '_blank' },
        icon: 'dribbble'
      }
    ]
  }
};
