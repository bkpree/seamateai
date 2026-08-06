# SeaMate AI

SeaMate AI is a prototype multilingual AI airport concierge designed around the passenger support needs of a regional airport, using Singapore Changi Airport as the example environment. It provides flight information, airport dining recommendations, transportation information, and conversational assistance through a single chat interface.

**Live Demo:** https://seamateai.vercel.app/

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/bkpree/seamateai
cd seamateai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
SEA_LION_API_KEY=your_sea_lion_api_key
AVIATIONSTACK_API_KEY=your_aviationstack_api_key
```

### 4. Start the development server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Technical Approach

SeaMate AI uses a Next.js application with a conversational AI interface.

When a passenger sends a message, the request is sent to a Next.js API route. SEA-LION interprets the request and can invoke one of three tools depending on the passenger's intent:

* `get_flight_info` — retrieves flight information such as status, terminal, gate, baggage belt, and arrival/departure times.
* `get_airport_services` — retrieves relevant airport services such as dining options based on terminal and area.
* `get_transport_info` — retrieves transportation information including MRT, buses, taxis, and ride-hailing.

The retrieved tool results are passed back to SEA-LION, which generates a concise, passenger-friendly response in the passenger's language.

This tool-calling approach helps reduce the risk of the AI inventing airport information by separating information retrieval from response generation. Flight information is retrieved through the AviationStack API, while airport service and transportation information are retrieved from the prototype's structured data.

## AI Model / Framework

### SEA-LION

SeaMate AI uses **SEA-LION (Southeast Asian Languages in One Network)** as its conversational AI model.

SEA-LION is used to:

* Understand passenger queries
* Determine when an external tool is required
* Process tool results
* Generate natural-language responses
* Support multilingual interactions across Southeast Asian languages

The model is accessed through an OpenAI-compatible API using the OpenAI JavaScript SDK.

Passengers can interact with SeaMate AI in:

*    English
*    Burmese
*    Indonesian
*    Filipino (Tagalog)
*    Malay
*    Tamil
*    Thai
*    Vietnamese

The assistant detects the language used by the passenger and responds in the same language, reducing the need for passengers to navigate a separate language-selection interface.

### Technology Stack

* Next.js
* React
* TypeScript
* Tailwind CSS
* SEA-LION
* AviationStack API
* Lucide React
* OpenAI JavaScript SDK

## Key Features
### Multilingual AI Concierge

Conversational airport assistance across eight Southeast Asian languages.

### Flight Status

Passengers can search for a flight number through the Flight Status interface and retrieve available flight information including:

* Flight status
* Departure and arrival airports
* Arrival and departure times
* Terminal
* Gate
* Baggage information

Flight information is retrieved through the AviationStack API.

### AI Airport Concierge

Passengers can ask questions through the conversational interface and receive assistance with:

* Airport dining
* Transportation
* Flight information

## Design Considerations

The prototype focuses on four common passenger support areas:

1. Flight information
2. Airport services and dining
3. Transportation
4. Multilingual conversational assistance

These areas were selected because they represent routine enquiries that passengers may otherwise need to resolve through information counters or by searching across multiple information channels.

The prototype demonstrates how AI can act as a conversational interface over structured airport information, while keeping factual information retrieval separate from AI-generated responses.

### Demo

Example queries:

*    What is the status of SQ8663?

*    What food is available at Terminal 1?

*    How do I get to the city from Changi Airport?

*    Apa makanan yang tersedia di Terminal 1?

*    อาหารอะไรมีให้บริการที่อาคารผู้โดยสาร 1?

## Future Improvements

Potential future improvements include:

* Integrating additional official airport data sources for more comprehensive and real-time information.
* Expanding airport service and facility coverage.
* Adding indoor wayfinding and navigation capabilities.
* Supporting additional languages and accessibility features.
* Integrating more personalised passenger assistance.
* Adding richer visual responses for flight, transport, and wayfinding information.
* Adding monitoring and evaluation metrics to measure reductions in routine service enquiries and passenger satisfaction.