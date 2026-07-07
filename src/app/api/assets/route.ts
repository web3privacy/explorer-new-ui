import { API_RESPONSE_KEYS, API_URLS } from "@/lib/constants";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(API_URLS.EXPLORER_DATA);
    const data = await res.json();
    const assets = data[API_RESPONSE_KEYS.ASSETS] || [];

    return NextResponse.json({
      [API_RESPONSE_KEYS.ASSETS]: assets,
    });
  } catch (error) {
    console.error("Error fetching assets:", error);

    return NextResponse.json(
      { error: "Failed to fetch assets" },
      { status: 500 }
    );
  }
}
