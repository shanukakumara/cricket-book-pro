import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { Star, MapPin } from "lucide-react";
function GroundCard({ ground }) {
  return /* @__PURE__ */ jsxs(Link, { to: "/grounds/$id", params: { id: String(ground.id) }, className: "group block overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative h-48 overflow-hidden", children: [
      /* @__PURE__ */ jsx("img", { src: ground.image, alt: ground.name, className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" }),
      /* @__PURE__ */ jsxs("div", { className: "absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-slate-800 shadow", children: [
        /* @__PURE__ */ jsx(Star, { className: "h-3.5 w-3.5 fill-amber-400 text-amber-400" }),
        " ",
        ground.rating
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-emerald-500/90 px-2.5 py-1 text-xs font-semibold text-white shadow", children: [
        /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 animate-pulse rounded-full bg-white" }),
        " Available Today"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
      /* @__PURE__ */ jsx("h3", { className: "line-clamp-1 text-lg font-bold text-slate-800 group-hover:text-emerald-600", children: ground.name }),
      /* @__PURE__ */ jsxs("p", { className: "mt-1 flex items-center gap-1 text-sm text-slate-500", children: [
        /* @__PURE__ */ jsx(MapPin, { className: "h-3.5 w-3.5" }),
        " ",
        ground.location
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-3 flex flex-wrap gap-1.5", children: ground.facilities.slice(0, 3).map((f) => /* @__PURE__ */ jsx("span", { className: "rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600", children: f }, f)) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-end justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500", children: "Starting from" }),
          /* @__PURE__ */ jsxs("p", { className: "text-xl font-bold text-emerald-600", children: [
            "LKR ",
            ground.price.toLocaleString(),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-normal text-slate-500", children: "/hr" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white group-hover:bg-emerald-700", children: "View & Book" })
      ] })
    ] })
  ] });
}
export {
  GroundCard as G
};
