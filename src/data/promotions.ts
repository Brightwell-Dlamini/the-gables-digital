export interface Promotion {
  id: string;
  title: string;
  summary: string;
  tag: string;
  href?: string;
  featured?: boolean;
}

export const promotions: Promotion[] = [
  {
    id: "spring",
    title: "Spring into Action",
    summary:
      "Seasonal offers across fashion, beauty and lifestyle stores. Refresh your wardrobe under the Ezulwini sun.",
    tag: "Seasonal",
    href: "/events",
    featured: true,
  },
  {
    id: "solar",
    title: "The Gables Solar",
    summary:
      "Rooftop solar is coming — cleaner energy for the centre and a greener future for the valley.",
    tag: "Sustainability",
    href: "/about#sustainability",
    featured: true,
  },
  {
    id: "excursions",
    title: "School & Tour Groups",
    summary:
      "We welcome excursions and tour buses. Structured visits, free parking and a safe, memorable day out.",
    tag: "Community",
    href: "/contact",
  },
  {
    id: "weekend",
    title: "Weekend Artisan Corner",
    summary:
      "Local makers and food stalls in the open courts every Saturday — craft, coffee and conversation.",
    tag: "Market",
    href: "/events",
  },
];
