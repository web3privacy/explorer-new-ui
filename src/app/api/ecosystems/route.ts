import { API_RESPONSE_KEYS, API_URLS } from "@/lib/constants";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(API_URLS.EXPLORER_DATA);
    const data = await res.json();
    const ecosystems = data[API_RESPONSE_KEYS.ECOSYSTEMS] || [];

    return NextResponse.json({
      [API_RESPONSE_KEYS.ECOSYSTEMS]: ecosystems,
    });
  } catch (error) {
    console.error("Error fetching ecosystems:", error);

    return NextResponse.json(
      { error: "Failed to fetch ecosystems" },
      { status: 500 }
    );
  }
}
