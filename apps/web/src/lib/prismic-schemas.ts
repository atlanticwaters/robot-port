import { z } from 'zod';

export const slugSchema = z.string().min(1);

export const richTextBlock = z.object({
  type: z.string(),
  text: z.string().optional(),
  spans: z.array(z.unknown()).optional(),
  data: z.unknown().optional(),
});

export const richTextSchema = z.array(richTextBlock);

export const linkFieldSchema = z
  .object({
    link_type: z.string(),
    url: z.string().url().optional(),
    target: z.string().optional(),
    id: z.string().optional(),
    uid: z.string().optional(),
    type: z.string().optional(),
    lang: z.string().optional(),
  })
  .passthrough();

export const imageFieldSchema = z
  .object({
    url: z.string().url(),
    alt: z.string().nullish(),
    copyright: z.string().nullish(),
    dimensions: z
      .object({
        width: z.number(),
        height: z.number(),
      })
      .optional(),
  })
  .passthrough();

const highlightSchema = z.object({
  label: z.string().nullable().optional(),
  detail: z.string().nullable().optional(),
});

export const heroSliceSchema = z.object({
  slice_type: z.literal('hero'),
  variation: z.string(),
  primary: z.object({
    eyebrow: z.string().nullable().optional(),
    heading: z.string().nullable().optional(),
    subheading: richTextSchema.optional(),
    primary_action_label: z.string().nullable().optional(),
    primary_action_link: linkFieldSchema.nullable().optional(),
    secondary_action_label: z.string().nullable().optional(),
    secondary_action_link: linkFieldSchema.nullable().optional(),
  }),
  items: z.array(highlightSchema),
});

export const metricsSliceSchema = z.object({
  slice_type: z.literal('metrics'),
  variation: z.string(),
  primary: z.object({
    title: z.string().nullable().optional(),
    caption: z.string().nullable().optional(),
  }),
  items: z.array(
    z.object({
      label: z.string().nullable().optional(),
      value: z.string().nullable().optional(),
      context: z.string().nullable().optional(),
    }),
  ),
});

export const quoteSliceSchema = z.object({
  slice_type: z.literal('quote'),
  variation: z.string(),
  primary: z.object({
    quote: richTextSchema.optional(),
    attribution: z.string().nullable().optional(),
    title: z.string().nullable().optional(),
  }),
  items: z.array(z.unknown()),
});

export const richTextSliceSchema = z.object({
  slice_type: z.literal('rich_text_section'),
  variation: z.string(),
  primary: z.object({
    title: z.string().nullable().optional(),
    align: z.string().nullable().optional(),
    content: richTextSchema.optional(),
  }),
  items: z.array(z.unknown()),
});

export const mediaGallerySliceSchema = z.object({
  slice_type: z.literal('media_gallery'),
  variation: z.string(),
  primary: z.object({
    heading: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
  }),
  items: z.array(
    z.object({
      media: imageFieldSchema.nullable().optional(),
      caption: z.string().nullable().optional(),
    }),
  ),
});

export const imageGridSliceSchema = z.object({
  slice_type: z.literal('image_grid'),
  variation: z.string(),
  primary: z.object({
    heading: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
  }),
  items: z.array(
    z.object({
      image: imageFieldSchema.nullable().optional(),
      caption: z.string().nullable().optional(),
    }),
  ),
});

export const calloutSliceSchema = z.object({
  slice_type: z.literal('callout'),
  variation: z.string(),
  primary: z.object({
    label: z.string().nullable().optional(),
    heading: z.string().nullable().optional(),
    body: richTextSchema.optional(),
  }),
  items: z.array(z.unknown()),
});

export const linkGroupSliceSchema = z.object({
  slice_type: z.literal('link_group'),
  variation: z.string(),
  primary: z.object({
    heading: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
  }),
  items: z.array(
    z.object({
      label: z.string().nullable().optional(),
      link: linkFieldSchema.nullable().optional(),
      icon: z.string().nullable().optional(),
    }),
  ),
});

export const codeBlockSliceSchema = z.object({
  slice_type: z.literal('code_block'),
  variation: z.string(),
  primary: z.object({
    title: z.string().nullable().optional(),
    language: z.string().nullable().optional(),
    code: richTextSchema.optional(),
    caption: z.string().nullable().optional(),
  }),
  items: z.array(z.unknown()),
});

