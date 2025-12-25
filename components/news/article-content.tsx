import type { EditorContent } from "@/types/article";
import EditorRenderer from "@/components/renderer/editor-renderer";

export default function ArticleContent({ content }: { content: EditorContent }) {
  return (
    <div className="mt-6">
      <EditorRenderer content={content} />
    </div>
  );
}
