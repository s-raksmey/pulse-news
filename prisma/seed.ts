import { PrismaClient, ArticleStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const world = await prisma.category.upsert({
    where: { slug: "world" },
    update: {},
    create: { name: "World", slug: "world" },
  });

  const tech = await prisma.category.upsert({
    where: { slug: "tech" },
    update: {},
    create: { name: "Tech", slug: "tech" },
  });

  await prisma.article.upsert({
    where: { slug: "welcome-to-pulse-news" },
    update: {},
    create: {
      title: "Welcome to Pulse News",
      slug: "welcome-to-pulse-news",
      excerpt: "A starter article seeded into PostgreSQL via Prisma.",
      status: ArticleStatus.PUBLISHED,
      publishedAt: new Date(),
      categoryId: tech.id,
      contentJson: {
        time: Date.now(),
        blocks: [
          { type: "header", data: { text: "Pulse News", level: 2 } },
          { type: "paragraph", data: { text: "This article is rendered from Editor.js JSON blocks." } },
          { type: "quote", data: { text: "Build fast. Ship safely.", caption: "Pulse Team" } },
          { type: "list", data: { style: "unordered", items: ["Next.js App Router", "GraphQL API", "PostgreSQL + Prisma"] } }
        ],
        version: "2.30.2"
      }
    },
  });

  await prisma.article.upsert({
    where: { slug: "world-briefing-sample" },
    update: {},
    create: {
      title: "World Briefing Sample",
      slug: "world-briefing-sample",
      excerpt: "Sample article in the World category.",
      status: ArticleStatus.PUBLISHED,
      publishedAt: new Date(),
      categoryId: world.id,
      contentJson: {
        time: Date.now(),
        blocks: [
          { type: "header", data: { text: "World Briefing", level: 2 } },
          { type: "paragraph", data: { text: "This is a sample World article. Replace it with real reporting." } }
        ],
        version: "2.30.2"
      }
    },
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
