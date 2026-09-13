import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowLeft, Search, Eye, CheckCircle2, Ban, ChevronLeft, ChevronRight, X } from "lucide-react";
import { b as bookingsApi, g as groundsApi } from "./api-DLdzAhMZ.js";
import { S as Select, c as SelectTrigger, d as SelectValue, a as SelectContent, b as SelectItem } from "./select-NX1S2Qd-.js";
import { c as cn } from "./utils-H80jjgLf.js";
import "@radix-ui/react-select";
import "clsx";
import "tailwind-merge";
function AdminBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [grounds, setGrounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("All");
  const [ground, setGround] = useState("All");
  const [q, setQ] = useState("");
  const [viewBooking, setViewBooking] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 10;
  const load = () => {
    setLoading(true);
    Promise.all([bookingsApi.getAll(), groundsApi.getAll()]).then(([b, g]) => {
      setBookings(b);
      setGrounds(g);
    }).finally(() => setLoading(false));
  };
  useEffect(() => {
    load();
  }, []);
  const filtered = bookings.filter((b) => (status === "All" || b.status === status) && (ground === "All" || b.ground === ground) && (b.user.toLowerCase().includes(q.toLowerCase()) || b._id.toLowerCase().includes(q.toLowerCase())));
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paged = filtered.slice((page - 1) * perPage, page * perPage);
  useEffect(() => {
    setPage(1);
  }, [status, ground, q]);
  const handleConfirm = async (id) => {
    try {
      await bookingsApi.update(id, {
        status: "Confirmed"
      });
      load();
    } catch {
    }
  };
  const handleCancel = async (id) => {
    try {
      await bookingsApi.cancel(id);
      load();
    } catch {
    }
  };
  if (loading) return /* @__PURE__ */ jsx("p", { className: "text-slate-500", children: "Loading bookings..." });
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 animate-fadeIn", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("button", { onClick: () => navigate("/admin/dashboard"), className: "mb-2 flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Dashboard"
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-slate-800", children: "All Bookings" }),
      /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-slate-500", children: [
        bookings.length,
        " total bookings"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-white p-4 shadow-md sm:p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-5 flex flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative min-w-[200px] flex-1", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" }),
          /* @__PURE__ */ jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search user or ref...", className: "w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm focus:border-emerald-500 focus:outline-none" })
        ] }),
        /* @__PURE__ */ jsxs(Select, { value: ground, onValueChange: setGround, children: [
          /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[200px]", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Ground" }) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "All", children: "All Grounds" }),
            grounds.map((g) => /* @__PURE__ */ jsx(SelectItem, { value: g.name, children: g.name }, g._id))
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Select, { value: status, onValueChange: setStatus, children: [
          /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[150px]", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Status" }) }),
          /* @__PURE__ */ jsx(SelectContent, { children: ["All", "Confirmed", "Pending", "Cancelled"].map((s) => /* @__PURE__ */ jsx(SelectItem, { value: s, children: s }, s)) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { className: "text-left text-xs uppercase text-slate-500", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "py-3", children: "Ref#" }),
          /* @__PURE__ */ jsx("th", { children: "User" }),
          /* @__PURE__ */ jsx("th", { children: "Email" }),
          /* @__PURE__ */ jsx("th", { children: "Ground" }),
          /* @__PURE__ */ jsx("th", { children: "Date" }),
          /* @__PURE__ */ jsx("th", { children: "Slot" }),
          /* @__PURE__ */ jsx("th", { children: "Amount" }),
          /* @__PURE__ */ jsx("th", { children: "Status" }),
          /* @__PURE__ */ jsx("th", { className: "text-right", children: "Action" })
        ] }) }),
        /* @__PURE__ */ jsxs("tbody", { children: [
          paged.map((b) => /* @__PURE__ */ jsxs("tr", { className: "border-t border-slate-100 hover:bg-slate-50", children: [
            /* @__PURE__ */ jsx("td", { className: "py-3 font-mono text-xs text-slate-600", children: b._id.toString().slice(-8) }),
            /* @__PURE__ */ jsx("td", { className: "text-slate-700", children: b.user }),
            /* @__PURE__ */ jsx("td", { className: "text-slate-500", children: b.email || "—" }),
            /* @__PURE__ */ jsx("td", { className: "max-w-[160px] truncate text-slate-700", children: b.ground }),
            /* @__PURE__ */ jsx("td", { className: "text-slate-600", children: b.date }),
            /* @__PURE__ */ jsx("td", { className: "text-slate-600", children: b.slot }),
            /* @__PURE__ */ jsxs("td", { className: "font-semibold text-emerald-600", children: [
              "LKR ",
              b.total?.toLocaleString()
            ] }),
            /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("span", { className: cn("rounded-full px-2 py-0.5 text-[11px] font-semibold", b.status === "Confirmed" && "bg-green-100 text-green-700", b.status === "Pending" && "bg-amber-100 text-amber-700", b.status === "Cancelled" && "bg-red-100 text-red-700"), children: b.status }) }),
            /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-1", children: [
              /* @__PURE__ */ jsx("button", { onClick: () => setViewBooking(b), className: "rounded-lg border border-slate-200 p-1.5 hover:bg-slate-50", title: "View", children: /* @__PURE__ */ jsx(Eye, { className: "h-3.5 w-3.5" }) }),
              b.status === "Pending" && /* @__PURE__ */ jsx("button", { onClick: () => handleConfirm(b._id), className: "rounded-lg border border-emerald-200 p-1.5 text-emerald-600 hover:bg-emerald-50", title: "Confirm", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "h-3.5 w-3.5" }) }),
              b.status !== "Cancelled" && /* @__PURE__ */ jsx("button", { onClick: () => handleCancel(b._id), className: "rounded-lg border border-red-200 p-1.5 text-red-600 hover:bg-red-50", title: "Cancel", children: /* @__PURE__ */ jsx(Ban, { className: "h-3.5 w-3.5" }) })
            ] }) })
          ] }, b._id)),
          paged.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 9, className: "py-10 text-center text-sm text-slate-400", children: "No bookings found." }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-5 flex items-center justify-between text-sm", children: [
        /* @__PURE__ */ jsxs("span", { className: "text-slate-500", children: [
          "Page ",
          page,
          " of ",
          totalPages
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx("button", { disabled: page <= 1, onClick: () => setPage(page - 1), className: "rounded-lg border border-slate-200 p-1.5 hover:bg-slate-50 disabled:opacity-30", children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }) }),
          Array.from({
            length: totalPages
          }, (_, i) => i + 1).map((p) => /* @__PURE__ */ jsx("button", { onClick: () => setPage(p), className: cn("h-8 w-8 rounded-lg text-sm", p === page ? "bg-emerald-600 font-semibold text-white" : "hover:bg-slate-50"), children: p }, p)),
          /* @__PURE__ */ jsx("button", { disabled: page >= totalPages, onClick: () => setPage(page + 1), className: "rounded-lg border border-slate-200 p-1.5 hover:bg-slate-50 disabled:opacity-30", children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" }) })
        ] })
      ] })
    ] }),
    viewBooking && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4", onClick: () => setViewBooking(null), children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-slate-100 pb-3", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-slate-800", children: "Booking Details" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setViewBooking(null), className: "rounded-lg p-1 hover:bg-slate-100", children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-3 text-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-slate-500", children: "Reference" }),
          /* @__PURE__ */ jsx("span", { className: "font-mono text-slate-800", children: viewBooking._id })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-slate-500", children: "User" }),
          /* @__PURE__ */ jsx("span", { className: "text-slate-800", children: viewBooking.user })
        ] }),
        viewBooking.email && /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-slate-500", children: "Email" }),
          /* @__PURE__ */ jsx("span", { className: "text-slate-800", children: viewBooking.email })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-slate-500", children: "Ground" }),
          /* @__PURE__ */ jsx("span", { className: "text-slate-800", children: viewBooking.ground })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-slate-500", children: "Date" }),
          /* @__PURE__ */ jsx("span", { className: "text-slate-800", children: viewBooking.date })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-slate-500", children: "Slot" }),
          /* @__PURE__ */ jsx("span", { className: "text-slate-800", children: viewBooking.slot })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-slate-500", children: "Duration" }),
          /* @__PURE__ */ jsx("span", { className: "text-slate-800", children: viewBooking.duration || "—" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-slate-500", children: "Total" }),
          /* @__PURE__ */ jsxs("span", { className: "font-semibold text-emerald-600", children: [
            "LKR ",
            viewBooking.total?.toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-slate-500", children: "Status" }),
          /* @__PURE__ */ jsx("span", { className: cn("rounded-full px-2 py-0.5 text-[11px] font-semibold", viewBooking.status === "Confirmed" && "bg-green-100 text-green-700", viewBooking.status === "Pending" && "bg-amber-100 text-amber-700", viewBooking.status === "Cancelled" && "bg-red-100 text-red-700"), children: viewBooking.status })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-slate-500", children: "Created" }),
          /* @__PURE__ */ jsx("span", { className: "text-slate-800", children: new Date(viewBooking.createdAt).toLocaleString() })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-5 flex gap-2", children: [
        viewBooking.status === "Pending" && /* @__PURE__ */ jsx("button", { onClick: () => {
          handleConfirm(viewBooking._id);
          setViewBooking(null);
        }, className: "flex-1 rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700", children: "Confirm" }),
        viewBooking.status !== "Cancelled" && /* @__PURE__ */ jsx("button", { onClick: () => {
          handleCancel(viewBooking._id);
          setViewBooking(null);
        }, className: "flex-1 rounded-xl border border-red-200 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50", children: "Cancel Booking" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setViewBooking(null), className: "flex-1 rounded-xl border border-slate-200 py-2.5 text-sm text-slate-600 hover:bg-slate-50", children: "Close" })
      ] })
    ] }) })
  ] });
}
export {
  AdminBookings as component
};
