import { API_RESPONSE_KEYS, API_URLS } from "@/lib/constants";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(API_URLS.EXPLORER_DATA);
    const data = await res.json();
    const phases = data[API_RESPONSE_KEYS.PROJECT_PHASES] || [];

    return NextResponse.json({
      [API_RESPONSE_KEYS.PROJECT_PHASES]: phases,
    });
  } catch (error) {
    console.error("Error fetching project phases:", error);

    return NextResponse.json(
      { error: "Failed to fetch project phases" },
      { status: 500 }
    );
  }
}
