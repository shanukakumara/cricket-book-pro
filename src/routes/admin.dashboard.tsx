import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { KPICard } from "@/components/admin/KPICard";
import { MapPin, CalendarDays, DollarSign, Users, ArrowLeft } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";
import { bookingsApi, groundsApi } from "@/lib/api";

const COLORS = ["#059669", "#0d9488", "#f59e0b", "#3b82f6", "#94a3b8"];

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({ meta: [{ title: "Admin Dashboard — CricketBook" }] }),
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<any[]>([]);
  const [grounds, setGrounds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([bookingsApi.getAll(), groundsApi.getAll()]).then(([b, g]) => {
      setBookings(b);
      setGrounds(g);
    }).finally(() => setLoading(false));
  }, []);

  const confirmed = bookings.filter((b) => b.status === "Confirmed");
  const revenue = confirmed.reduce((s, b) => s + b.total, 0);
  const users = new Set(bookings.map((b: any) => b.userId)).size;

  const chartData = [
    { day: "Mon", bookings: bookings.filter((b) => new Date(b.date).getDay() === 1).length },
    { day: "Tue", bookings: bookings.filter((b) => new Date(b.date).getDay() === 2).length },
    { day: "Wed", bookings: bookings.filter((b) => new Date(b.date).getDay() === 3).length },
    { day: "Thu", bookings: bookings.filter((b) => new Date(b.date).getDay() === 4).length },
    { day: "Fri", bookings: bookings.filter((b) => new Date(b.date).getDay() === 5).length },
    { day: "Sat", bookings: bookings.filter((b) => new Date(b.date).getDay() === 6).length },
    { day: "Sun", bookings: bookings.filter((b) => new Date(b.date).getDay() === 0).length },
  ];

  const groundBookings = grounds.map((g) => ({
    name: g.name,
    value: bookings.filter((b) => String(b.groundId) === String(g._id)).length,
  }));

  const popular = [...grounds].sort((g1, g2) =>
    bookings.filter((bk) => String(bk.groundId) === String(g2._id)).length -
    bookings.filter((bk) => String(bk.groundId) === String(g1._id)).length
  ).slice(0, 5);

  if (loading) return <p className="text-slate-500">Loading dashboard...</p>;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <button onClick={() => navigate("/")} className="flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700"><ArrowLeft className="h-4 w-4" /> Back to Site</button>
        <h1 className="mt-2 text-3xl font-bold text-slate-800">Dashboard</h1>
        <p className="mt-1 text-slate-500">Welcome back, here's what's happening today.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard label="Total Grounds" value={String(grounds.length)} icon={MapPin} color="bg-emerald-500" trend="-" />
        <KPICard label="Total Bookings" value={String(bookings.length)} icon={CalendarDays} color="bg-blue-500" trend="-" />
        <KPICard label="Revenue" value={`LKR ${revenue.toLocaleString()}`} icon={DollarSign} color="bg-emerald-600" trend="-" />
        <KPICard label="Active Users" value={String(users)} icon={Users} color="bg-amber-500" trend="-" />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="rounded-2xl bg-white p-6 shadow-md lg:col-span-3">
          <h3 className="mb-4 font-bold text-slate-800">Bookings — Last 7 Days</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }} />
              <Line type="monotone" dataKey="bookings" stroke="#059669" strokeWidth={3} dot={{ fill: "#059669", r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-md lg:col-span-2">
          <h3 className="mb-4 font-bold text-slate-800">Bookings by Ground</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={groundBookings} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={2}>
                {groundBookings.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="rounded-2xl bg-white p-6 shadow-md lg:col-span-3">
          <h3 className="mb-4 font-bold text-slate-800">Recent Bookings</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase text-slate-500">
                <tr><th className="py-2">Ref</th><th>User</th><th>Ground</th><th>Date</th><th>Amount</th><th>Status</th></tr>
              </thead>
              <tbody>
                {bookings.slice(0, 5).map((b) => (
                  <tr key={b._id} className="border-t border-slate-100">
                    <td className="py-3 font-mono text-xs text-slate-600">{b._id.toString().slice(-8)}</td>
                    <td className="text-slate-700">{b.user}</td>
                    <td className="max-w-[140px] truncate text-slate-700">{b.ground}</td>
                    <td className="text-slate-600">{b.date}</td>
                    <td className="font-semibold text-emerald-600">LKR {b.total.toLocaleString()}</td>
                    <td>
                      <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${b.status === "Confirmed" ? "bg-green-100 text-green-700" : b.status === "Pending" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>{b.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-md lg:col-span-2">
          <h3 className="mb-4 font-bold text-slate-800">Most Popular Grounds</h3>
          <div className="space-y-4">
            {popular.map((g, i) => {
              const count = bookings.filter((b) => String(b.groundId) === String(g._id)).length;
              const max = Math.max(...popular.map((pg) => bookings.filter((b) => String(b.groundId) === String(pg._id)).length), 1);
              const pct = (count / max) * 100;
              return (
                <div key={g._id}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700"><span className="text-emerald-600">#{i + 1}</span> {g.name}</span>
                    <span className="text-slate-500">{count}</span>
                  </div>
                  <div className="mt-1.5 h-2 rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
