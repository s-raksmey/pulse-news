// components/editor/editor-renderer.tsx
import type { EditorContent, EditorBlock } from "@/types/article";

type HeaderData = { text: string; level?: number };
type ParagraphData = { text: string };
type QuoteData = { text: string; caption?: string };
type ListData = { style?: "ordered" | "unordered"; items: string[] };

export default function EditorRenderer({ content }: { content: EditorContent }) {
  return (
    <article className="prose prose-gray max-w-none">
      {content.blocks.map((block) => renderBlock(block))}
    </article>
  );
}

function renderBlock(block: EditorBlock): React.ReactNode {
  switch (block.type) {
    case "header": {
      const data = block.data as HeaderData;
      const level = data.level ?? 2;
      if (level === 1) return <h1 key={block.id}>{data.text}</h1>;
      if (level === 2) return <h2 key={block.id}>{data.text}</h2>;
      if (level === 3) return <h3 key={block.id}>{data.text}</h3>;
      return <h4 key={block.id}>{data.text}</h4>;
    }

    case "paragraph": {
      const data = block.data as ParagraphData;
      return <p key={block.id}>{data.text}</p>;
    }

    case "quote": {
      const data = block.data as QuoteData;
      return (
        <blockquote key={block.id}>
          <p>{data.text}</p>
          {data.caption ? <cite>{data.caption}</cite> : null}
        </blockquote>
      );
    }

    case "list": {
      const data = block.data as ListData;
      const ordered = data.style === "ordered";
      const ListTag = ordered ? "ol" : "ul";
      return (
        <ListTag key={block.id}>
          {data.items.map((it, i) => (
            <li key={`${block.id}-${i}`}>{it}</li>
          ))}
        </ListTag>
      );
    }

    // image/embed blocks can be added later (still frontend-only)
    default:
      return null;
  }
}
