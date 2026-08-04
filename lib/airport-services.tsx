export type AirportService = {
  name: string;
  category: "food";
  cuisine?: string;
  terminal: string;
  area: "public" | "transit";
  level?: string;
  unit?: string;
  openingHours?: string;
};

export const airportServices: AirportService[] = [
  {
    name: "A Noodle Story",
    category: "food",
    cuisine: "Singaporean-Japanese",
    terminal: "T1",
    area: "transit",
    level: "2",
    unit: "#02-K19",
    openingHours: "24 hours",
  },
  {
    name: "Anjappar",
    category: "food",
    cuisine: "Indian",
    terminal: "T1",
    area: "public",
    level: "3",
    unit: "#03-20",
    openingHours: "24 hours",
  },
  {
    name: "Jamba",
    category: "food",
    cuisine: "Smoothies & drinks",
    terminal: "T1",
    area: "public",
    level: "2",
    openingHours: "10am–10pm",
  },
  {
    name: "Chatterbox Express",
    category: "food",
    cuisine: "Singaporean",
    terminal: "T1",
    area: "transit",
    level: "2",
    openingHours: "6am–2am",
  },
  {
    name: "SG Hawker",
    category: "food",
    cuisine: "Singaporean",
    terminal: "T1",
    area: "transit",
    level: "3",
    openingHours: "24 hours",
  },
  {
    name: "Saboten",
    category: "food",
    cuisine: "Japanese",
    terminal: "T1",
    area: "public",
    level: "3",
    openingHours: "10am–11pm",
  },
];

export function getAirportServices({
  category,
  terminal,
  area,
}: {
  category?: string;
  terminal?: string;
  area?: string;
}) {
  return airportServices.filter((service) => {
    const matchesCategory =
      !category ||
      service.category.toLowerCase() === category.toLowerCase();

    const matchesTerminal =
      !terminal ||
      service.terminal.toLowerCase() === terminal.toLowerCase();

    const matchesArea =
      !area ||
      service.area.toLowerCase() === area.toLowerCase();

    return matchesCategory && matchesTerminal && matchesArea;
  });
}