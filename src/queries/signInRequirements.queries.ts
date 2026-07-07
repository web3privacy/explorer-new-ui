import { API_RESPONSE_KEYS, API_URLS } from "@/lib/constants";
import { ReferenceItem } from "@/types/referenceItem";

export async function getSignInRequirements(): Promise<ReferenceItem[]> {
  const res = await fetch(API_URLS.EXPLORER_DATA);
  const data = await res.json();
  return data[API_RESPONSE_KEYS.SIGN_IN_REQUIREMENTS] || [];
}
