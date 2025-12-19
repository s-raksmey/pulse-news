/* =========================
   Dropdown types
========================= */

export type DropdownKey = "World" | "Tech" | "Business" | "Politics";

export interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}

export interface FeaturedItem {
  title: string;
  href: string;
  isBreaking?: boolean;
}

export interface DropdownCategory {
  title: string;
  items: DropdownItem[];
  featured: FeaturedItem[];
}

/* =========================
   Navigation types
========================= */

export type NavItemType = "link" | "dropdown";

/**
 * Base navigation item
 */
interface BaseNavItem {
  label: string;
  href: string;
  icon?: React.ElementType;
}

/**
 * Simple link (Home, Science, Culture)
 */
export interface NavLinkItem extends BaseNavItem {
  type: "link";
}

/**
 * Dropdown link (World, Tech, Business, Politics)
 */
export interface NavDropdownItem extends BaseNavItem {
  type: "dropdown";
  dropdownKey: DropdownKey; // ✅ STRICT & SAFE
}

/**
 * Unified navigation item
 */
export type NavItem = NavLinkItem | NavDropdownItem;
