import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CircleDot, Target, Eye, Shield, Users, Trophy } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About Us — CricketBook" }] }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-700 px-4 py-20 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">About CricketBook</h1>
          <p className="mt-4 text-lg text-emerald-100">
            We're on a mission to make booking cricket grounds in Sri Lanka as easy as hitting a six.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Our Story</h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              CricketBook was born in 2024 from a simple observation: Sri Lankans love cricket, but finding and
              booking a ground was a hassle — phone calls, WhatsApp groups, spreadsheets. We built CricketBook
              to bring every cricket ground in Sri Lanka onto one platform where anyone can book in seconds.
            </p>
            <p className="mt-3 leading-relaxed text-slate-600">
              What started as a small project in Colombo has grown into a platform serving grounds across the
              country, from Kandy to Galle. We're a team of cricket enthusiasts who believe technology can
              make the game more accessible for everyone.
            </p>
          </div>
          <div className="rounded-2xl bg-emerald-50 p-8">
            <div className="flex items-center gap-3">
              <Target className="h-6 w-6 text-emerald-600" />
              <h3 className="text-lg font-bold text-slate-800">Our Mission</h3>
            </div>
            <p className="mt-3 text-slate-600">
              To simplify cricket ground booking across Sri Lanka, empowering players to spend more time
              on the pitch and less time on logistics.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Eye className="h-6 w-6 text-emerald-600" />
              <h3 className="text-lg font-bold text-slate-800">Our Vision</h3>
            </div>
            <p className="mt-3 text-slate-600">
              A Sri Lanka where every cricketer — from schoolyards to club level — can find and book a ground
              with the tap of a finger.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-2xl font-bold text-slate-800">Why Choose Us</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Shield, title: "Secure Booking", desc: "End-to-end encrypted transactions with instant confirmation." },
              { icon: Users, title: "30+ Grounds", desc: "From Colombo to Kandy, find the perfect pitch anywhere." },
              { icon: Trophy, title: "Real Availability", desc: "Live slot availability — no double bookings, no cancellations." },
              { icon: CircleDot, title: "Easy Cancellation", desc: "Free cancellation up to 24 hours before your slot." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                  <Icon className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="mt-4 font-semibold text-slate-800">{title}</h3>
                <p className="mt-1 text-sm text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <h2 className="text-2xl font-bold text-slate-800">Ready to play?</h2>
        <p className="mt-2 text-slate-600">Find your ground and book your next match in minutes.</p>
        <Link to="/grounds" className="mt-6 inline-block rounded-xl bg-emerald-600 px-8 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-700">
          Browse Grounds
        </Link>
      </section>

      <Footer />
    </div>
  );
}
