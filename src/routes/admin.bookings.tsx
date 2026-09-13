import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight, ArrowLeft, X, CheckCircle2, Ban, Eye } from "lucide-react";
import { bookingsApi, groundsApi } from "@/lib/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/bookings")({
  head: () => ({ meta: [{ title: "All Bookings — Admin" }] }),
  component: AdminBookings,
});

function AdminBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<any[]>([]);
  const [grounds, setGrounds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("All");
  const [ground, setGround] = useState("All");
  const [q, setQ] = useState("");
  const [viewBooking, setViewBooking] = useState<any>(null);
  const [page, setPage] = useState(1);
  const perPage = 10;

  const load = () => {
    setLoading(true);
    Promise.all([bookingsApi.getAll(), groundsApi.getAll()]).then(([b, g]) => {
      setBookings(b);
      setGrounds(g);
    }).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const filtered = bookings.filter((b) =>
    (status === "All" || b.status === status) &&
    (ground === "All" || b.ground === ground) &&
    (b.user.toLowerCase().includes(q.toLowerCase()) || b._id.toLowerCase().includes(q.toLowerCase()))
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  useEffect(() => { setPage(1); }, [status, ground, q]);

  const handleConfirm = async (id: string) => {
    try { await bookingsApi.update(id, { status: "Confirmed" }); load(); } catch {}
  };
  const handleCancel = async (id: string) => {
    try { await bookingsApi.cancel(id); load(); } catch {}
  };

  if (loading) return <p className="text-slate-500">Loading bookings...</p>;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <button onClick={() => navigate("/admin/dashboard")} className="mb-2 flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700"><ArrowLeft className="h-4 w-4" /> Dashboard</button>
        <h1 className="text-3xl font-bold text-slate-800">All Bookings</h1>
        <p className="mt-1 text-sm text-slate-500">{bookings.length} total bookings</p>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-md sm:p-6">
        <div className="mb-5 flex flex-wrap gap-3">
          <div className="relative min-w-[200px] flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search user or ref..." className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm focus:border-emerald-500 focus:outline-none" />
          </div>
          <Select value={ground} onValueChange={setGround}>
            <SelectTrigger className="w-[200px]"><SelectValue placeholder="Ground" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Grounds</SelectItem>
              {grounds.map((g) => <SelectItem key={g._id} value={g.name}>{g.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[150px]"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              {["All","Confirmed","Pending","Cancelled"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase text-slate-500">
              <tr>
                <th className="py-3">Ref#</th><th>User</th><th>Email</th><th>Ground</th><th>Date</th><th>Slot</th><th>Amount</th><th>Status</th><th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((b) => (
                <tr key={b._id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="py-3 font-mono text-xs text-slate-600">{b._id.toString().slice(-8)}</td>
                  <td className="text-slate-700">{b.user}</td>
                  <td className="text-slate-500">{b.email || "—"}</td>
                  <td className="max-w-[160px] truncate text-slate-700">{b.ground}</td>
                  <td className="text-slate-600">{b.date}</td>
                  <td className="text-slate-600">{b.slot}</td>
                  <td className="font-semibold text-emerald-600">LKR {b.total?.toLocaleString()}</td>
                  <td>
                    <span className={cn(
                      "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                      b.status === "Confirmed" && "bg-green-100 text-green-700",
                      b.status === "Pending" && "bg-amber-100 text-amber-700",
                      b.status === "Cancelled" && "bg-red-100 text-red-700",
                    )}>{b.status}</span>
                  </td>
                  <td>
                    <div className="flex justify-end gap-1">
                      <button onClick={() => setViewBooking(b)} className="rounded-lg border border-slate-200 p-1.5 hover:bg-slate-50" title="View"><Eye className="h-3.5 w-3.5" /></button>
                      {b.status === "Pending" && (
                        <button onClick={() => handleConfirm(b._id)} className="rounded-lg border border-emerald-200 p-1.5 text-emerald-600 hover:bg-emerald-50" title="Confirm"><CheckCircle2 className="h-3.5 w-3.5" /></button>
                      )}
                      {b.status !== "Cancelled" && (
                        <button onClick={() => handleCancel(b._id)} className="rounded-lg border border-red-200 p-1.5 text-red-600 hover:bg-red-50" title="Cancel"><Ban className="h-3.5 w-3.5" /></button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {paged.length === 0 && (
                <tr><td colSpan={9} className="py-10 text-center text-sm text-slate-400">No bookings found.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex items-center justify-between text-sm">
          <span className="text-slate-500">Page {page} of {totalPages}</span>
          <div className="flex items-center gap-1">
            <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="rounded-lg border border-slate-200 p-1.5 hover:bg-slate-50 disabled:opacity-30"><ChevronLeft className="h-4 w-4" /></button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} onClick={() => setPage(p)} className={cn("h-8 w-8 rounded-lg text-sm", p === page ? "bg-emerald-600 font-semibold text-white" : "hover:bg-slate-50")}>{p}</button>
            ))}
            <button disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="rounded-lg border border-slate-200 p-1.5 hover:bg-slate-50 disabled:opacity-30"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
      </div>

      {viewBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setViewBooking(null)}>
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-800">Booking Details</h3>
              <button onClick={() => setViewBooking(null)} className="rounded-lg p-1 hover:bg-slate-100"><X className="h-4 w-4" /></button>
            </div>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Reference</span><span className="font-mono text-slate-800">{viewBooking._id}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">User</span><span className="text-slate-800">{viewBooking.user}</span></div>
              {viewBooking.email && <div className="flex justify-between"><span className="text-slate-500">Email</span><span className="text-slate-800">{viewBooking.email}</span></div>}
              <div className="flex justify-between"><span className="text-slate-500">Ground</span><span className="text-slate-800">{viewBooking.ground}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Date</span><span className="text-slate-800">{viewBooking.date}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Slot</span><span className="text-slate-800">{viewBooking.slot}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Duration</span><span className="text-slate-800">{viewBooking.duration || "—"}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Total</span><span className="font-semibold text-emerald-600">LKR {viewBooking.total?.toLocaleString()}</span></div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status</span>
                <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold", viewBooking.status === "Confirmed" && "bg-green-100 text-green-700", viewBooking.status === "Pending" && "bg-amber-100 text-amber-700", viewBooking.status === "Cancelled" && "bg-red-100 text-red-700")}>{viewBooking.status}</span>
              </div>
              <div className="flex justify-between"><span className="text-slate-500">Created</span><span className="text-slate-800">{new Date(viewBooking.createdAt).toLocaleString()}</span></div>
            </div>
            <div className="mt-5 flex gap-2">
              {viewBooking.status === "Pending" && (
                <button onClick={() => { handleConfirm(viewBooking._id); setViewBooking(null); }} className="flex-1 rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">Confirm</button>
              )}
              {viewBooking.status !== "Cancelled" && (
                <button onClick={() => { handleCancel(viewBooking._id); setViewBooking(null); }} className="flex-1 rounded-xl border border-red-200 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50">Cancel Booking</button>
              )}
              <button onClick={() => setViewBooking(null)} className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm text-slate-600 hover:bg-slate-50">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
