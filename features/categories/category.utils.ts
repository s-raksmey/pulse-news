export function categorySlug(label: string) {
  return label.toLowerCase().replace(/\s+/g, "-");
}
