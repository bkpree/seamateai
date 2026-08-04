import { NextRequest, NextResponse } from "next/server";
import { getFlightInfo } from "@/lib/aviationstack";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const flightNumber = searchParams.get("flight");

  if (!flightNumber) {
    return NextResponse.json(
      { error: "Flight number is required." },
      { status: 400 }
    );
  }

  try {
    const flight = await getFlightInfo(flightNumber);

    if (!flight) {
      return NextResponse.json(
        { error: "Flight not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(flight);
  } catch (error) {
    console.error("Flight API error:", error);

    return NextResponse.json(
      { error: "Something went wrong while fetching flight information." },
      { status: 500 }
    );
  }
}