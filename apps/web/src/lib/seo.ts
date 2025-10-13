// import type { APIRoute } from 'astro';
type APIRoute = any;

const DEFAULT_TITLE = 'Alex Waters · Principal Creative Technologist';
const DEFAULT_DESCRIPTION =
  'Principal creative technologist crafting expressive product experiences across digital platforms.';

export interface ImageMeta {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface Breadcrumb {
  label: string;
  url: string;
}

export interface FrontmatterMeta {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string | ImageMeta;
  ogType?: 'website' | 'article' | 'profile' | 'product' | string;
  twitterCard?: 'summary' | 'summary_large_image';
  noindex?: boolean;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
  breadcrumbs?: Breadcrumb[];
  tags?: string[];
}

export function resolvePageTitle(title?: string) {
  if (!title) return DEFAULT_TITLE;
  if (title === DEFAULT_TITLE) return title;
  return `${title} · Alex Waters`;
}

export function normalizeImageMeta(image?: string | ImageMeta): ImageMeta | undefined {
  if (!image) return undefined;
  if (typeof image === 'string') {
    return { url: image };
  }
  return image;
}

export function buildMetaTags(meta: FrontmatterMeta = {}) {
  const {
    title,
    description = DEFAULT_DESCRIPTION,
    canonicalUrl,
    ogImage,
    ogType = 'website',
    twitterCard = 'summary_large_image',
    noindex = false,
    tags = [],
  } = meta;

  const resolvedTitle = resolvePageTitle(title);
  const imageMeta = normalizeImageMeta(ogImage);

  const tagList = [
    ['title', resolvedTitle],
    ['meta', { name: 'description', content: description }],
    ['meta', { property: 'og:title', content: resolvedTitle }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:type', content: ogType }],
    ['meta', { name: 'twitter:card', content: twitterCard }],
    ['meta', { name: 'twitter:title', content: resolvedTitle }],
    ['meta', { name: 'twitter:description', content: description }],
    ['meta', { name: 'theme-color', content: '#0b1120' }],
  ] as const;

  const result: Array<[string, Record<string, string> | string]> = [...tagList] as any;

  if (canonicalUrl) {
    result.push(['link', { rel: 'canonical', href: canonicalUrl }]);
    result.push(['meta', { property: 'og:url', content: canonicalUrl }]);
    result.push(['meta', { name: 'twitter:url', content: canonicalUrl }]);
  }

  if (imageMeta) {
    result.push(['meta', { property: 'og:image', content: imageMeta.url }]);
    if (imageMeta.alt) result.push(['meta', { property: 'og:image:alt', content: imageMeta.alt }]);
    if (imageMeta.width) {
      result.push(['meta', { property: 'og:image:width', content: String(imageMeta.width) }]);
    }
    if (imageMeta.height) {
      result.push(['meta', { property: 'og:image:height', content: String(imageMeta.height) }]);
    }
    result.push(['meta', { name: 'twitter:image', content: imageMeta.url }]);
  }

  if (noindex) {
    result.push(['meta', { name: 'robots', content: 'noindex, nofollow' }]);
  }

  if (tags.length) {
    result.push(['meta', { property: 'article:tag', content: tags.join(',') }]);
  }

  return {
    title: resolvedTitle,
    description,
    tags: result,
  };
}

export function createJsonLd(payload: Record<string, unknown> | Record<string, unknown>[]) {
  return Array.isArray(payload) ? payload : [payload];
}

export function withSitemap(execute: () => Promise<string>): APIRoute {
  return async () => {
    const body = await execute();
    return new Response(body, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  };
}
