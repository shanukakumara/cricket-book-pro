import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact Us — CricketBook" }] }),
  component: ContactPage,
});

function ContactPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-700 px-4 py-20 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">Contact Us</h1>
          <p className="mt-4 text-lg text-emerald-100">
            Have a question, suggestion, or issue? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-10 px-4 py-16 lg:grid-cols-[1fr_380px]">
        <div>
          {sent ? (
            <div className="rounded-2xl bg-emerald-50 p-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
                <Send className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-slate-800">Message Sent!</h3>
              <p className="mt-2 text-slate-600">Thank you for reaching out. We'll get back to you within 24 hours.</p>
              <button onClick={() => navigate({ to: "/" })} className="mt-6 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">
                Back to Home
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Your Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="John Doe" className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Email Address</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="john@example.com" className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Message</label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={5} placeholder="Tell us how we can help..." className="w-full resize-none rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none" />
              </div>
              <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-700">
                <Send className="h-4 w-4" /> Send Message
              </button>
            </form>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl bg-slate-50 p-6">
            <h3 className="font-bold text-slate-800">Get in Touch</h3>
            <ul className="mt-4 space-y-4 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-emerald-600" />
                <div><p className="font-medium text-slate-800">Email</p><p>hello@cricket.lk</p></div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-emerald-600" />
                <div><p className="font-medium text-slate-800">Phone</p><p>+94 11 234 5678</p></div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-emerald-600" />
                <div><p className="font-medium text-slate-800">Address</p><p>42 Galle Road, Colombo 03, Sri Lanka</p></div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 text-emerald-600" />
                <div><p className="font-medium text-slate-800">Hours</p><p>Mon – Sat, 9 AM – 6 PM</p></div>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-slate-50 p-6">
            <h3 className="font-bold text-slate-800">Follow Us</h3>
            <div className="mt-3 flex gap-3">
              <a href="#" className="rounded-full bg-slate-200 p-2 hover:bg-emerald-200"><span className="text-xs font-medium text-slate-600">FB</span></a>
              <a href="#" className="rounded-full bg-slate-200 p-2 hover:bg-emerald-200"><span className="text-xs font-medium text-slate-600">IG</span></a>
              <a href="#" className="rounded-full bg-slate-200 p-2 hover:bg-emerald-200"><span className="text-xs font-medium text-slate-600">TW</span></a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
