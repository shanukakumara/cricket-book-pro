import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import { GroundCard } from "@/components/grounds/GroundCard";
import { groundsApi } from "@/lib/api";
import { Zap, BarChart3, Lock, Star } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CricketBook — Book Cricket Grounds in Sri Lanka" },
      { name: "description", content: "Find and reserve premium cricket grounds in Sri Lanka — fast, easy, and online." },
    ],
  }),
  component: Home,
});

const testimonials = [
  { name: "Kamal Perera", location: "Kandy", quote: "Booked Asgiriya in two minutes — the whole process was seamless. Highly recommend to any cricket lover!" },
  { name: "Saman Silva", location: "Colombo", quote: "Great selection of grounds and clear pricing. The live availability feature saved me a lot of time." },
  { name: "Anura Bandara", location: "Galle", quote: "Played a tournament across three grounds, all booked here. Smooth experience from start to finish." },
];

function Home() {
  const [featured, setFeatured] = useState<any[]>([]);

  useEffect(() => {
    groundsApi.getAll().then((g) => setFeatured(g.slice(0, 3))).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section
        className="relative flex min-h-[88vh] items-center justify-center bg-cover bg-center px-4"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1920&q=80)" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative mx-auto max-w-4xl text-center animate-fadeIn">
          <span className="inline-block rounded-full bg-emerald-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-300 backdrop-blur">
            🏏 Sri Lanka's #1 Cricket Booking Platform
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white sm:text-6xl">
            Book Your Perfect{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Cricket Ground
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-200">
            Find and reserve premium cricket grounds in Sri Lanka — fast, easy, and online.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/grounds" className="rounded-xl bg-emerald-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-emerald-700">
              Browse Grounds
            </Link>
            <a href="#how" className="rounded-xl border border-white/40 bg-white/10 px-7 py-3.5 text-base font-semibold text-white backdrop-blur transition hover:bg-white/20">
              How It Works
            </a>
          </div>

          <div className="mx-auto mt-14 grid max-w-3xl gap-4 sm:grid-cols-3">
            {[
              { icon: "🏏", value: "12", label: "Cricket Grounds" },
              { icon: "📅", value: "500+", label: "Bookings Made" },
              { icon: "⭐", value: "4.8", label: "Average Rating" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">
                <div className="text-2xl">{s.icon}</div>
                <p className="mt-1 text-3xl font-bold text-white">{s.value}</p>
                <p className="text-sm text-slate-200">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-800 sm:text-4xl">Why Choose CricketBook?</h2>
          <p className="mt-3 text-slate-500">Everything you need to book your next match — in one place.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { icon: Zap, title: "Instant Booking", desc: "Reserve your slot in under 2 minutes with a streamlined checkout." },
            { icon: BarChart3, title: "Live Availability", desc: "Real-time slot updates across all grounds — never double-book." },
            { icon: Lock, title: "Secure Payments", desc: "Safe and encrypted transactions, protected end-to-end." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl bg-white p-7 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-slate-800">{title}</h3>
              <p className="mt-2 leading-relaxed text-slate-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Grounds */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 sm:text-4xl">Featured Cricket Grounds</h2>
              <p className="mt-2 text-slate-500">Hand-picked venues across Sri Lanka.</p>
            </div>
            <Link to="/grounds" className="text-sm font-semibold text-emerald-600 hover:underline">View all →</Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((g) => <GroundCard key={g._id} ground={{ ...g, id: g._id }} />)}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-800 sm:text-4xl">How It Works</h2>
            <p className="mt-2 text-slate-500">Get on the pitch in four simple steps.</p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {["Register Account","Browse Grounds","Select Slot","Confirm Booking"].map((step, i) => (
              <div key={step} className="relative text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-xl font-bold text-white shadow-lg">{i + 1}</div>
                <h3 className="mt-4 font-semibold text-slate-800">{step}</h3>
                {i < 3 && <div className="absolute right-[-30px] top-7 hidden h-px w-[60px] border-t-2 border-dashed border-emerald-300 lg:block" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-800 sm:text-4xl">Loved by Cricket Lovers</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl bg-white p-6 shadow-md">
              <div className="flex items-center gap-3">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${t.name}`} alt={t.name} className="h-12 w-12 rounded-full bg-slate-100" />
                <div>
                  <p className="font-semibold text-slate-800">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.location}</p>
                </div>
              </div>
              <div className="mt-3 flex gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-3 leading-relaxed text-slate-600">"{t.quote}"</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
