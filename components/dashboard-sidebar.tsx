"use client";

import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { dashboardNavSections } from "@/components/dashboard-navigation";

interface DashboardSidebarProps {
  user: User;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function DashboardSidebar({ user, isMobileOpen = false, onMobileClose }: DashboardSidebarProps) {
  const pathname = usePathname();
  const displayName = typeof user.user_metadata?.full_name === "string" ? user.user_metadata.full_name : user.email ?? "User";
  const initials = displayName.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();

  return <>
    {isMobileOpen && <button type="button" aria-label="Close navigation" onClick={onMobileClose} className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden" />}
    <aside className={cn("fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-800 bg-navy text-white transition-transform duration-200 lg:z-30 lg:w-64 lg:translate-x-0", isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0")}>
      <div className="flex h-20 shrink-0 items-center justify-between border-b border-white/10 px-6">
        <Link href="/" onClick={onMobileClose} className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-xl bg-orange-600 font-display text-lg font-bold">A</span><span className="font-display text-xl font-bold">Auto<span className="text-orange-400">Forge</span></span></Link>
        <span className="rounded-full border border-white/10 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-500">Beta</span>
      </div>
      <nav aria-label="Dashboard navigation" className="flex-1 overflow-y-auto px-3 py-5">
        {dashboardNavSections.map((section) => <div key={section.label} className="mb-6"><p className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">{section.label}</p><div className="mt-2 space-y-1">{section.items.map(({ label, href, icon: Icon }) => { const isActive = pathname === href; return <Link key={href} href={href} aria-current={isActive ? "page" : undefined} onClick={onMobileClose} className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-400 transition-colors hover:bg-white/10 hover:text-white", isActive && "bg-orange-600 text-white shadow-lg shadow-orange-950/20")}><Icon className="size-4.5 shrink-0" />{label}</Link>; })}</div></div>)}
      </nav>
      <div className="shrink-0 border-t border-white/10 p-4"><div className="flex items-center gap-3 rounded-xl bg-white/5 p-3"><div className="grid size-9 shrink-0 place-items-center rounded-full bg-orange-200 text-xs font-bold text-orange-800">{initials}</div><div className="min-w-0"><p className="truncate text-sm font-bold">{displayName}</p><p className="truncate text-xs text-slate-500">{user.email}</p></div></div></div>
    </aside>
  </>;
}
