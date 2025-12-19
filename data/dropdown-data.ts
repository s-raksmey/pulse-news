import { DropdownCategory, DropdownKey } from "@/types/dropdown";

export const dropdownData: Record<DropdownKey, DropdownCategory> = {
  World: {
    title: "World",
    items: [
      { label: "Europe", href: "/world/europe", description: "Latest updates" },
      { label: "Asia Pacific", href: "/world/asia-pacific", description: "Regional news" },
      { label: "Americas", href: "/world/americas", description: "Continental coverage" },
      { label: "Africa", href: "/world/africa", description: "Emerging stories" },
      { label: "Middle East", href: "/world/middle-east", description: "Conflict & diplomacy" },
      { label: "Conflict", href: "/world/conflict", description: "War zones" },
      { label: "Diplomacy", href: "/world/diplomacy", description: "International relations" },
      { label: "Economy", href: "/world/economy", description: "Global markets" },
    ],
    featured: [
      { title: "Major peace talks announced", href: "/world/peace-talks", isBreaking: true },
      { title: "UN emergency session called", href: "/world/un-session" },
    ],
  },

  Tech: {
    title: "Technology",
    items: [
      { label: "AI & ML", href: "/tech/ai-ml", description: "Artificial intelligence" },
      { label: "Cybersecurity", href: "/tech/cybersecurity", description: "Security threats" },
      { label: "Startups", href: "/tech/startups", description: "Innovation funding" },
      { label: "Gadgets", href: "/tech/gadgets", description: "New devices" },
      { label: "Software", href: "/tech/software", description: "Apps & platforms" },
      { label: "Internet", href: "/tech/internet", description: "Web developments" },
      { label: "Innovation", href: "/tech/innovation", description: "Breakthroughs" },
      { label: "Space", href: "/tech/space", description: "Space technology" },
    ],
    featured: [
      { title: "AI breakthrough announced", href: "/tech/ai-breakthrough", isBreaking: true },
      { title: "Major tech merger confirmed", href: "/tech/merger" },
    ],
  },

  Business: {
    title: "Business",
    items: [
      { label: "Markets", href: "/business/markets", description: "Stock updates" },
      { label: "Finance", href: "/business/finance", description: "Banking & investments" },
      { label: "Corporate", href: "/business/corporate", description: "Company news" },
      { label: "Economy", href: "/business/economy", description: "Economic indicators" },
      { label: "Personal Finance", href: "/business/personal", description: "Money management" },
      { label: "Small Business", href: "/business/small", description: "Entrepreneurship" },
      { label: "Real Estate", href: "/business/real-estate", description: "Property market" },
      { label: "Energy", href: "/business/energy", description: "Oil & renewable" },
    ],
    featured: [
      { title: "Stock market hits record high", href: "/business/stock-record", isBreaking: true },
      { title: "Major acquisition deal closes", href: "/business/acquisition" },
    ],
  },

  Politics: {
    title: "Politics",
    items: [
      { label: "Elections", href: "/politics/elections", description: "Campaign updates" },
      { label: "Policy", href: "/politics/policy", description: "Legislation" },
      { label: "White House", href: "/politics/white-house", description: "Executive branch" },
      { label: "Congress", href: "/politics/congress", description: "Legislative news" },
      { label: "Supreme Court", href: "/politics/supreme-court", description: "Judicial rulings" },
      { label: "State", href: "/politics/state", description: "Local politics" },
      { label: "Campaigns", href: "/politics/campaigns", description: "Election races" },
      { label: "Lobbying", href: "/politics/lobbying", description: "Influence & advocacy" },
    ],
    featured: [
      { title: "New legislation proposed", href: "/politics/new-legislation", isBreaking: true },
      { title: "Election poll results released", href: "/politics/poll-results" },
    ],
  },
};
