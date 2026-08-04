"use client";

import { useState } from "react";
import { Search, Plane, Clock3, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface FlightResult {
  flightNumber: string;
  airline: string;
  route: string;
  departureTime: string;
  gate: string;
  terminal: string;
  status: string;
}

const mockFlight: FlightResult = {
  flightNumber: "SQ322",
  airline: "Singapore Airlines",
  route: "SIN → LHR",
  departureTime: "18:45",
  gate: "B12",
  terminal: "3",
  status: "Boarding",
};

export default function FlightSearch() {
  const [flightNumber, setFlightNumber] = useState("");
  const [flight, setFlight] = useState<FlightResult | null>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanedFlightNumber = flightNumber.trim().toUpperCase();

    if (!cleanedFlightNumber) {
      return;
    }

    setSearched(true);
    setFlight(null);
    setLoading(true);



    // Temporary mock search.
    // We'll replace this with the FlightLabs API later.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (cleanedFlightNumber === "SQ322") {
      setFlight(mockFlight);
    }
    setSearched(true);
    setLoading(false);
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

      {/* Empty state
      {!searched && (
        <div className="py-12 text-center">
          <Plane className="mx-auto mb-4 text-gray-400" size={40} />

          <h2 className="text-lg font-semibold">
            Search for your flight
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Enter your flight number to view the latest information.
          </p>
        </div>
      )} */}

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

            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              <div className="flex gap-3">
                <MapPin className="text-blue-600" size={20} />

                <div>
                  <p className="text-xs text-gray-500">Route</p>
                  <p className="font-medium">{flight.route}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Clock3 className="text-blue-600" size={20} />

                <div>
                  <p className="text-xs text-gray-500">Departure</p>
                  <p className="font-medium">{flight.departureTime}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Plane className="text-blue-600" size={20} />

                <div>
                  <p className="text-xs text-gray-500">Gate</p>
                  <p className="font-medium">
                    Terminal {flight.terminal}, Gate {flight.gate}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}