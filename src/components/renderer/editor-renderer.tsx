import type {
  EditorOutputData,
  EditorBlock,
} from "@/types/editor";
import { videoUrlToEmbed } from "@/lib/video-embed";

/* =========================
   Normalize Editor.js data
========================= */
function normalize(
  data: EditorOutputData | string | null
): { blocks: EditorBlock[] } {
  if (!data) return { blocks: [] };

  if (typeof data === "string") {
    try {
      const parsed = JSON.parse(data);
      return {
        blocks: Array.isArray(parsed.blocks)
          ? (parsed.blocks as EditorBlock[])
          : [],
      };
    } catch {
      return { blocks: [] };
    }
  }

  return {
    blocks: Array.isArray(data.blocks)
      ? (data.blocks as EditorBlock[])
      : [],
  };
}

/* =========================
   Block renderer
========================= */
function Block({ block }: { block: EditorBlock }) {
  /* ---------- VIDEO BLOCK ---------- */
  if (block.type === "video") {
    const url: string | undefined = block.data?.url;
    if (!url) return null;

    const embed = videoUrlToEmbed(url);
    if (!embed) return null;

    return (
      <div className="my-6 aspect-video w-full overflow-hidden rounded-xl border border-slate-200">
        <iframe
          src={embed}
          className="h-full w-full"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  /* ---------- TEXT BLOCKS ---------- */
  switch (block.type) {
    case "header": {
      const level =
        typeof block.data?.level === "number"
          ? block.data.level
          : 2;
      const Tag = `h${Math.min(
        4,
        Math.max(2, level)
      )}` as keyof JSX.IntrinsicElements;

      return (
        <Tag
          className="mt-6 font-bold"
          dangerouslySetInnerHTML={{
            __html: block.data.text,
          }}
        />
      );
    }

    case "paragraph":
      return (
        <p
          className="mt-3 leading-7 text-slate-800"
          dangerouslySetInnerHTML={{
            __html: block.data.text,
          }}
        />
      );

    case "list":
      return block.data.style === "ordered" ? (
        <ol className="mt-3 list-decimal pl-6">
          {block.data.items.map(
            (item: string, idx: number) => (
              <li
                key={idx}
                dangerouslySetInnerHTML={{
                  __html: item,
                }}
              />
            )
          )}
        </ol>
      ) : (
        <ul className="mt-3 list-disc pl-6">
          {block.data.items.map(
            (item: string, idx: number) => (
              <li
                key={idx}
                dangerouslySetInnerHTML={{
                  __html: item,
                }}
              />
            )
          )}
        </ul>
      );

    case "quote":
      return (
        <blockquote className="mt-6 border-l-4 pl-4 italic">
          <div
            dangerouslySetInnerHTML={{
              __html: block.data.text,
            }}
          />
        </blockquote>
      );

    default:
      return null;
  }
}

/* =========================
   Renderer
========================= */
export default function EditorRenderer({
  data,
}: {
  data: EditorOutputData | string | null;
}) {
  const { blocks } = normalize(data);

  if (!blocks.length) return null;

  return (
    <article className="prose max-w-none">
      {blocks.map(
        (b: EditorBlock, i: number) => (
          <Block key={i} block={b} />
        )
      )}
    </article>
  );
}
