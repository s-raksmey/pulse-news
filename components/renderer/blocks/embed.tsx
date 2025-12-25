interface EmbedProps {
  url: string;
}

function toYoutubeEmbed(url: string): string {
  if (url.includes("youtu.be")) {
    return `https://www.youtube.com/embed/${url.split("/").pop()}`;
  }
  const id = new URL(url).searchParams.get("v");
  return `https://www.youtube.com/embed/${id}`;
}

export default function EmbedBlock({ url }: EmbedProps) {
  if (url.includes("facebook.com") || url.includes("fb.watch")) {
    return (
      <div className="my-6">
        <div className="fb-video" data-href={url} data-show-text="false" />
      </div>
    );
  }

  if (url.includes("instagram.com")) {
    return (
      <blockquote className="instagram-media my-6" data-instgrm-permalink={url} />
    );
  }

  return (
    <iframe
      className="aspect-video w-full rounded"
      src={toYoutubeEmbed(url)}
      allowFullScreen
    />
  );
}
