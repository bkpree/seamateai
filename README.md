# SeaMate AI

SeaMate AI is a multilingual AI airport concierge designed to help passengers navigate Singapore Changi Airport. It provides flight information, airport dining recommendations, and transportation information through a conversational interface.

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

When a user sends a message, the request is sent to a Next.js API route. SEA-LION determines whether external information is required and can invoke one of three tools:

* `get_flight_info` — retrieves flight information such as status, terminal, gate, baggage belt, and arrival/departure times.
* `get_airport_services` — retrieves relevant airport services such as dining options based on terminal and area.
* `get_transport_info` — retrieves transportation information including MRT, buses, taxis, and ride-hailing.

The retrieved tool results are then passed back to SEA-LION, which generates a concise, passenger-friendly response.

This tool-calling approach helps prevent the AI from inventing real-time airport information by separating information retrieval from response generation.

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

English
Burmese
Indonesian
Filipino (Tagalog)
Malay
Tamil
Thai
Vietnamese

The assistant can respond in the language used by the passenger, allowing users to interact naturally without manually selecting a language.

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

Passengers can search for a flight number and view available flight information including:

*    Flight status
*    Departure and arrival airports
*    Arrival time
*    Terminal
*    Gate
*    Baggage information

### Airport Dining

Passengers can ask the assistant about available dining options at Changi Airport, including terminal and location information.

### Transportation

Passengers can ask about transportation options for travelling to and from Changi Airport.

### Demo

Example queries:

What is the status of SQ8663?

What food is available at Terminal 1?

How do I get to the city from Changi Airport?

Apa makanan yang tersedia di Terminal 1?

อาหารอะไรมีให้บริการที่อาคารผู้โดยสาร 1?

## Future Improvements

Potential future improvements include:

Expanding airport service coverage
Adding more real-time airport information
Supporting additional Southeast Asian languages
Integrating more personalised passenger assistance
Adding richer visual responses for flight and transport information