import type { PrismicDocument } from '@prismicio/client';

export const linkResolver = (doc: PrismicDocument) => {
  switch (doc.type) {
    case 'project':
      return `/work/${doc.uid}`;
    case 'case_study':
      return `/case-study/${doc.uid}`;
    case 'post':
      return `/blog/${doc.uid}`;
    default:
      return '/';
  }
};
