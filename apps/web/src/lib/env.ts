import { z } from 'zod';

const envSchema = z.object({
  PRISMIC_REPOSITORY_NAME: z.string().min(1, 'PRISMIC_REPOSITORY_NAME is required'),
  PRISMIC_ACCESS_TOKEN: z.string().optional(),
  PRISMIC_PREVIEW_SECRET: z.string().optional(),
  SITE_URL: z.string().url().optional(),
});

export type Env = z.infer<typeof envSchema>;

export function getEnv(): Env {
  return envSchema.parse(process.env);
}
