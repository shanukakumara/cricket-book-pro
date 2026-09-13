import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { Menu, X, Sun, Moon, CircleDot, LogOut, Shield, User } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";

export function Navbar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = typeof window !== "undefined" && localStorage.getItem("theme") === "dark";
    setDark(saved);
    document.documentElement.classList.toggle("dark", saved);
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  const isActive = (to: string) => to === "/" ? path === "/" : path.startsWith(to);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md">
            <CircleDot className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold text-slate-800">CricketBook</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/" className={cn("border-b-2 border-transparent py-1 text-sm transition-colors", isActive("/") && path === "/" ? "border-emerald-500 font-semibold text-emerald-600" : "text-slate-600 hover:text-slate-900")}>Home</Link>
          <Link to="/grounds" className={cn("border-b-2 border-transparent py-1 text-sm transition-colors", isActive("/grounds") ? "border-emerald-500 font-semibold text-emerald-600" : "text-slate-600 hover:text-slate-900")}>Grounds</Link>
          <Link to="/about" className={cn("border-b-2 border-transparent py-1 text-sm transition-colors", isActive("/about") ? "border-emerald-500 font-semibold text-emerald-600" : "text-slate-600 hover:text-slate-900")}>About</Link>
          <Link to="/contact" className={cn("border-b-2 border-transparent py-1 text-sm transition-colors", isActive("/contact") ? "border-emerald-500 font-semibold text-emerald-600" : "text-slate-600 hover:text-slate-900")}>Contact</Link>
          {isAuthenticated && (
            <Link to="/bookings" className={cn("border-b-2 border-transparent py-1 text-sm transition-colors", isActive("/bookings") ? "border-emerald-500 font-semibold text-emerald-600" : "text-slate-600 hover:text-slate-900")}>My Bookings</Link>
          )}
          {isAdmin && (
            <Link to="/admin/dashboard" className={cn("border-b-2 border-transparent py-1 text-sm transition-colors", isActive("/admin") ? "border-emerald-500 font-semibold text-emerald-600" : "text-amber-600 hover:text-amber-800")}>Admin</Link>
          )}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={toggleDark} className="rounded-full p-2 text-slate-600 hover:bg-slate-100" aria-label="Toggle theme">
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          {isAuthenticated ? (
            <div className="hidden items-center gap-2 md:flex">
              <Link to="/profile" className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100">
                {isAdmin ? <Shield className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
                {user?.name}
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50">
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="hidden rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 md:inline-flex">Log in</Link>
              <Link to="/register" className="hidden rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700 md:inline-flex">Sign up</Link>
            </>
          )}
          <button onClick={() => setOpen(!open)} className="rounded-md p-2 md:hidden" aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden animate-fadeIn">
          <nav className="flex flex-col gap-3">
            {isAuthenticated && (
              <div className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                {user?.name} {isAdmin && "(Admin)"}
              </div>
            )}
            <Link to="/" onClick={() => setOpen(false)} className={cn("rounded-lg px-3 py-2 text-sm", isActive("/") ? "bg-emerald-50 font-semibold text-emerald-700" : "text-slate-700")}>Home</Link>
            <Link to="/grounds" onClick={() => setOpen(false)} className={cn("rounded-lg px-3 py-2 text-sm", isActive("/grounds") ? "bg-emerald-50 font-semibold text-emerald-700" : "text-slate-700")}>Grounds</Link>
            <Link to="/about" onClick={() => setOpen(false)} className={cn("rounded-lg px-3 py-2 text-sm", isActive("/about") ? "bg-emerald-50 font-semibold text-emerald-700" : "text-slate-700")}>About</Link>
            <Link to="/contact" onClick={() => setOpen(false)} className={cn("rounded-lg px-3 py-2 text-sm", isActive("/contact") ? "bg-emerald-50 font-semibold text-emerald-700" : "text-slate-700")}>Contact</Link>
            {isAuthenticated && (
              <Link to="/bookings" onClick={() => setOpen(false)} className={cn("rounded-lg px-3 py-2 text-sm", isActive("/bookings") ? "bg-emerald-50 font-semibold text-emerald-700" : "text-slate-700")}>My Bookings</Link>
            )}
            {isAuthenticated && (
              <Link to="/profile" onClick={() => setOpen(false)} className={cn("rounded-lg px-3 py-2 text-sm", isActive("/profile") ? "bg-emerald-50 font-semibold text-emerald-700" : "text-slate-700")}>My Profile</Link>
            )}
            {isAdmin && (
              <Link to="/admin/dashboard" onClick={() => setOpen(false)} className="rounded-lg bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-700">Admin Panel</Link>
            )}
            {isAuthenticated ? (
              <button onClick={() => { handleLogout(); setOpen(false); }} className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 text-left">Log out</button>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700">Log in</Link>
                <Link to="/register" onClick={() => setOpen(false)} className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white text-center">Sign up</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