export const ctaBannerSliceSchema = z.object({
  slice_type: z.literal('cta_banner'),
  variation: z.string(),
  primary: z.object({
    heading: z.string().nullable().optional(),
    description: richTextSchema.optional(),
    action_label: z.string().nullable().optional(),
    action_link: linkFieldSchema.nullable().optional(),
  }),
  items: z.array(z.unknown()),
});

export const sliceUnionSchema = z.discriminatedUnion('slice_type', [
  heroSliceSchema,
  metricsSliceSchema,
  quoteSliceSchema,
  richTextSliceSchema,
  mediaGallerySliceSchema,
  imageGridSliceSchema,
  calloutSliceSchema,
  linkGroupSliceSchema,
  codeBlockSliceSchema,
  ctaBannerSliceSchema,
]);

export type SliceUnion = z.infer<typeof sliceUnionSchema>;

export const projectDocumentSchema = z.object({
  id: z.string(),
  uid: slugSchema.optional(),
  type: z.literal('project'),
  lang: z.string(),
  tags: z.array(z.string()),
  data: z.object({
    title: z.string(),
    summary: richTextSchema.optional(),
    cover: imageFieldSchema.nullable().optional(),
    services: z.array(
      z.object({
        label: z.string().nullable().optional(),
      }),
    ),
    roles: z.array(
      z.object({
        label: z.string().nullable().optional(),
      }),
    ),
    year: z.number().nullable().optional(),
    client: z.string().nullable().optional(),
    duration: z.string().nullable().optional(),
    links: z.array(
      z.object({
        label: z.string().nullable().optional(),
        url: linkFieldSchema.nullable().optional(),
      }),
    ),
    tags: z.array(
      z.object({
        tag: z
          .object({
            id: z.string().optional(),
            type: z.literal('tag').optional(),
            uid: z.string().optional(),
            data: z
              .object({
                label: z.string().nullable().optional(),
                color: z.string().nullable().optional(),
                description: z.string().nullable().optional(),
              })
              .partial()
              .optional(),
          })
          .nullable()
          .optional(),
      }),
    ),
    skills: z.array(
      z.object({
        skill: z
          .object({
            id: z.string().optional(),
            type: z.literal('skill').optional(),
            uid: z.string().optional(),
            data: z
              .object({
                label: z.string().nullable().optional(),
                description: z.string().nullable().optional(),
                category: z.string().nullable().optional(),
                color: z.string().nullable().optional(),
              })
              .partial()
              .optional(),
          })
          .nullable()
          .optional(),
      }),
    ),
    metrics: z.array(
      z.object({
        label: z.string().nullable().optional(),
        value: z.string().nullable().optional(),
        context: z.string().nullable().optional(),
      }),
    ),
    gallery: z.array(
      z.object({
        media: imageFieldSchema.nullable().optional(),
        caption: z.string().nullable().optional(),
      }),
    ),
    seo: z
      .array(
        z.object({
          meta_title: z.string().nullable().optional(),
          meta_description: z.string().nullable().optional(),
          og_image: imageFieldSchema.nullable().optional(),
        }),
      )
      .optional(),
    body: z.array(sliceUnionSchema).optional(),
  }),
});

export const caseStudyDocumentSchema = z.object({
  id: z.string(),
  uid: slugSchema.optional(),
  type: z.literal('case_study'),
  lang: z.string(),
  data: z.object({
    title: z.string(),
    hero_kicker: z.string().nullable().optional(),
    hero_headline: z.string().nullable().optional(),
    hero_description: richTextSchema.optional(),
    hero_media: imageFieldSchema.nullable().optional(),
    problem_statement: richTextSchema.optional(),
    approach: richTextSchema.optional(),
    outcomes: richTextSchema.optional(),
    metrics: z.array(
      z.object({
        label: z.string().nullable().optional(),
        value: z.string().nullable().optional(),
        context: z.string().nullable().optional(),
      }),
    ),
    related_projects: z.array(
      z.object({
        project: z
          .object({
            id: z.string().optional(),
            type: z.literal('project').optional(),
            uid: z.string().optional(),
            data: z.object({
              title: z.string().nullable().optional(),
              summary: richTextSchema.optional(),
              cover: imageFieldSchema.nullable().optional(),
            }).partial(),
          })
          .nullable()
          .optional(),
      }),
    ),
    seo: z
      .array(
        z.object({
          meta_title: z.string().nullable().optional(),
          meta_description: z.string().nullable().optional(),
          og_image: imageFieldSchema.nullable().optional(),
        }),
      )
      .optional(),
    body: z.array(sliceUnionSchema).optional(),
  }),
});

