"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LayoutDashboard, User, Globe, PenLine, ClipboardList, LogOut, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/dashboard",         label: "Dashboard",  icon: LayoutDashboard },
  { href: "/dashboard/profile", label: "Profile",    icon: User },
  { href: "/dashboard/matches", label: "Matches",    icon: Globe },
  { href: "/dashboard/essay",   label: "Essay",      icon: PenLine },
  { href: "/dashboard/tracker", label: "Tracker",    icon: ClipboardList },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  const Sidebar = () => (
    <aside className="flex flex-col h-full bg-bark text-cream w-64 shrink-0">
      <div className="px-6 py-5 border-b border-white/10">
        <Link href="/" className="flex items-center gap-1">
          <span className="font-serif text-xl text-cream">Umoja</span>
          <span className="font-serif text-xl text-terra">Scholar</span>
        </Link>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              pathname === href
                ? "bg-terra text-cream"
                : "text-cream/60 hover:text-cream hover:bg-white/10"
            )}>
            <Icon size={17} />
            {label}
          </Link>
        ))}
      </nav>
      <div className="px-3 py-4 border-t border-white/10">
        <button onClick={signOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-cream/60 hover:text-cream hover:bg-white/10 transition-colors w-full">
          <LogOut size={17} />
          Sign out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen bg-cream overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="relative z-10 flex">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile topbar */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 bg-bark border-b border-white/10">
          <div className="flex items-center gap-1">
            <span className="font-serif text-lg text-cream">Umoja</span>
            <span className="font-serif text-lg text-terra">Scholar</span>
          </div>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-cream/70 hover:text-cream">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
