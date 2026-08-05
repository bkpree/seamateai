import Image from "next/image";

export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center px-6 py-4">
        <div className="flex items-center gap-3">
          <Image
            src="/favicon.ico"
            alt="SeaMate AI logo"
            width={40}
            height={40}
            priority
          />

          <div>
            <h1 className="text-lg font-bold text-gray-900">
              SeaMate AI
            </h1>

            <p className="text-xs text-gray-500">
              Multilingual Airport Concierge
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}