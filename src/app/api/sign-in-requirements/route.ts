import { API_RESPONSE_KEYS, API_URLS } from "@/lib/constants";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(API_URLS.EXPLORER_DATA);
    const data = await res.json();
    const requirements = data[API_RESPONSE_KEYS.SIGN_IN_REQUIREMENTS] || [];

    return NextResponse.json({
      [API_RESPONSE_KEYS.SIGN_IN_REQUIREMENTS]: requirements,
    });
  } catch (error) {
    console.error("Error fetching sign-in requirements:", error);

    return NextResponse.json(
      { error: "Failed to fetch sign-in requirements" },
      { status: 500 }
    );
  }
}
