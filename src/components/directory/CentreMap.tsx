"use client";

import { useEffect, useState, useMemo } from "react";
import type { Store } from "@/data/stores";

interface CentreMapProps {
  stores: Store[];
  onSelect: (store: Store) => void;
}

export function CentreMap({ stores, onSelect }: CentreMapProps) {
  const [MapContainer, setMapContainer] = useState<any>(null);
  const [TileLayer, setTileLayer] = useState<any>(null);
  const [Marker, setMarker] = useState<any>(null);
  const [Popup, setPopup] = useState<any>(null);
  const [L, setL] = useState<any>(null);
  const [ready, setReady] = useState(false);
  const [mounted, setMounted] = useState(false);

  const centre: [number, number] = [-26.4394, 31.1874];

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const leaflet = await import("leaflet");
      const RL = await import("react-leaflet");
      // @ts-ignore
      delete leaflet.Icon.Default.prototype._getIconUrl;
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });
      if (!cancelled) {
        setL(leaflet);
        setMapContainer(() => RL.MapContainer);
        setTileLayer(() => RL.TileLayer);
        setMarker(() => RL.Marker);
        setPopup(() => RL.Popup);
        setReady(true);
        requestAnimationFrame(() => setMounted(true));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setMounted(false);
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, [stores]);

  function toLatLng(store: Store): [number, number] {
    const x = (store.mapX ?? 50) / 100;
    const y = (store.mapY ?? 50) / 100;
    const dLat = 0.0012;
    const dLng = 0.0018;
    return [
      centre[0] + (0.5 - y) * dLat * 2,
      centre[1] + (x - 0.5) * dLng * 2,
    ];
  }

  const icons = useMemo(() => {
    if (!L || !mounted) return {};
    const map: Record<string, any> = {};
    stores.forEach((store, index) => {
      const delay = Math.min(index * 45, 600);
      map[store.id] = L.divIcon({
        className: "gables-pin-wrap",
        html: `<div class="gables-pin" style="animation-delay:${delay}ms">
          <span class="gables-pin-dot">${store.name.charAt(0)}</span>
          <span class="gables-pin-pulse"></span>
        </div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -16],
      });
    });
    return map;
  }, [L, stores, mounted]);

  if (!ready || !MapContainer) {
    return (
      <div className="flex aspect-[16/10] w-full items-center justify-center rounded-2xl border border-forest/10 bg-forest/5 text-ink-muted dark:border-white/10 dark:bg-forest-800 dark:text-sand/70">
        Loading map…
      </div>
    );
  }

  return (
    <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl border border-forest/10 shadow-glass-sm dark:border-white/10">
      <style jsx global>{`
        .gables-pin-wrap { background: transparent !important; border: none !important; }
        .gables-pin {
          position: relative; width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transform: scale(0.3) translateY(12px);
          animation: gables-pin-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .gables-pin-dot {
          position: relative; z-index: 2; width: 28px; height: 28px;
          border-radius: 9999px; background: #0f2e1f; color: #f3efe6;
          font-size: 11px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 14px rgba(15, 46, 31, 0.35);
          border: 2px solid #d95f43;
          transition: transform 0.2s ease, background 0.2s ease;
        }
        .gables-pin:hover .gables-pin-dot {
          transform: scale(1.15); background: #d95f43; color: #fff;
        }
        .gables-pin-pulse {
          position: absolute; inset: 0; border-radius: 9999px;
          background: rgba(217, 95, 67, 0.35); z-index: 1;
          animation: gables-pin-pulse 2s ease-out infinite;
        }
        @keyframes gables-pin-in {
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes gables-pin-pulse {
          0% { transform: scale(0.6); opacity: 0.7; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        .dark .gables-pin-dot {
          background: #f3efe6; color: #0f2e1f; border-color: #d95f43;
        }
      `}</style>
      <MapContainer
        center={centre}
        zoom={17}
        scrollWheelZoom={false}
        className="h-full w-full"
        style={{ background: "#F3EFE6" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {stores.map((store) => (
          <Marker
            key={store.id}
            position={toLatLng(store)}
            icon={icons[store.id]}
            eventHandlers={{ click: () => onSelect(store) }}
          >
            <Popup>
              <strong className="font-serif text-forest">{store.name}</strong>
              <br />
              Shop {store.shopNumber}
              <br />
              <button
                type="button"
                className="mt-1 text-xs text-terracotta underline"
                onClick={() => onSelect(store)}
              >
                View details
              </button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
