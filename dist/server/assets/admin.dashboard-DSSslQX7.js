import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { TrendingUp, ArrowLeft, MapPin, CalendarDays, DollarSign, Users } from "lucide-react";
import { c as cn } from "./utils-H80jjgLf.js";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, PieChart, Pie, Cell, Legend } from "recharts";
import { b as bookingsApi, g as groundsApi } from "./api-DLdzAhMZ.js";
import "clsx";
import "tailwind-merge";
function KPICard({ label, value, icon: Icon, color, trend }) {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-white p-6 shadow-md transition hover:shadow-xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsx("div", { className: cn("flex h-12 w-12 items-center justify-center rounded-xl", color), children: /* @__PURE__ */ jsx(Icon, { className: "h-6 w-6 text-white" }) }),
      /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-xs font-semibold text-emerald-600", children: [
        /* @__PURE__ */ jsx(TrendingUp, { className: "h-3 w-3" }),
        " ",
        trend
      ] })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-3xl font-bold text-slate-800", children: value }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500", children: label })
  ] });
}
const COLORS = ["#059669", "#0d9488", "#f59e0b", "#3b82f6", "#94a3b8"];
function Dashboard() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [grounds, setGrounds] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([bookingsApi.getAll(), groundsApi.getAll()]).then(([b, g]) => {
      setBookings(b);
      setGrounds(g);
    }).finally(() => setLoading(false));
  }, []);
  const confirmed = bookings.filter((b) => b.status === "Confirmed");
  const revenue = confirmed.reduce((s, b) => s + b.total, 0);
  const users = new Set(bookings.map((b) => b.userId)).size;
  const chartData = [{
    day: "Mon",
    bookings: bookings.filter((b) => new Date(b.date).getDay() === 1).length
  }, {
    day: "Tue",
    bookings: bookings.filter((b) => new Date(b.date).getDay() === 2).length
  }, {
    day: "Wed",
    bookings: bookings.filter((b) => new Date(b.date).getDay() === 3).length
  }, {
    day: "Thu",
    bookings: bookings.filter((b) => new Date(b.date).getDay() === 4).length
  }, {
    day: "Fri",
    bookings: bookings.filter((b) => new Date(b.date).getDay() === 5).length
  }, {
    day: "Sat",
    bookings: bookings.filter((b) => new Date(b.date).getDay() === 6).length
  }, {
    day: "Sun",
    bookings: bookings.filter((b) => new Date(b.date).getDay() === 0).length
  }];
  const groundBookings = grounds.map((g) => ({
    name: g.name,
    value: bookings.filter((b) => String(b.groundId) === String(g._id)).length
  }));
  const popular = [...grounds].sort((g1, g2) => bookings.filter((bk) => String(bk.groundId) === String(g2._id)).length - bookings.filter((bk) => String(bk.groundId) === String(g1._id)).length).slice(0, 5);
  if (loading) return /* @__PURE__ */ jsx("p", { className: "text-slate-500", children: "Loading dashboard..." });
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8 animate-fadeIn", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("button", { onClick: () => navigate("/"), className: "flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Back to Site"
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "mt-2 text-3xl font-bold text-slate-800", children: "Dashboard" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-slate-500", children: "Welcome back, here's what's happening today." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsx(KPICard, { label: "Total Grounds", value: String(grounds.length), icon: MapPin, color: "bg-emerald-500", trend: "-" }),
      /* @__PURE__ */ jsx(KPICard, { label: "Total Bookings", value: String(bookings.length), icon: CalendarDays, color: "bg-blue-500", trend: "-" }),
      /* @__PURE__ */ jsx(KPICard, { label: "Revenue", value: `LKR ${revenue.toLocaleString()}`, icon: DollarSign, color: "bg-emerald-600", trend: "-" }),
      /* @__PURE__ */ jsx(KPICard, { label: "Active Users", value: String(users), icon: Users, color: "bg-amber-500", trend: "-" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-white p-6 shadow-md lg:col-span-3", children: [
        /* @__PURE__ */ jsx("h3", { className: "mb-4 font-bold text-slate-800", children: "Bookings — Last 7 Days" }),
        /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 280, children: /* @__PURE__ */ jsxs(LineChart, { data: chartData, children: [
          /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e2e8f0" }),
          /* @__PURE__ */ jsx(XAxis, { dataKey: "day", stroke: "#64748b" }),
          /* @__PURE__ */ jsx(YAxis, { stroke: "#64748b" }),
          /* @__PURE__ */ jsx(Tooltip, { contentStyle: {
            borderRadius: 12,
            border: "1px solid #e2e8f0"
          } }),
          /* @__PURE__ */ jsx(Line, { type: "monotone", dataKey: "bookings", stroke: "#059669", strokeWidth: 3, dot: {
            fill: "#059669",
            r: 5
          } })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-white p-6 shadow-md lg:col-span-2", children: [
        /* @__PURE__ */ jsx("h3", { className: "mb-4 font-bold text-slate-800", children: "Bookings by Ground" }),
        /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 280, children: /* @__PURE__ */ jsxs(PieChart, { children: [
          /* @__PURE__ */ jsx(Pie, { data: groundBookings, dataKey: "value", nameKey: "name", cx: "50%", cy: "50%", innerRadius: 50, outerRadius: 90, paddingAngle: 2, children: groundBookings.map((_, i) => /* @__PURE__ */ jsx(Cell, { fill: COLORS[i % COLORS.length] }, i)) }),
          /* @__PURE__ */ jsx(Tooltip, {}),
          /* @__PURE__ */ jsx(Legend, {})
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-white p-6 shadow-md lg:col-span-3", children: [
        /* @__PURE__ */ jsx("h3", { className: "mb-4 font-bold text-slate-800", children: "Recent Bookings" }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsx("thead", { className: "text-left text-xs uppercase text-slate-500", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { className: "py-2", children: "Ref" }),
            /* @__PURE__ */ jsx("th", { children: "User" }),
            /* @__PURE__ */ jsx("th", { children: "Ground" }),
            /* @__PURE__ */ jsx("th", { children: "Date" }),
            /* @__PURE__ */ jsx("th", { children: "Amount" }),
            /* @__PURE__ */ jsx("th", { children: "Status" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: bookings.slice(0, 5).map((b) => /* @__PURE__ */ jsxs("tr", { className: "border-t border-slate-100", children: [
            /* @__PURE__ */ jsx("td", { className: "py-3 font-mono text-xs text-slate-600", children: b._id.toString().slice(-8) }),
            /* @__PURE__ */ jsx("td", { className: "text-slate-700", children: b.user }),
            /* @__PURE__ */ jsx("td", { className: "max-w-[140px] truncate text-slate-700", children: b.ground }),
            /* @__PURE__ */ jsx("td", { className: "text-slate-600", children: b.date }),
            /* @__PURE__ */ jsxs("td", { className: "font-semibold text-emerald-600", children: [
              "LKR ",
              b.total.toLocaleString()
            ] }),
            /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("span", { className: `rounded-full px-2 py-0.5 text-[11px] font-semibold ${b.status === "Confirmed" ? "bg-green-100 text-green-700" : b.status === "Pending" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`, children: b.status }) })
          ] }, b._id)) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-white p-6 shadow-md lg:col-span-2", children: [
        /* @__PURE__ */ jsx("h3", { className: "mb-4 font-bold text-slate-800", children: "Most Popular Grounds" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4", children: popular.map((g, i) => {
          const count = bookings.filter((b) => String(b.groundId) === String(g._id)).length;
          const max = Math.max(...popular.map((pg) => bookings.filter((b) => String(b.groundId) === String(pg._id)).length), 1);
          const pct = count / max * 100;
          return /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-sm", children: [
              /* @__PURE__ */ jsxs("span", { className: "font-medium text-slate-700", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-emerald-600", children: [
                  "#",
                  i + 1
                ] }),
                " ",
                g.name
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-slate-500", children: count })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-1.5 h-2 rounded-full bg-slate-100", children: /* @__PURE__ */ jsx("div", { className: "h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500", style: {
              width: `${pct}%`
            } }) })
          ] }, g._id);
        }) })
      ] })
    ] })
  ] });
}
export {
  Dashboard as component
};
