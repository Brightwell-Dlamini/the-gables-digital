export interface Showtimes {
  title: string;
  times: string[];
  rating: string;
  genre?: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  tag?: string;
}

export const showtimes: Showtimes[] = [
  {
    title: "The Wild Horizon",
    times: ["14:00", "17:15", "20:30"],
    rating: "PG-13",
    genre: "Adventure",
  },
  {
    title: "Valley of Stars",
    times: ["13:30", "16:45", "19:50"],
    rating: "PG",
    genre: "Family",
  },
  {
    title: "Night at the Gables",
    times: ["15:00", "18:20", "21:00"],
    rating: "16",
    genre: "Drama",
  },
  {
    title: "Ezulwini Echoes",
    times: ["12:45", "16:00", "19:15"],
    rating: "PG",
    genre: "Documentary",
  },
];

export const communityEvents: CommunityEvent[] = [
  {
    id: "spring",
    title: "Spring into Action",
    date: "Ongoing",
    description:
      "Celebrate the season with special offers across fashion and lifestyle stores throughout the centre.",
    tag: "Promotion",
  },
  {
    id: "excursions",
    title: "School Excursions Welcome",
    date: "By arrangement",
    description:
      "The Gables welcomes school groups and tour buses. Contact the centre to plan a safe, structured visit.",
    tag: "Community",
  },
  {
    id: "solar",
    title: "Solar Future",
    date: "Coming soon",
    description:
      "Rooftop solar installation is underway — a major step toward cleaner energy for the centre and the valley.",
    tag: "Sustainability",
  },
  {
    id: "weekend-market",
    title: "Weekend Artisan Corner",
    date: "Saturdays",
    description:
      "Local makers and food stalls in the open courts — coffee, craft and conversation.",
    tag: "Market",
  },
];
