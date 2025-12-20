// app/author/[username]/page.tsx
import AuthorProfile from "@/components/pages/author-profile";

export default function AuthorPage({ params }: { params: { username: string } }) {
  return <AuthorProfile username={params.username} />;
}
