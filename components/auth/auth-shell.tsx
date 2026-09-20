import Link from "next/link";
import { ArrowLeft, CarFront, LockKeyhole } from "lucide-react";
import type { ReactNode } from "react";

interface AuthShellProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}

export function AuthShell({ eyebrow, title, description, children }: AuthShellProps) {
  return (
    <main className="min-h-screen bg-slate-100 lg:grid lg:grid-cols-[0.9fr_1.1fr]">
      <section className="relative hidden overflow-hidden bg-navy px-10 py-10 text-white lg:flex lg:flex-col lg:justify-between xl:px-16">
        <div className="absolute -right-32 top-20 size-96 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-20 size-96 rounded-full border border-white/5" />
        <Link href="/" className="relative z-10 flex w-fit items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-orange-600 font-display text-xl font-bold">A</span>
          <span className="font-display text-2xl font-bold">Auto<span className="text-orange-400">Forge</span></span>
        </Link>
        <div className="relative z-10 max-w-md pb-8">
          <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-orange-300"><span className="h-px w-8 bg-orange-400" /> Built for what&apos;s next</p>
          <h2 className="mt-6 font-display text-4xl font-bold leading-tight xl:text-5xl">Your dealership, in one clear view.</h2>
          <p className="mt-6 text-sm leading-7 text-slate-300">AutoForge gives your team a calm, focused place to manage the work that keeps your business moving.</p>
          <div className="mt-10 flex items-center gap-3 text-sm font-semibold text-slate-300"><span className="grid size-9 place-items-center rounded-lg bg-white/10"><CarFront className="size-4 text-orange-300" /></span> A modern foundation for automotive teams</div>
        </div>
      </section>
      <section className="flex min-h-screen flex-col px-5 py-6 sm:px-8 sm:py-10">
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
          <Link href="/" className="mb-10 flex w-fit items-center gap-3 lg:hidden"><span className="grid size-9 place-items-center rounded-xl bg-orange-600 font-display text-lg font-bold text-white">A</span><span className="font-display text-xl font-bold text-slate-950">Auto<span className="text-orange-600">Forge</span></span></Link>
          <div className="mb-8"><p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-600">{eyebrow}</p><h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{title}</h1><p className="mt-3 text-sm leading-6 text-slate-600">{description}</p></div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">{children}</div>
          <p className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-slate-500"><LockKeyhole className="size-3.5" /> Secure workspace foundation</p>
        </div>
        <Link href="/" className="mx-auto mt-8 flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-orange-600"><ArrowLeft className="size-4" /> Back to AutoForge</Link>
      </section>
    </main>
  );
}
