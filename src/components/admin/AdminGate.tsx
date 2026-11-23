"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { AdminShell } from "@/components/admin/AdminShell";

export function AdminGate({
  children,
  sessionEmail,
}: {
  children: React.ReactNode;
  sessionEmail: string | null;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/admin/login";

  useEffect(() => {
    if (!sessionEmail && !isLogin) {
      router.replace("/admin/login");
    }
    if (sessionEmail && isLogin) {
      router.replace("/admin");
    }
  }, [sessionEmail, isLogin, router]);

  if (isLogin) {
    return <>{children}</>;
  }

  if (!sessionEmail) {
    return (
      <div className="admin-shell flex min-h-screen items-center justify-center text-white/70 text-sm">
        Checking session…
      </div>
    );
  }

  return <AdminShell email={sessionEmail}>{children}</AdminShell>;
}
