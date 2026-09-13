import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { G as GroundCard } from "./GroundCard-DXSettLd.js";
import { Check, Search, ArrowLeft } from "lucide-react";
import { c as cn } from "./utils-H80jjgLf.js";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { S as Switch } from "./switch-CQ4rbtn8.js";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { S as Select, c as SelectTrigger, d as SelectValue, a as SelectContent, b as SelectItem } from "./select-NX1S2Qd-.js";
import { g as groundsApi } from "./api-DLdzAhMZ.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-switch";
import "@radix-ui/react-select";
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(LabelPrimitive.Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = LabelPrimitive.Root.displayName;
const Slider = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(
  SliderPrimitive.Root,
  {
    ref,
    className: cn("relative flex w-full touch-none select-none items-center", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx(SliderPrimitive.Track, { className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20", children: /* @__PURE__ */ jsx(SliderPrimitive.Range, { className: "absolute h-full bg-primary" }) }),
      /* @__PURE__ */ jsx(SliderPrimitive.Thumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })
    ]
  }
));
Slider.displayName = SliderPrimitive.Root.displayName;
const Checkbox = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  CheckboxPrimitive.Root,
  {
    ref,
    className: cn(
      "grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(CheckboxPrimitive.Indicator, { className: cn("grid place-content-center text-current"), children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) })
  }
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
const facilityList = ["Floodlights", "Pavilion", "Parking", "Scoreboard", "Changing Rooms", "Canteen"];
const locationList = ["All", "Kandy", "Colombo", "Galle", "Matara", "Kurunegala"];
function GroundFilters(p) {
  return /* @__PURE__ */ jsxs("aside", { className: "space-y-6 rounded-2xl bg-white p-6 shadow-md", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Label, { className: "mb-2 block text-sm font-semibold", children: "Search" }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" }),
        /* @__PURE__ */ jsx(Input, { value: p.query, onChange: (e) => p.setQuery(e.target.value), placeholder: "Ground name...", className: "pl-9" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Label, { className: "mb-2 block text-sm font-semibold", children: "Location" }),
      /* @__PURE__ */ jsxs(Select, { value: p.location, onValueChange: p.setLocation, children: [
        /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsx(SelectContent, { children: locationList.map((l) => /* @__PURE__ */ jsx(SelectItem, { value: l, children: l }, l)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs(Label, { className: "mb-2 flex items-center justify-between text-sm font-semibold", children: [
        "Price Range ",
        /* @__PURE__ */ jsxs("span", { className: "font-normal text-slate-500", children: [
          "LKR ",
          p.price[0],
          " – ",
          p.price[1]
        ] })
      ] }),
      /* @__PURE__ */ jsx(Slider, { min: 500, max: 5e3, step: 100, value: p.price, onValueChange: p.setPrice })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Label, { className: "mb-2 block text-sm font-semibold", children: "Facilities" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-2", children: facilityList.map((f) => /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer items-center gap-2 text-sm text-slate-700", children: [
        /* @__PURE__ */ jsx(Checkbox, { checked: p.facilities.includes(f), onCheckedChange: () => p.toggleFacility(f) }),
        f
      ] }, f)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(Label, { className: "text-sm font-semibold", children: "Show available only" }),
      /* @__PURE__ */ jsx(Switch, { checked: p.availableOnly, onCheckedChange: p.setAvailableOnly })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx("button", { onClick: p.onReset, className: "flex-1 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700", children: "Reset Filters" }) })
  ] });
}
function GroundsIndex() {
  const navigate = useNavigate();
  const [grounds, setGrounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("All");
  const [price, setPrice] = useState([500, 5e3]);
  const [facilities, setFacilities] = useState([]);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sort, setSort] = useState("popular");
  useEffect(() => {
    groundsApi.getAll().then(setGrounds).finally(() => setLoading(false));
  }, []);
  const filtered = useMemo(() => {
    let g = grounds.filter((x) => x.name.toLowerCase().includes(query.toLowerCase()) && (location === "All" || x.location === location) && x.price >= price[0] && x.price <= price[1] && (facilities.length === 0 || facilities.every((f) => x.facilities.includes(f))) && (!availableOnly || x.active === true));
    if (sort === "price-asc") g = [...g].sort((a, b) => a.price - b.price);
    if (sort === "rating") g = [...g].sort((a, b) => b.rating - a.rating);
    return g;
  }, [query, location, price, facilities, sort, availableOnly, grounds]);
  const reset = () => {
    setQuery("");
    setLocation("All");
    setPrice([500, 5e3]);
    setFacilities([]);
    setAvailableOnly(false);
  };
  const toggleFacility = (f) => setFacilities((p) => p.includes(f) ? p.filter((x) => x !== f) : [...p, f]);
  if (loading) return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center py-20", children: /* @__PURE__ */ jsx("p", { className: "text-slate-500", children: "Loading grounds..." }) });
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 py-10 sm:px-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxs("button", { onClick: () => navigate(-1), className: "flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Back"
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "mt-2 text-3xl font-bold text-slate-800 sm:text-4xl", children: "Browse Cricket Grounds" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-slate-500", children: "Discover top-rated grounds across Sri Lanka." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-[280px_1fr]", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:sticky lg:top-24 lg:self-start", children: /* @__PURE__ */ jsx(GroundFilters, { query, setQuery, location, setLocation, price, setPrice, facilities, toggleFacility, availableOnly, setAvailableOnly, onReset: reset }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4 flex flex-wrap items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-slate-500", children: [
            "Showing ",
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-slate-800", children: filtered.length }),
            " of ",
            grounds.length,
            " grounds"
          ] }),
          /* @__PURE__ */ jsxs(Select, { value: sort, onValueChange: setSort, children: [
            /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[200px]", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsx(SelectItem, { value: "popular", children: "Most Popular" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "price-asc", children: "Price: Low to High" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "rating", children: "Rating" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-6 sm:grid-cols-2 xl:grid-cols-3", children: filtered.map((g) => /* @__PURE__ */ jsx(GroundCard, { ground: {
          ...g,
          id: g._id
        } }, g._id)) }),
        filtered.length === 0 && /* @__PURE__ */ jsx("div", { className: "rounded-2xl bg-white p-12 text-center shadow-md", children: /* @__PURE__ */ jsx("p", { className: "text-slate-500", children: "No grounds match your filters." }) })
      ] })
    ] })
  ] });
}
export {
  GroundsIndex as component
};
