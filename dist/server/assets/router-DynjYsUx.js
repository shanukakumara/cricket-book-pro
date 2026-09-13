import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, useRouter, Link, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, redirect, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Toaster as Toaster$1 } from "sonner";
import { useState, createContext, useContext } from "react";
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const AuthContext = createContext(null);
function getStorage(key) {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function setStorage(key, value) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, value);
  } catch {
  }
}
function removeStorage(key) {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(key);
  } catch {
  }
}
function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = getStorage("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => getStorage("token"));
  const login = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
    setStorage("token", newToken);
    setStorage("user", JSON.stringify(newUser));
  };
  const logout = () => {
    setToken(null);
    setUser(null);
    removeStorage("token");
    removeStorage("user");
  };
  return /* @__PURE__ */ jsx(AuthContext.Provider, { value: { user, token, login, logout, isAdmin: user?.role === "Admin", isAuthenticated: !!token }, children });
}
function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
const appCss = "/assets/styles-CfRA2IPO.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-gray-50 px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 100 100", className: "mx-auto h-32 w-32 text-emerald-600", children: [
      /* @__PURE__ */ jsx("circle", { cx: "50", cy: "50", r: "42", fill: "currentColor" }),
      /* @__PURE__ */ jsx("path", { d: "M50 8 a42 42 0 0 1 0 84", fill: "none", stroke: "white", strokeWidth: "2", strokeDasharray: "3 3" }),
      /* @__PURE__ */ jsx("path", { d: "M8 50 a42 42 0 0 1 84 0", fill: "none", stroke: "white", strokeWidth: "2", strokeDasharray: "3 3" })
    ] }),
    /* @__PURE__ */ jsx("h1", { className: "mt-6 text-6xl font-bold text-slate-800", children: "404" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-slate-500", children: "Looks like that ball went for six — page not found." }),
    /* @__PURE__ */ jsx(Link, { to: "/", className: "mt-6 inline-flex items-center rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700", children: "Go Home" })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-gray-50 px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold text-slate-800", children: "Something went wrong" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-slate-500", children: error.message }),
    /* @__PURE__ */ jsx("button", { onClick: () => {
      router2.invalidate();
      reset();
    }, className: "mt-6 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white", children: "Try again" })
  ] }) });
}
const Route$h = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CricketBook — Book Cricket Grounds in Sri Lanka" },
      { name: "description", content: "Browse and book premium cricket grounds across Sri Lanka in minutes." }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$h.useRouteContext();
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxs(AuthProvider, { children: [
    /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsx(Toaster, {})
  ] }) });
}
const $$splitComponentImporter$g = () => import("./register-BL4n65zv.js");
const Route$g = createFileRoute("/register")({
  head: () => ({
    meta: [{
      title: "Create account — CricketBook"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./profile-Da_j08ve.js");
const Route$f = createFileRoute("/profile")({
  head: () => ({
    meta: [{
      title: "My Profile — CricketBook"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./payment-qKjQxJiC.js");
const Route$e = createFileRoute("/payment")({
  head: () => ({
    meta: [{
      title: "Payment — CricketBook"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./login-7rQE8gze.js");
const Route$d = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "Log in — CricketBook"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./grounds-BdTsga8a.js");
const Route$c = createFileRoute("/grounds")({
  head: () => ({
    meta: [{
      title: "Browse Grounds — CricketBook"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./contact-DiLWEJgM.js");
const Route$b = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "Contact Us — CricketBook"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./bookings-DPxw2xKH.js");
const Route$a = createFileRoute("/bookings")({
  head: () => ({
    meta: [{
      title: "My Bookings — CricketBook"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./admin-Ck78GrGC.js");
const Route$9 = createFileRoute("/admin")({
  beforeLoad: ({
    location
  }) => {
    if (location.pathname === "/admin") throw redirect({
      to: "/admin/dashboard"
    });
  },
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./about-CNycTmmV.js");
const Route$8 = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: "About Us — CricketBook"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./index-DGQKoQSf.js");
const Route$7 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "CricketBook — Book Cricket Grounds in Sri Lanka"
    }, {
      name: "description",
      content: "Find and reserve premium cricket grounds in Sri Lanka — fast, easy, and online."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./grounds.index-BsTgWt4o.js");
const Route$6 = createFileRoute("/grounds/")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./grounds._id-AQfYnYRh.js");
const Route$5 = createFileRoute("/grounds/$id")({
  head: ({
    params
  }) => ({
    meta: [{
      title: `Ground #${params.id} — CricketBook`
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./admin.users-BdOo-ufW.js");
const Route$4 = createFileRoute("/admin/users")({
  head: () => ({
    meta: [{
      title: "Manage Users — Admin"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./admin.slots-DBraxrK_.js");
const Route$3 = createFileRoute("/admin/slots")({
  head: () => ({
    meta: [{
      title: "Manage Slots — Admin"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./admin.grounds-CtmxoQZ2.js");
const Route$2 = createFileRoute("/admin/grounds")({
  head: () => ({
    meta: [{
      title: "Manage Grounds — Admin"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./admin.dashboard-DSSslQX7.js");
const Route$1 = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [{
      title: "Admin Dashboard — CricketBook"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./admin.bookings-DsLq43Lq.js");
const Route = createFileRoute("/admin/bookings")({
  head: () => ({
    meta: [{
      title: "All Bookings — Admin"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const RegisterRoute = Route$g.update({
  id: "/register",
  path: "/register",
  getParentRoute: () => Route$h
});
const ProfileRoute = Route$f.update({
  id: "/profile",
  path: "/profile",
  getParentRoute: () => Route$h
});
const PaymentRoute = Route$e.update({
  id: "/payment",
  path: "/payment",
  getParentRoute: () => Route$h
});
const LoginRoute = Route$d.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$h
});
const GroundsRoute = Route$c.update({
  id: "/grounds",
  path: "/grounds",
  getParentRoute: () => Route$h
});
const ContactRoute = Route$b.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$h
});
const BookingsRoute = Route$a.update({
  id: "/bookings",
  path: "/bookings",
  getParentRoute: () => Route$h
});
const AdminRoute = Route$9.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$h
});
const AboutRoute = Route$8.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$h
});
const IndexRoute = Route$7.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$h
});
const GroundsIndexRoute = Route$6.update({
  id: "/",
  path: "/",
  getParentRoute: () => GroundsRoute
});
const GroundsIdRoute = Route$5.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => GroundsRoute
});
const AdminUsersRoute = Route$4.update({
  id: "/users",
  path: "/users",
  getParentRoute: () => AdminRoute
});
const AdminSlotsRoute = Route$3.update({
  id: "/slots",
  path: "/slots",
  getParentRoute: () => AdminRoute
});
const AdminGroundsRoute = Route$2.update({
  id: "/grounds",
  path: "/grounds",
  getParentRoute: () => AdminRoute
});
const AdminDashboardRoute = Route$1.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => AdminRoute
});
const AdminBookingsRoute = Route.update({
  id: "/bookings",
  path: "/bookings",
  getParentRoute: () => AdminRoute
});
const AdminRouteChildren = {
  AdminBookingsRoute,
  AdminDashboardRoute,
  AdminGroundsRoute,
  AdminSlotsRoute,
  AdminUsersRoute
};
const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
const GroundsRouteChildren = {
  GroundsIdRoute,
  GroundsIndexRoute
};
const GroundsRouteWithChildren = GroundsRoute._addFileChildren(GroundsRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  AdminRoute: AdminRouteWithChildren,
  BookingsRoute,
  ContactRoute,
  GroundsRoute: GroundsRouteWithChildren,
  LoginRoute,
  PaymentRoute,
  ProfileRoute,
  RegisterRoute
};
const routeTree = Route$h._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$5 as R,
  router as r,
  useAuth as u
};
