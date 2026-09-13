import { Link } from "@tanstack/react-router";
import { CircleDot, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white">
              <CircleDot className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold text-white">CricketBook</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            Sri Lanka's premier platform for booking cricket grounds online — fast, easy, secure.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/grounds" className="hover:text-emerald-400">Browse Grounds</Link></li>
            <li><Link to="/about" className="hover:text-emerald-400">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-emerald-400">Contact Us</Link></li>
            <li><Link to="/bookings" className="hover:text-emerald-400">My Bookings</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Contact</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@cricket.lk</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +94 11 234 5678</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Colombo, Sri Lanka</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Follow Us</h4>
          <div className="flex gap-3">
            <a href="#" className="rounded-full bg-slate-800 p-2 hover:bg-emerald-600"><Facebook className="h-4 w-4" /></a>
            <a href="#" className="rounded-full bg-slate-800 p-2 hover:bg-emerald-600"><Instagram className="h-4 w-4" /></a>
            <a href="#" className="rounded-full bg-slate-800 p-2 hover:bg-emerald-600"><Twitter className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        © 2026 CricketBook. Built for cricket lovers in Sri Lanka.
      </div>
    </footer>
  );
}
