"use client";

import { useEffect } from "react";
import type { OutputData } from "@editorjs/editorjs";

interface Props {
  content: OutputData;
}

function toYoutubeEmbed(url: string): string {
  if (url.includes("youtu.be")) {
    return `https://www.youtube.com/embed/${url.split("/").pop()}`;
  }
  const id = new URL(url).searchParams.get("v");
  return `https://www.youtube.com/embed/${id}`;
}

export default function EditorRenderer({ content }: Props) {
  useEffect(() => {
    // Load Facebook SDK once
    if (!document.getElementById("facebook-jssdk")) {
      const s = document.createElement("script");
      s.id = "facebook-jssdk";
      s.src =
        "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0";
      s.async = true;
      document.body.appendChild(s);
    } else {
      window.FB?.XFBML?.parse();
    }

    // Instagram
    if (!document.getElementById("instagram-embed")) {
      const s = document.createElement("script");
      s.id = "instagram-embed";
      s.src = "https://www.instagram.com/embed.js";
      s.async = true;
      document.body.appendChild(s);
    } else {
      window.instgrm?.Embeds?.process();
    }
  }, [content]);

  return (
    <article className="prose max-w-none">
      {content.blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={i}
                dangerouslySetInnerHTML={{
                  __html: block.data.text,
                }}
              />
            );

          case "header":
            return <h2 key={i}>{block.data.text}</h2>;

          case "list":
            return (
              <ul key={i}>
                {block.data.items.map(
                  (t: string, idx: number) => (
                    <li key={idx}>{t}</li>
                  )
                )}
              </ul>
            );

          case "quote":
            return (
              <blockquote key={i}>
                <p>{block.data.text}</p>
              </blockquote>
            );

          case "video":
            // Facebook Reel / Video (IMPORTANT)
            if (
              block.data.url.includes("facebook.com") ||
              block.data.url.includes("fb.watch")
            ) {
              return (
                <div key={i} className="my-6">
                  <div
                    className="fb-video"
                    data-href={block.data.url}
                    data-show-text="false"
                  />
                </div>
              );
            }

            // Instagram
            if (block.data.url.includes("instagram.com")) {
              return (
                <blockquote
                  key={i}
                  className="instagram-media my-6"
                  data-instgrm-permalink={block.data.url}
                />
              );
            }

            // YouTube
            return (
              <iframe
                key={i}
                className="aspect-video w-full rounded"
                src={toYoutubeEmbed(block.data.url)}
                allowFullScreen
              />
            );

          default:
            return null;
        }
      })}
    </article>
  );
}
