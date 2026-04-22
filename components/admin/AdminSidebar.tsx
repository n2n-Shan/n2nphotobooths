"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: "⬛" },
  { href: "/admin/bookings", label: "Bookings", icon: "📅" },
  { href: "/admin/quotes", label: "Quotes", icon: "💬" },
  { href: "/admin/packages", label: "Packages", icon: "📦" },
  { href: "/admin/backdrops", label: "Backdrops", icon: "🖼️" },
  { href: "/admin/gallery", label: "Gallery", icon: "🎨" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-white/8 bg-[#111111] md:flex">
      <div className="border-b border-white/8 px-6 py-5">
        <span className="text-lg font-black text-champagne">N2N</span>
        <span className="ml-2 text-xs font-bold uppercase tracking-widest text-white/40">Admin</span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {NAV.map((item) => {
          const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-champagne/15 text-white"
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              )}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/8 p-4">
        <button
          onClick={signOut}
          className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-white/40 transition-colors hover:bg-white/5 hover:text-white"
        >
          Sign out →
        </button>
      </div>
    </aside>
  );
}
