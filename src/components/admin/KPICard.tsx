import { TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function KPICard({ label, value, icon: Icon, color, trend }: {
  label: string; value: string; icon: LucideIcon; color: string; trend: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-xl">
      <div className="flex items-start justify-between">
        <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", color)}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
          <TrendingUp className="h-3 w-3" /> {trend}
        </span>
      </div>
      <p className="mt-4 text-3xl font-bold text-slate-800">{value}</p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  );
}
