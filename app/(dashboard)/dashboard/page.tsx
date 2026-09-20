import { BarChart3, CalendarDays, CarFront, ClipboardList, Package, Plus, UserPlus, Users, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/dashboard/empty-state";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { QuickActionCard } from "@/components/dashboard/quick-action-card";
import { SectionCard } from "@/components/dashboard/section-card";
import { StatusPlaceholder } from "@/components/dashboard/status-placeholder";

const kpis = [
  { label: "Total Vehicles", description: "Connect vehicle inventory to see totals", icon: CarFront },
  { label: "Customers", description: "Customer records will appear here", icon: Users },
  { label: "Active Service Jobs", description: "Service status will be calculated here", icon: Wrench },
  { label: "Monthly Sales", description: "Sales totals will be calculated here", icon: BarChart3 },
];

const quickActions = [
  { label: "Add Vehicle", description: "Open vehicle workspace", href: "/dashboard/vehicles", icon: CarFront },
  { label: "Add Customer", description: "Open customer workspace", href: "/dashboard/customers", icon: UserPlus },
  { label: "New Sale", description: "Open sales workspace", href: "/dashboard/sales", icon: Plus },
  { label: "New Service Job", description: "Open service workspace", href: "/dashboard/service-jobs", icon: Wrench },
  { label: "Book Test Drive", description: "Open test-drive workspace", href: "/dashboard/test-drives", icon: CalendarDays },
];

export default function DashboardPage() {
  return <div className="space-y-8">
    <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-600">Workspace overview</p><h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Welcome back.</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">AutoForge gives your dealership and garage team one clear place to understand the work ahead.</p></div><Button asChild><a href="#quick-actions"><Plus className="size-4" /> Quick action</a></Button></section>

    <section aria-label="Key performance indicators" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{kpis.map((kpi) => <KpiCard key={kpi.label} {...kpi} />)}</section>

    <SectionCard title="Quick actions" description="Jump into a workspace when you are ready to add real records." className="scroll-mt-24" action={<span className="hidden text-xs font-semibold text-slate-400 sm:block">No records are created here yet</span>}><div id="quick-actions" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{quickActions.map((action) => <QuickActionCard key={action.label} {...action} />)}</div></SectionCard>

    <div className="grid gap-6 xl:grid-cols-2"><SectionCard title="Recent activity" description="A timeline of the latest dealership and garage activity."><EmptyState title="No recent activity yet" description="Activity will appear here after real vehicles, customers, bookings, or jobs are created." /></SectionCard><SectionCard title="Upcoming schedule" description="Keep upcoming test drives and service bookings in view."><div className="grid gap-3 sm:grid-cols-2"><EmptyState title="No test drives" description="Upcoming test drives will appear here." icon={CalendarDays} /><EmptyState title="No service bookings" description="Upcoming service bookings will appear here." icon={ClipboardList} /></div></SectionCard></div>

    <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]"><SectionCard title="Sales overview" description="A chart will appear here when Supabase sales data is connected."><div className="flex min-h-56 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/70"><div className="text-center"><BarChart3 className="mx-auto size-8 text-slate-300" /><p className="mt-3 text-sm font-bold text-slate-600">Sales chart ready for real data</p><p className="mt-1 text-xs text-slate-500">No chart data has been generated.</p></div></div></SectionCard><SectionCard title="Inventory alert" description="Low-stock spare parts will be surfaced here."><EmptyState title="No inventory alerts" description="Connect spare-parts inventory to monitor low-stock items." icon={Package} /></SectionCard></div>

    <SectionCard title="Service overview" description="Service job status will be populated from real garage records."><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{["Open", "Diagnosing", "In Progress", "Waiting Parts", "Completed"].map((status) => <StatusPlaceholder key={status} label={status} />)}</div></SectionCard>
  </div>;
}
