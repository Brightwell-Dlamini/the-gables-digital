import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Building2, Shield, Leaf } from "lucide-react";

export const metadata = {
  title: "About",
  description:
    "The Gables Shopping Centre — a value and convenience inspired destination in the heart of Shebas Rocks, Ezulwini, Eswatini.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-sand">
      <section className="border-b border-forest/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-ink-muted">Our Story</p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-forest tracking-tight max-w-3xl text-balance">
            The centre of choice in the Ezulwini Valley
          </h1>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-ink leading-relaxed">
            The Gables Shopping Center is a retail and office development situated in a superb, convenient location close to two national parks. The centre is in close proximity to Mbabane, Matsapha and Manzini and is well connected with public transport and plenty of accommodation options in the vicinity.
          </p>
          <p className="mt-6 text-ink-muted leading-relaxed">
            Located in the heart of Shebas Rocks, Ezulwini in the Kingdom of Eswatini, The Gables is a value and convenience inspired shopping destination. Home to a variety of well-known stores, restaurants, a cinema, banks and a wide range of retail, it offers free and secure parking across 24,115 m² of retail space and more than 96 tenants.
          </p>
          <p className="mt-6 text-ink-muted leading-relaxed">
            The architectural character draws from Dutch-style influences, with clearly identified court areas that make navigation simple and the overall experience memorable. Anchors such as Pick n Pay, Woolworths, Shoprite and Clicks sit alongside fashion, dining and service brands that define the Ezulwini retail landscape.
          </p>
        </div>
      </section>

      <section className="border-y border-forest/10 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Building2, title: "24,115 m²", text: "Retail & office space with over 96 tenants" },
              { icon: MapPin, title: "Prime location", text: "Shebas Rocks, Ezulwini — close to national parks" },
              { icon: Shield, title: "Safe & secure", text: "On-site police post, 24hr security, free parking" },
              { icon: Leaf, title: "Sustainable future", text: "Rooftop solar installation coming soon" },
            ].map((item) => (
              <div key={item.title} className="text-center sm:text-left">
                <div className="mx-auto sm:mx-0 flex h-12 w-12 items-center justify-center rounded-full bg-forest/5 text-forest">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-serif text-xl font-medium text-forest">{item.title}</h3>
                <p className="mt-1 text-sm text-ink-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-forest">Ready to explore or lease?</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button asChild variant="terracotta">
              <Link href="/directory">Browse Directory</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/leasing">Lease a Space</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
