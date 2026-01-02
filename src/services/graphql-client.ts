import { GraphQLClient } from "graphql-request";

function getBaseUrl() {
  // ✅ Server-side
  if (typeof window === "undefined") {
    return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  }

  // ✅ Client-side (browser)
  return window.location.origin;
}

export function getGqlClient() {
  const baseUrl = getBaseUrl();
  return new GraphQLClient(`${baseUrl}/api/graphql`);
}
