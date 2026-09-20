import Link from "next/link";
import { ArrowLeft, ArrowRight, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardModulePageProps {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  nextStep: string;
  nextHref: string;
}

export function DashboardModulePage({ eyebrow, title, description, icon: Icon, nextStep, nextHref }: DashboardModulePageProps) {
  return (
    <div className="space-y-8">
      <div>
        <Link href="/dashboard" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-orange-600"><ArrowLeft className="size-4" /> Back to overview</Link>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-600">{eyebrow}</p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-950">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{description}</p>
      </div>
      <Card className="overflow-hidden">
        <CardHeader className="border-b border-slate-100 bg-white"><span className="grid size-12 place-items-center rounded-xl bg-orange-50 text-orange-600"><Icon className="size-6" /></span><CardTitle className="mt-5">This workspace is ready</CardTitle><p className="text-sm leading-6 text-slate-500">The page is connected and protected. The detailed {title.toLowerCase()} workflows will be added in the next implementation phase.</p></CardHeader>
        <CardContent className="flex flex-col gap-4 bg-slate-50 p-6 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Next step</p><p className="mt-1 text-sm font-semibold text-slate-800">{nextStep}</p></div><Button asChild variant="outline"><Link href={nextHref}>Go to next area <ArrowRight className="size-4" /></Link></Button></CardContent>
      </Card>
    </div>
  );
}
