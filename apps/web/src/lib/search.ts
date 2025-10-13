import { loadProjects, loadCaseStudies, loadPosts } from '@/lib/api';
import { asPlainText } from '@/utils/prismic';

export type SearchDocument = {
  title: string;
  url: string;
  type: 'project' | 'caseStudy' | 'post';
  summary: string;
};

export async function createSearchIndex(): Promise<SearchDocument[]> {
  const [projects, caseStudies, posts] = await Promise.all([
    loadProjects(),
    loadCaseStudies(),
    loadPosts(),
  ]);

  return [
    ...projects
      .filter((project) => project.uid)
      .map((project) => ({
        title: project.data.title,
        url: `/work/${project.uid}`,
        type: 'project' as const,
        summary: asPlainText(project.data.summary as any, 180),
      })),
    ...caseStudies
      .filter((study) => study.uid)
      .map((study) => ({
        title: study.data.title,
        url: `/case-study/${study.uid}`,
        type: 'caseStudy' as const,
        summary: asPlainText(study.data.hero_description as any, 180),
      })),
    ...posts
      .filter((post) => post.uid)
      .map((post) => ({
        title: post.data.title,
        url: `/blog/${post.uid}`,
        type: 'post' as const,
        summary: post.data.excerpt ?? 'Writing from Alex Waters.',
      })),
  ];
}
