import * as prismic from "@prismicio/client";

export const repositoryName = process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME;

export function createClient(fetchImpl?: typeof fetch) {
  if (!repositoryName) {
    throw new Error("Missing NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME in environment.");
  }
  const endpoint = prismic.getRepositoryEndpoint(repositoryName);
  return prismic.createClient(endpoint, {
    fetch: fetchImpl ?? fetch,
    accessToken: process.env.PRISMIC_ACCESS_TOKEN, // optional
    routes: [
      { type: "project", path: "/work/:uid" },
      { type: "case_study", path: "/case-study/:uid" },
      { type: "post", path: "/blog/:uid" }
    ],
  });
}


