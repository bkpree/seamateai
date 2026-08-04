import OpenAI from "openai";
import { NextResponse } from "next/server";
import { getFlightInfo } from "@/lib/aviationstack";
import { getAirportServices } from "@/lib/airport-services";
import { getTransportInfo } from "@/lib/transport";

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
  {
    type: "function" as const,
    function: {
      name: "get_airport_services",
      description:
        "Find airport services and facilities at Singapore Changi Airport, such as food and dining options.",
      parameters: {
        type: "object",
        properties: {
          category: {
            type: "string",
            description:
              "The type of service the passenger is looking for, such as food.",
          },
          terminal: {
            type: "string",
            description:
              "The airport terminal, such as T1, T2, T3, or T4.",
          },
          area: {
            type: "string",
            description:
              "Whether the passenger is in the public area or transit area.",
          },
        },
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "get_transport_info",
      description:
        "Use this tool when the passenger asks how to travel to or from Changi Airport. This includes questions about MRT, trains, buses, taxis, private hire cars, Grab, or other ride-hailing services.",
      parameters: {
        type: "object",
        properties: {
          mode: {
            type: "string",
            description:
              "Transportation type if specified by the passenger. Use mrt for MRT/train questions, bus for bus questions, taxi for taxi questions, or ride-hailing for Grab/private hire questions. Leave empty if the passenger asks generally about transport.",
          },
        },
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

You currently help passengers with:
- Flight information
- Airport food and dining information
- Airport transportation information

LANGUAGE:
- Detect the language used by the passenger.
- Respond in the same language as the passenger.
- Support English, Burmese, Indonesian, Filipino (Tagalog), Malay, Tamil, Thai, and Vietnamese
- If the passenger mixes languages, respond primarily in the language they use most.
- Keep airport names, flight numbers, terminal numbers, gates, and other official identifiers unchanged.

IMPORTANT:
- Tool calls must use the structured parameters required by the tools, regardless of the language used by the passenger.
- Never invent or guess flight information.
- If the user asks about a specific flight, use the get_flight_info tool.
- Only state information returned by the tool.
- Prioritise information that is useful to passengers:
  1. Flight status
  2. Terminal
  3. Gate
  4. Baggage belt
  5. Arrival/departure time
- Do not mention codeshare information unless the passenger asks about it.
- If information is unavailable, say "Not available".
- For simple greetings such as "hello" or "hi", respond briefly and ask how you can help.
- Do not explain your capabilities unless the passenger asks.
- If the user asks about airport food or dining, use the get_airport_services tool.
- Do not invent airport service information.
- Only state airport service information returned by the tool.
- If the user does not specify a terminal or area, do not assume one.

RESPONSE FORMAT:
- Keep responses concise.
- Use short paragraphs or bullet points.
- Do not use Markdown headings.
- Do not use tables.
- Do not use bold, italics, or other Markdown formatting.
- Use emojis sparingly when useful.
- Put each important piece of information on its own line.
- For airport dining questions, list at most 5 relevant options.
- For each option, include only the name, cuisine, location, and opening hours.
- If there are more than 5 matches, mention that more options may be available.
- If the user asks for a specific terminal or area, prioritise options matching that request.
- If the user asks how to get to, leave, travel to, or travel from Changi Airport, ALWAYS use the get_transport_info tool.
- If the user mentions MRT, train, bus, taxi, Grab, private hire, or ride-hailing, ALWAYS use the get_transport_info tool.
- If the user asks generally about transportation without specifying a mode, use get_transport_info with no mode.- Do not invent transport information.
- Only state transport information returned by the tool.
- Do not provide live travel times, traffic conditions, fares, or route calculations.
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

        let result;

        if (toolCall.function.name === "get_flight_info") {
          result = await getFlightInfo(args.flightNumber);

          if (!result) {
            result = { error: "Flight not found." };
          }
        }

        if (toolCall.function.name === "get_airport_services") {
          console.log("FOOD TOOL CALLED", args);
          const services = getAirportServices({
            category: args.category,
            terminal: args.terminal,
            area: args.area,
          });

          if (services.length === 0) {
            result = { error: "No matching airport services found." };
          } else {
            result = {
              options: services.slice(0, 5).map((service) => ({
                name: service.name,
                cuisine: service.cuisine,
                location: `${service.area}, Level ${service.level}`,
                openingHours: service.openingHours,
              })),
              hasMore: services.length > 5,
            };
          }
        }

        if (toolCall.function.name === "get_transport_info") {
          console.log("TRANSPORT TOOL CALLED", args);
          const transports = getTransportInfo(args.mode);

          if (transports.length === 0) {
            result = { error: "No matching transport information found." };
          } else {
            result = transports.map((transport) => ({
              mode: transport.mode,
              name: transport.name,
              location: transport.location,
              description: transport.description,
            }));
          }
        }

        messages.push({
          role: "tool",
          tool_call_id: toolCall.id,
          content: JSON.stringify(result),
        });
      }

      console.log("CALLING FINAL SEA-LION RESPONSE");
      const finalResponse = await client.chat.completions.create({
        model: "aisingapore/Qwen-SEA-LION-v4.5-27B-IT",
        messages,
        stream: true,
      });

      const encoder = new TextEncoder();

      const stream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of finalResponse) {
              const content = chunk.choices[0]?.delta?.content;

              if (content) {
                controller.enqueue(encoder.encode(content));
              }
            }

            controller.close();
          } catch (error) {
            controller.error(error);
          }
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-cache",
        },
      });
    }

    return new Response(msg.content || "", {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);

    return NextResponse.json(
      { error: "Unable to process your request." },
      { status: 500 }
    );
  }
}