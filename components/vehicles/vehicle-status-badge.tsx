import { cn } from "@/lib/utils";
import type { VehicleStatus } from "@/lib/vehicles";

const statusStyles: Record<VehicleStatus, string> = {
  available: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  reserved: "bg-amber-50 text-amber-700 ring-amber-600/20",
  sold: "bg-blue-50 text-blue-700 ring-blue-600/20",
  in_service: "bg-orange-50 text-orange-700 ring-orange-600/20",
  inactive: "bg-slate-100 text-slate-600 ring-slate-500/20",
};

export function VehicleStatusBadge({ status }: { status: VehicleStatus }) {
  return <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-bold capitalize ring-1 ring-inset", statusStyles[status])}>{status.replace("_", " ")}</span>;
}
