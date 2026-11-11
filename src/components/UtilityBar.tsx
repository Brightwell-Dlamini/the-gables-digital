"use client";

import { useEffect, useState } from "react";
import { Cloud, Car, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export function UtilityBar() {
  const [status, setStatus] = useState<{
    isOpen: boolean;
    label: string;
  }>({ isOpen: false, label: "Checking hours…" });
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Africa/Mbabane" })
      );
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const day = now.getDay();

      let openHour = 9;
      let closeHour = 17;
      if (day === 0) {
        closeHour = 13;
      } else if (day === 6) {
        closeHour = 14;
      }

      const currentMinutes = hours * 60 + minutes;
      const openMinutes = openHour * 60;
      const closeMinutes = closeHour * 60;
      const isOpen =
        currentMinutes >= openMinutes && currentMinutes < closeMinutes;

      const closeLabel = `${String(closeHour).padStart(2, "0")}:00`;
      const openLabel = "09:00";

      setStatus({
        isOpen,
        label: isOpen
          ? `Open Now · Closes ${closeLabel}`
          : `Closed · Opens ${openLabel}`,
      });

      setTimeStr(
        now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };

    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full bg-forest text-white text-xs sm:text-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-9 items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "inline-block h-2 w-2 rounded-full",
                status.isOpen ? "bg-emerald-400" : "bg-red-400"
              )}
              aria-hidden
            />
            <span className="font-medium tracking-wide">{status.label}</span>
            <span className="hidden text-white/60 sm:inline">· {timeStr} SAST</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button
              type="button"
              className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors"
              aria-label="Quick parking information"
            >
              <Car className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Free Secure Parking</span>
            </button>

            <div className="flex items-center gap-1.5 text-white/90">
              <Cloud className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Ezulwini</span>
              <span className="tabular-nums">22°</span>
            </div>

            <a
              href="https://maps.google.com/?q=The+Gables+Shopping+Centre+Ezulwini"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors"
            >
              <MapPin className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Directions</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