export const postDocumentSchema = z.object({
  id: z.string(),
  uid: slugSchema.optional(),
  type: z.literal('post'),
  lang: z.string(),
  data: z.object({
    title: z.string(),
    excerpt: z.string().nullable().optional(),
    author: z.string().nullable().optional(),
    reading_time: z.number().nullable().optional(),
    published_at: z.string().nullable().optional(),
    tags: z.array(
      z.object({
        tag: z
          .object({
            id: z.string().optional(),
            type: z.literal('tag').optional(),
            uid: z.string().optional(),
            data: z.object({
              label: z.string().nullable().optional(),
              color: z.string().nullable().optional(),
              description: z.string().nullable().optional(),
            }).partial(),
          })
          .nullable()
          .optional(),
      }),
    ),
    canonical_url: linkFieldSchema.nullable().optional(),
    seo: z
      .array(
        z.object({
          meta_title: z.string().nullable().optional(),
          meta_description: z.string().nullable().optional(),
          og_image: imageFieldSchema.nullable().optional(),
        }),
      )
      .optional(),
    body: z.array(sliceUnionSchema).optional(),
  }),
});

export const tagDocumentSchema = z.object({
  id: z.string(),
  uid: slugSchema.optional(),
  type: z.literal('tag'),
  data: z.object({
    label: z.string(),
    description: z.string().nullable().optional(),
    color: z.string().nullable().optional(),
  }),
});

export const skillDocumentSchema = z.object({
  id: z.string(),
  uid: slugSchema.optional(),
  type: z.literal('skill'),
  data: z.object({
    label: z.string(),
    description: z.string().nullable().optional(),
    category: z.string().nullable().optional(),
    color: z.string().nullable().optional(),
  }),
});

export const settingsDocumentSchema = z.object({
  id: z.string(),
  type: z.literal('settings'),
  data: z.object({
    site_title: z.string().nullable().optional(),
    site_description: z.string().nullable().optional(),
    tagline: z.string().nullable().optional(),
    contact_email: z.string().nullable().optional(),
    default_og_image: imageFieldSchema.nullable().optional(),
    primary_color: z.string().nullable().optional(),
    secondary_color: z.string().nullable().optional(),
    accent_color: z.string().nullable().optional(),
    typeface_primary: z.string().nullable().optional(),
    typeface_secondary: z.string().nullable().optional(),
    analytics_provider: z.string().nullable().optional(),
    analytics_id: z.string().nullable().optional(),
    social_links: z.array(
      z.object({
        label: z.string().nullable().optional(),
        url: linkFieldSchema.nullable().optional(),
        icon: z.string().nullable().optional(),
      }),
    ),
    seo_defaults: z.array(
      z.object({
        meta_title_suffix: z.string().nullable().optional(),
        meta_description: z.string().nullable().optional(),
        twitter_handle: z.string().nullable().optional(),
      }),
    ),
  }),
});

export const navigationDocumentSchema = z.object({
  id: z.string(),
  type: z.literal('navigation'),
  data: z.object({
    primary_navigation: z.array(
      z.object({
        label: z.string().nullable().optional(),
        link: linkFieldSchema.nullable().optional(),
        description: z.string().nullable().optional(),
      }),
    ),
    secondary_navigation: z.array(
      z.object({
        label: z.string().nullable().optional(),
        link: linkFieldSchema.nullable().optional(),
      }),
    ),
    footer_navigation: z.array(
      z.object({
        section_label: z.string().nullable().optional(),
        label: z.string().nullable().optional(),
        link: linkFieldSchema.nullable().optional(),
      }),
    ),
    social_links: z.array(
      z.object({
        label: z.string().nullable().optional(),
        link: linkFieldSchema.nullable().optional(),
        icon: z.string().nullable().optional(),
      }),
    ),
  }),
});

export type ProjectDocument = z.infer<typeof projectDocumentSchema>;
export type CaseStudyDocument = z.infer<typeof caseStudyDocumentSchema>;
export type PostDocument = z.infer<typeof postDocumentSchema>;
export type TagDocument = z.infer<typeof tagDocumentSchema>;
export type SkillDocument = z.infer<typeof skillDocumentSchema>;
export type SettingsDocument = z.infer<typeof settingsDocumentSchema>;
export type NavigationDocument = z.infer<typeof navigationDocumentSchema>;
