"use client";

import { usePathname } from "next/navigation";
import { UtilityBar } from "@/components/UtilityBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function PublicChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <UtilityBar />
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
