import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { authApi } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { User, Mail, Phone, Lock, Save, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "My Profile — CricketBook" }] }),
  component: Profile,
});

function Profile() {
  const { user, login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) { navigate({ to: "/login" }); return; }
    if (user) { setName(user.name); }
  }, [user, isAuthenticated]);

  useEffect(() => {
    authApi.me().then((u) => { setName(u.name); setPhone(u.phone || ""); }).catch(() => {});
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setSaving(true);
    try {
      const updated = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name,
          phone,
          ...(newPassword ? { currentPassword, newPassword } : {}),
        }),
      }).then((r) => r.json());
      if (updated.message) { setError(updated.message); return; }
      login(localStorage.getItem("token")!, updated);
      setMessage("Profile updated successfully");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700"><ArrowLeft className="h-4 w-4" /> Back</button>
        <h1 className="mt-2 text-3xl font-bold text-slate-800">My Profile</h1>
        <p className="mt-2 text-slate-500">Manage your account details and login credentials.</p>

        <div className="mt-8 rounded-2xl bg-white p-6 shadow-md sm:p-8">
          <div className="mb-6 flex items-center gap-4 border-b border-slate-100 pb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <User className="h-8 w-8" />
            </div>
            <div>
              <p className="text-lg font-bold text-slate-800">{user.name}</p>
              <p className="text-sm text-slate-500">{user.email}</p>
              <span className="mt-1 inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">{user.role}</span>
            </div>
          </div>

          {message && <p className="mb-4 rounded-xl bg-green-50 p-3 text-sm text-green-700">{message}</p>}
          {error && <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}

          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm focus:border-emerald-500 focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input value={user.email} disabled className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-500" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+94 71 234 5678" className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm focus:border-emerald-500 focus:outline-none" />
              </div>
            </div>

            <div className="border-t border-slate-100 pt-5">
              <h2 className="text-lg font-bold text-slate-800">Change Password</h2>
              <p className="mt-1 text-sm text-slate-500">Leave blank if you don't want to change it.</p>
              <div className="mt-4 space-y-4">
                {newPassword && (
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Current Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} type="password" placeholder="••••••••" className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm focus:border-emerald-500 focus:outline-none" />
                    </div>
                  </div>
                )}
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" placeholder="Leave blank to keep current" className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm focus:border-emerald-500 focus:outline-none" />
                  </div>
                </div>
              </div>
            </div>

            <button disabled={saving} className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50">
              <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
