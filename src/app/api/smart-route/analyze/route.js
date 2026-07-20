import { NextResponse } from "next/server";
import { analyzeRequest } from "@/lib/smartRouter";

/**
 * POST /api/smart-route/analyze
 * Analyzes a chat request and returns the optimal routing recommendation.
 * Does NOT execute the request.
 */
export async function POST(req) {
  try {
    const body = await req.json();
    
    if (!body || !body.messages) {
      return NextResponse.json(
        { error: "Invalid request. 'messages' array is required." },
        { status: 400 }
      );
    }

    // Extract options from query or headers if needed
    const { searchParams } = new URL(req.url);
    const strategy = searchParams.get("strategy") || undefined;
    const allowLocal = searchParams.get("allowLocal") !== "false";

    const result = await analyzeRequest(body, {
      strategy,
      allowLocal
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("[SmartRouter] Error analyzing request:", error);
    return NextResponse.json(
      { error: "Failed to analyze request", details: error.message },
      { status: 500 }
    );
  }
}
