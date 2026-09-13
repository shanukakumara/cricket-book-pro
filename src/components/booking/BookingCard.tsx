import { cn } from "@/lib/utils";

const statusStyle: Record<string, string> = {
  Confirmed: "bg-green-100 text-green-700",
  Pending: "bg-amber-100 text-amber-700",
  Cancelled: "bg-red-100 text-red-700",
};

export function BookingCard({ booking, actions }: { booking: any; actions: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-md transition hover:shadow-lg sm:flex-row">
      <img src={booking.image || "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&q=80"} alt={booking.ground} className="h-32 w-full rounded-xl object-cover sm:h-24 sm:w-32" />
      <div className="flex-1">
        <h3 className="font-bold text-slate-800">{booking.ground}</h3>
        <p className="mt-1 text-sm text-slate-500">{booking.date} • {booking.slot} • {booking.duration}</p>
        <p className="mt-1 font-mono text-xs text-slate-400">{booking.id}</p>
      </div>
      <div className="flex flex-col items-start gap-2 sm:items-end">
        <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", statusStyle[booking.status])}>{booking.status}</span>
        <p className="text-lg font-bold text-emerald-600">LKR {booking.total.toLocaleString()}</p>
        <div className="flex gap-2">{actions}</div>
      </div>
    </div>
  );
}
