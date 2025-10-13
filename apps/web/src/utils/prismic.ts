import * as prismic from '@prismicio/client';
import type { LinkField, RichTextField } from '@prismicio/client';

export function resolveLinkURL(link: LinkField | null | undefined): string | null {
  if (!link) return null;
  try {
    const url = prismic.asLink(link as any);
    return url ?? (link as { url?: string }).url ?? null;
  } catch (error) {
    if (link && 'url' in link && typeof link.url === 'string') {
      return link.url;
    }
    return null;
  }
}

export function resolveUID(link: LinkField | null | undefined): string | null {
  if (!link) return null;
  if ('uid' in link && typeof link.uid === 'string') return link.uid;
  return null;
}

export function pickLabel(label?: string | null, fallback = 'Untitled'): string {
  return label?.trim() ? label : fallback;
}

export function asPlainText(field?: RichTextField | null, limit?: number): string {
  if (!field) return '';
  const text = prismic.asText(field);
  if (typeof limit === 'number' && limit > 0) {
    return text.length > limit ? `${text.slice(0, limit).trimEnd()}…` : text;
  }
  return text;
}
