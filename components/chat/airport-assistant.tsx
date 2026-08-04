"use client";

import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AirportAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! How can I help you at Changi Airport?",
    },
  ]);

  const handleSend = async () => {
  if (!message.trim()) return;

  const userMessage = message.trim();

  setMessages((prev) => [
    ...prev,
    {
      role: "user",
      content: userMessage,
    },
  ]);

  setMessage("");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: userMessage,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong");
    }

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: data.reply,
      },
    ]);
  } catch (error) {
    console.error("Chat error:", error);

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content:
          "Sorry, I couldn't process your request right now.",
      },
    ]);
  }
};

  return (
    <>
      {/* Chat button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 rounded-full bg-black px-5 py-3 text-white shadow-lg"
        >
          💬 Ask Assistant
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 flex h-[500px] w-[360px] flex-col overflow-hidden rounded-2xl border bg-white shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4">
            <div>
              <h2 className="font-semibold">Airport Assistant</h2>
              <p className="text-xs text-gray-500">
                Changi Airport
              </p>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t p-3">
            <div className="flex gap-2">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }
                }}
                placeholder="Ask about Changi..."
                className="min-w-0 flex-1 rounded-lg border px-3 py-2 text-sm outline-none"
              />

              <button
                onClick={handleSend}
                className="rounded-lg bg-black px-4 py-2 text-white"
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}