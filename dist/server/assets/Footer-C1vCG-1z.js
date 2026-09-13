import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useRouterState, useNavigate, Link } from "@tanstack/react-router";
import { CircleDot, Sun, Moon, Shield, User, LogOut, X, Menu, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { useState, useEffect } from "react";
import { c as cn } from "./utils-H80jjgLf.js";
import { u as useAuth } from "./router-DynjYsUx.js";
function Navbar() {
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
  const isActive = (to) => to === "/" ? path === "/" : path.startsWith(to);
  return /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md", children: /* @__PURE__ */ jsx(CircleDot, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-slate-800", children: "CricketBook" })
      ] }),
      /* @__PURE__ */ jsxs("nav", { className: "hidden items-center gap-8 md:flex", children: [
        /* @__PURE__ */ jsx(Link, { to: "/", className: cn("border-b-2 border-transparent py-1 text-sm transition-colors", isActive("/") && path === "/" ? "border-emerald-500 font-semibold text-emerald-600" : "text-slate-600 hover:text-slate-900"), children: "Home" }),
        /* @__PURE__ */ jsx(Link, { to: "/grounds", className: cn("border-b-2 border-transparent py-1 text-sm transition-colors", isActive("/grounds") ? "border-emerald-500 font-semibold text-emerald-600" : "text-slate-600 hover:text-slate-900"), children: "Grounds" }),
        /* @__PURE__ */ jsx(Link, { to: "/about", className: cn("border-b-2 border-transparent py-1 text-sm transition-colors", isActive("/about") ? "border-emerald-500 font-semibold text-emerald-600" : "text-slate-600 hover:text-slate-900"), children: "About" }),
        /* @__PURE__ */ jsx(Link, { to: "/contact", className: cn("border-b-2 border-transparent py-1 text-sm transition-colors", isActive("/contact") ? "border-emerald-500 font-semibold text-emerald-600" : "text-slate-600 hover:text-slate-900"), children: "Contact" }),
        isAuthenticated && /* @__PURE__ */ jsx(Link, { to: "/bookings", className: cn("border-b-2 border-transparent py-1 text-sm transition-colors", isActive("/bookings") ? "border-emerald-500 font-semibold text-emerald-600" : "text-slate-600 hover:text-slate-900"), children: "My Bookings" }),
        isAdmin && /* @__PURE__ */ jsx(Link, { to: "/admin/dashboard", className: cn("border-b-2 border-transparent py-1 text-sm transition-colors", isActive("/admin") ? "border-emerald-500 font-semibold text-emerald-600" : "text-amber-600 hover:text-amber-800"), children: "Admin" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("button", { onClick: toggleDark, className: "rounded-full p-2 text-slate-600 hover:bg-slate-100", "aria-label": "Toggle theme", children: dark ? /* @__PURE__ */ jsx(Sun, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(Moon, { className: "h-5 w-5" }) }),
        isAuthenticated ? /* @__PURE__ */ jsxs("div", { className: "hidden items-center gap-2 md:flex", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/profile", className: "flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100", children: [
            isAdmin ? /* @__PURE__ */ jsx(Shield, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsx(User, { className: "h-3.5 w-3.5" }),
            user?.name
          ] }),
          /* @__PURE__ */ jsxs("button", { onClick: handleLogout, className: "flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50", children: [
            /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4" }),
            " Logout"
          ] })
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Link, { to: "/login", className: "hidden rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 md:inline-flex", children: "Log in" }),
          /* @__PURE__ */ jsx(Link, { to: "/register", className: "hidden rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700 md:inline-flex", children: "Sign up" })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => setOpen(!open), className: "rounded-md p-2 md:hidden", "aria-label": "Menu", children: open ? /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" }) })
      ] })
    ] }),
    open && /* @__PURE__ */ jsx("div", { className: "border-t border-slate-200 bg-white px-4 py-4 md:hidden animate-fadeIn", children: /* @__PURE__ */ jsxs("nav", { className: "flex flex-col gap-3", children: [
      isAuthenticated && /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700", children: [
        user?.name,
        " ",
        isAdmin && "(Admin)"
      ] }),
      /* @__PURE__ */ jsx(Link, { to: "/", onClick: () => setOpen(false), className: cn("rounded-lg px-3 py-2 text-sm", isActive("/") ? "bg-emerald-50 font-semibold text-emerald-700" : "text-slate-700"), children: "Home" }),
      /* @__PURE__ */ jsx(Link, { to: "/grounds", onClick: () => setOpen(false), className: cn("rounded-lg px-3 py-2 text-sm", isActive("/grounds") ? "bg-emerald-50 font-semibold text-emerald-700" : "text-slate-700"), children: "Grounds" }),
      /* @__PURE__ */ jsx(Link, { to: "/about", onClick: () => setOpen(false), className: cn("rounded-lg px-3 py-2 text-sm", isActive("/about") ? "bg-emerald-50 font-semibold text-emerald-700" : "text-slate-700"), children: "About" }),
      /* @__PURE__ */ jsx(Link, { to: "/contact", onClick: () => setOpen(false), className: cn("rounded-lg px-3 py-2 text-sm", isActive("/contact") ? "bg-emerald-50 font-semibold text-emerald-700" : "text-slate-700"), children: "Contact" }),
      isAuthenticated && /* @__PURE__ */ jsx(Link, { to: "/bookings", onClick: () => setOpen(false), className: cn("rounded-lg px-3 py-2 text-sm", isActive("/bookings") ? "bg-emerald-50 font-semibold text-emerald-700" : "text-slate-700"), children: "My Bookings" }),
      isAuthenticated && /* @__PURE__ */ jsx(Link, { to: "/profile", onClick: () => setOpen(false), className: cn("rounded-lg px-3 py-2 text-sm", isActive("/profile") ? "bg-emerald-50 font-semibold text-emerald-700" : "text-slate-700"), children: "My Profile" }),
      isAdmin && /* @__PURE__ */ jsx(Link, { to: "/admin/dashboard", onClick: () => setOpen(false), className: "rounded-lg bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-700", children: "Admin Panel" }),
      isAuthenticated ? /* @__PURE__ */ jsx("button", { onClick: () => {
        handleLogout();
        setOpen(false);
      }, className: "rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 text-left", children: "Log out" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Link, { to: "/login", onClick: () => setOpen(false), className: "rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700", children: "Log in" }),
        /* @__PURE__ */ jsx(Link, { to: "/register", onClick: () => setOpen(false), className: "rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white text-center", children: "Sign up" })
      ] })
    ] }) })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsxs("footer", { className: "bg-slate-900 text-slate-300", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white", children: /* @__PURE__ */ jsx(CircleDot, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-white", children: "CricketBook" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-slate-400", children: "Sri Lanka's premier platform for booking cricket grounds online — fast, easy, secure." })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "mb-3 text-sm font-semibold text-white", children: "Quick Links" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/grounds", className: "hover:text-emerald-400", children: "Browse Grounds" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/about", className: "hover:text-emerald-400", children: "About Us" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/contact", className: "hover:text-emerald-400", children: "Contact Us" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/bookings", className: "hover:text-emerald-400", children: "My Bookings" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "mb-3 text-sm font-semibold text-white", children: "Contact" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-slate-400", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Mail, { className: "h-4 w-4" }),
            " hello@cricket.lk"
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }),
            " +94 11 234 5678"
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4" }),
            " Colombo, Sri Lanka"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "mb-3 text-sm font-semibold text-white", children: "Follow Us" }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsx("a", { href: "#", className: "rounded-full bg-slate-800 p-2 hover:bg-emerald-600", children: /* @__PURE__ */ jsx(Facebook, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsx("a", { href: "#", className: "rounded-full bg-slate-800 p-2 hover:bg-emerald-600", children: /* @__PURE__ */ jsx(Instagram, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsx("a", { href: "#", className: "rounded-full bg-slate-800 p-2 hover:bg-emerald-600", children: /* @__PURE__ */ jsx(Twitter, { className: "h-4 w-4" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "border-t border-slate-800 py-4 text-center text-xs text-slate-500", children: "© 2026 CricketBook. Built for cricket lovers in Sri Lanka." })
  ] });
}
export {
  Footer as F,
  Navbar as N
};
