import Link from "next/link";

export function PublicFooter() {
  return <footer className="border-t border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-500 sm:px-10 md:flex-row md:items-center md:justify-between lg:px-12"><Link href="/" className="font-display font-bold text-slate-950">Auto<span className="text-orange-600">Forge</span></Link><p>Initial project foundation · Built for what&apos;s next.</p></div></footer>;
}
