import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useRouterState, Link, Outlet, useRouter } from "@tanstack/react-router";
import { LayoutDashboard, CircleDot, MapPin, CalendarDays, Clock, Users, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { c as cn } from "./utils-H80jjgLf.js";
import { u as useAuth } from "./router-DynjYsUx.js";
import "clsx";
import "tailwind-merge";
import "@tanstack/react-query";
import "sonner";
const items = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/grounds", label: "Grounds", icon: MapPin },
  { to: "/admin/bookings", label: "Bookings", icon: CalendarDays },
  { to: "/admin/slots", label: "Slots", icon: Clock },
  { to: "/admin/users", label: "Users", icon: Users }
];
function AdminSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("button", { onClick: () => setOpen(!open), className: "fixed left-4 top-4 z-50 rounded-lg bg-slate-900 p-2 text-white md:hidden", children: /* @__PURE__ */ jsx(LayoutDashboard, { className: "h-5 w-5" }) }),
    /* @__PURE__ */ jsxs("aside", { className: cn(
      "fixed inset-y-0 left-0 z-40 w-64 transform bg-slate-900 text-slate-200 transition-transform md:translate-x-0",
      open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
    ), children: [
      /* @__PURE__ */ jsxs("div", { className: "flex h-16 items-center gap-2 border-b border-slate-800 px-6", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white", children: /* @__PURE__ */ jsx(CircleDot, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-white", children: "CricketBook" })
      ] }),
      /* @__PURE__ */ jsx("nav", { className: "flex flex-col gap-1 p-4", children: items.map(({ to, label, icon: Icon }) => {
        const active = path.startsWith(to);
        return /* @__PURE__ */ jsxs(Link, { to, onClick: () => setOpen(false), className: cn(
          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
          active ? "bg-emerald-600 text-white font-semibold shadow" : "text-slate-300 hover:bg-slate-800 hover:text-white"
        ), children: [
          /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" }),
          label
        ] }, to);
      }) }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 left-4 right-4", children: /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 rounded-xl bg-slate-800 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Back to site"
      ] }) })
    ] }),
    open && /* @__PURE__ */ jsx("div", { onClick: () => setOpen(false), className: "fixed inset-0 z-30 bg-black/50 md:hidden" })
  ] });
}
function AdminGuard({
  children
}) {
  const {
    isAuthenticated,
    isAdmin
  } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && !isAuthenticated) {
      router.navigate({
        to: "/login"
      });
    } else if (typeof window !== "undefined" && !isAdmin) {
      router.navigate({
        to: "/"
      });
    }
  }, [isAuthenticated, isAdmin]);
  if (!isAuthenticated || !isAdmin) {
    return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-gray-50", children: /* @__PURE__ */ jsx("p", { className: "text-slate-500", children: "Redirecting..." }) });
  }
  return /* @__PURE__ */ jsx(Fragment, { children });
}
function AdminLayout() {
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-50", children: /* @__PURE__ */ jsxs(AdminGuard, { children: [
    /* @__PURE__ */ jsx(AdminSidebar, {}),
    /* @__PURE__ */ jsx("main", { className: "md:ml-64", children: /* @__PURE__ */ jsx("div", { className: "px-4 py-8 sm:px-6 lg:px-10", children: /* @__PURE__ */ jsx(Outlet, {}) }) })
  ] }) });
}
export {
  AdminLayout as component
};
