import Link from "next/link";
import { ArrowLeft, TrainFront } from "lucide-react";

export default function TransportPage() {
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
            <TrainFront className="text-blue-600" size={24} />
          </div>

          <h1 className="text-4xl font-bold tracking-tight">
            Transportation
          </h1>

          <p className="mt-3 text-gray-600">
            Plan your journey with MRT, taxis, buses and ride-hailing options.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          <p className="text-gray-500">
            Transportation information coming next...
          </p>
        </div>
      </div>
    </main>
  );
}