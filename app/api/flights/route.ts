import { NextRequest, NextResponse } from "next/server";

const AVIATIONSTACK_URL = "https://api.aviationstack.com/v1/flights";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const flightNumber = searchParams.get("flight");

  if (!flightNumber) {
    return NextResponse.json(
      { error: "Flight number is required." },
      { status: 400 }
    );
  }

  const apiKey = process.env.AVIATIONSTACK_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Aviationstack API key is not configured." },
      { status: 500 }
    );
  }

  try {
    const url = new URL(AVIATIONSTACK_URL);

    url.searchParams.set("access_key", apiKey);
    url.searchParams.set("flight_iata", flightNumber.trim().toUpperCase());

    const response = await fetch(url.toString());

    if (!response.ok) {
      return NextResponse.json(
        { error: "Unable to retrieve flight information." },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      return NextResponse.json(
        { error: "Flight not found." },
        { status: 404 }
      );
    }

    const flight = data.data[0];

    const result = {
      flightNumber: flight.flight.iata,
      airline: flight.airline.name,
      status: flight.flight_status,

      departure: {
        airport: flight.departure.airport,
        iata: flight.departure.iata,
        terminal: flight.departure.terminal,
        gate: flight.departure.gate,
        scheduled: flight.departure.scheduled,
        actual: flight.departure.actual,
      },

      arrival: {
        airport: flight.arrival.airport,
        iata: flight.arrival.iata,
        terminal: flight.arrival.terminal,
        gate: flight.arrival.gate,
        baggage: flight.arrival.baggage,
        scheduled: flight.arrival.scheduled,
        estimated: flight.arrival.estimated,
        actual: flight.arrival.actual,
      },

      codeshare: flight.flight.codeshared
        ? {
            airline: flight.flight.codeshared.airline_name,
            flightNumber: flight.flight.codeshared.flight_iata,
          }
        : null,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Flight API error:", error);

    return NextResponse.json(
      { error: "Something went wrong while fetching flight information." },
      { status: 500 }
    );
  }
}