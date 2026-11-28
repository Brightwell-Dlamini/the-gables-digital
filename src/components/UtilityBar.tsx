"use client";

import { useEffect, useState } from "react";
import { Car, MapPin, Cloud } from "lucide-react";
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

      let closeHour = 17;
      if (day === 0) closeHour = 13;
      else if (day === 6) closeHour = 14;

      const currentMinutes = hours * 60 + minutes;
      const isOpen =
        currentMinutes >= 9 * 60 && currentMinutes < closeHour * 60;

      const closeLabel = `${String(closeHour).padStart(2, "0")}:00`;

      setStatus({
        isOpen,
        label: isOpen
          ? `Open now · Closes ${closeLabel}`
          : `Closed · Opens 09:00`,
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
    <div className="w-full bg-forest text-white text-[11px] sm:text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-9 items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              {status.isOpen && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              )}
              <span
                className={cn(
                  "relative inline-flex h-1.5 w-1.5 rounded-full",
                  status.isOpen ? "bg-emerald-400" : "bg-red-400"
                )}
              />
            </span>
            <span className="font-semibold tracking-wide truncate">
              {status.label}
            </span>
            <span className="hidden text-white/50 sm:inline tabular-nums">
              · {timeStr} SAST
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            <span className="hidden items-center gap-1.5 text-white/85 sm:inline-flex">
              <Car className="h-3.5 w-3.5" />
              Free parking
            </span>
            <span className="inline-flex items-center gap-1.5 text-white/85">
              <Cloud className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Ezulwini</span>
              <span className="tabular-nums">22°</span>
            </span>
            <a
              href="https://maps.google.com/?q=The+Gables+Shopping+Centre+Ezulwini"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-white/90 transition-colors hover:text-terracotta"
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
