import { API_RESPONSE_KEYS, API_URLS } from "@/lib/constants";
import { Usecase } from "@/types/usecase";

export async function getUsecases(): Promise<Usecase[]> {
  const res = await fetch(API_URLS.EXPLORER_DATA);
  const data = await res.json();
  return data[API_RESPONSE_KEYS.USECASES] || [];
}
