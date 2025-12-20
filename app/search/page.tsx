// app/search/page.tsx
import SearchPage from "@/components/pages/search-page";

export default function Page({ searchParams }: { searchParams: { q?: string } }) {
  return <SearchPage query={searchParams.q ?? ""} />;
}
