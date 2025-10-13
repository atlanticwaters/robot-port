import * as prismic from "@prismicio/client";

export const repositoryName = import.meta.env.PRISMIC_REPOSITORY_NAME;

export function createClient(fetchImpl?: typeof fetch) {
  if (!repositoryName) {
    throw new Error("Missing PRISMIC_REPOSITORY_NAME in environment.");
  }
  const endpoint = prismic.getRepositoryEndpoint(repositoryName);
  return prismic.createClient(endpoint, {
    fetch: fetchImpl ?? fetch,
    accessToken: import.meta.env.PRISMIC_ACCESS_TOKEN, // optional
    routes: [
      { type: "project", path: "/work/:uid" },
      { type: "case_study", path: "/case-study/:uid" },
      { type: "post", path: "/blog/:uid" }
    ],
  });
}


