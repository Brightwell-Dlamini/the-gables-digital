import type { Metadata } from "next";
import { Lora, Inter } from "next/font/google";
import "./globals.css";
import { UtilityBar } from "@/components/UtilityBar";
import { Navbar } from "@/components/Navbar";
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
  keywords: [
    "The Gables",
    "Ezulwini",
    "Eswatini",
    "shopping centre",
    "mall",
    "Pick n Pay",
    "Woolworths",
    "Movie Zone",
  ],
  openGraph: {
    title: "The Gables Shopping Centre | Ezulwini",
    description:
      "Modern alpine lifestyle meets African sun. Shop, dine and experience the best of Ezulwini at The Gables.",
    url: "https://thegables.digital",
    siteName: "The Gables",
    locale: "en_SZ",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(lora.variable, inter.variable)}>
      <body className="min-h-screen bg-sand font-sans antialiased">
        <UtilityBar />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
