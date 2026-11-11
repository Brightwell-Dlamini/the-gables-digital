"use client";

import { useEffect, useState } from "react";
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
  const [ready, setReady] = useState(false);

  const centre: [number, number] = [-26.4394, 31.1874];

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = await import("leaflet");
      const RL = await import("react-leaflet");
      // @ts-ignore
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });
      if (!cancelled) {
        setMapContainer(() => RL.MapContainer);
        setTileLayer(() => RL.TileLayer);
        setMarker(() => RL.Marker);
        setPopup(() => RL.Popup);
        setReady(true);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  function toLatLng(store: Store): [number, number] {
    const x = (store.mapX ?? 50) / 100;
    const y = (store.mapY ?? 50) / 100;
    const dLat = 0.0012;
    const dLng = 0.0018;
    return [centre[0] + (0.5 - y) * dLat * 2, centre[1] + (x - 0.5) * dLng * 2];
  }

  if (!ready || !MapContainer) {
    return (
      <div className="flex aspect-[16/10] w-full items-center justify-center rounded-2xl border border-forest/10 bg-forest/5 text-ink-muted">
        Loading map…
      </div>
    );
  }

  return (
    <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl border border-forest/10 shadow-glass-sm">
      <MapContainer center={centre} zoom={17} scrollWheelZoom={false} className="h-full w-full" style={{ background: "#F3EFE6" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {stores.map((store) => (
          <Marker key={store.id} position={toLatLng(store)} eventHandlers={{ click: () => onSelect(store) }}>
            <Popup>
              <strong className="font-serif text-forest">{store.name}</strong>
              <br />
              Shop {store.shopNumber}
              <br />
              <button type="button" className="mt-1 text-xs text-terracotta underline" onClick={() => onSelect(store)}>
                View details
              </button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
