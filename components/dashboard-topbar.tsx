"use client";

import Link from "next/link";
import { Bell, LogOut, Menu, Search, UserRound, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import type { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { getDashboardPageTitle } from "@/components/dashboard-navigation";

interface DashboardTopbarProps {
  user: User;
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export function DashboardTopbar({ user, onMenuToggle, isMenuOpen }: DashboardTopbarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const displayName = typeof user.user_metadata?.full_name === "string" ? user.user_metadata.full_name : user.email ?? "there";
  const pageTitle = getDashboardPageTitle(pathname);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-md"><div className="flex min-h-20 items-center justify-between gap-4 px-5 sm:px-8 lg:px-10"><div className="flex min-w-0 items-center gap-3"><button type="button" className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden" aria-label={isMenuOpen ? "Close dashboard navigation" : "Open dashboard navigation"} aria-expanded={isMenuOpen} onClick={onMenuToggle}>{isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}</button><div className="min-w-0"><p className="hidden text-xs font-semibold text-slate-500 sm:block">Monday, September 21, 2026</p><h1 className="truncate font-display text-lg font-bold text-slate-950 sm:text-xl">{pageTitle}</h1></div></div><div className="flex items-center gap-1 sm:gap-3"><div className="relative hidden md:block">{isSearchOpen && <input autoFocus type="search" aria-label="Search workspace" placeholder="Search workspace..." className="h-10 w-56 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15" />}<button type="button" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label={isSearchOpen ? "Close search" : "Search workspace"} onClick={() => setIsSearchOpen(!isSearchOpen)}><Search className="size-5" /></button></div><button type="button" className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Notifications"><Bell className="size-5" /><span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-orange-600" /></button><Button asChild size="sm" className="hidden sm:inline-flex"><Link href="/">View public site</Link></Button><div className="relative"><button type="button" onClick={() => setIsProfileOpen(!isProfileOpen)} className="grid size-9 place-items-center rounded-full bg-orange-100 text-orange-700 transition-colors hover:bg-orange-200" aria-label="Open profile menu" aria-expanded={isProfileOpen}><UserRound className="size-4" /></button>{isProfileOpen && <div className="absolute right-0 top-12 z-50 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-xl"><div className="border-b border-slate-100 px-3 py-2"><p className="truncate text-sm font-bold text-slate-900">{displayName}</p><p className="truncate text-xs text-slate-500">{user.email}</p></div><button type="button" onClick={handleLogout} className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50"><LogOut className="size-4" /> Sign out</button></div>}</div></div></div></header>;
}
