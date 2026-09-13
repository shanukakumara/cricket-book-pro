import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookingCard } from "@/components/booking/BookingCard";
import { bookingsApi, groundsApi } from "@/lib/api";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/bookings")({
  head: () => ({ meta: [{ title: "My Bookings — CricketBook" }] }),
  component: MyBookings,
});

const tabs = ["Upcoming", "Past", "Cancelled"] as const;

function MyBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<any[]>([]);
  const [grounds, setGrounds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<typeof tabs[number]>("Upcoming");

  useEffect(() => {
    Promise.all([bookingsApi.getAll(), groundsApi.getAll()]).then(([b, g]) => {
      setBookings(b);
      setGrounds(g);
    }).finally(() => setLoading(false));
  }, []);

  const getGroundImage = (groundId: string) => {
    const g = grounds.find((gr) => String(gr._id) === String(groundId));
    return g?.image;
  };

  const today = new Date().toISOString().slice(0, 10);
  const filtered = bookings.filter((b) => {
    if (tab === "Cancelled") return b.status === "Cancelled";
    if (tab === "Upcoming") return b.status !== "Cancelled" && b.date >= today;
    return b.status !== "Cancelled" && b.date < today;
  });

  const handleCancel = async (id: string) => {
    await bookingsApi.cancel(id);
    setBookings((prev) => prev.map((b) => b._id === id ? { ...b, status: "Cancelled" } : b));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700"><ArrowLeft className="h-4 w-4" /> Back</button>
        <h1 className="mt-2 text-3xl font-bold text-slate-800 sm:text-4xl">My Bookings</h1>
        <p className="mt-2 text-slate-500">Manage your reservations across all cricket grounds.</p>

        <div className="mt-6 flex gap-2 border-b border-slate-200">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={cn(
              "border-b-2 px-4 py-2.5 text-sm font-medium transition",
              tab === t ? "border-emerald-500 text-emerald-600" : "border-transparent text-slate-500 hover:text-slate-800",
            )}>{t}</button>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          {loading && <p className="text-center text-slate-500">Loading bookings...</p>}
          {!loading && filtered.length === 0 && (
            <div className="rounded-2xl bg-white p-12 text-center shadow-md">
              <p className="text-slate-500">No {tab.toLowerCase()} bookings.</p>
            </div>
          )}
          {filtered.map((b) => (
            <BookingCard key={b._id} booking={{ ...b, id: b._id, image: getGroundImage(b.groundId) }} actions={
              <>
                {tab === "Upcoming" && (
                  <>
                    <Link to="/grounds/$id" params={{ id: b.groundId }} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium hover:bg-slate-50">View Details</Link>
                    <button onClick={() => handleCancel(b._id)} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50">Cancel</button>
                  </>
                )}
                {tab === "Past" && (
                  <>
                    <Link to="/grounds/$id" params={{ id: b.groundId }} className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700">Rebook</Link>
                    <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium hover:bg-slate-50">Review</button>
                  </>
                )}
                {tab === "Cancelled" && (
                  <Link to="/grounds/$id" params={{ id: b.groundId }} className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700">Rebook</Link>
                )}
              </>
            } />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
