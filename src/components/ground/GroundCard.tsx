import { Link } from "@tanstack/react-router";
import { Star, MapPin } from "lucide-react";

export function GroundCard({ ground }: { ground: any }) {
  return (
    <Link to="/grounds/$id" params={{ id: String(ground.id) }} className="group block overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-48 overflow-hidden">
        <img src={ground.image} alt={ground.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-slate-800 shadow">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {ground.rating}
        </div>
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-emerald-500/90 px-2.5 py-1 text-xs font-semibold text-white shadow">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" /> Available Today
        </div>
      </div>
      <div className="p-5">
        <h3 className="line-clamp-1 text-lg font-bold text-slate-800 group-hover:text-emerald-600">{ground.name}</h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-slate-500"><MapPin className="h-3.5 w-3.5" /> {ground.location}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {ground.facilities.slice(0, 3).map((f) => (
            <span key={f} className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">{f}</span>
          ))}
        </div>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-xs text-slate-500">Starting from</p>
            <p className="text-xl font-bold text-emerald-600">LKR {ground.price.toLocaleString()}<span className="text-xs font-normal text-slate-500">/hr</span></p>
          </div>
          <span className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white group-hover:bg-emerald-700">View & Book</span>
        </div>
      </div>
    </Link>
  );
}
