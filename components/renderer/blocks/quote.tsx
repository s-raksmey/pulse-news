export default function QuoteBlock({ text }: { text: string }) {
  return (
    <blockquote>
      <p>{text}</p>
    </blockquote>
  );
}
