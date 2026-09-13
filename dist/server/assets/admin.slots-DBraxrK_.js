import { jsxs, jsx, Fragment as Fragment$1 } from "react/jsx-runtime";
import { useState, useEffect, useCallback, Fragment } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ChevronLeft, ChevronRight, Ban, CheckCircle2 } from "lucide-react";
import { g as groundsApi, s as slotsApi } from "./api-DLdzAhMZ.js";
import { S as Select, c as SelectTrigger, d as SelectValue, a as SelectContent, b as SelectItem } from "./select-NX1S2Qd-.js";
import { c as cn } from "./utils-H80jjgLf.js";
import "@radix-ui/react-select";
import "clsx";
import "tailwind-merge";
const timeSlots = ["06:00–08:00", "08:00–10:00", "10:00–12:00", "12:00–14:00", "14:00–16:00", "16:00–18:00", "18:00–20:00", "20:00–22:00"];
function getWeekDays(date) {
  const start = new Date(date);
  const day = start.getDay();
  const diff = start.getDate() - day + (day === 0 ? -6 : 1);
  start.setDate(diff);
  return Array.from({
    length: 7
  }, (_, i) => {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    return d;
  });
}
function fmtDate(d) {
  return d.toISOString().slice(0, 10);
}
function fmtDisplay(d) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`;
}
function AdminSlots() {
  const navigate = useNavigate();
  const [grounds, setGrounds] = useState([]);
  const [groundId, setGroundId] = useState("");
  const [weekStart, setWeekStart] = useState(() => {
    const d = /* @__PURE__ */ new Date();
    const day = d.getDay();
    d.setDate(d.getDate() - (day === 0 ? 6 : day - 1));
    return d;
  });
  const [availability, setAvailability] = useState({});
  const [blockedIds, setBlockedIds] = useState({});
  const [loading, setLoading] = useState(false);
  const weekDays = getWeekDays(weekStart);
  useEffect(() => {
    groundsApi.getAll().then((g) => {
      setGrounds(g);
      if (g.length && !groundId) setGroundId(g[0]._id);
    });
  }, []);
  const load = useCallback(async () => {
    if (!groundId) return;
    setLoading(true);
    try {
      const dates = weekDays.map(fmtDate);
      const results = await Promise.all(dates.map((d) => slotsApi.getAvailability(groundId, d)));
      const map = {};
      const ids = {};
      for (const [i, d] of dates.entries()) {
        map[d] = results[i];
        const blocked = await slotsApi.getByGround(groundId, d);
        for (const b of blocked) {
          ids[`${d}_${b.slot}`] = b._id;
        }
      }
      setAvailability(map);
      setBlockedIds(ids);
    } catch (e) {
      console.error("Failed to load slots", e);
    }
    setLoading(false);
  }, [groundId, weekStart]);
  useEffect(() => {
    load();
  }, [load]);
  const toggleBlock = async (date, slot) => {
    const key = `${date}_${slot}`;
    if (blockedIds[key]) {
      await slotsApi.unblock(blockedIds[key]);
    } else {
      await slotsApi.block({
        groundId,
        date,
        slot
      });
    }
    load();
  };
  const isBooked = (date, slot) => availability[date]?.booked.includes(slot) ?? false;
  const isBlocked = (date, slot) => availability[date]?.blocked.includes(slot) ?? false;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 animate-fadeIn", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("button", { onClick: () => navigate("/admin/dashboard"), className: "mb-2 flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700", children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
          " Dashboard"
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-slate-800", children: "Manage Slots" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-slate-500", children: "Toggle slots to block or unblock availability" })
      ] }),
      /* @__PURE__ */ jsxs(Select, { value: groundId, onValueChange: setGroundId, children: [
        /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[260px]", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select ground" }) }),
        /* @__PURE__ */ jsx(SelectContent, { children: grounds.map((g) => /* @__PURE__ */ jsx(SelectItem, { value: g._id, children: g.name }, g._id)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-white p-4 shadow-md sm:p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-5 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("button", { onClick: () => {
            const d = new Date(weekStart);
            d.setDate(d.getDate() - 7);
            setWeekStart(d);
          }, className: "rounded-lg border border-slate-200 p-1.5 hover:bg-slate-50", children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxs("span", { className: "text-sm font-semibold text-slate-700", children: [
            fmtDisplay(weekDays[0]),
            " – ",
            fmtDisplay(weekDays[6])
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: () => {
            const d = new Date(weekStart);
            d.setDate(d.getDate() + 7);
            setWeekStart(d);
          }, className: "rounded-lg border border-slate-200 p-1.5 hover:bg-slate-50", children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-4 text-xs text-slate-600", children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx("span", { className: "h-3 w-3 rounded bg-emerald-500" }),
            " Available"
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx("span", { className: "h-3 w-3 rounded bg-red-500" }),
            " Booked"
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx("span", { className: "h-3 w-3 rounded bg-slate-400" }),
            " Blocked"
          ] })
        ] })
      ] }),
      loading ? /* @__PURE__ */ jsx("p", { className: "py-10 text-center text-sm text-slate-400", children: "Loading..." }) : /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("div", { className: "grid min-w-[700px] grid-cols-[120px_repeat(7,1fr)] gap-2", children: [
        /* @__PURE__ */ jsx("div", {}),
        weekDays.map((d) => /* @__PURE__ */ jsxs("div", { className: "px-2 py-1 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold text-slate-700", children: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()] }),
          /* @__PURE__ */ jsxs("div", { className: "text-[11px] text-slate-400", children: [
            d.getDate(),
            "/",
            d.getMonth() + 1
          ] })
        ] }, fmtDate(d))),
        timeSlots.map((slot) => /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end pr-2 text-xs font-medium text-slate-500", children: slot }),
          weekDays.map((d) => {
            const date = fmtDate(d);
            const booked = isBooked(date, slot);
            const blocked = isBlocked(date, slot);
            return /* @__PURE__ */ jsxs("button", { disabled: booked, onClick: () => toggleBlock(date, slot), className: cn("h-12 rounded-lg text-xs font-medium transition", booked && "bg-red-100 text-red-700 cursor-not-allowed", blocked && "bg-slate-300 text-slate-600 hover:bg-slate-400", !booked && !blocked && "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"), children: [
              booked && /* @__PURE__ */ jsxs(Fragment$1, { children: [
                /* @__PURE__ */ jsx(Ban, { className: "mr-1 inline h-3 w-3" }),
                " Booked"
              ] }),
              blocked && /* @__PURE__ */ jsxs(Fragment$1, { children: [
                /* @__PURE__ */ jsx(CheckCircle2, { className: "mr-1 inline h-3 w-3" }),
                " Blocked"
              ] }),
              !booked && !blocked && "Open"
            ] }, slot + date);
          })
        ] }, slot))
      ] }) })
    ] })
  ] });
}
export {
  AdminSlots as component
};
