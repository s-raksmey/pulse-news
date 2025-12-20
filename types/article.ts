// types/article.ts

export type CategoryKey =
  | "World"
  | "Tech"
  | "Business"
  | "Politics"
  | "Science"
  | "Culture"
  | "Blog"
  | "Opinion";

export interface Author {
  name: string;
  username: string; // used for /author/[username]
  avatarUrl?: string;
  bio?: string;
}

export type EditorBlockType =
  | "paragraph"
  | "header"
  | "list"
  | "quote"
  | "image"
  | "embed";

export interface EditorBlock<TData = unknown> {
  id: string;
  type: EditorBlockType | string;
  data: TData;
}

export interface EditorContent {
  time: number;
  version: string;
  blocks: EditorBlock[];
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: CategoryKey;
  subCategory?: string;

  author: Author;

  publishedAt: string; // ISO string for now
  featuredImage?: string;

  tags: string[];
  isBreaking?: boolean;
  isEditorsPick?: boolean;

  // Editor.js output
  content: EditorContent;
}

export interface NavCrumb {
  label: string;
  href: string;
}
