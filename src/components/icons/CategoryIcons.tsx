"use client";

import type { StoreCategory } from "@/data/stores";
import { cn } from "@/lib/utils";

type IconProps = { className?: string };

export function IconFashion({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className={cn("h-5 w-5", className)} aria-hidden>
      <path d="M9 4l-2 3v13h10V7l-2-3H9z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 4c0 1.5 1.5 2.5 3 2.5S15 5.5 15 4" strokeLinecap="round" />
      <path d="M7 7l-2 1M17 7l2 1" strokeLinecap="round" />
    </svg>
  );
}

export function IconDining({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className={cn("h-5 w-5", className)} aria-hidden>
      <path d="M8 3v8c0 1.1-.9 2-2 2s-2-.9-2-2V3" strokeLinecap="round" />
      <path d="M8 7H4" strokeLinecap="round" />
      <path d="M6 13v8" strokeLinecap="round" />
      <path d="M16 3v6c0 2.2 1.8 4 4 0V3" strokeLinecap="round" />
      <path d="M18 13v8" strokeLinecap="round" />
    </svg>
  );
}

export function IconBank({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className={cn("h-5 w-5", className)} aria-hidden>
      <path d="M3 10l9-6 9 6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 10v8M9 10v8M15 10v8M19 10v8" strokeLinecap="round" />
      <path d="M3 18h18" strokeLinecap="round" />
    </svg>
  );
}

export function IconHealth({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className={cn("h-5 w-5", className)} aria-hidden>
      <path d="M12 4v16M6 10h12" strokeLinecap="round" />
      <rect x="5" y="3" width="14" height="18" rx="2" />
    </svg>
  );
}

export function IconTech({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className={cn("h-5 w-5", className)} aria-hidden>
      <rect x="5" y="3" width="14" height="16" rx="2" />
      <path d="M9 19h6M12 19v2" strokeLinecap="round" />
    </svg>
  );
}

export function IconHome({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className={cn("h-5 w-5", className)} aria-hidden>
      <path d="M4 12l8-7 8 7v7a1 1 0 01-1 1H5a1 1 0 01-1-1v-7z" strokeLinejoin="round" />
      <path d="M10 20v-6h4v6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconEntertainment({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className={cn("h-5 w-5", className)} aria-hidden>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M10 10l5 2-5 2v-4z" strokeLinejoin="round" />
    </svg>
  );
}

export function IconServices({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className={cn("h-5 w-5", className)} aria-hidden>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" strokeLinecap="round" />
    </svg>
  );
}

export function IconOther({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className={cn("h-5 w-5", className)} aria-hidden>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l2 2" strokeLinecap="round" />
    </svg>
  );
}

const map: Record<StoreCategory, (props: IconProps) => JSX.Element> = {
  Fashion: IconFashion,
  "Food & Dining": IconDining,
  "Banks & Finance": IconBank,
  "Health & Beauty": IconHealth,
  "Electronics & Tech": IconTech,
  "Home & Furniture": IconHome,
  Entertainment: IconEntertainment,
  Services: IconServices,
  Other: IconOther,
};

export function CategoryIcon({ category, className }: { category: StoreCategory; className?: string }) {
  const Comp = map[category] ?? IconOther;
  return <Comp className={className} />;
}
