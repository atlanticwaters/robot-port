import * as prismic from "@prismicio/client";
import { enableAutoPreviews } from "@prismicio/next";

export const repositoryName = process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME || "robot-port";

export function createClient(config: prismic.ClientConfig = {}) {
  const client = prismic.createClient(repositoryName, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    routes: [
      { type: "project", path: "/projects/:uid" },
      { type: "case_study", path: "/case-study/:uid" },
      { type: "post", path: "/blog/:uid" }
    ],
    ...config,
  });

  enableAutoPreviews({
    client,
    previewData: (config as any).previewData,
    req: (config as any).req,
  });

  return client;
}
