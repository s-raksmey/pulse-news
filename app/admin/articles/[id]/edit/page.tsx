import { use } from "react";
import ArticleEditorPage from "../../_components/article-editor-page";

export default function EditorPlaygroundPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <ArticleEditorPage articleId={id} />;
}
