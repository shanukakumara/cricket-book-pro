import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { N as Navbar, F as Footer } from "./Footer-C1vCG-1z.js";
import { G as GroundCard } from "./GroundCard-DXSettLd.js";
import { g as groundsApi } from "./api-DLdzAhMZ.js";
import { Zap, BarChart3, Lock, Star } from "lucide-react";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "./router-DynjYsUx.js";
import "@tanstack/react-query";
import "sonner";
const testimonials = [{
  name: "Kamal Perera",
  location: "Kandy",
  quote: "Booked Asgiriya in two minutes — the whole process was seamless. Highly recommend to any cricket lover!"
}, {
  name: "Saman Silva",
  location: "Colombo",
  quote: "Great selection of grounds and clear pricing. The live availability feature saved me a lot of time."
}, {
  name: "Anura Bandara",
  location: "Galle",
  quote: "Played a tournament across three grounds, all booked here. Smooth experience from start to finish."
}];
function Home() {
  const [featured, setFeatured] = useState([]);
  useEffect(() => {
    groundsApi.getAll().then((g) => setFeatured(g.slice(0, 3))).catch(() => {
    });
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("section", { className: "relative flex min-h-[88vh] items-center justify-center bg-cover bg-center px-4", style: {
      backgroundImage: "url(https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1920&q=80)"
    }, children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/60" }),
      /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-4xl text-center animate-fadeIn", children: [
        /* @__PURE__ */ jsx("span", { className: "inline-block rounded-full bg-emerald-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-300 backdrop-blur", children: "🏏 Sri Lanka's #1 Cricket Booking Platform" }),
        /* @__PURE__ */ jsxs("h1", { className: "mt-5 text-4xl font-extrabold leading-tight text-white sm:text-6xl", children: [
          "Book Your Perfect",
          " ",
          /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent", children: "Cricket Ground" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mx-auto mt-5 max-w-2xl text-lg text-slate-200", children: "Find and reserve premium cricket grounds in Sri Lanka — fast, easy, and online." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-wrap justify-center gap-4", children: [
          /* @__PURE__ */ jsx(Link, { to: "/grounds", className: "rounded-xl bg-emerald-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-emerald-700", children: "Browse Grounds" }),
          /* @__PURE__ */ jsx("a", { href: "#how", className: "rounded-xl border border-white/40 bg-white/10 px-7 py-3.5 text-base font-semibold text-white backdrop-blur transition hover:bg-white/20", children: "How It Works" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mx-auto mt-14 grid max-w-3xl gap-4 sm:grid-cols-3", children: [{
          icon: "🏏",
          value: "12",
          label: "Cricket Grounds"
        }, {
          icon: "📅",
          value: "500+",
          label: "Bookings Made"
        }, {
          icon: "⭐",
          value: "4.8",
          label: "Average Rating"
        }].map((s) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md", children: [
          /* @__PURE__ */ jsx("div", { className: "text-2xl", children: s.icon }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-3xl font-bold text-white", children: s.value }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-200", children: s.label })
        ] }, s.label)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-7xl px-6 py-20", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-slate-800 sm:text-4xl", children: "Why Choose CricketBook?" }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-slate-500", children: "Everything you need to book your next match — in one place." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 grid gap-6 md:grid-cols-3", children: [{
        icon: Zap,
        title: "Instant Booking",
        desc: "Reserve your slot in under 2 minutes with a streamlined checkout."
      }, {
        icon: BarChart3,
        title: "Live Availability",
        desc: "Real-time slot updates across all grounds — never double-book."
      }, {
        icon: Lock,
        title: "Secure Payments",
        desc: "Safe and encrypted transactions, protected end-to-end."
      }].map(({
        icon: Icon,
        title,
        desc
      }) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-white p-7 shadow-md transition hover:-translate-y-1 hover:shadow-xl", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600", children: /* @__PURE__ */ jsx(Icon, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsx("h3", { className: "mt-5 text-xl font-bold text-slate-800", children: title }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 leading-relaxed text-slate-500", children: desc })
      ] }, title)) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "bg-white py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-end justify-between gap-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-slate-800 sm:text-4xl", children: "Featured Cricket Grounds" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-slate-500", children: "Hand-picked venues across Sri Lanka." })
        ] }),
        /* @__PURE__ */ jsx(Link, { to: "/grounds", className: "text-sm font-semibold text-emerald-600 hover:underline", children: "View all →" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: featured.map((g) => /* @__PURE__ */ jsx(GroundCard, { ground: {
        ...g,
        id: g._id
      } }, g._id)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "how", className: "bg-slate-50 py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-slate-800 sm:text-4xl", children: "How It Works" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-slate-500", children: "Get on the pitch in four simple steps." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4", children: ["Register Account", "Browse Grounds", "Select Slot", "Confirm Booking"].map((step, i) => /* @__PURE__ */ jsxs("div", { className: "relative text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-xl font-bold text-white shadow-lg", children: i + 1 }),
        /* @__PURE__ */ jsx("h3", { className: "mt-4 font-semibold text-slate-800", children: step }),
        i < 3 && /* @__PURE__ */ jsx("div", { className: "absolute right-[-30px] top-7 hidden h-px w-[60px] border-t-2 border-dashed border-emerald-300 lg:block" })
      ] }, step)) })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-7xl px-6 py-20", children: [
      /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-slate-800 sm:text-4xl", children: "Loved by Cricket Lovers" }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 grid gap-6 md:grid-cols-3", children: testimonials.map((t) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-white p-6 shadow-md", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("img", { src: `https://api.dicebear.com/7.x/avataaars/svg?seed=${t.name}`, alt: t.name, className: "h-12 w-12 rounded-full bg-slate-100" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "font-semibold text-slate-800", children: t.name }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500", children: t.location })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-3 flex gap-0.5 text-amber-400", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 fill-current" }, i)) }),
        /* @__PURE__ */ jsxs("p", { className: "mt-3 leading-relaxed text-slate-600", children: [
          '"',
          t.quote,
          '"'
        ] })
      ] }, t.name)) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  Home as component
};
