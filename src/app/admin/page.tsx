import { getGqlClient } from "@/services/graphql-client";
import { Q_ARTICLES } from "@/services/article.gql";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminDashboard() {
  const client = getGqlClient();
  const published = await client.request(Q_ARTICLES, { status: "PUBLISHED", take: 1, skip: 0 });
  const drafts = await client.request(Q_ARTICLES, { status: "DRAFT", take: 1, skip: 0 });

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Published</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-slate-600">
          Latest published article: {published.articles[0]?.title ?? "—"}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Drafts</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-slate-600">
          Latest draft: {drafts.articles[0]?.title ?? "—"}
        </CardContent>
      </Card>
    </div>
  );
}
