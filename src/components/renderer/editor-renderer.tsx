import type { EditorBlock, EditorOutputData } from "@/types/editor";
import Image from "next/image";

export default function EditorRenderer({ data }: { data: EditorOutputData }) {
  return (
    <article className="mx-auto max-w-3xl space-y-6">
      {data.blocks.map((b: EditorBlock, i: number) => {
        const highlight = b.tunes?.highlight?.highlighted
          ? "editor-highlight"
          : "";

        /* ---------- IMAGE ---------- */
        if (b.type === "image") {
          return (
            <figure key={i} className="my-6">
              <img
                src={b.data.file?.url || b.data.url}
                alt={b.data.caption || "Article image"}
                loading="lazy"
                className="
                  mx-auto
                  w-full
                  max-w-[900px]
                  h-auto
                  rounded-xl
                  border  
                "
              />
              {b.data.caption && (
                <figcaption className="mt-2 text-sm text-slate-500 text-center">
                  {b.data.caption}
                </figcaption>
              )}
            </figure>
          );
        }

        /* ---------- VIDEO ---------- */
        if (b.type === "video") {
          return (
            <div
              key={i}
              className={`w-full overflow-hidden rounded-xl border aspect-video ${highlight}`}
            >
              <iframe
                src={b.data.url}
                className="h-full w-full"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          );
        }

        /* ---------- PARAGRAPH ---------- */
        if (b.type === "paragraph") {
          return (
            <p
              key={i}
              className={`leading-7 text-slate-800 ${highlight}`}
              dangerouslySetInnerHTML={{
                __html: b.data.text,
              }}
            />
          );
        }

        /* ---------- HEADER ---------- */
        if (b.type === "header") {
          const Tag = `h${Math.min(
            4,
            Math.max(2, b.data.level)
          )}` as keyof JSX.IntrinsicElements;

          return (
            <Tag
              key={i}
              className={`font-bold mt-8 ${highlight}`}
              dangerouslySetInnerHTML={{
                __html: b.data.text,
              }}
            />
          );
        }

        /* ---------- LIST ---------- */
        if (b.type === "list") {
          return b.data.style === "ordered" ? (
            <ol key={i} className={`list-decimal pl-6 ${highlight}`}>
              {b.data.items.map((item: string, idx: number) => (
                <li
                  key={idx}
                  dangerouslySetInnerHTML={{
                    __html: item,
                  }}
                />
              ))}
            </ol>
          ) : (
            <ul key={i} className={`list-disc pl-6 ${highlight}`}>
              {b.data.items.map((item: string, idx: number) => (
                <li
                  key={idx}
                  dangerouslySetInnerHTML={{
                    __html: item,
                  }}
                />
              ))}
            </ul>
          );
        }

        /* ---------- QUOTE ---------- */
        if (b.type === "quote") {
          return (
            <blockquote
              key={i}
              className={`border-l-4 pl-4 italic text-slate-600 ${highlight}`}
              dangerouslySetInnerHTML={{
                __html: b.data.text,
              }}
            />
          );
        }

        return null;
      })}
    </article>
  );
}
