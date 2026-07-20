import { NextResponse } from "next/server";
import { getCachedStatuses } from "@/lib/smartRouter/availabilityChecker";

/**
 * GET /api/smart-route/status
 * Returns the status of the E404R Smart Router and cached provider availabilities.
 */
export async function GET() {
  try {
    const strategy = process.env.E404R_ROUTING_STRATEGY || "balanced";
    const enabled = process.env.E404R_SMART_ROUTER === "true";
    
    const statuses = getCachedStatuses();

    return NextResponse.json({
      enabled,
      strategy,
      cacheSize: Object.keys(statuses).length,
      providerStatus: statuses,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve smart router status" },
      { status: 500 }
    );
  }
}
