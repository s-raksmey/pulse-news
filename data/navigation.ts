import { Globe, TrendingUp } from "lucide-react";
import { NavItem } from "@/types/dropdown";

export const navigationData: NavItem[] = [
  {
    label: "Home",
    href: "/",
    type: "link",
  },
  {
    label: "World",
    href: "/world",
    type: "dropdown",
    dropdownKey: "World",
    icon: Globe,
  },
  {
    label: "Tech",
    href: "/tech",
    type: "dropdown",
    dropdownKey: "Tech",
    icon: TrendingUp,
  },
  {
    label: "Business",
    href: "/business",
    type: "dropdown",
    dropdownKey: "Business",
    icon: TrendingUp,
  },
  {
    label: "Politics",
    href: "/politics",
    type: "dropdown",
    dropdownKey: "Politics",
  },
  {
    label: "Science",
    href: "/science",
    type: "link",
  },
  {
    label: "Culture",
    href: "/culture",
    type: "link",
  },
];
