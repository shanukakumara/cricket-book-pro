import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Search, ArrowLeft, Ban, CheckCircle2 } from "lucide-react";
import { usersApi, bookingsApi } from "@/lib/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/users")({
  head: () => ({ meta: [{ title: "Manage Users — Admin" }] }),
  component: AdminUsers,
});

function AdminUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [role, setRole] = useState("All");

  const load = () => {
    setLoading(true);
    Promise.all([usersApi.getAll(), bookingsApi.getAll()]).then(([u, b]) => {
      setUsers(u);
      setBookings(b);
    }).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const userSpent = (userId: string) =>
    bookings.filter((b) => String(b.userId) === String(userId) && b.status === "Confirmed").reduce((s, b) => s + b.total, 0);

  const handleToggleStatus = async (u: any) => {
    const next = u.status === "Active" ? "Suspended" : "Active";
    try { await usersApi.update(u._id, { status: next }); load(); } catch {}
  };

  const filtered = users.filter((u) =>
    (role === "All" || u.role === role) &&
    (u.name.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase()))
  );

  if (loading) return <p className="text-slate-500">Loading users...</p>;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <button onClick={() => navigate("/admin/dashboard")} className="mb-2 flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700"><ArrowLeft className="h-4 w-4" /> Dashboard</button>
        <h1 className="text-3xl font-bold text-slate-800">Manage Users</h1>
        <p className="mt-1 text-sm text-slate-500">{users.length} registered users</p>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-md sm:p-6">
        <div className="mb-5 flex flex-wrap gap-3">
          <div className="relative min-w-[200px] flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or email..." className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm focus:border-emerald-500 focus:outline-none" />
          </div>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger className="w-[150px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              {["All","User","Admin"].map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase text-slate-500">
              <tr><th className="py-3">User</th><th>Email</th><th>Phone</th><th>Joined</th><th>Bookings</th><th>Spent</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u._id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${u.name}`} className="h-10 w-10 rounded-full bg-slate-100" alt={u.name} />
                      <div>
                        <p className="font-medium text-slate-800">{u.name}</p>
                        <p className="text-xs text-slate-500">{u.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-slate-600">{u.email}</td>
                  <td className="text-slate-600">{u.phone}</td>
                  <td className="text-slate-600">{u.joined}</td>
                  <td className="text-slate-600">{u.bookings}</td>
                  <td className="font-semibold text-emerald-600">LKR {userSpent(u._id).toLocaleString()}</td>
                  <td>
                    <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold",
                      u.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700")}>
                      {u.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="rounded-lg border border-slate-200 px-2 py-1 text-xs hover:bg-slate-50">View</button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader><DialogTitle>{u.name}</DialogTitle></DialogHeader>
                          <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-3">
                              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${u.name}`} className="h-16 w-16 rounded-full bg-slate-100" alt="" />
                              <div>
                                <p className="font-semibold text-slate-800">{u.name}</p>
                                <p className="text-xs text-slate-500">{u.email}</p>
                                <p className="text-xs text-slate-500">{u.phone}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <Stat label="Joined" value={u.joined} />
                              <Stat label="Bookings" value={String(u.bookings)} />
                              <Stat label="Total Spent" value={`LKR ${userSpent(u._id).toLocaleString()}`} />
                              <Stat label="Status" value={u.status} />
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      {u.role !== "Admin" && (
                        <button onClick={() => handleToggleStatus(u)} className={cn("rounded-lg border p-1.5", u.status === "Active" ? "border-red-200 text-red-600 hover:bg-red-50" : "border-emerald-200 text-emerald-600 hover:bg-emerald-50")} title={u.status === "Active" ? "Suspend" : "Activate"}>
                          {u.status === "Active" ? <Ban className="h-3.5 w-3.5" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-0.5 font-semibold text-slate-800">{value}</p>
    </div>
  );
}
