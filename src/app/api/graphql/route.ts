import { createYoga } from "graphql-yoga";
import { schema } from "@/graphql/schema";

export const runtime = "nodejs";

/* -------------------------
   Yoga instance
------------------------- */
const yoga = createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response },
});

/* -------------------------
   Next.js App Router handlers
------------------------- */
export async function GET(
  request: Request,
  ctx: {}
): Promise<Response> {
  return yoga.handleRequest(request, ctx);
}

export async function POST(
  request: Request,
  ctx: {}
): Promise<Response> {
  return yoga.handleRequest(request, ctx);
}
