import { API_RESPONSE_KEYS, API_URLS } from "@/lib/constants";
import { Category } from "@/types/category";

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(API_URLS.EXPLORER_DATA);
  const data = await res.json();
  return data[API_RESPONSE_KEYS.CATEGORIES] || [];
}
