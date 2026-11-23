"use client";

import { useEffect, useState, useMemo } from "react";
import type { Store } from "@/data/stores";
import { landmarks } from "@/data/landmarks";

interface CentreMapProps {
  stores: Store[];
  onSelect: (store: Store) => void;
  showValley?: boolean;
}

export function CentreMap({ stores, onSelect, showValley = true }: CentreMapProps) {
  const [MapContainer, setMapContainer] = useState<any>(null);
  const [TileLayer, setTileLayer] = useState<any>(null);
  const [Marker, setMarker] = useState<any>(null);
  const [Popup, setPopup] = useState<any>(null);
  const [L, setL] = useState<any>(null);
  const [ready, setReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [valley, setValley] = useState(false);
  const centre: [number, number] = [-26.4394, 31.1874];

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const leaflet = await import("leaflet");
      const RL = await import("react-leaflet");
      // @ts-ignore
      delete leaflet.Icon.Default.prototype._getIconUrl;
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
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
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    setMounted(false);
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, [stores, valley]);

  function toLatLng(store: Store): [number, number] {
    const x = (store.mapX ?? 50) / 100;
    const y = (store.mapY ?? 50) / 100;
    return [centre[0] + (0.5 - y) * 0.0024, centre[1] + (x - 0.5) * 0.0036];
  }

  const storeIcons = useMemo(() => {
    if (!L || !mounted) return {};
    const map: Record<string, any> = {};
    stores.forEach((store, index) => {
      const delay = Math.min(index * 45, 600);
      map[store.id] = L.divIcon({
        className: "gables-pin-wrap",
        html: `<div class="gables-pin" style="animation-delay:${delay}ms"><span class="gables-pin-dot">${store.name.charAt(0)}</span><span class="gables-pin-pulse"></span></div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -16],
      });
    });
    return map;
  }, [L, stores, mounted]);

  const landmarkIcons = useMemo(() => {
    if (!L) return {};
    const map: Record<string, any> = {};
    landmarks.forEach((lm) => {
      const isCentre = lm.type === "centre";
      map[lm.id] = L.divIcon({
        className: "gables-pin-wrap",
        html: `<div class="gables-landmark ${isCentre ? "is-centre" : ""}"><span class="gables-landmark-dot">${isCentre ? "G" : lm.name.charAt(0)}</span></div>`,
        iconSize: isCentre ? [40, 40] : [28, 28],
        iconAnchor: isCentre ? [20, 20] : [14, 14],
        popupAnchor: [0, -12],
      });
    });
    return map;
  }, [L]);

  if (!ready || !MapContainer) {
    return <div className="flex aspect-[16/10] w-full items-center justify-center rounded-2xl border border-forest/10 bg-forest/5 text-ink-muted">Loading map…</div>;
  }

  return (
    <div className="space-y-3">
      {showValley && (
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={() => setValley(false)} className={`rounded-full px-3 py-1.5 text-xs font-medium ${!valley ? "bg-forest text-white" : "bg-white text-ink-muted border border-forest/10"}`}>Centre layout</button>
          <button type="button" onClick={() => setValley(true)} className={`rounded-full px-3 py-1.5 text-xs font-medium ${valley ? "bg-forest text-white" : "bg-white text-ink-muted border border-forest/10"}`}>Ezulwini Valley</button>
        </div>
      )}
      <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl border border-forest/10 shadow-glass-sm">
        <style jsx global>{`
          .gables-pin-wrap { background: transparent !important; border: none !important; }
          .gables-pin { position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; opacity: 0; transform: scale(0.3) translateY(12px); animation: gables-pin-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          .gables-pin-dot { position: relative; z-index: 2; width: 28px; height: 28px; border-radius: 9999px; background: #0f2e1f; color: #f3efe6; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(15, 46, 31, 0.35); border: 2px solid #d95f43; }
          .gables-pin:hover .gables-pin-dot { transform: scale(1.15); background: #d95f43; color: #fff; }
          .gables-pin-pulse { position: absolute; inset: 0; border-radius: 9999px; background: rgba(217, 95, 67, 0.35); z-index: 1; animation: gables-pin-pulse 2s ease-out infinite; }
          .gables-landmark { display: flex; align-items: center; justify-content: center; animation: gables-pin-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          .gables-landmark-dot { width: 26px; height: 26px; border-radius: 9999px; background: #F3EFE6; color: #0f2e1f; font-size: 10px; font-weight: 700; display: flex; align-items: center; justify-content: center; border: 2px solid #0f2e1f; }
          .gables-landmark.is-centre .gables-landmark-dot { width: 34px; height: 34px; background: #d95f43; color: #fff; border-color: #F3EFE6; font-size: 13px; }
          @keyframes gables-pin-in { to { opacity: 1; transform: scale(1) translateY(0); } }
          @keyframes gables-pin-pulse { 0% { transform: scale(0.6); opacity: 0.7; } 100% { transform: scale(1.8); opacity: 0; } }
        `}</style>
        <MapContainer key={valley ? "valley" : "centre"} center={centre} zoom={valley ? 12 : 17} scrollWheelZoom={false} className="h-full w-full" style={{ background: "#F3EFE6" }}>
          <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
          {!valley && stores.map((store) => (
            <Marker key={store.id} position={toLatLng(store)} icon={storeIcons[store.id]} eventHandlers={{ click: () => onSelect(store) }}>
              <Popup><strong>{store.name}</strong><br />Shop {store.shopNumber}</Popup>
            </Marker>
          ))}
          {valley && landmarks.map((lm) => (
            <Marker key={lm.id} position={[lm.lat, lm.lng]} icon={landmarkIcons[lm.id]}>
              <Popup><strong>{lm.name}</strong><br />{lm.description}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
