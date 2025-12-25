export default function ParagraphBlock({ text }: { text: string }) {
  return <p dangerouslySetInnerHTML={{ __html: text }} />;
}
