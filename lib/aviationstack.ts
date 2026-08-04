const AVIATIONSTACK_URL = "https://api.aviationstack.com/v1/flights";

export async function getFlightInfo(flightNumber: string) {
  const apiKey = process.env.AVIATIONSTACK_API_KEY;

  if (!apiKey) {
    throw new Error("Aviationstack API key is not configured.");
  }

  const url = new URL(AVIATIONSTACK_URL);

  url.searchParams.set("access_key", apiKey);
  url.searchParams.set(
    "flight_iata",
    flightNumber.trim().toUpperCase()
  );

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error("Unable to retrieve flight information.");
  }

  const data = await response.json();

  if (!data.data || data.data.length === 0) {
    return null;
  }

  const flight = data.data[0];

  return {
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
}