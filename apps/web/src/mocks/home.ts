export const mockedHomePage = {
  id: 'mock-home',
  type: 'settings',
  lang: 'en-us',
  data: {
    title: 'Home',
  },
  slices: [
    {
      id: 'hero-slice',
      slice_type: 'hero',
      primary: {
        eyebrow: 'Principal Creative Technologist',
        heading: 'Building expressive digital experiences for teams shaping the future.',
        subheading:
          'Alex Waters partners with product and brand leaders to launch intentional, high-performing work across platforms and channels.',
        primary_action_label: 'View work',
        primary_action_link: { link_type: 'Web', url: '/work' },
        secondary_action_label: 'Get in touch',
        secondary_action_link: { link_type: 'Web', url: '/contact' },
      },
      items: [
        { label: 'Product Design', detail: '12+ yrs' },
        { label: 'Creative Direction', detail: 'Global' },
        { label: 'Engineering', detail: 'Lead' }
      ],
    },
    {
      id: 'metrics-slice',
      slice_type: 'metrics',
      primary: {
        title: 'Impact in numbers',
        caption: 'Select highlights from cross-disciplinary engagements.'
      },
      items: [
        { label: 'Products launched', value: '28', context: 'Across fintech, media, and health.' },
        { label: 'Revenue influenced', value: '$220M', context: 'Growth unlocked via customer experience.' },
        { label: 'Teams led', value: '8', context: 'Hybrid design & engineering squads.' }
      ],
    },
    {
      id: 'cta-slice',
      slice_type: 'cta_banner',
      primary: {
        heading: 'Let’s craft the next frontier together',
        description:
          'Seeking strategic collaborations with design-forward teams. Share your brief and we’ll explore how to move fast together.',
        action_label: 'Start a project',
        action_link: { link_type: 'Web', url: '/contact' }
      },
      items: [],
    }
  ],
};
