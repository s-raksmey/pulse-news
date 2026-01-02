/* =========================
   Types
========================= */

export type MegaNavSection = {
  title: string;
  items: { label: string; href: string }[];
};

export type MegaNavConfig = {
  root: {
    label: string;
    href: string;
  };
  explore: MegaNavSection;
  shop: MegaNavSection;
  more: MegaNavSection;
};

/* =========================
   Data (CANONICAL ROUTES)
========================= */

export const MEGA_NAV: Record<string, MegaNavConfig> = {
  world: {
    root: {
      label: "World",
      href: "/category/world",
    },
    explore: {
      title: "Explore World",
      items: [
        { label: "Top Stories", href: "/category/world/latest" },
        { label: "Asia", href: "/category/world/asia" },
        { label: "Europe", href: "/category/world/europe" },
        { label: "Middle East", href: "/category/world/middle-east" },
        { label: "Africa", href: "/category/world/africa" },
      ],
    },
    shop: {
      title: "World Highlights",
      items: [
        { label: "Latest News", href: "/category/world/latest" },
        { label: "Editors’ Picks", href: "/category/world/editors-picks" },
        { label: "Most Read", href: "/category/world/most-read" },
      ],
    },
    more: {
      title: "More from World",
      items: [
        { label: "World Newsletter", href: "/category/world/newsletter" },
        { label: "RSS Feed", href: "/category/world/rss" },
        { label: "About World", href: "/category/world/about" },
      ],
    },
  },

  tech: {
    root: {
      label: "Tech",
      href: "/category/tech",
    },
    explore: {
      title: "Explore Tech",
      items: [
        { label: "AI", href: "/category/tech/ai" },
        { label: "Startups", href: "/category/tech/startups" },
        { label: "Gadgets", href: "/category/tech/gadgets" },
        { label: "Cybersecurity", href: "/category/tech/security" },
      ],
    },
    shop: {
      title: "Tech Coverage",
      items: [
        { label: "Latest Tech", href: "/category/tech/latest" },
        { label: "Reviews", href: "/category/tech/reviews" },
        { label: "Explainers", href: "/category/tech/explainers" },
      ],
    },
    more: {
      title: "More from Tech",
      items: [
        { label: "Tech Newsletter", href: "/category/tech/newsletter" },
        { label: "Events", href: "/category/tech/events" },
      ],
    },
  },

  business: {
    root: {
      label: "Business",
      href: "/category/business",
    },
    explore: {
      title: "Explore Business",
      items: [
        { label: "Markets", href: "/category/business/markets" },
        { label: "Economy", href: "/category/business/economy" },
        { label: "Companies", href: "/category/business/companies" },
        { label: "Startups", href: "/category/business/startups" },
      ],
    },
    shop: {
      title: "Business Coverage",
      items: [
        { label: "Latest Business", href: "/category/business/latest" },
        { label: "Analysis", href: "/category/business/analysis" },
      ],
    },
    more: {
      title: "More from Business",
      items: [
        { label: "Business Newsletter", href: "/category/business/newsletter" },
      ],
    },
  },

  politics: {
    root: {
      label: "Politics",
      href: "/category/politics",
    },
    explore: {
      title: "Explore Politics",
      items: [
        { label: "Elections", href: "/category/politics/elections" },
        { label: "Policy", href: "/category/politics/policy" },
        { label: "Government", href: "/category/politics/government" },
      ],
    },
    shop: {
      title: "Political Coverage",
      items: [
        { label: "Latest Politics", href: "/category/politics/latest" },
      ],
    },
    more: {
      title: "More from Politics",
      items: [
        { label: "Opinion", href: "/category/politics/opinion" },
      ],
    },
  },

  sports: {
    root: {
      label: "Sports",
      href: "/category/sports",
    },
    explore: {
      title: "Explore Sports",
      items: [
        { label: "Football", href: "/category/sports/football" },
        { label: "Basketball", href: "/category/sports/basketball" },
        { label: "International", href: "/category/sports/international" },
      ],
    },
    shop: {
      title: "Sports Coverage",
      items: [
        { label: "Latest Sports", href: "/category/sports/latest" },
      ],
    },
    more: {
      title: "More from Sports",
      items: [
        { label: "Live Scores", href: "/category/sports/live" },
      ],
    },
  },

  culture: {
    root: {
      label: "Culture",
      href: "/category/culture",
    },
    explore: {
      title: "Explore Culture",
      items: [
        { label: "Arts", href: "/category/culture/arts" },
        { label: "Movies", href: "/category/culture/movies" },
        { label: "Music", href: "/category/culture/music" },
      ],
    },
    shop: {
      title: "Culture Coverage",
      items: [
        { label: "Latest Culture", href: "/category/culture/latest" },
      ],
    },
    more: {
      title: "More from Culture",
      items: [
        { label: "Reviews", href: "/category/culture/reviews" },
      ],
    },
  },
};
