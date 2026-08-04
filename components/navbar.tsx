import { Plane } from "lucide-react";

export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <Plane className="h-6 w-6 text-blue-600" />
          <div>
            <h1 className="text-lg font-bold">SeaMate AI</h1>
            <p className="text-xs text-gray-500">
              Multilingual Airport Concierge
            </p>
          </div>
        </div>

        <button className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50">
          🌐 English
        </button>
      </div>
    </header>
  );
}