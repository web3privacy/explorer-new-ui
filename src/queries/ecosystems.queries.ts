import { API_RESPONSE_KEYS, API_URLS } from "@/lib/constants";
import { Ecosystem } from "@/types/ecosystem";

export async function getEcosystems(): Promise<Ecosystem[]> {
  const res = await fetch(API_URLS.EXPLORER_DATA);
  const data = await res.json();
  return data[API_RESPONSE_KEYS.ECOSYSTEMS] || [];
}
