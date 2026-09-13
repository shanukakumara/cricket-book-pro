import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CircleDot, User, Mail, Phone, Lock, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { authApi } from "@/lib/api";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create account — CricketBook" }] }),
  component: Register,
});

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const strength = pw.length === 0 ? 0 : pw.length < 6 ? 1 : pw.length < 10 ? 2 : 3;
  const labels = ["", "Weak", "Medium", "Strong"];
  const colors = ["bg-slate-200", "bg-red-400", "bg-amber-400", "bg-emerald-500"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (pw !== confirm) { setError("Passwords do not match"); return; }
    setLoading(true);
    try {
      const res = await authApi.register({ name, email, password: pw, phone });
      login(res.token, res.user);
      navigate({ to: "/" });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-gray-50 to-amber-50 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-6 flex flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl">
            <CircleDot className="h-7 w-7" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-slate-800">Create your account</h1>
          <p className="text-sm text-slate-500">Start booking cricket grounds in minutes</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-white p-7 shadow-xl">
          <button type="button" onClick={() => navigate({ to: "/" })} className="flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700"><ArrowLeft className="h-4 w-4" /> Back</button>
          {error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Kamal Perera" className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm focus:border-emerald-500 focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@cricket.lk" className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm focus:border-emerald-500 focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Phone</label>
            <div className="flex">
              <span className="inline-flex items-center rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 px-3 text-sm text-slate-600">+94</span>
              <div className="relative flex-1">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="71 234 5678" className="w-full rounded-r-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm focus:border-emerald-500 focus:outline-none" />
              </div>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input value={pw} onChange={(e) => setPw(e.target.value)} type="password" placeholder="••••••••" className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm focus:border-emerald-500 focus:outline-none" />
            </div>
            <div className="mt-2 flex gap-1">
              {[1,2,3].map((i) => (
                <div key={i} className={cn("h-1.5 flex-1 rounded-full", i <= strength ? colors[strength] : "bg-slate-200")} />
              ))}
            </div>
            {strength > 0 && <p className="mt-1 text-xs text-slate-500">{labels[strength]} password</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input value={confirm} onChange={(e) => setConfirm(e.target.value)} type="password" placeholder="••••••••" className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm focus:border-emerald-500 focus:outline-none" />
            </div>
          </div>
          <label className="flex items-start gap-2 text-xs text-slate-600">
            <input type="checkbox" className="mt-0.5 rounded" /> I agree to the <a href="#" className="text-emerald-600 hover:underline">Terms & Conditions</a>
          </label>
          <button disabled={loading} className="w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-700 active:scale-95 disabled:opacity-50">
            {loading ? "Creating..." : "Create Account"}
          </button>
          <p className="text-center text-sm text-slate-600">
            Already have an account? <Link to="/login" className="font-semibold text-emerald-600 hover:underline">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
