import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

interface QuickActionCardProps {
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export function QuickActionCard({ label, description, href, icon: Icon }: QuickActionCardProps) {
  return <Link href={href} className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 transition-colors hover:border-orange-300 hover:bg-orange-50/40"><span className="grid size-9 shrink-0 place-items-center rounded-lg bg-orange-50 text-orange-600"><Icon className="size-4" /></span><span className="min-w-0 flex-1"><span className="block text-sm font-bold text-slate-800">{label}</span><span className="mt-0.5 block truncate text-xs text-slate-500">{description}</span></span><ArrowRight className="size-4 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-orange-600" /></Link>;
}
