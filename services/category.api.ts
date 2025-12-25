import { listCategories } from "@/features/categories/category.service";

export async function fetchCategories() {
  return Promise.resolve(listCategories());
}
