import { API_RESPONSE_KEYS, API_URLS } from "@/lib/constants";
import { Asset } from "@/types/asset";

export async function getAssets(): Promise<Asset[]> {
  const res = await fetch(API_URLS.EXPLORER_DATA);
  const data = await res.json();
  return data[API_RESPONSE_KEYS.ASSETS] || [];
}
