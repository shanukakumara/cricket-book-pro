import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CircleDot, Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { authApi } from "@/lib/api";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Log in — CricketBook" }] }),
  component: Login,
});

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await authApi.login(email, password);
      login(res.token, res.user);
      navigate({ to: res.user.role === "Admin" ? "/admin/dashboard" : "/" });
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
          <h1 className="mt-4 text-2xl font-bold text-slate-800">Welcome back</h1>
          <p className="text-sm text-slate-500">Log in to manage your bookings</p>
        </div>

        <div className="rounded-2xl bg-white p-7 shadow-xl">
          <button onClick={() => navigate({ to: "/" })} className="mb-4 flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700"><ArrowLeft className="h-4 w-4" /> Back</button>
          {error && <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@cricket.lk" className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm focus:border-emerald-500 focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type={show ? "text" : "password"} placeholder="••••••••" className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-10 text-sm focus:border-emerald-500 focus:outline-none" />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600"><input type="checkbox" className="rounded" /> Remember me</label>
              <a href="#" className="font-medium text-emerald-600 hover:underline">Forgot password?</a>
            </div>
            <button disabled={loading} className="w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-700 active:scale-95 disabled:opacity-50">
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>
          <p className="mt-5 text-center text-sm text-slate-600">
            Don't have an account? <Link to="/register" className="font-semibold text-emerald-600 hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}