export interface Landmark {
  id: string;
  name: string;
  description: string;
  lat: number;
  lng: number;
  type: "centre" | "embassy" | "nature" | "town";
}

export const landmarks: Landmark[] = [
  {
    id: "the-gables",
    name: "The Gables Shopping Centre",
    description: "Your destination — 96+ brands, free parking, cinema.",
    lat: -26.4394,
    lng: 31.1874,
    type: "centre",
  },
  {
    id: "us-embassy",
    name: "U.S. Embassy Mbabane",
    description: "Approximately 15 minutes north toward Mbabane.",
    lat: -26.3267,
    lng: 31.1445,
    type: "embassy",
  },
  {
    id: "mantenga",
    name: "Mantenga Nature Reserve & Cultural Village",
    description: "Waterfalls, living culture and trails in the Ezulwini Valley.",
    lat: -26.4455,
    lng: 31.178,
    type: "nature",
  },
  {
    id: "mlilwane",
    name: "Mlilwane Wildlife Sanctuary",
    description: "Closest big-game experience to the valley.",
    lat: -26.48,
    lng: 31.19,
    type: "nature",
  },
  {
    id: "mbabane",
    name: "Mbabane",
    description: "Capital city — short drive via MR103.",
    lat: -26.3054,
    lng: 31.1367,
    type: "town",
  },
];
