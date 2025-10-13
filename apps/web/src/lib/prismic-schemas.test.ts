import { describe, expect, it } from 'vitest';
import { projectDocumentSchema, tagDocumentSchema } from './prismic-schemas';
import { projectMocks, tagMocks } from '@mocks/documents';

describe('prismic schemas', () => {
  it('parses project documents', () => {
    const result = projectDocumentSchema.parse(projectMocks[0]);
    expect(result.data.title).toBeDefined();
    expect(result.data.metrics).toHaveLength(2);
  });

  it('parses tag documents', () => {
    const tag = tagDocumentSchema.parse(tagMocks[0]);
    expect(tag.data.label).toBe('Product Strategy');
  });
});
