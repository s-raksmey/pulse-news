// components/article/article-content.tsx

import type { EditorContent } from "@/types/article";
import EditorRenderer from "@/components/editor/editor-renderer";

export default function ArticleContent({ content }: { content: EditorContent }) {
  return (
    <div className="mt-6">
      <EditorRenderer content={content} />
    </div>
  );
}
