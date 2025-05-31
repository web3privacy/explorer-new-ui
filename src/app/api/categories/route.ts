import { API_RESPONSE_KEYS, API_URLS } from "@/lib/constants";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(API_URLS.EXPLORER_DATA);
    const data = await res.json();
    const categories = data[API_RESPONSE_KEYS.CATEGORIES] || [];

    return NextResponse.json({
      [API_RESPONSE_KEYS.CATEGORIES]: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);

    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
