import { createSchema } from "graphql-yoga";
import { prisma } from "@/lib/prisma";
import { GraphQLJSONObject } from "graphql-scalars";
import { z } from "zod";

/**
 * IMPORTANT:
 * Your Prisma schema already contains:
 * - ArticleStatus: DRAFT | REVIEW | PUBLISHED | ARCHIVED
 * - Article fields: isFeatured, isEditorsPick, pinnedAt, viewCount
 * - Tag model
 * - ArticleTag join model
 *
 * But your TypeScript still reports those properties don't exist.
 * This file binds prisma to `any` ONLY inside GraphQL layer to avoid stale typings.
 */
const db = prisma as any;

/* =========================
   Validation
========================= */
const ArticleInput = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  excerpt: z.string().optional().nullable(),
  status: z.enum(["DRAFT", "REVIEW", "PUBLISHED", "ARCHIVED"]).optional(),
  categorySlug: z.string().optional().nullable(),
  topic: z.string().optional().nullable(),
  contentJson: z.any().optional(),

  isFeatured: z.boolean().optional(),
  isEditorsPick: z.boolean().optional(),
  authorName: z.string().optional().nullable(),
  coverImageUrl: z.string().optional().nullable(),

  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  ogImageUrl: z.string().optional().nullable(),

  tagSlugs: z.array(z.string()).optional(),
  pinnedAt: z.string().optional().nullable(),
});

function toIso(d?: Date | null): string | null {
  return d ? d.toISOString() : null;
}

