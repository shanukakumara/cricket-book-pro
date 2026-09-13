import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, MapPin, CalendarDays, Clock, Users, CircleDot, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/grounds", label: "Grounds", icon: MapPin },
  { to: "/admin/bookings", label: "Bookings", icon: CalendarDays },
  { to: "/admin/slots", label: "Slots", icon: Clock },
  { to: "/admin/users", label: "Users", icon: Users },
];

export function AdminSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(!open)} className="fixed left-4 top-4 z-50 rounded-lg bg-slate-900 p-2 text-white md:hidden">
        <LayoutDashboard className="h-5 w-5" />
      </button>
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 transform bg-slate-900 text-slate-200 transition-transform md:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
      )}>
        <div className="flex h-16 items-center gap-2 border-b border-slate-800 px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white">
            <CircleDot className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold text-white">CricketBook</span>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          {items.map(({ to, label, icon: Icon }) => {
            const active = path.startsWith(to);
            return (
              <Link key={to} to={to} onClick={() => setOpen(false)} className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                active ? "bg-emerald-600 text-white font-semibold shadow" : "text-slate-300 hover:bg-slate-800 hover:text-white",
              )}>
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <Link to="/" className="flex items-center gap-2 rounded-xl bg-slate-800 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700">
            <ArrowLeft className="h-4 w-4" /> Back to site
          </Link>
        </div>
      </aside>
      {open && <div onClick={() => setOpen(false)} className="fixed inset-0 z-30 bg-black/50 md:hidden" />}
    </>
  );
}
