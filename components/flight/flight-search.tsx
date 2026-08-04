"use client";

import { useState } from "react";
import { Search, Plane, Clock3, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

function formatSingaporeTime(
  actual: string | null,
  estimated: string | null, 
  scheduled: string | null
) {
  const time = actual ?? estimated ?? scheduled;

  if (!time) return "Not available";

  return new Intl.DateTimeFormat("en-SG", {
    timeZone: "Asia/Singapore",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(time));
}

interface FlightResult {
  flightNumber: string;
  airline: string;
  status: string;
  departure: {
    airport: string;
    iata: string;
    terminal: string | null;
    gate: string | null;
    scheduled: string | null;
    estimated: string | null;
    actual: string | null;
  };
  arrival: {
    airport: string;
    iata: string;
    terminal: string | null;
    gate: string | null;
    baggage: string | null;
    scheduled: string | null;
    estimated: string | null;
    actual: string | null;
  };
  codeshare: {
    airline: string;
    flightNumber: string;
  } | null;

}



export default function FlightSearch() {
  const [flightNumber, setFlightNumber] = useState("");
  const [flight, setFlight] = useState<FlightResult | null>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (
  event: React.FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  const cleanedFlightNumber = flightNumber.trim().toUpperCase();

  if (!cleanedFlightNumber) {
    return;
  }

  setSearched(false);
  setFlight(null);
  setLoading(true);

  try {
    const response = await fetch(
      `/api/flights?flight=${encodeURIComponent(cleanedFlightNumber)}`
    );

    if (!response.ok) {
      setSearched(true);
      setFlight(null);
      return;
    }

    const data = await response.json();

    setFlight(data);
    setSearched(true);
  } catch (error) {
    console.error("Flight search error:", error);
    setSearched(true);
    setFlight(null);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label
                htmlFor="flight-number"
                className="mb-2 block text-sm font-medium"
              >
                Flight number
              </label>

              <div className="flex gap-3">
                <Input
                  id="flight-number"
                  placeholder="e.g. SQ322"
                  value={flightNumber}
                  onChange={(event) => {setFlightNumber(event.target.value);
                    setSearched(false);
                    setFlight(null);
                  }}
                />

                <Button type="submit" disabled={loading}>
  <Search size={16} />
  {loading ? "Searching..." : "Search"}
</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>


      {/* Loading state */}
{loading && (
  <div className="py-12 text-center">
    <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />

    <h2 className="text-lg font-semibold">
      Finding your flight...
    </h2>

    <p className="mt-2 text-sm text-gray-500">
      We're checking the latest flight information.
    </p>
  </div>
)}

{/* Empty state */}
{!searched && !loading && (
  <div className="py-12 text-center">
    <Plane className="mx-auto mb-4 text-gray-400" size={40} />

    <h2 className="text-lg font-semibold">
      Search for your flight
    </h2>

    <p className="mt-2 text-sm text-gray-500">
      Enter your flight number to view the latest information.
    </p>
  </div>
)}

      {/* No result */}
      {searched && !flight && (
        <Card>
          <CardContent className="py-12 text-center">
            <h2 className="font-semibold">
              Flight not found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              We couldn't find a flight matching{" "}
              <span className="font-medium">{flightNumber.toUpperCase()}</span>.
              Check the flight number and try again.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Result */}
      {flight && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {flight.airline}
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  {flight.flightNumber}
                </h2>
              </div>

              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                {flight.status}
              </span>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-xs text-gray-500">
            From
          </p>

          <p className="font-medium">
            {flight.departure.iata}
          </p>

          <p className="text-sm text-gray-500">
            {flight.departure.airport}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">
            To
          </p>

          <p className="font-medium">
            {flight.arrival.iata}
          </p>

          <p className="text-sm text-gray-500">
            {flight.arrival.airport}
          </p>
        </div>
      </div>

         <div>
    <p className="text-xs text-gray-500">
      Arrival
    </p>


    <p className="font-medium">
      {formatSingaporeTime(flight.arrival.actual,flight.arrival.estimated, flight.arrival.scheduled
)}
    </p>
  </div>
        
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        <div>
          <p className="text-xs text-gray-500">
            Terminal
          </p>

          <p className="font-medium">
            {flight.arrival.terminal ?? "Not available"}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">
            Gate
          </p>

          <p className="font-medium">
            {flight.arrival.gate ?? "Not available"}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">
            Baggage
          </p>

          <p className="font-medium">
            {flight.arrival.baggage ?? "Not available"}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
      )}
    </div>
  );
}