import type {
  ProjectDocument,
  CaseStudyDocument,
  PostDocument,
  SettingsDocument,
  NavigationDocument,
  TagDocument,
  SkillDocument,
} from './prismic-schemas';
import { createClient } from './prismic';
import {
  projectMocks,
  caseStudyMocks,
  postMocks,
  settingsMock,
  navigationMock,
  tagMocks,
  skillMocks,
} from '@/mocks/documents';

function isPrismicUnavailable(error: unknown) {
  if (typeof process !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.warn('[prismic] Falling back to mocks', error);
  }
  return true;
}

export async function loadProjects(): Promise<ProjectDocument[]> {
  try {
    const client = createClient();
    return await client.getAllByType('project') as any;
  } catch (error) {
    if (isPrismicUnavailable(error)) {
      return projectMocks;
    }
    throw error;
  }
}

export async function loadProject(uid: string): Promise<ProjectDocument | null> {
  try {
    const client = createClient();
    return await client.getByUID('project', uid) as any;
  } catch (error) {
    if (isPrismicUnavailable(error)) {
      return projectMocks.find((project) => project.uid === uid) ?? null;
    }
    throw error;
  }
}

export async function loadCaseStudies(): Promise<CaseStudyDocument[]> {
  try {
    const client = createClient();
    return await client.getAllByType('case_study') as any;
  } catch (error) {
    if (isPrismicUnavailable(error)) {
      return caseStudyMocks;
    }
    throw error;
  }
}

export async function loadCaseStudy(uid: string): Promise<CaseStudyDocument | null> {
  try {
    const client = createClient();
    return await client.getByUID('case_study', uid) as any;
  } catch (error) {
    if (isPrismicUnavailable(error)) {
      return caseStudyMocks.find((study) => study.uid === uid) ?? null;
    }
    throw error;
  }
}

export async function loadPosts(): Promise<PostDocument[]> {
  try {
    const client = createClient();
    return await client.getAllByType('post') as any;
  } catch (error) {
    if (isPrismicUnavailable(error)) {
      return postMocks;
    }
    throw error;
  }
}

export async function loadPost(uid: string): Promise<PostDocument | null> {
  try {
    const client = createClient();
    return await client.getByUID('post', uid) as any;
  } catch (error) {
    if (isPrismicUnavailable(error)) {
      return postMocks.find((post) => post.uid === uid) ?? null;
    }
    throw error;
  }
}

export async function loadSettings(): Promise<SettingsDocument | null> {
  try {
    const client = createClient();
    return await client.getSingle('settings') as any;
  } catch (error) {
    if (isPrismicUnavailable(error)) {
      return settingsMock;
    }
    throw error;
  }
}

export async function loadNavigation(): Promise<NavigationDocument | null> {
  try {
    const client = createClient();
    return await client.getSingle('navigation') as any;
  } catch (error) {
    if (isPrismicUnavailable(error)) {
      return navigationMock;
    }
    throw error;
  }
}

export async function loadTags(): Promise<TagDocument[]> {
  try {
    const client = createClient();
    return await client.getAllByType('tag') as any;
  } catch (error) {
    if (isPrismicUnavailable(error)) {
      return tagMocks;
    }
    throw error;
  }
}

export async function loadSkills(): Promise<SkillDocument[]> {
  try {
    const client = createClient();
    return await client.getAllByType('skill') as any;
  } catch (error) {
    if (isPrismicUnavailable(error)) {
      return skillMocks;
    }
    throw error;
  }
}
