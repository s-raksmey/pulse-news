/* =========================
   Categories
========================= */

export const Q_CATEGORIES = /* GraphQL */ `
  query Categories {
    categories {
      id
      name
      slug
    }
  }
`;

/* =========================
   Articles list
========================= */

export const Q_ARTICLES = /* GraphQL */ `
  query Articles(
    $status: ArticleStatus
    $categorySlug: String
    $topic: String
    $take: Int
    $skip: Int
  ) {
    articles(
      status: $status
      categorySlug: $categorySlug
      topic: $topic
      take: $take
      skip: $skip
    ) {
      id
      title
      slug
      excerpt
      status
      topic
      publishedAt
      category {
        name
        slug
      }
    }
  }
`;

/* =========================
   Article by slug (public)
========================= */

export const Q_ARTICLE_BY_SLUG = /* GraphQL */ `
  query ArticleBySlug($slug: String!) {
    articleBySlug(slug: $slug) {
      id
      title
      slug
      excerpt
      topic
      status
      authorName
      publishedAt
      createdAt
      updatedAt
      category {
        name
        slug
      }
      contentJson
    }
  }
`;

/* =========================
   Article by ID (CMS)
========================= */

export const Q_ARTICLE_BY_ID = /* GraphQL */ `
  query ArticleById($id: ID!) {
    articleById(id: $id) {
      id
      title
      slug
      excerpt
      topic
      status
      authorName
      publishedAt
      createdAt
      updatedAt
      category {
        name
        slug
      }
      contentJson
    }
  }
`;

/* =========================
   Mutations
========================= */

export const M_UPSERT_ARTICLE = /* GraphQL */ `
  mutation UpsertArticle($id: ID, $input: UpsertArticleInput!) {
    upsertArticle(id: $id, input: $input) {
      id
      title
      slug
      excerpt
      topic
      status
      publishedAt
      category {
        id
        name
        slug
      }
      contentJson
    }
  }
`;

export const M_SET_STATUS = /* GraphQL */ `
  mutation SetArticleStatus($id: ID!, $status: ArticleStatus!) {
    setArticleStatus(id: $id, status: $status) {
      id
      status
      publishedAt
    }
  }
`;

/* =========================
   ❗ Delete Article (FIXED)
========================= */

export const M_DELETE_ARTICLE = /* GraphQL */ `
  mutation DeleteArticle($id: ID!) {
    deleteArticle(id: $id)
  }
`;

export const Q_TOP_STORIES = `
  query {
    topStories {
      id title slug excerpt category { name }
    }
  }
`;

export const Q_EDITORS_PICKS = `
  query {
    editorsPicks {
      id title slug excerpt category { name }
    }
  }
`;

export const Q_TRENDING = `
  query {
    trending {
      id title slug category { name }
    }
  }
`;

export const M_INCREMENT_VIEW = `
  mutation ($slug: String!) {
    incrementArticleView(slug: $slug)
  }
`;
