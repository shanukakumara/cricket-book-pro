import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { CalendarDays, CreditCard, ArrowLeft, MapPin, Star, Coffee, Shirt, Tv, ParkingCircle, Building2, Lightbulb, Navigation, Clock, Phone } from "lucide-react";
import { c as cn } from "./utils-H80jjgLf.js";
import { b as bookingsApi, g as groundsApi } from "./api-DLdzAhMZ.js";
import { u as useAuth, R as Route } from "./router-DynjYsUx.js";
import "clsx";
import "tailwind-merge";
import "@tanstack/react-query";
import "sonner";
function GroundGallery({ image, name }) {
  const thumbs = [
    "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&q=80",
    "https://images.unsplash.com/photo-1607734834519-d8576ae60ea7?w=600&q=80",
    "https://images.unsplash.com/photo-1599982061521-9e1d3df8ee2c?w=600&q=80"
  ];
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-2xl shadow-md", children: /* @__PURE__ */ jsx("img", { src: image, alt: name, className: "h-[400px] w-full object-cover" }) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-3", children: thumbs.map((t, i) => /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-xl shadow", children: /* @__PURE__ */ jsx("img", { src: t, alt: `${name} ${i + 1}`, className: "h-24 w-full object-cover transition hover:scale-105 sm:h-32" }) }, i)) })
  ] });
}
const timeSlots = ["06:00–08:00", "08:00–10:00", "10:00–12:00", "12:00–14:00", "14:00–16:00", "16:00–18:00", "18:00–20:00", "20:00–22:00"];
function TimeSlotGrid({ selected, onSelect, bookedSlots }) {
  const booked = new Set(bookedSlots || []);
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2", children: timeSlots.map((s) => {
    const isBooked = booked.has(s);
    const isSelected = selected.includes(s);
    return /* @__PURE__ */ jsx(
      "button",
      {
        disabled: isBooked,
        onClick: () => onSelect(s),
        className: cn(
          "rounded-xl border px-3 py-2.5 text-sm font-medium transition-all active:scale-95",
          isBooked && "cursor-not-allowed border-red-200 bg-red-50 text-red-400 line-through",
          !isBooked && !isSelected && "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
          isSelected && "border-amber-400 bg-amber-400 text-slate-900 shadow"
        ),
        children: isBooked ? "Booked" : s
      },
      s
    );
  }) });
}
function BookingPanel({ ground }) {
  const [date, setDate] = useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  const [slots, setSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    setSlots([]);
    bookingsApi.getAvailability(ground._id || ground.id, date).then(setBookedSlots).catch(() => setBookedSlots([]));
  }, [date, ground._id, ground.id]);
  const toggleSlot = (s) => {
    setSlots((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  };
  const fee = 100;
  const subtotal = ground.price * slots.length;
  const total = subtotal + fee;
  const handleProceedToPayment = () => {
    if (!isAuthenticated) {
      navigate({ to: "/login" });
      return;
    }
    const bookingData = {
      groundName: ground.name,
      groundId: ground._id || ground.id,
      date,
      slots,
      total,
      price: ground.price
    };
    sessionStorage.setItem("pendingBooking", JSON.stringify(bookingData));
    navigate({ to: "/payment" });
  };
  return /* @__PURE__ */ jsxs("div", { className: "sticky top-24 rounded-2xl bg-white p-6 shadow-md", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between border-b border-slate-100 pb-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500", children: "Price" }),
        /* @__PURE__ */ jsxs("p", { className: "text-3xl font-bold text-emerald-600", children: [
          "LKR ",
          ground.price.toLocaleString(),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-normal text-slate-500", children: "/hr" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700", children: "Per slot" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
      /* @__PURE__ */ jsx("label", { className: "mb-1.5 block text-sm font-semibold text-slate-700", children: "Select Date" }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(CalendarDays, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" }),
        /* @__PURE__ */ jsx("input", { type: "date", value: date, onChange: (e) => setDate(e.target.value), className: "w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm focus:border-emerald-500 focus:outline-none" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
      /* @__PURE__ */ jsx("label", { className: "mb-1.5 block text-sm font-semibold text-slate-700", children: "Select Time Slots" }),
      /* @__PURE__ */ jsx(TimeSlotGrid, { selected: slots, onSelect: toggleSlot, bookedSlots })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-5 space-y-2 rounded-xl bg-slate-50 p-4 text-sm", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-slate-600", children: [
        /* @__PURE__ */ jsx("span", { children: "Date" }),
        /* @__PURE__ */ jsx("span", { className: "font-medium text-slate-800", children: date })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-slate-600", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          "Slots (",
          slots.length,
          ")"
        ] }),
        /* @__PURE__ */ jsx("span", { className: "max-w-[180px] truncate text-right font-medium text-slate-800", children: slots.length ? slots.join(", ") : "—" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-slate-600", children: [
        /* @__PURE__ */ jsx("span", { children: "Subtotal" }),
        /* @__PURE__ */ jsxs("span", { children: [
          "LKR ",
          subtotal.toLocaleString()
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-slate-600", children: [
        /* @__PURE__ */ jsx("span", { children: "Service fee" }),
        /* @__PURE__ */ jsxs("span", { children: [
          "LKR ",
          fee
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-2 flex justify-between border-t border-slate-200 pt-2 text-base font-bold text-slate-900", children: [
        /* @__PURE__ */ jsx("span", { children: "Total" }),
        /* @__PURE__ */ jsxs("span", { children: [
          "LKR ",
          total.toLocaleString()
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        disabled: slots.length === 0,
        onClick: handleProceedToPayment,
        className: cn(
          "mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-base font-semibold text-white transition active:scale-95",
          slots.length > 0 && isAuthenticated ? "bg-emerald-600 shadow-lg hover:bg-emerald-700" : "cursor-not-allowed bg-slate-300"
        ),
        children: [
          /* @__PURE__ */ jsx(CreditCard, { className: "h-5 w-5" }),
          " ",
          isAuthenticated ? `Proceed to Pay LKR ${total.toLocaleString()}` : "Log in to Book"
        ]
      }
    ),
    slots.length === 0 && /* @__PURE__ */ jsx("p", { className: "mt-2 text-center text-xs text-slate-500", children: "Select at least one time slot" })
  ] });
}
const iconMap = {
  Floodlights: Lightbulb,
  Pavilion: Building2,
  Parking: ParkingCircle,
  Scoreboard: Tv,
  "Changing Rooms": Shirt,
  Canteen: Coffee
};
const cityCoords = {
  Colombo: [6.9271, 79.8612],
  Kandy: [7.2906, 80.6337],
  Galle: [6.0535, 80.2167],
  Matara: [5.9485, 80.5428],
  Kurunegala: [7.4818, 80.3623]
};
function GroundDetail() {
  const {
    id
  } = Route.useParams();
  const navigate = useNavigate();
  const [ground, setGround] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    groundsApi.getById(id).then(setGround).catch(() => setGround(null)).finally(() => setLoading(false));
  }, [id]);
  if (loading) return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center py-20", children: /* @__PURE__ */ jsx("p", { className: "text-slate-500", children: "Loading..." }) });
  if (!ground) return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center", children: /* @__PURE__ */ jsx("p", { className: "text-slate-500", children: "Ground not found" }) });
  const groundWithId = {
    ...ground,
    id: ground._id
  };
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 py-8 sm:px-6", children: [
    /* @__PURE__ */ jsxs("button", { onClick: () => navigate(-1), className: "mb-6 flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700", children: [
      /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
      " Back"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-8 lg:grid-cols-[1fr_400px]", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
        /* @__PURE__ */ jsx(GroundGallery, { image: ground.image, name: ground.name }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-slate-800 sm:text-4xl", children: ground.name }),
          /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-600", children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4" }),
              " ",
              ground.location,
              ", Sri Lanka"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 fill-amber-400 text-amber-400" }),
              " ",
              ground.rating,
              " (",
              ground.reviews,
              " reviews)"
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-slate-600", children: ground.description })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-slate-800", children: "Facilities" }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: ground.facilities.map((f) => {
            const Icon = iconMap[f] ?? Star;
            return /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700", children: [
              /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4 text-emerald-600" }),
              " ",
              f
            ] }, f);
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-slate-800", children: "Location & Directions" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-4 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-slate-200 bg-white p-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-emerald-600", children: [
                /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5" }),
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-slate-800", children: "Address" })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-slate-600", children: [
                ground.name,
                /* @__PURE__ */ jsx("br", {}),
                ground.location,
                ", Sri Lanka"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-slate-200 bg-white p-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-emerald-600", children: [
                /* @__PURE__ */ jsx(Navigation, { className: "h-5 w-5" }),
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-slate-800", children: "Getting There" })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-slate-600", children: [
                "Located in the heart of ",
                ground.location,
                ". Easily accessible by car or public transport. Parking available on-site."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-slate-200 bg-white p-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-emerald-600", children: [
                /* @__PURE__ */ jsx(Clock, { className: "h-5 w-5" }),
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-slate-800", children: "Operating Hours" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-slate-600", children: "Daily: 6:00 AM – 10:00 PM" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-slate-200 bg-white p-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-emerald-600", children: [
                /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5" }),
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-slate-800", children: "Contact" })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-slate-600", children: [
                "+94 11 234 5678",
                /* @__PURE__ */ jsx("br", {}),
                "info@",
                ground.name.toLowerCase().replace(/\s+/g, ""),
                ".lk"
              ] })
            ] })
          ] }),
          (() => {
            const c = cityCoords[ground.location] || [7.5, 80];
            const pad = 0.02;
            const bbox = `${c[1] - pad},${c[0] - pad},${c[1] + pad},${c[0] + pad}`;
            return /* @__PURE__ */ jsx("div", { className: "mt-4 h-56 overflow-hidden rounded-2xl shadow-md", children: /* @__PURE__ */ jsx("iframe", { title: `Map of ${ground.name}`, width: "100%", height: "100%", frameBorder: "0", scrolling: "no", src: `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${c[0]},${c[1]}`, className: "rounded-2xl" }) });
          })()
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(BookingPanel, { ground: groundWithId }) })
    ] })
  ] });
}
export {
  GroundDetail as component
};
