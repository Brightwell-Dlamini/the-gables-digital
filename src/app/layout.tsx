import type { Metadata } from "next";
import { Lora, Inter } from "next/font/google";
import "./globals.css";
import { UtilityBar } from "@/components/UtilityBar";
import { Navbar } from "@/components/Navbar";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { MagneticCursor } from "@/components/providers/MagneticCursor";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "The Gables Shopping Centre | Ezulwini, Eswatini",
    template: "%s | The Gables Ezulwini",
  },
  description:
    "Your premier shopping destination in the heart of Ezulwini Valley. Discover 96+ stores, dining, cinema, banking and free secure parking at The Gables Shopping Centre.",
  keywords: ["The Gables", "Ezulwini", "Eswatini", "shopping centre", "mall", "Pick n Pay", "Woolworths", "Movie Zone"],
  openGraph: {
    title: "The Gables Shopping Centre | Ezulwini",
    description: "Modern alpine lifestyle meets African sun. Shop, dine and experience the best of Ezulwini at The Gables.",
    url: "https://thegables.digital",
    siteName: "The Gables",
    locale: "en_SZ",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ShoppingCenter",
  name: "The Gables Shopping Centre",
  description: "Premier shopping destination in Ezulwini, Eswatini with 96+ tenants, free secure parking, cinema, banking and dining.",
  url: "https://thegables.digital",
  address: {
    "@type": "PostalAddress",
    streetAddress: "MR103, Shebas Rocks",
    addressLocality: "Ezulwini",
    addressCountry: "SZ",
  },
  geo: { "@type": "GeoCoordinates", latitude: -26.4394, longitude: 31.1874 },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "17:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "14:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "09:00", closes: "13:00" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn(lora.variable, inter.variable)}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossOrigin="" />
      </head>
      <body className="min-h-screen bg-sand font-sans antialiased">
        <ThemeProvider>
          <SmoothScroll>
            <UtilityBar />
            <Navbar />
            <main id="main-content">{children}</main>
            <MagneticCursor />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
