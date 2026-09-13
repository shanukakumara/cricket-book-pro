import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CircleDot, CalendarDays, CreditCard } from "lucide-react";
import { TimeSlotGrid } from "./TimeSlotGrid";
import { cn } from "@/lib/utils";
import { bookingsApi } from "@/lib/api";
import { useAuth } from "@/lib/auth";

export function BookingPanel({ ground }: { ground: any }) {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [slots, setSlots] = useState<string[]>([]);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setSlots([]);
    bookingsApi.getAvailability(ground._id || ground.id, date)
      .then(setBookedSlots)
      .catch(() => setBookedSlots([]));
  }, [date, ground._id, ground.id]);

  const toggleSlot = (s: string) => {
    setSlots((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  };

  const fee = 100;
  const subtotal = ground.price * slots.length;
  const total = subtotal + fee;

  const handleProceedToPayment = () => {
    if (!isAuthenticated) { navigate({ to: "/login" }); return; }
    const bookingData = {
      groundName: ground.name,
      groundId: ground._id || ground.id,
      date,
      slots,
      total,
      price: ground.price,
    };
    sessionStorage.setItem("pendingBooking", JSON.stringify(bookingData));
    navigate({ to: "/payment" });
  };

  return (
    <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-md">
      <div className="flex items-end justify-between border-b border-slate-100 pb-4">
        <div>
          <p className="text-xs text-slate-500">Price</p>
          <p className="text-3xl font-bold text-emerald-600">LKR {ground.price.toLocaleString()}<span className="text-sm font-normal text-slate-500">/hr</span></p>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Per slot</span>
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-sm font-semibold text-slate-700">Select Date</label>
        <div className="relative">
          <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm focus:border-emerald-500 focus:outline-none" />
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-sm font-semibold text-slate-700">Select Time Slots</label>
        <TimeSlotGrid selected={slots} onSelect={toggleSlot} bookedSlots={bookedSlots} />
      </div>

      <div className="mt-5 space-y-2 rounded-xl bg-slate-50 p-4 text-sm">
        <div className="flex justify-between text-slate-600"><span>Date</span><span className="font-medium text-slate-800">{date}</span></div>
        <div className="flex justify-between text-slate-600">
          <span>Slots ({slots.length})</span>
          <span className="max-w-[180px] truncate text-right font-medium text-slate-800">{slots.length ? slots.join(", ") : "—"}</span>
        </div>
        <div className="flex justify-between text-slate-600"><span>Subtotal</span><span>LKR {subtotal.toLocaleString()}</span></div>
        <div className="flex justify-between text-slate-600"><span>Service fee</span><span>LKR {fee}</span></div>
        <div className="mt-2 flex justify-between border-t border-slate-200 pt-2 text-base font-bold text-slate-900"><span>Total</span><span>LKR {total.toLocaleString()}</span></div>
      </div>

      <button
        disabled={slots.length === 0}
        onClick={handleProceedToPayment}
        className={cn(
          "mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-base font-semibold text-white transition active:scale-95",
          slots.length > 0 && isAuthenticated ? "bg-emerald-600 shadow-lg hover:bg-emerald-700" : "cursor-not-allowed bg-slate-300",
        )}
      >
        <CreditCard className="h-5 w-5" /> {isAuthenticated ? `Proceed to Pay LKR ${total.toLocaleString()}` : "Log in to Book"}
      </button>
      {slots.length === 0 && <p className="mt-2 text-center text-xs text-slate-500">Select at least one time slot</p>}
    </div>
  );
}
