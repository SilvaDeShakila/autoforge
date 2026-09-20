import Link from "next/link";
import { ArrowRight, BarChart3, CarFront, ShieldCheck, Wrench, type LucideIcon } from "lucide-react";
import { PublicFooter } from "@/components/public-footer";
import { PublicHeader } from "@/components/public-header";
import { Button } from "@/components/ui/button";

const overviewItems = [
  ["01", "Workspace"],
  ["02", "Operations"],
  ["03", "Insights"],
  ["04", "Growth"],
] as const;

const features: { icon: LucideIcon; title: string; copy: string }[] = [
  { icon: CarFront, title: "One clear view", copy: "Keep the important details close and the clutter out of the way." },
  { icon: Wrench, title: "Ready for service", copy: "Leave room for the garage workflows your team relies on." },
  { icon: BarChart3, title: "Designed to grow", copy: "A flexible structure for the insights you will need later." },
  { icon: ShieldCheck, title: "Built with care", copy: "A clean technical foundation for secure, reliable features." },
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-background">
      <PublicHeader />
      <main>
        <section className="relative border-b border-slate-800 bg-navy text-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-12 lg:py-28">
            <div className="relative z-10">
              <p className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-orange-300"><span className="h-px w-8 bg-orange-400" /> The smarter way forward</p>
              <h1 className="max-w-3xl font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">Run your dealership with <span className="text-orange-400">confidence.</span></h1>
              <p className="mt-7 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">AutoForge brings your showroom, service floor, and team together in one clear, powerful workspace.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Button asChild size="lg"><Link href="/dashboard">Explore the dashboard <ArrowRight className="size-4" /></Link></Button><Button asChild variant="outline" size="lg" className="border-slate-600 bg-transparent text-white hover:bg-slate-800 hover:text-white"><Link href="#foundation">See what&apos;s next</Link></Button></div>
            </div>
            <div className="relative mx-auto w-full max-w-lg lg:ml-auto"><div className="absolute -right-16 -top-16 size-64 rounded-full bg-orange-500/15 blur-3xl" /><div className="relative rounded-3xl border border-white/10 bg-white/[0.07] p-3 shadow-2xl backdrop-blur-sm"><div className="rounded-2xl bg-slate-950/70 p-6"><div className="mb-8 flex items-center justify-between"><span className="font-display text-sm font-bold">Today at AutoForge</span><span className="rounded-full bg-emerald-400/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300">Live overview</span></div><div className="grid grid-cols-2 gap-3">{overviewItems.map(([number, label]) => <div key={number} className="rounded-xl border border-white/10 bg-white/5 p-4"><span className="font-display text-2xl font-bold text-orange-300">{number}</span><p className="mt-4 text-xs font-medium text-slate-300">{label}</p></div>)}</div><div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-4"><div className="mb-5 flex justify-between text-xs text-slate-400"><span>System foundation</span><span className="text-orange-300">Ready to build</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-700"><div className="h-full w-3/4 rounded-full bg-linear-to-r from-orange-500 to-amber-300" /></div></div></div></div></div>
          </div>
        </section>
        <section id="foundation" className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12"><div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-600">Built for the road ahead</p><h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">A strong foundation for every part of your business.</h2><p className="mt-5 leading-7 text-slate-600">This first release is intentionally focused: a thoughtful shell that makes the next stage of AutoForge easy to build, understand, and extend.</p></div><div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{features.map(({ icon: FeatureIcon, title, copy }) => <div key={title} className="rounded-2xl border border-line bg-white p-6 shadow-sm transition-transform hover:-translate-y-1"><FeatureIcon className="size-6 text-orange-600" /><h3 className="mt-7 font-display text-lg font-bold text-slate-950">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p></div>)}</div></section>
      </main>
      <PublicFooter />
    </div>
  );
}
