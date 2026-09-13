import { cn } from "@/lib/utils";

const timeSlots = ["06:00–08:00","08:00–10:00","10:00–12:00","12:00–14:00","14:00–16:00","16:00–18:00","18:00–20:00","20:00–22:00"];

export function TimeSlotGrid({ selected, onSelect, bookedSlots }: { selected: string[]; onSelect: (s: string) => void; bookedSlots?: string[] }) {
  const booked = new Set(bookedSlots || []);
  return (
    <div className="grid grid-cols-2 gap-2">
      {timeSlots.map((s) => {
        const isBooked = booked.has(s);
        const isSelected = selected.includes(s);
        return (
          <button
            key={s}
            disabled={isBooked}
            onClick={() => onSelect(s)}
            className={cn(
              "rounded-xl border px-3 py-2.5 text-sm font-medium transition-all active:scale-95",
              isBooked && "cursor-not-allowed border-red-200 bg-red-50 text-red-400 line-through",
              !isBooked && !isSelected && "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
              isSelected && "border-amber-400 bg-amber-400 text-slate-900 shadow",
            )}
          >
            {isBooked ? "Booked" : s}
          </button>
        );
      })}
    </div>
  );
}
