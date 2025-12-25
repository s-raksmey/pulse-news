// components/renderer/editor-renderer.tsx

"use client";

import { useEffect } from "react";
import type { OutputData } from "@editorjs/editorjs";
import ParagraphBlock from "./blocks/paragraph";
import HeaderBlock from "./blocks/header";
import ListBlock from "./blocks/list";
import QuoteBlock from "./blocks/quote";
import EmbedBlock from "./blocks/embed";

interface Props {
  content: OutputData;
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
            return <ParagraphBlock key={i} text={block.data.text} />;

          case "header":
            return <HeaderBlock key={i} text={block.data.text} />;

          case "list":
            return <ListBlock key={i} items={block.data.items} />;

          case "quote":
            return <QuoteBlock key={i} text={block.data.text} />;

          case "video":
            return <EmbedBlock key={i} url={block.data.url} />;

          default:
            return null;
        }
      })}
    </article>
  );
}
