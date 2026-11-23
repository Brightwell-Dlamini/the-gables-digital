import { getAdminSession } from "@/lib/admin/auth";
import { AdminGate } from "@/components/admin/AdminGate";

export const metadata = {
  title: "Admin | The Gables",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = getAdminSession();

  return (
    <AdminGate sessionEmail={session?.email ?? null}>{children}</AdminGate>
  );
}
