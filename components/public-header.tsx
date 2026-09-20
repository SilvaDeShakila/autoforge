"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const links = [{ href: "#foundation", label: "Platform" }, { href: "#foundation", label: "Why AutoForge" }, { href: "/dashboard", label: "Dashboard" }, { href: "/login", label: "Sign in" }];

export function PublicHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md"><div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-12"><Link href="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}><span className="grid size-9 place-items-center rounded-xl bg-orange-600 font-display text-lg font-bold text-white">A</span><span className="font-display text-xl font-bold tracking-tight text-slate-950">Auto<span className="text-orange-600">Forge</span></span></Link><nav className="hidden items-center gap-8 md:flex">{links.map((link) => <Link key={link.label} href={link.href} className="text-sm font-semibold text-slate-600 transition-colors hover:text-orange-600">{link.label}</Link>)}<Button asChild size="sm"><Link href="/signup">Get started</Link></Button></nav><button className="rounded-lg p-2 text-slate-700 md:hidden" aria-label={isOpen ? "Close menu" : "Open menu"} onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X /> : <Menu />}</button></div>{isOpen && <nav className="border-t border-slate-200 bg-white px-6 py-4 md:hidden">{links.map((link) => <Link key={link.label} href={link.href} onClick={() => setIsOpen(false)} className="block border-b border-slate-100 py-3 text-sm font-semibold text-slate-700">{link.label}</Link>)}<Button asChild className="mt-4 w-full"><Link href="/signup" onClick={() => setIsOpen(false)}>Get started</Link></Button></nav>}</header>;
}