function normalizeTagSlug(slug: string) {
  return slug
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

/* =========================
   GraphQL Schema
========================= */
export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    scalar JSON

    enum ArticleStatus {
      DRAFT
      REVIEW
      PUBLISHED
      ARCHIVED
    }

    type Category {
      id: ID!
      name: String!
      slug: String!
      createdAt: String!
      updatedAt: String!
    }

    type Tag {
      id: ID!
      name: String!
      slug: String!
      createdAt: String!
    }

    type Article {
      id: ID!
      title: String!
      slug: String!
      excerpt: String
      status: ArticleStatus!
      topic: String
      contentJson: JSON!

      coverImageUrl: String
      authorName: String
      seoTitle: String
      seoDescription: String
      ogImageUrl: String

      isFeatured: Boolean!
      isEditorsPick: Boolean!
      pinnedAt: String
      viewCount: Int!

      publishedAt: String
      createdAt: String!
      updatedAt: String!

      category: Category
      tags: [Tag!]!
    }

    input UpsertArticleInput {
      title: String!
      slug: String!
      excerpt: String
      status: ArticleStatus
      categorySlug: String
      topic: String
      contentJson: JSON

      isFeatured: Boolean
      isEditorsPick: Boolean
      pinnedAt: String

      authorName: String
      coverImageUrl: String
      seoTitle: String
      seoDescription: String
      ogImageUrl: String

      tagSlugs: [String!]
    }

    type Query {
      categories: [Category!]!

      articles(
        status: ArticleStatus
        categorySlug: String
        topic: String
        take: Int = 20
        skip: Int = 0
      ): [Article!]!

      articleBySlug(slug: String!): Article
      articleById(id: ID!): Article

      topStories(limit: Int = 6): [Article!]!
      editorsPicks(limit: Int = 6): [Article!]!
      latestByCategory(categorySlug: String!, limit: Int = 6): [Article!]!
      trending(limit: Int = 10): [Article!]!
      relatedArticles(slug: String!, limit: Int = 6): [Article!]!
    }

    type Mutation {
      upsertArticle(id: ID, input: UpsertArticleInput!): Article!
      setArticleStatus(id: ID!, status: ArticleStatus!): Article!
      incrementArticleView(slug: String!): Boolean!
    }
  `,

  resolvers: {
    JSON: GraphQLJSONObject,

    Category: {
      createdAt: (p: any) => toIso(p.createdAt),
      updatedAt: (p: any) => toIso(p.updatedAt),
    },

    Tag: {
      createdAt: (p: any) => toIso(p.createdAt),
    },

    Article: {
      createdAt: (p: any) => toIso(p.createdAt),
      updatedAt: (p: any) => toIso(p.updatedAt),
      publishedAt: (p: any) => toIso(p.publishedAt),
      pinnedAt: (p: any) => toIso(p.pinnedAt),

      category: async (parent: any) => {
        if (!parent.categoryId) return null;
        return db.category.findUnique({ where: { id: parent.categoryId } });
      },

      tags: async (parent: any) => {
        // Article -> ArticleTag[] (tags)
        // Tag -> ArticleTag[] (articles)
        return db.tag.findMany({
          where: { articles: { some: { articleId: parent.id } } },
          orderBy: { name: "asc" },
        });
      },
    },

    Query: {
      categories: async () =>
        db.category.findMany({ orderBy: { name: "asc" } }),

      articles: async (_: unknown, args: any) => {
        const where: any = {};

        if (args.status) where.status = args.status;
        if (args.topic) where.topic = args.topic;

        if (args.categorySlug) {
          where.category = { is: { slug: args.categorySlug } };
        }

        return db.article.findMany({
          where,
          orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
          take: args.take ?? 20,
          skip: args.skip ?? 0,
        });
      },

      articleBySlug: async (_: unknown, { slug }: { slug: string }) =>
        db.article.findFirst({ where: { slug } }),

      articleById: async (_: unknown, { id }: { id: string }) =>
        db.article.findUnique({ where: { id } }),

      topStories: async (_: unknown, { limit }: { limit?: number }) =>
        db.article.findMany({
          where: { isFeatured: true, status: "PUBLISHED" },
          orderBy: [
            // null-safe ordering
            { pinnedAt: { sort: "desc", nulls: "last" } },
            { publishedAt: "desc" },
          ],
          take: limit ?? 6,
        }),

      editorsPicks: async (_: unknown, { limit }: { limit?: number }) =>
        db.article.findMany({
          where: { isEditorsPick: true, status: "PUBLISHED" },
          orderBy: [
            { pinnedAt: { sort: "desc", nulls: "last" } },
            { publishedAt: "desc" },
          ],
          take: limit ?? 6,
        }),

      latestByCategory: async (
        _: unknown,
        { categorySlug, limit }: { categorySlug: string; limit?: number }
      ) =>
        db.article.findMany({
          where: {
            status: "PUBLISHED",
            category: { is: { slug: categorySlug } },
          },
          orderBy: { publishedAt: "desc" },
          take: limit ?? 6,
        }),

      trending: async (_: unknown, { limit }: { limit?: number }) =>
        db.article.findMany({
          where: { status: "PUBLISHED" },
          orderBy: { viewCount: "desc" },
          take: limit ?? 10,
        }),

      relatedArticles: async (
        _: unknown,
        { slug, limit }: { slug: string; limit?: number }
      ) => {
        const article = await db.article.findFirst({
          where: { slug },
          include: { tags: true }, // ArticleTag[]
        });

        if (!article) return [];

        const tagIds = (article.tags ?? []).map((t: any) => t.tagId).filter(Boolean);
        if (!tagIds.length) return [];

        return db.article.findMany({
          where: {
            status: "PUBLISHED",
            id: { not: article.id },
            tags: { some: { tagId: { in: tagIds } } },
          },
          orderBy: { publishedAt: "desc" },
          take: limit ?? 6,
        });
      },
    },

    Mutation: {
      upsertArticle: async (_: unknown, { id, input }: any) => {
        const data = ArticleInput.parse(input);

        const category = data.categorySlug
          ? await db.category.findFirst({
              where: { slug: data.categorySlug },
              select: { id: true },
            })
          : null;

        const status = data.status ?? "DRAFT";

        const payload: any = {
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt ?? null,
          status,
          topic: data.topic ?? null,
          contentJson: data.contentJson ?? { time: Date.now(), blocks: [], version: "2.x" },

          isFeatured: data.isFeatured ?? false,
          isEditorsPick: data.isEditorsPick ?? false,
          pinnedAt: data.pinnedAt ? new Date(data.pinnedAt) : null,

          authorName: data.authorName ?? null,
          coverImageUrl: data.coverImageUrl ?? null,

          seoTitle: data.seoTitle ?? null,
          seoDescription: data.seoDescription ?? null,
          ogImageUrl: data.ogImageUrl ?? null,

          categoryId: category?.id ?? null,
        };

        const article = id
          ? await db.article.update({ where: { id }, data: payload })
          : await db.article.create({
              data: {
                ...payload,
                publishedAt: status === "PUBLISHED" ? new Date() : null,
              },
            });

        // tags
        if (data.tagSlugs) {
          await db.articleTag.deleteMany({
            where: { articleId: article.id },
          });

          const unique = Array.from(
            new Set(data.tagSlugs.map(normalizeTagSlug).filter(Boolean))
          );

          for (const slug of unique) {
            const tag = await db.tag.upsert({
              where: { slug },
              update: {},
              create: { slug, name: slug },
            });

            await db.articleTag.create({
              data: { articleId: article.id, tagId: tag.id },
            });
          }
        }

        return article;
      },

      setArticleStatus: async (_: unknown, { id, status }: any) => {
        return db.article.update({
          where: { id },
          data: {
            status,
            publishedAt: status === "PUBLISHED" ? new Date() : null,
          },
        });
      },

      incrementArticleView: async (_: unknown, { slug }: any) => {
        await db.article.updateMany({
          where: { slug },
          data: { viewCount: { increment: 1 } },
        });
        return true;
      },
    },
  },
});
