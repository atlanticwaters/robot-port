import type { ProjectDocument, CaseStudyDocument, PostDocument, TagDocument, SkillDocument } from './prismic-schemas';
import { resolveLinkURL, asPlainText, pickLabel } from '@/utils/prismic';

export type ProjectPreview = {
  uid: string;
  title: string;
  client?: string | null;
  year?: number | null;
  summary: string;
  href: string;
  coverUrl?: string | null;
};

export function toProjectPreview(project: ProjectDocument): ProjectPreview {
  return {
    uid: project.uid ?? project.id,
    title: project.data.title,
    client: project.data.client,
    year: project.data.year,
    summary: asPlainText(project.data.summary as any, 160),
    href: resolveLinkURL(project.data.links[0]?.url as any) ?? `/work/${project.uid}`,
    coverUrl: project.data.cover?.url ?? null,
  };
}

export type CaseStudyPreview = {
  uid: string;
  title: string;
  headline: string;
  summary: string;
  coverUrl?: string | null;
};

export function toCaseStudyPreview(study: CaseStudyDocument): CaseStudyPreview {
  return {
    uid: study.uid ?? study.id,
    title: study.data.title,
    headline: study.data.hero_headline ?? study.data.title,
    summary: asPlainText(study.data.hero_description as any, 160),
    coverUrl: study.data.hero_media?.url ?? null,
  };
}

export type PostPreview = {
  uid: string;
  title: string;
  excerpt: string;
  publishedAt?: string | null;
};

export function toPostPreview(post: PostDocument): PostPreview {
  return {
    uid: post.uid ?? post.id,
    title: post.data.title,
    excerpt: post.data.excerpt ?? 'New writing from Alex Waters.',
    publishedAt: post.data.published_at ?? null,
  };
}

export type Taxonomy = {
  uid: string;
  label: string;
  color?: string | null;
};

export function toTag(tag: TagDocument): Taxonomy {
  return {
    uid: tag.uid ?? tag.id,
    label: pickLabel(tag.data.label, 'Tag'),
    color: tag.data.color ?? null,
  };
}

export function toSkill(skill: SkillDocument): Taxonomy {
  return {
    uid: skill.uid ?? skill.id,
    label: pickLabel(skill.data.label, 'Skill'),
    color: skill.data.color ?? null,
  };
}
