export default function EditorHolder({ children }: { children: React.ReactNode }) {
  return <div id="editor" className="rounded-lg border border-gray-200 p-4">{children}</div>;
}
