export type TransportMode =
  | "mrt"
  | "bus"
  | "taxi"
  | "ride-hailing";

export type TransportInfo = {
  mode: TransportMode;
  name: string;
  location: string;
  description: string;
};

export const transportInfo: TransportInfo[] = [
  {
    mode: "mrt",
    name: "MRT",
    location: "Changi Airport MRT Station (CG2), between Terminal 2 and Terminal 3",
    description:
      "The station is directly linked to Terminal 2 and Terminal 3. Passengers can transfer at Tanah Merah or Expo to continue towards the city.",
  },
  {
    mode: "bus",
    name: "Public Bus",
    location:
      "Basement bus bays at Terminals 1, 2 and 3; designated bus stops at Terminal 4",
    description:
      "Public bus services connect Changi Airport with different parts of Singapore.",
  },
  {
    mode: "taxi",
    name: "Taxi",
    location: "Arrival areas at Terminals 1, 2, 3 and 4",
    description:
      "Taxi stands are available at the Arrival areas of all four terminals. Fares are metered.",
  },
  {
    mode: "ride-hailing",
    name: "Ride-hailing",
    location: "Designated pickup points at Terminals 1, 2, 3 and 4",
    description:
      "Passengers can book private hire cars through services such as Grab, Gojek, Zig, Tada, Ryde and Geolah.",
  },
];

export function getTransportInfo(mode?: string) {
  if (!mode) {
    return transportInfo;
  }

  return transportInfo.filter(
    (transport) =>
      transport.mode.toLowerCase() === mode.toLowerCase()
  );
}