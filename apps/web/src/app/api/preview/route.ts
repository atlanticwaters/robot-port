import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/prismic";

export async function GET(request: Request) {
  const client = createClient();
  const url = new URL(request.url);
  const documentId = url.searchParams.get("documentId");
  const token = url.searchParams.get("token");

  if (!documentId || !token) {
    return new Response("Missing documentId or token", { status: 400 });
  }

  // Enable Draft Mode
  (await draftMode()).enable();

  // Redirect to the document
  redirect(`/api/preview/redirect?documentId=${documentId}&token=${token}`);
}
