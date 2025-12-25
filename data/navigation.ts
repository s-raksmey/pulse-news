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
    href: "/category/world",
    type: "dropdown",
    dropdownKey: "World",
    icon: Globe,
  },
  {
    label: "Tech",
    href: "/category/tech",
    type: "dropdown",
    dropdownKey: "Tech",
    icon: TrendingUp,
  },
  {
    label: "Business",
    href: "/category/business",
    type: "dropdown",
    dropdownKey: "Business",
    icon: TrendingUp,
  },
  {
    label: "Politics",
    href: "/category/politics",
    type: "dropdown",
    dropdownKey: "Politics",
  },
  {
    label: "Science",
    href: "/category/science",
    type: "link",
  },
  {
    label: "Culture",
    href: "/category/culture",
    type: "link",
  },
];
