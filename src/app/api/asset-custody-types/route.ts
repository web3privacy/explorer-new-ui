import { API_RESPONSE_KEYS, API_URLS } from "@/lib/constants";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(API_URLS.EXPLORER_DATA);
    const data = await res.json();
    const custodyTypes = data[API_RESPONSE_KEYS.ASSET_CUSTODY_TYPES] || [];

    return NextResponse.json({
      [API_RESPONSE_KEYS.ASSET_CUSTODY_TYPES]: custodyTypes,
    });
  } catch (error) {
    console.error("Error fetching asset custody types:", error);

    return NextResponse.json(
      { error: "Failed to fetch asset custody types" },
      { status: 500 }
    );
  }
}
