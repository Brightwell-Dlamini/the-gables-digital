import { Suspense } from "react";
import DirectoryClient from "./DirectoryClient";

export default function DirectoryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-sand flex items-center justify-center">
          <p className="font-serif text-lg text-forest animate-pulse">
            Loading directory…
          </p>
        </div>
      }
    >
      <DirectoryClient />
    </Suspense>
  );
}
