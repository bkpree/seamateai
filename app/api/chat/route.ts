import OpenAI from "openai";
import { NextResponse } from "next/server";
import { getFlightInfo } from "@/lib/aviationstack";

const client = new OpenAI({
  apiKey: process.env.SEA_LION_API_KEY,
  baseURL: "https://api.sea-lion.ai/v1",
});

const tools = [
  {
    type: "function" as const,
    function: {
      name: "get_flight_info",
      description:
        "Get real-time flight information for a flight arriving at or departing from Singapore Changi Airport.",
      parameters: {
        type: "object",
        properties: {
          flightNumber: {
            type: "string",
            description:
              "The IATA flight number, for example SQ8663.",
          },
        },
        required: ["flightNumber"],
      },
    },
  },
];

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message?.trim()) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const messages: any[] = [
      {
        role: "system",
        content: `
You are a passenger support assistant for Singapore Changi Airport.

You can currently help passengers with flight information.

IMPORTANT:
- Never invent or guess flight information.
- If the user asks about a specific flight, use the get_flight_info tool.
- Only state information returned by the tool.
- Prioritise information that is useful to passengers:
  1. Flight status
  2. Terminal
  3. Gate
  4. Baggage belt
  5. Arrival/departure time
- Do not mention codeshare information unless the user asks about it.
- If a piece of information is unavailable, say "Not available".
- Keep responses concise and easy to scan.
- Use short paragraphs or bullet points when appropriate.
        `,
      },
      {
        role: "user",
        content: message,
      },
    ];

    const response = await client.chat.completions.create({
      model: "aisingapore/Qwen-SEA-LION-v4.5-27B-IT",
      messages,
      tools,
      tool_choice: "auto",
    });

    const msg = response.choices[0].message;

    if (msg.tool_calls && msg.tool_calls.length > 0) {
      messages.push(msg);

      for (const toolCall of msg.tool_calls) {
        if (toolCall.type !== "function") continue;

        const args = JSON.parse(toolCall.function.arguments);

        const result = await getFlightInfo(args.flightNumber);

        messages.push({
          role: "tool",
          tool_call_id: toolCall.id,
          content: JSON.stringify(
            result ?? { error: "Flight not found." }
          ),
        });
      }

      const finalResponse = await client.chat.completions.create({
        model: "aisingapore/Qwen-SEA-LION-v4.5-27B-IT",
        messages,
      });

      return NextResponse.json({
        reply: finalResponse.choices[0].message.content,
      });
    }

    return NextResponse.json({
      reply: msg.content,
    });
  } catch (error) {
    console.error("Chat API error:", error);

    return NextResponse.json(
      { error: "Unable to process your request." },
      { status: 500 }
    );
  }
}