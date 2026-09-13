import { useState } from "react";
import { X } from "lucide-react";

export function AuthBanner() {
  const [show, setShow] = useState(true);
  if (!show) return null;
  return (
    <div className="flex items-center justify-between gap-3 bg-slate-900 px-4 py-2 text-xs text-slate-200 sm:text-sm">
      <p className="truncate">
        <span className="font-semibold text-amber-400">Demo Mode</span> — Admin:
        <span className="ml-1 font-mono text-emerald-300">admin@cricket.lk / admin123</span> | User:
        <span className="ml-1 font-mono text-emerald-300">kamal@gmail.com / pass123</span>
      </p>
      <button onClick={() => setShow(false)} aria-label="Dismiss" className="rounded p-1 hover:bg-slate-800">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
