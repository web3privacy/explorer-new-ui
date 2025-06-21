import { API_RESPONSE_KEYS, API_URLS } from "@/lib/constants";
import { Rank } from "@/types/rank";
import { NextResponse } from "next/server";

type RanksResponse = {
  [API_RESPONSE_KEYS.RANKS]?: Rank[];
  error?: string;
};

export type GETRanksResponse = RanksResponse;

export async function GET(): Promise<NextResponse<GETRanksResponse>> {
  try {
    const res = await fetch(API_URLS.EXPLORER_DATA);
    const data = await res.json();
    const ranks = data[API_RESPONSE_KEYS.RANKS] || [];

    return NextResponse.json({
      [API_RESPONSE_KEYS.RANKS]: ranks,
    });
  } catch (error) {
    console.error("Error fetching ranks:", error);

    return NextResponse.json(
      { error: "Failed to fetch ranks" },
      { status: 500 }
    );
  }
}
