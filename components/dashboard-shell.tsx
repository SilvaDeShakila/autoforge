"use client";

import type { User } from "@supabase/supabase-js";
import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { DashboardTopbar } from "@/components/dashboard-topbar";

interface DashboardShellProps {
  user: User;
  children: React.ReactNode;
}

export function DashboardShell({ user, children }: DashboardShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return <div className="min-h-screen bg-slate-50"><DashboardSidebar user={user} isMobileOpen={isMobileMenuOpen} onMobileClose={() => setIsMobileMenuOpen(false)} /><div className="lg:pl-64"><DashboardTopbar user={user} isMenuOpen={isMobileMenuOpen} onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} /><main className="mx-auto max-w-[1600px] p-5 sm:p-8 lg:p-10">{children}</main></div></div>;
}
