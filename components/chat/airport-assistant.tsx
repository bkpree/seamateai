"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AirportAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hi! I’m SeaMate AI 👋

I can help with flights, dining, and transportation at Changi Airport.

🌏 Try chatting with me in:
English · Burmese · Indonesian · Tagalog ·
Malay · Tamil · Thai · Vietnamese`,
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
    setIsLoading(true);

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

      if (!response.ok) {
        const data = await response.json().catch(() => null);

        throw new Error(
          data?.error || "Something went wrong"
        );
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let assistantMessage = "";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "",
        },
      ]);

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        assistantMessage += chunk;

        setMessages((prev) => {
          const updated = [...prev];

          updated[updated.length - 1] = {
            role: "assistant",
            content: assistantMessage,
          };

          return updated;
        });
      }
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
    } finally {
      setIsLoading(false);
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
                className={`flex ${msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                  }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${msg.role === "user"
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-900"
                    }`}
                >
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => (
                        <p className="mb-2 last:mb-0">{children}</p>
                      ),
                      ul: ({ children }) => (
                        <ul className="mb-2 list-disc space-y-1 pl-5">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="mb-2 list-decimal space-y-1 pl-5">
                          {children}
                        </ol>
                      ),
                      li: ({ children }) => <li>{children}</li>,
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}

            {messages.length === 1 && !isLoading && (
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => setMessage("Where is my flight?")}
                  className="rounded-full border px-3 py-2 text-sm hover:bg-gray-50"
                >
                  ✈️ Check a flight
                </button>

                <button
                  onClick={() =>
                    setMessage("Where can I eat at Changi Airport?")
                  }
                  className="rounded-full border px-3 py-2 text-sm hover:bg-gray-50"
                >
                  🍜 Find food
                </button>

                <button
                  onClick={() =>
                    setMessage("How do I get to the city from Changi Airport?")
                  }
                  className="rounded-full border px-3 py-2 text-sm hover:bg-gray-50"
                >
                  🚇 Transport
                </button>
              </div>
            )}
            {isLoading && (
              <div className="flex items-center gap-2 px-4 py-3 text-sm text-gray-500">
                <div className="flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
                </div>
                <span>Thinking...</span>
              </div>
            )}
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
                disabled={isLoading}
                placeholder="Ask about Changi..."
                className="min-w-0 flex-1 rounded-lg border px-3 py-2 text-sm outline-none"
              />

              <button
                onClick={handleSend}
                disabled={isLoading}
                className="rounded-lg bg-black px-4 py-2 text-white"
              >
                {isLoading ? "..." : "→"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}