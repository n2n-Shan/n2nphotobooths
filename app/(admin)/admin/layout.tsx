import { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata = { title: { default: "Admin · N2N", template: "%s · N2N Admin" } };

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-8 md:ml-60">{children}</main>
    </div>
  );
}
