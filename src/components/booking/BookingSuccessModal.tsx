import { Link } from "@tanstack/react-router";
import { CheckCircle2, X } from "lucide-react";

export function BookingSuccessModal({ onClose, ground, date, slot, total }: {
  onClose: () => void; ground: string; date: string; slot: string; total: number;
}) {
  const ref = `BK-2024-${String(Math.floor(Math.random() * 99999)).padStart(5, "0")}`;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-fadeIn">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-8 shadow-2xl">
        {/* confetti dots */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="absolute h-2 w-2 animate-bounce rounded-full" style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 23) % 60}%`,
              background: ["#10b981","#f59e0b","#3b82f6","#ef4444"][i % 4],
              animationDelay: `${(i % 6) * 0.1}s`,
            }} />
          ))}
        </div>
        <button onClick={onClose} className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-100"><X className="h-5 w-5" /></button>
        <div className="relative text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-10 w-10 text-emerald-600" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-slate-800">Booking Confirmed!</h2>
          <p className="mt-1 text-sm text-slate-500">Your slot has been reserved successfully.</p>
          <div className="mt-5 rounded-xl bg-slate-50 p-4 text-left text-sm">
            <p className="text-xs text-slate-500">Reference</p>
            <p className="font-mono text-lg font-bold text-emerald-600">{ref}</p>
            <div className="mt-3 space-y-1 text-slate-600">
              <p><span className="font-medium text-slate-800">{ground}</span></p>
              <p>{date} • {slot}</p>
              <p className="font-semibold text-slate-800">Total: LKR {total.toLocaleString()}</p>
            </div>
          </div>
          <Link to="/bookings" className="mt-5 block w-full rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700">
            View My Bookings
          </Link>
        </div>
      </div>
    </div>
  );
}
