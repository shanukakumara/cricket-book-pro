import { Fragment } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, Ban, CheckCircle2 } from "lucide-react";
import { groundsApi, slotsApi } from "@/lib/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const timeSlots = [
  "06:00–08:00", "08:00–10:00", "10:00–12:00", "12:00–14:00",
  "14:00–16:00", "16:00–18:00", "18:00–20:00", "20:00–22:00",
];

function getWeekDays(date: Date) {
  const start = new Date(date);
  const day = start.getDay();
  const diff = start.getDate() - day + (day === 0 ? -6 : 1);
  start.setDate(diff);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    return d;
  });
}

function fmtDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

function fmtDisplay(d: Date) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`;
}

export const Route = createFileRoute("/admin/slots")({
  head: () => ({ meta: [{ title: "Manage Slots — Admin" }] }),
  component: AdminSlots,
});

function AdminSlots() {
  const navigate = useNavigate();
  const [grounds, setGrounds] = useState<any[]>([]);
  const [groundId, setGroundId] = useState("");
  const [weekStart, setWeekStart] = useState(() => {
    const d = new Date();
    const day = d.getDay();
    d.setDate(d.getDate() - (day === 0 ? 6 : day - 1));
    return d;
  });
  const [availability, setAvailability] = useState<Record<string, { booked: string[]; blocked: string[] }>>({});
  const [blockedIds, setBlockedIds] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const weekDays = getWeekDays(weekStart);

  useEffect(() => {
    groundsApi.getAll().then((g) => { setGrounds(g); if (g.length && !groundId) setGroundId(g[0]._id); });
  }, []);

  const load = useCallback(async () => {
    if (!groundId) return;
    setLoading(true);
    try {
      const dates = weekDays.map(fmtDate);
      const results = await Promise.all(dates.map((d) => slotsApi.getAvailability(groundId, d)));
      const map: Record<string, { booked: string[]; blocked: string[] }> = {};
      const ids: Record<string, string> = {};
      for (const [i, d] of dates.entries()) {
        map[d] = results[i];
        const blocked = await slotsApi.getByGround(groundId, d);
        for (const b of blocked) {
          ids[`${d}_${b.slot}`] = b._id;
        }
      }
      setAvailability(map);
      setBlockedIds(ids);
    } catch (e) {
      console.error("Failed to load slots", e);
    }
    setLoading(false);
  }, [groundId, weekStart]);

  useEffect(() => { load(); }, [load]);

  const toggleBlock = async (date: string, slot: string) => {
    const key = `${date}_${slot}`;
    if (blockedIds[key]) {
      await slotsApi.unblock(blockedIds[key]);
    } else {
      await slotsApi.block({ groundId, date, slot });
    }
    load();
  };

  const isBooked = (date: string, slot: string) => availability[date]?.booked.includes(slot) ?? false;
  const isBlocked = (date: string, slot: string) => availability[date]?.blocked.includes(slot) ?? false;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <button onClick={() => navigate("/admin/dashboard")} className="mb-2 flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700"><ArrowLeft className="h-4 w-4" /> Dashboard</button>
          <h1 className="text-3xl font-bold text-slate-800">Manage Slots</h1>
          <p className="mt-1 text-sm text-slate-500">Toggle slots to block or unblock availability</p>
        </div>
        <Select value={groundId} onValueChange={setGroundId}>
          <SelectTrigger className="w-[260px]"><SelectValue placeholder="Select ground" /></SelectTrigger>
          <SelectContent>
            {grounds.map((g) => <SelectItem key={g._id} value={g._id}>{g.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-md sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={() => { const d = new Date(weekStart); d.setDate(d.getDate() - 7); setWeekStart(d); }} className="rounded-lg border border-slate-200 p-1.5 hover:bg-slate-50"><ChevronLeft className="h-4 w-4" /></button>
            <span className="text-sm font-semibold text-slate-700">
              {fmtDisplay(weekDays[0])} – {fmtDisplay(weekDays[6])}
            </span>
            <button onClick={() => { const d = new Date(weekStart); d.setDate(d.getDate() + 7); setWeekStart(d); }} className="rounded-lg border border-slate-200 p-1.5 hover:bg-slate-50"><ChevronRight className="h-4 w-4" /></button>
          </div>
          <div className="flex gap-4 text-xs text-slate-600">
            <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-emerald-500" /> Available</span>
            <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-red-500" /> Booked</span>
            <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-slate-400" /> Blocked</span>
          </div>
        </div>

        {loading ? (
          <p className="py-10 text-center text-sm text-slate-400">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <div className="grid min-w-[700px] grid-cols-[120px_repeat(7,1fr)] gap-2">
              <div />
              {weekDays.map((d) => (
                <div key={fmtDate(d)} className="px-2 py-1 text-center">
                  <div className="text-sm font-semibold text-slate-700">{["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][d.getDay()]}</div>
                  <div className="text-[11px] text-slate-400">{d.getDate()}/{d.getMonth()+1}</div>
                </div>
              ))}
              {timeSlots.map((slot) => (
                <Fragment key={slot}>
                  <div className="flex items-center justify-end pr-2 text-xs font-medium text-slate-500">{slot}</div>
                  {weekDays.map((d) => {
                    const date = fmtDate(d);
                    const booked = isBooked(date, slot);
                    const blocked = isBlocked(date, slot);
                    return (
                      <button
                        key={slot + date}
                        disabled={booked}
                        onClick={() => toggleBlock(date, slot)}
                        className={cn(
                          "h-12 rounded-lg text-xs font-medium transition",
                          booked && "bg-red-100 text-red-700 cursor-not-allowed",
                          blocked && "bg-slate-300 text-slate-600 hover:bg-slate-400",
                          !booked && !blocked && "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
                        )}
                      >
                        {booked && <><Ban className="mr-1 inline h-3 w-3" /> Booked</>}
                        {blocked && <><CheckCircle2 className="mr-1 inline h-3 w-3" /> Blocked</>}
                        {!booked && !blocked && "Open"}
                      </button>
                    );
                  })}
                </Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
