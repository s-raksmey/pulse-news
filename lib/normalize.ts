import type { CategoryKey } from "@/types/article";

/**
 * Convert legacy category labels → slugs
 * This keeps old pages working without refactor
 */
export function normalizeCategory(value: string): CategoryKey {
  return value.toLowerCase() as CategoryKey;
}

/**
 * Normalize sub-category (already slug-based)
 */
export function normalizeSubCategory(value?: string) {
  return value?.toLowerCase();
}
