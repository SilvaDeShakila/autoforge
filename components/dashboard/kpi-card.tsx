import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface KpiCardProps {
  label: string;
  description: string;
  icon: LucideIcon;
}

export function KpiCard({ label, description, icon: Icon }: KpiCardProps) {
  return <Card><CardContent className="p-5"><div className="flex items-start justify-between"><div className="grid size-10 place-items-center rounded-xl bg-orange-50 text-orange-600"><Icon className="size-5" /></div><ArrowUpRight aria-hidden="true" className="size-4 text-slate-300" /></div><p className="mt-6 text-sm font-semibold text-slate-600">{label}</p><p className="mt-1 font-display text-3xl font-bold text-slate-950">--</p><p className="mt-2 text-xs text-slate-400">{description}</p></CardContent></Card>;
}
