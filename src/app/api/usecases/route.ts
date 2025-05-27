import { API_RESPONSE_KEYS, API_URLS } from "@/lib/constants";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(API_URLS.EXPLORER_DATA);
    const data = await res.json();
    const usecases = data[API_RESPONSE_KEYS.USECASES] || [];

    return NextResponse.json({
      [API_RESPONSE_KEYS.USECASES]: usecases,
    });
  } catch (error) {
    console.error("Error fetching usecases:", error);

    return NextResponse.json(
      { error: "Failed to fetch usecases" },
      { status: 500 }
    );
  }
}
