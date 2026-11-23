import type { MediaAsset } from "@/lib/supabase/data";

/** Default media slots used when Supabase is offline / first load. */
export const DEFAULT_MEDIA: MediaAsset[] = [
  {
    id: "media-hero-video",
    slot: "hero_video",
    label: "Homepage hero video",
    kind: "video",
    url: "https://cdn.coverr.co/videos/coverr-shopping-mall-exterior-5644/1080p.mp4",
    poster_url:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80",
    alt: "Open-air retail at The Gables",
  },
  {
    id: "media-hero-poster",
    slot: "hero_poster",
    label: "Homepage hero poster",
    kind: "image",
    url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80",
    alt: "The Gables Shopping Centre",
  },
  {
    id: "media-about",
    slot: "about_hero",
    label: "About page hero",
    kind: "image",
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80",
    alt: "Valley lifestyle at The Gables",
  },
  {
    id: "media-leasing",
    slot: "leasing_hero",
    label: "Leasing page visual",
    kind: "image",
    url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80",
    alt: "Retail space at The Gables",
  },
];

export function mediaBySlot(
  assets: MediaAsset[],
  slot: string
): MediaAsset | undefined {
  return assets.find((a) => a.slot === slot);
}
