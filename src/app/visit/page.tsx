import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Car, Clock, Bus, Shield, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Visit & Directions",
  description:
    "How to get to The Gables Shopping Centre in Ezulwini, Eswatini — hours, parking, public transport and directions.",
};

const hours = [
  { day: "Monday – Friday", time: "09:00 – 17:00" },
  { day: "Saturday", time: "09:00 – 14:00" },
  { day: "Sunday", time: "09:00 – 13:00" },
];

const access = [
  {
    icon: Car,
    title: "Free secure parking",
    body: "Ample on-site parking with 24-hour security and an on-site police post.",
  },
  {
    icon: Bus,
    title: "Buses & tour groups",
    body: "Coach-friendly access and drop-off. School and tour groups are welcome — contact the centre to plan your visit.",
  },
  {
    icon: Shield,
    title: "Safe & family-friendly",
    body: "Well-lit courts, clear wayfinding and a family atmosphere in the heart of the Ezulwini Valley.",
  },
];

export default function VisitPage() {
  return (
    <div className="min-h-screen bg-sand">
      <section className="border-b border-forest/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-ink-muted">
            Plan your trip
          </p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-forest tracking-tight">
            Visit The Gables
          </h1>
          <p className="mt-3 max-w-2xl text-ink-muted leading-relaxed">
            Shebas Rocks, Ezulwini — minutes from Mantenga, Mlilwane and the road
            between Mbabane and Manzini. Free secure parking and easy access for
            cars, buses and tour groups.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="rounded-2xl border border-forest/10 bg-white p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <Clock className="h-5 w-5 text-terracotta" />
                  <h2 className="font-serif text-xl font-medium text-forest">
                    Opening hours
                  </h2>
                </div>
                <ul className="space-y-3">
                  {hours.map((row) => (
                    <li
                      key={row.day}
                      className="flex items-center justify-between text-sm border-b border-forest/5 pb-3 last:border-0 last:pb-0"
                    >
                      <span className="text-ink-muted">{row.day}</span>
                      <span className="font-medium tabular-nums text-forest">
                        {row.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-4 sm:grid-cols-1">
                {access.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-forest/10 bg-white p-5"
                  >
                    <item.icon className="h-5 w-5 text-terracotta mb-2" />
                    <h3 className="font-medium text-forest">{item.title}</h3>
                    <p className="mt-1 text-sm text-ink-muted leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="overflow-hidden rounded-2xl border border-forest/10 bg-forest/5 aspect-[4/3]">
                <iframe
                  title="The Gables Shopping Centre map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=31.175%2C-26.450%2C31.200%2C-26.428&layer=mapnik&marker=-26.4394%2C31.1874"
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="rounded-2xl border border-forest/10 bg-white p-6">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-5 w-5 text-terracotta" />
                  <h2 className="font-serif text-xl font-medium text-forest">
                    Address
                  </h2>
                </div>
                <p className="mt-2 text-ink-muted">
                  MR103, Shebas Rocks
                  <br />
                  Ezulwini, Kingdom of Eswatini
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button asChild variant="terracotta">
                    <a
                      href="https://maps.google.com/?q=The+Gables+Shopping+Centre+Ezulwini"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open in Google Maps
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href="tel:+26824161600" className="gap-2">
                      <Phone className="h-4 w-4" />
                      Call centre
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-forest/10 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-ink-muted mb-4">
            Looking for a particular store or the cinema schedule?
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild variant="terracotta">
              <Link href="/directory">Browse directory</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/events">Events & Movie Zone</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
