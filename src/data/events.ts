export interface MovieShow {
  id: string;
  title: string;
  rating: string;
  times: string[];
  genre?: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  tag?: string;
}

/** Mock showtimes — replace with live feed when available */
export const movieShowtimes: MovieShow[] = [
  {
    id: "wild-horizon",
    title: "The Wild Horizon",
    rating: "PG-13",
    times: ["14:00", "17:15", "20:30"],
    genre: "Adventure",
  },
  {
    id: "valley-stars",
    title: "Valley of Stars",
    rating: "PG",
    times: ["13:30", "16:45", "19:50"],
    genre: "Family",
  },
  {
    id: "night-gables",
    title: "Night at the Gables",
    rating: "16",
    times: ["15:00", "18:20", "21:00"],
    genre: "Drama",
  },
];

export const communityEvents: CommunityEvent[] = [
  {
    id: "spring",
    title: "Spring into Action",
    date: "Ongoing",
    description: "Celebrate the arrival of spring with special offers across fashion and lifestyle stores.",
    tag: "Promotion",
  },
  {
    id: "excursions",
    title: "School Excursions Welcome",
    date: "By arrangement",
    description: "The Gables welcomes school groups and tour buses. Contact us to plan your visit.",
    tag: "Community",
  },
  {
    id: "solar",
    title: "Solar Future",
    date: "Coming soon",
    description: "Rooftop solar installation underway — a major step toward cleaner energy for the centre.",
    tag: "Sustainability",
  },
];
