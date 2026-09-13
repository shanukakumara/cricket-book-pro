import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { N as Navbar, F as Footer } from "./Footer-C1vCG-1z.js";
import { c as cn } from "./utils-H80jjgLf.js";
import { b as bookingsApi, g as groundsApi } from "./api-DLdzAhMZ.js";
import "./router-DynjYsUx.js";
import "@tanstack/react-query";
import "sonner";
import "clsx";
import "tailwind-merge";
const statusStyle = {
  Confirmed: "bg-green-100 text-green-700",
  Pending: "bg-amber-100 text-amber-700",
  Cancelled: "bg-red-100 text-red-700"
};
function BookingCard({ booking, actions }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-md transition hover:shadow-lg sm:flex-row", children: [
    /* @__PURE__ */ jsx("img", { src: booking.image || "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&q=80", alt: booking.ground, className: "h-32 w-full rounded-xl object-cover sm:h-24 sm:w-32" }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-bold text-slate-800", children: booking.ground }),
      /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-slate-500", children: [
        booking.date,
        " • ",
        booking.slot,
        " • ",
        booking.duration
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 font-mono text-xs text-slate-400", children: booking.id })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start gap-2 sm:items-end", children: [
      /* @__PURE__ */ jsx("span", { className: cn("rounded-full px-2.5 py-1 text-xs font-semibold", statusStyle[booking.status]), children: booking.status }),
      /* @__PURE__ */ jsxs("p", { className: "text-lg font-bold text-emerald-600", children: [
        "LKR ",
        booking.total.toLocaleString()
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: actions })
    ] })
  ] });
}
const tabs = ["Upcoming", "Past", "Cancelled"];
function MyBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [grounds, setGrounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("Upcoming");
  useEffect(() => {
    Promise.all([bookingsApi.getAll(), groundsApi.getAll()]).then(([b, g]) => {
      setBookings(b);
      setGrounds(g);
    }).finally(() => setLoading(false));
  }, []);
  const getGroundImage = (groundId) => {
    const g = grounds.find((gr) => String(gr._id) === String(groundId));
    return g?.image;
  };
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const filtered = bookings.filter((b) => {
    if (tab === "Cancelled") return b.status === "Cancelled";
    if (tab === "Upcoming") return b.status !== "Cancelled" && b.date >= today;
    return b.status !== "Cancelled" && b.date < today;
  });
  const handleCancel = async (id) => {
    await bookingsApi.cancel(id);
    setBookings((prev) => prev.map((b) => b._id === id ? {
      ...b,
      status: "Cancelled"
    } : b));
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-4 py-10 sm:px-6", children: [
      /* @__PURE__ */ jsxs("button", { onClick: () => navigate(-1), className: "flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Back"
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "mt-2 text-3xl font-bold text-slate-800 sm:text-4xl", children: "My Bookings" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-slate-500", children: "Manage your reservations across all cricket grounds." }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 flex gap-2 border-b border-slate-200", children: tabs.map((t) => /* @__PURE__ */ jsx("button", { onClick: () => setTab(t), className: cn("border-b-2 px-4 py-2.5 text-sm font-medium transition", tab === t ? "border-emerald-500 text-emerald-600" : "border-transparent text-slate-500 hover:text-slate-800"), children: t }, t)) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 space-y-4", children: [
        loading && /* @__PURE__ */ jsx("p", { className: "text-center text-slate-500", children: "Loading bookings..." }),
        !loading && filtered.length === 0 && /* @__PURE__ */ jsx("div", { className: "rounded-2xl bg-white p-12 text-center shadow-md", children: /* @__PURE__ */ jsxs("p", { className: "text-slate-500", children: [
          "No ",
          tab.toLowerCase(),
          " bookings."
        ] }) }),
        filtered.map((b) => /* @__PURE__ */ jsx(BookingCard, { booking: {
          ...b,
          id: b._id,
          image: getGroundImage(b.groundId)
        }, actions: /* @__PURE__ */ jsxs(Fragment, { children: [
          tab === "Upcoming" && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Link, { to: "/grounds/$id", params: {
              id: b.groundId
            }, className: "rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium hover:bg-slate-50", children: "View Details" }),
            /* @__PURE__ */ jsx("button", { onClick: () => handleCancel(b._id), className: "rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50", children: "Cancel" })
          ] }),
          tab === "Past" && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Link, { to: "/grounds/$id", params: {
              id: b.groundId
            }, className: "rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700", children: "Rebook" }),
            /* @__PURE__ */ jsx("button", { className: "rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium hover:bg-slate-50", children: "Review" })
          ] }),
          tab === "Cancelled" && /* @__PURE__ */ jsx(Link, { to: "/grounds/$id", params: {
            id: b.groundId
          }, className: "rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700", children: "Rebook" })
        ] }) }, b._id))
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  MyBookings as component
};
