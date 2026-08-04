import Link from "next/link";
import { ArrowLeft, Plane } from "lucide-react";
import FlightSearch from "@/components/flight/flight-search";

export default function FlightPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <div className="mb-10">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
            <Plane className="text-blue-600" size={24} />
          </div>

          <h1 className="text-4xl font-bold tracking-tight">
            Flight Status
          </h1>

          <p className="mt-3 text-gray-600">
            Track departures, arrivals, gate information and flight status.
          </p>
        </div>

        <FlightSearch />

        
      </div>
    </main>
  );
}