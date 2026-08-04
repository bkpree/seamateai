"use client";

import { useState } from "react";
import Image from "next/image";


  
export default function Navbar() {
  const [language, setLanguage] = useState("en");
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          {/* <Plane className="h-6 w-6 text-blue-600" /> */}

          <Image
          // className="dark:invert"
          src="/favicon.ico"
          alt="SEAmate AI logo"
          width={100}
          height={20}
          priority
        />

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