import { useState } from "react";
import { listCategories } from "@/features/categories/category.service";

export function useCategoryStore() {
  const [categories, setCategories] = useState(listCategories());
  return { categories, setCategories } as const;
}
