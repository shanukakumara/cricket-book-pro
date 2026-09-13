import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { N as Navbar, F as Footer } from "./Footer-C1vCG-1z.js";
import { Target, Eye, Shield, Users, Trophy, CircleDot } from "lucide-react";
import "react";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "./router-DynjYsUx.js";
import "@tanstack/react-query";
import "sonner";
function AboutPage() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("section", { className: "relative overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-700 px-4 py-20 text-white", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold sm:text-5xl", children: "About CricketBook" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-emerald-100", children: "We're on a mission to make booking cricket grounds in Sri Lanka as easy as hitting a six." })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-5xl px-4 py-16 sm:px-6", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-12 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-slate-800", children: "Our Story" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-slate-600", children: "CricketBook was born in 2024 from a simple observation: Sri Lankans love cricket, but finding and booking a ground was a hassle — phone calls, WhatsApp groups, spreadsheets. We built CricketBook to bring every cricket ground in Sri Lanka onto one platform where anyone can book in seconds." }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 leading-relaxed text-slate-600", children: "What started as a small project in Colombo has grown into a platform serving grounds across the country, from Kandy to Galle. We're a team of cricket enthusiasts who believe technology can make the game more accessible for everyone." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-emerald-50 p-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(Target, { className: "h-6 w-6 text-emerald-600" }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-slate-800", children: "Our Mission" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-slate-600", children: "To simplify cricket ground booking across Sri Lanka, empowering players to spend more time on the pitch and less time on logistics." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(Eye, { className: "h-6 w-6 text-emerald-600" }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-slate-800", children: "Our Vision" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-slate-600", children: "A Sri Lanka where every cricketer — from schoolyards to club level — can find and book a ground with the tap of a finger." })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-slate-50 px-4 py-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-slate-800", children: "Why Choose Us" }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4", children: [{
        icon: Shield,
        title: "Secure Booking",
        desc: "End-to-end encrypted transactions with instant confirmation."
      }, {
        icon: Users,
        title: "30+ Grounds",
        desc: "From Colombo to Kandy, find the perfect pitch anywhere."
      }, {
        icon: Trophy,
        title: "Real Availability",
        desc: "Live slot availability — no double bookings, no cancellations."
      }, {
        icon: CircleDot,
        title: "Easy Cancellation",
        desc: "Free cancellation up to 24 hours before your slot."
      }].map(({
        icon: Icon,
        title,
        desc
      }) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-white p-6 shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100", children: /* @__PURE__ */ jsx(Icon, { className: "h-6 w-6 text-emerald-600" }) }),
        /* @__PURE__ */ jsx("h3", { className: "mt-4 font-semibold text-slate-800", children: title }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-slate-500", children: desc })
      ] }, title)) })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-3xl px-4 py-16 text-center sm:px-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-slate-800", children: "Ready to play?" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-slate-600", children: "Find your ground and book your next match in minutes." }),
      /* @__PURE__ */ jsx(Link, { to: "/grounds", className: "mt-6 inline-block rounded-xl bg-emerald-600 px-8 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-700", children: "Browse Grounds" })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  AboutPage as component
};
